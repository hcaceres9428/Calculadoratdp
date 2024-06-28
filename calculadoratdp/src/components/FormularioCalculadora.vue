<template>
  <h1>Calcula tu venta</h1>
    <div class="container">

      <form @submit.prevent="calcular">
        <div>
          <label>Hora: </label>
          <input v-model.number="datos.hours" type="number" step="any" required>
          <label>Minutos: </label>
          <input v-model.number="datos.minutes" type="number" step="any" required>
        </div>
        <div>
          <br><label>Peso lana comprada (gramos): </label><br>
          <input v-model.number="datos.purchasedLana" type="number" step="any" required>
        </div>
        <div>
          <br><label>Valor lana: </label><br>
          <input v-model.number="datos.costLana" type="number" step="any" required>
        </div>
        <div>
          <br><label>Cantidad lana usada (gramos): </label><br>
          <input v-model.number="datos.quantityLana" type="number" step="any" required>
        </div>
        <div>
          <div v-for="(accesorio, index) in accesorios" :key="index">
            <input type="number" v-model.number="accesorios[index]">
            <button @click.prevent="eliminarAccesorio(index)">Eliminar</button>
          </div>
          <button @click.prevent="mostrarSubpantalla = true">Agregar Accesorio</button>
          <div v-if="mostrarSubpantalla" class="subpantalla">
            <h2>Agregar Accesorio</h2>
            <input type="number" v-model.number="nuevoAccesorio"><br>
            <button @click.prevent="agregarAccesorio">Agregar</button>
            <button @click.prevent="mostrarSubpantalla = false">Cancelar</button>
          </div>
        </div>
        <div>
          <br><label>Comisión (%): </label><br>
          <input v-model.number="datos.comision" type="number" step="any" required>
        </div>
        <button type="submit">Calcular</button>
      </form>
    
      <div v-if="resultado" class="resultado">
        <h2>Resultados</h2>
        <p>Promedio: {{ resultado.promedio }}</p>
        <p>Comisión: {{ resultado.priceComision }}</p>
        <p>Total: {{ resultado.priceTotal }}</p>
        <p>Mi pago: {{ resultado.priceTiempo }}</p>
        <p>Material: {{ resultado.totalMaterial }}</p>
      </div> 
  
    </div>
</template>
  
<script>
  import { calcularVenta } from '@/components/calcularVenta.js'; // Ruta corregida
  
  export default {
    data() {
      return {
        datos: {
          hours: null,
          minutes: null,
          costLana: null,
          quantityLana: null,
          purchasedLana: null,
          comision: null
        },
        accesorios: [],
        nuevoAccesorio: 0,
        mostrarSubpantalla: false,
        resultado: {
        promedio: 0,
        priceComision: 0,
        priceTotal: 0,
        priceTiempo: 0,
        totalMaterial: 0
      } // Datos iniciales para que la sección sea visible
      };
    },
    methods: {
      calcular() {
        const totalAccesorios = this.accesorios.reduce((total, accesorio) => total + accesorio, 0);
        this.datos.totalAccesorios = totalAccesorios;
        this.resultado = calcularVenta(this.datos);
      },
      agregarAccesorio() {
        if (this.nuevoAccesorio > 0) {
          this.accesorios.push(this.nuevoAccesorio);
          this.nuevoAccesorio = 0;
          this.mostrarSubpantalla = false;
        }
      },
      eliminarAccesorio(index) {
        this.accesorios.splice(index, 1);
      }
    }
  };
</script>
  
<style scoped>
  .subpantalla {
    background-color: #4DF4FF;
    -webkit-text-fill-color: black;
    width: 50%; /* Ajusta el ancho del fondo Calc_1 */
    margin: 0 auto; /* Centra horizontalmente */
    padding: 20px; /* Ajusta el relleno según sea necesario */
  }
  .container{
    display: grid;
    grid-template-columns: 2fr 3fr;
    margin: auto;
    padding: 25px;
    border-style: solid;
    border-radius: 12px;
    height: auto;
    width: max-content;
    background-color: #4DF4FF;
    -webkit-text-fill-color: black;
  }
  input{
    border-radius: 5px;
    margin-top: 5px;
    width: 80px;
    height: 20px;
    text-align: center;
    font-weight: bold;
  }
  button{
    border-radius: 5px;
    margin-top: 5px;
    margin-right: 2px;
    width: auto;
    height: auto;
    font-size: large;
    text-align: center;
  }
  label{
    margin-left: 15px;
    font-weight: bold;
  }
  .resultado{
    margin: auto;
    padding: 25px;
    border-style: solid;
    border-radius: 12px;
    height: auto;
    width: max-content;
    background-color: #4DF4FF;
    -webkit-text-fill-color: black;
  }
</style>
  