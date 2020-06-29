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
						@keyup.enter.native="search"
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
									collapse-tags
									:show-all-levels="false"
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
								v-model="form.userlist"
								:options="options"
								:props="props"
								:key="form.userlist.id"
								ref="refSubCat"
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
} from '@/servers/api';
import { arrTrans } from '../../servers/sevdate';
export default {
	data() {
		return {
			props: { value: 'id', currentLabels: 'label', multiple: true },
			input: '',
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
			options: [],
			data: [
				{
					id: 1,
					label: '一级 1',
					children: [
						{
							id: 4,
							label: '二级 1-1',
							children: [
								{
									id: 9,
									label: '三级 1-1-1',
								},
								{
									id: 10,
									label: '三级 1-1-2',
								},
							],
						},
					],
				},
				{
					id: 2,
					label: '一级 2',
					children: [
						{
							id: 5,
							label: '二级 2-1',
						},
						{
							id: 6,
							label: '二级 2-2',
						},
					],
				},
				{
					id: 3,
					label: '一级 3',
					children: [
						{
							id: 7,
							label: '二级 3-1',
						},
						{
							id: 8,
							label: '二级 3-2',
						},
					],
				},
			],
			defaultProps: {
				children: 'children',
				label: 'label',
			},
			user_list: [],
		};
	},
	filters: {},
	mounted() {
		this.get_datalist();
		this.get_user_list();
	},
	methods: {
		search() {
			console.log('1d51a61d651');
			this.get_datalist();
		},
		get_datalist() {
			let params = new Object();
			params.page = this.currentPage;
			if (this.input) {
				params.name = this.input;
			}

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
						console.log(this.options);
					} else {
						this.$message.error(res.msg);
					}
				})
				.catch((error) => {});
		},
		//新建
		nwisible() {
			this.dialogFormVisible = true;
		},
		//新建--确定
		firstsubmitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					let params = new Object();
					params.name = this.form.title;
					params.description = this.form.description;
					params.userid = '';
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
					addrole(params)
						.then((res) => {
							this.form.title = '';
							this.form.description = '';
							this.form.userlist = '';
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
			let params = new Object();
			params.roleid = data.id;
			menulistuser(params)
				.then((res) => {})
				.catch((error) => {});
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
		//修改
		updatahandleClick(data) {
			let _this = this;
			_this.user_list = [];
			this.title = '权限分组修改';
			this.dialogFormVisible = true;
			this.form.title = data.name;
			this.form.description = data.description;
			var id_list = '';
			let params = new Object();
			data.user.forEach((item) => {
				id_list += item.id + ',';
            });
            params.userid = id_list.slice(0,-1);
			getuserdepartment(params)
				.then((res) => {
					if (res.status == 0) {
						_this.user_list.push(res.data.pdepartment_id);
						_this.user_list.push(res.data.department_id);
						_this.user_list.push(res.data.userid);
					}
				})
				.catch((error) => {});
			console.log(_this.user_list);
			console.log(arrTrans(3, _this.user_list));
			this.form.userlist = arrTrans(3, _this.user_list);
		},
		deleteRow(data) {
			let params = new Object();
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
