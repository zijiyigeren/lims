<template>
    <div class="wrap">
      <div class="search">
        <span class="elDropdown">
          <el-dropdown>
            <span class="el-dropdown-link">
              通用查询<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>任务下达</el-dropdown-item>
              <el-dropdown-item>测验</el-dropdown-item>
              <el-dropdown-item>天津</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </span>
        <span class="inputdiv">
           <el-input
            placeholder="请输入内容"
            suffix-icon="el-icon-search"
            v-model="input">
          </el-input>
        </span>
        <ul class="search-ul">
          最近的搜索：
          <li v-for="(item,ind) in searchUlList" :key="ind">
            {{item}}
          </li>
        </ul>
      </div>
      <div class="commonModule">
        <span class="commonModule-title">
            <i class="commonModule-i"></i>
            常用模块
        </span>
        <ul class="commonModule-ul">
          <li class="" v-for="(item,ind) in ulList" :key="ind">
            <img :src="item.img">
            {{item.name}}
          </li>
        </ul>
      </div>
      <div class="recentlyUnfold">
        <span class="recentlyUnfold-title">
            <i class="recentlyUnfold-i"></i>
            最近打开
        </span>
        <div class="recentlyUnfold-tableDiv">
          <div class="recentlyUnfold-operation">
            <ul class="recentlyUnfold-operation-list">
              <li v-for="(item,ind) in operationList" :key="ind">
                <i :class="item.icon"></i>
                {{item.name}}
              </li>
            </ul>
            <ul class="recentlyUnfold-chooseList-list">
              <li v-for="(item,ind) in chooseList" :key="ind">
                <i :class="item.icon"></i>
                {{item.name}}
              </li>
            </ul>
          </div>
          <div class="recentlyUnfold-table">
            <el-table
              ref="multipleTable"
              :data="tableData"
              @selection-change="handleSelectionChange"
              border
            >
              <el-table-column
                type="selection"
                align="center"
                width="50%">
              </el-table-column>
              <el-table-column
                prop="name"
                label="名称"
                align="left"
                >
              </el-table-column>
              <el-table-column
                prop="date"
                label="时间"
                align="left"
                width="400%">
              </el-table-column>
              <el-table-column
                prop="collect"
                label="收藏"
                align="left"
                width="200%">
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import HomePageItem from './item'
export default {
    name: '',
    components:{
        HomePageItem
    },
    data() {
        return {
          input: '',
          searchUlList: ['任务下达','测验','天津'],
          ulList: [
            {
              'img': require('@/assets/img/renwuxiada.png'),
              'name': '任务下达'
            },{
              'img': require('@/assets/img/renwu-3.png'),
              'name': '我的任务'
            },{
              'img': require('@/assets/img/weibiaoti--.png'),
              'name': '任务草稿'
            },{
              'img': require('@/assets/img/fenpei-2.png'),
              'name': '任务分配'
            },{
              'img': require('@/assets/img/bianji-5.png'),
              'name': '报告编辑'
            },{
              'img': require('@/assets/img/baogao.png'),
              'name': '我的报告'
            },{
              'img': require('@/assets/img/xiaoyanliebiao.png'),
              'name': '报告校验'
            },{
              'img': require('@/assets/img/shenhe-2.png'),
              'name': '报告审核'
            },{
              'img': require('@/assets/img/pizhun-3.png'),
              'name': '报告批准'
            },{
              'img': require('@/assets/img/gengduo-2.png'),
              'name': '更多'
            }
          ],
          tableData: [
            {
              date: '2018/12/26至2019/01/03',
              name: '新能源车热力学性能测验',
              collect: '*'
            }, {
              date: '2018/12/26',
              name: '设备借用：test00123',
              collect: '*'
            }, {
              date: '2018/12/26',
              name: 'S19316-1073',
              collect: '*'
            }, {
              date: '2018/12/26',
              name: 'WT0018-201804',
              collect: '*'
            }, {
              date: '2018/12/26',
              name: '试验报告：Q/JLS J54X10228-2019',
              collect: '*'
            }, {
              date: '2018/12/26',
              name: 'GE325-zxx5-PR2 -110新能源车热力学性能试验等',
              collect: '*'
            }, {
              date: '2018/12/26',
              name: '新能源车热力学性能试验',
              collect: '*'
            }
          ],
          operationList: [
            {
              'icon': 'el-icon-view',
              'name': '查看'
            },{
              'icon': 'el-icon-edit-outline',
              'name': '编辑'
            },{
              'icon': 'el-icon-delete',
              'name': '删除'
            },{
              'icon': 'el-icon-download',
              'name': '下载'
            },{
              'icon': 'el-icon-position',
              'name': '发送'
            },{
              'icon': 'el-icon-printer',
              'name': '打印'
            },{
              'icon': 'el-icon-coordinate',
              'name': '审批'
            },{
              'icon': 'el-icon-position',
              'name': '转办'
            },{
              'icon': 'el-icon-back',
              'name': '回退'
            }
          ],
          chooseList: [
            {
              'icon': 'el-icon-back',
              'name': '全部选择'
            },{
              'icon': 'el-icon-back',
              'name': '全部取消'
            },{
              'icon': 'el-icon-back',
              'name': '反向选择'
            }
          ],
          HomePageDataList:123
        }
    },
    mounted() {
        this._getProductList();
    },
    methods: {
        onUpdate() {

        },
        _getProductList(){ // 请求数据

        },
        handleSelectionChange(){

        }
    }
}
</script>

