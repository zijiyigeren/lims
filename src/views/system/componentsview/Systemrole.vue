<template>
  <!-- 系统角色管理 -->
  <div class="searchWrap">
    <div class="wrap">
      <el-form :inline="true" size="small"
               class="demo-form-inline">
        <div style="display: flex;align-items: center;width: calc(100% - 55px);">
          <el-form-item label="角色名称 :" style="width: 19%">
            <el-input v-model.trim="roleVo.rolename"></el-input>
          </el-form-item>
          <el-form-item label="角色编号 :" style="width: 19%">
            <el-input v-model.trim="roleVo.rolecode"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="findList" class="querySelt">查询</el-button>
          </el-form-item>
        </div>
      </el-form>
      <el-row class="btnGroup">
        <el-button type="primary" @click="open(1)">新增</el-button>
        <el-button type="primary" @click="open(2)">修改</el-button>
        <el-button type="primary" @click="deleteRole">删除</el-button>
        <el-button type="primary" class="pull-right" @click="exportRole">导出</el-button>
      </el-row>
      <div style="flex: 1;overflow: auto;">
        <el-table
          :header-cell-style="{background:'#F3F6FD'}"
          ref="multipleTable"
          :data="roleList"
          border
          style=""
          @select-all="dialogCheck"
          @select="dialogCheck"
        >
          <el-table-column type="selection" align="center" :resizable="false"></el-table-column>
          <el-table-column prop="rolename" label="角色名称" align="center" :resizable="false"></el-table-column>
          <el-table-column prop="rolecode" label="角色编号" align="center" :resizable="false"></el-table-column>
          <el-table-column prop="orderby" label="序号" align="center" :resizable="false"></el-table-column>
        </el-table>
      </div>
    </div>

    <!-- 新增/修改弹框 -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible" width="30%">
      <el-form :rules="rules" :model="form" label-width="80px" ref="roleForm">
        <el-form-item label="角色名称" prop="rolename">
          <el-input placeholder="角色名称" v-model="form.rolename"></el-input>
        </el-form-item>
        <el-form-item label="角色编号" prop="rolecode">
          <el-input placeholder="角色编号" v-model="form.rolecode"></el-input>
        </el-form-item>
        <el-form-item label="序号" prop="orderby">
          <el-input placeholder="序号" v-model.number="form.orderby" maxlength="4"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="save('roleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import base from '@/api/base.js'

  export default {
    data() {
      return {
        roleList: [],
        roleVo: {
          rolename: "",
          rolecode: ""
        },
        dialogFormVisible: false,
        form: {
          id: "",
          rolename: "",
          rolecode: "",
          orderby: ""
        },
        title: "",
        selectioned: [],
        rules: {
          rolename: [
            {required: true, message: '请输入角色名称', trigger: 'blur'},
            {min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur'}
          ],
          rolecode: [
            {required: true, message: '请输入角色编号', trigger: 'blur'},
            {min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur'}
          ],
          orderby: [
            {required: true, message: '请输入序号', trigger: 'blur'},
            {type: 'number', message: '序号需输入整数值', trigger: 'blur'}
          ]
        }
      };
    },
    created() {
      // 获取角色列表
      this.findList();
    },
    methods: {
      findList() {
        this.$api.role.getRoleList(this.roleVo).then(resp => {
          this.roleList = resp.data.data;
        }).catch((error) => {
          this.$message.error(error.data.message);
        });
      },
      open(type) {
        if (type === 1) {
          this.title = "新增角色";
          this.form.id = "";
          this.form.rolename = "";
          this.form.rolecode = "";
          this.form.orderby = "";
        } else {
          this.title = "修改角色";
          if (this.selectioned.length === 1) {
            this.form.id = this.selectioned[0].id;
            this.form.rolename = this.selectioned[0].rolename;
            this.form.rolecode = this.selectioned[0].rolecode;
            this.form.orderby = this.selectioned[0].orderby;
          } else if (this.selectioned.length === 0) {
            return this.$message({
              message: "请选择要修改的角色！",
              type: "warning"
            });
          } else {
            return this.$message({
              message: "只能选择一项进行修改！",
              type: "warning"
            });
          }
        }
        this.selectioned = [];
        this.dialogFormVisible = true;
        this.$refs.roleForm.clearValidate();  //不清除实际作用
      },
      save(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.form.id) {
              this.$api.role.editRole(this.form).then(resp => {
                this.$message({
                  message: resp.data.data,
                  type: "success"
                });
                this.findList();
              }).catch((error) => {
                this.$message.error(error.data.message);
              });
            } else {
              this.$api.role.addRole(this.form).then(resp => {
                this.$message({
                  message: resp.data.data,
                  type: "success"
                });
                this.findList();
              }).catch((error) => {
                this.$message.error(error.data.message);
              });
            }
            this.dialogFormVisible = false;
          } else {
            this.dialogFormVisible = true;
            return false;
          }
        });
      },

      deleteRole: function () {
        if (this.selectioned.length === 1) {
          this.form.id = this.selectioned[0].id;
          this.form.rolename = this.selectioned[0].rolename;
          this.form.rolecode = this.selectioned[0].rolecode;
          this.form.orderby = this.selectioned[0].orderby;
        } else if (this.selectioned.length === 0) {
          return this.$message({
            message: "请选择要删除的角色！",
            type: "warning"
          });
        }
        var ids = [];
        for (var i = 0; i < this.selectioned.length; i++) {
          ids.push(this.selectioned[i].id);
        }
        this.$confirm("是否确认删除所选角色？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.$api.role.deleteRole(ids).then(resp => {
            this.$message({
              message: resp.data.data,
              type: "success"
            });
            this.findList();
            this.selectioned = [];
          }).catch((error) => {
            this.$message.error(error.data.message);
          });
        }).catch(() => {
        });
      },

      // 导出
      exportRole: function () {
        var a = document.createElement("a");
        a.href = `${base.hanlei}/roleManagement/exportRole`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      },

      /**
       *    单选操作，全选按钮失效操作
       */
      dialogCheck: function (selection, row) {

        this.selectioned = selection;
      }
    }
  };
</script>
<style lang="scss" scoped>
  .searchWrap {
    width: 100%;
    height: 100%;
    padding: 10px;
    background: #eee;

    .el-button--primary {
      height: 30px;
      padding: 0 20px;
      min-width: 68px;
      background: linear-gradient(90deg, rgb(96, 157, 248), rgb(84, 183, 235));;
    }
  }

  .wrap {
    background: #fff;
    padding: 20px;
    display: flex;
    flex-direction: column;
    height: 100%;

    .demo-form-inline{
      margin-bottom: 20px;
    }

    .el-form-item{
      margin: 0;
    }
  }

  .pull-right {
    float: right;
  }

  .btnGroup {
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #e6e6e6;
  }

  .dialog-footer {
    text-align: center;
  }

  .el-message-box__btns {
    text-align: center;
  }
  .querySelt{ margin-left: 1vw}
</style>
