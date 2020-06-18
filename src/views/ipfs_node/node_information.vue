<template>
	<div class="content">
		<!-- 面包屑  -->
		<el-breadcrumb separator="/">
			<el-breadcrumb-item>
				<a>节点信息</a>
			</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 搜索框 -->
		<div class="seach_title">
			<div class="seach_title_input">
				<el-input
					placeholder="节点ID，节点IP"
					v-model="seachinput"
					@keyup.enter.native="seachipfs()"
				>
					<i
						slot="suffix"
						class="el-input__icon el-icon-search"
						@click="seachipfs"
					></i>
				</el-input>
			</div>
			<div class="seach_top_right" @click="option_display()">
				筛选
				<i
					class="el-icon-caret-bottom"
					:class="[
						rotate ? 'fa fa-arrow-down go' : 'fa fa-arrow-down aa',
					]"
				></i>
			</div>
		</div>
		<!--  -->
		<div class="seach_bottom" v-if="optiondisplay">
			<div class="seach_bottom_tw">
				<div class="location_select">
					<span>节点任务状态：</span>
					<el-select
						placeholder="请选择状态"
						v-model="value_node"
						@change="handleChange_node()"
					>
						<el-option
							v-for="(item, index) in stateopt_node"
							:key="item.value + index"
							:label="item.label"
							:value="item.value"
						></el-option>
					</el-select>
					<span>节点运行状态：</span>
					<el-select
						placeholder="请选择状态"
						v-model="value"
						@change="handleChange()"
					>
						<el-option
							v-for="(item, index) in stateopt"
							:key="item.value + index"
							:label="item.label"
							:value="item.value"
						></el-option>
					</el-select>
					<span>节点区域：</span>
					<el-cascader
						placeholder="请选择区域"
						v-model="value1"
						:options="citylist"
						@change="provinceChange"
					></el-cascader>
					<span>节点城市:</span>
					<el-select
						v-model="city_detil"
						placeholder="请选择城市"
						@change="handleChange()"
						:disabled="city_disable"
					>
						<el-option
							v-for="(item, index) in options_city"
							:key="index"
							:label="item.name"
							:value="item.name"
						></el-option>
					</el-select>
					<span>节点渠道商:</span>
					<el-select
						v-model="firstchid"
						placeholder="一级渠道商"
						@change="handleChange()"
					>
						<el-option
							v-for="(item, index) in firstchan"
							:key="index"
							:label="item.name"
							:value="item.name"
						></el-option>
					</el-select>
					<el-select
						v-model="secondchid"
						placeholder="二级渠道商"
						@change="handleChange()"
						:disabled="city_disable"
					>
						<el-option
							v-for="(item, index) in options_city"
							:key="index"
							:label="item.name"
							:value="item.name"
						></el-option>
					</el-select>
					<span>设备类型：</span>
					<el-select
						v-model="dev_type"
						placeholder="请选择"
						@change="seachipfs"
					>
						<el-option
							v-for="item in device_type"
							:key="item.value"
							:label="item.name"
							:value="item.name"
							:disabled="item.disabled"
						></el-option>
					</el-select>
					<span>硬件类型：</span>
					<el-select
						v-model="arch_type"
						placeholder="请选择"
						@change="seachipfs"
					>
						<el-option
							v-for="item in arch"
							:key="item.value"
							:label="item.name"
							:value="item.name"
							:disabled="item.disabled"
						></el-option>
					</el-select>
					<span>操作系统：</span>
					<el-select
						v-model="os_type"
						placeholder="请选择"
						@change="seachipfs"
					>
						<el-option
							v-for="item in os"
							:key="item.value"
							:label="item.name"
							:value="item.name"
							:disabled="item.disabled"
						></el-option>
					</el-select>
					<span>运营商：</span>
					<el-select
						v-model="value2"
						placeholder="请选择"
						@change="seachipfs"
					>
						<el-option
							v-for="item in isp"
							:key="item.value"
							:label="item.name"
							:value="item.name"
							:disabled="item.disabled"
						></el-option>
					</el-select>
				</div>
				<div class="region_select">
					<el-button
						plain
						@click="resetseach()"
						class="resetseach_btn"
						>重置</el-button
					>
				</div>
			</div>

			<div style="margin-top: 5px;">
				<!-- <el-button type="primary" plain size="mini" @click="seach"
					>确定</el-button
        >-->
			</div>
		</div>
		<!-- 主体表格 -->
		<div style="text-align:right;padding:0 10px 10px 10px;">
			<el-button
				type="primary"
				@click="export_Excel()"
				:disabled="show_export"
				>导出</el-button
			>
		</div>
		<el-table
			:data="tableData"
			border
			:cell-style="rowClass"
			:header-cell-style="headClass"
			:row-key="getRowKey"
			@selection-change="handleSelectionChange"
			style="width: 100%;"
		>
			<el-table-column
				type="selection"
				width="55"
				:reserve-selection="true"
			></el-table-column>
			<el-table-column prop="nodeId" label="节点ID"></el-table-column>
			<el-table-column prop="state" label="节点运行状态">
				<template slot-scope="scope">
					<div v-if="scope.row.state == 0" style="color:red;">
						离线
					</div>
					<div v-else style="color:#409eff;">在线</div>
				</template>
			</el-table-column>
			<el-table-column prop="ip" label="节点IP"></el-table-column>
			<el-table-column prop="city" label="节点城市"></el-table-column>
			<el-table-column prop="area" label="节点区域"></el-table-column>
			<el-table-column
				prop="firstch"
				label="节点一级渠道"
			></el-table-column>
			<el-table-column
				prop="secondch"
				label="节点二级渠道"
			></el-table-column>
			<el-table-column
				prop="devicetype"
				label="设备类型"
			></el-table-column>
			<el-table-column prop="arch" label="硬件类型"></el-table-column>
			<el-table-column prop="os" label="操作系统"></el-table-column>
			<el-table-column prop="isp" label="节点运营商"></el-table-column>
			<el-table-column prop="asda" label="CPU占用"></el-table-column>
			<el-table-column prop="totalMem" label="总内存">
                <template slot-scope="scope">
                    {{
							(scope.row.totalMem / 1024 / 1024 / 1024).toFixed(
								2
							)
						}}GB
                </template>
            </el-table-column>
			<el-table-column prop="availMem" label="当前内存">
                 <template slot-scope="scope">
                    {{
							(scope.row.availMem / 1024 / 1024 / 1024).toFixed(
								2
							)
						}}GB
                </template>
            </el-table-column>
			<el-table-column prop="totalBW" label="总带宽"></el-table-column>
			<el-table-column prop="occupyBW" label="占用带宽"></el-table-column>
			<el-table-column
				prop="remainingBW"
				label="剩余带宽"
			></el-table-column>
			<el-table-column prop="totalCap" label="总空间">
				<template slot-scope="scope">
					<span v-if="scope.row.totalCap == 0">0GB</span>
					<span v-else>
						{{
							(scope.row.totalCap / 1024 / 1024 / 1024).toFixed(
								2
							)
						}}GB
					</span>
				</template>
			</el-table-column>
			<el-table-column prop="occupyCap" label="占用空间">
				<template slot-scope="scope">
					<span v-if="scope.row.occupyCap == 0">0GB</span>
					<span v-else>
						{{
							(scope.row.occupyCap / 1024 / 1024 / 1024).toFixed(
								2
							)
						}}GB
					</span>
				</template>
			</el-table-column>
			<el-table-column prop="remainingCap" label="剩余空间">
				<template slot-scope="scope">
					<span v-if="scope.row.remainingCap == 0">0GB</span>
					<span v-else>
						{{
							(
								scope.row.remainingCap /
								1024 /
								1024 /
								1024
							).toFixed(2)
						}}GB
					</span>
				</template>
			</el-table-column>
			<el-table-column
				prop="useRate"
				label="节点平均利用率"
			></el-table-column>
			<el-table-column prop="nodestatus" label="节点任务状态">
				<template slot-scope="scope">
					<span v-if="scope.row.enableFlag == 1">
						<i
							class="el-icon-circle-check"
							style="color:#46e846f2"
						></i>
						启用
					</span>
					<span v-else-if="scope.row.enableFlag == 0">
						<i class="el-icon-error"></i> 禁用
					</span>
				</template>
			</el-table-column>
			<el-table-column prop label="操作">
				<template slot-scope="scope">
					<div>
						<el-button
							@click="handleClick(scope.row)"
							type="text"
							size="small"
							>详情</el-button
						>
						<el-button
							@click="qiClick(scope.row)"
							type="text"
							size="small"
							style="color:#e380f5"
							v-if="scope.row.enableFlag == 0"
							>启用</el-button
						>
						<el-button
							@click="jinClick(scope.row)"
							type="text"
							size="small"
							style="color:red"
							v-if="scope.row.enableFlag == 1"
							>禁用</el-button
						>
					</div>
				</template>
			</el-table-column>
		</el-table>
		<div class="bottom_btn" v-if="tableData.length > 0">
			<el-button @click="all_qiClick()" type="text" size="small"
				>启用</el-button
			>
			<el-button @click="all_jinClick()" type="text" size="small"
				>禁用</el-button
			>
		</div>
		<fenye
			style="text-align: right;margin:20px 0 0 0;"
			@fatherMethod="getpage"
			@fathernum="gettol"
			:pagesa="total_cnt"
			:currentPage="currentPage"
			v-if="tableData.length > 0"
		></fenye>
	</div>
