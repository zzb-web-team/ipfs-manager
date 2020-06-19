<template>
	<div class="content">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item>
				<a href="/">账户管理</a>
			</el-breadcrumb-item>
		</el-breadcrumb>
		<!--  -->
		<div class="org_con">
			<el-button type="primary">新建部门</el-button>
			<el-button type="primary">新建下级部门</el-button>
            <el-table
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection">
    </el-table-column>
    <el-table-column
      label="日期">
      <template slot-scope="scope">{{ scope.row.date }}</template>
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      show-overflow-tooltip>
    </el-table-column>
  </el-table>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
             tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        };
	},
};
</script>

<style lang="scss" scoped>
.content {
	text-align: left;
	.org_con {
		margin-top: 20px;
		margin-bottom: 20px;
	}
}
</style>
