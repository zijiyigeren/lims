<template>
    <div class="inspection">
        <div class="inspection_left">
            <template>
                    <el-select v-model="value1"  placeholder="全部" style="margin-left:10px;margin-bottom:5px;" class="section">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select
                        v-model="value2"
                        collapse-tags
                        placeholder="启用">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    </template>
                <el-tree :data="data"  :props="defaultProps" @node-click="handleNodeClick" style="margin-top:47px;" :render-content="renderContent"></el-tree>
        </div>
        <div class="inspection_right">
            <div class="btn_l">
                <div>
                    <el-row>
                        <el-button  size="medium" icon="el-icon-plus" >新建</el-button>
                        <el-button  size="medium" icon="el-icon-delete" style="width:100px;">批量删除</el-button>
                        <el-button  size="medium" icon="el-icon-set-up">导出</el-button>
                        <el-button  size="medium" icon="el-icon-document-remove">粘贴</el-button>
                    </el-row>
                </div>
                <div>
                    <p>项目代码: <b>VM</b> indexID: <b>6911</b> 项目名额: <b>阻车器实验</b></p>
                </div>
            </div>
            <el-table
                    :data="tableData"
                    border
                    :header-cell-style="{background:'#F3F6FE'}"
                    >
                    <el-table-column
                        type="selection"
                        >
                        </el-table-column>
                    <el-table-column
                    prop="project_code"
                    label="项目代码">
                    </el-table-column>
                    <el-table-column
                    prop="indexId"
                    label="indexId">
                    </el-table-column>
                    <el-table-column
                    prop="project_name"
                    label="项目名称"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="experimental_project"
                    label="实验项目">
                    </el-table-column>
                    <el-table-column
                    prop="inspection_basis"
                    label="检验依据">
                    </el-table-column>
                    <el-table-column
                    prop="inspection_department"
                    label="检验科室">
                    </el-table-column>
                    <el-table-column
                    prop="best_number"
                    label="极品数量">
                    </el-table-column>
                    <el-table-column
                    prop="cover_logo"
                    label="封面标识">
                    </el-table-column>
                    <el-table-column
                    prop="charge"
                    label="收费"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="state"
                    label="状态"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="operation"
                    label="操作"
                    width="280%"
                    >
                        <template slot-scope="scope">
                            <el-button type="text" @click="handleEditor(scope.$index, scope.row)" size="mini" >编辑</el-button>
                            <el-button type="text" @click="handleView(scope.$index, scope.row)" size="mini" style="color:#000;">查看</el-button>
                            <el-button type="text" @click="handleDelete(scope.$index, scope.row)" size="mini" style="color:red;">删除</el-button>
                            <el-button type="text" @click="handleCopy(scope.$index, scope.row)" size="mini" style="color:#000;">复制</el-button>
                            <el-button type="text" @click="handlePour(scope.$index, scope.row)" size="mini" style="color:#000;">倒入</el-button>
                            <el-button type="text" @click="handleParameter(scope.$index, scope.row)" size="mini" style="color:#000;">报告参数</el-button>
                        </template>
                    </el-table-column>
                </el-table>
        </div>
    </div>
</template>
<script>
export default {
  props: {

  },
  components: {

  },
  data () {
    return {
      tableData: [{
        project_code: '',
        indexId: '333',
        project_name: '13232',
        experimental_project: '66666',
        inspection_basis: '1',
        inspection_department: '',
        best_number: '',
        cover_logo: '',
        charge: '',
        state: '',
        operation: ''
      }],
      treeData: [{
        id: 1,
        label: 'group',
        className: 'group-class tree-icon',
        children: [{
          id: 11,
          label: 'child',
          className: 'child-class tree-icon'
        }]
      }],
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value1: '',
      value2: '',
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      data: [{
        id: 1,
        label: '一级 2',
        children: [{
          id: 3,
          label: '二级 2-1',
          children: [{
            id: 4,
            label: '三级 3-1-1'
          }, {
            id: 5,
            label: '三级 3-1-2',
            disabled: true
          }]
        }, {
          id: 2,
          label: '二级 2-2',
          disabled: true,
          children: [{
            id: 6,
            label: '三级 3-2-1'
          }, {
            id: 7,
            label: '三级 3-2-2',
            disabled: true
          }]
        }]
      }]
    }
  },
  computed: {

  },
  methods: {
    handleNodeClick () {

    },
    handleEditor () {

    },
    handleView () {

    },
    handleDelete () {

    },
    handleCopy () {

    },
    handlePour () {

    },
    handleParameter () {

    },
    renderContent (h, { node, data, store }) {
      return (
        <span>
          <i class={this.treeData.className}></i>
          <span>{node.label}</span>
        </span>
      )
    }
  },
  created () {

  },
  mounted () {

  }
}
</script>
<style scoped lang="">
.inspection{
    width: 100%;
    height: 100%;
    display: flex;
}
.inspection_left{
    width:230px;
    /* height:648px; */
    height: 100%;
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 16px 0px rgba(180,180,180,0.21);
    border-radius:2px;
    margin-right: 10px;
    padding: 10px 0;
}
.inspection_right{
    flex:1;
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 16px 0px rgba(180,180,180,0.21);
    border-radius:2px;
    padding: 0 10px;
    box-sizing: border-box;
}
.inspection_left .el-select{
    width:45%;
    height:36px;
    background:rgb(109, 85, 85);
    /* border:1px solid rgba(232,232,232,1); */
    border-radius:2px;
  }
  .btn_l{
      width: 100%;
      height: 100%;
  }
  .btn_l{
      width: 100%;
      height: 50px;
      line-height: 50px;
      background: #fff;
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
  }
  .btn_l button{
      width:64px;
      height:30px;
      text-align:center;
      line-height: 30px;
      background: none;
      border: 1px solid #ccc;
      padding:0 5px;
  }
</style>
