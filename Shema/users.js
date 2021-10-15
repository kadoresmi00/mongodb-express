const { Schema, model } = require('mongoose');

const Kado = new Schema({
    name: String
})

module.exports = model('Users', Kado)