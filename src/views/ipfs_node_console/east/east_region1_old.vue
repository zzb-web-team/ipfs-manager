<template>
	<div class="content">
		<!-- 面包屑  -->
		<!-- <div class="bread_crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>
					<a>华东地区</a>
				</el-breadcrumb-item>
				<el-breadcrumb-item>
					<a>IPFS节点网络分布</a>
				</el-breadcrumb-item>
			</el-breadcrumb>
		</div> -->

		<!-- 标题 -->
		<div class="ipfs_title">{{ location_name }}</div>
		<div class="ipfs_con">
			<div class="ipfs_con_left">区域节点分布</div>
			<div class="ipfs_con_right">
				<span
					:class="[rotate == 0 ? 'bluma' : 'eema']"
					@click="setmap_show('0')"
					class="setmap_btn"
					>福建</span
				>
				<span
					:class="[rotate == 1 ? 'bluma' : 'eema']"
					@click="setmap_show('1')"
					class="setmap_btn"
					>江苏</span
				><span
					:class="[rotate == 2 ? 'bluma' : 'eema']"
					@click="setmap_show('2')"
					class="setmap_btn"
					>安徽</span
				><span
					:class="[rotate == 3 ? 'bluma' : 'eema']"
					@click="setmap_show('3')"
					class="setmap_btn"
					>山东</span
				><span
					:class="[rotate == 4 ? 'bluma' : 'eema']"
					@click="setmap_show('4')"
					class="setmap_btn"
					>上海</span
				><span
					:class="[rotate == 5 ? 'bluma' : 'eema']"
					@click="setmap_show('5')"
					class="setmap_btn"
					>浙江</span
				>
			</div>
		</div>
		<div class="ipfs_title_next" v-if="rotate == 0">
			<div class="maptitle">节点区域分布（福建）</div>
			<remap :datalist="datalist" :citys="citys"></remap>
		</div>
		<div class="ipfs_title_next" v-if="rotate == 1">
			<div class="maptitle">节点区域分布（江苏）</div>
			<remap :datalist="datalist" :citys="citys"></remap>
		</div>
		<div class="ipfs_title_next" v-if="rotate == 2">
			<div class="maptitle">节点区域分布（安徽）</div>
			<remap :datalist="datalist" :citys="citys"></remap>
		</div>
		<div class="ipfs_title_next" v-if="rotate == 3">
			<div class="maptitle">节点区域分布（山东）</div>
			<remap :datalist="datalist" :citys="citys"></remap>
		</div>
		<div class="ipfs_title_next" v-if="rotate == 4">
			<div class="maptitle">节点区域分布（上海）</div>
			<remap :datalist="datalist" :citys="citys"></remap>
		</div>
		<div class="ipfs_title_next" v-if="rotate == 5">
			<div class="maptitle">节点区域分布（浙江）</div>
			<remap :datalist="datalist" :citys="citys"></remap>
		</div>
	</div>
</template>

<script>
import remap from '../../../components/thermal_map';
// import demo2 from "../../../components/demo2";
import { query_node, node_distribute } from '../../../servers/api';
export default {
	data() {
		return {
			location_name: '华东区域',
			rotate: 0,
			datalist: [],
			citys: '福建',
		};
	},
	components: {
		remap,
		// demo2
	},
	mounted() {
        if (sessionStorage.getItem('east_region')) {
			this.setmap_show(
				JSON.parse(sessionStorage.getItem('east_region'))
			);
		} else {
		this.getdalsit('福建');
		}
	},
	methods: {
		getdalsit(sctyes) {
			let parmas = new Object();
			parmas.province = sctyes;
			parmas.page = 0;
			node_distribute(parmas)
				.then((res) => {
					if (res.status == 0) {
						if (res.data.result.length > 0) {
							if (parmas.page == 0) {
								this.datalist = [];
							}
							res.data.result.forEach((item, index) => {
								let obj = {};
								obj.lng = item[1];
								obj.lat = item[0];
								if (item[3]) {
									obj.count = item[3];
								} else {
									obj.count = 1;
								}
								this.datalist.push(obj);
							});
						} else {
							this.$message('暂无数据');
						}
					} else {
						this.$message.error(res.err_msg);
					}
				})
				.catch((err) => {});
		},
		setmap_show(num) {
			this.rotate = 100;
			this.$nextTick(() => {
				this.rotate = parseInt(num);
			});
			if (num == 0) {
				this.citys = '福建';
			} else if (num == 1) {
				this.citys = '江苏';
			} else if (num == 2) {
				this.citys = '安徽';
			} else if (num == 3) {
				this.citys = '山东';
			} else if (num == 4) {
				this.citys = '上海';
			} else if (num == 5) {
				this.citys = '浙江';
			} else {
				this.citys = '福建';
			}
sessionStorage.setItem('east_region', JSON.stringify(num));
			this.getdalsit(this.citys);
			this.$forceUpdate();
		},
    },
    destroyed: function() {
		sessionStorage.removeItem('east_region');
	},
};
</script>

<style lang="scss" scoped>
.content {
	background: rgb(255, 255, 255);
	// margin: 30px;
	.bread_crumbs {
		width: 100%;
		padding-bottom: 37px;
		font-size: 26px;
	}
	.ipfs_title {
		padding-left: 37px;
		text-align: left;
		color: #1c2e32;
		font-size: 24px;
		font-weight: bold;
		margin-bottom: 45px;
	}
	.ipfs_con {
		height: 50px;
		line-height: 50px;
		display: flex;
		padding: 0 37px;
		.ipfs_con_left {
			color: #1c2e32;
			font-size: 22px;
			margin-right: 80px;
		}
		.ipfs_con_right {
			.setmap_btn {
				margin-right: 20px;
				font-size: 14px;
				color: #999999;
			}
		}
	}
	.ipfs_title_next {
		// width: 100%;

		padding-left: 126px;
		padding-right: 126px;
		padding-bottom: 126px;
		text-align: left;
		.maptitle {
			text-align: center;
			margin-bottom: 30px;
			font-size: 22px;
			color: #000000;
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
</style>
