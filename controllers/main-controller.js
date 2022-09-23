const { json } = require("express");
const express = require("express");
const router = express.Router();

const { requireToken, handleValidateOwnership } = require("../middleware/auth");
const { findById, find, findOneAndUpdate } = require("../models/User");
const User = require("../models/User");
const Comment = require("../models/Comment")

//comments
    //user id should allow matching users to realize CRUD operations on their comment

//profile page
router.get("/profile", requireToken, async (req, res) => {
    try{
        const thisUser = await User.findOne({username: req.user.username})
        let jsonUser = JSON.stringify(thisUser)
        // console.log(jsonUser)

        const userComments = await Comment.find({username: req.user.username})
        // console.log(userComments)

        res.json(thisUser)
    } catch (error){
        res.status(400).json(error)
    }
  });

router.delete('/profile/delete', requireToken, async (req, res) => {
    try{
        res.json(
            await User.findOneAndRemove({username: req.user.username}),
            await Comment.updateMany({username:req.user.username},{username: 'deleted user'})
                )
    } catch (error){
        res.status(400).json(error)
    }
})

//favorite
router.post('/favorites', requireToken, async(req, res) => {
    try{

        const thisUser = await User.findOne({username: req.user.username})
        // console.log(thisUser.username)
        let setFavorite = String(req.body.brewery)
        // console.log(setFavorite)

        if(thisUser.favorites.includes(setFavorite)){
            await User.findOneAndUpdate(
                {username: thisUser.username},
                {$pullAll: {favorites: [setFavorite] }}
            )
        } else {
            await User.findOneAndUpdate(
                {username: thisUser.username},
                {$push: {favorites: setFavorite}}
            )
        }

        res.status(200)
    } catch (error){
        res.status(400).json(error)
    }
})

//comment
router.post('/comment', requireToken, async (req, res) => {
    try{
        const thisUser = await User.findOne({username: req.user.username})
        // console.log(req.body)
        const newComment = await Comment.create({
            username: thisUser.username,
            brewery: req.body.comment.brewery,
            comment: req.body.comment.comment,
            time: req.body.comment.time
        })
        console.log(req.body)
        console.log(newComment)
        res.status(200)
    } catch(error) {
        res.status(400).json(error)
    }
})

//retrieve comments for one user
router.get("/user-comments", requireToken, async (req, res) => {
    try{
        const userComments = await Comment.find({username: req.user.username})
        // console.log(userComments)

        res.json(userComments)
    } catch (error){
        res.status(400).json(error)
    }
  });

//retrieve comments for one brewery
router.get("/brewery-comments/:id", async (req, res) => {
    try{
        const breweryComments = await Comment.find({brewery: req.params.id})
        // console.log(breweryComments)
        // console.log(req.params.id)
        res.json(breweryComments)
    } catch (error){
        res.status(400).json(error)
    }
  });

//edit and delete comments
// router.delete('/comment/:id', requireToken, async (req, res) => {
//     try{
//         const thisComment = await Comment.findById(req.params.id)
//         if(req.user.username == thisComment.username){
//             res.json(await Comment.findByIdAndDelete(req.params.id))
//         }
//     }catch (error) {
//         res.status(400).json(error)
//     }
// })

module.exports = router;