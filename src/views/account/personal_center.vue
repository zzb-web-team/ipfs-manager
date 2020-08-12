<template>
	<div class="content">
		<div class="content_title">账号信息</div>
		<ol>
			<li>
				<span class="item_title">账号：</span
				><span class="item_con">{{ userinf.username }}</span>
			</li>
			<li>
				<span class="item_title">昵称：</span>
				<span class="item_con">{{
					userinf.nickname ? userinf.nickname : '未设置'
				}}</span>
				<span class="item_btn">
					<el-button type="text" size="small" @click="setnickname">{{
						userinf.nickname ? '修改' : '设置'
					}}</el-button>
				</span>
			</li>
			<li>
				<span class="item_title">真实姓名：</span>
				<span class="item_con">{{
					userinf.name ? userinf.name : '未设置'
				}}</span>
				<span class="item_btn">
					<el-button type="text" size="small" @click="setname">{{
						userinf.name ? '修改' : '设置'
					}}</el-button>
				</span>
			</li>
			<!-- <li>
				<span class="item_title">账号状态：</span
				><span class="item_con" :class="userinf.status == 0 ? 'qi' : 'jin'"
					>启用</span
				><span></span>
			</li> -->
			<li>
				<span class="item_title">账号创建时间：</span>
				<span class="item_con">{{ userinf.time_create | getymd }}</span>
			</li>
			<li>
				<span class="item_title">绑定电话号：</span>
				<span class="item_con">{{
					userinf.phone ? userinf.phone : '未设置'
				}}</span>
				<span class="item_btn">
					<el-button type="text" size="small" @click="setphone">{{
						userinf.phone ? '修改' : '设置'
					}}</el-button>
				</span>
			</li>
			<li>
				<span class="item_title">安全级别：</span>
				<span class="item_con"
					>{{ grade
					}}<span class="tips1" v-if="grade == '低'"
						><i></i><i></i><i></i
					></span>
					<span class="tips2" v-else-if="grade == '中'"
						><i></i><i></i><i></i
					></span>
					<span class="tips3" v-else><i></i><i></i><i></i></span
				></span>
			</li>
			<li>
				<span class="item_title">二级安全验证：</span>
				<span class="item_con">{{
					userinf.google == 0 ? '未启用' : '已启用'
				}}</span>
				<span class="item_btn">
					<el-button type="text" size="small" @click="setpwd(1)"
						>设置</el-button
					>
				</span>
			</li>
		</ol>
		<!-- 弹窗 -->
		<el-dialog
			:title="tabtitle"
			:visible.sync="dialogFormVisible"
			customClass="customWidths"
			@close="handleClose2"
             :close-on-click-modal="false"
		>
			<el-form :model="form" ref="ruleForm">
				<el-form-item
					prop="name"
					:rules="[{ validator: jiophone, trigger: 'blur' }]"
				>
					<el-input
						v-model="form.name"
						autocomplete="off"
						:placeholder="placeholdercon"
					></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="nohandleSubmit('ruleForm')">取 消</el-button>
				<el-button type="primary" @click.native.prevent="handleSubmit4"
					>确 定</el-button
				>
			</div>
		</el-dialog>
		<el-dialog
			title="验证"
			:visible.sync="recodecisbity"
			customClass="recustomWidth"
			@close="handleClose"
             :close-on-click-modal="false"
		>
			<el-form :model="reform" ref="ruleFormre">
				<el-form-item class="reimg">
					<img :src="reform.url" alt="" />
					<div>
						<span>secret:</span><span>{{ reform.secret_num }}</span>
					</div>
				</el-form-item>
				<el-form-item
					prop="name"
					:rules="[{ validator: jioyzm, trigger: 'blur' }]"
				>
					<el-input
						v-model.number="reform.name"
						autocomplete="off"
						placeholder="验证码"
						maxlength="6"
					></el-input>
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
import { userupdate, bind_login } from '../../servers/api';
import { getymdtime } from '../../servers/sevdate';
export default {
	data() {
		return {
			title: '个人中心',
			tabtitle: '',
			grade: '',
			state: 1,
			placeholdercon: '',
			updata_type: 1,
			userinf: {},
			ipfs_id: '',
			ipfs_user: '',
			dialogFormVisible: false,
			recodecisbity: false,
			form: { name: '' },
			reform: { name: '', url: '', secret_num: 0 },
		};
	},
	filters: {
		//时间戳转时间
		getymd(time) {
			return getymdtime(time);
		},
	},
	mounted() {
		this.userinf = JSON.parse(localStorage.getItem('user_information'));
		this.ipfs_id = parseInt(this.$cookies.get('ipfs_id'));
		this.ipfs_user = this.$cookies.get('ipfs_user');
		if (this.userinf.google == 1 && this.userinf.phone != "") {
			this.grade = '高';
		} else if (this.userinf.google == 1 && this.userinf.phone == "") {
			this.grade = '中';
		} else {
			this.grade = '低';
		}
	},
	methods: {
		//设置昵称
		setnickname() {
			this.tabtitle = '昵称修改';
			this.placeholdercon = '4-20位英文加数字组合';
			this.updata_type = 1;
			this.form.name = this.userinf.nickname;
			this.dialogFormVisible = true;
		},
		//设置真是姓名
		setname() {
			this.tabtitle = '真实姓名修改';
			this.placeholdercon = '4-20位汉字数字字母组合';
			this.updata_type = 2;
			this.form.name = this.userinf.name;
			this.dialogFormVisible = true;
		},
		//设置手机号
		setphone() {
			this.tabtitle = '手机号修改';
			this.placeholdercon = '11位有效手机号';
			this.updata_type = 3;
			this.form.name = this.userinf.phone;
			this.dialogFormVisible = true;
		},
		//设置二级密码
		setpwd(num) {
            this.recodecisbity = true;
			let parmas = new Object();
			parmas.id = this.ipfs_id + '';
			if (num != 1) {
				parmas.code = this.reform.name + '';
			}
			
			bind_login(parmas)
				.then((res) => {
					if (res.status == 0) {
						if (num == 1) {
							this.reform.url = res.msg.url;
							this.reform.secret_num = res.msg.secret;
						} else {
							 this.recodecisbity = false;
							this.$message({
								message: '操作成功',
								type: 'success',
							});
							this.userinf.google = 1;
							localStorage.setItem(
								'user_information',
								JSON.stringify(this.userinf)
							);
						}
					}
				})
				.catch((error) => {
				});
		},
		//修改用户信息
		setuser() {
			let parmas = new Object();
			if (this.updata_type == 1) {
				parmas.nickname = this.form.name;
				parmas.name = this.userinf.name;
				parmas.phone = this.userinf.phone;
				parmas.status = 0;
			} else if (this.updata_type == 2) {
				parmas.name = this.form.name;
				parmas.nickname = this.userinf.nickname;
				parmas.phone = this.userinf.phone;
				parmas.status = 0;
			} else if (this.updata_type == 3) {
				parmas.phone = this.form.name;
				parmas.nickname = this.userinf.nickname;
				parmas.name = this.userinf.name;
				parmas.status = 0;
			} else if (this.updata_type == 4) {
				parmas.status = 1;
				parmas.nickname = this.userinf.nickname;
				parmas.name = this.userinf.name;
				parmas.phone = this.userinf.phone;
			}
			parmas.id = this.ipfs_id + '';
			parmas.username = this.ipfs_user;
			parmas.password = '';
			parmas.password2 = '';
			parmas.radio = '0';
			parmas.uname = this.ipfs_user;
			parmas.uid = this.ipfs_id + '';
			parmas.role_id = this.userinf.role_id;
			parmas.value = '';
			userupdate(parmas)
				.then((res) => {
					if (res.status == 0) {
						this.dialogFormVisible = false;
						this.$message({
							message: '操作成功',
							type: 'success',
						});
						this.userinf.nickname = res.result[0].nickname;
						this.userinf.phone = res.result[0].phone;
						this.userinf.name = res.result[0].name;
						this.userinf.status = res.result[0].status;
						localStorage.setItem(
							'user_information',
							JSON.stringify(this.userinf)
						);
					} else {
						this.dialogFormVisible = false;
						this.$message({
							message: '操作失败',
							type: 'error',
						});
					}
				})
				.catch((error) => {});
		},
		//关闭按钮
		handleClose2() {
			this.nohandleSubmit('ruleForm');
		},
		//弹窗--取消
		nohandleSubmit(formName) {
			this.dialogFormVisible = false;
			if (this.$refs[formName] !== undefined) {
				this.$refs[formName].resetFields();
			}
		},
		//弹窗--确认
		handleSubmit4(ev) {
			//return false
			var _this = this;
			this.$refs.ruleForm.validate((valid) => {
				if (valid) {
					this.setuser();
				}
			});
		},
		//--关闭按钮
		handleClose() {
			this.nohand('ruleForm');
		},
		//--弹窗--取消
		nohand(formName) {
			this.recodecisbity = false;
			if (this.$refs[formName] !== undefined) {
				this.$refs[formName].resetFields();
			}
		},
		//--弹窗--确认
		rehandle(ev) {
			var _this = this;
			this.$refs.ruleFormre.validate((valid) => {
				if (valid) {
					this.setpwd(2);
				}
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
		//校验
		jiophone(rule, value, callback) {
			var fsdtel = /^[1]([3-9])[0-9]{9}$/;
			var fsdname = /^[\u4e00-\u9fa5]{2,10}$/;
			var fsdusername = /^(?![0-9]+$)[0-9A-Za-z]{4,20}$/;
			if (this.updata_type == 1) {
				if (value === '') {
					callback(new Error('请输入昵称'));
				} else {
					// /^(?!\d+$)[\da-zA-Z]+$/;

					if (fsdusername.test(value) === false) {
						callback(new Error('昵称格式错误'));
					} else {
						callback();
					}
				}
			} else if (this.updata_type == 2) {
				if (value === '') {
					callback(new Error('请输入真实姓名'));
				} else {
					//var fsdname = /^[\u4e00-\u9fa5\dA-Za-z]{2,10}$|^[\dA-Za-z]{4,20}$/;
					// var fsdname = /^[\u4e00-\u9fa5]{2,10}$/;
					if (fsdname.test(value) === false) {
						callback(new Error('真实姓名格式错误'));
					} else {
						var fsdname2 = /^[0-9]{1,20}$/;
						if (fsdname2.test(value)) {
							callback(new Error('真实姓名格式错误'));
						} else {
							callback();
						}
					}
				}
			} else if (this.updata_type == 3) {
				if (value === '') {
					callback(new Error('请输入手机号'));
				} else {
					if (fsdtel.test(value) === false) {
						callback(new Error('手机号格式错误'));
					} else {
						callback();
					}
				}
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.content {
	text-align: left;
	.content_title {
		width: 100%;
		font-size: 18px;
		font-weight: 600;
		margin-bottom: 20px;
	}
	ol {
		width: 100%;
		height: auto;
		li {
			width: 100%;
			height: 34px;
			line-height: 26px;
			font-size: 16px;
			.item_title {
				display: inline-block;
				width: 100px;
				margin-right: 50px;
			}
			.item_con {
				color: darkgray;
				display: inline-block;
				width: 200px;
				margin-right: 50px;
			}
			.tips1,
			.tips2,
			.tips3 {
				display: inline-block;
				margin-left: 10px;
				i {
					display: inline-block;
					width: 40px;
					height: 10px;
					margin-right: 10px;
					border: 1px solid #808080;
				}
			}
			.tips1 {
				i {
					background: red;
				}
			}
			.tips2 {
				i {
					background: yellow;
				}
			}
			.tips3 {
				i {
					background: green;
				}
			}
			.item_btn {
				display: inline-block;
				margin-right: 50px;
			}
			.qi {
				color: rgb(0, 255, 13);
			}
			.jin {
				color: crimson;
			}
		}
	}
}
.reimg {
	text-align: center;
}
</style>
