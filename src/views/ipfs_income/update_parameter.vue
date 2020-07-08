<template>
	<div class="content">
		<el-page-header @back="goBack" content="云链节点收益 | 调整收益参数">
		</el-page-header>
		<!-- <el-breadcrumb separator="/">
			<el-breadcrumb-item>
				<a>云链节点收益 | 调整收益参数</a>
			</el-breadcrumb-item>
		</el-breadcrumb> -->
		<el-row>
			<el-col :span="24"
				><div class="grid-content bg-purple-dark top_text">
					<p class="text_title">收益公式介绍：</p>
					<p>
						P（节点收益）=（P1[节点理论收益]+P2[节点实际贡献收益]）/2*RH[算力收益百分比]+P3[节点质量评级收益]）
						<!-- P（节点收益）=P1[节点实际贡献收益]*RH[算力收益百分比]+P2[节点质量评级收益]） -->
					</p>
					<p>
						P1=[B1*VB*(T1/24）+B2*VB*(T2/24）+B3*VB*(T3/24）*45%]*（1/NN）+S*VS*（T/24）
						<!-- P1=F1*VF+F2*VF+F3*Vf*45% -->
					</p>
					<p>
						P2=F1*VF+F2*VF+F3*VF*45% P3=（P1+P2）/2*RH*RNM
						<!-- P2=P1*RH*RNM -->
					</p>
					<p>P3=（P1+P2）/2*RH*RNM</p>
					<p class="text_title">名词补充释义：</p>
					<div style="line-height: 20px;">
						单位带宽[/Mbps]价值（VB）、中国电信带宽（B1）[单位：Mbps]、中国联通带宽（B2）[单位：Mbps]、中国移
						动带宽（B3）[单位：Mbps]、单位存储[/GB]价值（VS）、日累计在线时长
						（T）[单位：h]、中国电信网络在线时长（T1）[单位：h]、中国联通带宽网络在线时长（T2）[单位：
						h]、中国移动网络在线时长（T3）[单位：h]、同一终端地址下，多台运行节点的主机设备总数量（NN）[单位：台]、单位流量[/GB]价值（VF）、中国电信流量（F1）[单位：GB]、中国联通流量（F2）[单位：GB]、中国移动流量
						（F3）[单位：GB]、节点质量评级奖励收益百分比（RNM）
						<!-- 单位流量[/GB]价值(VF)、中国电信流量(F1)[单位:GB]、中国联通流量(F2)[单位:GB]、中国移动流量(F3)[单位:GB]、点质量评级奖励收益百分比(RNM) -->
					</div>
				</div></el-col
			>
		</el-row>
		<el-row>
			<el-col :span="24">
				<div class="grid-content bg-purple-dark">
					<p>1.p1参数</p>
					<p>1） 变量值</p>
					<el-row type="flex">
						<span style="margin-bottom: 20px;">Vb=</span>
						<el-form :model="googleform" ref="ruleFormre">
							<el-form-item
								prop="Vb"
								:rules="[
									{ validator: jioyzm, trigger: 'blur' },
								]"
							>
								<el-input
									:disabled="menutype.roleU != 1"
									size="small"
									v-model="googleform.Vb"
									placeholder="请输入内容"
									clearable
								>
								</el-input>
							</el-form-item>
						</el-form>
						<span style="margin-bottom: 20px;">积分/日</span>
						<el-button
							v-show="menutype.roleU == 1"
							type="primary"
							size="mini"
							style="margin-bottom: 20px;"
							@click="set_price(1)"
							>修改</el-button
						>
					</el-row>
					<el-row type="flex">
						<span style="margin-bottom: 20px;">Vs=</span>
						<el-form :model="googleform" ref="ruleFormre">
							<el-form-item
								prop="Vs"
								:rules="[
									{ validator: jioyzm, trigger: 'blur' },
								]"
							>
								<el-input
									:disabled="menutype.roleU != 1"
									size="small"
									v-model="googleform.Vs"
									placeholder="请输入内容"
									clearable
								>
								</el-input>
							</el-form-item>
						</el-form>
						<span style="margin-bottom: 20px;">积分/日</span>
						<el-button
							v-show="menutype.roleU == 1"
							type="primary"
							size="mini"
							style="margin-bottom: 20px;"
							@click="set_price(1)"
							>修改</el-button
						>
					</el-row>
				</div>
			</el-col>
			<el-col :span="24">
				<div class="grid-content bg-purple-dark">
					<p>2.p2参数</p>
					<p>1） 变量值</p>
					<el-row type="flex">
						<span style="margin-bottom: 20px;">VF=</span>
						<el-form :model="googleform" ref="ruleFormre">
							<el-form-item
								prop="Vf"
								:rules="[
									{ validator: jioyzm, trigger: 'blur' },
								]"
							>
								<el-input
									size="small"
									v-model="googleform.Vf"
									placeholder="请输入内容"
									clearable
									:disabled="menutype.roleU != 1"
								>
								</el-input>
							</el-form-item>
						</el-form>
						<!-- <el-col :span="2">
							<el-input
								size="small"
								v-model="Vf"
								placeholder="请输入内容"
							></el-input>
						</el-col> -->
						<span style="margin-bottom: 20px;">积分/日</span>
						<el-button
							v-show="menutype.roleU == 1"
							type="primary"
							size="mini"
							style="margin-bottom: 20px;"
							@click="set_price(1)"
							>修改</el-button
						>
					</el-row>
				</div>
			</el-col>
			<el-col :span="24">
				<div class="grid-content bg-purple-dark">
					<p>3.算力参数</p>
					<p>1） 算力区间收益百分比</p>
					<div class="con_table">
						<el-table
							:data="tableData"
							border
							:cell-style="rowClass"
							:header-cell-style="headClass"
							style="width: 450px"
						>
							<el-table-column label="节点质量级别" width="140">
								<template slot-scope="scope">
									<i v-if="scope.row.v != 100"
										>{{ scope.row.min }}<=</i
									>
									<i>H</i>
									<i v-if="scope.row.v != 100">&lt;</i>
									<i v-if="scope.row.v == 100">&gt;</i>
									<i>{{ scope.row.max }}</i>
								</template>
							</el-table-column>
							<el-table-column prop="v" label="RH" width="140">
								<template slot-scope="scope"
									><span>{{ scope.row.v }}%</span></template
								>
							</el-table-column>
							<el-table-column prop="操作" label="操作">
								<template slot-scope="scope">
									<el-button
										v-show="menutype.roleU == 1"
										@click="
											updateInterval(
												scope.row,
												scope.$index
											)
										"
										type="text"
										size="small"
										>修改</el-button
									>
								</template>
							</el-table-column>
						</el-table>
					</div>
				</div>
			</el-col>
			<el-col :span="24">
				<div class="grid-content bg-purple-dark">
					<p>4.P3参数</p>
					<p>1） 节点质量评级奖励收益百分比</p>
					<div class="con_table">
						<el-table
							:data="ratingData"
							border
							:cell-style="rowClass"
							:header-cell-style="headClass"
							style="width: 450px"
						>
							<el-table-column
								prop="interval"
								label="算力值区间"
								width="130"
							>
							</el-table-column>
							<el-table-column prop="Rnm" label="RNM">
								<template slot-scope="scope"
									><span>{{ scope.row.Rnm }}%</span></template
								>
							</el-table-column>
							<el-table-column prop="操作" label="操作">
								<template slot-scope="scope">
									<el-button
										v-show="menutype.roleU == 1"
										@click="
											updateRnm(scope.row, scope.$index)
										"
										type="text"
										size="small"
										>修改</el-button
									>
								</template>
							</el-table-column>
						</el-table>
					</div>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import { get_net_info, update_net_info } from '@/servers/api';
