<template>
  <div id="content" class="content">
    <div class="head">
      <div class="total">共{{num}}个微服务</div>
      <!-- <div class="updatetime">
        最近更新时间{{updatetime}}
        <span>更新周期5min</span>
      </div>-->
    </div>
    <div class="conten">
      <div class="server_item" v-for="(item,index) in serverlist" v-bind:key="index">
        <div class="server_name">
          <span  style="display: inline-block;max-width: 75%;overflow: hidden;">{{item.host_server_name}}</span>
          <div style="display: flex;alignItems: center;">
            <span v-bind:style="{background:item.spancolor}" id="yun"></span>
            <span style=" marginRight: 0.05rem;">{{item.serst}}</span>
          </div>
        </div>
        <div id="comname">微服务占用主机信息预览</div>
        <div class="ringdiagram">
          <div class="ringdiagram_item">
            <el-progress
              type="circle"
              color="#eeeeee"
              backgroudcolor="#000"
              :width="90"
              :stroke-width="6"
              :percentage="item.host_cpu*1"
            ></el-progress>
            <p>CPU</p>
          </div>
          <!-- <div class="ringdiagram_item disk">
            <el-progress
              type="circle"
              color="#4B7AF2"
              :width="90"
              :stroke-width="6"
              :percentage="item.disk*1"
            ></el-progress>
            <div class="otetxt">{{item.disk_usedspace}}TB/{{item.disk_totalspace}}TB</div>
            <p class="ohtxt">磁盘</p>
          </div>-->
          <div class="ringdiagram_item ram">
            <el-progress
              type="circle"
              color="#FB497C"
              :width="90"
              :stroke-width="6"
              :percentage="item.host_memory*1"
            ></el-progress>
            <!-- <div class="otetxt">{{item.ram_usedspace}}GB/{{item.ram_usedspace}}GB</div> -->
            <p class="ohtxt">内存</p>
          </div>
          <ol>
            <li>
              <span>进程接收字节:</span>
              <span>{{item.host_recv_bytes}}</span>
            </li>
            <li>
              <span>进程发送字节:</span>
              <span>{{item.host_send_bytes}}</span>
            </li>
            <li>
              <span>进程接收包:</span>
              <span>{{item.host_recv_package}}</span>
            </li>
            <li>
              <span>进程发送包:</span>
              <span>{{item.host_send_package}}</span>
            </li>
            <li id="mostother" @click="go_microserviceprocess(servueidlist)">
              <span>查看更多>></span>
            </li>
          </ol>
        </div>
        <p id="comname" style="width:100%,textAlign:center;">主机信息预览</p>
        <div class="ringdiagram">
          <div class="ringdiagram_item">
            <el-progress
              type="circle"
              color="#FFC760"
              backgroudcolor="#000"
              :width="90"
              :stroke-width="6"
              :percentage="item.cpu*1"
            ></el-progress>
            <p>CPU</p>
          </div>
          <div class="ringdiagram_item ram">
            <el-progress
              type="circle"
              color="#FB497C"
              :width="90"
              :stroke-width="6"
              :percentage="item.ram*1"
            ></el-progress>
            <div class="otetxt">{{item.ram_usedspace}}GB/{{item.ram_usedspace}}GB</div>
            <p class="ohtxt">内存</p>
          </div>
        </div>
        <ol>
          <li>
            <span>IP：</span>
            <span>{{item.machine_id}}</span>
          </li>
          <li>
            <span>磁盘数量：</span>
            <span>{{item.disknum}}</span>
          </li>
          <li>
            <span>网卡数量：</span>
            <span>{{item.networknum}}</span>
          </li>
          <li id="mostother" @click="go_label(item.server_id,item.host_server_name)">
            <span>查看更多>></span>
          </li>
        </ol>
        <div class="details" @click="go_details(item.machine_id,item.host_server_name)">主机详情</div>
        <!-- <InputItem
          inputType="text"
          textName="姓名"
          placeholder="必填"
          @inputChanged="inputChangedMer($event)"
        ></InputItem>-->
      </div>
    </div>
  </div>
