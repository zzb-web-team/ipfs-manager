<template>
	<div>
		<el-pagination
			background
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			:current-page.sync="currentPage"
			:page-sizes="[10]"
			:page-size="10"
			layout="sizes,total, prev, pager, next, jumper"
			:total="pagesa"
		></el-pagination>
	</div>
</template>

<script>
export default {
	name: 'pagination',
	props: {
		pagesa: {
			type: Number,
			default: 0,
        },
        currentPage: { type: Number, default: 1 }
	},
	mounted() {},
	methods: {
		handleSizeChange(val) {
			this.$emit('fathernum', val);
		},
		handleCurrentChange(val) {
            this.currentPage=val;
			this.$emit('fatherMethod', val);
		},
	},
};
</script>
<style lang="scss" scoped></style>
