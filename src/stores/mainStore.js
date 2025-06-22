import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useMainStore = defineStore('mainStore', () => {
  const historyOption = ref('Default');

  const setHistoryOption = (value) => historyOption.value = value;

  return { historyOption, setHistoryOption }
})
