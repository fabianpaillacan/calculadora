const pantalla = document.getElementById('pantalla');
let operacion = '';

function agregar(valor) {
    if (pantalla.value === '0' && !isNaN(valor)) {
        pantalla.value = valor;
    } else {
        pantalla.value += valor;
    }
    operacion += valor;
}

function calcular() {
    pantalla.value = eval(operacion);
    operacion = pantalla.value; // Actualiza la operación con el resultado
}

function limpiar() {
    pantalla.value = '0';
    operacion = '';
}