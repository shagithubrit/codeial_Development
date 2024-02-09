const express = require('express');
const router = express.Router();
const passport = require('passport');

const commentsController = require('../controllers/comments_controller');

// we using post because we changing and updating sometging in database via frontend 
router.post('/create', passport.checkAuthentication, commentsController.create);
//  we using get request because we only need to delete it directly no change in database is to be done ...
router.get('/destroy/:id', passport.checkAuthentication, commentsController.destroy);



module.exports = router;