import jwt from 'jsonwebtoken';
import AccountRegister from '../models/AccountRegister.models.js';

const keysecret = process.env.SECRET_KEY;

export const authenticate = async (req, res, next) => {
    try {
        // Extract token from Authorization header (format: Bearer <token>)
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ status: 401, message: 'Unauthorized: No token provided' });
        }

        const token = authHeader.split(' ')[1]; // Extract the token part
        
        // Verify the token
        const decodedToken = jwt.verify(token, keysecret);

        // Find user in database
        const rootUser = await AccountRegister.findOne({ _id: decodedToken._id });
        if (!rootUser) {
            throw new Error('User not found');
        }

        // Attach user and token to request object
        req.token = token;
        req.rootUser = rootUser;
        req.userId = rootUser._id;

        next(); // Proceed to the next middleware or route handler

    } catch (error) {
        res.status(401).json({ status: 401, message: error.message || 'Unauthorized: Invalid token' });
    }
};
