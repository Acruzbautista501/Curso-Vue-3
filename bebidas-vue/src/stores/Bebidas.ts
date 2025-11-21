import type { Receta, Busqueda, Categoria, Bebida } from "@/interfaces/Categorias";
import APIServices from "@/services/APIServices";
import { defineStore } from "pinia";
import { ref, onMounted, reactive } from "vue";
import { useModalStore } from "./Modal";


export const useBebidasStore = defineStore('bebidas', () => {
   const modal = useModalStore()
   const categorias = ref<Categoria[]>([])
   const busqueda = reactive<Busqueda>({
      nombre: "",
      categoria: ""
   })

   const recetas = ref<Receta[]>([])
   const receta = ref<Bebida>({})

   onMounted(async () => {
    const cat = APIServices.obtenerCategorias()
    const {data: {drinks}} = await cat
    categorias.value = drinks
   })

   async function obtenerRecetas() {
      const buscar = APIServices.buscarRecetas(busqueda)
      const {data: {drinks}} = await buscar
      recetas.value = drinks
   }

   async function seleccionarBebida(id:string) {
      const bebida = APIServices.buscarReceta(id)
      const {data: {drinks}} = await bebida
      receta.value = drinks[0]

      modal.handleClickMdodal()
   }

   return {
    categorias,
    busqueda,
    recetas,
    receta,
    obtenerRecetas,
    seleccionarBebida
   }
})