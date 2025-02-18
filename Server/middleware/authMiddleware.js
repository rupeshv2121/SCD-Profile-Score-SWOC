import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Extract Bearer token
    

    if (!token) {
        console.log("No token received!");
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = await User.findById(decoded.id).select('-password');
        if (!req.user) {
            console.log("User not found in DB!");
            return res.status(404).json({ message: 'User not found' });
        }

        
        next();
    } catch (error) {
        console.log("Token Verification Failed!", error);
        res.status(401).json({ message: 'Invalid token' });
    }
};

export default authMiddleware;
