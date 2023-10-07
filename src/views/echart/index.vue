<script lang="ts">
export default {
    name: 'EchartShow',
};
</script>
<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { EChartsOption } from 'echarts';
import EchartRender from './components/EchartRender.vue';

const getBarOptions: (name: string) => EChartsOption = (name) => {
    return {
        tooltip: {},
        legend: {
            data: [name],
        },
        xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
        },
        yAxis: {},
        series: [
            {
                name,
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20],
            },
        ],
    };
};
const getLineOptions = () => {
    return {
        tooltip: {},
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                data: [150, 230, 224, 218, 135, 147, 260],
                type: 'line',
            },
        ],
    };
};
let data = reactive({
    barOptions: {},
    lineOptions: {},
});

onMounted(() => {
    let barOptions = getBarOptions('销售');
    data.barOptions = reactive(barOptions);
    let lineOptions = getLineOptions();
    data.lineOptions = lineOptions;
});
</script>

<template>
    <el-row class="wrap">
        <el-col :span="12">
            <echart-render :echart-options="data.barOptions"></echart-render>
        </el-col>
        <el-col :span="12">
            <echart-render :echart-options="data.lineOptions"></echart-render>
        </el-col>
    </el-row>
</template>

<style lang="less" scoped>
.wrap {
    height: 300px;
}
</style>
