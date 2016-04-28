var pg = require('pg');

function createConnection() {
    var dbproperties = {
        user: 'alexandre',
        password: 'postgres',
        host: 'localhost',
        port: 5432
    };

    switch(process.env.NODE_ENV) {
        case "test":
            dbproperties.database = 'casadocodigo_nodejs_test';
            break;
        case "production":
            dbproperties = {
                user: 'cclxcmkmzfniio',
                password: '0M1O0OC8iw_oHFNEGDmP5qelqk',
                host: 'ec2-54-163-226-48.compute-1.amazonaws.com',
                database: 'dabpgm147al14q',
                port: 5432
            };
            break;
        default:
            dbproperties.database = 'casadocodigo_nodejs';    
    }
    
    var client = new pg.Client(dbproperties);

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