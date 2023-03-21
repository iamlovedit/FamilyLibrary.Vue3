<script lang="ts">
import IconHome from "@/components/icons/IconHome.vue";
import Header from '@/components/Header.vue'

export default {
  components: {
    IconHome, Header
  }
}
</script>

<template>
  <Header></Header>
  <div class="mainContainer">
    <RouterView />
  </div>
  <div class="footerContainer">
    <h5> 蜀ICP备2022029729号-1</h5>
  </div>
</template>

<style scoped>
.mainContainer {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.footerContainer {
  width: 100%;
  height: 42px;
  line-height: 42px;
  text-align: center;
  background-color: #409EFF;
}

.footerContainer h5 {
  color: white;
}
</style>
