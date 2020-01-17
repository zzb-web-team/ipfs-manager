<template>
	<div class="content">
		<el-page-header @back="goBack" content="节点详情"> </el-page-header>
		<!-- 主体内容上 -->
		<div class="ipfs_detail_title">
			<div class="ipfs_item">
				<div
					style="display: flex;justify-content: flex-start;align-items: center;"
				>
					<div
						class="yuan"
						v-bind:style="{ background: serdata.bgccolor }"
					></div>
					<span v-bind:style="{ color: serdata.bgccolor }">{{
						serdata.devstatus
					}}</span>
				</div>
				<div class="ipfs_item_img">
					<img
						src="../../assets//img/binding_illustration3.png"
						style="width:60%;"
						alt
					/>
					<p
						style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;"
					>
						节点：{{ serdata.nodeId }}
					</p>
				</div>
			</div>
			<div class="ipfs_item_topright">
				<div>
					<div class="ipfs_con">
						<div class="ipfs_con_tit">
							<div class="alltitle">
								<span>累计使用流量</span>
							</div>
							<div class="allnum">
								{{ topdata.total_dataflow }}
							</div>
						</div>
						<div class="ipfs_con_tit">
							<div class="alltitle">
								<span>累计传输次数</span>
							</div>
							<div class="allnum">
								{{ topdata.total_store_times }}次
							</div>
						</div>
						<div class="ipfs_con_tit">
							<div class="alltitle">
								<span>累计存储容量</span>
							</div>
							<div class="allnum">
								{{ topdata.total_storeusage }}
							</div>
						</div>
						<div class="ipfs_con_tit">
							<div class="alltitle">
								<span>累计存储次数</span>
							</div>
							<div class="allnum">
								{{ topdata.total_output_times }}次
							</div>
						</div>
					</div>
				</div>
				<div
					style="display: flex;justify-content: flex-start;align-items: center;font-size: 16px;"
				>
					<div class="ipfs_item_toptwo">
						<div
							style="display: flex;justify-content: center;align-items: center;"
						>
							<span style="font-size: 18px;font-weight: 600;"
								>ip流量</span
							>
							<qiu :cap="ip_rema"></qiu>
							<span>可用{{ (ip_rema * 100).toFixed(2) }}%</span>
						</div>

						<div class="ipfs_item_toptwo_item">
							<span>总带宽：上下行</span>
							<span>{{ serdata.totalBW }}</span>
						</div>
						<div class="ipfs_item_toptwo_item">
							<span>使用带宽：上下行</span>
							<span>{{ serdata.occupyBW }}</span>
						</div>
						<div class="ipfs_item_toptwo_item">
							<span>剩余带宽：上下行</span>
							<span>{{ serdata.occupyBW }}</span>
						</div>
					</div>
					<div class="ipfs_item_toptwo">
						<div
							style="display: flex;justify-content: center;align-items: center;"
						>
							<span style="font-size: 18px;font-weight: 600;"
								>Fs存储</span
							>
							<qiu :cap="fs_rema"></qiu>
							<span>可用{{ (fs_rema * 100).toFixed(2) }}%</span>
						</div>

						<div class="ipfs_item_toptwo_item">
							<span>总存储:</span>
							<span
								>{{
									(
										serdata.totalCap /
										1024 /
										1024 /
										1024
									).toFixed(2)
								}}G</span
							>
						</div>
						<div class="ipfs_item_toptwo_item">
							<span>使用存储:</span>
							<span
								>{{
									(
										serdata.occupyCap /
										1024 /
										1024 /
										1024
									).toFixed(2)
								}}G</span
							>
						</div>
						<div class="ipfs_item_toptwo_item">
							<span>剩余存储:</span>
							<span
								>{{
									(
										serdata.remainingCap /
										1024 /
										1024 /
										1024
									).toFixed(2)
								}}G</span
							>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="ipfs_item_bottom">
			<div class="ipfs_item_bottom_title">
				<span
					:class="[rotate ? 'eema' : 'bluma']"
					@click="setmap_show('ip')"
					class="setmap_btn"
					>节点IP流量</span
				>
				<span
					:class="[rotate ? 'bluma' : 'eema']"
					@click="setmap_show('fs')"
					>节点FS存储</span
				>
			</div>
			<div style="padding: 0 37px;">
				<!-- IP -->
				<el-table
					:data="tableDataip"
					border
					v-if="rotate == false"
					:cell-style="rowClass"
					:header-cell-style="headClass"
					style="width: 100%"
				>
					<el-table-column
						prop="usage"
						label="用途"
						width="180"
					></el-table-column>
					<el-table-column
						prop="upstream"
						label="占用带宽"
						width="180"
						><template slot-scope="scope">
							<span v-if="!scope.row.upstream">--</span
							><span v-else>{{ scope.row.upstream }}</span>
						</template></el-table-column
					>
					<el-table-column
						prop="dataflow"
						label="使用流量"
					></el-table-column>
					<el-table-column prop="startTS" label="启用时间">
						<template slot-scope="scope">{{
							scope.row.startTS | getymd
						}}</template>
					</el-table-column>
					<el-table-column prop="timeUsage" label="使用时长">
						<template slot-scope="scope">{{
							scope.row.timeUsage | s_h
						}}</template></el-table-column
					>
					<el-table-column prop="usageFlag" label="使用状态">
						<template slot-scope="scope">
							<span v-if="scope.row.usageFlag == 0">已完成</span>
							<span v-else>进行中</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="chanId"
						label="渠道ID"
					></el-table-column>
					<el-table-column
						prop="userIpInfo"
						label="点播IP"
					></el-table-column>
				</el-table>
				<!--FS  -->
				<el-table
					:data="tableDatafs"
					border
					v-else
					:cell-style="rowClass"
					:header-cell-style="headClass"
					style="width: 100%"
				>
					<el-table-column
						prop="use"
						label="用途"
						width="180"
					></el-table-column>
					<el-table-column
						prop="take_up_space"
						label="占用空间"
						width="180"
					></el-table-column>
					<el-table-column
						prop="storage_content"
						label="存储内容"
					></el-table-column>
					<el-table-column
						prop="content_id"
						label="内容ID"
					></el-table-column>
					<el-table-column prop="start_time" label="启用时间">
						<template slot-scope="scope">{{
							scope.row.start_time | getymd
						}}</template>
					</el-table-column>
					<el-table-column prop="usage_time" label="使用时长">
						<template slot-scope="scope">{{
							scope.row.usage_time | s_h
						}}</template>
					</el-table-column>
					<el-table-column prop="status_use" label="使用状态">
						<template slot-scope="scope">
							<span v-if="scope.row.status_use == 0">已完成</span>
							<span v-else>进行中</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="user_id"
						label="渠道ID"
					></el-table-column>
				</el-table>
			</div>
		</div>
		<fenye
			style="text-align: right;margin: 20px 0px 10px;"
			@fatherMethod="getpage"
			@fathernum="gettol"
			:pagesa="totalCnt"
			:currentPage="currentPage"
		></fenye>
	</div>
