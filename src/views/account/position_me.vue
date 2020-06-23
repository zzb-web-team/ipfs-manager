<template>
	<div class="content">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item>
				<a href="/">职位管理</a>
			</el-breadcrumb-item>
		</el-breadcrumb>
		<!--  -->
		<div class="org_con">
			<div class="btn_area">
				<el-button type="primary" @click="nwisible">新建职位</el-button>
			</div>
            <!--  -->
            <!-- 新建部门弹窗 -->
			<el-dialog
				title="新建职位"
				:visible.sync="dialogFormVisible"
				width="650px"
				class="posi_dialog"
			>	<el-col :span="19" :offset="4">
				<el-form :model="form" ref="firstruleForm">
					<el-form-item
						label="职位"
						prop="nuname"
						:rules="[{ validator: jioname, trigger: 'blur' }]"
					>
						<el-col :span="11">
							<el-input
								v-model="form.nuname"
								autocomplete="off"
							></el-input>
						</el-col>
					</el-form-item>
					<p>
							4-20字符，英文字母、汉字、数字组合，可为纯英文、汉字、数字
						</p>
				</el-form>
                </el-col>
				<div
					slot="footer"
					class="dialog-footer"
					style="text-align:center;"
				>
					<el-button @click="resetForm('firstruleForm')"
						>取 消</el-button
					>
					<el-button
						type="primary"
						@click="firstsubmitForm('firstruleForm')"
						>确 定</el-button
					>
				</div>
			</el-dialog>
            <!--  -->
			<el-table
				ref="multipleTable"
				:data="tableData"
				tooltip-effect="dark"
				style="width: 100%"
				border
				:cell-style="rowClass"
				:header-cell-style="headClass"
				@selection-change="handleSelectionChange"
			>
				<el-table-column type="selection"> </el-table-column>
				<el-table-column label="ID">
					<template slot-scope="scope">{{ scope.row.id }}</template>
				</el-table-column>
				<el-table-column prop="position" label="职位">
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button
							@click="handleClick(scope.row)"
							type="text"
							size="small"
							>修改</el-button
						>
						<el-button
							@click.native.prevent="
								deleteRow(scope.$index, tableData)
							"
							type="text"
							size="small"
							>删除</el-button
						>
					</template>
				</el-table-column>
			</el-table>
			<div class="btn_area">
				<el-button type="primary">删除</el-button>
				<fenye
					style="float:right;margin:10px 0 0 0;"
					@fatherMethod="getpage"
					@fathernum="gettol"
					:pagesa="total_cnt"
					:currentPage="currentPage"
				></fenye>
			</div>
		</div>
	</div>
</template>

<script>
import fenye from '@/components/fenye';
export default {
	data() {
		return {
			pagesize: 10,
			total_cnt: 1,
            currentPage: 0,
            dialogFormVisible:false,
			tableData: [
				{
					id: '1',
					position: 'AI组',
					
				},
				{
					id: '2',
					position: '大数据组',
				},
            ],
            form:{
                nuname:''
            }
		};
	},
	methods: {
        //新建下级部门
		nwisible() {
			this.dialogFormVisible = true;
		},
		//新建部门--确定
		firstsubmitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.dialogFormVisible = false;
				} else {
					return false;
				}
			});
		},
		//弹窗-取消
		resetForm(formName) {
			this.$refs[formName].resetFields();
			this.dialogFormVisible = false;
		},
		// 全选
		handleSelectionChange(val) {
			this.multipleSelection = val;
		},
		handleClick(data) {
            console.log(data);
            this.form.nuname=data.position;
            this.dialogFormVisible=true;
		},
		deleteRow(num, arr) {
			console.log(num, arr);
		},
		//获取页码
		getpage(pages) {
			this.tolpage = pages;
			//this.getdata();
		},
		//获取每页数量
		gettol(pagetol) {
			this.pagesize = pagetol;
			//this.getdata();
		},
		// 表头样式设置
		headClass() {
			return 'text-align: center;background:#eef1f6;';
		},
		// 表格样式设置
		rowClass() {
			return 'text-align: center;';
        },
        //校验格式
		jioname(rule, value, callback) {
			if (value === '') {
				callback(new Error('职位名称不能为空'));
			} else {
				var fsdtel = /^[\u4e00-\u9fa50-9a-zA-Z]{4,20}$/;
				if (fsdtel.test(value) === false) {
					callback(new Error('职位名称格式错误'));
				} else {
					callback();
				}
			}
		},
	},
	components: {
		fenye,
	},
};
</script>

<style lang="scss" scoped>
.content {
	text-align: left;
	.org_con {
		margin-top: 20px;
		margin-bottom: 20px;
		.btn_area {
			margin-top: 20px;
			margin-bottom: 20px;
		}
	}
}
</style>
