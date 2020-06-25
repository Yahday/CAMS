const mongoose = require('mongoose');
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
    activity: {
        type: Schema.Types.String,
        ref: 'Activities',
    },
    task: {
        type: Schema.Types.String,
        ref: 'Activities',
    },
    criticity: [{
        valor: {
            type: Number
        },
        descripcion: {
            type: String
        }
    }],
    siniestro: {
        type: String
    },
    folios_extra:  {        
        type: String    
    },
    //Fotografias al momento de levantar y editar el reporte
    fotografias_h: [{
        fotografia: {
            type: String,
        }
    }],
    //Fotografias al momento de liquidar el reporte
    fotografias_l: [{
        fotografia: {
            type: String,
        }
    }],
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