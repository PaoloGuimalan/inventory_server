import mongoose from 'mongoose';

const user = new mongoose.Schema({
  name: {
    firstName: { type: mongoose.Schema.Types.Mixed, require: true },
    middleName: { type: mongoose.Schema.Types.Mixed, require: true },
    lastName: { type: mongoose.Schema.Types.Mixed, require: true },
  },
  email: { type: mongoose.Schema.Types.Mixed, require: true },
  password: { type: mongoose.Schema.Types.Mixed, require: true },
  dateCreated: { type: Number, require: true },
  permission: { type: Number, require: true },
});

export default mongoose.model('User', user, 'users');
