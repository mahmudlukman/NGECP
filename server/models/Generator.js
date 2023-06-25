import mongoose from 'mongoose'

const GeneratorSchema = mongoose.Schema({
  lng: {
    type: Number,
    required: true
  },
  lat: {
    type: Number,
    required: true
  },
  company: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 150
  },
  usageType: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 150
  },
  genType: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 150
  },
  power: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 150
  },
  model: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 150
  },
  serialNumber: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 150
  },
  images: {
    type: [String],
    validate: (v) => Array.isArray && v.length > 0,
  },
  uid: {
    type: String,
    required: true,
  },
  uName: {
    type: String,
    required: true,
  },
  uPhoto: {
    type: String,
    default: '',
  },
},{
  timestamps: true
})

const Generator = mongoose.model('Generators', GeneratorSchema)
export default Generator