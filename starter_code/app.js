
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials')
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.render('index');
});

app.get('/home', (req, res) => {
  res.render('home');
});

app.get('/beers', (req, res) => {
  punkAPI.getBeers()
  .then(beers => {
    res.render('beers', {beers, title: "Beer List"});
  })
  .catch(error => {
    console.log(error)
  })
});

app.get('/randomBeer', (req, res) => {
  punkAPI.getRandom()
  .then(beers => {
    var beer = beers[0];
    res.render('randomBeer', {beer});
  })
  .catch(error => {
    console.log(error)
  })

});



app.listen(3001);
