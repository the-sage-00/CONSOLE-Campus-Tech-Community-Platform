import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const userAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find user in User collection
    const user = await User.findById(decoded.id);
    
    if (!user || !user.isActive) {
      return res.status(401).json({ error: 'Invalid token or user account inactive.' });
    }

    // Check if email is verified
    if (!user.isEmailVerified) {
      return res.status(401).json({ error: 'Please verify your email before accessing this resource.' });
    }

    req.user = {
      id: decoded.id,
      email: user.email,
      name: user.name,
      role: user.role // Add role to the user object
    };
    req.userId = decoded.id; // For backward compatibility
    req.userType = user.role; // For backward compatibility

    next();
  } catch (error) {
    console.error('User auth error:', error);
    res.status(401).json({ error: 'Invalid token.' });
  }
};

export default userAuth; 