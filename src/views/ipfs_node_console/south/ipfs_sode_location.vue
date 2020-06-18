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
        >广东</span>
        <span
          :class="[rotate == 1 ? 'bluma' : 'eema']"
          @click="setmap_show('1')"
          class="setmap_btn"
        >广西</span>
        <span
          :class="[rotate == 2 ? 'bluma' : 'eema']"
          @click="setmap_show('2')"
          class="setmap_btn"
        >海南</span>
      </div>
    </div>
    <!-- 主要内容 -->
    <div class="ipfs_title_next" v-if="rotate == 0">
      <div class="maptitle">广东</div>
      <div class="ipfs_con">
        <div class="ipfs_con_tit" v-for="(item, index) in titledar" :key="index">
          <div class="alltitle">
            <img :src="item.url" alt />
            <span>{{ item.contit }}</span>
          </div>
          <div class="allnum">{{ item.connum }}</div>
        </div>
      </div>
    </div>
    <div class="ipfs_title_next" v-if="rotate == 1">
      <div class="maptitle">广西</div>
      <div class="ipfs_con">
        <div class="ipfs_con_tit" v-for="(item, index) in titledar" :key="index">
          <div class="alltitle">
            <img :src="item.url" alt />
            <span>{{ item.contit }}</span>
          </div>
          <div class="allnum">{{ item.connum }}</div>
        </div>
      </div>
    </div>
    <div class="ipfs_title_next" v-if="rotate == 2">
      <div class="maptitle">海南</div>
      <div class="ipfs_con">
        <div class="ipfs_con_tit" v-for="(item, index) in titledar" :key="index">
          <div class="alltitle">
            <img :src="item.url" alt />
            <span>{{ item.contit }}</span>
          </div>
          <div class="allnum">{{ item.connum }}</div>
        </div>
      </div>
    </div>
    <div class="select_sort" v-if="ipfsdata.length > 0">
     <div>
			<span>设备类型：</span>
			<el-select v-model="value" placeholder="请选择设备类型">
				<el-option label="全部" value="*"></el-option>
			</el-select>
			<span>硬件类型：</span>
			<el-select v-model="value" placeholder="请选择设备类型">
				<el-option label="全部" value="*"></el-option>
			</el-select>
			<span>操作系统：</span>
			<el-select v-model="value" placeholder="请选择设备类型">
				<el-option label="全部" value="*"></el-option>
			</el-select>
			<span>节点网络运营商：</span>
			<el-select v-model="value" placeholder="请选择设备类型">
				<el-option label="全部" value="*"></el-option>
			</el-select>
			<el-button type="primary">重置</el-button>
            </div>
			<div>
				<span>排序：</span>
				<el-select v-model="value" placeholder="请选择排序方式">
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
				@click="godetail(item)"
			>
				<div
					style="display: flex;justify-content: flex-start;align-items: center;"
				>
					<div
						class="yuan"
						v-bind:style="{ background: item.bgccolor }"
					></div>
					<span v-bind:style="{ color: item.bgccolor }">{{
						item.devstatus
					}}&nbsp;{{item.net_type}}</span>
				</div>
				<div class="ipfs_item_img">
					<img
						v-if="item.type == 0 && item.devstatus == '在线'"
						src="../../../assets/img/binding_illustration3.png"
						style="width:60%;"
						alt
					/>
					<img
						v-if="item.type == 0 && item.devstatus == '离线'"
						src="../../../assets/img/lixianxiyouji.png"
						style="width:60%;"
						alt
					/>
					<img
						v-if="item.type == 1 && item.devstatus == '在线'"
						src="../../../assets/img/zaixianfuwuqi.png"
						style="width:60%;"
						alt=""
					/>
					<img
						v-if="item.type == 1 && item.devstatus == '离线'"
						src="../../../assets/img/lixianfuwuqi.png"
						style="width:60%;"
						alt
					/>
					<p style="text-align:center">{{ item.node_type }}</p>
					<p style="text-align:center">
						<span>{{item.dev_type}}</span>
						<span>{{item.system_type}}</span>
						<span>{{item.hardware_type}}</span>
					</p>
					<p>
						节点ID：
					</p>
					<p style="word-wrap:break-word;word-break:normal;">
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
						<span class="ipfs_text_con">{{ item.totalCap }}GB</span>
					</li>
					<li>
						<span class="ipfs_text_title">剩余容量:</span>
						<span class="ipfs_text_con"
							>{{ item.remainingCap }}GB</span
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
      v-if="ipfsdata.length > 0"
    ></fenye>
  </div>
