<template>
	<div class="content">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item>
				<a>操作日志</a>
			</el-breadcrumb-item>
		</el-breadcrumb>
		<div>
			<!-- 搜索 -->
			<div class="seach">
				<div class="seach_top">
					<el-input
						placeholder="操作人"
						v-model="input"
						class="input-with-select"
					>
						<i
							slot="prefix"
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
					<span>状态：</span>
					<el-select
						v-model="value"
						placeholder="请选择"
						@change="seachuser"
					>
						<el-option label="全部" value=""></el-option>
						<el-option
							v-for="(item, index) in options"
							:key="index"
							:label="item.label"
							:value="item.value"
						></el-option>
					</el-select>
					<span>操作类型：</span>
					<el-select
						v-model="value2"
						placeholder="请选择"
						@change="seachuser"
					>
						<el-option label="全部" value=""></el-option>
						<el-option
							v-for="(item, index) in options2"
							:key="index"
							:label="item.label"
							:value="item.label"
						></el-option>
					</el-select>
					<span>操作时间：</span>
					<el-date-picker
						v-model="value1"
						type="datetimerange"
						range-separator="至"
						start-placeholder="开始日期"
						end-placeholder="结束日期"
						@change="seachuser"
                        :picker-options="endPickerOptions"
					></el-date-picker>
                    <el-button plain  @click="reset()"
							>重置</el-button
						>
					<div class="seach_bottom_btn">
						<!-- <el-button
							type="primary"
							plain
							size="mini"
							@click="seachuser()"
							>确定</el-button
						> -->
						
					</div>
				</div>
			</div>
			<!-- 表格 -->
			<div class="con_lable" style="margin-top:20px;">
				<!-- <div style="text-align:right;margin:10px 0;">
          <el-button type="primary" @click="geydata2()" :disabled="showdisabled"
            >导出</el-button
          >
        </div> -->

				<!-- 表格 -->
				<el-table
					ref="multipleTable"
					:data="tableData"
					tooltip-effect="dark"
					style="width: 100%"
					:cell-style="rowClass"
					:header-cell-style="headClass"
					:default-sort="{ prop: 'date', order: 'descending' }"
				>
					<!-- <el-table-column type="selection" width="55"></el-table-column> -->
					<el-table-column label="状态" width="120">
						<template slot-scope="scope">
							<span
								style="color:red;"
								v-if="scope.row.status == 0"
								>失败</span
							>
							<span style="color:green;" v-else>成功</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="action"
						label="操作类型"
					></el-table-column>
					<el-table-column
						prop="username"
						label="操作人"
					></el-table-column>
					<el-table-column prop="beforevalue" label="原始值">
						<!-- <template slot-scope="scope">
							<span v-if="!scope.row.geydata">--</span>
							<span v-else>{{ scope.row.geydata }}</span>
						</template> -->
					</el-table-column>
					<el-table-column
						prop="aftervalue"
						label="修改值"
					></el-table-column>
                    <el-table-column
						prop="description"
						label="操作内容"
					></el-table-column>
					<el-table-column
						prop="time_create"
						
						label="操作时间"
						><template slot-scope="scope">
							<span>{{ scope.row.time_create | getymd }}</span>
						</template></el-table-column
					>
				</el-table>
				<div
					v-if="tableData.length > 0"
					style="margin-top: 20px;display: flex;justify-content: flex-end;align-items: center;"
				>
					<fenye
						style="text-align: right;margin:20px 0 0 0;"
						@fatherMethod="getpage"
						@fathernum="gettol"
						:pagesa="total_cnt"
						:currentPage="currentPage"
					></fenye>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import fenye from '@/components/fenye';
