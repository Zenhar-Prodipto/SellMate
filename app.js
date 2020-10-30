const express = require("express")
require ("dotenv").config();
const mongoose = require("mongoose");
const morgan = require('morgan');
const bodyParser = require ("body-parser");
const cookieParser = require ("cookie-parser");
const expressValidator = require("express-validator")
// var uuid = require('uuid');
// const uuidv1 = require('uuid/v1');



//imports
const authRoutes = require("./routes/auth");

//app
const app = express()

//Database
// mongodb+srv://Admin-Zenhar:<password>@cluster0.eam0a.mongodb.net/<dbname>?retryWrites=true&w=majority
mongoose.connect( process.env.DATABASE,{
  useNewUrlParser: true,
  useCreateIndex: true
})
.then(()=> console.log('Database connected'));

//middlewares

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(expressValidator())


//Routes

app.use('/api',authRoutes);


//Port

const port = process.env.PORT | 8000

app.listen(port, function(){
  console.log(`The app is running at port ${port}`)
});
