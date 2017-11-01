const express = require('express');
const pgp = require('pg-promise')();
const fs = require('fs');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static(__dirname));

const cn = JSON.parse(fs.readFileSync('./db/conninfo.json'));

const db = pgp(cn);

app.get('/', (req, res) => {
	res.redirect('/home');
});

app.get('/home' , (req, res) => {
    db.any('SELECT * FROM metadata ORDER BY release DESC;')
        .then(data => {
            console.log('DATA:', data);
            res.render('index', {"musics": data});
        })
        .catch(error => {
            console.log('ERROR:', error);
        });
});

app.listen(3000, () => {
	console.log('App listening on port 3000!');
});
