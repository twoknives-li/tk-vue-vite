<template>
  <div class="page">
    <el-row>
      <el-col :span="6" class="flex-col min-h-screen">
        <div class="m-1 flex flex-col overflow-y-scroll h-screen">
          <el-button type="info" class="m-3" @click="restMap"
            >重置地图</el-button
          >
          <el-button type="info" class="m-3" @click="makePoints"
            >构建点图</el-button
          >
          <el-button type="info" class="m-3" @click="makeLine"
            >构建线图</el-button
          >
          <el-button type="info" class="m-3" @click="makeDbx"
            >构建多边形</el-button
          >
          <el-button type="info" class="m-3" @click="addMark"
            >添加地图标注</el-button
          >
          <el-button type="info" class="m-3" @click="makeGif"
            >构建动画</el-button
          >
          <el-button type="info" class="m-3" @click="makeMove"
            >构建要素移动</el-button
          >

          经纬:
          <el-tag type="priems" class="m-3">{{ state.showCenter[0] }}</el-tag>
          <el-tag type="error" class="m-3">{{ state.showCenter[1] }}</el-tag>
          选择：
          <el-select
            v-model="state.makeType"
            placeholder=""
            class="m-3"
            @change="changeMakeType"
          >
            <el-option value="None" label="无">无</el-option>
            <el-option value="Point" selected="selected" label="点"
              >点</el-option
            >
            <el-option value="LineString" label="线">线</el-option>
            <el-option value="Polygon" label="多边形">多边形</el-option>
            <el-option value="Circle" label="圆">圆</el-option>
            <el-option value="Square" label="正方形">正方形</el-option>
            <el-option value="Box" label="长方形">长方形</el-option>
          </el-select>
        </div>

        <div id="result" class="result-box mt-3">
          {{ state.resultInfo }}
        </div>
      </el-col>

      <el-col :span="18">
        <div id="mymap" class="mymap">
          <!-- Popup -->
          <div id="popup" ref="popupRef" class="ol-popup">
            <a
              href="#"
              id="popup-closer"
              ref="popupCloser"
              class="ol-popup-closer"
              @click="doCloser"
            ></a>
            <div id="popup-content" ref="popupContent"></div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>


<script lang="ts" setup>
import {
  defineComponent,
  reactive,
  ref,
  toRefs,
  getCurrentInstance,
  onMounted,
  defineCustomElement,
} from "vue";
import Vue from "vue";
import iconUrl from "/static/images/address.png";

import "ol/ol.css";
import XYZ from "ol/source/XYZ";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import {
  defaults,
  FullScreen,
  MousePosition,
  OverviewMap,
  ScaleLine,
  ZoomSlider,
  ZoomToExtent,
} from "ol/control"; // openlayers控件
import { fromLonLat, toLonLat, transformExtent, transform } from "ol/proj"; // 格式互转
import VectorLayer from "ol/layer/Vector.js";
import BaseVectorLayer from "ol/layer/BaseVector.js";
import VectorSource from "ol/source/Vector.js";
import { Icon, Style, Text, Fill, Stroke, Circle } from "ol/style";
import { createStringXY } from "ol/coordinate";
import { createBox, createRegularPolygon } from "ol/interaction/Draw";
import Polygon from "ol/geom/Polygon.js";
import { circular } from "ol/geom/Polygon";
import Geometry from "ol/geom/Geometry.js";
import Overlay from "ol/Overlay"; //弹窗
import Draw from "ol/interaction/Draw.js";
import Feature from "ol/Feature.js";
import Point from "ol/geom/Point.js";
import * as olPixel from "ol/pixel";
import LineString from "ol/geom/LineString.js";

import { Vector as SourceLayer } from "ol/source";
import { defaultLoadFunction } from "ol/source/VectorTile";

const info = {
  idCard: "ffff",
  TiandituKey: "a512eb23e96a5e76b51a0b747e65ecd6",
  mapCenter: [108.952055, 34.313571],
  showCenter: [],
  makeType: "",
  resultInfo: "",
  animating: false,
  speed:0,
  now: 0,
};
const state = reactive(info);
const myMap: any = ref(null);
const mapDrawType = ref();
const mapDraw = ref();

