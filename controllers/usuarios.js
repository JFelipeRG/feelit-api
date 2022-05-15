const Sequelize = require('sequelize');
const usuarios = require('../models').usuarios;
module.exports = {
 create (req, res) {
    const { body } = req
    const { name, nick, passw, profile_img } = body
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
    const { body } = req
    const { nick, passw } = body
    return usuarios.findAll({
        where: {
            nick: nick,
            passw: passw
        }
    })
    .then(usuarios => res.status(200).send(usuarios))
    .catch(error => res.status(400).send(error))
  }
};