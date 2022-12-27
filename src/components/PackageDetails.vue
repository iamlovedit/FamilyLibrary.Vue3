<template>

</template>
<script lang="ts">
interface Props {
    dyanmoPackage: DynamoPackage | undefined;
}
</script>

<script setup lang="ts">
import type { DynamoPackage } from "@/models/DynamoPackage";
import { ref } from "vue";

defineProps<Props>();
</script>

<style scoped>

</style>