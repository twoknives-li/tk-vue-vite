<template>
  <div class="page">
    <div @click="initMapJson(510000)">四川省</div>
    <div @click="initMapJson(currtInfo.code)" v-show="currtInfo.code!== 510000">{{currtInfo.name}}</div>
    <!-- <div
      class="map-box"
      ref="mapRef"
      id="main"
      @mousedown="handleMousedown"
    ></div> -->
    <div
      class="map-box"
      ref="mapRef"
      id="main"
    ></div>
  </div>
</template>
<script lang="ts">
import { ComponentInternalInstance, getCurrentInstance, ref, unref } from "vue";
import * as echarts from "echarts";
import axios from "axios";
import sichuan from "../../../static/config/510000.json";
echarts.registerMap("sichuan", sichuan as any);
export default {
    setup() {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance;
    // console.log("proxy", proxy);
    // console.log(proxy.$api);
    // console.log(proxy.$sysName);
    return { proxy };
  },
  created() {},
  mounted() {
    this.getNowDataList(510000);
    // this.initMapJson(510000);
  },
  data() {
    return {
      userInfo: {
        name: "张三aaa",
      },
      checkInfo: {},
      province_name: '',
      nowDataList: [],
      currtInfo:{
        code: 510000,
        name:''
      } // 当前选中
    };
  },
  props: {},
  methods: {
    getNowDataList(code){
       this.proxy.$api
        .get("api/v1/home-page/app/statisdtList?deptId="+code)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    initMapJson(pathName) {
     
      console.log(pathName);
      let url = `../../../static/config/510000/${pathName}.json`;
      if(pathName === 510000) {
        url = `../../../static/config/${pathName}.json`;
      }
      axios.get(url).then((res) => {
        console.log(res.data);
        this.currtInfo = {
          fullname: res.data.propertity.fullname,
          name: res.data.propertity.name,
          code: res.data.propertity.code,
            level: res.data.propertity.level,
        }
        let dataList: any = [];
        res.data.features.forEach((item,key)=>{
          let info = {
            code: item.properties.code,
            level: item.properties.level,
            name: item.properties.name,
            fullname: item.properties.fullname,
          }
          dataList.push(info);
        })
        this.nowDataList = dataList;
        console.log('nowDataList', this.nowDataList);
        echarts.registerMap("sichuan", res.data);
        this.initMap();
      });
    },
    //点击地图
    handleMousedown() {
      // 通过获取鼠标点击事件，获取到值
      console.log(this.checkInfo);
    this.initMapJson(this.checkInfo.code);
    },
    // 初始化
    initMap() {
      const that = this;
      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(this.$refs.mapRef);
      let option;
      // console.log(option);

      // 绘制图表
      myChart.setOption({
        title: {
          type: "map",
          text: "疫情防控隔离点",
        },
        subtitle: {
          useHTML: true,
          text: "四川隔离点数据",
        },
        tooltip: {
          trigger: "item",
          showDelay: 0,
          transitionDuration: 0.2,
          formatter: function (param) {
            that.checkInfo = param.data;
            return (
              "<div>" +
              param.name +
              "</div>" +
              "<div>" +
              param.data.code +
              "<br>" +
              param.data.fullname +
              "</div"
            ); // 自定义的 DOM 结构
          },
        },

        toolbox: {
          show: true,
          orient: "vertical",
          left: "left",
          top: "top",
        },
        series: [
          {
            type: "map",
            map: "sichuan",
            roam: true,
            zoom: 1.23,
            emphasis: {
              label: {
                show: true,
              },
            },
            label: {
              normal: {
                show: true,
              },
            },
            
            data: this.nowDataList,
          },
        ],
      });

       myChart.on('click', (data:any) => {
         console.log('这里是点击');
         console.log('data',data);
         this.initMapJson(data.data.code);
       })
    },
  },
};
</script>
<style lang="scss">
.map-box {
  height: 600px;
}
</style>
