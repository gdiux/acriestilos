const { Schema, model } = require('mongoose');

const NotesSchema = Schema({

    note: {
        type: String
    },

    date: {
        type: Date,
        default: Date.now()
    },

    staff: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

});

const attachmentSchema = Schema({
    attachment: {
        type: String
    },

    date: {
        type: Date,
        default: Date.now()
    }

});

const StepSchema = Schema({

    staff: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    end: {
        type: Date
    },
    description: {
        type: String,
    },
    notes: [NotesSchema],
    attachments: [attachmentSchema],
    machine: {
        type: Schema.Types.ObjectId,
        ref: 'Machines'
    },
    task: {
        type: Schema.Types.ObjectId,
        ref: 'Task'
    },
    estado: {
        type: String,
        default: 'Pendiente'
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

StepSchema.method('toJSON', function() {

    const { __v, _id, ...object } = this.toObject();
    object.stid = _id;
    return object;

});

module.exports = model('Step', StepSchema);