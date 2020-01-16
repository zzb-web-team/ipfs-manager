<template>
  <div>
    <div :id="echarts" :style="{ width: '100px', height: '100px' }"></div>
  </div>
</template>

<script>
import "echarts-liquidfill/src/liquidFill.js"; //在这里引入
import echarts from "echarts";
export default {
  name: "yuanqiu",
  data() {
    return {
      num: []
    };
  },
  props: {
    cap: {
      type: Number,
      default: () => {}
    },
  },
  mounted() {

    this.num = [];
    this.num.push(this.cap);
    this.echartsMit();
  },
  computed: {
    echarts() {
      return "echarts" + Math.random() * 100000;
    }
  },
  methods: {
    // 绘制指标图
    echartsMit() {
      var dom = document.getElementById(this.echarts);
      var myChart = echarts.init(dom);
      myChart.setOption({
        series: [
          {
            type: "liquidFill",
            data: this.num,
            itemStyle: {
              shadowBlur: 0
            },
            outline: {
              borderDistance: 0,
              itemStyle: {
                borderWidth: 3,
                borderColor: "#929292",
                shadowBlur: 20
              }
            },
            label: {
              normal: {
                textStyle: {
                  color: "red",
                  insideColor: "yellow",
                  fontSize: 20
                }
              }
            }
          }
        ]
      });
    }
  }
};
</script>

<style></style>
