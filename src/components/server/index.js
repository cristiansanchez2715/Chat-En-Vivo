const express = require("express")
const app = express()
const cors = require('cors')
const mysql = require('mysql')

app.use(cors());
app.use(express.json());


const port = 4000
const messages = [{user: "cristian", message: "no joda"}]
    
// trayendo mensajes de la base de dato


app.get("/", (req, res) => {
  // Consultar mensajes desde la base de datos
  db.query('SELECT * FROM Messages', (error, results) => {
      if (error) {
          console.error('Error al obtener mensajes desde la base de datos:', error);
          res.status(500).json({ error: 'Error interno del servidor' });
      } else {
          // Enviar los mensajes al frontend
          res.status(200).json(results);
      }
  });
});




app.listen(port, () => {
    console.log("servidor montado")
})

// Creando conexion a la base de datos

// enviando mensajes a la base de datos

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: "root",
    password: "spizamarillo2715",
    database: "ChatEnVivo",
    port: 3306,
})

db.connect(err => {
    if (err) {
      console.error('Error de conexión a la base de datos:', err);
    } else {
      console.log('Conexión a la base de datos exitosa');
    }
  });

  


app.post("/sendMessage", (req, res) => {
    const { user, message } = req.body;
    const newMessage = { username: user, message };


  db.query('INSERT INTO Messages SET ?', newMessage, (error, result) => {
    if (error) {
      console.error('Error al insertar el mensaje en la base de datos:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      console.log('Mensaje insertado correctamente en la base de datos');
      res.status(200).json({ message: 'Mensaje enviado con éxito' });
    }
  });


})


// logica usuarios conectados

let connectedUsers = [];

app.get("/userContainer", (req, res) => {
  // Enviar información sobre usuarios conectados
  res.json({
    numberUsersConnected: connectedUsers.length,
    usersConnected: connectedUsers,
  });
});

app.post("/userContainer", (req, res) => {
  // Agregar el nuevo usuario a la lista de usuarios conectados
  const newUser = `User ${connectedUsers.length + 1}`;
  connectedUsers.push(newUser);

  // Enviar información actualizada sobre usuarios conectados
  res.json({
    numberUsersConnected: connectedUsers.length,
    usersConnected: connectedUsers,
  });
});