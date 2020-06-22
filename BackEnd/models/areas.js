const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const autoIncrement = require('mongoose-auto-increment');
const Activities = require('./activities');

autoIncrement.initialize(mongoose);

let Schema = mongoose.Schema;

let areaSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Por favor ingresa el nombre del área']
    },
    activities: [{
        type: Schema.Types.Number, 
        ref: Activities
    }],
    Status: {
        type: Boolean,
        default: true
    }
});

areaSchema.plugin(autoIncrement.plugin, {
    model: '_id',
    field: '_id',
    startAt: 1,
    incrementBy: 1
});

areaSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser único y diferente'
});


module.exports = mongoose.model('Area', areaSchema);