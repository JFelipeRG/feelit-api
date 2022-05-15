const userController = require('../controllers/usuarios')
const cancionesController = require('../controllers/canciones')
const postsController = require('../controllers/posts')

const router = app => {

    app.get('/api', (_, response) => {
        response.send({
            message: 'Bienvenido a la API de Feel It'
        });
    });

    app.post('/api/login', userController.find)

    app.post('/api/register', userController.create)

    app.get('/api/posts', postsController.list)

    app.get('/api/canciones', cancionesController.list)
}

module.exports = router