const User = require('../models/userdata');
const fs = require('fs');

const getAddUserForm = (req, res) => {
    res.render("add_users", { title: "Add Users" });
};

const addUser = async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        image: req.file.filename
    });

    try {
        const data = await User.create(user);
        req.session.message = {
            type: 'success',
            message: 'User Added Successfully'
        };
        res.redirect('/');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        req.session.message = null;
    }
};

const getEditUserForm = async (req, res) => {
    try {
        let id = req.params.id;
        const user = await User.findById(id).exec();

        if (!user) {
            console.log('User not found');
            return res.redirect("/");
        }

        res.render("edit_users", {
            title: 'Edit User',
            user: user
        });
    } catch (err) {
        console.error('Error finding user:', err);
        res.redirect("/");
    }
};

const updateUser = async (req, res) => {
    try {
        let id = req.params.id;
        let new_image = '';

        if (req.file) {
            new_image = req.file.filename;
            fs.unlinkSync('./uploads/' + req.body.old_image);
        } else {
            new_image = req.body.old_image;
        }

        await User.findByIdAndUpdate(id, {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            image: new_image
        });

        req.session.message = {
            type: 'success',
            message: 'User updated successfully!'
        };
        res.redirect('/');
    } catch (err) {
        console.log(err);
        res.json({ message: err.message, type: 'danger' });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().exec();
        res.render('index', {
            title: 'Home Page',
            users: users
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findByIdAndDelete(id).exec();

        if (user && user.image !== '') {
            fs.unlinkSync('./uploads/' + user.image);
        }

        req.session.message = {
            type: 'info',
            message: 'User deleted successfully!'
        };
        res.redirect("/");
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = {
    getAddUserForm,
    addUser,
    getAllUsers,
    getEditUserForm,
    deleteUser,
    updateUser
}