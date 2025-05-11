const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose;

// Updated video schema (if needed elsewhere)
const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  rumbleVideoId: { type: String, required: true },
  uploadedBy: { type: String, required: true },
  isLive: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});