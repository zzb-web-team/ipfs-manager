<template>
  <div class="content">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/">用户列表</a>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div>
      <!-- 搜索 -->
      <div class="seach">
        <div class="seach_top">
          <el-input
            placeholder="请输入内容"
            v-model="input"
            class="input-with-select"
            
          >
            <i slot="prefix" class="el-input__icon el-icon-search" @click="seachuser()"></i>
          </el-input>
          <div class="seach_top_right" @click="option_display()">
            筛选
            <i
              class="el-icon-caret-bottom"
              :class="[rotate?'fa fa-arrow-down go':'fa fa-arrow-down aa']"
            ></i>
          </div>
        </div>
        <div v-if="optiondisplay" class="seach_bottom">
          <span>状态：</span>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="(item, index) in options"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <div class="seach_bottom_btn">
            <el-button type="primary" plain size="mini" @click="seachuser()">确定</el-button>
            <el-button plain size="mini" @click="reset()">重置</el-button>
          </div>
        </div>
      </div>
      <!-- 表格 -->
      <div class="con_lable">
        <div style="padding:10px;">
          <el-button type="primary" @click="new_btn">
            新建
            <span class="el-icon-circle-plus-outline"></span>
          </el-button>
        </div>
        <!-- 弹窗 -->
        <el-dialog title="添加用户"  :close-on-click-modal="false" :visible.sync="dialogFormVisible" custom-class="customWidth">
          <!-- <el-form :model="form" :rules="nw_rules" ref="nw_ruleForm"> -->
          <el-form :model="form" ref="nw_ruleForm">
            <el-form-item label="使用状态" :label-width="formLabelWidth" prop="radio">
              <el-radio v-model="radio" label="1">启用</el-radio>
              <el-radio v-model="radio" label="2">禁用</el-radio>
            </el-form-item>
            <el-form-item label="账   号:" :label-width="formLabelWidth" prop="account">
              <el-input
                v-model="form.account"
                placeholder="请输入账号(以字母开头的4-20个字母数字组合)"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <!-- <el-form-item label="用 户 名:" :label-width="formLabelWidth" prop="nickname">
              <el-input v-model="form.nickname" placeholder="请输入用户名" autocomplete="off"></el-input>
            </el-form-item>-->
            <el-form-item label="设置密码:" :label-width="formLabelWidth" prop="pwd">
              <el-input
                v-model="form.pwd"
                placeholder="请设置密码(4-20个字母数字和_组合，不能为纯数字)"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="确认密码:" :label-width="formLabelWidth" prop="conpwd">
              <el-input v-model="form.conpwd" placeholder="请再次输入密码" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="真实姓名:" :label-width="formLabelWidth" prop="actualname">
              <el-input v-model="form.actualname" placeholder="请输入真实姓名" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="联系方式:" :label-width="formLabelWidth" prop="tel">
              <el-input v-model="form.tel" maxlength="11" placeholder="请输入有效手机号" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>

          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibles">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisiblea">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 表格 -->
        <el-table
          ref="multipleTable"
          :data="tableData"
          height="650"
          tooltip-effect="dark"
          style="width: 100%"
          :cell-style="rowClass"
          :header-cell-style="headClass"
          :default-sort="{prop: 'date', order: 'descending'}"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="status" label="状态" width="120"></el-table-column>
          <el-table-column prop="nickname" label="账号"></el-table-column>
          <!-- <el-table-column prop="nickname" label="用户名"></el-table-column> -->
          <el-table-column prop="time_create" label="创建时间"></el-table-column>
          <el-table-column prop="time_update" sortable label="修改时间"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <div v-if="scope.row.status!=='禁用'">
                <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
                <el-button type="text" size="small" @click="updatauser(scope.row)">修改</el-button>
                <el-button type="text" size="small" @click="pwdwetout(scope.row)">密码重置</el-button>
                <el-button type="text" size="small" @click="disableuser()" style="color:orange;">禁用</el-button>
                <el-button type="text" size="small" @click="deleateuser()" style="color:red;">删除</el-button>
              </div>
              <div v-else>
                <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
                <el-button type="text" size="small" @click="updatauser(scope.row)">修改</el-button>
                <el-button type="text" size="small" @click="pwdwetout(scope.row)">密码重置</el-button>
                <el-button type="text" size="small" @click="enableuser()" style="color:green;">启用</el-button>
                <el-button type="text" size="small" @click="deleateuser()" style="color:red;">删除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <!-- 详情弹窗 -->
        <el-dialog title="添加用户"  :close-on-click-modal="false" :visible.sync="dialog" custom-class="customWidth">
          <el-form :model="details">
            <el-form-item label="使用状态" :label-width="formLabelWidth">
              <el-radio v-model="radioes" label="1" :disabled="true">启用</el-radio>
              <el-radio v-model="radioes" label="2" :disabled="true">禁用</el-radio>
            </el-form-item>
            <el-form-item label="账号" :label-width="formLabelWidth">
              <el-input
                v-model="details.nickname"
                :disabled="true"
                placeholder="请输入账号"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="真实姓名" :label-width="formLabelWidth">
              <el-input
                v-model="details.username"
                :disabled="true"
                placeholder="请输入真实姓名"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="联系方式" :label-width="formLabelWidth">
              <el-input
                v-model="details.phone"
                maxlength="11"
                :disabled="true"
                placeholder="请输入有效手机号"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialog=false">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 修改弹窗 -->
        <el-dialog title="添加用户"  :close-on-click-modal="false" :visible.sync="dialupdata" custom-class="customWidth">
          <el-form :model="uetails">
            <el-form-item label="使用状态" :label-width="formLabelWidth">
              <el-radio v-model="sadioes" label="1">启用</el-radio>
              <el-radio v-model="sadioes" label="2">禁用</el-radio>
            </el-form-item>
            <el-form-item label="账号" :label-width="formLabelWidth">
              <el-input
                v-model="uetails.account"
                placeholder="请输入账号(以字母开头的4-20个字母数字组合)"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <!-- <el-form-item label="用户名" :label-width="formLabelWidth">
              <el-input v-model="uetails.nickname" placeholder="请输入用户名" autocomplete="off"></el-input>
            </el-form-item>-->
            <el-form-item label="真实姓名" :label-width="formLabelWidth">
              <el-input v-model="uetails.actualname" placeholder="请输入真实姓名" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="联系方式" :label-width="formLabelWidth">
              <el-input
                v-model="uetails.tel"
                maxlength="11"
                placeholder="请输入有效手机号"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="updataa()">取 消</el-button>
            <el-button type="primary" @click="updatab()">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 密码重置 -->
        <el-dialog title="密码重置"  :close-on-click-modal="false" :visible.sync="dialpwdset" custom-class="customWidth">
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="账号" prop="name">
              <el-input v-model.number="ruleForm.account" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <div style="text-align:right;">
              <el-form-item>
                <el-button @click="resetForm('ruleForm')">取消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
              </el-form-item>
            </div>
          </el-form>
        </el-dialog>
        <!-- 按钮 -->
        <div
          style="margin-top: 20px;display: flex;justify-content: space-between;align-items: center;"
        >
          <div>
            <el-button @click="enableuser()" type="success">启用</el-button>
            <el-button @click="disableuser()" type="warning">禁用</el-button>
            <el-button @click="deleateuser()" type="danger">删除</el-button>
          </div>
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
  </div>