</template>

<script>
import fenye from '@/components/cloudfenye';
import { query_node, filter_node, get_nodetype_enum } from '../../servers/api';
import axios from 'axios';
export default {
	data() {
		return {
			currentPage: 1,
			seachinput: '',
			value: -1,
			value_node: -1,
			city_detil: '',
			firstchid: '',
			secondchid: '',
			dev_type: '',
			arch_type: '',
			os_type: '',
			city_disable: true,
			show_export: true,
			options_city: [],
			stateopt: [
				{
					value: -1,
					label: '全部',
				},
				{
					value: 0,
					label: '离线',
				},
				{
					value: 1,
					label: '在线',
				},
			],
			stateopt_node: [
				{
					value: -1,
					label: '全部',
				},
				{
					value: 0,
					label: '禁用',
				},
				{
					value: 1,
					label: '启用',
				},
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
			options2: [
				{
					value: '0',
					label: '全部',
				},
				{
					value: '1',
					label: '电信',
				},
				{
					value: '2',
					label: '移动',
					// disabled: true
				},
				{
					value: '3',
					label: '联通',
				},
			],
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
			value1: '',
			total_cnt: 1,
			tolpage: 0,
			pagesize: 10,
			value2: '',
			optiondisplay: false,
			rotate: false,
			tableData: [],
			province_city: [],
			citydata: {},
			tolpage_export: 0,
			tableData_export: [],
			temporary_arr: [],
		};
	},
	mounted() {
		this.getJson();
		this.get_search_data();
		this.getdatalist();
	},
	methods: {
		getRowKey(row) {
			return row.nodeId;
		},
		get_search_data() {
			let params = new Object();
			get_nodetype_enum(params)
				.then((res) => {
					console.log(res);
					if (res.status == 0) {
					} else {
						this.$message.error(res.err_msg);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		},
		//多选事件
		handleSelectionChange(val) {
			if (val.length <= 0) {
				return false;
			}
			let arr = [];
			val.forEach((item, index) => {
				arr.push(item.nodeId);
			});
			this.temporary_arr = arr;
		},
		getJson() {
			axios.get('./static/pro_city.json').then((res) => {
				this.citydata = res.data;
			});
		},
		provinceChange(value) {
			if (value == -1) {
				this.value1 = -1;
				this.city_disable = true;
				this.city_detil = '';
				this.getdatalist();
			} else {
				this.options_city = this.citydata[value[1]].cities;
				this.city_disable = false;
				this.city_detil = '';
				this.getdatalist();
			}
		},
		handleChange(value) {
			this.getdatalist();
		},
		handleChange_node(value) {
			this.getdatalist();
		},
		//请求数据
		getdatalist() {
			let parmas = new Object();
			// let ipsos = /((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){3}(1\d\d|2[0-4]\d|25[0-5]|[1-9]\d|\d)/;
			let ipsos = /^(\d{1,3}\.{1}){3}((\d{1,3}){1})$/;
			if (ipsos.test(this.seachinput) == true) {
				parmas.nodeId = '';
				parmas.ip = this.seachinput;
			} else {
				parmas.nodeId = this.seachinput;
				parmas.ip = '';
			}
			if (this.value1 == -1) {
				parmas.province = '';
			} else if (this.value1[1]) {
				parmas.province = this.value1[1];
			} else {
				parmas.province = '';
			}
			if (this.value !== 0 && this.value !== 1) {
				parmas.state = -1;
			} else {
				parmas.state = this.value;
			}
			if (this.value2) {
				if (this.value2 == '全部') {
					parmas.isp = '';
				} else {
					parmas.isp = this.value2;
				}
			} else {
				parmas.isp = '';
			}
			parmas.os = this.os_type;
			parmas.arch = this.arch_type;
			parmas.devicetype = this.dev_type;
			parmas.firstchid = this.firstchid;
			parmas.secondchid = this.secondchid;
			parmas.enableFlag = this.value_node;
			if (this.city_detil == '全部') {
				parmas.city = '';
			} else {
				parmas.city = this.city_detil;
			}
			parmas.page = this.tolpage;
			query_node(parmas)
				.then((res) => {
					if (res.status == 0) {
						this.tableData = [];
						if (res.data.result.length <= 0) {
							this.$message.sussess('暂无数据');
							this.show_export = true;
						} else {
							this.show_export = false;
							this.total_cnt = res.data.total - 10;
							res.data.result.forEach((item, index) => {
								//上行带宽-总
								item.upbandwidth = item.totalBW.substring(
									0,
									item.totalBW.lastIndexOf('/')
								);
								//下行带宽-总
								item.downbandwidth = item.totalBW.substring(
									item.totalBW.indexOf('/') + 1
								);
								//上行带宽-剩余
								item.upbandwidth_rema = item.remainingBW.substring(
									0,
									item.remainingBW.lastIndexOf('/')
								);
								//下行带宽-剩余
								item.downbandwidth_rema = item.remainingBW.substring(
									item.remainingBW.indexOf('/') + 1
								);
								if (item.state == 0) {
									item.devstatus = '在线';
									item.bgccolor = '#5CC77D';
								} else {
									item.devstatus = '离线';
									item.bgccolor = '#929292';
								}
								this.tableData.push(item);
							});
						}
					} else {
						this.$message.error(res.err_msg);
					}
				})
				.catch((error) => {});
		},
		//启用禁用（请求接口）
		qiorjin(val, datalist, orrlist) {
			let parmas = new Object();
			if (!orrlist) {
				let nodelist = [];
				nodelist.push(datalist.nodeId);
				parmas.nodes = nodelist;
			} else {
				parmas.nodes = datalist;
			}
			parmas.opt_flag = val;
			let messtit = '确定进行此操作吗？';
			if (val == 1) {
				messtit = '确定启用该节点吗？';
			} else {
				messtit = '确定禁用该节点吗？';
			}
			this.$confirm(messtit, '提示', {
				type: 'warning',
			})
				.then((_) => {
					filter_node(parmas)
						.then((res) => {
							console.log(res);
							if (res.status == 0) {
								this.$message({
									message: '操作成功',
									type: 'success',
								});
								this.getdatalist();
							}
						})
						.catch((error) => {
							console.log(error);
						});
				})
				.catch((_) => {});
		},
		//详情
		handleClick(val) {
			sessionStorage.setItem('serdata', JSON.stringify(val));
			this.$router.push({
				path: '/ipfs_location_details',
			});
		},
		//启用--单个
		qiClick(val) {
			console.log(val);
			this.qiorjin(1, val);
		},
		//禁用--单个
		jinClick(val) {
			console.log(val);
			this.qiorjin(0, val);
		},
		//启用--多个
		all_qiClick() {
			this.qiorjin(1, this.temporary_arr, 1);
		},
		//启用--多个
		all_jinClick() {
			this.qiorjin(0, this.temporary_arr, 1);
		},
		//获取页码
		getpage(pages) {
			this.tolpage = pages;
			this.getdatalist();
		},
		//获取每页数量
		gettol(pagetol) {
			this.pagesize = pagetol;
			this.getdatalist();
		},
		//搜索按钮
		seachipfs() {
			this.getdatalist();
		},
		seach() {
			this.getdatalist();
		},
		//重置
		resetseach() {
			this.value = '';
			this.value1 = -1;
			this.value2 = '';
			this.seachinput = '';
			this.city_disable = true;
			this.city_detil = '';
			this.getdatalist();
		},
		// 表头样式设置
		headClass() {
			return 'text-align: center;background:#eef1f6;';
		},
		// 表格样式设置
		rowClass() {
			return 'text-align: center;';
		},
		//筛选按钮
		option_display() {
			this.optiondisplay = !this.optiondisplay;
			this.rotate = !this.rotate;
		},
		//导出
		export_Excel() {
			let parmas = new Object();
			// let ipsos = /((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){3}(1\d\d|2[0-4]\d|25[0-5]|[1-9]\d|\d)/;
			let ipsos = /^(\d{1,3}\.{1}){3}((\d{1,3}){1})$/;
			if (ipsos.test(this.seachinput) == true) {
				parmas.nodeId = '';
				parmas.ip = this.seachinput;
			} else {
				parmas.nodeId = this.seachinput;
				parmas.ip = '';
			}
			if (this.value1[1]) {
				this.$message(this.value1);
				parmas.province = this.value1[1];
			} else {
				parmas.province = '';
			}
			if (this.value !== 0 && this.value !== 1) {
				parmas.state = -1;
			} else {
				parmas.state = this.value;
			}
			parmas.enableFlag = this.value_node;
			parmas.city = this.city_detil;
			parmas.page = this.tolpage_export;
			parmas.isp = '';
			query_node(parmas)
				.then((res) => {
					if (res.status == 0) {
						this.tableData_export = this.tableData_export.concat(
							res.data.result
						);
						if (res.data.remaining == 0) {
							this.exportExcel();
							this.fan.fanactionlog('导出', '节点信息', 1);
						} else {
							this.tolpage_export++;
							this.export_Excel();
						}
					} else {
						this.fan.fanactionlog('导出', '节点信息', 0);
					}
				})
				.catch((error) => {
					this.fan.fanactionlog('导出', '节点信息', 0);
				});
		},
		//导出表格
		exportExcel() {
			require.ensure([], () => {
				const {
					export_json_to_excel,
				} = require('../../excel/Export2Excel');
				const tHeader = [
					'节点ID',
					'节点状态',
					'节点IP',
					'节点城市',
					'节点分区',
					'节点运营商',
					'总带宽',
					'占用带宽',
					'剩余带宽',
					'总空间',
					'占用空间',
					'剩余空间',
					'节点平均利用率',
				];
				// 上面设置Excel的表格第一行的标题
				const filterVal = [
					'nodeId',
					'state',
					'ip',
					'city',
					'area',
					'isp',
					'totalBW',
					'occupyBW',
					'remainingBW',
					'totalCap',
					'occupyCap',
					'remainingCap',
					'useRate',
				];
				// 上面的index、nickName、name是tableData里对象的属性
				const list = this.tableData_export; //把data里的tableData存到list
				const data = this.formatJson(filterVal, list);
				export_json_to_excel(tHeader, data, '节点信息');
				this.tableData_export = [];
				this.tolpage_export = 0;
			});
		},

		formatJson(filterVal, jsonData) {
			return jsonData.map((v) => filterVal.map((j) => v[j]));
		},
	},
	components: { fenye },
};
</script>

<style lang="scss" scoped>
.content {
	height: auto;
	.el-select {
		margin-bottom: 10px;
	}
	.seach_title {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding: 10px 0;
		.seach_title_input {
			width: 15%;
		}

		.resetseach_btn {
			margin-left: 15px;
		}
		.seach_top_right {
			float: left;
			height: 40px;
			line-height: 40px;
			margin-left: 10px;
		}
	}
}
.seach_bottom {
	text-align: left;
	// height: 100px;
	background: #f0f5f5;
	border-radius: 10px;
	padding: 10px 15px 5px 15px;
	margin-bottom: 10px;
	.seach_bottom_tw {
		display: flex;
		.location_select {
			margin: 0 0;
		}
		.region_select {
			margin: 0 10px;
		}
	}
	.el-select {
		width: 150px;
	}
	.seach_bottom_btn {
		margin: 10px 10px;
	}
}
.bottom_btn {
	width: 100px;
	position: relative;
	top: 50px;
	left: 0;
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
