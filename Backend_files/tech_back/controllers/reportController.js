import Report from '../models/Report.js';

export const submitReport = async (req, res) => {
    try {
        const { location, time, crime, description } = req.body;
        const newReport = new Report({ location, time, crime, description });
        await newReport.save();
        res.status(201).json({ message: 'Report submitted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error submitting report', error });
    }
};

export const getAllReports = async (req, res) => {
    try {
        const reports = await Report.find();
        res.status(200).json(reports);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching reports', error });
    }
};