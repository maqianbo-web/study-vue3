<script lang="ts">
export default {
    name: 'FormShow',
};
</script>
<script setup lang="ts">
import { reactive } from 'vue';
import SearchContainer from './components/SearchContainer.vue';
import { ChangeParamsVO, SearchItemVO } from './constants/enum';

const stateFilter = {
    name: '',
    gender: 'male',
    phone: '',
    address: '',
    productType: '',
};

const filter = reactive({ ...stateFilter });
const initFilter = () => {
    Object.assign(filter, { ...stateFilter });
};
const searchFilter = () => {
    console.log('filter', filter);
};

const changeValue = (params: ChangeParamsVO): void => {
    console.log('1111', params);
};
const formItemArr: SearchItemVO[] = [
    {
        label: '姓名',
        prop: 'name',
        type: 'input',
        config: {
            // placeholder: '1111', 设置一些组件的默认值
        },
        onChange: (changeParams) => changeValue(changeParams),
    },
    {
        label: '性别',
        prop: 'gender',
        type: 'radio',
        options: [
            { label: '男', value: 'male' },
            { label: '女', value: 'female' },
        ],
        onChange: (changeParams) => changeValue(changeParams),
    },
    {
        label: '产品类型',
        prop: 'productType',
        type: 'select',
        options: () => {
            return [
                { label: 'A', value: 'a' },
                { label: 'B', value: 'b', disabled: true },
                { label: 'C', value: 'c' },
            ];
        },
        onChange: (changeParams) => changeValue(changeParams),
    },
    {
        label: '电话',
        prop: 'phone',
        type: 'input',
        onChange: (changeParams) => changeValue(changeParams),
    },
    {
        label: '地址',
        prop: 'address',
        type: 'input',
        onChange: (changeParams) => changeValue(changeParams),
    },
];
</script>

<template>
    <section class="h-full bg-gray p-12">
        {{ filter }}
        <search-container
            v-model:filter="filter"
            :form-item-arr="formItemArr"
            @init="initFilter"
            @search="searchFilter"
        ></search-container>
    </section>
</template>

<style lang="less" scoped></style>
