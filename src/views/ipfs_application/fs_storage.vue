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
					placeholder="节点id，节点ip"
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
								: 'fa fa-arrow-down aa'
						]"
					></i>
				</div>
			</div>
			<div v-if="optiondisplay" class="seach_bottom">
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
				<el-table-column
					prop="use"
					label="用途"
					width="180"
				></el-table-column>
				<el-table-column
					prop="take_up_space"
					label="占用空间"
					width="180"
				></el-table-column>
				<el-table-column
					prop="storage_content"
					label="存储内容"
				></el-table-column>
				<el-table-column
					prop="content_id"
					label="内容ID"
				></el-table-column>
				<el-table-column
					prop="storage_address"
					label="存储地址"
				></el-table-column>
				<el-table-column
					prop="node_id"
					label="节点ID"
				></el-table-column>
				<el-table-column prop="start_time" label="启用时间">
					<template slot-scope="scope">{{
						scope.row.start_time | getymd
					}}</template>
				</el-table-column>
				<el-table-column prop="usage_time" label="使用时长">
					<template slot-scope="scope">{{
						scope.row.usage_time | s_h
					}}</template>
				</el-table-column>
				<el-table-column prop="status_use" label="使用状态">
					<template slot-scope="scope">
						<span v-if="scope.row.status_use == 0">已完成</span>
						<span v-else>进行中</span>
					</template>
				</el-table-column>
				<el-table-column
					prop="ip_application_channel"
					label="FS应用渠道"
				></el-table-column>
				<el-table-column
					prop="user_id"
					label="渠道ID"
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
import { query_ip_store_usage_table } from '../../servers/api';
import {
	getlocaltimes,
	settime,
	getymdtime,
	setbatime
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
			endPickerOptions: {
				disabledDate(time) {
					return time.getTime() > new Date( new Date(new Date().toLocaleDateString()).getTime() +24 * 60 * 60 * 1000 -1);
				}
			},
			sizeForm: {
				date1: '',
				date2: ''
			},
			options: [
				{
					value: 1,
					label: '视频存储'
				},
				{
					value: 2,
					label: '视频备份'
				}
			],
			tableData: [],
			tableData2: []
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
		}
	},
	components: { fenye },
	mounted() {
		this.starttime =
			new Date(new Date().toLocaleDateString()).getTime() / 1000;
		this.endtime = Date.parse(new Date()) / 1000;
		this.gettab();
	},
	methods: {
		gettab() {
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
			params.pageNo = this.pageNo - 1;
			params.pageSize = this.pageSize;
			query_ip_store_usage_table(params)
				.then(res => {
					if (res.status == 0) {
						this.tableData2 = res.data.list;
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
				.catch(error => {
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
					new Date(new Date().toLocaleDateString()).getTime() / 1000;
				this.endtime = Date.parse(new Date()) / 1000;
			}
			this.gettab();
		},
		//重置
		reset() {
			this.value = '';
			this.input = '';
			this.value1 = '';
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
			this.get_ip_table();
		},
		//获取每页数量
		gettol(pagetol) {
			this.pagesize = pagetol;
			// this.get_ip_table();
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
			query_ip_store_usage_table(params)
				.then(res => {
					if (res.status == 0) {
						this.tableData2.concat(res.data.list);
						this.exportExcel();
						this.fan.fanactionlog('导出', 'FS存储', 1);
					} else {
						this.fan.fanactionlog('导出', 'FS存储', 0);
						this.$message.error(res.errMsg);
					}
				})
				.catch(error => {
					this.fan.fanactionlog('导出', 'FS存储', 0);
				});
		},
		//导出的方法
		exportExcel() {
			require.ensure([], () => {
				const {
					export_json_to_excel
				} = require('../../excel/Export2Excel.js');
				const tHeader = [
					'用途',
					'占用空间',
					'存储内容',
					'内容ID',
					'存储地址',
					'节点ID',
					'启用时间',
					'使用时长',
					'使用状态',
					'FS应用渠道',
					'使用者ID'
				];
				// 上面设置Excel的表格第一行的标题
				const filterVal = [
					'use',
					'take_up_space',
					'storage_content',
					'content_id',
					'storage_address',
					'node_id',
					'start_time',
					'usage_time',
					'status_use',
					'ip_application_channel',
					'user_id'
				];
				// 上面的index、nickName、name是tableData里对象的属性
				const list = this.tableData2; //把data里的tableData存到list
				const data = this.formatJson(filterVal, list);
				export_json_to_excel(tHeader, data, 'FS存储');
			});
		},
		formatJson(filterVal, jsonData) {
			return jsonData.map(v => filterVal.map(j => v[j]));
		}
	}
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
