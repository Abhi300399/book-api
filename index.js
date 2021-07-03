require("dotenv").config();
 
//Frameworks
const express=require("express");
const mongoose=require("mongoose");

//Database
const database=require("./database/index");

//Models
const BookModel=require("./database/books");
const AuthorModel=require("./database/authors");
const PublicationModel=require("./database/publication");
 
//Initialization
const booky=express();

//configuration
booky.use(express.json());

//Establish Database Connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}
).then(()=> console.log("connection established!!!!!!!!"));

/* 
Route             /
Description   To get all books
Access        PUBLIC
Parameter     NONE
Methods       GET
*/
booky.get("/",async (req,res)=>{
    const getAllBooks=await BookModel.find();
    return res.json({books:getAllBooks});

});


/* 
Route             /book
Description   To get specific book based on ISBN
Access        PUBLIC
Parameter     ISBN
Methods       GET
*/
booky.get("/book/:ISBN", async(req,res)=>{
    //const getSpecificBook=database.books.filter((book)=> book.ISBN===req.params.ISBN);
    const getSpecificBook= await BookModel.findOne({ISBN:req.params.ISBN});
    //null--> false
    //value-->true

    if(!getSpecificBook){
        return res.json({error:`No book found for ISBN of ${req.params.ISBN}`});
    }
    return res.json({books:getSpecificBook});

});

/* 
Route             /c
Description   To get specific books based on Category
Access        PUBLIC
Parameter     category
Methods       GET
*/
booky.get("/c/:category", async(req,res)=>{
    //const getSpecificCategoryBook=database.books.filter((book)=> book.category.includes(req.params.category));
     getSpecificCategoryBook=await BookModel.find({category:req.params.category});

    if(getSpecificCategoryBook.length===0){
        return res.json({error:`No book found for category of ${req.params.category}`});
    }
    return res.json({books:getSpecificCategoryBook}); 

});


/* 
Route             /lang
Description   To get specific books based on Language
Access        PUBLIC
Parameter     language
Methods       GET
*/
booky.get("/lang/:language", async(req,res)=>{
    
    //const getSpecificLanguageBook=database.books.filter((book)=> book.language===req.params.language);
    const getSpecificLanguageBook= await BookModel.find({language:req.params.language});


    if(getSpecificLanguageBook.length===0){
        return res.json({error:`No book found for language of ${req.params.language}`});
    }
    return res.json({books:getSpecificLanguageBook}); 

});

/* 
Route             /author
Description   To get all authors
Access        PUBLIC
Parameter     NONE
Methods       GET
*/
booky.get("/author",async(req,res)=>{
    
    const getAllAuthors=await AuthorModel.find();
    //return res.json({authors:database.author}); 
    return res.json({authors:getAllAuthors}); 


});

/* 
Route             /author
Description   To get specific author based on ID
Access        PUBLIC
Parameter     id
Methods       GET
*/
booky.get("/author/:id",async(req,res)=>{
    //const getSpecificAuthor=database.author.filter((author)=> author.id === parseInt(req.params.id));
    const getSpecificAuthor=await AuthorModel.findOne({id:req.params.id});

    if(!getSpecificAuthor){
        return res.json({error:`No author found for id of ${req.params.id}`});
    }
    return res.json({author:getSpecificAuthor}); 

});

/* 
Route             /author/book
Description   To get specific authors based on Books
Access        PUBLIC
Parameter     isbn
Methods       GET
*/
booky.get("/author/book/:isbn",async(req,res)=>{
    //const getSpecificAuthorForBook=database.author.filter((author)=> author.books.includes(req.params.isbn));
    const getSpecificAuthorForBook=await AuthorModel.find({books:req.params.isbn});
 
    if(getSpecificAuthorForBook.length===0){
        return res.json({error:`No author found for book of ISBN ${req.params.isbn}`});
    }
    return res.json({author:getSpecificAuthorForBook});  
});


