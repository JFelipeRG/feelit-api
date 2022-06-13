const express = require('express')
const cors = require('cors')
const rutas = require('./rutas/routes')
const port = process.env.PORT || 9000
const app = express()

app.use(cors())
app.use(express.json())
app.use((_, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use('/', rutas);

const server = app.listen(port, (err) => {
    if(err) return console.log(`Error: ${err}`)

    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
