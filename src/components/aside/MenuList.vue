<script setup lang="ts">
import { RouteRecordRaw } from 'vue-router';

interface PropsVO {
    menus: RouteRecordRaw[] | [];
}

withDefaults(defineProps<PropsVO>(), {
    menus: () => [],
});
</script>

<template>
    <template v-for="menu in menus">
        <!-- 类型为菜单时，使用 el-sub-menu  -->
        <el-sub-menu
            v-if="menu.meta!.isShow && menu.children && menu.children.length"
            :key="menu.path + 'submenu'"
            :index="menu.path"
        >
            <template #title>
                <el-icon><location /></el-icon>
                <span>{{ menu.meta!.name }}</span>
            </template>
            <!-- 只有菜单有下级，所以放在这个位置 -->
            <menu-list :menus="menu.children"></menu-list>
        </el-sub-menu>
        <!-- 类型为功能时，使用 el-menu-item -->
        <template v-else>
            <el-menu-item v-if="menu.meta!.isShow" :key="menu.path + 'item'" :index="menu.path">
                <el-icon><location /></el-icon>
                <template #title>{{ menu.meta!.name }}</template>
            </el-menu-item>
        </template>
    </template>
</template>
