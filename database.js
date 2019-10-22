const mongoose = require('mongoose');

const URL = 'mongodb://localhost/OrdenCompra';

mongoose.connect(URL)
    .then(db => console.log('BD Conectada'))
    .catch(err => console.error(err));

module.exports = mongoose;    