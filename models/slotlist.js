const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const slotSchema = new Schema({

    username: { type: 'string', required: true },
    email: { type: 'string',required: true},
    department: { type: 'string', required: true },
    year: { type: 'string', required: true },
    subject: { type: 'string', required: true },
    date: { type: 'string',required: true},
    session: { type: 'string', required: true },
    venue: { type: 'string', required: true },
   
}, {
    timestamps: true,
  });

module.exports = mongoose.model('Slot', slotSchema); 