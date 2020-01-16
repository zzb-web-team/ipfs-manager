<template>
  <div class="content">
    <!-- <el-page-header @back="goback()"></el-page-header> -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>
        <span>服务器监控</span>
        <!-- <span style="color:#000000;fontSize: 18px;">首页&nbsp;&gt;</span> -->
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/microservicelist' }">
        <span>微服务清单</span>
        <!-- <span style="color:#000000;fontSize: 18px;marginLeft: -0.1rem">微服务清单&nbsp;&gt;</span> -->
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <!-- <span style="color:#b9bec9;fontSize: 18px;marginLeft: -0.1rem">微服务监控项</span> -->
         <span>微服务监控项</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div>
      <div class="head">
        <div class="total">
          <span style="color:#4e80ff;fontSize: 20px;">{{sername}}服务</span>共六个监控项
        </div>
        <div class="updatetime">
          最近更新时间{{gettimes}}
          <span>更新周期20s</span>
        </div>
      </div>
      <div class="intermediate">
        <div class="intermediate_item" v-for="(item, index) in mearr" :key="index">
          <div :id="`chartexample${index}`" class="chartexample" :ref="`chartexample${index}`"></div>
          <div class="doop" @click="go_userlist(item.serve_name,item.sertype)">查看详情</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
import { get_allprocess } from "../../servers/api";
import { getlocaltimes, getymdtime } from "../../servers/sevdate";

