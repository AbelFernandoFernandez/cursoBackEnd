const moment = require('moment');

// Variable con la fecha actual
const fechaActual = moment();

// Variable con la fecha de tu nacimiento
const fechaNacimiento = moment('1970-12-30'); // Cambia esta fecha por tu fecha de nacimiento

// Validar si la fecha de nacimiento es válida
if (fechaNacimiento.isValid()) {
  // Calcular la diferencia de días
  const diferenciaEnDias = fechaActual.diff(fechaNacimiento, 'days');
  console.log(`Han pasado ${diferenciaEnDias} días desde tu nacimiento hasta hoy.`);
} else {
  console.log('La fecha de nacimiento no es válida.');
}

// Imprimir la versión de Moment.js utilizada
console.log(`Versión de Moment.js: ${moment.version}`);
