import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/api/api';

export const useDatosStore = defineStore('datosStore', () => {
  let data = ref({});

  const getInfoDts = async (option) => {
    const headers = { 'Content-Type': 'application/json'}
    try {
        const response = await api.getItem(option,headers)
        if(response?.request?.status!==200)throw response
        data.value = response.data
        console.log(data.value)


    } catch (error) {
        console.log("error")
        console.log(error)
    }
  }

  return { data, getInfoDts }
})
