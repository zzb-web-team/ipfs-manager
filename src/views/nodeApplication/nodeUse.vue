<template>
	<section class="myself-container content">
		<div class="user-title" style="display: flex;flex-flow: column;">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>
					<a>节点平均利用率</a>
				</el-breadcrumb-item>
			</el-breadcrumb>
			<div style="margin-top:10px;">
				<el-tabs v-model="activeName" @tab-click="handleClick">
					<el-tab-pane label="IP流量" name="first">
						<!--  -->

						<div
							style="display: flex;flex-flow: row;"
							class="seach_top"
						>
							<el-input
								v-model="input"
								placeholder="节点ID"
								style="width: 15%;"
								@keyup.enter.native="onseach"
							></el-input>
							<el-select
								v-model="valuea"
								placeholder="请选择一级节点"
								style="margin-left:10px;"
								@change="onseach"
							>
								<el-option value="*" label="全部"></el-option>
							</el-select>
							<el-select
								v-model="secondvalue"
								placeholder="请选择二级节点"
								style="margin-left:10px;"
								@change="onseach"
							>
								<el-option value="*" label="全部"></el-option>
							</el-select>
							<el-select
								v-model="devtypevalue"
								placeholder="请选择硬件设备"
								style="margin-left:10px;"
								@change="onseach"
							>
								<el-option value="*" label="全部"></el-option>
							</el-select>
							<el-cascader
								style="margin-left:10px;"
								placeholder="请选择区域"
								v-model="valuea"
								:options="optionsafs"
								@change="seach_operce_ip"
							></el-cascader>
							<el-select
								:disabled="city_disable_ip"
								v-model="valueb"
								placeholder="请选择城市"
								style="margin-left:10px;"
								@change="onseach()"
							>
								<el-option value="*" label="全部"></el-option>
								<el-option
									v-for="(item, index) in optionsb"
									:key="item.name + index"
									:label="item.name"
									:value="item.name"
								>
								</el-option>
							</el-select>
							<!-- <el-select
                v-model="valuea"
                placeholder="请选择运营商"
                style="margin-left:10px;"
                @change="onseach"
              >
                <el-option value="*" label="全部"></el-option>
              </el-select> -->
							<el-button-group
								class="bantlist"
								style="margin:0 10px;"
							>
								<el-button
									v-if="zidingyi == false"
									@click="set_today()"
									>今天</el-button
								>
								<el-button
									v-if="zidingyi == false"
									@click="set_yesterday()"
									>昨天</el-button
								>
								<el-button
									v-if="zidingyi == false"
									@click="set_sevenday()"
									>7天</el-button
								>
								<el-button
									v-if="zidingyi == false"
									@click="set_thirtyday()"
									>30天</el-button
								>
								<el-button @click="showpicker"
									>自定义</el-button
								>
							</el-button-group>
							<el-date-picker
								v-if="zidingyi == true"
								style="margin-right:10px;"
								v-model="value2"
								type="datetimerange"
								:picker-options="pickerOptions"
								range-separator="至"
								start-placeholder="开始日期"
								end-placeholder="结束日期"
								align="left"
								@change="onseach"
							>
							</el-date-picker>
							<el-button type="primary" @click="onseach"
								>查询</el-button
							>
						</div>
						<!--  -->
						<div class="device_form" style>
							<el-button
								class="ip_upload_btn"
								@click="ip_upload"
								type="text"
								size="medium"
								><i class="el-icon-download"></i
							></el-button>
							<div
								id="myChart3"
								:style="{ height: '300px' }"
							></div>
						</div>
						<div class="devide_table">
							<el-row type="flex" class="row_active">
								<el-col
									:span="24"
									style="text-align:left;    font-weight: bold;"
									>IP流量平均利用率表</el-col
								>
							</el-row>
							<el-row type="flex" class="row_active">
								<el-col :span="24">
									<el-table
										:data="tableData"
										:cell-style="rowClass"
										:header-cell-style="headClass"
										style="width: 100%"
										height="480"
									>
										<el-table-column
											prop="ipfsId"
											label="节点id"
										>
										</el-table-column>
										<el-table-column
											prop="totalOutput"
											label="使用IP流量(GB)"
										>
											<template slot-scope="scope">
												<span
													v-if="
														scope.row.totalOutput ==
															0
													"
													>0</span
												><span v-else
													>{{
														(
															scope.row
																.totalOutput /
															1024 /
															1024 /
															1024
														).toFixed(2)
													}}G</span
												>
											</template>
										</el-table-column>
										<el-table-column
											prop="percent"
											label="IP流量利用率"
										>
											<template slot-scope="scope"
												>{{
													scope.row.percent
												}}%</template
											>
										</el-table-column>
										<el-table-column
											prop="timestamp"
											label="日期"
										>
											<template slot-scope="scope">
												<span>{{
													scope.row.timeStamp | getymd
												}}</span>
											</template>
										</el-table-column>
									</el-table>
								</el-col>
							</el-row>
							<fenye
								style="float:right;margin:10px 0 20px 0;"
								@fatherMethod="getpage"
								@fathernum="gettol"
								:pagesa="totalCnt"
								:currentPage="currentPage"
								v-if="tableData.length > 0"
							></fenye>
						</div>
					</el-tab-pane>
					<el-tab-pane label="FS存储" name="second">
						<!--  -->

						<div
							style="display: flex;flex-flow: row;"
							class="seach_top"
						>
							<el-input
								v-model="inputfs"
								placeholder="节点ID"
								style="width: 15%;"
								@keyup.enter.native="onseach('fs')"
							></el-input>
							<el-select
								v-model="firstvaluea_fs"
								placeholder="请选择一级节点"
								style="margin-left:10px;"
								@change="onseach"
							>
								<el-option value="*" label="全部"></el-option>
							</el-select>
							<el-select
								v-model="secondvalue_fs"
								placeholder="请选择二级节点"
								style="margin-left:10px;"
								@change="onseach"
							>
								<el-option value="*" label="全部"></el-option>
							</el-select>
							<el-select
								v-model="devtypevalue_fs"
								placeholder="请选择硬件设备"
								style="margin-left:10px;"
								@change="onseach"
							>
								<el-option value="*" label="全部"></el-option>
							</el-select>
							<el-cascader
								style="margin-left:10px;"
								placeholder="请选择区域"
								v-model="valueafs"
								:options="optionsafs"
								@change="seach_operce_fs"
							></el-cascader>
							<el-select
								:disabled="city_disable_fs"
								v-model="valuebfs"
								placeholder="请选择城市"
								style="margin-left:10px;"
								@change="onseach('fs')"
							>
								<el-option
									v-for="(item, index) in optionsbfs"
									:key="index + item.name"
									:label="item.name"
									:value="item.name"
								>
								</el-option>
							</el-select>
							<!-- <el-select
                v-model="valuea"
                placeholder="请选择运营商"
                style="margin-left:10px;"
                @change="onseach"
              >
                <el-option value="*" label="全部"></el-option>
              </el-select> -->
							<el-button-group
								class="bantlist"
								style="margin:0 10px;"
							>
								<el-button
									v-if="zidingyifs == false"
									@click="set_today('fs')"
									>今天</el-button
								>
								<el-button
									v-if="zidingyifs == false"
									@click="set_yesterday('fs')"
									>昨天</el-button
								>
								<el-button
									v-if="zidingyifs == false"
									@click="set_sevenday('fs')"
									>7天</el-button
								>
								<el-button
									v-if="zidingyifs == false"
									@click="set_thirtyday('fs')"
									>30天</el-button
								>
								<el-button @click="showpickerfs"
									>自定义</el-button
								>
							</el-button-group>
							<el-date-picker
								v-if="zidingyifs == true"
								style="margin-right:10px;"
								v-model="value2fs"
								type="datetimerange"
								:picker-options="pickerOptions"
								range-separator="至"
								start-placeholder="开始日期"
								end-placeholder="结束日期"
								align="left"
								@change="onseach('fs')"
							>
							</el-date-picker>
							<el-button type="primary" @click="onseach('fs')"
								>查询</el-button
							>
						</div>

						<!--  -->
						<div class="device_form" style>
							<el-button
								class="ip_upload_btn"
								@click="fs_upload"
								type="text"
								size="medium"
								><i class="el-icon-download"></i
							></el-button>
							<div
								id="myChart4"
								:style="{ height: '300px' }"
							></div>
						</div>
						<div class="devide_table">
							<el-row type="flex" class="row_active">
								<el-col
									:span="24"
									style="text-align:left;    font-weight: bold;"
									>IP流量平均利用率表</el-col
								>
							</el-row>
							<el-row type="flex" class="row_active">
								<el-col :span="24">
									<el-table
										:data="fs_tableData"
										:cell-style="rowClass"
										:header-cell-style="headClass"
										style="width: 100%"
										height="480"
									>
										<el-table-column
											prop="ipfsId"
											label="节点ID"
										>
										</el-table-column>
										<el-table-column
											prop="totalUsage"
											label="平均使用存储空间"
										>
											<template slot-scope="scope">
												<span
													v-if="
														scope.row.totalUsage ==
															0
													"
													>0</span
												><span v-else
													>{{
														(
															scope.row
																.totalUsage /
															1024 /
															1024 /
															1024
														).toFixed(2)
													}}G</span
												>
											</template>
										</el-table-column>
										<el-table-column
											prop="usagePercent"
											label="FS存储利用率"
										>
											<template slot-scope="scope"
												>{{
													scope.row.usagePercent
												}}%</template
											>
										</el-table-column>
										<el-table-column
											prop="timestamp"
											label="日期"
										>
											<template slot-scope="scope">
												<span>{{
													scope.row.timeStamp | getymd
												}}</span>
											</template>
										</el-table-column>
									</el-table>
								</el-col>
							</el-row>
							<fenye
								style="float:right;margin:10px 0 20px 0;"
								@fatherMethod="getpagefs"
								@fathernum="gettolfs"
								:pagesa="fs_totalCnt"
								:currentPage="currentPage"
								v-if="fs_tableData.length > 0"
							></fenye>
						</div>
					</el-tab-pane>
				</el-tabs>
			</div>
		</div>
	</section>
