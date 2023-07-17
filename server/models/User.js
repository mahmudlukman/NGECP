import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
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

UserSchema.pre('save', async function(next){
  if(this.isModified('password')){
    const hash = await bcrypt.hash(this.password, 12)
    this.password = hash
  }
  next()
})

UserSchema.methods.comparePassword = async function(password) {
  const result = await bcrypt.compareSync(password, this.password)
  return result
}

const User = mongoose.model('User', UserSchema)
export default User