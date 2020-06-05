const mongoose = require('mongoose');
const Actors = require('./actors');
const Tasks = require('./tasks');

let Schema = mongoose.Schema;

let activitiesSchema = new Schema({
    name: {
        type: String
    },
    /*actor: {
        type: Schema.Types.ObjectId,
        ref: 'Actors'
    },*/
    tasks: [{
        type: Schema.Types.ObjectId, 
        ref: 'Tasks'
    }]
});

module.exports = mongoose.model('Activities', activitiesSchema);