<template>
  <div class="content">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>节点数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a>全国节点分布</a>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div style="display: flex;" class="mapdal">
      <div id="myChartChina" :style="{ width: '100%', height: '500px' }"></div>
      <ol>
        <li v-for="(item, index) in maplist" :key="index">
          <span>{{ index + 1 }}&nbsp&nbsp&nbsp{{ item.name }}</span
          ><span>{{ item.value }}</span>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
import { query_ipfs_node_region_dist } from "@/servers/api";
export default {
  data() {
    return {
      maplist: [
        // { name: "湖北", value: 20 },
        // { name: "北京", value: 150 },
        // { name: "湖南", value: 13 },
        // { name: "上海", value: 900 },
        // { name: "重庆", value: 1156 },
        // { name: "广东", value: 6 },
        // { name: "浙江", value: 156 }
      ]
    };
  },
  mounted() {
    this.getdata();
    //this.drawLine();
  },
  methods: {
    getdata() {
      let params = new Object();
      query_ipfs_node_region_dist(params)
        .then(res => {
          if (res.status == 0) {
            let arr = [];
            res.data.list.forEach((item, index) => {
              let obj = {};
              obj.name = item.region.replace("市", "");
              obj.name = obj.name.replace("省", "");
              obj.value = item.nodeCnt;
              arr.push(obj);
            });
            arr.sort((a, b) => {
              return b.value - a.value;
            }); //降序
            this.maplist = arr;
            this.drawLine();
          }
        })
        .catch(Error => {});
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      var myChartContainer = document.getElementById("myChartChina");
      var resizeMyChartContainer = function() {
        myChartContainer.style.width = document.body.offsetWidth / 2 + "px"; //页面一半的大小
      };
      resizeMyChartContainer();
      var myChartChina = this.$echarts.init(myChartContainer);

      function randomData() {
        return Math.round(Math.random() * 500);
      }
      // 绘制图表
      var optionMap = {
        tooltip: {},
        legend: {
          orient: "vertical",
          left: "left",
          data: [""]
        },
        visualMap: {
          min: 0,
          max: 10000,
          left: "5%",
          top: "bottom",
          text: ["高", "低"],
          calculable: true,
          color: ["#0b50b9", "#c3e2f4"]
        },
        selectedMode: "single",
        series: [
          {
            name: "",
            type: "map",
            mapType: "china",
            itemStyle: {
              normal: {
                borderColor: "rgba(0, 0, 0, 0.2)"
              },
              emphasis: {
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 20,
                borderWidth: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            },
            showLegendSymbol: true,
            label: {
              normal: {
                show: true
              },
              emphasis: {
                show: true
              }
            },
            data: this.maplist
          }
        ]
      };

      myChartChina.setOption(optionMap);
      window.onresize = function() {
        resizeMyChartContainer();
        myChartChina.resize();
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.mapdal {
  ol {
    width: 400px;
    height: 500px;
    overflow-y: auto;
    border: 1px solid #eeeeee;
  }
  ol > li {
    border: 1px solid #eeeeee;
    height: 60px;
    line-height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    span:first-child {
      width: 260px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: left;
      padding-left: 50px;
    }
    span:last-child {
      width: 160px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