</template>

<script>
import qiu from '@/components/qiu';
import fenye from '@/components/cloudfenye';
import {
	query_ip_usage_table,
	query_ip_store_usage_table,
	ipfs_basic_info
} from '@/servers/api';
export default {
	data() {
		return {
			currentPage: 1,
			node_id: '',
			rotate: false,
			tableDataip: [],
			tableDatafs: [],
			pageSize: 10,
			pageNo: 1,
			totalCnt: 1,
			starttime: '',
			endtime: '',
			serdata: '',
			ip_rema: 0,
			fs_rema: 0,
			topdata: {
				total_dataflow: 0,
				total_storeusage: 0,
				total_store_times: 0,
				total_output_times: 0
			}
		};
	},
	components: {
		qiu,
		fenye
	},
	created() {
		this.serdata = JSON.parse(sessionStorage.getItem('serdata'));
		let serdata_id = JSON.parse(sessionStorage.getItem('serdata'));
		this.node_id = serdata_id.nodeId;
		let upbandwidth_rema = this.serdata.upbandwidth_rema.substring(
			0,
			this.serdata.upbandwidth_rema.lastIndexOf('Mbps')
		);
		let dpwnbandwidth_rema = this.serdata.downbandwidth_rema.substring(
			0,
			this.serdata.downbandwidth_rema.lastIndexOf('Mbps')
		);
		let upbandwidth = this.serdata.upbandwidth.substring(
			0,
			this.serdata.upbandwidth.lastIndexOf('Mbps')
		);
		if (upbandwidth * 1 == 0) {
			this.ip_rema = 0;
		} else {
			let iprema_zz = parseInt(upbandwidth_rema) / parseInt(upbandwidth);
			if (iprema_zz == 0) {
				this.ip_rema = 1;
			} else {
				this.ip_rema = iprema_zz;
			}
		}
		if (this.serdata.totalCap * 1 == 0) {
			this.fs_rema = 0;
		} else {
			this.fs_rema =
				parseInt(this.serdata.remainingCap) /
				parseInt(this.serdata.totalCap);
		}
	},
	mounted() {
		this.starttime =
			new Date(new Date().toLocaleDateString()).getTime() / 1000;
		this.endtime = Date.parse(new Date()) / 1000;
		this.gettitledata();
		this.getlabel();
	},
	methods: {
		goBack() {
			let address = this.$route.query.address;
			let city = this.$route.query.node_city;
			let num = this.$route.query.node_num;
			if (address) {
				this.$router.push({
					path: address,
					query: { node_city: city, node_num: num }
				});
			} else {
				this.$router.go(-1);
			}
		},
		//获取头部预览信息
		gettitledata() {
			let params = new Object();
			params.ipfsId = this.node_id;
			//params.ipfsId = "ipfs_000005";
			ipfs_basic_info(params)
				.then(res => {
					if (res.status == 0) {
						this.topdata.total_dataflow = this.common.formatByteActive(
							res.data.total_dataflow
						);
						this.topdata.total_storeusage = this.common.formatByteActive(
							res.data.total_storeusage
						);
						this.topdata.total_store_times =
							res.data.total_store_times;
						this.topdata.total_output_times =
							res.data.total_output_times;
					}
				})
				.catch(error => {});
		},
		//获取表格数据
		getlabel(dat) {
			if (!dat) {
				let params = new Object();
				params.ipfs_id = this.node_id;
				params.ipfs_ip = '*';
				params.usage = 3;
				params.start_ts = this.starttime;
				params.end_ts = this.endtime;
				params.pageNo = this.pageNo - 1;
				params.pageSize = this.pageSize;
				query_ip_usage_table(params)
					.then(res => {
						if (res.status == 0) {
							this.tableData = res.data.list;
						} else {
							this.$message.error(res.errMsg);
						}
					})
					.catch(error => {});
			} else {
				let params = new Object();
				params.content_id = '*';
				params.ipfs_id = this.node_id;
				params.usage = 3;
				params.start_ts = this.starttime;
				params.end_ts = this.endtime;
				params.pageNo = this.pageNo - 1;
				params.pageSize = this.pageSize;
				query_ip_store_usage_table(params)
					.then(res => {
						if (res.status == 0) {
							this.tableData = res.data.list;
						} else {
							this.$message.error(res.errMsg);
						}
					})
					.catch(error => {});
			}
		},
		setmap_show(dat) {
			this.pageNo = 1;
			this.pageSize = 10;
			this.totalCnt = 1;
			this.rotate = !this.rotate;
			if (dat == 'fs') {
				this.getlabel('fs');
			} else {
				this.getlabel();
			}
		},
		//获取页码
		getpage(pages) {
			this.pageNo = pages;
			this.getlabel();
		},
		//获取每页数量
		gettol(pagetol) {
			this.pagesize = pagetol;
			// this.getlabel();
		},
		// 表头样式设置
		headClass() {
			return 'text-align: center;background:rgb(194, 213, 245);';
		},
		// 表格样式设置
		rowClass() {
			return 'text-align: center;';
		}
	},
	beforeRouteLeave(to, form, next) {
		sessionStorage.removeItem('serdata');
		next();
	}
};
</script>

