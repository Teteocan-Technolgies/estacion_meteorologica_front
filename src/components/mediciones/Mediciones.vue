<script setup>
import { Chart, registerables } from 'chart.js';
import { onMounted, onBeforeUnmount, ref } from 'vue';
import dayjs from 'dayjs';

Chart.register(...registerables);

const temperatura = ref(null);
const humedad = ref(null);

const lastTemperature = ref(null);
const lastHumidity = ref(null);

let chartInstanceTemperature = null;
let chartInstanceHumidity = null;

let intervalId = null;

const getTime = () => {
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

    const newTemp = Math.floor(Math.random() * 10) + 18;
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

    const newHumidity = Math.floor(Math.random() * 10) + 20;
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

onMounted(() => {
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

            <p>Última medición: {{ lastTemperature }} °C</p>
        </article>

        <article>
            <header>
                <h2>Humedad Relativa</h2>
            </header>

            <canvas ref="humedad"></canvas>

            <p>Última medición: {{ lastHumidity }} %</p>
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
</style>