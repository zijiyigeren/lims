<template>
  <div class="cont">
    <div class="conttop">
      <div class="contleft">
        <img src="@/assets/images/login/logo.png" style="height: 25px;"/>检测认证事业部实验室管理系统
      </div>
      <div class="contcenter">
        <Aside :options="options" :active="active" @addlists="add"/>
      </div>
      <div class="contright">
        <el-button type="text" style="color:#fff;marginRight:20px;" @click="editPsw">
          <i class="el-icon-s-tools"></i>
        </el-button>
        <el-divider direction="vertical"></el-divider>
        <span class="user-name">用户：{{localName}}</span>
        <el-divider direction="vertical"></el-divider>
        <el-button type="text" style="color:#fff;marginLeft:20px;" @click="logout">
          <img src="@/assets/images/sign-out.svg" style="width:17px; height:17px"/>
        </el-button>
      </div>
    </div>
    <div class="title">
      <div class="title-content">
        <p class="hos" title="首页">
          <router-link to="/home">
            <el-button type="text" @click="iconHomePage">
              <i class="el-icon-s-home" :style="homeFlag ? 'color:#0D9AE8;': 'color:#ccc;'"></i>
            </el-button>
          </router-link>
        </p>
        <Navs
          v-for="(file,ind) in list"
          :key="ind"
          :file="file"
          :str="str"
          @dels="del"
          @activeColrs="activeColr"
        ></Navs>
      </div>
    </div>
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="30%">
      <el-form :rules="rules" :model="form" label-width="100px" ref="editForm">
        <!-- <el-form-item label="原密码" prop="oldpass">
          <el-input placeholder="原密码" v-model="form.oldpass" type="password"></el-input>
        </el-form-item>-->
        <el-form-item label="新密码" prop="newpass">
          <el-input placeholder="新密码" v-model="form.newpass" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="checkpass">
          <el-input placeholder="再次输入新密码" v-model="form.checkpass" type="password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="savePsw('editForm')">确 定</el-button>
      </div>
    </el-dialog>
    <keep-alive :include="includePageNames">
      <router-view class="showcont"/>
    </keep-alive>
  </div>
</template>
<script>
  import Router from 'vue-router'
  import routes from "@/router/index.js";
  import Aside from "@/components/Aside.vue";
  import Navs from "@/components/Navs.vue";
  import {mapState, mapActions} from 'vuex'
  import {saveToLocal} from '@/utils/local-storage'

  export default {
    data() {
      var validatePass2 = (rule, value, callback) => {
        if (value === undefined) {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.form.newpass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        options: [],
        list: JSON.parse(window.sessionStorage.getItem('crumbData')) ? JSON.parse(window.sessionStorage.getItem('crumbData')) : [],
        str: window.sessionStorage.getItem('activeName') ? window.sessionStorage.getItem('activeName') : "",
        dialogFormVisible: false,
        form: {
          newpass: "",
          checkpass: ""
        },
        rules: {
          newpass: [
            {required: true, message: '请输入新密码', trigger: 'blur'},
          ],
          checkpass: [
            {validator: validatePass2, trigger: 'blur'}
          ]
        },
        includePageNames: [], //存储导航缓存组件
        homeFlag: false,
        active: '',
        localName:''
      };
    },
    // 
    components: {
      Aside,
      Navs
    },
    computed: mapState({
      name: function (state) {
        if (state.user.name === '') {
          this.freshUserInfo();
        }
        return state.user.name
      },
    }),
    methods: {
      ...mapActions({
        userLogout: 'logout',
        freshUserInfo: 'fresh'
      }),
      add(arr) {
        this.includePageNames = window.sessionStorage.getItem('includePageNames').split(",");
        if (arr.name != 'home') {
          let flag = true;
          this.list.forEach(item => {
            if (item.name === arr.name) {
              flag = false;
            }
          });
          if (flag) {
            this.list.push(arr);
            window.sessionStorage.setItem('crumbData', JSON.stringify(this.list))
          }
          this.homeFlag = false;
          this.activeColr(arr.path)
        } else {
          this.homeFlag = true;
          this.activeColr(arr.path)
        }
        window.sessionStorage.setItem('activeName', arr.path)
      },
      del(obj) {
        this.includePageNames = window.sessionStorage.getItem('includePageNames').split(",");
        let ind = 0;
        this.list.forEach((item, index) => {
          if (obj.name === item.name) {
            ind = index;
          }
        });
        this.list.splice(ind, 1);
        window.sessionStorage.setItem('crumbData', JSON.stringify(this.list));
        let num = this.list.length;
        if (obj.path === this.$route.path) {
          if (num) {
            this.$router.push(this.list[num - 1].path);
            this.activeColr(this.list[num - 1].path)
          } else {
            this.iconHomePage();
            this.$router.push('/home')
          }
        } else {
          this.activeColr(this.$route.path)
        }
      },
      activeColr(str) {
        window.sessionStorage.setItem('activeName', str);
        this.options.forEach(item => {
          if (item.children) {
            item.children.forEach(em => {
              if (str == em.path) {
                this.active = item.path;
              }
            })
          } else {
            if (str == item.path) {
              this.active = item.path;
            }
          }
        });
        if (str == '/home') {
          this.homeFlag = true;
        } else {
          this.homeFlag = false;
        }
        this.str = str;
        if (str != this.$router.path) {
          this.$router.push(str);
          const originalPush = Router.prototype.push;
          Router.prototype.push = function push(location) {
            return originalPush.call(this, location).catch(err => err)
          }
        }
      },
      logout() {
        this.$confirm("是否确认退出系统？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.userLogout().then(() => {
            this.$router.push("/");// 为了重新实例化vue-router对象 避免bug
          }).catch(err => {
            console.log(err)
          })
        }).catch(() => {
        });
      },
      editPsw() {
        this.dialogFormVisible = true
        for (var key in this.form) {
          this.form[key] = "";
        }
        this.$refs.editForm.clearValidate();
      },
      savePsw(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$api.login.modifyPass({
              id: JSON.parse(localStorage.getItem("userInfo")).id,
              password: this.form.newpass
            }).then(resp => {
              this.$message({
                message: resp.data.data,
                type: "success"
              });
              this.findList();
            }).catch((error) => {
              this.$message.error(error.data.message);
            });
            this.dialogFormVisible = false;
          } else {
            this.dialogFormVisible = true;
            return false;
          }
        });
      },
      iconHomePage() {
        this.homeFlag = true;
        this.activeColr('/home');
      },
    },
    created() {
      this.$api.login.userMenu().then(res => {
        if (res.data.ok) {
          this.options = res.data.data;
        }
      }).catch(error => {
        this.$message.error(error.data.message);
      });
      this.options = routes.options.routes.filter(item => {
        if (!item.hidden) {
          return item;
        }
      });
      this.$api.login.pullUserInfo().then(resp => {
        saveToLocal("username", resp.data.data.name);
        saveToLocal("loginName", resp.data.data.loginName);
        saveToLocal("id", resp.data.data.id);
        this.localName = resp.data.data.name
      }).catch(error => {
        this.$message.error(error.data.message);
      });
    },
    mounted() {
      this.$EventBus.$on("Crumbs", this.add);
      if(window.sessionStorage.getItem('includePageNames')){
        this.includePageNames = window.sessionStorage.getItem('includePageNames').split(",");
      }
    }
  };
</script>
<style lang="scss" scoped>
  .el-icon-s-tools {
    font-size: 20px;
  }

  .el-button--text {
    display: flex;
    align-items: center;
  }

  .el-icon-s-home {
    font-size: 17px;
  }
</style>
