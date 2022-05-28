const { Schema, model, connection } = require('mongoose');

const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(connection);

const ItemsSchema = Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    qty: {
        type: Number
    }
});

const TaskSchema = Schema({

    control: {
        type: Number,
    },

    client: {
        type: Schema.Types.ObjectId,
        ref: 'Clients',
    },
    create: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    products: [ItemsSchema],
    type: {
        type: String,
        default: 'Local'
    },
    description: {
        type: String
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

TaskSchema.method('toJSON', function() {

    const { __v, _id, ...object } = this.toObject();
    object.tid = _id;
    return object;

});

TaskSchema.plugin(autoIncrement.plugin, {
    model: 'Task',
    field: 'control',
    startAt: process.env.AUTOINCREMENT_INIT
});

module.exports = model('Task', TaskSchema);