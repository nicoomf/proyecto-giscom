const mongoose = require('mongoose');
require('dotenv').config();

// console.log(process.env.DB_URI);

const mongodb_uri = process.env.DB_URI;

mongoose.connect(mongodb_uri, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(db => console.log('BASE DE DATOS CONECTADA'))
    .catch(err => console.log(err));