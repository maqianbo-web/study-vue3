<script setup lang="ts">
import { computed, reactive } from 'vue';
import { SearchItemVO } from '../constants/enum';

export type ValueVO = unknown;
const prop = defineProps<{
    value: ValueVO;
    item: SearchItemVO;
}>();
const emit = defineEmits<{
    (e: 'update:value', value: ValueVO): void;
}>();
const value = computed({
    get: () => prop.value as string,
    set: (value: ValueVO) => emit('update:value', value),
});
const config = reactive({
    placeholder: `请输入${prop.item.label}`,
    ...(prop.item.config || {}),
});
const options = computed(() => {
    if (prop.item.options) {
        if (Array.isArray(prop.item.options)) {
            return prop.item.options;
        } else {
            return prop.item.options();
        }
    } else {
        return [];
    }
});
const changeValue = (val: unknown) => {
    if (prop.item.onChange) {
        prop.item.onChange({
            prop: prop.item.prop,
            val,
        });
    }
};
</script>

<template>
    <el-radio-group v-model="value" v-bind="config" @change="(val) => changeValue(val)">
        <el-radio v-for="v in options" :key="v.value" :label="v.value">{{ v.label }}</el-radio>
    </el-radio-group>
</template>

<style lang="less" scoped></style>
