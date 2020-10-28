<template>
	<div class="content data_monitoring" ref="luckDraw">
		<div
			class="rowbg"
			v-bind:class="activeName == 'third' ? 'two_rowbg' : 'rowbg'"
		>
			<el-row style="height:52px;">
				<el-radio-group
					v-model="searchdata.tabname"
					@change="change_tab"
					size="small"
				>
					<el-radio-button label="first">带宽</el-radio-button>
					<el-radio-button label="second">存储空间</el-radio-button>
					<el-radio-button label="third">节点质量</el-radio-button>
				</el-radio-group>
				<el-row
					v-show="activeName == 'third'"
					style="margin-left:20px;height:52px;"
				>
					<el-col :span="18">
						<el-select
							size="small"
							@change="set_defaults()"
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
			</el-row>
			<el-row
				type="flex"
				:gutter="10"
				v-show="activeName == 'third'"
				style="height:52px;"
			>
				<el-col :span="4"
					><el-input
						size="small"
						v-model="searchdata.input"
						placeholder="请输入节点ID"
						prefix-icon="el-icon-search"
						@keyup.enter.native="set_time()"
					>
						<!-- <i
								slot="suffix"
								class="el-input__icon el-icon-search"
								@click="set_time"
							></i> -->
					</el-input></el-col
				>
				<el-col :span="2">
					<el-select
						v-model="node_type"
						placeholder="请选择节点类型"
						@change="set_time()"
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
				</el-col>
				<el-col :span="2"
					><el-select
						size="small"
						v-model="searchdata.region1"
						placeholder="节点一级渠道"
						@change="handleChangefirst($event)"
                        style="width:100%;max-width: 200px;margin-left:10px;"
					>
						<el-option label="全部" value="*"></el-option>
						<el-option
							v-for="(item, index) in firstchan"
							:key="item.name + index"
							:label="item.name"
							:value="item.value"
						></el-option> </el-select
				></el-col>
				<el-col :span="2"
					><el-select
						size="small"
						v-model="searchdata.region2"
						placeholder="节点二级渠道"
						:disabled="chil_disable"
                        style="width:100%;max-width: 200px;margin-left:10px;"
						@change="set_time()"
					>
						<el-option label="全部" value="*"></el-option>
						<el-option
							v-for="(item, index) in secondchan"
							:key="item.value + index"
							:label="item.name"
							:value="item.value"
						></el-option></el-select
				></el-col>
			</el-row>

			<el-row type="flex" :gutter="10" style="height:52px;">
				<el-col :span="4" v-show="activeName != 'third'"
					><el-input
						size="small"
						v-model="searchdata.input"
						placeholder="请输入节点ID"
						prefix-icon="el-icon-search"
						@keyup.enter.native="set_time()"
					>
						<!-- <i
								slot="suffix"
								class="el-input__icon el-icon-search"
								@click="set_time"
							></i> -->
					</el-input></el-col
				>
                <el-col :span="2" v-show="activeName != 'third'">
					<el-select
						v-model="node_type"
						placeholder="请选择节点类型"
						@change="set_time()"
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
				</el-col>
				<el-col :span="2" v-show="activeName != 'third'"
					><el-select
						size="small"
						v-model="searchdata.region1"
						placeholder="节点一级渠道"
						@change="handleChangefirst($event)"
					>
						<el-option label="全部" value="*"></el-option>
						<el-option
							v-for="(item, index) in firstchan"
							:key="item.name + index"
							:label="item.name"
							:value="item.value"
						></el-option> </el-select
				></el-col>
				<el-col :span="2" v-show="activeName != 'third'"
					><el-select
						size="small"
						v-model="searchdata.region2"
						placeholder="节点二级渠道"
						:disabled="chil_disable"
						@change="set_time()"
					>
						<el-option label="全部" value="*"></el-option>
						<el-option
							v-for="(item, index) in secondchan"
							:key="item.value + index"
							:label="item.name"
							:value="item.value"
						></el-option></el-select
				></el-col>

				<el-col :span="2"
					><el-select
						size="small"
						v-model="searchdata.region3"
						placeholder="设备类型"
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
						placeholder="硬件类型"
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
						placeholder="操作系统"
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
				<el-col :span="2">
					<el-cascader
						size="small"
						placeholder="请选择区域"
						v-model="searchdata.region4"
						:options="citylist"
						@change="provinceChange"
					></el-cascader>
				</el-col>
				<el-col :span="2">
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
							:value="item.name"
						></el-option>
					</el-select>
				</el-col>

				<el-col :span="2"
					><el-select
						size="small"
						v-model="searchdata.region6"
						placeholder="网络线路"
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
				<el-radio-group
					v-model="searchdata_radio"
					@change="set_time"
					size="small"
                    style="display: flex;flex-wrap: nowrap;"
				>
					<el-radio-button label="1" v-show="show_time_btn"
						>今天</el-radio-button
					>
					<el-radio-button label="2">昨天</el-radio-button>
					<el-radio-button label="3">近7天</el-radio-button>
					<el-radio-button label="4">近30天</el-radio-button>
					<el-radio-button label="5">自定义</el-radio-button>
				</el-radio-group>
				<div class="dateRange">
					<el-date-picker
						size="small"
						style="margin-left: 10px;"
						v-show="show_time"
						v-model="searchdata.value1"
						type="daterange"
						range-separator="至"
						start-placeholder="开始日期"
						end-placeholder="结束日期"
						@change="set_time"
					>
					</el-date-picker>
				</div>
			</el-row>
		</div>
		<div style="height:100%">
			<el-tabs
				class="data_monit"
				v-model="activeName"
				@tab-click="handleClick"
			>
				<el-tab-pane label="带宽" name="first">
					<el-row
						type="flex"
						style="border-radius: 8px;margin:24px 30px;box-shadow: 0px 4px 10px 0px rgba(51, 51, 51, 0.04);"
					>
						<el-col class="top_title bandwidth_top">
							<p>节点带宽峰值（上/下行）</p>
							<div style="display: flex;">
								<div class="top_title_left">
									<img
										src="../../assets/img/shang.png"
										alt=""
									/>
									{{ upbandwidth | bandwith_unit }}
								</div>
								<div class="top_title_right">
									<img
										src="../../assets/img/xia.png"
										alt=""
									/>
									{{ downbandwidth | bandwith_unit }}
								</div>
							</div>
						</el-col>
						<el-col class="top_title">
							<p>节点带宽平均值（上/下行）</p>
							<div style="display: flex;">
								<div class="top_title_left">
									<img
										src="../../assets/img/shang.png"
										alt=""
									/>
									{{ averageup | bandwith_unit }}
								</div>
								<div class="top_title_right">
									<img
										src="../../assets/img/xia.png"
										alt=""
									/>
									{{ averagedown | bandwith_unit }}
								</div>
							</div>
						</el-col>
					</el-row>
					<div
						style="box-sizing: border-box;margin: 0 30px;background: #ffffff;padding: 24px;border-radius: 8px;box-shadow: 0px 4px 10px 0px rgba(51, 51, 51, 0.04);"
					>
						<div
							style="text-align:left;width: 80%;margin-bottom: 40px;"
							class="data_mon_radio"
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

						<div
							id="firstChart"
							:style="{
								height: first_scrollerHeight,
								width: '100%',
							}"
						></div>
					</div>
				</el-tab-pane>
				<el-tab-pane label="存储空间" name="second">
					<el-row
						v-show="titleOverview"
						type="flex"
						style="border-radius: 8px;margin:24px 30px 0px 30px;box-shadow: 0px 4px 10px 0px rgba(51, 51, 51, 0.04);"
					>
						<el-col class="top_title second_top second_top_border">
							<div>
								<img src="../../assets/img/bing.png" alt="" />
							</div>
							<div style="margin-left:20px;">
								<p>节点可用存储空间</p>
								<p>
									{{ availablecap | formatBytes }}
								</p>
							</div>
						</el-col>
						<el-col class="top_title second_top">
							<div>
								<img src="../../assets/img/chucun.png" alt="" />
							</div>
							<div style="margin-left:20px;">
								<p>节点总存储空间</p>
								<p>
									{{ totalcap | formatBytes }}
								</p>
							</div>
						</el-col>
					</el-row>
					<div
						style="box-sizing: border-box;margin: 24px 30px;background: #ffffff;padding: 24px;border-radius: 8px;box-shadow: 0px 4px 10px 0px rgba(51, 51, 51, 0.04);"
					>
						<div
							id="secondChart"
							:style="{
								height: second_scrollerHeight,
								width: '100%',
							}"
						></div>
					</div>
				</el-tab-pane>
				<el-tab-pane label="节点质量" name="third">
					<el-row
						type="flex"
						style="border-radius: 8px;margin:24px 30px;box-shadow: 0px 4px 10px 0px rgba(51, 51, 51, 0.04);"
					>
						<el-col class="top_title third_top">
							<p>平均值</p>
							<p>{{ average_value }}</p>
						</el-col>
						<el-col class="top_title third_top">
							<p>最大值</p>
							<p>{{ max_value }}</p>
						</el-col>
						<el-col class="top_title">
							<p>最小值</p>
							<p>{{ min_value }}</p>
						</el-col>
					</el-row>
					<div
						style="box-sizing: border-box;margin: 24px 30px;background: #ffffff;padding: 24px;border-radius: 8px;box-shadow: 0px 4px 10px 0px rgba(51, 51, 51, 0.04);"
						v-show="searchdata.echartslist == 1"
					>
						<div
							id="ping_ms"
							:style="{
								height: shere_scrollerHeight,
								width: '100%',
							}"
						></div>
					</div>
					<div
						style="box-sizing: border-box;margin: 24px 30px;background: #ffffff;padding: 24px;border-radius: 8px;box-shadow: 0px 4px 10px 0px rgba(51, 51, 51, 0.04);"
						v-show="searchdata.echartslist == 2"
					>
						<div
							id="tid"
							:style="{
								height: shere_scrollerHeight,
								width: '100%',
							}"
						></div>
					</div>
					<div
						style="box-sizing: border-box;margin: 24px 30px;background: #ffffff;padding: 24px;border-radius: 8px;box-shadow: 0px 4px 10px 0px rgba(51, 51, 51, 0.04);"
						v-show="searchdata.echartslist == 3"
					>
						<div
							id="etf"
							:style="{
								height: shere_scrollerHeight,
								width: '100%',
							}"
						></div>
					</div>
					<div
						style="box-sizing: border-box;margin: 24px 30px;background: #ffffff;padding: 24px;border-radius: 8px;box-shadow: 0px 4px 10px 0px rgba(51, 51, 51, 0.04);"
						v-show="searchdata.echartslist == 4"
					>
						<div
							id="lt"
							:style="{
								height: shere_scrollerHeight,
								width: '100%',
							}"
						></div>
					</div>
					<div
						style="box-sizing: border-box;margin: 24px 30px;background: #ffffff;padding: 24px;border-radius: 8px;box-shadow: 0px 4px 10px 0px rgba(51, 51, 51, 0.04);"
						v-show="searchdata.echartslist == 5"
					>
						<div
							id="itf"
							:style="{
								height: shere_scrollerHeight,
								width: '100%',
							}"
						></div>
					</div>
					<div
						style="box-sizing: border-box;margin: 24px 30px;background: #ffffff;padding: 24px;border-radius: 8px;box-shadow: 0px 4px 10px 0px rgba(51, 51, 51, 0.04);"
						v-show="searchdata.echartslist == 6"
					>
						<div
							id="otf"
							:style="{
								height: shere_scrollerHeight,
								width: '100%',
							}"
						></div>
					</div>
					<div
						style="box-sizing: border-box;margin: 24px 30px;background: #ffffff;padding: 24px;border-radius: 8px;box-shadow: 0px 4px 10px 0px rgba(51, 51, 51, 0.04);"
						v-show="searchdata.echartslist == 7"
					>
						<div
							id="rcnt"
							:style="{
								height: shere_scrollerHeight,
								width: '100%',
							}"
						></div>
					</div>
					<div
						style="box-sizing: border-box;margin: 24px 30px;background: #ffffff;padding: 24px;border-radius: 8px;box-shadow: 0px 4px 10px 0px rgba(51, 51, 51, 0.04);"
						v-show="searchdata.echartslist == 8"
					>
						<div
							id="cpu"
							:style="{
								height: shere_scrollerHeight,
								width: '100%',
							}"
						></div>
					</div>
					<div
						style="box-sizing: border-box;margin: 24px 30px;background: #ffffff;padding: 24px;border-radius: 8px;box-shadow: 0px 4px 10px 0px rgba(51, 51, 51, 0.04);"
						v-show="searchdata.echartslist == 9"
					>
						<div
							id="ram"
							:style="{
								height: shere_scrollerHeight,
								width: '100%',
							}"
						></div>
					</div>
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
	export_ipfs_monit_bandwidth_table_file,
	export_ipfs_monit_storage_table_file,
	export_ipfs_monit_ping_ms_table_file,
	export_ipfs_monit_tid_table_file,
	export_ipfs_monit_etf_table_file,
	export_ipfs_monit_lt_table_file,
	export_ipfs_monit_itf_table_file,
	export_ipfs_monit_otf_table_file,
	export_ipfs_monit_rcnt_table_file,
	export_ipfs_monit_cpu_table_file,
	export_ipfs_monit_memory_table_file,
} from '@/servers/api';
import {
	getday,
	setbatime,
	get_units,
	formatBkb,
	menudisable,
	formatterDate,
	bandwidth_unit_conversion,
	bandwidth_unit,
	zhuanbkbs,
} from '../../servers/sevdate';
import echarts from 'echarts';
export default {
	data() {
		return {
			titleOverview: true,
			activeName: 'first',
			radio1: '1',
			_width: '',
			downbandwidth_unit: 'Kbps',
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
			searchdata_radio: 1,
			searchdata: {
				tabname: 'first',
				echartslist: '1',
				input: '',
				region1: '', //一级渠道商
				region2: '', //二级渠道商
				region3: '', //设备类型
				region4: '', //区域
				region5: '', //城市
				region6: '', //运营商
				region7: '', //硬件类型
				region8: '', //操作系统
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
					value: '*',
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
			echartsexport: true,
			obnj: {},
			show_time_btn: true,
			first_scrollerHeight: 0,
			second_scrollerHeight: 0,
			shere_scrollerHeight: 0,
		};
	},
	mounted() {
		this.$nextTick(() => {
			let top_title_h = document.getElementsByClassName('rowbg')[0]
				.offsetHeight;

			let con_he = document.getElementsByClassName('content-container')[0]
				.offsetHeight;
			this.first_scrollerHeight = con_he - top_title_h - 328 + 'px';
			this.second_scrollerHeight = con_he - top_title_h - 260 + 'px';
		});
		this.getJson();
		this.get_search_data();
		if (sessionStorage.getItem('search_condition')) {
			let search_data = JSON.parse(
				sessionStorage.getItem('search_condition')
			);
			let city_list = JSON.parse(sessionStorage.getItem('citylist'));
			this.searchdata.tabname = search_data.tabname;
			this.searchdata_radio = search_data.radio;
			if (search_data.echartslist) {
				this.searchdata.echartslist = search_data.echartslist;
			}
			if (this.searchdata_radio == 5) {
				let arr = [];
				arr[0] = formatterDate(search_data.start_ts * 1000);
				arr[1] = formatterDate(search_data.end_ts * 1000);
				this.searchdata.value1 = arr;
			}
			if (search_data.region == '*') {
				this.searchdata.region4 = '';
				this.city_disable = true;
				this.searchdata.region5 = '';
			} else {
				this.searchdata.region4 = [search_data.qu, search_data.region];
				this.city_disable = false;
				this.options_city =
					city_list[this.searchdata.region4[1]].cities;

				this.searchdata.region5 =
					search_data.city == '*' ? -1 : search_data.city;
			}
			this.searchdata.region1 =
				search_data.firstChannel == '*' ? '' : search_data.firstChannel;
			this.searchdata.region2 =
				search_data.secondChannel == '*'
					? ''
					: search_data.secondChannel;
			this.searchdata.region3 =
				search_data.deviceType == '*' ? '' : search_data.deviceType;
			this.searchdata.region6 =
				search_data.isp == '*' ? '' : search_data.isp;
			this.searchdata.input =
				search_data.nodeId == '*' ? '' : search_data.nodeId;
			this.set_time();
		} else {
			this.starttime =
				new Date(new Date().toLocaleDateString()).getTime() / 1000 -
				365 * 60 * 60 * 24;
			this.endtime = Date.parse(new Date()) / 1000;
			this._width = this.$refs.luckDraw.offsetWidth - 60;
			this.set_time();
		}
		let munulist = JSON.parse(localStorage.getItem('menus'));
		let pathname = this.$route.path;
		this.obnj = menudisable(munulist, pathname);
		if (this.obnj.roleE == 1) {
			this.echartsexport = true;
		} else {
			this.echartsexport = false;
		}
	},
	filters: {
		formatBytes(a, b) {
			if (0 == a) return '0 B';
			var c = 1024,
				d = b || 2,
				e = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
				f = Math.floor(Math.log(a) / Math.log(c));
			return parseFloat((a / Math.pow(c, f)).toFixed(d)) + ' ' + e[f];
		},
		bandwith_unit(data) {
			if (data <= 0) {
				return 0 + 'bps';
			} else {
				return (
					bandwidth_unit_conversion(data)[0] +
					bandwidth_unit_conversion(data)[1]
				);
			}
		},
		unit_with(data, unit) {
			return bandwidth_unit(data, unit);
		},
	},
	methods: {
		getJson() {
			axios.get('./static/pro_city.json').then((res) => {
				this.citydata = res.data;
				sessionStorage.setItem('citylist', JSON.stringify(res.data));
			});
		},
		provinceChange(value) {
			if (value[0] == '*') {
				this.value1 = -1;
				this.city_disable = true;
				this.searchdata.region5 = '';
				this.set_time();
			} else {
				this.options_city = this.citydata[value[1]].cities;
				this.city_disable = false;
				this.searchdata.region5 = '全部';
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
				.catch((error) => {});
		},
		//请求带宽数据
		get_nodetype(num) {
			this.upBandwidthMap = [];
			this.downBandwidthMap = [];
			let params = new Object();
			if (this.searchdata.region1) {
				params.firstChannel = this.searchdata.region1;
			} else {
				params.firstChannel = '*';
			}
			params.first_channel = params.firstChannel;
			if (this.searchdata.region2) {
				params.secondChannel = this.searchdata.region2;
			} else {
				params.secondChannel = '*';
			}
			params.second_channel = params.secondChannel;
			if (this.searchdata.region3) {
				params.deviceType = this.searchdata.region3;
			} else {
				params.deviceType = '*';
			}
			params.device_type = params.deviceType;
			if (this.searchdata.region6) {
				params.isp = this.searchdata.region6;
			} else {
				params.isp = '*';
			}
			if (this.searchdata.input) {
				params.nodeId = this.searchdata.input;
			} else {
				params.nodeId = '*';
			}
			params.ipfsId = params.nodeId;
			if (
				this.searchdata.region4 == '*' ||
				this.searchdata.region4 == ''
			) {
				params.region = '*';
			} else {
				params.qu = this.searchdata.region4[0];
				params.region = this.searchdata.region4[1];
			}
			if (
				this.searchdata.region5 == '全部' ||
				this.searchdata.region5 == ''
			) {
				params.city = '*';
			} else {
				params.city = this.searchdata.region5;
			}
			params.start_ts = this.starttime;
			params.end_ts = this.endtime - 1;
			if (params.end_ts - params.start_ts > 86399) {
				params.timeUnit = 1440;
			} else {
				params.timeUnit = 60;
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
			params.time_unit = params.timeUnit;
			params.tabname = this.searchdata.tabname;
			params.radio = this.searchdata_radio;
			sessionStorage.setItem('search_condition', JSON.stringify(params));
			ipfs_monit_bandwidth(params)
				.then((res) => {
					this.upbandwidth = 0;
					this.averageup = 0;
					this.averagedown = 0;
					this.downbandwidth = 0;
					if (res.status == 0) {
						res.data.timeArray.forEach((item, index) => {
							let obj = {};
							let obe = {};
							if (params.timeUnit == 60) {
								obj.name = getday(item, 'hms');
								obe.name = getday(item, 'hms');
							} else {
								obj.name = getday(item);
								obe.name = getday(item);
							}
							obj.avg_item = res.data.upWidthTopArray[index];
							obe.avg_item = res.data.downWidthTopArray[index];
							obj.value = res.data.upWidthArray[index];
							obe.value = res.data.downWidthArray[index];
							this.upBandwidthMap.push(obj);
							this.downBandwidthMap.push(obe);
						});
						let max_data = this.getMaximin(
							res.data.upWidthTopArray,
							'max'
						);

						this.downbandwidth_unit = bandwidth_unit_conversion(
							max_data
						)[1];
						this.upbandwidth = res.data.upWidthMax;
						this.downbandwidth = res.data.downWidthMax;
						this.averageup = res.data.avgUp;
						this.averagedown = res.data.avgDown;
					} else {
						this.$message.error(res.errMsg);
					}
					this.$nextTick(this.firstsharts(this.upBandwidthMap));
				})
				.catch((error) => {});
		},
		//请求存储空间数据
		get_monit() {
			this.dataStore = [];
			let params = new Object();
			if (this.searchdata.region1) {
				params.firstChannel = this.searchdata.region1;
			} else {
				params.firstChannel = '*';
			}
			params.first_channel = params.firstChannel;
			if (this.searchdata.region2) {
				params.secondChannel = this.searchdata.region2;
			} else {
				params.secondChannel = '*';
			}
			params.second_channel = params.secondChannel;
			if (this.searchdata.region3) {
				params.deviceType = this.searchdata.region3;
			} else {
				params.deviceType = '*';
			}
			params.device_type = params.deviceType;
			if (this.searchdata.region6) {
				params.isp = this.searchdata.region6;
			} else {
				params.isp = '*';
			}
			if (this.searchdata.input) {
				params.nodeId = this.searchdata.input;
			} else {
				params.nodeId = '*';
			}
			params.ipfsId = params.nodeId;
			if (
				this.searchdata.region4 == '*' ||
				this.searchdata.region4 == ''
			) {
				params.region = '*';
			} else {
				params.qu = this.searchdata.region4[0];
				params.region = this.searchdata.region4[1];
			}
			if (
				this.searchdata.region5 == '全部' ||
				this.searchdata.region5 == ''
			) {
				params.city = '*';
			} else {
				params.city = this.searchdata.region5;
			}
			params.end_ts = this.endtime - 1;
			params.start_ts = this.starttime;
			if (params.end_ts - params.start_ts > 86399) {
				params.timeUnit = 1440;
				this.titleOverview = false;
			} else {
				params.timeUnit = 60;
				this.titleOverview = true;
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
			params.time_unit = params.timeUnit;
			params.tabname = this.searchdata.tabname;
			params.radio = this.searchdata_radio;
			sessionStorage.setItem('search_condition', JSON.stringify(params));
			ipfs_monit_storage(params)
				.then((res) => {
					this.availablecap = 0;
					this.totalcap = 0;
					let kunits = 'b';
					if (res.status == 0) {
						res.data.timeArray.forEach((item, index) => {
							let obj = {};
							if (params.timeUnit == 60) {
								obj.name = getday(item, 'hms');
							} else {
								obj.name = getday(item);
							}
							obj.value = res.data.diskRomArray[index];
							this.dataStore.push(obj);
						});
						this.availablecap = res.data.totalDiskRom;
						this.totalcap = res.data.sumDiskRom;
						let max_data = this.getMaximin(
							res.data.diskRomArray,
							'max'
						);
						kunits = get_units(max_data);
					} else {
						this.$message.error(res.errMsg);
					}
					this.$nextTick(this.secondsharts(this.dataStore, kunits));
				})
				.catch((error) => {});
		},
		//请求节点质量--ms
		get_pingms() {
			this.mslist = [];
			this.max_value = 0;
			this.min_value = 0;
			this.average_value = 0;
			let params = new Object();
			if (this.searchdata.region1) {
				params.firstChannel = this.searchdata.region1;
			} else {
				params.firstChannel = '*';
			}
			params.first_channel = params.firstChannel;
			if (this.searchdata.region2) {
				params.secondChannel = this.searchdata.region2;
			} else {
				params.secondChannel = '*';
			}
			params.second_channel = params.secondChannel;
			if (this.searchdata.region3) {
				params.deviceType = this.searchdata.region3;
			} else {
				params.deviceType = '*';
			}
			params.device_type = params.deviceType;
			if (this.searchdata.region6) {
				params.isp = this.searchdata.region6;
			} else {
				params.isp = '*';
			}
			if (this.searchdata.region7) {
				params.cpuType = this.searchdata.region7;
			} else {
				params.cpuType = '*';
			}

			if (this.searchdata.input) {
				params.nodeId = this.searchdata.input;
			} else {
				params.nodeId = '*';
			}
			params.ipfsId = params.nodeId;
			if (this.searchdata.region8) {
				params.osType = this.searchdata.region8;
			} else {
				params.osType = '*';
			}
			if (
				this.searchdata.region4 == '*' ||
				this.searchdata.region4 == ''
			) {
				params.region = '*';
			} else {
				params.qu = this.searchdata.region4[0];
				params.region = this.searchdata.region4[1];
			}
			if (
				this.searchdata.region5 == '全部' ||
				this.searchdata.region5 == ''
			) {
				params.city = '*';
			} else {
				params.city = this.searchdata.region5;
			}
			params.start_ts = this.starttime;
			params.end_ts = this.endtime - 1;
			if (params.end_ts - params.start_ts > 86399) {
				params.timeUnit = 1440;
			} else {
				params.timeUnit = 60;
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
			params.time_unit = params.timeUnit;
			params.tabname = this.searchdata.tabname;
			params.radio = this.searchdata_radio;
			params.echartslist = this.searchdata.echartslist;
			sessionStorage.setItem('search_condition', JSON.stringify(params));
			ipfs_monit_ping_ms(params)
				.then((res) => {
					if (res.status == 0) {
						res.data.timeArray.forEach((item, index) => {
							let obj = {};
							if (params.timeUnit == 60) {
								obj.name = getday(item, 'hms');
							} else {
								obj.name = getday(item);
							}
							obj.value = res.data.pingMsArray[index].toFixed(6);
							this.mslist.push(obj);
						});
						this.max_value = res.data.pingMsMax.toFixed(6) + 'ms';
						this.min_value = res.data.pingMsMin.toFixed(6) + 'ms';
						this.average_value =
							res.data.avgPingMs.toFixed(6) + 'ms';
					} else {
						this.$message.error(res.errMsg);
					}
					this.$nextTick(
						this.lastsharts('ping_ms', 'PING_MS', this.mslist)
					);
				})
				.catch((error) => {});
		},
		//请求节点质量--响应时差
		get_tid() {
			this.tidlist = [];
			this.max_value = 0;
			this.min_value = 0;
			this.average_value = 0;
			let params = new Object();
			if (this.searchdata.region1) {
				params.firstChannel = this.searchdata.region1;
			} else {
				params.firstChannel = '*';
			}
			params.first_channel = params.firstChannel;
			if (this.searchdata.region2) {
				params.secondChannel = this.searchdata.region2;
			} else {
				params.secondChannel = '*';
			}
			params.second_channel = params.secondChannel;
			if (this.searchdata.region3) {
				params.deviceType = this.searchdata.region3;
			} else {
				params.deviceType = '*';
			}
			params.device_type = params.deviceType;
			if (this.searchdata.region6) {
				params.isp = this.searchdata.region6;
			} else {
				params.isp = '*';
			}
			if (this.searchdata.region7) {
				params.cpuType = this.searchdata.region7;
			} else {
				params.cpuType = '*';
			}
			if (this.searchdata.input) {
				params.nodeId = this.searchdata.input;
			} else {
				params.nodeId = '*';
			}
			params.ipfsId = params.nodeId;
			if (this.searchdata.region8) {
				params.osType = this.searchdata.region8;
			} else {
				params.osType = '*';
			}
			if (
				this.searchdata.region4 == '*' ||
				this.searchdata.region4 == ''
			) {
				params.region = '*';
			} else {
				params.qu = this.searchdata.region4[0];
				params.region = this.searchdata.region4[1];
			}
			if (
				this.searchdata.region5 == '全部' ||
				this.searchdata.region5 == ''
			) {
				params.city = '*';
			} else {
				params.city = this.searchdata.region5;
			}
			params.start_ts = this.starttime;
			params.end_ts = this.endtime - 1;
			if (params.end_ts - params.start_ts > 86399) {
				params.timeUnit = 1440;
			} else {
				params.timeUnit = 60;
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
			params.time_unit = params.timeUnit;
			params.tabname = this.searchdata.tabname;
			params.radio = this.searchdata_radio;
			params.echartslist = this.searchdata.echartslist;
			sessionStorage.setItem('search_condition', JSON.stringify(params));
			ipfs_monit_tid(params)
				.then((res) => {
					if (res.status == 0) {
						res.data.timeArray.forEach((item, index) => {
							let obj = {};
							if (params.timeUnit == 60) {
								obj.name = getday(item, 'hms');
							} else {
								obj.name = getday(item);
							}
							obj.value = res.data.tidArray[index].toFixed(4);
							this.tidlist.push(obj);
						});
						this.max_value = res.data.tidMax.toFixed(4) + 'ms';
						this.min_value = res.data.tidMin.toFixed(4) + 'ms';
						this.average_value = res.data.tidAvg.toFixed(4) + 'ms';
					} else {
						this.$message.error(res.errMsg);
					}
					this.$nextTick(this.lastsharts('tid', 'TID', this.tidlist));
				})
				.catch((error) => {});
		},
		//请求节点质量--错误率
		get_etf() {
			this.etflist = [];
			this.max_value = 0;
			this.min_value = 0;
			this.average_value = 0;
			let params = new Object();
			if (this.searchdata.region1) {
				params.firstChannel = this.searchdata.region1;
			} else {
				params.firstChannel = '*';
			}
			params.first_channel = params.firstChannel;
			if (this.searchdata.region2) {
				params.secondChannel = this.searchdata.region2;
			} else {
				params.secondChannel = '*';
			}
			params.second_channel = params.secondChannel;
			if (this.searchdata.region3) {
				params.deviceType = this.searchdata.region3;
			} else {
				params.deviceType = '*';
			}
			params.device_type = params.deviceType;
			if (this.searchdata.region6) {
				params.isp = this.searchdata.region6;
			} else {
				params.isp = '*';
			}
			if (this.searchdata.region7) {
				params.cpuType = this.searchdata.region7;
			} else {
				params.cpuType = '*';
			}
			if (this.searchdata.input) {
				params.nodeId = this.searchdata.input;
			} else {
				params.nodeId = '*';
			}
			params.ipfsId = params.nodeId;
			if (this.searchdata.region8) {
				params.osType = this.searchdata.region8;
			} else {
				params.osType = '*';
			}
			if (
				this.searchdata.region4 == '*' ||
				this.searchdata.region4 == ''
			) {
				params.region = '*';
			} else {
				params.qu = this.searchdata.region4[0];
				params.region = this.searchdata.region4[1];
			}
			if (
				this.searchdata.region5 == '全部' ||
				this.searchdata.region5 == ''
			) {
				params.city = '*';
			} else {
				params.city = this.searchdata.region5;
			}
			params.start_ts = this.starttime;
			params.end_ts = this.endtime - 1;
			if (params.end_ts - params.start_ts > 86399) {
				params.timeUnit = 1440;
			} else {
				params.timeUnit = 60;
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
			params.time_unit = params.timeUnit;
			params.tabname = this.searchdata.tabname;
			params.radio = this.searchdata_radio;
			params.echartslist = this.searchdata.echartslist;
			sessionStorage.setItem('search_condition', JSON.stringify(params));
			ipfs_monit_etf(params)
				.then((res) => {
					if (res.status == 0) {
						res.data.timeArray.forEach((item, index) => {
							let obj = {};
							if (params.timeUnit == 60) {
								obj.name = getday(item, 'hms');
							} else {
								obj.name = getday(item);
							}
							obj.value = (
								res.data.etfArray[index] * 100
							).toFixed(4);
							this.etflist.push(obj);
						});
						this.max_value =
							(res.data.etfMax * 100).toFixed(4) + '%';
						this.min_value =
							(res.data.etfMin * 100).toFixed(4) + '%';
						this.average_value =
							(res.data.etfAvg * 100).toFixed(4) + '%';
					} else {
						this.$message.error(res.errMsg);
					}
					this.$nextTick(
						this.tiredsharts('etf', 'ETF（错误率）', this.etflist)
					);
				})
				.catch((error) => {});
		},
		//请求节点质量--失联计数
		get_lt() {
			this.ltlist = [];
			this.max_value = 0;
			this.min_value = 0;
			this.average_value = 0;
			let params = new Object();
			if (this.searchdata.region1) {
				params.firstChannel = this.searchdata.region1;
			} else {
				params.firstChannel = '*';
			}
			params.first_channel = params.firstChannel;
			if (this.searchdata.region2) {
				params.secondChannel = this.searchdata.region2;
			} else {
				params.secondChannel = '*';
			}
			params.second_channel = params.secondChannel;
			if (this.searchdata.region3) {
				params.deviceType = this.searchdata.region3;
			} else {
				params.deviceType = '*';
			}
			params.device_type = params.deviceType;
			if (this.searchdata.region6) {
				params.isp = this.searchdata.region6;
			} else {
				params.isp = '*';
			}
			if (this.searchdata.region7) {
				params.cpuType = this.searchdata.region7;
			} else {
				params.cpuType = '*';
			}
			if (this.searchdata.input) {
				params.nodeId = this.searchdata.input;
			} else {
				params.nodeId = '*';
			}
			params.ipfsId = params.nodeId;
			if (this.searchdata.region8) {
				params.osType = this.searchdata.region8;
			} else {
				params.osType = '*';
			}
			if (
				this.searchdata.region4 == '*' ||
				this.searchdata.region4 == ''
			) {
				params.region = '*';
			} else {
				params.qu = this.searchdata.region4[0];
				params.region = this.searchdata.region4[1];
			}
			if (
				this.searchdata.region5 == '全部' ||
				this.searchdata.region5 == ''
			) {
				params.city = '*';
			} else {
				params.city = this.searchdata.region5;
			}
			params.start_ts = this.starttime;
			params.end_ts = this.endtime - 1;
			if (params.end_ts - params.start_ts > 86399) {
				params.timeUnit = 1440;
			} else {
				params.timeUnit = 60;
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
			params.time_unit = params.timeUnit;
			params.tabname = this.searchdata.tabname;
			params.radio = this.searchdata_radio;
			params.echartslist = this.searchdata.echartslist;
			sessionStorage.setItem('search_condition', JSON.stringify(params));
			ipfs_monit_lt(params)
				.then((res) => {
					if (res.status == 0) {
						res.data.timeArray.forEach((item, index) => {
							let obj = {};
							if (params.timeUnit == 60) {
								obj.name = getday(item, 'hms');
							} else {
								obj.name = getday(item);
							}
							obj.value = res.data.ltArray[index].toFixed(2);
							this.ltlist.push(obj);
						});
						this.max_value = res.data.ltMax.toFixed(2);
						this.min_value = res.data.ltMin.toFixed(2);
						this.average_value = res.data.ltAvg.toFixed(2);
					} else {
						this.$message.error(res.errMsg);
					}
					if (params.ipfsId == '*') {
						this.$nextTick(
							this.tiredsharts(
								'lt',
								'LT（失联计数）',
								this.ltlist
							)
						);
					} else {
						this.$nextTick(
							this.tiredsharts(
								'lt',
								'LT（失联计数）',
								this.ltlist,
								'id'
							)
						);
					}
				})
				.catch((error) => {});
		},
		//请求节点质量--在线率
		get_itf() {
			this.itflist = [];
			this.max_value = 0;
			this.min_value = 0;
			this.average_value = 0;
			let params = new Object();
			if (this.searchdata.region1) {
				params.firstChannel = this.searchdata.region1;
			} else {
				params.firstChannel = '*';
			}
			params.first_channel = params.firstChannel;
			if (this.searchdata.region2) {
				params.secondChannel = this.searchdata.region2;
			} else {
				params.secondChannel = '*';
			}
			params.second_channel = params.secondChannel;
			if (this.searchdata.region3) {
				params.deviceType = this.searchdata.region3;
			} else {
				params.deviceType = '*';
			}
			params.device_type = params.deviceType;
			if (this.searchdata.region6) {
				params.isp = this.searchdata.region6;
			} else {
				params.isp = '*';
			}
			if (this.searchdata.region7) {
				params.cpuType = this.searchdata.region7;
			} else {
				params.cpuType = '*';
			}
			if (this.searchdata.input) {
				params.nodeId = this.searchdata.input;
			} else {
				params.nodeId = '*';
			}
			params.ipfsId = params.nodeId;
			if (this.searchdata.region8) {
				params.osType = this.searchdata.region8;
			} else {
				params.osType = '*';
			}
			if (
				this.searchdata.region4 == '*' ||
				this.searchdata.region4 == ''
			) {
				params.region = '*';
			} else {
				params.qu = this.searchdata.region4[0];
				params.region = this.searchdata.region4[1];
			}
			if (
				this.searchdata.region5 == '全部' ||
				this.searchdata.region5 == ''
			) {
				params.city = '*';
			} else {
				params.city = this.searchdata.region5;
			}
			params.start_ts = this.starttime;
			params.end_ts = this.endtime - 1;
			params.timeUnit = 1440;
			// if (params.end_ts - params.end_ts > 86400) {
			// 	params.timeUnit = 1440;
			// } else {
			// 	params.timeUnit = 60;
            // }
            if (this.node_type) {
				if (this.node_type == '全部') {
					params.node_type = '*';
				} else {
					params.node_type = this.node_type;
				}
			} else {
				params.node_type = '*';
			}
			params.time_unit = params.timeUnit;
			params.tabname = this.searchdata.tabname;
			params.radio = this.searchdata_radio;
			params.echartslist = this.searchdata.echartslist;
			sessionStorage.setItem('search_condition', JSON.stringify(params));
			ipfs_monit_itf(params)
				.then((res) => {
					if (res.status == 0) {
						res.data.timeArray.forEach((item, index) => {
							let obj = {};
							if (params.timeUnit == 60) {
								obj.name = getday(item, 'hms');
							} else {
								obj.name = getday(item);
							}
							obj.value = (
								res.data.itfArray[index] * 100
							).toFixed(4);
							this.itflist.push(obj);
						});
						this.max_value =
							(res.data.itfMax * 100).toFixed(2) + '%';
						this.min_value =
							(res.data.itfMin * 100).toFixed(2) + '%';
						this.average_value =
							(res.data.itfAvg * 100).toFixed(2) + '%';
					} else {
						this.$message.error(res.errMsg);
					}
					if (params.ipfsId == '*') {
						this.$nextTick(
							this.tiredsharts(
								'itf',
								'ITF（在线率）',
								this.itflist
							)
						);
					} else {
						this.$nextTick(
							this.tiredsharts(
								'itf',
								'ITF（在线率）',
								this.itflist,
								'id'
							)
						);
					}
				})
				.catch((error) => {});
		},
		//请求节点质量--离线率
		get_otf() {
			this.otflist = [];
			this.max_value = 0;
			this.min_value = 0;
			this.average_value = 0;
			let params = new Object();
			if (this.searchdata.region1) {
				params.firstChannel = this.searchdata.region1;
			} else {
				params.firstChannel = '*';
			}
			params.first_channel = params.firstChannel;
			if (this.searchdata.region2) {
				params.secondChannel = this.searchdata.region2;
			} else {
				params.secondChannel = '*';
			}
			params.second_channel = params.secondChannel;
			if (this.searchdata.region3) {
				params.deviceType = this.searchdata.region3;
			} else {
				params.deviceType = '*';
			}
			params.device_type = params.deviceType;
			if (this.searchdata.region6) {
				params.isp = this.searchdata.region6;
			} else {
				params.isp = '*';
			}
			if (this.searchdata.region7) {
				params.cpuType = this.searchdata.region7;
			} else {
				params.cpuType = '*';
			}
			if (this.searchdata.input) {
				params.nodeId = this.searchdata.input;
			} else {
				params.nodeId = '*';
			}
			params.ipfsId = params.nodeId;
			if (this.searchdata.region8) {
				params.osType = this.searchdata.region8;
			} else {
				params.osType = '*';
			}
			if (
				this.searchdata.region4 == '*' ||
				this.searchdata.region4 == ''
			) {
				params.region = '*';
			} else {
				params.qu = this.searchdata.region4[0];
				params.region = this.searchdata.region4[1];
			}
			if (
				this.searchdata.region5 == '全部' ||
				this.searchdata.region5 == ''
			) {
				params.city = '*';
			} else {
				params.city = this.searchdata.region5;
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
			params.timeUnit = 1440;
			// if (params.end_ts - params.end_ts > 86400) {
			// 	params.timeUnit = 1440;
			// } else {
			// 	params.timeUnit = 60;
			// }
			params.time_unit = params.timeUnit;
			params.tabname = this.searchdata.tabname;
			params.radio = this.searchdata_radio;
			params.echartslist = this.searchdata.echartslist;
			sessionStorage.setItem('search_condition', JSON.stringify(params));
			ipfs_monit_otf(params)
				.then((res) => {
					if (res.status == 0) {
						res.data.timeArray.forEach((item, index) => {
							let obj = {};
							if (params.timeUnit == 60) {
								obj.name = getday(item, 'hms');
							} else {
								obj.name = getday(item);
							}
							obj.value = (
								res.data.otfArray[index] * 100
							).toFixed(4);
							this.otflist.push(obj);
						});
						this.max_value =
							(res.data.otfMax * 100).toFixed(2) + '%';
						this.min_value =
							(res.data.otfMin * 100).toFixed(2) + '%';
						this.average_value =
							(res.data.otfAvg * 100).toFixed(2) + '%';
					} else {
						this.$message.error(res.errMsg);
					}
					if (params.ipfsId == '*') {
						this.$nextTick(
							this.tiredsharts(
								'otf',
								'OTF（离线率）',
								this.otflist
							)
						);
					} else {
						this.$nextTick(
							this.tiredsharts(
								'otf',
								'OTF（离线率）',
								this.otflist,
								'id'
							)
						);
					}
				})
				.catch((error) => {});
		},
		//请求节点质量--重连次数
		get_rcnt() {
			this.rcntlist = [];
			this.max_value = 0;
			this.min_value = 0;
			this.average_value = 0;
			let params = new Object();
			if (this.searchdata.region1) {
				params.firstChannel = this.searchdata.region1;
			} else {
				params.firstChannel = '*';
			}
			params.first_channel = params.firstChannel;
			if (this.searchdata.region2) {
				params.secondChannel = this.searchdata.region2;
			} else {
				params.secondChannel = '*';
			}
			params.second_channel = params.secondChannel;
			if (this.searchdata.region3) {
				params.deviceType = this.searchdata.region3;
			} else {
				params.deviceType = '*';
			}
			params.device_type = params.deviceType;

			if (this.searchdata.region6) {
				params.isp = this.searchdata.region6;
			} else {
				params.isp = '*';
			}
			if (this.searchdata.region7) {
				params.cpuType = this.searchdata.region7;
			} else {
				params.cpuType = '*';
			}
			if (this.searchdata.input) {
				params.nodeId = this.searchdata.input;
			} else {
				params.nodeId = '*';
			}
			params.ipfsId = params.nodeId;
			if (this.searchdata.region8) {
				params.osType = this.searchdata.region8;
			} else {
				params.osType = '*';
			}
			if (
				this.searchdata.region4 == '*' ||
				this.searchdata.region4 == ''
			) {
				params.region = '*';
			} else {
				params.qu = this.searchdata.region4[0];
				params.region = this.searchdata.region4[1];
			}
			if (
				this.searchdata.region5 == '全部' ||
				this.searchdata.region5 == ''
			) {
				params.city = '*';
			} else {
				params.city = this.searchdata.region5;
			}
			params.start_ts = this.starttime;
			params.end_ts = this.endtime - 1;
			if (params.end_ts - params.start_ts > 86399) {
				params.timeUnit = 1440;
			} else {
				params.timeUnit = 60;
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
			params.time_unit = params.timeUnit;
			params.tabname = this.searchdata.tabname;
			params.radio = this.searchdata_radio;
			params.echartslist = this.searchdata.echartslist;
			sessionStorage.setItem('search_condition', JSON.stringify(params));
			ipfs_monit_rcnt(params)
				.then((res) => {
					if (res.status == 0) {
						res.data.timeArray.forEach((item, index) => {
							let obj = {};
							if (params.timeUnit == 60) {
								obj.name = getday(item, 'hms');
							} else {
								obj.name = getday(item);
							}
							obj.value = res.data.rcntArray[index].toFixed(2);
							this.rcntlist.push(obj);
						});

						this.max_value = res.data.rcntMax.toFixed(2);
						this.min_value = res.data.rcntMin.toFixed(2);
						this.average_value = res.data.rcntAvg.toFixed(2);
					} else {
						this.$message.error(res.errMsg);
					}
					if (params.ipfsId == '*') {
						this.$nextTick(
							this.tiredsharts(
								'rcnt',
								'RCNT（重连计数）',
								this.rcntlist
							)
						);
					} else {
						this.$nextTick(
							this.tiredsharts(
								'rcnt',
								'RCNT（重连计数）',
								this.rcntlist,
								'id'
							)
						);
					}
				})
				.catch((error) => {});
		},
		//请求节点质量--CPU占用率
		get_cpuusag() {
			this.cpuusaglist = [];
			this.max_value = 0;
			this.min_value = 0;
			this.average_value = 0;
			let params = new Object();
			if (this.searchdata.region1) {
				params.firstChannel = this.searchdata.region1;
			} else {
				params.firstChannel = '*';
			}
			params.first_channel = params.firstChannel;
			if (this.searchdata.region2) {
				params.secondChannel = this.searchdata.region2;
			} else {
				params.secondChannel = '*';
			}
			params.second_channel = params.secondChannel;
			if (this.searchdata.region3) {
				params.deviceType = this.searchdata.region3;
			} else {
				params.deviceType = '*';
			}
			params.device_type = params.deviceType;
			if (this.searchdata.region6) {
				params.isp = this.searchdata.region6;
			} else {
				params.isp = '*';
			}
			if (this.searchdata.region7) {
				params.cpuType = this.searchdata.region7;
			} else {
				params.cpuType = '*';
			}
			if (this.searchdata.input) {
				params.nodeId = this.searchdata.input;
			} else {
				params.nodeId = '*';
			}
			params.ipfsId = params.nodeId;
			if (this.searchdata.region8) {
				params.osType = this.searchdata.region8;
			} else {
				params.osType = '*';
			}
			if (
				this.searchdata.region4 == '*' ||
				this.searchdata.region4 == ''
			) {
				params.region = '*';
			} else {
				params.qu = this.searchdata.region4[0];
				params.region = this.searchdata.region4[1];
			}
			if (
				this.searchdata.region5 == '全部' ||
				this.searchdata.region5 == ''
			) {
				params.city = '*';
			} else {
				params.city = this.searchdata.region5;
			}
			params.start_ts = this.starttime;
			params.end_ts = this.endtime - 1;
			if (params.end_ts - params.start_ts > 86399) {
				params.timeUnit = 1440;
			} else {
				params.timeUnit = 60;
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
			params.time_unit = params.timeUnit;
			params.tabname = this.searchdata.tabname;
			params.radio = this.searchdata_radio;
			params.echartslist = this.searchdata.echartslist;
			sessionStorage.setItem('search_condition', JSON.stringify(params));
			ipfs_monit_cpuusage(params)
				.then((res) => {
					if (res.status == 0) {
						res.data.timeArray.forEach((item, index) => {
							let obj = {};
							if (params.timeUnit == 60) {
								obj.name = getday(item, 'hms');
							} else {
								obj.name = getday(item);
							}
							obj.value = (
								res.data.cpuArray[index] * 100
							).toFixed(2);
							this.cpuusaglist.push(obj);
						});
						this.max_value =
							(res.data.cpuMax * 100).toFixed(2) + '%';
						this.min_value =
							(res.data.cpuMin * 100).toFixed(2) + '%';
						this.average_value =
							(res.data.cpuAvg * 100).toFixed(2) + '%';
					} else {
						this.$message.error(res.errMsg);
					}
					this.$nextTick(
						this.tiredsharts('cpu', 'CPU占用率', this.cpuusaglist)
					);
				})
				.catch((error) => {});
		},
		//请求节点质量--CPU占用率
		get_memory() {
			this.memorylist = [];
			this.max_value = 0;
			this.min_value = 0;
			this.average_value = 0;
			let params = new Object();
			if (this.searchdata.region1) {
				params.firstChannel = this.searchdata.region1;
			} else {
				params.firstChannel = '*';
			}
			params.first_channel = params.firstChannel;
			if (this.searchdata.region2) {
				params.secondChannel = this.searchdata.region2;
			} else {
				params.secondChannel = '*';
			}
			params.second_channel = params.secondChannel;
			if (this.searchdata.region3) {
				params.deviceType = this.searchdata.region3;
			} else {
				params.deviceType = '*';
			}
			params.device_type = params.deviceType;
			if (this.searchdata.region6) {
				params.isp = this.searchdata.region6;
			} else {
				params.isp = '*';
			}
			if (this.searchdata.region7) {
				params.cpuType = this.searchdata.region7;
			} else {
				params.cpuType = '*';
			}
			if (this.searchdata.input) {
				params.nodeId = this.searchdata.input;
			} else {
				params.nodeId = '*';
			}
			params.ipfsId = params.nodeId;
			if (this.searchdata.region8) {
				params.osType = this.searchdata.region8;
			} else {
				params.osType = '*';
			}
			if (
				this.searchdata.region4 == '*' ||
				this.searchdata.region4 == ''
			) {
				params.region = '*';
			} else {
				params.qu = this.searchdata.region4[0];
				params.region = this.searchdata.region4[1];
			}
			if (
				this.searchdata.region5 == '全部' ||
				this.searchdata.region5 == ''
			) {
				params.city = '*';
			} else {
				params.city = this.searchdata.region5;
			}
			params.start_ts = this.starttime;
			params.end_ts = this.endtime - 1;
			if (params.end_ts - params.start_ts > 86399) {
				params.timeUnit = 1440;
			} else {
				params.timeUnit = 60;
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
			params.time_unit = params.timeUnit;
			params.tabname = this.searchdata.tabname;
			params.radio = this.searchdata_radio;
			params.echartslist = this.searchdata.echartslist;
			sessionStorage.setItem('search_condition', JSON.stringify(params));
			ipfs_monit_memory(params)
				.then((res) => {
					if (res.status == 0) {
						res.data.timeArray.forEach((item, index) => {
							let obj = {};
							if (params.timeUnit == 60) {
								obj.name = getday(item, 'hms');
							} else {
								obj.name = getday(item);
							}
							obj.value = (
								res.data.memoryArray[index] * 100
							).toFixed(2);
							this.memorylist.push(obj);
						});
						this.max_value =
							(res.data.ramMax * 100).toFixed(2) + '%';
						this.min_value =
							(res.data.ramMin * 100).toFixed(2) + '%';
						this.average_value =
							(res.data.ramAvg * 100).toFixed(2) + '%';
					} else {
						this.$message.error(res.errMsg);
					}
					this.$nextTick(
						this.tiredsharts('ram', '内存占用率', this.memorylist)
					);
				})
				.catch((error) => {});
		},
		handleChangefirst(val) {
			this.searchdata.region2 = '*';
			if (val == '*' || val == '') {
				this.secondchan = [];
				this.searchdata.region2 = '';
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
			this.set_time();
		},
		changeup_down() {
			if (this.radio1 == '1') {
				this.$nextTick(this.firstsharts(this.upBandwidthMap));
			} else {
				this.$nextTick(this.firstsharts(this.downBandwidthMap));
			}
		},
		change_tab() {
			this.show_time_btn = true;
			this.activeName = this.searchdata.tabname;
            this.node_type='';
			this.searchdata_radio = 1;
			this.searchdata.input = '';
			this.searchdata.region1 = ''; //一级渠道商
			this.searchdata.region2 = ''; //二级渠道商
			this.searchdata.region3 = ''; //设备类型
			this.searchdata.region4 = ''; //区域
			this.searchdata.region5 = ''; //城市
			this.searchdata.region6 = ''; //运营商
			this.searchdata.region7 = ''; //硬件类型
			this.searchdata.region8 = ''; //操作系统
			this.searchdata.value1 = '';
			if (this.activeName == 'third') {
				this.seacr_yin_show = true;
				this.$nextTick(() => {
					let top_title_h_two = document.getElementsByClassName(
						'two_rowbg'
					)[0].offsetHeight;
					let con_he = document.getElementsByClassName(
						'content-container'
					)[0].offsetHeight;
					this.shere_scrollerHeight =
						con_he - top_title_h_two - 260 + 'px';
					this.set_time();
				});
			} else {
				this.seacr_yin_show = false;
				if (this.activeName == 'first') {
					this.set_time(1);
				} else if (this.activeName == 'second') {
					this.set_time();
				}
			}
		},
		handleClick(tab, event) {
			this.show_time_btn = true;
			if (this.activeName == 'third') {
				this.seacr_yin_show = true;
				this.set_time();
			} else {
				this.seacr_yin_show = false;
				if (this.activeName == 'first') {
					this.set_time(1);
				} else if (this.activeName == 'second') {
					this.set_time();
				}
			}
		},
		set_time() {
			if (this.searchdata_radio == 5) {
				this.show_time = true;
				if (
					this.searchdata.value1 != null &&
					this.searchdata.value1 != ''
				) {
					this.starttime = setbatime(this.searchdata.value1[0]);
					this.endtime = setbatime(this.searchdata.value1[1]);
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
				} else {
					return false;
				}
			} else if (this.searchdata_radio == 4) {
				this.show_time = false;
				this.searchdata.value1 = '';
				let endt =
					new Date(new Date().toLocaleDateString()).getTime() / 1000;
				this.starttime = endt - 24 * 60 * 60 * 29;
				this.endtime = Date.parse(new Date()) / 1000;
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
			} else if (this.searchdata_radio == 3) {
				this.show_time = false;
				this.searchdata.value1 = '';
				let endt =
					new Date(new Date().toLocaleDateString()).getTime() / 1000;
				this.starttime = endt - 24 * 60 * 60 * 6;
				this.endtime = Date.parse(new Date()) / 1000;
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
			} else if (this.searchdata_radio == 2) {
				this.show_time = false;
				this.searchdata.value1 = '';
				this.endtime =
					new Date(new Date().toLocaleDateString()).getTime() / 1000;
				this.starttime =
					new Date(new Date().toLocaleDateString()).getTime() / 1000 -
					24 * 60 * 60;
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
			} else if (this.searchdata_radio == 1) {
				this.show_time = false;
				this.searchdata.value1 = '';
				this.starttime =
					new Date(new Date().toLocaleDateString()).getTime() / 1000;
				this.endtime = Date.parse(new Date()) / 1000;
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
			}
		},
		set_defaults() {
			this.searchdata_radio = 1;
			this.searchdata.input = '';
			this.searchdata.region1 = ''; //一级渠道商
			this.searchdata.region2 = ''; //二级渠道商
			this.searchdata.region3 = ''; //设备类型
			this.searchdata.region4 = ''; //区域
			this.searchdata.region5 = ''; //城市
			this.searchdata.region6 = ''; //运营商
			this.searchdata.region7 = ''; //硬件类型
			this.searchdata.region8 = ''; //操作系统
            this.searchdata.value1 = '';
            this.node_type='';
			this.set_time();
		},
		lastchange() {
			this.show_time_btn = true;
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
				if (this.searchdata_radio == 1) {
					this.searchdata_radio = 3;
					this.show_time = false;
					this.searchdata.value1 = '';
					let endt =
						new Date(new Date().toLocaleDateString()).getTime() /
						1000;
					this.starttime = endt - 24 * 60 * 60 * 6;
					this.endtime = Date.parse(new Date()) / 1000;
				}
				this.show_time_btn = false;
				this.get_itf();
				// this.tiredsharts('itf', 'ITF（在线率）');
			} else if (this.searchdata.echartslist == 6) {
				if (this.searchdata_radio == 1) {
					this.searchdata_radio = 3;
					this.show_time = false;
					this.searchdata.value1 = '';
					let endt =
						new Date(new Date().toLocaleDateString()).getTime() /
						1000;
					this.starttime = endt - 24 * 60 * 60 * 6;
					this.endtime = Date.parse(new Date()) / 1000;
				}
				this.show_time_btn = false;
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
		exportant_dataflow(name) {
			let params = new Object();
			if (this.searchdata.region1) {
				params.firstChannel = this.searchdata.region1;
			} else {
				params.firstChannel = '*';
			}
			params.first_channel = params.firstChannel;
			if (this.searchdata.region2) {
				params.secondChannel = this.searchdata.region2;
			} else {
				params.secondChannel = '*';
			}
			params.second_channel = params.secondChannel;
			if (this.searchdata.region3) {
				params.deviceType = this.searchdata.region3;
			} else {
				params.deviceType = '*';
			}
			params.device_type = params.deviceType;
			if (this.searchdata.region6) {
				params.isp = this.searchdata.region6;
			} else {
				params.isp = '*';
			}
			if (this.searchdata.region7) {
				params.cpuType = this.searchdata.region7;
			} else {
				params.cpuType = '*';
			}
			if (this.searchdata.input) {
				params.nodeId = this.searchdata.input;
			} else {
				params.nodeId = '*';
			}
			params.ipfsId = params.nodeId;
			if (this.searchdata.region8) {
				params.osType = this.searchdata.region8;
			} else {
				params.osType = '*';
			}
			if (
				this.searchdata.region4 == '*' ||
				this.searchdata.region4 == ''
			) {
				params.region = '*';
			} else {
				params.qu = this.searchdata.region4[0];
				params.region = this.searchdata.region4[1];
			}
			if (
				this.searchdata.region5 == '全部' ||
				this.searchdata.region5 == ''
			) {
				params.city = '*';
			} else {
				params.city = this.searchdata.region5;
			}
			params.start_ts = this.starttime;
			params.end_ts = this.endtime - 1;
			if (params.end_ts - params.start_ts > 86399) {
				params.timeUnit = 1440;
			} else {
				params.timeUnit = 120;
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
			params.time_unit = params.timeUnit;
			params.tabname = this.searchdata.tabname;
			params.radio = this.searchdata_radio;
			params.echartslist = this.searchdata.echartslist;
			if (name == '带宽') {
				export_ipfs_monit_bandwidth_table_file(params)
					.then((res) => {
						if (res.status == 0) {
							window.open(res.msg, '_blank');
							this.fan.fanactionlog('导出', '带宽', 1);
						} else {
							this.$message('导出失败');
							this.fan.fanactionlog('导出', '带宽', 0);
						}
					})
					.catch((error) => {
						this.fan.fanactionlog('导出', '带宽', 0);
					});
			} else if (name == '存储空间') {
				export_ipfs_monit_storage_table_file(params)
					.then((res) => {
						if (res.status == 0) {
							window.open(res.msg, '_blank');
							this.fan.fanactionlog('导出', '存储空间', 1);
						} else {
							this.$message('导出失败');
							this.fan.fanactionlog('导出', '存储空间', 0);
						}
					})
					.catch((error) => {
						this.fan.fanactionlog('导出', '存储空间', 0);
					});
			} else if (name == 'PING_MS') {
				export_ipfs_monit_ping_ms_table_file(params)
					.then((res) => {
						if (res.status == 0) {
							window.open(res.msg, '_blank');
							this.fan.fanactionlog('导出', 'PING_MS', 1);
						} else {
							this.$message('导出失败');
							this.fan.fanactionlog('导出', 'PING_MS', 0);
						}
					})
					.catch((error) => {
						this.fan.fanactionlog('导出', 'PING_MS', 0);
					});
			} else if (name == 'TID') {
				export_ipfs_monit_tid_table_file(params)
					.then((res) => {
						if (res.status == 0) {
							window.open(res.msg, '_blank');
							this.fan.fanactionlog('导出', 'TID', 1);
						} else {
							this.$message('导出失败');
							this.fan.fanactionlog('导出', 'TID', 0);
						}
					})
					.catch((error) => {
						this.fan.fanactionlog('导出', 'TID', 0);
					});
			} else if (name == 'ETF（错误率）') {
				export_ipfs_monit_etf_table_file(params)
					.then((res) => {
						if (res.status == 0) {
							window.open(res.msg, '_blank');
							this.fan.fanactionlog('导出', 'ETF（错误率）', 1);
						} else {
							this.$message('导出失败');
							this.fan.fanactionlog('导出', 'ETF（错误率）', 0);
						}
					})
					.catch((error) => {
						this.fan.fanactionlog('导出', 'ETF（错误率）', 0);
					});
			} else if (name == 'LT（失联计数）') {
				export_ipfs_monit_lt_table_file(params)
					.then((res) => {
						if (res.status == 0) {
							window.open(res.msg, '_blank');
							this.fan.fanactionlog('导出', 'LT（失联计数）', 1);
						} else {
							this.$message('导出失败');
							this.fan.fanactionlog('导出', 'LT（失联计数）', 0);
						}
					})
					.catch((error) => {
						this.fan.fanactionlog('导出', 'LT（失联计数）', 0);
					});
			} else if (name == 'ITF（在线率）') {
				export_ipfs_monit_itf_table_file(params)
					.then((res) => {
						if (res.status == 0) {
							window.open(res.msg, '_blank');
							this.fan.fanactionlog('导出', 'ITF（在线率）', 1);
						} else {
							this.$message('导出失败');
							this.fan.fanactionlog('导出', 'ITF（在线率）', 0);
						}
					})
					.catch((error) => {
						this.fan.fanactionlog('导出', 'ITF（在线率）', 0);
					});
			} else if (name == 'OTF（离线率）') {
				export_ipfs_monit_otf_table_file(params)
					.then((res) => {
						if (res.status == 0) {
							window.open(res.msg, '_blank');
							this.fan.fanactionlog('导出', 'OTF（离线率）', 1);
						} else {
							this.$message('导出失败');
							this.fan.fanactionlog('导出', 'OTF（离线率）', 0);
						}
					})
					.catch((error) => {
						this.fan.fanactionlog('导出', 'OTF（离线率）', 0);
					});
			} else if (name == 'RCNT（重连计数）') {
				export_ipfs_monit_rcnt_table_file(params)
					.then((res) => {
						if (res.status == 0) {
							window.open(res.msg, '_blank');
							this.fan.fanactionlog(
								'导出',
								'RCNT（重连计数）',
								1
							);
						} else {
							this.$message('导出失败');
							this.fan.fanactionlog(
								'导出',
								'RCNT（重连计数）',
								0
							);
						}
					})
					.catch((error) => {
						this.fan.fanactionlog('导出', 'RCNT（重连计数）', 0);
					});
			} else if (name == 'CPU占用率') {
				export_ipfs_monit_cpu_table_file(params)
					.then((res) => {
						if (res.status == 0) {
							window.open(res.msg, '_blank');
							this.fan.fanactionlog('导出', 'CPU占用率', 1);
						} else {
							this.$message('导出失败');
							this.fan.fanactionlog('导出', 'CPU占用率', 0);
						}
					})
					.catch((error) => {
						this.fan.fanactionlog('导出', 'CPU占用率', 0);
					});
			} else {
				export_ipfs_monit_memory_table_file(params)
					.then((res) => {
						if (res.status == 0) {
							window.open(res.msg, '_blank');
							this.fan.fanactionlog('导出', '内存占用率', 1);
						} else {
							this.$message('导出失败');
							this.fan.fanactionlog('导出', '内存占用率', 0);
						}
					})
					.catch((error) => {
						this.fan.fanactionlog('导出', '内存占用率', 0);
					});
			}
		},
		firstsharts(echartsdata) {
			let _this = this;
			let chartdom = document.getElementById('firstChart');
			chartdom.style.width = this._width + 'px';
			let myChart = echarts.init(chartdom); //这里是为了获得容器所在位置
			window.onresize = myChart.resize;
			let options = {
				title: {
					text: '带宽',
					left: 10,
				},
				legend: {
					bottom: '2%',
					data: ['节点带宽峰值', '节点带宽平均值'],
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
								_this.exportant_dataflow('带宽');
							},
						},
					},
				},
				tooltip: {
					trigger: 'axis',
					textStyle: {
						align: 'left',
					},
					formatter: function(params, ticket, callback) {
						let result = '';
						let num = params[0].dataIndex;
						let item_val =
							bandwidth_unit_conversion(
								echartsdata[num].avg_item
							)[0] +
							bandwidth_unit_conversion(
								echartsdata[num].avg_item
							)[1];
						let avg_val =
							bandwidth_unit_conversion(
								echartsdata[num].value
							)[0] +
							bandwidth_unit_conversion(
								echartsdata[num].value
							)[1];
						result +=
							echartsdata[num].name +
							'<br />' +
							params[0].marker +
							item_val +
							'<br />' +
							params[1].marker +
							avg_val;
						return result;
					},
				},

				grid: {
					bottom: 90,
					left: 50,
					right: 50,
					top: 100,
				},

				xAxis: {
					axisLabel: {
						interval: 0, //横轴信息全部显示
						rotate: 0, //60度角倾斜显示
					},
					axisTick: {
						alignWithLabel: true,
					},
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
					splitLine: {
						show: false, //去掉网格线
					},
					name: _this.downbandwidth_unit,
				},
				series: [
					{
						type: 'line',
						data: echartsdata.map(function(item) {
							return bandwidth_unit(
								item.avg_item,
								_this.downbandwidth_unit
							);
						}),
						large: true,
						smooth: true,
						name: '节点带宽峰值',
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
						type: 'line',
						data: echartsdata.map(function(item) {
							return bandwidth_unit(
								item.value,
								_this.downbandwidth_unit
							);
						}),
						large: true,
						smooth: true,
						name: '节点带宽平均值',
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
			myChart.clear();
			myChart.setOption(options);
		},

		secondsharts(dataStore, dataunits) {
			let _this = this;
			let chartdom2 = document.getElementById('secondChart');
			chartdom2.style.width = this._width + 'px';
			let myChart2 = echarts.init(chartdom2);
			window.onresize = myChart2.resize;
			let options = {
				title: {
					text: '存储空间',
					left: 10,
				},
				legend: {
					bottom: '2%',
					data: ['节点可用存储空间'],
				},
				xAxis: {
					axisLabel: {
						interval: 0, //横轴信息全部显示
						rotate: 0, //60度角倾斜显示
					},
					axisTick: {
						alignWithLabel: true,
					},
					type: 'category',
					data: dataStore.map(function(item) {
						return item.name;
					}),
				},
				yAxis: {
					type: 'value',
					splitLine: {
						show: false, //去掉网格线
					},
					name: dataunits,
				},
				grid: {
					bottom: 90,
					left: 50,
					right: 50,
					top: 100,
				},
				toolbox: {
					right: '10%',
					feature: {
						mydow: {
							show: _this.echartsexport,
							title: '导出',
							right: '30%',
							icon:
								'path://M1000.533333 250.453333c-14.933333-14.933333-35.413333-23.04-56.746666-23.04h-403.2l-52.48-110.506666c-8.533333-17.92-26.453333-29.44-46.506667-29.44H50.773333c-13.653333 0-26.453333 5.546667-35.84 14.933333-9.386667 9.813333-14.933333 22.613333-14.933333 35.84v724.48a80.213333 80.213333 0 0 0 79.786667 79.786667h865.28c20.906667 0 41.386667-8.533333 56.32-23.466667 14.08-14.933333 22.613333-35.413333 22.613333-56.32V307.2c0-21.333333-8.533333-41.813333-23.466667-56.746667z',
							onclick: function() {
								_this.exportant_dataflow('存储空间');
							},
						},
					},
				},
				tooltip: {
					trigger: 'axis',
					textStyle: {
						align: 'left',
					},
					formatter: function(params, ticket, callback) {
						return (
							params[0].name +
							'<br />' +
							'节点可用存储空间' +
							params[0].value +
							dataunits
						);
					},
				},
				series: [
					{
						data: dataStore.map(function(item) {
							return formatBkb(item.value, dataunits);
						}),
						barMaxWidth: 30,
						type: 'line',
						smooth: true,
						name: '节点可用存储空间',
						itemStyle: { color: '#409EFF' },
						areaStyle: {
							normal: {
								color: new echarts.graphic.LinearGradient(
									0,
									0,
									0,
									1,
									[
										{ offset: 0, color: '#409EFF' },
										{ offset: 1, color: '#ffffff' },
									]
								),
							},
						},
					},
				],
			};
			myChart2.clear();
			myChart2.setOption(options);
		},
		tiredsharts(id, titlename, datas, ds) {
			//ds 判断节点id
			let legdata = '';
			if (ds == 'id') {
				legdata = '节点' + titlename;
			} else {
				legdata = '节点' + titlename + '平均值';
			}
			let _this = this;
			let maxnum = 100;
			if (datas.length > 0) {
				let num_max = Math.max.apply(
					Math,
					datas.map((item) => {
						return item.value;
					})
				);
				maxnum = num_max;
			}
			let sa = true;
			let dadaunits = '%';
			if (id == 'itf' || id == 'otf') {
				sa = false;
			}
			if (id == 'lt' || id == 'rcnt') {
				dadaunits = '次';
			} else {
				maxnum = 100;
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
				legend: {
					bottom: '2%',
					data: [legdata],
				},
				xAxis: {
					type: 'category',
					axisLabel: {
						interval: 0, //横轴信息全部显示
						rotate: 0, //60度角倾斜显示
					},
					axisTick: {
						alignWithLabel: true,
					},
					data: datas.map(function(item) {
						return item.name;
					}),
				},
				grid: {
					bottom: 90,
					left: 50,
					right: 50,
					top: 100,
				},
				yAxis: {
					type: 'value',
					name: dadaunits,
					min: 0,
					// max: Math.ceil(maxnum),
					splitLine: {
						show: false, //去掉网格线
					},
				},
				toolbox: {
					right: '10%',
					feature: {
						mydow: {
							show: _this.echartsexport,
							title: '导出',
							right: '30%',
							icon:
								'path://M1000.533333 250.453333c-14.933333-14.933333-35.413333-23.04-56.746666-23.04h-403.2l-52.48-110.506666c-8.533333-17.92-26.453333-29.44-46.506667-29.44H50.773333c-13.653333 0-26.453333 5.546667-35.84 14.933333-9.386667 9.813333-14.933333 22.613333-14.933333 35.84v724.48a80.213333 80.213333 0 0 0 79.786667 79.786667h865.28c20.906667 0 41.386667-8.533333 56.32-23.466667 14.08-14.933333 22.613333-35.413333 22.613333-56.32V307.2c0-21.333333-8.533333-41.813333-23.466667-56.746667z',
							onclick: function() {
								_this.exportant_dataflow(titlename);
							},
						},
					},
				},
				tooltip: {
					trigger: 'axis',
					// axisPointer: {
					// 	type: 'cross',
					// 	label: {
					// 		backgroundColor: '#6a7985',
					// 	},
					// },
					textStyle: {
						align: 'left',
					},
					formatter: function(params, ticket, callback) {
						return (
							params[0].name +
							'<br />' +
							params[0].marker +
							params[0].value +
							dadaunits
						);
					},
				},
				series: [
					{
						data: datas.map(function(item) {
							return item.value;
						}),
						type: 'line',
						smooth: sa,
						name: legdata,
						itemStyle: { color: '#409EFF' },
						areaStyle: {
							normal: {
								color: new echarts.graphic.LinearGradient(
									0,
									0,
									0,
									1,
									[
										{ offset: 0, color: '#409EFF55' },
										{ offset: 1, color: '#ffffff' },
									]
								),
							},
						},
					},
				],
			};
			myChart2.clear();
			myChart2.setOption(options);
		},
		lastsharts(id, titlename, datas) {
			let legdata = '节点' + titlename + '平均值';
			let _this = this;
			let maxnum = 100;
			if (datas.length > 0) {
				let num_max = Math.max.apply(
					Math,
					datas.map((item) => {
						return item.value;
					})
				);
				maxnum = num_max;
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
				legend: {
					bottom: '2%',
					data: [legdata],
				},
				xAxis: {
					type: 'category',
					axisLabel: {
						interval: 0, //横轴信息全部显示
						rotate: 0, //60度角倾斜显示
					},
					axisTick: {
						alignWithLabel: true,
					},
					data: datas.map(function(item) {
						return item.name;
					}),
				},
				yAxis: [
					{
						type: 'value',
						name: 'ms',
						min: 0,
						// max: Math.ceil(maxnum),
						splitLine: {
							show: false, //去掉网格线
						},
					},
				],
				toolbox: {
					right: '10%',
					feature: {
						mydow: {
							show: _this.echartsexport,
							title: '导出',
							right: '30%',
							icon:
								'path://M1000.533333 250.453333c-14.933333-14.933333-35.413333-23.04-56.746666-23.04h-403.2l-52.48-110.506666c-8.533333-17.92-26.453333-29.44-46.506667-29.44H50.773333c-13.653333 0-26.453333 5.546667-35.84 14.933333-9.386667 9.813333-14.933333 22.613333-14.933333 35.84v724.48a80.213333 80.213333 0 0 0 79.786667 79.786667h865.28c20.906667 0 41.386667-8.533333 56.32-23.466667 14.08-14.933333 22.613333-35.413333 22.613333-56.32V307.2c0-21.333333-8.533333-41.813333-23.466667-56.746667z',
							onclick: function() {
								_this.exportant_dataflow(titlename);
							},
						},
					},
				},
				grid: {
					bottom: 90,
					left: 50,
					right: 50,
					top: 100,
				},
				tooltip: {
					trigger: 'axis',
					// axisPointer: {
					// 	type: 'cross',
					// 	label: {
					// 		backgroundColor: '#6a7985',
					// 	},
					// },
					textStyle: {
						align: 'left',
					},
					formatter: function(params, ticket, callback) {
						return (
							params[0].name +
							'<br />' +
							params[0].marker +
							params[0].value +
							'ms'
						);
					},
				},
				series: [
					{
						data: datas.map(function(item) {
							return item.value;
						}),
						barMaxWidth: 30,
						type: 'line',
						smooth: true,
						name: legdata,
						itemStyle: { color: '#409EFF' },
						areaStyle: {
							normal: {
								color: new echarts.graphic.LinearGradient(
									0,
									0,
									0,
									1,
									[
										{ offset: 0, color: '#409EFF55' },
										{ offset: 1, color: '#ffffff' },
									]
								),
							},
						},
					},
				],
			};
			myChart2.clear();
			myChart2.setOption(options);
		},
	},
	destroyed: function() {
		sessionStorage.removeItem('search_condition');
	},
};
</script>

<style lang="scss" scoped>
.content {
	text-align: left;
	overflow: hidden;
	background: #f6f6f6;
	// .el-col {
	// 	margin-bottom: 20px;
	// }
	.top_title {
		height: 140px;
		// margin-right: 20px;
		padding: 24px;
		text-align: center;
		box-sizing: border-box;
		// display: flex;
		// justify-content: space-around;
		color: #333333;
		background: #ffffff;
		font-size: 24px;
		p {
			text-align: center;
		}
		p:nth-child(1) {
			font-size: 14px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			color: #666666;
			margin-bottom: 20px;
		}
		p:nth-child(2) {
			font-size: 24px;
			line-height: 20px;
			margin-bottom: 10px;
		}
		p:nth-child(3) {
			font-size: 24px;
			line-height: 20px;
		}
		.top_title_left {
			width: 50%;
			text-align: right;
			margin-right: 64px;
			img {
				width: 5%;
			}
		}
		.top_title_right {
			width: 50%;
			text-align: left;
			img {
				width: 5%;
			}
		}
	}
	.bandwidth_top,
	.third_top {
		position: relative;
	}
	.second_top {
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		p {
			text-align: left;
		}
	}
	.bandwidth_top::after,
	.second_top_border::after,
	.third_top::after {
		position: absolute;
		top: 24px;
		right: 24px;
		width: 1px;
		height: 100px;
		content: '';
		background-color: #cecece;
	}
}
</style>
