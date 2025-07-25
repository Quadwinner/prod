export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    res.status(200).json({
      status: 'healthy',
      timestamp: new Date(),
      env: process.env.NODE_ENV || 'production',
      message: 'API is working!'
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 