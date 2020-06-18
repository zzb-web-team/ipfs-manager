<template>
	<div class="content" ref="luckDraw">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item>
				<a>节点数据监控</a>
			</el-breadcrumb-item>
		</el-breadcrumb>
		<!--  -->
		<div
			style="margin-top: 20px;margin-bottom: 20px;display: flex;justify-content: space-between;"
		>
			<el-radio-group
				v-model="searchdata.tabname"
				@change="change_tab"
				size="small"
			>
				<el-radio-button label="first">带宽</el-radio-button>
				<el-radio-button label="second">存储空间</el-radio-button>
				<el-radio-button label="third">节点质量</el-radio-button>
			</el-radio-group>
			<div>
				<el-radio-group
					v-model="searchdata.radio"
					@change="set_time"
					size="small"
				>
					<el-radio-button label="1">今天</el-radio-button>
					<el-radio-button label="2">昨天</el-radio-button>
					<el-radio-button label="3">近7天</el-radio-button>
					<el-radio-button label="4">近30天</el-radio-button>
					<el-radio-button label="5">自定义</el-radio-button>
				</el-radio-group>
				<el-date-picker
					size="small"
					style="margin-left: 10px;"
					v-show="show_time"
					v-model="searchdata.value1"
					type="datetimerange"
					range-separator="至"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
				>
				</el-date-picker>
			</div>
		</div>
		<div style="margin-top:10px;">
			<el-tabs
				class="data_monit"
				v-model="activeName"
				@tab-click="handleClick"
			>
				<el-row style="margin-top:10px;" v-show="activeName == 'third'">
					<el-col :span="2">
						<el-select
							size="small"
							@change="lastchange()"
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
				<el-row :gutter="20">
					<el-col :span="2"
						><el-input
							size="small"
							v-model="searchdata.input"
							placeholder="请输入节点ID"
							prefix-icon="el-icon-search"
						></el-input
					></el-col>
					<el-col :span="2"
						><el-select
							size="small"
							v-model="searchdata.region1"
							placeholder="请选择一级渠道"
							><el-option label="全部" value="*"></el-option
							><el-option
								label="区域二"
								value="beijing"
							></el-option></el-select
					></el-col>
					<el-col :span="2"
						><el-select
							size="small"
							v-model="searchdata.region2"
							placeholder="请选择二级渠道"
						>
							<el-option label="全部" value="*"></el-option>
							<el-option
								label="区域二"
								value="beijing"
							></el-option> </el-select
					></el-col>
					<el-col :span="2"
						><el-select
							size="small"
							v-model="searchdata.region3"
							placeholder="请选设备类型"
						>
							<el-option label="全部" value="*"></el-option>
							<el-option
								label="区域二"
								value="beijing"
							></el-option> </el-select
					></el-col>
					<el-col :span="2" v-show="seacr_yin_show"
						><el-select
							size="small"
							v-model="searchdata.region6"
							placeholder="请选择设备类型"
						>
							<el-option label="全部" value="*"></el-option>
							<el-option
								label="区域二"
								value="beijing"
							></el-option> </el-select
					></el-col>
					<el-col :span="2" v-show="seacr_yin_show"
						><el-select
							size="small"
							v-model="searchdata.region6"
							placeholder="请选择硬件类型"
						>
							<el-option label="全部" value="*"></el-option>
							<el-option
								label="区域二"
								value="beijing"
							></el-option> </el-select
					></el-col>
					<el-col :span="2"
						><el-select
							size="small"
							v-model="searchdata.region4"
							placeholder="请选择区域"
						>
							<el-option label="全部" value="*"></el-option>
							<el-option
								label="区域二"
								value="beijing"
							></el-option> </el-select
					></el-col>
					<el-col :span="2"
						><el-select
							size="small"
							v-model="searchdata.region5"
							placeholder="请选择城市"
						>
							<el-option label="全部" value="*"></el-option>
							<el-option
								label="区域二"
								value="beijing"
							></el-option> </el-select
					></el-col>
					<el-col :span="2"
						><el-select
							size="small"
							v-model="searchdata.region6"
							placeholder="请选择运营商"
						>
							<el-option label="全部" value="*"></el-option>
							<el-option
								label="区域二"
								value="beijing"
							></el-option> </el-select
					></el-col>

					<!-- <el-col :span="5">
						<el-radio-group
							v-model="searchdata.radio"
							@change="set_time"
						>
							<el-radio-button label="1">今天</el-radio-button>
							<el-radio-button label="2">昨天</el-radio-button>
							<el-radio-button label="3">近7天</el-radio-button>
							<el-radio-button label="4">近30天</el-radio-button>
							<el-radio-button label="5">自定义</el-radio-button>
						</el-radio-group>
					</el-col> -->
				</el-row>

				<el-tab-pane label="带宽" name="first">
					<el-row>
						<el-col :span="24" class="top_title"
							><div>
								<p>50.00Mbps/60.25Mbps</p>
								<p>节点带宽峰值（上/下行）</p>
							</div>
							<div>
								<p>26.37Mbps/30.25Mbps</p>
								<p>节点带宽平均值（上/下行）</p>
							</div></el-col
						>
					</el-row>
					<div style="text-align:left;width: 80%;margin-bottom: 40px;">
						<el-radio-group v-model="radio1" size="mini">
							<el-radio-button label="1"
								>上行带宽</el-radio-button
							>
							<el-radio-button label="2"
								>下行带宽</el-radio-button
							>
						</el-radio-group>
					</div>

					<div id="firstChart" style=" height:500px;width:100%"></div>
				</el-tab-pane>
				<el-tab-pane label="存储空间" name="second">
					<el-row>
						<el-col :span="24" class="top_title"
							><div>
								<p>320GB</p>
								<p>节点可用存储空间</p>
							</div>
							<div>
								<p>530GB</p>
								<p>节点总存储空间</p>
							</div></el-col
						>
					</el-row>
					<div id="secondChart" style="height:500px;width:100%"></div>
				</el-tab-pane>
				<el-tab-pane label="节点质量" name="third">
					<el-row>
						<el-col :span="24" class="top_title top_title_third"
							><div>
								<p>30ms</p>
								<p>平均值</p>
							</div>
							<div>
								<p>35ms</p>
								<p>最大值</p>
							</div>
							<div>
								<p>10ms</p>
								<p>35ms</p>
							</div></el-col
						>
					</el-row>
					<div
						id="ping_ms"
						style="height:500px;width:100%"
						v-show="searchdata.echartslist == 1"
					></div>
					<div
						id="tid"
						style="height:500px;width:100%"
						v-show="searchdata.echartslist == 2"
					></div>
					<div
						id="etf"
						style="height:500px;width:100%"
						v-show="searchdata.echartslist == 3"
					></div>
					<div
						id="lt"
						style="height:500px;width:100%"
						v-show="searchdata.echartslist == 4"
					></div>
					<div
						id="itf"
						style="height:500px;width:100%"
						v-show="searchdata.echartslist == 5"
					></div>
					<div
						id="otf"
						style="height:500px;width:100%"
						v-show="searchdata.echartslist == 6"
					></div>
					<div
						id="rcnt"
						style="height:500px;width:100%"
						v-show="searchdata.echartslist == 7"
					></div>
					<div
						id="cpu"
						style="height:500px;width:100%"
						v-show="searchdata.echartslist == 8"
					></div>
					<div
						id="ram"
						style="height:500px;width:100%"
						v-show="searchdata.echartslist == 9"
					></div>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script>
