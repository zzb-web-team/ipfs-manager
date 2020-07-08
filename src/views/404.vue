<template>
	<div class="errpage" :style="{ height: scrollerHeight }">
		<div class="con">
			<img :src="url" alt="" />
			<p>页面不见了~~~</p>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			scrollerHeight: 0,
			url: require('../assets/img/404_error.png'),
		};
	},
	mounted() {
        this.scrollerHeight = window.screen.availHeight - 300 + 'px';
        
	},
};
</script>

<style lang="scss" scoped>
.grid-content .bg-purple-light .content-wrapper .el-col .el-col-24 {
	width: 100%;
	height: 100%;
}
.errpage {
	width: 100%;
	height: 100%;
	background: #ffffff;
	.con {
		width: 100%;
        height: 100%;
        padding-top:15%;
        p{
            font-size: 30px;
            margin-top: 50px;
        }
	}
}
</style>
