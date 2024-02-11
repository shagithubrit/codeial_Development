const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create =   function(req, res){
    Post.findById(req.body.post, function(err, post){

        if (post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function(err, comment){
                // handle error

                post.comments.push(comment);
                post.save();

                res.redirect('/');
            });
        }

    });
}

// to delete the comment we are creating controller for it 
module.exports.destroy=function(req,res){
    Comment.findById(req.params.id, function(err,comment){
        if(comment.user == req.user.id){
            // initially saving the user id of that comment so that later on we can pull that user from the post schema 
            let postId= comment.post;
            //  now removing that comment 
            comment.remove();
            Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}}, function(err,post){
                return res.redirect('back');
            })
        }
        else{
            return res.redirect('back');
        }
    });
}
