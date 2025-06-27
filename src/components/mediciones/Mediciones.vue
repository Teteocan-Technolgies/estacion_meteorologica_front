<script setup>
import { Chart, registerables } from 'chart.js';
import { onMounted, onBeforeUnmount, ref, computed, watch } from 'vue';
import { useDatosStore } from '@/stores/datos';
import { useAlertasStore } from '@/stores/alertas';
import dayjs from 'dayjs';

Chart.register(...registerables);

const datosStore = useDatosStore()
const data = computed(() => datosStore.dataDts);

const alertaStore = useAlertasStore();
const alertas = computed(() => {
    const valor = Array.isArray(alertaStore.dataAlt) ? alertaStore.dataAlt : [];

    const result = {};

    for (let index = 0; index < valor.length; index++) {
        result[valor[index].variable] = {
            warning: valor[index].warning,
            danger: valor[index].danger,
        }
    }

    return result;
});

const temperatura = ref(null);
const humedad = ref(null);

const lastTemperature = ref(null);
const lastHumidity = ref(null);

const controlParams = ref({
    temperatura: {},
    humedad: {},
})

let chartInstanceTemperature = null;
let chartInstanceHumidity = null;

let intervalId = null;

const getTime = async () => {
    await datosStore.getInfoDts("humedad_temp/one")
    updateTemperature();
    updateHumidity();

    if (chartInstanceTemperature) {
        chartInstanceTemperature.update();
    }

    if (chartInstanceHumidity) {
        chartInstanceHumidity.update();
    }
};

const updateTemperature = () => {
    const time = dayjs().format('HH:mm');
    temperatureChart.data.labels.push(time);

    const newTemp = data.value.Temperatura;
    temperatureChart.data.datasets[0].data.push(newTemp);
    lastTemperature.value = newTemp;


    if (temperatureChart.data.labels.length > 10) {
        temperatureChart.data.labels.shift();
        temperatureChart.data.datasets[0].data.shift();
    }
}

const updateHumidity = () => {
    const time = dayjs().format('HH:mm');
    humidityChart.data.labels.push(time);

    const newHumidity = data.value.Humedad;
    humidityChart.data.datasets[0].data.push(newHumidity);
    lastHumidity.value = newHumidity;

    if (humidityChart.data.labels.length > 10) {
        humidityChart.data.labels.shift();
        humidityChart.data.datasets[0].data.shift();
    }
}

const temperatureChart = {
    type: 'line',
    data: {
        labels: [],
        datasets: [
            {
                label: 'Temperatura °C',
                data: [],
                fill: false,
                borderColor: 'rgb(255, 99, 132)',
                tension: 0
            }
        ]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: true
            }
        }
    }
};

const humidityChart = {
    type: 'line',
    data: {
        labels: [],
        datasets: [
            {
                label: 'Humedad %',
                data: [],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0
            }
        ]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: true
            }
        }
    }
};

const setTemperature = () => {
    const ctx = temperatura.value.getContext('2d');
    chartInstanceTemperature = new Chart(ctx, temperatureChart);
};

const setHumidity = () => {
    const ctx = humedad.value.getContext('2d');
    chartInstanceHumidity = new Chart(ctx, humidityChart);
};

watch(lastTemperature, (newVal) => {
    const item = alertas.value.temperatura;
    if (!item) return;

    if (newVal > item.danger) {
        controlParams.value.temperatura = { color: '#F32013', message: 'Peligro' };
    } else if (newVal > item.warning) {
        controlParams.value.temperatura = { color: '#F0D500', message: 'Advertencia' };
    } else {
        controlParams.value.temperatura = { color: '#5CB85C', message: 'Estable' };
    }
});

watch(lastHumidity, (newVal) => {
    const item = alertas.value.humedad;
    if (!item) return;

    if (newVal > item.danger) {
        controlParams.value.humedad = { color: '#F32013', message: 'Peligro' };
    } else if (newVal > item.warning) {
        controlParams.value.humedad = { color: '#F0D500', message: 'Advertencia' };
    } else {
        controlParams.value.humedad = { color: '#5CB85C', message: 'Estable' };
    }
});


onMounted(async () => {
    await alertaStore.getInfoAlt('anomalias');
    getTime();
    setTemperature();
    setHumidity();

    intervalId = setInterval(() => {
        getTime();
    }, 60000);
});

onBeforeUnmount(() => {
    if (chartInstanceTemperature) {
        chartInstanceTemperature.destroy();
    }

    if (chartInstanceHumidity) {
        chartInstanceHumidity.destroy();
    }

    if (intervalId) {
        clearInterval(intervalId);
    }
});
</script>

<template>
    <div class="container">
        <article>
            <header>
                <h2>Temperatura</h2>
            </header>

            <canvas ref="temperatura"></canvas>

            <p>Última medición: {{ lastTemperature }} °C - <span
                    :style="{ '--color': controlParams.temperatura.color }">
                    {{ controlParams.temperatura.message }}
                </span>
            </p>
        </article>

        <article>
            <header>
                <h2>Humedad Relativa</h2>
            </header>

            <canvas ref="humedad"></canvas>

            <p>Última medición: {{ lastHumidity }} % - <span :style="{ '--color': controlParams.humedad.color }">
                    {{ controlParams.humedad.message }}
                </span></p>
        </article>
    </div>
</template>
<style scoped>
.container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin: 0 auto;

    padding: 1.875rem;
    width: min(100%, 90rem);
    gap: 1.25rem;
}

header {
    text-align: center;
}

canvas {
    width: 100% !important;
}

p span {
    color: var(--color)
}
</style>