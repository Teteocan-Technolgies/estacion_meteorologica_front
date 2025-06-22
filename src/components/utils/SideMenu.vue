<script setup>
import { useMainStore } from '@/stores/mainStore';
const mainStore = useMainStore();
const setOption = (value) => mainStore.setHistoryOption(value);


</script>
<template>
    <aside>
        <div class="container">
            <button @click="setOption('Default')">Datos</button>
            <button @click="setOption('Alertas')">Alertas</button>
            <button @click="setOption('Metricas')">Métricas</button>
        </div>
    </aside>
</template>
<style scoped>
aside {
    background-color: lightblue;
}

.container {
    display: grid;

    gap: 1.25rem;
    width: 12.5rem;
    padding: 3.75rem .625rem;
}

button {
    background-color: darkgray;
    color: #FFF;

    padding: .9375rem .3125rem;
}
</style>