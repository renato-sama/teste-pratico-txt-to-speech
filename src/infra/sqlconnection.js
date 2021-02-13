const sqldb = require('mysql');

var sqlConnection = sqldb.createConnection({
    host:'localhost',
    user:'user1',
    password:'teste123',
    database: 'testepraticosmarkio'
});

sqlConnection.connect(function(err){
    if(err){
        return console.error('Erro:', err.message);
    }
    console.log('mysql server connected!');
});

module.exports = sqlConnection;