<style lang="scss" scoped>
* {
    margin: 0;
    padding: 0;
    list-style: none;
    box-sizing: border-box;
    font-size: 14px;
}

.wrap {
    width: 100%;
    height: 100%;
    overflow: scroll;
}

.wrap {
    background: #eee;
    padding: 10px;
    display: flex;
    flex-direction: column;
}

.search {
    display: flex;
    align-items: center;
}

.elDropdown {
    width: 118px;
    height: 36px;
    overflow: hidden;
    background: #fff;
    margin-right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.inputdiv {
    width: 368px;
    height: 36px;
    background: #fff;
}

.el-input--suffix, .el-input__inner {
    width: 100%;
    height: 100%;
}

.search-ul {
    display: flex;
    align-items: center;
    margin-left: 57px;
}

.search-ul li {
    height: 35px;
    line-height: 35px;
    margin-left: 9px;
    padding-left: 20px;
    padding-right: 20px;
    background: rgba(246,246,246,1);
}

.commonModule {
    width: 100%;
    height: 193px;
    background: #fff;
    margin-top: 10px;
}

.commonModule-title {
    font-size: 16px;
    height: 36px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ddd;
}

.commonModule-i {
    display: block;
    width:3px;
    height:14px;
    background:linear-gradient(0deg,rgba(96,135,254,1),rgba(84,183,235,1));
    margin-left: 10px;
    margin-right: 11px;
}

.commonModule-ul {
    display: flex;
    justify-content: space-around;
    height: 156px;
    padding-top: 32px;
    padding-bottom: 32px;
}

.commonModule-ul li {
    width:104px;
    height:94px;
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 16px 0px rgba(199,151,249,0.21);
    border-radius:2px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.commonModule-ul li:hover {
    width:104px;
    height:94px;
    background: url(../../assets/img/圆角矩形36.png) no-repeat 50%;
    border: 1px dashed #000;
}

.commonModule-ul li:first-child{
    background: url(../../assets/img/background.png) no-repeat;
}

.commonModule-ul li img {
    display: block;
    width: 34px;
    height: 34px;
    margin-bottom: 10px;
    border: 1px dashed #000;
}

.recentlyUnfold {
    flex: 1;
    background: #fff;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
}

.recentlyUnfold-title {
    font-size: 16px;
    height: 36px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ddd;
}

.recentlyUnfold-i {
    display: block;
    width:3px;
    height:14px;
    background:linear-gradient(0deg,rgba(96,135,254,1),rgba(84,183,235,1));
    margin-left: 10px;
    margin-right: 11px;
}

.recentlyUnfold-tableDiv {
    flex: 1;
    padding-top: 14px;
    padding-left: 10px;
    padding-right: 10px;
    display: flex;
    flex-direction: column;
}
.recentlyUnfold-table {
  flex: 1;
  overflow-y: auto;
}
.el-table__header-wrapper .el-table td, .el-table th.is-leaf {
    background-color: rgba(243,246,253,1);
}

.recentlyUnfold-operation {
    margin-bottom: 14px;
    display: flex;
    justify-content: space-between;
}
.recentlyUnfold-operation-list {
    display: flex;
}
.recentlyUnfold-operation-list li{
    margin-right: 20px;
    width: 64px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(224,224,224,1);
    border-radius: 2px;
    font-weight:400;
    color:rgba(135,135,135,1);
    line-height: 30px;
}

.recentlyUnfold-operation-list li:hover{
    color: #32AFF0;
    border:1px solid rgba(50,175,240,1);
}

.recentlyUnfold-operation-list li i{
    display: block;
    width: 18px;
    height: 18px;
    background: #eee;
    margin-right: 4px;
    font-size: 18px;
}

.recentlyUnfold-chooseList-list {
    display: flex;
}

.recentlyUnfold-chooseList-list li{
    margin-left: 20px;
    width: 96px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(224,224,224,1);
    border-radius: 2px;
    font-weight:400;
    color:rgba(135,135,135,1);
    line-height: 30px;
}

.recentlyUnfold-chooseList-list li:hover{
    color: #32AFF0;
    border:1px solid rgba(50,175,240,1);
}

.recentlyUnfold-chooseList-list li i{
    display: block;
    width: 18px;
    height: 18px;
    background: #eee;
    margin-right: 4px;
    font-size: 18px;
}
</style>
