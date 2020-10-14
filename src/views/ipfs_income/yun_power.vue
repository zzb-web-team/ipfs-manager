<template>
	<div class="content yun_power">
		<!-- <el-breadcrumb separator="/">
			<el-breadcrumb-item>
				<a>云链节点算力</a>
			</el-breadcrumb-item>
		</el-breadcrumb> -->
        <div class="rowbg">
            <!-- <div class="item_title">节点收益明细</div> -->
		<div class="top_table">
			<el-radio-group v-model="radio" size="small" @change="switch_table">
				<el-radio-button label="1">算力值</el-radio-button>
				<el-radio-button label="2">算力明细</el-radio-button>
			</el-radio-group>
		</div>
		<div class="search">
			<el-row type="flex" style="align-items: center;">
				<el-input
					style="width:15%;"
					placeholder="请输入节点ip,节点id"
					v-model="input"
					class="input-with-select"
                    size="small"
					@keyup.enter.native="seachuser()"
				>
					<i
						slot="prefix"
						class="el-input__icon el-icon-search"
						@click="seachuser()"
					></i>
				</el-input>
                					<span style="margin-left:10px;">节点渠道商:</span>
					<el-select
						v-model="firstchid"
						value-key
                        size="small"
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
                        size="small"
                        style="margin-left:10px;"
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
					<span v-if="radio == '2'" style="margin-left:10px;">时间：</span>
					<el-date-picker
						v-if="radio == '2'"
						v-model="time_value"
						type="daterange"
						range-separator="至"
                        size="small"
						start-placeholder="开始日期"
						end-placeholder="结束日期"
						@change="seachuser()"
						:picker-options="endPickerOptions"
					></el-date-picker>
				<el-button
					type="primary"
					round
					size="small"
					@click="reset()"
					style="margin-left: 10px;"
                    class="resetseach_btn"
					>重置</el-button
				>
			</el-row>
		</div>
        </div>
		<div style="box-sizing: border-box;margin: 30px;padding: 30px;background: #ffffff;border-radius: 8px;">
			<div style="text-align:right;padding: 10px;" v-if="radio == '1'">
				<el-button
					v-show="menutype.roleE == 1"
					type="text"
					size="mini"
					@click="exportexc()"
					:disabled="showdisable1"
					>导出<i class="el-icon-folder-add el-icon--right"></i
				></el-button
				>
			</div>
			<div style="text-align:right;padding: 10px;" v-if="radio == '2'">
				<el-button
					v-show="menutype.roleE == 1"
					type="primary"
					@click="exportexc()"
					:disabled="showdisable2"
					>导出</el-button
				>
			</div>
			<div v-show="radio == '1'">
				<el-table
					:data="tableData"
					border
					:cell-style="rowClass"
					:header-cell-style="headClass"
					style="width: 100%"
				>
					<!-- <el-table-column
						prop="nodeId"
						label="节点ID"
					></el-table-column> -->
					<el-table-column prop="IP" label="节点IP"></el-table-column>
					<el-table-column
						prop="firstch"
						label="节点一级渠道"
					></el-table-column>
					<el-table-column
						prop="secondch"
						label="节点二级渠道"
					></el-table-column>
					<el-table-column
						label="节点算力"
					>
                      <template slot-scope="scope">
                        <span>{{scope.row.H}}</span>
                    </template>
                    </el-table-column>
                    	</el-table-column>
			        <el-table-column label="节点ID">
				        <template slot-scope="scope">
					        <el-button
                                @click="show_nodeid(scope.row)"
                                type="text"
                                size="small"
                                >查看</el-button
					>
				</template>
			</el-table-column>
				</el-table>
			</div>
			<div v-show="radio == '2'">
				<el-table
					:data="table_detail_data"
					border
					:cell-style="rowClass"
					:header-cell-style="headClass"
                    @sort-change="tablechange"
					style="width: 100%"
				>
					<!-- <el-table-column
						prop="nodeId"
						label="节点ID"
					></el-table-column> -->
					<el-table-column prop="IP" label="节点IP"></el-table-column>
					<el-table-column
						prop="firstch"
						label="节点一级渠道"
					></el-table-column>
					<el-table-column
						prop="secondch"
						label="节点二级渠道"
					></el-table-column>
					<el-table-column prop="onlineDur" label="当日在线时长">
						<template slot-scope="scope">
							<span>{{ scope.row.onlineDur | s_h }}</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="offlineTime"
						label="当日离线次数"
					></el-table-column>
					<el-table-column
						prop="behavior"
						label="行为"
					></el-table-column>
					<el-table-column
						prop="HChange"
						label="算力变化值"
					></el-table-column>
					<el-table-column
						prop="H"
						label="当前算力"
					>
                    </el-table-column>
			        <el-table-column label="节点ID">
                        <template slot-scope="scope">
                            <el-button
                                @click="show_nodeid(scope.row)"
                                type="text"
                                size="small"
                                >查看</el-button
                            >
                        </template>
			        </el-table-column>
					<el-table-column prop="startTS" sortable label="时间">
						<template slot-scope="scope">{{
							scope.row.date
						}}</template>
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
    formatterDate,
    formatDuring
} from '../../servers/sevdate';
import {
	node_pv,
	node_pv_detail,
	exportexc,
	export_excel,
	get_nodetype_enum,
} from '@/servers/api';
export default {
	data() {
		return {
			radio: '1',
			input: '',
			time_value: '',
			firstchid: '',
			secondchid: '',
			showdisable1: true,
			showdisable2: true,
			order: 1,
			pageNo: 1,
			currentPage: 1,
			totalCnt: 0,
			pagesize: 10,
			starttime: '',
			endtime: '',
			rotate: false,
			showState: false,
			chil_disable: true,
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
				return formatDuring(time);
			} else {
				return time;
			}
		},
	},
	mounted() {
		this.get_search_data();
		if (sessionStorage.getItem('search_condition')) {
			let search_data = JSON.parse(
				sessionStorage.getItem('search_condition')
			);
			this.radio = search_data.radio;
			this.showState = search_data.state;
			this.input = search_data.IP;
			if (search_data.nodeId != '') {
				this.input = search_data.nodeId;
			} else if (search_data.IP != '') {
				this.input = search_data.IP;
			} else {
				this.input = '';
			}
			if ((search_data.channel1 = '')) {
				this.firstchid == '*';
			} else {
				this.firstchid = search_data.channel1;
			}
			if ((search_data.channel2 = '')) {
				this.secondchid == '*';
			} else {
				this.secondchid = search_data.channel2;
			}
			if (search_data.dateStart) {
				let arr = [];
				arr[0] = formatterDate(search_data.dateStart);
				arr[1] = formatterDate(search_data.dateEnd);
				this.time_value = arr;
			}
			this.switch_table();
		} else {
			this.seachuser();
		}
		let munulist = JSON.parse(localStorage.getItem('menus'));
		let pathname = this.$route.path;
		this.menutype = menudisable(munulist, pathname);
	},
	methods: {
		getShow() {
			this.showState = !this.showState;
			this.rotate = !this.rotate;
		},
		reset() {
			this.input = '';
			this.firstchid = '';
			this.secondchid = '';
			this.time_value = '';
			this.chil_disable = true;
			let day1 = new Date();
			let day2 = new Date();
			day1.setTime(day1.getTime() - 7 * 24 * 60 * 60 * 1000);
			day2.setTime(day2.getTime() - 24 * 60 * 60 * 1000);
			let s1 =
				day1.getFullYear() +
				'-' +
				(day1.getMonth() + 1) +
				'-' +
				day1.getDate();
			let s2 =
				day2.getFullYear() +
				'-' +
				(day2.getMonth() + 1) +
				'-' +
				day2.getDate();
			this.starttime = s1;
			this.endtime = s2;
			this.seachuser();
		},
		//切换视图
		switch_table(val) {
			this.currentPage = 1;
			this.seachuser();
		},
		handleChangefirst(val) {
			this.secondchid = '*';
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
			if (this.radio == 1) {
				this.get_node_h();
			} else {
				if (this.time_value != '' && this.time_value != null) {
					this.starttime = dateFormat(this.time_value[0]);
					this.endtime = dateFormat(this.time_value[1]);
					this.get_node_h_detail();
				} else {
					let day1 = new Date();
					let day2 = new Date();
					day1.setTime(day1.getTime() - 7 * 24 * 60 * 60 * 1000);
					day2.setTime(day2.getTime() - 24 * 60 * 60 * 1000);
					let s1 =
						day1.getFullYear() +
						'-' +
						(day1.getMonth() + 1) +
						'-' +
						day1.getDate();
					let s2 =
						day2.getFullYear() +
						'-' +
						(day2.getMonth() + 1) +
						'-' +
						day2.getDate();
					this.starttime = s1;
					this.endtime = s2;
					this.get_node_h_detail();
				}
			}
		},
		get_search_data() {
			let params = new Object();
			params.time = '111';
			get_nodetype_enum(params)
				.then((res) => {
					if (res.status == 0) {
						this.firstchan = res.data.firstchan;
					} else {
						this.$message.error(res.err_msg);
					}
				})
				.catch((error) => {
				});
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
			params.state = this.showState;
			params.radio = this.radio;
			sessionStorage.setItem('search_condition', JSON.stringify(params));
			node_pv(params)
				.then((res) => {
                    this.tableData = [];
					// this.tableData = res.data;
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
						this.showdisable1 = false;
					}
				})
				.catch((error) => {
				});
		},
		get_node_h_detail() {
			this.table_detail_data = [];
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
			params.state = this.showState;
			params.radio = this.radio;
			sessionStorage.setItem('search_condition', JSON.stringify(params));
			node_pv_detail(params)
				.then((res) => {
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
						this.table_detail_data.push(item);
					});

					this.totalCnt = res.dataCount;
					if (res.data && this.table_detail_data.length > 0) {
						this.showdisable2 = false;
					}
					// if(res.status==0){
					//     this.table_detail_data=res.data;
					// }else{
					//     this.$message.error(res.errMsg);
					// }
				})
				.catch((error) => {
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
        //查看节点id
		show_nodeid(val) {
			this.$alert(val.nodeId, '节点ID', {
                showCancelButton: false,
                showConfirmButton:false,
				callback: (action) => {},
			});
		},
        tablechange(column) {
			if (column.order == 'descending') {
				this.order = 1;
			} else {
				this.order = 0;
			}
			this.get_node_h_detail();
		},
		//获取页码
		getpage(pages) {
			this.currentPage = pages;
			if (this.radio == 1) {
				this.get_node_h();
			} else {
				this.get_node_h_detail();
			}
			// this.seachuser();
		},
		//获取每页数量
		gettol(pagetol) {
			this.pagesize = pagetol;
			// this.seachuser();
		},
		// 表头样式设置
		headClass() {
			return 'text-align: center;background:#eeeeee;height:59px;';
		},
		// 表格样式设置
		rowClass() {
			return 'text-align: center;';
		},
	},
	destroyed: function() {
		sessionStorage.removeItem('search_condition');
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
	}
	.showsearch {
		margin-top: 20px;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		background: #f0f5f5;
		padding: 17px 0;
		border-radius: 10px;
	}
	.search_bottom {
		span {
			margin-left: 20px;
		}
		span:first-child {
			margin-left: 0;
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
