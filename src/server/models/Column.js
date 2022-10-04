const {Schema, model} = require('mongoose');

const Column = new Schema({
  login: {type: String, uniqe: true, required: true},
  board: {type: String, required: false},
  columnName: {type: String, required: false},
  columnId: {type: String, required: false},
  tasks: {type: Array, required: false},
});

module.exports = model('Column', Column);
