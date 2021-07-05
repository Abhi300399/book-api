//Initializing Express Router
const Router=require("express").Router();

const BookModel=require("../../database/books");
const AuthorModel=require("../../database/authors");

/* 
Route             /
Description   To get all books
Access        PUBLIC
Parameter     NONE
Methods       GET
*/
Router.get("/",async (req,res)=>{
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
Router.get("/:ISBN", async(req,res)=>{
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
Router.get("/c/:category", async(req,res)=>{
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
Router.get("/lang/:language", async(req,res)=>{
    
    //const getSpecificLanguageBook=database.books.filter((book)=> book.language===req.params.language);
    const getSpecificLanguageBook= await BookModel.find({language:req.params.language});


    if(getSpecificLanguageBook.length===0){
        return res.json({error:`No book found for language of ${req.params.language}`});
    }
    return res.json({books:getSpecificLanguageBook}); 

});


/* 
Route             /is/add
Description   To add new book
Access        PUBLIC
Parameter     NONE
Methods       POST
*/
Router.post("/is/add", async(req,res)=>{

    try{
    const {newBook}=req.body;
    //database.books.push(newBook);
    
    const addNewBook=await BookModel.create(newBook);

    return res.json({books:addNewBook});  
    }catch(error){
        return res.json({error:error.message});
    }

});


/* 
Route             /book/update/title
Description   To update book title
Access        PUBLIC
Parameter     isbn
Methods       PUT
*/
Router.put("/update/title/:isbn", async(req,res)=>{
    const updatedBook= await BookModel.findOneAndUpdate({
        ISBN:req.params.isbn,
    },
    {
        title:req.body.booktitle,
    },
    {
        new:true,
    });

   /* database.books.forEach((book)=>{
        if(book.ISBN === req.params.isbn){
                book.title=req.body.title;
                return;
        }
       
    });*/
    return res.json({book:updatedBook}); 
});

/* 
Route             /book/update/author
Description   To update/add book author
Access        PUBLIC
Parameter     isbn,authorId
Methods       PUT
*/
Router.put("/update/author/:isbn/:authorId", async(req,res)=>{

    //update the book database
   const updatedBookAuthor=await BookModel.findOneAndUpdate({
        ISBN:req.params.isbn,
    },
    {
        $addToSet:{
        author:req.params.authorId,
     },
    },
    {
        new:true,
    }
    );
   /* database.books.forEach((book)=>{
        if(book.ISBN === req.params.isbn){
                book.author.push(parseInt(req.params.authorId));
                return;
        }
       
    });*/

    //upadate author database
    const updatedAuthorBook=await AuthorModel.findOneAndUpdate({
        id:req.params.authorId,
    },
    {
        $addToSet:{
        books:req.params.isbn,
     },
    },
    {
        new:true,
    }
    );

    /*database.author.forEach((author)=>{
        if(author.id === parseInt(req.params.authorId)){
                author.books.push(req.params.isbn);
                return;
        }
       
    });*/
    return res.json({book:updatedBookAuthor,author:updatedAuthorBook,message:"Updated the author for book successfully"}); 
});


/* 
Route             /book/delete
Description   To delete a book
Access        PUBLIC
Parameter     isbn
Methods       DELETE
*/
Router.delete("/delete/:isbn", async(req,res)=>{
    const updatedBookDatabase= await BookModel.findOneAndDelete({ISBN:req.params.isbn});


       /* const updatedBookDatabase=database.books.filter((book)=> book.isbn !== req.params.isbn);
        database.books=updatedBookDatabase; */

    return res.json({updatedBookDatabase}); 
});


/* 
Route             /book/delete/author
Description   To delete a author from book
Access        PUBLIC
Parameter     isbn,authorId
Methods       DELETE
*/
Router.delete("/delete/author/:isbn/:authorId", async(req,res)=>{
    //update book database
    const updatedBookAuthors= await BookModel.findOneAndUpdate({
        ISBN:req.params.isbn,
    },
    {
        $pull:{
            author:req.params.authorId,
        }
    },
    {
        new:true,
    }
    );

   /* database.books.forEach((book)=>{
        if(book.ISBN===req.params.isbn){
            const updatedBookAuthors=book.author.filter((author)=> author!== parseInt(req.params.authorId));
            book.author=updatedBookAuthors;
            return;
        }
    });*/
     
    //update author database
    const updatedAuthorBooks= await AuthorModel.findOneAndUpdate({
        id:req.params.authorId,
    },
    {
        $pull:{
            books:req.params.isbn,
        }
    },
    {
        new:true,
    }
    );
    /*database.author.forEach((author)=>{
        if(author.id===parseInt(req.params.authorId)){
            const updatedAuthorBook=author.books.filter((book)=> book!==req.params.isbn);
            author.books=updatedAuthorBook;
            return;
        }
    });*/
   
        return res.json({books:updatedBookAuthors,authors:updatedAuthorBooks}); 
});

module.exports=Router;