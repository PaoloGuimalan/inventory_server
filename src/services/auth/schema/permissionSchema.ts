import mongoose from 'mongoose';

const permission = new mongoose.Schema({
  label: { type: mongoose.Schema.Types.Mixed, require: true },
  level: { type: Number, require: true },
  access: [{ type: mongoose.Schema.Types.Mixed, require: true }],
});

export default mongoose.model('Permission', permission, 'permissions');
