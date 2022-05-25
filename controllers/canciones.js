const Sequelize = require('sequelize');
const { Op } = require("sequelize");
const canciones = require('../models').canciones;
module.exports = {
 list (_, res) {
    return canciones.findAll({})
    .then(canciones => {
        res.status(200).send(canciones)
    })
    .catch(error => res.status(400).send(error))
  },
  search (req,res) {
    const { query } = req.body

    return canciones.findAll({
      where: {
        [Op.or] : [
          {nombre: {[Op.substring]: query}},
          {artista: {[Op.substring]: query}}
        ]
      }
    })
      .then(canciones => res.status(200).send(canciones))
      .catch(error => res.status(400).send(error))
  },
  hot (_,res) {
    return canciones.findAll({
      order:[['veces_compartida','DESC']],
      limit: 6
    })
      .then(canciones => res.status(200).send(canciones))
      .catch(error => res.status(400).send(error))
  },
  recent (_,res) {
    return canciones.findAll({
      order: [['fecha_publicacion','DESC']],
      limit: 6
    })
    .then(canciones => res.status(200).send(canciones))
    .catch(error => res.status(400).send(error))
  },
  compartida (req,res) {
    const { id } = req.body

    return canciones.increment({
      veces_compartida : 1,
      },{where: 
        {id: id}
      
    })
    .then(() => res.status(200))
    .catch(error => res.status(400).send(error))
  },
  removecompartida (req,res) {
    const { id } = req.body

    return canciones.decrement({
      veces_compartida : 1,
      },{where: 
        {id: id}
      
    })
    .then(() => res.status(200))
    .catch(error => res.status(400).send(error))
  }
};