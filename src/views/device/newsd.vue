<template>
  <div class="content newsd">
    <!-- 面包屑  -->
    <el-breadcrumb separator="/" style="margin-bottom: 20px;">
      <el-breadcrumb-item>设备监控</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a>设备监控详情</a>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <section class="myself-container">
      <div class="device_form">
        <el-form ref="form" :model="form">
          <el-row type="flex" class="row_active row_active_monitor">
            <div>
              <el-input
                v-model="form.dev_sn"
                placeholder="请输入设备SN,节点ID"
              ></el-input>
            </div>
            <div class="seach_top_right" @click="option_display()">
              筛选
              <i
                class="el-icon-caret-bottom"
                :class="[
                  rotate ? 'fa fa-arrow-down go' : 'fa fa-arrow-down aa'
                ]"
              ></i>
            </div>
          </el-row>
        </el-form>
      </div>
      <div v-if="optiondisplay" class="seach_bottom">
        <span>状态：</span>
        <el-select v-model="valuestate" placeholder="请选择" @change="onChange">
          <el-option label="全部" value="-1"></el-option>
          <el-option
            v-for="item in optionstate"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-button
          type="primary"
          style="margin-left:10px;"
          plain
          size="mini"
          @click="getInfo()"
          >确定</el-button
        >
        <el-button plain size="mini" @click="setInfo()">重置</el-button>
      </div>
      <div class="devide_table">
        <el-row type="flex" class="row_active">
          <el-col :span="24">
            <el-table
              :data="tableData"
              style="width: 100%"
              :cell-style="rowClass"
              :header-cell-style="headClass"
            >
              <!-- <el-table-column
                prop="time_stamp"
                label="时间"
                width="180"
              ></el-table-column> -->
              <el-table-column prop="dev_sn" label="设备SN"></el-table-column>
              <el-table-column prop="node_id" label="节点ID"></el-table-column>
              <el-table-column prop="online_status" label="设备状态">
              </el-table-column>
              <el-table-column prop="ipfsc" label="ipfs节点存储"
                ><template slot-scope="scope">
                  <span v-if="scope.row.ipfsc">{{ scope.row.ipfsc }}</span>
                  <span v-else>--</span>
                </template>
              </el-table-column>
              <el-table-column prop="xiyouc" label="西柚机应用存储">
                <template slot-scope="scope">
                  <span v-if="scope.row.xiyouc">{{ scope.row.xiyouc }}</span>
                  <span v-else>--</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="total_cap"
                label="当前使用空间/总空间"
              ></el-table-column>
              <el-table-column label="当前上下行带宽">
                <template slot-scope="scope">
                  <span
                    >{{ scope.row.up_bandwidth }}/{{
                      scope.row.down_bandwidth
                    }}</span
                  >
                </template>
              </el-table-column>
              <el-table-column
                prop="online_time"
                label="当日在线时长"
              ></el-table-column>
              <!-- <el-table-column prop="alarm_status" label="当日安全状态">
                <template slot-scope="scope">
                  <span style="color:red;" v-if="scope.row.alarm_status == '1'"
                    >cpu过热</span
                  >
                  <span
                    style="color:red;"
                    v-else-if="scope.row.alarm_status == '2'"
                    >主板过热</span
                  >
                  <span
                    style="color:red;"
                    v-else-if="scope.row.alarm_status == '3'"
                    >硬盘过热</span
                  >
                  <span
                    style="color:red;"
                    v-else-if="scope.row.alarm_status == '4'"
                    >硬盘剩余空间不足</span
                  >
                  <span
                    style="color:red;"
                    v-else-if="scope.row.alarm_status == '5'"
                    >内存不足</span
                  >
                  <span
                    style="color:red;"
                    v-else-if="scope.row.alarm_status == '9'"
                    >宕机</span
                  >
                  <span
                    style="color:green;"
                    v-else-if="scope.row.alarm_status == '0'"
                    >正常</span
                  >
                </template></el-table-column
              > -->
              <el-table-column label="状态">
                <template slot-scope="scope">
                  <el-button
                    @click="handleButton(scope)"
                    type="text"
                    size="small"
                    >查看详情</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <el-row type="flex" class="row_active">
          <el-col :span="24"> </el-col>
        </el-row>
      </div>
      <div class="devide_pageNation">
        <div class="devide_pageNation_active">
          <el-row type="flex">
            <el-col :span="6">
              <pageNation
                :pager="pager"
                @handleSizeChange="handleSizeChange"
                @handleCurrentChange="handleCurrentChange"
              ></pageNation>
            </el-col>
          </el-row>
        </div>
      </div>
      <el-dialog
        :visible.sync="monitorDetails"
        class="monitor-details"
        :close-on-click-modal="false"
      >
        <div class="monitor-con">
          <div class="monitorDetails-top">
            <!-- <table class="basic-table">
            <tbody>
              <tr>
                <td class="td-title">设备SN</td>
                <td class="td-text">{{details_table.dev_sn}}</td>
                <td class="td-title">CPU温度</td>
                <td class="td-text active">{{details_table.cpu_tem}}</td>
              </tr>
              <tr>
                <td class="td-title">节点ID</td>
                <td class="td-text">{{details_table.node_id}}</td>
                <td class="td-title">主板温度</td>
                <td class="td-text active">{{details_table.mb_tem}}</td>
              </tr>
              <tr>
                <td class="td-title">设备状态</td>
                <td class="td-text">{{details_table.online_status}}</td>
                <td class="td-title">硬盘温度</td>
                <td class="td-text active">{{details_table.hd_tmp}}</td>
              </tr>
              <tr>
                <td class="td-title">当前上行宽带</td>
                <td class="td-text">{{details_table.up_bandwidth}}</td>
                <td class="td-title">内存占用</td>
                <td class="td-text active">{{details_table.mem_ratio}}</td>
              </tr>
              <tr>
                <td class="td-title">当日在线时长</td>
                <td class="td-text">{{details_table.online_time}}</td>
              </tr>
            </tbody>
            </table>-->
            <table
              border="1"
              cellpadding="18"
              cellspacing="0"
              width="100%"
              style="text-align: center;margin: 10px 0;"
            >
              <tr>
                <td class="device_title_name">设备SN</td>
                <td class="device_title_content">{{ details_table.dev_sn }}</td>
                <td class="device_title_name">当前上/下行宽带</td>
                <td class="device_title_content">
                  {{ details_table.up_bandwidth }}/{{
                    details_table.down_bandwidth
                  }}
                </td>
                <!-- <td class="device_title_name">主板温度</td>
                <td class="device_title_content">{{ details_table.mb_tem }}</td> -->
                <td class="device_title_name">当前使用空间/总空间</td>
                <td class="device_title_content">
                  {{ details_table.total_cap }}
                </td>
              </tr>
              <tr>
                <td class="device_title_name">节点ID</td>
                <td class="device_title_content">
                  {{ details_table.node_id }}
                </td>
                <td class="device_title_name">当日在线时长</td>
                <td class="device_title_content">
                  {{ details_table.online_time }}
                </td>
                <td class="device_title_name">硬盘温度</td>
                <td class="device_title_content">{{ details_table.hd_tmp }}</td>
              </tr>
              <tr>
                <td class="device_title_name">设备状态</td>
                <td class="device_title_content">
                  {{ details_table.online_status }}
                </td>
                <td class="device_title_name">CPU温度</td>
                <td class="device_title_content">
                  {{ details_table.cpu_tem }}
                </td>
                <td class="device_title_name">内存占用</td>
                <td class="device_title_content">
                  {{ details_table.mem_ratio }}
                </td>
              </tr>
              <!-- <tr>
                <td></td>
                <td></td>
              </tr> -->
            </table>
          </div>
          <div class="monitorDetails-bottom">
            <div class="searach-con">
              <el-form ref="form" :model="form">
                <el-row type="flex" class="row_active row_active_monitor">
                  <el-form-item label="问题筛选" style="display: flex;">
                    <el-select
                      v-model="value"
                      placeholder="请选择"
                      @change="onChangeActive"
                    >
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <!-- <el-button
                    type="primary"
                    @click="getInfoActive()"
                    style="margin-left:30px;"
                    >查询</el-button
                  > -->
                </el-row>
              </el-form>
            </div>
            <el-table
              :data="tableDataActive"
              style="width: 100%"
              :cell-style="rowClass"
              :header-cell-style="headClass"
            >
              <el-table-column prop="time_stamp" label="时间" width="180">
              </el-table-column>
              <el-table-column prop="dev_sn" label="设备SN" width="180">
              </el-table-column>
              <el-table-column prop="node_id" label="节点ID"> </el-table-column>
              <el-table-column
                prop="cpu_temperature"
                label="当前使用空间/总空间"
              >
                <template slot-scope="scope">
                  <span v-if="!scope.row.user_cap">--</span
                  ><span v-else>{{ scope.row.user_cap }}</span
                  >/<span v-if="!scope.row.total_cap">--</span
                  ><span v-else>{{ scope.row.total_cap }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="upstream_bandwidth"
                label="当前上行/下行宽带"
              >
                <template slot-scope="scope">
                  <span v-if="!scope.row.up_bw">--</span>
                  <span>{{ scope.row.up_bw }}</span
                  >/
                  <span v-if="!scope.row.down_bw">--</span>
                  <span>{{ scope.row.down_bw }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="cpu_tem" label="CPU温度">
                <template slot-scope="scope">
                  <span style="color:red;" v-if="scope.row.cpu_tem >= 80">{{
                    scope.row.cpu_tem + "℃"
                  }}</span>
                  <span v-else>{{ scope.row.cpu_tem + "℃" }}</span>
                </template>
              </el-table-column>
              <!-- <el-table-column prop="mb_tem" label="主板温度">
                <template slot-scope="scope">
                  <span style="color:red;" v-if="scope.row.mb_tem >= 40">{{
                    scope.row.mb_tem + "℃"
                  }}</span>
                  <span v-else>{{ scope.row.mb_tem + "℃" }}</span>
                </template>
              </el-table-column> -->
              <el-table-column prop="hd_tem" label="硬盘温度">
                <template slot-scope="scope">
                  <span style="color:red;" v-if="scope.row.hd_tem >= 40">{{
                    scope.row.hd_tem + "℃"
                  }}</span>
                  <span v-else>{{ scope.row.hd_tem + "℃" }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="mb_tem" label="磁盘剩余容量占比">
                <template slot-scope="scope">
                  <span style="color:red;" v-if="scope.row.cap_ratio <= 50">{{
                    scope.row.cap_ratio + "%"
                  }}</span>
                  <span v-else>{{ scope.row.cap_ratio + "%" }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="mem_ratio" label="内存占比">
                <template slot-scope="scope">
                  <span style="color:red;" v-if="scope.row.mem_ratio >= 80">{{
                    scope.row.mem_ratio + "%"
                  }}</span>
                  <span v-else>{{ scope.row.mem_ratio + "%" }}</span>
                </template>
              </el-table-column>
            </el-table>
            <fenye
              style="text-align: right;margin:20px 0 0 0;"
              @fatherMethod="getpage"
              @fathernum="gettol"
              :pagesa="total_cnt"
              :currentPage="currentPage"
            ></fenye>
          </div>

          <div slot="footer" class="monitor-footer" style>
            <!-- <el-button @click="onClose">取 消</el-button> -->
            <!-- <el-button type="primary" @click="onClose()">确 定</el-button> -->
          </div>
        </div>
      </el-dialog>
    </section>
  </div>
</template>

<script>
import pageNation from "../../comm/pageNation";
import fenye from "@/components/fenye";
import {
  devicelist,
  query_general_info_list,
  query_node_info,
  query_detail_info_list
} from "../../servers/api.js";
import common from "../../comm/js/util";
// import FileSaver from 'file-saver'
// import XLSX from 'xlsx'

export default {
  data() {
    return {
      rotate: false,
      operatingStatus: true,
      operatingStatus1: false,
      monitorDetails: false,
      currentPage: 1,
      rowHeader: [
        // 未做任何格式化处理的数据
        {
          prop: "time_stamp",
          label: "时间",
          width: 150
        },
        {
          prop: "dev_sn",
          label: "设备SN",
          width: 300
        },
        {
          prop: "node_id",
          label: "节点ID"
        },
        {
          prop: "online_status",
          label: "设备状态",
          width: 80
        },
        {
          prop: "total_cap",
          label: "当前使用空间/总空间",
          width: 180
        },
        {
          prop: "up_bandwidth",
          label: "当前上行带宽",
          width: 180
        },
        {
          prop: "online_time",
          label: "当日在线时长",
          width: 100
        },
        {
          prop: "alarm_status_text",
          label: "今日安全状态",
          width: 100
        }
      ],
      rowHeader1: [
        // 未做任何格式化处理的数据
        {
          prop: "time_stamp",
          label: "时间"
        },
        {
          prop: "dev_sn",
          label: "设备SN"
        },
        {
          prop: "node_id",
          label: "节点ID",
          width: 350
        },
        {
          prop: "cpu_tem",
          label: "CPU温度"
        },
        {
          prop: "mb_tem",
          label: "主板温度",
          width: 200
        },
        {
          prop: "hd_tem",
          label: "硬盘温度"
        },
        {
          prop: "mem_ratio",
          label: "内存占用"
        }
      ],
      valuestate: "-1",
      optionstate: [
        {
          value: 0,
          label: "离线"
        },
        {
          value: 1,
          label: "在线"
        }
      ],
      tableDataActive: [],
      tableData: [],
      dev_sn: "",
      tableOption: {
        label: "操作",
        width: 80,
        options: [
          {
            label: "查看详情",
            type: "primary",
            methods: "editOnchange"
          }
        ]
      },
      pager: {
        count: 0,
        page: 0,
        rows: 10
      },
      pagerActive: {
        count: 1,
        page: 0,
        rows: 10
      },
      total_cnt: 1,
      tolpage: 1,
      pagesize: 10,
      form: {
        node_id: "",
        dev_sn: "",
        start_time: "",
        end_time: "",
        alarm_type: "0",
        value1: "",
        value2: ""
      },
      showState: false,
      alertNum: 0,
      dataNum: "8888",
      clomnSelection: false,
      push_key: "",
      options: [
        {
          value: "-1",
          label: "全部"
        },
        {
          value: "1",
          label: "CPU温度报警"
        },
        // {
        //   value: "2",
        //   label: "主板报警温度"
        // },
        {
          value: "3",
          label: "硬盘温度报警"
        },
        {
          value: "4",
          label: "磁盘剩余容量比例报警"
        },
        {
          value: "5",
          label: "内存比例报警"
        }
      ],
      value: "",
      query_type: 0,
      details_table: {
        dev_sn: "",
        node_id: "",
        online_status: "",
        up_bandwidth: "",
        cap_num: 0,
        cpu_tem: "",
        mb_tem: "",
        hd_tmp: ""
      },
      start_time: "",
      end_time: "",
      start_time_active: "",
      end_time_active: "",
      alarm_type: 0,
      alarm_status: "",
      optiondisplay: false
    };
  },
  mounted: function() {
    this.push_key = this.$route.query.push_key;
    this.dataNum = this.tableData.length;
    let nowTimes = new Date(
      new Date(new Date().toLocaleDateString()).getTime() +
        24 * 60 * 60 * 1000 -
        1
    );

    let befDate = new Date(nowTimes - 1 * 24 * 3600 * 1000);
    let befDateActive = new Date(nowTimes.getTime() - 1 * 24 * 3600 * 1000);
    (this.end_time = Math.round(nowTimes.getTime() / 1000)),
      // this.end_time_active = Math.round(nowTimes.getTime() / 1000),
      (this.start_time = Math.round(befDate.getTime() / 1000)),
      // this.start_time_active = Math.round(befDateActive.getTime() / 1000),
      this.queryInfo();
  },
  methods: {
    //获取页码
    getpage(pages) {
      this.currentPage = pages;
      this.queryDevInfo();
    },
    //获取每页数量
    gettol(pagetol) {
      this.pagesize = pagetol;
      this.queryDevInfo();
    },
    onClose() {
      this.monitorDetails = false;
      // this.form.value1 = "",
      //     this.form.value2 = "",
      //     this.alarm_status = ""
      // this.value = ""
      // //     this.pagerActive.page = 1
      // // this.pager.page = 1
      // let nowTimes = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1)

      // let befDate = new Date(nowTimes - 1 * 24 * 3600 * 1000)
      // let befDateActive = new Date(nowTimes.getTime() - 1 * 24 * 3600 * 1000)
      // this.end_time = Math.round(nowTimes.getTime() / 1000)
      // this.end_time_active = Math.round(nowTimes.getTime() / 1000)
      // this.start_time = Math.round(befDate.getTime() / 1000)
      // this.start_time_active = Math.round(befDateActive.getTime() / 1000)
    },
    onChange(item) {
      this.form.alarm_type = item;
      this.queryInfo();
    },
    onChangeActive(item) {
      this.alarm_status = item;
      this.queryDevInfo();
    },
    handleButton(val) {
      // this.tolpage = 1;

      this.$forceUpdate(); //强制刷新组件
      this.alarm_status = val.row.alarm_status;
      this.monitorDetails = true;
      this.currentPage = 1;
      this.dev_sn = val.row.dev_sn;
      var nowTime = new Date(val.row.time_stamp);
      let param = new Object();
      param.time_stamp = nowTime.getTime() / 1000 + 24 * 3600 - 1;
      // alert(nowTime.getTime()/1000)
      //  alert(nowTime.getTime()/1000+24*3600-1)
      this.start_time_active = Math.round(nowTime.getTime() / 1000);
      this.end_time_active = Math.round(
        nowTime.getTime() / 1000 + 24 * 3600 - 1
      );
      // this.start_time_active=Math.round(nowTime.getTime()/1000)
      param.dev_sn = val.row.dev_sn;

      query_node_info(param)
        .then(res => {
          if (res.status == 0 && res.err_code != 0) {
            let errorId = res.err_code;
            this.$message({
              message: `${this.common.getErrorcodeInfo(errorId)}`,
              type: "info"
            });
            this.details_table = {};
          } else {
            this.details_table.dev_sn = val.row.dev_sn;
            this.details_table.node_id = val.row.node_id;
            this.details_table.online_status = val.row.online_status;
            this.details_table.up_bandwidth = val.row.up_bandwidth;
            this.details_table.down_bandwidth = val.row.down_bandwidth;
            this.details_table.online_time = val.row.online_time;
            this.details_table.total_cap = val.row.total_cap;
            this.details_table.mem_ratio = res.data.mem_ratio / 100 + "%";
            // this.details_table.total_cap = res.data.total_cap / 100 + "%";
            this.details_table.cpu_tem = res.data.cpu_tem / 100 + "℃";
            this.details_table.mb_tem = res.data.mb_tem / 100 + "℃";
            this.details_table.hd_tmp = res.data.hd_tmp / 100 + "℃";
          }
          this.queryDevInfo();
        })
        .catch(err => {});
    },
    //查看详情查看单个设备
    queryDevInfo() {
      let paramActive = new Object();
      paramActive.node_id = "";
      paramActive.start_time = this.start_time_active;
      paramActive.end_time = this.end_time_active;
      paramActive.query_type = 1;
      paramActive.dev_sn = this.dev_sn;

      if (this.value) {
        paramActive.alarm_type = this.value;
      } else {
        paramActive.alarm_type = "-1";
      }

      paramActive.page = this.currentPage - 1;
      query_detail_info_list(paramActive)
        .then(res => {
          this.total_cnt = res.data.total_num * 1;
          if (res.status == 0 && res.err_code != 0) {
            let errorId = res.err_code;
            this.$message({
              message: `${this.common.getErrorcodeInfo(errorId)}`,
              type: "info"
            });
            this.tableDataActive = [];
          } else {
            if (res.data.dev_detail_info_list) {
              let nowarrLength = res.data.total_num;

              this.pagerActive.count = nowarrLength;
              let nowarractive = res.data.dev_detail_info_list;
              for (var i = 0; i < nowarractive.length; i++) {
                nowarractive[i].time_stamp = this.common.getTimes(
                  parseInt(nowarractive[i].time_stamp * 1000)
                );
                nowarractive[i].total_cap = this.common.formatByteActive(
                  nowarractive[i].total_cap
                );
                nowarractive[i].user_cap = this.common.formatByteActive(
                  nowarractive[i].user_cap
                );
                nowarractive[i].cpu_tem = nowarractive[i].cpu_tem / 100;
                nowarractive[i].mb_tem = nowarractive[i].mb_tem / 100;
                nowarractive[i].hd_tem = nowarractive[i].hd_tem / 100;
                nowarractive[i].mem_ratio = nowarractive[i].mem_ratio / 100;
                nowarractive[i].cap_ratio = nowarractive[i].cap_ratio / 100;
              }
              this.tableDataActive = nowarractive;
            }
          }
        })
        .catch(err => {});
    },
    //改变起始时间

    onChangeStartTime(val) {
      this.start_time = Math.round(val / 1000);
    },
    onChangeEndTime(val) {
      this.end_time = Math.round(val / 1000);
    },
    onChangeStartTimeActive(val) {
      this.start_time_active = Math.round(val / 1000);
    },
    onChangeEndTimeActive(val) {
      this.end_time_active = Math.round(val / 1000);
    },

    handleSelectionChange(val) {
      this.alertNum = val.length;
    },
    handleSizeChange(val) {},
    handleCurrentChange(val) {
      this.pager.page = val.val;
      this.queryInfo();
    },
    handleCurrentChange1(val) {
      this.pagerActive.page = val.val;
      this.queryDevInfo();
    },
    getInfoActive() {
      if (this.end_time - this.start_time_active < 0) {
        this.$message({
          message: "结束时间不能小于起始时间",
          type: "error"
        });
        return false;
      }
      this.queryDevInfo();
    },
    getInfo() {
      if (this.end_time - this.start_time < 0) {
        this.$message({
          message: "结束时间不能小于起始时间",
          type: "error"
        });
        return false;
      }
      if (this.form.dev_sn != "") {
        this.query_type = 1;
      } else {
        this.query_type = 0;
      }
      this.queryInfo();
    },
    //重置
    setInfo() {
      this.form.dev_sn = "";
      this.valuestate = "-1";
      this.queryInfo();
    },
    //查询发布版本历史信息
    queryInfo() {
      let param = new Object();
      //只能输入由数字和26个英文字母组成的字符串
      let nounied = /^[A-Za-z0-9]+$/;
      //匹配节点ID
      let das = /^Ci/;
      if (nounied.test(this.form.dev_sn) == true) {
        if (das.test(this.form.dev_sn) == true) {
          param.node_id = this.form.dev_sn;
          param.dev_sn = "";
        } else {
          param.dev_sn = this.form.dev_sn;
          param.node_id = "";
        }
      } else if (this.form.dev_sn == "") {
        param.dev_sn = "";
        param.node_id = "";
      } else {
        this.$message.error("搜索条件超出搜索范围");
        return false;
      }
      param.end_time = this.end_time;
      param.start_time = this.start_time;
      param.query_type = this.query_type;
      param.alarm_type = "0";
      param.page = this.pager.page - 1;
      param.online_status = this.valuestate;
      if (
        param.dev_sn != "" ||
        param.node_id != "" ||
        param.online_status != -1
      ) {
        param.query_type = 1;
      }
      query_general_info_list(param)
        .then(res => {
          if (res.status == 0 && res.err_code != 0) {
            let errorId = res.err_code;
            this.$message({
              message: `${this.common.getErrorcodeInfo(errorId)}`,
              type: "info"
            });
            this.tableData = [];
          } else {
            if (res.data.dev_detail_info_list) {
              let nowarractive = res.data.dev_detail_info_list;
              let nowarrLength = res.data.total_num;
              this.pager.count = nowarrLength;
              this.dataNum = nowarrLength;
              for (var i = 0; i < nowarractive.length; i++) {
                nowarractive[i].time_stamp = this.common.getTimeDay(
                  parseInt(nowarractive[i].time_stamp * 1000)
                );
                switch (nowarractive[i].online_status) {
                  case 1:
                    nowarractive[i].online_status = "在线";
                    break;
                  case 0:
                    nowarractive[i].online_status = "离线";
                    break;
                }
                let nowstr = nowarractive[i].alarm_status;
                let nowArr = nowstr.split(",");
                let tempStr = "";
                for (var j = 0; j < nowArr.length; j++) {
                  if (nowArr[j] == 1) {
                    tempStr += "CPU过热,";
                  } else if (nowArr[j] == 2) {
                    tempStr += "主板过热,";
                  } else if (nowArr[j] == 3) {
                    tempStr += "硬盘过热,";
                  } else if (nowArr[j] == 4) {
                    tempStr += "硬盘容量不足,";
                  } else if (nowArr[j] == 5) {
                    tempStr += "内存不足";
                  } else if (nowArr[j] == 9) {
                    tempStr += "宕机";
                  } else if (nowArr[j] == 0) {
                    tempStr += "正常";
                  }
                }
                nowarractive[i].alarm_status_text = tempStr;
                nowarractive[i].alarm_status = nowarractive[i].alarm_status;
                nowarractive[i].online_time =
                  (nowarractive[i].online_time / 3600).toFixed(2) + "h";
                nowarractive[i].total_cap =
                  this.common.formatByteActive(nowarractive[i].use_cap) +
                  "/" +
                  this.common.formatByteActive(nowarractive[i].total_cap);
                nowarractive[i].up_bandwidth = this.common.formatByteActive(
                  nowarractive[i].up_bandwidth
                );
                nowarractive[i].down_bandwidth = this.common.formatByteActive(
                  nowarractive[i].down_bandwidth
                );
              }
              this.tableData = nowarractive;
            } else {
              this.tableData = [];
            }
          }
        })
        .catch(error => {
          this.$message({
            message: "网络出错，请重新请求",
            type: "error"
          });
        });
    },
    // 表头样式设置
    headClass() {
      return "text-align: center;background:#eef1f6;";
    },
    // 表格样式设置
    rowClass() {
      return "text-align: center;";
    },
    //筛选按钮
    option_display() {
      this.optiondisplay = !this.optiondisplay;
      this.rotate = !this.rotate;
    }
  },
  components: {
    pageNation: pageNation,
    fenye: fenye
  }
};
</script>

<style lang="less">
.newsd {
  min-width: 1755px;
}
.myself-container {
  width: 100%;
  min-width: 1600px;
  .devide_title {
    width: 100%;
    height: auto;
    overflow: hidden;
    margin-top: 10px;
    // background: #f2f2f2;
    // padding: 15px 0px;
    box-sizing: border-box;

    .el-col {
      padding: 0px 20px;
    }
  }

  .device_form {
    width: 100%;
    height: auto;
    overflow: hidden;
    // background: #f0f5f5;
    // padding: 15px 30px;
    box-sizing: border-box;

    .el-form-item {
      margin-bottom: 0px;
    }

    .row_active {
      display: flex;
      justify-content: space-between;
      align-items: center;

      &.row_active_monitor {
        .el-form-item__label {
          white-space: nowrap;
        }

        justify-content: flex-start;

        .el-form-item {
          margin-left: 30px;
        }
      }
    }

    .div_show {
      width: auto;
      display: flex;
      height: 40px;
      justify-content: center;
      align-items: center;
      color: #409eff;
      cursor: pointer;
    }
  }

  .devide_table {
    width: 100%;
    height: auto;
    overflow: hidden;
    // margin-top: 20px;

    .el-table td,
    .el-table th {
      padding: 6px 0px;
    }

    .row_active {
      margin-top: 10px;
    }
  }

  .devide_pageNation {
    width: 100%;
    height: auto;
    overflow: hidden;
    margin-top: 20px;

    .devide_pageNation_active {
      float: right;
    }
  }

  .monitor-details {
    .el-dialog__body {
      padding-top: 0px;
    }

    .el-dialog {
      width: 80%;
    }

    .monitor-con {
      width: 100%;
      margin: 0 auto;

      .basic-table {
        border: 1px solid#DCDFE6;
        border-collapse: collapse;
        // width: 100%;
        margin-top: 20px;
        margin-bottom: 20px;

        td {
          border: 1px solid #dcdfe6;
          padding: 8px 0px;

          &.td-title {
            background: #ebebeb;
            text-align: center;
            width: 150px;
          }

          &.td-text {
            text-align: center;
            width: 400px;

            &.active {
              width: 200px;
            }
          }
        }
      }

      .monitor-footer {
        display: flex;
        justify-content: center;
        margin: 0 auto;
        margin-top: 10px;
      }

      .monitorDetails-bottom {
        .el-table td,
        .el-table th {
          padding: 6px 0px;
        }

        height: auto;
        overflow: hidden;

        .searach-con {
          display: flex;
          justify-content: flex-start;
          margin-bottom: 20px;

          .el-form-item {
            margin-left: 25px;
            margin-bottom: 0px;
          }
        }

        .monitorDetails-page {
          float: right;
          height: 40px;
          overflow: hidden;
          margin: 10px auto;
        }
      }
    }
  }
  .device_title_name {
    width: 16%;
    background: #eeeeee;
    color: #000000;
  }
  .device_title_content {
    width: 16%;
    background: #ffffff;
    color: #000000;
  }
}
.seach_top_right {
  float: left;
  height: 40px;
  line-height: 40px;
  margin-left: 10px;
}
.seach_bottom {
  text-align: left;
  background: #f0f5f5;
  border-radius: 0 0 10px 10px;
  padding: 10px 15px;
  // margin-top: 10px;
  .el-select {
    width: 150px;
  }
  .el-input {
    width: 150px;
  }
}
//旋转
.aa {
  transition: all 1s;
}
.go {
  transform: rotate(-180deg);
  transition: all 1s;
}
</style>
