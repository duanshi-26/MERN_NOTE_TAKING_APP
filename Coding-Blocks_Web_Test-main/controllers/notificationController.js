const Note = require('../models/noteModel');


const sendNote = async (req, res) => {
    try {
        const { userId, message, type } = req.body;
        
        console.log("Request Body:", req.body); 

        if (!userId || !message) {
            return res.status(400).json({ message: 'userId and message are required' });
        }

        const note = await Note.create({ user: userId, message, type });

        res.status(201).json(notification);
    } catch (error) {
        console.error("Error:", error);  
        res.status(500).json({ message: "Server error", error: error.message });
    }
}



const getNotes = async (req, res) => {
    try {
        const { userId } = req.params;  

        const notes = await Note.find({ user: userId }).sort({ createdAt: -1 });

        res.status(200).json(notes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = { sendNote, getNotes };
