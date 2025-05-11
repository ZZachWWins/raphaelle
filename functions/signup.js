const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Reuse MongoDB connection across function invocations
let conn = null;

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
});

const User = mongoose.model('User', UserSchema);

exports.handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  // Parse request body
  let body;
  try {
    body = JSON.parse(event.body);
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Invalid request body' }),
    };
  }

  const { username, password } = body;

  // Validate input
  if (!username || !password) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Username and password are required' }),
    };
  }

  if (password.length < 6) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Password must be at least 6 characters' }),
    };
  }

  try {
    // Connect to MongoDB (reuse connection if exists)
    if (conn == null) {
      conn = await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('MongoDB connected');
    }

    // Check for existing user
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Username already taken' }),
      };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save user
    const user = new User({ username, password: hashedPassword, role: 'user' });
    await user.save();

    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'User created successfully' }),
    };
  } catch (err) {
    console.error('Error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Server error: ' + err.message }),
    };
  }
};