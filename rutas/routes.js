const pool = require('../data/config')

const router = app => {

    app.get('/api', (request, response) => {
        response.send('<h1>Welcome to the Feel It API</h1');
    });

    app.post('/api/login', (request, response) => {
        const { body } = request
        const { nick, passw } = body
        pool.query('SELECT * FROM `usuarios` WHERE nick = ? && passw= ?',[nick, passw ], (error, result) => {
            if (error) throw error;
     
            response.send(result);
        });
    })

    app.post('/api/register', (request, response) => {
        const { body } = request
        const { name, nick, passw, img } = body
        pool.query('INSERT INTO `usuarios` (`id`, `name`, `nick`, `passw`, `profile_img`, `fecha_creacion`) VALUES (\'\',?,?,?,?,current_timestamp())',[name, nick, passw, img ], (error, result) => {
            if (error) throw error;
     
            response.send(result);
        });
    })
}

module.exports = router