<template>
  <div id="app">
    <!-- <Layout /> -->
    <router-view/>
  </div>
</template>

<script>
  // import routes from '@/router/index.js'
  // import Aside from '@/components/Aside.vue'
  // import Navs from '@/components/Navs.vue'
  // import Password from "@/components/Password.vue";
  // import Layout from '@/laylout/Laylout.vue'
  export default {
    name: 'App'
  }

</script>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
    text-decoration: none;
    box-sizing: border-box;
    font-size: 14px;
  }

  li {
    list-style: none;
  }

  html,
  body {
    width: 100%;
    height: 100%;

  }

  #app {
    min-width: 1366px;
    height: 100%;

    display: flex;

  }

  .aside {
    width: 200px;
  }

  .showcont {
    flex: 1;
    overflow: auto;
  }

  .cont {
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 100%;

    .conttop {
      width: 100%;
      height: 50px;
      line-height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: rgb(9, 65, 98);
      font-size: 22px;
      font-weight: bold;
      color: #fff;
      padding: 0 20px;

      .contleft {
        height: 100%;
        display: flex;
        align-items: center;

        img {
          display: block;
          height: 34px;
          margin-right: 10px;
        }
      }

      .contcenter {
        height: 100%;
        overflow: hidden;
      }

      .contright {
        display: flex;
        align-items: center;

        .el-divider--vertical {
          margin: 0;
        }

        .el-divider {
          height: 25px;
          background-color: rgba(245, 245, 245, 1);
        }

        .user-name {
          margin: 0 20px;
        }

        .logoutstyle {
          margin-left: 20px;
        }
      }
    }

    .title {
      width: 100%;
      height: 40px;
      background: #fff;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      overflow: hidden;
      font-size: 14px;

      .title-content {
        width: 100%;
        height: 100%;
        display: flex;
        display: -webkit-flex;
        flex-wrap: nowrap;
        overflow: hidden;

        p.hos {
          line-height: 36px;
          padding: 0 10px;
          border: none;
        }
      }
    }
  }

  a {
    color: black;
  }

  .saveConfirm {
    max-height: 500px;
    overflow: auto !important;
  }

  .el-dialog .el-dialog__header {
    padding: 10px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    position: relative;
  }

  .divider-app {
    display: block;
    width: 3px;
    height: 16px;
    margin: 0;
    background: linear-gradient(0deg, rgba(96, 135, 254, 1), rgba(84, 183, 235, 1));
    position: absolute !important;
    top: 14px;
    left: 10px;
  }

  .el-dialog .el-dialog__header .el-dialog__title {
    margin-left: 10px;
  }

  .el-dialog .el-dialog__header .el-dialog__headerbtn {
    position: absolute;
    top: 13px;
    right: 10px;
  }

  .el-message-box .el-message-box__header {
    padding: 10px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    position: relative;
  }

  .divider-app {
    display: block;
    width: 3px;
    height: 16px;
    margin: 0;
    background: linear-gradient(0deg, rgba(96, 135, 254, 1), rgba(84, 183, 235, 1));
    position: absolute !important;
    top: 14px;
    left: 10px;
  }

  .el-dialog .el-dialog__header .el-dialog__title {
    margin-left: 10px;
  }

  .el-dialog .el-dialog__header .el-dialog__headerbtn {
    position: absolute;
    top: 13px;
    right: 10px;
  }

  .el-message-box .el-message-box__header {
    padding: 15px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    position: relative;
  }

  .divider-delete.el-divider--vertical {
    margin: 0;
  }

  .divider-delete.el-divider {
    background-color: rgb(50, 175, 240);
  }

  .divider-delete {
    width: 2px;
    height: 20px;
    position: absolute;
    top: 12px;
    left: 10px;
  }

  .el-message-box .el-message-box__header .el-message-box__headerbtn {
    position: absolute;
    top: 11px;
    right: 10px;
  }

  .el-button--primary[class*="bespoke"] {
    height: 30px !important;
    padding: 0 20px !important;
    background: linear-gradient(90deg, rgb(96, 157, 248), rgb(84, 183, 235)) !important;
    color: #fff !important;
    /*border: none !important;*/
  }

  /*.el-button--primary {*/
  /*  height: 30px;*/
  /*  background: linear-gradient(90deg, rgb(96, 157, 248), rgb(84, 183, 235));*/
  /*  border-radius: 2px;*/
  /*  padding: 0 20px;*/
  /*  box-sizing: border-box;*/
  /*  border: none;*/

  /*  &:hover {*/
  /*    height: 30px;*/
  /*    background: linear-gradient(90deg, rgb(96, 157, 248), rgb(84, 183, 235));*/
  /*    border-radius: 2px;*/
  /*    padding: 0 20px;*/
  /*    box-sizing: border-box;*/
  /*    border: none;*/
  /*  }*/
  /*}*/

  .el-button--info[class*="bespoke"] {
    height: 30px !important;
    padding: 0 20px !important;
    background: #909399 !important;
    color: #fff !important;
    /*border: none !important;*/
  }

  /*.el-button--danger {*/
  /*  height: 30px !important;*/
  /*  padding: 5px 20px !important;*/
  /*}*/

  .el-message {
    top: 55px !important;
  }
</style>
