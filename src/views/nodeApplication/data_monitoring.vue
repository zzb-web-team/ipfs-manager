<template>
	<div class="content" ref="luckDraw">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item>
				<a>节点数据监控</a>
			</el-breadcrumb-item>
		</el-breadcrumb>
		<!--  -->
		<div
			style="margin-top: 20px;margin-bottom: 20px;display: flex;justify-content: space-between;"
		>
			<el-radio-group
				v-model="searchdata.tabname"
				@change="change_tab"
				size="small"
			>
				<el-radio-button label="first">带宽</el-radio-button>
				<el-radio-button label="second">存储空间</el-radio-button>
				<el-radio-button label="third">节点质量</el-radio-button>
			</el-radio-group>
			<div>
				<el-radio-group
					v-model="searchdata.radio"
					@change="set_time"
					size="small"
				>
					<el-radio-button label="1">今天</el-radio-button>
					<el-radio-button label="2">昨天</el-radio-button>
					<el-radio-button label="3">近7天</el-radio-button>
					<el-radio-button label="4">近30天</el-radio-button>
					<el-radio-button label="5">自定义</el-radio-button>
				</el-radio-group>
				<el-date-picker
					size="small"
					style="margin-left: 10px;"
					v-show="show_time"
					v-model="searchdata.value1"
					type="datetimerange"
					range-separator="至"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
					@change="set_time"
				>
				</el-date-picker>
			</div>
		</div>
		<div style="margin-top:10px;">
			<el-tabs
				class="data_monit"
				v-model="activeName"
				@tab-click="handleClick"
			>
				<el-row style="margin-top:10px;" v-show="activeName == 'third'">
					<el-col :span="2">
						<el-select
							size="small"
							@change="lastchange()"
							v-model="searchdata.echartslist"
							placeholder="请选择"
						>
							<el-option
								v-for="item in options"
								:key="item.value"
								:label="item.label"
								:value="item.value"
							>
							</el-option>
						</el-select>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="2"
						><el-input
							size="small"
							v-model="searchdata.input"
							placeholder="请输入节点ID"
							prefix-icon="el-icon-search"
							@keyup.enter.native="set_time()"
						>
							<i
								slot="suffix"
								class="el-input__icon el-icon-search"
								@click="set_time"
							></i></el-input
					></el-col>
					<el-col :span="2"
						><el-select
							size="small"
							v-model="searchdata.region1"
							placeholder="请选择一级渠道"
							@change="handleChangefirst($event)"
						>
							<el-option label="全部" value="*"></el-option>
							<el-option
								v-for="(item, index) in firstchan"
								:key="item.name + index"
								:label="item.name"
								:value="item.name"
							></el-option> </el-select
					></el-col>
					<el-col :span="2"
						><el-select
							size="small"
							v-model="searchdata.region2"
							placeholder="请选择二级渠道"
							:disabled="chil_disable"
							@change="set_time()"
						>
							<el-option label="全部" value="*"></el-option>
							<el-option
								v-for="(item, index) in secondchan"
								:key="item.value + index"
								:label="item.label"
								:value="item.value"
							></el-option></el-select
					></el-col>

					<el-col :span="2"
						><el-select
							size="small"
							v-model="searchdata.region3"
							placeholder="请选择设备类型"
							@change="set_time()"
						>
							<el-option label="全部" value="*"></el-option>
							<el-option
								v-for="(item, index) in device_type"
								:key="item.name + index"
								:label="item.name"
								:value="item.name"
							></el-option></el-select
					></el-col>
					<el-col :span="2" v-show="seacr_yin_show"
						><el-select
							size="small"
							v-model="searchdata.region7"
							placeholder="请选择硬件类型"
							@change="set_time()"
						>
							<el-option label="全部" value="*"></el-option>
							<el-option
								v-for="(item, index) in arch"
								:key="item.name + index"
								:label="item.name"
								:value="item.name"
							></el-option></el-select
					></el-col>
					<el-col :span="2" v-show="seacr_yin_show"
						><el-select
							size="small"
							v-model="searchdata.region8"
							placeholder="请选择操作系统"
							@change="set_time()"
						>
							<el-option label="全部" value="*"></el-option>
							<el-option
								v-for="(item, index) in oslist"
								:key="item.name + index"
								:label="item.name"
								:value="item.name"
							></el-option></el-select
					></el-col>
					<el-cascader
						size="small"
						placeholder="请选择区域"
						v-model="searchdata.region4"
						:options="citylist"
						@change="provinceChange"
					></el-cascader>
					<el-select
						size="small"
						v-model="searchdata.region5"
						placeholder="请选择城市"
						@change="set_time()"
						:disabled="city_disable"
					>
						<el-option
							v-for="(item, index) in options_city"
							:key="index"
							:label="item.name"
							:value="item.value"
						></el-option>
					</el-select>

					<el-col :span="2"
						><el-select
							size="small"
							v-model="searchdata.region6"
							placeholder="请选择运营商"
							@change="set_time()"
						>
							<el-option label="全部" value="*"></el-option>
							<el-option
								v-for="(item, index) in isp"
								:key="index"
								:label="item.name"
								:value="item.name"
							></el-option> </el-select
					></el-col>

					<!-- <el-col :span="5">
						<el-radio-group
							v-model="searchdata.radio"
							@change="set_time"
						>
							<el-radio-button label="1">今天</el-radio-button>
							<el-radio-button label="2">昨天</el-radio-button>
							<el-radio-button label="3">近7天</el-radio-button>
							<el-radio-button label="4">近30天</el-radio-button>
							<el-radio-button label="5">自定义</el-radio-button>
						</el-radio-group>
					</el-col> -->
				</el-row>

				<el-tab-pane label="带宽" name="first">
					<el-row>
						<el-col :span="5" class="top_title">
							<p>
								{{
									(upbandwidth / 1024 / 1024 / 1024).toFixed(
										2
									)
								}}Mbps/{{
									(
										downbandwidth /
										1024 /
										1024 /
										1024
									).toFixed(2)
								}}Mbps
							</p>
							<p>节点带宽峰值（上/下行）</p>
						</el-col>
						<el-col :span="5" class="top_title">
							<p>
								{{
									(averageup / 1024 / 1024 / 1024).toFixed(2)
								}}Mbps/{{
									(averagedown / 1024 / 1024 / 1024).toFixed(
										2
									)
								}}Mbps
							</p>
							<p>节点带宽平均值（上/下行）</p>
						</el-col>
					</el-row>
					<div
						style="text-align:left;width: 80%;margin-bottom: 40px;"
					>
						<el-radio-group
							v-model="radio1"
							size="mini"
							@change="changeup_down"
						>
							<el-radio-button label="1"
								>上行带宽</el-radio-button
							>
							<el-radio-button label="2"
								>下行带宽</el-radio-button
							>
						</el-radio-group>
					</div>

					<div id="firstChart" style=" height:500px;width:100%"></div>
				</el-tab-pane>
				<el-tab-pane label="存储空间" name="second">
					<el-row>
						<el-col :span="5" class="top_title">
							<p>
								{{
									(availablecap / 1024 / 1024 / 1024).toFixed(
										2
									)
								}}GB
							</p>
							<p>节点可用存储空间</p>
						</el-col>
						<el-col :span="5" class="top_title">
							<p>
								{{
									(totalcap / 1024 / 1024 / 1024).toFixed(2)
								}}GB
							</p>
							<p>节点总存储空间</p>
						</el-col>
					</el-row>
					<div id="secondChart" style="height:500px;width:100%"></div>
				</el-tab-pane>
				<el-tab-pane label="节点质量" name="third">
					<el-row>
						<el-col :span="5" class="top_title"
							><p>{{ average_value }}</p>
							<p>平均值</p>
						</el-col>
						<el-col :span="5" class="top_title"
							><p>{{ max_value }}</p>
							<p>最大值</p></el-col
						>
						<el-col :span="5" class="top_title"
							><p>{{ min_value }}</p>
							<p>最小值</p></el-col
						>
					</el-row>
					<div
						id="ping_ms"
						style="height:500px;width:100%"
						v-show="searchdata.echartslist == 1"
					></div>
					<div
						id="tid"
						style="height:500px;width:100%"
						v-show="searchdata.echartslist == 2"
					></div>
					<div
						id="etf"
						style="height:500px;width:100%"
						v-show="searchdata.echartslist == 3"
					></div>
					<div
						id="lt"
						style="height:500px;width:100%"
						v-show="searchdata.echartslist == 4"
					></div>
					<div
						id="itf"
						style="height:500px;width:100%"
						v-show="searchdata.echartslist == 5"
					></div>
					<div
						id="otf"
						style="height:500px;width:100%"
						v-show="searchdata.echartslist == 6"
					></div>
					<div
						id="rcnt"
						style="height:500px;width:100%"
						v-show="searchdata.echartslist == 7"
					></div>
					<div
						id="cpu"
						style="height:500px;width:100%"
						v-show="searchdata.echartslist == 8"
					></div>
					<div
						id="ram"
						style="height:500px;width:100%"
						v-show="searchdata.echartslist == 9"
					></div>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import {
	get_nodetype_enum,
	ipfs_monit_bandwidth,
	ipfs_monit_cpuusage,
	ipfs_monit_etf,
	ipfs_monit_itf,
	ipfs_monit_lt,
	ipfs_monit_memory,
	ipfs_monit_otf,
	ipfs_monit_ping_ms,
	ipfs_monit_ping_ttl,
	ipfs_monit_rcnt,
	ipfs_monit_storage,
	ipfs_monit_tid,
} from '@/servers/api';
import { getday, setbatime } from '../../servers/sevdate';
import echarts from 'echarts';
export default {
	data() {
		return {
			activeName: 'first',
			radio1: '1',
			_width: '',
			upbandwidth: 0,
			downbandwidth: 0,
			averageup: 0,
			averagedown: 0,
			availablecap: 0,
			totalcap: 0,
			average_value: 0,
			max_value: 0,
			min_value: 0,
			options: [
				{
					value: '1',
					label: 'PING_MS',
				},
				{
					value: '2',
					label: 'TID（响应时差）',
				},
				{
					value: '3',
					label: 'ETF（错误率）',
				},
				{
					value: '4',
					label: 'LT（失联计数）',
				},
				{
					value: '5',
					label: 'ITF（在线率）',
				},
				{
					value: '6',
					label: 'OTF（离线率）',
				},
				{
					value: '7',
					label: 'RCNT（重连计数）',
				},
				{
					value: '8',
					label: 'CPU占用率',
				},
				{
					value: '9',
					label: '内存占用率',
				},
			],
			searchdata: {
				tabname: 'first',
				echartslist: '1',
				input: '',
				region1: '', //一级渠道商
				region2: '', //二级渠道商
				region3: '', //设备类型
				region4: '-1', //区域
				region5: '', //城市
				region6: '', //运营商
				region7: '', //硬件类型
				region8: '', //操作系统
				radio: '1',
				value1: '',
			},
			arch: [
				//硬件类型
			],
			device_type: [
				//设备类型
			],
			oslist: [
				//操作系统
			],
			isp: [
				//运营商
			],
			firstchan: [
				//一级渠道商
			],
			citylist: [
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
			secondchan: [],
			show_time: false,
			seacr_yin_show: false,
			chil_disable: true,
			downBandwidthMap: [],
			upBandwidthMap: [],
			dataStore: [],
			mslist: [],
			tidlist: [],
			etflist: [],
			ltlist: [],
			itflist: [],
			otflist: [],
			rcntlist: [],
			cpuusaglist: [],
			memorylist: [],
			starttime: 0,
			endtime: 0,
			citydata: {},
			options_city: [],
			city_disable: true,
		};
	},
	mounted() {
		this.getJson();
		this.starttime =
			new Date(new Date().toLocaleDateString()).getTime() / 1000 -
			365 * 60 * 60 * 24;
		this.endtime = Date.parse(new Date()) / 1000;
		this._width = this.$refs.luckDraw.offsetWidth - 60;
		this.get_search_data();
		this.set_time();
	},
	methods: {
		getJson() {
			axios.get('./static/pro_city.json').then((res) => {
				this.citydata = res.data;
			});
		},
		provinceChange(value) {
			if (value == -1) {
				this.value1 = -1;
				this.city_disable = true;
				this.searchdata.region6 = '';
				this.set_time();
			} else {
				this.options_city = this.citydata[value[1]].cities;
				this.city_disable = false;
				this.searchdata.region6 = '';
				this.set_time();
			}
		},
		//查询搜索条件
		get_search_data() {
			let params = new Object();
			params.time = '11';
			get_nodetype_enum(params)
				.then((res) => {
					if (res.status == 0) {
						this.arch = res.data.arch;
						this.device_type = res.data.device_type;
						this.isp = res.data.isp;
						this.oslist = res.data.os;
						this.firstchan = res.data.firstchan;
					} else {
						this.$message.error(res.errMsg);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		},
		//请求带宽数据
		get_nodetype(num) {
			// let params=new Object();
			// get_nodetype_enum(params).then(res=>{console.log(res)}).catch(error=>{console.log(error)})
			this.upBandwidthMap = [];
			this.downBandwidthMap = [];
			let params = new Object();
			params.firstChannel = this.searchdata.region1;
			params.secondChannel = this.searchdata.region2;
			params.deviceType = this.searchdata.region3;
			params.end_ts = this.endtime;
			params.isp = this.searchdata.region6;
			params.nodeId = this.searchdata.input;
			params.region = this.searchdata.region4[1];
			params.start_ts = this.starttime;
			if (params.end_ts - params.end_ts > 86400) {
				params.timeUnit = 1440;
			} else {
				params.timeUnit = 60;
			}
			ipfs_monit_bandwidth(params)
				.then((res) => {
					if (res.status == 0) {
						let downarrlist = [];
						let uparrlist = [];
						for (let k in res.data.downBandwidthMap) {
							let obj = {};
							obj.name = getday(k);
							obj.value = res.data.downBandwidthMap[k];
							this.downBandwidthMap.push(obj);
							downarrlist.push(res.data.downBandwidthMap[k]);
						}
						for (let k in res.data.upBandwidthMap) {
							let obj = {};
							obj.name = getday(k);
							obj.value = res.data.upBandwidthMap[k];
							this.upBandwidthMap.push(obj);
							uparrlist.push(res.data.upBandwidthMap[k]);
						}
						this.downbandwidth = this.getMaximin(
							downarrlist,
							'max'
						);

						this.upbandwidth = this.getMaximin(uparrlist, 'max');
						this.averageup = this.pingjun(res.data.upBandwidthMap);
						this.averagedown = this.pingjun(
							res.data.downBandwidthMap
						);
						this.$nextTick(this.firstsharts(this.downBandwidthMap));
					} else {
						this.$message.error(res.errMsg);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		},
		//请求存储空间数据
		get_monit() {
			this.dataStore = [];
			let params = new Object();
			params.firstChannel = this.searchdata.region1;
			params.secondChannel = this.searchdata.region2;
			params.deviceType = this.searchdata.region3;
			params.end_ts = this.endtime;
			params.isp = this.searchdata.region6;
			params.nodeId = this.searchdata.input;
			params.region = this.searchdata.region4[1];
			params.start_ts = this.starttime;
			ipfs_monit_storage(params)
				.then((res) => {
					if (res.status == 0) {
						let avaarrlist = [];
						let tolarrlist = [];
						for (let k in res.data.dataStoreUsageMap) {
							let obj = {};
							obj.name = getday(k);
							obj.value = res.data.dataStoreUsageMap[k];
							this.dataStore.push(obj);
							avaarrlist.push(res.data.dataStoreUsageMap[k]);
						}
						for (let k in res.data.dataStoreMap) {
							// let obj = {};
							// obj.name = getday(k);
							// obj.value = res.data.dataStoreMap[k];
							// this.dataStore.push(obj);
							tolarrlist.push(res.data.dataStoreMap[k]);
						}
						this.availablecap = this.getMaximin(avaarrlist, 'max');
						this.totalcap = this.getMaximin(tolarrlist, 'max');
						this.$nextTick(this.secondsharts(this.dataStore));
					} else {
						this.$message.error(res.errMsg);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		},
		//请求节点质量--ms
		get_pingms() {
			this.mslist = [];
			let params = new Object();
			params.firstChannel = this.searchdata.region1;
			params.secondChannel = this.searchdata.region2;
			params.cpuType = this.searchdata.region7;
			params.deviceType = this.searchdata.region3;
			params.end_ts = this.endtime;
			params.isp = this.searchdata.region6;
			params.nodeId = this.searchdata.input;
			params.osType = this.searchdata.region8;
			params.region = this.searchdata.region4[1];
			params.start_ts = this.starttime;
			if (params.end_ts - params.end_ts > 86400) {
				params.timeUnit = 1440;
			} else {
				params.timeUnit = 60;
			}
			ipfs_monit_ping_ms(params)
				.then((res) => {
					if (res.status == 0) {
						let arrlist = [];
						for (let k in res.data) {
							let obj = {};
							obj.name = getday(k);
							obj.value = res.data[k];
							this.mslist.push(obj);
							arrlist.push(res.data[k]);
						}
						this.$nextTick(
							this.lastsharts('ping_ms', 'PING_MS', this.mslist)
						);
						this.max_value = (this.getMaximin(arrlist, 'max')).toFixed(0) + 'ms';
						this.min_value = (this.getMaximin(arrlist, 'min')).toFixed(0) + 'ms';
						this.average_value = (this.pingjun(arrlist)).toFixed(0) + 'ms';
					} else {
						this.$message.error(res.errMsg);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		},
		//请求节点质量--响应时差
		get_tid() {
			this.tidlist = [];
			let params = new Object();
			params.firstChannel = this.searchdata.region1;
			params.secondChannel = this.searchdata.region2;
			params.cpuType = this.searchdata.region7;
			params.deviceType = this.searchdata.region3;
			params.end_ts = this.endtime;
			params.isp = this.searchdata.region6;
			params.nodeId = this.searchdata.input;
			params.osType = this.searchdata.region8;
			params.region = this.searchdata.region4[1];
			params.start_ts = this.starttime;
			if (params.end_ts - params.end_ts > 86400) {
				params.timeUnit = 1440;
			} else {
				params.timeUnit = 60;
			}
			ipfs_monit_tid(params)
				.then((res) => {
					if (res.status == 0) {
						let arrlist = [];
						for (let k in res.data) {
							let obj = {};
							obj.name = getday(k);
							obj.value = res.data[k];
							this.tidlist.push(obj);
							arrlist.push(res.data[k]);
						}
						this.$nextTick(
							this.lastsharts('tid', 'TID', this.tidlist)
						);
						this.max_value = (this.getMaximin(arrlist, 'max')).toFixed(0) + 'ms';
						this.min_value = (this.getMaximin(arrlist, 'min')).toFixed(0) + 'ms';
						this.average_value = (this.pingjun(arrlist)).toFixed(0) + 'ms';
					} else {
						this.$message.error(res.errMsg);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		},
		//请求节点质量--错误率
		get_etf() {
			this.etflist = [];
			let params = new Object();
			params.firstChannel = this.searchdata.region1;
			params.secondChannel = this.searchdata.region2;
			params.cpuType = this.searchdata.region7;
			params.deviceType = this.searchdata.region3;
			params.end_ts = this.endtime;
			params.isp = this.searchdata.region6;
			params.nodeId = this.searchdata.input;
			params.osType = this.searchdata.region8;
			params.region = this.searchdata.region4[1];
			params.start_ts = this.starttime;
			if (params.end_ts - params.end_ts > 86400) {
				params.timeUnit = 1440;
			} else {
				params.timeUnit = 60;
			}
			ipfs_monit_etf(params)
				.then((res) => {
					if (res.status == 0) {
						let arrlist = [];
						for (let k in res.data) {
							let obj = {};
							obj.name = getday(k);
							obj.value = res.data[k];
							this.etflist.push(obj);
							arrlist.push(res.data[k]);
						}
						this.$nextTick(
							this.tiredsharts(
								'etf',
								'ETF（错误率）',
								this.etflist
							)
						);
						this.max_value = (this.getMaximin(arrlist, 'max')).toFixed(4) + '%';
						this.min_value = (this.getMaximin(arrlist, 'min')).toFixed(4) + '%';
						this.average_value = (this.pingjun(arrlist)).toFixed(4) + '%';
					} else {
						this.$message.error(res.errMsg);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		},
		//请求节点质量--失联计数
		get_lt() {
			this.ltlist = [];
			let params = new Object();
			params.firstChannel = this.searchdata.region1;
			params.secondChannel = this.searchdata.region2;
			params.cpuType = this.searchdata.region7;
			params.deviceType = this.searchdata.region3;
			params.end_ts = this.endtime;
			params.isp = this.searchdata.region6;
			params.nodeId = this.searchdata.input;
			params.osType = this.searchdata.region8;
			params.region = this.searchdata.region4[1];
			params.start_ts = this.starttime;
			if (params.end_ts - params.end_ts > 86400) {
				params.timeUnit = 1440;
			} else {
				params.timeUnit = 60;
			}
			ipfs_monit_lt(params)
				.then((res) => {
					if (res.status == 0) {
						let arrlist = [];
						for (let k in res.data) {
							let obj = {};
							obj.name = getday(k);
							obj.value = res.data[k];
							this.ltlist.push(obj);
							arrlist.push(res.data[k]);
						}
						this.$nextTick(
							this.tiredsharts(
								'lt',
								'LT（失联计数）',
								this.ltlist
							)
						);
						this.max_value = (this.getMaximin(arrlist, 'max')).toFixed(0);
						this.min_value = (this.getMaximin(arrlist, 'min')).toFixed(0);
						this.average_value = (this.pingjun(arrlist)).toFixed(0);
					} else {
						this.$message.error(res.errMsg);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		},
		//请求节点质量--在线率
		get_itf() {
			this.itflist = [];
			let params = new Object();
			params.firstChannel = this.searchdata.region1;
			params.secondChannel = this.searchdata.region2;
			params.cpuType = this.searchdata.region7;
			params.deviceType = this.searchdata.region3;
			params.end_ts = this.endtime;
			params.isp = this.searchdata.region6;
			params.nodeId = this.searchdata.input;
			params.osType = this.searchdata.region8;
			params.region = this.searchdata.region4[1];
			params.start_ts = this.starttime;
			if (params.end_ts - params.end_ts > 86400) {
				params.timeUnit = 1440;
			} else {
				params.timeUnit = 60;
			}
			ipfs_monit_itf(params)
				.then((res) => {
					if (res.status == 0) {
						let arrlist = [];
						for (let k in res.data) {
							let obj = {};
							obj.name = getday(k);
							obj.value = res.data[k];
							this.itflist.push(obj);
							arrlist.push(res.data[k]);
						}
						this.$nextTick(
							this.tiredsharts(
								'itf',
								'ITF（在线率）',
								this.itflist
							)
						);
						this.max_value = (this.getMaximin(arrlist, 'max')).toFixed(0) + '%';
						this.min_value = (this.getMaximin(arrlist, 'min')).toFixed(0) + '%';
						this.average_value = (this.pingjun(arrlist)).toFixed(0) + '%';
					} else {
						this.$message.error(res.errMsg);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		},
		//请求节点质量--离线率
		get_otf() {
			this.otflist = [];
			let params = new Object();
			params.firstChannel = this.searchdata.region1;
			params.secondChannel = this.searchdata.region2;
			params.cpuType = this.searchdata.region7;
			params.deviceType = this.searchdata.region3;
			params.end_ts = this.endtime;
			params.isp = this.searchdata.region6;
			params.nodeId = this.searchdata.input;
			params.osType = this.searchdata.region8;
			params.region = this.searchdata.region4[1];
			params.start_ts = this.starttime;
			if (params.end_ts - params.end_ts > 86400) {
				params.timeUnit = 1440;
			} else {
				params.timeUnit = 60;
			}
			ipfs_monit_otf(params)
				.then((res) => {
					if (res.status == 0) {
						let arrlist = [];
						for (let k in res.data) {
							let obj = {};
							obj.name = getday(k);
							obj.value = res.data[k];
							this.otflist.push(obj);
							arrlist.push(res.data[k]);
						}
						this.$nextTick(
							this.tiredsharts(
								'otf',
								'OTF（离线率）',
								this.otflist
							)
						);
						this.max_value = (this.getMaximin(arrlist, 'max')).toFixed(0) + '%';
						this.min_value = (this.getMaximin(arrlist, 'min')).toFixed(0) + '%';
						this.average_value = (this.pingjun(arrlist)).toFixed(0) + '%';
					} else {
						this.$message.error(res.errMsg);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		},
		//请求节点质量--重连次数
		get_rcnt() {
			this.rcntlist = [];
			let params = new Object();
			params.firstChannel = this.searchdata.region1;
			params.secondChannel = this.searchdata.region2;
			params.cpuType = this.searchdata.region7;
			params.deviceType = this.searchdata.region3;
			params.end_ts = this.endtime;
			params.isp = this.searchdata.region6;
			params.nodeId = this.searchdata.input;
			params.osType = this.searchdata.region8;
			params.region = this.searchdata.region4[1];
			params.start_ts = this.starttime;
			if (params.end_ts - params.end_ts > 86400) {
				params.timeUnit = 1440;
			} else {
				params.timeUnit = 60;
			}
			ipfs_monit_rcnt(params)
				.then((res) => {
					if (res.status == 0) {
						let arrlist = [];
						for (let k in res.data) {
							let obj = {};
							obj.name = getday(k);
							obj.value = res.data[k];
							this.rcntlist.push(obj);
							arrlist.push(res.data[k]);
						}
						this.$nextTick(
							this.tiredsharts(
								'rcnt',
								'RCNT（重连计数）',
								this.rcntlist
							)
						);
						this.max_value = (this.getMaximin(arrlist, 'max')).toFixed(0);
						this.min_value = (this.getMaximin(arrlist, 'min')).toFixed(0);
						this.average_value = (this.pingjun(arrlist)).toFixed(0);
					} else {
						this.$message.error(res.errMsg);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		},
		//请求节点质量--CPU占用率
		get_cpuusag() {
			this.cpuusaglist = [];
			let params = new Object();
			params.firstChannel = this.searchdata.region1;
			params.secondChannel = this.searchdata.region2;
			params.cpuType = this.searchdata.region7;
			params.deviceType = this.searchdata.region3;
			params.end_ts = this.endtime;
			params.isp = this.searchdata.region6;
			params.nodeId = this.searchdata.input;
			params.osType = this.searchdata.region8;
			params.region = this.searchdata.region4[1];
			params.start_ts = this.starttime;
			if (params.end_ts - params.end_ts > 86400) {
				params.timeUnit = 1440;
			} else {
				params.timeUnit = 60;
			}
			ipfs_monit_cpuusage(params)
				.then((res) => {
					if (res.status == 0) {
						let arrlist = [];
						for (let k in res.data) {
							let obj = {};
							obj.name = getday(k);
							obj.value = res.data[k];
							this.cpuusaglist.push(obj);
							arrlist.push(res.data[k]);
						}
						this.$nextTick(
							this.tiredsharts(
								'cpu',
								'CPU占用率',
								this.cpuusaglist
							)
						);
						this.max_value = (this.getMaximin(arrlist, 'max')).toFixed(2) + '%';
						this.min_value = (this.getMaximin(arrlist, 'min')).toFixed(2) + '%';
						this.average_value = (this.pingjun(arrlist)).toFixed(2) + '%';
					} else {
						this.$message.error(res.errMsg);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		},
		//请求节点质量--CPU占用率
		get_memory() {
			this.memorylist = [];
			let params = new Object();
			params.firstChannel = this.searchdata.region1;
			params.secondChannel = this.searchdata.region2;
			params.cpuType = this.searchdata.region7;
			params.deviceType = this.searchdata.region3;
			params.end_ts = this.endtime;
			params.isp = this.searchdata.region6;
			params.nodeId = this.searchdata.input;
			params.osType = this.searchdata.region8;
			params.region = this.searchdata.region4[1];
			params.start_ts = this.starttime;
			if (params.end_ts - params.end_ts > 86400) {
				params.timeUnit = 1440;
			} else {
				params.timeUnit = 60;
			}
			ipfs_monit_memory(params)
				.then((res) => {
					if (res.status == 0) {
						let arrlist = [];
						for (let k in res.data) {
							let obj = {};
							obj.name = getday(k);
							obj.value = res.data[k];
							this.memorylist.push(obj);
							arrlist.push(res.data[k]);
						}
						this.$nextTick(
							this.tiredsharts(
								'ram',
								'内存占用率',
								this.memorylist
							)
						);
						this.max_value = (this.getMaximin(arrlist, 'max')).toFixed(2) + '%';
						this.min_value = (this.getMaximin(arrlist, 'min')).toFixed(2) + '%';
						this.average_value = (this.pingjun(arrlist)).toFixed(2) + '%';
					} else {
						this.$message.error(res.errMsg);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		},
		handleChangefirst(val) {
			this.firstchan.find((item) => {
				if (item.value === val) {
					//筛选出匹配数据
					this.secondchan = item.secondchan;
					this.chil_disable = false;
				} else {
					this.chil_disable = true;
				}
			});
			this.set_time();
		},
		changeup_down() {
			if (this.radio1 == '1') {
				this.$nextTick(this.firstsharts(this.downBandwidthMap));
			} else {
				this.$nextTick(this.firstsharts(this.upBandwidthMap));
			}
		},
		change_tab() {
			this.activeName = this.searchdata.tabname;
			if (this.activeName == 'third') {
				this.seacr_yin_show = true;
				this.lastchange();
			} else {
				this.seacr_yin_show = false;
				if (this.activeName == 'first') {
					this.get_nodetype(1);
				} else if (this.activeName == 'second') {
					this.get_monit();
				}
			}
		},
		handleClick(tab, event) {
			if (this.activeName == 'third') {
				this.seacr_yin_show = true;
				this.lastchange();
			} else {
				this.seacr_yin_show = false;
				if (this.activeName == 'first') {
					this.get_nodetype(1);
				} else if (this.activeName == 'second') {
					this.get_monit();
				}
			}
		},
		set_time() {
			console.log(this.searchdata.radio);
			if (this.searchdata.radio == '5') {
				this.show_time = true;
				if (
					this.searchdata.value1 != null &&
					this.searchdata.value1 != ''
				) {
					this.starttime = setbatime(this.searchdata.value1[0]);
					this.endtime = setbatime(this.searchdata.value1[1]);
					this.handleClick();
				} else {
					return false;
				}
			} else if (this.searchdata.radio == '4') {
				this.show_time = false;
				let endt =
					new Date(new Date().toLocaleDateString()).getTime() / 1000;
				this.starttime = endt - 24 * 60 * 60 * 29;
				this.endtime = Date.parse(new Date()) / 1000;
				this.handleClick();
			} else if (this.searchdata.radio == '3') {
				this.show_time = false;
				let endt =
					new Date(new Date().toLocaleDateString()).getTime() / 1000;
				this.starttime = endt - 24 * 60 * 60 * 6;
				this.endtime = Date.parse(new Date()) / 1000;
				this.handleClick();
			} else if (this.searchdata.radio == '2') {
				this.show_time = false;
				this.endtime =
					new Date(new Date().toLocaleDateString()).getTime() / 1000;
				this.starttime =
					new Date(new Date().toLocaleDateString()).getTime() / 1000 -
					24 * 60 * 60;
				this.handleClick();
			} else if (this.searchdata.radio == '1') {
				this.show_time = false;
				this.starttime =
					new Date(new Date().toLocaleDateString()).getTime() / 1000;
				this.endtime = Date.parse(new Date()) / 1000;
				this.handleClick();
			}
		},
		lastchange() {
			if (this.searchdata.echartslist == 1) {
				this.get_pingms();
				// this.lastsharts('ping_ms', 'PING_MS');
			} else if (this.searchdata.echartslist == 2) {
				this.get_tid();
				// this.lastsharts('tid', 'TID');
			} else if (this.searchdata.echartslist == 3) {
				this.get_etf();
				// this.tiredsharts('etf', 'ETF（错误率）');
			} else if (this.searchdata.echartslist == 4) {
				this.get_lt();
				// this.tiredsharts('lt', 'LT（失联计数）');
			} else if (this.searchdata.echartslist == 5) {
				this.get_itf();
				// this.tiredsharts('itf', 'ITF（在线率）');
			} else if (this.searchdata.echartslist == 6) {
				this.get_otf();
				// this.tiredsharts('otf', 'OTF（离线率）');
			} else if (this.searchdata.echartslist == 7) {
				this.get_rcnt();
				// this.tiredsharts('rcnt', 'RCNT（重连计数）');
			} else if (this.searchdata.echartslist == 8) {
				this.get_cpuusag();
				// this.tiredsharts('cpu', 'CPU占用率');
			} else if (this.searchdata.echartslist == 9) {
				this.get_memory();
				// this.tiredsharts('ram', '内存占用率');
			}
		},
		getMaximin(arr, maximin) {
			var max = arr[0];
			var min = arr[arr.length - 1];
			if (maximin == 'max') {
				for (var i = 1; i < arr.length; i++) {
					if (max < arr[i]) max = arr[i];
				}
				return max;
			} else if (maximin == 'min') {
				for (var i = 1; i < arr.length; i++) {
					if (min > arr[i]) min = arr[i];
				}
				return min;
			}
		},
		pingjun(arr) {
			let sum = 0;
			for (let i = 0; i < arr.length; i++) {
				sum += arr[i];
			}
			if (sum == 0) {
				return 0;
			} else {
				let mean = sum / arr.length;
				return mean;
			}
		},
		firstsharts(echartsdata) {
			// var dataCount = 2e3;
			// var data = generateData(dataCount);
			// var maxnum = getMaximin(data.valueData, 'max');
			// var minnum = getMaximin(data.valueData, 'min');
			let chartdom = document.getElementById('firstChart');
			chartdom.style.width = this._width + 'px';
			let myChart = echarts.init(chartdom); //这里是为了获得容器所在位置
			window.onresize = myChart.resize;
			let options = {
				title: {
					text: '带宽',
					left: 10,
				},
				toolbox: {
					feature: {
						saveAsImage: {
							pixelRatio: 2,
						},
					},
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						label: {
							backgroundColor: '#409EFF',
						},
					},
				},
				grid: {
					bottom: 90,
				},

				xAxis: {
					data: echartsdata.map(function(item) {
						return item.name;
					}),
					silent: false,
					splitLine: {
						show: false,
					},
					splitArea: {
						show: false,
					},
				},
				yAxis: {
					splitArea: {
						show: false,
					},
				},
				series: [
					{
						type: 'bar',
						data: echartsdata.map(function(item) {
							return item.value;
						}),
						// Set `large` for large data amount
						large: true,
						markPoint: {
							data: [
								{ type: 'max', name: '最大值' },
								{ type: 'min', name: '最小值' },
							],
							label: {
								normal: {
									formatter: '{c}',
									color: '#ffffff',
								},
							},
							itemStyle: { color: '#409EFF' },
						},
						itemStyle: {
							normal: {
								color: '#409EFF',
								// color: function(params) {
								// 	var colorList = ['#409EFF', 'red', 'green'];
								// 	if (params.data == minnum) {
								// 		console.log(params.data);
								// 		return colorList[2];
								// 	} else if (params.data == maxnum) {
								// 		console.log(params.data);
								// 		return colorList[1];
								// 	} else {
								// 		return colorList[0];
								// 	}
								// },
							},
						},
					},
				],
			};
			function getMaximin(arr, maximin) {
				var max = arr[0];
				var min = arr[arr.length - 1];
				if (maximin == 'max') {
					for (var i = 1; i < arr.length; i++) {
						if (max < arr[i]) max = arr[i];
					}
					return max;
				} else if (maximin == 'min') {
					for (var i = 1; i < arr.length; i++) {
						if (min > arr[i]) min = arr[i];
					}
					return min;
				}
			}
			myChart.setOption(options);
		},

		secondsharts(dataStore) {
			console.log(this._width);
			let chartdom2 = document.getElementById('secondChart');
			chartdom2.style.width = this._width + 'px';
			let myChart2 = echarts.init(chartdom2);
			window.onresize = myChart2.resize;
			let options = {
				title: {
					text: '存储空间',
					left: 10,
				},
				xAxis: {
					type: 'category',
					data: dataStore.map(function(item) {
						return item.name;
					}),
				},
				yAxis: {
					type: 'value',
				},
				toolbox: {
					feature: {
						saveAsImage: {
							pixelRatio: 2,
						},
					},
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						label: {
							backgroundColor: '#6a7985',
						},
					},
				},
				series: [
					{
						data: dataStore.map(function(item) {
							return item.value;
						}),
						type: 'line',
						smooth: true,
						itemStyle: { color: '#409EFF' },
					},
				],
			};
			myChart2.setOption(options);
		},
		tiredsharts(id, titlename, datas) {
			let sa = true;
			if (id == 'itf' || id == 'otf') {
				sa = false;
			}
			let chartdom2 = document.getElementById(id);
			chartdom2.style.width = this._width + 'px';
			let myChart2 = echarts.init(chartdom2);
			window.onresize = myChart2.resize;
			let options = {
				title: {
					text: titlename,
					left: 10,
				},
				xAxis: {
					type: 'category',
					data: datas.map(function(item) {
						return item.name;
					}),
				},
				yAxis: {
					type: 'value',
				},
				toolbox: {
					feature: {
						saveAsImage: {
							pixelRatio: 2,
						},
					},
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						label: {
							backgroundColor: '#6a7985',
						},
					},
				},
				series: [
					{
						data: datas.map(function(item) {
							return item.value;
						}),
						type: 'line',
						smooth: sa,
						itemStyle: { color: '#409EFF' },
					},
				],
			};
			myChart2.setOption(options);
		},
		lastsharts(id, titlename, datas) {
			let chartdom2 = document.getElementById(id);
			chartdom2.style.width = this._width + 'px';
			let myChart2 = echarts.init(chartdom2);
			window.onresize = myChart2.resize;
			let options = {
				title: {
					text: titlename,
					left: 10,
				},
				xAxis: {
					type: 'category',
					data: datas.map(function(item) {
						return item.name;
					}),
				},
				yAxis: {
					type: 'value',
				},
				toolbox: {
					feature: {
						saveAsImage: {
							pixelRatio: 2,
						},
					},
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						label: {
							backgroundColor: '#6a7985',
						},
					},
				},
				series: [
					{
						data: datas.map(function(item) {
							return item.value;
						}),
						type: 'bar',
						smooth: true,
						itemStyle: { color: '#409EFF' },
					},
				],
			};
			myChart2.setOption(options);
		},
	},
};
</script>

<style lang="scss" scoped>
.content {
	text-align: left;
	.el-col {
		margin-bottom: 20px;
	}
	.top_title {
		height: 120px;
		margin-top: 20px;
		margin-bottom: 30px;
		margin-right: 20px;
		padding: 20px;
		text-align: left;
		box-sizing: border-box;
		// display: flex;
		// justify-content: space-around;
		color: #ffffff;
		background: linear-gradient(
			90deg,
			rgba(100, 167, 252, 1) 0%,
			rgba(100, 167, 252, 1) 100%
		);
		border-radius: 8px;
		p:nth-child(1) {
			margin-top: 6px;
			font-size: 30px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		p:nth-child(2) {
			font-size: 14px;
			line-height: 30px;
		}
	}
}
</style>
