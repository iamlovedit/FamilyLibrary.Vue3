<template>
    <div class="searchContinaer">
        <PackageTable :keyword=keyword />
    </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import PackageTable from "@/components/PackageTable.vue";

const route = useRoute();
const keyword = route.query['keyword']?.toLocaleString();

</script>

<style scoped>
.searchContinaer {
    width: 100%;
    margin: 0 auto;
}
</style>