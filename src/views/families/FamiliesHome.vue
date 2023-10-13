<template>
    <div class="libraryContainer">
        <div class=".categoryContainer">
            <el-tree :data="categories" :props="defaultProps" @node-click="handleNodeClick" accordion />
        </div>
        <div>
            <div class="searchContainer">

            </div>
            <div class="statusContianer">

            </div>
            <div class="itemsContianer">
                <RouterView />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ElMessage } from 'element-plus'
import type { FamilyCategory } from '@/models/FamilyCategory';
import type { Family } from "@/models/Family";
import {
    getFamilyCategoriesFetch,
    getFamilyPageByCategoryFetch,
    getFamilyPageFetech,
    getFamilyPageByKeywordFetch,
    filterFamiliePageFetch
} from "@/service/family";

const familes = ref<Family[]>();
const categories = ref<FamilyCategory[]>();
const defaultProps = {
    children: 'children',
    label: 'name',
}

function handleNodeClick(category: FamilyCategory) {

}

function getFamilyCategories() {
    let promise = getFamilyCategoriesFetch();
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

.categoryContainer {
    width: 220px;
    flex: none;
}

.libraryContainer div:nth-child(2) {
    display: flex;
    width: 100%;
    height: 100%;
    margin-left: 20px;
    flex-flow: column nowrap;
}

.searchContainer {
    height: auto;
    flex: none;
}

.statusContianer {
    flex: none;
    width: 100%;
    margin-top: 20px;
}

.itemsContianer {
    flex: 1;
    width: 100%;
    margin-top: 20px;
}
</style>