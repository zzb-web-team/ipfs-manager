<template>
	<div class="content node_information_con" :style="autoWidth">
		<!-- 面包屑  -->
		<!-- <el-breadcrumb separator="/">
			<el-breadcrumb-item>
				<a>节点信息</a>
			</el-breadcrumb-item>
		</el-breadcrumb> -->
		<!-- 搜索框 -->
		<div class="rowbg">
            
			<div class="item_title">节点信息</i></div>
            
			<el-row type="flex" justify="start" style="white-space:nowrap;">
				<el-input
					placeholder="请输入节点IP，节点ID"
					v-model="seachinput"
					@keyup.enter.native="seachipfs()"
					size="small"
					style="width:12%;"
				>
					<i
						slot="prefix"
						class="el-input__icon el-icon-search"
						@click="seachipfs"
					></i>
				</el-input>
				<span style="margin-left:20px;margin-right:10px;">节点区域/省市</span>
				<el-cascader
					style="width:100%;max-width: 200px;"
					placeholder="请选择区域"
					v-model="value1"
					:options="citylist"
					@change="provinceChange"
					size="small"
				></el-cascader>
				<el-select
					v-model="city_detil"
					placeholder="请选择城市"
					@change="handleChange()"
					:disabled="city_disable"
					style="width:100%;max-width: 200px;margin-left:10px;"
					size="small"
				>
					<el-option
						v-for="(item, index) in options_city"
						:key="index + item.name + 'city'"
						:label="item.name"
						:value="item.name"
					></el-option>
				</el-select>
				<span style="margin-left:20px;margin-right:10px;">节点渠道商:</span>
				<el-select
					v-model="firstchid"
					placeholder="一级渠道商"
					@change="handleChangefirst($event)"
					style="width:100%;max-width: 200px;"
					size="small"
				>
					<el-option value="" label="全部"></el-option>
					<el-option
						v-for="(item, index) in firstchan"
						:key="index + item.value"
						:label="item.name"
						:value="item.value"
					></el-option>
				</el-select>
				<el-select
					v-model="secondchid"
					placeholder="二级渠道商"
					@change="handleChange()"
					:disabled="chil_disable"
					style="width:100%;max-width: 200px;margin-left:10px;"
					size="small"
				>
					<el-option value="" label="全部"></el-option>
					<el-option
						v-for="(item, index) in secondchan"
						:key="index + item.value + 'ssd'"
						:label="item.name"
						:value="item.value"
					></el-option>
				</el-select>
				<el-button
					type="primary"
					round
					@click="resetseach()"
					class="resetseach_btn"
					size="small"
					>重置</el-button
				>
			</el-row>
		</div>
		<!-- 主体表格 -->
		<div class="rowcon">
			<div
				style="text-align:right;padding:0 10px 10px 10px;background-color: #ffffff;box-shadow: 0px 4px 10px 0px rgba(51, 51, 51, 0.04);"
			>
				<el-button
					v-show="menutype.roleE == 1"
					type="text"
					size="mini"
					@click="export_Excel()"
					:disabled="show_export"
					>导出<i class="iconfont icon-daochu" style="color:#1672E8;margin-left: 5px;"></i
				></el-button>
			</div>
			<div class="rowtab">
				<el-table
					:data="tableData"
					border
                    :row-style="{height: '72px'}"
					:cell-style="rowClass"
					:header-cell-style="headClass"
					:row-key="getRowKey"
					@selection-change="handleSelectionChange"
					@filter-change="filterChange"
                    :max-height="tableHeight"
                    style="font-size: 10px"
                    
				>
					<el-table-column
						type="selection"
						width="45"
						:reserve-selection="true"
					></el-table-column>
					<el-table-column prop="ip" label="节点IP"></el-table-column>
					<el-table-column
						prop="state"
						label="节点运行状态"
						:filter-multiple="false"
						:column-key="'state'"
						:filters="stateopt"
					>
						<template slot-scope="scope">
							<div
								v-if="scope.row.state == 0"
								style="color:#333333;"
							>
								-
							</div>
							<div v-else style="color:#333333;">在线</div>
						</template>
					</el-table-column>
					<el-table-column prop="city" label="节点地域">
						<template slot-scope="scope">
							{{ scope.row.city }}-{{ scope.row.area }}
						</template>
					</el-table-column>
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
						:filter-multiple="false"
						:column-key="'devicetype'"
						:filters="devicetype"
					></el-table-column>
					<el-table-column
						prop="arch"
						label="硬件类型"
						:filter-multiple="false"
						:column-key="'arch'"
						:filters="arch"
					></el-table-column>
					<el-table-column
						prop="os"
						label="操作系统"
						:filter-multiple="false"
						:column-key="'os'"
						:filters="os"
					></el-table-column>
					<el-table-column
						prop="isp"
						label="节点线路"
						:filter-multiple="false"
						:column-key="'isp'"
						:filters="isp"
					></el-table-column>
					<el-table-column
						prop="proportion_cpu"
						label="CPU占用"
						width="100"
					>
						<template slot-scope="scope">
							<span>{{ scope.row.proportion_cpu }}%</span>
							<el-progress
								:text-inside="true"
								:show-text="false"
								:stroke-width="12"
								:percentage="scope.row.proportion_cpu"
								:color="scope.row.color_cpu"
							></el-progress>
						</template>
					</el-table-column>
					<el-table-column
						prop="proportion_ram"
						label="内存占用"
						width="100"
					>
						<template slot-scope="scope">
							<span>{{ scope.row.proportion_ram }}%</span>
							<el-progress
								:text-inside="true"
								:show-text="false"
								:stroke-width="12"
								:percentage="scope.row.proportion_ram"
								:color="scope.row.color_ram"
							></el-progress>
						</template>
					</el-table-column>
					<el-table-column
						prop="remainingCap"
						label="存储占用"
						width="100"
					>
						<template slot-scope="scope">
							<span
								>{{
									(
										(scope.row.occupyCap /
											scope.row.totalCap) *
										100
									).toFixed(2) * 1
								}}%</span
							>
							<el-progress
								:text-inside="true"
								:show-text="false"
								:stroke-width="12"
								:percentage="
									(
										(scope.row.occupyCap /
											scope.row.totalCap) *
										100
									).toFixed(2) * 1
								"
								:color="scope.row.color_disk"
							></el-progress>
						</template>
					</el-table-column>
					<el-table-column
						prop="occupyBW"
						label="占用带宽"
						width="120"
					>
						<template slot-scope="scope">
							<p style="display: flex;align-items: center;">
								<img
									src="../../assets/img/shang.png"
									alt=""
									style="width: 13%;"
								/>{{ scope.row.upbandwidth_occ }}
							</p>
							<p style="display: flex;align-items: center;">
								<img
									src="../../assets/img/xia.png"
									alt=""
									style="width: 13%;"
								/>{{ scope.row.downbandwidth_occ }}
							</p>
						</template>
					</el-table-column>
					<el-table-column
						prop="remainingBW"
						label="剩余带宽"
						width="120"
					>
						<template slot-scope="scope">
							<p style="display: flex;align-items: center;">
								<img
									src="../../assets/img/shang.png"
									alt=""
									style="width: 13%;"
								/>{{ scope.row.upbandwidth_rema }}
							</p>
							<p style="display: flex;align-items: center;">
								<img
									src="../../assets/img/xia.png"
									alt=""
									style="width: 13%;"
								/>{{ scope.row.downbandwidth_rema }}
							</p>
						</template>
					</el-table-column>
					<el-table-column
						prop="useRate"
						label="节点平均利用率"
					></el-table-column>
					<el-table-column
						prop="nodestatus"
						label="节点任务状态"
						:filter-multiple="false"
						:column-key="'nodestatus'"
						:filters="stateopt_node"
					>
						<template slot-scope="scope">
							<span
								v-if="scope.row.enableFlag == 1"
								style="color:#3FD637"
							>
								<i class="el-icon-circle-check"></i>
								启用
							</span>
							<span
								v-else-if="scope.row.enableFlag == 0"
								style="color:#F85555"
							>
								<i class="el-icon-remove-outline"></i> 禁用
							</span>
						</template>
					</el-table-column>
					<el-table-column prop="nodeId" label="节点ID">
						<template slot-scope="scope">
                            <span style="display:none;"  >{{scope.row.nodeId}}</span>
							<el-button
								@click="show_nodeid(scope.row.nodeId)"
                                class="copy"
								type="text"
								size="small"
								>查看</el-button
							>
						</template>
					</el-table-column>
					<el-table-column prop label="操作" width="140">
						<template slot-scope="scope">
							<div>
								<el-button
									@click="handleClick(scope.row)"
									type="text"
									size="small"
									>详情</el-button
								>
								<el-button
									v-show="menutype.roleU == 1"
									@click="qiClick(scope.row)"
									type="text"
									size="small"
									style="color:#3FD637"
									v-if="scope.row.enableFlag == 0"
									>启用</el-button
								>
								<el-button
									v-show="menutype.roleU == 1"
									@click="jinClick(scope.row)"
									type="text"
									size="small"
									style="color:#F85555"
									v-if="scope.row.enableFlag == 1"
									>禁用</el-button
								>
							</div>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="bottom_com">
				<div class="bottom_btn" v-if="tableData.length > 0">
					<el-button
						@click="all_qiClick()"
						type="primary"
						size="mini"
						v-show="menutype.roleU == 1"
						>启用</el-button
					>
					<el-button
						@click="all_jinClick()"
						type="danger"
						size="mini"
						v-show="menutype.roleU == 1"
						>禁用</el-button
					>
				</div>
				<fenye
					@fatherMethod="getpage"
					@fathernum="gettol"
					:pagesa="total_cnt"
					:currentPage="currentPage"
					ref="paginations"
					v-if="tableData.length > 0"
				></fenye>
			</div>
		</div>
        <el-dialog
            title="节点ID"
            :visible.sync="copy_dialogVisible"
            width="30%">
            <span>{{node_id}}</span><el-button type="text" @click="copy_data(node_id)" class="copy">复制</el-button>
        </el-dialog>
	</div>
