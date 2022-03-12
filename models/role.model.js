import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const Role = model(
  'Role',
  new Schema({
    name: String,
  })
);
module.exports = Role;