</template>

<script>
import fenye from "@/components/fenye";
import { query_node, ipfs_region_summary } from "../../../servers/api";
export default {
  data() {
    return {
      location_name: "华南区域",
      rotate: 0,
      pagesize: 10,
      pageNo: 1,
      totalCnt: 1,
      citys: "广东",
      currentPage: 1,
      showdata: false,
      options: [
        {
          value: "1",
          label: "可用空间从大到小"
        },
        {
          value: "2",
          label: "可用空间从小到大"
        },
        {
          value: "3",
          label: "可用带宽从高到低"
        },
        {
          value: "4",
          label: "可用带宽从抵到高"
        }
      ],
      titledar: [
				{
					contit: '总节点',
					connum: 0,
					url: require('../../../assets/img/jiedian.png'),
                },
                {
					contit: 'K86节点',
					connum: 0,
					url: require('../../../assets/img/xjiedian.png'),
				},{
					contit: 'ARM节点',
					connum: 0,
					url: require('../../../assets/img/armjiedian.png'),
				},
				{
					contit: '在线节点',
					connum: 0,
					url: require('../../../assets/img/zaixjied.png'),
				},
				{
					contit: '总空间',
					connum: '0G',
					url: require('../../../assets/img/zongkongj.png'),
				},
				{
					contit: '当前占用空间',
					connum: '0G',
					url: require('../../../assets/img/zhanyongkj.png'),
				},
				{
					contit: '可用空间',
					connum: '0G',
					url: require('../../../assets/img/keykj.png'),
				},
				{
					contit: '累计使用流量',
					connum: '0G',
					url: require('../../../assets/img/liuliangs.png'),
				},
				{
					contit: '累计存储容量',
					connum: '0G',
					url: require('../../../assets/img/cuncurl.png'),
                },
      ],
      value: "",
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
      ]
    };
  },
  components: {
    fenye
  },
  mounted() {
    if (this.$route.query.node_city) {
      this.citys = this.$route.query.node_city;
      this.rotate = this.$route.query.node_num;
    }
    this.gettit();
    this.getipfsdata();
  },
  methods: {
    //获取头部预览信息
    gettit() {
      let parmas = new Object();
      parmas.region = this.citys;
      ipfs_region_summary(parmas)
        .then(res => {
          if (res.status == 0) {
            this.titledar[0].connum = res.data.total_cnt;
            this.titledar[1].connum = res.data.online_cnt;
            this.titledar[2].connum = this.common.formatByteActive(
              res.data.total_cap
            );
            this.titledar[3].connum = this.common.formatByteActive(
              res.data.total_usedcap
            );
            this.titledar[4].connum = this.common.formatByteActive(
              res.data.total_freecap
            );
            this.titledar[5].connum = this.common.formatByteActive(
              res.data.total_dataflow
            );
            this.titledar[6].connum = this.common.formatByteActive(
              res.data.total_storeusage
            );
          } else {
            this.$message.error(res.err_msg);
          }
        })
        .catch(error => {});
    },
    //获取列表数据
    getipfsdata() {
      let parmas = new Object();
      parmas.nodeId = "";
      parmas.ip = "";
      parmas.state = -1;
      parmas.province = this.citys;
      parmas.city = "";
      parmas.page = this.pageNo - 1;
      parmas.isp = "";
      query_node(parmas)
        .then(res => {
          if (res.status == 0) {
            if (res.data.result.length <= 0) {
              this.showdata = true;
              this.$message("暂无数据");
            } else {
				this.showdata = false;
              this.totalCnt = res.data.total;
              this.ipfsdata = [];
              res.data.result.forEach((item, index) => {
                //上行带宽-总
                item.upbandwidth = item.totalBW.substring(
                  0,
                  item.totalBW.lastIndexOf("/")
                );
                //下行带宽-总
                item.downbandwidth = item.totalBW.substring(
                  item.totalBW.indexOf("/") + 1
                );
                //上行带宽-剩余
                item.upbandwidth_rema = item.remainingBW.substring(
                  0,
                  item.remainingBW.lastIndexOf("/")
                );
                //下行带宽-剩余
                item.downbandwidth_rema = item.remainingBW.substring(
                  item.remainingBW.indexOf("/") + 1
                );
                if (item.state == 0) {
                  item.devstatus = "离线";
                  item.bgccolor = "#929292";
                } else {
                  item.devstatus = "在线";
                  item.bgccolor = "#5CC77D";
                }
                item.totalCap = (item.totalCap / 1024 / 1024 / 1024).toFixed(2);
                item.remainingCap = (
                  item.remainingCap /
                  1024 /
                  1024 /
                  1024
                ).toFixed(2);
                this.ipfsdata.push(item);
              });
            }
          } else {
            this.$message.error(res.err_msg);
          }
        })
        .catch(error => {});
    },
    setmap_show(num) {
		this.ipfsdata = [];
      this.rotate = 100;
      this.$nextTick(() => {
        this.rotate = parseInt(num);
      });
      if (num == 0) {
        this.citys = "广东";
      } else if (num == 1) {
        this.citys = "广西";
      } else if (num == 2) {
        this.citys = "海南";
      } else {
        this.citys = "广东";
      }
      this.getipfsdata();
      this.$forceUpdate();
      this.gettit();
    },
    //获取页码
    getpage(pages) {
      this.pageNo = pages;
      this.getipfsdata();
    },
    //获取每页数量
    gettol(pagetol) {
      this.pagesize = pagetol;
      // this.getipfsdata();
    },
    godetail(dat) {
      sessionStorage.setItem("serdata", JSON.stringify(dat));
      this.$router.push({
        path: "/ipfs_location_details",
        query: {
          node_city: this.citys,
          node_num: this.rotate,
          address: "/ipfs_sode_location"
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
 width: 1920px;
	height: 100%;
	background: rgb(255, 255, 255);
	margin: auto;
	margin-top: 30px;
	margin-left: 30px;
	margin-right: 30px;
	margin-bottom: 30px;
  .bread_crumbs {
    width: 100%;
    padding-bottom: 37px;
    font-size: 26px;
  }
 .ipfs_title {
		text-align: left;
		color: #1C2E32;
		font-size: 22px;
        font-weight:bold;
	}
	.ipfs_con {
		height: 50px;
		line-height: 50px;
		display: flex;
		// padding: 0 37px;
		justify-content: space-between;
        .ipfs_con_left{
            color: #999999;
            font-size: 16px;
        }
		.ipfs_con_right {
			.setmap_btn {
				margin-right: 20px;
                color: #1C2E32;
                font-size: 18px;
			}
		}
	}
  .ipfs_title_next {
    // text-align: left;
    .maptitle {
      text-align: center;
      margin-bottom: 47px;
      font-size: 22px;
      color: #000000;
      display: none;
    }
    .ipfs_con {
      // width: 100%;
      height: 123px;
      display: flex;
      .ipfs_con_tit {
       width: 148px;
	    height: 117px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(216, 226, 240, 1);
        box-shadow: 0px 12px 36px 0px rgba(211, 215, 221, 0.4);
        border-radius: 4px;
        text-align: left;
        padding: 2px 10px;
        overflow: hidden;
        .alltitle {
          display: inline-block;
          height: 45px;
          display: flex;
          align-items: center;
          line-height: 45px;
          color: #929292;
          font-size: 18px;
          img {
            width: 30%;
          }
        }
        .allnum {
          line-height: 40px;
          color: #1c1a1d;
          font-size: 34px;
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
    padding: 37px;
    justify-content: center;
    display: flex;
    flex-flow: row wrap;
    .ipfs_item {
     width: 270px;
			// height: 400px;
			padding: 23px;
			background: rgba(255, 255, 255, 1);
			border: 1px solid rgba(216, 226, 240, 1);
			box-shadow: 0px 0px 18px 0px rgba(211, 215, 221, 0.4);
			border-radius: 3px;
			margin-left: 42px;
			margin-right: 42px;
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
