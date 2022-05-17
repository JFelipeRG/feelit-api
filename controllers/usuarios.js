const Sequelize = require('sequelize');
const posts = require('../models').posts;
const usuarios = require('../models').usuarios;
const canciones = require('../models').canciones;
module.exports = {
 create (req, res) {
    const { name, nick, passw, profile_img } = req.body
    return usuarios.create ({
            name: name,
            nick: nick,
            passw: passw,
            profile_img: profile_img
        })
        .then(usuarios => res.status(200).send(usuarios))
        .catch(error => res.status(400).send(error))
 },
 find (req, res) {
    const { nick, passw } = req.body
    return usuarios.findOne({
        where: {
            nick: nick,
            passw: passw
        }
    })
    .then(usuarios => {
        if(usuarios.length===0) throw new Error()
        res.status(200).send(usuarios)
    })
    .catch(error => res.status(400).send(error))
  },
  search (req,res) {
    const { nick } = req.body
    return usuarios.findOne({
        where: {
            nick: nick
        },
        include: {
            model: posts,
            as: 'posts',
            include: [{
                model: usuarios,
                as: 'usuario',
                attributes: [
                  'name', 'nick', 'profile_img'
                ]
              },{
                model: canciones,
                as: 'cancion'
              }]
        }
    })
    .then(usuarios => res.status(200).send(usuarios))
    .catch(error => res.status(400).send(error))
  }
};