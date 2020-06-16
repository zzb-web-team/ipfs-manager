<template>
	<div class="content">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item>
				<a>节点数据监控</a>
			</el-breadcrumb-item>
		</el-breadcrumb>
		<!--  -->
		<div style="margin-top:10px;">
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-row :gutter="20">
					<el-col :span="2"
						><el-input
							v-model="searchdata.input"
							placeholder="请输入节点ID"
							prefix-icon="el-icon-search"
						></el-input
					></el-col>
					<el-col :span="2"
						><el-select
							v-model="searchdata.region1"
							placeholder="请选择一级渠道"
							><el-option label="全部" value="*"></el-option
							><el-option
								label="区域二"
								value="beijing"
							></el-option></el-select
					></el-col>
					<el-col :span="2"
						><el-select
							v-model="searchdata.region2"
							placeholder="请选择二级渠道"
						>
							<el-option label="全部" value="*"></el-option>
							<el-option
								label="区域二"
								value="beijing"
							></el-option> </el-select
					></el-col>
					<el-col :span="2"
						><el-select
							v-model="searchdata.region3"
							placeholder="请选设备类型"
						>
							<el-option label="全部" value="*"></el-option>
							<el-option
								label="区域二"
								value="beijing"
							></el-option> </el-select
					></el-col>
					<el-col :span="2" v-show="seacr_yin_show"
						><el-select
							v-model="searchdata.region6"
							placeholder="请选择设备类型"
						>
							<el-option label="全部" value="*"></el-option>
							<el-option
								label="区域二"
								value="beijing"
							></el-option> </el-select
					></el-col>
					<el-col :span="2" v-show="seacr_yin_show"
						><el-select
							v-model="searchdata.region6"
							placeholder="请选择硬件类型"
						>
							<el-option label="全部" value="*"></el-option>
							<el-option
								label="区域二"
								value="beijing"
							></el-option> </el-select
					></el-col>
					<el-col :span="2"
						><el-select
							v-model="searchdata.region4"
							placeholder="请选择区域"
						>
							<el-option label="全部" value="*"></el-option>
							<el-option
								label="区域二"
								value="beijing"
							></el-option> </el-select
					></el-col>
					<el-col :span="2"
						><el-select
							v-model="searchdata.region5"
							placeholder="请选择城市"
						>
							<el-option label="全部" value="*"></el-option>
							<el-option
								label="区域二"
								value="beijing"
							></el-option> </el-select
					></el-col>
					<el-col :span="2"
						><el-select
							v-model="searchdata.region6"
							placeholder="请选择运营商"
						>
							<el-option label="全部" value="*"></el-option>
							<el-option
								label="区域二"
								value="beijing"
							></el-option> </el-select
					></el-col>

					<el-col :span="5">
						<el-radio-group
							v-model="searchdata.radio"
							@change="set_time"
						>
							<el-radio-button label="1">今天</el-radio-button>
							<el-radio-button label="2">昨天</el-radio-button>
							<el-radio-button label="3">近7天</el-radio-button>
							<el-radio-button label="4">近30天</el-radio-button>
							<el-radio-button label="5">自定义</el-radio-button>
						</el-radio-group>
					</el-col>
					<el-date-picker
						v-show="show_time"
						v-model="searchdata.value1"
						type="datetimerange"
						range-separator="至"
						start-placeholder="开始日期"
						end-placeholder="结束日期"
					>
					</el-date-picker>
				</el-row>

				<el-tab-pane label="带宽" name="first">
					<el-row>
						<el-col :span="18" class="top_title"
							><div >
								<p>50.00Mbps/60.25Mbps</p>
								<p>节点带宽峰值（上/下行）</p>
							</div>
							<div>
								<p>26.37Mbps/30.25Mbps</p>
								<p>节点带宽平均值（上/下行）</p>
							</div></el-col
						>
					</el-row>
				</el-tab-pane>
				<el-tab-pane label="存储空间" name="second">
                    <el-row>
						<el-col :span="18" class="top_title"
							><div >
								<p>320GB</p>
								<p>节点可用存储空间</p>
							</div>
							<div>
								<p>530GB</p>
								<p>节点总存储空间</p>
							</div></el-col
						>
					</el-row>
                </el-tab-pane>
				<el-tab-pane label="节点质量" name="third">
                     <el-row>
						<el-col :span="18" class="top_title top_title_third"
							><div >
								<p>30ms</p>
								<p>平均值</p>
							</div>
							<div>
								<p>35ms</p>
								<p>最大值</p>
							</div>
                            <div>
								<p>10ms</p>
								<p>35ms</p>
							</div></el-col
						>
					</el-row>
                </el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			activeName: 'first',
			searchdata: {
				input: '',
				region1: '',
				region2: '',
				region3: '',
				region4: '',
				region5: '',
				region6: '',
				region7: '',
				region8: '',
				radio: '1',
				value1: '',
			},
			show_time: false,
			seacr_yin_show: false,
		};
	},
	methods: {
		handleClick(tab, event) {
			console.log(tab, event);
			if (this.activeName == 'third') {
				this.seacr_yin_show = true;
			} else {
				this.seacr_yin_show = false;
			}
		},
		set_time() {
			console.log(this.searchdata.radio);
			if (this.searchdata.radio == '5') {
				this.show_time = true;
			} else {
				this.show_time = false;
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.content {
	text-align: left;
    .top_title{
        border: 1px solid #000000;
        height: 150px;
        margin-top: 20px;margin-bottom: 20px;
        padding: 20px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-around;
        div{
            width: 50%;
            text-align: center;
            p:nth-child(1){
                margin-top: 26px;
                font-size: 38px;
            }
            p:nth-child(2){
                font-size: 14px;
                line-height: 30px;
            }
        }
        div:nth-child(1){
            border-right: 1px solid #000000;
        }
    }
    .top_title_third{
        div{
            width: 33%;
        }
        div:nth-child(2){
            border-right: 1px solid #000000;
        }
    }
}
</style>
