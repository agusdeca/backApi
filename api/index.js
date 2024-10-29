const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); // Asegúrate de instalarlo con npm install node-fetch
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("hola");
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

// Exportar la función para Vercel
module.exports = (req, res) => app(req, res);