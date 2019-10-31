<template>
  <div :class="file.path===str?'active':''" @click.stop="activeColr(file.path)" class="crumbs" :title="file.title">
    <span style="cursor:default">{{file.title}}</span>
    <i @click.stop="del(file)">×</i>
  </div>
</template>

<script>
  export default {
    props: ['str', 'file'],
    methods: {
      del(obj) {
        let curName = obj.name;
        if (window.sessionStorage.getItem('includePageNames')) {
          let allNames = window.sessionStorage.getItem('includePageNames').split(",")
          allNames.forEach((item, index) => {
            if (item == curName) {
              allNames.splice(index, 1);
            }
          });
          window.sessionStorage.setItem("includePageNames", allNames)
        }
        this.$emit('dels', obj)
      },
      activeColr(path) {
        this.$emit('activeColrs', path)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .crumbs {
    height: 100%;
    line-height: 40px;
    padding: 0 10px;
    border-left: 1px solid rgba(0, 0, 0, 0.1);
    white-space: nowrap;
    font-family: 'Arial Normal', 'Arial';
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
    display: flex;
    display: -webkit-flex;
    /*align-items: center;*/
    /*text-overflow: ellipsis;*/
    /*white-space: nowrap;*/
    overflow: hidden;
    span {
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    i {
      margin-left: 10px;
      height: auto;
      font-style: normal;
      font-size: 18px;
      cursor: pointer;
    }
  }

  .crumbs:last-child {
    border-right: 1px solid rgba(0, 0, 0, 0.1);
  }

  .crumbs.active {
    background: linear-gradient(90deg, rgba(96, 157, 248, 1), rgba(84, 183, 235, 1));

    span {
      color: #fff;
    }

    i {
      color: #fff;
    }
  }
</style>
