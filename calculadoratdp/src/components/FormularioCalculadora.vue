<template>
    <div>
      <h1>Calcula tu venta</h1>
      <form @submit.prevent="calcular">
        <div>
          <label>Hora: </label>
          <input v-model.number="datos.hours" type="number" step="any" required>
        </div>
        <div>
          <label>Minutos: </label>
          <input v-model.number="datos.minutes" type="number" step="any" required>
        </div>
        <div>
          <label>Peso lana comprada (gramos): </label>
          <input v-model.number="datos.purchasedLana" type="number" step="any" required>
        </div>
        <div>
          <label>Valor lana: </label>
          <input v-model.number="datos.costLana" type="number" step="any" required>
        </div>
        <div>
          <label>Cantidad lana usada (gramos): </label>
          <input v-model.number="datos.quantityLana" type="number" step="any" required>
        </div>
        <div>
          <label for="accesorios">Accesorios</label><br>
          <div v-for="(accesorio, index) in accesorios" :key="index">
            <input type="number" v-model.number="accesorios[index]">
            <button @click.prevent="eliminarAccesorio(index)">Eliminar</button>
          </div>
          <button @click.prevent="mostrarSubpantalla = true">Agregar</button>
          <div v-if="mostrarSubpantalla" class="subpantalla">
            <h2>Agregar Accesorio</h2>
            <input type="number" v-model.number="nuevoAccesorio">
            <button @click.prevent="agregarAccesorio">Agregar</button>
            <button @click.prevent="mostrarSubpantalla = false">Cancelar</button>
          </div>
        </div>
        <div>
          <label>Comisión (%): </label>
          <input v-model.number="datos.comision" type="number" step="any" required>
        </div>
        <button type="submit">Calcular</button>
      </form>
  
      <div v-if="resultado">
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
          hours: 0,
          minutes: 0,
          costLana: 0,
          quantityLana: 0,
          purchasedLana: 0,
          comision: 0
        },
        accesorios: [],
        nuevoAccesorio: 0,
        mostrarSubpantalla: false,
        resultado: null
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
    border: 1px solid #000;
    padding: 20px;
    margin: 20px 0;
  }
  </style>
  