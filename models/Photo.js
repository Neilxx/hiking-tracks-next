import mongoose from 'mongoose'

const PhotoSchema = new mongoose.Schema({
  point: { type: mongoose.Schema.Types.ObjectId, ref: 'Point' },
  fileName: String,
  description: String,
  placeholder: String,
})

export default mongoose.models.Photo || mongoose.model('Photo', PhotoSchema)
