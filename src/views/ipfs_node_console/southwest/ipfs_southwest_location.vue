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
          >贵州</span
        >
        <span
          :class="[rotate == 1 ? 'bluma' : 'eema']"
          @click="setmap_show('1')"
          class="setmap_btn"
          >云南</span
        ><span
          :class="[rotate == 2 ? 'bluma' : 'eema']"
          @click="setmap_show('2')"
          class="setmap_btn"
          >重庆</span
        ><span
          :class="[rotate == 3 ? 'bluma' : 'eema']"
          @click="setmap_show('3')"
          class="setmap_btn"
          >四川</span
        ><span
          :class="[rotate == 4 ? 'bluma' : 'eema']"
          @click="setmap_show('4')"
          class="setmap_btn"
          >西藏</span
        >
      </div>
    </div>
    <!-- 主要内容 -->
    <div class="ipfs_title_next" v-if="rotate == 0">
      <div class="maptitle">贵州</div>
      <div class="ipfs_con">
        <div
          class="ipfs_con_tit"
          v-for="(item, index) in titledar"
          :key="index"
        >
          <div class="alltitle">
            <img :src="item.url" alt />
            <span>{{ item.contit }}</span>
          </div>
          <div class="allnum">{{ item.connum }}</div>
        </div>
      </div>
    </div>
    <div class="ipfs_title_next" v-if="rotate == 1">
      <div class="maptitle">云南</div>
      <div class="ipfs_con">
        <div
          class="ipfs_con_tit"
          v-for="(item, index) in titledar"
          :key="index"
        >
          <div class="alltitle">
            <img :src="item.url" alt />
            <span>{{ item.contit }}</span>
          </div>
          <div class="allnum">{{ item.connum }}</div>
        </div>
      </div>
    </div>
    <div class="ipfs_title_next" v-if="rotate == 2">
      <div class="maptitle">重庆</div>
      <div class="ipfs_con">
        <div
          class="ipfs_con_tit"
          v-for="(item, index) in titledar"
          :key="index"
        >
          <div class="alltitle">
            <img :src="item.url" alt />
            <span>{{ item.contit }}</span>
          </div>
          <div class="allnum">{{ item.connum }}</div>
        </div>
      </div>
    </div>
    <div class="ipfs_title_next" v-if="rotate == 3">
      <div class="maptitle">四川</div>
      <div class="ipfs_con">
        <div
          class="ipfs_con_tit"
          v-for="(item, index) in titledar"
          :key="index"
        >
          <div class="alltitle">
            <img :src="item.url" alt />
            <span>{{ item.contit }}</span>
          </div>
          <div class="allnum">{{ item.connum }}</div>
        </div>
      </div>
    </div>
    <div class="ipfs_title_next" v-if="rotate == 4">
      <div class="maptitle">西藏</div>
      <div class="ipfs_con">
        <div
          class="ipfs_con_tit"
          v-for="(item, index) in titledar"
          :key="index"
        >
          <div class="alltitle">
            <img :src="item.url" alt />
            <span>{{ item.contit }}</span>
          </div>
          <div class="allnum">{{ item.connum }}</div>
        </div>
      </div>
    </div>
    <div class="select_sort" v-if="ipfsdata.length > 0">
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
    <div class="ipfs_box">
      <div
        class="ipfs_item"
        v-for="(item, index) in ipfsdata"
        :key="index"
        @click="godetail(item)"
      >
        <div
          style="display: flex;justify-content: flex-start;align-items: center;"
        >
          <div class="yuan" v-bind:style="{ background: item.bgccolor }"></div>
          <span v-bind:style="{ color: item.bgccolor }">{{
            item.devstatus
          }}</span>
        </div>
        <div class="ipfs_item_img">
          <img
            src="../../../assets/img/binding_illustration3.png"
            style="width:60%;"
            alt
          />
          <p
            style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;"
          >
            节点：{{ item.nodeId }}
          </p>
        </div>
        <ol>
          <li>
            <span class="ipfs_text_title">上行宽带:</span>
            <span class="ipfs_text_con">{{ item.upbandwidth }}</span>
          </li>
          <li>
            <span class="ipfs_text_title">下行宽带:</span>
            <span class="ipfs_text_con">{{ item.downbandwidth }}</span>
          </li>
          <li>
            <span class="ipfs_text_title">总容量:</span>
            <span class="ipfs_text_con">{{ item.totalCap }}</span>
          </li>
          <li>
            <span class="ipfs_text_title">剩余容量:</span>
            <span class="ipfs_text_con">{{ item.remainingCap }}G</span>
          </li>
        </ol>
      </div>
    </div>
    <!-- <fenye style="margin: 20px 10px 0px 0px;text-align: right;"></fenye> -->
  </div>
