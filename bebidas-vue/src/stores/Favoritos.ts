import { defineStore } from "pinia";
import { ref, watch, onMounted, computed } from "vue";
import { useBebidasStore } from "./Bebidas";
import type { Bebida } from "@/interfaces/Categorias";
import { useModalStore } from "./Modal";


export const useFavoritosStore = defineStore('favoritos', () => {

  const bebidas = useBebidasStore()

  const favoritos = ref<Bebida[]>([])

  const modal = useModalStore()

onMounted(() => {
  const data = localStorage.getItem('favoritos')
  favoritos.value = data ? JSON.parse(data) : []
})


  watch(favoritos, () => {
    sincronizarLocalStorage()
  }, {
    deep: true
  }
)

  function sincronizarLocalStorage() {
    localStorage.setItem('favoritos', JSON.stringify(favoritos.value))
  }

  function existeFavorito() {
    const dataStorage = localStorage.getItem('favoritos')
    const favoritosLocalStorage = dataStorage ? JSON.parse(dataStorage) : []
    return favoritosLocalStorage.some((favorito: Bebida) => favorito.idDrink === bebidas.receta.idDrink)
  }

  function eliminarFavorito() {
    favoritos.value = favoritos.value.filter( favorito => favorito.idDrink !== bebidas.receta.idDrink)
  }

  function agregarFavorito() {
    favoritos.value.push(bebidas.receta)
  }

  function handleClickFavorito() {
    if(existeFavorito()) {
      eliminarFavorito()
    } else {
      agregarFavorito()
    }
    modal.modal = false
  }

  const noFavoritos = computed(() => favoritos.value.length === 0)

  return {
    handleClickFavorito,
    existeFavorito,
    favoritos,
    noFavoritos
  }
}) 

