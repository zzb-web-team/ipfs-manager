<template>
	<div class="content">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item>
				<a>云链节点收益 | 调整收益参数</a>
			</el-breadcrumb-item>
		</el-breadcrumb>
		<el-row>
			<el-col :span="24"
				><div class="grid-content bg-purple-dark top_text">
					<p class="text_title">收益公式介绍：</p>
					<p>
						P（节点收益）=（P1[节点理论收益]+P2[节点实际贡献收益]）/2*RH[算力收益百分比]+P3[节点质量评级收益]）
					</p>
					<p>
						P1=[B1*VB*(T1/24）+B2*VB*(T2/24）+B3*VB*(T3/24）*45%]*（1/NN）+S*VS*（T/24）
					</p>
					<p>P2=F1*VF+F2*VF+F3*VF*45% P3=（P1+P2）/2*RH*RNM</p>
					<p>P3=（P1+P2）/2*RH*RNM</p>
					<p class="text_title">名词补充释义：</p>
					<p>
						单位带宽[/Mbps]价值（VB）、中国电信带宽（B1）[单位：Mbps]、中国联通带宽（B2）[单位：Mbps]、中国移
						动带宽（B3）[单位：Mbps]、单位存储[/GB]价值（VS）、日累计在线时长
						（T）[单位：h]、中国电信网络在线时长（T1）[单位：h]、中国联通带宽网络在线时长（T2）[单位：
						h]、中国移动网络在线时长（T3）[单位：h]、同一终端地址下，多台运行节点的主机设备总数量（NN）[单位：台]、单位流量[/GB]价值（VF）、中国电信流量（F1）[单位：GB]、中国联通流量（F2）[单位：GB]、中国移动流量
						（F3）[单位：GB]、节点质量评级奖励收益百分比（RNM）
					</p>
				</div></el-col
			>
		</el-row>
		<el-row>
			<el-col :span="24">
				<div class="grid-content bg-purple-dark">
					<p>1.p1参数</p>
					<p>1） 变量值</p>

					<el-row type="flex">
						<span>Vb=</span>
						<el-col :span="2">
							<el-input
								size="small"
								v-model="vb_input"
								placeholder="请输入内容"
							></el-input>
						</el-col>
						<span>积分/日</span>
						<el-button type="primary" size="mini">修改</el-button>
					</el-row>
					<el-row type="flex">
						<span>Vs=</span>
						<el-col :span="2">
							<el-input
								size="small"
								v-model="vs_input"
								placeholder="请输入内容"
							></el-input>
						</el-col>
						<span>积分/日</span>
						<el-button type="primary" size="mini">修改</el-button>
					</el-row>
				</div>
			</el-col>
			<el-col :span="24">
				<div class="grid-content bg-purple-dark">
					<p>2.p2参数</p>
					<p>1） 变量值</p>
					<el-row type="flex">
						<span>VF=</span>
						<el-col :span="2">
							<el-input
								size="small"
								v-model="vf_input"
								placeholder="请输入内容"
							></el-input>
						</el-col>
						<span>积分/日</span>
						<el-button type="primary" size="mini">修改</el-button>
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
							style="width: 350px"
						>
							<el-table-column label="节点质量级别" width="140">
								<template slot-scope="scope">
									<i v-if="scope.row.rh != 100"
										>{{ scope.row.min }}<=</i
									>
									<i>H</i>
									<i v-if="scope.row.rh != 100">&lt;</i>
									<i v-if="scope.row.rh == 100">&gt;</i>
									<i>{{ scope.row.max }}</i>
								</template>
							</el-table-column>
							<el-table-column prop="rh" label="RH">
								<template slot-scope="scope"
									><span>{{ scope.row.rh }}%</span></template
								>
							</el-table-column>
							<el-table-column prop="操作" label="操作">
								<template slot-scope="scope">
									<el-button
										@click="handleClick(scope.row)"
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
							style="width: 350px"
						>
							<el-table-column
								prop="interval"
								label="算力值区间"
								width="130"
							>
							</el-table-column>
							<el-table-column prop="rnm" label="RNM">
							</el-table-column>
							<el-table-column prop="操作" label="操作">
								<template slot-scope="scope">
									<el-button
										@click="handleClick(scope.row)"
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
import { get_price_param, update_price_param } from '@/servers/api';
export default {
	data() {
		return {
			vb_input: '',
			vs_input: '',
			vf_input: '',
			tableData: [
				{
					min: 0,
					max: 500,
					rh: '10',
				},
				{
					min: 500,
					max: 1000,
					rh: '20',
				},
				{
					min: 1000,
					max: 3000,
					rh: '30',
				},
				{
					min: 3000,
					max: 5000,
					rh: '50',
				},
				{
					min: 5000,
					max: 10000,
					rh: '80',
				},
				{
					min: 10000,
					max: 10000,
					rh: '100',
				},
			],
			ratingData: [
				{
					interval: 'S',
					rnm: '10%',
				},
				{
					interval: 'A',
					rnm: '0%',
				},
				{
					interval: 'B',
					rnm: '30%',
				},
				{
					interval: 'C',
					rnm: '0%',
				},
			],
		};
	},
	methods: {
		get_data() {
			let params = new Object();
			get_price_param(params)
				.then((res) => {
					console.log(res);
					if (res.status == 0) {
					}
				})
				.catch((error) => {
					console.log(error);
				});
		},
		set_price() {
            let params = new Object();
            let arrlist=new Array();
            params.price=arrlist;
			update_price_param(params)
				.then((res) => {
					console.log(res);
				})
				.catch((error) => {
					console.log(error);
				});
		},
		handleClick(row) {
			console.log(row);
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
	}
	.con_table {
		margin-top: 15px;
	}
}
</style>
