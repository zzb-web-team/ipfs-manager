<template>
	<div class="content user_li">
		<!-- <el-breadcrumb separator="/">
			<el-breadcrumb-item>
				<a href="/">账户管理</a>
			</el-breadcrumb-item>
		</el-breadcrumb> -->
		<section class="myself-container">
			<div class="rowbg">
				<div class="item_title">账户管理</div>
				<el-form ref="form" :model="form">
					<el-row type="flex">
						<el-input
							style="width:15%;"
							size="small"
							placeholder="请输入帐户名、昵称"
							@keyup.enter.native="searchInfo"
							v-model="searchText"
						>
							<i
								slot="suffix"
								class="el-input__icon el-icon-search"
								@click="searchInfo"
							></i>
						</el-input>
						<!-- <span style="margin-right: 10px;margin-left: 20px;"
							>状态:</span
						> -->
						<el-select
							v-model="value"
							placeholder="请选择账号状态"
							@change="searchInfo"
							size="small"
							style="margin-left:10px;"
						>
							<el-option label="全部" value="*"></el-option>
							<el-option
								v-for="item in options2"
								:key="item.value"
								:label="item.label"
								:value="item.value"
							></el-option>
						</el-select>
						<!-- <span style="margin-right: 10px;margin-left: 20px;"
							>部门:</span
						> -->
						<el-select
							placeholder="一级部门"
							@change="searchdepartment"
							v-model="search_department"
							size="small"
							value-key="item"
							style="margin-left:10px;"
						>
							<el-option label="全部" value="*"></el-option>
							<el-option
								v-for="(item, index) in department_list"
								:key="index"
								:label="item.name"
								:value="item.id"
							></el-option>
						</el-select>
						<el-select
							placeholder="二级部门"
							@change="searchInfo"
							v-model="search_pdepartment"
							:disabled="partmant_disable"
							style="margin-left:10px;"
							size="small"
						>
							<el-option label="全部" value="*"></el-option>
							<el-option
								v-for="item in pdepartment_list"
								:key="item.ids"
								:label="item.name"
								:value="item.id"
							></el-option>
						</el-select>
						<!-- <span style="margin-right: 10px;margin-left: 20px;"
							>职位:</span
						> -->
						<el-select
							v-model="searchposition"
							placeholder="请选择职位"
							@change="searchInfo"
							size="small"
							style="margin-left:10px;"
						>
							<el-option label="全部" value="*"></el-option>
							<el-option
								v-for="item in position_list"
								:key="item.id"
								:label="item.name"
								:value="item.id"
							>
							</el-option>
						</el-select>
						<el-button
							type="primary"
							round
							size="small"
							class="resetseach_btn"
							style="margin-left: 10px;"
							@click="reset()"
							>重置</el-button
						>
					</el-row>
				</el-form>
			</div>
			<div class="user_devide_table" :style="{ width: max_tab_width }">
				<el-row type="flex" class="row_active" justify="space-between">
					<el-col :span="6">
						<el-button
							type="primary"
							size="small"
							@click="addAccout"
							v-show="obnj.roleC == 1"
						>
							新建
							<span class="el-icon-plus"></span>
						</el-button>
					</el-col>
					<el-col :span="6" style="text-align:right;">
						<el-button
							type="text"
							size="mini"
							v-show="obnj.roleE == 1"
						>
							导出<i
								class="iconfont icon-daochu"
								style="color:#1672E8;margin-left: 5px;"
							></i>
						</el-button>
					</el-col>
				</el-row>
				<div class="row_active">
					<tableBarActive1
						id="rebateSetTable"
						ref="table1"
						tooltip-effect="dark"
						:tableData="tableData"
						:obnj="obnj"
						:ipfs_id="ipfs_id"
						@handleSelectionChange="handleSelectionChange"
						:clomnSelection="clomnSelection"
						:rowHeader="rowHeader"
						:tableOption="tableOption"
						:tableHeight="tableHeight"
						@disable="disable"
						@toChange="toChange"
						@detail="detail"
						@changePassword="changePassword"
						@toDelete="toDelete"
						@tableSortChange="tableSortChange"
					></tableBarActive1>
				</div>
				<div
					class="devide_pageNation"
					style="display: flex;justify-content: space-between;"
				>
					<el-row type="flex">
						<el-col
							:span="6"
							style="display: flex;justify-content: justify-content: flex-start;"
						>
							<el-button
								size="small"
								@click="allOn"
								type="primary"
								v-show="obnj.roleU == 1"
								>启用</el-button
							>
							<el-button
								type="warning"
								size="small"
								@click="allOff"
								v-show="obnj.roleU == 1"
								>禁用</el-button
							>
							<el-button
								type="danger"
								size="small"
								@click="allDelete"
								v-show="obnj.roleD == 1"
								>删除</el-button
							>
						</el-col>
					</el-row>
					<el-row type="flex">
						<el-col :span="6">
							<pageNation
								:pager="pager"
								@handleSizeChange="handleSizeChange"
								@handleCurrentChange="handleCurrentChange"
							></pageNation>
						</el-col>
					</el-row>
				</div>
			</div>
			<el-dialog
				:visible.sync="dialogVisible"
				:close-on-click-modal="false"
				width="35%"
				@close="handleClose"
				title="新建账户"
				class="userli_content create_user"
			>
				<div class="addaccout">
					<el-form
						:model="ruleForm2"
						ref="ruleForm2"
						label-position="left"
						class="demo-ruleForm"
					>
						<!-- <el-form-item label="使用状态:">
							<el-radio v-model="ruleForm2.radio" label="0"
								>启用</el-radio
							>
							<el-radio v-model="ruleForm2.radio" label="1"
								>禁用</el-radio
							>
						</el-form-item> -->
						<el-form-item
							prop="department"
							label="部门："
							:rules="[
								{
									required: true,
									message: '请选择部门',
									trigger: 'change',
								},
							]"
						>
							<el-col :span="21" style="display:flex;">
								<el-select
									style="width:100%"
									v-model="ruleForm2.department"
									placeholder="请选择部门"
									size="small"
								>
									<el-option-group
										v-for="group in department_list"
										:key="group.id"
										:label="group.name"
									>
										<el-option
											v-for="item in group.children"
											:key="item.id + item.name"
											:label="item.name"
											:value="item.id"
										>
										</el-option>
									</el-option-group>
								</el-select>
								<el-button
									type="primary"
									size="mini"
									style="width:100px;height:32px;margin-top:4px;margin-left:15px;"
									@click="go_organization_me"
									><i class="el-icon-circle-plus-outline"></i>
									新建</el-button
								>
							</el-col>
						</el-form-item>

						<el-form-item
							label="账户名:"
							prop="username"
							:rules="[
								{
									required: true,
									validator: jiousername,
									trigger: 'blur',
								},
							]"
						>
							<el-input
								v-model="ruleForm2.username"
								size="small"
								placeholder="请输入账户名"
							></el-input>
						</el-form-item>
						<el-form-item
							label="昵称:"
							prop="name"
							:rules="[
								{
									required: true,
									validator: jioname,
									trigger: 'blur',
								},
							]"
						>
							<el-col :span="24">
								<el-input
									v-model="ruleForm2.name"
									size="small"
									placeholder="请输入昵称"
								></el-input>
							</el-col>
						</el-form-item>

						<el-form-item
							label="性别:"
							prop="sex"
							:rules="[
								{
									required: true,
									message: '请选择性别',
									trigger: 'change',
								},
							]"
						>
							<el-col :span="22">
								<el-select
									v-model="ruleForm2.sex"
									size="small"
									placeholder="请选择性别"
								>
									<el-option
										label="男"
										value="男"
									></el-option>
									<el-option
										label="女"
										value="女"
									></el-option>
								</el-select>
							</el-col>
						</el-form-item>
						<el-form-item
							label="职位:"
							prop="position_id"
							:rules="[
								{
									required: true,
									message: '请选择职位',
									trigger: 'change',
								},
							]"
						>
							<el-col :span="22">
								<el-select
									v-model="ruleForm2.position_id"
									size="small"
									placeholder="请选择职位"
								>
									<el-option
										v-for="item in position_list"
										:key="item.id"
										:label="item.name"
										:value="item.id"
									>
									</el-option>
								</el-select>
							</el-col>
						</el-form-item>
						<el-form-item
							label="分组:"
							prop="grouping"
							:rules="[
								{
									required: true,
									message: '请选择部门',
									trigger: 'change',
								},
							]"
						>
							<el-col :span="22">
								<el-select
									v-model="ruleForm2.grouping"
									size="small"
									placeholder="请选择部门"
								>
									<el-option
										v-for="item in permission_list"
										:key="item.id"
										:label="item.name"
										:value="item.id"
									>
									</el-option>
								</el-select>
							</el-col>
						</el-form-item>

						<el-form-item
							label="密码:"
							prop="password"
							:rules="[
								{
									required: true,
									validator: jiopwd,
									trigger: 'blur',
								},
							]"
						>
							<el-input
								v-model="ruleForm2.password"
								size="small"
								type="password"
								placeholder="请输入密码"
							></el-input>
						</el-form-item>
						<el-form-item
							label="确认密码:"
							prop="password2"
							:rules="[
								{
									required: true,
									validator: jioqpwd,
									trigger: 'blur',
								},
							]"
						>
							<el-input
								size="small"
								v-model="ruleForm2.password2"
								placeholder="两次密码须一致"
								type="password"
							></el-input>
						</el-form-item>

						<el-form-item
							prop="phone"
							label="联系电话:"
							:rules="[{ validator: jiophone, trigger: 'blur' }]"
						>
							<el-input
								v-model.number="ruleForm2.phone"
								size="small"
								maxlength="11"
								placeholder="请输入联系电话"
							></el-input>
						</el-form-item>

						<el-form-item
							style="width:100%;display: flex;justify-content:center;"
						>
							<el-button
								type="primary"
								@click.native.prevent="handleSubmit"
								>立即提交</el-button
							>
							<el-button @click="notall('ruleForm2')"
								>取消</el-button
							>
						</el-form-item>
					</el-form>
				</div>
			</el-dialog>

			<el-dialog
				v-if="addDialogVisible"
				:visible.sync="dialogVisible2"
				:close-on-click-modal="false"
				width="30%"
				@close="handleClose2"
				title="修改账户"
				class="updata_user"
			>
				<div class="addaccout">
					<el-form
						:model="ruleForm3"
						ref="ruleForm3"
						label-position="left"
						class="demo-ruleForm"
					>
						<!-- <el-form-item label="状态:">
							<el-radio v-model="ruleForm3.radio" label="0"
								>启用</el-radio
							>
							<el-radio v-model="ruleForm3.radio" label="1"
								>禁用</el-radio
							>
						</el-form-item> -->
						<el-form-item
							prop="department_id"
							label="部门："
							:rules="[
								{
									required: true,
									message: '请选择部门',
									trigger: 'change',
								},
							]"
						>
							<el-col :span="22">
								<el-select
									v-model="ruleForm3.department_id"
									placeholder="请选择分组"
								>
									<el-option-group
										v-for="group in department_list"
										:key="group.id"
										:label="group.name"
									>
										<el-option
											v-for="item in group.children"
											:key="item.id + item.name"
											:label="item.name"
											:value="item.id"
										>
										</el-option>
									</el-option-group>
								</el-select>
							</el-col>
						</el-form-item>
						<el-form-item
							label="账户名:"
							prop="username"
							:rules="[
								{
									required: true,
									validator: jiousername,
									trigger: 'blur',
								},
							]"
						>
							<el-input
								v-model="ruleForm3.username"
								placeholder="4-20位汉字英文数字组合"
							></el-input>
						</el-form-item>

						<el-form-item
							label="昵称:"
							prop="name"
							:rules="[
								{
									required: true,
									validator: jioname,
									trigger: 'blur',
								},
							]"
						>
							<el-input
								v-model="ruleForm3.name"
								placeholder="4-20位汉字数字字母组合"
							></el-input>
						</el-form-item>
						<el-form-item
							label="性别:"
							prop="sex"
							:rules="[
								{
									required: true,
									message: '请选择性别',
									trigger: 'change',
								},
							]"
						>
							<el-col :span="22">
								<el-select
									v-model="ruleForm3.sex"
									placeholder="请选择性别"
								>
									<el-option
										label="男"
										value="男"
									></el-option>
									<el-option
										label="女"
										value="女"
									></el-option>
								</el-select>
							</el-col>
						</el-form-item>
						<el-form-item
							label="职位:"
							prop="position_id"
							:rules="[
								{
									required: true,
									message: '请选择职位',
									trigger: 'change',
								},
							]"
						>
							<el-col :span="22">
								<el-select
									v-model="ruleForm3.position_id"
									placeholder="请选择职位"
								>
									<el-option
										v-for="item in position_list"
										:key="item.id"
										:label="item.name"
										:value="item.id"
									>
									</el-option>
								</el-select>
							</el-col>
						</el-form-item>
						<el-form-item
							label="分组:"
							prop="role_id"
							:rules="[
								{
									required: true,
									message: '请选择分组',
									trigger: 'change',
								},
							]"
						>
							<el-col :span="22">
								<el-select
									v-model="ruleForm3.role_id"
									placeholder="请选择分组"
								>
									<el-option
										v-for="item in permission_list"
										:key="item.id"
										:label="item.name"
										:value="item.id"
									>
									</el-option>
								</el-select>
							</el-col>
						</el-form-item>
						<el-form-item
							label="联系方式:"
							prop="phone"
							:rules="[{ validator: jiophone, trigger: 'blur' }]"
						>
							<el-input
								v-model.number="ruleForm3.phone"
								maxlength="11"
								placeholder="11位有效手机号"
							></el-input>
						</el-form-item>
						<el-form-item
							style="width:100%;display: flex;justify-content:center;"
						>
							<el-button
								type="primary"
								@click.native.prevent="handleSubmit4"
								>修改</el-button
							>
							<el-button @click="nohandleSubmit4('ruleForm3')"
								>取消</el-button
							>
						</el-form-item>
					</el-form>
				</div>
			</el-dialog>

			<el-dialog
				:visible.sync="dialogVisible3"
				:close-on-click-modal="false"
				width="20%"
				@close="handleClose3"
				title="密码重置"
				class="userli_content"
			>
				<div class="addaccout">
					<el-form
						:model="ruleForm4"
						:rules="rules4"
						ref="ruleForm4"
						label-position="left"
						class="demo-ruleForm"
					>
						<el-form-item label="账号:" prop="username">
							<el-input
								v-model="ruleForm3.username"
								:disabled="true"
							></el-input>
						</el-form-item>

						<el-form-item
							prop="password"
							label="新密码:"
							:rules="[
								{
									required: true,
									validator: jiopwd2,
									trigger: 'blur',
								},
							]"
						>
							<el-input
								v-model="ruleForm4.password"
								placeholder="8位数字字母组成"
								type="password"
								autocomplete="off"
							></el-input>
						</el-form-item>

						<el-form-item
							prop="password2"
							label="确认密码:"
							:rules="[
								{
									required: true,
									validator: jioqpwd2,
									trigger: 'blur',
								},
							]"
						>
							<el-input
								v-model="ruleForm4.password2"
								placeholder="请再次输入密码"
								type="password"
								autocomplete="off"
							></el-input>
						</el-form-item>

						<el-form-item
							style="width:100%;display: flex;justify-content:center;"
						>
							<el-button
								type="primary"
								@click.native.prevent="handleSubmit5"
								>确认</el-button
							>
							<el-button @click="nohandleSubmit5('ruleForm4')"
								>取消</el-button
							>
						</el-form-item>
					</el-form>
				</div>
			</el-dialog>
			<el-dialog
				:visible.sync="dialogVisible4"
				:close-on-click-modal="false"
				width="20%"
				title="用户信息"
			>
				<div class="addaccout">
					<el-form
						:model="ruleForm7"
						ref="ruleForm7"
						label-position="left"
						class="demo-ruleForm"
					>
						<el-form-item label="状态:">
							<el-radio
								v-model="ruleForm7.radio"
								label="1"
								disabled
								>启用</el-radio
							>
							<el-radio
								v-model="ruleForm7.radio"
								label="2"
								disabled
								>禁用</el-radio
							>
						</el-form-item>
						<el-form-item
							prop="username"
							:rules="[
								{ validator: jiousername, trigger: 'blur' },
							]"
						>
							<el-form-item label="账号:">
								<el-input
									disabled
									v-model="ruleForm7.username"
									placeholder="账号为4-20位英文加数字组合"
								></el-input>
							</el-form-item>
						</el-form-item>

						<el-form-item
							prop="name"
							:rules="[{ validator: jioname, trigger: 'blur' }]"
						>
							<el-form-item label="真实姓名:">
								<el-input
									disabled
									v-model="ruleForm7.name"
									placeholder="真实姓名为4-20位汉字数字字母组合"
								></el-input>
							</el-form-item>
						</el-form-item>
						<el-form-item
							prop="phone"
							:rules="[{ validator: jiophone, trigger: 'blur' }]"
						>
							<el-form-item label="联系方式:">
								<el-input
									disabled
									v-model.number="ruleForm7.phone"
									placeholder="11位有效手机号"
								></el-input>
							</el-form-item>
						</el-form-item>
						<el-form-item
							style="width:100%;display: flex;justify-content:center;"
						>
							<!-- <el-button type="primary" @click.native.prevent="handleSubmit4"
                >修改</el-button
              >-->
							<el-button
								@click="dialogVisible4 = false"
								type="primary"
								>确定</el-button
							>
						</el-form-item>
					</el-form>
				</div>
			</el-dialog>
		</section>
	</div>
