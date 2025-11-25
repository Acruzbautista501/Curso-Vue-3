import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { useFavoritosStore } from "./Favoritos";
// import { useBebidasStore } from "./Bebidas";

export const useModalStore = defineStore('modal', ()=> {

  const favoritos = useFavoritosStore()
  // const bebidas = useBebidasStore()
  
  const modal = ref<boolean>(false)

  function handleClickMdodal() {
    modal.value = !modal.value
  }

  const textoBoton = computed(() => {
    return favoritos.existeFavorito() ? 'Eliminar de Favoritos' : 'Agregar a Favoritos'
  })
  
  return {
    modal,
    textoBoton,
    handleClickMdodal
  }
})