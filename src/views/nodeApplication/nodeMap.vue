<template>
	<div class="content">
		<div class="top_search">
			<el-row>
				<el-col :span="5">
					<el-date-picker
						class="mapdateinput"
						v-model="time_value"
						type="daterange"
						range-separator="至"
						start-placeholder="开始日期"
						end-placeholder="结束日期"
						@change="seachuser()"
						:picker-options="endPickerOptions"
					>
					</el-date-picker>
				</el-col>
				<span>
					节点渠道商：
				</span>
				<el-select
					style="width: 8%;"
					v-model="searchdata.region1"
					placeholder="请选择一级渠道"
					@change="handleChangefirst($event)"
				>
					<el-option label="全部" value="*"></el-option>
					<el-option
						v-for="(item, index) in firstchan"
						:key="item.name + index"
						:label="item.name"
						:value="item.value"
					></el-option>
				</el-select>

				<el-select
					style="width: 8%;"
					v-model="searchdata.region2"
					placeholder="请选择二级渠道"
					@change="get_search()"
					:disabled="chil_disable"
				>
					<el-option label="全部" value="*"></el-option>
					<el-option
						v-for="(item, index) in secondchan"
						:key="item.value + index"
						:label="item.name"
						:value="item.value"
					></el-option>
				</el-select>

				<span>设备类型：</span>
				<el-select
					style="width: 8%;"
					v-model="searchdata.region3"
					placeholder="请选设备类型"
					@change="get_search()"
				>
					<el-option label="全部" value="*"></el-option>
					<el-option
						v-for="(item, index) in device_type"
						:key="item.name + index"
						:label="item.name"
						:value="item.name"
					></el-option>
				</el-select>

				<span>区域：</span>
				<el-cascader
					style="width: 8%;"
					placeholder="请选择区域"
					v-model="searchdata.region4"
					:options="citylist"
					@change="provinceChange"
				></el-cascader>
			</el-row>
		</div>
		<div class="nodemap_echarts">
			<div
				id="myChartChina"
				:style="{ width: '100%', height: echartsHeight }"
			></div>
			<!-- <div>
				<ol>
					<li class="tab_title">
						<div
							class="conname_tit"
							v-for="(item, index) in dev_ytpe_list"
							:key="index + item"
						>
							{{ item }}
						</div>
					</li>
					<li v-for="(item, index) in maplist" :key="index">
						<div
							class="conname"
							v-for="(xitem, index) in item.data"
							:key="index + 's' + xitem"
						>
							{{ xitem }}
						</div>
					</li>
				</ol>
			</div> -->
		</div>
		<div class="el_tab">
			<el-table
				:data="maplist"
				:cell-style="rowClass"
				:header-cell-style="headClass"
				style="width: 100%"
				fixed
				:height="tableHeight"
				@cell-click="clicktan"
			>
				<el-table-column
					v-for="(item, key) in dev_ytpe_lists"
					:key="key"
					:prop="item.value"
					:label="item.name"
					:width="item.width"
					:fixed="item.name == '省市' ? true : false"
				>
					<template slot="header">{{ item.name }}</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
import {
	query_ipfs_node_region_dist,
	get_nodetype_enum,
	node_countinfo,
} from '@/servers/api';
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
			maplist: [
				// {
				// 	name: '湖北',
				// 	value: 56,
				// 	yunconut: 33,
				// 	xiyoucount: 20,
				// 	roujiconut: 3,
				// },
				// {
				// 	name: '青海',
				// 	value: 253,
				// 	yunconut: 129,
				// 	xiyoucount: 84,
				// 	roujiconut: 40,
				// },
				// {
				// 	name: '贵州',
				// 	value: 1253,
				// 	yunconut: 129,
				// 	xiyoucount: 84,
				// 	roujiconut: 40,
				// },
			],
			chil_disable: true,
			searchdata: {
				region1: '*',
				region2: '*',
				region3: '*',
				region4: '*',
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
			sheng_list: [],
			dev_ytpe_list: [],
			dev_ytpe_lists: [],
			echartsHeight: 0,
			tableHeight: 0,
			con_w: 0,
		};
	},
	mounted() {
		this.$nextTick(() => {
			this.con_w = document.getElementsByClassName(
				'content-container'
			)[0].offsetWidth;

			let con_he =
				document.getElementsByClassName('content-container')[0]
					.offsetHeight / 2-24;
			this.echartsHeight = con_he + 'px';
			this.tableHeight = con_he - 66 + 'px';
		});
		this.starttime =
			new Date(new Date().toLocaleDateString()).getTime() / 1000;
		this.endtime = parseInt(new Date().getTime() / 1000);

		this.getdata(0);
		//this.drawLine();
		// this.get_search_data();
	},
	methods: {
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
		provinceChange() {
			this.getdata(0);
		},
		seachuser() {
			if (this.time_value != null && this.time_value != '') {
				this.starttime = setbatime(this.time_value[0]);
				this.endtime = setbatime(this.time_value[1]);
				this.getdata(0);
			} else {
			}
		},
		handleChangefirst(val) {
			if (val == '*' || val == '') {
				this.chil_disable = true;
				this.searchdata.region2 = '';
				this.secondchan = [];
			} else {
				this.firstchan.find((item) => {
					if (item.value === val) {
						//筛选出匹配数据
						this.secondchan = item.secondchan;
						this.chil_disable = false;
					} else {
						this.chil_disable = true;
					}
				});
			}
			this.getdata(0);
		},
		get_search() {
			this.getdata(0);
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
				.catch((error) => {});
		},
		leijiasum(arr) {
			var s = 0;
			for (var i = arr.length - 1; i >= 0; i--) {
				s += arr[i];
			}
			return s;
		},
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
								// objsd.width =
								// 	this.con_w / res.data.nodeType.length;
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
		// 表头样式设置
		headClass() {
			return 'text-align: center;background:#F3F6FB;';
		},
		// 表格样式设置
		rowClass() {
			return 'text-align: center;';
		},
		drawLine() {
			var _this = this;
			// 基于准备好的dom，初始化echarts实例
			var myChartContainer = document.getElementById('myChartChina');
			var resizeMyChartContainer = function() {
				myChartContainer.style.width =
					document.body.offsetWidth - 420 + 'px'; //页面一半的大小
			};
			resizeMyChartContainer();
			var myChartChina = this.$echarts.init(myChartContainer);

			function randomData() {
				return Math.round(Math.random() * 500);
			}
			// 绘制图表
			var optionMap = {
				title: {
					text: '全国节点分布',
					x: 'center',
					padding: 50,
				},
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
	},
};
</script>

<style lang="scss" scoped>
.content {
	background-color: #f6f6f6;
	box-sizing: border-box;
	padding: 14px 24px;
	overflow: hidden;
}
.top_search {
	text-align: left;
	margin-top: 20px;
	margin-bottom: 20px;
	width: 100%;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	display: none;
	// span {
	// 	margin-left: 20px;
	// }
	// span:nth-child(1) {
	// 	margin-left: 0;
	// }
}
.nodemap_echarts {
	background-color: #ffffff;
	border-radius: 8px;
	box-shadow: 0px 4px 10px 0px rgba(51, 51, 51, 0.04);
}
.el_tab {
	width: 100%;
	margin-top:14px;
	background-color: #ffffff;
	border-radius: 8px;
	box-sizing: border-box;
	padding: 30px;
	box-shadow: 0px 4px 10px 0px rgba(51, 51, 51, 0.04);
}
</style>
