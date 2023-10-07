<script lang="ts">
/* @description
 * @fileName EchartRender.vue
 * @author maqianbo-web
 * @date 2023/10/07 10:35:39
 * @version
 */
export default {
    name: 'EchartRender',
};
</script>
<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from 'vue';
import * as echarts from 'echarts';
import { ECharts } from 'echarts';
import ResizeObserver from 'resize-observer-polyfill';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prop = defineProps<{ echartOptions: any }>();
const emit = defineEmits<{
    (e: 'instance', value: ECharts): void;
    (e: 'click', value: echarts.ECElementEvent): void;
}>();
const echartWrap = ref<HTMLElement | null>(null);
let echartInstance: ECharts | null = null;
let resizeObserver: ResizeObserver | null = null;

onMounted(() => {
    initRender();
});
watch(
    prop.echartOptions,
    () => {
        renderEchart();
    },
    { deep: true }
);
const initRender = () => {
    nextTick(() => {
        if (!echartInstance) {
            echartInstance = echarts.init(echartWrap.value);
        }
        resizeObserver = new ResizeObserver(() => {
            window.requestAnimationFrame(() => {
                echartInstance?.resize();
            });
        });
        resizeObserver.observe(echartWrap.value as HTMLElement);
        echartInstance.on('click', (params: echarts.ECElementEvent) => {
            emit('click', params);
        });
        emit('instance', echartInstance);
        renderEchart();
    });
};
const renderEchart = () => {
    echartInstance?.clear();
    echartInstance?.setOption(prop.echartOptions);
};
onMounted(() => {
    echartInstance?.dispose();
    resizeObserver?.unobserve(echartWrap.value as HTMLElement);
    echartInstance = null;
});
</script>

<template>
    <section ref="echartWrap" class="h-full flex-center"></section>
</template>

<style lang="less" scoped></style>