</template>

<script>
import echarts from 'echarts';
import fenye from '../../components/cloudfenye';
import {
	getlocaltimes,
	settime,
	getymdtime,
	setbatime,
	getday,
} from '../../servers/sevdate';
import {
	ipfs_dataflow_query_conditions,
	query_ipfs_dataflow_avg_usage_curve,
	query_ipfs_dataflow_avg_usage_table,
	query_ipfs_dataflow_table,
	query_ip_store_avg_usage_curve,
	query_ip_store_details_table,
	query_ip_store_usage_table,
	query_ip_store_avg_usage_table,
	get_nodetype_enum,
} from '../../servers/api';
import axios from 'axios';
export default {
	data() {
		return {
			currentPage: 1,
			city_disable_fs: true,
			city_disable_ip: true,
			activeName: 'first',
			seachinput: '',
			firatvalue: '',
			secondvalue: '',
			devtypevalue: '',
			firstvaluea_fs: '',
			secondvalue_fs: '',
			devtypevalue_fs: '',
			input: '',
			inputfs: '',
			zidingyi: false,
			zidingyifs: false,
			pickerOptions: {
				shortcuts: [
					{
						text: '今天',
						onClick(picker) {
							const end = new Date();
							const start = new Date(
								new Date(
									new Date().toLocaleDateString()
								).getTime()
							);
							picker.$emit('pick', [start, end]);
						},
					},
					{
						text: '昨天',
						onClick(picker) {
							const end = new Date(
								new Date(
									new Date().toLocaleDateString()
								).getTime()
							);
							const start = new Date(
								new Date(
									new Date().toLocaleDateString()
								).getTime() -
									3600 * 24 * 1 * 1000
							);
							picker.$emit('pick', [start, end]);
						},
					},
					{
						text: '最近一周',
						onClick(picker) {
							const end = new Date();
							const start = new Date(
								new Date(
									new Date().toLocaleDateString()
								).getTime()
							);
							start.setTime(
								start.getTime() - 3600 * 1000 * 24 * 6
							);
							picker.$emit('pick', [start, end]);
						},
					},
					{
						text: '最近一个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date(
								new Date(
									new Date().toLocaleDateString()
								).getTime()
							);
							start.setTime(
								start.getTime() - 3600 * 1000 * 24 * 6
							);
							picker.$emit('pick', [start, end]);
						},
					},
				],
				disabledDate(time) {
					return (
						time.getTime() >
						new Date(
							new Date(
								new Date().toLocaleDateString()
							).getTime() +
								24 * 60 * 60 * 1000 -
								1
						)
					);
				},
			},

			value2: '',
			value2fs: '',
			rowHeader: [
				{
					prop: 'time',
					label: '节点ID',
				},
				{
					prop: 'totals',
					label: '使用流量',
				},
				{
					prop: 'online_devices',
					label: '传输次数',
				},
				{
					prop: 'average_online',
					label: '日期',
				},
			],
			rowHeader1: [
				{
					prop: 'time',
					label: '节点ID',
				},
				{
					prop: 'totals',
					label: '存储容量',
				},
				{
					prop: 'online_devices',
					label: '存储次数',
				},
				{
					prop: 'average_online',
					label: '日期',
				},
			],
			optionsafs: [
				// {
				//   value: 0,
				//   label: "全部"
				// },
				{
					value: '华北',
					label: '华北',
					id: 0,
					children: [
						{
							value: '北京',
							label: '北京',
						},
						{
							value: '内蒙古',
							label: '内蒙古',
						},
						{
							value: '山西',
							label: '山西',
						},
						{
							value: '河北',
							label: '河北',
						},
						{
							value: '天津',
							label: '天津',
						},
					],
				},
				{
					value: '西北',
					label: '西北',
					id: 1,
					children: [
						{
							value: '宁夏',
							label: '宁夏',
						},
						{
							value: '陕西',
							label: '陕西',
						},
						{
							value: '甘肃',
							label: '甘肃',
						},
						{
							value: 'qinghai',
							label: '青海',
						},
						{
							value: '新疆',
							label: '新疆',
						},
					],
				},
				{
					value: '东北',
					label: '东北',
					id: 2,
					children: [
						{
							value: '黑龙江',
							label: '黑龙江',
						},
						{
							value: '吉林',
							label: '吉林',
						},
						{
							value: '辽宁',
							label: '辽宁',
						},
					],
				},
				{
					value: '华东',
					label: '华东',
					id: 3,
					children: [
						{
							value: '福建',
							label: '福建',
						},
						{
							value: '江苏',
							label: '江苏',
						},
						{
							value: '安徽',
							label: '安徽',
						},
						{
							value: '山东',
							label: '山东',
						},
						{
							value: '上海',
							label: '上海',
						},
						{
							value: '浙江',
							label: '浙江',
						},
					],
				},
				{
					value: '华中',
					label: '华中',
					id: 4,
					children: [
						{
							value: '河南',
							label: '河南',
						},
						{
							value: '湖北',
							label: '湖北',
						},
						{
							value: '江西',
							label: '江西',
						},
						{
							value: '湖南',
							label: '湖南',
						},
					],
				},
				{
					value: '西南',
					label: '西南',
					id: 5,
					children: [
						{
							value: '贵州',
							label: '贵州',
						},
						{
							value: '云南',
							label: '云南',
						},
						{
							value: '重庆',
							label: '重庆',
						},
						{
							value: '四川',
							label: '四川',
						},
						{
							value: '西藏',
							label: '西藏',
						},
					],
				},
				{
					value: '华南',
					label: '华南',
					id: 6,
					children: [
						{
							value: '广东',
							label: '广东',
						},
						{
							value: '广西',
							label: '广西',
						},
						{
							value: '海南',
							label: '海南',
						},
					],
				},
				{
					value: '其他',
					label: '其他',
					id: 7,
					children: [
						{
							value: '香港',
							label: '香港',
						},
						{
							value: '澳门',
							label: '澳门',
						},
						{
							value: 'taiwan',
							label: '台湾',
						},
					],
				},
			],
			tableData: [],
			optionsa: [],
			optionsbfs: [],
			optionsb: [],
			valuea: '',
			valueb: '',
			valuec: '',
			valueafs: '',
			valuebfs: '',
			valuecfs: '',
			starttime: '',
			endtime: '',
			avgDataFlowUtily: [],
			timeArray: [],
			avgUsageArray: [],
			fs_timeArray: [],
			fs_tableData: [],
			pageNo: 1,
			pageSize: 10,
			totalCnt: 1,
			fs_pageNo: 1,
			fs_pageSize: 10,
			fs_totalCnt: 1,
			citydata: [],
			ip_tableData_upload: [],
            fs_tableData_upload: [],
            arch: [
				//硬件类型
				{
					name: 'arm64',
					value: 'arm64',
				},
			],
			device_type: [
				//设备类型
				{
					name: '西柚机',
					value: '西柚机',
				},
			],
			os: [
				//操作系统
				{
					name: 'windows',
					value: 'windows',
				},
			],
			isp: [
				//运营商
				{
					name: '移动',
					value: '移动',
				},
			],
			firstchan: [
				//一级渠道商
				{
					name: '云链',
					value: 'yunlian',
					secondchan: [
						//二级渠道商
						{
							name: 'aaaa',
							value: 'bbbb',
						},
					],
				},
			],
		};
	},
	mounted() {
		this.starttime =
			new Date(new Date().toLocaleDateString()).getTime() / 1000;
		this.endtime = Date.parse(new Date()) / 1000;
		this.getseachinput();
		this.ip_surve();
		// this.configure();
		// this.configure1();
	},
	beforeDestroy() {
		if (!this.chart) {
			return;
		}
		this.chart.dispose();
		this.chart = null;
	},
	methods: {
		get_search_data() {
			let params = new Object();
			get_nodetype_enum(params)
				.then((res) => {
					if (res.status == 0) {
						this.arch = res.data.arch;
						this.device_type = res.data.device_type;
						this.isp = res.data.ips;
						this.os = res.data.os;
						this.firstchan = res.data.firstchan;
					} else {
						this.$message.error(res.err_msg);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		},
		//请求数据----获取搜索条件
		getseachinput() {
			axios.get('./static/pro_city.json').then((res) => {
				this.citydata = res.data;
			});
		},
		ip_surve() {
			let params = new Object();
			if (this.input !== '') {
				params.ipfsId = this.input;
			} else {
				params.ipfsId = '*';
			}
			if (this.valuea[1]) {
				params.region = this.valuea[1];
			} else {
				params.region = '*';
			}
			if (this.valueb !== '') {
				params.city = this.valueb;
			} else {
				params.city = '*';
			}
			if (this.valuec !== '') {
				params.time_unit = parseInt(this.valuec);
			} else {
				params.time_unit = 120;
			}
			params.start_ts = this.starttime;
			params.end_ts = this.endtime;
			query_ipfs_dataflow_avg_usage_curve(params)
				.then((res) => {
					this.avgDataFlowUtily = [];
					this.timeArray = [];
					if (res.status == 0) {
						this.avgDataFlowUtily = res.data.avgDataFlowUtily;
						res.data.timeArray.forEach((item, index) => {
							this.timeArray.push(getday(item));
						});
						this.configure();
						this.get_ip_table();
					} else {
						this.$message.error(res.errMsg);
					}
				})
				.catch((error) => {});
		},
		fs_curve() {
			let params = new Object();
			if (this.inputfs !== '') {
				params.ipfs_id = this.inputfs;
			} else {
				params.ipfs_id = '*';
			}
			if (this.valueafs[1]) {
				params.region = this.valueafs[1];
			} else {
				params.region = '*';
			}
			if (this.valuebfs !== '') {
				params.city = this.valuebfs;
			} else {
				params.city = '*';
			}
			if (this.valuecfs !== '') {
				params.time_unit = parseInt(this.valuecfs);
			} else {
				params.time_unit = 120;
			}
			params.start_ts = this.starttime;
			params.end_ts = this.endtime;
			query_ip_store_avg_usage_curve(params)
				.then((res) => {
					this.avgUsageArray = [];
					this.fs_timeArray = [];
					if (res.status == 0) {
						this.avgUsageArray = res.data.avgUsageArray;
						res.data.timeArray.forEach((item, index) => {
							this.fs_timeArray.push(getday(item));
						});
						this.configure1();
						this.get_fs_table();
					} else {
						this.$message.error(res.errMsg);
					}
				})
				.catch((Error) => {});
		},
		get_ip_table() {
			let params = new Object();
			if (this.input !== '') {
				params.ipfsId = this.input;
			} else {
				params.ipfsId = '*';
			}
			if (this.valuea[1]) {
				params.region = this.valuea[1];
			} else {
				params.region = '*';
			}
			if (this.valueb !== '') {
				params.city = this.valueb;
			} else {
				params.city = '*';
			}
			if (this.valuec !== '') {
				params.time_unit = parseInt(this.valuec);
			} else {
				params.time_unit = 120;
			}

			params.start_ts = this.starttime;
			params.end_ts = this.endtime;
			params.pageNo = this.fs_pageNo - 1;
			params.pageSize = this.fs_pageSize;
			query_ipfs_dataflow_avg_usage_table(params)
				.then((res) => {
					this.tableData = [];
					if (res.status == 0) {
						this.tableData = res.data.list;
						this.totalCnt = res.data.totalCnt;
					} else {
						this.$message.error(res.err_msg);
					}
				})
				.catch((error) => {});
		},
		get_fs_table() {
			let params = new Object();
			if (this.inputfs !== '') {
				params.ipfs_id = this.inputfs;
			} else {
				params.ipfs_id = '*';
			}
			if (this.valueafs[1]) {
				params.region = this.valueafs[1];
			} else {
				params.region = '*';
			}
			if (this.valuebfs !== '') {
				params.city = this.valuebfs;
			} else {
				params.city = '*';
			}
			if (this.valuecfs !== '') {
				params.time_unit = parseInt(this.valuecfs);
			} else {
				params.time_unit = 120;
			}
			params.start_ts = this.starttime;
			params.end_ts = this.endtime;
			params.pageNo = this.fs_pageNo - 1;
			params.pageSize = this.fs_pageSize;
			query_ip_store_avg_usage_table(params)
				.then((res) => {
					this.fs_tableData = [];
					if (res.status == 0) {
						this.fs_tableData = res.data.list;
						this.fs_totalCnt = res.data.totalCnt;
					} else {
						this.$message.error(res.err_msg);
					}
				})
				.catch((error) => {});
		},
		//选项卡
		handleClick(tab, event) {
			this.valuec = 60;
			this.valuecfs = 60;
			this.starttime =
				new Date(new Date().toLocaleDateString()).getTime() / 1000;
			this.endtime = Date.parse(new Date()) / 1000;
			if (tab.index == '1') {
				this.fs_curve();
			} else {
				this.ip_surve();
			}
		},
		//自定义按钮--ip
		showpicker() {
			this.zidingyi = !this.zidingyi;
		},
		////自定义按钮--fs
		showpickerfs() {
			this.zidingyifs = !this.zidingyifs;
		},
		//搜索
		onseach(stat) {
			if (stat === 'fs') {
				if (this.value2fs) {
					this.starttime = setbatime(this.value2fs[0]);
					this.endtime = setbatime(this.value2fs[1]);
					if (this.endtime - this.starttime < 86400) {
						this.valuecfs = 60;
					} else {
						this.valuecfs = 1440;
					}
				} else {
					this.starttime =
						new Date(new Date().toLocaleDateString()).getTime() /
						1000;
					this.endtime = Date.parse(new Date()) / 1000;
				}
				this.valuecfs = 60;
				this.fs_curve();
			} else {
				if (this.value2) {
					this.starttime = setbatime(this.value2[0]);
					this.endtime = setbatime(this.value2[1]);
					if (this.endtime - this.starttime < 86400) {
						this.valuec = 60;
					} else {
						this.valuec = 1440;
					}
				} else if (this.value2) {
					this.starttime =
						new Date(new Date().toLocaleDateString()).getTime() /
						1000;
					this.endtime = Date.parse(new Date()) / 1000;
				}
				this.valuecfs = 60;
				this.ip_surve();
			}
		},
		seach_operce_fs(value) {
			if (this.valueafs[1]) {
				this.city_disable_fs = false;
				this.onseach('fs');
				this.optionsbfs = this.citydata[value[1]].cities;
			} else {
				this.city_disable_fs = true;
			}
		},
		seach_operce_ip(value) {
			if (this.valuea[1]) {
				this.city_disable_ip = false;
				this.onseach();
				this.optionsb = this.citydata[value[1]].cities;
			} else {
				this.city_disable_ip = true;
			}
		},
		//今天
		set_today(mark) {
			this.starttime =
				new Date(new Date().toLocaleDateString()).getTime() / 1000;
			this.endtime = Date.parse(new Date()) / 1000;
			if (mark == 'fs') {
				this.valuecfs = 60;
				this.fs_curve();
			} else {
				this.valuec = 60;
				this.ip_surve();
			}
		},
		//昨天
		set_yesterday(mark) {
			this.starttime =
				new Date(new Date().toLocaleDateString()).getTime() / 1000 -
				24 * 60 * 60;
			this.endtime =
				new Date(new Date().toLocaleDateString()).getTime() / 1000;
			if (mark == 'fs') {
				this.valuecfs = 60;
				this.fs_curve();
			} else {
				this.valuecfs = 60;
				this.ip_surve();
			}
		},
		//七天
		set_sevenday(mark) {
			this.starttime =
				new Date(new Date().toLocaleDateString()).getTime() / 1000 -
				6 * 24 * 60 * 60;
			this.endtime = Date.parse(new Date()) / 1000;
			if (mark == 'fs') {
				this.valuecfs = 1440;
				this.fs_curve();
			} else {
				this.valuec = 1440;
				this.ip_surve();
			}
		},
		//三十天
		set_thirtyday(mark) {
			this.starttime =
				new Date(new Date().toLocaleDateString()).getTime() / 1000 -
				29 * 24 * 60 * 60;
			this.endtime = Date.parse(new Date()) / 1000;
			if (mark == 'fs') {
				this.valuecfs = 1440;
				this.fs_curve();
			} else {
				this.valuec = 1440;
				this.ip_surve();
			}
		},
		//获取页码--ip
		getpage(pages) {
			this.pageNo = pages;
			this.get_ip_table();
		},
		//获取每页数量--ip
		gettol(pagetol) {
			this.pagesize = pagetol;
			// this.get_ip_table();
		},
		//获取页码--fs
		getpagefs(pages) {
			this.fs_pageNo = pages;
			this.get_ip_table();
		},
		//获取每页数量--ip
		gettolfs(pagetol) {
			this.fs_pagesize = pagetol;
			// this.get_ip_table();
		},
		// 表头样式设置
		headClass() {
			return 'text-align: center;background:#F3F6FB;';
		},
		// 表格样式设置
		rowClass() {
			return 'text-align: center;';
		},
		//导出--FS
		fs_upload() {
			let params = new Object();
			if (this.inputfs !== '') {
				params.ipfs_id = this.inputfs;
			} else {
				params.ipfs_id = '*';
			}
			if (this.valueafs[1]) {
				params.region = this.valueafs[1];
			} else {
				params.region = '*';
			}
			if (this.valuebfs !== '') {
				params.city = this.valuebfs;
			} else {
				params.city = '*';
			}
			if (this.valuecfs !== '') {
				params.time_unit = parseInt(this.valuecfs);
			} else {
				params.time_unit = 120;
			}
			params.start_ts = this.starttime;
			params.end_ts = this.endtime;
			params.pageNo = this.fs_pageNo - 1;
			params.pageSize = this.fs_pageSize;
			query_ip_store_avg_usage_table(params)
				.then((res) => {
					this.fs_tableData_upload = [];
					if (res.status == 0) {
						this.fs_tableData_upload = res.data.list;
						this.exportExcel(
							this.fs_tableData_upload,
							'节点平均利用率FS存储'
						);
						this.fan.fanactionlog(
							'导出',
							'节点平均利用率FS存储',
							1
						);
					} else {
						this.fan.fanactionlog(
							'导出',
							'节点平均利用率FS存储',
							0
						);
					}
				})
				.catch((error) => {
					this.fan.fanactionlog('导出', '节点平均利用率FS存储', 0);
				});
		},
		//导出--IP
		ip_upload() {
			let params = new Object();
			if (this.input !== '') {
				params.ipfsId = this.input;
			} else {
				params.ipfsId = '*';
			}
			if (this.valuea[1]) {
				params.region = this.valuea[1];
			} else {
				params.region = '*';
			}
			if (this.valueb !== '') {
				params.city = this.valueb;
			} else {
				params.city = '*';
			}
			if (this.valuec !== '') {
				params.time_unit = parseInt(this.valuec);
			} else {
				params.time_unit = 120;
			}

			params.start_ts = this.starttime;
			params.end_ts = this.endtime;
			params.pageNo = this.fs_pageNo - 1;
			params.pageSize = this.fs_pageSize;
			query_ipfs_dataflow_avg_usage_table(params)
				.then((res) => {
					this.ip_tableData_upload = [];
					if (res.status == 0) {
						this.ip_tableData_upload = res.data.list;
						this.exportExcel(
							this.ip_tableData_upload,
							'节点平均利用率IP流量'
						);
						this.fan.fanactionlog(
							'导出',
							'节点平均利用率IP流量',
							1
						);
					} else {
						this.fan.fanactionlog(
							'导出',
							'节点平均利用率IP流量',
							0
						);
					}
				})
				.catch((error) => {
					this.fan.fanactionlog('导出', '节点平均利用率IP流量', 0);
				});
		},
		configure() {
			let myChart = echarts.init(document.getElementById('myChart3')); //这里是为了获得容器所在位置
			window.onresize = myChart.resize;
			let options = {
				title: {
					text: 'IP流量利用率',
				},
				xAxis: {
					type: 'category',
					data: this.timeArray,
				},
				yAxis: [
					// type: 'value'
					{
						type: 'value',
						axisLabel: {
							show: true,
							interval: 'auto',
							formatter: '{value} %',
						},
						show: true,
					},
				],
				grid: {
					x: 50,
					y: 50,
					x2: 50,
					y2: 60,
					borderWidth: 10,
				},
				series: [
					{
						data: this.avgDataFlowUtily,

						type: 'line',
						symbol: 'none',
						smooth: true,
						itemStyle: {
							normal: {
								color: '#09b0f5',
							},
						},
					},
				],
				axisLabel: {
					//坐标轴刻度标签的相关设置。
					formatter: function(params) {
						var newParamsName = ''; // 最终拼接成的字符串
						var paramsNameNumber = params.length; // 实际标签的个数
						var provideNumber = 6; // 每行能显示的字的个数
						var rowNumber = Math.ceil(
							paramsNameNumber / provideNumber
						); // 换行的话，需要显示几行，向上取整
						/**
						 * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
						 */
						// 条件等同于rowNumber>1
						if (paramsNameNumber > provideNumber) {
							/** 循环每一行,p表示行 */
							for (var p = 0; p < rowNumber; p++) {
								var tempStr = ''; // 表示每一次截取的字符串
								var start = p * provideNumber; // 开始截取的位置
								var end = start + provideNumber; // 结束截取的位置
								// 此处特殊处理最后一行的索引值
								if (p == rowNumber - 1) {
									// 最后一次不换行
									tempStr = params.substring(
										start,
										paramsNameNumber
									);
								} else {
									// 每一次拼接字符串并换行
									tempStr =
										params.substring(start, end) + '\n';
								}
								newParamsName += tempStr; // 最终拼成的字符串
							}
						} else {
							// 将旧标签的值赋给新标签
							newParamsName = params;
						}
						//将最终的字符串返回
						return newParamsName;
					},
				},
			};
			myChart.setOption(options);
		},
		configure1() {
			let myChart = echarts.init(document.getElementById('myChart4')); //这里是为了获得容器所在位置
			window.onresize = myChart.resize;
			let options = {
				title: {
					text: 'FS存储利用率',
				},
				xAxis: {
					type: 'category',
					data: this.fs_timeArray,
				},
				yAxis: [
					// type: 'value'

					{
						type: 'value',
						max: 100,
						min: 0,
						axisLabel: {
							show: true,
							interval: 'auto',
							formatter: '{value} %',
						},
						show: true,
					},
				],
				grid: {
					x: 50,
					y: 50,
					x2: 50,
					y2: 60,
					borderWidth: 10,
				},
				series: [
					{
						data: this.avgUsageArray,

						type: 'line',
						symbol: 'none',
						smooth: true,
						itemStyle: {
							normal: {
								color: '#09b0f5',
							},
						},
					},
				],
				axisLabel: {
					//坐标轴刻度标签的相关设置。
					formatter: function(params) {
						var newParamsName = ''; // 最终拼接成的字符串
						var paramsNameNumber = params.length; // 实际标签的个数
						var provideNumber = 6; // 每行能显示的字的个数
						var rowNumber = Math.ceil(
							paramsNameNumber / provideNumber
						); // 换行的话，需要显示几行，向上取整
						/**
						 * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
						 */
						// 条件等同于rowNumber>1
						if (paramsNameNumber > provideNumber) {
							/** 循环每一行,p表示行 */
							for (var p = 0; p < rowNumber; p++) {
								var tempStr = ''; // 表示每一次截取的字符串
								var start = p * provideNumber; // 开始截取的位置
								var end = start + provideNumber; // 结束截取的位置
								// 此处特殊处理最后一行的索引值
								if (p == rowNumber - 1) {
									// 最后一次不换行
									tempStr = params.substring(
										start,
										paramsNameNumber
									);
								} else {
									// 每一次拼接字符串并换行
									tempStr =
										params.substring(start, end) + '\n';
								}
								newParamsName += tempStr; // 最终拼成的字符串
							}
						} else {
							// 将旧标签的值赋给新标签
							newParamsName = params;
						}
						//将最终的字符串返回
						return newParamsName;
					},
				},
			};
			myChart.setOption(options);
		},
		exportExcel(dataupload, excelname) {
			require.ensure([], () => {
				const {
					export_json_to_excel,
				} = require('../../excel/Export2Excel.js');
				const tHeader = ['节点ID', '使用流量', '传输次数', '日期'];
				// 上面设置Excel的表格第一行的标题
				if (excelname == '节点平均利用率IP流量') {
					var filterVal = [
						'ipfsId',
						'dataFlow',
						'outputCnt',
						'timestamp',
					];
				} else {
					var filterVal = [
						'ipfsId',
						'storeUsage',
						'storeTimes',
						'timeStamp',
					];
				}

				// 上面的index、nickName、name是tableData里对象的属性
				const list = dataupload; //把data里的tableData存到list
				const data = this.formatJson(filterVal, list);
				export_json_to_excel(tHeader, data, excelname);
				dataupload = [];
			});
		},
		formatJson(filterVal, jsonData) {
			jsonData.forEach((item) => {
				if (item.timestamp) {
					item.timestamp = getymdtime(item.timestamp);
					return item;
				}
				if (item.timeStamp) {
					item.timeStamp = getymdtime(item.timeStamp);
					return item;
				}
			});
			return jsonData.map((v) =>
				filterVal.map((j) => {
					return v[j];
				})
			);
		},
	},
	filters: {
		//时间戳转时间
		getymd(time) {
			return getymdtime(time);
		},
	},
	components: {
		fenye,
	},
};
</script>

<style lang="scss" scoped>
.myself-container {
	.device_form {
		width: 100%;
		height: auto;
		overflow: hidden;
		margin-top: 20px;
		background: #f2f2f2;
		padding: 15px 30px;
		box-sizing: border-box;
		position: relative;
		.bottom {
			margin-top: 20px;
		}

		.el-form-item__label {
			white-space: nowrap;
		}

		.el-form-item {
			margin-bottom: 0px;
			margin-left: 10px;
		}

		.row_activess {
			margin-top: 20px;
			display: flex;
			justify-content: flex-start;
		}

		.div_show {
			width: auto;
			display: flex;
			height: 40px;
			justify-content: center;
			align-items: center;
			color: #409eff;
			cursor: pointer;
			margin-left: 20px;
		}
	}

	.devide_table {
		width: 100%;
		height: auto;
		overflow: hidden;
		margin-top: 20px;

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
}

.addaccout {
	.el-form--label-left .el-form-item__label {
		text-align: right;
		width: 90px;
	}

	.el-form-item__error {
		margin-left: 80px;
	}
}

.user-title .user-item {
	background: #f2f2f2;
	padding: 25px;
	border-radius: 5px;
	display: flex;
	justify-content: center;
	flex-direction: column;
}
.ip_upload_btn {
	position: absolute;
	top: 0;
	right: 180px;
	z-index: 2001;
	i {
		font-size: 20px;
	}
}
</style>
