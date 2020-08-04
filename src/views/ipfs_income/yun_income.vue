<template>
	<div class="content">
		<!-- 头部搜索栏 -->
		<el-breadcrumb separator="/">
			<el-breadcrumb-item>
				<a>节点收益明细</a>
			</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="search">
			<el-row type="flex">
				<el-input
					style="width:15%;"
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
				<div @click="getShow()" class="div_show" style="color:#606266">
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
			</el-row>
			<div class="search_bottom" v-show="showState">
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
				<span>节点渠道商:</span>
				<el-select
					v-model="firstchid"
					value-key
					placeholder="一级渠道商"
					@change="handleChangefirst($event)"
				>
					<el-option value="*" label="全部"></el-option>
					<el-option
						v-for="(item, index) in firstchan"
						:key="index"
						:label="item.name"
						:value="item.value"
					></el-option>
				</el-select>
				<el-select
					v-model="secondchid"
					placeholder="二级渠道商"
					@change="seachuser()"
					:disabled="chil_disable"
				>
					<el-option value="*" label="全部"></el-option>
					<el-option
						v-for="(item, index) in secondchan"
						:key="index"
						:label="item.name"
						:value="item.value"
					></el-option>
				</el-select>

				<el-button
					type="primary"
					plain
					@click="reset()"
					style="margin-left: 20px;"
					>重置</el-button
				>
			</div>
		</div>
		<!-- 主体表格 -->
		<div>
			<div
				style="text-align:right;padding: 10px 0;display: flex;justify-content: space-between;"
			>
				<el-button
					type="primary"
					size="small"
					@click="goupdate_parameter()"
					>调整收益参数</el-button
				>
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
				<!-- <el-table-column prop="IP" label="节点IP"></el-table-column> -->
				<el-table-column
					prop="firstch"
					label="节点一级渠道"
				></el-table-column>
				<el-table-column
					prop="secondch"
					label="节点二级渠道"
				></el-table-column>
				<el-table-column
					prop="P"
					label="当日收益[单位:积分](p)"
				></el-table-column>
				<el-table-column
					prop="P1"
					label="理论收益[单位:积分](p1)"
				></el-table-column>
				<el-table-column
					prop="P2"
					label="实际贡献收益[单位:积分](p2)"
				></el-table-column>
				<el-table-column
					prop="P3"
					label="节点质量评级奖励收益[单位:积分](p3)"
				>
                <template slot-scope="scope">
                    <span>--</span>
                </template>
                </el-table-column>
				<el-table-column
					prop="H"
					label="节点当日算力"
				></el-table-column>
				<el-table-column
					prop="S"
					label="当日节点质量评级"
				></el-table-column>
				<el-table-column
					prop="devCount"
					label="主机设备数量[单位:台][同一终端地址]"
				></el-table-column>
				<!-- <el-table-column
					prop="oper"
					label="网络运营商"
				></el-table-column> -->
				<!-- <el-table-column prop="UDBw" label="上下行带宽">
					<template slot-scope="scope">
						{{ !scope.row.UDBw ? '--' : scope.row.UDBw }}
					</template>
				</el-table-column> -->
				<el-table-column
					prop="online"
					label="累计在线时长"
				></el-table-column>
				<el-table-column
					prop="flow"
					label="节点当日实际使用流量"
				></el-table-column>
				<el-table-column prop="startTS" sortable label="时间">
					<template slot-scope="scope">{{ scope.row.date }}</template>
				</el-table-column>
			</el-table>
		</div>
		<fenye
			v-show="tableData.length > 0"
			style="text-align: right;margin: 20px 0px 10px;"
			@fatherMethod="getpage"
			@fathernum="gettol"
			:pagesa="totalCnt"
			:currentPage="currentPage"
		></fenye>
	</div>
</template>

