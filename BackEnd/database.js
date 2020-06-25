require('dotenv').config();
const mongoose = require('mongoose');


const URI = `mongodb+srv://superadmin:${process.env.DB_PASS}@cams-oflpi.mongodb.net/CAMS?retryWrites=true&w=majority`;
//const URI = 'mongodb://localhost:27017/CAMSpruebas';

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })

.then(db => console.log('Mongodb is connected'))

.catch(err => console.error(err));

module.exports = mongoose;