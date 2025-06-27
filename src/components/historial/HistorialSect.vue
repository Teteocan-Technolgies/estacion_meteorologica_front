<script setup>
import { ref } from 'vue';
import { useDatosStore } from '@/stores/datos';
import * as XLSX from 'xlsx';

const datosStore = useDatosStore();

const daysData = ref(
    {
        from: '',
        to: '',
    }
);

const submitData = async () => {
    const response = await datosStore.addInfoDts({
        option: 'humedad_temp/range',
        item: daysData.value
    })
    console.log("response")
    console.log(response)
    if (Array.isArray(response?.data && response?.data.length > 0)) exportToExcel(response.data);

}

const exportToExcel = (data) => {
    const cleaned = data.map(item => ({
        Fecha: item.Fecha,
        Temperatura: item.Temperatura,
        Humedad: item.Humedad
    }));

    const worksheet = XLSX.utils.json_to_sheet(cleaned);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");

    XLSX.writeFile(workbook, "datos_climaticos.xlsx");
};

</script>
<template>
    <form @submit.prevent="submitData">
        <fieldset>
            <label for="from">Desde:</label>
            <input type="date" id="from" min="2025-06-24" max="2025-06-26" v-model="daysData.from">
        </fieldset>
        <fieldset>
            <label for="to-day">Hasta:</label>
            <input type="date" id="to-day" min="2025-06-24" max="2025-06-26" v-model="daysData.to">
        </fieldset>

        <button type="submit">Descargar excel</button>
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
    border: 0;
    display: grid;
    justify-items: start;

    gap: .625rem;
}

input {
    height: 1.875rem;
    padding: 0 .9375rem;
    border-radius: .3125rem;
    width: 100%;
}

button {
    grid-column: -1 / -2;
    justify-self: end;

    height: 1.875rem;
    width: min(100%, 11.25rem);
    border: .0625rem solid #000;
    border-radius: 3.75rem;
}
</style>