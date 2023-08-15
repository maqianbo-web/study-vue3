<template>
    <div class="about">
        <h1 @click="increment">{{ count }}-{{ obj.name }}-{{ objRef.name }}</h1>
    </div>
</template>
<script setup>
import { ref, reactive } from 'vue';

const count = ref(0);
const objRef = ref({
    name: 'brother',
});
const obj = reactive({
    name: 'maqianbo',
});

function increment() {
    count.value++;
    obj.name = 'wuruiyu';
    objRef.value.name = 'sister';
}
</script>
