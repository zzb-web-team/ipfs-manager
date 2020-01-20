<template>
	<div class="content">
		<!-- 头部 -->
		<el-breadcrumb separator="/">
			<el-breadcrumb-item>
				<a href="/">设备监控</a>
			</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 搜索 -->
		<div class="seach">
			<div class="seach_top">
				<el-input
					placeholder="设备SN，节点ID"
					v-model="input"
					@keyup.enter.native="seachuser()"
					class="input-with-select"
				>
					<i
						slot="prefix"
						class="el-input__icon el-icon-search"
						@click="seachuser()"
					></i>
				</el-input>
				<div class="seach_top_right" @click="option_display()">
					筛选
					<i
						class="el-icon-caret-bottom"
						:class="[
							rotate
								? 'fa fa-arrow-down go'
								: 'fa fa-arrow-down aa'
						]"
					></i>
				</div>
			</div>
			<div v-if="optiondisplay" class="seach_bottom">
				<span>异常类型：</span>
				<el-select
					v-model="value"
					placeholder="请选择"
					@change="seachuser"
				>
					<el-option label="全部" value="0"></el-option>
					<el-option
						v-for="(item, index) in options"
						:key="index"
						:label="item.label"
						:value="item.value"
					></el-option>
				</el-select>
				<span>选择日期：</span>
				<!-- <el-date-picker
          v-model="value1"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>-->
				<el-date-picker
					v-model="value1"
					type="datetimerange"
					:picker-options="pickerOptions"
					range-separator="至"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
					align="right"
				></el-date-picker>
				<el-button plain @click="reset()">重置</el-button>
				<div class="seach_bottom_btn">
					<!-- <el-button type="primary" plain size="mini" @click="seachuser()"
            >确定</el-button
          > -->
				</div>
			</div>
		</div>

		<!-- 表格 -->
		<div>
			<div style="text-align:right;margin:10px 0;">
				<el-button
					type="primary"
					@click="geydata2()"
					:disabled="showdisabled"
					>导出</el-button
				>
			</div>
			<el-table
				:data="tableData"
				border
				height="630"
				:cell-style="rowClass"
				:header-cell-style="headClass"
				style="width: 100%"
			>
				<el-table-column prop="now_date" label="日期" width="180">
					<template slot-scope="scope">
						<span>{{ scope.row.time_stamp | getymd }}</span>
					</template>
				</el-table-column>
				<el-table-column label="异常类型" width="220">
					<template slot-scope="scope">
						<span
							v-if="scope.row.badstade == '正常'"
							style="color:green;"
							>{{ scope.row.badstade }}</span
						>
						<span v-else style="color:red;">{{
							scope.row.badstade
						}}</span>
					</template>
				</el-table-column>
				<el-table-column
					prop="dev_sn"
					label="设备SN"
					width="180"
				></el-table-column>
				<el-table-column
					prop="node_id"
					label="节点ID"
				></el-table-column>
				<!-- <el-table-column prop="online_state" label="设备状态">
          <template slot-scope="scope">
            <span v-if="scope.row.online_state==0">在线</span>
            <span v-else style="color:red;">离线</span>
          </template>
        </el-table-column>-->
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
				<el-table-column label="CPU温度">
					<template slot-scope="scope">
						<span
							v-if="scope.row.cputem_color"
							style="color:red;"
							>{{ scope.row.cpu_tem }}</span
						>
						<span v-else>{{ scope.row.cpu_tem }}</span>
					</template>
				</el-table-column>
				<!-- <el-table-column label="主板温度">
          <template slot-scope="scope">
            <span v-if="scope.row.mbtem_color" style="color:red;">{{
              scope.row.mb_tem
            }}</span>
            <span v-else>{{ scope.row.mb_tem }}</span>
          </template>
        </el-table-column> -->
				<el-table-column label="硬盘温度">
					<template slot-scope="scope">
						<span v-if="scope.row.hdtem_color" style="color:red;">{{
							scope.row.hd_tem
						}}</span>
						<span v-else>{{ scope.row.hd_tem }}</span>
					</template>
				</el-table-column>
				<el-table-column label="磁盘剩余容量">
					<template slot-scope="scope">
						<span v-if="scope.row.cap_color" style="color:red;">{{
							scope.row.cap_ratio
						}}</span>
						<span v-else>{{ scope.row.cap_ratio }}</span>
					</template>
				</el-table-column>
				<el-table-column label="内存占用">
					<template slot-scope="scope">
						<span
							v-if="scope.row.memtem_color"
							style="color:red;"
							>{{ scope.row.mem_ratio }}</span
						>
						<span v-else>{{ scope.row.mem_ratio }}</span>
					</template>
				</el-table-column>
			</el-table>
		</div>

		<fenye
			style="text-align: right;margin:20px 0 0 0;"
			@fatherMethod="getpage"
			@fathernum="gettol"
			:pagesa="total_cnt"
			:currentPage="currentPage"
		></fenye>
	</div>
