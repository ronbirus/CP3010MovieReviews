import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const customerSchema = new Schema({
  name: String,
  movie: String,
  email: {
    type: String,
    required: true,
  }
});

const Customer = model('Customer', customerSchema);
export default Customer;