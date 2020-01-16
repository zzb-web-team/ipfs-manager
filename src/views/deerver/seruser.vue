<template>
  <div class="contenta content" >
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
      <el-breadcrumb-item>
        <span>主机监控项</span>
        <!-- <span style="color:#b9bec9;fontSize: 18px;marginLeft: -0.1rem">主机监控项</span> -->
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div>
      <div class="head">
        <div class="total">
          <span style="fontSize:20px;color:#5ac4a9">主机:{{machine_id}}</span>
          共{{sernum}}个监控项
        </div>
        <div class="updatetime">
          最近更新时间{{gettime}}
          <span>更新周期5min</span>
        </div>
      </div>
      <div class="intermediate">
        <div class="intermediate_item" v-for="(item, index) in mearr" :key="index">
          <div :id="`chartexample${index}`" class="chartexample" :ref="`chartexample${index}`"></div>
          <div
            class="doop"
            @click="go_userlist(machine_id,item.serve_name,item.sertype,item.ylistnum,v_name)"
          >查看详情</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
import { get_all_machine_info2 } from "../../servers/api";
import { getlocaltimes, settime, getymdtime } from "../../servers/sevdate";

export default {
  data() {
    return {
      len: [],
      machine_id: "",
      gettime: "",
      sernum: 0,
      mearr: [],
      TemporaryObj: {},
      timeName: [],
      msg: "",
      myChart: "",
      v_name: ""
    };
  },
  mounted() {
    this.machine_id = JSON.parse(sessionStorage.getItem("machine_id"));
    this.v_name = JSON.parse(sessionStorage.getItem("v_name"));
    this.requestdata(this.machine_id, 0, 0);
  },

  methods: {
    goback() {
      this.$router.go(-1);
    },
    /*请求数据*/
    requestdata(uid, uday, utype, mark) {
      let params = new Object();
      params.machine_id = uid;
      params.day = uday;
      params.type_of_data = utype;

      get_all_machine_info2(params)
        .then(res => {
          if (res.status == 0) {
            if (!mark) {
              if (utype == 0) {
                let obj = {};
                obj.ylist = [];
                obj.xtime = [];
                obj.serve_name = "cpu使用率";
                obj.sertype = params.type_of_data;
                obj.ylistnum = 0;
                res.data.cpu_status.cpu_us.forEach((item, index) => {
                  obj.ylist.push(item.toFixed(2));
                  obj.xtime.push(getlocaltimes((res.data.server_time -= 300)));
                });
                obj.xtime.reverse();
                this.mearr.push(obj);
              } else if (utype == 1) {
                let obj = {};
                obj.ylist = [];
                obj.xtime = [];
                obj.serve_name = "内存使用率";
                obj.sertype = params.type_of_data;
                obj.ylistnum = 0;
                // obj.ylist = res.data.mem_status.mem_free;
                res.data.mem_status.mem_free.forEach((item, index) => {
                  obj.ylist.push(
                    (
                      (res.data.mem_status.mem_total - item) /
                      res.data.mem_status.mem_total
                    ).toFixed(2)
                  );
                  obj.xtime.push(getlocaltimes((res.data.server_time -= 300)));
                });
                obj.xtime.reverse();
                this.mearr.push(obj);
              } else if (utype == 2) {
                if (res.data.disk_status.length == 1) {
                  let obj = {};
                  obj.ylist = [];
                  obj.xtime = [];
                  obj.serve_name = "磁盘使用率";
                  obj.sertype = params.type_of_data;
                  obj.ylistnum = 0;
                  //obj.ylist = res.data.disk_status[0].avail;
                  res.data.disk_status[0].avail.forEach((item, index) => {
                    obj.ylist.push(
                      (
                        (res.data.disk_status[0].size - item) /
                        res.data.disk_status[0].size
                      ).toFixed(2)
                    );
                    obj.xtime.push(
                      getlocaltimes((res.data.server_time -= 300))
                    );
                  });
                  obj.xtime.reverse();
                  this.mearr.push(obj);
                } else {
                  res.data.disk_status.forEach((item, index) => {
                    let obj = {};
                    obj.ylist = [];
                    obj.xtime = [];
                    obj.serve_name = "磁盘" + index;
                    obj.sertype = params.type_of_data;
                    obj.ylistnum = index;
                    // obj.ylist = res.data.disk_status[index].avail;
                    res.data.disk_status[index].avail.forEach(
                      (items, indexs) => {
                        obj.ylist.push(
                          (
                            (res.data.disk_status[index].size - items) /
                            res.data.disk_status[index].size
                          ).toFixed(2)
                        );
                        obj.xtime.push(
                          getlocaltimes((res.data.server_time -= 300))
                        );
                      }
                    );
                    obj.xtime.reverse();

                    this.mearr.push(obj);
                  });
                }
              } else if (utype == 3) {
                if (res.data.network_status.length == 1) {
                  let obj = {};
                  obj.ylist = [];
                  obj.xtime = [];
                  obj.serve_name = "网络接口" + index;
                  obj.sertype = params.type_of_data;
                  obj.ylistnum = 0;
                  obj.ylist = res.data.network_status[0].net_in_rate;
                  res.data.network_status[0].net_in_rate.forEach(
                    (item, index) => {
                      obj.xtime.push(
                        getlocaltimes((res.data.server_time -= 300))
                      );
                    }
                  );
                  obj.xtime.reverse();
                  this.mearr.push(obj);
                } else {
                  res.data.network_status.forEach((item, index) => {
                    let obj = {};
                    obj.ylist = [];
                    obj.xtime = [];
                    obj.serve_name = "网络接口" + index;
                    obj.sertype = params.type_of_data;
                    obj.ylistnum = index;
                    obj.ylist = res.data.network_status[index].net_in_rate;
                    res.data.network_status[index].net_in_rate.forEach(
                      (item, index) => {
                        obj.xtime.push(
                          getlocaltimes((res.data.server_time -= 300))
                        );
                      }
                    );
                    obj.xtime.reverse();
                    this.mearr.push(obj);
                  });
                }
              }
              this.sernum = this.mearr.length;
              this.gettime = getymdtime(res.data.server_time);
              if (utype <= 3) {
                utype++;

                this.requestdata(uid, 0, utype);
              } else {
                this.mearr.forEach((item, index) => {
                  if (item.xtime && item.ylist) {
                    this.ecma(item.sertype, item.serve_name, index, item);
                  }
                });
              }
            } else {
              if (mark.sertype == 0) {
                mark.nedata =
                  res.data.cpu_status.cpu_us[
                    res.data.cpu_status.cpu_us.length - 1
                  ];
                mark.nedate = getlocaltimes(res.data.server_time);
              } else if (mark.sertype == 1) {
                mark.nedata =
                  res.data.mem_status.mem_free[
                    res.data.mem_status.mem_free.length - 1
                  ];
                mark.nedate = getlocaltimes(res.data.server_time);
              } else if (mark.sertype == 2) {
                mark.nedate =
                  res.data.disk_status[mark.ylistnum].avail[
                    res.data.disk_status[mark.ylistnum].avail.length - 1
                  ];
                mark.nedate = getlocaltimes(res.data.server_time);
              } else if (mark.sertype == 3) {
                mark.nedata =
                  res.data.network_status[mark.ylistnum].net_in_rate[
                    res.data.network_status[mark.ylistnum].net_in_rate.length -
                      1
                  ];
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
    go_userlist(servid, sername, sertype, listnum, vname) {
      sessionStorage.setItem("machine_id", JSON.stringify(servid));
      sessionStorage.setItem("serve_name", JSON.stringify(sername));
      sessionStorage.setItem("serve_sertype", JSON.stringify(sertype));
      sessionStorage.setItem("ylistnum", JSON.stringify(listnum));
      sessionStorage.setItem("v_name", JSON.stringify(vname));
      this.$router.push({
        path: "/userlist",
        query: {
          machine_id: servid,
          serve_name: sername,
          serve_sertype: sertype,
          ylistnum: listnum,
          v_name: vname
        }
      });
    },
    /*图表 */
    ecma(id, titletext, num, items) {
      let newArr_xtime = items.xtime;
      let newArr_ylist = items.ylist.filter(item => {
        return item >= 0;
      });

      setTimeout(() => {
        let myChart = echarts.init(
          document.getElementById("chartexample" + num)
        );
        let option = {
          // 线的颜色
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
          // tooltip: {
          //   trigger: "axis"
          // },

          tooltip: {
            trigger: "axis",
            formatter: function(data) {
              if (id == 0 || id == 1 || id == 2) {
                return (
                  data[0].name +
                  "<br/>" +
                  titletext +
                  "：" +
                  data[0].value +
                  "%"
                ); //将小数转化为百分数显示
              } else if (id == 3) {
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
              // data: this.mearr[num].map(function(item) {
              //   return item.xtime;
              // }),
              data: newArr_xtime,
              //设置轴线的属性
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
          //可添加多条折线
          series: [
            {
              type: "line",
              showSymbol: false,
              data: newArr_ylist
              //data: arra
            }
          ],
          // backgroundColor: "#393948"
          backgroundColor: "#eeeeee"
        };
        let that = this;

        that.timeName[num] = setInterval(function() {
          that.requestdata(that.machine_id, 0, items.sertype, items);
          let newArr_xtime = items.xtime;
          let newArr_ylist = items.ylist.filter(item => {
            return item >= 0;
          });

          setTimeout(() => {
            items.ylist.shift();
            // items.ylist.push(Math.floor(Math.random() * 100));
            items.ylist.push(items.nedata);
            items.xtime.shift();
            // items.xtime.push(that.len[num]++);
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
          });
        }, 450000);
        myChart.setOption(option);
        this.$forceUpdate();
        //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
        addEventListener("resize", function() {
          myChart.resize();
        });
      });
    }
  },
  //离开页面时清除所有定时器
  beforeDestroy() {
    this.mearr.forEach((item, index, arr) => {
      clearInterval(this.timeName[index]);
    });
  }
};
</script>
<style lang="scss" scoped>
.contenta {
  width: 100%;
  min-width: 1920px;
  height: 100%;
  // background-color: #272731;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  // overflow-x: auto;
  .head {
    width: 100%;
    color: #ffffff;
    display: flex;
    justify-content: space-between;
    line-height: 40px;
    padding-left: 80px;
    // padding-right: 12%;
    max-width: 1920px;
    .total {
      font-size: 20px;
    }
    .updatetime {
      color: #b6b6b6;
      font-size: 18px;
      padding-right: 0.4rem;
      span {
        margin-left: 10px;
        color: #ffffff;
        font-size: 20px;
      }
    }
  }
  .intermediate {
    // width: 100%;
    width: 1920px;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .intermediate_item {
      margin: 0 80px;
      margin-bottom: 20px;
      position: relative;
      .chartexample {
        width: 800px;
        height: 400px;
        div {
          width: 800px;
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


