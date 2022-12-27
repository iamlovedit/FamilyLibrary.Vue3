<template>
  <div class="libraryContainer">
    <div class="selectContainer">
      <el-tree :data="categories" :props="defaultProps" @node-click="handleNodeClick" />
    </div>
    <div>

    </div>
  </div>
</template>

<script setup lang="ts">

import { ref, onMounted } from "vue";
import { ElMessage } from 'element-plus'
import type { FamilyCategory } from '@/models/FamilyCategory'
import { getfamilyCategoriesFetch, getFamilyPageByCategoryFetch } from "@/service/family";
import type { Family } from "@/models/Family";
import FamilyListVue from "@/components/FamilyList.vue";

const categories = ref<FamilyCategory[]>();
const familes = ref<Family[]>();
const handleNodeClick = (category: FamilyCategory) => {

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
    ElMessage.error(error)
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
    ElMessage.error(error)
  })
}


async function filterFamilyByCategory(category: FamilyCategory) {

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
  flex: 1
}

.selectContainer {
  float: left;
}
</style>