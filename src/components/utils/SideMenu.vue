<script setup>
import { useMainStore } from '@/stores/mainStore';
const mainStore = useMainStore();
const setOption = (value) => {
    console.log(value)
    mainStore.setHistoryOption(value);
}

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
.container {
    display: grid;
}
</style>