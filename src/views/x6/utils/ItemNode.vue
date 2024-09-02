<script setup lang="ts">
import { inject, onMounted, ref } from 'vue';
import { ElCheckbox } from 'element-plus';
import { Node } from '@antv/x6';
import eventBus from '@/utils/eventBus';
const getNode: () => Node = inject('getNode');
interface NodeData {
    checked: boolean;
    parentId: string;
    isOpen: boolean;
    label: string;
    id: string;
}
const data = ref<NodeData>({
    checked: false,
    label: '',
    isOpen: false,
    parentId: '',
    id: '',
});
const nodeEl = ref<Node>(getNode());

onMounted(() => {
    data.value = getNode().getData();
    // 监听数据改变事件
    nodeEl.value.on('change:data', () => {
        data.value = getNode().getData();
    });
});
const fetchData = async () => {
    // const graph = getGraph();
    // renderAdd({ data: dataEn, graph, groupIndex: +data.value.parentId });

    const isOpen = data.value?.isOpen;
    nodeEl.value.setData({ isOpen: !isOpen });
    eventBus.emit('addOrRemove', { id: data.value.id, parentId: data.value.parentId, isOpen: !isOpen });
};
</script>

<template>
    <div class="item-node-wrap">
        <div class="title">
            <el-checkbox v-model="data.checked" />
            <div style="flex: 1">
                {{ data.label }}
            </div>
            <div @click="fetchData">{{ data.isOpen ? '关闭' : '打开' }}</div>
        </div>
    </div>
</template>

<style lang="less">
.item-node-wrap {
    width: 100%;
    height: 100%;
    .title {
        padding: 10px;
        height: 20px;
        line-height: 20px;
        border: 1px solid red;
        display: flex;
        align-items: center;
    }
}
</style>
