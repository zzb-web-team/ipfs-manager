<template>
	<div class="content">
		<!-- 头部 -->
		<el-breadcrumb separator="/">
			<el-breadcrumb-item>
				<a href="/">IPFS程序包管理</a>
			</el-breadcrumb-item>
		</el-breadcrumb>
		<!--  -->
		<div class="tab_con">
			<el-button
				type="primary"
				class="tab_btn"
				size="small"
				@click="add_release"
				>上传程序包</el-button
			>
			<el-button
				type="primary"
				class="tab_btn"
				size="small"
				@click="go_release"
				>新增发布</el-button
			>
			<!--  -->
			<el-table
				:data="conData"
				border
				:cell-style="rowClass"
				:header-cell-style="headClass"
				style="width: 100%"
			>
				<el-table-column prop="name" label="包名"> </el-table-column>
				<el-table-column prop="file_size" label="文件大小">
				</el-table-column>
				<el-table-column prop="md5" label="md5"> </el-table-column>
				<el-table-column prop="hashid" label="hashid">
				</el-table-column>
				<el-table-column prop="version_number" label="版本号">
				</el-table-column>
				<el-table-column prop="file_description" label="文件描述">
				</el-table-column>
				<el-table-column prop="upload_time" label="上传时间">
				</el-table-column>
				<el-table-column prop="change_time" label="修改时间">
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button
							@click.native.prevent="
								updateRow(scope.$index, conData)
							"
							type="text"
							size="small"
						>
							修改
						</el-button>
						<el-button
							@click.native.prevent="
								deleteRow(scope.$index, conData)
							"
							type="text"
							size="small"
						>
							删除
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

		<el-dialog title="上传程序包" :visible.sync="dialogFormVisible"  :close-on-click-modal="false">
			<el-form
				:model="ruleForm"
				ref="ruleForm"
				label-width="100px"
				class="demo-ruleForm"
			>
				<el-form-item label="程序包：">
					<input
						id="f"
						ref="test"
						class="choose-input"
						type="file"
						name="file"
					/>
					<el-button
						size="mini"
						type="primary"
						class="onchoose-file"
						@click="upFile()"
						><i class="el-icon-upload2"></i></el-button
					>
					<div
						v-show="uploadType"
						style="width: 100%;height: 16px;background-color: #999;margin-top:10px;"
					>
						<div
							style="height: 16px;background-color: #67c23a"
							id="loading"
							v-bind:style="{ width: widthData + '%' }"
						></div>
					</div>
					<div class="uploadInfo" v-show="uploadType">
						<p>包名:{{ uploadForm.name }}</p>
						<p>文件大小:{{ uploadForm.size }}</p>
						<p>MD5:{{ uploadForm.md5 }}</p>
						<p>文件哈希:{{ uploadForm.hashid }}</p>
						<p>包版本:{{ uploadForm.version }}</p>
						<p>包地址:{{ uploadForm.url }}</p>
					</div>
					<div
						id="result"
						style="margin-top:10px;"
						v-show="uploadType"
					></div>
				</el-form-item>
				<el-form-item label="版本描述：" prop="desc">
					<el-input
						type="textarea"
						v-model="ruleForm.desc"
					></el-input>
				</el-form-item>
			</el-form>

			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="submitForm('ruleForm')"
					>确 定</el-button
				>
				<el-button @click="resetForm('ruleForm')">取 消</el-button>
			</div>
		</el-dialog>
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
			ruleForm: {
				resource: '',
				desc: '',
			},
			conData: [
				{
					name: 'node_c1_1.0.22.zip',
					file_size: '50MB',
					md5: '4c286c9e25162b4a6b84fa2391101e21',
					hashid: 'hashid',
					version_number: '1.0.22',
					file_description: '--',
					upload_time: '2020-06-15 10:36:11',
					change_time: '2020-06-16 10:36:11',
					release_description: '新增节点适配程序……',
				},
			],
			disableStatus: false,
			uploadType: false,
			uploadForm: {},
			widthData: 0,
		};
	},
	methods: {
		add_release() {
			this.dialogFormVisible = true;
		},
		go_release() {
			this.$router.push({ path: '/program_release' });
		},
		gettablist() {},
		updateRow(num, data) {},
		deleteRow(num, data) {},
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					alert('submit!');
					this.dialogFormVisible = false;
				} else {
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
		upFile() {
			let _this = this;

			var file = document.getElementById('f');
			var f = file.files[0];
			if (f == undefined) {
				this.$message({
					type: 'warning',
					message: '请选择要上传的文件',
				});
				return false;
			}
			this.disableStatus = true;
			var totalSize = f.size;
			if (totalSize == 0) {
				this.$message({
					message: '请选择文件SIZE大于0文件',
					type: 'success',
				});
				return false;
			}
			var len = 2 * 1024 * 1024;
			var tota_temp = Math.ceil(totalSize / len);
			var start = 0;
			var end = start + len;
			var index = 1;

			var blobSlice =
				File.prototype.mozSlice ||
				File.prototype.webkitSlice ||
				File.prototype.slice;

			var fileReader = new FileReader();

			function sliceandpost() {
				//if (start >= totalSize)return;
				//if (index >= tota_temp)return;

				var temp = f.slice(start, end);
				var formData = new FormData();
				formData.append('file', temp);
				formData.append('fileName', f.name);
				formData.append('num', index);
				formData.append('start', start);
				formData.append('end', end);
				formData.append('totalSize', totalSize);
				formData.append('total', tota_temp);
				var url = 'http://zzb.onezen.net' + '/admin/uploadzip';
				var xhr = new XMLHttpRequest();
				xhr.onreadystatechange = onchange;
				xhr.open('POST', url);
				xhr.send(formData);

				function onchange() {
					// 4 = "loaded"
					if (xhr.readyState == 4) {
						// 200 = "OK"
						if (xhr.status == 200) {
							//var headers =  JSON.parse(xhr.responseText);
							var headers = JSON.parse(xhr.response);
							//分片上传成功
							if (headers.status == 0) {
								index = index + 1;
								// 改变下一次截取的位置
								start = end;
								end = start + len;
								// 因为截取可能超过totalSize，判断最后一次截取是否大于totalSize如果大于就直接让end等于totalSize
								if (end > totalSize) {
									end = totalSize;
								}
								_this.widthData = Math.floor(
									(index / tota_temp) * 100
								);
								_this.perNum = Math.floor(
									(index / tota_temp) * 100
								);
								// document.getElementById("loading").style.width = Math.floor(index / tota_temp * 100) + "%";
								// document.getElementById('per').innerHTML = Math.floor(index / tota_temp * 100)
								sliceandpost();
							} else if (headers.status == 1) {
								_this.widthData = 100;
								_this.perNum = 100;
								document.getElementById('result').innerHTML =
									'上传成功:' + headers.msg;
								_this.sdkUrl = headers.url;
								//_this.dialog = false
								// _this.queryInfo()
								_this.uploadForm = headers;
								_this.uploadType = true;
								_this.disableStatus = false;
							} else if (headers.status == -900) {
								_this.$message({
									message: `${headers.msg}`,
									type: 'error',
								});
							}
						} else {
							alert(
								'Problem retrieving XML data:' + xhr.statusText
							);
						}
					}
				}
			}
			sliceandpost();
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
	.tab_con {
		margin-top: 20px;
		.tab_btn {
			margin-bottom: 20px;
		}
	}
}
</style>
