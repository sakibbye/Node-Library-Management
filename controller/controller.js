var Bookdb = require("../models/Book");

//create and save new book
exports.create = (req, res) => {
  //validate request
  if (!req.body) {
    res.status(404).send({ message: "Content can not be empty" });
    return;
  }

  //new book
  const book = new Bookdb({
    title: req.body.title,
    author: req.body.author,
    isbn: req.body.isbn,
    status: req.body.status,
  });

  //save book in database
  book
    .save(book)
    .then((data) => {
      //res.send(data);
      res.redirect('/add-book')
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some Error Occured Whilr Create Operation",
      });
    });
};

//get books
exports.find = (req, res) => {

    if(req.query.id){
        const id = req.query.id;

        Bookdb.findById(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : "No Book Found"})
            }else{
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({message: "Error Finding Book"})
        })
    }else{
        Bookdb.find()
        .then(book => {
            res.send(book);
        })
        .catch(err =>{
            res.status(500).send({ message: err.message || "Some Error Occured Retriving Data"})
        })
    }

    
};

//update books
exports.update = (req, res) => {
    if(!req.body){
        return res
        .status(404).send({ message: "Form can not be empty" });
    }

    const id = req.params.id;
    Bookdb.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
    .then(data => {
        if(!data){
            res.status(404).send({ message: `Can not update book with id ${id}`})
        }else{
            res.send(data);
        }
    })
    .catch(err =>{
        res.status(500).send({message: "Error Updating Data"})
    })
};


//delete books
exports.delete = (req, res) => {
    const id = req.params.id;
    Bookdb.findByIdAndDelete(id)
    .then(data => {
        if(!data){
            res.status(404).send({ message: `Can not Delete book with id ${id}`})
        }else{
            res.send({message: "Book Deleted Successfully"});
        }
    })
    .catch(err =>{
        res.status(500).send({message: "Error Deleting Data"});
    });
};
