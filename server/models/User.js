import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    min: 2,
    max: 50,
    required: true
  },
  email: {
    type: String,
    unique: true,
    min: 5,
    max: 50,
    trim: true,
    lowercase: true,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  photoURL: {
    type: String,
    default: ''
  },
  role: {
    type: 'String',
    default: 'basic',
    enum: ['basic', 'editor', 'admin']
  },
  active: {
    type: Boolean,
    default: true
  }
},
{timestamps: true}
)

const User = mongoose.model('User', UserSchema)
export default User