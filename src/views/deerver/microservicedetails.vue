<template>
  <div class="content">
    <!-- <el-page-header @back="goback()"></el-page-header> -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item >
        <!-- <span style="color:#000000;fontSize: 18px;">首页&nbsp;&gt;</span> -->
         <span>服务器监控</span>
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/userlable' }">
        <!-- <span style="color:#000000;fontSize: 18px;marginLeft: -0.1rem">微服务清单&nbsp;&gt;</span> -->
         <span>微服务清单</span>
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/seruser' }">
        <!-- <span style="color:#000000;fontSize: 18px;marginLeft: -0.1rem">微服务监控项&nbsp;&gt;</span> -->
         <span>微服务监控项</span>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <!-- <span style="color:#b9bec9;fontSize: 18px;marginLeft: -0.1rem">微服务监控项详情</span> -->
        <span>微服务监控项详情</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div id="vname">
      <span style="color:#4e80ff;fontSize: 20px;">{{vername}}服务</span>
      &nbsp;{{echatitle}}
    </div>
    <div id="chart_example"></div>
    <div id="chartexample1" v-show="nonkes" v-bind:style="{top:mousey,left:mousex}"></div>
  </div>
</template>
<script>
import echarts from "echarts";
import { getlocaltimes, settime, getymdtime } from "../../servers/sevdate";
import { get_allprocess } from "../../servers/api";
export default {
  data() {
    return {
      nonkes: false,
      myc: "",
      mousex: "0px",
      mousey: "0px",
      sevid: "1",
      echatitle: "",
      echatype: "",
      yparameter: [],
      times: [],
      myChart: "",
      title: "",
      vername: ""
    };
  },
  mounted() {
    //接收上个页面的参数
    if (this.$route.query.server_id) {
      this.sevid = this.$route.query.server_id;
      this.echatitle = this.$route.query.derver_name;
      this.echatype = this.$route.query.server_type;
      this.vername = this.$route.query.v_name;
    } else {
      //如果没有传递参数就读缓存里的
      this.sevid = JSON.parse(sessionStorage.getItem("server_id"));
      this.vername = JSON.parse(sessionStorage.getItem("v_name"));
      this.echatitle = "cpu使用占比";
      this.echatype = 0;
    }

    this.requestdata(this.sevid, this.echatype, 0);
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    /*请求数据*/
    requestdata(id, types, day) {
      let params = new Object();
      params.server_id = id * 1;
      params.day = day;
      params.type_of_data = types * 1;

      get_allprocess(params)
        .then(res => {
          if (res.status == 0) {
            if (types == 0) {
              this.yparameter = this.yparameter.concat(res.data.cpu_status);
              this.title = "cpu占用";
            } else if (types == 1) {
              this.yparameter = this.yparameter.concat(res.data.mem_status);
              this.title = "内存占用";
            } else if (types == 2) {
              this.yparameter = this.yparameter.concat(res.data.recv_bytes);
              this.title = "进程接收字节";
            } else if (types == 3) {
              this.yparameter = this.yparameter.concat(res.data.send_bytes);
              this.title = "进程发送字节";
            } else if (types == 4) {
              this.yparameter = this.yparameter.concat(res.data.recv_package);
              this.title = "进程接收包";
            } else if (types == 5) {
              this.yparameter = this.yparameter.concat(res.data.send_package);
              this.title = "进程发送包";
            }

            let mytimes = [];
            for (let i = 0; i < this.yparameter.length; i++) {
              mytimes.push(getlocaltimes((res.data.server_time -= 20)));
            }
            this.times = mytimes.reverse();

            this.edemo(this.title, params.type_of_data);
          } else {
            //提示框
            this.$message({
              showClose: true,
              message: "目前暂无数据，请联系相关人员",
              type: "error"
            });
          }
        })
        .catch(error => {});
    },
    /*图表*/
    edemo(titletext, types) {
      let this_ = this;
      this.myChart = echarts.init(document.getElementById("chart_example"));
      // setTimeout(() => {

      // }, 1500);
      let option = {
        title: {
          text: titletext,
          textStyle: {
            fontWeight: "normal", //标题颜色
            color: "#408829"
          }
        },
        tooltip: {
          trigger: "axis",
          formatter: function(data) {
            if (types == 0 || types == 1) {
              return (
                data[0].name + "<br/>" + titletext + "：" + data[0].value + "%"
              ); //将小数转化为百分数显示
            } else if (types == 2 || types == 3) {
              return (
                data[0].name + "<br/>" + titletext + "：" + data[0].value + "kb"
              ); //将小数转化为百分数显示
            } else if (types == 4 || types == 5) {
              return data[0].name + "<br/>" + titletext + "：" + data[0].value; //将小数转化为百分数显示
            }
          }
        },
        xAxis: {
          triggerEvent: true,
          data: this.times.map(function(item) {
            return item;
          }),
          //设置轴线的属性
          axisLine: {
            lineStyle: {
              color: "#00bbec"
            }
          }
        },
        yAxis: {
          splitLine: {
            show: false
          }, //设置轴线的属性
          //设置类别
          type: "value",
          //y轴刻度
          axisLabel: {
            //设置y轴数值为%
            formatter: "{value}",
            textStyle: {
              color: "#00bbec" //y轴刻度数值颜色
            }
          },
          axisLine: {
            lineStyle: {
              color: "#00bbec"
            }
          }
        },
        toolbox: {
          left: "center",
          feature: {
            dataZoom: {
              yAxisIndex: "none"
            },
            restore: {},
            saveAsImage: {}
          }
        },
        dataZoom: [
          {
            startValue: "2014-06-01"
          },
          {
            type: "inside"
          }
        ],
        visualMap: [
          {
            show: false,
            type: "continuous",
            seriesIndex: 0,
            min: 0,
            max: 400,
            color: ["#5ac4a9", "#4e80ff"]
          }
        ],
        series: {
          name: titletext,
          type: "line",
          data: this.yparameter.map(function(item) {
            return item;
          }),
          markLine: {
            silent: true,
            data: [
              {
                yAxis: 85,
                itemStyle: { normal: { color: "#dcdcdc" } }
              }
            ]
          }
        },
        // backgroundColor: "#393948"
         backgroundColor: "#eeeeee"
      };
      this.myChart.setOption(option);
      //  this.myChart.on("click", function(params) {
      //   if (params.value) {
      //     this_.nonkes = !this_.nonkes;
      //     this_.getMousePos();
      //     // this_.ecma2(params);
      //   } else {
      //     this_.nonkes = !this_.nonkes;
      //     this_.getMousePos();
      //     // this_.ecma2(params);
      //   }
      // });
      //   myChart.on("mouseout", function(params) {
      //       this_.nonkes = false;

      //   });
      this.$forceUpdate();
      //不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
      window.addEventListener("resize", function() {
        this.myChart.resize();
      });
    },
    /**详细图标 */
    ecma2(pam) {
      var dateList = this.times.map(function(item) {
        return item;
      });
      var valueList = this.yparameter.map(function(item) {
        return item;
      });
      let this_ = this;
      this.myChart = echarts.init(document.getElementById("chartexample1"));
      let option = {
        // Make gradient line here
        visualMap: [
          {
            show: false,
            type: "continuous",
            seriesIndex: 0,
            min: 0,
            max: 400,
            color: ["#5ac4a9", "#4e80ff"]
          }
        ],

        title: [
          {
            left: "center",
            text: "今天" + pam.seriesName,
            textStyle: {
              fontWeight: "normal", //标题颜色
              color: "#408829"
            }
          }
        ],
        tooltip: {
          trigger: "axis"
        },
        xAxis: [
          {
            data: dateList, //设置轴线的属性
            axisLine: {
              lineStyle: {
                color: "#00bbec"
              }
            }
          }
        ],
        yAxis: [
          {
            splitLine: { show: false }, //设置轴线的属性
            axisLine: {
              lineStyle: {
                color: "#00bbec"
              }
            }
          }
        ],
        grid: [
          {
            bottom: "10%"
          }
        ],
        series: [
          {
            type: "line",
            showSymbol: false,
            data: valueList
          }
        ]
      };

      this.setOption(option);
      this.$forceUpdate();
      window.addEventListener("resize", function() {
        this.resize();
      });
    },
    getMousePos(event) {
      let e = event || window.event;
      let scrollX =
        document.documentElement.scrollLeft || document.body.scrollLeft;
      let scrollY =
        document.documentElement.scrollTop || document.body.scrollTop;
      let x = e.pageX || e.clientX + scrollX;
      let y = e.pageY || e.clientY + scrollY;
      // return { 'x': x, 'y': y };
      this.mousex = x - 250 + "px";
      this.mousey = y - 90 + "px";
      this.myc = "red";
    }
  }
};
</script>
<style lang="scss" scoped>
.content {
  position: relative;
  top: 0;
  left: 0;
  z-index: 0;
  // background-color: #272731;
  min-width: 1920px;
  #vname {
    font-size: 20px;
    text-align: left;
    margin-top: 10px;
  }
  .leftm {
    position: fixed;
    top: 40px;
    left: 0;
  }
  #chart_example {
    width: 100%;
    height: 550px;
    margin-top: 10px;
    // background-color: #272731;
  }
  #chartexample1 {
    // background-color: #272731;
    width: 460px;
    height: 215px;
    position: absolute;
    // margin: 0 auto;
    div {
      width: 460px;
      height: 215px;
      canvas {
        width: 460px;
        height: 215px;
      }
    }
  }
}
</style>


