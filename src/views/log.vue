<template>
	<div class="Login">
		<el-form
			:model="ruleForm2"
			:rules="rules2"
			ref="ruleForm2"
			label-position="left"
			label-width="0px"
			class="demo-ruleForm login-container"
		>
			<div class="title">IPFS节点后台管理系统</div>
			<p style="text-align: left;margin: -10px 0 30px 0;color: #A9A9A9;">
				Welcome欢迎登录
			</p>
			<div
				style="border-bottom: 2px solid #ccc;padding: 10px 0;margin:20px 0;"
			>
				<el-form-item
					prop="account"
					style="display:flex; margin-bottom: 0;"
					class="log_input"
				>
					<img
						src="../assets/img/user.png"
						alt
						style="width:10%;display: inline-block; vertical-align: middle;"
					/>
					<el-input
						type="text"
						v-model="ruleForm2.account"
						auto-complete="off"
						placeholder="请输入账号"
						class="login-form-input"
					></el-input>
				</el-form-item>
			</div>
			<div
				style="border-bottom: 2px solid #ccc;padding: 10px 0;margin:20px 0;"
			>
				<el-form-item
					prop="checkPass"
					style="display:flex; margin-bottom: 0;"
					class="log_input"
				>
					<img
						src="../assets/img/pwd.png"
						alt
						style="width:10%;display: inline-block; vertical-align: middle;"
					/>
					<el-input
						type="password"
						v-model="ruleForm2.checkPass"
						auto-complete="off"
						placeholder="请输入密码"
						class="login-form-input"
					></el-input>
				</el-form-item>
			</div>

			<!-- <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox> -->
			<el-form-item style="width:100%;">
				<el-button
					type="primary"
					round
					style="width:100%;margin-top:50px;"
					size="medium"
					@click.native.prevent="handleSubmit2"
					:loading="logining"
					>登录</el-button
				>
				<!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
			</el-form-item>
		</el-form>

		<el-dialog
			title="安全验证"
			:visible.sync="googleVisible"
			:show-close="false"
			customClass="logWidth"
			:close-on-click-modal="false"
		>
			<el-form :model="googleform" ref="ruleFormre">
				<el-form-item
					prop="name"
					:rules="[{ validator: jioyzm, trigger: 'blur' }]"
				>
					<el-input
						v-model.number="googleform.name"
						autocomplete="off"
						placeholder="请输入验证码"
						maxlength="6"
					></el-input>
				</el-form-item>
				<el-form-item>
					<p class="dialog_shu">
						为了您的账号安全不要将验证码泄露给他人
					</p>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="nohand('ruleFormre')">取 消</el-button>
				<el-button type="primary" @click.native.prevent="rehandle"
					>确 定</el-button
				>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import Vue from 'vue';
