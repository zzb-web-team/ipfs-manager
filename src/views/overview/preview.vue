<template>
	<div class="content">
		<div class="preview_top">
			<div class="preview_name">后台概览</div>
			<el-row
				:gutter="20"
				class="preview_title"
				type="flex"
				justify="start"
			>
				<el-col :span="3"
					><div class="grid-content">
						<p>总节点</p>
						<div>{{ all_node_num }}</div>
					</div></el-col
				>
				<el-col :span="3"
					><div class="grid-content">
						<p>在线节点</p>
						<div>{{ online_node_num }}</div>
					</div></el-col
				>
				<el-col :span="3"
					><div class="grid-content">
						<p>节点带宽峰值<span style="color:#32B16C;border:1px solid #32B16C;background:#D6EFE2;    border-radius: 5px;margin-left: 5px;padding: 0 2px;">上行</span></p> 
						<div>{{ node_bandwidth_top }}</div>
					</div></el-col
				>
				<el-col :span="3"
					><div class="grid-content">
						<p>节点可用储存</p>
						<div>{{ node_storage }}</div>
					</div></el-col
				>
				<el-col :span="3"
					><div class="grid-content">
						<p>节点今日使用流量</p>
						<div>{{ today_flow }}</div>
					</div></el-col
				>
				<el-col :span="3"
					><div class="grid-content">
						<p>节点平均利用率</p>
						<div>{{ utilization_avg }}</div>
					</div></el-col
				>
			</el-row>
		</div>
		<div class="preview_con">
			<div class="con_first">
				<div>
					<el-table
						:data="maplist"
						:cell-style="rowClass"
						:header-cell-style="headClass"
						style="width: 100%"
						height="500"
						fixed
                        border
						@cell-click="clicktan"
					>
						<el-table-column
							v-for="(item, key) in dev_ytpe_lists"
							:key="key"
							:prop="item.value"
							:label="item.name"
							width="150"
							:fixed="item.name == '省市' ? true : false"
						>
							<template slot="header">{{ item.name }}</template>
						</el-table-column>
					</el-table>
				</div>
				<div
					id="myChartChina"
					:style="{ width: '100%', height: '500px' }"
				></div>
			</div>
			<div class="con_second">
				<div id="node_id"></div>
				<div id="network_distribution"></div>
				<div id="use_flow"></div>
			</div>
			<div class="con_third">
				<div id="seven_days_storage"></div>
				<div id="seven_days_utilization"></div>
			</div>
			<div class="con_fourth">
				<div id="seven_days_online"></div>
				<div id="seven_days_offline"></div>
			</div>
		</div>
	</div>
</template>