</template>

<script>
import tableBarActive1 from '../../comm/tableBarActive1';

import pageNation from '../../comm/pageNation';
import {
	userlist,
	userinsert,
	userupdate,
	userdelete,
	userctrl,
	rolelist,
	positionlist,
	departmentlist,
	rolelistfortree,
	departmentfortree,
	positionfortree,
} from '../../servers/api';
import common from '../../comm/js/util.js';
import { menudisable } from '../../servers/sevdate';
export default {
	data() {
		var validatePass = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入密码'));
			} else {
				var fsdf = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/;
				if (fsdf.test(value) === false) {
					callback(new Error('密码格式错误'));
				} else {
					if (this.ruleForm4.password2 !== '') {
						this.$refs.ruleForm4.validateField('password2');
					}
					callback();
				}
			}
		};
		var validatePass2 = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请再次输入密码'));
			} else if (value !== this.ruleForm4.password) {
				callback(new Error('两次输入密码不一致!'));
			} else {
				callback();
			}
		};
		return {
			form: {},
			search_department: '',
			search_pdepartment: '',
			dialogVisible: false,
			rotate: false,
			addDialogVisible: false,
			dialogVisible2: false,
			dialogVisible3: false,
			dialogVisible4: false,
			searchText: '',
			placeholder: '请输入账号',
			operatingStatus: true,
			clomnSelection: true,
			reserveselection: true,
			order: 'last_login desc',
			value1: '',
			value2: '',
			value: '',
			searchposition: '',
			options2: [
				{
					value: '0',
					label: '启用',
				},
				{
					value: '1',
					label: '禁用',
				},
			],
			ruleForm2: {
				username: '',
				nickname: '',
				password: '',
				password2: '',
				value: '',
				radio: '0',
				name: '',
				department: '',
				sex: '',
				position_id: '',
				grouping: '',
				phone: '',
			},
			ruleForm3: {
				username: '',
				nickname: '',
				value: '',
				radio: '0',
				name: '',
				id: '',
				sex: '',
				phone: '',
				position_id: '',
				role_id: '',
				department_id: '',
			},
			ruleForm4: {
				password: '',
				password2: '',
			},
			//重置密码校验
			rules4: {
				password: [{ validator: validatePass, trigger: 'blur' }],
				password2: [{ validator: validatePass2, trigger: 'blur' }],
			},
			rowHeader: [
				{
					prop: 'id',
					label: 'ID',
				},

				// {
				// 	prop: 'name',
				// 	label: '昵称',
				// },
				{
					prop: 'username',
					label: '账户名',
				},
				// {
				// 	prop: 'user_update',
				//     label: '修改人',

				// },
				{
					prop: 'pdepartment_name',
					label: '一级部门',
				},
				{
					prop: 'department_name',
					label: '二级部门',
				},
				{
					prop: 'position_name',
					label: '职位',
				},
				{
					prop: 'sex',
					label: '性别',
				},
				{
					prop: 'phone',
					label: '联系电话',
				},
				{
					prop: 'last_login',
					label: '最后登录',
					sortable: 'custom',
				},
				{
					prop: 'status',
					label: '状态',
				},
			],
			tableData: [],
			tableOption: {
				label: '操作',
				options: [
					{
						label: '修改',
						type: 'primary',
						methods: 'checkInfo',
					},

					{
						label: '密码重置',
						type: 'danger',
						methods: 'password',
					},
					{
						label: '禁用',
						type: 'danger',
						methods: 'disable',
					},
					// {
					// 	label: '删除',
					// 	type: 'danger',
					// 	methods: 'delete',
					// },
				],
			},
			pager: {
				count: 0,
				page: 1,
				rows: 100,
			},
			showState: false,
			allId: [],
			ruleForm7: {
				username: '',
				nickname: '',
				password: '',
				password2: '',
				value: '',
				radio: '1',
				name: '',
			},
			ipfs_id: 0,
			ipfs_user: '',
			permission_list: [{ id: 0, name: '受限用户' }],
			position_list: [],
			departmentoptions: [],
			department_list: [],
			obnj: {},
			partmant_disable: true,
			pdepartment_list: [],
			tableHeight: 0,
			max_tab_width: 0,
		};
	},
	mounted: function() {
		this.$nextTick(() => {
			let top_title_h = document.getElementsByClassName('rowbg')[0]
				.offsetHeight;
			let con_he = document.getElementsByClassName('content-container')[0]
				.offsetHeight;
			let con_w = document.getElementsByClassName('content-container')[0]
				.offsetWidth;
			this.tableHeight = con_he - top_title_h - 176;
			this.max_tab_width = con_w - 60 + 'px';
		});
		let munulist = JSON.parse(localStorage.getItem('menus'));
		let pathname = this.$route.path;
		this.obnj = menudisable(munulist, pathname);
		this.ipfs_id = parseInt(this.$cookies.get('ipfs_id'));
		this.ipfs_user = this.$cookies.get('ipfs_user');
		this.queryUserList();
		this.get_position_list();
		this.getdatalist();
	},
	methods: {
		//获取部门列表
		getdatalist() {
			departmentfortree()
				.then((res) => {
					if (res.status == 0) {
						this.department_list = [];
						let one_obj = {}; //一级部门
						let two_arr = []; //二级部门
						res.data.forEach((item) => {
							if (item.pid == 0) {
								item.children = [];
								let key = item.id;
								let val = item;
								one_obj[key] = val;
							} else {
								two_arr.push(item);
							}
						});
						two_arr.forEach((item) => {
							if (one_obj[item.pid]) {
								one_obj[item.pid].children.push(item);
							}
						});
						for (const key in one_obj) {
							this.department_list.push(one_obj[key]);
						}
					} else {
						this.$message(res.msg);
					}
				})
				.catch((error) => {});
		},
		//职位分组
		get_position_list() {
			positionfortree()
				.then((res) => {
					if (res.status == 0) {
						this.position_list = res.data;
					} else {
						this.$message(res.msg);
					}
				})
				.catch((error) => {});
		},
		//获取权限分组
		get_permission_list() {
			rolelistfortree()
				.then((res) => {
					if (res.status == 0) {
						this.permission_list = res.data;
					} else {
						this.$message.error(res.msg);
					}
				})
				.catch((error) => {});
		},
		//跳转部门列表
		go_organization_me() {
			this.$router.push({ path: '/organization_me' });
		},
		//排序
		tableSortChange(column) {
			if (column.order == 'ascending') {
				this.order = 'last_login desc';
				this.pager.page = 1;
				this.queryUserList();
			} else {
				this.order = 'last_login asc';
				this.pager.page = 1;
				this.queryUserList();
			}
		},
		//重置
		reset() {
			this.value = '';
			this.searchText = '';
			this.searchposition = '';
			this.pager.page = 1;
			this.search_department = '';
			this.search_pdepartment = '';
			this.partmant_disable = true;
			this.queryUserList();
		},
		handleSelectionChange(val) {
			this.multipleSelection = val;
			this.allId = [];
			for (var i = 0; i < val.length; i++) {
				this.allId.push(val[i].id);
			}
		},
		//批量启用
		allDisable() {
			if (this.allId.length <= 0) {
				this.$message({
					message: '请至少勾选一项',
					type: 'error',
				});
				return false;
			}
			let param = new Object();
			param.ids = this.allId.join(',');
			param.type = 0;
			param.uid = this.ipfs_id;
			param.uname = this.ipfs_user;
			userctrl(param)
				.then((res) => {
					if (res.status == 0) {
						this.$message({
							message: '操作成功',
							type: 'success',
						});
						this.queryUserList();
					} else {
						this.$message.error(res.msg);
					}
				})
				.catch((error) => {});
		},
		//批量启用
		allOn() {
			if (this.allId.length <= 0) {
				this.$message({
					message: '请至少勾选一项',
					type: 'error',
				});
				return false;
			}
			this.$confirm(
				'此操作将会启用选中的账户，启用后这些账户可等登陆后台系统并进行操作, 是否继续?',
				'提示',
				{
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
				}
			)
				.then(() => {
					let param = new Object();
					param.ids = this.allId.join(',');
					param.type = 0;
					param.uid = this.ipfs_id;
					param.uname = this.ipfs_user;
					userctrl(param)
						.then((res) => {
							if (res.status == 0) {
								this.$message({
									message: '操作成功',
									type: 'success',
								});
								this.fan.fanactionlog(
									'修改',
									'批量启用账号',
									1
								);
								this.queryUserList();
							} else {
								this.fan.fanactionlog(
									'修改',
									'批量启用账号',
									0
								);
								this.$message.error(res.msg);
							}
						})
						.catch((error) => {
							this.fan.fanactionlog('修改', '批量启用账号', 0);
						});
				})
				.catch(() => {
					// this.$message({
					//   type: "info",
					//   message: "已取消删除"
					// });
				});
		},
		//批量禁用
		allOff() {
			if (this.allId.length <= 0) {
				this.$message({
					message: '请至少勾选一项',
					type: 'error',
				});
				return false;
			}
			this.$confirm(
				'此操作将禁用选中的全部用户，禁用之后这些账户将无法登陆, 是否继续?',
				'提示',
				{
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
				}
			)
				.then(() => {
					let param = new Object();
					param.ids = this.allId.join(',');
					param.type = 1;
					param.uid = this.ipfs_id;
					param.uname = this.ipfs_user;
					userctrl(param)
						.then((res) => {
							if (res.status == 0) {
								this.$message({
									message: '操作成功',
									type: 'success',
								});
								this.fan.fanactionlog(
									'修改',
									'批量禁用账号',
									1
								);
								this.queryUserList();
							} else {
								this.fan.fanactionlog(
									'修改',
									'批量禁用账号',
									0
								);
								this.$message.error(res.msg);
							}
						})
						.catch((error) => {
							this.fan.fanactionlog('修改', '批量禁用账号', 0);
						});
				})
				.catch(() => {
					// this.$message({
					//   type: "info",
					//   message: "已取消禁用"
					// });
				});
		},
		//批量删除
		allDelete() {
			if (this.allId.length <= 0) {
				this.$message({
					message: '请至少勾选一项',
					type: 'error',
				});
				return false;
			}
			this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					let param = new Object();
					param.ids = this.allId.join(',');
					param.type = 2;
					param.uid = this.ipfs_id;
					param.uname = this.ipfs_user;
					userctrl(param)
						.then((res) => {
							if (res.status == 0) {
								this.$message({
									type: 'success',
									message: '删除成功!',
								});
								this.fan.fanactionlog(
									'删除',
									'批量删除账号',
									1
								);
								this.queryUserList();
							} else {
								this.fan.fanactionlog(
									'删除',
									'批量删除账号',
									0
								);
								this.$message.error(res.msg);
							}
						})
						.catch((error) => {
							this.fan.fanactionlog('删除', '批量删除账号', 0);
						});
				})
				.catch(() => {
					// this.$message({
					//   type: "info",
					//   message: "已取消删除"
					// });
				});
		},

		queryUserList() {
			let param = new Object();
			param.page = this.pager.page - 1;
			param.search = this.searchText;
			param.status = parseInt(this.value);
			param.order = this.order;
			if (this.searchposition == '*') {
				param.position_id = null;
			} else {
				param.position_id = parseInt(this.searchposition);
			}

			if (this.search_department != '' && this.search_department != '*') {
				if (
					this.search_pdepartment != '' &&
					this.search_pdepartment != '*'
				) {
					param.department_id = this.search_pdepartment;
				} else {
					param.department_id = this.search_department;
				}
			} else {
				param.department_id = null;
			}
			userlist(param)
				.then((res) => {
					if (res.status != 0) {
						this.$message({
							message: `${res.err_msg}`,
							type: 'error',
						});
					} else {
						if (res.result.page == 0) {
							if (res.result.les_count == 0) {
								this.pager.count = res.result.cols.length;
							} else {
								this.pager.count =
									10 +
									res.result.cols.length * res.result.page +
									res.result.les_count;
							}
						}
						let nowArr = res.result.cols;
						for (var i = 0; i < nowArr.length; i++) {
							nowArr[i].time_create = this.common.getTimes(
								parseInt(nowArr[i].time_create * 1000)
							);
							nowArr[i].time_update = this.common.getTimes(
								parseInt(nowArr[i].time_update * 1000)
							);
							nowArr[i].last_login = this.common.getTimes(
								parseInt(nowArr[i].last_login * 1000)
							);
							if (nowArr[i].status == 0) {
								nowArr[i].status = '启用';
							} else {
								nowArr[i].status = '禁用';
							}
							if (nowArr[i].phone == '') {
								nowArr[i].phone = '-';
							}
						}
						this.tableData = nowArr;
					}
				})
				.catch((error) => {});
		},
		//搜索
		searchInfo() {
			this.pager.page = 1;
			this.queryUserList();
		},
		searchdepartment(value) {
			this.department_list.forEach((item, index) => {
				if (item.id == value) {
					this.pdepartment_list = item.children;
				}
			});
			this.pager.page = 1;
			if (this.search_department == '*' || this.search_department == '') {
				this.partmant_disable = true;
			} else {
				this.partmant_disable = false;
			}
			this.search_pdepartment = '*';
			this.queryUserList();
		},
		getShow() {
			this.showState = !this.showState;
			this.rotate = !this.rotate;
		},
		//单页显示数据数量
		handleSizeChange() {},
		//分页
		handleCurrentChange(val) {
			this.pager.page = val.val;
			this.queryUserList();
		},
		//新增
		handleSubmit(ev) {
			var _this = this;
			this.$refs.ruleForm2.validate((valid) => {
				if (valid) {
					var loginParams = {
						username: this.ruleForm2.username,
						nickname: this.ruleForm2.name,
						password: this.ruleForm2.password,
						password2: this.ruleForm2.password2,
						role_id: this.ruleForm2.grouping,
						phone: this.ruleForm2.phone,
						status: parseInt(this.ruleForm2.radio),
						name: this.ruleForm2.name,
						uid: this.ipfs_id,
						uname: this.ipfs_user,
						department_id: this.ruleForm2.department,
						sex: this.ruleForm2.sex,
						position_id: this.ruleForm2.position_id,
					};
					userinsert(loginParams).then((data) => {
						this.dialogVisible = false;
						let { msg, status, user } = data;
						if (status !== 0) {
							this.$message({
								message: msg,
								type: 'error',
							});
							this.fan.fanactionlog(
								'新增',
								'添加账号',
								0,
								'-',
								loginParams.username
							);
						} else {
							this.$message({
								message: '添加成功',
								type: 'success',
							});
							this.fan.fanactionlog(
								'新增',
								'添加账号',
								1,
								'-',
								loginParams.username
							);
							this.queryUserList();
						}
					});
				} else {
					// return false;
				}
			});
		},
		//取消新增
		notall(formName) {
			this.$refs[formName].resetFields();
			this.dialogVisible = false;
			this.ruleForm2.username = '';
			this.ruleForm2.password = '';
			this.ruleForm2.password2 = '';
			this.ruleForm2.name = '';
		},
		//新增--关闭按钮
		handleClose() {
			this.notall('ruleForm2');
		},
		//禁用
		disable(val) {
			this.ruleForm3.uid = this.ipfs_id;
			this.ruleForm3.uname = this.ipfs_user;
			this.ruleForm3.username = val.username;
			this.ruleForm3.id = val.id;
			this.ruleForm3.name = val.name;
			if (val.phone) {
				this.ruleForm3.phone = val.phone;
			}
			this.ruleForm3.sex = val.sex;
			this.ruleForm3.position_id = val.position_id;
			this.ruleForm3.nickname = val.nickname;
			this.ruleForm3.role_id = val.role_id;
			this.ruleForm3.department_id = val.department_id;
			this.ruleForm3.sex = val.sex;
			this.ruleForm3.position_id = val.position_id;
			if (val.status == '启用') {
				this.ruleForm3.status = 1;
			} else {
				this.ruleForm3.status = 0;
			}
			let param = new Object();
			param = this.ruleForm3;
			let messtit = '确定进行此操作吗？';
			if (this.ruleForm3.status == 0) {
				messtit =
					'确定启用该账户吗？启用后该账户将可以登陆本后台系统并进行相关操作。';
			} else {
				messtit =
					'确定禁用该账户吗？禁用后该账户将无法登陆本后台系统。';
			}
			this.$confirm(messtit, '提示', {
				type: 'warning',
			})
				.then(() => {
					userupdate(param).then((data) => {
						this.dialogVisible2 = false;
						this.addDialogVisible = false;
						let { msg, status, user } = data;
						if (status !== 0) {
							this.$message({
								message: msg,
								type: 'error',
							});
							if (param.status == 0) {
								this.fan.fanactionlog(
									'修改',
									'启用账号',
									0,
									'启用',
									'禁用'
								);
							} else {
								this.fan.fanactionlog(
									'修改',
									'禁用账号',
									0,
									'禁用',
									'启用'
								);
							}
						} else {
							if (param.status == 0) {
								this.$message({
									message: '启用成功',
									type: 'success',
								});
								this.fan.fanactionlog(
									'修改',
									'启用账号',
									1,
									'禁用',
									'启用'
								);
							} else {
								this.$message({
									message: '禁用成功',
									type: 'success',
								});
								this.fan.fanactionlog(
									'修改',
									'禁用账号',
									1,
									'启用',
									'禁用'
								);
							}
							this.queryUserList();
						}
					});
				})
				.catch(() => {});
		},
		//修改
		toChange(val) {
			this.dialogVisible2 = true;
			this.addDialogVisible = true;
			this.ruleForm3.username = val.username;
			this.ruleForm3.id = val.id;
			this.ruleForm3.name = val.name;
			this.ruleForm3.phone = val.phone;
			this.ruleForm3.sex = val.sex;
			this.ruleForm3.position_id = val.position_id;
			this.ruleForm3.grouping = val.role_id;
			this.ruleForm3.nickname = val.nickname;
			this.ruleForm3.role_id = val.role_id;
			this.ruleForm3.department_id = val.department_id;
			this.ruleForm3.sex = val.sex;
			this.ruleForm3.position_id = val.position_id;
			if (val.status == '启用') {
				this.ruleForm3.status = 0;
			} else {
				this.ruleForm3.status = 1;
			}
		},
		//修改--关闭按钮
		handleClose2() {
			this.nohandleSubmit4('ruleForm3');
		},
		//详情
		detail(val) {
			this.dialogVisible4 = true;
			this.ruleForm7.username = val.username;
			this.ruleForm7.id = val.id;
			this.ruleForm7.name = val.name;
			this.ruleForm7.phone = val.phone;
			this.ruleForm7.nickname = 'aa';
			this.ruleForm7.role_id = 0;
			if (val.status == '启用') {
				this.ruleForm7.radio = '1';
			} else {
				this.ruleForm7.radio = '2';
			}
		},
		//重置密码
		changePassword(val) {
			this.dialogVisible3 = true;
			this.ruleForm3.username = val.username;
			this.ruleForm3.id = val.id;
			this.ruleForm3.name = val.name;
			if (val.phone) {
				this.ruleForm3.phone = val.phone;
			}
			this.ruleForm3.sex = val.sex;
			this.ruleForm3.position_id = val.position_id;
			this.ruleForm3.grouping = val.role_id;
			this.ruleForm3.nickname = val.nickname;
			this.ruleForm3.password = '';
			this.ruleForm3.password2 = '';
			this.ruleForm3.role_id = val.role_id;
			this.ruleForm3.department_id = val.department_id;
			this.ruleForm3.sex = val.sex;
			this.ruleForm3.position_id = val.position_id;
		},
		//重置密码--关闭按钮
		handleClose3() {
			this.nohandleSubmit5('ruleForm4');
		},
		//删除
		toDelete(val) {
			let param = new Object();
			param.id = val.id;
			this.$confirm(
				'确定要删除该账户吗?此操作不可撤回，删除后该账号无法登陆。',
				'提示',
				{
					type: 'warning',
				}
			)
				.then(() => {
					userdelete(param)
						.then((res) => {
							if (status != 0) {
								this.$message({
									message: msg,
									type: 'error',
								});
								this.fan.fanactionlog(
									'删除',
									'删除账号',
									0,
									val.name,
									'-'
								);
							} else {
								this.$message({
									message: '删除成功',
									type: 'success',
								});
								this.fan.fanactionlog(
									'删除',
									'删除账号',
									1,
									val.name,
									'-'
								);
								this.queryUserList();
							}
						})
						.catch((error) => {});
				})
				.catch(() => {});
		},
		addAccout() {
			this.get_permission_list();
			this.dialogVisible = true;
		},
		//修改确认
		handleSubmit4(ev) {
			//return false
			var _this = this;
			this.$refs.ruleForm3.validate((valid) => {
				if (valid) {
					var loginParams = this.ruleForm3;
					// this.ruleForm3.status = parseInt(this.ruleForm3.radio);
					loginParams.uid = this.ipfs_id;
					loginParams.uname = this.ipfs_user;
					userupdate(loginParams).then((data) => {
						this.dialogVisible2 = false;
						this.addDialogVisible = false;
						let { msg, status, user } = data;
						if (status !== 0) {
							this.$message({
								message: msg,
								type: 'error',
							});
							this.fan.fanactionlog('修改', '修改账号信息', 0);
						} else {
							if (loginParams.id == this.ipfs_id) {
								let userinf = JSON.parse(
									localStorage.getItem('user_information')
								);
								userinf.name = loginParams.name;
								userinf.nickname = loginParams.nickname;
								userinf.phone = loginParams.phone;
								localStorage.setItem(
									'user_information',
									JSON.stringify(userinf)
								);
							}
							this.$message({
								message: '修改成功',
								type: 'success',
							});
							this.fan.fanactionlog('修改', '修改账号信息', 1);
							this.queryUserList();
						}
					});
				} else {
					return false;
				}
			});
		},
		//取消修改
		nohandleSubmit4(formName) {
			this.dialogVisible2 = false;
			this.addDialogVisible = false;
			this.$refs[formName].resetFields();
		},
		//重置密码确认
		handleSubmit5(ev) {
			var _this = this;
			this.$refs.ruleForm4.validate((valid) => {
				if (valid) {
					var loginParams = this.ruleForm3;
					this.ruleForm3.password = this.ruleForm4.password;
					this.ruleForm3.password2 = this.ruleForm4.password2;
					this.ruleForm3.status = parseInt(this.ruleForm3.radio);
					loginParams.uid = this.ipfs_id;
					loginParams.uname = this.ipfs_user;
					userupdate(loginParams).then((data) => {
						let { msg, status, user } = data;
						if (status !== 0) {
							this.$message({
								message: msg,
								type: 'error',
							});
							this.fan.fanactionlog('修改', '修改密码', 0);
						} else {
							this.dialogVisible3 = false;
							this.$message({
								message: '重置成功',
								type: 'success',
							});
							this.fan.fanactionlog('修改', '修改密码', 1);
							this.queryUserList();
						}
					});
				} else {
					return false;
				}
			});
		},
		//重置密码取消
		nohandleSubmit5(formName) {
			this.dialogVisible3 = false;
			this.$refs[formName].resetFields();
		},
		//校验账户名
		jiousername(rule, value, callback) {
			if (value === '') {
				callback(new Error('请输入账号(4-20位汉字字母数字组合)'));
			} else {
				// /^(?!\d+$)[\da-zA-Z]+$/;
				var fsdusername = /^(?![0-9]+$)[\u4e00-\u9fa50-9A-Za-z]{2,20}$/;
				if (fsdusername.test(value) === false) {
					callback(new Error('账号格式错误'));
				} else if (
					value.replace(/[^\u0000-\u00ff]/g, 'aa').length < 4 ||
					value.replace(/[^\u0000-\u00ff]/g, 'aa').length > 20
				) {
					callback(new Error('账号长度不符合规则'));
				} else {
					callback();
				}
			}
		},
		//校验真实姓名
		jioname(rule, value, callback) {
			if (value === '') {
				callback(new Error('请输入昵称(4-20位汉字字母数字组合)'));
			} else {
				var fsdusername = /^(?![0-9]+$)[\u4e00-\u9fa50-9A-Za-z]{2,20}$/;
				if (fsdusername.test(value) === false) {
					callback(new Error('昵称格式错误'));
				} else if (
					value.replace(/[^\u0000-\u00ff]/g, 'aa').length < 4 ||
					value.replace(/[^\u0000-\u00ff]/g, 'aa').length > 20
				) {
					callback(new Error('昵称长度不符合规则'));
				} else {
					callback();
				}
				//var fsdname = /^[\u4e00-\u9fa5\dA-Za-z]{2,10}$|^[\dA-Za-z]{4,20}$/;
				// var fsdname = /^[\u4e00-\u9fa5]{2,10}$/;
				// if (fsdname.test(value) === false) {
				// 	callback(new Error('昵称格式错误'));
				// } else {
				// 	var fsdname2 = /^[0-9]{1,20}$/;
				// 	if (fsdname2.test(value)) {
				// 		callback(new Error('昵称格式错误'));
				// 	} else {
				// 		callback();
				// 	}
				// }
			}
		},
		//校验电话号
		jiophone(rule, value, callback) {
			if (!value) {
				callback();
			} else {
				var fsdtel = /^[1]([3-9])[0-9]{9}$/;
				if (fsdtel.test(value) === false) {
					callback(new Error('手机号格式错误'));
				} else {
					callback();
				}
			}
		},
		//校验密码
		jiopwd(rule, value, callback) {
			// let fsdfpwd = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{8}$/;
			let fsdfpwd = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[0-9A-Za-z~!@#$%^&*_]{8,32}$/;
			if (value === '') {
				callback(
					new Error(
						'请输入密码(8~32位数字、大小写英文字母、特殊字符的组合)'
					)
				);
			} else if (fsdfpwd.test(value) === false) {
				callback(new Error('密码格式错误'));
			} else {
				if (this.ruleForm2.password2 !== '') {
					this.$refs.ruleForm2.validateField('password2');
				}
				callback();
			}
		},
		//校验确认密码
		jioqpwd(rule, value, callback) {
			if (value === '') {
				callback(new Error('请再次输入密码'));
			} else if (value !== this.ruleForm2.password) {
				callback(new Error('两次输入密码不一致!'));
			} else {
				callback();
			}
		},
		//校验密码
		jiopwd2(rule, value, callback) {
			// let fsdfpwd = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{8}$/;
			let fsdfpwd = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[0-9A-Za-z~!@#$%^&*_]{8,32}$/;
			if (value === '') {
				callback(
					new Error(
						'请输入密码(8~32位数字、大小写英文字母、特殊字符的组合)'
					)
				);
			} else if (fsdfpwd.test(value) === false) {
				callback(new Error('密码格式错误'));
			} else {
				if (this.ruleForm4.password2 !== '') {
					this.$refs.ruleForm4.validateField('password2');
				}
				callback();
			}
		},
		//校验确认密码
		jioqpwd2(rule, value, callback) {
			if (value === '') {
				callback(new Error('请再次输入密码'));
			} else if (value !== this.ruleForm4.password) {
				callback(new Error('两次输入密码不一致!'));
			} else {
				callback();
			}
		},
	},
	components: {
		pageNation: pageNation,
		tableBarActive1: tableBarActive1,
	},
};
</script>

