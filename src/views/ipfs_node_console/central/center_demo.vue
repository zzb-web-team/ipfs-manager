<template>
	<div class="content">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item>
				<a>新节点分布</a>
			</el-breadcrumb-item>
		</el-breadcrumb>
		<div id="new_echarts_map"></div>
		<div id="new_echarts_two"></div>
	</div>
</template>

<script>
import axios from 'axios';
import echarts from 'echarts';
export default {
	data() {
		return {
			citydata: [],
		};
	},
	filters: {},
	computed: {},
	mounted() {
		this.getJson();
	},
	methods: {
		getJson() {
			axios.get('./static/china.json').then((res) => {
				this.citydata = res.data;
				this.set_echarts(this.citydata);
				this.set_echarts_two();
			});
		},
		set_echarts(chinaJson) {
			//设置样式
			var myChartContainer = document.getElementById('new_echarts_map');
			var con_h =
				document.getElementsByClassName('content-container')[0]
					.offsetHeight -
				40 +
				'px' +
				' ' +
				'!important';
			var resizeMyChartContainer = function() {
				myChartContainer.style.width = con_h;
			};
			resizeMyChartContainer();

			var mergeProvinces = function(chinaJson, names, properties) {
				var features = chinaJson.features;
				var polygons = [];
				// 将指定省的polygon保存下来，并将省的数据从地图中删除
				for (var i = 0, iLen = names.length; i < iLen; i++) {
					for (var j = 0, jLen = features.length; j < jLen; j++) {
						if (features[j].properties.name == names[i]) {
							polygons = polygons.concat(
								features[j].geometry.coordinates
							);
							features.splice(j, 1);
							break;
						}
					}
				}
				// 构建新的合并区域
				var feature = {
					type: 'Feature',
					id: '' + features.length,
					properties: {
						name: properties.name || '',
					},
					geometry: {
						type: 'Polygon',
						coordinates: polygons,
					},
				};
				if (properties.cp) {
					feature.properties.cp = properties.cp;
				}

				// 将新的合并区域添加到地图中
				features.push(feature);
				console.log(feature.geometry);
			};

			//要合并同一区域的省
			var params = {
				names: ['山东省', '江苏省', '浙江省'],
				properties: {
					name: '东部区域',
					cp: [119.553222, 33.724339],
				},
			};

			mergeProvinces(chinaJson, params.names, params.properties);

			echarts.registerMap('china', chinaJson);

			var myChartChina = echarts.init(myChartContainer);

			myChartChina.setOption({
				series: [
					{
						type: 'map',
						map: 'china',
						zoom: 2, //当前视角的缩放比例
						roam: true, //是否开启平游或缩放
						scaleLimit: {
							//滚轮缩放的极限控制
							min: 1,
							max: 3,
						},
					},
				],
			});
		},
		set_echarts_two() {
			var _this = this;
			//设置样式
			var myChartTwo = document.getElementById('new_echarts_two');
			var con_h =
				document.getElementsByClassName('content-container')[0]
					.offsetHeight -
				40 +
				'px' +
				' ' +
				'!important';
			var resizeMyChartContainer = function() {
				myChartTwo.style.width = con_h;
			};
			resizeMyChartContainer();
			axios.get('./static/HK.json').then((res) => {
                console.log(res.data.city);
				res.data.city.forEach((item, i) => {
					if (item.name != '青海省') {
						res.data.city.splice(i, 1); //在数组的some方法中，如果return true，就会立即终止这个数组的后续循环
					}
				});
				_this.$nextTick(() => {
					
					echarts.registerMap('青海省', res.data);
					var two_chart = echarts.init(myChartTwo);

					two_chart.setOption({
						series: [
							{
								type: 'map',
								map: '青海省',
							},
						],
					});
				});
			});
		},
	},
};
</script>

<style lang="scss" scoped>
#new_echarts_map,
#new_echarts_two {
	width: 100%;
	height: 800px;
}
</style>
