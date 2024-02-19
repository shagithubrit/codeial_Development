const mongoose = require('mongoose');
const multer =require('multer');
const path=require('path');
const AVATAR_PATH= path.join('/uploads/users/avatars');
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    }
}, {
    timestamps: true
});

let storage= multer.diskStorage({
    destination:  function (req, file,cb){
        // const pathA=path.join(__dirname, '..', AVATAR_PATH)
        // console.log(' This is the path of my uploaded files' ,pathA);

        cb(null, path.join(__dirname, '..', AVATAR_PATH));
    },
    filename: function(req,file,cb){
        cb(null,file.originalname + '-'+ Date.now())
    }
})

//statics
userSchema.statics.uploadedAvatar= multer({storage:  storage}).single('avatar');
userSchema.statics.avatarPath=AVATAR_PATH;


const User = mongoose.model('User', userSchema);

module.exports = User;