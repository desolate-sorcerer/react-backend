import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
  name: String,
  src: String
});

export default mongoose.model('food', foodSchema);
