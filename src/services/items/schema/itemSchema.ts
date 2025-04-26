import mongoose from 'mongoose';

const item = new mongoose.Schema({
  name: { type: mongoose.Schema.Types.Mixed, require: true },
  description: { type: mongoose.Schema.Types.Mixed, require: true },
  category: { type: mongoose.Schema.Types.Mixed, require: true, index: true },
  price: { type: Number, require: true },
  dateAdded: { type: Number, require: true },
});

export default mongoose.model('Item', item, 'items');
