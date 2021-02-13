const {getComment,postComment,postVoice} = require('../interfaces/controller');
const {Router} = require('express');

let route = new Router();

route.get('/comments', getComment);
route.post('/comments', postComment);
route.post('/voice', postVoice);

module.exports = route;