</template>

<script>
import fenye from "@/components/fenye";
import { query_node, ipfs_region_summary } from "../../../servers/api";
export default {
  data() {
    return {
      location_name: "华北区域",
      rotate: 0,
      citys: "贵州",
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
          contit: "总节点",
          connum: 0,
          url: require("../../../assets/img/zong.png")
        },
        {
          contit: "在线节点",
          connum: 0,
          url: require("../../../assets/img/jie.png")
        },
        {
          contit: "总空间",
          connum: "0G",
          url: require("../../../assets/img/kong.png")
        },
        {
          contit: "当前占用空间",
          connum: "0G",
          url: require("../../../assets/img/zhan.png")
        },
        {
          contit: "可用空间",
          connum: "0G",
          url: require("../../../assets/img/sheng.png")
        },
        {
          contit: "累计使用流量",
          connum: "0G",
          url: require("../../../assets/img/liu.png")
        },
        {
          contit: "累计存储容量",
          connum: "0G",
          url: require("../../../assets/img/liu.png")
        }
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
            this.titledar[2].connum = this.common.formatByteActive(res.data.total_cap);
            this.titledar[3].connum = this.common.formatByteActive(res.data.total_usedcap);
            this.titledar[4].connum = this.common.formatByteActive(res.data.total_freecap);
            this.titledar[5].connum = this.common.formatByteActive(res.data.total_dataflow);
            this.titledar[6].connum = this.common.formatByteActive(res.data.total_storeusage);
          }else {
            this.$message.error(res.err_msg);
          }
        })
        .catch(error => {
        });
    },
    //获取列表数据
    getipfsdata() {
      let parmas = new Object();
      parmas.nodeId = "";
      parmas.ip = "";
      parmas.state = 1;
      parmas.province = this.citys;
      parmas.city = "";
      parmas.page = 0;
      query_node(parmas)
        .then(res => {
          if (res.status == 0) {
            if (res.data.result.length <= 0) {
              this.$message("暂无数据");
            } else {
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
                this.ipfsdata.push(item);
              });
            }
          }
        })
        .catch(error => {
        });
    },
    setmap_show(num) {
      this.rotate = 100;
      this.$nextTick(() => {
        this.rotate = parseInt(num);
      });
      if (num == 0) {
        this.citys = "贵州";
      } else if (num == 1) {
        this.citys = "云南";
      } else if (num == 2) {
        this.citys = "重庆";
      } else if (num == 3) {
        this.citys = "四川";
      } else if (num == 4) {
        this.citys = "西藏";
      } else {
        this.citys = "贵州";
      }
      this.getipfsdata();
      this.$forceUpdate(); this.gettit();
    },
    godetail(dat) {
      sessionStorage.setItem("serdata", JSON.stringify(dat));
      this.$router.push({
        path: "/ipfs_location_details"
      });
    }
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
    padding-bottom: 37px;
    font-size: 26px;
  }
  .ipfs_title {
    padding-left: 37px;
    text-align: center;
    color: #000000;
    font-size: 26px;
  }
  .ipfs_con {
    height: 50px;
    line-height: 50px;
    display: flex;
    // padding: 0 37px;
    justify-content: space-between;
    .ipfs_con_right {
      .setmap_btn {
        margin-right: 20px;
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
        width: 270px;
        height: 120px;
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
            width: 10%;
            margin-right: 10px;
          }
        }
        .allnum {
          line-height: 40px;
          color: #1c1a1d;
          font-size: 44px;
        }
      }
    }
  }
  .select_sort {
    text-align: left;
    margin: 37px 0 0 37px;
  }
  .ipfs_box {
    width: 100%;
    padding: 37px;
    justify-content: center;
    display: flex;
    flex-flow: row wrap;
    .ipfs_item {
      width: 228px;
      height: 349px;
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
    font-weight: 600;
    font-size: 18px;
    margin-right: 50px;
    padding-left: 10px;
  }
}
</style>
