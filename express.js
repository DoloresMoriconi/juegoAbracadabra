//iniciar el servidor
const express = require('express')
const app = express()

app.listen(3000, () => {
   console.log('El servidor se inició en el puerto 3000')
})

//arreglo de nombre de usuarios
const usuarios = {
   "usuarios": [
      "Juan",
      "Jocelyn",
      "Astrid",
      "Maria",
      "Ignacia",
      "Javier",
      "Brian"
   ]
}

// Ruta para obtener nombres de usuarios
app.get('/abracadabra/usuarios', (req, res) => {
   res.send(usuarios);
});

// Configuración de la carpeta de archivos estáticos
app.use(express.static('assets'));

// Middleware para verificar existencia de usuario
app.use("/abracadabra/juego/:usuario", (req, res, next) => {
   const usuarioReq = req.params.usuario
   if ( usuarios.usuarios.find(data => data == usuarioReq) ) {
   next()
   } else {
     // who.jpeg
   res.sendFile(__dirname + "/assets/who.jpeg")
   }
})
app.get("/abracadabra/juego/:usuario", (req, res) => {
   res.sendFile( __dirname + "/index.html" )
})


// Ruta para el juego del sombrero
app.get("/abracadabra/conejo/:n", (req, res) => {
   const numeroUsuario = req.params.n
   const numeroConejo = Math.floor(Math.random() * 4 ) + 1;
   if (numeroConejo == numeroUsuario) {
      res.sendFile(__dirname + "/assets/conejito.jpg")
   } else {
      res.sendFile(__dirname + "/assets/voldemort.jpg")
   }
});

// Ruta genérica para mostrar página no encontrada
app.get("*",(req, res) => {
   res.send('Esta página no existe');
});