</template>

<script>
import fenye from '@/components/fenye';
import { query_detail_info_list } from '../../servers/api';

import {
	getlocaltimes,
	settime,
	getymdtime,
	setbatime
} from '../../servers/sevdate';
export default {
	data() {
		return {
			currentPage: 1,
			rotate: false,
			showdisabled: false,
			errTableVisible: false,
			device_show: false,
			value1: '',
			total_cnt: 1,
			tolpage: 0,
			pagesize: 10,
            pickerOptions: {
				disabledDate(time) {
					return time.getTime() > new Date( new Date(new Date().toLocaleDateString()).getTime() +24 * 60 * 60 * 1000 -1);
				}
			},
			input: '',
			value: '0',
			input1: '', //开始时间
			input2: '', //结束时间
			optiondisplay: false,
			dev_devation: {},
			sizeForm: {
				date1: '',
				date2: ''
			},
			options: [
				{
					value: '1',
					label: 'CPU温度报警'
				},
				// {
				//   value: "2",
				//   label: "主板报警温度"
				// },
				{
					value: '3',
					label: '磁盘温度报警'
				},
				{
					value: '4',
					label: '剩余磁盘容量报警'
				},
				{
					value: '5',
					label: '内存比例报警'
				}
			],
			tableData: [
				// {
				//   time_stamp: "2016-05-02", //日期
				//   badstade: "cpu温度报警",
				//   dev_sn: "fas1g35wa1f53", //设备sn
				//   node_id: "gager165g1ae51g6a5ew1", //节点ID
				//   used_cap: 301, //当前使用空间
				//   total_cap: 800, //总空间
				//   online_state: 0, //设备状态
				//   up_bw: "38.56", //上行带宽
				//   down_bw: "12.67", //下行带宽
				//   cpu_tem: "13.1", //cpu温度
				//   mb_tem: "18", //主板温度
				//   hd_tem: "28", //硬盘温度
				//   mem_ratio: "26" //内存占用
				// }
			],
			tableData_dao: [],
			tolpage_dao: 0
		};
	},
	filters: {
		//时间戳转时间
		getymd(time) {
			return getymdtime(time);
		}
	},
	components: { fenye },
	mounted() {
		this.getdata();
	},
	methods: {
		//获取页码
		getpage(pages) {
			this.tolpage = pages - 1;
			this.getdata();
		},
		//获取每页数量
		gettol(pagetol) {
			this.pagesize = pagetol;
			this.getdata();
		},
		//请求数据
		getdata() {
			this.tableData = [];
			//只能输入由数字和26个英文字母组成的字符串
			let nounied = /^[A-Za-z0-9]+$/;
			//匹配节点ID
			let das = /^Ci/;
			let params = new Object();
			if (nounied.test(this.input) == true) {
				if (das.test(this.input) == true) {
					params.node_id = this.input;
					params.dev_sn = '';
				} else {
					params.dev_sn = this.input;
					params.node_id = '';
				}
			} else if (this.input == '') {
				params.dev_sn = '';
				params.node_id = '';
			} else {
				this.$message.error('搜索条件超出搜索范围');
				return false;
			}
			if (this.value1) {
				params.start_time = setbatime(this.value1[0]);
				params.end_time = setbatime(this.value1[1]);
			} else {
				params.start_time =
					setbatime(
						new Date(
							new Date(new Date().toLocaleDateString()).getTime()
						)
					) -
					7 * 24 * 60 * 60;
				params.end_time = setbatime(new Date());
			}
			params.page = this.tolpage;
			if (this.value == '全部') {
				params.alarm_type = 0;
			} else {
				params.alarm_type = this.value;
			}
			if (this.input != '') {
				params.query_type = 1;
			} else {
				params.query_type = 0;
			}
			query_detail_info_list(params)
				.then(res => {
					if (res.status == 0) {
						if (res.data.dev_detail_info_list) {
							this.showdisabled = false;
							res.data.dev_detail_info_list.forEach(
								(item, index) => {
									let devm = {};
									devm.dev_sn = item.dev_sn;
									devm.node_id = item.node_id;
									devm.time_stamp = item.time_stamp;
									devm.cpu_tem = item.cpu_tem / 100 + '℃';
									devm.mb_tem = item.mb_tem / 100 + '℃';
									devm.hd_tem = item.hd_tem / 100 + '℃';
									devm.cap_ratio = item.cap_ratio / 100 + '%';
									devm.mem_ratio = item.mem_ratio / 100 + '%';
									devm.total_cap = this.common.formatByteActive(
										item.total_cap
									);
									devm.user_cap = this.common.formatByteActive(
										item.user_cap
									);
									devm.badstade = '';
									if (item.cpu_tem >= 8000) {
										devm.badstade = 'CPU温度报警' + ' / ';
										devm.cputem_color = 'red';
									}
									if (item.mb_tem >= 4000) {
										devm.badstade =
											devm.badstade +
											'主板温度报警' +
											' / ';
										devm.mbtem_color = 'red';
									}
									if (item.hd_tem >= 4000) {
										devm.badstade =
											devm.badstade +
											'硬盘温度报警' +
											' / ';
										devm.hdtem_color = 'red';
									}
									if (item.mem_ratio >= 8000) {
										devm.badstade =
											devm.badstade +
											'内存容量报警' +
											' / ';
										devm.memtem_color = 'red';
									}
									if (item.cap_ratio <= 500) {
										devm.badstade =
											devm.badstade + '磁盘剩余容量报警';
										devm.cap_color = 'red';
									}
									if (devm.badstade == '') {
										devm.badstade = '正常';
									}

									this.tableData.push(devm);
								}
							);
							// this.tableData = res.data.dev_detail_info_list;
							this.total_cnt = res.data.total_num;
						} else {
							this.showdisabled = true;
							this.$message('暂无数据');
						}
					} else {
						this.$message.error(res.err_msg);
					}
				})
				.catch(err => {});
		},
		//筛选按钮
		option_display() {
			this.optiondisplay = !this.optiondisplay;
			this.rotate = !this.rotate;
		},

		//确定搜索
		seachuser() {
			this.getdata();
			// this.optiondisplay = false;
			// this.value = "";
			// this.input = "";
			// this.value1 = "";
			this.tolpage = 0;
		},
		//重置
		reset() {
			this.value = '0';
			this.input = '';
			this.value1 = '';
			this.getdata();
		},
		geydata2() {
			//只能输入由数字和26个英文字母组成的字符串
			let nounied = /^[A-Za-z0-9]+$/;
			//匹配节点ID
			let das = /^Ci/;
			let params = new Object();
			if (nounied.test(this.input) == true) {
				if (das.test(this.input) == true) {
					params.node_id = this.input;
					params.dev_sn = '';
				} else {
					params.dev_sn = this.input;
					params.node_id = '';
				}
			} else if (this.input == '') {
				params.dev_sn = '';
				params.node_id = '';
			} else {
				this.$message.error('搜索条件超出搜索范围');
				return false;
			}
			if (this.value1) {
				params.start_time = setbatime(this.value1[0]);
				params.end_time = setbatime(this.value1[1]);
			} else {
				params.start_time =
					setbatime(
						new Date(
							new Date(new Date().toLocaleDateString()).getTime()
						)
					) -
					7 * 24 * 60 * 60;
				params.end_time = setbatime(new Date());
			}
			params.page = this.tolpage_dao;
			if (this.value == '全部') {
				params.alarm_type = 0;
			} else {
				params.alarm_type = this.value;
			}
			if (this.input != '') {
				params.query_type = 1;
			} else {
				params.query_type = 0;
			}
			params.export_file = 1;
			query_detail_info_list(params)
				.then(res => {
					if (res.status == 0) {
						if (res.data.dev_detail_info_list) {
							res.data.dev_detail_info_list.forEach(
								(item, index) => {
									let devm = {};
									devm.dev_sn = item.dev_sn;
									devm.node_id = item.node_id;
									devm.time_stamp = item.time_stamp;
									devm.cpu_tem = item.cpu_tem / 100 + '℃';
									devm.mb_tem = item.mb_tem / 100 + '℃';
									devm.hd_tem = item.hd_tem / 100 + '℃';
									devm.cap_ratio = item.cap_ratio / 100 + '%';
									devm.mem_ratio = item.mem_ratio / 100 + '%';
									devm.cap_mem =
										item.cap_ratio / 100 +
										'%' +
										'/' +
										item.mem_ratio / 100 +
										'%';
									devm.badstade = '';
									if (item.cpu_tem >= 8000) {
										devm.badstade = 'CPU温度报警' + ' / ';
										devm.cputem_color = 'red';
									}
									if (item.mb_tem >= 4000) {
										devm.badstade =
											devm.badstade +
											'主板温度报警' +
											' / ';
										devm.mbtem_color = 'red';
									}
									if (item.hd_tem >= 4000) {
										devm.badstade =
											devm.badstade +
											'硬盘温度报警' +
											' / ';
										devm.hdtem_color = 'red';
									}
									if (item.mem_ratio >= 8000) {
										devm.badstade =
											devm.badstade +
											'内存容量报警' +
											' / ';
										devm.memtem_color = 'red';
									}
									if (item.cap_ratio <= 500) {
										devm.badstade =
											devm.badstade + '磁盘剩余容量报警';
										devm.cap_color = 'red';
									}
									if (devm.badstade == '') {
										devm.badstade = '正常';
									}
									this.tableData_dao.push(devm);
								}
							);
							if (res.data.page >= res.data.total_page) {
								this.exportExcel();
								this.fan.fanactionlog(
									'导出',
									'设备异常记录',
									1
								);
								return false;
							} else {
								this.tolpage_dao++;
								this.geydata2();
							}
						} else {
						}
					} else {
						this.fan.fanactionlog('导出', '设备异常记录', 0);
						this.$message.error(res.err_msg);
					}
				})
				.catch(err => {
					this.fan.fanactionlog('导出', '设备异常记录', 0);
				});
		},
		exportExcel() {
			require.ensure([], () => {
				const {
					export_json_to_excel
				} = require('../../excel/Export2Excel.js');
				const tHeader = [
					'日期',
					'异常类型',
					'设备SN',
					'节点ID',
					'当前使用空间/总空间',
					'CPU温度',
					'硬盘温度',
					'磁盘剩余容量',
					'内存占用'
				];
				// 上面设置Excel的表格第一行的标题
				const filterVal = [
					'time_stamp',
					'badstade',
					'dev_sn',
					'node_id',
					'cap_mem',
					'cpu_tem',
					'hd_tem',
					'cap_ratio',
					'mem_ratio'
				];
				// 上面的index、nickName、name是tableData里对象的属性
				const list = this.tableData_dao; //把data里的tableData存到list
				const data = this.formatJson(filterVal, list);
				export_json_to_excel(tHeader, data, '设备异常记录');
				this.tableData_dao = [];
				this.tolpage_dao = 0;
			});
		},
		formatJson(filterVal, jsonData) {
			return jsonData.map(v => filterVal.map(j => v[j]));
		},
		// 表头样式设置
		headClass() {
			return 'text-align: center;background:#eef1f6;';
		},
		// 表格样式设置
		rowClass() {
			return 'text-align: center;';
		}
	}
};
</script>

<style lang="scss" scoped>
.content {
	width: 100%;
	height: 100%;
	text-align: left;
	.seach {
		width: 100%;
		margin-top: 20px;
		.seach_top {
			width: 100%;
			height: 60px;
			.input-with-select {
				width: 15%;
				float: left;
			}
			.seach_top_right {
				float: left;
				height: 40px;
				line-height: 40px;
				margin-left: 10px;
			}
		}
		.seach_bottom {
			text-align: left;
			background: #f0f5f5;
			border-radius: 10px;
			padding: 10px 15px 3px 15px;
			margin-bottom: 10px;
			.el-select {
				width: 150px;
			}
			.el-input {
				width: 150px;
			}
			.seach_bottom_btn {
				margin: 10px 10px;
			}
		}
	}
	.con_lable {
		width: 100%;
	}
	.device_title_name {
		width: 16%;
		background: #eeeeee;
		color: #000000;
	}
	.device_title_content {
		width: 15%;
		background: #ffffff;
		color: #000000;
	}
	.tableclose {
		width: 100%;
		padding-top: 10px;
		text-align: center;
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
