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
        <div class="selectContainer">
            <el-select v-model="currentOrderOption" @change="onSelectedChange">
                <el-option v-for="option in orderOptions" :key="option.value" :label="option.label" :value="option.value" />
            </el-select>
        </div>
        <div class="packagesContainer">
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
import { ElMessage } from 'element-plus'
import { getPackagesPageFetch } from '@/service/dynamoPackages'
import type { DynamoPackage } from '@/models/DynamoPackage'
import type { PageModel } from "@/models/PageModel";
import { useRouter } from "vue-router";

interface OrderOption {
    value: string,
    label: string
}
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
    {
        value: 'createTime',
        label: '创建时间'
    },
]
const router = useRouter()
const searchInputValue = ref<string | undefined>();
const packagesPage = ref<PageModel<DynamoPackage>>();
const pageIndex = ref<number>(1);
const pageSize: number = 20;

const currentOrderOption = ref<OrderOption>(orderOptions[0])

function onSelectedChange(value: string): void {
    getPackages(searchInputValue.value, 1, pageSize, value);
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

function onSearchClick(): void {
    if (searchInputValue.value) {
        getPackages(searchInputValue.value, 1, pageSize);
    }
}

function onPackageClick(packageObj: DynamoPackage) {
    router.push({
        name: 'packagesDetail',
        params: {
            id: packageObj.id
        }
    })
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
    width: 70%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.selectContainer {
    flex: 0;
    width: 200px;
    margin-top: 1%;
}

.searchContainer {
    flex: 0;
    width: 300px;
}

.packagesContainer {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    margin-top: 1%;
}

.listContainer {
    width: 100%;
    overflow-y: auto;
    height: 600px;
}

.paginationContainer {
    flex: 0;
    margin-top: 20px;
    align-self: flex-end
}

li {
    height: 60px;
}
</style>