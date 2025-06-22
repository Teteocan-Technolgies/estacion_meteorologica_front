<script setup>
import { storeToRefs } from 'pinia';
import { useMainStore } from '@/stores/mainStore';
import Mediciones from '../mediciones/Mediciones.vue';

const mainStore = useMainStore();

const { historyOption } = storeToRefs(mainStore)
</script>

<template>
    <main>
        <Mediciones v-if="historyOption === 'Default'" />

        <template v-else-if="historyOption === 'Alertas'">

        </template>
        <template v-else-if="historyOption === 'Metricas'">

        </template>
    </main>
</template>

<style scoped></style>