</template>

<script>
import fenye from "@/components/fenye";
import { userlist } from "../../servers/api";
export default {
  data() {
    //重置密码
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    //新建用户
    var validate_radio = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请选择账户状态"));
      } else {
        callback();
      }
    };
    var validate_account = (rule, value, callback) => {
      let das = /^[a-zA-Z][a-zA-Z0-9]{3,20}$/;

      if (value === "") {
        callback(new Error("账号不能为空"));
      } else {
        if (das.test(value) === false) {
          callback(new Error("账号格式错误"));
        } else {
          callback();
        }
      }
    };
    var pwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码不能为空"));
      } else {
        var fsdf = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/;
        if (fsdf.test(value) === false) {
          callback(new Error("账号格式错误"));
        } else if (Number.isInteger(value)) {
          callback(new Error("不能为纯数字"));
        } else {
          if (this.nw_ruleForm.conpwd !== "") {
            this.$refs.nw_ruleForm.validateField("conpwd");
          }
          callback();
        }
      }
    };
    var conpwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.pwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      currentPage:1,
      ruleForm: {
        
        pass: "",
        checkPass: "",
        account: ""
      },
      //重置密码校验
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        
      },
      //新建校验
      // nw_rules: {
      //   radio: [{ validator: validate_radio, trigger: "blur" }],
      //   account: [{ validator: validate_account, trigger: "blur" }],
      //   pwd: [{ validator: validate_pwd, trigger: "blur" }],
      //   conpwd: [{ validator: validate_conpwd, trigger: "blur" }],
      //   actualname: [{ validator: validate_actualname, trigger: "blur" }],
      //   tel: [{ validator: validate_tel, trigger: "blur" }]
      // },
      input: "", //搜索输入框
      dialogFormVisible: false,
      dialog: false,
      dialupdata: false,
      dialpwdset: false,
      radio: "1",
      radioes: "1",
      isIndeterminate: "",
      sadioes: 1,
      pagesize: 10,
      total_cnt: 1,
      form: {
        account: "",
        nickname: "",
        pwd: "",
        conpwd: "",
        actualname: "",
        tel: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      details: {},
      uetails: {},
      formLabelWidth: "60px",
      optiondisplay: false,
      rotate: false,
      gridData: [],
      tolpage: 1,
      options: [
        {
          value: 0,
          label: "启用"
        },
        {
          value: 1,
          label: "禁用"
        }
      ],
      value: "",
      pager: {
        count: 0,
        page: 1,
        rows: 100
      },
      tableData: [
        {
          id: "012",
          radio: "启用",
          account: "admin",
          nickname: "哈哈",
          actualname: "普陀区",
          tel: 13501201248,
          updatatime: "2019/11/05",
          updataname: "admin"
        }
      ]
    };
  },
  components: {
    fenye
  },
  created() {},
  mounted() {
    this.getuserlist();
  },
  methods: {
    //获取用户列表
    getuserlist() {
      let params = new Object();
      params.page = this.pager.page - 1;
      params.search = this.input;
      params.status = parseInt(this.value);
      userlist(params)
        .then(res => {
          if (res.status != 0) {
            this.$message({
              message: `${res.err_msg}`,
              type: "error"
            });
          } else {
            if (res.result.page == 0) {
              this.pager.count =
                res.result.cols.length * (res.result.page + 1) +
                res.result.les_count;
            } else {
              this.pager.count =
                10 +
                res.result.cols.length * res.result.page +
                res.result.les_count;
            }
            let nowArr = res.result.cols;
            for (var i = 0; i < nowArr.length; i++) {
              nowArr[i].time_create = this.common.getTimes(
                parseInt(nowArr[i].time_create * 1000)
              );
              nowArr[i].time_update = this.common.getTimes(
                parseInt(nowArr[i].time_update * 1000)
              );
              if (nowArr[i].status == 0) {
                nowArr[i].status = "启用";
              } else {
                nowArr[i].status = "禁用";
              }
            }
            this.tableData = nowArr;
          }
        })
        .catch(err => {
        });
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
    //回车事件
    onSubmit() {
    },
    //筛选按钮
    option_display() {
      this.optiondisplay = !this.optiondisplay;
      this.rotate = !this.rotate;
    },
    //确定搜索
    seachuser() {
      this.optiondisplay = false;
      this.value = "";
      this.input = "";
    },
    //重置
    reset() {
      this.value = "";
      this.input = "";
    },
    //新建
    new_btn() {
      this.dialogFormVisible = true;
    },
    //新建取消
    dialogFormVisibles() {
      this.radio = "1";
      this.form.account = "";
      this.form.nickname = "";
      this.form.pwd = "";
      this.form.conpwd = "";
      this.form.actualname = "";
      this.form.tel = "";
      this.dialogFormVisible = false;
    },
    //新建确定
    dialogFormVisiblea() {
      this.form.name = "";
      this.form.region = "";
      this.dialogFormVisible = false;
    },
    //表格查看
    handleClick(row) {
      if (row.radio == "启用") {
        this.sadioes = "1";
      } else {
        this.sadioes = "2";
      }
      this.details = row;
      this.dialog = true;
    },
    // 全选
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //表格修改
    updatauser(row) {
      if (row.radio == "启用") {
        this.radioes = "1";
      } else {
        this.radioes = "2";
      }
      this.uetails = row;
      this.dialupdata = true;
    },
    //表格修改取消
    updataa() {
      this.uetails = {};
      this.dialupdata = false;
    },
    //表格修改确认
    updatab() {
      this.uetails = {};
      this.dialupdata = false;
    },
    //密码重置
    pwdwetout(row) {
      this.ruleForm.account = row.account;
      this.dialpwdset = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$message({
            message: "密码重置成功",
            type: "success"
          });
          this.dialpwdset = false;
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dialpwdset = false;
    },
    // 禁用
    disableuser() {
      this.$confirm("禁用后该用户不能登陆, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "操作成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    //启用
    enableuser() {},
    // 删除
    deleateuser() {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }, 
    // 表头样式设置
    headClass() {
      return "text-align: center;background:#eeeeee;";
    },
    // 表格样式设置
    rowClass() {
      return "text-align: center;";
    }
  }
};
</script>

<style lang="scss" scoped>
.customWidth {
  width: 30% !important;
}
.content {
  width: 100%;
  height: 100%;
  text-align: left;
  .seach {
    width: 100%;
    margin-top: 20px;
    .seach_top {
      width: 100%;
      height: 60px;
      .input-with-select {
        width: 15%;
        float: left;
      }
      .seach_top_right {
        float: left;
        height: 40px;
        line-height: 40px;
        margin-left: 10px;
      }
    }
    .seach_bottom {
      text-align: left;
      height: 100px;
    //   background: #f0f5f5;
      border-radius: 10px;
      padding: 10px 15px;
      .el-select {
        width: 150px;
      }
      .seach_bottom_btn {
        margin: 10px 10px;
      }
    }
  }
  .con_lable {
    width: 100%;
  }
}
//旋转
.aa {
  transition: all 1s;
}
.go {
  transform: rotate(-180deg);
  transition: all 1s;
}
</style>