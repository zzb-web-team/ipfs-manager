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
						v-model="input"
						placeholder="请输入分组名称"
						@keyup.enter="search"
						><i
							slot="prefix"
							class="el-input__icon el-icon-search"
							@click="search"
						></i></el-input
				></el-col>
			</el-row>
			<div class="btn_area">
				<el-button type="primary" @click="nwisible"
					>新建权限分组</el-button
				>
			</div>
			<!--  -->
			<el-dialog
				:title="title"
				:visible.sync="dialogFormVisible"
				width="650px"
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
								>
								</el-input>
							</el-col>
						</el-form-item>
						<el-form-item
							label="分组用户"
							prop="userlist"
							:rules="{
								required: true,
								message: '请选择分组用户',
								trigger: 'change',
							}"
						>
							<el-cascader
								:options="options"
								:props="props"
								collapse-tags
								clearable
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
				@selection-change="handleSelectionChange"
			>
				<el-table-column type="selection"> </el-table-column>
				<el-table-column label="ID" prop="id"> </el-table-column>
				<el-table-column label="分组名称" prop="name">
				</el-table-column>
				<el-table-column label="分组描述" prop="description">
				</el-table-column>
				<el-table-column prop="users" label="用户列表">
					<template slot-scope="scope">
						<span v-if="scope.row.users.length <= 0">
							--
						</span>
						<span v-else v-for="item in scope.row.users">
							{{ item.name }}
						</span>
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button
							@click="updatahandleClick(scope.row)"
							type="text"
							size="small"
							>修改</el-button
						>
						<el-button
							@click="handleClick(scope.row)"
							type="text"
							size="small"
							>权限管理</el-button
						>
						<el-button
							@click.native.prevent="
								deleteRow(scope.$index, tableData)
							"
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
				<el-button type="primary">删除</el-button>
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
    userlistaddrole
} from '@/servers/api';
export default {
	data() {
		return {
            props: { multiple: true },
            input:'',
			pagesize: 10,
			total_cnt: 1,
			currentPage: 0,
			title: '新建职位',
			tableData: [],
			dialogFormVisible: false,
			quanVisible: false,
			form: {
				title: '',
				description: '',
				userlist: '',
			},
			props: { multiple: true },
			options: [
				{
					value: 1,
					label: '东南',
					children: [
						{
							value: 2,
							label: '上海',
							children: [
								{ value: 3, label: '普陀' },
								{ value: 4, label: '黄埔' },
								{ value: 5, label: '徐汇' },
							],
						},
						{
							value: 7,
							label: '江苏',
							children: [
								{ value: 8, label: '南京' },
								{ value: 9, label: '苏州' },
								{ value: 10, label: '无锡' },
							],
						},
						{
							value: 12,
							label: '浙江',
							children: [
								{ value: 13, label: '杭州' },
								{ value: 14, label: '宁波' },
								{ value: 15, label: '嘉兴' },
							],
						},
					],
				},
				{
					value: 17,
					label: '西北',
					children: [
						{
							value: 18,
							label: '陕西',
							children: [
								{ value: 19, label: '西安' },
								{ value: 20, label: '延安' },
							],
						},
						{
							value: 21,
							label: '新疆维吾尔族自治区',
							children: [
								{ value: 22, label: '乌鲁木齐' },
								{ value: 23, label: '克拉玛依' },
							],
						},
					],
				},
			],
			data: [
				{
					id: 1,
					label: '一级 2',
					children: [
						{
							id: 3,
							label: '二级 2-1',
							children: [
								{
									id: 4,
									label: '三级 3-1-1',
								},
								{
									id: 5,
									label: '三级 3-1-2',
									// disabled: true,
								},
							],
						},
						{
							id: 2,
							label: '二级 2-2',
							// disabled: true,
							children: [
								{
									id: 6,
									label: '三级 3-2-1',
								},
								{
									id: 7,
									label: '三级 3-2-2',
									// disabled: true,
								},
							],
						},
					],
				},
			],
			defaultProps: {
				children: 'children',
				label: 'label',
			},
		};
	},
	mounted() {
		this.get_datalist();
	},
	methods: {
		search() {},
		get_datalist() {
			let params = new Object();
			params.page = this.currentPage;
			rolelist(params)
				.then((res) => {
					if (res.status == 0) {
						this.tableData = res.result.cols;
					} else {
						this.$message.error(res.msg);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		},
		//新建
		nwisible() {
			this.dialogFormVisible = true;
		},
		//新建--确定
		firstsubmitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.dialogFormVisible = false;
					let params = new Object();
					params.name = '';
					params.description = '';
					addrole(params)
						.then((res) => {})
						.catch((error) => {});
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
			console.log(data);
			this.quanVisible = true;
			//this.$refs.tree.setCheckedKeys([3]);
		},
		//权限配置--确定
		queChecked() {
			console.log(this.$refs.tree.getCheckedKeys());
			this.quanVisible = true;
		},
		//权限配置--取消
		resetChecked() {
			this.$refs.tree.setCheckedKeys([]);
			this.quanVisible = false;
		},
		// 全选
		handleSelectionChange(val) {
			this.multipleSelection = val;
		},

		updatahandleClick(data) {
			console.log(data);
			this.title = '权限分组修改';
			this.dialogFormVisible = true;
			this.form.title = data.grouping_name;
			this.form.description = data.group_description;
			this.form.userlist = data.userlist;
		},
		deleteRow(num, arr) {
			console.log(num, arr);
		},
		//获取页码
		getpage(pages) {
			this.tolpage = pages;
			//this.getdata();
		},
		//获取每页数量
		gettol(pagetol) {
			this.pagesize = pagetol;
			//this.getdata();
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
