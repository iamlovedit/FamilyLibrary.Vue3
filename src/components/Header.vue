<template>
    <div class="headerContainer">
        <el-menu :default-active="currentRoute" mode="horizontal" :ellipsis="false" @select="handleSelect">
            <div class="header_icon">
                <IconHome @click.stop="handleIconClick" />
            </div>
            <div class="header_left">
                <el-menu-item index="home">主页</el-menu-item>
                <el-menu-item index="library">族库</el-menu-item>
                <el-menu-item index="packages">节点包</el-menu-item>
                <el-menu-item index="about">关于</el-menu-item>
            </div>
        </el-menu>
        <div class="header_right">

        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import IconHome from './icons/IconHome.vue';

const route = useRoute()
const router = useRouter()
const currentRoute = computed<string>(() => {
    return route.name as string
})

function handleIconClick() {
    router.push({
        name: 'home'
    })
}

function handleSelect(key: string) {
    router.push({
        name: key,
        query: {
            ...route.query
        }
    })
}

</script>

<style scoped>
.headerContainer {
    width: 100%;
    height: fit-content;
}

.header_icon {
    margin-left: 20px;
    width: 80px;
    text-align: center;
}

.header_icon svg {
    cursor: pointer;
}

.header_left {
    display: flex;
    margin-left: 20px;
    justify-content: space-around;
}

.header_right {
    flex: 1;
    display: flex;
    justify-content: space-around;
}
</style>