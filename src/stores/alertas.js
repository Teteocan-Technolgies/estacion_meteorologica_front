import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/api/api';

export const useAlertasStore = defineStore('alertasStore', () => {
  const dataAlt = ref({});

  const getInfoAlt = async (option) => {
    const headers = { 'Content-Type': 'application/json' }
    try {
      const response = await api.getItem(option, headers);
      if (response?.request?.status !== 200) throw response;
      dataAlt.value = response.data

    } catch (error) {
      console.log("error")
      console.log(error)
    }
  }

  const editInfoAlt = async (payload) => {
    const headers = { 'Content-Type': 'application/json' }

    try {
      const response = await api.patchItem(payload, headers);
      if (response?.request?.status !== 200) throw response;
      return response;

    } catch (error) {
      console.log("error")
      console.log(error)
    }
  }

  return { dataAlt, getInfoAlt, editInfoAlt }
})
