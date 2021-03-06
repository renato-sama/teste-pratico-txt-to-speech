# Aplicação Web Text To Speech - IBM Watson

O projeto abaixo trata de descrever a utilização de uma aplicação web integrada à API Text To Speech fornecida pela IBM. De forma sucinta, o usuário poderá cadastrar um comentário que será renderizado e reproduzido como audio em sua saída.

No projeto foram utilizadas as seguintes tecnologias:

- [NodeJS](https://nodejs.org/en/)
- [MySQL](https://www.mysql.com/)
- [AJAX](https://www.w3schools.com/js/js_ajax_intro.asp)
- [Bootstrap](https://getbootstrap.com.br)

# Passos inicias

Será necessário primeiramente a instalaçao do [NodeJS](https://nodejs.org/download) em sua máquina, caso ainda não o possua.
Acessando o link acima você irá diretamente a página de downloads.

O próximo passo é a instalação dos pacotes utilizados no projeto:

```bash
npm install
```
Tendo em mente que as dependencias estão listadas no arquivo "package.json" o comando acima quando executado, instalará automaticamente os pacotes desejados.


Em seguida, você deverá criar um banco de dados local utilizando as tecnologias de sua preferência (O projeto utilizou a combinação de ferramentas phpMyAdmin + WAMP)

Segue o código para a criação do banco após a escolha de suas ferramentas:

```sql
CREATE DATABASE NomeBaseDados -- Nome exemplo

CREATE TABLE caixacomentario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    texto VARCHAR(255)
)
```

Neste momento é interessante que a conexão já seja efetivada:
Segue o código de orientação para o script:

```js
var sqlConnection = sqldb.createConnection({
host:'localhost',
user:'O usuário que você criou',
password:'A senha que você escolher',
database: 'NomeBaseDados' // Nome exemplo
});
```

# Integração com a API Text To Speech

Para efetuar a integração, você deverá acessar o site oficial da api [IBM Watson](https://www.ibm.com/cloud/watson-text-to-speech) através do link.

Você irá criar uma conta (Gratuita! Não se preocupe.).
Assim que logado no sistema, utilize o mecanismo de busca do dashboard e procure por "Text To Speech" e selecione o resultado.

Nesse momento você é apresentando as credenciais únicas e somente suas para a utilização deste recurso.

- API Key
- URL

A chamada inicial da api pelo controlador do projeto é realizada da seguinte forma:

```js
const textToSpeech = new TextToSpeechV1({
    authenticator: new IamAuthenticator({
        apikey: process.env.MY_TOKEN, // Seu Token de acesso fornecido pela IBM
    }),
    serviceUrl: process.env.MY_URL, // Sua URL fornecida pela IBM
    disableSslVerification: true,
});
```

Neste projeto se faz necessário a utilização de um arquivo ".env" conforme ilustrado acima. O mesmo impedirá a visualização de suas credenciais de acesso no código. O código contido no arquivo deverá ser da seguinte forma:
```bash
    MY_TOKEN = 'Token resgatado através de sua conta IBM'
    MY_URL = 'URL resgatada através de sua conta IBM'
```

Um arquivo ".gitignore" complementa a segurança, impedindo que você realize Commits indesejados dessas informações e de seus arquivos.

# Execução do Projeto

Tendo administrado os passos acima, o que resta é executar a pasta do projeto.
No editor de códigos de sua preferência (lembrando da compatibilidade das tecnologias), selecione a pasta deste projeto.

Após a abertura dos arquivos e alterações referente a comunicação com a base de dados e API (explicado acima), execute o comando no Terminal:

```bash
    npm start
```
Aguarde pelo feedback:

```bash
    server running!
    mysql server connected!
```
Acesse pelo seu navegador a aplicação através da porta escolhida do servidor! (localhost:PORT)