const container: any = ref();
const popupContent: any = ref();
const popupCloser: any = ref();

const popup: any = ref();

const pointLayer: any = ref();
const markLayer: any = ref();

const flightsSource: any = ref();


const moveStyle = ref();

const mapView = new View({
  center: fromLonLat(state.mapCenter),
  zoom: 12,
  // projection: "EPSG:4326", // 坐标系，有EPSG:4326和EPSG:3857
});

// 初始化地图
const initMap = () => {
  const mapVec: any = {
    title: "天地图矢量图层",
    source: new XYZ({
      url:
        "http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=" +
        state.TiandituKey, //parent.TiandituKey()为天地图密钥
      wrapX: false,
    }),
  };
  const mapCva = {
    title: "天地图矢量注记图层",
    source: new XYZ({
      url:
        "http://t0.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=" +
        state.TiandituKey, //parent.TiandituKey()为天地图密钥
      wrapX: false,
    }),
  };
  const TiandiMap_vec: any = new TileLayer(mapVec);
  const Tianditu_cva: any = new TileLayer(mapCva);
  myMap.value = new Map({
    view: mapView,
    layers: [TiandiMap_vec, Tianditu_cva],
    // layers: [  // 图层
    // 			new TileLayer({  // 使用瓦片渲染方法
    // 				source: new OSM(),  // 图层数据源
    // 			}),
    // 		],
    target: "mymap",
    controls: defaults({
      // 移除归属控件
      // attribution: false,
      // 移除缩放控件
      // zoom: false,
      // 移除旋转控件
      // rotate: false
    }).extend([
      // 添加全屏控件
      new FullScreen(),
      // 添加坐标拾取控件
      new MousePosition({
        // 设置数据格式
        coordinateFormat: createStringXY(6),
        // 设置空间参考系统为'EPSG:4326'
        projection: "EPSG:4326",
        // render: (r:any)=>{
        //   console.log(r.frameState.viewState);
        //   state.showCenter = r.frameState.viewState.center
        // }
      }),
      // 添加鹰眼控件
      new OverviewMap({
        // 概览图图层
        layers: [new TileLayer({ source: new OSM() })],
        // 控制鹰眼控件展开
        collapsed: false,
      }),
      // 添加比例尺控件
      new ScaleLine(),
      // 滑块缩放控件
      new ZoomSlider(),
      // 缩放至特定位置控件
      new ZoomToExtent({
        extent: [
          // 位置矩形的左下角坐标
          12667718, 2562800,
          // 位置矩形的右上角坐标
          12718359, 2597725,
        ],
      }),
    ]),
  });
  // map.getView().setCenter(state.mapCenter);
  // map.getView().setZoom(3);
  //将绘制层添加到地图容器中
  myMap.value.addLayer(vector);

  myMap.value.on("click", function (evt) {
    var pixel = myMap.value.getEventPixel(evt.originalEvent); //获取点击的像素点
    var coordinate = myMap.value.getCoordinateFromPixel(pixel); //获取像素点的坐标
    console.log("点击事件", pixel, coordinate, toLonLat(coordinate));
    console.log(toLonLat(coordinate)); // 转换成经纬度
    const showCenter: any = toLonLat(coordinate);
    state.showCenter = showCenter;
  });
};

// //实例化一个矢量图层Vector作为绘制层
const source = new VectorSource({ wrapX: false });
const vector = new VectorLayer({
  source: source,
  style: new Style({
    fill: new Fill({
      color: "rgba(255, 255, 255, 0.2)",
    }),
    stroke: new Stroke({
      color: "#ffcc33",
      width: 2,
    }),
    image: new Circle({
      radius: 7,
      fill: new Fill({
        color: "#ffcc33",
      }),
    }),
  }),
});

