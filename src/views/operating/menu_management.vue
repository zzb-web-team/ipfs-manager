<template>
	<div class="content">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item>
				<a>菜单管理</a>
			</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="con_title">
			<el-radio-group v-model="radio" size="medium">
				<el-radio-button label="1">新增菜单</el-radio-button>
				<el-radio-button label="2">修改菜单</el-radio-button>
				<el-radio-button label="3">删除菜单</el-radio-button>
			</el-radio-group>
		</div>
		<div class="con_text" v-if="radio == 1">
			<el-form
				:model="ruleForm"
				:rules="rules"
				ref="ruleForm"
				label-width="100px"
				class="demo-ruleForm"
			>
				<el-form-item label="菜单目录" prop="resource">
					<el-radio-group
						v-model="ruleForm.resource"
						@change="resnemr()"
					>
						<el-radio label="1">根目录</el-radio>
						<el-radio label="2">二级目录</el-radio>
						<el-radio label="3">三级目录</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="菜单名称" prop="name">
					<el-col :span="3">
						<el-input v-model="ruleForm.name"></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="菜单路由" prop="router_name">
					<el-col :span="3">
						<el-input v-model="ruleForm.router_name"></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="component" prop="component_name">
					<el-col :span="3">
						<el-input v-model="ruleForm.component_name"></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="菜单图标" prop="menu_icon">
					<el-col :span="3">
						<el-input v-model="ruleForm.menu_icon"></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="所属目录" prop="region">
					<el-select
						v-model="ruleForm.region"
						placeholder="请选择父级菜单"
					>
						<el-option
							v-for="item in options"
							:key="item.id"
							:label="item.name"
							:value="item.id"
						>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="是否隐藏" prop="delivery">
					<el-switch v-model="ruleForm.delivery"></el-switch>
				</el-form-item>
				<el-form-item label="权限类型" prop="type">
					<el-checkbox-group v-model="ruleForm.type">
						<el-checkbox label="浏览" name="type"></el-checkbox>
						<el-checkbox label="新建" name="type"></el-checkbox>
						<el-checkbox label="修改" name="type"></el-checkbox>
						<el-checkbox label="删除" name="type"></el-checkbox>
						<el-checkbox label="导入" name="type"></el-checkbox>
						<el-checkbox label="导出" name="type"></el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm')"
						>立即创建</el-button
					>
					<el-button @click="resetForm('ruleForm')">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
		<!--  -->
		<div v-if="radio == 2" class="radio2">
			<el-table
				:data="del_options"
				style="width: 100%;margin-bottom: 20px;"
				row-key="id"
				border
				:default-expand-all="false"
				:cell-style="rowClass"
				:header-cell-style="headClass"
				:tree-props="{
					children: 'children',
					hasChildren: 'hasChildren',
				}"
			>
				<el-table-column prop="name" label="菜单名"> </el-table-column>
				<el-table-column prop="id" label="ID" width="120">
				</el-table-column>
				<el-table-column prop="pid" label="所属上级菜单ID" width="120">
				</el-table-column>
				<el-table-column prop="path" label="路由地址">
				</el-table-column>
				<el-table-column prop="component" label="component">
				</el-table-column>
				<el-table-column prop="icon" label="图标">
					<template slot-scope="scope">{{
						scope.row.icon ? scope.row.icon : '--'
					}}</template>
				</el-table-column>
				<el-table-column prop="hidden" label="菜单可设置权限">
					<template slot-scope="scope">
						<span v-show="scope.row.read_status == 1">浏览</span>
						<span v-show="scope.row.insert_status == 1">新建</span>
						<span v-show="scope.row.delete_status == 1">删除</span>
						<span v-show="scope.row.export_status == 1">导出</span>
						<span v-show="scope.row.import_status == 1">导入</span>
					</template>
				</el-table-column>
				<el-table-column prop="hidden" label="是否隐藏">
					<template slot-scope="scope">
						{{ scope.row.hidden == 1 ? '隐藏' : '显示' }}
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button
							type="text"
							size="mini"
							@click="handleEdit(scope.$index, scope.row)"
							>修改</el-button
						>
					</template>
				</el-table-column>
			</el-table>
			<!--  -->
			<el-dialog title="修改菜单" :visible.sync="dialogFormVisible">
				<el-form
					:model="updata_ruleForm"
					:rules="rules"
					ref="updata_ruleForm"
					label-width="100px"
					class="demo-ruleForm"
				>
					<el-form-item label="菜单名称" prop="name">
						<el-col :span="3">
							<el-input v-model="updata_ruleForm.name"></el-input>
						</el-col>
					</el-form-item>
					<el-form-item label="菜单路由" prop="router_name">
						<el-col :span="3">
							<el-input
								v-model="updata_ruleForm.router_name"
							></el-input>
						</el-col>
					</el-form-item>
					<el-form-item label="component" prop="component_name">
						<el-col :span="3">
							<el-input
								v-model="updata_ruleForm.component_name"
							></el-input>
						</el-col>
					</el-form-item>
					<el-form-item label="菜单图标" prop="menu_icon">
						<el-col :span="3">
							<el-input
								v-model="updata_ruleForm.menu_icon"
							></el-input>
						</el-col>
					</el-form-item>
					<el-form-item label="所属目录" prop="region">
						<!-- <el-select
							v-model="updata_ruleForm.region"
							placeholder="请选择父级菜单"
						>
							<el-option
								v-for="item in updata_ruleForm.options"
								:key="item.id"
								:label="item.name"
								:value="item.id"
							>
							</el-option>
						</el-select> -->
						<el-cascader
							v-model="updata_ruleForm.region"
							:options="updata_ruleForm.options"
							placeholder="请选择父级菜单"
							@change="getregion"
							:props="{
								value: 'id',
								label: 'name',
								checkStrictly: true,
							}"
							clearable
						></el-cascader>
					</el-form-item>
					<el-form-item label="是否隐藏" prop="delivery">
						<el-switch
							v-model="updata_ruleForm.delivery"
						></el-switch>
					</el-form-item>
					<el-form-item label="权限类型" prop="type">
						<el-checkbox-group v-model="updata_ruleForm.type">
							<el-checkbox label="浏览" name="type"></el-checkbox>
							<el-checkbox label="新建" name="type"></el-checkbox>
							<el-checkbox label="修改" name="type"></el-checkbox>
							<el-checkbox label="删除" name="type"></el-checkbox>
							<el-checkbox label="导入" name="type"></el-checkbox>
							<el-checkbox label="导出" name="type"></el-checkbox>
						</el-checkbox-group>
					</el-form-item>
					<el-form-item>
						<el-button
							type="primary"
							@click="updata_submitForm('updata_ruleForm')"
							>修改</el-button
						>
						<el-button @click="updata_resetForm('updata_ruleForm')"
							>重置</el-button
						>
					</el-form-item>
				</el-form>
			</el-dialog>
		</div>
		<!--  -->
		<div v-if="radio == 3" class="radio3" :style="del_height">
			<br />
			<div class="del_con">
				<p>说明：</p>
				<p>1.菜单删除后将不能访问该页面，请谨慎操作</p>
				<p>2.有子级菜单的选项无法删除，请确保操作项无任何子级菜单</p>
                <p>3.此操作将会影响其他用户，所以只能逐级删除，且每次删除之后页面会刷新。</p>
			</div>

			<el-cascader
				v-model="del_value"
				:options="del_options"
				placeholder="请选择要删除的菜单"
				:props="{
					value: 'id',
					label: 'name',
					multiple: true,
					checkStrictly: true,
				}"
				clearable
			></el-cascader>
			<el-button type="danger" @click="del_menu">删除</el-button>
			<el-button @click="reset_del">重置</el-button>
		</div>
	</div>