<script>
import fenye from '@/components/fenye';
import {
	getlocaltimes,
	settime,
	getymdtime,
	setbatime,
	dateFormat,
	menudisable,
} from '../../servers/sevdate';
import { node_pf_detail, export_excel, get_nodetype_enum } from '@/servers/api';
export default {
	data() {
		return {
			input: '',
			time_value: '',
			firstchid: '',
			secondchid: '',
			showdisable: true,
			order: 0,
			pageNo: 1,
			currentPage: 1,
			totalCnt: 1,
			pagesize: 10,
			starttime: '',
			endtime: '',
			tableData: [],
			rotate: false,
			showState: false,
			chil_disable: true,
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
			firstchan: [
				// {
				// 	name: '云链',
				// 	secondchan: [
				// 		{ name: '云链', value: 's_computer.unknown_yunlian' },
				// 	],
				// 	value: 'f_computer.unknown_yunlian',
				// },
			],
			secondchan: [],
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
		this.get_search_data();
		let munulist = JSON.parse(localStorage.getItem('menus'));
		let pathname = this.$route.path;
		this.menutype = menudisable(munulist, pathname);
		console.log(this.menutype);
		this.seachuser();
	},
	methods: {
		getShow() {
			this.showState = !this.showState;
			this.rotate = !this.rotate;
		},
		//重置
		reset() {
			this.input = '';
			this.time_value = '';
			this.firstchid = '';
			this.secondchid = '';
			this.chil_disable = true;
			this.starttime = dateFormat(new Date());
			this.endtime = dateFormat(new Date());
			this.seachuser();
		},
		get_search_data() {
			let params = new Object();
			params.time = '111';
			get_nodetype_enum(params)
				.then((res) => {
					console.log(res);
					if (res.status == 0) {
						this.firstchan = res.data.firstchan;
					} else {
						this.$message.error(res.err_msg);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		},
		//收益
		get_income_list() {
			this.tableData = [];
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
			params.curPage = this.currentPage - 1;
			params.itemCount = this.pagesize;
			if (this.firstchid == '*') {
				params.channel1 = '';
			} else {
				params.channel1 = this.firstchid;
			}
			if (this.secondchid == '*') {
				params.channel2 = '';
			} else {
				params.channel2 = this.secondchid;
			}
			node_pf_detail(params)
				.then((res) => {
					console.log(res);
					//this.tableData = res.data;

					res.data.forEach((item) => {
						this.firstchan.forEach((fitem) => {
							if (fitem.value == item.channel1) {
								item.firstch = fitem.name;
								if (fitem.secondchan) {
									fitem.secondchan.forEach((xime) => {
										if (item.channel2 == xime.value) {
											item.secondch = xime.name;
										}
									});
								}
							}
						});
						this.tableData.push(item);
					});

					this.totalCnt = res.dataCount;
					if (res.data && this.tableData.length > 0) {
						this.showdisable = false;
					}
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
		goupdate_parameter() {
			this.$router.push({ path: '/update_parameter' });
		},
		handleChangefirst(val) {
            this.secondchid="*";
			this.currentPage = 1;
			if (val == '*' || val == '') {
				this.chil_disable = true;
				this.secondchan = [];
				this.secondchid = '';
			} else {
				this.firstchan.forEach((item) => {
					if (item.value === val) {
						//筛选出匹配数据
						this.secondchan = item.secondchan;
						this.chil_disable = false;
					} else {
						// this.chil_disable = true;
					}
				});
			}
			this.seachuser();
		},
		//搜索
		seachuser() {
			this.currentPage = 1;
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
			params.exportContext = 'node_pf_detail';
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
			if (this.firstchid == '*') {
				params.channel1 = '';
			} else {
				params.channel1 = this.firstchid;
			}
			if (this.secondchid == '*') {
				params.channel2 = '';
			} else {
				params.channel2 = this.secondchid;
			}
			export_excel(params)
				.then((res) => {
					console.log(res);
					if (res.state == 0) {
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
			this.currentPage = pages;
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
		// display: flex;
		// align-items: center;
		.div_show {
			width: auto;
			display: flex;
			height: 40px;
			justify-content: center;
			align-items: center;
			color: #409eff;
			cursor: pointer;
			margin-left: 20px;
		}
		.search_bottom {
			margin-top: 20px;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			background: #f0f5f5;
			padding: 17px 0;
			border-radius: 10px;
			span {
				margin-left: 20px;
			}
		}
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