import { get_nodetype_enum } from '@/servers/api';
import echarts from 'echarts';
export default {
	data() {
		return {
			activeName: 'first',
			radio1: '1',
			_width: '',
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
			searchdata: {
				tabname: 'first',
				echartslist: '1',
				input: '',
				region1: '',
				region2: '',
				region3: '',
				region4: '',
				region5: '',
				region6: '',
				region7: '',
				region8: '',
				radio: '1',
				value1: '',
			},
			show_time: false,
			seacr_yin_show: false,
		};
	},
	mounted() {
		this._width = this.$refs.luckDraw.offsetWidth - 60;
		console.log(this._width);
		this.firstsharts();
	},
	methods: {
		get_search_data() {
			let params = new Object();
			get_nodetype_enum(params)
				.then((res) => {
					console.log(res);
					if (res.status == 0) {
					} else {
						this.$message.error(res.err_msg);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		},
		change_tab() {
            this.activeName = this.searchdata.tabname;
            if (this.activeName == 'third') {
				this.seacr_yin_show = true;
				this.lastsharts('ping_ms', 'PING_MS');
			} else {
				this.seacr_yin_show = false;
				if (this.activeName == 'first') {
					this.$nextTick(this.firstsharts());
				} else if (this.activeName == 'second') {
					this.$nextTick(this.secondsharts());
				}
			}
		},
		handleClick(tab, event) {
			if (this.activeName == 'third') {
				this.seacr_yin_show = true;
				this.lastsharts('ping_ms', 'PING_MS');
			} else {
				this.seacr_yin_show = false;
				if (this.activeName == 'first') {
					this.$nextTick(this.firstsharts());
				} else if (this.activeName == 'second') {
					this.$nextTick(this.secondsharts());
				}
			}
		},
		set_time() {
			console.log(this.searchdata.radio);
			if (this.searchdata.radio == '5') {
				this.show_time = true;
			} else {
				this.show_time = false;
			}
		},
		lastchange() {
			if (this.searchdata.echartslist == 1) {
				this.lastsharts('ping_ms', 'PING_MS');
			} else if (this.searchdata.echartslist == 2) {
				this.lastsharts('tid', 'TID');
			} else if (this.searchdata.echartslist == 3) {
				this.tiredsharts('etf', 'ETF（错误率）');
			} else if (this.searchdata.echartslist == 4) {
				this.tiredsharts('lt', 'LT（失联计数）');
			} else if (this.searchdata.echartslist == 5) {
				this.tiredsharts('itf', 'ITF（在线率）');
			} else if (this.searchdata.echartslist == 6) {
				this.tiredsharts('otf', 'OTF（离线率）');
			} else if (this.searchdata.echartslist == 7) {
				this.tiredsharts('rcnt', 'RCNT（重连计数）');
			} else if (this.searchdata.echartslist == 8) {
				this.tiredsharts('cpu', 'CPU占用率');
			} else if (this.searchdata.echartslist == 9) {
				this.tiredsharts('ram', '内存占用率');
			}
		},
		firstsharts() {
			var dataCount = 2e3;
			var data = generateData(dataCount);
			var maxnum = getMaximin(data.valueData, 'max');
			var minnum = getMaximin(data.valueData, 'min');
			let chartdom = document.getElementById('firstChart');
			chartdom.style.width = this._width + 'px';
			let myChart = echarts.init(chartdom); //这里是为了获得容器所在位置
			window.onresize = myChart.resize;
			let options = {
				title: {
					text: '带宽',
					left: 10,
				},
				toolbox: {
					feature: {
						saveAsImage: {
							pixelRatio: 2,
						},
					},
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						label: {
							backgroundColor: '#409EFF',
						},
					},
				},
				grid: {
					bottom: 90,
				},

				xAxis: {
					data: data.categoryData,
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
				},
				series: [
					{
						type: 'bar',
						data: data.valueData,
						// Set `large` for large data amount
						large: true,
						markPoint: {
							data: [
								{ type: 'max', name: '最大值' },
								{ type: 'min', name: '最小值' },
							],
							label: {
								normal: {
									formatter: '{c}',
									color: '#ffffff',
								},
							},
							itemStyle: { color: '#409EFF' },
						},
						itemStyle: {
							normal: {
								color: '#409EFF',
								// color: function(params) {
								// 	var colorList = ['#409EFF', 'red', 'green'];
								// 	if (params.data == minnum) {
								// 		console.log(params.data);
								// 		return colorList[2];
								// 	} else if (params.data == maxnum) {
								// 		console.log(params.data);
								// 		return colorList[1];
								// 	} else {
								// 		return colorList[0];
								// 	}
								// },
							},
						},
					},
				],
			};
			function generateData(count) {
				var baseValue = Math.random() * 1000;
				var time = +new Date(2011, 0, 1);
				var smallBaseValue;

				function next(idx) {
					smallBaseValue =
						idx % 30 === 0
							? Math.random() * 700
							: smallBaseValue + Math.random() * 500 - 250;
					baseValue += Math.random() * 20 - 10;
					return Math.max(
						0,
						Math.round(baseValue + smallBaseValue) + 3000
					);
				}

				var categoryData = [];
				var valueData = [];

				for (var i = 0; i < count; i++) {
					categoryData.push(
						echarts.format.formatTime('yyyy-MM-dd\nhh:mm:ss', time)
					);
					valueData.push(next(i).toFixed(0));
					time += 1000;
				}

				return {
					categoryData: categoryData,
					valueData: valueData,
				};
			}
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
			myChart.setOption(options);
		},

		secondsharts() {
			console.log(this._width);
			let chartdom2 = document.getElementById('secondChart');
			chartdom2.style.width = this._width + 'px';
			let myChart2 = echarts.init(chartdom2);
			window.onresize = myChart2.resize;
			let options = {
				title: {
					text: '存储空间',
					left: 10,
				},
				xAxis: {
					type: 'category',
					data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
				},
				yAxis: {
					type: 'value',
				},
				toolbox: {
					feature: {
						saveAsImage: {
							pixelRatio: 2,
						},
					},
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						label: {
							backgroundColor: '#6a7985',
						},
					},
				},
				series: [
					{
						data: [820, 932, 901, 934, 1290, 1330, 1320],
						type: 'line',
						smooth: true,
						itemStyle: { color: '#409EFF' },
					},
				],
			};
			myChart2.setOption(options);
		},
		tiredsharts(id, titlename, xdata, ydata) {
			let sa = true;
			if (id == 'itf' || id == 'otf') {
				sa = false;
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
				xAxis: {
					type: 'category',
					data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
				},
				yAxis: {
					type: 'value',
				},
				toolbox: {
					feature: {
						saveAsImage: {
							pixelRatio: 2,
						},
					},
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						label: {
							backgroundColor: '#6a7985',
						},
					},
				},
				series: [
					{
						data: [820, 932, 901, 934, 1290, 1330, 1320],
						type: 'line',
						smooth: sa,
						itemStyle: { color: '#409EFF' },
					},
				],
			};
			myChart2.setOption(options);
		},
		lastsharts(id, titlename, xdata, ydata) {
			let chartdom2 = document.getElementById(id);
			chartdom2.style.width = this._width + 'px';
			let myChart2 = echarts.init(chartdom2);
			window.onresize = myChart2.resize;
			let options = {
				title: {
					text: titlename,
					left: 10,
				},
				xAxis: {
					type: 'category',
					data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
				},
				yAxis: {
					type: 'value',
				},
				toolbox: {
					feature: {
						saveAsImage: {
							pixelRatio: 2,
						},
					},
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						label: {
							backgroundColor: '#6a7985',
						},
					},
				},
				series: [
					{
						data: [820, 932, 901, 934, 1290, 1330, 1320],
						type: 'bar',
						smooth: true,
						itemStyle: { color: '#409EFF' },
					},
				],
			};
			myChart2.setOption(options);
		},
	},
};
</script>

<style lang="scss" scoped>
.content {
	text-align: left;
	.el-col {
		margin-bottom: 20px;
	}
	.top_title {
        height: 120px;
		margin-top: 20px;
		margin-bottom: 20px;
		padding: 20px;
		box-sizing: border-box;
		display: flex;
		justify-content: space-around;
		color: #ffffff;
		background: linear-gradient(
			90deg,
			rgba(100, 167, 252, 1) 0%,
			rgba(100, 167, 252, 1) 100%
		);
		border-radius: 8px;
		div {
			width: 50%;
			text-align: center;
			p:nth-child(1) {
				margin-top: 6px;
				font-size: 38px;
			}
			p:nth-child(2) {
				font-size: 14px;
				line-height: 30px;
			}
		}
		div:nth-child(1) {
			border-right: 1px solid #ffffff50;
		}
	}
	.top_title_third {
		div {
			width: 33%;
		}
		div:nth-child(2) {
			border-right: 1px solid #ffffff50;
		}
	}
}
</style>
