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
      if(!bcrypt.compareSync(passw, usuarios.dataValues.passw)) throw new Error() 
      else res.status(200).send(usuarios)

    })
    .catch(error => {
      res.status(400).send(error)
    })
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
  },

  update (req, res) {
    const { id, name, nick, actualImage } = req.body
    const profileimg = req.file
    
    return usuarios.update({
      name: name,
      nick: nick,
      profile_img: profileimg ? profileimg.filename : actualImage
    },{
      where: {
        id: id
      }
    })
    .then(usuarios => {
      res.status(200).send(usuarios)
      if(profileimg && actualImage !== 'default-user.png') {
        fs.unlinkSync(`storage/imgs/profile/${actualImage}`)
      }
    })
    .catch(error => res.status(400).send(error))
    
  },
  
  updatedUSer (req, res) {
    const { id } = req.body
    return usuarios.findOne({
      where: {
        id: id
      }
    })
    .then(usuarios => res.status(200).send(usuarios))
    .catch(error => res.status(400).send(error))  
  },

  removeImg (req, res) {
    const { id, actualImage } = req.body
    return usuarios.update({
      profile_img: 'default-user.png'
    },{
      where: {
        id: id
      }
    })
    .then(usuarios => {
      res.status(200).send(usuarios)
      fs.unlinkSync(`storage/imgs/profile/${actualImage}`)
    })
    .catch(error => res.status(400).send(error))
  },

  changePassw (req, res) {
    const { id, actualPassw, passw } = req.body
    const passwordHash = bcrypt.hashSync(passw, 10)

    if(bcrypt.compareSync(passw, actualPassw)) res.status(400).send()
    else {
      return usuarios.update({
        passw: passwordHash
      },{
        where: {
          id: id
        }
      })
      .then(usuarios => res.status(200).send(usuarios))
      .catch(error => res.status(400).send(error))
    }
  }
};