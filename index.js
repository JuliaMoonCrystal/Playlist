require('dotenv').config();
const express = require('express')
const connet =require('./database/db')
const Music = require('./model/Music')
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

app.get('/admin', function (req, res) {
    res.render("admin")
})

app.post('/create', async function (req, res) {
   const music = req.body
  await Music.create(music)
  res.redirect('/')

})

app.listen(3000, () => {
 console.log(`servidor rodando em ${port}`);
})