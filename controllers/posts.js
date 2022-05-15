const Sequelize = require('sequelize');
const posts = require('../models').posts;
module.exports = {
 list (_, res) {
    return posts.findAll({})
    .then(posts => res.status(200).send(posts))
    .catch(error => res.status(400).send(error))
  }
};