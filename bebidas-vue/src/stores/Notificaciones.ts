import type { Notificacion } from "@/interfaces/Categorias";
import { defineStore } from "pinia";
import { reactive, watchEffect } from "vue";

export const useNotificacionStore = defineStore('notificacion', () => {
  const campos = reactive<Notificacion>({
    texto: "",
    error: false,
    mostrar: false
  })

  watchEffect(() => {
    if (campos.mostrar) {
      setTimeout(() => {
        Object.assign(campos, {
          texto: "",
          error: false,
          mostrar: false,
        });
      }, 3000);
    }
  })


  return {
    campos,
  }
}) 