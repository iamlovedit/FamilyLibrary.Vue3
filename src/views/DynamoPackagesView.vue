<template>
  <div class="rootContainer">
    <div class="searchContainer">
      <el-input v-model="searchInputValue" placeholder="输入要搜索的节点包">
        <template #append>
          <el-button @click="onSearchClick">
            搜索
          </el-button>
        </template>
      </el-input>
    </div>
    <div class="selectContainer">
      <el-select v-model="currentOrderOption" @change="onSelectedChange">
        <el-option v-for="option in orderOptions" :key="option.value" :label="option.label" :value="option.value" />
      </el-select>
    </div>
    <div class="packagesContainer">
      <div class="listContainer">
        <li v-for="packageObj in packagesPage?.data" :key="packageObj.id">
          <el-button type="primary" link @click="onPackageClick(packageObj)">
            {{ packageObj.name }}
          </el-button>
        </li>
      </div>
      <div class="paginationContainer">
        <el-pagination background layout="prev, pager, next" :page-count="packagesPage?.pageCount"
          v-model:current-page="pageIndex" />
      </div>
    </div>
    <el-drawer v-model="drawerOpened" direction="ltr">
      <PackageDetails :dyanmoPackage="currentPackage" title="currentPackage.name" />
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { ElMessage } from 'element-plus'
import { getPackagesPageFetch } from '@/service/dynamoPackages'
import type { DynamoPackage } from '@/models/DynamoPackage'
import type { PageModel } from "@/models/PageModel";
import PackageDetails from "@/components/PackageDetails.vue";

interface OrderOption {
  value: string,
  label: string
}

const searchInputValue = ref<string | undefined>();
const currentPackage = ref<DynamoPackage>();
const drawerOpened = ref<boolean>(false);
const packagesPage = ref<PageModel<DynamoPackage>>();
const pageIndex = ref<number>(1);
const pageSize: number = 20;
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
const currentOrderOption = ref<OrderOption>(orderOptions[0])

function onSelectedChange(value: string): void {
  getPackages(searchInputValue.value, 1, pageSize, value);
}

function onPackageClick(packageObj: DynamoPackage) {
  currentPackage.value = packageObj;
  drawerOpened.value = true;
}

function onSearchClick(): void {
  if (searchInputValue.value) {
    getPackages(searchInputValue.value, 1, pageSize);
  }
}

function getPackages(keyword?: string, pageIndex: number = 1, pageSize: number = 20, orderField: string = 'downloads'): void {
  const promise = getPackagesPageFetch(keyword, pageIndex, pageSize, orderField)
  promise.
    then(response => {
      if (response.success) {
        packagesPage.value = response.response
      }
      else {
        ElMessage.error(response.message)
      }
    })
    .catch(error => {
      ElMessage.error("网络请求错误!")
    });
}

onMounted(() => {
  getPackages();
})

watch(pageIndex, (newPageIndex) => {
  getPackages(searchInputValue.value, newPageIndex, pageSize, currentOrderOption.value.value);
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

.selectContainer {
  margin-top: 1%;
}

.searchContainer {
  height: inherit;
  line-height: inherit;
  width: 20%;
}

.packagesContainer {
  flex: 1;
  display: flex;
  margin-top: 1%;
  flex-direction: column;
  justify-content: space-around;
}

.listContainer {
  width: 100%;
  border: 1px solid lightgray;
  overflow-y: scroll;
  height: 400px;
}

.paginationContainer {
  margin-top: 20px;
}

.listContainer ul {
  display: flex;
  overflow-y: scroll;
}

li {
  flex: none;
}
</style>