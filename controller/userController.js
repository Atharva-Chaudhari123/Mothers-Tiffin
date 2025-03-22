const User = require("../model/userModel"); // Assuming the User schema is in userModel.js

// Handle client signup
const signupClient = async (req, res) => {
    try {
        const { name, username, email, password, phone, address } = req.body;

        // Validate input fields
        if (!name || !username || !email || !password || !phone ) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if username or email already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: "Username or Email already exists" });
        }

        // Create new user instance
        const newUser = new User({
            name,
            username,
            email,
            password, 
            phone
        });

        // Save the new user to the database
        await newUser.save();

        // Send a success response
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { signupClient };
