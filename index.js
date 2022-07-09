require('dotenv').config();
const express = require('express')
const connet =require('./database/db')
const Music = require('./model/Music')
const path = require('path')


const app = express()
const port=process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static(__dirname,+"public"));
app.use(express.urlencoded());

connet();

app.get('/', async function (req, res) {
    const playlist = await Music.find()
    res.render("index",{playlist})
})

app.get('/admin', async function (req, res) {
    const playlist = await Music.find();
    res.render("admin", { playlist, music: null, musicDel: null });
})

app.post('/create', async function (req, res) {
   const music = req.body
  await Music.create(music)
  res.redirect('/')

})

app.get("/by/:id/:action", async (req, res) => {
    const { id, action } = req.params;
    music = await Music.findById({ _id: id });
    const playlist = await Music.find();
    if (action == "edit") {
      res.render("admin", { playlist, music, musicDel: null });
    } else {
      res.render("admin", { playlist, music: null, musicDel: music });
    }
  });
  
  app.post("/update/:id", async (req, res) => {
    const newMusic = req.body;
    await Music.updateOne({ _id: req.params.id }, newMusic);
    res.redirect("/admin");
  });
  
  app.get("/delete/:id", async (req, res) => {
    await Music.deleteOne({ _id: req.params.id });
    res.redirect("/admin");
  });
  

app.listen(3000, () => {
 console.log(`servidor rodando em ${port}`);
})