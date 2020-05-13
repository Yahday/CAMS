const express = require('./node_modules/express');
const app = express();

const { mongoose } = require('./database');

//SETTINGS
app.set('port', process.env.PORT || 3000);

//MIDDLEWARE
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