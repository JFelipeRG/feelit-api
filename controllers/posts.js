const Sequelize = require('sequelize');
const canciones = require('../models').canciones;
const usuarios = require('../models').usuarios;
const posts = require('../models').posts;
module.exports = {
  create (req, res) {
    const { user, text, song } = req.body

    const responseUSer = usuarios.findOne({
      where: {
        id: user
      }
    })

    const responseSong = canciones.findOne({
      where: {
        id: song
      }
    })

    Promise.all([responseUSer, responseSong])
    .then( responses => {
      return posts.create ({
        usuario_id: responses[0].dataValues.id,
        contenido: text,
        cancion_id: responses[1].dataValues.id
      })
      .then(posts => res.status(200).send(posts))
    }
    ).catch(error => res.status(400).send(error))
    
  },
  list (_, res) {
    return posts.findAll({
      order: [['fecha_post','DESC']],
      include: [{
        model: usuarios,
        as: 'usuario',
        attributes: [
          'id','name', 'nick', 'profile_img'
        ]
      },{
        model: canciones,
        as: 'cancion'
      }]
    })
    .then(posts => res.status(200).send(posts, null, 2))
    .catch(error => res.status(400).send(error))
  },
  remove (req, res) {
    const { id } = req.body
    return posts.destroy ({
      where: {
        id: id
      }
    })
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(400))
  }
};