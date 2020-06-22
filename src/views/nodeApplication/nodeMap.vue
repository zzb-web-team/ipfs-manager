<template>
	<div class="content">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item>
				<a>全国节点分布</a>
			</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="top_search">
			<span>时间：</span>
			<el-date-picker
				v-model="time_value"
				type="datetimerange"
				range-separator="至"
				start-placeholder="开始日期"
				end-placeholder="结束日期"
				@change="seachuser()"
				:picker-options="endPickerOptions"
			></el-date-picker>
			<span>节点渠道商：</span>
			<el-select
				v-model="searchdata.region1"
				placeholder="请选择一级渠道"
				@change="handleChangefirst($event)"
			>
				<el-option label="全部" value=""></el-option>
				<el-option
					v-for="(item, index) in firstchan"
					:key="item.name + index"
					:label="item.name"
					:value="item.value"
				></el-option>
			</el-select>
			<el-select
				v-model="searchdata.region2"
				placeholder="请选择二级渠道"
				@change="get_search()"
				:disabled="chil_disable"
			>
				<el-option label="全部" value=""></el-option>
				<el-option
					v-for="(item, index) in secondchan"
					:key="item.value + index"
					:label="item.name"
					:value="item.value"
				></el-option>
			</el-select>
			<span>设备类型：</span>
			<el-select
				v-model="searchdata.region3"
				placeholder="请选设备类型"
				@change="get_search()"
			>
				<el-option label="全部" value=""></el-option>
				<el-option
					v-for="(item, index) in device_type"
					:key="item.name + index"
					:label="item.name"
					:value="item.name"
				></el-option>
			</el-select>
			<span>区域：</span>
			<el-cascader
				size="small"
				placeholder="请选择区域"
				v-model="searchdata.region4"
				:options="citylist"
				@change="provinceChange"
			></el-cascader>
			<!-- <el-select v-model="searchdata.region4" placeholder="请选择区域">
				<el-option label="全部" value="*"></el-option>
				<el-option label="区域一" value="1"></el-option>
			</el-select> -->
		</div>
		<div style="display: flex;" class="mapdal">
			<div
				id="myChartChina"
				:style="{ width: '100%', height: '500px' }"
			></div>
			<ol>
				<li>
					<span>省市</span>
					<span>新增节点</span>
					<span>累计节点</span>
					<span>累计占比</span>
				</li>
				<li v-for="(item, index) in maplist" :key="index">
					<span
						>{{ index + 1 }}&nbsp;&nbsp;&nbsp;{{ item.name }}</span
					>
					<span>{{ item.newCount }}</span>
					<span>{{ item.value }}</span>
					<span>{{ (item.totalPercent * 100).toFixed(0) }}%</span>
				</li>
			</ol>
		</div>
	</div>
</template>

<script>
import { query_ipfs_node_region_dist, get_nodetype_enum } from '@/servers/api';
import {
	getlocaltimes,
	settime,
	getymdtime,
	setbatime,
	getday,
} from '../../servers/sevdate';
export default {
	data() {
		return {
			maplist: [],
			chil_disable: true,
			searchdata: {
				region1: '',
				region2: '',
				region3: '',
				region4: '',
			},
			region: '',
			time_value: '',
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
			],
			endPickerOptions: {
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
			secondchan: [],
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
			starttime: 0,
			endtime: 0,
		};
	},
	mounted() {
        this.starttime=new Date(new Date().toLocaleDateString()).getTime()/1000;
        this.endtime= parseInt((new Date()).getTime()/1000);
		this.getdata();
		//this.drawLine();
		this.get_search_data();
	},
	methods: {
		provinceChange() {
			this.getdata();
		},
		seachuser() {
			if (this.time_value != null && this.time_value != '') {
				this.starttime = setbatime(this.time_value[0]);
				this.endtime = setbatime(this.time_value[1]);
				this.getdata();
			} else {
			}
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
			this.getdata();
		},
		get_search() {
			this.getdata();
		},
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
		getdata() {
			let params = new Object();
			params.deviceType = this.searchdata.region3;
			params.end_ts = this.endtime;
			params.firstChannel = this.searchdata.region1;
			params.isp = '';
			params.nodeId = '';
			params.secondChannel = this.searchdata.region2;
			params.start_ts = this.starttime;
			if (this.searchdata.region4 == '') {
				params.region = '';
				params.city = '';
			} else {
				params.region = '';
				params.city = this.searchdata.region4[1];
			}
			if (params.end_ts - params.start_ts > 86400) {
				params.timeUnit = 1440;
			} else {
				params.timeUnit = 60;
			}
			query_ipfs_node_region_dist(params)
				.then((res) => {
					if (res.status == 0) {
						let arr = [];
						var entries = Object.entries(res.data);
						entries.forEach((item, index) => {
							let obj = {};
							obj.name = item[0].replace('市', '');
							obj.name = obj.name.replace('省', '');
							obj.value = item[1].totalCount;
							obj.newCount = item[1].newCount;
							obj.totalPercent = item[1].totalPercent;
							arr.push(obj);
						});
						this.maplist = arr;
						this.drawLine();
					}
				})
				.catch((Error) => {});
		},
		drawLine() {
			// 基于准备好的dom，初始化echarts实例
			var myChartContainer = document.getElementById('myChartChina');
			var resizeMyChartContainer = function() {
				myChartContainer.style.width =
					document.body.offsetWidth / 2 + 'px'; //页面一半的大小
			};
			resizeMyChartContainer();
			var myChartChina = this.$echarts.init(myChartContainer);

			function randomData() {
				return Math.round(Math.random() * 500);
			}
			// 绘制图表
			var optionMap = {
				tooltip: {},
				legend: {
					orient: 'vertical',
					left: 'left',
					data: [''],
				},
				visualMap: {
					min: 0,
					max: 10000,
					left: '5%',
					top: 'bottom',
					text: ['高', '低'],
					calculable: true,
					color: ['#0b50b9', '#c3e2f4'],
				},
				selectedMode: 'single',
				series: [
					{
						name: '',
						type: 'map',
						mapType: 'china',
						itemStyle: {
							normal: {
								borderColor: 'rgba(0, 0, 0, 0.2)',
							},
							emphasis: {
								shadowOffsetX: 0,
								shadowOffsetY: 0,
								shadowBlur: 20,
								borderWidth: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)',
							},
						},
						showLegendSymbol: true,
						label: {
							normal: {
								show: true,
							},
							emphasis: {
								show: true,
							},
						},
						data: this.maplist,
					},
				],
			};

			myChartChina.setOption(optionMap);
			window.onresize = function() {
				resizeMyChartContainer();
				myChartChina.resize();
			};
		},
	},
};
</script>

<style lang="scss" scoped>
.top_search {
	text-align: left;
	margin-top: 20px;
	margin-bottom: 20px;
	span {
		margin-left: 20px;
	}
	span:nth-child(1) {
		margin-left: 0;
	}
}
.mapdal {
	ol {
		width: 400px;
		height: 500px;
		overflow-y: auto;
		border: 1px solid #eeeeee;
	}
	ol > li {
		border: 1px solid #eeeeee;
		height: 60px;
		line-height: 60px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		span {
			width: 100px;
		}
		span:first-child {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			text-align: left;
			padding-left: 10px;
		}
		span:last-child {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
}
</style>
