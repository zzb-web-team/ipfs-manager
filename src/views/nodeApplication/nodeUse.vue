<template>
	<section class="myself-container content nodeuser">
		<div class="user-title" style="display: flex;flex-flow: column;">
			<!-- <el-breadcrumb separator="/">
				<el-breadcrumb-item>
					<a>节点利用率</a>
				</el-breadcrumb-item>
			</el-breadcrumb> -->
			<div>
				<el-tabs
					v-model="activeName"
					@tab-click="handleClick"
					class="node_user_title"
				>
					<!-- <el-tab-pane label="IP流量" name="first"> -->
					<el-tab-pane label="节点利用率" name="first">
						<!--  -->

						<div class="rowbg">
							<div class="item_title">节点利用率</div>
							<el-input
								v-model="input"
								placeholder="请输入节点ID"
								style="width: 15%;"
								size="small"
								@keyup.enter.native="onseach"
							>
								<i
									slot="prefix"
									class="el-input__icon el-icon-search"
									@click="onseach()"
								></i
							></el-input>
							<el-select
								v-model="node_type"
								placeholder="请选择节点类型"
								@change="onseach()"
								style="width:100%;max-width: 200px;margin-left:10px;"
								size="small"
							>
								<el-option value="*" label="全部"></el-option>
								<el-option
									v-for="(item, index) in options_node_type"
									:key="index + item.label + 'node_type'"
									:label="item.label"
									:value="item.label"
								></el-option>
							</el-select>
							<el-select
								v-model="firstvalue"
								placeholder="节点一级渠道"
								size="small"
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
								placeholder="节点二级渠道"
								size="small"
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
								placeholder="硬件类型"
								size="small"
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
								style="margin-left:10px;width: 8%;"
								placeholder="请选择区域"
								v-model="valuea"
								size="small"
								:options="optionsafs"
								@change="seach_operce_ip"
							></el-cascader>
							<el-select
								:disabled="city_disable_ip"
								v-model="valueb"
								placeholder="请选择城市"
								size="small"
								style="margin-left:10px;width: 8%;"
								@change="onseach()"
							>
								<!-- <el-option value="*" label="全部"></el-option> -->
								<el-option
									v-for="(item, index) in optionsb"
									:key="item.name + index"
									:label="item.name"
									:value="item.name"
								>
								</el-option>
							</el-select>
							<el-select
								v-model="ispvalue"
								placeholder="网络线路"
								size="small"
								style="margin-left:10px;width: 8%;"
								@change="onseach"
							>
								<el-option value="*" label="全部"></el-option>
								<el-option
									v-for="(item, index) in isp"
									:key="index"
									:label="item.name"
									:value="item.name"
								></el-option>
							</el-select>
							<el-radio-group
								v-show="zidingyi == false"
								v-model="radio"
								size="small"
								@change="change_time('ip')"
								style="margin-right:10px;margin-left:10px;"
							>
								<el-radio-button label="0"
									>今天</el-radio-button
								>
								<el-radio-button label="1"
									>昨天</el-radio-button
								>
								<el-radio-button label="2"
									>近7天</el-radio-button
								>
								<el-radio-button label="3"
									>近30天</el-radio-button
								>
								<el-radio-button label="4"
									>自定义</el-radio-button
								>
							</el-radio-group>
							<el-button
								@click="showpicker"
								v-if="zidingyi == true"
								size="small"
								style="margin-right:10px;margin-left:10px;"
								type="primary"
								>自定义</el-button
							>
							<el-date-picker
								v-if="zidingyi == true"
								style="margin-right:10px;"
								v-model="value2"
								type="daterange"
								:picker-options="pickerOptions"
								range-separator="至"
								size="small"
								start-placeholder="开始日期"
								end-placeholder="结束日期"
								align="left"
								@change="onseach"
							>
							</el-date-picker>
							<!-- <el-button
								type="primary"
								@click="onseach"
								size="small"
								>查询</el-button
							> -->
						</div>
						<!--  -->
						<div
							style="margin:24px 30px;box-shadow: 0px 4px 10px 0px rgba(51, 51, 51, 0.04);"
						>
							<el-row class="overview">
								<el-col :span="8">
									<div class="user-item">
										<div class="item-count">
											<!-- {{ ipDataFlow }}% -->
											<el-progress
												type="circle"
												:width="80"
												:percentage="ipDataFlow"
												color="#177DFF"
											></el-progress>
										</div>
										<div class="item-text">流量利用率</div>
									</div>
								</el-col>
								<el-col :span="8">
									<div class="user-item">
										<div class="item-count">
											<!-- {{ fsDataFlow }}% -->
											<el-progress
												type="circle"
												:width="80"
												:percentage="fsDataFlow"
												color="#FDAF4B"
											></el-progress>
										</div>
										<div class="item-text">存储利用率</div>
									</div>
								</el-col>
								<el-col :span="8">
									<div class="user-item">
										<div class="item-count">
											<!-- {{ pingDataFlow }}% -->
											<el-progress
												type="circle"
												:width="80"
												:percentage="pingDataFlow"
												color="#F3545D"
											></el-progress>
										</div>
										<div class="item-text">平均利用率</div>
									</div>
								</el-col>
							</el-row>
						</div>
						<!--  -->
						<div class="device_form">
							<!-- <el-button
								v-show="menutype.roleE == 1"
								class="ip_upload_btn"
								@click="ip_upload"
								type="text"
								size="medium"
								><i class="el-icon-download"></i
							></el-button> -->
							<div
								id="myChart3"
								:style="{ height: '600px', width: '100%' }"
							></div>
						</div>
						<div class="devide_table">
							<el-row type="flex" class="row_active">
								<el-col
									:span="24"
									style="text-align:left;"
									v-show="tabtitle_flow == '使用流量'"
									>节点利用率表</el-col
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
											label="节点ID"
										>
										</el-table-column>
										<el-table-column
											prop="node_type"
											label="节点类型"
										>
											<template slot-scope="scope">
												<span
													v-if="scope.row.node_type"
													>{{
														scope.row.node_type
													}}</span
												>
												<span v-else>--</span>
											</template>
										</el-table-column>
										<el-table-column
											prop="dataFlowUse"
											:label="tabtitle_flow"
										>
											<template slot-scope="scope">
												<span>{{
													scope.row.dataFlowUse
														| zhuanbkb
												}}</span>
											</template>
										</el-table-column>
										<el-table-column
											prop="storeUse"
											:label="tabtitle_storage"
										>
											<template slot-scope="scope">
												<span>{{
													scope.row.storeUse
														| zhuanbkb
												}}</span>
											</template>
										</el-table-column>
										<el-table-column
											prop="dataFlowUseRate"
											label="流量利用率"
										>
											<template slot-scope="scope"
												>{{
													(
														scope.row
															.dataFlowUseRate *
														100
													).toFixed(4)
												}}%</template
											>
										</el-table-column>
										<el-table-column
											prop="storeUseRate"
											label="存储利用率"
										>
											<template slot-scope="scope">
												<span>
													{{
														(
															scope.row
																.storeUseRate *
															100
														).toFixed(4)
													}}%
												</span>
											</template>
										</el-table-column>
										<el-table-column
											prop="nodeAverageUseRate"
											label="节点平均利用率"
										>
											<template slot-scope="scope">
												<span>
													{{
														(
															scope.row
																.nodeAverageUseRate *
															100
														).toFixed(4)
													}}%
												</span>
											</template>
										</el-table-column>
										<el-table-column
											prop="timeStamp"
											label="日期"
										>
											<template slot-scope="scope">
												<span
													>{{
														scope.row
															.timeStampStart
															| getymd
													}}--{{
														scope.row.timeStampEnd
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
					<!-- <el-tab-pane label="FS存储" name="second">
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
								v-model="firstvalue_fs"
								placeholder="请选择一级渠道"
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
								placeholder="请选择二级渠道"
								style="margin-left:10px;width: 8%;"
								:disabled="chil_disable_fs"
								@change="onseach('fs')"
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
								v-model="devtypevalue_fs"
								placeholder="请选择硬件设备"
								style="margin-left:10px;width: 8%;"
								@change="onseach('fs')"
							>
								<el-option value="*" label="全部"></el-option>
								<el-option
									v-for="(item, index) in arch"
									:key="item.name + index"
									:label="item.name"
									:value="item.name"
								></el-option>
							</el-select>
							<el-cascader
								style="margin-left:10px;width: 8%;"
								placeholder="请选择区域"
								v-model="valueafs"
								:options="optionsafs"
								@change="seach_operce_fs"
							></el-cascader>
							<el-select
								:disabled="city_disable_fs"
								v-model="valuebfs"
								placeholder="请选择城市"
								style="margin-left:10px;width: 8%;"
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
							<el-select
								v-model="ispvalue_fs"
								placeholder="请选择线路"
								style="margin-left:10px;width: 8%;"
								@change="onseach('fs')"
							>
								<el-option value="*" label="全部"></el-option>
								<el-option
									v-for="(item, index) in isp"
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
								type="daterange"
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

						<div class="device_form" style>
							<el-button
								v-show="menutype.roleE == 1"
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
									>FS存储利用率表</el-col
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
											label="使用存储空间"
										>
											<template slot-scope="scope">
												<span>{{
													scope.row.storeUsage
														| zhuanbkb
												}}</span>
											</template>
										</el-table-column>
										<el-table-column
											prop="usagePercent"
											label="FS存储利用率"
										>
											<template slot-scope="scope">
												<span
													v-if="
														scope.row
															.storeUsagePercent ==
															'NaN'
													"
													>0%
												</span>
												<span v-else>
													{{
														(
															scope.row
																.storeUsagePercent *
															100
														).toFixed(6)
													}}%
												</span>
											</template>
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
								:currentPage="currentPagefs"
								v-show="fs_tableData.length > 0"
							></fenye>
						</div>
					</el-tab-pane> -->
				</el-tabs>
			</div>
		</div>
	</section>
</template>

<script>
import echarts from 'echarts';
import fenye from '../../components/fenye';
import {
	getlocaltimes,
	settime,
	getymdtime,
	setbatime,
	getday,
	menudisable,
	zhuanbkbs,
	formatterDate,
	msToDate,
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
	export_ipfs_avg_usage_table_file,
} from '../../servers/api';
import axios from 'axios';
export default {
	data() {
		return {
			currentPage: 1,
			currentPagefs: 1,
			city_disable_fs: true,
			city_disable_ip: true,
			activeName: 'first',
			seachinput: '',
			firstvalue: '',
			secondvalue: '',
			devtypevalue: '',
			ispvalue: '',
			firstvalue_fs: '',
			secondvalue_fs: '',
			devtypevalue_fs: '',
			ispvalue_fs: '',
			input: '',
			inputfs: '',
			zidingyi: false,
			zidingyifs: false,
			chil_disable: true,
			chil_disable_fs: true,
			ipDataFlow: 0,
			fsDataFlow: 0,
			pingDataFlow: 0,
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
				{
					value: 0,
					label: '全部',
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
			firstchan: [],
			secondchan: [],
			menutype: {},
			radio: 0,
			tabtitle_flow: '使用流量',
			tabtitle_storage: '占用存储',
			echartsexport: true,
			node_type: '',
			options_node_type: [
				{
					value: 1,
					label: '点播节点',
					text: '点播节点',
				},
				{
					value: 2,
					label: '直播节点',
					text: '直播节点',
				},
			],
		};
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
					this.valuebfs =
						search_data.city == '*' ? '' : search_data.city;
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
			this.ip_surve();
		}
		let munulist = JSON.parse(localStorage.getItem('menus'));
		let pathname = this.$route.path;
		this.menutype = menudisable(munulist, pathname);
		if (this.menutype.roleE == 1) {
			this.echartsexport = true;
		} else {
			this.echartsexport = false;
		}
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
				.catch((error) => {});
		},
		//请求数据----获取搜索条件
		getseachinput() {
			axios.get('./static/pro_city.json').then((res) => {
				this.citydata = res.data;
				sessionStorage.setItem('citylist', JSON.stringify(res.data));
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
				params.qu = this.valuea[0];
				params.region = this.valuea[1];
			} else {
				params.region = '*';
			}
			if (this.valueb !== '' && this.valueb !== '全部') {
				params.city = this.valueb;
			} else {
				params.city = '*';
			}

			if (this.firstvalue == '') {
				params.first_channel = '*';
			} else {
				params.first_channel = this.firstvalue;
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
			if (this.ispvalue == '') {
				params.isp = '*';
			} else {
				params.isp = this.ispvalue;
			}
			if (this.node_type) {
				if (this.node_type == '全部') {
					params.node_type = '*';
				} else {
					params.node_type = this.node_type;
				}
			} else {
				params.node_type = '*';
			}
			params.start_ts = this.starttime;
			params.end_ts = this.endtime - 1;
			if (params.end_ts - params.start_ts > 86399) {
				params.time_unit = 1440;
			} else {
				params.time_unit = 120;
			}
			params.radio = this.radio;
			params.activeName = this.activeName;
			sessionStorage.setItem('search_condition', JSON.stringify(params));
			query_ipfs_dataflow_avg_usage_curve(params)
				.then((res) => {
					this.avgDataFlowUtily = [];
					this.timeArray = [];
					if (res.status == 0) {
						this.avgDataFlowUtily = res.data;
						this.ipDataFlow = Number(
							(res.data.avgFlowUse * 100).toFixed(4)
						);
						this.fsDataFlow = Number(
							(res.data.avgStoreUse * 100).toFixed(4)
						);
						this.pingDataFlow = Number(
							(res.data.average * 100).toFixed(4)
						);
						this.get_ip_table();
					} else {
						this.$message.error(res.errMsg);
					}
					this.configure();
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
				params.qu = this.valueafs[0];
				params.region = this.valueafs[1];
			} else {
				params.region = '*';
			}
			if (this.valuebfs !== '') {
				params.city = this.valuebfs;
			} else {
				params.city = '*';
			}
			if (this.firstvalue_fs == '') {
				params.first_channel = '*';
			} else {
				params.first_channel = this.firstvalue_fs;
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
			if (this.ispvalue_fs == '') {
				params.isp = '*';
			} else {
				params.isp = this.ispvalue_fs;
			}

			params.start_ts = this.starttime;
			params.end_ts = this.endtime - 1;
			if (params.end_ts - params.start_ts > 2505599) {
				params.time_unit = 1440;
			} else if (params.end_ts - params.start_ts > 86399) {
				params.time_unit = 60;
			} else if (params.end_ts - params.start_ts > 21599) {
				params.time_unit = 5;
			} else {
				params.time_unit = 1;
			}
			params.radio = this.radio;
			params.activeName = this.activeName;
			sessionStorage.setItem('search_condition', JSON.stringify(params));
			query_ip_store_avg_usage_curve(params)
				.then((res) => {
					this.avgUsageArray = [];
					this.fs_timeArray = [];
					if (res.status == 0) {
						this.avgUsageArray = res.data.avgUsageArray;
						res.data.timeArray.forEach((item, index) => {
							this.fs_timeArray.push(getday(item));
						});
						this.get_fs_table();
					} else {
						this.$message.error(res.errMsg);
					}
					this.configure1();
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
			if (this.valueb !== '' && this.valueb != '全部') {
				params.city = this.valueb;
			} else {
				params.city = '*';
			}
			if (this.firstvalue == '') {
				params.first_channel = '*';
			} else {
				params.first_channel = this.firstvalue;
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
			if (this.ispvalue == '') {
				params.isp = '*';
			} else {
				params.isp = this.ispvalue;
			}
			if (this.node_type) {
				if (this.node_type == '全部') {
					params.node_type = '*';
				} else {
					params.node_type = this.node_type;
				}
			} else {
				params.node_type = '*';
			}
			params.start_ts = this.starttime;
			params.end_ts = this.endtime - 1;
			params.pageNo = this.currentPage - 1;
			params.pageSize = this.fs_pageSize;
			if (params.end_ts - params.start_ts > 86399) {
				params.time_unit = 1440;
				this.tabtitle_flow = '累计使用流量';
				this.tabtitle_storage = '平均占用存储';
			} else {
				params.time_unit = 120;
				this.tabtitle_flow = '使用流量';
				this.tabtitle_storage = '占用存储';
			}
			query_ipfs_dataflow_avg_usage_table(params)
				.then((res) => {
					this.tableData = [];
					if (res.status == 0) {
						if (res.errCode != -2) {
							this.tableData = res.data.list;
							this.totalCnt = res.data.totalCnt;
						}
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
			if (this.firstvalue_fs == '') {
				params.first_channel = '*';
			} else {
				params.first_channel = this.firstvalue_fs;
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
			if (this.ispvalue_fs == '') {
				params.isp = '*';
			} else {
				params.isp = this.ispvalue_fs;
			}
			params.start_ts = this.starttime;
			params.end_ts = this.endtime - 1;
			params.pageNo = this.currentPagefs - 1;
			params.pageSize = this.fs_pageSize;
			if (params.end_ts - params.start_ts > 2505599) {
				params.time_unit = 1440;
			} else if (params.end_ts - params.start_ts > 86399) {
				params.time_unit = 60;
			} else if (params.end_ts - params.start_ts > 21599) {
				params.time_unit = 5;
			} else {
				params.time_unit = 1;
			}
			query_ip_store_avg_usage_table(params)
				.then((res) => {
					this.fs_tableData = [];
					if (res.status == 0) {
						if (res.errCode != -2) {
							this.fs_tableData = res.data.list;
							this.fs_totalCnt = res.data.totalCnt;
						}
					} else {
						this.$message.error(res.err_msg);
					}
				})
				.catch((error) => {});
		},
		//选项卡
		handleClick(tab, event) {
			this.radio = 0;
			this.inputfs = '';
			this.input = '';
			this.firstvalue_fs = '';
			this.secondvalue_fs = '';
			this.firstvalue = '';
			this.secondvalue = '';
			this.devtypevalue = '';
			this.devtypevalue_fs = '';
			this.valuea = '';
			this.valueafs = '';
			this.valueb = '';
			this.valuebfs = '';
			this.ispvalue = '';
			this.ispvalue_fs = '';
			this.currentPagefs = 1;
			this.currentPage = 1;
			this.valuec = 5;
			this.valuecfs = 5;
			this.city_disable_fs = true;
			this.city_disable_ip = true;
			this.chil_disable_fs = true;
			this.chil_disable = true;
			this.zidingyi = false;
			this.zidingyifs = false;
			this.value2 = '';
			this.value2fs = '';
			this.node_type = '';
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
			this.secondvalue = '*';
			this.currentPagefs = 1;
			this.currentPage = 1;
			if (val == '*' || val == '') {
				this.secondvalue = '';
				this.secondchan = [];
				this.chil_disable = true;
			} else {
				this.firstchan.forEach((item) => {
					if (item.value === val) {
						//筛选出匹配数据
						this.secondchan = item.secondchan;
						this.chil_disable = false;
					} else {
						// this.chil_disable = true;
					}
				});
			}
			this.ip_surve();
		},
		handleChangefirst_fs(val) {
			this.secondvalue_fs = '*';
			this.currentPagefs = 1;
			this.currentPage = 1;
			if (val == '*' || val == '') {
				this.secondvalue_fs = '';
				this.secondchan = [];
				this.chil_disable_fs = true;
			} else {
				this.firstchan.forEach((item) => {
					if (item.value === val) {
						//筛选出匹配数据
						this.secondchan = item.secondchan;
						this.chil_disable_fs = false;
					} else {
						// this.chil_disable_fs = true;
					}
				});
			}
			this.fs_curve();
		},
		//搜索
		onseach(stat) {
			this.currentPagefs = 1;
			this.currentPage = 1;
			if (stat === 'fs') {
				this.valuecfs = 5;
				if (this.value2fs) {
					this.starttime = setbatime(this.value2fs[0]);
					this.endtime = setbatime(this.value2fs[1]);
					if (this.endtime - this.starttime < 43200) {
						this.valuecfs = 5;
					} else {
						this.valuecfs = 1440;
					}
				}
				// else {
				// 	this.starttime =
				// 		new Date(new Date().toLocaleDateString()).getTime() /
				// 		1000;
				// 	this.endtime = Date.parse(new Date()) / 1000;
				// }

				this.fs_curve();
			} else {
				this.valuecfs = 5;
				if (this.value2) {
					this.starttime = setbatime(this.value2[0]);
					this.endtime = setbatime(this.value2[1]);
					if (this.endtime - this.starttime < 43200) {
						this.valuec = 5;
					} else {
						this.valuec = 1440;
					}
				}
				// else {
				// 	this.starttime =
				// 		new Date(new Date().toLocaleDateString()).getTime() /
				// 		1000;
				// 	this.endtime = Date.parse(new Date()) / 1000;
				// }

				this.ip_surve();
			}
		},
		seach_operce_fs(value) {
			this.currentPagefs = 1;
			this.currentPage = 1;
			this.valuebfs = '';
			if (this.valueafs[1]) {
				this.city_disable_fs = false;

				this.optionsbfs = this.citydata[value[1]].cities;
			} else {
				this.city_disable_fs = true;
			}
			this.onseach('fs');
		},
		seach_operce_ip(value) {
			this.currentPagefs = 1;
			this.currentPage = 1;
			this.valueb = '';
			if (this.valuea[1]) {
				this.city_disable_ip = false;
				this.optionsb = this.citydata[value[1]].cities;
			} else {
				this.city_disable_ip = true;
			}
			this.onseach();
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
			this.currentPagefs = 1;
			this.currentPage = 1;
			this.starttime =
				new Date(new Date().toLocaleDateString()).getTime() / 1000;
			this.endtime = Date.parse(new Date()) / 1000;
			if (mark == 'fs') {
				this.valuecfs = 5;
				this.fs_curve();
			} else {
				this.valuec = 5;
				this.ip_surve();
			}
		},
		//昨天
		set_yesterday(mark) {
			this.currentPagefs = 1;
			this.currentPage = 1;
			this.starttime =
				new Date(new Date().toLocaleDateString()).getTime() / 1000 -
				24 * 60 * 60;
			this.endtime =
				new Date(new Date().toLocaleDateString()).getTime() / 1000;
			if (mark == 'fs') {
				this.valuecfs = 5;
				this.fs_curve();
			} else {
				this.valuecfs = 5;
				this.ip_surve();
			}
		},
		//七天
		set_sevenday(mark) {
			this.currentPagefs = 1;
			this.currentPage = 1;
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
			this.currentPagefs = 1;
			this.currentPage = 1;
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
			this.currentPagefs = pages;
			this.get_fs_table();
		},
		//获取每页数量--ip
		gettolfs(pagetol) {
			this.fs_pagesize = pagetol;
			// this.get_fs_table();
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
				params.time_unit = 5;
			}
			params.start_ts = this.starttime;
			params.end_ts = this.endtime - 1;
			params.pageNo = this.currentPagefs - 1;
			params.pageSize = this.fs_pageSize;
			query_ip_store_avg_usage_table(params)
				.then((res) => {
					this.fs_tableData_upload = [];
					if (res.status == 0) {
						this.fs_tableData_upload = res.data.list;
						this.exportExcel(
							this.fs_tableData_upload,
							'节点利用率FS存储'
						);
						this.fan.fanactionlog('导出', '节点利用率FS存储', 1);
					} else {
						this.fan.fanactionlog('导出', '节点利用率FS存储', 0);
					}
				})
				.catch((error) => {
					this.fan.fanactionlog('导出', '节点利用率FS存储', 0);
				});
		},
		//导出--IP
		ip_upload() {
			// let params = new Object();
			// if (this.input !== '') {
			// 	params.ipfsId = this.input;
			// } else {
			// 	params.ipfsId = '*';
			// }
			// if (this.valuea[1]) {
			// 	params.region = this.valuea[1];
			// } else {
			// 	params.region = '*';
			// }
			// if (this.valueb !== '') {
			// 	params.city = this.valueb;
			// } else {
			// 	params.city = '*';
			// }
			// if (this.valuec !== '') {
			// 	params.time_unit = parseInt(this.valuec);
			// } else {
			// 	params.time_unit = 5;
			// }

			// params.start_ts = this.starttime;
			// params.end_ts = this.endtime-1;
			// params.pageNo = this.currentPage - 1;
			// params.pageSize = this.fs_pageSize;
			let params = new Object();
			if (this.input !== '') {
				params.ipfsId = this.input;
			} else {
				params.ipfsId = '*';
			}
			if (this.valuea[1]) {
				params.qu = this.valuea[0];
				params.region = this.valuea[1];
			} else {
				params.region = '*';
			}
			if (this.valueb !== '' && this.valueb !== '全部') {
				params.city = this.valueb;
			} else {
				params.city = '*';
			}

			if (this.firstvalue == '') {
				params.first_channel = '*';
			} else {
				params.first_channel = this.firstvalue;
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
			if (this.ispvalue == '') {
				params.isp = '*';
			} else {
				params.isp = this.ispvalue;
			}
			if (this.node_type) {
				if (this.node_type == '全部') {
					params.node_type = '*';
				} else {
					params.node_type = this.node_type;
				}
			} else {
				params.node_type = '*';
			}
			params.start_ts = this.starttime;
			params.end_ts = this.endtime - 1;
			if (params.end_ts - params.start_ts > 86399) {
				params.time_unit = 1440;
			} else {
				params.time_unit = 120;
			}
			params.radio = this.radio;
			params.activeName = this.activeName;
			export_ipfs_avg_usage_table_file(params)
				.then((res) => {
					this.ip_tableData_upload = [];
					if (res.status == 0) {
						// this.ip_tableData_upload = res.data.list;
						// this.exportExcel(
						// 	this.ip_tableData_upload,
						// 	'节点利用率IP流量'
						// );
						window.open(res.msg, '_blank');
						this.fan.fanactionlog('导出', '节点利用率IP流量', 1);
					} else {
						this.fan.fanactionlog('导出', '节点利用率IP流量', 0);
					}
				})
				.catch((error) => {
					this.fan.fanactionlog('导出', '节点利用率IP流量', 0);
				});
		},
		configure() {
			let _this = this;
			let myChart = echarts.init(document.getElementById('myChart3')); //这里是为了获得容器所在位置
			window.onresize = myChart.resize;
			let options = {
				// title: {
				// 	text: '节点利用率',
				// },
				legend: {
					bottom: '2%',
					data: ['流量利用率', '存储利用率', '平均利用率'],
				},
				xAxis: {
					type: 'category',
					splitLine: {
						show: false,
					},
					data: this.avgDataFlowUtily.timeArray.map(function(item) {
						return getday(item);
					}),
				},
				toolbox: {
					right: '10%',
					feature: {
						mydow: {
							show: _this.echartsexport,
							itemSize: 15,
							title: '导出',
							icon:
								'path://M1000.533333 250.453333c-14.933333-14.933333-35.413333-23.04-56.746666-23.04h-403.2l-52.48-110.506666c-8.533333-17.92-26.453333-29.44-46.506667-29.44H50.773333c-13.653333 0-26.453333 5.546667-35.84 14.933333-9.386667 9.813333-14.933333 22.613333-14.933333 35.84v724.48a80.213333 80.213333 0 0 0 79.786667 79.786667h865.28c20.906667 0 41.386667-8.533333 56.32-23.466667 14.08-14.933333 22.613333-35.413333 22.613333-56.32V307.2c0-21.333333-8.533333-41.813333-23.466667-56.746667z',
							onclick: function() {
								_this.ip_upload();
							},
						},
					},
				},
				tooltip: {
					trigger: 'axis',
					textStyle: {
						align: 'left',
					},
					axisPointer: {
						type: 'cross',
						crossStyle: {
							color: '#999',
						},
					},
					formatter: function(params) {
						var result = '';
						params.forEach(function(item, index) {
							if (index == 0) {
								result +=
									item.axisValue +
									'</br>' +
									item.marker +
									' ' +
									item.seriesName +
									' : ' +
									item.value +
									'%' +
									'</br>';
							} else {
								result +=
									item.marker +
									' ' +
									item.seriesName +
									' : ' +
									item.value +
									'%' +
									'</br>';
							}
						});
						return result;
					},
				},
				yAxis: [
					// type: 'value'
					{
						type: 'value',
						splitLine: {
							show: false, //去掉网格线
						},
						axisLabel: {
							show: true,
							interval: 'auto',
							formatter: '{value} %',
						},
						show: true,
					},
				],
				grid: {
					x: 70,
					y: 50,
					x2: 50,
					y2: 60,
					borderWidth: 10,
				},
				series: [
					{
						data: this.avgDataFlowUtily.avgFlowArray.map(function(
							item
						) {
							return (item * 100).toFixed(4);
						}),
						type: 'line',
						symbol: 'none',
						name: '流量利用率',
						smooth: true,
						itemStyle: {
							normal: {
								color: '#177DFF',
							},
						},
						areaStyle: {
							normal: {
								color: new echarts.graphic.LinearGradient(
									0,
									0,
									0,
									1,
									[
										{ offset: 0, color: '#177DFF55' },
										{ offset: 1, color: '#ffffff' },
									]
								),
							},
						},
					},
					{
						data: this.avgDataFlowUtily.avgStoreArray.map(function(
							item
						) {
							return (item * 100).toFixed(4);
						}),
						type: 'line',
						symbol: 'none',
						name: '存储利用率',
						smooth: true,
						itemStyle: {
							normal: {
								color: '#FDAF4B',
							},
						},
						areaStyle: {
							normal: {
								color: new echarts.graphic.LinearGradient(
									0,
									0,
									0,
									1,
									[
										{ offset: 0, color: '#FDAF4B55' },
										{ offset: 1, color: '#ffffff' },
									]
								),
							},
						},
					},
					{
						data: this.avgDataFlowUtily.avgArray.map(function(
							item
						) {
							return (item * 100).toFixed(4);
						}),
						type: 'line',
						symbol: 'none',
						name: '平均利用率',
						smooth: true,
						itemStyle: {
							normal: {
								color: '#F3545D',
							},
						},
						areaStyle: {
							normal: {
								color: new echarts.graphic.LinearGradient(
									0,
									0,
									0,
									1,
									[
										{ offset: 0, color: '#F3545D55' },
										{ offset: 1, color: '#ffffff' },
									]
								),
							},
						},
					},
				],
			};
			myChart.clear();
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
						axisLabel: {
							show: true,
							interval: 'auto',
							formatter: '{value} %',
						},
						show: true,
					},
				],
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						crossStyle: {
							color: '#999',
						},
					},
					formatter: function(params) {
						return params[0].name + '<br>' + params[0].data + '%';
					},
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
						// data: this.avgUsageArray,
						data: this.avgUsageArray.map(function(item) {
							return item * 100;
						}),
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
			};
			myChart.clear();
			myChart.setOption(options);
		},
		exportExcel(dataupload, excelname) {
			require.ensure([], () => {
				const {
					export_json_to_excel,
				} = require('../../excel/Export2Excel.js');

				// 上面设置Excel的表格第一行的标题
				if (excelname == '节点利用率IP流量') {
					var tHeader = [
						'节点ID',
						'使用IP流量',
						'IP流量利用率',
						'日期',
					];
					var filterVal = [
						'ipfsId',
						'totalOutput',
						'percent',
						'timeStamp',
					];
				} else {
					var tHeader = [
						'节点ID',
						'使用存储空间',
						'FS存储利用率',
						'日期',
					];
					var filterVal = [
						'ipfsId',
						'storeUsage',
						'storeUsagePercent',
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
				item.timeStamp = getymdtime(item.timeStamp);
				if (item.totalOutput) {
					item.totalOutput = zhuanbkbs(item.totalOutput);
					item.percent = item.percent * 100 + '%';
					return item;
				}
				if (item.storeUsage) {
					item.storeUsage = zhuanbkbs(item.storeUsage);
					item.storeUsagePercent = item.storeUsagePercent * 100 + '%';
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
			let str = time + '';
			let y = str.slice(0, 4);
			let m = str.slice(4, 6);
			let d = str.slice(6, 9);
			return y + '-' + m + '-' + d;
			// return getymdtime(time);
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
	destroyed: function() {
		sessionStorage.removeItem('search_condition');
	},
};
</script>

<style lang="scss" scoped>
.myself-container {
	// overflow: hidden;
	background: #f6f6f6;
	.overview {
		.user-item {
			background-color: #fff;
			.item-count {
				font-size: 24px;
			}
			.item-text {
				height: 18px;
				line-height: 36px;
				font-size: 14px;
			}
		}
	}
	.device_form {
		height: auto;
		overflow: hidden;
		margin: 0 30px;
		background: #ffffff;
		// padding: 15px 30px;
		box-sizing: border-box;
		position: relative;
		border-radius: 8px;
		box-shadow: 0px 4px 10px 0px rgba(51, 51, 51, 0.04);
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
		background: #ffffff;
		height: auto;
		overflow: hidden;
		margin: 24px 30px;
		border-radius: 8px;
		box-sizing: border-box;
		padding: 24px;
		box-shadow: 0px 4px 10px 0px rgba(51, 51, 51, 0.04);
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