/* 
Route             /publication
Description   To get all publications
Access        PUBLIC
Parameter     NONE
Methods       GET
*/
booky.get("/publication", async(req,res)=>{
    const getAllPublications= await PublicationModel.find();
    return res.json({publications:getAllPublications}); 

});


/* 
Route             /publication
Description   To get specific publication based on ID
Access        PUBLIC
Parameter     id
Methods       GET
*/
booky.get("/publication/:id", async(req,res)=>{
    //const getSpecificPublication=database.publication.filter((publication)=> publication.id === parseInt(req.params.id));
    const getSpecificPublication=await PublicationModel.findOne({id:req.params.id});

    if(!getSpecificPublication){
        return res.json({error:`No publication found for id of ${req.params.id}`});
    }
    return res.json({publication:getSpecificPublication}); 

});

/* 
Route             /publication/book
Description   To get specific publications based on Book
Access        PUBLIC
Parameter     isbn
Methods       GET
*/
booky.get("/publication/book/:isbn", async(req,res)=>{
    //const getSpecificPublicationsForBook=database.publication.filter((publication)=> publication.books.includes(req.params.isbn));
    const getSpecificPublicationsForBook= await PublicationModel.find({books:req.params.isbn});

    if(getSpecificPublicationsForBook.length===0){
        return res.json({error:`No publication found for book of ISBN ${req.params.isbn}`});
    }
    return res.json({publication:getSpecificPublicationsForBook});  
});

/* 
Route             /is/add
Description   To add new book
Access        PUBLIC
Parameter     NONE
Methods       POST
*/
booky.post("/is/add", async(req,res)=>{
    const {newBook}=req.body;
    //database.books.push(newBook);
    
    const addNewBook=await BookModel.create(newBook);

    return res.json({books:addNewBook});  

});

/* 
Route             /author/add
Description   To add new author
Access        PUBLIC
Parameter     NONE
Methods       POST
*/
booky.post("/author/add", async(req,res)=>{
    const {newAuthor}=req.body;
   // database.author.push(newAuthor);

   const addNewAuthor=await AuthorModel.create(newAuthor);

    return res.json({author:addNewAuthor});  

});

/* 
Route             /publication/add
Description   To add new publication
Access        PUBLIC
Parameter     NONE
Methods       POST
*/
booky.post("/publication/add", async(req,res)=>{
    const {newPublication}=req.body;
    //database.publication.push(newPublication);
    const addNewPublication=await PublicationModel.create(newPublication);
    return res.json({Publications:addNewPublication});  

});


/* 
Route             /book/update/title
Description   To update book title
Access        PUBLIC
Parameter     isbn
Methods       PUT
*/
booky.put("/book/update/title/:isbn",(req,res)=>{


    database.books.forEach((book)=>{
        if(book.ISBN === req.params.isbn){
                book.title=req.body.title;
                return;
        }
       
    });
    return res.json({book:database.books}); 
});

/* 
Route             /book/update/author
Description   To update/add book author
Access        PUBLIC
Parameter     isbn,authorId
Methods       PUT
*/
booky.put("/book/update/author/:isbn/:authorId",(req,res)=>{

    //update the book database
    database.books.forEach((book)=>{
        if(book.ISBN === req.params.isbn){
                book.author.push(parseInt(req.params.authorId));
                return;
        }
       
    });

    //upadate author database
    database.author.forEach((author)=>{
        if(author.id === parseInt(req.params.authorId)){
                author.books.push(req.params.isbn);
                return;
        }
       
    });
    return res.json({book:database.books,author:database.author,message:"Updated the author for book successfully"}); 
});

/* 
Route             /author/update/name
Description   To update author name
Access        PUBLIC
Parameter     id
Methods       PUT
*/
booky.put("/author/update/name/:id",(req,res)=>{


    database.author.forEach((author)=>{
        if(author.id=== parseInt(req.params.id)){
                author.name=req.body.name;
                return;
        }
       
    });
    return res.json({author:database.author}); 
});

