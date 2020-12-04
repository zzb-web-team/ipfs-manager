<template>
	<div class="back-top">
		<!-- <el-button type="text" @click="backTop()" v-show="datalist.length > 0">
			<i class="el-icon-caret-top" @click="backTop()"></i>
		</el-button> -->
		<!-- <el-scrollbar style="height:100%;"> -->
			<ol class="rightbox">
				<li
					v-for="(item, index) in datalist"
					@click="back_item(item, index)"
					class="nodetype"
					:class="{ active: isActive == index }"
				>
					<img
						:src="url.xyjpc"
						alt=""
						v-show="item.contit != '西柚机'"
					/>
					<img
						:src="url.xyjbox"
						alt=""
						v-show="item.contit == '西柚机'"
					/>
					<span> {{ item.contit }}&nbsp;{{ item.connum }} </span>
				</li>
			</ol>
		<!-- </el-scrollbar> -->
	</div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      backTopShow:false,
      url:{
          xyjpc:require("../assets/img/pcfwq.png"),
          xyjbox:require("../../src/assets/img/pcxyj.png")
      },
      isActive:0,
    }
  },
  props:{
      datalist: {
			type: Array,
			default: [],
        },
  },
  components: {},
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    backTop() {
      let back = setInterval(() => {
        if(document.body.scrollTop||document.documentElement.scrollTop){
          document.body.scrollTop-=100;
          document.documentElement.scrollTop-=100;
        }else {
          clearInterval(back)
        }
      });
    },
    back_item(data,num){
        console.log(data,num);
        this.isActive = num;
         this.$emit('handleChange', num) // 触发父组件中handleChange事件并传参Jack
    },
    handleScroll(){
      if (document.documentElement.scrollTop + document.body.scrollTop > 100) {
        this.backTopShow=true;
      }
      else {
        this.backTopShow=false;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.back-top {
	position: fixed;
	right: 30px;
	top: 50%;
}
.rightbox {
	height: 100%;
	// height: 150px;
	// overflow-y: scroll;
	// overflow-x: hidden;
	// opacity: 0.6;
	.nodetype {
		width: 60px;
		height: 40px;
		font-size: 10px;
		display: flex;
		flex-direction: column;
		align-items: center;
		background: white;
		margin-bottom: 10px;
		border-radius: 8px;
		box-shadow: 0px 4px 10px 0px rgba(51, 51, 51, 0.1);
		img {
			width: 20px;
			height: 12px;
			margin-top: 5px;
		}
	}
	.active {
		border: 2px solid #1572E8;
	}
}
</style>
