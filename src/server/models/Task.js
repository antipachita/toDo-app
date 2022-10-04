const {Schema, model} = require('mongoose');

const Task = new Schema({
  login: {type: String, uniqe: true, required: true},
  board: {type: String, required: false},
  
});

module.exports = model('Task', Task);