<template>
  <div class="rootContainer">
    <div class="headerContainer">
      <el-select v-model="selectValue" @change="onSelectedChange">
        <el-option v-for="option in orderOptions" :key="option.value" :label="option.label" :value="option.value" />
      </el-select>

      <div class="header_right">
        <el-input v-model="searchValue" placeholder="输入要搜索的节点包"/>
        <el-button type="primary">搜索</el-button>
      </div>
    </div>
    <div class="packagesContainer">

    </div>
    <PackageDetails :dyanmoPackage="currentPackage"/>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ElMessage } from 'element-plus'
import { getPackagesPageFetch } from '@/service/dynamoPackages'
import type { DynamoPackage } from '@/models/DynamoPackage'
import type { PageModel } from "@/models/PageModel";
import  PackageDetails  from "@/components/PackageDetails.vue";

interface OrderOption {
  value: string,
  label: string
}

const packages = ref<DynamoPackage[]>()
const searchValue=ref<string>('');
const currentPackage=ref<DynamoPackage>();
const orderOptions: OrderOption[] = [
  {
    value: 'downloads',
    label: '下载量'
  },
  {
    value: 'name',
    label: '名称'
  },
  {
    value: 'votes',
    label: '点赞量'
  },
  {
    value: 'updateTime',
    label: '更新时间'
  },
]
const selectValue = ref<OrderOption>(orderOptions[0])

function onSelectedChange(value:string) {

}

function getPackages(keyword: string | undefined, pageIndex: number = 1, pageSize: number = 30, orderField: string = 'downloads'): void {
  const promise = getPackagesPageFetch(keyword, pageIndex, pageSize, orderField)
  promise.
    then(response => {
      if (response.success) {
        const page: PageModel<DynamoPackage> = response.response
        packages.value = page.data;
      }
      else {
        ElMessage.error("网络请求错误!")
      }
    })
    .catch(error => {
      ElMessage.error("网络请求错误!")
    });
}

onMounted(() => {
  getPackages(undefined);
})
</script>

<style scoped>
.rootContainer {
  flex: 1;
  width: 70%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

.headerContainer {
  height: 44px;
  line-height: 44px;
  width: 100%;
  margin: 0 auto;
}

.header_right{
  float: right;
  height: inherit;
  line-height: inherit;
}

.packagesContainer {
  flex: 1;
  background-color: royalblue;
}
</style>