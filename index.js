const dotenv = require("dotenv")
const express = require('express');
const app = express();
const {connectDB} = require('./config/dbconfig.js');
const model = require("./model/mothersModel.js") ;
const router = require("./routes/router.js")
const cors = require("cors");


// config dotenv 
dotenv.config() ;
const port = process.env.PORT 
console.log(port) ;

//connectDB 
connectDB(process.env.MONGODB_CONNECTION) ;

app.use(express.urlencoded({extended : true})) ;
app.use(express.json()) ;
app.use(cors())

app.use("/api", router )

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});