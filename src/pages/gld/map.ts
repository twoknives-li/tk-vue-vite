import { defineComponent, reactive, ref, toRefs, getCurrentInstance } from 'vue';
import echarts from 'echarts';
export default {
  name: 'map',
  components: {
  },
  data(){
    return {
    }
  },
  mounted() {

    this.initMap();
  },
  methods: {
     // 初始化
     initMap() {
      const that = this;
      const dataValue = [
        {
          name: '延安',
          value: [109.501762, 36.65169],
        },
        {
          name: '北京',
          value: [116.399589, 39.914687],
        },
      ];
      // 基于准备好的dom，初始化echarts实例
      const domMain:any = document.getElementById('main');
      const myChart = echarts.init(domMain);
      let option;
      // console.log(option);

      // 绘制图表
      myChart.setOption({
        title: {
          type: 'map',
        },
        tooltip: {
          triggerOn: 'mousemove|click',
          formatter(params) {
            // console.log(params);
            that.checkInfo = params;
          },
        },
        geo: {
          map: 'china',
          roam: false, // 一定要关闭拖拽
          zoom: 1.23,
          center: [105, 36], // 调整地图位置
          label: {
            normal: {
              show: false, // 关闭省份名展示
              fontSize: '10',
              color: '#ff0000',
            },
            emphasis: {
              show: false,
            },
          },
          itemStyle: {
            normal: {
              areaColor: '#909090',
              borderColor: '#909090',
              borderWidth: 1, // 设置外层边框
              shadowBlur: 5,
              shadowOffsetY: 8,
              shadowOffsetX: 0,
              shadowColor: '#909090',
            },
            emphasis: {
              areaColor: '#909090',
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 10,
              borderWidth: 0,
              shadowColor: '#909090',
            },
          },
        },
        series: [
          {
            type: 'map',
            map: 'china',
            roam: false,
            zoom: 1.23,
            center: [105, 36],
            // geoIndex: 1,
            // aspectScale: 0.75, //长宽比
            showLegendSymbol: false, // 存在legend时显示
            label: {
              normal: {
                show: false,
              },
              emphasis: {
                show: false,
                textStyle: {
                  color: '#fff',
                },
              },
            },
            itemStyle: {
              normal: {
                areaColor: '#f7c162',
                borderColor: '#b4351b',
                borderWidth: 0.5,
              },
              emphasis: {
                areaColor: '#8d0618',
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 5,
                borderWidth: 0,
                shadowColor: '#8d0618',
              },
            },
          },
          {
            name: '',
            type: 'scatter',
            // type: 'effectScatter',
            coordinateSystem: 'geo',
            data: dataValue,
            //   symbolSize: function(val) {
            //     return val[2] / 10;
            //   },

            hoverSymbolSize: 10,
            tooltip: {
              formatter(value) {
                console.log(value);
              },
              show: true,
            },
            encode: {
              value: 2,
            },
            label: {
              formatter: '{b}',
              position: 'right',
              show: false,
            },
            itemStyle: {
              color: '#ff0004',
            },
            emphasis: {
              label: {
                show: false,
              },
            },
            legendHoverLink: true,
            effectType: 'ripple',
            rippleEffect: {
              period: 5,
              scale: 6,
              color: '#fff',
            },
            symbol: 'image://data:image/png;base64,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',
            symbolSize: 18,
          },
        ],

      });
    }
  }
}