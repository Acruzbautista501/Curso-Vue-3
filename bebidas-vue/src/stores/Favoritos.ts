import { defineStore } from "pinia";
import { ref, watch, onMounted } from "vue";
import { useBebidasStore } from "./Bebidas";
import type { Bebida } from "@/interfaces/Categorias";


export const useFavoritosStore = defineStore('favoritos', () => {

  const bebidas = useBebidasStore()

  const favoritos = ref<Bebida[]>([])

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

  function existeFavorito(id: string) {
    const dataStorage = localStorage.getItem('favoritos')
    const favoritosLocalStorage = dataStorage ? JSON.parse(dataStorage) : []
    return favoritosLocalStorage.some((favorito: Bebida) => favorito.idDrink === id)
  }

  function handleClickFavorito() {
    if(existeFavorito(bebidas.receta.idDrink)) {
      console.log('Ya existe...')
    } else {
      favoritos.value.push(bebidas.receta)
    }
  }


  return {
    handleClickFavorito,
    existeFavorito,
    favoritos
  }
}) 

