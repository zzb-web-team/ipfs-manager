<template>
	<div class="content">
		<!--  -->
		<div class="org_con">
			<div class="btn_area">
				<el-button
					type="primary"
                    size="small"
					@click="uodatadialogVisible"
					v-show="menutype.roleC == 1"
					>新建部门</el-button
				>
				<el-button
					type="primary"
                    size="small"
					@click="nwisible"
					v-show="menutype.roleC == 1"
					>新建下级部门</el-button
				>
			</div>
			<!-- 新建部门弹窗 -->
			<el-dialog
				:title="netitle"
				:visible.sync="dialogFormVisible"
				width="650px"
				class="firstorganization_dialog"
				@close="showfirsterror"
				:close-on-click-modal="false"
			>
				<el-form :model="form" ref="firstruleForm">
					<el-form-item
						label=""
						prop="nuname"
						:rules="[{ validator: jioname, trigger: 'blur' }]"
					>
						<el-col :span="12" :offset="6">
							<el-input
								v-model="form.nuname"
								autocomplete="off"
							></el-input>
						</el-col>
					</el-form-item>
					<el-col :span="18" :offset="6">
						<p>
							4-20字符，英文字母、汉字、数字组合，可为纯英文、汉字、数字
						</p>
					</el-col>
				</el-form>
				<div
					slot="footer"
					class="dialog-footer"
					style="text-align:center;"
				>
					<el-button @click="resetForm('firstruleForm')"
						>取 消</el-button
					>
					<el-button
						type="primary"
						@click="firstsubmitForm('firstruleForm')"
						>确 定</el-button
					>
				</div>
			</el-dialog>
			<!-- 新建下级部门弹窗 -->
			<el-dialog
				:title="titlename"
				:visible.sync="nwFormVisible"
				width="650px"
				class="organization_dialog"
				@close="showerror"
				:close-on-click-modal="false"
			>
				<el-col :span="19" :offset="4">
					<el-form :model="form" ref="ruleForm">
						<el-form-item
							label="部　　门"
							prop="region"
							:rules="[
								{ validator: jioregion, trigger: 'change' },
							]"
						>
							<el-select
								v-model="form.region"
								placeholder="请选择部门"
							>
								<el-option
									v-for="item in firstme"
									:key="item.id"
									:label="item.name"
									:value="item.id"
								>
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item
							label="下级部门"
							prop="name"
							:rules="[{ validator: jioname, trigger: 'blur' }]"
						>
							<el-col :span="11">
								<el-input
									v-model="form.name"
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
					<el-button @click="resetForm('ruleForm')">取 消</el-button>
					<el-button type="primary" @click="submitForm('ruleForm')"
						>确 定</el-button
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
				<el-table-column prop="parent" label="一级部门">
					<template slot-scope="scope">
						{{
							scope.row.parent == '-'
								? scope.row.name
								: scope.row.parent
						}}
					</template>
				</el-table-column>
				<el-table-column
					prop="name"
					label="二级部门"
					show-overflow-tooltip
				>
					<template slot-scope="scope">
						{{ scope.row.parent != '-' ? scope.row.name : '--' }}
					</template>
				</el-table-column>
				<el-table-column prop="user" label="账户">
					<template slot-scope="scope">
						<span
							v-for="(item, index) in scope.row.user"
							:key="index"
						>
							{{ item.name }},
						</span>
					</template>
				</el-table-column>
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
					:disabled="deldisable"
					>删除</el-button
				>
				<fenye
					style="text-align: right;margin:10px 0 0 0;"
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
import { menudisable } from '../../servers/sevdate';
import {
	departmentlist,
	adddepartment,
	updatedepartment,
	deldepartment,
	gettopdepartment,
} from '@/servers/api';
export default {
	data() {
		return {
			pagesize: 10,
			total_cnt: 1,
			currentPage: 1,
			netitle: '新建部门',
			titlename: '新建下级部门',
			dialogFormVisible: false,
			nwFormVisible: false,
			tableData: [],
			form: {
				region: '',
				name: '',
				nuname: '',
				id: 0,
			},
			multipleSelection: [],
			firstme: [],
			deldisable: true,
			menutype: {},
			zdata: '',
		};
	},
	mounted() {
		this.get_firstme();
		this.getdatalist();
		let munulist = JSON.parse(localStorage.getItem('menus'));
		let pathname = this.$route.path;
		this.menutype = menudisable(munulist, pathname);
	},
	methods: {
		//获取部门列表
		getdatalist() {
			let params = new Object();
			params.page = this.currentPage - 1;
			departmentlist(params)
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
		//获取一级部门
		get_firstme() {
			let params = new Object();
			gettopdepartment(params)
				.then((res) => {
					if (res.status == 0) {
						this.firstme = res.result.cols;
					}
				})
				.catch((error) => {});
		},
		//新建部门
		uodatadialogVisible() {
			this.netitle = '新建部门';
			this.dialogFormVisible = true;
		},
		//新建下级部门
		nwisible() {
			this.titlename = '新建下级部门';
			this.nwFormVisible = true;
		},
		//新建部门--确定
		firstsubmitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					if (this.netitle == '新建部门') {
						let params = new Object();
						params.pid = 0;
						params.name = this.form.nuname;
						adddepartment(params)
							.then((res) => {
								this.dialogFormVisible = false;
								if (res.status == 0) {
									this.form.nuname = '';
									this.$message.success('新建成功');
									this.fan.fanactionlog(
										'新增',
										'新建一级部门',
										1,
										'-',
										params.name
									);
									this.get_firstme();
									this.getdatalist();
								} else {
									this.$message.error(res.msg);
									this.fan.fanactionlog(
										'新增',
										'新建一级部门',
										0,
										'-',
										params.name
									);
								}
							})
							.catch((error) => {});
					} else {
						let params = new Object();
						params.id = this.form.id;
						params.pid = 0;
						params.name = this.form.nuname;
						updatedepartment(params)
							.then((res) => {
								this.dialogFormVisible = false;
								this.form.id = '';
								this.form.pid = '';
								this.form.name = '';
								if (res.status == 0) {
									this.$message.success('修改成功');
									this.getdatalist();
									this.get_firstme();
									this.fan.fanactionlog(
										'修改',
										'修改一级部门',
										1,
										this.zdata.parent,
										params.name
									);
								} else {
									this.$message.error(res.msg);
									this.fan.fanactionlog(
										'修改',
										'修改一级部门',
										0,
										this.zdata.parent,
										params.name
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
		//新建下级部门--确定
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					if (this.titlename == '新建下级部门') {
						let params = new Object();
						params.pid = this.form.region;
						params.name = this.form.name;
						adddepartment(params)
							.then((res) => {
								this.nwFormVisible = false;
								if (res.status == 0) {
									this.form.nuname = '';
									this.$message.success('新建成功');
									this.getdatalist();
									this.fan.fanactionlog(
										'新增',
										'新建二级部门',
										1,
										'-',
										params.name
									);
								} else {
									this.$message.error(res.msg);
									this.fan.fanactionlog(
										'新增',
										'新建二级部门',
										0,
										'-',
										params.name
									);
								}
							})
							.catch((error) => {});
					} else {
						let params = new Object();
						params.id = this.form.id;
						params.pid = this.form.region;
						params.name = this.form.name;
						updatedepartment(params)
							.then((res) => {
								this.nwFormVisible = false;
								this.form.id = '';
								this.form.pid = '';
								this.form.name = '';
								if (res.status == 0) {
									this.$message.success('修改成功');
									this.getdatalist();
									this.get_firstme();
									if (this.zdata.name == params.name) {
										this.fan.fanactionlog(
											'修改',
											'修改二级部门',
											1,
											this.zdata.parent,
											params.name
										);
									} else {
										this.fan.fanactionlog(
											'修改',
											'修改二级部门',
											1,
											this.zdata.name,
											params.name
										);
									}
								} else {
									this.$message.error(res.msg);
									if (this.zdata.name == params.name) {
										this.fan.fanactionlog(
											'修改',
											'修改二级部门',
											0,
											this.zdata.parent,
											params.name
										);
									} else {
										this.fan.fanactionlog(
											'修改',
											'修改二级部门',
											0,
											this.zdata.name,
											params.name
										);
									}
								}
							})
							.catch((error) => {});
					}
				} else {
					return false;
				}
			});
		},
		showfirsterror() {
			this.resetForm('firstruleForm');
		},
		showerror() {
			this.resetForm('ruleForm');
		},
		//弹窗-取消
		resetForm(formName) {
			this.$refs[formName].resetFields();
			this.nwFormVisible = false;
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
		//修改
		handleClick(data) {
			this.zdata = data;
			if (data.name != '-') {
				this.titlename = '修改部门';
				this.nwFormVisible = true;
				this.form.region = data.pid;
				this.form.name = data.name;
				this.form.id = data.id;
			} else {
				this.netitle = '修改部门';
				this.dialogFormVisible = true;
				this.form.nuname = data.parent;
				this.form.id = data.id;
			}
		},
		//删除
		deleteRow(data) {
			this.$confirm('确定该部门下没有人员?删除部门', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					let params = new Object();
					params.ids = [];
					if (data) {
						let obj = new Object();
						obj.id = data.id;
						obj.name = data.name;
						obj.parent = data.parent;
						params.ids.push(obj);
					} else {
						this.multipleSelection.forEach((item) => {
							let obj = new Object();
							obj.id = item.id;
							params.ids.push(obj);
						});
					}
					deldepartment(params)
						.then((res) => {
							if (res.status == 0) {
								this.$message.success('删除成功');
								this.get_firstme();
								this.getdatalist();
								if (data) {
									if (data.name == '-') {
										this.fan.fanactionlog(
											'删除',
											'删除一级部门',
											1,
											data.parent,
											'-'
										);
									} else {
										this.fan.fanactionlog(
											'删除',
											'删除二级部门',
											1,
											data.name,
											'-'
										);
									}
								} else {
									this.fan.fanactionlog(
										'删除',
										'批量删除部门',
										1
									);
								}
							} else {
								this.$message.error(res.msg);
								if (data) {
									if (data.name == '-') {
										this.fan.fanactionlog(
											'删除',
											'删除一级部门',
											0,
											data.parent,
											'-'
										);
									} else {
										this.fan.fanactionlog(
											'删除',
											'删除二级部门',
											0,
											data.name,
											'-'
										);
									}
								} else {
									this.fan.fanactionlog(
										'删除',
										'批量删除部门',
										0
									);
								}
							}
						})
						.catch((error) => {});
				})
				.catch(() => {});
		},
		//获取页码
		getpage(pages) {
			this.currentPage = pages;
			this.getdatalist();
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
				callback(new Error('部门名称不能为空'));
			} else {
				if (
					value.replace(/[^\u0000-\u00ff]/g, 'aa').length >= 4 &&
					value.replace(/[^\u0000-\u00ff]/g, 'aa').length <= 20
				) {
					var fsdtel = /^[\u4e00-\u9fa50-9a-zA-Z]{2,10}$/;
					if (fsdtel.test(value) === false) {
						callback(new Error('部门名称格式错误'));
					} else {
						callback();
					}
				} else {
					callback(new Error('部门名称长度不合规范'));
				}
			}
		},
		jioregion(rule, value, callback) {
			if (value === '') {
				callback(new Error('请选择一级部门'));
			} else {
				callback();
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
			display: flex;
			margin-top: 20px;
			margin-bottom: 20px;
			justify-content: space-between;
		}
	}
}
</style>
