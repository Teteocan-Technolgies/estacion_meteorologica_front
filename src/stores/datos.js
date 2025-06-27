import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/api/api';

export const useDatosStore = defineStore('datosStore', () => {
  const dataDts = ref({});

  const getInfoDts = async (option) => {
    const headers = { 'Content-Type': 'application/json' }
    try {
      const response = await api.getItem(option, headers);
      if (response?.request?.status !== 200) throw response;
      dataDts.value = response.data

    } catch (error) {
      console.log("error")
      console.log(error)
    }
  }

    const addInfoDts = async (payload) => {
      const headers = { 'Content-Type': 'application/json' }
  
      try {
        const response = await api.addItem(payload, headers);
        if (response?.request?.status !== 200) throw response;
        return response;
  
      } catch (error) {
        console.log("error")
        console.log(error)
      }
    }

  return { dataDts, getInfoDts, addInfoDts }
})
