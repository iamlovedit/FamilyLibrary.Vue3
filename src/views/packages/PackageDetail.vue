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
                <li></li>
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

const route = useRoute();
const packageObj = ref<DynamoPackage>();


function getPackageDetail(id: string) {
    const promise = getPackageDetailFetch(id);
    promise.then(httpResponse => {
        if (httpResponse.success) {
            packageObj.value = httpResponse.response;
            console.log(packageObj.value)
        }
        else {
            ElMessage.error(httpResponse.message)
        }
    }).catch(error => {
        ElMessage.error("网络请求错误!")
    })
}

onMounted(() => {
    let packageId = route.params['id'] as string;
    getPackageDetail(packageId);
})
</script>


<style scoped>
.rootContainer {
    width: 80%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
}

.rootContainer div:first-child {
    text-align: center;
    font-size: large;
    font-weight: bold;
    flex: 0 0 auto;
}

.rootContainer div:nth-child(2) {
    text-align: center;
    font-size: large;
    flex: 1 1 30%;
}

.rootContainer div:nth-child(3) {
    background-color: rgb(153, 211, 46);
    text-align: center;
    flex: 1 1 60%;
}

.versionsContainer {
    height: 100%;
    display: flex;
    overflow-y: auto;
}

.versionsContainer li {
    flex: 1 1 auto;
}
</style>