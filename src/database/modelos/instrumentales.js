const { Model, DataTypes } = require('sequelize');
const sequelize = require('../conexion/sequelize');

class Instrumental extends Model {}
Instrumental.init({
    nombre: {
        type: DataTypes.STRING
    },
    descripcion: {
        type: DataTypes.STRING
    },
    categoria:{
        type: DataTypes.STRING
    },
    bpm: {
        type: DataTypes.INTEGER
    },
    mp3:{
        type: DataTypes.STRING
    },
    wav:{
        type: DataTypes.STRING    
    },
    sample:{
        type: DataTypes.STRING
    }
},{ sequelize, modelName: 'Instrumental'});

module.exports = Instrumental;
