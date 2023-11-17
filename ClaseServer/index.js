// Crear un proyecto basado en express js, el cual cuente con un servidor que escuche en el puerto 8080.
// Además de configurar los siguientes endpoints:
// El endpoint del método GET a la ruta  ‘/bienvenida’
// deberá devolver un html con letras en color azul, en una string, dando la bienvenida.
// El endpoint del método GET a la ruta ‘/usuario’
// deberá devolver un objeto con los datos de un usuario falso: {nombre, apellido,edad, correo}

const express = require('express');
const app = express();
// Configuración del puerto
app.listen(8080, () => {
  console.log('Servidor iniciado en el puerto 8080');
});
// Configuración del endpoint /bienvenida
app.get('/bienvenida', (req, res) => {
  res.send('<h1 style="color: blue;">¡Bienvenido!</h1>');
});
// Configuración del endpoint /usuario
app.get('/usuario', (req, res) => {
  const usuario = {
    nombre: 'Juan',
    apellido: 'Pérez',
    edad: 30,
    correo: 'juan@perez.com',
  };
  res.send(usuario);
});
