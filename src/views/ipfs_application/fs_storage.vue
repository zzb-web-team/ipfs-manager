<template>
	<div class="content">
		<!-- 头部 -->
		<div class="bread_crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>
					<a href="/">FS存储</a>
				</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<!-- 搜索 -->
		<div class="seach">
			<div class="seach_top">
				<el-input
					placeholder="内容id，节点id"
					v-model="input"
					class="input-with-select"
					@keyup.enter.native="seachuser()"
				>
					<i
						slot="suffix"
						class="el-input__icon el-icon-search"
						@click="seachuser()"
					></i>
				</el-input>
				<div class="seach_top_right" @click="option_display()">
					筛选
					<i
						class="el-icon-caret-bottom"
						:class="[
							rotate
								? 'fa fa-arrow-down go'
								: 'fa fa-arrow-down aa',
						]"
					></i>
				</div>
			</div>
			<div v-if="optiondisplay" class="seach_bottom">
				<span>业务类型：</span>
				<el-select
					v-model="busvalue"
					placeholder="请选择业务类型"
					@change="seachuser()"
				>
					<el-option label="全部" value="*"></el-option>
					<el-option label="点播加速" value="0"></el-option>
					<el-option
						label="直播加速"
						value="1"
						:disabled="true"
					></el-option>
				</el-select>
				<span>业务场景及用途：</span>
				<el-select
					v-model="scenevalue"
					:disabled="scenedis"
					placeholder="请选择业务场景及用途"
					@change="seachuser()"
				>
					<el-option label="全部" value="*"></el-option>
					<el-option
						label="分发加速播放-内容缓存"
						value="0"
					></el-option>
					<el-option
						v-show="busvalue == 0"
						label="内容预热-内容缓存"
						value="2"
					></el-option>
					<el-option
						v-show="busvalue == 0"
						label="缓存刷新-内容缓存"
						value="3"
					></el-option>
				</el-select>
				<span>节点渠道商：</span>
				<el-select
					v-model="firatvalue"
					placeholder="请选择一级渠道商"
					@change="handleChangefirst($event)"
				>
					<el-option label="全部" value="*"></el-option>
					<el-option
						v-for="item in firstchan"
						:key="item.name"
						:label="item.name"
						:value="item.value"
					></el-option>
				</el-select>
				<el-select
					v-model="secondvalue"
					placeholder="请选择二级渠道商"
					@change="seachuser()"
					:disabled="chil_disable"
				>
					<el-option label="全部" value="*"></el-option>
					<el-option
						v-for="item in secondchan"
						:key="item.name"
						:label="item.name"
						:value="item.value"
					></el-option>
				</el-select>
				<span>设备类型：</span>
				<el-select
					v-model="devtypevalue"
					placeholder="请选择设备类型"
					@change="seachuser()"
				>
					<el-option label="全部" value="*"></el-option>
					<el-option
						v-for="item in device_type"
						:key="item.name"
						:label="item.name"
						:value="item.name"
					></el-option>
				</el-select>
				<!-- <span>应用渠道：</span>
        <el-select v-model="value" placeholder="请选择" @change="seachuser()">
          <el-option label="任意用途" value="0"></el-option>
          <el-option
            v-for="(item, index) in options"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select> -->
				<span>启用时间：</span>
				<el-date-picker
					v-model="value1"
					type="datetimerange"
					range-separator="至"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
					@change="seachuser()"
					:picker-options="endPickerOptions"
				></el-date-picker>
				<el-button plain @click="reset()">重置</el-button>
				<!-- <div class="seach_bottom_btn">
          <el-button type="primary" plain size="mini" @click="seachuser()"
            >确定</el-button
          >
          
        </div>-->
			</div>
		</div>

		<!-- 表格 -->
		<div style="text-align:right;padding: 10px;">
			<el-button
            v-show="menutype.roleE==1"
				type="primary"
				@click="exportexe()"
				:disabled="showdisable"
				>导出</el-button
			>
		</div>
		<div>
			<el-table
				:data="tableData"
				border
				:cell-style="rowClass"
				:header-cell-style="headClass"
				@sort-change="changeSort"
				style="width: 100%"
			>
				<!-- <el-table-column prop="usage" label="用途" width="180">
          <template slot-scope="scoped">
            <span v-if="scoped.row.usage == 0">任意用途</span>
            <span v-else-if="scoped.row.usage == 1">视频存储</span>
            <span v-else>视频备份</span>
          </template>
        </el-table-column> -->
				<el-table-column prop="businessscene" label="业务场景及用途">
					<template slot-scope="scope">
						<span
							v-if="
								scope.row.businessscene == 0 ||
									scope.row.businessscene == 1 ||
									scope.row.businessscene == 4
							"
							>分发加速播放-内容缓存</span
						>
						<span v-else-if="scope.row.businessscene == 2"
							>内容预热-内容缓存</span
						>
						<span v-else-if="scope.row.businessscene == 3"
							>刷新缓存-内容缓存</span
						>
						<span v-else>{{ scope.row.businessscene }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="businesstype" label="业务类型">
					<template slot-scope="scope">
						<span v-if="scope.row.businesstype == 0">点播加速</span>
						<span v-else-if="scope.row.businesstype == 1"
							>直播加速</span
						>
						<span v-else>{{ scope.row.businesstype }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="dataflow" label="占用空间" width="180">
					<template slot-scope="scope">
						{{ scope.row.dataflow | formatBytes }}
					</template>
				</el-table-column>
				<el-table-column
					prop="urlname"
					label="存储内容"
				></el-table-column>
				<el-table-column
					prop="contentid"
					label="内容ID"
				>
                <!-- <template slot-scope="scope">
                    <span>{{scope.row.contentid}}</span>
                </template> -->
                </el-table-column>
				<el-table-column
					prop="startTS"
					width="103"
					sortable
					:sort-orders="['ascending', 'descending']"
					label="启用时间"
				>
					<template slot-scope="scope">
						{{ scope.row.startTS | getymd }}
					</template>
				</el-table-column>
				<el-table-column prop="endTS" label="结束时间">
					<template slot-scope="scope">
						{{ scope.row.endTS | getymd }}
					</template>
				</el-table-column>
				<el-table-column prop="timeuse" label="使用时长">
					<template slot-scope="scope">
						{{ scope.row.timeuse | s_h }}
					</template>
				</el-table-column>
				<el-table-column prop="accelstate" label="使用状态">
					<template slot-scope="scope">
						<span v-if="scope.row.accelstate == 0">使用中</span>
						<span v-else-if="scope.row.accelstate == 1"
							>已停用</span
						>
					</template>
				</el-table-column>
				<el-table-column prop="ipfsId" label="节点ID"></el-table-column>
				<el-table-column
					prop="firstchname"
					label="节点一级渠道商"
				></el-table-column>
				<el-table-column
					prop="secondname"
					label="节点二级渠道商"
				></el-table-column>
				<el-table-column
					prop="devicetype"
					label="设备类型"
				></el-table-column>
				<el-table-column prop="chanId" label="渠道ID"></el-table-column>
				<el-table-column prop="taskid" label="实例ID"></el-table-column>
				<el-table-column prop="terminalname" label="视频播放终端">
					<template slot-scope="scope">
						<span
							v-if="
								scope.row.businessscene == 0 ||
									scope.row.businessscene == 1 ||
									scope.row.businessscene == 4
							"
							>{{ scope.row.terminalname }}
						</span>
						<span v-else>
							{{
								scope.row.terminalname == 'Unknown'
									? '--'
									: scope.row.terminalname
							}}
						</span>
					</template>
				</el-table-column>
				<el-table-column
					prop="userIpInfo"
					label="视频播放IP"
				></el-table-column>
			</el-table>
		</div>
		<fenye
			style="text-align: right;margin: 20px 0px 10px;"
			@fatherMethod="getpage"
			@fathernum="gettol"
			:pagesa="totalCnt"
			:currentPage="currentPage"
            ref="paginations"
			v-show="tableData.length > 0"
		></fenye>
	</div>
</template>

<script>
import fenye from '@/components/cloudfenye';
import {
	query_ip_store_usage_table,
	get_nodetype_enum,
} from '../../servers/api';
import {
	getlocaltimes,
	settime,
	getymdtime,
	setbatime,
    formatDuring,
    formatBkb,
    menudisable
} from '../../servers/sevdate';
export default {
	data() {
		return {
			currentPage: 1,
			rotate: false,
			showdisable: true,
			errTableVisible: false,
			device_show: false,
			scenedis: true,
			value1: '',
			firatvalue: '*',
			secondvalue: '*',
			devtypevalue: '*',
			busvalue: '*',
			scenevalue: '*',
			input: '',
			value: '',
			input1: '', //开始时间
			input2: '', //结束时间
			optiondisplay: false,
			dev_devation: {},
			starttime: '',
			endtime: '',
			pageNo: 1,
			pageNo2: 1,
			pageSize: 10,
			totalCnt: 1,
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
				// {
				// 	name: '云链',
				// 	value: 'f_computer.unknown_yunlian',
				// 	secondchan: [
				// 		{
				// 			name: '云链',
				// 			value: 's_computer.unknown_yunlian',
				// 		},
				// 	],
				// },
			],
			chil_disable: true,
			secondchan: [],
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
			sizeForm: {
				date1: '',
				date2: '',
			},
			options: [
				{
					value: 1,
					label: '视频存储',
				},
				{
					value: 2,
					label: '视频备份',
				},
			],
			tableData: [],
			tableData2: [],
            order: 2,
            menutype:{},
		};
	},
	filters: {
		//时间戳转时间
		getymd(time) {
			if (time === 0) {
				return '--';
			} else {
				return getymdtime(time);
			}
		},
		s_h(time) {
			if (time !== 0) {
				return formatDuring(time);
			} else {
				return time;
			}
		},
		formatBytes(a) {
			if (0 == a) return '0 B';
			var d = 2;
			var c = 1024,
				e = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
				f = Math.floor(Math.log(a) / Math.log(c));
			if (e[f] == 'TB' || e[f] == 'PB') {
				d = 4;
			} else {
				d = 2;
			}
			return parseFloat((a / Math.pow(c, f)).toFixed(d)) + ' ' + e[f];
		},
	},
	components: { fenye },
	mounted() {
		this.get_search_data();
		this.starttime =
			new Date(new Date().toLocaleDateString()).getTime() / 1000 -
			86400 * 90;
		this.endtime = Date.parse(new Date()) / 1000;
         this.gettab();
         let munulist = JSON.parse(sessionStorage.getItem('menus'));
		let pathname = this.$route.path;
		this.menutype = menudisable(munulist, pathname);
		console.log(this.menutype);
	},
	methods: {
		handleChangefirst(val) {
			this.firstchan.find((item) => {
				if (item.value === val) {
					//筛选出匹配数据
					this.secondchan = item.secondchan;
					this.chil_disable = false;
				} else {
					this.chil_disable = true;
					this.secondvalue = '*';
				}
			});
			this.gettab();
		},
		changeSort(val) {
			console.log(val.order); // column: {…} order: "ascending" prop: "date"
			// 根据当前排序重新获取后台数据,一般后台会需要一个排序的参数
			if (val.order == 'ascending') {
				this.order = 1;
				this.gettab();
			} else {
				this.order = 2;
				this.gettab();
			}
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
					this.gettab();
				})
				.catch((error) => {
					console.log(error);
				});
		},
		gettab() {
			let params = new Object();
			if (this.input == '') {
				params.ipfs_id = '*';
				params.content_id = '*';
			} else {
				var iporid = /^(mp|flv|hls){1}.*/;
				if (iporid.test(this.input) == false) {
					params.ipfs_id = this.input;
					params.content_id = '*';
				} else {
					params.content_id = this.input;
					params.ipfs_id = '*';
				}
			}
			if (!this.value) {
				params.usage = 3;
			} else {
				params.usage = parseInt(this.value);
			}
			params.start_ts = this.starttime;
			params.end_ts = this.endtime;
			params.pageNo = this.pageNo - 1;
			params.pageSize = this.pageSize;
			params.first_channel = this.firatvalue;
			params.second_channel = this.secondvalue;
			params.device_type = this.devtypevalue;
			params.orderBy = this.order;
			if (this.busvalue == '*') {
				params.business_type = '*';
			} else {
				params.business_type = this.busvalue * 1;
			}
			if (this.scenevalue == '*') {
				params.business_scene = '*';
			} else {
				params.business_scene = this.scenevalue * 1;
			}
			query_ip_store_usage_table(params)
				.then((res) => {
					this.tableData = [];
					if (res.status == 0) {
						// this.tableData = res.data.list;
						this.totalCnt = res.data.totalCnt;
						res.data.list.forEach((item) => {
							this.firstchan.forEach((fitem) => {
								if (fitem.value == item.firstchannel) {
									item.firstchname = fitem.name;
									if (fitem.secondchan) {
										fitem.secondchan.forEach((xime) => {
											if (
												item.secondchannel == xime.value
											) {
												item.secondname = xime.name;
											}
										});
									}
								}
							});
							this.tableData.push(item);
						});
						if (this.tableData.length > 0) {
							this.showdisable = false;
						} else {
							this.showdisable = true;
						}
					} else {
						this.showdisable = true;
						this.$message.error(res.errMsg);
					}
				})
				.catch((error) => {
					this.showdisable = true;
				});
		},
		//筛选按钮
		option_display() {
			this.optiondisplay = !this.optiondisplay;
			this.rotate = !this.rotate;
		},
		//确定搜索
		seachuser() {
			if (this.busvalue != '*') {
				this.scenedis = false;
			} else {
				this.scenedis = true;
				this.scenevalue = '*';
			}
			if (this.value1 != '' && this.value1 != null) {
				this.starttime = setbatime(this.value1[0]);
				this.endtime = setbatime(this.value1[1]);
			} else {
				this.starttime =
					new Date(new Date().toLocaleDateString()).getTime() / 1000 -
					86400 * 90;
				this.endtime = Date.parse(new Date()) / 1000;
			}
			this.gettab();
		},
		//重置
		reset() {
             this.$refs.paginations.$data.currentPage=1;
			this.value = '';
			this.input = '';
			this.value1 = '';
			this.firatvalue = '*';
			this.secondvalue = '*';
			this.devtypevalue = '*';
			this.busvalue = '*';
            this.scenevalue = '*';
            this.pageNo=1;
			this.scenedis = true;
			this.chil_disable = true;
			this.gettab();
		},

		// 表头样式设置
		headClass() {
			return 'text-align: center;background:#eef1f6;';
		},
		// 表格样式设置
		rowClass() {
			return 'text-align: center;';
		},
		//获取页码
		getpage(pages) {
			this.pageNo = pages;
			this.gettab();
		},
		//获取每页数量
		gettol(pagetol) {
			this.pagesize = pagetol;
			// this.gettab();
		},
		//导出
		exportexe() {
			let params = new Object();
			if (this.input == '') {
				params.ipfs_id = '*';
				params.content_id = '*';
			} else {
				var iporid = /^(\d{1,3}\.{1}){3}((\d{1,3}){1})$/;
				if (iporid.test(this.input) == false) {
					params.ipfs_id = this.input;
					params.content_id = '*';
				} else {
					params.content_id = this.input;
					params.ipfs_id = '*';
				}
			}
			if (!this.value) {
				params.usage = 3;
			} else {
				params.usage = parseInt(this.value);
			}
			params.start_ts = this.starttime;
			params.end_ts = this.endtime;
			params.pageNo = this.pageNo2 - 1;
			params.pageSize = this.pageSize;
			params.first_channel = this.firatvalue;
			params.second_channel = this.secondvalue;
			params.device_type = this.devtypevalue;
			params.business_type = this.busvalue;
			params.business_scene = this.scenevalue;
			query_ip_store_usage_table(params)
				.then((res) => {
					if (res.status == 0) {
						this.tableData2 = this.tableData2.concat(res.data.list);
						if (this.pageNo2 >= res.data.totalPageCnt) {
							this.exportExcel(this.tableData2);
							this.fan.fanactionlog('导出', '节点应用FS存储', 1);
						} else {
							this.pageNo2++;
							this.exportexe();
						}
					} else {
						this.fan.fanactionlog('导出', '节点应用FS存储', 0);
						this.$message.error(res.errMsg);
					}
				})
				.catch((error) => {
					this.fan.fanactionlog('导出', '节点应用FS存储', 0);
				});
		},
		//导出的方法
		exportExcel(datalist) {
			require.ensure([], () => {
				const {
					export_json_to_excel,
				} = require('../../excel/Export2Excel.js');
				const tHeader = [
					'用途',
					'占用空间',
					'存储内容',
					'内容ID',
					'节点ID',
					'启用时间',
					'使用时长',
					'使用状态',
					'使用者ID',
				];
				// 上面设置Excel的表格第一行的标题
				const filterVal = [
					'usage',
					'content_size',
					'content_name',
					'content_id',
					'ipfs_id',
					'start_ts',
					'time_conspt',
					'status_use',
					'chan_id',
				];
				// 上面的index、nickName、name是tableData里对象的属性
				const list = datalist; //把data里的tableData存到list
				const data = this.formatJson(filterVal, list);
				export_json_to_excel(tHeader, data, '节点应用FS存储');
			});
		},
		formatJson(filterVal, jsonData) {
			return jsonData.map((v) => filterVal.map((j) => v[j]));
		},
	},
};
</script>

