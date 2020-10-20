<template>
	<div class="content">
		<!-- <el-breadcrumb separator="/">
			<el-breadcrumb-item>
				<a href="/">职位管理</a>
			</el-breadcrumb-item>
		</el-breadcrumb> -->
		<!--  -->
		<div class="org_con">
			<div class="btn_area">
				<el-button
					type="primary"
					@click="nwisible"
					size="small"
					v-show="menutype.roleC == 1"
					>新建职位</el-button
				>
			</div>
			<!--  -->
			<!-- 新建部门弹窗 -->
			<el-dialog
				:title="diatitle"
				:visible.sync="dialogFormVisible"
				width="650px"
				class="posi_dialog"
				@close="showerror"
				:close-on-click-modal="false"
			>
				<el-col :span="19" :offset="4">
					<el-form :model="form" ref="firstruleForm">
						<el-form-item
							label="职位"
							prop="nuname"
							:rules="[{ validator: jioname, trigger: 'blur' }]"
						>
							<el-col :span="11">
								<el-input
									v-model="form.nuname"
									autocomplete="off"
								></el-input>
							</el-col>
						</el-form-item>
						<p>
							4-20字符，英文字母、汉字、数字组合，可为纯英文、汉字、数字
						</p>
					</el-form>
				</el-col>
				<div
					slot="footer"
					class="dialog-footer"
					style="text-align:center;"
				>
					<el-button
						type="primary"
						@click="firstsubmitForm('firstruleForm')"
						>确 定</el-button
					>
					<el-button @click="resetForm('firstruleForm')"
						>取 消</el-button
					>
				</div>
			</el-dialog>
			<!--  -->
			<el-table
				ref="multipleTable"
				:data="tableData"
				tooltip-effect="dark"
				style="width: 100%"
				border
				:cell-style="rowClass"
				:header-cell-style="headClass"
				@selection-change="handleSelectionChange"
			>
				<el-table-column type="selection"> </el-table-column>
				<el-table-column label="ID">
					<template slot-scope="scope">{{ scope.row.id }}</template>
				</el-table-column>
				<el-table-column prop="name" label="职位"> </el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button
							v-show="menutype.roleU == 1"
							@click="handleClick(scope.row)"
							type="text"
							size="small"
							>修改</el-button
						>
						<el-button
							v-show="menutype.roleD == 1"
							@click.native.prevent="deleteRow(scope.row)"
							type="text"
							size="small"
							style="color:#F85555"
							>删除</el-button
						>
					</template>
				</el-table-column>
			</el-table>
			<div class="btn_area">
				<el-button
					v-show="menutype.roleD == 1"
					type="danger"
					@click="deleteRow()"
					size="small"
					:disabled="deldisable"
					>删除</el-button
				>
				<fenye
					style="float:right;margin:10px 0 0 0;"
					@fatherMethod="getpage"
					@fathernum="gettol"
					:pagesa="total_cnt"
					:currentPage="currentPage"
				></fenye>
			</div>
		</div>
	</div>
</template>

