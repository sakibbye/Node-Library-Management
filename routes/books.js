const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const axios = require('axios');

const controller = require('../controller/controller');
// Welcome Page
router.get('/',  (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => {
  
     //Make a get request to /api/books/
     axios.get('http://localhost:3000/api/books')
     .then((response) => {
         //console.log(response.data);
         res.render('dashboard', {books: response.data});
     })
     .catch(err => {
         res.send(err);
     })
 
})

//add book
router.get('/add-book', ensureAuthenticated, (req, res) =>
  res.render('add_book'));

//update book   
router.get('/update-book', ensureAuthenticated, (req, res) =>{
  axios.get('http://localhost:3000/api/books',{params : {id: req.query.id}})
  .then((bookdata) => {
      res.render("update_book", {book : bookdata.data});
  })
  .catch(err => {
      res.send(err);
  })
});

//API
router.post('/api/books',  controller.create);
router.get('/api/books', controller.find);
router.put('/api/books/:id',  controller.update);
router.delete('/api/books/:id',  controller.delete);

module.exports = router;
