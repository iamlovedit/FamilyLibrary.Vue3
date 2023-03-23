<template>
    <div class="rootContainer">
        <div>
            {{ packageObj?.name }}
        </div>
        <div class="descriptionContianer">
            {{ packageObj?.description }}
        </div>
        <div class="mainContentContianer">
            <el-table :data="versionsPage?.data" style="width: 100%;height:900px">
                <el-table-column prop="version" label="版本" width="*">
                    <template #default="scope">
                        <el-link type="primary" underline
                            href="`https://dynamopackages.com/download/${packageId}/${scope.row.version}`">
                            {{ scope.row.version }}
                        </el-link>
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="发布时间" width="*" />
            </el-table>
            <div class="paginationContainer">
                <el-pagination background layout="prev, pager, next" :page-count="versionsPage?.pageCount"
                    v-model:current-page="pageIndex" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { ElMessage } from 'element-plus'

import { getPackageVersionsFetch } from "@/service/dynamoPackages";
import type { DynamoPackage } from "@/models/DynamoPackage";
import type { PackageVersion } from "@/models/PackageVersion";
import type { PageModel } from "@/models/PageModel";

const route = useRoute();
const packageObj = ref<DynamoPackage>();
const packageId = ref<string>();
const versionsPage = ref<PageModel<PackageVersion>>();
const pageIndex = ref<number>(1);

function getPackageVersions(pageIndex: number = 1) {
    const promise = getPackageVersionsFetch(packageId.value as string, pageIndex);
    promise.then(httpResponse => {
        if (httpResponse.success) {
            versionsPage.value = httpResponse.response;
        }
        else {
            ElMessage.error(httpResponse.message)
        }
    }).catch(error => {
        ElMessage.error("网络请求错误!")
    })
}

onMounted(() => {
    packageId.value = route.params['id'].toLocaleString();
    getPackageVersions();
})

watch(pageIndex, (newIndex) => {
    getPackageVersions(newIndex)
})
</script>

<style scoped>
.rootContainer {
    width: 50%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: start;
}

.rootContainer div:first-child {
    text-align: center;
    font-size: large;
    font-weight: bold;
    flex: 0 0 auto;
}

.descriptionContianer {
    text-align: left;
    font-size: large;
    flex: 0 0 auto;
    flex: none;
    margin-top: 40px;
}


.mainContentContianer {
    flex: 1;
    margin-top: 50px;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    justify-content: start
}

.paginationContainer {
    flex: 0 0 auto;
    align-self: flex-start;
    margin-top: 20px;
}
</style>