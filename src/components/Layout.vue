<script setup lang="ts">
import Aside from './aside/index.vue';
</script>

<template>
    <section class="h-full flex">
        <Aside />
        <div class="flex-1 overflow-hidden">
            <slot></slot>
        </div>
    </section>
</template>

<style lang="less" scoped></style>
