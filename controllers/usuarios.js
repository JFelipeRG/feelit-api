const Sequelize = require('sequelize');
const posts = require('../models').posts;
const usuarios = require('../models').usuarios;
const canciones = require('../models').canciones;
const fs = require('fs')
const bcrypt = require('bcrypt');

module.exports = {
 async create (req, res) {
    const { name, nick, passw } = req.body
    const profileimg = req.file
    const passwordHash = await bcrypt.hash(passw, 10)
    return usuarios.create ({
            name: name,
            nick: nick,
            passw: passwordHash,
            profile_img: profileimg ? profileimg.filename : 'default-user.png'
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
      }
    })
    .then(usuarios => {
        if(usuarios.length===0 || !bcrypt.compareSync(passw, usuarios.dataValues.passw)) throw new Error() 
        else res.status(200).send(usuarios)

    })
    .catch(error => res.status(400).send(error))
  },
  search (req,res) {
    const { nick } = req.body
    return usuarios.findOne({
      where: {
          nick: nick
      },
      attributes: {
        exclude: ['passw']
      },
      order: [[posts,'fecha_post','DESC']],
      include: {
          model: posts,
          as: 'posts',
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
      }
    })
    .then(usuarios => res.status(200).send(usuarios))
    .catch(error => res.status(400).send(error))
  }
};