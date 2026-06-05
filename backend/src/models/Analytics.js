import mongoose from 'mongoose'

const analyticsSchema = new mongoose.Schema({
  date:          { type: String, required: true, unique: true }, // YYYY-MM-DD
  pageViews:     { type: Number, default: 0 },
  uniqueIPs:     { type: [String], default: [] },
  resourceOpens: { type: Number, default: 0 },
}, { timestamps: false })

export default mongoose.model('Analytics', analyticsSchema)
