<template>
    <div class="sample">
       <p class="sample_p">样品信息</p>
       <el-form ref="form" :model="form"  label-width="auto">
           <div class="sample_qi">
               <div class="sample_formA">
                    <el-form-item label="受检单位 :" prop="region">
                        <el-select v-model="form.region" placeholder="请选择送检单位" style="width:224px;height:24px;">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="生产日期 :">
                        <el-input v-model="form.productionDate" placeholder="请输入" style="width:224px;"></el-input>
                    </el-form-item>
                    <el-form-item label="受检单位电话 :" placeholder="请输入">
                        <el-input v-model="form.phone" style="width:224px;" ></el-input>
                    </el-form-item>
            </div>
            <div class="sample_formB">
                <el-form-item label="送检日期 :">
                    <el-input v-model="form.inspectionDate" placeholder="请输入" style="width:224px;" ></el-input>
                </el-form-item>
                <el-form-item label="规格型号 :">
                        <el-select v-model="form.model" placeholder="请选择规格型号" style="width:224px;">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                </el-form-item>
                <el-form-item label="受检单位委托人 :" placeholder="请输入">
                    <el-input v-model="form.principal" style="width:224px;" ></el-input>
                </el-form-item>
            </div>
            <div class="sample_formC">
                <el-form-item label="商标 :">
                        <el-input v-model="form.name" style="width:365px;"  placeholder="请输入"></el-input>
                    </el-form-item>
                <el-form-item label="检验备注 :">
                    <el-select v-model="form.Inspection_note" style="width:365px;" placeholder="请选择检验备注">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="生产单位 :" placeholder="请输入" >
                    <el-input v-model="form.unit" style="width:365px;"></el-input>
                </el-form-item>
            </div>
           </div>
            <el-form-item label="备注 :" placeholder="请输入" style="width:100%;">
                <el-input v-model="form.note" style="width:630px;"></el-input>
            </el-form-item>
            <el-form-item label="发动机类型：" prop="resource" placeholder="请输入">
                <el-radio-group v-model="form.resource">
                    <el-radio label="汽油发动机"></el-radio>
                    <el-radio label="柴油发动机"></el-radio>
                    <el-radio label="两用燃料发动机"></el-radio>
                    <el-radio label="LPG"></el-radio>
                    <el-radio label="EPG"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="样品来源 :" prop="resources" style="width:100%;">
                <el-radio-group v-model="form.resources">
                    <el-radio label="送场"></el-radio>
                    <el-radio label="抽样"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="数量 :" >
                <el-input v-model="form.numbers" ></el-input>
            </el-form-item>
            <el-form-item label="申报性质" prop="declare" style="width:100%;">
                <el-radio-group v-model="form.declare">
                    <el-radio label="新产品"></el-radio>
                    <el-radio label="拓展/勘误"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="样品处理意见 :" prop="declare" style="width:100%;">
                <el-radio-group v-model="form.declare">
                    <el-radio label="退回"></el-radio>
                    <el-radio label="留样"></el-radio>
                    <el-radio label="无害处理"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="制造单位 :" style="width:100%;">
                <el-input v-model="form.manufacturing" style="width:650px;" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="制造单位地址 :" style="width:100%;">
                <el-input v-model="form.address" style="width:650px;" placeholder="请输入"></el-input>
            </el-form-item>
       </el-form>
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
      form: {
        name: '',
        region: '',
        productionDate: '',
        inspectionDate: '',
        model: '',
        Inspection_note: '',
        phone: '',
        principal: '',
        unit: '',
        note: '',
        radio: '5',
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        resources: [
          { required: true, message: '请选择活源', trigger: 'change' }
        ],
        numbers: '',
        declare: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        manufacturing: '',
        address: ''
      }
    }
  },
  computed: {

  },
  methods: {

  },
  created () {

  },
  mounted () {

  }
}
</script>
<style scoped lang="scss">
    .sample{
        width:100%;
        overflow: hidden;
    }
    .sample_p{
        width: 100%;
        height: 50px;
        color: #32AFF0;
        /* padding: 0 10px; */
        line-height: 50px;
    }
    .sample .el-form-item{
        margin-left: 80px;
    }
    .sample_qi{
        width: 100%;
        display: flex;
    }
    .sample_formA{
        width: 30%;
        display: flex;
        flex-direction: column;
        // alignContent:flex-end;
    }
    .sample_formB{
        width: 31%;
        
    }
    .sample_formC{
        flex: 1;
    }
</style>
