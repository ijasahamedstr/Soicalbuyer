import mongoose from 'mongoose';

const PointSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    points: { type: Number, required: true, default: 0 },
    reason: {
        type: String,
    },
}, { timestamps: true });

// model
const Point = mongoose.model('Point', PointSchema);

export default Point;
