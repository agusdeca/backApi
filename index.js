const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); // Asegúrate de instalarlo con `npm install node-fetch`
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    const htmlResponse = `
      <html>
        <head>
          <title>NodeJs y Express en Vercel</title>
        </head>
        <body>
          <h1>Soy un proyecto Back end en Vercel</h1>
        </body>
      </html>
    `;
    res.send(htmlResponse);
});

app.get('/api/games', async (req, res) => {
    try {
        const response = await fetch('https://www.freetogame.com/api/games?platform=pc');
        const data = await response.json();
        const limitedData = data.slice(0, 20);
        res.json(limitedData);
    } catch (error) {
        console.error('Error al obtener los juegos:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

app.post('/getpassword', (req, res) => {
    const { username } = req.body;

    const users = [
        { username: "admin", password: "password123" }
    ];
    const user = users.find(u => u.username === username);

    if (user) {
        res.json({ password: user.password });
    } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
