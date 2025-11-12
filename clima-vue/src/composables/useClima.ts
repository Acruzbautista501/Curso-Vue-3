import type { Busqueda } from '../interfaces/Clima';


export default function useClima() {

  const obtenerClima = (busqueda: Busqueda) => {
    // Importar el API Key
    const key = import.meta.env.VITE_API_KEY 

    // Obtener lat, long
    const {ciudad, pais} = busqueda
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${ciudad},${pais}&limit=1&appid=${key}`

    console.log(url);
  }

  return {
    obtenerClima
  }
}