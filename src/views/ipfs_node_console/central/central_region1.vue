<template>
  <div class="content">
    <!-- 面包屑  -->
    <div class="bread_crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>IPFS节点控制台</el-breadcrumb-item>
        <el-breadcrumb-item>
          <a>华中地区</a>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <a>IPFS节点网络分布</a>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

   <!-- 标题 -->
    <div class="ipfs_title">{{ location_name }}</div>
    <div class="ipfs_con">
      <div class="ipfs_con_left">区域节点分布</div>
      <div class="ipfs_con_right">
        <span
          :class="[rotate == 0 ? 'bluma' : 'eema']"
          @click="setmap_show('0')"
          class="setmap_btn"
          >河南</span
        >
        <span
          :class="[rotate == 1 ? 'bluma' : 'eema']"
          @click="setmap_show('1')"
          class="setmap_btn"
          >湖北</span
        ><span
          :class="[rotate == 2 ? 'bluma' : 'eema']"
          @click="setmap_show('2')"
          class="setmap_btn"
          >江西</span
        ><span
          :class="[rotate == 3 ? 'bluma' : 'eema']"
          @click="setmap_show('3')"
          class="setmap_btn"
          >湖南</span
        >
      </div>
    </div>
    <div class="ipfs_title_next" v-if="rotate == 0">
      <div class="maptitle">河南</div>
      <remap :datalist="datalist" :citys="citys"></remap>
    </div>
    <div class="ipfs_title_next" v-if="rotate == 1">
      <div class="maptitle">湖北</div>
      <remap :datalist="datalist" :citys="citys"></remap>
    </div>
    <div class="ipfs_title_next" v-if="rotate == 2">
      <div class="maptitle">江西</div>
      <remap :datalist="datalist" :citys="citys"></remap>
    </div>
    <div class="ipfs_title_next" v-if="rotate == 3">
      <div class="maptitle">湖南</div>
      <remap :datalist="datalist" :citys="citys"></remap>
    </div>
   
  </div>
</template>

<script>
import remap from "../../../components/thermal_map";
// import demo2 from "../../../components/demo2";
import { query_node, node_distribute } from "../../../servers/api";
export default {
  data() {
    return {
      location_name: "华中区域",
      rotate: 0,
      datalist: [],
      citys: "河南"
    };
  },
  components: {
    remap
    // demo2
  },
  mounted() {
    this.getdalsit("河南");
  },
  methods: {
    getdalsit(sctyes) {
      let parmas = new Object();
      parmas.province = sctyes;
      parmas.page = 0;
      node_distribute(parmas)
        .then(res => {
          if (res.status == 0) {
            if (res.data.result.length > 0) {
              this.data.result.forEach((item, index) => {
                let obj = {};
                obj.lng = item[0];
                obj.lat = item[1];
                obj.count = 1;
                this.datalist.push(obj);
              });
            } else {
              this.$message("暂无数据");
            }
          } else {
            this.$message.error(res.err_msg);
          }
        })
        .catch(err => {
        });
    },
    setmap_show(num) {
      this.rotate = 100;
      this.$nextTick(() => {
        this.rotate = parseInt(num);
      });
      if (num == 0) {
        this.citys = "河南";
      } else if (num == 1) {
        this.citys = "湖北";
      } else if (num == 2) {
        this.citys = "江西";
      } else if (num == 3) {
        this.citys = "湖南";
      }else {
        this.citys = "河南";
      }

      this.getdalsit(this.citys);
      this.$forceUpdate();
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  background: rgb(255, 255, 255);
  margin: 30px;
  .bread_crumbs {
    width: 100%;
    padding-bottom: 37px;
    font-size: 26px;
  }
  .ipfs_title {
    padding-left: 37px;
    text-align: left;
    color: #000000;
    font-size: 26px;
  }
  .ipfs_con {
    height: 50px;
    line-height: 50px;
    display: flex;
    padding: 0 37px;
    justify-content: space-between;
    .ipfs_con_right {
      .setmap_btn {
        margin-right: 20px;
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
      margin-bottom: 47px;
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
