import User from "../models/User.js"

export const createUser = async (req , res) => {
    try {
        const user = new User(req.body);
        const savedUser = user.save();

        //ommiting password from response
        const userResponse = savedUser.toObject();
        delete userResponse.password;

        res.status(201).json(userResponse);

    } catch (err) {
        res.status(400).json({message : err.message});
    }
};

export const getAllUsers = async (req , res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json(users);

    } catch (err) {
        res.status(500).json({message : err.message});
    }
};

export const getUserById = async (req , res) => {
    try {
        const user = await Product.findById(req.params.id).select('-password');
        if(!user) return res.status(404).json({message : "User not found"});
        res.status(200).json(user);

    } catch (err) {
       res.status(500).json({message : err.message});
    }
};


export const updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).select('-password');
        
        if (!updatedUser) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


export const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};