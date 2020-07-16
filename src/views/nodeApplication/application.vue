<template>
	<section class="myself-container content">
		<div class="user-title" style="display: flex;flex-flow: column;">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>
					<a>节点应用统计</a>
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
								v-model="firstvaluea"
								placeholder="请选择一级节点"
								style="margin-left:10px;width: 8%;"
								@change="handleChangefirst($event)"
							>
								<el-option value="*" label="全部"></el-option>
								<el-option
									v-for="(item, index) in firstchan"
									:key="item.name + index"
									:label="item.name"
									:value="item.value"
								></el-option>
							</el-select>
							<el-select
								v-model="secondvalue"
								placeholder="请选择二级节点"
								style="margin-left:10px;width: 8%;"
								:disabled="chil_disable"
								@change="onseach"
							>
								<el-option value="*" label="全部"></el-option>
								<el-option
									v-for="(item, index) in secondchan"
									:key="item.value + index"
									:label="item.name"
									:value="item.value"
								></el-option>
							</el-select>
							<el-select
								v-model="devtypevalue"
								placeholder="请选择硬件设备"
								style="margin-left:10px;width: 8%;"
								@change="onseach"
							>
								<el-option value="*" label="全部"></el-option>
								<el-option
									v-for="(item, index) in device_type"
									:key="item.name + index"
									:label="item.name"
									:value="item.name"
								></el-option>
							</el-select>
							<el-cascader
								style="margin-left:10px;width: 9%;"
								placeholder="请选择区域"
								v-model="valuea"
								:options="optionsafs"
								@change="seach_operce"
							></el-cascader>
							<el-select
								v-model="valueb"
								placeholder="请选择城市"
								style="margin-left:10px;width: 8%;"
								@change="onseach"
								:disabled="city_disable_ip"
							>
								<!-- <el-option value="*" label="全部"></el-option> -->
								<el-option
									v-for="(item, index) in optionsb"
									:key="item.name + index"
									:label="item.name"
									:value="item.name"
								></el-option>
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
							</el-button-group>
							<el-radio-group
								v-show="zidingyi == false"
								v-model="radio"
								@change="change_time('ip')"
								style="margin-right:10px;"
							>
								<el-radio-button label="0"
									>今天</el-radio-button
								>
								<el-radio-button label="1"
									>昨天</el-radio-button
								>
								<el-radio-button label="2">7天</el-radio-button>
								<el-radio-button label="3"
									>30天</el-radio-button
								>
								<el-radio-button label="4"
									>自定义</el-radio-button
								>
							</el-radio-group>
							<el-button
								style="margin-right:10px;"
								type="primary"
								@click="showpicker"
								v-if="zidingyi == true"
								>自定义</el-button
							>
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
							></el-date-picker>
							<el-button type="primary" @click="onseach"
								>查询</el-button
							>
						</div>
						<!--  -->
						<el-row style="margin-top:20px;">
							<el-col :span="5">
								<div class="user-item">
									<div class="item-text">累计使用流量</div>
									<div class="item-count">
										{{ totalDataFlow | zhuanbkb }}
									</div>
								</div>
							</el-col>
							<el-col :span="5" style="margin-left:30px;">
								<div class="user-item">
									<div class="item-text">累计传输次数</div>
									<div class="item-count">
										{{ totalOutputCnt }}次
									</div>
								</div>
							</el-col>
							<!-- <el-col :span="5" style="margin-left:30px;">
                <div class="user-item">
                  <div class="item-count">21.66MB/s</div>
                  <div class="item-text">带宽峰值</div>
                </div>
              </el-col>-->
						</el-row>
						<div class="device_form">
							<el-button
								class="ip_upload_btn"
								@click="ip_upload"
								type="text"
								size="medium"
								v-show="menutype.roleE == 1"
							>
								<i class="el-icon-download"></i>
							</el-button>
							<div
								id="myChart"
								:style="{ height: '300px' }"
							></div>
						</div>
						<div class="devide_table">
							<el-row type="flex" class="row_active">
								<el-col
									:span="24"
									style="text-align:left;    font-weight: bold;"
									>IP流量表</el-col
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
											prop="ipfsHashId"
											label="节点id"
										></el-table-column>
										<el-table-column
											prop="dataFlow"
											label="使用流量"
										>
											<template slot-scope="scope">
												<span
													v-if="
														scope.row.dataFlow == 0
													"
													>0</span
												>
												<span v-else>
													{{
														scope.row.dataFlow
															| zhuanbkb
													}}
												</span>
											</template>
										</el-table-column>
										<el-table-column
											prop="outputCount"
											label="传输次数"
										></el-table-column>
										<el-table-column
											prop="timestamp"
											label="日期"
										>
											<template slot-scope="scope">
												<span>
													{{
														scope.row.timeReport
															| getymd
													}}
												</span>
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
								v-show="tableData.length > 0"
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
								style="width: 10%;width: 15%;"
								@keyup.enter.native="onseach('fs')"
							></el-input>
							<el-select
								v-model="firstvaluea_fs"
								placeholder="请选择一级节点"
								style="margin-left:10px;width: 8%;"
								@change="handleChangefirst_fs($event)"
							>
								<el-option value="*" label="全部"></el-option>
								<el-option
									v-for="(item, index) in firstchan"
									:key="item.name + index"
									:label="item.name"
									:value="item.value"
								></el-option>
							</el-select>
							<el-select
								v-model="secondvalue_fs"
								placeholder="请选择二级节点"
								style="margin-left:10px;width: 8%;"
								:disabled="chil_disable_fs"
								@change="onseach('fs')"
							>
								<el-option value="*" label="全部"></el-option>
								<el-option
									v-for="(item, index) in firstchan"
									:key="item.name + index"
									:label="item.name"
									:value="item.value"
								>
								</el-option>
							</el-select>
							<el-select
								v-model="devtypevalue_fs"
								placeholder="请选择硬件设备"
								style="margin-left:10px;width: 8%;"
								@change="onseach('fs')"
							>
								<el-option value="*" label="全部"></el-option>
								<el-option
									v-for="(item, index) in device_type"
									:key="item.name + index"
									:label="item.name"
									:value="item.name"
								></el-option>
							</el-select>
							<el-cascader
								style="margin-left:10px;width: 9%;"
								placeholder="请选择区域"
								v-model="valueafs"
								:options="optionsafs"
								@change="seach_operce_fs"
							></el-cascader>
							<el-select
								v-model="valuebfs"
								placeholder="请选择城市"
								style="margin-left:10px;width: 8%;"
								@change="onseach('fs')"
								:disabled="city_disable_fs"
							>
								<el-option
									v-for="(item, index) in optionsbfs"
									:key="index"
									:label="item.name"
									:value="item.name"
								></el-option>
							</el-select>
							<el-radio-group
								v-show="zidingyifs == false"
								v-model="radio"
								@change="change_time('fs')"
								style="margin-right:10px;margin-left:10px;"
							>
								<el-radio-button label="0"
									>今天</el-radio-button
								>
								<el-radio-button label="1"
									>昨天</el-radio-button
								>
								<el-radio-button label="2">7天</el-radio-button>
								<el-radio-button label="3"
									>30天</el-radio-button
								>
								<el-radio-button label="4"
									>自定义</el-radio-button
								>
							</el-radio-group>
							<el-button
								@click="showpickerfs"
								v-if="zidingyifs == true"
								style="margin-right:10px;margin-left:10px;"
								type="primary"
								>自定义</el-button
							>
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
							></el-date-picker>
							<el-button type="primary" @click="onseach('fs')"
								>查询</el-button
							>
						</div>

						<!--  -->
						<el-row style="margin-top:20px;">
							<el-col :span="5">
								<div class="user-item">
									<div class="item-text">累计存储容量</div>
									<div class="item-count">
										{{ totalStoreUsage | zhuanbkb }}
									</div>
								</div>
							</el-col>
							<el-col :span="5" style="margin-left:30px;">
								<div class="user-item">
									<div class="item-text">累计存储次数</div>
									<div class="item-count">
										{{ totalStoreTimes }}次
									</div>
								</div>
							</el-col>
						</el-row>
						<div class="device_form">
							<el-button
								class="ip_upload_btn"
								@click="fs_upload"
								type="text"
								size="medium"
								v-show="menutype.roleE == 1"
							>
								<i class="el-icon-download"></i>
							</el-button>
							<div
								id="myChart1"
								:style="{ height: '300px' }"
							></div>
						</div>
						<div class="devide_table">
							<el-row type="flex" class="row_active">
								<el-col
									:span="24"
									style="text-align:left;font-weight: bold;"
									>FS存储表</el-col
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
										></el-table-column>
										<el-table-column
											prop="storeUsage"
											label="存储容量"
										>
											<template slot-scope="scope">
												<span
													v-if="
														scope.row.storeUsage ==
															0
													"
													>0</span
												>
												<span v-else>
													{{
														scope.row.storeUsage
															| zhuanbkb
													}}
												</span>
											</template>
										</el-table-column>
										<el-table-column
											prop="storeTimes"
											label="存储次数"
										></el-table-column>
										<el-table-column
											prop="timestamp"
											label="日期"
										>
											<template slot-scope="scope">
												<span>
													{{
														scope.row.timeStamp
															| getymd
													}}
												</span>
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
								:currentPage="fs_currentPage"
								v-show="fs_tableData.length > 0"
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
import fenye from '../../components/fenye';
import axios from 'axios';
import {
	getlocaltimes,
	settime,
	getymdtime,
	setbatime,
	getday,
	menudisable,
	zhuanbkbs,
	msToDate,
	formatterDate,
} from '../../servers/sevdate';
import {
	ipfs_dataflow_query_conditions,
	query_ipfs_dataflow_curve,
	query_ipfs_dataflow_table,
	query_ip_store_details_curve,
	query_ip_store_details_table,
	get_nodetype_enum,
} from '../../servers/api';
export default {
	data() {
		return {
			currentPage: 1,
			fs_currentPage: 1,
			activeName: 'first',
			input: '',
			firstvaluea: '',
			secondvalue: '',
			devtypevalue: '',
			firstvaluea_fs: '',
			secondvalue_fs: '',
			devtypevalue_fs: '',
			inputfs: '',
			zidingyi: false,
			city_disable_ip: true,
			city_disable_fs: true,
			zidingyifs: false,
			radio: 0,
			pickerOptions: {
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
			value1: '',
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
			tableData: [],
			optionsa: [],
			optionsb: [],
			valuea: '',
			valueb: '',
			optionsafs: [
				{
					value: -1,
					label: '全部',
					id: -1,
				},
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
			optionsbfs: [],
			valueafs: '',
			valuebfs: '',
			valuecfs: '',
			starttime: '',
			endtime: '',
			totalDataFlow: '',
			totalOutputCnt: '',
			totalStoreTimes: '',
			totalStoreUsage: '',
			dataFlowArray: [],
			timeArray: [],
			storeUsageArray: [],
			fs_timeArray: [],
			fs_tableData: [],
			pageNo: 1,
			pageSize: 10,
			totalCnt: 1,
			fs_pageNo: 1,
			fs_pageSize: 10,
			fs_totalCnt: 1,
			citydata: [],
			fs_tableData_upload: [],
			ip_tableData_upload: [],
			arch: [
				//硬件类型
			],
			device_type: [
				//设备类型
			],
			os: [
				//操作系统
			],
			isp: [
				//运营商
			],
			firstchan: [
				//一级渠道商
				// {
				// 	name: '云链',
				// 	secondchan: [
				// 		{ name: '云链', value: 's_computer.unknown_yunlian' },
				// 	],
				// 	value: 'f_computer.unknown_yunlian',
				// },
			],
			secondchan: [],
			chil_disable: true,
			chil_disable_fs: true,
			menutype: {},
		};
	},
	filters: {
		//时间戳转时间
		getymd(time) {
			return getymdtime(time);
		},
		zhuanbkb(bytes) {
			if (bytes === 0) return '0 B';
			if (bytes < 0) {
				var byt = Math.abs(bytes);
				var b = 1024,
					bsize = [
						'B',
						'KB',
						'MB',
						'GB',
						'TB',
						'PB',
						'EB',
						'ZB',
						'YB',
					],
					n = Math.floor(Math.log(byt) / Math.log(b));
				return '-' + (byt / Math.pow(b, n)).toFixed(2) + ' ' + bsize[n];
			}
			var k = 1024,
				sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
				i = Math.floor(Math.log(bytes) / Math.log(k));
			return (bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i];
		},
	},
	components: {
		fenye,
	},
	mounted() {
		this.getseachinput();
		this.get_search_data();
		if (sessionStorage.getItem('search_condition')) {
			let search_data = JSON.parse(
				sessionStorage.getItem('search_condition')
			);
			let city_list = JSON.parse(sessionStorage.getItem('citylist'));
			this.activeName = search_data.activeName;
			this.radio = search_data.radio;
			var timearr = [];
			if (this.radio == 4) {
				timearr[0] = formatterDate(
					msToDate(search_data.start_ts * 1000).hasTime
				);
				timearr[1] = formatterDate(
					msToDate(search_data.end_ts * 1000).hasTime
				);
				if (this.activeName == 'first') {
					this.zidingyi = true;
					this.value2 = timearr;
					this.onseach('ip');
				} else {
					this.zidingyifs = true;
					this.value2fs = timearr;
					this.onseach('fs');
				}
			} else {
				if (this.activeName == 'first') {
					this.input =
						search_data.ipfsId == '*' ? '' : search_data.ipfsId;
					if (search_data.region == '*') {
						this.valuea = '';
					} else {
						this.valuea = [search_data.qu, search_data.region];
						this.city_disable_ip = false;
						this.valueb = '';
						this.optionsb = city_list[this.valuea[1]].cities;
					}
					this.valueb =
						search_data.city == '*' ? '' : search_data.city;
					this.firstvaluea =
						search_data.first_channel == '*'
							? ''
							: search_data.first_channel;
					this.secondvalue =
						search_data.second_channel == '*'
							? ''
							: search_data.second_channel;
					this.devtypevalue =
						search_data.device_type == '*'
							? ''
							: search_data.device_type;
					this.change_time('ip');
				} else {
					this.inputfs =
						search_data.ipfs_id == '*' ? '' : search_data.ipfs_id;

					if (search_data.region == '*') {
						this.valueafs = '';
					} else {
						this.valueafs = [search_data.qu, search_data.region];
						this.city_disable_fs = false;
						this.valuebfs = '';
						this.optionsb = city_list[this.valueafs[1]].cities;
					}
                    this.valuebfs =search_data.city == '*' ? '' : search_data.city;
					this.firstvaluea_fs =
						search_data.first_channel == '*'
							? ''
							: search_data.first_channel;
					this.secondvalue_fs =
						search_data.second_channel == '*'
							? ''
							: search_data.second_channel;
					this.devtypevalue_fs =
						search_data.device_type == '*'
							? ''
							: search_data.device_type;

					this.change_time('fs');
				}
			}
		} else {
			this.starttime =
				new Date(new Date().toLocaleDateString()).getTime() / 1000;
			this.endtime = Date.parse(new Date()) / 1000;
			this.ip_curve();
		}
			let munulist = JSON.parse(localStorage.getItem('menus'));
			let pathname = this.$route.path;
			this.menutype = menudisable(munulist, pathname);
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
						this.isp = res.data.isp;
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
				sessionStorage.setItem('citylist', JSON.stringify(res.data));
			});
		},
		seach_operce(value) {
			console.log(value);
			this.currentPage = 1;
			if (value == -1) {
				this.value1 = -1;
				this.city_disable_ip = true;
				this.valueb = '';
				this.ip_curve();
			} else {
				this.city_disable_ip = false;
				this.valueb = '';
				this.optionsb = this.citydata[value[1]].cities;
				this.ip_curve();
			}
		},
		seach_operce_fs(value) {
			this.fs_currentPage = 1;
			if (value == -1) {
				this.value1 = -1;
				this.city_disable_fs = true;
				this.valuebfs = '';
				this.fs_curve();
			} else {
				this.optionsbfs = this.citydata[value[1]].cities;
				this.city_disable_fs = false;
				this.valuebfs = '';
				this.fs_curve();
			}
		},
		//请求数据--ip节点曲线,
		ip_curve() {
			let params = new Object();
			if (this.input !== '') {
				params.ipfsId = this.input;
			} else {
				params.ipfsId = '*';
			}
			if (this.valuea !== '') {
				if (this.valuea == -1) {
					params.region = '*';
				} else {
					params.qu = this.valuea[0];
					params.region = this.valuea[1];
				}
			} else {
				params.region = '*';
			}
			if (this.valueb !== '') {
				if (this.valueb == '全部') {
					params.city = '*';
				} else {
					params.city = this.valueb;
				}
			} else {
				params.city = '*';
			}
			if (this.firstvaluea == '') {
				params.first_channel = '*';
			} else {
				params.first_channel = this.firstvaluea;
			}
			if (this.secondvalue == '') {
				params.second_channel = '*';
			} else {
				params.second_channel = this.secondvalue;
			}
			if (this.devtypevalue == '') {
				params.device_type = '*';
			} else {
				params.device_type = this.devtypevalue;
			}
			params.time_unit = this.time_unit;
			params.start_ts = this.starttime;
			params.end_ts = this.endtime;
			if (params.end_ts - params.start_ts > 2505600) {
				params.time_unit = 1440;
			} else if (params.end_ts - params.start_ts > 86400) {
				params.time_unit = 60;
			} else if (params.end_ts - params.start_ts > 21600) {
				params.time_unit = 5;
			} else {
				params.time_unit = 1;
			}
			params.radio = this.radio;
			params.activeName = this.activeName;
			this.totalOutputCnt = 0;
			this.totalDataFlow = 0;
			this.dataFlowArray = [];
			this.timeArray = [];
			sessionStorage.setItem('search_condition', JSON.stringify(params));
			query_ipfs_dataflow_curve(params)
				.then((res) => {
					if (res.status == 0) {
						this.totalOutputCnt = res.data.totalOutputCnt;
						this.totalDataFlow = res.data.totalDataFlow;
						res.data.dataFlowArray.forEach((item) => {
							this.dataFlowArray.push(
								(item / 1024 / 1024 / 1024).toFixed(2)
							);
						});
						// this.dataFlowArray = res.data.dataFlowArray;
						res.data.timeArray.forEach((item, index) => {
							this.timeArray.push(getday(item));
						});
						this.drawLine();
						this.get_ip_table();
					} else {
						this.$message.error(res.errMsg);
					}
				})
				.catch((Error) => {});
		},
		fs_curve() {
			let params = new Object();
			if (this.inputfs !== '') {
				params.ipfs_id = this.inputfs;
			} else {
				params.ipfs_id = '*';
			}
			if (this.valueafs !== '') {
				if (this.valueafs == -1) {
					params.region = '*';
				} else {
					params.qu = this.valueafs[0];
					params.region = this.valueafs[1];
				}
			} else {
				params.region = '*';
			}
			if (this.valuebfs !== '') {
				if (this.valuebfs == '全部') {
					params.city = '*';
				} else {
					params.city = this.valuebfs;
				}
			} else {
				params.city = '*';
			}

			if (this.valuecfs !== '') {
				params.time_unit = parseInt(this.valuecfs);
			} else {
				params.time_unit = 120;
			}
			if (this.firstvaluea_fs == '') {
				params.first_channel = '*';
			} else {
				params.first_channel = this.firstvaluea_fs;
			}
			if (this.secondvalue_fs == '') {
				params.second_channel = '*';
			} else {
				params.second_channel = this.secondvalue_fs;
			}
			if (this.devtypevalue_fs == '') {
				params.device_type = '*';
			} else {
				params.device_type = this.devtypevalue_fs;
			}
			params.start_ts = this.starttime;
			params.end_ts = this.endtime;
			if (params.end_ts - params.start_ts > 2505600) {
				params.time_unit = 1440;
			} else if (params.end_ts - params.start_ts > 86400) {
				params.time_unit = 60;
			} else if (params.end_ts - params.start_ts > 21600) {
				params.time_unit = 5;
			} else {
				params.time_unit = 1;
			}
			params.radio = this.radio;
			params.activeName = this.activeName;
			this.totalStoreTimes = 0;
			this.totalStoreUsage = 0;
			this.storeUsageArray = [];
			this.fs_timeArray = [];
			sessionStorage.setItem('search_condition', JSON.stringify(params));
			query_ip_store_details_curve(params)
				.then((res) => {
					if (res.status == 0) {
						this.totalStoreTimes = res.data.totalStoreTimes;
						this.totalStoreUsage = res.data.totalStoreUsage;
						// this.storeUsageArray = res.data.storeUsageArray;
						res.data.storeUsageArray.forEach((item) => {
							this.storeUsageArray.push(
								(item / 1024 / 1024 / 1024).toFixed(2)
							);
						});
						res.data.timeArray.forEach((item, index) => {
							this.fs_timeArray.push(getday(item));
						});
						this.drawLine1();
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
			if (this.valuea !== '') {
				if (this.valuea == -1) {
					params.region = '*';
				} else {
					params.region = this.valuea[1];
				}
			} else {
				params.region = '*';
			}
			if (this.valueb !== '') {
				params.city = this.valueb;
			} else {
				params.city = '*';
			}
			if (this.firstvaluea == '') {
				params.first_channel = '*';
			} else {
				params.first_channel = this.firstvaluea;
			}
			if (this.secondvalue == '') {
				params.second_channel = '*';
			} else {
				params.second_channel = this.secondvalue;
			}
			if (this.devtypevalue == '') {
				params.device_type = '*';
			} else {
				params.device_type = this.devtypevalue;
			}
			params.start_ts = this.starttime;
			params.end_ts = this.endtime;
			params.pageNo = this.currentPage - 1;
			params.pageSize = this.pageSize;
			if (params.end_ts - params.start_ts > 2505600) {
				params.time_unit = 1440;
			} else if (params.end_ts - params.start_ts > 86400) {
				params.time_unit = 60;
			} else if (params.end_ts - params.start_ts > 21600) {
				params.time_unit = 5;
			} else {
				params.time_unit = 1;
			}
			query_ipfs_dataflow_table(params)
				.then((res) => {
					this.tableData = [];
					if (res.status == 0) {
						this.tableData = res.data.list;
						this.totalCnt = res.data.totalCnt;
					} else {
						this.$message.error(res.errMsg);
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
			if (this.valueafs !== '') {
				if (this.valueafs == -1) {
					params.region = '*';
				} else {
					params.region = this.valueafs[1];
				}
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
			if (this.firstvaluea_fs == '') {
				params.first_channel = '*';
			} else {
				params.first_channel = this.firstvaluea_fs;
			}
			if (this.secondvalue_fs == '') {
				params.second_channel = '*';
			} else {
				params.second_channel = this.secondvalue_fs;
			}
			if (this.devtypevalue_fs == '') {
				params.device_type = '*';
			} else {
				params.device_type = this.devtypevalue_fs;
			}
			params.start_ts = this.starttime;
			params.end_ts = this.endtime;
			params.pageNo = this.fs_currentPage - 1;
			params.pageSize = this.fs_pageSize;
			if (params.end_ts - params.start_ts > 2505600) {
				params.time_unit = 1440;
			} else if (params.end_ts - params.start_ts > 86400) {
				params.time_unit = 60;
			} else if (params.end_ts - params.start_ts > 21600) {
				params.time_unit = 5;
			} else {
				params.time_unit = 1;
			}
			query_ip_store_details_table(params)
				.then((res) => {
					this.fs_tableData = [];
					if (res.status == 0) {
						this.fs_tableData = res.data.list;
						this.fs_totalCnt = res.data.totalCnt;
					} else {
						this.$message.error(res.errMsg);
					}
				})
				.catch((error) => {});
		},
		//选项卡
		handleClick(tab, event) {
			this.radio = 0;
			this.fs_currentPage = 1;
			this.currentPage = 1;
			this.starttime =
				new Date(new Date().toLocaleDateString()).getTime() / 1000;
			this.endtime = Date.parse(new Date()) / 1000;
			this.zidingyi = false;
			this.zidingyifs = false;
			this.valueafs = '';
			this.valuebfs = '';
			this.valuea = '';
			this.valueb = '';
			this.city_disable_fs = true;
			this.city_disable_ip = true;
			this.chil_disable_fs = true;
			this.chil_disable = true;
			this.firstvaluea_fs = '';
			this.secondvalue_fs = '';
			this.firstvaluea = '';
			this.secondvalue = '';
			this.value2 = '';
			this.value2fs = '';
			this.inputfs = '';
			this.input = '';
			this.devtypevalue_fs = '';
			this.devtypevalue = '';
			if (tab.index == '1') {
				this.fs_curve();
			} else {
				this.ip_curve();
			}
		},
		//导出
		fs_upload() {
			let params = new Object();
			if (this.inputfs !== '') {
				params.ipfs_id = this.inputfs;
			} else {
				params.ipfs_id = '*';
			}
			if (this.valueafs !== '') {
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
			params.pageNo = this.fs_currentPage - 1;
			params.pageSize = this.fs_pageSize;
			query_ip_store_details_table(params)
				.then((res) => {
					this.fs_tableData_upload = [];
					if (res.status == 0) {
						this.fs_tableData_upload = res.data.list;
						this.exportExcel(
							this.fs_tableData_upload,
							'节点应用统计FS存储'
						);
						this.fan.fanactionlog('导出', '节点应用统计FS存储', 1);
					} else {
						this.fan.fanactionlog('导出', '节点应用统计FS存储', 0);
					}
				})
				.catch((error) => {
					this.fan.fanactionlog('导出', '节点应用统计FS存储', 0);
				});
		},
		ip_upload() {
			let params = new Object();
			if (this.input !== '') {
				params.ipfsId = this.input;
			} else {
				params.ipfsId = '*';
			}
			if (this.valuea !== '') {
				params.region = this.valuea[1];
			} else {
				params.region = '*';
			}
			if (this.valueb !== '') {
				params.city = this.valueb;
			} else {
				params.city = '*';
			}
			params.start_ts = this.starttime;
			params.end_ts = this.endtime;
			params.pageNo = this.currentPage - 1;
			params.pageSize = this.pageSize;
			query_ipfs_dataflow_table(params)
				.then((res) => {
					this.ip_tableData_upload = [];
					if (res.status == 0) {
						this.ip_tableData_upload = res.data.list;
						this.exportExcel(
							this.ip_tableData_upload,
							'节点应用统计IP流量'
						);
						this.fan.fanactionlog('导出', '节点应用统计IP流量', 1);
					} else {
						this.fan.fanactionlog('导出', '节点应用统计IP流量', 0);
					}
				})
				.catch((error) => {
					this.fan.fanactionlog('导出', '节点应用统计IP流量', 0);
				});
		},
		//自定义按钮--ip
		showpicker() {
			this.zidingyi = !this.zidingyi;
			console.log(this.zidingyi);
			if (this.zidingyi == false) {
				this.radio = 0;
			} else {
				this.radio = 4;
			}
			this.change_time('ip');
			this.value2 = '';
		},
		////自定义按钮--fs
		showpickerfs() {
			this.zidingyifs = !this.zidingyifs;
			if (this.zidingyifs == false) {
				this.radio = 0;
			} else {
				this.radio = 4;
			}
			this.change_time('fs');
			this.value2fs = '';
		},
		handleChangefirst(val) {
			if (val == '*' || val == '') {
				this.secondvalue = '';
				this.chil_disable = true;
				this.secondchan = [];
			} else {
				this.firstchan.find((item) => {
					if (item.value === val) {
						//筛选出匹配数据
						this.secondchan = item.secondchan;
						this.chil_disable = false;
					} else {
						this.chil_disable = true;
					}
				});
			}
			this.ip_curve();
		},
		handleChangefirst_fs(val) {
			if (val == '*' || val == '') {
				this.secondvalue_fs = '';
				this.chil_disable_fs = true;
				this.secondchan = [];
			} else {
				this.firstchan.find((item) => {
					if (item.value === val) {
						//筛选出匹配数据
						this.secondchan = item.secondchan;
						this.chil_disable_fs = false;
					} else {
						this.chil_disable_fs = true;
					}
				});
			}
			this.fs_curve();
		},
		//搜索
		onseach(stat) {
			this.fs_currentPage = 1;
			this.currentPage = 1;
			if (stat === 'fs') {
				if (this.value2fs != null && this.value2fs != '') {
					console.log(this.value2fs);
					this.starttime = setbatime(this.value2fs[0]);
					this.endtime = setbatime(this.value2fs[1]);
					if (this.endtime - this.starttime < 86400) {
						this.valuecfs = 60;
					} else {
						this.valuecfs = 1440;
					}
				}
				//  else {
				// 	this.starttime =
				// 		new Date(new Date().toLocaleDateString()).getTime() /
				// 		1000;
				// 	this.endtime = Date.parse(new Date()) / 1000;
				// }
				this.fs_curve();
			} else {
				if (this.value2 != null && this.value2 != '') {
					this.starttime = setbatime(this.value2[0]);
					this.endtime = setbatime(this.value2[1]);
				}
				//  else {
				// 	this.starttime =
				// 		new Date(new Date().toLocaleDateString()).getTime() /
				// 		1000;
				// 	this.endtime = Date.parse(new Date()) / 1000;
				// }
				this.ip_curve();
			}
		},
		change_time(data) {
			if (this.radio == 0) {
				this.set_today(data);
			} else if (this.radio == 1) {
				this.set_yesterday(data);
			} else if (this.radio == 2) {
				this.set_sevenday(data);
			} else if (this.radio == 3) {
				this.set_thirtyday(data);
			} else if (this.radio == 4) {
				this.zidingyi = true;
				this.zidingyifs = true;
			}
		},
		//今天
		set_today(mark) {
			this.fs_currentPage = 1;
			this.currentPage = 1;
			this.starttime =
				new Date(new Date().toLocaleDateString()).getTime() / 1000;
			this.endtime = Date.parse(new Date()) / 1000;
			if (mark == 'fs') {
				this.valuecfs = 60;
				this.fs_curve();
			} else {
				this.ip_curve();
			}
		},
		//昨天
		set_yesterday(mark) {
			this.fs_currentPage = 1;
			this.currentPage = 1;
			this.starttime =
				new Date(new Date().toLocaleDateString()).getTime() / 1000 -
				24 * 60 * 60;
			this.endtime =
				new Date(new Date().toLocaleDateString()).getTime() / 1000;
			if (mark == 'fs') {
				this.valuecfs = 60;
				this.fs_curve();
			} else {
				this.ip_curve();
			}
		},
		//七天
		set_sevenday(mark) {
			this.fs_currentPage = 1;
			this.currentPage = 1;
			this.starttime =
				new Date(new Date().toLocaleDateString()).getTime() / 1000 -
				6 * 24 * 60 * 60;
			this.endtime = Date.parse(new Date()) / 1000;
			if (mark == 'fs') {
				this.valuecfs = 1440;
				this.fs_curve();
			} else {
				this.ip_curve();
			}
		},
		//三十天
		set_thirtyday(mark) {
			this.fs_currentPage = 1;
			this.currentPage = 1;
			this.starttime =
				new Date(new Date().toLocaleDateString()).getTime() / 1000 -
				29 * 24 * 60 * 60;
			this.endtime = Date.parse(new Date()) / 1000;
			if (mark == 'fs') {
				this.valuecfs = 1440;
				this.fs_curve();
			} else {
				this.ip_curve();
			}
		},
		//获取页码--ip
		getpage(pages) {
			this.currentPage = pages;
			this.get_ip_table();
		},
		//获取每页数量--ip
		gettol(pagetol) {
			this.pagesize = pagetol;
			// this.get_ip_table();
		},
		//获取页码--fs
		getpagefs(pages) {
			this.fs_currentPage = pages;
			this.get_fs_table();
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
		drawLine() {
			// 基于准备好的dom，初始化echarts实例
			let myChart = this.$echarts.init(
				document.getElementById('myChart')
			);
			window.onresize = myChart.resize;
			// 绘制图表
			let options = {
				title: {
					text: '流量',
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						crossStyle: {
							color: '#999',
						},
					},
				},
				xAxis: {
					data: this.timeArray,
				},
				//设置canvas内部表格的内距
				grid: {
					x: 70,
					y: 50,
					x2: 50,
					y2: 60,
					borderWidth: 10,
				},
				yAxis: {
					name: 'GB',
				},
				series: [
					{
						name: '流量',
						type: 'bar',
						smooth: true,
						barWidth: 30, //柱图宽度
						data: this.dataFlowArray,
						itemStyle: {
							color: '#409EFF',
						},
					},
				],
			};
			myChart.setOption(options);
		},
		drawLine1() {
			// 基于准备好的dom，初始化echarts实例
			let myChart = this.$echarts.init(
				document.getElementById('myChart1')
			);
			window.onresize = myChart.resize;
			// 绘制图表
			let options = {
				title: {
					text: '存储',
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						crossStyle: {
							color: '#999',
						},
					},
				},
				xAxis: {
					data: this.fs_timeArray,
				},
				yAxis: {
					name: 'GB',
				},
				grid: {
					x: 70,
					y: 50,
					x2: 50,
					y2: 60,
					borderWidth: 10,
				},
				series: [
					{
						name: '容量',
						type: 'line',
						barWidth: 30, //柱图宽度
						data: this.storeUsageArray,
						smooth: true,
						itemStyle: {
							normal: {
								color: '#09b0f5',
							},
						},
					},
				],
			};
			myChart.setOption(options);
		},
		exportExcel(dataupload, excelname) {
			require.ensure([], () => {
				const {
					export_json_to_excel,
				} = require('../../excel/Export2Excel.js');

				// 上面设置Excel的表格第一行的标题
				if (excelname == '节点应用统计IP流量') {
					var filterVal = [
						'ipfsHashId',
						'dataFlow',
						'outputCount',
						'timeReport',
					];
					var tHeader = ['节点ID', '使用流量', '传输次数', '日期'];
				} else {
					var filterVal = [
						'ipfsId',
						'storeUsage',
						'storeTimes',
						'timeStamp',
					];
					var tHeader = ['节点ID', '存储容量', '存储次数', '日期'];
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
				if (item.timeReport) {
					item.timeReport = getymdtime(item.timeReport);
					item.dataFlow = zhuanbkbs(item.dataFlow);
					return item;
				}
				if (item.timeStamp) {
					item.timeStamp = getymdtime(item.timeStamp);
					item.storeUsage = zhuanbkbs(item.storeUsage);
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
	destroyed: function() {
		sessionStorage.removeItem('search_condition');
	},
};
</script>

<style lang="scss" scoped>
.myself-container {
	// width: 100%;
	// min-width: 1600px;
	.device_form {
		width: auto;
		height: auto;
		// overflow: hidden;
		margin-top: 20px;
		background: #ffffff;
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
			margin-top: 10px;
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
		.ip_upload_btn {
			position: absolute;
			top: 0;
			right: 180px;
			z-index: 2001;
			i {
				font-size: 20px;
			}
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
	background: #409eff;
	color: #ffffff;
	padding: 0 25px;
	border-radius: 5px;
	display: flex;
	text-align: left;
	justify-content: center;
	flex-direction: column;
	.seach_top {
		.bantlist {
			margin: 0 10px;
		}
	}
	.item-count {
		font-size: 20px;
		height: 40px;
		flex-wrap: 600;
	}
	.item-text {
		line-height: 50px;
	}
}
</style>
