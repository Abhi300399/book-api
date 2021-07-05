require("dotenv").config();
 
//Frameworks
const express=require("express");
const mongoose=require("mongoose");


//Microservices Routes
const Books=require("./API/Book");
const Authors=require("./API/Author");
const Publications=require("./API/Publication");
 
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
 

booky.use("/book",Books);
booky.use("/author",Authors);
booky.use("/publication",Publications);




booky.listen(3000,()=> console.log("hey server is running"));
