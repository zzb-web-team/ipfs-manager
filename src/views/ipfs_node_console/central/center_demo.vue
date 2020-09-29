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
import { query_node, node_distribute } from '../../../servers/api';
export default {
	data() {
		return {
			datalist: [],
			page: 0,
			citylist: ['河南', '湖北', '湖南'],
		};
	},
	mounted() {
		this.citylist.forEach((item) => {
			this.getdalsit(item, this.page);
		});
	},
	methods: {
		getdalsit(sctyes, page) {
			let parmas = new Object();
			parmas.province = sctyes;
			parmas.page = page;
			node_distribute(parmas)
				.then((res) => {
					if (res.status == 0) {
						if (res.data.total > 0) {
							if (parmas.page == 0) {
								this.datalist = [];
							}
							this.datalist = this.datalist.concat(
								res.data.result
							);

							if (res.data.remaining == 0) {
								this.$nextTick(() => {
									this.set_echarts_two(this.datalist);
								});
							} else {
								page++;
								this.getdalsit(sctyes, page);
							}
						}
					} else {
						this.$message.error(res.err_msg);
					}
				})
				.catch((err) => {});
		},
		set_echarts_two(data_list) {
			let _this = this;
			let data = [];
			data_list.forEach((item) => {
				toFirst(item, 1);
				let obj = {};
				obj.value = item;
				data.push(obj);
			});
			function toFirst(fieldData, index) {
				if (index != 0) {
					// fieldData[index] = fieldData.splice(0, 1, fieldData[index])[0]; 这种方法是与另一个元素交换了位子，

					fieldData.unshift(fieldData.splice(index, 1)[0]);
				}
			}
			console.log(data);
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
			let option = {
				title: {
					text: '华南地图',
					// subtext: '-。-',
				},
				tooltip: {
					trigger: 'item',
					formatter: function(a) {
						let item_data = a.value[2];
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
					{
						name: 'Top 5',
						type: 'effectScatter',
						coordinateSystem: 'geo',
						data: data.sort(function(a, b) {
							return b.value[2] - a.value[2];
						}),
						symbolSize: function(val) {
							return val[2] / 0.5;
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
			// myChart.on('mouseover', function(params) {
			// 	console.log(params);
			// });
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