<script>
import fenye from '@/components/fenye';
import {
	positionlist,
	addposition,
	updateposition,
	delposition,
} from '@/servers/api';
import { menudisable } from '../../servers/sevdate';
export default {
	data() {
		return {
			pagesize: 10,
			total_cnt: 1,
			currentPage: 1,
			dialogFormVisible: false,
			diatitle: '新建职位',
			tableData: [
				{
					id: '1',
					name: 'AI组',
				},
				{
					id: '2',
					name: '大数据组',
				},
			],
			multipleSelection: [],
			deldisable: true,
			form: {
				nuname: '',
				id: 0,
			},
			menutype: {},
			zdata: '',
		};
	},
	mounted() {
		this.getposition_list();
		let munulist = JSON.parse(localStorage.getItem('menus'));
		let pathname = this.$route.path;
		this.menutype = menudisable(munulist, pathname);
	},
	methods: {
		getposition_list() {
			let params = new Object();
			params.page = this.currentPage - 1;
			positionlist(params)
				.then((res) => {
					if (res.status == 0) {
						this.tableData = res.result.cols;
						if (params.page == 0) {
							if (res.result.les_count == 0) {
								this.total_cnt = res.result.cols.length;
							} else {
								this.total_cnt = res.result.les_count + 10;
							}
						}
					} else {
						this.$message(res.msg);
					}
				})
				.catch((error) => {});
		},
		//新建下级部门
		nwisible() {
			this.diatitle = '新建职位';
			this.dialogFormVisible = true;
		},
		//新建部门--确定
		firstsubmitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.dialogFormVisible = false;
					if (this.diatitle == '新建职位') {
						let params = new Object();
						params.name = this.form.nuname;
						addposition(params)
							.then((res) => {
								this.form.nuname = '';
								this.form.id = '';
								if (res.status == 0) {
									this.$message.success('添加成功');
									this.form.nuname = '';
									this.getposition_list();
									this.fan.fanactionlog(
										'新建',
										'新建职位',
										1,
										'-',
										params.name
									);
								} else {
									this.$message(res.msg);
									this.fan.fanactionlog(
										'新建',
										'新建职位',
										0,
										'-',
										params.name
									);
								}
							})
							.catch((error) => {});
					} else {
						let parame = new Object();
						parame.id = this.form.id;
						parame.name = this.form.nuname;
						updateposition(parame)
							.then((res) => {
								this.form.nuname = '';
								this.form.id = '';
								if (res.status == 0) {
									this.$message.success('修改成功');
									this.form.nuname = '';
									this.form.id = 0;
									this.getposition_list();
									this.fan.fanactionlog(
										'修改',
										'修改职位',
										1,
										this.zdata.name,
										parame.name
									);
								} else {
									this.$message(res.msg);
									this.fan.fanactionlog(
										'修改',
										'修改职位',
										0,
										this.zdata.name,
										parame.name
									);
								}
							})
							.catch((error) => {});
					}
				} else {
					return false;
				}
			});
		},
		showerror() {
			this.resetForm('firstruleForm');
		},
		//弹窗-取消
		resetForm(formName) {
			this.$refs[formName].resetFields();
			this.form.nuname = '';
			this.form.id = '';
			this.dialogFormVisible = false;
		},
		// 全选
		handleSelectionChange(val) {
			this.multipleSelection = val;
			if (this.multipleSelection.length <= 0) {
				this.deldisable = true;
			} else {
				this.deldisable = false;
			}
		},
		handleClick(data) {
			this.zdata = data;
			this.form.nuname = data.name;
			this.form.id = data.id;
			this.diatitle = '修改职位';
			this.dialogFormVisible = true;
		},
		//删除
		deleteRow(data) {
			this.$confirm(
				'删除职位后当前职位下的人员的职位会被清空, 是否继续?',
				'提示',
				{
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
				}
			)
				.then(() => {
					let params = new Object();
					params.ids = [];
					if (data) {
						let obj = {};
						obj.id = data.id;
						params.ids.push(obj);
					} else {
						this.multipleSelection.forEach((item) => {
							let obj = {};
							obj.id = item.id;
							params.ids.push(obj);
						});
					}
					delposition(params)
						.then((res) => {
							if (res.status == 0) {
								this.$message({
									message: '删除成功',
									type: 'success',
								});
								this.getposition_list();
								this.fan.fanactionlog(
									'删除',
									'删除职位',
									1,
									data.name,
									'-'
								);
							} else {
								this.$message(res.msg);
								this.fan.fanactionlog(
									'删除',
									'删除职位',
									0,
									data.name,
									'-'
								);
							}
						})
						.catch((error) => {});
				})
				.catch(() => {});
		},
		//获取页码
		getpage(pages) {
			this.currentPage = pages;
			this.getposition_list();
		},
		//获取每页数量
		gettol(pagetol) {
			this.pagesize = pagetol;
			//this.getdata();
		},
		// 表头样式设置
		headClass() {
			return 'text-align: center;background:#eeeeee;';
		},
		// 表格样式设置
		rowClass() {
			return 'text-align: center;';
		},
		//校验格式
		jioname(rule, value, callback) {
			if (value === '') {
				callback(new Error('职位名称不能为空'));
			} else {
				if (
					value.replace(/[^\u0000-\u00ff]/g, 'aa').length >= 4 &&
					value.replace(/[^\u0000-\u00ff]/g, 'aa').length <= 20
				) {
					var fsdtel = /^[\u4e00-\u9fa50-9a-zA-Z]{2,10}$/;
					if (fsdtel.test(value) === false) {
						callback(new Error('职位名称格式错误'));
					} else {
						callback();
					}
				} else {
					callback(new Error('职位名称长度不合规范'));
				}
			}
		},
	},
	components: {
		fenye,
	},
};
</script>

<style lang="scss" scoped>
.content {
	text-align: left;
	.org_con {
		background-color: #fff;
		margin: 24px 30px;
		box-sizing: border-box;
		padding: 24px;
		border-radius: 8px;
		box-shadow: 0px 4px 10px 0px rgba(51, 51, 51, 0.04);
		.btn_area {
			margin-top: 20px;
			margin-bottom: 20px;
			height: 40px;
		}
	}
}
</style>
