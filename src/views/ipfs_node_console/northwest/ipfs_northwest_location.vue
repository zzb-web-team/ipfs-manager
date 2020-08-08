<template>
	<div class="content">
		<!-- 标题 -->
		<div class="ipfs_title">{{ location_name }}</div>
		<div class="ipfs_con ipfs_con_label">
			<div class="ipfs_con_left">节点组网分布</div>
			<div class="ipfs_con_right">
				<span
					:class="[rotate == 0 ? 'bluma' : 'eema']"
					@click="setmap_show('0')"
					class="setmap_btn"
					>宁夏</span
				>
				<span
					:class="[rotate == 1 ? 'bluma' : 'eema']"
					@click="setmap_show('1')"
					class="setmap_btn"
					>陕西</span
				><span
					:class="[rotate == 2 ? 'bluma' : 'eema']"
					@click="setmap_show('2')"
					class="setmap_btn"
					>甘肃</span
				><span
					:class="[rotate == 3 ? 'bluma' : 'eema']"
					@click="setmap_show('3')"
					class="setmap_btn"
					>青海</span
				><span
					:class="[rotate == 4 ? 'bluma' : 'eema']"
					@click="setmap_show('4')"
					class="setmap_btn"
					>新疆</span
				>
			</div>
		</div>
		<!-- 主要内容 -->
		<div class="ipfs_title_next" v-if="rotate == 0">
			<div class="maptitle">宁夏</div>
			<el-row type="flex" justify="space-between">
				<el-col
					:span="3"
					v-for="(item, index) in dar"
					:key="index"
					class="ipfs_con_tit"
				>
					<div class="alltitle">
						<img :src="item.url" alt />
						<span>{{ item.contit }}</span>
					</div>
					<div class="allnum">{{ item.connum }}</div>
				</el-col>
			</el-row>
			<el-row type="flex" class="occ_con" justify="start"  style="flex-wrap:wrap">
				<el-col
					:span="2"
					v-for="(item, index) in titledar"
					:key="index"
					class="ipfs_con_tit"
				>
					<div class="alltitle">
						<img :src="item.url" alt />
						<span>{{ item.contit }}</span>
					</div>
					<div class="allnum">{{ item.connum }}</div>
				</el-col>
			</el-row>
		</div>
		<div class="ipfs_title_next" v-if="rotate == 1">
			<div class="maptitle">陕西</div>
			<el-row type="flex" justify="space-between">
				<el-col
					:span="3"
					v-for="(item, index) in dar"
					:key="index"
					class="ipfs_con_tit"
				>
					<div class="alltitle">
						<img :src="item.url" alt />
						<span>{{ item.contit }}</span>
					</div>
					<div class="allnum">{{ item.connum }}</div>
				</el-col>
			</el-row>
			<el-row type="flex" class="occ_con" justify="start"  style="flex-wrap:wrap">
				<el-col
					:span="2"
					v-for="(item, index) in titledar"
					:key="index"
					class="ipfs_con_tit"
				>
					<div class="alltitle">
						<img :src="item.url" alt />
						<span>{{ item.contit }}</span>
					</div>
					<div class="allnum">{{ item.connum }}</div>
				</el-col>
			</el-row>
		</div>
		<div class="ipfs_title_next" v-if="rotate == 2">
			<div class="maptitle">甘肃</div>
			<el-row type="flex" justify="space-between">
				<el-col
					:span="3"
					v-for="(item, index) in dar"
					:key="index"
					class="ipfs_con_tit"
				>
					<div class="alltitle">
						<img :src="item.url" alt />
						<span>{{ item.contit }}</span>
					</div>
					<div class="allnum">{{ item.connum }}</div>
				</el-col>
			</el-row>
			<el-row type="flex" class="occ_con" justify="start"  style="flex-wrap:wrap">
				<el-col
					:span="2"
					v-for="(item, index) in titledar"
					:key="index"
					class="ipfs_con_tit"
				>
					<div class="alltitle">
						<img :src="item.url" alt />
						<span>{{ item.contit }}</span>
					</div>
					<div class="allnum">{{ item.connum }}</div>
				</el-col>
			</el-row>
		</div>
		<div class="ipfs_title_next" v-if="rotate == 3">
			<div class="maptitle">青海</div>
			<el-row type="flex" justify="space-between">
				<el-col
					:span="3"
					v-for="(item, index) in dar"
					:key="index"
					class="ipfs_con_tit"
				>
					<div class="alltitle">
						<img :src="item.url" alt />
						<span>{{ item.contit }}</span>
					</div>
					<div class="allnum">{{ item.connum }}</div>
				</el-col>
			</el-row>
			<el-row type="flex" class="occ_con" justify="start"  style="flex-wrap:wrap">
				<el-col
					:span="2"
					v-for="(item, index) in titledar"
					:key="index"
					class="ipfs_con_tit"
				>
					<div class="alltitle">
						<img :src="item.url" alt />
						<span>{{ item.contit }}</span>
					</div>
					<div class="allnum">{{ item.connum }}</div>
				</el-col>
			</el-row>
		</div>
		<div class="ipfs_title_next" v-if="rotate == 4">
			<div class="maptitle">新疆</div>
			<el-row type="flex" justify="space-between">
				<el-col
					:span="3"
					v-for="(item, index) in dar"
					:key="index"
					class="ipfs_con_tit"
				>
					<div class="alltitle">
						<img :src="item.url" alt />
						<span>{{ item.contit }}</span>
					</div>
					<div class="allnum">{{ item.connum }}</div>
				</el-col>
			</el-row>
			<el-row type="flex" class="occ_con" justify="start"  style="flex-wrap:wrap">
				<el-col
					:span="2"
					v-for="(item, index) in titledar"
					:key="index"
					class="ipfs_con_tit"
				>
					<div class="alltitle">
						<img :src="item.url" alt />
						<span>{{ item.contit }}</span>
					</div>
					<div class="allnum">{{ item.connum }}</div>
				</el-col>
			</el-row>
		</div>
		<div class="select_sort" v-if="ipfsdata.length > 0">
			<div style="display: flex;flex-wrap: wrap;">
                <div class="local_search_item">
                <span>节点一级渠道商：</span>
				<el-select
					v-model="firstchan_value"
					placeholder="请选择节点类型"
					@change="searchdata"
				>
					<el-option label="全部" value=""></el-option>
					<el-option
						v-for="(item,index) in firstchan"
						:key="item.value+index"
						:label="item.name"
						:value="item.value"
					></el-option>
				</el-select>
                </div>
                <div class="local_search_item">
				<span>设备类型：</span>
				<el-select
					v-model="devicevalue"
					placeholder="请选择设备类型"
					@change="searchdata"
				>
					<el-option label="全部" value=""></el-option>
					<el-option
						v-for="item in device_type"
						:key="item.name"
						:label="item.name"
						:value="item.name"
					></el-option>
				</el-select>
                </div>
                <div class="local_search_item">
				<span>硬件类型：</span>
				<el-select
					v-model="hardwarevalue"
					placeholder="请选择设备类型"
					@change="searchdata"
				>
					<el-option label="全部" value=""></el-option>
					<el-option
						v-for="item in hardware_type"
						:key="item.name"
						:label="item.name"
						:value="item.name"
					></el-option>
				</el-select>
                </div>
                <div class="local_search_item">
				<span>操作系统：</span>
				<el-select
					v-model="osvalue"
					placeholder="请选择设备类型"
					@change="searchdata"
				>
					<el-option label="全部" value=""></el-option>
					<el-option
						v-for="item in oslist"
						:key="item.name"
						:label="item.name"
						:value="item.name"
					></el-option>
				</el-select>
                </div>
				<el-button type="primary" @click="uopset" style="margin-left: 10px;margin-top: 20px;">重置</el-button>
			</div>
			<div class="sort_list">
				<span class="sort_title">排序：</span>
				<el-select
					v-model="value"
					placeholder="请选择排序方式"
					@change="searchdata"
				>
					<el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.value"
					></el-option>
				</el-select>
			</div>
		</div>
		<div class="ipfs_box">
			<div class="nodata" v-show="showdata">
				<i class="el-icon-document-delete" style="font-size:80px"></i>
				<p>暂无数据</p>
			</div>
			<div
				class="ipfs_item"
				v-for="(item, index) in ipfsdata"
				:key="index"
				@click="godetail(item,index)"
                v-show="!showdata"
			>
				<div
					style="display: flex;justify-content: flex-start;align-items: center;"
				>
					<div
						class="yuan"
						v-bind:style="{ background: item.bgccolor }"
					></div>
					<span v-bind:style="{ color: item.bgccolor }"
						>{{ item.devstatus }}</span
					>
				</div>
				<div class="ipfs_item_img">
					<img
						v-if="
							item.devicetype != 'PC服务器' &&
								item.devstatus == '在线'
						"
						src="../../../assets/img/binding_illustration3.png"
						style="width:60%;"
						alt
					/>
					<img
						v-if="
							item.devicetype != 'PC服务器' &&
								item.devstatus == '离线'
						"
						src="../../../assets/img/lixianxiyouji.png"
						style="width:60%;"
						alt
					/>
					<img
						v-if="
							item.devicetype == 'PC服务器' &&
								item.devstatus == '在线'
						"
						src="../../../assets/img/zaixianfuwuqi.png"
						style="width:60%;"
						alt=""
					/>
					<img
						v-if="
							item.devicetype == 'PC服务器' &&
								item.devstatus == '离线'
						"
						src="../../../assets/img/lixianfuwuqi.png"
						style="width:60%;"
						alt
					/>
					<p style="text-align:center">
						{{
							item.firstch
						}}
					</p>
					<p style="text-align:center">
						<span>{{ item.devicetype }}</span>
						<span>{{ item.os }}</span>
						<span>{{ item.arch }}</span>
					</p>
					<p>
						节点ID：
					</p>
					<p style="word-wrap:break-word;word-break:normal;text-align: left;">
						{{ item.nodeId }}
					</p>
				</div>
				<ol>
					<li>
						<span class="ipfs_text_title">上行宽带:</span>
						<span class="ipfs_text_con">{{
							item.upbandwidth
						}}</span>
					</li>
					<li>
						<span class="ipfs_text_title">下行宽带:</span>
						<span class="ipfs_text_con">{{
							item.downbandwidth
						}}</span>
					</li>
					<li>
						<span class="ipfs_text_title">总容量:</span>
						<span class="ipfs_text_con">{{ (
									item.totalCap /
									1024 /
									1024 /
									1024
								).toFixed(2) }}GB</span>
					</li>
					<li>
						<span class="ipfs_text_title">剩余容量:</span>
						<span class="ipfs_text_con"
							>{{ (item.remainingCap/1024/1024/1024).toFixed(2) }}GB</span
						>
					</li>
				</ol>
			</div>
		</div>
		<fenye
			style="text-align: right;margin: 20px 0px 10px;"
			@fatherMethod="getpage"
			@fathernum="gettol"
			:pagesa="totalCnt"
			:currentPage="currentPage"
			 v-show="!showdata"
		></fenye>
	</div>
