<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAlertasStore } from '@/stores/alertas';

const alertasStore = useAlertasStore();
const data = computed(() => alertasStore.dataAlt);

const getInfo = async () => {
    await alertasStore.getInfoAlt('anomalias');
    for (let index = 0; index < data.value.length; index++) {
        info.value[index].warning = data.value[index].warning
        info.value[index].danger = data.value[index].danger
    }
}

const info = ref([
    {
        legend: 'Temperatura',
        condition: 'mayor a',
        warning: undefined,
        danger: undefined
    },
    {
        legend: 'Humedad',
        condition: 'mayor a',
        warning: undefined,
        danger: undefined
    },
    {
        legend: 'Calidad del aire',
        condition: 'mayor a',
        warning: undefined,
        danger: undefined
    },
    {
        legend: 'Intensidad luminosa',
        condition: 'menor a',
        warning: undefined,
        danger: undefined
    },
])

const submitData = async () => {
    const keys = ["temperatura", "humedad", "aire", "luxes"];
    const infoVal = {};
    const original = {};

    // Rellenar infoVal y original con datos actuales y nuevos
    for (let index = 0; index < keys.length; index++) {
        const key = keys[index];
        infoVal[key] = {
            warning: info.value[index].warning,
            danger: info.value[index].danger
        };
        original[data.value[index].variable] = {
            warning: data.value[index].warning,
            danger: data.value[index].danger
        };
    }

    const toUpdate = [];
    for (const key of keys) {
        const originalVal = original[key];
        const newVal = infoVal[key];

        if (
            originalVal?.warning !== newVal?.warning ||
            originalVal?.danger !== newVal?.danger
        ) {
            toUpdate.push({ [key]: newVal });
        }
    }

    const promiseArr = [];
    for (const element of toUpdate) {
        const key = Object.keys(element)[0];
        const payload = {
            option: `anomalias/${key}`,
            item: element[key]
        };


        const responsePromise = alertasStore.editInfoAlt(payload);
        promiseArr.push(responsePromise);
    }

    await Promise.all(promiseArr);
    await getInfo()
};


onMounted(() => {
    getInfo()
})

</script>
<template>
    <form @submit.prevent="submitData">
        <fieldset v-for="(condition, index) in info" :key="index">
            <h3>{{ condition.legend }} ({{ condition.condition }})</h3>
            <div>
                <label :for="`warning__${index}`">Precaución</label>
                <input type="number" :id="`warning__${index}`" v-model="condition.warning">
            </div>
            <div>
                <label :for="`danger__${index}`">Peligro</label>
                <input type="number" :id="`danger__${index}`" v-model="condition.danger">
            </div>
        </fieldset>
        <button type="submit">Guardar</button>
    </form>
</template>
<style scoped>
form {
    display: grid;
    margin: 0 auto;
    padding: 2rem;
    width: min(100%, 90rem);
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 37.5rem), 1fr));

    gap: 2rem;
    background: #f9f9f9;
    border-radius: 1rem;
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.05);
}

fieldset {
    border: none;
    display: grid;
    gap: 1rem;
    padding: 1rem;
    background-color: #fff;
    border-radius: 0.5rem;
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.03);
}

h3 {
    font-size: 1.125rem;
    margin: 0;
}

div {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

label {
    font-weight: 500;
    color: #333;
}

input {
    height: 2.5rem;
    padding: 0 1rem;
    border-radius: 0.5rem;
    border: 1px solid #ccc;
    font-size: 1rem;
    transition: border-color 0.2s ease;
}

input:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

button {
    justify-self: end;
    padding: 0.5rem 1.5rem;
    background-color: #007bff;
    color: white;
    font-weight: bold;
    font-size: 1rem;
    border: none;
    border-radius: 9999px;
    cursor: pointer;
    transition: background-color 0.2s ease;
    grid-column: -1 / -2;
}

button:hover {
    background-color: #0056b3;
}
</style>