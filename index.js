const express = require('express')
const cors = require('cors')
const port = 9000
const app = express()

app.use(cors())
app.use(express.json())

require('./rutas/routes')(app)

const server = app.listen(port, (err) => {
    if(err) return console.log(`Error: ${err}`)

    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})

module.exports = app