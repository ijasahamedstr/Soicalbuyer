import AccountRegister from '../models/AccountRegister.models.js';
import jwt from 'jsonwebtoken';

export const transferPoints = async (req, res) => {
    const { username, currentbalance, reason } = req.body;

    // Validate required fields
    if (!username || currentbalance === undefined || !reason) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    // Validate points
    const numericPoints = parseFloat(currentbalance);
    if (isNaN(numericPoints) || numericPoints <= 0) {
        return res.status(400).json({ message: 'Points must be a positive number' });
    }

    try {
        // Find the sender
        const sender = await AccountRegister.findOne({ username: req.user.username });
        if (!sender) return res.status(404).json({ message: 'Sender not found' });
        if (sender.currentbalance < numericPoints) return res.status(400).json({ message: 'Insufficient balance' });

        // Find the recipient
        const recipient = await AccountRegister.findOne({ username });
        if (!recipient) {
            // If recipient does not exist, create a new account
            await new AccountRegister({ username, currentbalance: numericPoints }).save();
        } else {
            // Update recipient's balance
            recipient.currentbalance += numericPoints;
            await recipient.save();
        }
console.log(numericPoints);

        // Deduct points from sender
        sender.currentbalance -= numericPoints;
        await sender.save();

        res.status(200).json({ message: 'Transfer successful' });
    } catch (error) {
        console.error('Error during points transfer:', error);
        res.status(500).json({ message: 'An error occurred during points transfer', error: error.message });
    }
};

const keysecret = process.env.SECRET_KEY;

export const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ status: 401, message: 'No token provided' });
    }

    const decodedToken = jwt.verify(token, keysecret);
    if (!decodedToken) {
      return res.status(401).json({ status: 401, message: 'Invalid token' });
    }

    const rootUser = await AccountRegister.findById(decodedToken._id);
    if (!rootUser) {
      return res.status(404).json({ status: 404, message: 'User not found' });
    }

    req.token = token;
    req.rootUser = rootUser;
    req.user = rootUser;
    req.userId = rootUser._id;

    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ status: 401, message: 'Unauthorized', error: error.message });
  }
};
