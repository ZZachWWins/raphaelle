const mongoose = require('mongoose');

let conn = null;

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  rumbleVideoId: { type: String, required: true },
  uploadedBy: { type: String, required: true },
  isLive: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Video = mongoose.model('Video', videoSchema);

exports.handler = async (event) => {
  try {
    // Connect to MongoDB
    if (conn == null) {
      conn = await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('MongoDB connected');
    }

    if (event.httpMethod === 'GET') {
      const videos = await Video.find().sort({ createdAt: -1 });
      return {
        statusCode: 200,
        body: JSON.stringify(videos),
      };
    }

    if (event.httpMethod === 'POST') {
      if (!event.body) {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: 'No data provided' }),
        };
      }

      const { title, rumbleVideoId, uploadedBy, isLive } = JSON.parse(event.body);
      if (!title || !rumbleVideoId || !uploadedBy) {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: 'Missing required fields: title, rumbleVideoId, uploadedBy' }),
        };
      }

      const newVideo = new Video({ title, rumbleVideoId, uploadedBy, isLive });
      await newVideo.save();

      return {
        statusCode: 201,
        body: JSON.stringify({ message: 'Video uploaded successfully' }),
      };
    }

    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  } catch (err) {
    console.error('Error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Server error: ' + err.message }),
    };
  }
};