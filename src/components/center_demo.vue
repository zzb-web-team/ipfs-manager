<template>
	<div class="content map_newstyle">
		<!-- <el-breadcrumb separator="/">
			<el-breadcrumb-item>
				<a>节点分布</a>
			</el-breadcrumb-item>
		</el-breadcrumb> -->
		<div id="new_echarts_two" :style="{ height: echartsHeight }"></div>
		<div class="next_title">
			<div v-for="(item, index) in subtitle">
				<span
					class="color_code"
					:style="{ background: c_arr[index] }"
				></span
				>{{ item.city }}&nbsp;&nbsp;{{ item.num }}
			</div>
		</div>
		<div id="alertmosewindowtital">
			<center>节点分布数量</center>
			<span>{{ city_name }}{{ node_num }}</span>
		</div>
	</div>
</template>

<script>
import echarts from 'echarts';
import '../../static/huazhong.js';
import '../../static/dongbei.js';
import '../../static/huabei.js';
import '../../static/huadong.js';
import '../../static/huanan.js';
import '../../static/hubei.js';
import '../../static/qita.js';
import '../../static/xibei.js';
import '../../static/xinan.js';
import geoData from '../../static/geoinfo-all.json';
import { query_node, node_distribute } from '../servers/api';
import axios from 'axios';
import _ from "lodash";
export default {
	name: 'new_city_map',
	data() {
		return {
			datalist: [],
			page: 0,
			city_num: 0,
			city_name: '',
			node_num: 0,
			subtitle: [],
			color_list: [],
			c_arr: [
				'#CCFFFF65',
				'#CC66FF65',
				'#66FFCC65',
				'#00FFFF65',
				'#FFCC6665',
				'#33FF6665',
				'#FFFFCC65',
			],
			city_arr: [],
			echartsHeight: 0,
		};
	},
	props: {
		citylist: {
			type: Array,
			default: () => {},
		},
		area: {
			type: String,
			default: () => {},
		},
		first_city: {
			type: String,
			default: () => {},
		},
	},
	watch: {
		citylist: {
			deep: true,
			handler(nv, ov) {
				this.citylist = nv;
			},
		},
		area: {
			deep: true,
			handler(nv, ov) {
				this.area = nv;
			},
		},
		first_city: {
			deep: true,
			handler(nv, ov) {
				this.first_city = nv;
			},
		},
	},
	mounted() {
		this.$nextTick(() => {
			let con_he = document.getElementsByClassName('content-container')[0]
				.offsetHeight;
			this.echartsHeight = con_he + 'px';
		});
		this.getseachinput();
		this.city_num = this.citylist.length;
	},
	methods: {
		//请求数据----获取搜索条件
		getseachinput() {
			axios.get('./static/city.json').then((res) => {
				this.city_arr = res.data.provinces;
				this.citylist.forEach((item, index) => {
					this.set_echarts_item_color(item, index);
					this.getdalsit(item, this.page, index + 1);
				});
			});
		},
		set_echarts_item_color(data, num) {
			let that = this;
			that.city_arr.forEach((item) => {
				if (item.provinceName == data) {
					item.citys.forEach((dls) => {
						let obj = {};
						obj.name = dls.citysName;
						obj.itemStyle = {
							normal: {
								opacity: 0.8, // 透明度
								borderColor: '#8e8e8e', // 省份界线颜色
								borderWidth: 0.5, // 省份界线的宽度
								areaColor: that.c_arr[num], // 整个省份的颜色
							},
						};
						that.color_list.push(obj);
					});
				}
			});
		},
		getdalsit(sctyes, page, req_num) {
			let parmas = new Object();
			parmas.province = sctyes;
			parmas.page = page;
			node_distribute(parmas)
				.then((res) => {
					if (res.status == 0) {
						if (req_num == 1) {
							this.datalist = [];
						}
						this.datalist = this.datalist.concat(res.data.result);
						if (res.data.remaining == 0) {
							let city_node_num = 0;
							this.datalist.forEach((item, index) => {
								city_node_num += item[2];
							});

							let obj = {};
							obj.city = parmas.province;
							obj.num = city_node_num;
							this.subtitle.push(obj);
							if (req_num == this.city_num) {
								this.$nextTick(() => {
									this.set_echarts_two(this.datalist);
								});
							}
						} else {
							page++;
							this.getdalsit(sctyes, page);
						}
					} else {
						var data = [
							{
								name: '上海市', 
								value: [121.473662, 31.230372, 100]
							}, 
							{
								name: '南京市', 
								value: [118.796682, 32.05957, 80]
							}, 
							{
								name: '无锡市', 
								value: [120.31191, 31.491169, 70]
							}
						];
						// let lat = _.find(geoData.data, _.flow(
						// 	_.property('districts'),
						// 	_.partialRight(_.some, { id: 2 })
						// ));
						// let lon = _.filter(geoData.data, _.matchesProperty('name', '怀化市'));
						let dataS = _.filter(geoData.data, (item)=>{
							if(item.name == '武汉市'){
								return item
							}else{
								// console.log('item----->', _.find(item.districts, {name: '武汉市'}))
								let data = _.find(item.districts, {name: '武汉市'});
								return data;
							}
						})
						console.log('lon------>', dataS)
						var jinwei = dataS[0].districts.filter((item) => {return item.name=='武汉市'})[0].center;

						
						console.log('lon------>', jinwei)
						this.set_echarts_two(data);
						this.$message.error(res.err_msg);
					}
				})
				.catch((err) => {});
		},
		set_echarts_two(data_list) {
			let _this = this;
			let data = [];
			data = data_list;
			// data_list.forEach((item) => {
			// 	if(item.value[0] < item.value[1]){
			// 		toFirst(item, 1);
			// 	}
			// 	let obj = {};
			// 	obj.value = item;
			// 	data.push(obj);
			// });
			function toFirst(fieldData, index) {
				if (index != 0) {
					// fieldData[index] = fieldData.splice(0, 1, fieldData[index])[0]; 这种方法是与另一个元素交换了位子，

					fieldData.unshift(fieldData.splice(index, 1)[0]);
				}
			}
			//设置样式
			let myChartTwo = document.getElementById('new_echarts_two');
			let con_h =
				document.getElementsByClassName('content-container')[0]
					.offsetHeight -
				170 +
				'px';
			let resizeMyChartContainer = function() {
				myChartTwo.style.height = con_h;
			};
			resizeMyChartContainer();
			let option = {
				title: {
					text: _this.area,
					// subtext: _this.subtitle,
					// subtextStyle: {
					// 	color: '#8e8e8e',
					// 	fontSize: 14,
					// 	fontWeight: 300,
					// },
				},
				animation: false,
				tooltip: {
					trigger: 'axis',
					formatter: function(a) {
						let item_data = a.value[2];
						return a.name + '<br/>' + item_data;
					},
				},
				geo: [
					{
						map: _this.first_city,
						roam: false,
						zoom: 1,
						label: {
							normal: {
								show: false, //控制省市名称显示
								areaColor: '#ffffff',
								borderColor: '#111',
								textStyle: { color: '#6e6e6e', fontSize: 12 }, //字体颜色
							},
							emphasis: {
								show: false,
								textStyle: { color: '#fff' },
							},
						},
						itemStyle: {
							normal: {
								show: false,
								areaColor: '#ffffff',
								borderWidth: 1, //省份的边框宽度
								borderColor: '#8e8e8e', //边框颜色
							},
							emphasis: {
								show: false,
								areaColor: '#ffc21e', //鼠标悬浮颜色
							},
						},
					},
					{
						map: _this.first_city,
						roam: false,
						zoom: 1,
						regions: _this.color_list,
						itemStyle: {
							normal: {
								show: false,
								areaColor: '#ffffff',
								borderWidth: 0.3, //省份的边框宽度
								borderColor: '#C0C0C0', //边框颜色
							},
							emphasis: {
								show: false,
								areaColor: '#ffc21e', //鼠标悬浮颜色
							},
						},
					},
				],
				series: [
					{
						name: '',
						type: 'effectScatter',
						coordinateSystem: 'geo',
						zoom: 1,
						roam: false,
						geoIndex: 0,
						data: data.sort(function(a, b) {
							return b.value[2] - a.value[2];
						}),
						//控制散点的直径
						symbolSize: function(val) {
							if (val[2] <= 10) {
								return val[2] / 0.8;
							} else {
								return 23;
							}
						},
						showEffectOn: 'render',
						rippleEffect: {
							brushType: 'stroke',
						},
						hoverAnimation: true,
						label: {
							normal: {
								formatter: '{a}',
								position: 'right',
								show: false,
							},
						},
						itemStyle: {
							normal: {
								color: '#4285f4',
								shadowBlur: 3,
								shadowColor: '#05C3F9',
							},
						},
						zlevel: 1,
					},
				],
			};
			let myChart = echarts.init(myChartTwo);

			myChart.setOption(option);
			//地图的点击事件
			// myChart.on('click', function(params) {
			// 	console.log(params);
			// });
			myChart.on('mouseover', function(params) {
				// _this.city_name = params.name;
				let flag = params.value;
				// console.log(myChart.getOption());
				if (flag) {
					_this.node_num = flag[2];
					let event = params.event;
					let offsetx = event.offsetX;
					let offsety = event.offsetY;
					let imii = document.getElementById('alertmosewindowtital');
					imii.style.left = offsetx - 10 + 'px';
					imii.style.top = offsety - 50 + 'px';
					imii.style.display = 'inline';
					// }
				} else {
					document.getElementById(
						'alertmosewindowtital'
					).style.display = 'none';
					return;
				}
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.content {
	overflow: hidden;
	position: relative;
}
.next_title {
	position: absolute;
	top: 100px;
	left: 50px;
	div {
		text-align: left;
		display: flex;
		align-items: center;
		margin-top: 10px;
		.color_code {
			display: inline-block;
			width: 42px;
			height: 20px;
			background: burlywood;
			border-radius: 8px;
			margin-right: 10px;
		}
	}
}
#new_echarts_two {
	width: 100%;
	height: 800px;
	background: #ffffff;
}
#alertmosewindowtital {
	min-width: 150px;
	min-height: 40px;
	position: absolute;
	display: none;
	border-style: solid;
	white-space: nowrap;
	z-index: 9999999;
	transition: left 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s,
		top 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s;
	background-color: #05c4f978;
	border-width: 0px;
	border-color: rgb(51, 51, 51);
	border-radius: 4px;
	color: #333333;
	font: 18px/27px &quot;
	padding: 10px 20px;
	left: 745px;
	top: 73px;
	text-align: center;
	span {
		display: inline-block;
	}
}

#alertmosewindowtital:before,
#alertmosewindowtital:after {
	content: '';
	display: block;
	border-width: 15px 27px;
	position: absolute;
	bottom: -30px;
	left: 30px;
	border-style: dashed dashed dashed dashed;
	border-color: rgba(255, 255, 255, 0.3) transparent transparent
		rgba(255, 255, 255, 0.3);
	font-size: 0;
	line-height: 0;
}
#alertmosewindowtital:after {
	/*border-width: 10px 12px;*/
	border-width: 0;
	bottom: -20px;
	border-color: transparent transparent transparent transparent;
}
</style>
