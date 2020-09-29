<template>
  <div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10,20,50,100]"
      :page-size="10"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagesa"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "pagination",
  data() {
    return {
      // currentPage: 1 //初始页
    };
  },
  props: {
    pagesa: {
      type: Number,
      default: 0,
    },
    currentPage:{
      type:Number,
      default:"",
    },
  },
  mounted() {
  },
  methods: {
    handleSizeChange(val) {
      this.$emit("fathernum", val);
    },
    handleCurrentChange(val) {
      this.$emit("fatherMethod", val);
    }
  }
};
</script>
<style lang="scss" scoped></style>
