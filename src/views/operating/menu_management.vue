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
						<el-input
							v-model="ruleForm.component_name"
							:disabled="ruleForm.resource == 1"
						></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="菜单图标" prop="menu_icon">
					<el-col :span="3">
						<el-input
							v-model="ruleForm.menu_icon"
							:disabled="ruleForm.resource != 1"
						></el-input>
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
		<div v-if="radio == 3">
			<el-cascader
				v-model="del_value"
				:options="del_options"
				:props="{
					value: 'id',
					label: 'name',
					multiple: true,
					checkStrictly: true,
				}"
				clearable
			></el-cascader>
			<el-button type="primary" @click="del_menu">删除</el-button>
			<el-button @click="reset_del">重置</el-button>
		</div>
	</div>
</template>

<script>
import { addmenu, menulistuser } from '../../servers/api';
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
						required: true,
						message: '请输入component地址',
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
		};
	},
	mounted() {
		this.get_menu_list();
	},
	methods: {
		get_menu_list() {
			let params = new Object();
			params.id = this.$cookies.get('ipfs_id');
			params.roleid = this.$cookies.get('role_id');
			menulistuser(params)
				.then((res) => {
					if (res.status == 0) {
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
						this.get_menu_list();
					} else {
						this.$message.error(res.msg);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		},
		//删除
		del_menu() {},
		//取消删除
		reset_del() {
            this.del_value="";
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
}
</style>