/* 
Route             /publication/update/name
Description   To update publication name
Access        PUBLIC
Parameter     id
Methods       PUT
*/
booky.put("/publication/update/name/:id",(req,res)=>{


    database.publication.forEach((publication)=>{
        if(publication.id === parseInt(req.params.id)){
                publication.name=req.body.name;
                return;
        }
       
    });
    return res.json({publications:database.publication}); 
});

/* 
Route             /publication/update/book
Description   To update/add new book to publication 
Access        PUBLIC
Parameter     isbn
Methods       PUT
*/
booky.put("/publication/update/book/:isbn",(req,res)=>{
    //update publication database
    database.publication.forEach((publication)=>{
         if(publication.id===req.body.pubid){
            return publication.books.push(req.params.isbn);
         }
    }
    );

    //update book database
    database.books.forEach((book) => {
            if(book.ISBN===req.params.isbn){
               return book.publication.push(req.body.pubid);
            }
    }
    );

    return res.json({message:"Updated/added the book for publication",books:database.books,publications:database.publication})
});

/* 
Route             /book/delete
Description   To delete a book
Access        PUBLIC
Parameter     isbn
Methods       DELETE
*/
booky.delete("/book/delete/:isbn",(req,res)=>{
        const updatedBookDatabase=database.books.filter((book)=> book.isbn !== req.params.isbn);
        database.books=updatedBookDatabase; 

    return res.json({books:database.books}); 
});


/* 
Route             /book/delete/author
Description   To delete a author from book
Access        PUBLIC
Parameter     isbn,authorId
Methods       DELETE
*/
booky.delete("/book/delete/author/:isbn/:authorId",(req,res)=>{
    //update book database

    database.books.forEach((book)=>{
        if(book.ISBN===req.params.isbn){
            const updatedBookAuthors=book.author.filter((author)=> author!== parseInt(req.params.authorId));
            book.author=updatedBookAuthors;
            return;
        }
    });
     
    //update author database
    database.author.forEach((author)=>{
        if(author.id===parseInt(req.params.authorId)){
            const updatedAuthorBook=author.books.filter((book)=> book!==req.params.isbn);
            author.books=updatedAuthorBook;
            return;
        }
    });
   
        return res.json({books:database.books,authors:database.author}); 
});

/* 
Route             /author/delete
Description   To delete an author
Access        PUBLIC
Parameter     id
Methods       DELETE
*/
booky.delete("/author/delete/:id",(req,res)=>{
    const updatedAuthorDatabase=database.author.filter((author)=> author.id !== parseInt(req.params.id));
    database.author=updatedAuthorDatabase; 
    return res.json({authors:database.author}); 
});

/* 
Route             /publication/delete
Description   To delete a publication
Access        PUBLIC
Parameter     id
Methods       DELETE
*/
booky.delete("/publication/delete/:id",(req,res)=>{
    const updatedPublicationDatabase=database.publication.filter((publication)=> publication.id !== parseInt(req.params.id));
    database.publication=updatedPublicationDatabase; 

return res.json({publications:database.publication}); 
});


/* 
Route             /publication/delete/book
Description   To delete a author from book
Access        PUBLIC
Parameter     id,isbn
Methods       DELETE
*/
booky.delete("/publication/delete/book/:id/:isbn",(req,res)=>{
    
    //update publication database
    database.publication.forEach((publication)=>{
        if(publication.id===parseInt(req.params.id)){
            const updatedPublicationBook=publication.books.filter((book)=> book!==req.params.isbn);
            publication.books=updatedPublicationBook;
            return;
        }
    });

    //update book database
    database.books.forEach((book)=>{
        if(book.ISBN===req.params.isbn){
            const updatedBookPublications=book.publication.filter((publication)=> publication!== parseInt(req.params.id));
            book.publication=updatedBookPublications;
            return;
        }
    });
   
        return res.json({books:database.books,publications:database.publication}); 
});

booky.listen(3000,()=> console.log("hey server is running"));