//根据绘制类型进行交互绘制图形处理
const addInteraction = () => {
  //绘制类型
  let value: any = state.makeType;
  mapDrawType.value = state.makeType;

  let geometryFunction, maxPoints;
  if (value !== "None") {
    if (source == null) {
      let source = new VectorSource({ wrapX: false });
      //添加绘制层数据源
      vector.setSource(source);
    }
    if (value === "Square") {
      value = "Circle";
      mapDrawType.value = value;
      // 正方形图形（圆）
      geometryFunction = createRegularPolygon(4);
    } else if (value === "Box") {
      value = "LineString";
      mapDrawType.value = value;
      maxPoints = 2;
      geometryFunction = function (coordinates, geometry) {
        if (!geometry) {
          //多边形
          geometry = new Polygon([]);
        }
        var start = coordinates[0];
        var end = coordinates[1];
        geometry.setCoordinates([
          [start, [start[0], end[1]], end, [end[0], start[1]], start],
        ]);
        return geometry;
      };
    }
    //实例化交互绘制类对象并添加到地图容器中
    mapDraw.value = new Draw({
      //绘制层数据源
      source: source,
      /** @type {ol.geom.GeometryType} */
      //几何图形类型
      // type: state.makeType,
      type: mapDrawType.value,
      // 几何信息变更时调用函数
      geometryFunction: geometryFunction,
      //最大点数
      maxPoints: maxPoints,
    });

    mapDraw.value.on("drawend", function (e) {
      console.log("drawend", e);
      state.resultInfo = "";
      switch (state.makeType) {
        case "Circle":
          var center = e.feature.getGeometry().getCenter();
          var radius = e.feature.getGeometry().getRadius();
          console.log("圆心坐标：" + center + "</br></br>圆半径为：" + radius);
          (state.resultInfo =
            "圆心坐标：" + center + "</br></br>圆半径为：" + radius),
            toLonLat(radius);
          break;
        case "Point":
          var coordinates_Point = e.feature.getGeometry().getCoordinates();
          console.log(
            coordinates_Point + "</br>" + toLonLat(coordinates_Point)
          );
          state.resultInfo =
            coordinates_Point + "---" + toLonLat(coordinates_Point);
          break;
        case "LineString":
          var coordinates_Line = e.feature.getGeometry().getCoordinates();
          // $("#result").text("");
          for (var i = 0; i < coordinates_Line.length; i++) {
            console.log(coordinates_Line[i] + "</br>");
            state.resultInfo += coordinates_Line[i] + "</br>";
          }
          break;
        default:
          var coordinates_Polygon = e.feature.getGeometry().getCoordinates();
          // $("#result").text("");
          for (var i = 0; i < coordinates_Polygon[0].length; i++) {
            console.log(
              coordinates_Polygon[0][i] +
                "</br>" +
                toLonLat(coordinates_Polygon[0][i])
            );
            state.resultInfo += coordinates_Polygon[0][i] + "</br>";
          }
      }
    });
    myMap.value.addInteraction(mapDraw.value);
  } else {
    let source = null;
    //清空绘制图形
    vector.setSource(source);
  }
};
// 切换绘制类型
const changeMakeType = (v) => {
  console.log(v);
  console.log(state.makeType);
  state.resultInfo = "";
  myMap.value.removeInteraction(mapDraw.value);
  addInteraction();
};