import { Slider } from 'element-ui';
import { menudisable } from '../../servers/sevdate';
export default {
	data() {
		return {
			googleform: {
				Vb: '',
				Vs: '',
				Vf: '',
			},
			tableData: [
				{
					min: 0,
					max: 500,
					v: 10,
				},
				{
					min: 500,
					max: 1000,
					v: 20,
				},
				{
					min: 1000,
					max: 3000,
					v: 30,
				},
				{
					min: 3000,
					max: 5000,
					v: 50,
				},
				{
					min: 5000,
					max: 10000,
					v: 80,
				},
				{
					min: 10000,
					max: 10000,
					v: 100,
				},
			],
			ratingData: [
				{
					interval: 'S',
					Rnm: 10,
				},
				{
					interval: 'A',
					Rnm: 0,
				},
				{
					interval: 'B',
					Rnm: 0,
				},
				{
					interval: 'C',
					Rnm: 0,
				},
			],
			priceobj: {},
			menutype: {},
		};
	},
	mounted() {
		this.get_data();
		let munulist = JSON.parse(localStorage.getItem('menus'));
		let pathname = this.$route.path;
		this.menutype = menudisable(munulist, pathname);
	},
	methods: {
		goBack() {
			this.$router.go(-1);
		},
		get_data() {
			let params = new Object();
			params.data = {};
			get_net_info(params)
				.then((res) => {
					console.log(res);
					this.priceobj = res;
					this.googleform = res.price[0];
					console.log(this.googleform);
					this.tableData = res.H;
					this.ratingData = [];
					for (let k in res.Rnm) {
						let obj = new Object();
						obj.interval = k;
						obj.Rnm = res.Rnm[k];
						this.ratingData.push(obj);
					}
					// if (res.status == 0) {
					// 	this.price = res.data;
					// 	this.googleform = res.data.price[0];
					// 	this.tableData = res.data.H;
					// 	for (k in res.data.Rnm) {
					// 		let obj = new Object();
					// 		obj.interval = k;
					// 		obj.Rnm = res.data.Rnm[k];
					// 		this.ratingData.push(obj);
					// 	}
					// }
				})
				.catch((error) => {
					console.log(error);
				});
		},
		set_price(num) {
			let params = new Object();
			params.H = [];
			params.Rnm = {};
			params.price = [];
			let H = new Array();
			let Rnm = new Object();
			let price = new Array();
			if (num == 1) {
				for (let i = 0; i < 3; i++) {
					var temp = Object.assign({}, this.googleform);
					temp.netOper = i;
					price.push(temp);
				}

				params.H = this.priceobj.H;
				params.Rnm = this.priceobj.Rnm;
				params.price = price;
			} else if (num == 2) {
				params.H = this.tableData;
				params.price = this.priceobj.price;
				params.Rnm = this.priceobj.Rnm;
			} else if (num == 3) {
				this.ratingData.forEach((item) => {
					if (item.interval == 'S') {
						Rnm.S = item.Rnm;
					} else if (item.interval == 'A') {
						Rnm.A = item.Rnm;
					} else if (item.interval == 'B') {
						Rnm.B = item.Rnm;
					} else if (item.interval == 'C') {
						Rnm.C = item.Rnm;
					}
				});
				params.H = this.priceobj.H;
				params.price = this.priceobj.price;
				params.Rnm = Rnm;
			}
			console.log(num, params);
			update_net_info(params)
				.then((res) => {
					console.log(res);
					if (res.err == 0) {
						this.$message({
							type: 'success',
							message: '修改成功',
						});
						this.get_data();
					}
				})
				.catch((error) => {
					console.log(error);
				});
		},
		updateInterval(row, num) {
			console.log(row);
			this.$prompt('请输入RH', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				inputValidator: (value) => {
					// 点击按钮时，对文本框里面的值进行验证
					if (!value) {
						return '输入不能为空';
					} else {
						// if (row.min <= 0 && row.max <= 500) {
						// 	if (value < 0 || value > 10) {
						// 		return '输入RH区间错误';
						// 	}
						// } else if (row.min <= 500 && row.max <= 1000) {
						// 	if (value < 10 || value > 20) {
						// 		return '输入RH区间错误';
						// 	}
						// } else if (row.min <= 1000 && row.max <= 3000) {
						// 	if (value < 20 || value > 30) {
						// 		return '输入RH区间错误';
						// 	}
						// } else if (row.min <= 3000 && row.max <= 5000) {
						// 	if (value < 30 || value > 50) {
						// 		return '输入RH区间错误';
						// 	}
						// } else if (row.min <= 5000 && row.max <= 10000) {
						// 	if (value < 50 || value > 80) {
						// 		return '输入RH区间错误';
						// 	}
						// } else if (row.max > 1000) {
						// 	if (value < 80 || value > 100) {
						// 		return '输入RH区间错误';
						// 	}
						// }
					}
				},
				// inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
				//inputErrorMessage: 'RH不正确',
			})
				.then(({ value }) => {
					// this.$message({
					// 	type: 'success',
					// 	message: '修改为 ' + value,
					// });
					this.tableData[num].v = value;
					this.set_price(2);
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '取消修改',
					});
				});
		},
		updateRnm(row, num) {
			console.log(row);
			this.$prompt('请输入RNM', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				inputValidator: (value) => {
					// 点击按钮时，对文本框里面的值进行验证
					if (!value) {
						return '输入不能为空';
					} else {
						// if (row.interval == 'S') {
						// 	if (
						// 		value <= this.ratingData[1].Rnm ||
						// 		value > 100
						// 	) {
						// 		return '输入RNM区间错误';
						// 	}
						// } else if (row.interval == 'A') {
						// 	if (
						// 		value <= this.ratingData[2].Rnm ||
						// 		value >= this.ratingData[0].Rnm
						// 	) {
						// 		return '输入RNM区间错误';
						// 	}
						// } else if (row.interval == 'B') {
						// 	if (
						// 		value <= this.ratingData[3].Rnm ||
						// 		value >= this.ratingData[2].Rnm
						// 	) {
						// 		return '输入RNM区间错误';
						// 	}
						// } else if (row.interval == 'C') {
						// 	if (value < 0 || value >= this.ratingData[0].Rnm) {
						// 		return '输入RNM区间错误';
						// 	}
						// }
					}
				},
				// inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
				// inputErrorMessage: 'RH不正确',
			})
				.then(({ value }) => {
					this.ratingData[num].Rnm = value;
					// this.$message({
					// 	type: 'success',
					// 	message: '修改为 ' + value,
					// });
					this.set_price(3);
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '取消修改',
					});
				});
		},
		//校验
		jioyzm(rule, value, callback) {
			console.log(value);
			if (value === '') {
				callback(new Error('不能为空'));
			} else {
				var fsyazm = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/;
				if (fsyazm.test(value) === false) {
					callback(new Error('格式错误'));
				} else {
					callback();
				}
			}
		},
		// 表头样式设置
		headClass() {
			return 'text-align: center;background:#eef1f6;';
		},
		// 表格样式设置
		rowClass() {
			return 'text-align: center;';
		},
	},
};
</script>

<style lang="scss" scoped>
i {
	font-style: normal;
}
.content {
	text-align: left;
	p {
		margin-top: 8px;
	}
	.top_text {
		background: #f6f6f6;
		border-radius: 6px;
		margin-top: 20px;
		margin-bottom: 40px;
		box-sizing: border-box;
		padding: 10px 20px 20px 20px;
		font-size: 18px;

		.text_title {
			margin-top: 15px;
			margin-bottom: 15px;
		}
		.text_title:nth-child(1) {
			margin-top: 5px;
		}
	}
	.el-col {
		align-items: center;
		line-height: 46px;
		span {
			margin-left: 15px;
			margin-right: 15px;
		}
	}
	.el-row {
		align-items: center;
		vertical-align: middle;
	}
	.con_table {
		margin-top: 15px;
	}
}
</style>
