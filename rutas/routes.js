const userController = require('../controllers/usuarios')
const cancionesController = require('../controllers/canciones')
const postsController = require('../controllers/posts')
const upload = require('../lib/storage')

module.exports = (() => {
    'use strict';

    var rutas = require('express').Router()

    rutas.get('/', (_, response) => {
        response.send({
            message: 'Bienvenido a la API de Feel It'
        });
    });
    
    /**         OBTENER IMAGENES         */
    rutas.get('/user/img/:name', (req, res) => {
        res.sendFile( `/storage/imgs/profile/${req.params.name}`, { root: '.'})
    })
    
    rutas.get('/cancion/img/:name', (req, res) => {
        res.sendFile( `/storage/imgs/caratulas/${req.params.name}`, { root: '.'})
    })
    
    
    
    /**         RUTAS DE USUARIOS         */
    rutas.post('/user/search', userController.search)
    
    rutas.post('/user/login', userController.find)
    
    rutas.post('/user/register', upload.single('profileimg'), userController.create)
    
    rutas.post('/user/update', upload.single('profileimg'), userController.update)
    
    rutas.post('/user/updatedUser', userController.updatedUSer)
    
    rutas.post('/user/removeImg', userController.removeImg)
    
    rutas.post('/user/changePassw', userController.changePassw)
    
    
    /**         RUTAS DE POSTS         */
    rutas.get('/posts', postsController.list)
    
    rutas.post('/posts/create', postsController.create)
    
    rutas.post('/posts/delete', postsController.remove)
    
    
    /**         RUTAS DE CANCIONES         */
    rutas.get('/canciones', cancionesController.list)
    
    rutas.post('/canciones/compartida', cancionesController.compartida)
    
    rutas.post('/canciones/removecompartida', cancionesController.removecompartida)
    
    rutas.post('/canciones/search', cancionesController.search)
    
    rutas.get('/canciones/recent', cancionesController.recent)
    
    rutas.get('/canciones/hot', cancionesController.hot)

    return rutas
})()