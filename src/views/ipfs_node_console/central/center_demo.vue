<template>
	<div class="content">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item>
				<a>新节点分布</a>
			</el-breadcrumb-item>
		</el-breadcrumb>
		<div id="new_echarts_two"></div>
	</div>
</template>

<script>
import echarts from 'echarts';
import '../../../../static/huazhong.js';
export default {
	data() {
		return {};
	},
	mounted() {
		this.set_echarts_two();
	},
	methods: {
		set_echarts_two() {
			let _this = this;
			//设置样式
			let myChartTwo = document.getElementById('new_echarts_two');
			let con_h =
				document.getElementsByClassName('content-container')[0]
					.offsetHeight -
				40 +
				'px' +
				' ' +
				'!important';
			let resizeMyChartContainer = function() {
				myChartTwo.style.width = con_h;
			};
			resizeMyChartContainer();
			var data = [
				{
					name: '武汉市',
					value: [114.298572, 30.584355, 15],
				},
				{
					name: '十堰市',
					value: [110.785239, 32.647017, 106],
				},
				{
					name: '吉安市',
					value: [114.97598, 27.10669, 3],
				},
				{
					name: '南阳市',
					value: [112.540918, 32.999082, 115],
				},
				{
					name: '怀化市',
					value: [109.97824, 27.550082, 96],
				},
				{
					name: '郴州市',
					value: [113.032067, 25.793589, 33],
				},
			];
			let option = {
				title: {
					text: '华南地图',
					// subtext: '-。-',
				},
				tooltip: {
					trigger: 'item',
					formatter: function(a) {
						// console.log(a);
						let item_data = a.value[2];
						// if (isNaN(a.value) == true) {
						// 	item_data = 0;
						// } else {
						// 	item_data = a.value[2];
						// }
						return a.name + '<br/>' + item_data;
					},
				},
				geo: {
					map: '河南',
					roam: true,
					label: {
						normal: {
							show: true,
							areaColor: '#ffffff',
							borderColor: '#111',
							textStyle: { color: '#8e8e8e' }, //字体颜色
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
							borderColor: '#111111', //边框颜色
						},
						emphasis: {
							show: false,
							areaColor: '#ffc21e', //鼠标悬浮颜色
						},
					},
				},
				series: [
					// {
					// 	name: '数据名称',
					// 	type: 'map',
					// 	mapType: '河南', //改成对应省份名
					// 	selectedMode: 'single',
					// 	center: [114.298572, 30.584355],
					// 	zoom: 1.3,
					// 	roam: true, //是否开启平游或缩放
					// 	scaleLimit: {
					// 		//滚轮缩放的极限控制
					// 		min: 0.5,
					// 		max: 12,
					// 	},
					// 	itemStyle: {
					// 		normal: {
					// 			label: { show: true },
					// 			// borderWidth: 2, //省份的边框宽度
					// 			// borderColor: '#c9c9c9', //省份的边框颜色
					// 			// color: '#ffffff', //地图的背景颜色
					// 			// areaStyle: { color: '#ffffff' }, //设置地图颜色
					// 			areaColor: '#ffffff', //默认背景色
					// 		},
					// 		emphasis: {
					// 			label: { show: true },
					// 			areaColor: '#ffc21e',
					// 		}, //鼠标悬浮颜色
					// 		label: {
					// 			normal: {
					// 				show: true,
					// 			},
					// 			emphasis: {
					// 				show: true,
					// 			},
					// 		},
					// 	},
					// 	label: {
					// 		normal: {
					// 			textStyle: {
					// 				fontSize: 10,
					// 				fontWeight: 'none',
					// 				color: '#c2c2c2', //字体颜色
					// 			},
					// 		},
					// 	},
					// 	// data: [
					// 	// 	{
					// 	// 		name: '武汉市',
					// 	// 		value: [114.298572, 30.584355, 15],
					// 	// 	},
					// 	// ],
					// 	data: convertData([{ name: '南宁医院', value: 9 }]),
					// },
					{
						name: '分布',
						type: 'scatter',
						coordinateSystem: 'geo',
						data: data,
						encode: {
							value: 2,
						},
						symbolSize: 12,
						label: {
							normal: {
								show: false, //显示市区标签
								textStyle: { color: '#c71585' }, //省份标签字体颜色
							},
							emphasis: {
								//对应的鼠标悬浮效果
								show: true, //关闭文字 （这东西有问题得关）
								textStyle: { color: '#800080' },
							},
						},
						itemStyle: {
							normal: {
								borderWidth: 0.5, //区域边框宽度
								borderColor: '#009fe8', //区域边框颜色
								areaColor: '#ffefd5', //区域颜色
							},
							emphasis: {
								show: true,
								borderWidth: 0.5,
								borderColor: '#4b0082',
								areaColor: '#f47920',
							},
						},
					},
					{
						name: 'Top 5',
						type: 'effectScatter',
						coordinateSystem: 'geo',
						data: data.sort(function(a, b) {
							return b.value[2] - a.value[2];
						}),
						symbolSize: function(val) {
							return val[2] / 5;
						},
						showEffectOn: 'render',
						rippleEffect: {
							brushType: 'stroke',
						},
						hoverAnimation: true,
						label: {
							normal: {
								formatter: '{b}',
								position: 'right',
								show: true,
							},
						},
						itemStyle: {
							normal: {
								color: '#1572e8',
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
			myChart.on('click', function(params) {
				console.log(params);
			});
		},
	},
};
</script>

<style lang="scss" scoped>
#new_echarts_two {
	width: 100%;
	height: 800px;
	background: #ffffff;
}
</style>
