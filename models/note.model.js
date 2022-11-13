const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    title: String,
    details: String,
    createdBy: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
    },
    category: String,
}, { timestamps: true })

module.exports = mongoose.model('note', noteSchema);