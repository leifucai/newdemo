<template>
  <div>
    <!-- 地图界面 -->
    <div id="content"></div>
    <!-- 主题 -->
    <div class="title">
      <h2>福建省各市近年常住人口</h2>
    </div>
    <!-- 侧边栏列表 -->
    <common-list />
    <!-- 图标 -->
    <div class="main">
      <div id="one"></div>
      <div id="two"></div>
    </div>
    <!-- 个人弹出窗口 -->
    <common-person />
    <!-- 用户管理 -->
    <common-user />
    <!-- 打印信息 -->
    <transition>
      <div id="print" v-show="print"></div>
    </transition>
    <!-- 图层控制 -->
    <transition>
      <div id="layer" v-show="layer"></div>
    </transition>
    <!-- 图例 -->
    <transition>
      <div id="legend" v-show="legend"></div>
    </transition>
  </div>
</template>

<script>
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import Legend from "@arcgis/core/widgets/Legend";
import PopupTemplate from "@arcgis/core/PopupTemplate";
import LayerList from "@arcgis/core/widgets/LayerList";
import Print from "@arcgis/core/widgets/Print";
import CommonUser from "../../components/CommonUser.vue";
import CommonPerson from "../../components/CommonPerson.vue";
import CommonList from "../../components/CommonList.vue";
import * as echarts from "echarts";
import "@arcgis/core/assets/esri/themes/light/main.css";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
// import Editor from "@arcgis/core/widgets/Editor";
export default {
  components: { CommonList, CommonPerson, CommonUser },
  data() {
    return {};
  },
  methods: {
    //创建地图
    createMapView() {
      const map = new Map({
        basemap: {
          portalItem: {
            id: "8d91bd39e873417ea21673e0fee87604",
          },
        },
      });

      //创建视图
      const view = new MapView({
        container: "content",
        map: map,
        //视图缩放比例
        zoom: 6,
        //经度纬度
        center: [116.32, 26.02], //福州仓山119.32, 26.02     95.32, 35.02
        padding: {
          right: 410,
        },
      });
      //地图最大最小放大倍数
      view.constraints = {
        minZoom: 2,
        maxZoom: 15,
      };

      // 去除地图下方自带esri官方标志
      view.ui.remove("attribution");

      //去除放大缩小按钮
      view.ui._removeComponents(["zoom"]);
      //打印信息
      view.when(() => {
        const print = new Print({
          view: view,
          container: "print",
          printServiceUrl:
            "https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task",
        });
        // view.ui.add(print, "top-right");
      });

      //图层列表可视化
      const layerList = new LayerList({
        view: view,
        container: "layer",
      });

      //点击图层显示的弹窗的内容
      const popupTemplate = new PopupTemplate({
        title: "{市区.name}",
        content: [
          {
            type: "fields",
            fieldInfos: [
              {
                fieldName: "市区.2021人数", //fieldName是属性表中的名称
                label: "2021常住人口", //label是显示的标签
                format: {
                  places: 0,
                  digitSeparator: true,
                },
              },
              {
                fieldName: "市区.2020人口",
                label: "2020常住人口",
                format: {
                  places: 0,
                  digitSeparator: true,
                },
              },
              {
                fieldName: "市区.2019人口",
                label: "2019常住人口",
                format: {
                  places: 0,
                  digitSeparator: true,
                },
              },
              {
                fieldName: "市区.2018人数",
                label: "2018常住人口",
                format: {
                  places: 0,
                  digitSeparator: true,
                },
              },
              {
                fieldName: "市区.2017人数",
                label: "2017常住人口",
                format: {
                  places: 0,
                  digitSeparator: true,
                },
              },
              {
                fieldName: "市区.2016人数",
                label: "2016常住人口",
                format: {
                  places: 0,
                  digitSeparator: true,
                },
              },
              {
                fieldName: "市区.2015人数",
                label: "2015常住人口",
                format: {
                  places: 0,
                  digitSeparator: true,
                },
              },
            ],
          },
        ],
      });

      //加载要素图层
      const featureLayer = new FeatureLayer({
        url: "http://localhost:6080/arcgis/rest/services/FuJianPopulation/MapServer/0",
        popupTemplate: popupTemplate, //弹出式模板
      });
      map.add(featureLayer);

      //加载另外的要素图层(用于测试)
      // const featureLayer0 = new FeatureLayer({
      //   url: "http://localhost:6080/arcgis/rest/services/SampleWorldCities/MapServer/0",
      //   popupTemplate: popupTemplate //弹出式模板
      // });
      // map.add(featureLayer0);

      // 图例
      const legend = new Legend({
        view: view,
        container: "legend",
        layerInfos: [
          {
            layer: featureLayer,
            title: "福建省各市区",
          },
          // 加载另外的图例
          // {
          //   layer:featureLayer0,
          //   title:"an"
          // }
        ],
      });

      //异步查询，点击之后进行查询，把返回回来的结果再封装为html标签(如果数据进行更新了可以采用异步操作)
      // let graphics;
      // view.whenLayerView(featureLayer).then(function (layerView) {
      //   layerView.watch("updating", function (value) {
      //     if (!value) {
      //       // wait for the layer view to finish updating

      //       // query all the features available for drawing.
      //       layerView
      //         .queryFeatures({
      //           geometry: view.extent,
      //           returnGeometry: true,
      //           orderByFields: ["GEOID"]
      //         })
      //         .then(function (results) {
      //           graphics = results.features;

      //           const fragment = document.createDocumentFragment();

      //           graphics.forEach(function (result, index) {
      //             const attributes = result.attributes;
      //             const name = attributes.NAME;

      //             // Create a list zip codes in NY
      //             const li = document.createElement("li");
      //             li.classList.add("panel-result");
      //             li.tabIndex = 0;
      //             li.setAttribute("data-result-id", index);
      //             li.textContent = name;

      //             fragment.appendChild(li);
      //           });
      //         })
      //         .catch(function (error) {
      //           console.error("query failed: ", error);
      //         });
      //     }
      //   });
      // });
    },
    //折线图
    CreateLineCharts() {
      var chartDom = document.getElementById("one");
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        //标题
        title: {
          text: "近几年各市区人口（单位：万人）",
          left: "center",
          textStyle: {
            color: "skyblue",
          },
        },
        //弹出窗
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          textStyle: {
            color: "skyblue",
          },
        },
        //图例
        legend: {
          data: [
            "福州",
            "厦门",
            "漳州",
            "泉州",
            "龙岩",
            "三明",
            "南平",
            "宁德",
            "莆田",
          ],
          textStyle: {
            color: "skyblue",
          },
          top: 30,
        },
        //数据图和边框的距离
        grid: {
          left: "0%",
          right: "4%",
          bottom: "3%",
          top: "30%",
          containLabel: true,
        },
        //保存数据图
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        //x轴的内容与类型
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["2015", "2016", "2017", "2018", "2019", "2020", "2021"],
          axisLabel: {
            show: true,
            textStyle: {
              color: "skyblue",
            },
          },
        },
        //y轴的类型
        yAxis: {
          type: "value",
          axisLabel: {
            show: true,
            textStyle: {
              color: "skyblue",
            },
          },
        },
        //数据
        series: [
          {
            name: "三明",
            type: "line",
            stack: "Total",
            data: [251, 251, 251, 251, 250, 248.6, 248],
          },
          {
            name: "南平",
            type: "line",
            stack: "Total",
            data: [268, 268, 269, 268, 268, 268, 267],
          },
          {
            name: "龙岩",
            type: "line",
            stack: "Total",
            data: [268, 269, 270, 270, 271, 273, 273],
          },
          {
            name: "宁德",
            type: "line",
            stack: "Total",
            data: [301, 303, 307, 309, 312, 314.7, 315],
          },
          {
            name: "莆田",
            type: "line",
            stack: "Total",
            data: [303, 306, 309, 313, 318, 321, 322],
          },
          {
            name: "厦门",
            type: "line",
            stack: "Total",
            data: [454, 465, 478, 496, 512, 518, 528],
          },
          {
            name: "漳州",
            type: "line",
            stack: "Total",
            data: [501, 503, 505, 507, 506, 505.4, 507],
          },
          {
            name: "福州",
            type: "line",
            stack: "Total",
            data: [780, 787, 806, 817, 824, 832, 842],
          },
          {
            name: "泉州",
            type: "line",
            stack: "Total",
            data: [858, 864, 870, 873, 876, 878.2, 885],
          },
        ],
      };

      option && myChart.setOption(option);
    },
    //饼状图
    CreatePieCharts() {
      var chartDom = document.getElementById("two");
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        //标题
        title: {
          text: "福建省各市区总人口",
          left: "center",
          textStyle: {
            color: "skyblue",
          },
        },
        //弹出窗
        tooltip: {
          trigger: "item",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          textStyle: {
            color: "skyblue",
          },
        },
        //图例
        legend: {
          orient: "vertical",
          left: "left",
          textStyle: {
            color: "skyblue",
          },
        },
        //数据
        series: [
          {
            center: ["55%", "55%"], //饼状图位置
            name: "Access From",
            type: "pie",
            radius: "50%",
            data: [
              { value: 3984, name: "2015年" },
              { value: 4016, name: "2016年" },
              { value: 4065, name: "2017年" },
              { value: 5104, name: "2018年" },
              { value: 4137, name: "2019年" },
              { value: 4158.9, name: "2020年" },
              { value: 4187, name: "2021年" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
            label: {
              color: "skyblue",
            },
          },
        ],
      };

      option && myChart.setOption(option);
    },
  },
  mounted() {
    //调用
    this.createMapView();
    this.CreateLineCharts();
    this.CreatePieCharts();
  },
  computed: {
    print() {
      return this.$store.state.person.print;
    },
    layer() {
      return this.$store.state.person.layer;
    },
    legend() {
      return this.$store.state.person.legend;
    },
  },
};
</script>
<style scoped>
#content {
  height: 100vh;
  margin: 0;
  padding: 0;
}
.title {
  position: absolute;
  height: 50px;
  width: 300px;
  background: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
  top: 0;
  left: 110px;
  border-bottom-right-radius: 50px;
}
h2 {
  color: skyblue;
  line-height: 10px;
}
.main {
  /* box-shadow: 10px 10px 10px 30px rgba(0, 0, 0, 0.5); */
  /* opacity: 0.5; */
  position: absolute;
  height: 100vh;
  width: 30vw;
  top: 0;
  right: 0;
  /* background-color: rgba(0, 0, 0, 0.5); */
  background: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8));
}
.main #one {
  width: 30vw;
  height: 50vh;
  background-color: rgba(0, 0, 0, 0);
  margin-top: 10px;
}
.main #two {
  width: 30vw;
  height: 47vh;
  background-color: rgba(0, 0, 0, 0);
  margin-top: 10px;
}

