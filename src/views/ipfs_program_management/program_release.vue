<template>
	<div class="content">
		<!-- 头部 -->
		<el-breadcrumb separator="/">
			<el-breadcrumb-item>
				<a href="/">IPFS程序发布</a>
			</el-breadcrumb-item>
		</el-breadcrumb>
		<!--  -->
		<div>
			<p class="tab_title">当前版本</p>
			<el-table
				:data="topData"
				border
				:cell-style="rowClass"
				:header-cell-style="headClass"
				style="width: 100%"
			>
				<el-table-column prop="version_number" label="版本号">
				</el-table-column>
				<el-table-column prop="description" label="版本描述">
				</el-table-column>
			</el-table>
		</div>
		<!--  -->
		<div class="tab_con">
			<el-button
				type="primary"
				class="tab_btn"
				size="small"
				@click="add_release"
				>新增发布</el-button
			>
			<!--  -->
			<el-dialog title="新增发布" :visible.sync="dialogFormVisible">
				<el-form
					:model="ruleForm"
					:rules="rules"
					ref="ruleForm"
					label-width="100px"
					class="demo-ruleForm"
				>
					<el-form-item label="节点渠道商" prop="name">
						<el-select
							v-model="ruleForm.name"
							placeholder="请选择一级渠道商"
						>
							<el-option
								label="区域一"
								value="shanghai"
							></el-option>
							<el-option
								label="区域二"
								value="beijing"
							></el-option>
						</el-select>
						<el-select
							v-model="ruleForm.name2"
							placeholder="请选择二级渠道商"
						>
							<el-option
								label="区域一"
								value="shanghai"
							></el-option>
							<el-option
								label="区域二"
								value="beijing"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="设备类型" prop="region">
						<el-select
							v-model="ruleForm.region"
							placeholder="请选择硬件设备"
						>
							<el-option
								label="区域一"
								value="shanghai"
							></el-option>
							<el-option
								label="区域二"
								value="beijing"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="硬件类型" prop="equipment_type">
						<el-select
							v-model="ruleForm.equipment_type"
							placeholder="请选择操作系统"
						>
							<el-option
								label="区域一"
								value="shanghai"
							></el-option>
							<el-option
								label="区域二"
								value="beijing"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="操作系统" prop="operating_system">
						<el-select
							v-model="ruleForm.operating_system"
							placeholder="请选择CPU架构"
						>
							<el-option
								label="区域一"
								value="shanghai"
							></el-option>
							<el-option
								label="区域二"
								value="beijing"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="发布版本" prop="version_number">
						<el-select
							v-model="ruleForm.version_number"
							placeholder="请选择发布版本"
						>
							<el-option
								label="区域一"
								value="shanghai"
							></el-option>
							<el-option
								label="区域二"
								value="beijing"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="发布描述" prop="release_description">
						<el-input
							type="textarea"
							placeholder="0/100"
							:autosize="{ minRows: 2, maxRows: 2 }"
							v-model="ruleForm.release_description"
						></el-input>
					</el-form-item>
					<el-form-item label="发布节点" prop="release_node">
						<el-radio-group v-model="ruleForm.release_node">
							<el-radio label="1" border>所有节点</el-radio>
							<el-radio label="2" border>指定节点</el-radio>
						</el-radio-group>
					</el-form-item>
                    <el-form-item prop="desc" v-show="ruleForm.release_node == 2">
						<el-input
							style="margin-top:20px;"
							type="textarea"
							:rows="2"
							placeholder="请输入节点ID，多个逗号分隔"
							v-model="ruleForm.desc"
						>
						</el-input>
                    </el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="resetForm('ruleForm')">取 消</el-button>
					<el-button type="primary" @click="submitForm('ruleForm')"
						>确 定</el-button
					>
				</div>
			</el-dialog>

			<!--  -->

			<el-table
				:data="conData"
				border
				:cell-style="rowClass"
				:header-cell-style="headClass"
				style="width: 100%"
			>
				<el-table-column prop="id" label="ID"> </el-table-column>
				<el-table-column prop="release_time" label="发布时间">
				</el-table-column>
				<el-table-column prop="version_number" label="版本号">
				</el-table-column>
				<el-table-column
					prop="first_level_channel_dealer"
					label="节点一级渠道商"
				>
				</el-table-column>
				<el-table-column
					prop="secondary_channel_distributor"
					label="节点二级渠道商"
				>
				</el-table-column>
				<el-table-column prop="equipment_type" label="设备类型">
				</el-table-column>
				<el-table-column prop="hardware_type" label="硬件类型">
				</el-table-column>
				<el-table-column prop="operating_system" label="操作系统">
				</el-table-column>
				<el-table-column prop="release_description" label="发布描述">
				</el-table-column>
				<el-table-column label="节点发布清单">
					<template slot-scope="scope">
						<el-button
							@click.native.prevent="
								deleteRow(scope.$index, conData)
							"
							type="text"
							size="small"
						>
							清单
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<fenye
				style="text-align: right;margin: 20px 0px 10px;"
				@fatherMethod="getpage"
				@fathernum="gettol"
				:pagesa="totalCnt"
				:currentPage="currentPage"
				v-if="conData.length > 0"
			></fenye>
		</div>
	</div>
