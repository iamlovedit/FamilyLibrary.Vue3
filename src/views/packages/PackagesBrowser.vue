<template>
    <div class="rootContainer">
        <div class="searchContainer">
            <el-input v-model="searchInputValue" clearable placeholder="输入要搜索的节点包">
                <template #append>
                    <el-button @click="onSearchClick">
                        搜索
                    </el-button>
                </template>
            </el-input>
        </div>
        <div class="packagesContainer">
            <PackageTable :keyword=searchInputValue />
        </div>
    </div>
</template>

<script setup lang="ts">

import { ref } from "vue";
import { useRouter } from "vue-router";
import PackageTable from "@/components/PackageTable.vue";


const router = useRouter()
const searchInputValue = ref<string | undefined>();

function onSearchClick(): void {
    if (searchInputValue.value) {
        router.push({
            name: 'search',
            query: {
                keyword: searchInputValue.value
            }
        })
    }
}
</script>

<style scoped>
.rootContainer {
    flex: 1;
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.searchContainer {
    flex: 0;
    width: 300px;
}

.packagesContainer {
    margin-top: 20px;
}
</style>