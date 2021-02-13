const sqlConnection = require('../infra/sqlconnection');
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
const fs = require('fs');

//DECLARAÇÃO DE URL E API TXT TO SPEECH

const textToSpeech = new TextToSpeechV1({
    authenticator: new IamAuthenticator({
        apikey: process.env.MY_TOKEN,
    }),
    serviceUrl: process.env.MY_URL,
    disableSslVerification: true,

});

//MÉTODOS QUE SERÃO USADOS

function postVoice(req, res){
    id = req.body.id;
    texto = req.body.texto;
    Parameters = {
        text: texto,
        voice: 'pt-BR_IsabelaV3Voice',
        accept:'audio/wav'
    };
    textToSpeech.synthesize(Parameters) //JEITO DIFERENTE?
    .then(response =>{
        return textToSpeech.repairWavHeaderStream(response.result);
    })
    .then(buffer =>{
        fs.writeFileSync('./tmp/voice' + id + '.wav', buffer);
        res.status(200).send('./tmp/voice' + id + '.wav');
    })
    .catch(err =>{
        console.log('error:', err);
        res.status(400).send('Fail');
    });  
}

function getComment(req, res) {
    sqlConnection.query('SELECT * FROM caixacomentario', (err, rows)=>{
        if(!err){
            rows.sort((a, b) => {
                return b.id - a.id;
            });
            res.status(200).send(rows);
        }
        else
            res.status(400).send('Failed!');
    });
}

function postComment(req, res) {
    var comentario = req.body.text;
    var sql = 'INSERT INTO caixacomentario(texto) values(?)'

    sqlConnection.query(sql, comentario, (err, row)=>{
        if(!err){
            res.status(200).send(row);
        }
        else
            res.status(401).send('Failed!');
    });
}

module.exports = {getComment, postComment, postVoice};