<template>
  <div>
    <!-- 承载图表的div -->
    <div id="main" style="width: 100%;height:400px;"></div>
  </div>
</template>

<script>
export default {
  name: "Bar",
  data() {
    return {};
  },
  mounted() {
    this.drawBar();
  },
  methods: {
    drawBar: function() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("main"));
      let option = {
        //标题配置信息
        title: {
          text: "这个是主标题",
          textStyle: {
            color: "#B03A5B",
            fontWeight: "bolder"
          },
          subtext: "这个是副标题",
          subtextStyle: {
            color: "#1AAC1A",
            fontWeight: "bolder"
          },
          left: "center"
        },
        xAxis: {
          type: "category",
          data: [
            "Mon",
            "",
            "",
            "Thu",
            "",
            "",
            "Sun",
            "",
            "",
            "Wed1",
            "",
            "",
            "Sat1",
            "",
            "",
            "Tue",
            "",
            "",
            "Fri",
            "",
            "",
            "Mon1",
            "",
            "",
            "Thu1",
            "",
            "",
            "Sun1"
          ],
          itemStyle: {
            narmal: {
              color: "orange"
            }
          }
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [
              13.20,
              120,
              13.20,
              200,
              13.20,
              150,
              13.20,
              80,
              13.20,
              70,
              13.20,
              110,
              13.20,
              130,
              13.20,
              80,
              13.20,
              90,
              13.20,
              55,
              13.20,
              100,
              13.20,
              88,
              13.20,
              20,
              13.20,
              130
            ],
            type: "bar",
            barWidth: "70%",
            itemStyle: {
              normal: {
                //每根柱子颜色设置
                color: function(params) {
                  let colorList = [
                    "#37A2DA",
                    "#37A2DA00"
                  ];
                  //28
                  //12
                  var ceilcount = Math.round(28/12);
                  var index =  params.dataIndex;
                  if ((index % ceilcount == 0 && index < ceilcount * 11) || index == 28 - 1) {
                      return colorList[0];
                  }
                  return colorList[1];
                }
              }
            },
            //柱状图上显示数据
            label: {
              show: "true",
              position: "top",
              color: "#FFF",
              fontWeight: "bolder",
              backgroundColor: "auto",
              fontSize: "20"
            },
            //平均值
            markLine: {
              data: [{ type: "average", name: "平均值" }]
            }
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  }
};
</script>
<style lang="scss" scoped></style>