</template>

<script>
import fenye from '@/components/fenye';
import {
	query_node,
	ipfs_region_summary,
    get_nodetype_enum,
    nodesinfo_byarea
} from '../../../servers/api';
export default {
	data() {
		return {
			currentPage: 1,
			pagesize: 10,
			pageNo: 1,
			totalCnt: 1,
			location_name: '西北区域',
			rotate: 0,
			citys: '宁夏',
			showdata: false,
			options: [
				{
					value: 0,
					label: '全部',
				},
				{
					value: 1,
					label: '剩余容量降序',
				},
				{
					value: 2,
					label: '剩余容量升序',
				},
				{
					value: 3,
					label: '上行带宽降序',
				},
				{
					value: 4,
					label: '上行带宽升序',
				},
			],
            titledar:[],
            dar: [
				// {
                //     contit: '云链节点',
				// 	connum: 0,
				// 	url: require('../../../assets/img/armjiedian.png'),
                // },
                //                     {
                //                         contit: 'PC西柚机节点',
                //                         connum: 0,
                //                         url: require('../../../assets/img/xjiedian.png'),
                //                     },
                // {
				// 	contit: 'rouji节点',
				// 	connum: 0,
				// 	url: require('../../../assets/img/armjiedian.png'),
				// },
				{
					contit: '总节点',
					connum: 0,
					url: require('../../../assets/img/jiedian.png'),
				},
				{
					contit: '在线节点',
					connum: 0,
					url: require('../../../assets/img/zaixjied.png'),
				},
				{
					contit: '总容量',
					connum: '0B',
					url: require('../../../assets/img/zongkongj.png'),
				},
				{
					contit: '当前使用容量',
					connum: '0B',
					url: require('../../../assets/img/zhanyongkj.png'),
				},
				{
					contit: '剩余容量',
					connum: '0B',
					url: require('../../../assets/img/keykj.png'),
				},
				{
					contit: '累计使用流量',
					connum: '0B',
					url: require('../../../assets/img/liuliangs.png'),
				},
				{
					contit: '累计存储容量',
					connum: '0B',
					url: require('../../../assets/img/cuncurl.png'),
				},
			],
			value: 0,
			ipfsdata: [
				// {
				//   nodeid: "1231561fafqw",
				//   devstatus: "在线",
				//   bgccolor: "#5CC77D",
				//   upstream: 152.1,
				//   down: 42.33,
				//   total_capacity: 1000,
				//   remaining: 270
				// },
			],
			devicevalue: '',
			hardwarevalue: '',
			osvalue: '',
			operatovalue: '',
			device_type: [],
			hardware_type: [],
			oslist: [],
            operatorlist: [],
             firstchan:[],
             firstchan_value:"",
		};
	},
	components: {
		fenye,
	},
	mounted() {
        this.get_search_data();
        if (sessionStorage.getItem('search_condition')) {
			let search_data = JSON.parse(
				sessionStorage.getItem('search_condition')
            );
			this.operatovalue = search_data.isp;
			this.osvalue = search_data.os;
			this.hardwarevalue = search_data.arch;
			this.devicevalue = search_data.devicetype;
			this.value = search_data.order;
        }
        if (this.$route.query.node_city) {
			this.setmap_show(this.$route.query.node_num);
		}
		if (sessionStorage.getItem('northwest_location')) {
			this.setmap_show(
				JSON.parse(sessionStorage.getItem('northwest_location'))
			);
		} else {
            this.gettit();
            this.getipfsdata();
		}
	},
	methods: {
        searchdata(){
            this.currentPage=1;
            this.getipfsdata();
        },
        uopset() {
            this.currentPage=1;
			this.operatovalue = '';
			this.osvalue = '';
			this.hardwarevalue = '';
            this.devicevalue = '';
            this.firstchan_value="",
             this.value=0;
			this.getipfsdata();
		},
		get_search_data() {
			let params = new Object();
			params.time = '111';
			get_nodetype_enum(params)
				.then((res) => {
					console.log(res);
					if (res.status == 0) {
						this.hardware_type = res.data.arch;
						this.device_type = res.data.device_type;
						this.operatorlist = res.data.isp;
                        this.oslist = res.data.os;
                        this.firstchan=res.data.firstchan;
					} else {
						this.$message.error(res.err_msg);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		},
		//获取头部预览信息
		gettit() {
            let titlist = [];
			let parmas = new Object();
			parmas.province = this.citys;
			nodesinfo_byarea(parmas)
				.then((res) => {
					if (res.status == 0) {
						if (res.data.nodeType) {
							res.data.nodeType.forEach((item, index) => {
								let obj = {};
								obj.url = require('../../../assets/img/armjiedian.png');
								obj.contit = item;
								obj.connum = res.data.nodeCount[index];
								titlist.push(obj);
							});
						}
						this.titledar = titlist;
						this.dar[1].connum = res.data.onlineCount;
						this.dar[2].connum = this.common.formatBytes(
							res.data.totalCap
						);
						let numcap = res.data.totalCap - res.data.remainingCap;
						this.dar[3].connum = this.common.formatBytes(numcap);
						this.dar[4].connum = this.common.formatBytes(
							res.data.remainingCap
						);
					} else {
						this.$message.error(res.err_msg);
					}
				})
				.catch((error) => {});
		},
		//获取列表数据
		getipfsdata() {
			let parmas = new Object();
			parmas.nodeId = '';
			parmas.ip = '';
			parmas.state = -1;
			parmas.province = this.citys;
			parmas.city = '';
			parmas.page = this.currentPage - 1;
			parmas.isp = this.operatovalue;
			parmas.os = this.osvalue;
			parmas.arch = this.hardwarevalue;
			parmas.devicetype = this.devicevalue;
			parmas.firstchid = this.firstchan_value;
			parmas.secondchid = '';
			parmas.enableFlag =-1;
            parmas.order = this.value;
            sessionStorage.setItem('search_condition', JSON.stringify(parmas));
			query_node(parmas)
				.then((res) => {
					if (res.status == 0) {
                      this.dar[0].connum = res.data.total;
						if (res.data.result.length <= 0) {
							this.showdata = true;
							this.$message('暂无数据');
						} else {
							this.showdata = false;
                            this.totalCnt = res.data.total;
							this.ipfsdata = [];
							res.data.result.forEach((item, index) => {
								//上行带宽-总
								item.upbandwidth = item.totalBW.substring(
									0,
									item.totalBW.lastIndexOf('/')
								);
								//下行带宽-总
								item.downbandwidth = item.totalBW.substring(
									item.totalBW.indexOf('/') + 1
								);
								//上行带宽-剩余
								item.upbandwidth_rema = item.remainingBW.substring(
									0,
									item.remainingBW.lastIndexOf('/')
								);
								//下行带宽-剩余
								item.downbandwidth_rema = item.remainingBW.substring(
									item.remainingBW.indexOf('/') + 1
                                );
                                //上行带宽-使用
								item.upbandwidth_occ = item.occupyBW.substring(
									0,
									item.occupyBW.lastIndexOf('/')
								);
								//下行带宽-使用
								item.downbandwidth_occ = item.occupyBW.substring(
									item.occupyBW.indexOf('/') + 1
								);
								if (item.state == 0) {
									item.devstatus = '离线';
									item.bgccolor = '#929292';
								} else {
									item.devstatus = '在线';
									item.bgccolor = '#5CC77D';
								}
								this.ipfsdata.push(item);
							});
						}
					} else {
						this.$message.error(res.err_msg);
					}
				})
				.catch((error) => {});
		},
		setmap_show(num) {
			this.ipfsdata = [];
			this.rotate = 100;
			this.$nextTick(() => {
				this.rotate = parseInt(num);
			});
			if (num == 0) {
				this.citys = '宁夏';
			} else if (num == 1) {
				this.citys = '陕西';
			} else if (num == 2) {
				this.citys = '甘肃';
			} else if (num == 3) {
				this.citys = '青海';
			} else if (num == 4) {
				this.citys = '新疆';
			} else {
				this.citys = '宁夏';
            }
            sessionStorage.setItem('northwest_location', JSON.stringify(num));
			this.gettit();
			this.uopset();
			this.$forceUpdate();
		},
		//获取页码
		getpage(pages) {
			this.currentPage = pages;
			this.getipfsdata();
		},
		//获取每页数量
		gettol(pagetol) {
			this.pagesize = pagetol;
			// this.getipfsdata();
		},
		godetail(dat,num) {
			sessionStorage.setItem('serdata', JSON.stringify(this.ipfsdata[num]));
			this.$router.push({
				path: '/ipfs_location_details',
				query: {
					node_city: this.citys,
					node_num: this.rotate,
					address: '/ipfs_southwest_location',
				},
			});
		},
    },
};
</script>

<style lang="scss" scoped>
.content {
	// width: 1920px;
	height: 100%;
	background: rgb(255, 255, 255);
	margin: auto;
	.bread_crumbs {
		width: 100%;
		padding-bottom: 37px;
		font-size: 26px;
	}
	.ipfs_title {
		text-align: left;
		color: #1c2e32;
		font-size: 22px;
		font-weight: bold;
	}
	.ipfs_con {
		// height: 50px;
		line-height: 50px;
		display: flex;
		// padding: 0 37px;
		flex-wrap: wrap;
		justify-content: start;
		.ipfs_con_left {
			color: #999999;
			font-size: 16px;
		}
		.ipfs_con_right {
			.setmap_btn {
				margin-right: 20px;
				color: #1c2e32;
				font-size: 18px;
			}
		}
	}
	.ipfs_title_next {
		height: auto;
		// text-align: left;
		.maptitle {
			text-align: center;
			margin-bottom: 47px;
			font-size: 22px;
			color: #000000;
			display: none;
		}
		.ipfs_con_tit {
			background: rgba(255, 255, 255, 1);
			border: 1px solid rgba(216, 226, 240, 1);
			box-shadow: 0px 12px 36px 0px rgba(211, 215, 221, 0.4);
			border-radius: 4px;
			text-align: left;
			padding: 2px 10px;
			// margin-top: 20px;
			overflow: hidden;
			.alltitle {
				height: 45px;
				display: flex;
				align-items: center;
				color: #929292;
				font-size: 18px;
				img {
					width: 27px;
				}
				span {
					font-size: 12px;
					height: 45px;
					word-wrap: break-word;
					display: flex;
					align-items: center;
				}
			}
			.allnum {
				line-height: 40px;
				color: #1c1a1d;
				font-size: 24px;
			}
		}
		.occ_con {
			.ipfs_con_tit {
				border: none;
				background: none;
				height: auto;
                margin-top: 20px;
                margin-right: 35px;
				.alltitle {
					img {
						width: 27px;
					}
				}
			}
		}
	}
	.select_sort {
		text-align: left;
		margin: 37px 0 0 0;
		display: flex;
		justify-content: space-between;
	}
	.ipfs_box {
		width: 100%;
		// padding: 37px;
		justify-content: center;
		display: flex;
		flex-flow: row wrap;
		.ipfs_item {
			width: 19%;
			padding: 23px;
			background: rgba(255, 255, 255, 1);
			border: 1px solid rgba(216, 226, 240, 1);
			box-shadow: 0px 0px 18px 0px rgba(211, 215, 221, 0.4);
			border-radius: 3px;
			margin-left: 0.5%;
			margin-right: 0.5%;
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
				border-bottom: 1px solid #eeeeee;
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
         .ipfs_item:nth-child(2),.ipfs_item:nth-child(7) {
            margin-left: 0;
        }
        .ipfs_item:last-child,.ipfs_item:nth-child(6) {
            margin-right: 0;
        }
	}
}
.eema {
	width: 55px;
	color: #919191;
	line-height: 20px;
	display: inline-block;
	line-height: 30px;
}
.bluma {
	width: 55px;
	color: #919191;
	line-height: 20px;
	display: inline-block;
	line-height: 30px;
	border-bottom: #64a7fc 3px solid;
}
.content .ipfs_con_label {
	justify-content: start;
	margin-top: 15px;
	margin-bottom: 25px;
	.ipfs_con_left {
		font-size: 18px;
		margin-right: 50px;
		padding-left: 10px;
	}
}
</style>
