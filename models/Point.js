import mongoose from 'mongoose'

const PointSchema = new mongoose.Schema({
  _trackId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  elevation: {
    type: Number,
  },
  time: {
    type: Date,
  },
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
  photos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Photo' }]
})

export default mongoose.models.Point || mongoose.model('Point', PointSchema)
