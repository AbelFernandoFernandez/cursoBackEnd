const fs = require('fs');

// Obtener la fecha y hora actual
const fechaActual = new Date().toLocaleString();

// Nombre del archivo
const nombreArchivo = 'fecha.txt';

// Escribir la fecha y hora en el archivo
fs.writeFile(nombreArchivo, fechaActual, (err) => {
    if (err) {
        console.error('Error al escribir el archivo:', err);
        return;
    }
    console.log('Archivo creado con éxito.');

    // Leer el archivo
    fs.readFile(nombreArchivo, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo:', err);
            return;
        }
        console.log('Contenido del archivo:');
        console.log(data); // Mostrar el contenido por consola
    });
});