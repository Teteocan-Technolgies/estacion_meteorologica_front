<script setup>
import { ref } from 'vue';
import dayjs from 'dayjs';

const yesterday = ref(dayjs().subtract(1, 'day').format('YYYY-MM-DD'));
const daysData = ref(
    {
        from: '',
        to: '',
    }
);

const submitData = () => {
    console.log("daysData.value")
    console.log(daysData.value)
}

</script>
<template>
    <form @submit.prevent="submitData">
        <fieldset>
            <label for="from">Desde:</label>
            <input type="date" id="from" :max="daysData.to ? daysData.to : yesterday" v-model="daysData.from">
        </fieldset>
        <fieldset>
            <label for="to-day">Hasta:</label>
            <input type="date" id="to-day" :max="yesterday" v-model="daysData.to" :min="daysData.from">
        </fieldset>

        <button type="submit">Descargar csv</button>
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
    
    gap: 10px;
}

input {
    height: 30px;
    padding: 0 15px;
    border-radius: 5px;
    width: 100%;
}

button {
    grid-column: -1 / -2;
    justify-self: end;

    height: 30px;
    width: min(100%, 180px);
    border: 1px solid #000;
    border-radius: 60px;
}
</style>