<style lang="scss" scoped>
.content {
	height: 100%;
	background: rgb(255, 255, 255);
	margin: 30px;
	.bread_crumbs {
		width: 100%;
		padding: 37px;
		font-size: 26px;
	}
	.ipfs_detail_title {
		display: flex;
		padding: 37px;
		.ipfs_item {
			width: 228px;
			height: 240px;
			padding: 23px;
			background: rgba(255, 255, 255, 1);
			border: 1px solid rgba(216, 226, 240, 1);
			box-shadow: 0px 0px 18px 0px rgba(211, 215, 221, 0.4);
			border-radius: 3px;
			margin-right: 50px;
			margin-top: 25px;
			.yuan {
				width: 10px;
				height: 10px;
				background: #64a7fc;
				border-radius: 50%;
				margin-right: 20px;
			}
			.ipfs_item_img {
				margin: 25px 0;
				// border-bottom: 1px solid #eeeeee;
				color: #404447;
			}
			ol > li {
				line-height: 25px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 14px;
				.ipfs_text_title {
					color: #b2b5b8;
				}
				.ipfs_text_con {
					width: 75px;
					text-align: left;
					overflow: hidden;
				}
			}
		}
		.ipfs_item_topright {
			width: 100%;
		}
		.ipfs_item_toptwo {
			width: 282px;
			margin: 0 30px;
			.ipfs_item_toptwo_item {
				height: 30px;
				line-height: 30px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
	}
	.ipfs_con {
		height: 50px;
		line-height: 50px;
		display: flex;
		padding: 0 37px;
		justify-content: space-between;
	}
	.ipfs_con {
		// width: 100%;
		height: 123px;
		display: flex;
		.ipfs_con_tit {
			width: 270px;
			height: 120px;
			background: rgba(255, 255, 255, 1);
			border: 1px solid rgba(216, 226, 240, 1);
			box-shadow: 0px 12px 36px 0px rgba(211, 215, 221, 0.4);
			border-radius: 4px;
			text-align: left;
			padding: 2px 30px;
			.alltitle {
				display: inline-block;
				height: 45px;
				display: flex;
				align-items: center;
				line-height: 45px;
				color: #929292;
				font-size: 18px;
			}
			.allnum {
				line-height: 40px;
				color: #1c1a1d;
				font-size: 44px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
	}
	.ipfs_item_bottom {
		.ipfs_item_bottom_title {
			text-align: left;
			padding-left: 17px;
			margin-bottom: 20px;
			.setmap_btn {
				margin: 0 20px;
			}
		}
	}
}
.eema {
	width: 90px;
	color: #919191;
	line-height: 20px;
	display: inline-block;
	line-height: 30px;
}
.bluma {
	width: 90px;
	line-height: 40px;
	color: #64a7fc;
	line-height: 20px;
	display: inline-block;
	line-height: 30px;
	border-bottom: #64a7fc 3px solid;
}
</style>
