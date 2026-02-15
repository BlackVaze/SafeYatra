import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
    location: { type: String, required: true },
    time: { type: String, required: true },
    crime: { type: String, required: true },
    description: { type: String, required: true },
}, { timestamps: true });

const Report = mongoose.model('Report', reportSchema);
export default Report;