// 构建多边形
const makeDbx = () => {
  const list = [
    [108.84155789467299, 34.314135828598936],
    [108.8958868538301, 34.19968140895706],
    [109.06353024545588, 34.31631725786184],
  ];

  let addressList: any = [];
  // const addressList = [
  //   [9871995.0, 4344069.0], [12689769.0, 5107216.0], [13002855.0, 3522218.0]
  // ];
  addressList = list.map((v, k) => {
    console.log(transform(v, "EPSG:4326", "EPSG:3857"));
    return transform(v, "EPSG:4326", "EPSG:3857");
  });
  console.log(addressList);

  // 添加点多边形
  let PolygonAll: any = new Feature({
    geometry: new Polygon([addressList]),
  });

  //设置区样式信息
  PolygonAll.setStyle(
    new Style({
      //填充色
      fill: new Fill({
        color: "rgba(255, 255, 255, 0.5)",
      }),
      //边线颜色
      stroke: new Stroke({
        color: "#333",
        width: 2,
      }),
      //形状
      image: new Circle({
        radius: 7,
        fill: new Fill({
          color: "#ffcc33",
        }),
      }),
    })
  );
  const source = new VectorSource({
    features: [PolygonAll],
  });
  const vector = new VectorLayer({
    source: source,
  });
  console.log(vector);
  myMap.value.addLayer(vector);
};
// 构建多点
const makePoints = () => {
  let pointFeature: any = new Array();
  let pointFeature2: any = null;
  const points = [
    // [858.8362085382201, 262.83141185177465],
    // [11505912.0, 4011415.0],
    [116.403218, 39.92372],
    [108.87951147112277, 34.30419437160613],
    [108.99780451464333, 34.265222435327075],
    [108.86872557769682, 34.30444738864127],
  ];
  points.forEach((v) => {
    // 添加点标记
    pointFeature2 = new Feature({
      geometry: new Point(fromLonLat(v)),
    });
    pointFeature2.setStyle(getPointStyle("#333")); // 这种方式可以设置不同样式的点
    pointFeature.push(pointFeature2);
  });
  const pointSource = new VectorSource({
    features: pointFeature,
  });
  pointLayer.value = new VectorLayer({
    source: pointSource,
    style: function (feature: any, resolution) {
      return feature.getStyle();
    },
  });
  myMap.value.addLayer(pointLayer.value);
  console.log("构建点图 完成");
};

// 点样式
const getPointStyle = (color) => {
  var pointStyle = new Style({
    image: new Circle({
      radius: 16,
      fill: new Fill({
        color: color,
      }),
    }),
  });
  return pointStyle;
};

// 构建地图标注
const addMark = () => {
  /**
   * 在地图容器中创建一个Overlay
   */
  popup.vulue = new Overlay({
    //要转换成overlay的HTML元素
    element: document.getElementById("container") as any,
    //当前窗口可见
    autoPan: true,
    //Popup放置的位置
    positioning: "bottom-center",
    //是否应该停止事件传播到地图窗口
    stopEvent: false,
    autoPanAnimation: {
      duration: 250,
    },
  } as any);
  myMap.value.addOverlay(popup.vulue);
  const currtPoint = [108.87951147112277, 34.30419437160613];
  const featuerInfo = {
    geo: currtPoint,
    att: {
      //标注信息的标题内容
      title: "北京市(中华人民共和国首都)",
      //标注详细信息链接
      titleURL: "http://www.openlayers.org/",
      //标注内容简介
      text: "北京（Beijing），简称京，中华人民共和国首都、直辖市，中国的政治、文化和国际交往中心……",
      //标注的图片
      imgURL: iconUrl,
    },
  };
  //实例化Vector要素，通过矢量图层添加到地图容器中
  const iconFeature = new Feature({
    //坐标点
    geometry: new Point(fromLonLat(currtPoint)),
    //名称属性
    name: "西安",
    //大概人口数（万）
    population: 1700,
  });
  iconFeature.setStyle(createLabelStyle(iconFeature));
  //矢量标注的数据源
  const vectorSource = new VectorSource({
    features: [iconFeature],
  });
  //矢量标注图层
  markLayer.value = new VectorLayer({
    source: vectorSource,
  });
  myMap.value.addLayer(markLayer.value);
  // 为map添加鼠标移动事件监听，当指向标注时改变鼠标光标状态
  myMap.value.on("pointermove", function (e) {
    var pixel = myMap.value.getEventPixel(e.originalEvent);
    var hit = myMap.value.hasFeatureAtPixel(pixel);
    myMap.value.getTargetElement().style.cursor = hit ? "pointer" : "";
  });

  myMap.value.on("click", function (evt) {
    console.log("构建后");
    //判断当前单击处是否有要素，捕获到要素时弹出popup
    const feature = myMap.value.forEachFeatureAtPixel(
      evt.pixel,
      function (feature, layer) {
        return feature;
      }
    );
    if (feature) {
      //清空popup的内容容器
      (document.getElementById("popup-content") as any).innerHTML = "";
      //在popup中加载当前要素的具体信息
      addFeatrueInfo(featuerInfo);
      if (popup.vulue.getPosition() == undefined) {
        //设置popup的位置
        popup.vulue.setPosition(state.mapCenter);
      }
    }
  });
};

