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
			<div class="title">IPFS后台管理系统</div>
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
import { login, check_login } from '../servers/api';
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
			this.$router.push({
				path: '/userli',
			});
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
					login(loginParams).then((data) => {
						this.logining = false;
						if (data.status == 0) {
							let datalist = data.msg;
							datalist.google = res.google;
							localStorage.setItem(
								'user_information',
								JSON.stringify(datalist)
							);
							sessionStorage.setItem(
								'ipfs_id',
								JSON.stringify(data.msg.id)
							);
							sessionStorage.setItem(
								'ipfs_user',
								JSON.stringify(data.msg.username)
							);
							this.$cookies.set(
								'ipfs_user',
								data.msg.username,
								7 * 24 * 60 * 60
							);
							this.$cookies.set(
								'ipfs_id',
								data.msg.id,
								7 * 24 * 60 * 60
							);

							this.$router.push({
								path: '/userli',
							});
						} else if (data.status == 1) {
							this.ipfs_token = data.token;
							this.googleVisible = true;
						} else if (data.status == -900) {
						} else {
							this.$message({
								message: data.err_msg,
								type: 'error',
							});
						}
					});
				} else {
					return false;
				}
			});
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

						this.$router.push({
							path: '/userli',
						});
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
