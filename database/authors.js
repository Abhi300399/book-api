const mongoose=require("mongoose");

//creating a book schema
const AuthorSchema=mongoose.Schema({
    id:Number,
    name:String,
    books:[String],
});

//creating book model
const AuthorModel=mongoose.model("authors",AuthorSchema);

module.exports=AuthorModel;