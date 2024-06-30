<template>
  <body>
    <div class="title">
    <img src="../assets/LogoTDP.png" alt="Tejido DP">
    <h1>Calcula tu venta</h1> 
  </div>
    <div class="container">
        <form @submit.prevent="calcular">
        <div>
          <label>Hora: </label>
          <input v-model.number="datos.hours" type="number" step="any" required>
          <label>Minutos: </label>
          <input v-model.number="datos.minutes" type="number" step="any" required>
        </div>
        <div>
          <label>Peso lana comprada (gramos): </label><br>
          <input v-model.number="datos.purchasedLana" type="number" step="any" required>
        </div>
        <div>
          <label>Valor lana: </label><br>
          <input v-model.number="datos.costLana" type="number" step="any" required>
        </div>
        <div>
          <label>Cantidad lana usada (gramos): </label><br>
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
          <label>Comisión (%): </label><br>
          <input v-model.number="datos.comision" type="number" step="any" required>
        </div>
        <button type="submit">Calcular</button>
      </form>
    
      <div v-if="resultado" class="resultado">
        <h2>Resultados</h2>
        <p>Total: {{ formatNumber(resultado.priceTotal) }}</p>
        <p>Promedio: {{ formatNumber(resultado.promedio) }}</p>
        <p>Comisión: {{ formatNumber(resultado.priceComision) }}</p>        
        <p>Mi pago: {{ formatNumber(resultado.priceTiempo) }}</p>
        <p>Material: {{ formatNumber(resultado.totalMaterial) }}</p>
      </div>  
    </div>  
  </body>  
</template>
  
<script>
  import { calcularVenta } from '@/components/calcularVenta.js'; 
  
  export default {
    data() {
      return {
        datos: {
          hours: 0,
          minutes: 0,
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
      },
      // Método formatNumber para formatear los números con separadores de miles
      formatNumber(value) {
        return new Intl.NumberFormat('es-CO').format(value);
      }
    }
  };
</script>
  
<style scoped>
  .title{
    display: flex;
    height: 80px;
    justify-content: center;
    margin: 10px;
  }
  .title img{
    margin-right: 8px;
  }
  .subpantalla {
    background-color: #FFF3F3;
    -webkit-text-fill-color: black;
    width: 50%;
    margin: 0 auto;
    padding: 20px;
  }
  .container{
    margin: auto;
    padding: 15px;
    border-style: solid;
    border-radius: 12px;
    height: auto;
    width: max-content;
    background-color: #FFF3F3;
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
    background-color: #FFF3F3;
    border-radius: 5px;
    margin-top: 5px;
    margin-right: 2px;
    width: auto;
    height: auto;
    font-size: large;
    text-align: center;
  }
  button:hover {
    background-color: #ff66c4;
  }
  div {
  margin-bottom: 10px; /* Ejemplo de margen entre secciones */
  }
  label{
    margin-right: 10px;
    margin-left: 15px;
    font-weight: bold;
  }
  .resultado{
    margin: auto;
    margin-top: 10px;
    padding: 25px;
    border-style: dashed;
    border-radius: 12px;
    height: auto;
    width: 180px;
    background-color: #FFF3F3;
    -webkit-text-fill-color: black;
  }
</style>
  