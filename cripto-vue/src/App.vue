
<script setup lang="ts">
  import { ref, reactive, onMounted } from 'vue';
  import type { Cotizar, Criptomoneda, Moneda } from './interfaces/Moneda';
  import Alerta from './components/Alerta.vue';

  const monedas = ref<Moneda[]>([
      { codigo: 'USD', texto: 'Dolar de Estados Unidos'},
      { codigo: 'MXN', texto: 'Peso Mexicano'},
      { codigo: 'EUR', texto: 'Euro'},
      { codigo: 'GBP', texto: 'Libra Esterlina'},
  ])

  const criptomonedas = ref<Criptomoneda[]>([])

  const cotizar = reactive<Cotizar>({
    moneda: '',
    criptomoneda: ''
  })

  const error = ref<string>('')

  const cotizacion = ref<{}>({})

  onMounted(() => {
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD'
    fetch(url)
      .then(respuesta => respuesta.json())
      .then(data => criptomonedas.value = data.Data)
      .catch(error => console.error(error))
  })

  const cotizarCripto = () => {
    // Validar que cotizar este lleno
    if(Object.values(cotizar).includes('')){
      error.value = 'Todos los campos son obligatorios'
      setTimeout(()=> (error.value = ''), 3000)
      return
    }

    obtenerCotizacion()
  }

  const obtenerCotizacion = async () => {
    try {
      const { moneda, criptomoneda } = cotizar
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`

      const respuesta = await fetch(url)
      const data = await respuesta.json()

      cotizacion.value = data.DISPLAY[criptomoneda][moneda]
    } catch(error) {
      console.log('Ocurrio un error:', error)
    }
  }

</script>

<template>
  <div class="contenedor">
    <h1 class="titulo">Cotizador de <span>criptomonedas</span></h1>
    <div class="contenido">
      <Alerta v-if="error">
        {{ error }}
      </Alerta>
      <form 
        class="formulario"
        @submit.prevent="cotizarCripto"
      >
        <div class="campo">
          <label for="moneda">Moneda:</label>
          <select 
            id="moneda"
            v-model="cotizar.moneda"
          >
            <option value="">--- Selecciona ---</option>
            <option
              v-for="moneda in monedas"
              :key="moneda.codigo" 
              :value="moneda.codigo"
            >
              {{ moneda.texto }}
            </option>
          </select>
        </div>
        <div class="campo">
          <label for="cripto">Criptomoneda:</label>
          <select 
            id="cripto"
            v-model="cotizar.criptomoneda"
          >
            <option value="">--- Selecciona ---</option>
            <option
              v-for="criptomoneda in criptomonedas"
              :key="criptomoneda.CoinInfo.Id" 
              :value="criptomoneda.CoinInfo.Name"
            >
              {{ criptomoneda.CoinInfo.FullName }}
            </option>
          </select>
        </div> 
        <input type="submit" value="Cotizar" />       
      </form>
    </div>
  </div>
</template>

<style>
</style>
