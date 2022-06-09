const express = require('express')
const cors = require('cors')
const port = 9000
const app = express()

app.use(cors())
app.use(express.json())

app.use('/', (req, res) => {
    res.json({ message: 'Bienvenido a la API de Feel It' })
})

const server = app.listen(port, (err) => {
    if(err) return console.log(`Error: ${err}`)

    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})

module.exports = app