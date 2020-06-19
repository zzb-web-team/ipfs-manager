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
				<span>节点渠道商：</span>
				<el-select
					v-model="firatvalue"
					placeholder="请选择一级渠道商"
					@change="seachuser()"
					><el-option label="全部" value="*">
                        <el-option
							v-for="item in firstchan"
							:key="item.name"
							:label="item.name"
							:value="item.name"
							:disabled="item.disabled"
						></el-option>
                    </el-option>
				</el-select>
				<el-select
					v-model="secondvalue"
					placeholder="请选择二级渠道商"
					@change="seachuser()"
					><el-option label="全部" value="*">
                        <el-option
							v-for="item in secondchan"
							:key="item.name"
							:label="item.name"
							:value="item.name"
							:disabled="item.disabled"
						></el-option>
                    </el-option>
				</el-select>
				<span>设备类型：</span>
				<el-select
					v-model="devtypevalue"
					placeholder="请选择设备类型"
					@change="seachuser()"
				>
					<el-option label="全部" value="*">
                        <el-option
							v-for="item in device_type"
							:key="item.name"
							:label="item.name"
							:value="item.name"
							:disabled="item.disabled"
						></el-option>
                    </el-option>
				</el-select>
				<span>业务类型：</span>
				<el-select
					v-model="busvalue"
					placeholder="请选择业务类型"
					@change="seachuser()"
				>
					<el-option label="全部" value="0">
                        <el-option
							v-for="item in device_type"
							:key="item.name"
							:label="item.name"
							:value="item.name"
							:disabled="item.disabled"
						></el-option>
                    </el-option>
				</el-select>
				<span>业务场景及用途：</span>
				<el-select
					v-model="scenevalue"
					placeholder="请选择业务场景及用途"
					@change="seachuser()"
				>
					<el-option label="全部" value="0">
                        <el-option
							v-for="item in device_type"
							:key="item.name"
							:label="item.name"
							:value="item.name"
							:disabled="item.disabled"
						></el-option>
                    </el-option>
				</el-select>
				<span>应用渠道：</span>
				<el-select
					v-model="value"
					placeholder="请选择"
					@change="seachuser()"
				>
					<el-option label="任意用途" value="0"></el-option>
					<el-option
						v-for="(item, index) in options"
						:key="index"
						:label="item.label"
						:value="item.value"
					></el-option>
				</el-select>
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
          
        </div> -->
			</div>
		</div>

		<!-- 表格 -->
		<div style="text-align:right;padding: 10px;">
			<el-button
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
				style="width: 100%"
			>
				<el-table-column prop="usage" label="用途" width="180">
					<template slot-scope="scoped">
						<span v-if="scoped.row.usage == 0">任意用途</span>
						<span v-else-if="scoped.row.usage == 1">视频存储</span>
						<span v-else>视频备份</span>
					</template>
				</el-table-column>
				<el-table-column
					prop="firstchannel"
					label="节点一级渠道商"
				></el-table-column>
                <el-table-column
					prop="secondchannel"
					label="节点二级渠道商"
				></el-table-column>
                <el-table-column
					prop="devicetype"
					label="设备类型"
				></el-table-column>
				<el-table-column
					prop="dataflow"
					label="占用空间"
					width="180"
				></el-table-column>
				<el-table-column
					prop="urlname"
					label="存储内容"
				></el-table-column>
				<el-table-column
					prop="contentid"
					label="内容ID"
				></el-table-column>
				<el-table-column
					prop="ipfsId"
					label="节点ID"
				></el-table-column>
				<el-table-column
					prop="businesstype"
					label="业务类型"
				></el-table-column>
                <el-table-column
					prop="businessscene"
					label="业务场景及用途"
				></el-table-column>
				<el-table-column prop="startTS" label="启用时间">
					<template slot-scope="scope">{{
						scope.row.startTS | getymd
					}}</template>
				</el-table-column>
				<el-table-column prop="timeUsage" label="使用时长">
					<template slot-scope="scope">{{
						scope.row.timeUsage | s_h
					}}h</template>
				</el-table-column>
				<el-table-column prop="contentstate" label="使用状态">
					<template slot-scope="scope">
						<span v-if="scope.row.contentstate == 0">未使用</span>
						<span v-else>使用中</span>
					</template>
				</el-table-column>
				<el-table-column
					prop="userIpInfo"
					label="渠道ID"
				></el-table-column>
				<el-table-column
					prop="taskid"
					label="实例ID"
				></el-table-column>
                 <el-table-column
					prop="terminalname"
					label="视频播放终端"
				></el-table-column>
                 <el-table-column
					prop="chan_id"
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
			v-if="tableData.length > 0"
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
} from '../../servers/sevdate';
export default {
	data() {
		return {
			currentPage: 1,
			rotate: false,
			showdisable: true,
			errTableVisible: false,
			device_show: false,
			value1: '',
			firatvalue: '*',
			secondvalue: '*',
			devtypevalue: '*',
			busvalue: 0,
			scenevalue: 0,
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
				{
					name: 'arm64',
					value: 'arm64',
				},
			],
			device_type: [
				//设备类型
				{
					name: '西柚机',
					value: '西柚机',
				},
			],
			os: [
				//操作系统
				{
					name: 'windows',
					value: 'windows',
				},
			],
			isp: [
				//运营商
				{
					name: '移动',
					value: '移动',
				},
			],
			firstchan: [
				//一级渠道商
				{
					name: '云链',
					value: 'yunlian',
					secondchan: [
						//二级渠道商
						{
							name: 'aaaa',
							value: 'bbbb',
						},
					],
				},
			],secondchan:[],
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
		};
	},
	filters: {
		//时间戳转时间
		getymd(time) {
			if (time === 0) {
				return time;
			} else {
				return getymdtime(time);
			}
		},
		s_h(time) {
			if (time !== 0) {
				return parseInt(time / 60 / 60);
			} else {
				return time;
			}
		},
	},
	components: { fenye },
	mounted() {
		this.starttime =
			new Date(new Date().toLocaleDateString()).getTime() / 1000 -
			86400 * 90;
		this.endtime = Date.parse(new Date()) / 1000;
		this.gettab();
	},
	methods: {
		get_search_data() {
			let params = new Object();
			get_nodetype_enum(params)
				.then((res) => {
					if (res.status == 0) {
						this.arch = res.data.arch;
						this.device_type = res.data.device_type;
						this.isp = res.data.ips;
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
			params.business_type = this.busvalue;
			params.business_scene = this.scenevalue;
			query_ip_store_usage_table(params)
				.then((res) => {
					if (res.status == 0) {
						this.tableData = res.data.list;
						this.totalCnt = res.data.totalCnt;
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
			this.value = '';
			this.input = '';
			this.value1 = '';
			this.firatvalue = '0';
			this.secondvalue = '0';
			this.devtypevalue = '0';
			this.busvalue = '0';
			this.scenevalue = '0';
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
//旋转
.aa {
	transition: all 1s;
}
.go {
	transform: rotate(-180deg);
	transition: all 1s;
}
</style>
