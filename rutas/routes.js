const pool = require('../data/config')

const router = app => {
    app.get('/', (request, response) => {
        response.send({
            message: 'Node.js and Express REST API'
        });
    });

    app.get('/users', (request, response) => {
        pool.query('SELECT * FROM usuarios', (error, result) => {
            if (error) throw error;
     
            response.send(result);
        });
    })
}

module.exports = router