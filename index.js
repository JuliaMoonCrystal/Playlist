require('dotenv').config();
const express = require('express')
const connet =require('./database/db')
const music = require('./model/Music')
const path = require('path')


const app = express()
const port=process.env.PORT || 3000;

app.set("view engine","ejs")
app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded())

connet();

app.get('/', function (req, res) {
    res.render("index")
})

app.listen(3000, () => {
 console.log(`servidor rodando em ${port}`);
})