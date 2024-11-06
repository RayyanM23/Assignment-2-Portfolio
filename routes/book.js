var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
// Telling my router that I have this model
let Book = require('../model/book');
/* Get route for the book list - Read Operation */
/* GET, Post, Put */
router.get('/',async(req,res,next)=>{
try{
    const BookList = await Book.find();
    res.render('book',{
        title:'Secret Book Store',
        BookList:BookList
    })}
    catch(err){
        console.error(err);
        res.render('book',{
            error:'Error on the Server'
        })
    }
});
module.exports = router;