import Router from 'vue-router';
import { login, check_login, menulistuser } from '../servers/api';
import { delshang } from '../servers/sevdate';
//import NProgress from 'nprogress'
export default {
	data() {
		return {
			logining: false,
			googleVisible: false,
			ipfs_id: '',
			ipfs_token: '',
			ruleForm2: {
				account: '',
				checkPass: '',
			},
			googleform: {
				name: '',
			},
			rules2: {
				account: [
					{
						required: true,
						message: '请输入账号',
						trigger: 'blur',
					},
					//{ validator: validaePass }
				],
				checkPass: [
					{
						required: true,
						message: '请输入密码',
						trigger: 'blur',
					},
					//{ validator: validaePass2 }
				],
			},
			checked: true,
		};
	},
	mounted() {
		if (this.$cookies.get('ipfs_id')) {
			if (!JSON.parse(localStorage.getItem('menus'))) {
				this.$router.push({ path: '/error404' });
			} else {
				this.$router.push({
					path: '/' + this.$cookies.get('ipfs_path'),
				});
			}
		}
	},
	methods: {
		handleReset2() {
			this.$refs.ruleForm2.resetFields();
		},
		handleSubmit2(ev) {
			var _this = this;
			this.$refs.ruleForm2.validate((valid) => {
				if (valid) {
					this.logining = true;
					var loginParams = {
						username: this.ruleForm2.account,
						password: this.ruleForm2.checkPass,
					};
					// this.$router.push({
					//   path: "/user"
					// });
					login(loginParams).then((res) => {
						this.logining = false;
						if (res.status == 0) {
							let datalist = res.data;
							datalist.google = res.google;
							localStorage.setItem(
								'user_information',
								JSON.stringify(datalist)
							);
							sessionStorage.setItem(
								'ipfs_id',
								JSON.stringify(res.data.id)
							);
							sessionStorage.setItem(
								'ipfs_user',
								JSON.stringify(res.data.username)
							);
							this.$cookies.set(
								'ipfs_user',
								res.data.username,
								7 * 24 * 60 * 60
							);
							this.$cookies.set(
								'ipfs_id',
								res.data.id,
								7 * 24 * 60 * 60
                            );
                            this.$cookies.set(
								'role_id',
								res.data.role_id,
								7 * 24 * 60 * 60
							);
							this.get_datalist(res.data.role_id, res.data.id);
						} else if (res.status == 1) {
							this.ipfs_token = res.token;
							this.googleVisible = true;
						} else if (res.status == -900) {
						} else {
							this.$message({
								message: res.err_msg,
								type: 'error',
							});
						}
					});
				} else {
					return false;
				}
			});
		},
		get_datalist(role_id, id) {
			let params = new Object();
			params.id = id;
			params.roleid = role_id;
			menulistuser(params)
				.then((res) => {
					if (res.status == 0) {
						if (res.data && res.data.length > 0) {
							let arrlist = [];
							res.data.forEach((item) => {
								if (item.name == '后台账户') {
									arrlist[0] = item;
								} else if (item.name == '服务器监控') {
									arrlist[1] = item;
								} else if (item.name == 'IPFS节点控制台') {
									arrlist[2] = item;
								} else if (item.name == 'IPFS节点应用') {
									arrlist[3] = item;
								} else if (item.name == 'IPFS节点收益') {
									arrlist[4] = item;
								} else if (item.name == 'IPFS程序管理') {
									arrlist[5] = item;
								} else if (item.name == 'IPFS数据统计') {
									arrlist[6] = item;
									item.children.forEach((xitem, index) => {
										console.log(xitem);

										if (xitem.name == '全国节点分布') {
											arrlist[2].children.unshift(xitem);
											item.children.splice(index, 1);
										}
										if (xitem.name == 'IPFS节点信息') {
											item.children[index] =
												xitem.children[0];
										}
									});
								} else if (item.name == '操作管理') {
									arrlist[7] = item;
									// arrlist[7].children.push({
									// 	children: [],
									// 	component: 'menu_management',
									// 	delete_status: 0,
									// 	export_status: 0,
									// 	hidden: 0,
									// 	icon: '',
									// 	id: 31,
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
									arrlist[8] = item;
								}
							});
							console.log(arrlist);
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
							window.location.href = './';
						} else {
							this.$router.push({ path: '/error404' });
						}
					} else {
						// window.location.href = './';
						this.$message.error(res.msg);
						sessionStorage.removeItem('ipfs_user');
						sessionStorage.removeItem('ipfs_id');
						localStorage.removeItem('menus');
						localStorage.removeItem('user_information');
						this.$cookies.remove('ipfs_user');
						this.$cookies.remove('ipfs_id');
                        this.$cookies.remove('ipfs_path');
                        this.$cookies.remove('role_id');
					}
				})
				.catch((error) => {});
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

		//--弹窗--取消
		nohand(formName) {
			this.googleVisible = false;
			if (this.$refs[formName] !== undefined) {
				this.$refs[formName].resetFields();
			}
		},
		//--弹窗--确认
		rehandle(ev) {
			var _this = this;
			this.$refs.ruleFormre.validate((valid) => {
				if (valid) {
					this.yacode();
				}
			});
		},
		yacode() {
			let parmas = new Object();
			parmas.token = this.ipfs_token;
			parmas.code = this.googleform.name + '';
			check_login(parmas)
				.then((res) => {
					if (res.status == 0) {
						let datalist = res.usermsg;
						datalist.google = res.google;
						localStorage.setItem(
							'user_information',
							JSON.stringify(datalist)
						);
						sessionStorage.setItem(
							'ipfs_id',
							JSON.stringify(res.usermsg.id)
						);
						sessionStorage.setItem(
							'ipfs_user',
							JSON.stringify(res.usermsg.username)
						);
						this.$cookies.set(
							'ipfs_user',
							res.usermsg.username,
							7 * 24 * 60 * 60
						);
						this.$cookies.set(
							'ipfs_id',
							res.usermsg.id,
							7 * 24 * 60 * 60
						);

						// this.$router.push({
						// 	path: '/userli',
						// });
					} else {
						this.$message({
							type: 'error',
							message: '验证失败',
						});
						this.googleVisible = false;
					}
				})
				.catch((error) => {
					console.log(error);
				});
		},
		//校验验证码
		jioyzm(rule, value, callback) {
			if (value === '') {
				callback(new Error('请输入验证码'));
			} else {
				var fsyazm = /^[0-9]{6}$/;
				if (fsyazm.test(value) === false) {
					callback(new Error('验证码格式错误'));
				} else {
					callback();
				}
			}
		},
	},
};
</script>

<style lang="scss">
.Login {
	background: url(../assets/img/login.png);
	background-size: 100% 100%;
	width: 100%;
	height: 100%;
	.el-form {
		.el-form-item {
			.el-form-item__content {
				width: 100%;
			}
			.dialog_shu {
				font-size: 12px;
				color: red;
				text-align: left;
			}
		}
	}
}

.login-container {
	/*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
	background-clip: padding-box;
	margin: auto;
	padding: 35px 35px 15px 35px;
	background: #fff;
	border: 1px solid #eaeaea;
	box-shadow: 0 0 25px #cac6c6;
	position: fixed;
	top: 50%;
	margin-top: -242px;
	right: 15%;
	width: 394px;
	height: 484px;

	.title {
		width: 394px;
		text-align: left;
		height: 92px;
		font-size: 34px;
		font-family: Alibaba PuHuiTi;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
		line-height: 92px;
	}

	.remember {
		margin: 0px 0px 35px 0px;
	}
}
</style>
