import mongoose from 'mongoose'

const resourceSchema = new mongoose.Schema({
  title:       { type: String, required: true, trim: true, maxlength: 200 },
  subject:     { type: String, required: true, trim: true },
  branch:      { type: String, required: true, enum: ['CSE','ECE','ME','CE','EEE','IT','OTHER'], default: 'CSE' },
  semester:    { type: Number, required: true, min: 1, max: 8 },
  type:        { type: String, required: true, enum: ['notes','qpaper','solved'] },
  fileUrl:     { type: String, required: true },
  year:        { type: String, default: '' },
  description: { type: String, default: '', maxlength: 500 },
  uploadedBy:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  views:       { type: Number, default: 0 },
}, { timestamps: true })

// Full-text search index
resourceSchema.index({ title: 'text', subject: 'text', description: 'text' })
// Compound index for common filter queries
resourceSchema.index({ branch: 1, semester: 1, type: 1 })

export default mongoose.model('Resource', resourceSchema)
