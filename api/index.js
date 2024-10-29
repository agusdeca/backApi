const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("hola");
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