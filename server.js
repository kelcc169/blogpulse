const express = require('express');
const ejslayouts = require('express-ejs-layouts');
const db = require('./models');
const moment = require('moment');

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(ejslayouts);
app.use(express.static(__dirname + '/static'));

app.use(function (req, res, next) {
    res.locals.moment = moment;
    next();
});

//GET / -display all posts and their authors
app.get('/', function (req, res) {
    db.post.findAll({
        include: [db.author]
    }).then(function (posts) {
        res.render('index', { posts });
    })
});

app.use('/authors', require('./routes/authors'));
app.use('/posts', require('./routes/posts'));

app.listen(3000, function () {
    console.log('MST3K');
});