</template>

<script>
import fenye from '@/components/fenye';
import {
	query_node,
	filter_node,
	get_nodetype_enum,
	nodeinfo_export,
	query_nodeuseRate,
} from '../../servers/api';
import { menudisable } from '../../servers/sevdate';
import axios from 'axios';
import Clipboard from 'clipboard';
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
			chil_disable: true,
			show_export: true,
			options_city: [],
			stateopt: [
				// {
				// 	value: -1,
				// 	label: '全部',
				// },
				{
					value: 0,
					label: '离线',
					text: '离线',
				},
				{
					value: 1,
					label: '在线',
					text: '在线',
				},
			],
			stateopt_node: [
				// {
				// 	value: -1,
				// 	label: '全部',
				// 	text: '全部',
				// },
				{
					value: 0,
					label: '禁用',
					text: '禁用',
				},
				{
					value: 1,
					label: '启用',
					text: '启用',
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
			],
			devicetype: [
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
				// 	name: 'rouji-kernel4-5',
				// 	secondchan: [
				// 		{
				// 			name: 'rouji-kernel4-5',
				// 			value: 's_computerk4-5.rouji_hk',
				// 		},
				// 	],
				// 	value: 'f_computerk4-5.rouji_unknown',
				// },
				// {
				// 	name: 'rouji-kernel2-3',
				// 	secondchan: [
				// 		{
				// 			name: 'rouji-kernel2-3',
				// 			value: 's_computerk2-3.rouji_hk',
				// 		},
				// 	],
				// 	value: 'f_computerk2-3.rouji_unknown',
				// },
			],
			secondchan: [],
			value1: -1,
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
			menutype: {},
			pathname: '',
			z_tablist: [],
			autoWidth: {
				width: '',
			},
            tableHeight:0,
            node_id:'',
            copy_dialogVisible:false,
		};
	},
	beforeRouteEnter(to, from, next) {
		window.fromname = from.path;
		window.toname = to.name;
		next();
	},
	computed: {},
	mounted() {
        this.$nextTick(() => {
            let con_he = document.getElementsByClassName('content-container')[0].offsetHeight - 402 ;
            this.tableHeight = con_he;
        });
		this.getJson();
		this.get_search_data();
		if (sessionStorage.getItem('search_data')) {
			if (
				window.fromname == '/ipfs_location_details' ||
				window.fromname == '/'
			) {
				let search_data = JSON.parse(
					sessionStorage.getItem('search_data')
				);
				let city_list = JSON.parse(sessionStorage.getItem('citylist'));
				this.optiondisplay = search_data.optiondisplay;
				if (search_data.ip != '') {
					this.seachinput = search_data.ip;
				} else if (search_data.nodeId != '') {
					this.seachinput = search_data.nodeId;
				} else {
					this.seachinput = '';
				}
				if (search_data.province == '') {
					this.value1 = '';
					this.city_disable = true;
					this.city_detil = '';
				} else {
					this.value1 = [search_data.qu, search_data.province];
					this.city_disable = false;
					this.options_city = city_list[this.value1[1]].cities;
					this.city_detil =
						search_data.city == '全部' ? '' : search_data.city;
				}
				this.value_node = search_data.enableFlag;
				this.value = search_data.state;
				this.firstchid = search_data.firstchid;
				this.secondchid = search_data.secondchid;
				this.dev_type = search_data.devicetype;
				this.arch_type = search_data.arch;
				this.os_type = search_data.os;
				this.value2 = search_data.isp;
			}
		}
		// if (this.$route.query.city) {
		// 	this.optiondisplay = true;
		// 	if (
		// 		this.$route.query.firstchans == '省市' ||
		// 		this.$route.query.firstchans == '全部节点'
		// 	) {
		// 		this.firstchid = '';
		// 		this.value1 = [this.$route.query.quyu, this.$route.query.city];
		// 	} else if (this.$route.query.quyu == '-1') {
		// 		this.value1 = -1;
		// 	} else {
		// 		this.value1 = [this.$route.query.quyu, this.$route.query.city];
		// 		this.firstchan.forEach((item, index) => {
		// 			if (item.name == this.$route.query.firstchans) {
		// 				this.$nextTick((this.firstchid = item.value));
		// 			}
		// 		});
		// 	}
		// }
		// this.getdatalist();
		let munulist = JSON.parse(localStorage.getItem('menus'));
		let pathname = this.$route.path;
		this.menutype = menudisable(munulist, pathname);
	},
	methods: {
		filterChange(filters) {
			//节点任务状态
			if (filters.nodestatus) {
				if (filters.nodestatus[0] != undefined) {
					this.value_node = filters.nodestatus[0];
				} else {
					this.value_node = -1;
				}
			}
			//节点运行状态
			if (filters.state) {
				if (filters.state[0] != undefined) {
					this.value = filters.state[0];
				} else {
					this.value = -1;
				}
			}
			//设备类型
			if (filters.devicetype) {
				if (filters.devicetype[0] != undefined) {
					this.dev_type = filters.devicetype[0];
				} else {
					this.dev_type = '';
				}
			}
			//硬件类型
			if (filters.arch) {
				if (filters.arch[0] != undefined) {
					this.arch_type = filters.arch[0];
				} else {
					this.arch_type = '';
				}
			}
			//操作系统
			if (filters.os) {
				if (filters.os[0] != undefined) {
					this.os_type = filters.os[0];
				} else {
					this.os_type = '';
				}
			}
			//节点线路
			if (filters.isp) {
				if (filters.isp[0] != undefined) {
					this.value2 = filters.isp[0];
				} else {
					this.value2 = '';
				}
			}
			this.getdatalist(); // 通过接口获取数据的方法
		},
		getRowKey(row) {
			return row.nodeId;
		},
		get_search_data() {
			let params = new Object();
			params.time = '111';
			get_nodetype_enum(params)
				.then((res) => {
					if (res.status == 0) {
						res.data.arch.forEach((item) => {
							item.value = item.name;
							item.text = item.value;
						});
						res.data.device_type.forEach((item) => {
							item.value = item.name;
							item.text = item.value;
						});
						res.data.isp.forEach((item) => {
							item.value = item.name;
							item.text = item.value;
						});
						res.data.os.forEach((item) => {
							item.value = item.name;
							item.text = item.value;
						});
						this.arch = res.data.arch;
						this.devicetype = res.data.device_type;
						this.isp = res.data.isp;
						this.os = res.data.os;
						this.firstchan = res.data.firstchan;
						if (this.$route.query.city) {
							this.optiondisplay = true;

							if (
								this.$route.query.firstchans == '省市' ||
								this.$route.query.firstchans == '全部节点'
							) {
								this.firstchid = '';
							} else {
								this.firstchan.forEach((item, index) => {
									if (
										item.name ==
										this.$route.query.firstchans
									) {
										this.firstchid = item.value;
										this.chil_disable = false;
										this.secondchan = item.secondchan;
									}
								});
							}

							if (this.$route.query.quyu == '-1') {
								this.value1 = -1;
								this.city_disable = true;
							} else {
								this.value1 = [
									this.$route.query.quyu,
									this.$route.query.city,
								];
								this.options_city = this.citydata[
									this.$route.query.city
								].cities;
								this.city_disable = false;
							}
						}
					} else {
						this.$message.error(res.err_msg);
					}
					this.getdatalist();
				})
				.catch((error) => {});
		},
		//获取节点利用率
		get_node_dataflow(data_list) {
			let params = new Object();
			let nodeid_list = [];
			data_list.forEach((item) => {
				nodeid_list.push(item.nodeId);
			});
			params.nodeidList = nodeid_list;
			query_nodeuseRate(params)
				.then((res) => {
					if (res.status == 0) {
						let obj = {};
						res.data.forEach((item) => {
							let id = item.nodeid;
							let num =
								(item.nodeAvgUseRate * 100).toFixed(2) + '%';
							obj[id] = num;
						});
						data_list.forEach((item) => {
							let k = item.nodeId;
							if (obj[k]) {
								item.useRate = obj[k];
							}
						});
						this.tableData = data_list;
						this.autoWidth.width =
							document.getElementsByClassName('el-table__body')[0]
								.offsetWidth +
							120 +
							'px';
					} else {
						this.$message.error(res.err_msg);
					}
				})
				.catch((error) => {});
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
				sessionStorage.setItem('citylist', JSON.stringify(res.data));
			});
		},
		provinceChange(value) {
			this.currentPage = 1;
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
			this.currentPage = 1;
			this.getdatalist();
		},
		handleChangefirst(val) {
			this.secondchid = '';
			this.currentPage = 1;
			if (val == '*' || val == '') {
				this.chil_disable = true;
				this.secondchan = [];
				this.secondchid = '';
			} else {
				this.firstchan.forEach((item) => {
					if (item.value == val) {
						//筛选出匹配数据
						this.secondchan = item.secondchan;
						this.chil_disable = false;
					} else {
					}
				});
			}
			this.getdatalist();
		},
		handleChange_node(value) {
			this.currentPage = 1;
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
				parmas.qu = this.value1[0];
				parmas.province = this.value1[1];
			} else {
				parmas.province = '';
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
			parmas.state = this.value * 1;
			parmas.os = this.os_type;
			parmas.arch = this.arch_type;
			parmas.devicetype = this.dev_type;
			parmas.firstchid = this.firstchid;
			parmas.secondchid = this.secondchid;
			parmas.enableFlag = this.value_node * 1;
			if (this.city_detil == '全部') {
				parmas.city = '';
			} else {
				parmas.city = this.city_detil;
			}
			parmas.page = this.currentPage - 1;
			parmas.order = 0;
			parmas.optiondisplay = this.optiondisplay;
			sessionStorage.setItem('search_data', JSON.stringify(parmas));
			query_node(parmas)
				.then((res) => {
					if (res.status == 0) {
						this.tableData = [];
						this.z_tablist = [];
						if (res.data.result.length <= 0) {
							this.$message.sussess('暂无数据');
							this.show_export = true;
							return false;
						} else {
							this.show_export = false;
							this.total_cnt = res.data.total;
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
								//上行带宽-使用
								item.upbandwidth_occ = item.occupyBW.substring(
									0,
									item.occupyBW.lastIndexOf('/')
								);
								//下行带宽-使用
								item.downbandwidth_occ = item.occupyBW.substring(
									item.occupyBW.indexOf('/') + 1
								);
								item.proportion_cpu =
									(item.occupyCpu * 100).toFixed(2) * 1;
								item.proportion_ram =
									(
										(item.availMem / item.totalMem) *
										100
									).toFixed(2) * 1;
								item.proportion_disk =
									(
										(item.occupyCap / item.totalCap) *
										100
									).toFixed(2) * 1;
								if (item.proportion_cpu < 30) {
									item.color_cpu = '#3AC170';
								} else if (
									item.proportion_cpu >= 30 &&
									item.proportion_cpu < 50
								) {
									item.color_cpu = '#1572E8';
								} else if (
									item.proportion_cpu >= 50 &&
									item.proportion_cpu < 80
								) {
									item.color_cpu = '#FBC626';
								} else {
									item.color_cpu = '#F85555';
								}

								if (item.proportion_ram < 30) {
									item.color_ram = '#3AC170';
								} else if (
									item.proportion_ram >= 30 &&
									item.proportion_ram < 50
								) {
									item.color_ram = '#1572E8';
								} else if (
									item.proportion_ram >= 50 &&
									item.proportion_ram < 80
								) {
									item.color_ram = '#FBC626';
								} else {
									item.color_ram = '#F85555';
								}
								if (item.proportion_disk < 30) {
									item.color_disk = '#3AC170';
								} else if (
									item.proportion_disk >= 30 &&
									item.proportion_disk < 50
								) {
									item.color_disk = '#1572E8';
								} else if (
									item.proportion_disk >= 50 &&
									item.proportion_disk < 80
								) {
									item.color_disk = '#FBC626';
								} else {
									item.color_disk = '#F85555';
								}
								if (item.state == 0) {
									item.devstatus = '离线';
									item.bgccolor = '#929292';
								} else {
									item.devstatus = '在线';
									item.bgccolor = '#5CC77D';
								}
								// this.tableData.push(item);
								this.z_tablist.push(item);
							});
							this.$nextTick(() => {
								this.get_node_dataflow(this.z_tablist);
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
							if (res.status == 0) {
								this.$message({
									message: '操作成功',
									type: 'success',
								});
								this.getdatalist();
							}
						})
						.catch((error) => {});
				})
				.catch((_) => {});
		},
		//查看节点id
		copy_data(val) {
			 let _this=this;
             let clipboard = new Clipboard(".copy", {
				text: function() {
					return val;
				},
            });
			clipboard.on('success', function(e) {
				_this.$message.success('已复制到粘贴板');
				clipboard.destroy();
			});
			clipboard.on('error', function(e) {
				_this.$message.error(
					'您的浏览器不支持此功能，请使用其他浏览器尝试。'
				);
				clipboard.destroy();
            });
            this.copy_dialogVisible=false;
        },
        show_nodeid(data){   
            this.node_id=data;
            this.copy_dialogVisible=true;
           
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
			this.qiorjin(1, val);
		},
		//禁用--单个
		jinClick(val) {
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
			this.currentPage = pages;
			this.getdatalist();
		},
		//获取每页数量
		gettol(pagetol) {
			this.pagesize = pagetol;
			this.getdatalist();
		},
		//搜索按钮
		seachipfs() {
			this.currentPage = 1;
			this.getdatalist();
		},
		seach() {
			this.currentPage = 1;
			this.getdatalist();
		},
		//重置
		resetseach() {
			this.currentPage = 1;
			this.value = -1;
			this.value1 = -1;
			this.value2 = '';
			this.seachinput = '';
			this.city_disable = true;
			this.chil_disable = true;
			this.city_detil = '';
			this.os_type = '';
			this.arch_type = '';
			this.dev_type = '';
			this.firstchid = '';
			this.secondchid = '';
			this.value_node = -1;
			this.getdatalist();
		},
		// 表头样式设置
		headClass() {
			return 'text-align: center;background:#F9F9F9;height:72px;';
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
			nodeinfo_export(parmas)
				.then((res) => {
					if (res.status == 0) {
						window.open(res.data.down_load);
						this.fan.fanactionlog('导出', '节点信息', 1);
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
	overflow-x: hidden;
	background-color: #f9fbfd;
	.seach_title {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding: 10px 0;
		.seach_title_input {
			width: 15%;
		}
		.seach_top_right {
			float: left;
			height: 40px;
			line-height: 40px;
			margin-left: 10px;
		}
	}
	.rowcon {
        flex: 1;
		padding: 30px;
		margin: 30px;
		background-color: #ffffff;
		border-radius: 8px;
		.rowtab {
			background-color: #ffffff;
			box-sizing: border-box;
			// padding: 0 30px;
		}
	}
}
.seach_bottom {
	text-align: left;
	// height: 100px;
	// background: #f0f5f5;
	border-radius: 10px;
	padding: 10px 15px 5px 15px;
	margin-bottom: 10px;
	.seach_bottom_tw {
		// display: flex;
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
.bottom_com {
	width: 100%;
	display: flex;
	justify-content: space-between;
	box-sizing: border-box;
	padding: 20px;
	background-color: #ffffff;
	.bottom_btn {
		width: auto;
		display: flex;
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
