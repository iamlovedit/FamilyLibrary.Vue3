<template>
    <div class="rootContainer">
        <div>
            {{ packageObj?.name }}
        </div>
        <div>
            {{ packageObj?.description }}
        </div>
        <div>
            <ul class="versionsContainer">
                <li v-for="version in versions">
                    <el-link type="primary" href="`https://dynamopackages.com/download/${packageId}/${version.version}`" 
                        underline>
                        {{ version.version }}
                    </el-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { ElMessage } from 'element-plus'

import { getPackageDetailFetch } from "@/service/dynamoPackages";
import type { DynamoPackage } from "@/models/DynamoPackage";
import type { PackageVersion } from "@/models/PackageVersion";

const route = useRoute();
const packageObj = ref<DynamoPackage>();
const versions = ref<PackageVersion[]>();
const packageId = ref<string>();

function getPackageDetail(id: string) {
    const promise = getPackageDetailFetch(id);
    promise.then(httpResponse => {
        if (httpResponse.success) {
            packageObj.value = httpResponse.response;
            const sortVersions = packageObj.value.versions.sort((source, target) => {
                return source.createTime < target.createTime ? 1 : -1;
            })
            versions.value = sortVersions;
            console.log(versions.value);
        }
        else {
            ElMessage.error(httpResponse.message)
        }
    }).catch(error => {
        ElMessage.error("网络请求错误!")
    })
}

onMounted(() => {
    packageId.value = route.params['id'] as string;
    getPackageDetail(packageId.value);
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

.rootContainer div:nth-child(2) {
    text-align: left;
    font-size: large;
    flex: 1 1 auto;
    margin-top: 50px;
}

.rootContainer div:nth-child(3) {
    flex: 1 1 100%;
    margin-top: 50px;
    text-align: left;
}

.versionsContainer {
    display: flex;
    overflow-y: auto;
    flex-direction: column;
}

.versionsContainer li {
    flex: 1 1 0;

}
</style>