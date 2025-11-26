import type { Notificacion } from "@/interfaces/Categorias";
import { defineStore } from "pinia";
import { reactive } from "vue";

export const useNotificacionStore = defineStore('notificacion', () => {
    const campos = reactive<Notificacion>({
        texto: "",
        error: false,
        mostrar: false
    })


    return {
        campos
    }
}) 