<template>
  <div class="content">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>
        <span>服务器监控</span>
        <!-- <span style="color:#000000;fontSize: 18px;">首页&nbsp;&gt;</span> -->
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <span>主机清单</span>
        <!-- <span style="color:#b9bec9;fontSize: 18px;marginLeft: -0.1rem">主机清单</span> -->
      </el-breadcrumb-item>
    </el-breadcrumb>
    <!-- <div class="top_time">最近更新时间：{{updatetime}}</div> -->
    <el-table :data="tableData" style="width: 100%;background: #ffffff;">
      <el-table-column
        v-for="(item, index) in tableDataHeader"
        :key="index"
        :prop="item.prop"
        :label="item.col"
        style="width: 100%;textAlign: center;"
      ></el-table-column>
      <el-table-column prop="details" width="200">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import echarts from "echarts";
import { get_cur_machine_info2, get_machine } from "../../servers/api";
import { getlocaltimes, getymdtime } from "../../servers/sevdate";

export default {
  data() {
    return {
      sevid: [],
      updatetime: "", //更新时间
      tableData: [],
      tableDataHeader: [],
      machine_id_list: [],
      num_of_host: [],
      mdaklm: [],
      regularUpdate: ""
    };
  },
  mounted() {
    this.requestdata();
    this.regularUpdate = setInterval(() => {
      this.requestdata();
    }, 450000);
  },
  methods: {
    handleClick(id) {
      sessionStorage.setItem("machine_id", JSON.stringify(id.conip));
      // sessionStorage.setItem("v_name", JSON.stringify(name));
      this.$router.push({
        path: "/seruser",
        query: { machine_id: id.conip }
      });
    },
    mde(result, dec) {
      var arr = [];
      for (var i = 0; i < result.length; ) {
        var count = 0;
        for (var j = i; j < result.length; j++) {
          if (result[i][dec] === result[j][dec]) {
            count++;
          }
        }
        arr.push({
          date: result[i][dec],
          count: count
        });
        i += count;
      }

      this.num_of_host = arr;
    },

    /*请求数据*/
    requestdata() {
      get_machine()
        .then(res => {
          if (res.status == 0) {
            sessionStorage.setItem("machine_id", JSON.stringify(res.data[0]));
            this.machine_id_list = [];
            res.data.forEach((item, index) => {
              this.machine_id_list.push(item);
            });
            let params = new Object();
            params.machine_id = this.machine_id_list;

            get_cur_machine_info2(params)
              .then(res => {
                if (res.status == 0) {
                  this.tableDataHeader = [];
                  this.tableData = [];
                  res.data.forEach((item, index) => {
                    if (index == 0) {
                      let obj0 = {};
                      obj0.col = "ip";
                      obj0.prop = "conip";
                      this.tableDataHeader.push(obj0);
                      let obj1 = {};
                      obj1.col = "cpu数量";
                      obj1.prop = "cpunum";
                      this.tableDataHeader.push(obj1);
                      let obj2 = {};
                      obj2.col = "cpu空闲量";
                      obj2.prop = "cpuid";
                      this.tableDataHeader.push(obj2);
                      let obj3 = {};
                      obj3.col = "内存";
                      obj3.prop = "mem_total";
                      this.tableDataHeader.push(obj3);
                      let obj4 = {};
                      obj4.col = "可用内存";
                      obj4.prop = "mem_free";
                      this.tableDataHeader.push(obj4);
                      if (item.disk_status.length <= 1) {
                        item.disk_status.forEach((items, indexsd) => {
                          let diskobj = {};
                          diskobj.col = "磁盘可用容量";
                          diskobj.prop = "avail" + indexsd;
                          this.tableDataHeader.push(diskobj);
                        });
                      } else {
                        item.disk_status.forEach((items, indexsd) => {
                          let diskobj = {};
                          diskobj.col = "磁盘" + indexsd + "可用容量";
                          diskobj.prop = "avail" + indexsd;
                          this.tableDataHeader.push(diskobj);
                        });
                      }
                      item.network_status.forEach((itemarr, indexx) => {
                        let networkobj1 = {};
                        networkobj1.col = "网卡" + indexx + "每秒接受字节";
                        networkobj1.prop = "disk1" + indexx;
                        this.tableDataHeader.push(networkobj1);
                        let networkobj2 = {};
                        networkobj2.col = "网卡" + indexx + "每秒发送字节";
                        networkobj2.prop = "disk2" + indexx;
                        this.tableDataHeader.push(networkobj2);
                        let networkobj3 = {};
                        networkobj3.col = "网卡" + indexx + "每秒接受包";
                        networkobj3.prop = "disk3" + indexx;
                        this.tableDataHeader.push(networkobj3);
                        let networkobj4 = {};
                        networkobj4.col = "网卡" + indexx + "每秒发送包";
                        networkobj4.prop = "disk4" + indexx;
                        this.tableDataHeader.push(networkobj4);
                      });
                    }
                    let serverdata = {};
                    serverdata.conip = item.machine_id;
                    serverdata.cpunum = item.cpu_status.cpu_num;
                    serverdata.cpuid = item.cpu_status.cpu_id.toFixed(2) + "%";
                    serverdata.mem_total = item.mem_status.mem_total;
                    serverdata.mem_free = item.mem_status.mem_free;
                    item.disk_status.forEach((items, index) => {
                      serverdata["avail" + index] = items.avail.toFixed(2);
                    });
                    item.network_status.forEach((itemarr, index) => {
                      serverdata["disk1" + index] = itemarr.net_in_rate.toFixed(
                        2
                      );
                      serverdata[
                        "disk2" + index
                      ] = itemarr.net_out_rate.toFixed(2);
                      serverdata[
                        "disk3" + index
                      ] = itemarr.net_in_package.toFixed(2);
                      serverdata[
                        "disk4" + index
                      ] = itemarr.net_out_package.toFixed(2);
                    });
                    // let marnum = {};
                    // marnum.col = "主机运行微服务数量";
                    // marnum.prop = "marnums";
                    // this.tableDataHeader.push(marnum);
                    this.tableData.push(serverdata);
                  });
                  this.$forceUpdate();
                  // this.mde(this.tableData, "conip");
                  //  this.tableData.forEach((item,index)=>{
                  //   //  if(item.conip==this.num_of_host.conip){
                  //  item.marnums=this.num_of_host.count;
                  //}
                  //  })
                }
              })
              .catch(error => {});
          }
        })
        .catch(error => {
        });
    }
    /*路由跳转*/
    // handleClick(id) {
    //   this.$router.push({
    //     path: "/microservicepreview",
    //     query: { server_id: id.microserviceid }
    //   });
    // }
  },
  beforeDestroy() {
    clearInterval(this.regularUpdate);
  }
};
</script>
<style lang="scss" scoped>
/deep/.el-table_1_column_1 {
  text-align: center;
}
/deep/ .el-table .cell {
  text-align: center;
}

#sss {
  color: red !important;
}
.content {
  width: 100%;
  // background-color: #272731;
  margin-top: 10px;
  .top_time {
    // background-color: #272731;
    color: rgb(56, 74, 241);
    text-align: right;
    padding-right: 10px;
    padding-bottom: 10px;
  }
}
.setscolorround {
  color: green;
}
.getscolorround {
  color: red;
}
</style>
