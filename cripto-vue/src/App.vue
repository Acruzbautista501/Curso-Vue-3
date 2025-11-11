<script setup lang="ts">
  // Importamos las funciones reactivas de Vue
  import { ref, reactive } from 'vue';

  // Importamos la interfaz "Cotizar" para tipar correctamente el objeto de formulario
  import type { Cotizar } from './interfaces/Moneda';

  // Importamos los componentes reutilizables
  import Alerta from './components/Alerta.vue';
  import Spinner from './components/Spinner.vue';
  import Cotizacion from './components/Cotizacion.vue';

  // Importamos el composable personalizado que contiene la lógica principal
  import useCripto from './composables/useCripto';

  // Extraemos las propiedades y funciones que devuelve el composable
  const { 
    monedas,             // Lista de monedas disponibles ( USD, MXN, EUR)
    criptomonedas,       // Lista de criptomonedas obtenidas de la API
    cargando,            // Estado booleano que indica si la app está cargando datos
    cotizacion,          // Resultado de la cotización obtenida de la API
    obtenerCotizacion,   // Función que consulta la API y actualiza el resultado
    mostrarResultado     // Booleano que indica si ya hay una cotización lista para mostrar
  } = useCripto()

  // Estado reactivo que guarda los valores seleccionados en el formulario
  const cotizar = reactive<Cotizar>({
    moneda: '',          // Moneda seleccionada (ej. USD)
    criptomoneda: ''     // Criptomoneda seleccionada (ej. BTC)
  })

  // Variable reactiva para almacenar mensajes de error
  const error = ref<string>('')

  // Función que valida el formulario y solicita la cotización
  const cotizarCripto = () => {
    // Verificamos que ambos campos (moneda y criptomoneda) estén llenos
    if(Object.values(cotizar).includes('')){
      error.value = 'Todos los campos son obligatorios'
      // Ocultamos el mensaje de error automáticamente después de 3 segundos
      setTimeout(()=> (error.value = ''), 3000)
      return
    }

    // Si pasa la validación, limpiamos errores anteriores
    error.value = ''
    // Llamamos al composable para obtener la cotización desde la API
    obtenerCotizacion(cotizar)
  }
</script>

<template>
  <div class="contenedor">
    <h1 class="titulo">Cotizador de <span>criptomonedas</span></h1>

    <div class="contenido">
      <!-- Componente de alerta, visible solo si existe un mensaje de error -->
      <Alerta v-if="error">
        {{ error }}
      </Alerta>

      <!-- Formulario para seleccionar moneda y criptomoneda -->
      <!-- @submit.prevent="cotizarCripto" -> Evita el refresh y llama a la función de cotización -->
      <form 
        class="formulario"
        @submit.prevent="cotizarCripto"
      >
        <!-- Campo para seleccionar la moneda -->
        <!-- v-model="cotizar.moneda" -> Enlaza el valor seleccionado al estado reactivo -->
        <div class="campo">
          <label for="moneda">Moneda:</label>
          <select 
            id="moneda"
            v-model="cotizar.moneda"
          >
            <option value="">--- Selecciona ---</option>
            <!-- v-for="moneda in monedas" -> Itera sobre la lista de monedas -->
            <!-- :key="moneda.codigo" -> Clave única para cada elemento -->
            <!-- :value="moneda.codigo" -> Valor asociado al select -->
            <option
              v-for="moneda in monedas"          
              :key="moneda.codigo"
              :value="moneda.codigo"             
            >
              {{ moneda.texto }} <!-- Texto visible (ej. Dólar, Euro...) -->
            </option>
          </select>
        </div>

        <!-- Campo para seleccionar la criptomoneda -->
        <div class="campo">
          <label for="cripto">Criptomoneda:</label>
          <select 
            id="cripto"
            v-model="cotizar.criptomoneda"
          >
            <option value="">--- Selecciona ---</option>
            <!-- v-for="criptomoneda in criptomonedas" -> Itera sobre la lista de criptomonedas -->
            <!-- :key="criptomoneda.CoinInfo.Id" -> Clave única proporcionada por la API -->
            <!-- :value="criptomoneda.CoinInfo.Name" -> Valor (ej. BTC, ETH, LTC...) -->
            <option
              v-for="criptomoneda in criptomonedas"  
              :key="criptomoneda.CoinInfo.Id"        
              :value="criptomoneda.CoinInfo.Name" 
            >
              {{ criptomoneda.CoinInfo.FullName }}    <!-- Nombre completo (ej. Bitcoin, Ethereum...) -->
            </option>
          </select>
        </div> 

        <!-- Botón de envío -->
        <input type="submit" value="Cotizar" />       
      </form>

      <!-- Componente de carga, visible mientras la API responde -->
      <Spinner v-if="cargando === true" />

      <!-- Muestra el resultado de la cotización si ya está disponible -->
      <Cotizacion 
        v-if="mostrarResultado"
        :cotizacion="cotizacion" 
      />
    </div>
  </div>
</template>
