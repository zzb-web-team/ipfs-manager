<template>
	<div class="content">
		<!-- <el-page-header @back="goBack" content="节点详情"> </el-page-header> -->
		<!-- 主体内容上 -->
		<div class="search rowbg">
			<div class="item_title" @click="goBack">
				<i class="el-icon-arrow-left"></i> 节点详情
			</div>
		</div>
		<div class="ipfs_detail_title">
			<div class="ipfs_item_topright">
				<el-row type="flex">
					<el-col :span="12" style="margin-top:-40px;">
						<div class="ipfs_con_tit_first">
							<img
								v-if="
									serdata.devicetype != 'PC服务器' &&
										serdata.devstatus == '在线'
								"
								src="../../assets/img/pcxyj.png"
								alt
							/>
							<img
								v-if="
									serdata.devicetype != 'PC服务器' &&
										serdata.devstatus == '离线'
								"
								src="../../assets/img/pcxyj.png"
								alt
							/>
							<img
								v-if="
									serdata.devicetype == 'PC服务器' &&
										serdata.devstatus == '在线'
								"
								src="../../assets/img/pcfwq.png"
								alt=""
							/>
							<img
								v-if="
									serdata.devicetype == 'PC服务器' &&
										serdata.devstatus == '离线'
								"
								src="../../assets/img/pcfwq.png"
								alt
							/>
							<div class="ipfs_con_top">
								<div class="top_tit_status">
									<b>{{
										serdata.devicetype == 'PC服务器'
											? '云链节点'
											: '西柚机节点'
									}}</b
									><span
										v-bind:style="{
											background: serdata.bgccolor,
										}"
										>{{ serdata.devstatus }}</span
									>
									<!-- <span
									v-bind:style="{
										color: serdata.bgccolor,
									}"
									>{{ serdata.isp }}</span
								> -->
								</div>
								<div>
									<span>{{ serdata.devicetype }}</span
									>&nbsp;&nbsp; <span>{{ serdata.os }}</span
									>&nbsp;&nbsp; <span>{{ serdata.arch }}</span
									>&nbsp;&nbsp;
									<!-- <span>123</span> -->
								</div>
								<div class="top_tit"><b>节点ID</b></div>
								<div class="top_tit_id">
									{{ serdata.nodeId
									}}<el-button
										@click="copy_id(serdata.nodeId)"
										class="copy"
                                        size="mini"
										type="primary"
										>复制</el-button
									>
								</div>
							</div>
						</div></el-col
					>
					<el-col
						style="margin-left:24px;margin-top:-40px;"
						:span="12"
					>
						<el-row type="flex">
							<el-col style="margin-right:24px;">
								<div class="ipfs_con_tit">
									<img
										src="../../assets/img/liuliang.png"
										alt=""
									/>
									<div>
										<p class="alltitle">累计使用流量</p>
										<p class="allnum">
											{{ topdata.total_dataflow }}
										</p>
										<!-- <p class="allnum">0</p> -->
									</div>
								</div>
								<div class="ipfs_con_tit">
									<img
										src="../../assets/img/cunchu.png"
										alt=""
									/>
									<div>
										<p class="alltitle">累计存储容量</p>
										<p class="allnum">
											{{ topdata.total_storeusage }}
										</p>
										<!-- <p class="allnum">0</p> -->
									</div>
								</div>
							</el-col>
							<el-col>
								<div class="ipfs_con_tit">
									<img
										src="../../assets/img/chuanshu.png"
										alt=""
									/>
									<div>
										<p class="alltitle">累计传输次数</p>
										<p class="allnum">
											{{ topdata.total_store_times }}
										</p>
										<!-- <p class="allnum">
								0
							</p> -->
									</div>
								</div>
								<div class="ipfs_con_tit" style="border:none;">
									<img
										src="../../assets/img/cishu.png"
										alt=""
									/>
									<div>
										<p class="alltitle">累计存储次数</p>
										<p class="allnum">
											{{ topdata.total_output_times }}
										</p>
										<!-- <p class="allnum">
								0
							</p> -->
									</div>
								</div>
							</el-col>
						</el-row>
					</el-col>
				</el-row>
				<!--  -->
				<div
					style="display: flex;justify-content: start;align-items: center;font-size: 16px;margin: 24px 0;"
				>
					<div class="ipfs_item_toptwo">
						<div
							style="display: flex;flex-direction: column;align-items: center;"
						>
							<!-- <qiu :cap="1 - serdata.occupyCpu"></qiu> -->
							<el-progress
								type="circle"
								:width="80"
								color="#05BE65"
								:percentage="
									(1 - serdata.occupyCpu).toFixed(4) * 100
								"
							></el-progress>
							<span
								style="display: inline-block;color: #16C499;padding: 5px 10px;background: #E7F9F5;border-radius: 8px;margin-top: 12px;font-size: 12px;"
								>可用{{
									(serdata.occupyCpu * 100).toFixed(2)
								}}%</span
							>
						</div>
						<div
							style="text-align:left;line-height: 48px;padding-top: 35px;color: #89949B;"
						>
							<div style="font-size: 18px;color: #333333;">
								CPU
							</div>
							<div class="ipfs_item_toptwo_item">
								<span
									>占用：{{
										(1 - serdata.occupyCpu).toFixed(4) *
											100
									}}%</span
								>
							</div>
						</div>
					</div>
					<div class="ipfs_item_toptwo">
						<div
							style="display: flex;flex-direction: column;align-items: center;"
						>
							<!-- <qiu
								:cap="1 - ram_rema"
								style="margin-top:25px;"
							></qiu> -->
							<el-progress
								type="circle"
								:width="80"
								color="#FED202"
								:percentage="
									(100 - ram_rema * 100).toFixed(2) * 1
								"
							></el-progress>
							<span
								style="display: inline-block;color: #16C499;padding: 5px 10px;background: #E7F9F5;border-radius: 8px;margin-top: 12px;font-size: 12px;"
								>可用{{ (ram_rema * 100).toFixed(2) }}%</span
							>
						</div>
						<div
							style="text-align:left;line-height: 48px;padding-top: 20px;"
						>
							<div style="font-size: 18px;color: #333333;">
								内存
							</div>
							<div class="ipfs_item_toptwo_item">
								<span>总内存:</span>
								<span
									>{{
										(
											serdata.totalMem /
											1024 /
											1024 /
											1024
										).toFixed(2)
									}}GB</span
								>
							</div>
							<div class="ipfs_item_toptwo_item">
								<span>使用内存：</span>
								<span
									>{{
										(
											(serdata.totalMem -
												serdata.availMem) /
											1024 /
											1024 /
											1024
										).toFixed(2)
									}}GB</span
								>
							</div>
							<!-- <div class="ipfs_item_toptwo_item">
								<span>剩余内存：</span>
								<span
									>{{
										(
											serdata.availMem /
											1024 /
											1024 /
											1024
										).toFixed(2)
									}}GB</span
								>
							</div> -->
						</div>
					</div>
					<div class="ipfs_item_toptwo">
						<div
							style="display: flex;flex-direction: column;align-items: center;"
						>
							<!-- <qiu
								:cap="1 - up_rema"
								style="margin-top:25px;"
							></qiu> -->
							<el-progress
								type="circle"
								:width="80"
								color="#1572E8"
								:percentage="
									(100 - up_rema * 100).toFixed(2) * 1
								"
							></el-progress>
							<span
								style="display: inline-block;color: #16C499;padding: 5px 10px;background: #E7F9F5;border-radius: 8px;margin-top: 12px;font-size: 12px;"
								>可用{{ (up_rema * 100).toFixed(2) }}%</span
							>
						</div>
						<div
							style="text-align:left;line-height: 48px;padding-top: 20px;color: #89949B;"
						>
							<div style="font-size: 18px;color: #333333;">
								上行带宽
							</div>
							<div class="ipfs_item_toptwo_item">
								<span>总带宽：</span>
								<span>{{ serdata.upbandwidth }}</span>
							</div>
							<div class="ipfs_item_toptwo_item">
								<span>使用带宽：</span>
								<span>{{ serdata.upbandwidth_occ }}</span>
							</div>
							<!-- <div class="ipfs_item_toptwo_item">
								<span>剩余带宽：</span>
								<span>{{ serdata.upbandwidth_rema }}</span>
							</div> -->
						</div>
					</div>
					<div class="ipfs_item_toptwo">
						<div
							style="display: flex;flex-direction: column;align-items: center;"
						>
							<!-- <qiu
								:cap="1 - down_rema"
								style="margin-top:25px;"
							></qiu> -->
							<el-progress
								type="circle"
								:width="80"
								color="#F4A037"
								:percentage="
									(100 - down_rema * 100).toFixed(2) * 1
								"
							></el-progress>
							<span
								style="display: inline-block;color: #16C499;padding: 5px 10px;background: #E7F9F5;border-radius: 8px;margin-top: 12px;font-size: 12px;"
								>可用{{ (down_rema * 100).toFixed(2) }}%</span
							>
						</div>
						<div
							style="text-align:left;line-height: 48px;padding-top: 20px;color: #89949B;"
						>
							<div style="font-size: 18px;color: #333333;">
								下行带宽
							</div>
							<div class="ipfs_item_toptwo_item">
								<span>总带宽：</span>
								<span>{{ serdata.downbandwidth }}</span>
							</div>
							<div class="ipfs_item_toptwo_item">
								<span>使用带宽：</span>
								<span>{{ serdata.downbandwidth_occ }}</span>
							</div>
							<!-- <div class="ipfs_item_toptwo_item">
								<span>剩余带宽：</span>
								<span>{{ serdata.downbandwidth_rema }}</span>
							</div> -->
						</div>
					</div>
					<div class="ipfs_item_toptwo">
						<div
							style="display: flex;flex-direction: column;align-items: center;"
						>
							<!-- <qiu
								:cap="1 - cap_rema"
								style="margin-top:25px;"
							></qiu> -->
							<el-progress
								type="circle"
								color="#912EEA"
								:width="80"
								:percentage="
									(100 - cap_rema * 100).toFixed(2) * 1
								"
							></el-progress>
							<span
								style="display: inline-block;color: #16C499;padding: 5px 10px;background: #E7F9F5;border-radius: 8px;margin-top: 12px;font-size: 12px;"
								>可用{{ (cap_rema * 100).toFixed(2) }}%</span
							>
						</div>
						<div
							style="text-align:left;line-height: 48px;padding-top: 20px;color: #89949B;"
						>
							<div style="font-size: 18px;color: #333333;">
								存储空间
							</div>
							<div class="ipfs_item_toptwo_item">
								<span>总空间：</span>
								<span
									>{{
										(
											serdata.totalCap /
											1024 /
											1024 /
											1024
										).toFixed(2)
									}}GB</span
								>
							</div>
							<div class="ipfs_item_toptwo_item">
								<span>使用空间：</span>
								<span
									>{{
										(
											serdata.occupyCap /
											1024 /
											1024 /
											1024
										).toFixed(2)
									}}GB</span
								>
							</div>
							<!-- <div class="ipfs_item_toptwo_item">
								<span>剩余空间：</span>
								<span
									>{{
										(
											serdata.remainingCap /
											1024 /
											1024 /
											1024
										).toFixed(2)
									}}GB</span
								>
							</div> -->
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
			<div v-show="tableDataip.length > 0">
				<!-- IP -->
				<el-table
					:data="tableDataip"
					border
					v-if="rotate == false"
					:cell-style="rowClass"
					:header-cell-style="headClass"
					style="width: 100%"
				>
					<el-table-column prop="businesstype" label="业务类型">
						<template slot-scope="scope">
							<span v-if="scope.row.businesstype == 0"
								>点播加速</span
							>
							<span v-else-if="scope.row.businesstype == 1"
								>直播加速</span
							>
							<span v-else>{{ scope.row.businesstype }}</span>
						</template>
					</el-table-column>
					<el-table-column prop="businessscene" label="业务场景">
						<template slot-scope="scope">
							<span v-if="scope.row.businessscene == 4"
								>分发加速播放</span
							>
							<span
								v-else-if="
									scope.row.businessscene == 0 ||
										scope.row.businessscene == 2
								"
								>内容预热</span
							>
							<span
								v-else-if="
									scope.row.businessscene == 1 ||
										scope.row.businessscene == 3
								"
								>缓存刷新</span
							>
							<span v-else>{{ scope.row.businessscene }}</span>
						</template>
					</el-table-column>
					<el-table-column prop="usage" label="用途" width="180">
						<template slot-scope="scope">
							<span v-if="scope.row.usage == 1">内容回源</span>
							<span v-else-if="scope.row.usage == 2"
								>内容缓存</span
							>
							<span v-else-if="scope.row.usage == 3"
								>内容分发</span
							>
							<span v-else>{{ scope.row.usage }}</span>
						</template>
					</el-table-column>
					<el-table-column prop="dataflow" label="使用流量">
						<template slot-scope="scope">
							{{ scope.row.dataflow | formatBytes }}
						</template>
					</el-table-column>
					<el-table-column prop="bondWidth" label="占用带宽">
						<template slot-scope="scope">
							<span v-if="scope.row.dataflow == 0"
								>{{ scope.row.bondWidth }}0Mbps</span
							>
							<span v-else
								>{{ scope.row.bondWidth
								}}{{
									(
										scope.row.dataflow / scope.row.timeuse
									).toFixed(2)
								}}Mbps</span
							>
						</template>
					</el-table-column>
					<el-table-column
						prop="startTS"
						sortable
						width="103"
						:sort-orders="['ascending', 'descending']"
						label="启用时间"
					>
						<template slot-scope="scope">{{
							scope.row.startTS | getymd
						}}</template>
					</el-table-column>
					<el-table-column prop="endTS" label="结束时间">
						<template slot-scope="scope">{{
							scope.row.endTS | getymd
						}}</template>
					</el-table-column>
					<el-table-column prop="timeuse" label="使用时长">
						<template slot-scope="scope">{{
							scope.row.timeuse | s_h
						}}</template>
					</el-table-column>
					<el-table-column prop="accelstate" label="使用状态">
						<template slot-scope="scope">
							<span v-if="scope.row.accelstate == 0">使用中</span>
							<span v-else>已停用</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="chanId"
						label="渠道ID"
					></el-table-column>
					<!-- <el-table-column prop="userIpInfo" label="点播IP"></el-table-column> -->
					<el-table-column
						prop="taskid"
						label="实例ID"
					></el-table-column>
					<el-table-column prop="terminalname" label="视频播放终端">
						<template slot-scope="scope">
							{{
								scope.row.terminalname == 'Unknown'
									? '--'
									: scope.row.terminalname
							}}
						</template>
					</el-table-column>
					<el-table-column
						prop="userIpInfo"
						label="视频播放IP"
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
					<el-table-column prop="businesstype" label="业务类型">
						<template slot-scope="scope">
							<span v-if="scope.row.businesstype == 0"
								>点播加速</span
							>
							<span v-else-if="scope.row.businesstype == 1"
								>直播加速</span
							>
							<span v-else>{{ scope.row.businesstype }}</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="businessscene"
						label="业务场景及用途"
					>
						<template slot-scope="scope">
							<span
								v-if="
									scope.row.businessscene == 0 ||
										scope.row.businessscene == 1 ||
										scope.row.businessscene == 4
								"
								>分发加速播放-内容缓存</span
							>
							<span v-else-if="scope.row.businessscene == 2"
								>内容预热-内容缓存</span
							>
							<span v-else-if="scope.row.businessscene == 3"
								>刷新缓存-内容缓存</span
							>
							<span v-else>{{ scope.row.businessscene }}</span>
						</template>
					</el-table-column>
					<!-- <el-table-column
						prop="use"
						label="用途"
						width="180"
					></el-table-column> -->
					<el-table-column
						prop="dataflow"
						label="占用空间"
						width="180"
					>
						<template slot-scope="scope">
							{{ scope.row.dataflow | formatBytes }}
						</template>
					</el-table-column>
					<el-table-column
						prop="urlname"
						label="存储内容"
					></el-table-column>
					<el-table-column
						prop="contentid"
						label="内容ID"
					></el-table-column>
					<el-table-column
						prop="startTS"
						width="103"
						sortable
						:sort-orders="['ascending', 'descending']"
						label="启用时间"
					>
						<template slot-scope="scope">
							{{ scope.row.startTS | getymd }}
						</template>
					</el-table-column>
					<el-table-column prop="endTS" label="结束时间">
						<template slot-scope="scope">
							{{ scope.row.endTS | getymd }}
						</template>
					</el-table-column>
					<el-table-column prop="timeuse" label="使用时长">
						<template slot-scope="scope">
							{{ scope.row.timeuse | s_h }}
						</template>
					</el-table-column>
					<el-table-column prop="accelstate" label="使用状态">
						<template slot-scope="scope">
							<!-- <span v-if="scope.row.accelstate == 0">使用中</span>
							<span v-else-if="scope.row.accelstate == 1"
								>已停用</span
							> -->
							<span v-if="scope.row.accelstate == 1">使用中</span>
							<span v-else-if="scope.row.accelstate == 0"
								>已停用</span
							>
						</template>
					</el-table-column>
					<el-table-column
						prop="chanId"
						label="渠道ID"
					></el-table-column>
					<el-table-column
						prop="taskid"
						label="实例ID"
					></el-table-column>
					<el-table-column prop="terminalname" label="视频播放终端">
						<template slot-scope="scope">
							<span
								v-if="
									scope.row.businessscene == 0 ||
										scope.row.businessscene == 1 ||
										scope.row.businessscene == 4
								"
								>{{ scope.row.terminalname }}
							</span>
							<span v-else>
								{{
									scope.row.terminalname == 'Unknown'
										? '--'
										: scope.row.terminalname
								}}
							</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="userIpInfo"
						label="视频播放IP"
					></el-table-column>
				</el-table>
				<fenye
					style="text-align: right;margin: 20px 0px 10px;"
					@fatherMethod="getpage"
					@fathernum="gettol"
					:pagesa="totalCnt"
					:currentPage="currentPage"
				></fenye>
			</div>
			<div v-show="tableDataip.length <= 0">
				<img src="../../assets/img/nodata.png" alt="" />
				<p>暂无数据</p>
			</div>
		</div>
	</div>
