<script lang="ts">
export default {
    name: 'GroupNode',
};
</script>
<script setup lang="ts">
import { inject } from 'vue';
import { Node } from '@antv/x6';
const getNode: () => Node = inject('getNode');

// onMounted(() => {
//     console.log(1111, getNode().getData());
// });
</script>

<template>
    <div class="group-node-wrap">
        <div class="title">
            {{ getNode().getData().label }}
        </div>
    </div>
</template>

<style lang="less">
.group-node-wrap {
    background: #ededed;
    text-align: center;

    width: 100%;
    height: 100%;
    .title {
        padding: 10px;
        height: 20px;
        line-height: 20px;
    }
}
</style>
