const Sequelize = require('sequelize');
const canciones = require('../models').canciones;
module.exports = {
 list (_, res) {
   console.log(canciones)
    return canciones.findAll({})
    .then(canciones => {
        res.status(200).send(canciones)
    })
    .catch(error => res.status(400).send(error))
  }
};