<style lang="scss" scoped>
.content {
	// max-width: 1920px;
	height: 100%;
	background: rgb(255, 255, 255);
	margin: 30px;
	padding: 37px;
	// .bread_crumbs {
	//   width: 100%;
	//   padding: 37px;
	//   font-size: 26px;
	// }
	.seach {
		width: 100%;
		margin-top: 20px;
		.seach_top {
			width: 100%;
			height: 60px;
			.input-with-select {
				width: 15%;
				float: left;
			}
			.seach_top_right {
				float: left;
				height: 40px;
				line-height: 40px;
				margin-left: 10px;
			}
		}
		.seach_bottom {
			text-align: left;
			//   height: 100px;
			background: #f0f5f5;
			border-radius: 10px;
			padding: 10px 15px;
			.el-select {
				width: 150px;
			}
			.el-input {
				width: 150px;
			}
			.seach_bottom_btn {
				margin: 10px 10px;
			}
		}
	}
	.con_lable {
		width: 100%;
	}
	.device_title_name {
		width: 16%;
		background: #eeeeee;
		color: #000000;
	}
	.device_title_content {
		width: 16%;
		background: #ffffff;
		color: #000000;
	}
	.tableclose {
		width: 100%;
		padding-top: 10px;
		text-align: center;
	}
}
.el-select {
	margin-bottom: 20px;
}
//旋转
.aa {
	transition: all 1s;
}
.go {
	transform: rotate(-180deg);
	transition: all 1s;
}
</style>
