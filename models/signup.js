const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//data declaration(structure) in collection
const userSchema = new Schema({

    username: { type: 'string', required: true },
    dob: { type: 'string', required: true },
    email: { type: 'string', unique: true },
    password: { type: 'string', required: true },
    department: { type: 'string', required: true },
    year: { type: 'string', required: true },
   
}, {
    timestamps: true,
  });

module.exports = mongoose.model('User', userSchema); // collection(User) adding in mongo db-cluster