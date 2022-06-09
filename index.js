const express = require('express')
const cors = require('cors')
const port = 9000
const app = express()

const userController = require('./controllers/usuarios')
const cancionesController = require('./controllers/canciones')
const postsController = require('./controllers/posts')
const upload = require('./lib/storage')

app.use(cors())
app.use(express.json())

app.use('/', (_, response) => {
    response.send({
        message: 'Bienvenido a la API de Feel It'
    });
});

/**         OBTENER IMAGENES         */
app.get('/api/user/img/:name', (req, res) => {
    res.sendFile( `/storage/imgs/profile/${req.params.name}`, { root: '.'})
})

app.get('/api/cancion/img/:name', (req, res) => {
    res.sendFile( `/storage/imgs/caratulas/${req.params.name}`, { root: '.'})
})


/**         RUTAS DE USUARIOS         */
app.post('/api/user/search', userController.search)

app.post('/api/user/login', userController.find)

app.post('/api/user/register', upload.single('profileimg'), userController.create)

app.post('/api/user/update', upload.single('profileimg'), userController.update)

app.post('/api/user/updatedUser', userController.updatedUSer)

app.post('/api/user/removeImg', userController.removeImg)

app.post('/api/user/changePassw', userController.changePassw)


/**         RUTAS DE POSTS         */
app.get('/api/posts', postsController.list)

app.post('/api/posts/create', postsController.create)

app.post('/api/posts/delete', postsController.remove)


/**         RUTAS DE CANCIONES         */
app.get('/api/canciones', cancionesController.list)

app.post('/api/canciones/compartida', cancionesController.compartida)

app.post('/api/canciones/removecompartida', cancionesController.removecompartida)

app.post('/api/canciones/search', cancionesController.search)

app.get('/api/canciones/recent', cancionesController.recent)

app.get('/api/canciones/hot', cancionesController.hot)

const server = app.listen(port, (err) => {
    if(err) return console.log(`Error: ${err}`)

    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})