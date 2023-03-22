<template>
  <div class="libraryContainer">
    <div>
      <el-tree :data="categories" :props="defaultProps" @node-click="handleNodeClick" accordion />
    </div>
    <div class="listContianer">
      <div>

      </div>
      <div>

      </div>
      <div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { ref, onMounted } from "vue";
import { ElMessage } from 'element-plus'
import type { FamilyCategory } from '@/models/FamilyCategory'
import {
  getfamilyCategoriesFetch,
  getFamilyPageByCategoryFetch,
  getFamilyDetailFetch,
  getFamilyVersionFetch,
  getFamilyPageByKeywordFetch,
  getFamilyFileByVersionFetch
} from "@/service/family";
import type { Family } from "@/models/Family";
import FamilyListVue from "@/components/FamilyList.vue";

const categories = ref<FamilyCategory[]>();
const familes = ref<Family[]>();

function handleNodeClick(category: FamilyCategory) {
  console.log(category);
}

function getFamilyCategories() {
  let promise = getfamilyCategoriesFetch();
  promise.then(response => {
    if (response.success) {
      categories.value = response.response;
    }
    else {
      ElMessage.error(response.message)
    }
  }).catch(error => {
    ElMessage.error(error.message)
  })
}

function getFamilyByCategory(categoryId: number, pageIndex: number, pageSize: number) {
  let promise = getFamilyPageByCategoryFetch(categoryId, pageIndex, pageSize);
  promise.then(response => {
    if (response.success) {
      familes.value = response.response.data;
    }
    else {
      ElMessage.error(response.message)
    }
  }).catch(error => {
    ElMessage.error(error.message)
  })
}


function filterFamilyByCategory(category: FamilyCategory) {

}


const defaultProps = {
  children: 'children',
  label: 'name',
}

onMounted(() => {
  getFamilyCategories();
})

</script>

<style scoped>
.libraryContainer {
  flex: 1;
  width: 80%;
  margin: 40px auto;
  display: flex;
  flex-flow: row nowrap;
}

.libraryContainer div:first-child {
  width: 200px;
  flex: none;
}

.listContianer {
  flex: 1;
  margin-left: 20px;
  display: flex;
  flex-flow: column nowrap;
}

.listContianer div:first-child {
  height: 50px;
  width: 100%;
  background-color: burlywood;
}

.listContianer div:nth-child(2) {
  flex: 1;
  background-color: blanchedalmond;
}

.listContianer div:nth-child(3) {
  height: 50px;
  background-color: aqua;
}
</style>