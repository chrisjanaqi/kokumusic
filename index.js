const express = require('express');
const pgp = require('pg-promise');
const fs = require('fs');

const app = express();


app.set('view engine', 'ejs');

app.use(express.static(__dirname));

app.get('/', (req, res) => {
	res.redirect('/home');
});

app.get('/home' , (req, res) => {
	res.render('index');
});

app.listen(3000, () => {
	console.log('Example app listening on port 3000!');
});
