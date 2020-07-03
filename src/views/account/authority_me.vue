<template>
	<div class="content">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item>
				<a href="/">权限管理</a>
			</el-breadcrumb-item>
		</el-breadcrumb>
		<!--  -->
		<div class="org_con">
			<el-row :gutter="24">
				<el-col :span="4"
					><el-input
						v-show="menutype.roleC == 1"
						v-model="input"
						placeholder="请输入分组名称"
						@keyup.enter.native="search"
						><i
							slot="prefix"
							class="el-input__icon el-icon-search"
							@click="search"
						></i></el-input
				></el-col>
			</el-row>
			<div class="btn_area">
				<el-button
					type="primary"
					@click="nwisible"
					v-show="menutype.roleC == 1"
					>新建权限分组</el-button
				>
			</div>
			<!--  -->
			<el-dialog
				:title="title"
				:visible.sync="dialogFormVisible"
				width="850px"
				class="organization_dialog"
			>
				<el-col :span="19" :offset="4">
					<el-form :model="form" ref="firstruleForm">
						<el-form-item
							label="分组名称"
							prop="title"
							:rules="[
								{ required: true, message: '请输入分组名称' },
								{ validator: jioname, trigger: 'blur' },
							]"
						>
							<el-col :span="11">
								<el-input
									v-model="form.title"
									autocomplete="off"
								></el-input>
							</el-col>
						</el-form-item>
						<p class="tishi">
							4-20字符，英文字母、汉字、数字组合，可为纯英文、汉字、数字
						</p>
						<el-form-item label="　 　描述" prop="description">
							<el-col :span="11">
								<el-input
									type="textarea"
									:autosize="{ minRows: 3, maxRows: 1 }"
									placeholder="请输入内容"
									maxlength="30"
									v-model="form.description"
									show-word-limit
									collapse-tags
									:show-all-levels="false"
								>
								</el-input>
							</el-col>
						</el-form-item>
						<el-form-item label="分组用户" prop="userlist">
							<el-cascader
								v-model="form.userlist"
								:options="options"
								:props="props"
								:key="form.userlist.id"
								ref="refSubCat"
								:show-all-levels="false"
								clearable
								:disabled="updatadis"
							></el-cascader>
						</el-form-item>
					</el-form>
				</el-col>
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
			<!--  -->
			<el-table
				ref="multipleTable"
				:data="tableData"
				tooltip-effect="dark"
				style="width: 100%"
				border
				:cell-style="rowClass"
				:header-cell-style="headClass"
			>
				<el-table-column label="ID" prop="id"> </el-table-column>
				<el-table-column label="分组名称" prop="name">
				</el-table-column>
				<el-table-column label="分组描述" prop="description">
				</el-table-column>
				<el-table-column prop="user" label="用户列表">
					<template slot-scope="scope">
						<span v-if="scope.row.user.length <= 0">
							--
						</span>
						<span v-else v-for="item in scope.row.user">
							{{ item.label }},
						</span>
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button
							v-show="menutype.roleU == 1"
							@click="updatahandleClick(scope.row)"
							type="text"
							size="small"
							>修改</el-button
						>
						<el-button
							v-show="menutype.roleU == 1"
							@click="handleClick(scope.row)"
							type="text"
							size="small"
							>权限管理</el-button
						>
						<el-button
							v-show="menutype.roleD == 1"
							@click.native.prevent="deleteRow(scope.row)"
							type="text"
							size="small"
							>删除</el-button
						>
					</template>
				</el-table-column>
			</el-table>
			<!--  -->
			<el-dialog
				title="权限管理"
				:visible.sync="quanVisible"
				width="650px"
				class="organization_dialog"
			>
				<el-tree
					:data="data"
					show-checkbox
					default-expand-all
					node-key="id"
					ref="tree"
					highlight-current
				>
				</el-tree>
				<div
					slot="footer"
					class="dialog-footer"
					style="text-align:center;"
				>
					<el-button @click="resetChecked()">取 消</el-button>
					<el-button type="primary" @click="queChecked()"
						>确 定</el-button
					>
				</div>
			</el-dialog>

			<!--  -->
			<div class="btn_area">
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
	rolelist,
	addrole,
	updaterole,
	delrole,
	searchuser,
	userlistaddrole,
	menulistuser,
	getuserdepartment,
	updateroleinfo,
} from '@/servers/api';
import { arrTrans, menudisable } from '../../servers/sevdate';
export default {
	data() {
		return {
			props: { value: 'id', currentLabels: 'label', multiple: true },
			input: '',
			pagesize: 10,
			total_cnt: 1,
			currentPage: 1,
			title: '新建权限分组',
			tableData: [],
			dialogFormVisible: false,
			quanVisible: false,
			updatadis: false,
			form: {
				title: '',
				description: '',
				userlist: [],
			},
			props: { multiple: true },
			options: [],
			data: [
				// {
				// 	id: 1,
				// 	label: '一级 1',
				// 	children: [
				// 		{
				// 			id: 4,
				// 			label: '二级 1-1',
				// 			children: [
				// 				{
				// 					id: 9,
				// 					label: '三级 1-1-1',
				// 				},
				// 				{
				// 					id: 10,
				// 					label: '三级 1-1-2',
				// 				},
				// 			],
				// 		},
				// 	],
				// },
			],
			defaultProps: {
				children: 'children',
				label: 'label',
			},
			user_list: [],
			item_menuid: 0,
			menutype: {},
		};
	},
	filters: {},
	mounted() {
		this.get_datalist();
		this.get_user_list();
		let munulist = JSON.parse(sessionStorage.getItem('menus'));
		let pathname = this.$route.path;
		this.menutype = menudisable(munulist, pathname);
		console.log(this.menutype);
	},
	methods: {
		search() {
			this.get_datalist();
		},
		get_datalist() {
			let params = new Object();
			params.page = this.currentPage - 1;
			params.search = this.input;
			rolelist(params)
				.then((res) => {
					if (res.status == 0) {
						this.tableData = res.result.cols;
						if (res.menulist && res.menulist.length > 0) {
							res.menulist.forEach((item) => {
								if (item.children && item.children.length > 0) {
									item.children.forEach((k) => {
										if (
											k.children &&
											k.children.length > 0
										) {
											k.children.forEach((i) => {
												if (i.read_status == 1) {
													let obj = {};
													obj.id = parseInt(
														i.id + '1'
													);
													obj.label = '浏览';
													i.children.push(obj);
												}
												if (i.export_status == 1) {
													let obj = {};
													obj.id = parseInt(
														i.id + '2'
													);
													obj.label = '导出';
													i.children.push(obj);
												}
												if (i.insert_status == 1) {
													let obj = {};
													obj.id = parseInt(
														i.id + '3'
													);
													if (i.label == '账户管理') {
														obj.label = '新建账户';
													} else if (
														i.label == '组织管理'
													) {
														obj.label = '新建组织';
													} else if (
														i.label == '权限管理'
													) {
														obj.label =
															'新建权限分组';
													}
													obj.label = '添加';
													i.children.push(obj);
												}

												if (i.update_status == 1) {
													let obj = {};
													obj.id = parseInt(
														i.id + '4'
													);
													if (i.label == '节点信息') {
														obj.label = '启用/禁用';
													} else {
														obj.label = '修改';
													}
													i.children.push(obj);
												}
												if (i.import_status == 1) {
													let obj = {};
													obj.id = parseInt(
														i.id + '5'
													);
													obj.label = '导入';
													i.children.push(obj);
												}
												if (i.delete_status == 1) {
													let obj = {};
													obj.id = parseInt(
														i.id + '6'
													);
													obj.label = '删除';
													i.children.push(obj);
												}
											});
										} else {
											if (k.read_status == 1) {
												let obj = {};
												obj.id = parseInt(k.id + '1');
												obj.label = '浏览';
												k.children.push(obj);
											}
											if (k.export_status == 1) {
												let obj = {};
												obj.id = parseInt(k.id + '2');
												obj.label = '导出';
												k.children.push(obj);
											}
											if (k.insert_status == 1) {
												let obj = {};
												obj.id = parseInt(k.id + '3');
												if (k.label == '账户管理') {
													obj.label = '新建账户';
												} else if (
													k.label == '组织管理'
												) {
													obj.label = '新建组织';
												} else if (
													k.label == '权限管理'
												) {
													obj.label = '新建权限分组';
												}
												obj.label = '添加';
												k.children.push(obj);
											}

											if (k.update_status == 1) {
												let obj = {};
												obj.id = parseInt(k.id + '4');
												if (k.label == '节点信息') {
													obj.label = '启用/禁用';
												} else {
													obj.label = '修改';
												}
												k.children.push(obj);
											}
											if (k.import_status == 1) {
												let obj = {};
												obj.id = parseInt(k.id + '5');
												obj.label = '导入';
												k.children.push(obj);
											}
											if (k.delete_status == 1) {
												let obj = {};
												obj.id = parseInt(k.id + '6');
												obj.label = '删除';
												k.children.push(obj);
											}
										}
									});
								} else {
								}
							});
						}
						this.data = res.menulist;

						if (params.page == 0) {
							if (res.result.les_count == 0) {
								this.total_cnt = res.result.cols.length;
							} else {
								this.total_cnt = res.result.les_count + 10;
							}
						}
					} else {
						this.$message.error(res.msg);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		},
		//获取分组用户
		get_user_list() {
			let params = new Object();
			userlistaddrole()
				.then((res) => {
					if (res.status == 0) {
						res.data.forEach((item) => {
							item.label = item.name;
							item.value = item.id;
							if (item.children) {
								item.children.forEach((amite) => {
									amite.label = amite.name;
									amite.value = amite.id;
									if (amite.user) {
										amite.user.forEach((cimt) => {
											cimt.value = cimt.id;
										});
										amite.children = amite.user;
									}
								});
							}
						});
						this.options = res.data;
					} else {
						this.$message.error(res.msg);
					}
				})
				.catch((error) => {});
		},
		//新建
		nwisible() {
			this.dialogFormVisible = true;
			this.updatadis = false;
			this.title = '新建权限分组';
		},
		//新建--确定
		firstsubmitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					if (this.title == '新建权限分组') {
						let params = new Object();
						params.name = this.form.title;
						params.description = this.form.description;
						if (this.form.userlist.length > 0) {
							this.form.userlist.forEach((item) => {
								if (item[2]) {
									let str = '';
									str = item[2] + ',';
									params.userid += str;
								}
							});
							params.userid = params.userid.substring(
								0,
								params.userid.length - 1
							);
						}

						addrole(params)
							.then((res) => {
								this.form.title = '';
								this.form.description = '';
								this.form.userlist = [];
								this.dialogFormVisible = false;
								if (res.status == 0) {
									this.$message.success('添加成功');
									this.get_datalist();
								} else {
									this.$message.error(res.msg);
								}
							})
							.catch((error) => {});
					} else {
						let params = new Object();
						params.roleid = this.form.id;
						params.name = this.form.title;
						params.description = this.form.description;
						params.data = [];

						updaterole(params)
							.then((res) => {
								this.form.title = '';
								this.form.description = '';
								this.form.userlist = [];
								this.dialogFormVisible = false;
								if (res.status == 0) {
									this.$message.success('修改成功');
									this.get_datalist();
								} else {
									this.$message.error(res.msg);
								}
							})
							.catch((eerror) => {});
					}
				} else {
					return false;
				}
			});
		},
		//弹窗-取消
		resetForm(formName) {
			this.$refs[formName].resetFields();
			this.dialogFormVisible = false;
		},
		//配置权限
		handleClick(data) {
			this.quanVisible = true;
			this.item_menuid = data.id;
			if (data.roleinfo && data.roleinfo.length > 0) {
				var id_arr = [];
				data.roleinfo.forEach((item) => {
					let num = 0;
					if (item.roleC == 1) {
						num = item.menuid + '3';
						id_arr.push(parseInt(num));
						id_arr.push(parseInt(item.menuid + '1'));
					}
					if (item.roleD == 1) {
						num = item.menuid + '6';
						id_arr.push(parseInt(num));
						id_arr.push(parseInt(item.menuid + '1'));
					}
					if (item.roleE == 1) {
						num = item.menuid + '2';
						id_arr.push(parseInt(num));
						id_arr.push(parseInt(item.menuid + '1'));
					}
					if (item.roleI == 1) {
						num = item.menuid + '5';
						id_arr.push(parseInt(num));
						id_arr.push(parseInt(item.menuid + '1'));
					}
					if (item.roleR == 1) {
						num = item.menuid + '1';
						id_arr.push(parseInt(num));
					}
					if (item.roleU == 1) {
						num = item.menuid + '4';
						id_arr.push(parseInt(num));
						id_arr.push(parseInt(item.menuid + '1'));
					}
				});
			}
			if (id_arr && id_arr.length > 0) {
				this.$nextTick(() => {
					this.$refs.tree.setCheckedKeys(id_arr);
				});
			}
		},
		//权限配置--确定
		queChecked() {
			console.log(this.$refs.tree);
			let arrlist = [];
			let idlist = this.$refs.tree.getCheckedKeys(true);
			idlist.forEach((item, index) => {
				let obj = {};
				item = item + '';
				let menuid = item.substring(0, item.length - 1);
				let role = item.charAt(item.length - 1, 1);

				obj.menuid = menuid;
				if (role == 1) {
					obj.roleR = 1;
				}
				if (role == 2) {
					obj.roleE = 1;
				}
				if (role == 3) {
					obj.roleC = 1;
				}
				if (role == 4) {
					obj.roleU = 1;
				}
				if (role == 5) {
					obj.roleI = 1;
				}
				if (role == 6) {
					obj.roleD = 1;
				}
				arrlist.push(obj);
			});
			let params = new Object();
			params.roleid = this.item_menuid;
			params.data = [];
			params.data = arrlist;
			updateroleinfo(params)
				.then((res) => {
					if (res.status == 0) {
						this.$message.success('配置成功');
						this.quanVisible = false;
						this.get_datalist();
						this.get_user_list();
					} else {
						this.$message.error(res.msg);
					}
				})
				.catch((error) => {});
		},
		//权限配置--取消
		resetChecked() {
			this.$refs.tree.setCheckedKeys([]);
			this.quanVisible = false;
		},
		//修改
		updatahandleClick(data) {
			let _this = this;
			_this.form.userlist = [];
			this.title = '权限分组修改';
			this.dialogFormVisible = true;
			this.updatadis = true;
			this.form.title = data.name;
			this.form.description = data.description;
			this.form.id = data.id;
			if (data.user.length > 0) {
				var id_list = '';
				let params = new Object();
				data.user.forEach((item) => {
					id_list += item.id + ',';
				});
				params.userid = id_list.slice(0, -1);
				getuserdepartment(params)
					.then((res) => {
						if (res.status == 0) {
							var newArr = new Array();
							res.data.forEach((item) => {
								newArr.push(item.pdepartmentid);
								newArr.push(item.departmentid);
								newArr.push(item.userid);
								_this.user_list.push(newArr.splice(0, 3));
							});
							_this.form.userlist = _this.user_list;
						}
					})
					.catch((error) => {});
			}
		},
		deleteRow(data) {
			console.log(data);
			let params = new Object();
			let userstr = '';
			if (data.user) {
				data.user.forEach((item) => {
					userstr += item.id + ',';
				});
				params.userid = userstr.slice(0, -1);
			}
			params.userid = '';
			params.roleid = data.id;
			delrole(params)
				.then((res) => {
					if (res.status == 0) {
						this.$message.success('删除成功');
						this.get_datalist();
					} else {
						this.$message.error(res.msg);
					}
				})
				.catch((error) => {});
		},
		//获取页码
		getpage(pages) {
			this.currentPage = pages;
			this.get_datalist();
		},
		//获取每页数量
		gettol(pagetol) {
			this.pagesize = pagetol;
			//this.get_datalist();
		},
		// 表头样式设置
		headClass() {
			return 'text-align: center;background:#eef1f6;';
		},
		// 表格样式设置
		rowClass() {
			return 'text-align: center;';
		},
		//校验格式
		jioname(rule, value, callback) {
			if (value === '') {
				callback(new Error('分组名称不能为空'));
			} else {
				if (
					value.replace(/[^\u0000-\u00ff]/g, 'aa').length >= 4 &&
					value.replace(/[^\u0000-\u00ff]/g, 'aa').length <= 20
				) {
					var fsdtel = /^[\u4e00-\u9fa50-9a-zA-Z]{2,10}$/;
					if (fsdtel.test(value) === false) {
						callback(new Error('分组名称格式错误'));
					} else {
						callback();
					}
				} else {
					callback(new Error('分组名称长度不合规范'));
				}
			}
		},
		jioregion(rule, value, callback) {
			console.log(value);
			if (value === '') {
				callback(new Error('请选择分组用户'));
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
		margin-top: 20px;
		margin-bottom: 20px;
		.btn_area {
			height: 40px;
			margin-top: 20px;
			margin-bottom: 20px;
		}
		.tishi {
			font-size: 12px;
			margin-bottom: 5px;
			color: #6e6e6e;
			box-sizing: border-box;
			padding-left: 70px;
		}
	}
}
</style>
