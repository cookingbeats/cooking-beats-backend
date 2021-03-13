const sequelize = require('./conexion/sequelize');
const Instrumentales = require('./modelos/instrumentales');

sequelize.sync({alter: true}).then(()=>{
    console.log("base de datos sincronizada");
}).catch( err => {
    console.log("la base de datos no puede ser conectada")
});

