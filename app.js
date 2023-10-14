const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const pool = require('./config/database.js');
const moviesRouter = require('./route/moviesRouter.js');
const methodOverride = require('method-override');


app.use(express.json());
app.use(express.static('upload/img'))
app.use(bodyParser.urlencoded( {extended: true} ));
app.use(express.urlencoded( {extended: false} ));
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
        res.send('Halaman Utama');
    });

pool.connect((err, res) => {
        if(err){
            throw err;
        }
        console.log('Connected');
    });

app.use('/movies', moviesRouter);


app.listen(3000, function(){
    console.log('Server Running..');
});