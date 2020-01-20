<template>
	<div class="content">
		<!-- 面包屑  -->
		<el-breadcrumb separator="/">
			<el-breadcrumb-item>
				<a>设备监控详情</a>
			</el-breadcrumb-item>
		</el-breadcrumb>
		<!--  -->
		<table
			border="1"
			cellpadding="18"
			cellspacing="0"
			width="100%"
			style="text-align: center;margin: 20px 10px;"
		>
			<tr>
				<td class="device_title_name">设备SN</td>
				<td class="device_title_content">{{ dev_devation.dev_sn }}</td>
				<td class="device_title_name">当前上行宽带</td>
				<td class="device_title_content">{{ dev_devation.up_bw }}</td>
				<td class="device_title_name">主板温度</td>
				<td class="device_title_content">
					{{ dev_devation.motherboard_temperature }}
				</td>
			</tr>
			<tr>
				<td class="device_title_name">节点ID</td>
				<td class="device_title_content">{{ dev_devation.ipfs_id }}</td>
				<td class="device_title_name">当日在线时长</td>
				<td class="device_title_content">
					{{ dev_devation.online_time }}
				</td>
				<td class="device_title_name">硬盘温度</td>
				<td class="device_title_content">
					{{ dev_devation.disk_temperature }}
				</td>
			</tr>
			<tr>
				<td class="device_title_name">设备状态</td>
				<td class="device_title_content">
					<!-- {{dev_devation.online_state}} -->
					<span v-if="dev_devation.online_state == 0">在线</span>
					<span v-else>离线</span>
				</td>
				<td class="device_title_name">CPU温度</td>
				<td class="device_title_content">
					{{ dev_devation.cpu_temperature }}
				</td>
				<td class="device_title_name">内存占用</td>
				<td class="device_title_content">
					{{ dev_devation.memory_usage }}
				</td>
			</tr>
		</table>

		<!-- 搜索框 -->
		<div class="seach_select">
			<el-select v-model="value" placeholder="请选择">
				<el-option
					v-for="item in options"
					:key="item.value"
					:label="item.label"
					:value="item.value"
				></el-option>
			</el-select>
			<span>选择日期：</span>
			<!-- <el-date-picker
          v-model="value1"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
      ></el-date-picker>-->
			<el-date-picker
				v-model="value1"
				type="datetimerange"
				:picker-options="pickerOptions"
				range-separator="至"
				start-placeholder="开始日期"
				end-placeholder="结束日期"
				align="right"
			></el-date-picker>
			<div class="seach_bottom_btn">
				<el-button type="primary" plain size="mini" @click="seachuser()"
					>确定</el-button
				>
				<el-button plain size="mini" @click="reset()">重置</el-button>
			</div>
		</div>
		<!-- 内容主体表格  -->
		<div class="content_lab">
			<el-table
				:data="tableData"
				border
				height="600"
				:cell-style="rowClass"
				:header-cell-style="headClass"
				style="width: 100%"
			>
				<el-table-column
					prop="now_date"
					label="日期"
					width="180"
				></el-table-column>
				<el-table-column
					prop="server_sn"
					label="设备SN"
					width="180"
				></el-table-column>
				<el-table-column
					prop="node_id"
					label="节点ID"
				></el-table-column>
				<el-table-column
					prop="server_status"
					label="设备状态"
					width="220"
				>
					<template slot-scope="scope">
						<span style="color:red;">{{
							scope.row.server_status
						}}</span>
					</template>
				</el-table-column>
				<el-table-column
					prop="cpu_temperature"
					label="CPU温度"
				></el-table-column>
				<el-table-column
					prop="motherboard_temperature"
					label="主板温度"
				></el-table-column>
				<el-table-column
					prop="disk_temperature"
					label="硬盘温度"
				></el-table-column>
				<el-table-column
					prop="memory_usage"
					label="内存占用"
				></el-table-column>
			</el-table>
		</div>
		<!-- <fenye style="float:right;margin:10px 0 0 0;"></fenye> -->
	</div>
</template>

<script>
import fenye from '@/components/fenye';
export default {
	data() {
		return {
			options: [
				{
					value: '1',
					label: '全部'
				},
				{
					value: '2',
					label: 'CPU温度报警'
				},
				{
					value: '3',
					label: '主板温度报警'
				},
				{
					value: '4',
					label: '磁盘温度报警'
				},
				{
					value: '5',
					label: '剩余磁盘容量比例报警'
				}
			],
			dev_devation: {},
			value1: '',
			pickerOptions: {
				shortcuts: [
					{
						text: '最近一周',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(
								start.getTime() - 3600 * 1000 * 24 * 7
							);
							picker.$emit('pick', [start, end]);
						}
					},
					{
						text: '最近一个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(
								start.getTime() - 3600 * 1000 * 24 * 30
							);
							picker.$emit('pick', [start, end]);
						}
					},
					{
						text: '最近三个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(
								start.getTime() - 3600 * 1000 * 24 * 90
							);
							picker.$emit('pick', [start, end]);
						}
					}
				],
				disabledDate(time) {
					return (
						time.getTime() >
						new Date(
							new Date(
								new Date().toLocaleDateString()
							).getTime() +
								24 * 60 * 60 * 1000 -
								1
						)
					);
				}
			},
			tableData: [
				{
					now_date: '2016-05-02', //日期
					server_sn: 'fas1g35wa1f53', //设备sn
					node_id: 'gager165g1ae51g6a5ew1', //节点ID
					server_status: '磁盘温度报警', //设备状态
					cpu_temperature: '18', //CPU温度
					motherboard_temperature: '25', //主板温度
					disk_temperature: '28', //硬盘温度
					memory_usage: '26', //内存占用
					online_time: '13.1', //在线时长
					upstream_bandwidth: '38.56' //上行带宽
				}
			],
			value: '1'
		};
	},
	mounted() {},
	components: { fenye },
	methods: {
		//确定搜索
		seachuser() {
			this.optiondisplay = false;
			// this.value = "";
			// this.input = "";
			// this.value1 = "";
			this.tolpage = 0;
		},
		//重置
		reset() {
			this.value = '';
			this.value1 = '';
		},
		// 表头样式设置
		headClass() {
			return 'text-align: center;background:#eef1f6;';
		},
		// 表格样式设置
		rowClass() {
			return 'text-align: center;';
		}
	}
};
</script>

<style lang="scss" scoped>
.content {
	width: 100%;
	height: 100%;
	text-align: left;
	.device_title_name {
		width: 16%;
		background: #eeeeee;
		color: #000000;
	}
	.device_title_content {
		width: 16%;
		background: #ffffff;
		color: #000000;
	}
	.seach_select {
		margin: 20px 0 20px 10px;
		display: flex;
		align-items: center;
		.seach_bottom_btn {
			width: 200px;
			margin-left: 20px;
		}
	}
	.content_lab {
		margin: 10px;
	}
}
</style>
