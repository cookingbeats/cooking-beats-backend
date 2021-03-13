const express = require('express');
const sequelize = require('../database/coneccion/database');
const User = require('../database/models/Users');

/**
 * Configuraciones, y CORS
 */

const app = express();

app.get('/', (req, res)=>{
    User.create({
        username: 'janedoe',
        birthday: new Date(1980, 6, 20)
      });
    res.send("hola mundo");
})

app.listen(3000, ()=>{
    console.log("listen app in port 3000");
    sequelize.authenticate()
    .then(() => {
        console.log('Conectado')
    })
    .catch(err => {
        console.log('No se conecto')
    })
})
