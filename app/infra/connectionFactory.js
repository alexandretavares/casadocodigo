var pg = require('pg');

function createConnection() {
    var stringConnection;

    switch(process.env.NODE_ENV) {
        case "test":
            stringConnection = "postgres://alexandre:postgres@localhost/casadocodigo_nodejs_test";
            break;
        case "production":
            stringConnection = process.env.DATABASE_URL;
            break;
        default:
            stringConnection = "postgres://alexandre:postgres@localhost/casadocodigo_nodejs"; 
    }
    
    var client = new pg.Client(stringConnection);

    client.connect(function(err) {
        if (err) {
            return console.error('could not connect to postgres', err);
        }
    });
    
    return client;
}

module.exports = function() {
    return createConnection;
};