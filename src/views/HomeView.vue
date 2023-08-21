<template>
    <div class="text-align-center">
        <img alt="Vue logo" src="../assets/logo.png" class="auto" />
        <HelloWorld />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

export default defineComponent({
    name: 'HomeView',
    components: {
        HelloWorld,
    },
});
</script>
