const express = require('express');
const router = express.Router();
const multer = require('multer');

const {
    getAddUserForm,
    addUser,
    getAllUsers,
    getEditUserForm,
    deleteUser,
    updateUser
} = require('../controllers/userController.js');


// Image upload
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});


// Middleware
let upload = multer({
    storage: storage,
}).single('image');


// Routes
router.get('/add', getAddUserForm);
router.post('/add', upload, addUser);
router.get('/edit/:id', getEditUserForm);
router.post('/update/:id', upload, updateUser);
router.get('/', getAllUsers);
router.get('/delete/:id', deleteUser);


module.exports = router;
