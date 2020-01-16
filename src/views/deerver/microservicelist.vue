<template>
  <div class="content">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item >
         <span>服务器监控</span>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <span>微服务清单</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div class="top_time">最近更新时间：{{updatetime}}</div>
    <el-table
      :data="tableData"
      :span-method="objectSpanMethod"
      border
      style="width: 100%;background: #ffffff"
      height="750"
    >
      <el-table-column prop="machine_id" label="主机"></el-table-column>
      <el-table-column prop="server_name" label="微服务"></el-table-column>
      <el-table-column prop="server_type" label="微服务类型" width="100%"></el-table-column>
      <el-table-column prop="server_id" label="微服务ID" width="200"></el-table-column>
      <el-table-column prop="serverstatus" label="微服务状态" width="100%">
        <template slot-scope="scope">
          <div style="color:green" v-if="scope.row.server_status==1">正常</div>
          <div style="color:red" v-else>异常</div>
        </template>
      </el-table-column>
      <el-table-column prop="process_id" label="进程ID" width="200"></el-table-column>
      <el-table-column prop="cpu" label="CPU占比" width="100%"></el-table-column>
      <el-table-column prop="memory" label="内存占比" width="100%"></el-table-column>
      <el-table-column prop="recv_bytes" label="每秒接收字节" width="200"></el-table-column>
      <el-table-column prop="send_bytes" label="每秒发送字节" width="200"></el-table-column>
      <el-table-column prop="recv_package" label="每秒接收包" width="200"></el-table-column>
      <el-table-column prop="send_package" label="每秒发送包" width="200"></el-table-column>
      <el-table-column prop="details" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import echarts from "echarts";
import { get_curprocess, get_ser } from "../../servers/api";
import { getlocaltimes, getymdtime } from "../../servers/sevdate";
export default {
  data() {
    return {
      sevid: [],
      updatetime: "", //更新时间
      sec_machine: [],
      judgearray: [],
      position: 0,
      rowSpanArr: [],
      tableData: [],
      regularUpdatemic: ""
    };
  },
  mounted() {
    this.requestdata();
    this.regularUpdatemic = setInterval(() => {
      this.requestdata();
    }, 22000);
  },
  methods: {
    qu(arr, str) {
      var _arr = [],
        _t = [],
        // 临时的变量
        _tmp;

      // 按照特定的参数将数组排序将具有相同值得排在一起
      arr = arr.sort(function(a, b) {
        var s = a[str],
          t = b[str];

        return s < t ? -1 : 1;
      });

      if (arr.length) {
        _tmp = arr[0][str];
      }

      // 将相同类别的对象添加到统一个数组
      for (var i in arr) {
        if (arr[i][str] === _tmp) {
          _t.push(arr[i]);
        } else {
          _tmp = arr[i][str];
          _arr.push(_t);
          _t = [arr[i]];
        }
      }
      // 将最后的内容推出新数组
      _arr.push(_t);
      // return _arr;
      let ma = [];
      _arr.forEach(item => {
        ma = ma.concat(item);
      });
      this.tableData = ma;
      this.getRowSpan();
    },

    /*请求数据*/
    requestdata() {
      get_ser()
        .then(res => {
          if (res.status == 0) {
            this.sevid = [];
            this.sec_machine = [];
            res.data.forEach((item, index) => {
              this.sevid.push(item.server_id);
              let machineobj = {};
              machineobj.server_id = item.server_id;
              machineobj.machine_id = item.machine_id;
              this.sec_machine.push(machineobj);
            });
            let params = new Object();
            params.server_id = this.sevid;
            get_curprocess(params)
              .then(res => {
                if (res.status == 0) {
                  this.judgearray = [];
                  res.data.forEach((item, index) => {
                    let came = {};
                    came.id = index;
                    came.server_name = item.info.server_name;
                    came.server_id = item.info.server_id;
                    came.server_type = item.info.server_type;
                    came.process_id = item.info.process_status.process_id;
                    came.cpu = item.info.process_status.cpu.toFixed(2) + "%";
                    came.memory =
                      item.info.process_status.memory.toFixed(2) + "%";
                    came.recv_bytes =
                      item.info.process_status.recv_bytes + "KB";
                    came.send_bytes =
                      item.info.process_status.send_bytes + "KB";
                    came.recv_package = item.info.process_status.recv_package;
                    came.send_package = item.info.process_status.send_package;
                    came.server_status = item.server_status;
                    this.judgearray.push(came);
                  });
                  this.updatetime = getymdtime(res.data[0].last_updatetime);
                  this.sec_machine.forEach((item, index) => {
                    if (item.server_id == this.judgearray[index].server_id) {
                      this.judgearray[index].machine_id = item.machine_id;
                    }
                  });
                  this.qu(this.judgearray, "machine_id");
                  this.$forceUpdate();
                }
              })
              .catch(error => {});
          }
        })
        .catch(error => {
        });
    },
    // 获取合并的数组
    getRowSpan() {
      this.rowSpanArr = [];
      this.tableData.forEach((item, index) => {
        if (index == 0) {
          this.rowSpanArr.push(1);
          this.position = 0;
        } else {
          if (
            this.tableData[index].machine_id ==
            this.tableData[index - 1].machine_id
          ) {
            this.rowSpanArr[this.position] += 1; //项目名称相同，合并到同一个数组中
            this.rowSpanArr.push(0);
            this.tableData[index].machine_id = this.tableData[
              index - 1
            ].machine_id;
          } else {
            this.rowSpanArr.push(1);
            this.position = index;
          }
        }
      });
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      // 只合并区域位置
      if (columnIndex === 0) {
        const _row = this.rowSpanArr[rowIndex];
        return {
          rowspan: _row, //行
          colspan: 1 //列
        };
      }
    },

    /*路由跳转*/
    handleClick(id) {
      this.$router.push({
        path: "/microservicepreview",
        query: { server_id: id.server_id, sername: id.server_name }
      });
    }
  },
  beforeDestroy() {
    clearInterval(this.regularUpdatemic);
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


