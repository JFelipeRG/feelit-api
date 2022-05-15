const express = require('express')
const routes = require('./rutas/routes')
const cors = require('cors')
const port = 3002
const app = express()

app.use(cors())
app.use(express.json())

const server = app.listen(port, (err) => {
    if(err) return console.log(`Error: ${err}`)

    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})

routes(app)