</template>

<script>
import qiu from '@/components/qiu';
import fenye from '@/components/cloudfenye';
import {
	query_ip_usage_table,
	query_ip_store_usage_table,
	ipfs_basic_info,
} from '@/servers/api';
import {
	getlocaltimes,
	settime,
	getymdtime,
	setbatime,
	formatDuring,
} from '../../servers/sevdate';
import Clipboard from 'clipboard';
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
			totalCnt: 0,
			starttime: '',
			endtime: '',
			serdata: {},
			ip_rema: 0,
			fs_rema: 0,
			cpu_rema: 0,
			ram_rema: 0,
			up_rema: 0,
			down_rema: 0,
			cap_rema: 0,
			topdata: {
				total_dataflow: 0,
				total_storeusage: 0,
				total_store_times: 0,
				total_output_times: 0,
			},
		};
	},
	components: {
		qiu,
		fenye,
	},
	filters: {
		getymd(time) {
			if (time === 0) {
				return '--';
			} else {
				return getymdtime(time);
			}
		},
		s_h(time) {
			if (time !== 0) {
				return formatDuring(time);
			} else {
				return '--';
			}
		},
		formatBytes(a) {
			if (0 == a) return '0 B';
			var d = 2;
			var c = 1024,
				e = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
				f = Math.floor(Math.log(a) / Math.log(c));
			if (e[f] == 'TB' || e[f] == 'PB') {
				d = 4;
			} else {
				d = 2;
			}
			return parseFloat((a / Math.pow(c, f)).toFixed(d)) + ' ' + e[f];
		},
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
		let dpwnbandwidth = this.serdata.downbandwidth.substring(
			0,
			this.serdata.downbandwidth.lastIndexOf('Mbps')
		);
		let upbandwidth_occ = this.serdata.upbandwidth_occ.substring(
			0,
			this.serdata.upbandwidth_occ.lastIndexOf('Mbps')
		);
		let dpwnbandwidth_occ = this.serdata.downbandwidth_occ.substring(
			0,
			this.serdata.downbandwidth_occ.lastIndexOf('Mbps')
		);
		if (this.serdata.availMem * 1 == 0) {
			this.ram_rema = 0;
		} else {
			this.ram_rema =
				parseFloat(this.serdata.availMem) /
				parseFloat(this.serdata.totalMem);
		}

		if (upbandwidth * 1 == 0) {
			this.up_rema = 0;
		} else {
			this.up_rema =
				parseFloat(upbandwidth_rema) / parseFloat(upbandwidth);
		}
		if (dpwnbandwidth * 1 == 0) {
			this.down_rema = 0;
		} else {
			this.down_rema =
				parseFloat(dpwnbandwidth_rema) / parseFloat(dpwnbandwidth);
		}
		if (this.serdata.totalCap * 1 == 0) {
			this.cap_rema = 0;
		} else {
			this.cap_rema =
				parseFloat(this.serdata.remainingCap) /
				parseFloat(this.serdata.totalCap);
		}
	},
	mounted() {
		this.starttime =
			new Date(new Date().toLocaleDateString()).getTime() / 1000 -
			86400 * 90;
		this.endtime = Date.parse(new Date()) / 1000;
		this.gettitledata();
		this.getlabel();
	},
	methods: {
		copy_id(data) {
			let _this = this;
			let clipboard = new Clipboard('.copy', {
				text: function() {
					return data;
				},
			});
			clipboard.on('success', function(e) {
				_this.$message.success('已复制到粘贴板');
				clipboard.destroy();
			});
			clipboard.on('error', function(e) {
				_this.$message.error(
					'您的浏览器不支持此功能，请使用其他浏览器尝试。'
				);
				clipboard.destroy();
			});
		},
		str_num(data) {
			if (data == 0) {
				return 0;
			} else {
				let number = String(data).replace(/^(.*\..{4}).*$/, '$1');
				return Number(number);
			}
		},
		goBack() {
			if (this.$route.query.address) {
				let address = this.$route.query.address;
				let city = this.$route.query.node_city;
				let num = this.$route.query.node_num;
				this.$router.push({
					path: address,
					query: { node_city: city, node_num: num },
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
				.then((res) => {
					if (res.status == 0) {
						this.topdata.total_dataflow = this.common.formatByteActive(
							res.data.dataflow_sum
						);
						this.topdata.total_storeusage = this.common.formatByteActive(
							res.data.store_cap_sum
						);
						this.topdata.total_store_times =
							res.data.chans_times_sum;
						this.topdata.total_output_times =
							res.data.store_times_sum;
					} else {
						this.$message.error(res.err_msg);
					}
				})
				.catch((error) => {});
		},
		//获取表格数据
		getlabel(dat) {
			if (!dat) {
				let params = new Object();
				params.ipfs_id = this.node_id;
				params.ipfs_ip = '*';
				params.usage = 0;
				params.start_ts = this.starttime;
				params.end_ts = this.endtime;
				params.pageNo = this.currentPage - 1;
				params.pageSize = this.pageSize;
				params.first_channel = '*';
				params.second_channel = '*';
				params.device_type = '*';
				params.orderBy = 2;
				params.business_scene = '*';
				params.business_type = '*';
				query_ip_usage_table(params)
					.then((res) => {
						// if (res.status == 0) {
						// 	this.tableDataip = res.data.list;
						// 	this.totalCnt = res.data.totalCnt;
						// } else {
						// 	this.$message.error(res.errMsg);
						// }
					})
					.catch((error) => {});
			} else {
				let params = new Object();
				params.content_id = '*';
				params.ipfs_id = this.node_id;
				params.usage = 0;
				params.start_ts = this.starttime;
				params.end_ts = this.endtime;
				params.pageNo = this.currentPage - 1;
				params.pageSize = this.pageSize;
				params.first_channel = '*';
				params.second_channel = '*';
				params.device_type = '*';
				params.orderBy = 2;
				params.business_type = '*';
				params.business_scene = '*';
				query_ip_store_usage_table(params)
					.then((res) => {
						// if (res.status == 0) {
						// 	this.tableDatafs = res.data.list;
						// 	this.totalCnt = res.data.totalCnt;
						// } else {
						// 	this.$message.error(res.errMsg);
						// }
					})
					.catch((error) => {});
			}
		},
		setmap_show(dat) {
			this.currentPage = 1;
			this.pageSize = 10;
			this.totalCnt = 0;
			this.rotate = !this.rotate;
			if (dat == 'fs') {
				this.getlabel('fs');
			} else {
				this.getlabel();
			}
		},
		//获取页码
		getpage(pages) {
			this.currentPage = pages;
			if (this.rotate == false) {
				this.getlabel();
			} else {
				this.getlabel('fs');
			}
		},
		//获取每页数量
		gettol(pagetol) {
			this.pagesize = pagetol;
			// this.getlabel();
		},
		// 表头样式设置
		headClass() {
			return 'text-align: center;background:#F4F7FA;';
		},
		// 表格样式设置
		rowClass() {
			return 'text-align: center;';
		},
	},
	beforeRouteLeave(to, form, next) {
		sessionStorage.removeItem('serdata');
		next();
	},
};
</script>

<style lang="scss" scoped>
.content {
	height: 100%;
	background: #f9fbfd;
	.bread_crumbs {
		width: 100%;
		padding: 37px;
		font-size: 26px;
	}
	.ipfs_detail_title {
		display: flex;
		box-sizing: border-box;
		padding: 0 24px;
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
			width: 19%;
			max-width: 323px;
			height: 296px;
			display: flex;
			flex-direction: column;
			background: rgb(255, 255, 255);
			padding: 24px 48px;
			box-sizing: border-box;
			border-radius: 8px;
			box-shadow: rgba(51, 51, 51, 0.04) 0px 4px 10px 0px;
			margin-right: 24px;
			.ipfs_item_toptwo_item {
				height: 18px;
				line-height: 18px;
				overflow: hidden;
				font-size: 16px;
				text-overflow: ellipsis;
				white-space: nowrap;
				color: #333333;
				margin-top: 5px;
			}
		}
		.ipfs_item_toptwo:last-child {
			margin-right: 0;
		}
	}
	.ipfs_con {
		height: 50px;
		line-height: 50px;
		display: flex;
		// padding: 0 37px;
		justify-content: space-between;
	}
	.ipfs_con_tit {
		height: 128px;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: left;
		background: #ffffff;
		box-shadow: 0px 4px 10px 0px rgba(51, 51, 51, 0.04);
		border-radius: 8px;
		box-sizing: border-box;
		padding: 24px;
		img {
			margin-right: 20px;
		}
		.alltitle {
			margin-top: 20px;
			line-height: 16px;
			display: inline-block;
			display: flex;
			align-items: center;
			color: #333333;
			font-size: 16px;
		}
		.allnum {
			height: 46px;
			line-height: 46px;
			color: #333333;
			font-size: 24px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
	.ipfs_con_tit:nth-child(1) {
		margin-bottom: 24px;
	}
	.ipfs_con_tit_first {
		height: 280px;
		text-align: left;
		box-sizing: border-box;
		padding: 24px 24px 24px 100px;
		background-color: #fff;
		border-radius: 8px;
		box-shadow: 0px 4px 10px 0px rgba(51, 51, 51, 0.04);
		img {
			width: 24%;
			height: 40%;
			margin-bottom: 20px;
		}
		.ipfs_con_top {
			width: 100%;
			font-size: 14px;
			color: #999999;
			.top_tit_status {
				height: 26px;
				line-height: 26px;
				color: #333333;
				font-size: 20px;
				span:nth-child(2) {
					border-radius: 10px;
					font-size: 12px;
					padding-left: 5px;
					padding-right: 5px;
					margin-left: 10px;
					color: #ffffff;
				}
			}
			.top_tit {
				margin-top: 20px;
				height: 26px;
				line-height: 26px;
				font-size: 14px;
				color: #333333;
			}
			.top_tit_id {
				height: 26px;
				line-height: 26px;
                word-wrap: break-word;
                
			}
		}
	}
	.ipfs_item_bottom {
		background: #ffffff;
		box-sizing: border-box;
		margin: 0 24px 24px;
		padding: 24px;
		border-radius: 8px;
		box-shadow: 0px 4px 10px 0px rgba(51, 51, 51, 0.04);
		overflow: hidden;
		.ipfs_item_bottom_title {
			text-align: left;
			margin-bottom: 20px;
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
