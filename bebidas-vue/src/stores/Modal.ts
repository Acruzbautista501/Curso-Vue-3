import { defineStore } from "pinia";
import { ref } from "vue";

export const useModalStore = defineStore('modal', ()=> {
  const modal = ref<boolean>(false)

  function handleClickMdodal() {
    modal.value = !modal.value
  }
  
  return {
    modal,
    handleClickMdodal
  }
})