/**
 * 创建标注样式函数,设置image为图标ol.style.Icon
 * @param {ol.Feature} feature 要素
 */
const createLabelStyle = (feature) => {
  return new Style({
    image: new Icon(
      /** @type {olx.style.IconOptions} */
      {
        //设置图标点
        anchor: [0.5, 60],
        //图标起点
        anchorOrigin: "top-right",
        //指定x值为图标点的x值
        anchorXUnits: "fraction",
        //指定Y值为像素的值
        anchorYUnits: "pixels",
        //偏移
        offsetOrigin: "top-right",
        // offset:[0,10],
        //图标缩放比例
        // scale:0.5,
        //透明度
        opacity: 0.75,
        //图标的url
        src: iconUrl,
      }
    ),
    text: new Text({
      //位置
      textAlign: "center",
      //基准线
      textBaseline: "middle",
      //文字样式
      font: "normal 14px 微软雅黑",
      //文本内容
      text: feature.get("name"),
      //文本填充样式（即文字颜色）
      fill: new Fill({ color: "#aa3300" }),
      stroke: new Stroke({ color: "#ffcc33", width: 2 }),
    }),
  });
};
/**
 * 动态创建popup的具体内容
 * @param {string} title
 */
function addFeatrueInfo(info) {
  const dom: any = document.getElementById("popup");
  dom.style.display = "block";
  //新增a元素
  var elementA = document.createElement("a");
  elementA.className = "markerInfo";
  elementA.href = info.att.titleURL;
  console.log(elementA);
  // 新建的div元素添加a子节点
  (document.getElementById("popup-content") as any).appendChild(elementA);
  //新增div元素
  var elementDiv = document.createElement("div");
  elementDiv.className = "markerText";
  elementDiv.innerText = info.att.text;
  // 为content添加div子节点
  popupContent.value = elementDiv;
  console.log(elementDiv);
  (document.getElementById("popup-content") as any).appendChild(elementDiv);
  //新增img元素
  var elementImg = document.createElement("img");
  elementImg.className = "markerImg";
  elementImg.src = info.att.imgURL;
  (document.getElementById("popup-content") as any).appendChild(elementImg);
  // 为content添加img子节点
  console.log(elementImg);
}

/**
 * 添加关闭按钮的单击事件（隐藏popup）
 * @return {boolean} Don't follow the href.
 */
const doCloser = () => {
  console.log("点击关闭");
  //未定义popup位置
  popup.vulue.setPosition(undefined);
  const dom: any = document.getElementById("popup");
  dom.style.display = "none";
};

const animateFlights = (event) => {
  const pointsPerMs = 0.1;
  var vectorContext: any = event.vectorContext;
  var frameState = event.frameState;
  // vectorContext.setStyle(nowStyle);
  var features = flightsSource.value.getFeatures();
  for (var i = 0; i < features.length; i++) {
    var feature = features[i];
    if (!feature.get("finished")) {
      var coords = feature.getGeometry().getCoordinates();
      var elapsedTime = frameState.time - feature.get("start");
      var elapsedPoints = elapsedTime * pointsPerMs;

      if (elapsedPoints >= coords.length) {
        feature.set("finished", true);
      }

      var maxIndex = Math.min(elapsedPoints, coords.length);
      var currentLine = new LineString(coords.slice(0, maxIndex));

      //根据要素来描绘出线条
      vectorContext.drawGeometry(currentLine);
    }
  }
  //继续动画效果
  myMap.value.render();
};
/**
 * @name: 构建动画
 * @return {*}
 */
