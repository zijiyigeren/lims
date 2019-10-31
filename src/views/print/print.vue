<template>
  <iframe src="static/printTable.html" ref="iframe" class="iframe" width="100%" height="100%"></iframe>
</template>

<script>
  export default {
    name: "print",
    data() {
      return {
        resp: null,
        iframeWin: {}
      }
    },
    methods: {
      // 从 任务详情_进入
      comingIn_taskDetail() {
        var params = null;
        params = JSON.parse(window.sessionStorage.getItem('aaa111'));
        this.$api.systemPublicationpage.printxls(params).then(res => {
          this.resp = res.data.data;
        }).catch(err => {
          console.log(err, 'error in comingIn_taskDetail');
        }).then(() => {
          this.sendMessage()
        })
      },

      // 外部vue向iframe内部传数据
      sendMessage() {
        this.iframeWin.postMessage({
          msg: this.resp
        }, '*')
      },
      // handleMessage (event) {
      //   // 根据上面制定的结构来解析iframe内部发回来的数据
      //   const data = event.data
      //   switch (data.cmd) {
      //     case 'returnFormJson':
      //       // 业务逻辑
      //       console.log(event.data,1);
      //       break
      //     case 'returnHeight':
      //       // 业务逻辑
      //       console.log(event.data,2);
      //       break
      //   }
      // },
    },
    created() {
      var lzy = window.sessionStorage.getItem('lzy');
      if (lzy) {
        this.resp = JSON.parse(lzy);
        this.$nextTick(() => {
          setTimeout(() => {
            this.sendMessage();
          }, 500)
        })
      } else {
        this.comingIn_taskDetail();
      }
    },
    mounted() {
      this.iframeWin = this.$refs.iframe.contentWindow;
      // window.addEventListener('message', this.handleMessage);
    },
  }
</script>

<style scoped>
  .iframe {
    border: none;
  }
</style>
