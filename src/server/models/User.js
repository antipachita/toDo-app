const {Schema, model} = require('mongoose');

const User = new Schema({
  username: {type: String, uniqe: true, required: true},
  password: {type: String, required: true},
  boards: {type: Array, required: false},
  id: {type: String, required: false},
  roles: [{type: String, ref:'Role'}]
})

module.exports = model('User', User)