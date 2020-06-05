const mongoose = require('mongoose');
const Activities = require('./activities');

let Schema = mongoose.Schema;

let tasksSchema = new Schema({
    name: {
        type: String
    },
    criticity: {
        type: String
    }/*,
    activity: {
        type: Schema.Types.ObjectId,
        ref: 'Activities'
    }*/
});

module.exports = mongoose.model('Tasks', tasksSchema);