//Initializing Express Router
const Router=require("express").Router();

const PublicationModel=require("../../database/publication");
const BookModel=require("../../database/books");


/* 
Route             /publication
Description   To get all publications
Access        PUBLIC
Parameter     NONE
Methods       GET
*/
Router.get("/", async(req,res)=>{
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
Router.get("/:id", async(req,res)=>{
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
Router.get("/book/:isbn", async(req,res)=>{
    //const getSpecificPublicationsForBook=database.publication.filter((publication)=> publication.books.includes(req.params.isbn));
    const getSpecificPublicationsForBook= await PublicationModel.find({books:req.params.isbn});

    if(getSpecificPublicationsForBook.length===0){
        return res.json({error:`No publication found for book of ISBN ${req.params.isbn}`});
    }
    return res.json({publication:getSpecificPublicationsForBook});  
});





/* 
Route             /publication/add
Description   To add new publication
Access        PUBLIC
Parameter     NONE
Methods       POST
*/
Router.post("/add", async(req,res)=>{
    const {newPublication}=req.body;
    //database.publication.push(newPublication);
    const addNewPublication=await PublicationModel.create(newPublication);
    return res.json({Publications:addNewPublication});  

});





/* 
Route             /publication/update/name
Description   To update publication name
Access        PUBLIC
Parameter     id
Methods       PUT
*/
Router.put("/update/name/:id", async(req,res)=>{
    const updatedPublicationName= await PublicationModel.findOneAndUpdate({
        id:req.params.id,
    },
    {
        name:req.body.name,
    },
    {
        new:true,
    });


    /*database.publication.forEach((publication)=>{
        if(publication.id === parseInt(req.params.id)){
                publication.name=req.body.name;
                return;
        }
       
    });*/
    return res.json({publications:updatedPublicationName}); 
});

/* 
Route             /publication/update/book
Description   To update/add new book to publication 
Access        PUBLIC
Parameter     isbn
Methods       PUT
*/
Router.put("/update/book/:isbn", async(req,res)=>{
    //update publication database
    const updatedPublicationBook=await PublicationModel.findOneAndUpdate({
        id:req.body.pubid,
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

    /*database.publication.forEach((publication)=>{
         if(publication.id===req.body.pubid){
            return publication.books.push(req.params.isbn);
         }
    }
    );*/

    //update book database
    const updatedBookPublications=await BookModel.findOneAndUpdate({
        ISBN:req.params.isbn,
    },
    {
        $addToSet:{
        publication:req.body.pubid,
     },
    },
    {
        new:true,
    }
    );

    return res.json({message:"Updated/added the book for publication",books:updatedBookPublications,publications:updatedPublicationBook})
});



/* 
Route             /publication/delete
Description   To delete a publication
Access        PUBLIC
Parameter     id
Methods       DELETE
*/
Router.delete("/delete/:id", async(req,res)=>{

    const updatedPublicationDatabase= await PublicationModel.findOneAndDelete({id:req.params.id})

    /*const updatedPublicationDatabase=database.publication.filter((publication)=> publication.id !== parseInt(req.params.id));
    database.publication=updatedPublicationDatabase;*/

return res.json({publications:updatedPublicationDatabase}); 
});


/* 
Route             /publication/delete/book
Description   To delete a book from publication
Access        PUBLIC
Parameter     id,isbn
Methods       DELETE
*/
Router.delete("/delete/book/:id/:isbn", async(req,res)=>{
    
    //update publication database
    const updatedPublicationBook= await PublicationModel.findOneAndUpdate({
        id:req.params.id,
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
    /*database.publication.forEach((publication)=>{
        if(publication.id===parseInt(req.params.id)){
            const updatedPublicationBook=publication.books.filter((book)=> book!==req.params.isbn);
            publication.books=updatedPublicationBook;
            return;
        }
    });*/

    //update book database
    const updatedBookPublications= await BookModel.findOneAndUpdate({
        ISBN:req.params.isbn,
    },
    {
        $pull:{
            publication:req.params.id,
        }
    },
    {
        new:true,
    }
    );
    /*database.books.forEach((book)=>{
        if(book.ISBN===req.params.isbn){
            const updatedBookPublications=book.publication.filter((publication)=> publication!== parseInt(req.params.id));
            book.publication=updatedBookPublications;
            return;
        }
    });*/
   
        return res.json({books:updatedBookPublications,publications:updatedPublicationBook}); 
});

module.exports=Router;