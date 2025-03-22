const Mother = require("../model/mothersModel");

const addMother = async (req, res) => {
    try {
        const { name, kname, email, password, phone } = req.body;

        // Validate required fields
        if (!name || !kname || !email || !password || !phone) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if email already exists
        const existingMother = await Mother.findOne({ email });
        if (existingMother) {
            return res.status(400).json({ message: "Email is already registered" });
        }

        // Create a new mother instance
        const newMother = new Mother({
            name,
            kname,
            email,
            password, // You should hash the password before saving
            phone,
            menu: [],
            subscribedUsers: [],
            revenue: 0,
        });

        await newMother.save();
        res.status(201).json({ message: "Mother registered successfully", mother: newMother });
    } catch (error) {
        console.error("Error adding mother:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { addMother };
