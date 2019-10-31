<template>
  <div class="bindingsd_cent">
    <!-- 顶部操作按钮 -->
    <div class="bindingsd_cent_header">
      <div class="bindingsd_cent_header_right">
        <span>项目</span>
        <el-select
          @change="selectproductValue"
          size="small"
          v-model="childValue"
          collapse-tags
          placeholder="请选择">
          <el-option
            v-for="item in numberData"
            :key="item.id"
            :label="item.itemsCode"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="bindingsd_cent_header_left">
        <el-button type="danger" size="mini" @click="fullScreen">全屏</el-button>
        <el-select
          @change="handBai"
          class="percentage"
          :allow-create="true"
          filterable
          size="small"
          v-model="percentageValue"
          collapse-tags>
          <el-option
            v-for="item in percentage"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            {{item.label}}
          </el-option>
        </el-select>
        <el-button size="mini" @click="nextReportBtn">下一份报告</el-button>
      </div>
    </div>
    <!-- 图片显示 -->
    <div class="bindingsd_cent_body" id="content">
      <div class="bindingsd_cent_body_img_item" 
          v-for="item in tableDataImg.slice((currentPage3 - 1) * pageSize1, currentPage3*pageSize1)"
          :key="item.v">
        <div class="bindingsd_centbody_imgitem_box">
          <img :src="item.url" :style="{width: imgWidth ? imgWidth : '70%',display:'block'}" class="imgClass" @click="imgBtnFun($event)">
        </div>
      </div>
      <!-- <div class="bindingsd_cent_body_img_item" 
          v-for="item in tableDataImg.slice((currentPage3 - 1) * pageSize1, currentPage3*pageSize1)"
          :key="item.v">
        <div class="bindingsd_centbody_imgitem_box">
          <img src="@/assets/images/y.jpeg" :style="{width: imgWidth ? imgWidth : '70%',display:'block'}" class="imgClass" @click="imgBtnFun($event)">
        </div>
      </div> -->
    </div>
    <!--分页器-->
    <div class="bindingsd_cent_pagination">
      <el-pagination
        @size-change="handleSizeChange1"
        @current-change="handleCurrentChange1"
        :current-page="currentPage3"
        :page-size="pageSize1"
        layout="total, prev, pager, next, jumper"
        :total="tableDataImg.length">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name:'quiickready',
  props: {
    percentage: {type: Array},
    productValue: {type: Number},
    numberData: {type: Array}, /*快查下拉框*/
    imgCountPage: {type: String}, /*图片页数*/
    tableDataImg: {type: Array},
    indexValueId: {type: Number},
    initialState: {type: Boolean}
  },
  watch: {
    productValue(value) {
      this.childValue = value;
    },
    initialState(value) {
      if(value){
        this.percentage.forEach(item => {
          if (item.label == '70%') {
            this.percentageValue = item.value
          }
        });
        this.currentPage3 = 1;
        this.imgWidth = null;
      }
    }
  },
  data() {
    return {
      currentIndex:this.productValue,
      percentageValue: '', /*选择百分比*/
      pageSize1: 2, /*快查分页*/
      currentPage3: 1, /*分页*/
      srr:[],
      childValue: this.productValue,
      fullscreen: false,
      imgWidth: null,
    }
  },
  methods: {
    //点击全屏
    fullScreen() {
      let element = document.getElementById('content');
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.webkitRequestFullScreen) {
        element.webkitRequestFullScreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
      if (typeof window.ActiveXObject !== 'undefined') {
          let wscript = new ActiveXObject('WScript.Shell')
          if (wscript !== null) {
            wscript.SendKeys('{F11}')

          }
      }
    },
    //百分比选择
    handBai(value) {
      let obj = {};
      obj = this.percentage.find((item) => {
        return item.value === value;
      });
      var percentageImg = document.getElementsByClassName('imgClass')
      this.srr = Array.from(percentageImg)
      this.srr.forEach(item => {
        item.style.width = obj.label;
        this.imgWidth = obj.label;
      })
    },
    //点击下一份报告
    nextReportBtn() {
      this.currentPage3 = 1;
      this.$emit('nextReportBtn',this.productValue);
    },
    //选择报告编号
    selectproductValue(){
      this.currentPage3 = 1;
      this.$emit('selectproductValue',this.childValue)
    },
    //点击图片翻页
    imgBtnFun(e) {
      var leftRightImg = document.getElementsByClassName('imgClass');
      var left = leftRightImg[0];
      var right = leftRightImg[1];
      var saveCurrentPage3 = this.currentPage3
      if (e.target == left) {
        if (saveCurrentPage3 == 1) {
          this.$message({type: 'info', message: "当前第一页"})
          return
        }
        saveCurrentPage3--
        this.handleCurrentChange1(saveCurrentPage3)
      }
      if (e.target == right) {
        saveCurrentPage3++
        this.handleCurrentChange1(saveCurrentPage3)
      }

    },
    // 快查翻页
    handleSizeChange1(val) {
      this.pageSize1 = val;
    },
    //快查翻页
    handleCurrentChange1(val) {
      if (val * 2 > this.imgCountPage) { 
        if ((val-1) * 2 == this.imgCountPage) { 
          this.currentPage3 = val-1;
        }else if((val-1) * 2 < this.imgCountPage){
          this.currentPage3 = val;
        }
        return this.$message({type: 'success', message: "浏览完毕"})
      }else{
        this.currentPage3 = val;
      }
    },
  },
  mounted(){
    if(this.initialState){
      this.percentage.forEach(item => {
        if (item.label == '70%') {
          this.percentageValue = item.value
        }
      });
      this.imgWidth = null;
      this.currentPage3 = 1;
    }
  },

}
</script>

<style scoped lang="less">
.bindingsd_cent {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.bindingsd_cent_header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.bindingsd_cent_body {
  flex: 1;
  overflow: hidden;
  display: flex;
}
.bindingsd_cent_body_img_item {
  width: 50%;
  height: 100%;
  overflow: hidden;
}
.bindingsd_centbody_imgitem_box {
  width: 80%;
  height: 100%;
  margin: 0 auto;
  overflow: auto;
}
.imgClass {
  margin: 0 auto;
}
.bindingsd_cent_pagination {
  margin-top: 20px;
}
</style>
