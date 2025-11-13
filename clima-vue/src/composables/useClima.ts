import axios from 'axios';
import type { Busqueda, Clima } from '../interfaces/Clima';
import { computed, ref } from 'vue';

export default function useClima() {

  const clima = ref<Clima>({
    main: {
      temp: 0,
      temp_min: 0,
      temp_max: 0
    },
    name: ''
  })
  const cargandoClima = ref<boolean>(false)
  const error = ref<string>('')

  const obtenerClima = async (busqueda: Busqueda) => {
    // Importar el API Key
    const key = import.meta.env.VITE_API_KEY 

    cargandoClima.value = true
    clima.value= Object.assign({
      main: {
        temp: 0,
        temp_min: 0,
        temp_max: 0
      },
      name: ''
    })
    error.value = ''
    try {

      // Obtener lat, long
      const {ciudad, pais} = busqueda
      const url = `https://api.openweathermap.org/geo/1.0/direct?q=${ciudad},${pais}&limit=1&appid=${key}`;
      console.log(url)
      
      const {data} = await axios(url)
      const {lat, lon} = data[0]

      // Obtener el clima
      const urlClima = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`
      const {data: resultado} = await axios(urlClima)
      clima.value = resultado

    } catch {
      error.value = 'Ciudad no encontrda'
    } finally {
      cargandoClima.value = false
    }
  }

  const mostrarClima = computed(() => {
    return clima.value.name !== '' // se muestra solo si hay nombre de ciudad
  })


  const formatearTemperatura = (temperatura: number): number => {
    return Math.round(temperatura - 273.15)
  }


  return {
    obtenerClima,
    clima,
    mostrarClima,
    formatearTemperatura,
    cargandoClima,
    error
  }
}