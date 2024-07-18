<template>
  <div class="app">
    <div class="title">
      <img src="../assets/LogoTDP.png" alt="Tejido DP">
      <h1>Calcula tu venta</h1> 
    </div>
    <div class="container">
      <form @submit.prevent="calcular">
        <div class="tiempo">
          <label>Hora: </label>
          <input v-model.number="datos.hours" type="number" step="any" required>
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
        <div class="accesorios">
          <div v-for="(accesorio, index) in accesorios" :key="index" class="accesorio">
            <input type="number" v-model.number="accesorios[index]">
            <button @click.prevent="eliminarAccesorio(index)">Eliminar</button>
          </div>
          <button @click.prevent="mostrarSubpantalla = true">Agregar Accesorio</button>
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
        <button type="submit" class="calcular-btn">Calcular</button>
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
  </div>
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
      }
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
    formatNumber(value) {
      return new Intl.NumberFormat('es-CO').format(value);
    }
  }
};
</script>

<style scoped>
.app {
  font-family: Arial, sans-serif;
  color: #333;
}

.title {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
}

.title img {
  height: 100px;
  margin-right: 10px;
}

.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.tiempo,
.accesorios,
.subpantalla,
.resultado {
  margin-bottom: 20px;
}

input[type="number"] {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
}

button {
  padding: 10px 20px;
  margin: 8px 5px 4px 0;
  border: none;
  border-radius: 5px;
  background-color: #ff66c4;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #e055a8;
}

.calcular-btn {
  background-color: #4CAF50;
}

.subpantalla {
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.resultado {
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
}

label {
  display: block;
  margin-top: 8px;
  font-weight: bold;
}
</style>
