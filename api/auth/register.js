// api/auth/register.js - Specific handler for registration endpoint
import app from '../../server.js';

export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    const { email, password, name } = req.body;
    
    // Simple validation
    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        error: 'Name, email and password are required'
      });
    }

    // For now, return a success response (you can integrate with Supabase later)
    res.status(201).json({
      success: true,
      message: 'Registration endpoint working',
      user: {
        email: email,
        name: name,
        id: 'test-user-id'
      },
      token: 'test-jwt-token'
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 