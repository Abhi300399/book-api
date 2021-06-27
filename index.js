const express=require("express");

//Database
const database=require("./database");
 
//Initialization
const booky=express();

/* 
Route             /
Description   To get all books
Access        PUBLIC
Parameter     NONE
Methods       GET
*/
booky.get("/",(req,res)=>{
    return res.json({books:database.books});

});


/* 
Route             /book
Description   To get specific book based on ISBN
Access        PUBLIC
Parameter     ISBN
Methods       GET
*/
booky.get("/book/:ISBN",(req,res)=>{
    const getSpecificBook=database.books.filter((book)=> book.ISBN===req.params.ISBN);

    if(getSpecificBook.length===0){
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
booky.get("/c/:category",(req,res)=>{
    const getSpecificCategoryBook=database.books.filter((book)=> book.category.includes(req.params.category));

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
booky.get("/lang/:language",(req,res)=>{
    const getSpecificLanguageBook=database.books.filter((book)=> book.language===req.params.language);

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
booky.get("/author",(req,res)=>{
    
    return res.json({authors:database.author}); 

});

/* 
Route             /author
Description   To get specific author based on ID
Access        PUBLIC
Parameter     id
Methods       GET
*/
booky.get("/author/:id",(req,res)=>{
    const getSpecificAuthor=database.author.filter((author)=> author.id === parseInt(req.params.id));

    if(getSpecificAuthor.length===0){
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
booky.get("/author/book/:isbn",(req,res)=>{
    const getSpecificAuthorForBook=database.author.filter((author)=> author.books.includes(req.params.isbn));

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
booky.get("/publication",(req,res)=>{
    
    return res.json({publication:database.publication}); 

});


/* 
Route             /publication
Description   To get specific publication based on ID
Access        PUBLIC
Parameter     id
Methods       GET
*/
booky.get("/publication/:id",(req,res)=>{
    const getSpecificPublication=database.publication.filter((publication)=> publication.id === parseInt(req.params.id));

    if(getSpecificPublication.length===0){
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
booky.get("/publication/book/:isbn",(req,res)=>{
    const getSpecificPublicationsForBook=database.publication.filter((publication)=> publication.books.includes(req.params.isbn));

    if(getSpecificPublicationsForBook.length===0){
        return res.json({error:`No publication found for book of ISBN ${req.params.isbn}`});
    }
    return res.json({publication:getSpecificPublicationsForBook});  
});


booky.listen(3000,()=> console.log("hey server is running"));
