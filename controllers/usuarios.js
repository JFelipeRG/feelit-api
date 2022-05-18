const Sequelize = require('sequelize');
const posts = require('../models').posts;
const usuarios = require('../models').usuarios;
const canciones = require('../models').canciones;
const fs = require('fs')

module.exports = {
 create (req, res) {
    const { name, nick, passw } = req.body
    const profileimg = req.file
    return usuarios.create ({
            name: name,
            nick: nick,
            passw: passw,
            profile_img: profileimg ? profileimg.filename : null
        })
        .then(usuarios => res.status(200).send(usuarios))
        .catch(error => {  
          res.status(400).send(error)
          fs.unlinkSync(profileimg.path)
        })
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