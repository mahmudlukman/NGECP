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
  },
  usageType: {
    type: String,
    required: true,
  },
  genType: {
    type: String,
    required: true,
  },
  power: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  serialNumber: {
    type: String,
    required: true,
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
  uPhone: {
    type: String,
    default: '',
  },
},{
  timestamps: true
})

const Generator = mongoose.model('Generators', GeneratorSchema)
export default Generator