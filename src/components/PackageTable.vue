<template>
    <div class="mainContainer">
        <div class="selectContainer">
            <el-select v-model="currentOrderOption" @change="onSelectedChange">
                <el-option v-for="option in orderOptions" :key="option.value" :label="option.label" :value="option.value" />
            </el-select>
        </div>
        <div class="tableContainer">
            <el-table :data="packagesPage?.data" style="width: 100%; max-height: 600px;">
                <el-table-column prop="name" label="名称" width="*">
                    <template #default="scope">
                        <el-button type="primary" link @click="onPackageClick(scope.row)">
                            {{ scope.row.name }}
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" width="*" />
                <el-table-column prop="updateTime" label="更新时间" width="*" />
                <el-table-column prop="downloads" label="下载量" width="*" />
                <el-table-column prop="votes" label="点赞量" width="*" />
            </el-table>
            <div class="paginationContainer">
                <el-pagination background layout="prev, pager, next" :page-count="packagesPage?.pageCount"
                    v-model:current-page="pageIndex" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { ElMessage } from 'element-plus';
import { useRouter } from "vue-router";
import type { DynamoPackage } from "@/models/DynamoPackage";
import type { PageModel } from "@/models/PageModel";
import { type OrderOption, orderOptions, getPackagesPageFetch } from "@/service/dynamoPackages";

const props = defineProps<{
    keyword?: string
}>()

const router = useRouter();
const packagesPage = ref<PageModel<DynamoPackage>>();
const pageIndex = ref<number>(1);
const pageSize: number = 20;
const currentOrderOption = ref<OrderOption>(orderOptions[0])

function onSelectedChange(value: string): void {
    getPackages(props.keyword, 1, pageSize, value);
}

function onPackageClick(packageObj: DynamoPackage) {
    router.push({
        name: 'packagesDetail',
        params: {
            id: packageObj.id
        }
    })
}
function getPackages(keyword?: string, pageIndex: number = 1, pageSize: number = 20, orderField: string = 'downloads'): void {
    const promise = getPackagesPageFetch(keyword, pageIndex, pageSize, orderField)
    promise.then(httpResponse => {
        if (httpResponse.success) {
            packagesPage.value = httpResponse.response
        }
        else {
            ElMessage.error(httpResponse.message)
        }
    }).catch(error => {
        ElMessage.error("网络请求错误!")
    });
}

onMounted(() => {
    getPackages(props.keyword);
})
watch(pageIndex, (newPageIndex) => {
    getPackages(props.keyword, newPageIndex, pageSize, currentOrderOption.value.value);
})
</script>

<style scoped>
.mainContainer {
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    flex: 1;
}

.selectContainer {
    flex: 0;
    width: 200px;
}

.tableContainer {
    margin-top: 20px;
    flex: 1;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
}

.paginationContainer {
    flex: 0;
    margin-top: 20px;
}
</style>