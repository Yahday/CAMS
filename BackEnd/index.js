const express = require('./node_modules/express');
const bodyParser = require('body-parser');
const app = express();

const config = require('./config/config');
const { mongoose } = require('./database');

//SETTINGS
app.set('port', process.env.PORT || 3000);
app.set('llave', config.llave);


//CORS - TOKEN
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Authorization, token'
    );
    next();
});

//MIDDLEWARES 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

//ROUTES
app.get('/', (req, res) => {
    res.send('<h1>CAMS</h1>');
});
app.use(require('./routes/index'));

//SERVER
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`)
})