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
		<div class="con_text">
			<el-form
				:model="ruleForm"
				:rules="rules"
				ref="ruleForm"
				label-width="100px"
				class="demo-ruleForm"
			>
				<el-form-item label="菜单名称" prop="name">
					<el-col :span="3">
						<el-input v-model="ruleForm.name"></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="菜单路由" prop="router_name">
					<el-col :span="3">
						<el-input v-model="ruleForm.name"></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="菜单图标" prop="menu_icon">
					<el-col :span="3">
						<el-input v-model="ruleForm.name"></el-input>
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
						<el-checkbox label="导入" name="type"></el-checkbox>
						<el-checkbox label="导出" name="type"></el-checkbox>
						<el-checkbox label="删除" name="type"></el-checkbox>
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
	</div>
</template>

<script>
export default {
	name: 'Bar',
	data() {
		return {
			radio: 1,
			menu_name: '',
			ruleForm: {
				name: '',
				router_name: '',
				menu_icon: '',
				region: '',
				date1: '',
				delivery: false,
				type: [],
			},
			options: [],
			rules: {
				name: [
					{
						required: true,
						message: '请输入活动名称',
						trigger: 'blur',
					},
					{
						min: 3,
						max: 5,
						message: '长度在 3 到 5 个字符',
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
				region: [
					{
						required: true,
						message: '请选择活动区域',
						trigger: 'change',
					},
				],
				date1: [
					{
						type: 'date',
						required: true,
						message: '请选择日期',
						trigger: 'change',
					},
				],
				type: [
					{
						type: 'array',
						required: true,
						message: '请至少选择一个活动性质',
						trigger: 'change',
					},
				],
			},
		};
	},
	mounted() {
		if (localStorage.getItem('menus')) {
			let munulist = JSON.parse(localStorage.getItem('menus'));
			this.options = munulist;
			this.options.unshift({
				id: 0,
				name: '根目录',
			});
		}
	},
	methods: {
		create_menu() {
			let params = new Object();
		},
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					alert('submit!');
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
