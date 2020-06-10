const mongoose = require('mongoose');
//const uniqueValidator = require('mongoose-unique-validator');
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose);

let Schema = mongoose.Schema;

let hallazgoSchema = new Schema({
    fecha: {
        type: Date,
    },
    folio: {
        type: String,
    },
    centroManto: {
        type: String,
    },
    central: {
        type: Schema.Types.String,
        ref: 'Central',
    },
    area: {
        type: Schema.Types.String,
        ref: 'Area',
    },
    Activities: [{
        activity: {
            type: String,
        },
        tasks: {
            type: String,
        },
        img_hall: {
            type: String,
        },
        img_liq: {
            type: String,
        },
        status: {
            type: Boolean,
            default: false
        }
    }],
    criticity: {
        type: String
    },
    siniestro: {
        type: String
    },
    flama: {
        type: String
    },
    bitacora: [{
        user: {
            type: String,
        },
        comment: {
            type: String,
        },
        fecha: {
            type: Date,
        }
    }],
    status: {
        type: String
    },


    //campo para definir status en la bd
    estado: {
        type: Boolean,
        default: true
    }

});


//crea el id autoincrementable 
hallazgoSchema.plugin(autoIncrement.plugin, {
    model: '_id',
    field: '_id',
    startAt: 1,
    incrementBy: 1
});

hallazgoSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser único y diferente'
});

module.exports = mongoose.model('Hallazgo', hallazgoSchema);