<style lang="scss" scoped>
.content {
	overflow: hidden;
}
.search-con {
	width: 250px;
	height: 40px;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	.search-input {
		.el-input__inner {
			border: none;
			background: none;
		}
	}
}

.myself-container {
	// min-width: 1600px;
	text-align: left;
	height: 100%;
	.devide_title {
		width: 100%;
		height: auto;
		overflow: hidden;
		margin-top: 10px;
		background: #ffffff;
		padding: 15px 0px;
		box-sizing: border-box;

		.el-col {
			padding: 0px 20px;
		}
	}

	.device_form {
		width: 100%;
		height: auto;
		overflow: hidden;
		margin-top: 20px;
		background: #ffffff;
		padding: 15px 0;
		box-sizing: border-box;

		.el-form-item__label {
			width: 85px !important;
			white-space: nowrap;
		}

		.el-form-item {
			margin-bottom: 0px;
			margin-left: 10px;
		}

		.row_activess {
			margin-top: 20px;
			display: flex;
			justify-content: flex-start;
			// background: #f0f5f5;
			padding: 17px 0;
			border-radius: 10px;
		}

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

	.user_devide_table {
		height: auto;
		overflow: hidden;
		margin: 14px 24px;
		background-color: #fff;
		box-sizing: border-box;
		padding: 0 24px 24px;
		box-shadow: 0px 4px 10px 0px rgba(51, 51, 51, 0.04);
		.el-table td,
		.el-table th {
			padding: 6px 0px;
		}

		.row_active {
			margin-top: 10px;
		}
	}

	.devide_pageNation {
		width: 100%;
		height: auto;
		overflow: hidden;
		margin-top: 20px;

		.devide_pageNation_active {
			float: right;
		}
	}
}

.addaccout {
	margin: auto;
	.title {
		width: 100%;
		text-align: left;
		margin: 10px;
	}

	.el-dialog__body {
		padding: 0px;
	}

	.el-form-item {
		display: flex;
	}

	.el-form--label-left .el-form-item__label {
		text-align: left;
		width: 90px;
	}

	// .el-form-item__error {
	// 	margin-left: 80px;
	// }
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