</template>

<script>
import {
	addmenu,
	deletemenu,
	updatemenu,
	menulistuser,
} from '../../servers/api';
export default {
	name: 'Bar',
	data() {
		return {
			radio: 1,
			menu_name: '',
			ruleForm: {
				name: '',
				resource: '1',
				router_name: '',
				component_name: 'index',
				menu_icon: '',
				region: '',
				delivery: false,
				type: ['浏览'],
			},
			updata_ruleForm: {
				name: '',
				options: [],
				router_name: '',
				component_name: '',
				menu_icon: '',
				region: '',
				delivery: false,
				type: [],
			},
			options: [{ id: 0, name: '/' }],
			rules: {
				name: [
					{
						required: true,
						message: '请输入菜单名称',
						trigger: 'blur',
					},
					{
						min: 2,
						max: 50,
						message: '长度在 2 到 50 个字符',
						trigger: 'blur',
					},
				],
				router_name: [
					{
						required: true,
						message: '请输入路由地址',
						trigger: 'blur',
					},
				],
				component_name: [
					{
						required: true,
						message: '请输入component地址',
						trigger: 'blur',
					},
				],
				menu_icon: [
					{
						required: false,
						message: '请输入菜单图标',
						trigger: 'blur',
					},
				],
				region: [
					{
						required: true,
						message: '请选择父级菜单',
						trigger: 'change',
					},
				],
				type: [
					{
						type: 'array',
						required: true,
						message: '请至少选择一个权限类型',
						trigger: 'change',
					},
				],
			},
			del_value: [],
			del_options: [],
			dialogFormVisible: false,
			del_height: { height: '' },
		};
	},
	mounted() {
		this.get_menu_list();
		var h =
			document.documentElement.clientHeight || document.body.clientHeight;
		this.del_height.height = h - 260 + 'px';
	},
	methods: {
		get_menu_list(data) {
			let params = new Object();
			params.id = this.$cookies.get('ipfs_id');
			params.roleid = this.$cookies.get('role_id');
			menulistuser(params)
				.then((res) => {
					if (res.status == 0) {
						if (res.data && res.data.length > 0) {
							let arrlist = [1, 2, 3, 4, 5, 6];

							res.data.forEach((item) => {
								 if (item.name == 'IPFS节点信息') {
									arrlist[0] = item;
								}else if (item.name == 'IPFS节点控制台') {
									arrlist[1] = item;
								} else if (item.name == 'IPFS节点应用') {
									arrlist[2] = item;
								} else if (item.name == 'IPFS节点收益') {
									arrlist[3] = item;
								} else if (item.name == 'IPFS程序管理') {
									arrlist[4] = item;
								} else if (item.name == 'IPFS数据统计') {
									arrlist[5] = item;
									item.children.forEach((xitem, index) => {
										if (xitem.name == '全国节点分布') {
											arrlist[1].children.unshift(xitem);
											item.children.splice(index, 1);
										}
									});
								} else if (item.name == '操作管理') {
									console.log(arrlist[6]);
                                    arrlist[6] = item;
                                    //这几行代码是修改菜单功能--禁止删除

									// arrlist[6].children.push({
									// 	children: [],
									// 	component: 'menu_management',
									// 	delete_status: 0,
									// 	export_status: 0,
									// 	hidden: 0,
									// 	icon: '',
									// 	id: 100,
									// 	import_status: 0,
									// 	insert_status: 0,
									// 	name: '菜单管理',
									// 	path: '/menu_management',
									// 	pid: 30,
									// 	read_status: 1,
									// 	roleR: 1,
									// 	time_create: 0,
									// 	time_update: 0,
									// 	update_status: 0,
									// });
								} else {
									arrlist.push(item);
								}
							});
							for (var i = 0; i < arrlist.length; i++) {
								if (arrlist[i] == null) {
									arrlist.splice(i, 1);
									i = i - 1; // i - 1 ,因为空元素在数组下标 2 位置，删除空之后，后面的元素要向前补位，
									// 这样才能真正去掉空元素,觉得这句可以删掉的连续为空试试，然后思考其中逻辑
								}
							}
							localStorage.setItem(
								'menus',
								JSON.stringify(arrlist)
							);
							let mtpath = this.menudisable(arrlist);
							this.$cookies.set(
								'ipfs_path',
								mtpath,
								7 * 24 * 60 * 60
							);
                            console.log(arrlist);
                            if(data==1){
                                window.location.href = './';
                            }
						} else {
							this.$router.push({ path: '/error404' });
						}

						let mlist = res.data;
						mlist.forEach((item) => {
							if (item.children && item.children.length > 0) {
								item.children.forEach((xtime) => {
									if (
										xtime.children &&
										xtime.children.length > 0
									) {
										xtime.children.forEach((ytme) => {
											if (
												ytme.children &&
												ytme.children.length > 0
											) {
											} else {
												delete ytme.children;
											}
										});
									} else {
										delete xtime.children;
									}
								});
							} else {
								delete item.children;
							}
						});
						this.del_options = mlist;
					} else {
						this.$message.error(res.msg);
					}
				})
				.catch((error) => {});
		},
		resnemr() {
			this.ruleForm.name = '';
			this.ruleForm.router_name = '';
			this.ruleForm.menu_icon = '';
			this.ruleForm.region = '';
			this.ruleForm.delivery = false;
			this.ruleForm.type = ['浏览'];
			if (this.ruleForm.resource == 1) {
				this.ruleForm.component_name = 'index';
				this.options = [{ id: 0, name: '/' }];
			} else if (this.ruleForm.resource == 2) {
				this.options = this.del_options;
				this.ruleForm.component_name = '';
			} else {
				this.options = [];
				let menulist = this.del_options;
				this.ruleForm.component_name = '';
				menulist.forEach((item, index) => {
					if (item.children && item.children.length > 0) {
						item.children.forEach((xtime) => {
							this.options.push(xtime);
						});
					}
				});
			}
		},
		create_menu() {
			let params = new Object();
			params.name = this.ruleForm.name;
			params.read_status = 0;
			params.update_status = 0;
			params.delete_status = 0;
			params.insert_status = 0;
			params.import_status = 0;
			params.export_status = 0;
			params.path = this.ruleForm.router_name;
			params.component = this.ruleForm.component_name;
			params.icon = this.ruleForm.menu_icon;
			if (this.ruleForm.resource != 1) {
				params.icon = '';
			}
			if (this.ruleForm.delivery == false) {
				params.hidden = 0;
			} else {
				params.hidden = 1;
			}
			this.ruleForm.type.forEach((item) => {
				if (item == '浏览') {
					params.read_status = 1;
				} else if (item == '新建') {
					params.insert_status = 1;
				} else if (item == '修改') {
					params.update_status = 1;
				} else if (item == '删除') {
					params.delete_status = 1;
				} else if (item == '导入') {
					params.import_status = 1;
				} else if (item == '导出') {
					params.export_status = 1;
				}
			});
			if (this.ruleForm.resource == 1) {
				params.pid = 0;
			} else {
				params.pid = this.ruleForm.region;
			}
			addmenu(params)
				.then((res) => {
					if (res.status == 0) {
						this.$message.success('创建成功');
						this.get_menu_list("1");
					} else {
						this.$message.error(res.msg);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		},
		//修改
		handleEdit(index, row) {
			this.dialogFormVisible = true;
			this.updata_ruleForm.id = row.id;
			this.updata_ruleForm.name = row.name;
			// this.updata_ruleForm.options = this.del_options;
			this.updata_ruleForm.options = JSON.parse(
				JSON.stringify(this.del_options)
			);
			let root_router = { id: -1, name: '/' };
			this.updata_ruleForm.options.unshift(root_router);
			this.updata_ruleForm.router_name = row.path;
			this.updata_ruleForm.component_name = row.component;
			this.updata_ruleForm.menu_icon = row.icon;
			this.updata_ruleForm.region = row.pid == 0 ? -1 : row.pid;
			this.updata_ruleForm.delivery = row.hidden == 0 ? false : true;
			this.updata_ruleForm.type = [
				row.read_status == 1 ? '浏览' : '',
				row.insert_status == 1 ? '新建' : '',
				row.update_status == 1 ? '修改' : '',
				row.delete_status == 1 ? '删除' : '',
				row.import_status == 1 ? '导入' : '',
				row.export_status == 1 ? '导出' : '',
			];

			console.log(this.updata_ruleForm);
		},
		getregion() {
			console.log(this.updata_ruleForm.region);
		},
		updata_submitForm(formName) {
			var _this = this;
			console.log(this.ruleForm.type);
			this.$refs[formName].validate((valid) => {
				if (valid) {
					_this.updata_menu();
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		updata_menu() {
			let params = new Object();
			params.id = this.updata_ruleForm.id;
			params.read_status = 0;
			params.update_status = 0;
			params.delete_status = 0;
			params.insert_status = 0;
			params.import_status = 0;
			params.export_status = 0;
			console.log(this.updata_ruleForm.region);
			if (this.updata_ruleForm.region[1]) {
				if (this.updata_ruleForm.region.slice(-1)[0] == -1) {
					params.pid = 0;
				} else {
					params.pid = this.updata_ruleForm.region.slice(-1)[0];
				}
			} else if (this.updata_ruleForm.region[0]) {
				if (this.updata_ruleForm.region[0] == -1) {
					params.pid = 0;
				} else {
					params.pid = this.updata_ruleForm.region[0];
				}
			} else {
				if (this.updata_ruleForm.region == -1) {
					params.pid = 0;
				} else {
					params.pid = this.updata_ruleForm.region;
				}
			}
			params.name = this.updata_ruleForm.name;
			this.updata_ruleForm.type.forEach((item) => {
				if (item == '浏览') {
					params.read_status = 1;
				} else if (item == '新建') {
					params.insert_status = 1;
				} else if (item == '修改') {
					params.update_status = 1;
				} else if (item == '删除') {
					params.delete_status = 1;
				} else if (item == '导入') {
					params.import_status = 1;
				} else if (item == '导出') {
					params.export_status = 1;
				}
			});
			params.path = this.updata_ruleForm.router_name;
			params.component = this.updata_ruleForm.component_name;
			params.icon = this.updata_ruleForm.menu_icon;
			params.hidden = this.updata_ruleForm.delivery == true ? 1 : 0;
			updatemenu(params)
				.then((res) => {
					if (res.status == 0) {
						this.$message.success('修改成功');
						this.dialogFormVisible = false;
						this.get_menu_list("1");
					} else {
						this.$message.error(res.msg);
					}
				})
				.catch((error) => {});
		},
		updata_resetForm(formName) {
			this.$refs[formName].resetFields();
			this.dialogFormVisible = false;
		},
		//删除
		del_menu() {
			this.$confirm('此操作将删除该菜单, 是否继续?', '警告', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					console.log(this.del_value);
					let params = new Object();
					let id_str = '';
					this.del_value.forEach((item) => {
						id_str += item[item.length - 1] + ',';
					});
					params.id = id_str.substring(0, id_str.length - 1);
					deletemenu(params)
						.then((res) => {
							if (res.status == 0) {
								this.get_menu_list("1");
								this.$message({
									type: 'success',
									message: '删除成功!',
								});
							} else {
								this.$message.error(res.msg);
							}
						})
						.catch((error) => {});
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除',
					});
				});
		},
		//取消删除
		reset_del() {
			this.del_value = '';
		},
		handleChange(value) {
			console.log(value);
			let params = new Object();
		},
		submitForm(formName) {
			var _this = this;
			console.log(this.ruleForm.type);
			this.$refs[formName].validate((valid) => {
				if (valid) {
					_this.create_menu();
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
		// 表头样式设置
		headClass() {
			return 'text-align: left;background:#eef1f6;';
		},
		// 表格样式设置
		rowClass() {
			return 'text-align: left;';
        },
        menudisable(arr) {
			for (var i = 0; i < arr.length; i++) {
				if (arr[i].children) {
					for (var k = 0; k < arr[i].children.length; k++) {
						if (arr[i].children[k].children) {
							for (
								var n = 0;
								n < arr[i].children[k].children.length;
								n++
							) {
								return arr[i].children[k].children[n].component;
							}
						}
						return arr[i].children[k].component;
					}
				} else {
					return arr[i].component;
				}
			}
		},
	},
};
</script>
<style lang="scss" scoped>
.content {
	text-align: left;
	.con_title {
		margin-top: 20px;
	}
	.con_text {
		margin-top: 20px;
	}
	.radio2 {
		margin-top: 20px;
	}
	.radio3 {
		height: 500px;
		.del_con {
			color: #fe6c6f;
			margin-bottom: 10px;
			p {
				font-size: 12px;
			}
		}
	}
}
</style>
