const express = require('express');
const pgp = require('pg-promise')();
const fs = require('fs');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static(__dirname));

function formatDate (date) {
    let month = '' + (date.getMonth() + 1);
    let day = '' + date.getDate();
    let year = date.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}



const cn = JSON.parse(fs.readFileSync('./db/conninfo.json'));

const db = pgp(cn);

app.get('/', (req, res) => {
	res.redirect('/home');
});

app.get('/home', (req, res) => {
    db.any('SELECT * FROM metadata ORDER BY release DESC;')
        .then(data => {
            //console.log('DATA:', data);
            for (let music of data) music.release = formatDate(music.release);
            res.render('index', {"musics": data});
        })
        .catch(error => {
            console.log('ERROR:', error);
        });
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.listen(3000, () => {
	console.log('App listening on port 3000!');
});
