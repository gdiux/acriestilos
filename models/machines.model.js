const { Schema, model } = require('mongoose');

const MachineSchema = Schema({

    name: {
        type: String,
        require: true
    },
    serial: {
        type: String,
    },
    status: {
        type: Boolean,
        default: true
    },
    fecha: {
        type: Date,
        default: Date.now
    }

});

MachineSchema.method('toJSON', function() {

    const { __v, _id, ...object } = this.toObject();
    object.maid = _id;
    return object;

});

module.exports = model('Machines', MachineSchema);