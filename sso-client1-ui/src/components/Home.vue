<template>
  <div>
    <el-button type="primary" v-on:click="test">显示</el-button>
    <p>client1显示结果：{{ msg }}</p>
  </div>
</template>

<script>
import { getRequest } from "../utils/api";

export default {
  name: "Home",
  data() {
    return {
      msg: "",
    };
  },
  methods: {
    test() {
      getRequest("/client1/api/test/hello").then((resp) => {
        if (resp.data.code === 200) {
          // 获取数据成功
          this.msg = resp.data.data;
        } else if (resp.data.code === 1000002) {
          // 未登录，则跳转授权地址
          console.log(resp.data.data);
          window.location.href = resp.data.data;
        } else {
          this.$message.error("失败：" + resp.data);
        }
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
