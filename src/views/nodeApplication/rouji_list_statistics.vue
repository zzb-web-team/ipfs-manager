<template>
	<div class="content rouji_list_statistics">
		<div class="seach rowbg">
			<div class="item_title">rouji安装统计</div>
			<div class="seach_bottom">
				<el-col :span="3">
					<el-input
						placeholder="请输入IP"
						v-model="input"
						size="small"
						class="input-with-select"
						@keyup.enter.native="seachuser"
					>
						<i
							slot="prefix"
							class="el-input__icon el-icon-search"
							@click="seachuser()"
						></i>
					</el-input>
				</el-col>
				<!-- <span style="margin:0 0 20px 20px;">状态：</span> -->
				<el-select
					size="small"
					v-model="value"
					placeholder="请选择状态"
					@change="seachuser"
                    style="margin-left: 10px;"
				>
					<el-option label="全部" value="-1"></el-option>
					<el-option
						v-for="(item, index) in options"
						:key="index"
						:label="item.label"
						:value="item.value"
					></el-option>
				</el-select>
				<span style="margin:0 0 20px 20px;">操作时间：</span>
				<el-date-picker
					v-model="value1"
					type="daterange"
					size="small"
					range-separator="至"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
					@change="seachuser"
					:picker-options="endPickerOptions"
				></el-date-picker>
				<el-button
					type="primary"
					round
					size="small"
					@click="reset()"
					class="resetseach_btn"
					style="margin-left: 10px;"
					>重置</el-button
				>
			</div>
		</div>
		<div
			style="background: #ffffff;margin: 14px 24px;box-sizing: border-box;padding: 24px;border-radius: 8px;box-shadow: 0px 4px 10px 0px rgba(51, 51, 51, 0.04);"
		>
			<el-table
				:data="tableData"
				border
				style="width: 100%"
				:cell-style="rowClass"
				:header-cell-style="headClass"
                 :row-style="{height: '72px'}"
				@sort-change="sortable_time"
				:max-height="tableHeight"
			>
				<el-table-column prop="code" label="状态">
					<template slot-scope="scope">
						<span>{{ scope.row.code | getcode }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="ip" label="IP"> </el-table-column>
				<el-table-column prop="ostype" label="操作系统">
				</el-table-column>
				<el-table-column prop="kernel" label="内核"></el-table-column>
				<el-table-column prop="cpu" label="cpu芯片" width="350">
				</el-table-column>
				<el-table-column prop="cpucore" label="cpu核数">
					<template slot-scope="scope">
						<span>{{ scope.row.cpucore }}核</span>
					</template>
				</el-table-column>
				<el-table-column prop="storage" label="内存大小">
					<template slot-scope="scope">
						<span>{{
							scope.row.storage ? scope.row.storage : '--'
						}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="disk" label="磁盘大小">
				</el-table-column>
				<el-table-column prop="mac" label="MAC地址"> </el-table-column>
				<el-table-column prop="time_create" sortable label="创建日期">
					<template slot-scope="scope">
						<span>{{ scope.row.time_create | getymd }}</span>
					</template>
				</el-table-column>
			</el-table>
			<fenye
				style="text-align: right;margin:20px 0 0 0;"
				@fatherMethod="getpagefs"
				@fathernum="gettolfs"
				:pagesa="totalCnt"
				:currentPage="currentPagefs"
			></fenye>
		</div>
	</div>
</template>

<script>
import fenye from '../../components/fenye';
import { getymdtime, setbatime } from '../../servers/sevdate';
import { error_log_list } from '../../servers/api';
export default {
	data() {
		return {
			value: '',
			value1: '',
			input: '',
			optiondisplay: false,
			pagesize: 10,
			totalCnt: 0,
			currentPagefs: 1,
			rotate: false,
			order: 1,
			endPickerOptions: {
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
				},
			},
			tableData: [],
			options: [
				{ value: '000', label: '安装成功' },
				{ value: '001', label: '安装unzip失败' },
				{ value: '002', label: '安装curl失败' },
				{ value: '003', label: '下载版本失败' },
				{ value: '004', label: 'zip文件不存在' },
				{ value: '005', label: 'unzip文件失败' },
				{ value: '006', label: '查询版本失败' },
				{ value: '007', label: '查找ipfs仓库目录失败' },
				{ value: '008', label: 'install脚本失败' },
				{ value: '009', label: '已经安装' },
				{ value: '010', label: '进程隐藏模块未安装' },
			],
			options2: [],
			tableHeight: 0,
		};
	},
	filters: {
		getymd(time) {
			return getymdtime(time);
		},
		getcode(code) {
			if (code == '000') {
				return '安装成功';
			} else if (code == '001') {
				return '安装unzip失败';
			} else if (code == '002') {
				return '安装curl失败';
			} else if (code == '003') {
				return '下载版本失败';
			} else if (code == '004') {
				return 'zip文件不存在';
			} else if (code == '005') {
				return 'unzip文件失败';
			} else if (code == '006') {
				return '查询版本失败';
			} else if (code == '007') {
				return '查找ipfs仓库目录失败';
			} else if (code == '008') {
				return 'install脚本失败';
			} else if (code == '009') {
				return '已经安装';
			} else if (code == '010') {
				return '进程隐藏模块未安装';
			}
		},
	},
	components: {
		fenye,
	},
	mounted() {
		this.$nextTick(() => {
            let top_title_h = document.getElementsByClassName('rowbg')[0].offsetHeight;
			let con_he = document.getElementsByClassName('content-container')[0]
				.offsetHeight;
			this.tableHeight = con_he-top_title_h-124;
		});
		var today = new Date();
		var y = today.getFullYear();
		var m = today.getMonth();
		m < 10 ? '0' + m : m;
		var d = today.getDate();
		d < 10 ? '0' + d : d;
		var start_time = new Date(y, m, d, 0, 0);
		this.value1 = [start_time, today];
		this.get_table();
	},
	methods: {
		get_table() {
			let params = new Object();
			params.ip = this.input;
			if (this.value1) {
				params.time_start = setbatime(this.value1[0]);
				params.time_end = setbatime(this.value1[1]);
			} else {
				var timestamp = parseInt(new Date().getTime() / 1000);
				var time_zero = parseInt(
					new Date(new Date().toLocaleDateString()).getTime() / 1000
				);
				params.time_start = time_zero;
				params.time_end = timestamp;
			}
			params.code = this.value=="-1"?"":this.value;
			params.order = this.order;
			params.page = this.currentPagefs - 1;
			params.pagesize = this.pagesize;
			error_log_list(params)
				.then((res) => {
					if (res.status == 0) {
						this.tableData = res.result.cols;
						if (params.page == 0) {
							this.totalCnt = res.result.les_count + 10;
						}
					} else {
						// this.$message.error(res.msg);
					}
				})
				.catch((error) => {});
		},
		//筛选按钮
		option_display() {
			this.optiondisplay = !this.optiondisplay;
			this.rotate = !this.rotate;
		},
		//确定搜索
		seachuser() {
			this.currentPagefs = 1;
			this.get_table();
		},
		//重置
		reset() {
			this.value = '';
			this.input = '';
			var today = new Date();
			var y = today.getFullYear();
			var m = today.getMonth();
			m < 10 ? '0' + m : m;
			var d = today.getDate();
			d < 10 ? '0' + d : d;
			var start_time = new Date(y, m, d, 0, 0);
			this.value1 = [start_time, today];
			this.currentPagefs = 1;
			this.get_table();
		},
		//排序
		sortable_time(column) {
			this.currentPagefs = 1;
			if (column.order == 'descending') {
				this.order = 1;
			} else {
				this.order = 0;
			}
			this.get_table();
		},
		//获取页码--fs
		getpagefs(pages) {
			this.currentPagefs = pages;
			this.get_table();
		},
		//获取每页数量--ip
		gettolfs(pagetol) {
			this.pagesize = pagetol;
			// this.get_fs_table();
		},
		// 表头样式设置
		headClass() {
			return 'text-align: center;background:#F3F6FB;';
		},
		// 表格样式设置
		rowClass() {
			return 'text-align: center;';
		},
	},
};
</script>

<style lang="scss" scoped>
.content {
	text-align: left;
     background: #f6f6f6;
	.seach {
		width: 100%;
		// margin-top: 20px;
		.seach_top {
			width: 100%;
			height: 60px;
			.input-with-select {
				// width: 15%;
				float: left;
			}
			.seach_top_right {
				float: left;
				height: 40px;
				line-height: 40px;
				margin-left: 10px;
			}
		}
		.seach_bottom {
			text-align: left;
			// height: 100px;
			border-radius: 10px;
			// padding: 10px 15px 5px 10px;
			margin-bottom: 10px;
			.el-select {
				width: 200px;
			}
			.seach_bottom_btn {
				margin: 10px 10px;
			}
		}
	}
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
