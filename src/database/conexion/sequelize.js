const Sequelize = require('sequelize')
const { database } = require('./database.json');

const sequelize = new Sequelize(
    database.DATABASE, 
    database.USERNAME, 
    database.PASSWORD, 
    {
        host: database.HOSTNAME,
        dialect: 'mysql'
    }
);

module.exports = sequelize;
