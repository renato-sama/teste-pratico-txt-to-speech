const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;
const route = require('./src/interfaces/routes');

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//PRIMEIRA COISA QUE EU QUERO - A ROTA
app.use(route);

app.listen(PORT, () => {
    console.log('server running!');
})