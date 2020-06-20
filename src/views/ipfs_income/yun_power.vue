<template>
	<div class="content">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item>
				<a>云链节点算力</a>
			</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="top_table">
			<el-radio-group v-model="radio" size="small" @change="switch_table">
				<el-radio-button label="1">算力值</el-radio-button>
				<el-radio-button label="2">算力明细</el-radio-button>
			</el-radio-group>
		</div>
		<div class="search">
			<div class="search_left">
				<el-input
					placeholder="请输入节点id,节点ip"
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
			</div>
			<div class="search_right" v-if="radio == '2'">
				<span>时间：</span>
				<el-date-picker
					v-model="time_value"
					type="daterange"
					range-separator="至"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
					@change="seachuser()"
					:picker-options="endPickerOptions"
				></el-date-picker>
			</div>
		</div>
		<div>
			<div style="text-align:right;padding: 10px;" v-if="radio == '1'">
				<el-button
					type="primary"
					@click="exportexc()"
					:disabled="showdisable1"
					>导出</el-button
				>
			</div>
			<div style="text-align:right;padding: 10px;" v-if="radio == '2'">
				<el-button
					type="primary"
					@click="exportexc()"
					:disabled="showdisable2"
					>导出</el-button
				>
			</div>
			<div v-if="radio == '1'">
				<el-table
					:data="tableData"
					border
					:cell-style="rowClass"
					:header-cell-style="headClass"
					style="width: 100%"
				>
					<el-table-column
						prop="nodeId"
						label="节点ID"
					></el-table-column>
					<el-table-column prop="IP" label="节点IP"></el-table-column>
					<el-table-column
						prop="H"
						label="节点算力"
					></el-table-column>
				</el-table>
			</div>
			<div v-if="radio == '2'">
				<el-table
					:data="table_detail_data"
					border
					:cell-style="rowClass"
					:header-cell-style="headClass"
					style="width: 100%"
				>
					<el-table-column
						prop="nodeId"
						label="节点ID"
					></el-table-column>
					<el-table-column prop="IP" label="节点IP"></el-table-column>
					<el-table-column
						prop="HChange"
						label="算力变化值"
					></el-table-column>
					<el-table-column
						prop="behavior"
						label="行为"
					></el-table-column>
					<el-table-column
						prop="H"
						label="当前算力"
					></el-table-column>
					<el-table-column prop="startTS" sortable label="时间">
						<template slot-scope="scope">{{
							scope.row.date
						}}</template>
					</el-table-column>
				</el-table>
			</div>
		</div>
		<fenye
			style="text-align: right;margin: 20px 0px 10px;"
			@fatherMethod="getpage"
			@fathernum="gettol"
			:pagesa="totalCnt"
			:currentPage="currentPage"
		></fenye>
	</div>
</template>

<script>
import fenye from '@/components/cloudfenye';
import {
	getlocaltimes,
	settime,
	getymdtime,
	setbatime,
	dateFormat,
} from '../../servers/sevdate';
import { node_pv, node_pv_detail, exportexc,export_excel } from '@/servers/api';
export default {
	data() {
		return {
			radio: '1',
			input: '',
			time_value: '',
			showdisable1: true,
			showdisable2: true,
			order: 0,
			pageNo: 1,
			currentPage: 1,
			totalCnt: 1,
			pagesize: 10,
			starttime: '',
			endtime: '',
			tableData: [],
			table_detail_data: [],
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
		};
	},
	components: { fenye },
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
	mounted() {
		this.seachuser();
	},
	methods: {
		//切换视图
		switch_table(val) {
			this.pageNo = 1;
			this.seachuser();
		},
		//搜索
		seachuser() {
			if (this.radio == 1) {
				this.get_node_h();
			} else {
				if (this.time_value != '' && this.time_value != null) {
					this.starttime = dateFormat(this.time_value[0]);
					this.endtime = dateFormat(this.time_value[1]);
					this.get_node_h_detail();
				} else {
					// var day1 = new Date();
					// day1.setTime(day1.getTime() - 24 * 60 * 60 * 1000);
					// this.starttime =day1.getFullYear() +'-' +(day1.getMonth() + 1) +'-' +day1.getDate();
					this.starttime = dateFormat(new Date());
					this.endtime = dateFormat(new Date());
					this.get_node_h_detail();
				}
			}
		},
		//获取数据
		get_node_h() {
			let params = new Object();
			let ipsos = /^(\d{1,3}\.{1}){3}((\d{1,3}){1})$/;
			if (ipsos.test(this.input) == true) {
				params.nodeId = '';
				params.IP = this.input;
			} else {
				params.nodeId = this.input;
				params.IP = '';
			}
			params.curPage = this.pageNo - 1;
			params.itemCount = this.pagesize;
			node_pv(params)
				.then((res) => {
					this.tableData = res.data;
					if (this.tableData.length > 0) {
						this.showdisable1 = false;
					}
					console.log(res);
					// if(res.status==0){
					//     this.tableData=res.data;
					// }else{
					//     this.$message.error(res.errMsg);
					// }
				})
				.catch((error) => {
					console.log(error);
				});
		},
		get_node_h_detail() {
			let params = new Object();
			let ipsos = /^(\d{1,3}\.{1}){3}((\d{1,3}){1})$/;
			if (ipsos.test(this.input) == true) {
				params.nodeId = '';
				params.IP = this.input;
			} else {
				params.nodeId = this.input;
				params.IP = '';
			}
			params.dateStart = this.starttime;
			params.dateEnd = this.endtime;
			params.order = this.order;
			params.curPage = this.pageNo - 1;
			params.itemCount = this.pagesize;
			node_pv_detail(params)
				.then((res) => {
					console.log(res);
					this.table_detail_data = res.data;
					this.totalCnt = res.dataCount;
					if (this.table_detail_data.length > 0) {
						this.showdisable2 = false;
					}
					// if(res.status==0){
					//     this.table_detail_data=res.data;
					// }else{
					//     this.$message.error(res.errMsg);
					// }
				})
				.catch((error) => {
					console.log(error);
				});
		},
		//导出
		exportexc() {
			let params = new Object();
			if (this.radio == 1) {
				params.exportContext = 'node_pv';
			} else {
				params.exportContext = 'node_pv_detail';
			}
			let ipsos = /^(\d{1,3}\.{1}){3}((\d{1,3}){1})$/;
			if (ipsos.test(this.input) == true) {
				params.nodeId = '';
				params.IP = this.input;
			} else {
				params.nodeId = this.input;
				params.IP = '';
			}
			params.dateStart = this.starttime;
			params.dateEnd = this.endtime;
			export_excel(params)
				.then((res) => {
					console.log(res);
					if (res.status == 0) {
                        window.open(res.downloadUrl);
						this.$message.success('导出成功');
					} else {
						this.$message.error(res.err_msg);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		},
		//获取页码
		getpage(pages) {
			this.pageNo = pages;
			this.seachuser();
		},
		//获取每页数量
		gettol(pagetol) {
			this.pagesize = pagetol;
			// this.seachuser();
		},
		// 表头样式设置
		headClass() {
			return 'text-align: center;background:#eef1f6;height:59px;';
		},
		// 表格样式设置
		rowClass() {
			return 'text-align: center;';
		},
	},
};
</script>

<style lang="scss" scoped>
.content {
	text-align: left;
	.top_table {
		margin: 15px 0;
		text-align: left;
	}
	.search {
		width: 100%;
		margin-top: 20px;
		display: flex;
		align-items: center;
		.search_right {
			margin-left: 20px;
		}
	}
}
</style>
