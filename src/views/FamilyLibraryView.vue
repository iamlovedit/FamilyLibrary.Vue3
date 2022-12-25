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
import type { FamilyCategory } from '../models/FamilyCategory'
import { getfamilyCategoriesFetch } from "../service/family";


const categories = ref<FamilyCategory[] | null>(null);
const handleNodeClick = (category: FamilyCategory) => {

}

async function getFamilyCategories() {
  await getfamilyCategoriesFetch();
}

async function filterFamilyByCategory(category: FamilyCategory) {

}


const defaultProps = {
  children: 'children',
  label: 'name',
}

onMounted(() => {

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