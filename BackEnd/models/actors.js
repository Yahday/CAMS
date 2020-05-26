const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let actorSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Por favor ingresa el nombre del actor']
    },
    activities: [{
        type: Schema.Types.ObjectId, 
        ref: 'Activities'
    }],
    id_centralMantenimiento: {
        type: Schema.Types.ObjectId, 
        ref: 'CentroMantenimiento'
    },
    estado: {
        type: Boolean,
        default: true
    }
});

actorSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser único y diferente'
});


module.exports = mongoose.model('Actors', actorSchema);