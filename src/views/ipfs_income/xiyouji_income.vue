<template>
	<div class="content">
		<!-- 头部搜索栏 -->
		<el-breadcrumb separator="/">
			<el-breadcrumb-item>
				<a>西柚机节点收益</a>
			</el-breadcrumb-item>
		</el-breadcrumb>
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
			<div class="search_right">
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
		<!-- 主体表格 -->
		<div>
			<div style="text-align:right;padding: 10px;">
				<el-button
					v-show="menutype.roleE == 1"
					type="primary"
					@click="exportexc()"
					:disabled="showdisable"
					>导出</el-button
				>
			</div>
			<el-table
				:data="tableData"
				border
				:cell-style="rowClass"
				:header-cell-style="headClass"
				style="width: 100%"
			>
				<el-table-column prop="nodeId" label="节点ID"></el-table-column>
				<el-table-column prop="IP" label="节点IP"></el-table-column>
				<el-table-column
					prop="earnings"
					label="当日收益（gfm）"
				></el-table-column>
				<el-table-column
					prop="H"
					label="节点当日算力"
				></el-table-column>
				<el-table-column prop="size" label="挖矿空间"></el-table-column>
				<el-table-column
					prop="oper"
					label="网络运营商"
				></el-table-column>
				<el-table-column
					prop="upBw"
					label="上行带宽（平均）"
				></el-table-column>
				<el-table-column
					prop="downBw"
					label="下行带宽（平均）"
				></el-table-column>
				<el-table-column
					prop="online"
					label="累计在线时长"
				></el-table-column>
				<el-table-column prop="startTS" sortable label="时间">
					<template slot-scope="scope">{{ scope.row.date }}</template>
				</el-table-column>
			</el-table>
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
	menudisable,
} from '../../servers/sevdate';
import { node_pf, export_excel } from '@/servers/api';
export default {
	data() {
		return {
			input: '',
			time_value: '',
			showdisable: true,
			order: 0,
			pageNo: 1,
			currentPage: 1,
			totalCnt: 1,
			pagesize: 10,
			starttime: '',
			endtime: '',
			tableData: [],
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
			menutype: {},
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
		let munulist = JSON.parse(localStorage.getItem('menus'));
		let pathname = this.$route.path;
		this.menutype = menudisable(munulist, pathname);
	},
	methods: {
		//收益
		get_income_list() {
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
			node_pf(params)
				.then((res) => {
					this.tableData = res.data;
					this.totalCnt = res.dataCount;
					if (res.data && this.tableData.length > 0) {
						this.showdisable = false;
					}
					if (res.status == 0) {
						this.tableData = res.data;
					} else {
						this.$message.error(res.errMsg);
					}
				})
				.catch((error) => {
				});
		},
		//搜索
		seachuser() {
			if (this.time_value != '' && this.time_value != null) {
				this.starttime = dateFormat(this.time_value[0]);
				this.endtime = dateFormat(this.time_value[1]);
			} else {
				// var day1 = new Date();
				// day1.setTime(day1.getTime() - 24 * 60 * 60 * 1000);
				// this.starttime =day1.getFullYear() +'-' +(day1.getMonth() + 1) +'-' +day1.getDate();
				this.starttime = dateFormat(new Date());
				this.endtime = dateFormat(new Date());
			}
			this.get_income_list();
		},
		//导出
		exportexc() {
			let params = new Object();
			params.exportContext = 'node_pf';
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
					if (res.state == 0) {
						window.open(res.downloadUrl);
						this.$message.success('导出成功');
					} else {
						this.$message.error(res.err_msg);
					}
				})
				.catch((error) => {
				});
		},
		//获取页码
		getpage(pages) {
			this.pageNo = pages;
			this.get_income_list();
		},
		//获取每页数量
		gettol(pagetol) {
			this.pagesize = pagetol;
			// this.get_income_list();
		},
		// 表头样式设置
		headClass() {
			return 'text-align: center;background:#eef1f6;';
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