<script>
import echarts from 'echarts';
import {
	query_ipfs_node_region_dist,
	get_nodetype_enum,
	node_countinfo,
} from '@/servers/api';
import { setbatime } from '../../servers/sevdate';
export default {
	data() {
		return {
			all_node_num: 10,
			online_node_num: 10,
			node_bandwidth_top: 0,
			node_storage: 0,
			today_flow: 0,
			utilization_avg: 0,
			starttime: 0,
			endtime: 0,
			maplist: [],
			sheng_list: [],
			dev_ytpe_list: [],
			dev_ytpe_lists: [],
			bin_data: [
				{ value: 335, name: '云链' },
				{ value: 310, name: '西柚机' },
				{ value: 234, name: '玩客云' },
				{ value: 135, name: '香港运维' },
				{ value: 548, name: 'rouji' },
				{ value: 936, name: 'PC西柚机' },
			],
			bar_data: [
				{ value: 335, name: 'Mon' },
				{ value: 310, name: 'Tue' },
				{ value: 234, name: 'Wed' },
				{ value: 135, name: 'Thu' },
				{ value: 548, name: 'Fri' },
				{ value: 936, name: 'Sat' },
			],
			flow_bar_data: [
				{ value: 311, name: '8-5' },
				{ value: 185, name: '8-6' },
				{ value: 43, name: '8-7' },
				{ value: 245, name: '8-8' },
				{ value: 310, name: '8-9' },
				{ value: 63, name: '8-10' },
				{ value: 131, name: '8-11' },
			],
		};
	},
	mounted() {
		this.starttime =
			new Date(new Date().toLocaleDateString()).getTime() / 1000;
		this.endtime = parseInt(new Date().getTime() / 1000);

		this.getdata(0);
		this.set_echarts_bin('node_id', '节点渠道', this.bin_data, 'pie');
		this.set_echarts_bar(
			'network_distribution',
			'节点网络线路分布',
			this.bar_data,
			'bar',
			'节点数'
		);
		this.set_echarts_bar(
			'use_flow',
			'节点近7日使用流量',
			this.flow_bar_data,
			'bar',
			'流量'
		);
		this.set_echarts_line(
			'seven_days_storage',
			'节点近7日使用存储',
			this.flow_bar_data,
			'line',
			'存储',
			'#1572E8'
		);
		this.set_echarts_line(
			'seven_days_utilization',
			'节点近7日平均利用率',
			this.flow_bar_data,
			'line',
			'利用率',
			'#FFA50A'
		);
		this.set_echarts_line(
			'seven_days_online',
			'节点近7日平均在线时长',
			this.flow_bar_data,
			'line',
			'时长',
			'#FD776B'
		);
		this.set_echarts_line(
			'seven_days_offline',
			'节点近7日平均离线次数',
			this.flow_bar_data,
			'line',
			'存储',
			'#4BCC24'
		);
	},
	methods: {
		getdata(pagenum) {
			this.maplist = [];
			let params = new Object();
			params.page = pagenum;
			if (pagenum == 0) {
				this.dev_ytpe_lists = [];
			}
			node_countinfo(params)
				.then((res) => {
					if (res.status == 0) {
						this.sheng_list = this.sheng_list.concat(
							res.data.result
						);
						let arr = [];
						let type_list = [];
						type_list = res.data.nodeType;
						type_list.unshift('全部节点');
						type_list.unshift('省市');
						if (pagenum == 0) {
							let zaobj = {};
							type_list.forEach((col, i) => {
								let objsd = {};
								if (zaobj[col]) {
									objsd.value = col + i;
									zaobj[col] = col + i;
								} else {
									objsd.value = col;
									zaobj[col] = col;
								}
								objsd.name = col;
								this.dev_ytpe_lists.push(objsd);
							});
						}
						this.dev_ytpe_list = type_list;
						if (res.data.remaining <= 0) {
							this.sheng_list.forEach((item) => {
								let obj = {};
								obj.name = item.province.replace('市', '');
								obj.name = obj.name.replace('省', '');
								obj.data = item.nodeCount;
								obj.value = this.leijiasum(item.nodeCount);
								obj.data.unshift(obj.value);
								obj.data.unshift(obj.name);
								obj.data.forEach((val, index) => {
									if (this.dev_ytpe_lists[index]) {
										let k = this.dev_ytpe_lists[index]
											.value;
										obj[k] = val;
									} else {
										return false;
									}
								});
								arr.push(obj);
							});
							console.log(arr);
						} else {
							pagenum++;
							this.getdata(pagenum);
						}

						arr.sort(this.sortData);
						//去重 key为省份
						this.maplist = this.deWeightThree(arr, 'name');

						this.drawLine();
					} else {
						this.$message.error(res.err_msg);
					}
				})
				.catch((Error) => {});
		},
		sortData(a, b) {
			return b.value - a.value;
		},
		deWeightThree(arr, sname) {
			let map = new Map();
			for (let item of arr) {
				if (!map.has(item[sname])) {
					map.set(item[sname], item);
				}
			}
			return [...map.values()];
		},
		leijiasum(arr) {
			var s = 0;
			for (var i = arr.length - 1; i >= 0; i--) {
				s += arr[i];
			}
			return s;
		},
		clicktan(row, column, cell, event) {
			let north_list = ['北京', '内蒙古', '山西', '河北', '天津'];
			let south_list = ['广东', '广西', '海南'];
			let east_list = ['福建', '江苏', '安徽', '山东', '上海', '浙江'];
			let center_list = ['河南', '湖北', '江西', '湖南'];
			let northwest_list = ['宁夏', '陕西', '甘肃', '青海', '新疆'];
			let northeast_list = ['黑龙江', '吉林', '辽宁'];
			let southwest_list = ['贵州', '云南', '重庆', '四川', '西藏'];
			let other_list = ['香港', '澳门', '台湾'];
			let qu = '-1';
			if (north_list.indexOf(row.name) >= 0) {
				qu = '华北';
			} else if (south_list.indexOf(row.name) >= 0) {
				qu = '华南';
			} else if (east_list.indexOf(row.name) >= 0) {
				qu = '华东';
			} else if (center_list.indexOf(row.name) >= 0) {
				qu = '华中';
			} else if (northwest_list.indexOf(row.name) >= 0) {
				qu = '西北';
			} else if (northeast_list.indexOf(row.name) >= 0) {
				qu = '东北';
			} else if (southwest_list.indexOf(row.name) >= 0) {
				qu = '西南';
			} else if (other_list.indexOf(row.name) >= 0) {
				qu = '其他';
			}
			this.$router.push({
				path: '/node_information',
				query: { city: row.name, firstchans: column.label, quyu: qu },
			});
		},
		// 表头样式设置
		headClass() {
			return 'text-align: center;background:#ffffff;font-size:16px;';
		},
		// 表格样式设置
		rowClass() {
			return 'text-align: center;';
		},
		//全国地图
		drawLine() {
			var _this = this;
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
					max: 500,
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
			myChartChina.on('click', function(params) {
				let north_list = ['北京', '内蒙古', '山西', '河北', '天津'];
				let south_list = ['广东', '广西', '海南'];
				let east_list = [
					'福建',
					'江苏',
					'安徽',
					'山东',
					'上海',
					'浙江',
				];
				let center_list = ['河南', '湖北', '江西', '湖南'];
				let northwest_list = ['宁夏', '陕西', '甘肃', '青海', '新疆'];
				let northeast_list = ['黑龙江', '吉林', '辽宁'];
				let southwest_list = ['贵州', '云南', '重庆', '四川', '西藏'];
				let other_list = ['香港', '澳门', '台湾'];
				if (north_list.indexOf(params.name) >= 0) {
					let num = north_list.indexOf(params.name);
					_this.$router.push({
						path: '/ipfs_node_location',
						query: {
							node_city: params.name,
							node_num: num,
						},
					});
				} else if (south_list.indexOf(params.name) >= 0) {
					let num = south_list.indexOf(params.name);
					_this.$router.push({
						path: '/ipfs_sode_location',
						query: {
							node_city: params.name,
							node_num: num,
						},
					});
				} else if (east_list.indexOf(params.name) >= 0) {
					let num = east_list.indexOf(params.name);
					_this.$router.push({
						path: '/ipfs_east_location',
						query: {
							node_city: params.name,
							node_num: num,
						},
					});
				} else if (center_list.indexOf(params.name) >= 0) {
					let num = center_list.indexOf(params.name);
					_this.$router.push({
						path: '/ipfs_central_location',
						query: {
							node_city: params.name,
							node_num: num,
						},
					});
				} else if (northwest_list.indexOf(params.name) >= 0) {
					let num = northwest_list.indexOf(params.name);
					_this.$router.push({
						path: '/ipfs_northwest_location',
						query: {
							node_city: params.name,
							node_num: num,
						},
					});
				} else if (northeast_list.indexOf(params.name) >= 0) {
					let num = northeast_list.indexOf(params.name);
					_this.$router.push({
						path: '/ipfs_northeast_location',
						query: {
							node_city: params.name,
							node_num: num,
						},
					});
				} else if (southwest_list.indexOf(params.name) >= 0) {
					let num = southwest_list.indexOf(params.name);
					_this.$router.push({
						path: '/ipfs_southwest_location',
						query: {
							node_city: params.name,
							node_num: num,
						},
					});
				} else if (other_list.indexOf(params.name) >= 0) {
					let num = other_list.indexOf(params.name);
					_this.$router.push({
						path: '/ipfs_other_location',
						query: {
							node_city: params.name,
							node_num: num,
						},
					});
				}
				return false;
				window.open(params.data.provinceurl);
			});
		},
		//饼图
		set_echarts_bin(id, titlename, data, echart_type) {
			var dom = document.getElementById(id);
			var myChart = echarts.init(dom, 'light');
			window.onresize = myChart.resize;
			let legend_list = [];
			data.forEach((item) => {
				legend_list.push(item.name);
			});
			let option = {
				title: {
					text: titlename,
					// subtext: '纯属虚构',
					padding: [20, 20, 20, 20],
					textStyle: {
						fontWeight: 'normal',
						color: '#333333',
						fontSize: '16px',
					},
				},
				tooltip: {
					trigger: 'item',
					formatter: '{a} <br/>{b} : {c} ({d}%)',
				},
				grid: {
					top: '15%',
					left: '10%',
					right: '10%',
					bottom: '5%',
					containLabel: true,
				},
				legend: {
					orient: 'horizontal',
					x: 'center',
					y: 'bottom',
					textStyle: {
						color: '#000',
					},
					data: legend_list,
				},
				series: [
					{
						name: titlename,
						type: echart_type,
						radius: '55%',
						center: ['50%', '40%'],
						data: data,
						emphasis: {
							itemStyle: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)',
							},
						},
					},
				],
			};
			myChart.clear();
			myChart.setOption(option);
		},

		//柱状图
		set_echarts_bar(id, titlename, data, echart_type, y_name) {
			var dom = document.getElementById(id, 'light');
			var myChart = echarts.init(dom);
			window.onresize = myChart.resize;
			let option = {
				color: ['#1572E8'],
				title: {
					text: titlename,
					// subtext: '纯属虚构',
					padding: [20, 20, 20, 20],
					textStyle: {
						fontWeight: 'normal',
						color: '#333333',
						fontSize: '16px',
					},
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						// 坐标轴指示器，坐标轴触发有效
						type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
					},
				},
				grid: {
					top: '15%',
					left: '5%',
					right: '5%',
					bottom: '5%',
					containLabel: true,
				},
				xAxis: [
					{
						type: 'category',
						data: data.map(function(item) {
							return item.name;
						}),
						axisTick: {
							alignWithLabel: true,
						},
					},
				],
				yAxis: [
					{
						type: 'value',
						name: y_name,
						splitLine: {
							show: false,
						},
					},
				],
				series: [
					{
						name: y_name,
						type: echart_type,
						barMaxWidth: '30',
						data: data.map(function(item) {
							return item.value;
						}),
					},
				],
			};
			myChart.clear();
			myChart.setOption(option);
		},
		//曲线图
		set_echarts_line(
			id,
			titlename,
			data,
			echart_type,
			y_name,
			border_color
		) {
			var dom = document.getElementById(id);
			var myChart = echarts.init(dom, 'light');
			window.onresize = myChart.resize;
			let option = {
				color: [border_color],
				title: {
					text: titlename,
					// subtext: '纯属虚构',
					padding: [20, 20, 20, 20],
					textStyle: {
						fontWeight: 'normal',
						color: '#333333',
						fontSize: '16px',
					},
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						// 坐标轴指示器，坐标轴触发有效
						type: 'line', // 默认为直线，可选为：'line' | 'shadow'
					},
				},
				grid: {
					top: '15%',
					left: '5%',
					right: '5%',
					bottom: '5%',
					containLabel: true,
				},
				xAxis: [
					{
						type: 'category',
						data: data.map(function(item) {
							return item.name;
						}),
						axisTick: {
							alignWithLabel: true,
						},
					},
				],
				yAxis: [
					{
						type: 'value',
						name: y_name,
						splitLine: {
							show: false,
						},
					},
				],
				series: [
					{
						name: y_name,
						type: echart_type,
						smooth: true,
						symbol: 'none', //取消折点圆圈
						data: data.map(function(item) {
							return item.value;
						}),
						//曲线-闲的颜色
						itemStyle: {
							normal: {
								lineStyle: {
									color: border_color,
								},
							},
						},
						//填充颜色
						areaStyle: {
							normal: {
								color: {
									type: 'linear', //设置线性渐变
									x: 0,
									y: 0,
									x2: 0,
									y2: 1,
									colorStops: [
										{
											offset: 0,
											color: border_color, // 0% 处的颜色
										},
										{
											offset: 1,
											color: 'white', // 100% 处的颜色
										},
									],
									globalCoord: false, // 缺省为 false
								},
							},
						},
					},
				],
			};
			myChart.clear();
			myChart.setOption(option);
		},
	},
};
</script>