</template>

<script>
import fenye from '@/components/cloudfenye';
export default {
	data() {
		return {
			currentPage: 1,
			pageNo: 1,
			pageSize: 10,
			totalCnt: 1,
			dialogFormVisible: false,
			topData: [
				{
					version_number: '10.0.0.231',
					description: '版本发布时间为2020-06-16',
				},
			],
			conData: [
				{
					id: 1,
					release_time: '2020-06-09 10:15:16',
					version_number: '1.0.0.32',
					first_level_channel_dealer: '云链',
					secondary_channel_distributor: '西柚机',
					equipment_type: 'POC电脑',
					hardware_type: 'x86_32',
					operating_system: 'linux',
					release_description: '新增节点适配程序……',
				},
				{
					id: 2,
					release_time: '2020-06-16 10:15:16',
					version_number: '1.0.0.33',
					first_level_channel_dealer: '西柚机',
					secondary_channel_distributor: '--',
					equipment_type: '硬盘盒子',
					hardware_type: 'arm64',
					operating_system: 'andriod',
					release_description: '—',
				},
			],
			ruleForm: {
                name: '',
                name2:"",
				region: '',
				equipment_type: '',
				operating_system: '',
				version_number: "",
				release_description: "",
				release_node: '1',
				desc: '',
			},
			rules: {
				name: [
					{
						required: true,
						message: '请选择渠道商',
						trigger: 'change',
					},
				],
				region: [
					{
						required: true,
						message: '请选择设备类型',
						trigger: 'change',
					},
				],
				equipment_type: [
					{
						required: true,
						message: '请选择硬件类型',
						trigger: 'change',
					},
				],
				operating_system: [
					{
						required: true,
						message: '请选择操作系统',
						trigger: 'change',
					},
				],
				version_number: [
					{
						required: true,
						message: '请选择发布版本',
						trigger: 'change',
					},
				],
				release_description: [
					{
						required: true,
						message: '请输入发布描述',
						trigger: 'blur',
					},
				],
				release_node: [
					{
						required: true,
						message: '请选择发布节点',
						trigger: 'change',
					},
				],
			},
		};
	},
	methods: {
		gettablist() {},
		deleteRow(index, rows) {
			console.log(rows);
		},
		add_release() {
			this.dialogFormVisible = true;
		},
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.dialogFormVisible = false;
					alert('submit!');
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
			this.dialogFormVisible = false;
		},
		//获取页码
		getpage(pages) {
			this.pageNo = pages;
			this.gettablist();
		},
		//获取每页数量
		gettol(pagetol) {
			this.pagesize = pagetol;
			// this.gettab();
		},
		// 表头样式设置
		headClass() {
			return 'text-align: center;background:#eef1f670;';
		},
		// 表格样式设置
		rowClass() {
			return 'text-align: center;';
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
	.tab_title {
		margin-top: 20px;
		margin-bottom: 20px;
	}
	.tab_con {
		margin-top: 20px;
		.tab_btn {
			margin-bottom: 20px;
		}
	}
}
</style>
