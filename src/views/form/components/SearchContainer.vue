<script setup lang="ts">
import { DefineComponent, computed, ref } from 'vue';
import { SearchItemVO } from '../constants/enum';
import CustomInput from './CustomInput.vue';
import CustomSelect from './CustomSelect.vue';
import CustomRadio from './CustomRadio.vue';

type FilterVo = string | number | undefined | null | unknown[];

interface PropsVO {
    filter: Record<string, FilterVo>; // 查询参数
    formItemArr: SearchItemVO[]; // 表单数据
    elColSpan?: number; // 一行展示几个表单控件
    gutter?: number; // 表单控件距离
    isSeniorSearch?: boolean; // 是否需要展示，收起
}

const props = withDefaults(defineProps<PropsVO>(), {
    elColSpan: 6,
    gutter: 12,
    isSeniorSearch: true,
});
const emit = defineEmits<{
    (e: 'update:filter', filter: Record<string, FilterVo>): void;
    (e: 'init'): void;
    (e: 'search'): void;
}>();

const isShow = ref(false);

const useFormItemArr = computed(() => {
    const isshowLess = props.isSeniorSearch && !isShow.value;
    if (isshowLess) {
        const num = Math.floor(24 / props.elColSpan) - 1;
        return props.formItemArr.slice(0, num);
    } else {
        return props.formItemArr;
    }
});

const filter = computed({
    get: () => props.filter,
    set: (val) => emit('update:filter', val),
});
const componentsMap = new Map([
    ['input', CustomInput],
    ['select', CustomSelect],
    ['radio', CustomRadio],
]);
const getComponent: (type: string) => DefineComponent = (type: string) => {
    return componentsMap.get(type);
};
</script>

<template>
    <section class="bg-white p-12 br-4 overflow-hidden">
        <el-form :model="filter">
            <el-row class="search-wrap" :gutter="props.gutter">
                <el-col v-for="item in useFormItemArr" :key="item.prop" :span="item.elColSpan || elColSpan">
                    <el-form-item :label="`${item.label}:`" :prop="item.prop">
                        <component :is="getComponent(item.type)" v-model:value="filter[item.prop]" :item="item" />
                    </el-form-item>
                </el-col>
                <el-col :span="elColSpan" style="flex: 1; max-width: 100%">
                    <div class="flex justify-content-end align-items-center">
                        <div
                            v-if="isSeniorSearch"
                            class="cursor-pointer fw-medium m-bottom-12 senior-search"
                            @click="isShow = !isShow"
                        >
                            <span>{{ isShow ? '关闭筛选' : '展开筛选' }}</span>
                            <div class="flex align-items-center m-left-4">
                                <el-icon>
                                    <ArrowUpBold v-if="isShow" />
                                    <ArrowDownBold v-else />
                                </el-icon>
                            </div>
                        </div>
                        <el-button class="m-left-10 m-bottom-12" @click="$emit('init')">重置</el-button>
                        <el-button type="primary" class="m-bottom-12" @click="$emit('search')">查询</el-button>
                    </div>
                </el-col>
            </el-row>
        </el-form>
    </section>
</template>

<style lang="less" scoped>
.search-wrap {
    display: flex;
    flex-wrap: wrap;
}
.senior-search {
    line-height: 32px;
    display: flex;
    justify-content: center;
}
</style>
