const express = require('./node_modules/express');
const app = express();

//SETTINGS
app.set('port', process.env.PORT || 3000);

//MIDDLEWARE
app.use(express.json());

//ROUTS
app.get('/', (req, res) => {
    res.send('<h1>CAMS</h1>');
});

//SERVER
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`)
})