@keyframes print {
  from {
    transform: translateX(1200px);
  }
  to {
    transform: translateX(0px);
  }
}
.v-enter-active {
  animation: print 1s;
}
.v-leave-active {
  animation: print 1s reverse;
}
#print {
  color: white;
  position: absolute;
  height: 450px;
  width: 250px;
  background: rgba(0, 0, 0, 0.5);
  right: 30vw;
  top: 28vh;
  border-radius: 30px;
}
#layer {
  position: absolute;
  color: white;
  background: rgba(0, 0, 0, 0.8);
  right: 30vw;
  top: 20px;
  border-radius: 20px;
}
#legend {
  position: absolute;
  color: white;
  background: rgba(0, 0, 0, 0.5);
  left: 110px;
  bottom: 0;
  border-radius: 20px;
}
</style>
<style>
/* 打印工具样式 */
.esri-print__layout-tab {
  color: white !important;
}
.esri-print__layout-tab[aria-selected="true"],
.esri-print__layout-tab[aria-selected="true"]:hover {
  color: black !important;
}
/* 图层管理样式 */
h3.esri-widget__heading,
h4.esri-widget__heading,
h5.esri-widget__heading,
h6.esri-widget__heading {
  color: white !important;
}
.esri-layer-list__item-container {
  background: rgba(0, 0, 0) !important;
}
/* 点击图层弹出窗口样式 */
[class*="esri-popup--is-docked-top-"] .esri-popup__footer,
[class*="esri-popup--aligned-bottom-"] .esri-popup__footer {
  background: rgba(0, 0, 0, 0.8) !important;
}
.esri-popup__inline-actions-container > .esri-popup__action,
.esri-popup__inline-actions-container > .esri-popup__action-toggle {
  color: white !important;
}
.esri-popup__navigation .esri-popup__button {
  background: rgba(0, 0, 0) !important;
  color: white !important;
}
.esri-view-height-less-than-medium .esri-popup__main-container {
  background: rgba(0, 0, 0, 0.6) !important;
}
h2.esri-widget__heading {
  color: white !important;
}
.esri-popup__button {
  color: white !important;
}
.esri-feature__content-element:last-child {
  background: rgba(0, 0, 0, 0.9) !important;
}
.esri-widget__table tr th {
  color: white !important;
}
.esri-widget__table tr td {
  color: white !important;
}
.esri-popup__button:hover {
  color: black !important;
}
.esri-popup__header-container--button:hover {
  background: rgba(0, 0, 0, 0) !important;
}
/* .esri-view-height-less-than-medium .esri-popup__main-container{
  position: relative !important;
  right: 30vw !important;
} */

/* 去除点击地图时地图的外边线 */
.esri-view .esri-view-surface--inset-outline:focus::after {
  outline: none !important;
}
</style>