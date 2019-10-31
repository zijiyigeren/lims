<template>
  <section>
    <div class="commonModule">
      <ul class="commonModule-ul">
        <li @mouseover="changeActive(ind)" @mouseout="removeActive(ind)"
            v-for="(item,ind) in ulList" :key="ind"
            v-if="power.includes(item.myRouter)"
            @click="goRouter(item.myRouter,ind)">
          <img :src="item.img">
          {{item.name}}
        </li>
      </ul>
    </div>
  </section>
</template>
<script>
  import ulList from './modulesData';

  export default {
    name: 'common',
    data() {
      return {
        power: [],// ['...','...']
        list: [],// [{...},{...}]
        ulList: ulList,
      }
    },
    methods: {
      getUsualMenu() {
        this.$api.systemPublicationpage.getUsualMenu().then(res => {
          if (res.data.ok && res.data.data && res.data.data.length != 0) {
            res.data.data.forEach((item) => {
              this.power.push(item.name);
            });
            this.list = res.data.data;
          } else {
            this.$message.error({message: '当前用户没有常用模块权限'})
          }
        }).catch(err => {
          console.log(err);
          this.$message.error({message: err.data.message})
        })
      },
      changeActive(e) {
        this.ulList.forEach(imgID => {
          if (e === imgID.index) {
            imgID.img2 = imgID.img;
            imgID.img = imgID.imgWhite;
          }
        })
      },
      removeActive(e) {
        this.ulList.forEach(imgID => {
          if (e === imgID.index) {
            imgID.img = imgID.img2;
          }
        })
      },
      /*
      * 功能: 缓存页面
      * 作者: liangxiaotong
      * */
      setFn(routerName) {
        let curName = routerName;
        if (window.sessionStorage.getItem('includePageNames')) {
          let allNames = window.sessionStorage.getItem('includePageNames').split(",");
          allNames.forEach((item, index) => {
            if (item == curName) {
              allNames.splice(index, 1);
            }
          });
          allNames.push(curName);
          window.sessionStorage.setItem("includePageNames", allNames)
        }
      },
      goRouter(routerName, e) {
        this.setFn(routerName);

        this.ulList.forEach(imgID => {
          if (e == imgID.index) {
            imgID.img = imgID.img2
          }
        });

        this.list.forEach((item) => {
          if (routerName == item.name) {
            this.$EventBus.$emit('Crumbs', item);
          }
        });
      },
    },
    created() {
      this.getUsualMenu();
    },
    mounted() {
    },

  }
</script>
<style scoped>
  .commonModule {
    width: 100%;
    height: auto;
    background: #fff;
    /*margin-top: 10px;*/
  }

  .commonModule-ul {
    display: flex;
    justify-content: space-around;
    height: 156px;
    padding: 32px 0;
  }

  .commonModule-ul li {
    width: 104px;
    height: 94px;
    background: rgb(255, 255, 255);
    box-shadow: 0 0 16px 0 rgba(199, 151, 249, 0.21);
    border-radius: 2px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .commonModule-ul li:hover {
    width: 104px;
    height: 94px;
    background: url(../../../../assets/img/backColor.png) no-repeat 50%;
    box-shadow: 0 0 16px 0 rgb(212, 212, 212);
    color: #fff;
  }

  .commonModule-ul li img {
    display: block;
    width: 34px;
    height: 34px;
    margin-bottom: 10px;
  }

</style>
