const express = require('./node_modules/express');
const bodyParser = require('body-parser');
const app = express();

const config = require('./config/config');
const { mongoose } = require('./database');

//SETTINGS



//CORS - TOKEN
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization, token'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, PUT, DELETE, OPTIONS'
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
app.listen(process.env.PORT, () => {
    console.log(`server on port ${process.env.PORT}`)
}) 