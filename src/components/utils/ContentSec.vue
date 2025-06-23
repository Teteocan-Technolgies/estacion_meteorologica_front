<script setup>
import { storeToRefs } from 'pinia';
import { useMainStore } from '@/stores/mainStore';
import Mediciones from '../mediciones/Mediciones.vue';
import SetAlertas from '../alertas/SetAlertas.vue';
import HistorialSect from '../historial/HistorialSect.vue';


const mainStore = useMainStore();

const { historyOption } = storeToRefs(mainStore)
</script>

<template>
    <main>
        <Mediciones v-if="historyOption === 'Default'" />

        <SetAlertas v-else-if="historyOption === 'Alertas'" />

        <HistorialSect v-else-if="historyOption === 'Metricas'" />
    </main>
</template>

<style scoped></style>