const makeGif = () => {
  const flightsData = [
    [116.403218, 39.92372],
    [108.87951147112277, 34.30419437160613],
    [108.99780451464333, 34.265222435327075],
    [108.86872557769682, 34.30444738864127],
    [108.99780451464333, 32.265222435327075],
    [108.99780451464333, 34.235222435327075],
    [108.99780451464333, 38.215222435327075],
  ];
  const nowStyle: any = new Style({
    stroke: new Stroke({
      color: "#EAE911",
      width: 20,
    }),
  });
  flightsSource.value = new VectorSource({
    wrapX: false,
    attributions: "Flight data by OpenFlights</a>",

    loader: () => {
      for (var i = 0; i < flightsData.length; i++) {
        let arcGenerator = new LineString([flightsData[0], flightsData[i]]);

        if (flightsSource.value.getFeatures().length === 1) {
          var feature = new Feature({
            geometry: arcGenerator,
            finished: false,
          });
          //   //添加动画的特性与延迟所有功能并不在同一时间开始
          window.setTimeout(function () {
            feature.set("start", new Date().getTime());
            flightsSource.value.addFeature(feature);
          }, 500);
        }
      }

      myMap.value.on("postcompose", animateFlights);
    },
  });

  var flightsLayer: any = new VectorLayer({
    source: flightsSource.value,
    style: function (feature) {
      console.log(feature);
      //如果动画仍然是活跃的特性,不渲染图层样式的特性
      if (feature.get("finished")) {
        return nowStyle;
      } else {
        return null;
      }
    },
  });
  myMap.value.addLayer(flightsLayer);
};

// 构建线图
const makeLine = () => {
  const list = [
    [116.403218, 39.92372],
    [108.87951147112277, 34.30419437160613],
    [108.99780451464333, 34.265222435327075],
    [108.86872557769682, 34.30444738864127],
  ];
  let lineFeatures: any = [];
  list.map((item, key) => {
    let info: any = new Feature({
      geometry: new LineString([fromLonLat(list[0]), fromLonLat(item)]),
    });
    lineFeatures.push(info);
  });
  const lineSource = new VectorSource({
    wrapX: false,
    features: lineFeatures,
  });

  var lineLayer: any = new VectorLayer({
    source: lineSource,
  });
  myMap.value.addLayer(lineLayer);
};

// 构建要素移动
const makeMove = () => {

  // var vectorLayer: any = new VectorLayer({
  //   source: new VectorSource({
  //     features: [routeFeature, geoMarker, startMarker, endMarker],
  //   }),
  //   style: function (feature) {
  //     //如果动画是激活的就隐藏geoMarker
  //     if (state.animating && feature.get("type") === "geoMarker") {
  //       return null;
  //     }
  //     return styles[feature.get("type")];
  //   },
  // });


  // myMap.value.on("postcompose", moveFeature);
  // myMap.value.render();
};


// 重置地图
const restMap = () => {
  console.log("重置地图");
  // myMap.value.removeInteraction();
  let source = null;
  //清空绘制图形
  vector.setSource(source);
  myMap.value.removeLayer(pointLayer.value);
  myMap.value.removeLayer(markLayer.value);
  myMap.value.on("click", function (evt) {
    var pixel = myMap.value.getEventPixel(evt.originalEvent); //获取点击的像素点
    var coordinate = myMap.value.getCoordinateFromPixel(pixel); //获取像素点的坐标
    console.log("点击事件", pixel, coordinate, toLonLat(coordinate));
    console.log(toLonLat(coordinate)); // 转换成经纬度
    const showCenter: any = toLonLat(coordinate);
    state.showCenter = showCenter;
  });
};

onMounted(() => {
  initMap();
});
</script>

<style lang="scss" scoped>
.mymap {
  width: 100%;
  height: 90%;
  position: absolute;
}
</style>
<style scoped src="./style.scss"></style>