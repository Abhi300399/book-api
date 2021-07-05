//Initializing Express Router
const Router=require("express").Router();

const AuthorModel=require("../../database/authors");

/* 
Route             /author
Description   To get all authors
Access        PUBLIC
Parameter     NONE
Methods       GET
*/
Router.get("/",async(req,res)=>{
    
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
Router.get("/:id",async(req,res)=>{
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
Router.get("/book/:isbn",async(req,res)=>{
    //const getSpecificAuthorForBook=database.author.filter((author)=> author.books.includes(req.params.isbn));
    const getSpecificAuthorForBook=await AuthorModel.find({books:req.params.isbn});
 
    if(getSpecificAuthorForBook.length===0){
        return res.json({error:`No author found for book of ISBN ${req.params.isbn}`});
    }
    return res.json({author:getSpecificAuthorForBook});  
});


/* 
Route             /author/add
Description   To add new author
Access        PUBLIC
Parameter     NONE
Methods       POST
*/
Router.post("/add", async(req,res)=>{
    const {newAuthor}=req.body;
   // database.author.push(newAuthor);

   const addNewAuthor=await AuthorModel.create(newAuthor);

    return res.json({author:addNewAuthor});  

});


/* 
Route             /author/update/name
Description   To update author name
Access        PUBLIC
Parameter     id
Methods       PUT
*/
Router.put("/update/name/:id", async(req,res)=>{
    const updatedAuthorName= await AuthorModel.findOneAndUpdate({
        id:req.params.id,
    },
    {
        name:req.body.name,
    },
    {
        new:true,
    });


   /* database.author.forEach((author)=>{
        if(author.id=== parseInt(req.params.id)){
                author.name=req.body.name;
                return;
        }
       
    });*/
    return res.json({author:updatedAuthorName}); 
});


/* 
Route             /author/delete
Description   To delete an author
Access        PUBLIC
Parameter     id
Methods       DELETE
*/
Router.delete("/delete/:id", async(req,res)=>{

    const updatedAuthorDatabase= await AuthorModel.findOneAndDelete({id:req.params.id});

    /*const updatedAuthorDatabase=database.author.filter((author)=> author.id !== parseInt(req.params.id));
    database.author=updatedAuthorDatabase; */
    return res.json({authors:updatedAuthorDatabase}); 
});
 
module.exports=Router;