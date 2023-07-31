 const express = require('express');
//  const cors = require('cors')
 const app = express();
 const port = 5000;
 const bodyParser = require('body-parser');
 app.use(bodyParser.urlencoded({ extended: false }))
//  app.use(cors())
 app.use('/profile', express.static('upload/img'));
 app.get('/', (req, res)=>{
   
   res.send("Home");
 })

 // available routes
 app.use('/api/auth', require('./routes/auth'));
 app.use('/api/quote', require('./routes/quote'));
 app.listen(port, ()=> {
    console.log("running");
 })