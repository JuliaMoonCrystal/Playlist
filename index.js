require('dotenv').config();
const express = require('express')
const connet =require('./database/db')
const music = require('./model/Music')


const app = express()
const port=process.env.PORT || 3000;

connet();

app.get('/hello', function (req, res) {
    res.send(`${port}`)
})

app.listen(3000, () => {
 console.log(`servidor rodando em ${port}`);
})