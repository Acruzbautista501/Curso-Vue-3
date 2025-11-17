import axios from 'axios';
import type { Busqueda, Clima } from '../interfaces/Clima';
import { computed, ref } from 'vue';

export default function useClima() {

  /* Estado que almacena los datos del clima */
  const clima = ref<Clima>({
    main: {
      temp: 0,
      temp_min: 0,
      temp_max: 0
    },
    name: ''
  })

  /* Estado para indicar si la API está cargando */
  const cargandoClima = ref<boolean>(false)

  /* Estado para guardar mensajes de error */
  const error = ref<string>('')

  /* Función principal para consultar la API del clima */
  const obtenerClima = async (busqueda: Busqueda) => {
    // API Key almacenada en las variables de entorno
    const key = import.meta.env.VITE_API_KEY 

    cargandoClima.value = true

    // Reiniciamos los datos del clima y el error antes de una nueva búsqueda
    clima.value = {
      main: { temp: 0, temp_min: 0, temp_max: 0 },
      name: ''
    }
    error.value = ''

    try {
      // Extraemos ciudad y país enviados desde el formulario
      const { ciudad, pais } = busqueda

      // URL para obtener latitud y longitud según la ciudad buscada
      const url = `https://api.openweathermap.org/geo/1.0/direct?q=${ciudad},${pais}&limit=1&appid=${key}`;
      
      // Llamada a la API de geocodificación
      const { data } = await axios(url)
      const { lat, lon } = data[0]

      // URL para obtener el clima usando latitud y longitud
      const urlClima = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`

      // Llamada a la API del clima
      const { data: resultado } = await axios(urlClima)

      // Guardamos el resultado en el estado
      clima.value = resultado

    } catch {
      // En caso de error, mostramos mensaje
      error.value = 'Ciudad no encontrada'
    } finally {
      // Detenemos el estado de carga siempre
      cargandoClima.value = false
    }
  }

  /* Indica si ya existe información válida del clima */
  const mostrarClima = computed(() => {
    return clima.value.name !== '' // Se muestra solo si hay nombre de ciudad
  })

  /* Convierte temperatura Kelvin → Celsius */
  const formatearTemperatura = (temperatura: number): number => {
    return Math.round(temperatura - 273.15)
  }

  /* Exponemos funciones y estados al componente */
  return {
    obtenerClima,
    clima,
    mostrarClima,
    formatearTemperatura,
    cargandoClima,
    error
  }
}
