<template>
	<section class="myself-container content">
		<div class="user-title" style="display: flex;flex-flow: column;">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>节点数据统计</el-breadcrumb-item>
				<el-breadcrumb-item>
					<a>节点平均利用率</a>
				</el-breadcrumb-item>
			</el-breadcrumb>
			<div style="margin-top:10px;">
				<el-tabs v-model="activeName" @tab-click="handleClick">
					<el-tab-pane label="IP流量" name="first">
						<!--  -->

						<div
							style="display: flex;flex-flow: row;margin:20px 10px 0 10px;"
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
								placeholder="请选择区域"
								style="margin-left:10px;"
								@change="onseach()"
							>
								<el-option value="*" label="全部"></el-option>
								<el-option
									v-for="item in optionsa"
									:key="item.value"
									:label="item.label"
									:value="item.value"
								>
								</el-option>
							</el-select>
							<el-select
								v-model="valueb"
								placeholder="请选择城市"
								style="margin-left:10px;"
								@change="onseach()"
							>
								<el-option value="*" label="全部"></el-option>
								<el-option
									v-for="item in optionsb"
									:key="item.value"
									:label="item.label"
									:value="item.value"
								>
								</el-option>
							</el-select>
							<el-select
								v-model="valuec"
								placeholder="时间粒度"
								style="margin-left:10px;"
								@change="onseach()"
							>
								<el-option
									v-for="item in granularity"
									:key="item.value"
									:label="item.label"
									:value="item.value"
									:disabled="item.disabled"
								></el-option>
							</el-select>
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
											prop="dataFlow"
											label="使用流量"
										>
											<template slot-scope="scope">
												<span
													v-if="
														scope.row.dataFlow ==
															0
													"
													>0</span
												><span v-else
													>{{
														(
															scope.row
																.dataFlow /
															1024 /
															1024 /
															1024
														).toFixed(2)
													}}G</span
												>
											</template>
										</el-table-column>
										<el-table-column
											prop="outputCnt"
											label="传输次数"
										>
										</el-table-column>
										<el-table-column
											prop="timestamp"
											label="日期"
										>
											<template slot-scope="scope">
												<span>{{
													scope.row.timestamp | getymd
												}}</span>
											</template>
										</el-table-column>
									</el-table>
								</el-col>
							</el-row>
							<!-- <fenye
                style="float:right;margin:10px 0 20px 0;"
                @fatherMethod="getpage"
                @fathernum="gettol"
                :pagesa="totalCnt"
                :currentPage="currentPage"
                v-if="tableData.length > 0"
              ></fenye> -->
						</div>
					</el-tab-pane>
					<el-tab-pane label="FS存储" name="second">
						<!--  -->

						<div
							style="display: flex;flex-flow: row;margin:20px 10px 0 10px;"
							class="seach_top"
						>
							<el-input
								v-model="inputfs"
								placeholder="节点ID"
								style="width: 15%;"
								@keyup.enter.native="onseach('fs')"
							></el-input>
							<el-select
								v-model="valueafs"
								placeholder="请选择区域"
								style="margin-left:10px;"
								@change="onseach('fs')"
							>
								<el-option
									v-for="item in optionsafs"
									:key="item.value"
									:label="item.label"
									:value="item.value"
								>
								</el-option>
							</el-select>
							<el-select
								v-model="valuebfs"
								placeholder="请选择城市"
								style="margin-left:10px;"
								@change="onseach('fs')"
							>
								<el-option
									v-for="item in optionsbfs"
									:key="item.value"
									:label="item.label"
									:value="item.value"
								>
								</el-option>
							</el-select>
							<el-select
								v-model="valuecfs"
								placeholder="时间粒度"
								style="margin-left:10px;"
								@change="onseach('fs')"
							>
								<el-option
									v-for="item in granularity"
									:key="item.value"
									:label="item.label"
									:value="item.value"
									:disabled="item.disabled"
								></el-option>
							</el-select>
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
											label="节点id"
										>
										</el-table-column>
										<el-table-column
											prop="storeUsage"
											label="使用流量"
										>
                                        <template slot-scope="scope">
												<span
													v-if="
														scope.row.storeUsage ==
															0
													"
													>0</span
												><span v-else
													>{{
														(
															scope.row
																.storeUsage /
															1024 /
															1024 /
															1024
														).toFixed(2)
													}}G</span
												>
											</template>
										</el-table-column>
										<el-table-column
											prop="storeTimes"
											label="传输次数"
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
							<!-- <fenye
                style="float:right;margin:10px 0 20px 0;"
                @fatherMethod="getpagefs"
                @fathernum="gettolfs"
                :pagesa="fs_totalCnt"
                :currentPage="currentPage"
                v-if="fs_tableData.length > 0"
              ></fenye> -->
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
	setbatime
} from '../../servers/sevdate';
import {
	ipfs_dataflow_query_conditions,
	query_ipfs_dataflow_avg_usage_curve,
	query_ipfs_dataflow_table,
	query_ip_store_avg_usage_curve,
	query_ip_store_details_table
} from '../../servers/api';
export default {
	data() {
		return {
			currentPage: 1,
			activeName: 'first',
			seachinput: '',
			input: '',
			inputfs: '',
			zidingyi: false,
			zidingyifs: false,
			pickerOptions: {
				shortcuts: [
					{
						text: '昨天',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(
								start.getTime() - 3600 * 1000 * 24 * 1
							);
							picker.$emit('pick', [start, end]);
						}
					},
					{
						text: '今天',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(
								start.getTime() - 3600 * 1000 * 24 * 7
							);
							picker.$emit('pick', [start, end]);
						}
					},
					{
						text: '最近一周',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(
								start.getTime() - 3600 * 1000 * 24 * 7
							);
							picker.$emit('pick', [start, end]);
						}
					},
					{
						text: '最近一个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(
								start.getTime() - 3600 * 1000 * 24 * 30
							);
							picker.$emit('pick', [start, end]);
						}
					}
				]
			},

			value2: '',
			value2fs: '',
			rowHeader: [
				{
					prop: 'time',
					label: '节点ID'
				},
				{
					prop: 'totals',
					label: '使用流量'
				},
				{
					prop: 'online_devices',
					label: '传输次数'
				},
				{
					prop: 'average_online',
					label: '日期'
				}
			],
			rowHeader1: [
				{
					prop: 'time',
					label: '节点ID'
				},
				{
					prop: 'totals',
					label: '存储容量'
				},
				{
					prop: 'online_devices',
					label: '存储次数'
				},
				{
					prop: 'average_online',
					label: '日期'
				}
			],
			tableData: [],
			granularity: [
				{
					value: 60,
					label: '一小时',
					disabled: true
				},
				{
					value: 1440,
					label: '一天',
					disabled: true
				}
			],
			optionsa: [],
			optionsb: [],
			valuea: '',
			valueb: '',
			valuec: '',
			optionsafs: [],
			optionsbfs: [],
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
			fs_totalCnt: 1
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
		//请求数据----获取搜索条件
		getseachinput() {
			let params = new Object();
			ipfs_dataflow_query_conditions(params)
				.then(res => {
					if (res.status == 0) {
						res.data.regionSet.forEach((item, index) => {
							let obj = {};
							obj.value = item;
							obj.label = item;
							this.optionsa.push(obj);
							this.optionsafs.push(obj);
						});
						res.data.citySet.forEach((item, index) => {
							let obj = {};
							obj.value = item;
							obj.label = item;
							this.optionsb.push(obj);
							this.optionsbfs.push(obj);
						});
					} else {
						this.$message.error(res.err_msg);
					}
				})
				.catch(Error => {});
		},
		ip_surve() {
			let params = new Object();
			if (this.input !== '') {
				params.ipfsId = this.input;
			} else {
				params.ipfsId = '*';
			}
			if (this.valuea !== '') {
				params.region = this.valuea;
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
				.then(res => {
					this.avgDataFlowUtily = [];
					this.timeArray = [];
					if (res.status == 0) {
						this.avgDataFlowUtily = res.data.avgDataFlowUtily;
						res.data.timeArray.forEach((item, index) => {
							this.timeArray.push(getymdtime(item));
						});
						this.configure();
						this.get_ip_table();
					} else {
						this.$message.error(res.errMsg);
					}
				})
				.catch(error => {});
		},
		fs_curve() {
			let params = new Object();
			if (this.inputfs !== '') {
				params.ipfs_id = this.inputfs;
			} else {
				params.ipfs_id = '*';
			}
			if (this.valueafs !== '') {
				params.region = this.valueafs;
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
				.then(res => {
					this.avgUsageArray = [];
					this.fs_timeArray = [];
					if (res.status == 0) {
						this.avgUsageArray = res.data.avgUsageArray;
						res.data.timeArray.forEach((item, index) => {
							this.fs_timeArray.push(getymdtime(item));
						});
						this.configure1();
						this.get_fs_table();
					} else {
						this.$message.error(res.errMsg);
					}
				})
				.catch(Error => {});
		},
		get_ip_table() {
			let params = new Object();
			if (this.input !== '') {
				params.ipfsId = this.input;
			} else {
				params.ipfsId = '*';
			}
			if (this.valuea !== '') {
				params.region = this.valuea;
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
			query_ipfs_dataflow_table(params)
				.then(res => {
					this.tableData = [];
					if (res.status == 0) {
						this.tableData = res.data.list;
						this.totalCnt = res.data.totalCnt;
					} else {
						this.$message.error(res.err_msg);
					}
				})
				.catch(error => {});
		},
		get_fs_table() {
			let params = new Object();
			if (this.inputfs !== '') {
				params.ipfs_id = this.inputfs;
			} else {
				params.ipfs_id = '*';
			}
			if (this.valueafs !== '') {
				params.region = this.valueafs;
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
			query_ip_store_details_table(params)
				.then(res => {
					this.fs_tableData = [];
					if (res.status == 0) {
						this.fs_tableData = res.data.list;
						this.fs_totalCnt = res.data.totalCnt;
					} else {
						this.$message.error(res.err_msg);
					}
				})
				.catch(error => {});
		},
		//选项卡
		handleClick(tab, event) {
			this.granularity[0].disabled = false;
			this.granularity[1].disabled = true;
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
				if (this.value2fs != '') {
					this.starttime = setbatime(this.value2fs[0]);
					this.endtime = setbatime(this.value2fs[1]);
					if (this.endtime - this.starttime < 86400) {
						this.granularity[0].disabled = false;
						this.granularity[1].disabled = true;
						this.valuecfs = 60;
					} else {
						this.granularity[0].disabled = true;
						this.granularity[1].disabled = false;
						this.valuecfs = 1440;
					}
				}
				this.valuecfs = 60;
				this.fs_curve();
			} else {
				if (this.value2 != '') {
					this.starttime = setbatime(this.value2[0]);
					this.endtime = setbatime(this.value2[1]);
					if (this.endtime - this.starttime < 86400) {
						this.granularity[0].disabled = false;
						this.granularity[1].disabled = true;
						this.valuec = 60;
					} else {
						this.granularity[0].disabled = true;
						this.granularity[1].disabled = false;
						this.valuec = 1440;
					}
				}
				this.valuecfs = 60;
				this.ip_surve();
			}
		},
		//今天
		set_today(mark) {
			this.starttime =
				new Date(new Date().toLocaleDateString()).getTime() / 1000;
			this.endtime = Date.parse(new Date()) / 1000;
			if (mark == 'fs') {
				this.granularity[0].disabled = false;
				this.granularity[1].disabled = true;
				this.valuecfs = 60;
				this.fs_curve();
			} else {
				this.granularity[0].disabled = false;
				this.granularity[1].disabled = true;
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
				this.granularity[0].disabled = false;
				this.granularity[1].disabled = true;
				this.valuecfs = 60;
				this.fs_curve();
			} else {
				this.granularity[0].disabled = false;
				this.granularity[1].disabled = true;
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
				this.granularity[0].disabled = true;
				this.granularity[1].disabled = false;
				this.valuecfs = 1440;
				this.fs_curve();
			} else {
				this.granularity[0].disabled = true;
				this.granularity[1].disabled = false;
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
				this.granularity[0].disabled = true;
				this.granularity[1].disabled = false;
				this.valuecfs = 1440;
				this.fs_curve();
			} else {
				this.granularity[0].disabled = true;
				this.granularity[1].disabled = false;
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

		configure() {
			let myChart = echarts.init(document.getElementById('myChart3')); //这里是为了获得容器所在位置
			window.onresize = myChart.resize;
			let options = {
				title: {
					text: 'IP流量利用率'
				},
				xAxis: {
					type: 'category',
					data: this.timeArray
				},
				yAxis: {
					type: 'value'
				},
				series: [
					{
						data: this.avgDataFlowUtily,

						type: 'line',
						symbol: 'none',
						smooth: true,
						itemStyle: {
							normal: {
								color: '#09b0f5'
							}
						}
					}
				]
			};
			myChart.setOption(options);
		},
		configure1() {
			let myChart = echarts.init(document.getElementById('myChart4')); //这里是为了获得容器所在位置
			window.onresize = myChart.resize;
			let options = {
				title: {
					text: 'FS存储利用率'
				},
				xAxis: {
					type: 'category',
					data: this.fs_timeArray
				},
				yAxis: {
					type: 'value'
				},
				series: [
					{
						data: this.avgUsageArray,

						type: 'line',
						symbol: 'none',
						smooth: true,
						itemStyle: {
							normal: {
								color: '#09b0f5'
							}
						}
					}
				]
			};
			myChart.setOption(options);
		}
	},
	filters: {
		//时间戳转时间
		getymd(time) {
			return getymdtime(time);
		}
	},
	components: {
		fenye
	}
};
</script>

<style lang="scss">
.myself-container {
	.device_form {
		width: 100%;
		height: auto;
		overflow: hidden;
		margin-top: 20px;
		background: #f2f2f2;
		padding: 15px 30px;
		box-sizing: border-box;

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
</style>
