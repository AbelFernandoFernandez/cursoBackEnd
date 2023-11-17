const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let frase = "Frase inicial";

// Método GET para obtener la frase completa
app.get('/api/frase', (req, res) => {
  res.json({ frase });
});
// Método POST para agregar una palabra al final de la frase
app.post('/api/palabras', (req, res) => {
  const nuevaPalabra = req.body.palabra;
  frase = `${frase} ${nuevaPalabra}`;
  const palabras = frase.split(' ');
  const pos = palabras.length;

  res.json({ agregada: nuevaPalabra, pos });
});
// Método PUT para reemplazar una palabra en una posición específica
app.put('/api/palabras/:pos', (req, res) => {
  const pos = parseInt(req.params.pos);
  const nuevaPalabra = req.body.palabra;
  const palabras = frase.split(' ');

  if (pos > 0 && pos <= palabras.length) {
    const palabraAnterior = palabras[pos - 1];
    palabras[pos - 1] = nuevaPalabra;
    frase = palabras.join(' ');

    res.json({ actualizada: nuevaPalabra, anterior: palabraAnterior });
  } else {
    res.status(400).json({ error: 'Posición inválida' });
  }
});
// Método DELETE para eliminar una palabra en una posición específica
app.delete('/api/palabras/:pos', (req, res) => {
  const pos = parseInt(req.params.pos);
  const palabras = frase.split(' ');

  if (pos > 0 && pos <= palabras.length) {
    const palabraEliminada = palabras.splice(pos - 1, 1)[0];
    frase = palabras.join(' ');

    res.json({ eliminada: palabraEliminada });
  } else {
    res.status(400).json({ error: 'Posición inválida' });
  }
});
// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});


