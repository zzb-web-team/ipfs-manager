<template>
  <div class="contents content">
    <!-- <el-page-header @back="goback()"></el-page-header> -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>
        <!-- <span style="color:#000000;fontSize: 18px;">首页&nbsp;&gt;</span> -->
        <span>服务器监控</span>
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/userlable' }">
        <!-- <span style="color:#000000;fontSize: 18px;marginLeft: -0.1rem">主机清单&nbsp;&gt;</span> -->
        <span>主机清单</span>
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/seruser' }">
        <span>主机监控项</span>
        <!-- <span style="color:#000000;fontSize: 18px;marginLeft: -0.1rem">主机监控项&nbsp;&gt;</span> -->
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <!-- <span style="color:#b9bec9;fontSize: 18px;marginLeft: -0.1rem">主机监控项详情</span> -->
        <span>主机监控项详情</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div id="vname">
      <span style="fontSize:20px;color:#5ac4a9">主机:{{machine_id}}</span>
      &nbsp
      <span style="fontSize:20px;">{{servename}}</span> &nbsp状态信息
    </div>
    <!-- <button @click="getLastData">前天</button>
    <button @click="getYesterdayData">昨天</button>-->
    <div id="chart_example"></div>
    <!-- <loading v-if="isLoading"></loading> -->
    <div id="chartexample1" v-show="nonkes" v-bind:style="{top:mousey,left:mousex}"></div>
  </div>
</template>
<script>
import echarts from "echarts";
import { get_all_machine_info2 } from "../../servers/api";
import { getlocaltimes, settime, getymdtime } from "../../servers/sevdate";
// import Loading from "@/components/loading";
export default {
  // components: { Loading },
  data() {
    return {
      nonkes: false,
      myc: "",
      mousex: "0px",
      mousey: "0px",
      xtime: [],
      ylist: [],
      myChart: "",
      servename: "",
      machine_id: "",
      isLoading: true,
      servesertype: "",
      ylist_num: 0,
      v_name: ""
    };
  },
  mounted() {
    this.machine_id = JSON.parse(sessionStorage.getItem("machine_id"));
    this.servename = JSON.parse(sessionStorage.getItem("serve_name"));
    this.v_name = JSON.parse(sessionStorage.getItem("v_name"));
    this.servesertype = JSON.parse(sessionStorage.getItem("serve_sertype"));
    this.ylist_num = JSON.parse(sessionStorage.getItem("ylistnum"));
    this.requestdata(this.machine_id, this.servename, this.servesertype);
    // this.ecma2();
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    getLastData() {},
    getYesterdayData() {},
    //加载动画

    /*请求数据*/
    requestdata(serverid, servename, sertype) {
      let params = new Object();
      let ylistnum = this.ylist_num;

      params.machine_id = serverid;
      params.day = 0;
      params.type_of_data = sertype;
      get_all_machine_info2(params)
        .then(res => {
          this.isLoading = false;
          if (res.status == 0) {
            // this.myChart.hideLoading(); //提示关闭
            if (params.type_of_data == 0) {
              this.ylist = res.data.cpu_status.cpu_us;
            } else if (params.type_of_data == 1) {
              this.ylist = res.data.mem_status.mem_free;
            } else if (params.type_of_data == 2) {
              this.ylist = res.data.disk_status[ylistnum].avail;
            } else if (params.type_of_data == 3) {
              this.ylist = res.data.network_status[ylistnum].net_in_rate;
            }

            this.ylist.forEach((item, index) => {
              this.xtime.push(getlocaltimes((res.data.server_time -= 3)));
            });
            this.xtime.reverse();

            this.edemo(params.type_of_data, servename);
          } else {
            //提示框
            this.$message({
              showClose: true,
              message: res.err_msg,
              type: "error"
            });
          }
        })
        .catch(error => {});
    },
    /*图表*/
    edemo(id, name) {
      let this_ = this;
      this.myChart = echarts.init(document.getElementById("chart_example"));
      let option = {
        title: {
          text: name,
          textStyle: {
            fontWeight: "normal", //标题颜色
            color: "#408829"
          }
        },
        //鼠标悬停提示文字
        tooltip: {
          trigger: "axis"
          // formatter: function(data) {
          //   if (id == 0 || id == 1) {
          //     return data[0].name + "<br/>" + name + "：" + data[0].value + "%"; //将小数转化为百分数显示
          //   } else if (id == 2 || id == 3) {
          //     return (
          //       data[0].name + "<br/>" + name + "：" + data[0].value + "kb"
          //     ); //将小数转化为百分数显示
          //   } else if (id == 4 || id == 5) {
          //     return data[0].name + "<br/>" + name + "：" + data[0].value; //将小数转化为百分数显示
          //   }
          // }
        },
        xAxis: {
          triggerEvent: true,
          data: this.xtime.map(function(item) {
            return item;
          }), //设置轴线的属性

          axisLine: {
            lineStyle: {
              color: "#00bbec"
            }
          }
        },
        yAxis: {
          splitLine: {
            show: false
          },
          //设置类别
          type: "value",
          //y轴刻度
          axisLabel: {
            //设置y轴数值为%
            formatter: "{value}%",
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
        series: [
          {
            type: "line",
            data: this.ylist.map(function(item) {
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
          }
        ],
        // backgroundColor: "#393948"
        backgroundColor: "#eeeeee"
      };
      this.myChart.setOption(option, true);

      // this.myChart.on("click", function(params) {
      //   if (params.value) {
      //     this_.nonkes = !this_.nonkes;
      //     this_.getMousePos(); //获取鼠标的坐标
      //     this_.ecma2(params); //显示详细图表
      //   } else {
      //   }
      // });
      //强制刷新
      this.$forceUpdate();
      //图表自适应
      window.addEventListener("resize", function() {
        this.myChart.resize();
      });
    },

    ecma2(pam) {
      var dateList = this.xtime.map(function(item) {
        return item[0];
      });
      var valueList = this.xtime.map(function(item) {
        return item[1];
      });
      let this_ = this;
      let myChart = echarts.init(document.getElementById("chartexample1"));

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
            text: "Gradient along the y axis",
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
      myChart.setOption(option);
      //强制刷新
      this.$forceUpdate();
      //图表自适应
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
    //获取鼠标的坐标
    getMousePos(event) {
      var e = event || window.event;
      var scrollX =
        document.documentElement.scrollLeft || document.body.scrollLeft;
      var scrollY =
        document.documentElement.scrollTop || document.body.scrollTop;
      var x = e.pageX || e.clientX + scrollX;
      var y = e.pageY || e.clientY + scrollY;
      //	    return { 'x': x, 'y': y };
      this.mousex = x - 250 + "px";
      this.mousey = y - 90 + "px";
      this.myc = "red";
    }
  }
};
</script>
<style lang="scss">
.el-page-header__left::after {
  background-color: #dcdfe600 !important;
}
/deep/.el-breadcrumb .el-breadcrumb-item {
  color: #ffffff !important;
}
.contents {
  min-width: 1920px;
  position: relative;
  top: 0;
  left: 0;
  z-index: 0;
  // background-color: #272731;
  #vname {
    font-size: 20px;
    text-align: left;
    margin: 10px 0;
  }
  .leftm {
    position: fixed;
    top: 40px;
    left: 0;
  }
  #chart_example {
    width: 100%;
    height: 600px;

    margin-top: 10px;
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
@media screen and (min-width: 1920px) {
  .content {
    background-color: #ffffff;
  }
}
</style>


