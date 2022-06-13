const express = require('express')
const cors = require('cors')
const rutas = require('./rutas/routes')
const port = process.env.PORT || 9000
const app = express()


app.use(cors())
app.use(express.json())

app.use('/', rutas);

const server = app.listen(port, (err) => {
    if(err) return console.log(`Error: ${err}`)

    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