</template>
<script>
import { get_ser, get_curmachine, get_curprocess } from "../../servers/api";
export default {
  props: ["obj"],
  data() {
    return {
      mercode: "",
      updatetime: "", //更新时间
      servueid: 0,
      servueidlist: [],
      serverlist: [],
      temporary: [],
      num: "",
      serstatus: [],
      regularUpdates: ""
    };
  },
  watch: {
    // mercode(newname, oldname) {
    //   return this.$store.dispatch("getChangedFoor", newname);
    // },
    // deep: true
  },
  computed: {
    // name_foor: function() {
    //   return this.$store.getters.getChangedFoor;
    // }
  },
  mounted() {
    this.requestdata();
    this.regularUpdates = setInterval(() => {
      this.requestdata();
    }, 450000);
  },
  methods: {
    //输入框事件监听
    inputChangedMer: function(e) {
      this.mercode = e.target.value;
    },
    go_label(serverip) {
      this.$router.push({
        path: "/userlable",
        query: { server_id: serverip }
      });
    },
    /*请求数据*/
    requestdata() {
      //获取服务器id
      get_ser()
        .then(res => {
          if (res.status == 0) {
            //默认存第一个id，避免直接点击子菜单无数据
            sessionStorage.setItem(
              "server_id",
              JSON.stringify(res.data[0].server_id)
            );
            sessionStorage.setItem(
              "v_name",
              JSON.stringify(res.data[0].server_name)
            );
            this.servueidlist = [];
            this.serstatus = [];
            res.data.forEach((item, index) => {
              this.servueidlist.push(item.server_id);
              let obj = {};
              obj.serid = item.server_id;
              if (item.server_status === 1) {
                obj.spancolor = "green";
                obj.serst = "正常";
              } else {
                obj.spancolor = "red";
                obj.serst = "异常";
              }
              this.serstatus.push(obj);
            });
            sessionStorage.setItem("sevid", JSON.stringify(this.servueidlist));
            //获取当前服务器进程状态信息
            let params = new Object();
            params.server_id = this.servueidlist;
            get_curmachine(params)
              .then(res => {
                if (res.status == 0) {
                  this.temporary = [];
                  this.num = "";
                  res.data.forEach((item, index) => {
                    let temporarily = {};
                    let diskusedspace = 0;
                    let disktotalspace = 0;
                    temporarily.server_id = item.server_id;
                    temporarily.machine_id = item.machine_id;
                    temporarily.cpu = (
                      1 -
                      (item.cpu_status.cpu_id * 1) / 100
                    ).toFixed(2);
                    temporarily.ram = (
                      (item.mem_status.mem_total - item.mem_status.mem_free) /
                      item.mem_status.mem_total
                    ).toFixed(2);
                    temporarily.ram_usedspace = (
                      (item.mem_status.mem_total - item.mem_status.mem_free) /
                      1024 /
                      1024
                    ).toFixed(2);
                    temporarily.ram_totalspace = (
                      item.mem_status.mem_total /
                      1024 /
                      1024
                    ).toFixed(2);
                    temporarily.disknum = item.disk_status.length;
                    temporarily.networknum = item.network_status.length;
                    this.temporary.push(temporarily);
                    this.num = this.temporary.length;
                  });
                }
              })
              .then(() => {
                get_curprocess(params)
                  .then(res => {
                    if (res.status == 0) {
                      this.temporary.forEach((item, index) => {
                        if ((item.server_id = res.data[index].info.server_id)) {
                          item.host_server_name =
                            res.data[index].info.server_name;
                          item.host_cpu =
                            res.data[index].info.process_status.cpu.toFixed(2) *
                            1;
                          item.host_memory = res.data[
                            index
                          ].info.process_status.memory.toFixed(2);
                          item.host_recv_bytes =
                            res.data[index].info.process_status.recv_bytes;
                          item.host_send_bytes =
                            res.data[index].info.process_status.send_bytes;
                          item.host_recv_package =
                            res.data[index].info.process_status.recv_package;
                          item.host_send_package =
                            res.data[index].info.process_status.send_package;
                        }
                      });
                      this.temporary.forEach((item, index) => {
                        if (item.server_id == this.serstatus[index].serid) {
                          item.spancolor = this.serstatus[index].spancolor;
                          item.serst = this.serstatus[index].serst;
                        }
                      });

                      this.serverlist = this.temporary;
                      this.$forceUpdate();
                    }
                  })
                  .catch(error => {});
              })
              .catch((error = {}));
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
    go_microserviceprocess(id, name) {
      //base64转码
      let sevid = window.btoa(id);

      this.$router.push({
        path: "/microservicelist",
        query: { server_id: sevid, id, v_name: name }
      });
    },
    go_details(id, name) {
      sessionStorage.setItem("machine_id", JSON.stringify(id));
      sessionStorage.setItem("v_name", JSON.stringify(name));
      this.$router.push({
        path: "/seruser",
        query: { machine_id: id, v_name: name }
      });
    }
  },
  beforeDestroy() {
    clearInterval(this.regularUpdates);
  }
};
</script>
<style lang="scss" scoped>
.el-progress /deep/ path:first-child {
  stroke: #e3e3e3;
}
/deep/.el-progress--circle .el-progress__text,
.el-progress--dashboard .el-progress__text {
  color: #000000;
  font-size: 18px !important;
  opacity: 0.9;
}
/deep/ .el-progress__text {
  top: 50%;
}
#content {
  width: 100%;
  min-width: 1920px;
  height: auto;
  // background-color: #272731;
  .head {
    width: 100%;
    color: #000000;
    display: flex;
    justify-content: space-between;
    line-height: 30px;
    padding-left: 2%;
    padding-right: 6%;
    .total {
      font-size: 20px;
    }
    .updatetime {
      color: #b6b6b6;
      font-size: 14px;
      span {
        margin-left: 10px;
        color: #000000;
        font-size: 14px;
      }
    }
  }
  .conten {
    width: 100%;
    margin: auto;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .server_name {
      color: #000000;
      font-size: 18px;
      line-height: 1rem;
      text-align: left;
      margin: 1rem 0 0.5rem 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      #yun {
        display: inline-block;
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
        margin-right: 0.2rem;
      }
    }
    .server_item {
      width: 17rem;
      max-width: 330px;
      background: #ffffff;
      box-shadow: 0px 0px 80px 0px rgba(31, 32, 41, 0.07);
      border-radius: 16px;
      margin: 0 2%;
      margin-top: 2rem;
      #comname {
        margin: 0.5rem 0 0.5rem 1rem;
        width: 100%;
        text-align: left;
        color: #4e9b7b;
      }
      .ringdiagram {
        width: 100%;
        margin: 0 auto;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        align-items: center;
        .ringdiagram_item {
          width: 50%;
          margin: 0 auto;
          position: relative;
          text-align: center;
          .otetxt {
            font-size: 10px;
            position: relative;
            top: -38px;
          }
          span {
            font-size: 10px;
            color: #58deb6;
            border-bottom: 1px solid #58deb6;
            display: inline-block;
            position: absolute;
            top: 38%;
            left: 44%;
          }
          .micaoer {
            left: 45%;
          }
          .microser {
            top: 16%;
            left: 45%;
            border: none;
            font-size: 0.15rem;
            font-size: 22px;
          }
          p {
            margin: 0.05rem 0 0.05rem;
            color: #000000;
            font-size: 14px;
            opacity: 0.95;
          }
          .ohtxt {
            margin-top: 0;
          }
        }
        .disk {
          span {
            width: 100%;
            text-align: center;
            display: inline-block;
            color: #c4c4c4;
            border: none;
          }
        }
        .ram {
          span {
            color: #c4c4c4;
            border: none;
            width: 100%;
            display: inline-block;
            text-align: center;
          }
        }
      }
      ol {
        width: 90%;
        border-top: 1px solid #75758a;
        border-bottom: 1px solid #75758a;
        padding: 1rem 0;
        margin: 0 5%;
        li {
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          line-height: 1.3rem;
          color: #a4a4a4;
          span {
            font-size: 14px;
          }
          span:first-child {
            color: #000000;
            font-size: 14px;
          }
        }
      }
      .details {
        color: #81a5ff;
        font-size: 14px;
        line-height: 1rem;
        margin: 0.5rem 0;
        text-align: center;
      }
    }
  }
  #mostother {
    width: 100%;
    margin: auto;
    text-align: center;
    // display: flex;
    // justify-content: center;
    // align-items: center;
    span {
      color: #81a5ff;
    }
  }
}
</style>
]\e\u'e\u'ret\ 'urt u'