<template>
<el-drawer v-model="drawer" :title="currentPackage?.name">

</el-drawer>
</template>
<script lang="ts">
interface Props {
    dyanmoPackage: DynamoPackage|undefined;
}
</script>

<script setup lang="ts">
import type{ DynamoPackage } from "@/models/DynamoPackage";
import { ref } from "vue";

defineProps<Props>();
const drawer=ref<boolean>(false);
const currentPackage=ref<DynamoPackage>();

</script>

<style scoped>

</style>