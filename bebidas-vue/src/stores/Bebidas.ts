import type { Busqueda, Categoria } from "@/interfaces/Categorias";
import APIServices from "@/services/APIServices";
import { defineStore } from "pinia";
import { ref, onMounted, reactive } from "vue";


export const useBebidasStore = defineStore('bebidas', () => {
   const categorias = ref<Categoria[]>([])
   const busqueda = reactive<Busqueda>({
      nombre: "",
      categoria: ""
   })

   onMounted(async () => {
    const cat = APIServices.obtenerCategorias()
    const {data: {drinks}} = await cat
    categorias.value = drinks
   })

   function obtenerRecetas() {
      console.log('Consultando API...')
   }

   return {
    categorias,
    busqueda,
    obtenerRecetas
   }
})