import { actionlog, setactionlog } from '../../servers/api';
import { getymdtime } from '../../servers/sevdate';
export default {
	data() {
		return {
			currentPage: 1,
			currentPage2: 1,
			showdisabled: false,
			total_cnt: 0,
			tolpage2: 1,
			pagesize: 10,
			value1: '',
			input: '',
			dialogFormVisible: false,
			dialog: false,
			dialupdata: false,
			dialpwdset: false,
			radio: '1',
			radioes: '1',
			isIndeterminate: '',
			sadioes: '1',
			details: {},
			uetails: {},
			formLabelWidth: '60px',
			optiondisplay: false,
			rotate: false,
			gridData: [],
			options: [
				{
					value: 0,
					label: '失败'
				},
				{
					value: 1,
					label: '成功'
				}
			],
			value: '',
			options2: [
				{
					value: 0,
					label: '新增'
				},
				{
					value: 1,
					label: '修改'
				},
				{
					value: 2,
					label: '删除'
				},
				{
					value: 3,
					label: '导出'
				}
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
				}
			},
			value2: '',
			tableData: [],
			tableData2: []
		};
	},
	filters: {
		//时间戳转时间
		getymd(time) {
			return getymdtime(time);
		}
	},
	components: {
		fenye
	},
	mounted() {
		this.geydata();
	},
	methods: {
		geydata() {
			this.tableData = [];
			let parmas = new Object();
			parmas.page = this.currentPage - 1;
			parmas.search = this.input;
			parmas.action = this.value2;
			parmas.utype = 'ipfs';
			if (this.value1 != '' && this.value1 != null) {
				parmas.start_ts = this.common.dateToMs(this.value1[0]);
				parmas.end_ts = this.common.dateToMs(this.value1[1]);
			} else {
				parmas.start_ts =
					new Date(new Date().toLocaleDateString()).getTime() / 1000 -
					89 * 24 * 60 * 60;
				parmas.end_ts = Date.parse(new Date()) / 1000;
			}
			if (this.value === '') {
				parmas.status = null;
			} else {
				parmas.status = this.value;
			}
			actionlog(parmas)
				.then(res => {
					if (res.status == 0) {
						if (res.result.page == 0) {
							if (res.result.les_count == 0) {
								this.total_cnt = res.result.cols.length;
							} else {
								this.total_cnt =
									res.result.cols.length +
									res.result.les_count;
							}
						}
						this.tableData = this.tableData.concat(res.result.cols);
						if (this.tableData.length <= 0) {
							this.showdisabled = true;
						}
					} else {
						this.showdisabled = true;
						this.$message.error(res.msg);
					}
				})
				.catch(err => {});
		},
		geydata2() {
			// this.tableData = [];
			let parmas = new Object();
			parmas.page = this.currentPage2 - 1;
			parmas.search = '';
			parmas.action = '';
			parmas.start_ts = '';
			parmas.end_ts = '';
			parmas.status = null;
			parmas.utype = 'ipfs';
			actionlog(parmas)
				.then(res => {
					if (res.status == 0) {
						this.tableData2 = this.tableData2.concat(
							res.result.cols
						);
						if (res.result.page == 0) {
							this.total_cnt = res.result.les_count;
						}
						if (res.result.les_count == 0) {
							this.exportExcel();
							this.fan.fanactionlog('导出', '操作日志', 1);
							this.geydata();
						} else {
							this.currentPage2++;
							this.geydata2();
						}
					} else {
						this.$message.error(res.msg);
					}
				})
				.catch(err => {
					this.fan.fanactionlog('导出', '操作日志', 0);
				});
		},
		//获取页码
		getpage(pages) {
			this.currentPage = pages;
			this.geydata();
			this.$forceUpdate();
		},
		//获取每页数量
		gettol(pagetol) {
			this.pagesize = pagetol;
			this.geydata();
		},
		//筛选按钮
		option_display() {
			this.optiondisplay = !this.optiondisplay;
			this.rotate = !this.rotate;
		},
		//确定搜索
		seachuser() {
			this.geydata();
		},
		//重置
		reset() {
			this.value = '';
			this.input = '';
			this.value1 = '';
			this.value2 = '';
			this.geydata();
		},
		// 表头样式设置
		headClass() {
			return 'text-align: center;background:#eef1f6;';
		},
		// 表格样式设置
		rowClass() {
			return 'text-align: center;';
		},
		exportExcel() {
			require.ensure([], () => {
				const {
					export_json_to_excel
				} = require('../../excel/Export2Excel.js');
				const tHeader = [
					'状态',
					'类型',
					'操作人',
					'原始值',
					'修改值',
					'修改时间'
				];
				// 上面设置Excel的表格第一行的标题
				const filterVal = [
					'radio',
					'action',
					'username',
					'geydata',
					'description',
					'time_create'
				];
				// 上面的index、nickName、name是tableData里对象的属性
				const list = this.tableData2; //把data里的tableData存到list
				const data = this.formatJson(filterVal, list);
				export_json_to_excel(tHeader, data, 'IP流量');
				this.tableData2 = [];
			});
		},
		formatJson(filterVal, jsonData) {
			return jsonData.map(v => filterVal.map(j => v[j]));
		}
	}
};
</script>

<style lang="scss" scoped>
.customWidth {
	width: 30% !important;
}
.content {
	height: 100%;
	text-align: left;
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
			// height: 100px;
			background: #f0f5f5;
			border-radius: 10px;
			padding: 10px 15px;
			.el-select {
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
