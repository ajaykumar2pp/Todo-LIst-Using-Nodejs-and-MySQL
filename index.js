const express = require("express")
const path = require('path');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const router = require('./routes/web')
app.use(cors())


//***   Load environment variables from .env file  ********//
dotenv.config();

// **************  Create Express Application  *****************//


// **************  Set up View Engine (EJS)  *****************//
app.set('view engine','ejs')
app.set('views', path.join(__dirname, 'views'))


// ************  Connect to the database  **************//
// const coonectMySQL = require('./app/database/db')

// ***************  setup static assets  *****************//
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));
app.use(bodyParser.urlencoded({ extended: true }));


// ***************  setup middleware  *****************//
app.use(express.urlencoded({extended:false}))
app.use(express.json())


// app.get('/',(req,resp)=>{
//     resp.render('home')
// })
// ***********  Use the defined routes **********//
app.use(router);

//*************  Start the server  *****************//
const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`My server start on this port ${PORT}`)
})