export default {
  data() {
    return {
      sevid: "",
      gettimes: "",
      mearr: [],
      TemporaryObj: {},
      timeName: [],
      len: [],
      sername: ""
    };
  },
  mounted() {
    //接收上个页面的参数
    if (this.$route.query.server_id && this.$route.query.sername) {
      this.sevid = this.$route.query.server_id;
      this.sername = this.$route.query.sername;
    } else {
      //如果没有传递参数就读缓存里的
      this.sevid = JSON.parse(sessionStorage.getItem("server_id")) * 1;
      this.sername = JSON.parse(sessionStorage.getItem("v_name"));
    }
    this.requestdata(this.sevid, 0, 0);
    // this.requestdata(this.sevid, 0, 1, "memory", "内存占比");
    // this.requestdata(this.sevid, 0, 2, "recvbytes", "进程接收字节");
    // this.requestdata(this.sevid, 0, 3, "sendbytes", "进程发送字节");
    // this.requestdata(this.sevid, 0, 4, "recvpackage", "进程接收包");
    // this.requestdata(this.sevid, 0, 5, "sendpackage", "进程发送包");
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    /*请求数据*/
    requestdata(mid, mday, mtype, mark) {
      let params = new Object();
      params.server_id = mid * 1;
      params.day = mday;
      params.type_of_data = mtype;

      get_allprocess(params)
        .then(res => {
          if (res.status == 0) {
            //  this.myChart.hideLoading(); //提示关闭
            // this.ecma(mtype, sevname, str);
            if (!mark) {
              if (mtype == 0) {
                let obj = {};
                obj.ylist = [];
                obj.xtime = [];
                obj.serve_name = "cpu使用占比";
                obj.sertype = params.type_of_data;
                obj.ylist = res.data.cpu_status;
                res.data.cpu_status.forEach(() => {
                  obj.xtime.push(getlocaltimes((res.data.server_time -= 20)));
                });
                obj.xtime.reverse();

                this.mearr.push(obj);
              } else if (mtype == 1) {
                let obj = {};
                obj.ylist = [];
                obj.xtime = [];
                obj.serve_name = "内存占比";
                obj.sertype = params.type_of_data;
                obj.ylist = res.data.mem_status;
                res.data.mem_status.forEach(() => {
                  obj.xtime.push(getlocaltimes((res.data.server_time -= 20)));
                });
                obj.xtime.reverse();

                this.mearr.push(obj);
              } else if (mtype == 2) {
                let obj = {};
                obj.ylist = [];
                obj.xtime = [];
                obj.serve_name = "进程接收字节";
                obj.sertype = params.type_of_data;
                obj.ylist = res.data.recv_bytes;
                res.data.recv_bytes.forEach(() => {
                  obj.xtime.push(getlocaltimes((res.data.server_time -= 20)));
                });
                obj.xtime.reverse();

                this.mearr.push(obj);
              } else if (mtype == 3) {
                let obj = {};
                obj.ylist = [];
                obj.xtime = [];
                obj.serve_name = "进程发送字节";
                obj.sertype = params.type_of_data;
                obj.ylist = res.data.send_bytes;
                res.data.send_bytes.forEach(() => {
                  obj.xtime.push(getlocaltimes((res.data.server_time -= 20)));
                });
                obj.xtime.reverse();

                this.mearr.push(obj);
              } else if (mtype == 4) {
                let obj = {};
                obj.ylist = [];
                obj.xtime = [];
                obj.serve_name = "进程接收包";
                obj.sertype = params.type_of_data;
                obj.ylist = res.data.recv_package;
                res.data.recv_package.forEach(() => {
                  obj.xtime.push(getlocaltimes((res.data.server_time -= 20)));
                });
                obj.xtime.reverse();

                this.mearr.push(obj);
              } else if (mtype == 5) {
                let obj = {};
                obj.ylist = [];
                obj.xtime = [];
                obj.serve_name = "进程发送包";
                obj.sertype = params.type_of_data;
                obj.ylist = res.data.send_package;
                res.data.send_package.forEach(() => {
                  obj.xtime.push(getlocaltimes((res.data.server_time -= 20)));
                });
                obj.xtime.reverse();

                this.mearr.push(obj);
              }
              this.gettimes = getymdtime(res.data.server_time);
              if (mtype <= 5) {
                mtype++;
                this.requestdata(mid, mday, mtype);
              } else {
                this.mearr.forEach((item, index) => {
                  if (item.xtime && item.ylist) {
                    this.ecma(index, item.serve_name, item);
                  }
                });
              }
            } else {
              if (mark.sertype == 0) {
                mark.nedata =
                  res.data.cpu_status[res.data.cpu_status.length - 1];
                mark.nedate = getlocaltimes(res.data.server_time);
              } else if (mark.sertype == 1) {
                mark.nedata =
                  res.data.mem_status[res.data.mem_status.length - 1];
                mark.nedate = getlocaltimes(res.data.server_time);
              } else if (mark.sertype == 2) {
                mark.nedata =
                  res.data.recv_bytes[res.data.recv_bytes.length - 1];
                mark.nedate = getlocaltimes(res.data.server_time);
              } else if (mark.sertype == 3) {
                mark.nedata =
                  res.data.send_bytes[res.data.send_bytes.length - 1];
                mark.nedate = getlocaltimes(res.data.server_time);
              } else if (mark.sertype == 4) {
                mark.nedata =
                  res.data.recv_package[res.data.recv_package.length - 1];
                mark.nedate = getlocaltimes(res.data.server_time);
              } else if (mark.sertype == 5) {
                mark.nedata =
                  res.data.send_package[res.data.send_package.length - 1];
                mark.nedate = getlocaltimes(res.data.server_time);
              }
            }
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
    /*路由跳转*/
    go_userlist(devname, sevtype) {
      sessionStorage.setItem("server_id", JSON.stringify(this.sevid));
      sessionStorage.setItem("derver_name", JSON.stringify(devname));
      sessionStorage.setItem("server_type", JSON.stringify(sevtype));
      this.$router.push({
        path: "/microservicedetails",
        query: {
          server_id: this.sevid,
          derver_name: devname,
          server_type: sevtype,
          v_name: this.sername
        }
      });
    },
    /*图表*/
    ecma(id, titletext, items) {
      let newArr_xtime = items.xtime.filter(item => {
        return item != undefined;
      });
      let newArr_ylist = items.ylist.filter(item => {
        return item != undefined;
      });

      let myChart = echarts.init(document.getElementById("chartexample" + id));
      // myChart.showLoading({
      //   text: "loading",
      //   color: "#c23531",
      //   textColor: "#000",
      //   maskColor: "rgba(255, 255, 255, 0.6)",
      //   zlevel: 0
      // }); //增加提示

      setTimeout(() => {
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
              left: "left",
              text: titletext,
              textStyle: {
                fontWeight: "normal", //标题颜色
                color: "#408829"
              }
            }
          ],
          tooltip: {
            trigger: "axis",
            formatter: function(data) {
              if (id == 0 || id == 1) {
                return (
                  data[0].name +
                  "<br/>" +
                  titletext +
                  "：" +
                  data[0].value +
                  "%"
                ); //将小数转化为百分数显示
              } else if (id == 2 || id == 3) {
                return (
                  data[0].name +
                  "<br/>" +
                  titletext +
                  "：" +
                  data[0].value +
                  "kb"
                ); //将小数转化为百分数显示
              } else if (id == 4 || id == 5) {
                return (
                  data[0].name + "<br/>" + titletext + "：" + data[0].value
                ); //将小数转化为百分数显示
              }
            }
          },
          xAxis: [
            {
              type: "category",
              data: newArr_xtime, //设置轴线的属性
              axisLine: {
                lineStyle: {
                  color: "#00bbec"
                }
              }
            }
          ],
          yAxis: [
            {
              splitLine: { show: false },
              //设置轴线的属性
              axisLine: {
                lineStyle: {
                  color: "#00bbec"
                }
              }
            }
          ],
          series: [
            {
              type: "line",
              showSymbol: false,
              data: newArr_ylist
            }
          ],
          // backgroundColor: "#393948"
           backgroundColor: "#eeeeee"
        };
        let that = this;
        this.timeName[id] = setInterval(function() {
          that.requestdata(that.sevid, 0, items.sertype, items);

          let newArr_xtime = items.xtime.filter(item => {
            return item != undefined;
          });
          let newArr_ylist = items.ylist.filter(item => {
            return item != undefined;
          });

          items.ylist.shift();
          items.ylist.push(items.nedata);
          items.xtime.shift();
          items.xtime.push(items.nedate);
          myChart.setOption({
            xAxis: {
              data: newArr_xtime
            },
            series: [
              {
                data: newArr_ylist
              }
            ]
          });
        }, 22000);
        myChart.setOption(option);
        this.$forceUpdate();
        //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
        addEventListener("resize", function() {
          myChart.resize();
        });
      });
    }
  }, //离开页面时清除所有定时器
  beforeDestroy() {
    this.mearr.forEach((item, index, arr) => {
      clearInterval(this.timeName[index]);
    });
  }
};
</script><style lang="scss" scoped>
.content {
  width: 100%;
  min-width: 1920px;
  // background-color: #272731;
  // display: flex;
  // justify-content: center;
  .head {
    width: 100%;
    color: #ffffff;
    display: flex;
    justify-content: space-between;
    line-height: 40px;
    // padding-left: 80px;
    // padding-right: 6%;
    max-width: 1920px;
    .total {
      font-size: 20px;
    }
    .updatetime {
      color: #b6b6b6;
      font-size: 18px;
      padding-right: 0.12rem;
      span {
        margin-left: 10px;
        color: #000000;
        font-size: 20px;
      }
    }
  }
  .intermediate {
    width: 1920px;
    height: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    .intermediate_item {
      margin-right: 60px;
      margin-bottom: 20px;
      position: relative;
      .chartexample {
        width: 750px;
        height: 400px;
        div {
          width: 750px;
          height: 400px;
          canvas {
            width: 100%;
            height: 100%;
          }
        }
      }
      .doop {
        position: absolute;
        z-index: 1000;
        top: 5px;
        right: 15px;
        color: #408829;
      }
    }
  }
}
</style>

