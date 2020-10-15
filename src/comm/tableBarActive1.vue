<template>
	<el-table
		border
		:data="tableData"
		:id="ipfs_id"
		ref="table"
		style="width: 100%"
		@selection-change="handleSelectionChange"
		@select="selectCheckBox"
		@select-all="selectAll"
		:cell-style="rowClass"
		:header-cell-style="headClass"
		id="rebateSetTable"
		@sort-change="tableSortChange"
	>
		<el-table-column
			type="selection"
			width="55"
			:selectable="checkboxT"
			v-if="clomnSelection"
		></el-table-column>
		<el-table-column
			v-for="(item, index) in rowHeader"
			:key="index"
			:prop="item.prop"
			:label="item.label"
			:width="item.width"
			:sortable="item.sortable"
		></el-table-column>
		<el-table-column :label="tableOption.label">
			<template slot-scope="scope">
				<!-- <el-button @click="detail(scope.row)" size="mini">详情</el-button> -->
				<el-button
					@click="toChange(scope.row)"
					size="mini"
					type="text"
					v-show="obnj.roleU == 1"
					>修改</el-button
				>

				<el-button
					v-show="obnj.roleU == 1"
					@click="disable(scope.row)"
					type="text"
					size="mini"
					v-if="scope.row.status == '禁用'"
					:disabled="
						scope.row.id == ipfs_id || scope.row.id == 1
							? true
							: false
					"
					>启用</el-button
				>
				<el-button
					v-show="obnj.roleU == 1"
					@click="disable(scope.row)"
					type="text"
					size="mini"
					v-else
					style="color:#FF9E28"
					:disabled="
						scope.row.id == ipfs_id || scope.row.id == 1
							? true
							: false
					"
					>禁用</el-button
				>
				<el-button
					v-show="obnj.roleU == 1"
					@click="changePassword(scope.row)"
					size="mini"
					type="text"
					>重置密码</el-button
				>
				<el-button
					v-show="obnj.roleD == 1"
					@click="toDelete(scope.row)"
					type="text"
					size="mini"
					style="color:#F85555"
					:disabled="
						scope.row.id == ipfs_id || scope.row.id == 1
							? true
							: false
					"
					>删除</el-button
				>
			</template>
		</el-table-column>
	</el-table>
</template>

<script>
export default {
	props: {
		rowHeader: {
			type: Array,
			default: () => {},
		},
		tableData: {
			type: Array,
			default: () => {},
		},
		tableOption: {
			type: Object,
			default: () => {},
		},
		clomnSelection: {
			type: Boolean,
			default: () => {},
		},
		reserveselection: {
			type: Boolean,
			default: () => {},
		},
		ipfs_id: {
			type: Number,
			default: () => {},
		},
		obnj: {
			type: Object,
			default: () => {},
		},
	},
	data() {
		return {};
	},
	mounted: function() {},
	methods: {
		tableSortChange(val) {
			this.$emit('tableSortChange', val);
		},
		clearSelection() {
			this.$refs.table.clearSelection();
		},
		toggleRowSelection(a, b) {
			this.$refs.table.toggleRowSelection(a, b);
		},

		disable(val) {
			this.$emit('disable', val);
		},
		detail(val) {
			this.$emit('detail', val);
		},
		toChange(val) {
			this.$emit('toChange', val);
		},
		changePassword(val) {
			this.$emit('changePassword', val);
		},

		toDelete(val) {
			this.$emit('toDelete', val);
		},

		handleSelectionChange(val) {
			//  this.multipleSelection = val;
			this.$emit('handleSelectionChange', val);
		},
		selectCheckBox(a, b) {
			//  this.multipleSelection = val;
			this.$emit('selectCheckBox', { a, b });
		},
		selectAll(a) {
			//  this.multipleSelection = val;
			this.$emit('selectAll', a);
		},
		// 表头样式设置
		headClass() {
			return 'text-align: center;background:#eeeeee;';
		},
		// 表格样式设置
		rowClass() {
			return 'text-align: center;';
		},
		checkboxT(row, rowIndex) {
			if (row.id == this.ipfs_id || row.id == 1) {
				//if(row.lie =='1'){
				return false; //禁用
			} else {
				return true; //不禁用
			}
		},
	},
};
</script>

<style lang="less">
.el-table {
	font-size: 12px;
}

.el-table th.gutter {
	display: table-cell !important;
}
</style>
