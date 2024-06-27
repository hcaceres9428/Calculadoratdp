function redondearSegunRegla(valor) {
    let parteDecimal = valor - Math.floor(valor);
    if (parteDecimal >= 0.6) {
        return Math.ceil(valor);
    } else {
        return Math.floor(valor);
    }
}

function calcularVenta(datos) {
    const priceHora = 8000;
    const priceTiempo = priceHora * datos.hours + (priceHora / 60) * datos.minutes;
    const priceGramoLana = datos.costLana / datos.purchasedLana;
    const totalLana = datos.quantityLana * priceGramoLana;
    const totalAccesorios = datos.totalAccesorios;

    let promedio = totalLana + totalAccesorios + priceTiempo;
    promedio = redondearSegunRegla(promedio);

    const comision = datos.comision;
    const priceComision = redondearSegunRegla((comision / 100) * promedio);
    const priceTotal = redondearSegunRegla(priceComision + promedio);

    return {
        promedio: promedio,
        priceComision: priceComision,
        priceTotal: priceTotal,
        priceTiempo: priceTiempo,
        totalMaterial: totalAccesorios + totalLana
    };
}

export { calcularVenta }; // Exportar la función
