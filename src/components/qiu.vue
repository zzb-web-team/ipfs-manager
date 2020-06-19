<template>
	<div>
		<div :id="echarts" :style="{ width: '100px', height: '100px' }"></div>
	</div>
</template>

<script>
import 'echarts-liquidfill/src/liquidFill.js'; //在这里引入
import echarts from 'echarts';
export default {
	name: 'yuanqiu',
	data() {
		return {
			num: [],
		};
	},
	props: {
		cap: {
			type: Number,
			default: () => {},
		},
	},
	mounted() {
		this.num = [];
		this.num.push(this.cap);
		this.echartsMit();
	},
	computed: {
		echarts() {
			return 'echarts' + Math.random() * 100000;
		},
	},
	methods: {
		// 绘制指标图
		echartsMit() {
			var dom = document.getElementById(this.echarts);
			var myChart = echarts.init(dom);
			myChart.setOption({
				series: [
					{
                        type: 'liquidFill',
                        radius:"68%",
						data: this.num,
						color: ['#2FD8FF', '#FF3CB7'],
						itemStyle: {
							shadowBlur: 0,
						},
						outline: {
							borderDistance: 0,
							itemStyle: {
								borderWidth: 3,
								borderColor: '#92929210',
								shadowBlur: 20,
							},
						},
						label: {
							normal: {
								textStyle: {
									color: '#2FD8FF',
									insideColor: 'yellow',
									fontSize: 20,
								},
							},
						},
						color: [
							{
								type: 'linear',
								x: 1,
								y: 0,
								x2: 0,
								y2: 0,
								colorStops: [
									{
										offset: 1,
										color: ['#2FD8FF'], // 0% 处的颜色
									},
									{
										offset: 0,
										color: ['#FF3CB7'], // 100% 处的颜色
									},
								],
								global: false, // 缺省为 false
							},
						],
					},
				],
			});
		},
	},
};
</script>

<style></style>