<style lang="scss" scoped>
.content {
	padding: 0;
	.preview_top {
		width: 100%;
		height: 100px;
		background: #1572e8;
		.preview_name {
			width: 100%;
			height: 60px;
			line-height: 60px;
			color: #fff;
			text-align: left;
			padding-left: 30px;
		}
		.preview_title {
			padding-left: 30px;
			.grid-content {
				height: 100px;
				border-radius: 12px;
				background-color: #fff;
				display: flex;
				flex-direction: column;
				align-items: center;
				box-shadow: 1px 4px 10px 0px rgba(52, 52, 52, 0.2);
				padding-top: 20px;
				div {
					margin-top: 10px;
					font-size: 18px;
				}
			}
		}
	}
	.preview_con {
		background: #f6f6f6;
		padding-top: 60px;
		.con_first,
		.con_second,
		.con_third,
		.con_fourth {
			width: 100%;
			height: 500px;
			border-radius: 8px;
			display: flex;
			align-items: center;
			margin-top: 20px;
			border-radius: 8px;
		}
		.con_first {
			background-color: #fff;
			display: flex;
		}
		#node_id,
		#seven_days_storage,
		#seven_days_online {
			background-color: #fff;
			width: 100%;
			height: 500px;
			border-radius: 8px;
		}
		#network_distribution,
		#use_flow,
		#seven_days_utilization,
		#seven_days_offline {
			background-color: #fff;
			margin-left: 20px;
			width: 100%;
			height: 500px;
			border-radius: 8px;
		}
	}
}
</style>
