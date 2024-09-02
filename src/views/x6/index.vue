<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import { initGraph } from './utils/index';
import { Graph } from '@antv/x6';
import { render } from './utils/render';
import eventBus from '@/utils/eventBus';
import { AddOrRemoveParams, DataVoItem } from './utils/enum';
import _ from 'lodash';

const containerRef = ref();
const miniMapContainerRef = ref();
const graphInstance = ref<Graph>();
const fetchIds = ref<string[]>([]);

const useData = ref<DataVoItem[]>([
    {
        id: '1',
        label: '学生',
        children: [
            {
                id: '1-1',
            },
            {
                id: '1-2',
            },
            {
                id: '1-3',
            },
            {
                id: '1-4',
            },
        ],
    },
]);

onMounted(() => {
    initData();
    eventBus.on('addOrRemove', (obj: AddOrRemoveParams) => {
        console.log(1111, obj);
        if (obj.isOpen) {
            addNode(obj);
        } else {
            changeNodeStatus(obj, 'hide');
        }
    });
});
const initData = () => {
    nextTick(() => {
        if (graphInstance.value) {
            graphInstance.value.dispose();
        }
        graphInstance.value = initGraph({
            container: containerRef.value,
            miniMapContainer: miniMapContainerRef.value,
            autoResize: true,
        });
        render({
            data: useData.value,
            graph: graphInstance.value,
            isCenter: true,
        });
    });
};

const addNode = (obj: AddOrRemoveParams) => {
    if (fetchIds.value.includes(obj.id)) {
        changeNodeStatus(obj, 'show');
    } else {
        if (obj.id === '1-1') {
            let dataEn: DataVoItem[] = [
                {
                    id: '2',
                    label: '课程',
                    children: [
                        {
                            id: '2-1',
                            parentTarget: ['1-1'],
                        },
                        {
                            id: '2-2',
                            parentTarget: ['1-1'],
                        },
                        {
                            id: '2-3',
                            parentTarget: ['1-1'],
                        },
                        {
                            id: '2-4',
                            parentTarget: ['1-1'],
                        },
                        {
                            id: '2-5',
                            parentTarget: [],
                        },
                    ],
                },
            ];
            useData.value = _.unionWith(useData.value, dataEn, _.isEqual);
            render({
                data: useData.value,
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                graph: graphInstance.value!,
            });
        } else {
            let dataEn: DataVoItem[] = [
                {
                    id: '2',
                    label: '课程',
                    children: [
                        {
                            id: '2-1',
                            parentTarget: ['1-1'],
                        },
                        {
                            id: '2-2',
                            parentTarget: ['1-1'],
                        },
                        {
                            id: '2-3',
                            parentTarget: ['1-1'],
                        },
                        {
                            id: '2-4',
                            parentTarget: ['1-2'],
                        },
                        {
                            id: '2-5',
                            parentTarget: ['1-3'],
                        },
                    ],
                },
            ];
            useData.value = _.unionWith(useData.value, dataEn, _.isEqual);
            render({
                data: useData.value,
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                graph: graphInstance.value!,
            });
        }
    }

    fetchIds.value = Array.from([...fetchIds.value, obj.id]);
};
const changeNodeStatus = (obj: AddOrRemoveParams, type: 'hide' | 'show') => {
    const hideIds = useData.value
        .map((v) => v.children)
        .flat()
        .filter((v) => v.parentTarget?.includes(obj.id))
        .map((v) => v.id);
    graphInstance.value?.getNodes().forEach((v) => {
        if (hideIds.includes(v.id)) {
            if (type === 'hide') {
                v.hide();
            } else {
                v.show();
            }
        }
    });
};
</script>

<template>
    <section class="wrap">
        <div class="operate">
            <el-button class="m-left-10 m-bottom-12" @click="addNode">添加</el-button>
            <el-button type="primary" class="m-bottom-12">删除</el-button>
        </div>
        <div ref="containerRef" class="chart-container overflow-hidden"></div>
        <div ref="miniMapContainerRef" class="minimap-container"></div>
    </section>
</template>

<style lang="less" scoped>
.wrap {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    .operate {
    }
    .chart-container {
        flex: 1;
    }
    .minimap-container {
        position: absolute;
        right: 20px;
        bottom: 20px;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.01), 0 3px 6px 3px rgba(0, 0, 0, 0.01), 0 2px 6px 0 rgba(0, 0, 0, 0.03);
        border-radius: 2px;
    }
}
</style>
