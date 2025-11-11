// Importamos funciones reactivas y de ciclo de vida de Vue
import { ref, onMounted, computed } from "vue";
// Importamos los tipos TypeScript para tipar correctamente las variables
import type { Moneda, Criptomoneda, Cotizar, Cotizacion } from '../interfaces/Moneda';

// Composable que encapsula toda la lógica del cotizador de criptomonedas
export default function useCripto() {

  // Lista fija de monedas disponibles para seleccionar en el formulario
  const monedas = ref<Moneda[]>([
    { codigo: 'USD', texto: 'Dólar de Estados Unidos' },
    { codigo: 'MXN', texto: 'Peso Mexicano' },
    { codigo: 'EUR', texto: 'Euro' },
    { codigo: 'GBP', texto: 'Libra Esterlina' },
  ])

  // Arreglo reactivo donde se almacenan las criptomonedas obtenidas de la API
  const criptomonedas = ref<Criptomoneda[]>([])

  // Objeto reactivo donde se guarda la información de la cotización seleccionada
  const cotizacion = ref<Cotizacion>({})

  // Estado booleano para indicar si se está cargando la información desde la API
  const cargando = ref<boolean>(false)

  // Se ejecuta automáticamente cuando el componente que usa este composable se monta
  onMounted(() => {
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD'
    
    // Llamada a la API para obtener el listado de las 20 criptomonedas más populares
    fetch(url)
      .then(respuesta => respuesta.json())
      .then(data => criptomonedas.value = data.Data) // Guardamos los resultados en el estado reactivo
      .catch(error => console.error(error))           // Captura y muestra errores en consola
  })

  // Función asíncrona que obtiene la cotización de una criptomoneda en una moneda específica
  const obtenerCotizacion = async (cotizar: Cotizar) => {
    cargando.value = true            // Activamos el spinner de carga
    cotizacion.value = {}            // Limpiamos resultados previos

    try {
      // Desestructuramos los valores del formulario
      const { moneda, criptomoneda } = cotizar

      // URL dinámica para consultar el precio de la criptomoneda seleccionada
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`

      // Realizamos la petición a la API
      const respuesta = await fetch(url)
      const data = await respuesta.json()

      // Guardamos en el estado solo la información de la criptomoneda y moneda seleccionadas
      cotizacion.value = data.DISPLAY[criptomoneda][moneda]
    } 
    catch (error) {
      console.log('Ocurrió un error:', error)
    } 
    finally {
      cargando.value = false         // Desactivamos el spinner de carga
    }
  }

  // Propiedad computada que indica si ya hay datos disponibles para mostrar el resultado
  const mostrarResultado = computed(() => {
    return Object.values(cotizacion.value).length > 0
  })

  // Retornamos todas las propiedades y funciones necesarias para usar en los componentes
  return {
    monedas,            // Monedas disponibles
    criptomonedas,      // Lista de criptomonedas obtenidas de la API
    cotizacion,         // Resultado de la cotización
    cargando,           // Estado de carga
    obtenerCotizacion,  // Función para consultar la cotización
    mostrarResultado    // Indicador para mostrar u ocultar el resultado
  }  
}
