var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
// Telling my router that I have this model
let Book = require('../model/book');
const book = require('../model/book');
let bookController = require('../controllers/book.js')

/* Get route for the book list - Read Operation */
/* GET, Post, Put */

function requireAuth(req,res,next){
    if(!req.isAuthenticated()){
        return res.redirect('/login');
    }
    next();
}

/* Read Operation --> Get route for displaying the books*/
router.get('/',async(req,res,next)=>{
try{
    const BookList = await Book.find();
    res.render('Book/list',{
        title:'Book Store', 
        displayName: req.user ? req.user.displayName:'',
        BookList:BookList
    })}
    catch(err){
        console.error(err);
        res.render('Book/list',{
            error:'Error on the Server'
        })
    }
});

/* Create Operation --> Get route for displaying the Add Page*/
router.get('/add', async(req,res,next) => {
    try{
        res.render('Book/add',{
            title: 'Add Book',
            displayName: req.user ? req.user.displayName:''
        })
    }
    catch(err){
        console.error(err);
        res.render('Book/list',{
            error:'Error on the Server'
        })
    }
});
/* Create Operation --> Post route for processing the Add Page*/
router.post('/add', async(req,res,next) => {
    try{
        let newBook = Book({
            "Name":req.body.Name,
            "Author":req.body.Author,
            "Published":req.body.Published,
            "Description":req.body.Description,
            "Price":req.body.Price
        });
        Book.create(newBook).then(()=>{
            res.redirect('/books')
        })
    }
    catch(err){
        console.error(err);
        res.render('Book/list',{
            error:'Error on the Server'
        })
    }
});
/* Update Operation --> Get route for displaying the Edit Page*/
router.get('/edit/:id', async(req,res,next) => {
    try{
        const id = req.params.id;
        const bookToEdit = await Book.findById(id);
        res.render('Book/edit',{
            title: 'Edit Book',
            displayName: req.user ? req.user.displayName:'',
            Book: bookToEdit
        })
    }
    catch(err){
        console.error(err);
        res.render('Book/list',{
            error:'Error on the Server'
        })
    }
});
/* Update Operation --> Post route for processing the Edit Page*/
router.post('/edit/:id', async(req,res,next) => {
    try{
        let id = req.params.id;
        let updateBook = Book({
            "_id":id,
            "Name":req.body.Name,
            "Author":req.body.Author,
            "Published":req.body.Published,
            "Description":req.body.Description,
            "Price":req.body.Price
        });
        Book.findByIdAndUpdate(id,updateBook).then(()=>{
            res.redirect('/books')
        })
    }
    catch(err){
        console.error(err);
        res.render('Book/list',{
            error:'Error on the Server'
        })
    }
});
/* Delete Operation --> Get route to perform Delete Operation*/
router.get('/delete/:id', async(req,res,next) => {
    try{
        let id = req.params.id;
        Book.deleteOne({_id:id}).then(()=>{
            res.redirect('/books')
        })
    }
    catch(err){
        console.error(err);
        res.render('Book/list',{
            error:'Error on the Server'
        })
    }
});

module.exports = router;