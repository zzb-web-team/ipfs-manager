<template>
	<div class="content">
		<remap
			:citylist="citylist"
			:area="area"
			:first_city="first_city"
		></remap>
	</div>
</template>

<script>
import remap from '../../../components/center_demo';
export default {
	data() {
		return {
			// citylist: ['北京', '内蒙古', '山西', '河北', '天津'],
			// first_city: '北京',
			// area: '华北区域',
            citylist: ['广东', '广西', '海南'],
            first_city: '广东',
            area: '华南区域',
            // citylist: ['福建', '江苏', '安徽', '山东', '上海', '浙江'],
            // first_city: '福建',
            // area: '华东区域',
            // citylist: ['河南', '湖北', '江西', '湖南'],
            // first_city: '河南',
            // area: '华中区域',
            // citylist: ['宁夏', '陕西', '甘肃', '青海', '新疆'],
            // first_city: '宁夏',
            // area: '西北区域',
            // citylist: ['黑龙江', '吉林', '辽宁'],
            // first_city: '黑龙江',
            // area: '东北区域',
            // citylist: ['贵州', '云南', '重庆', '四川', '西藏'],
            // first_city: '贵州',
            // area: '西南区域',
            // citylist: ['香港', '澳门', '台湾'],
            // first_city: '香港',
            // area: '其他区域',
			city_num: 0,
			city_name: '',
			node_num: 0,
		};
	},
	components: {
		remap,
	},
};
</script>
