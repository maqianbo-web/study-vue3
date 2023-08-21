<script lang="ts">
export default {
    name: 'Aside',
};
</script>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { routes } from '../../router/index';

import MenuList from './MenuList.vue';

const isCollapse = ref(false);
const defaultActive = ref('/home');

const getDefaultActive = () => {
    const path = window.location.pathname;
    defaultActive.value = path;
};
onMounted(() => {
    getDefaultActive();
});
</script>

<template>
    <section class="h-full flexcol">
        <el-menu
            class="flex-1"
            router
            :collapse="isCollapse"
            active-text-color="#ffd04b"
            background-color="#545c64"
            :default-active="defaultActive"
            text-color="#fff"
        >
            <MenuList :menus="routes"></MenuList>
        </el-menu>
        <el-button type="primary" @click="isCollapse = !isCollapse">
            <el-icon v-if="!isCollapse"><ArrowRightBold /></el-icon>
            <el-icon v-else><ArrowLeftBold /></el-icon>
        </el-button>
    </section>
</template>

<style lang="less" scoped></style>
