const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Importar cors
const app = express();
const port = 3000;

app.use(cors()); 
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente');
});

app.get('/api/posts', async (req, res) => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.get('/api/posts/:id', async (req, res) => {
  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${req.params.id}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.get('/api/comments', async (req, res) => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/comments');
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.get('/api/posts/:id/comments', async (req, res) => {
  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${req.params.id}/comments`);
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

// Exportar la instancia de la aplicación para pruebas
module.exports = app;

// Solo iniciar el servidor si no está en un entorno de prueba
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });
}
