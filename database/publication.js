const mongoose=require("mongoose");

//creating a book schema
const PublicationSchema=mongoose.Schema({
    id:Number,
    name:String,
    books:[String],
});

//creating book model
const PublicationModel=mongoose.model("publications",PublicationSchema);

module.exports=PublicationModel;