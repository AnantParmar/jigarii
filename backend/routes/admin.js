
const {signInWithEmailAndPassword} = require('firebase/auth')
const {auth} = require('../config.js')
// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: false }))
// const {getAuth} = require('firebase/auth')
const express = require('express');
const router = express.Router();
const fs = require('fs')
const login = fs.readFileSync('./login.html')
const home = fs.readFileSync('./home.html')
const notificationForm = fs.readFileSync('./Notification_form.html')
router.get('/login', (req, res)=>{
    res.setHeader('Content-Type','text/html');
    res.send(login);

})
router.get('/notificationForm', (req, res)=>{
    res.setHeader('Content-Type','text/html');
    res.send(notificationForm);

})
router.post('/login', (req, res)=>{
    console.log(req.body);
    const email = req.body.email; 
    const password = req.body.password;
    // const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    // Signed in 
        res.setHeader('Content-Type','text/html');
        const user = userCredential.user;
        console.log(user)
        return res.send(home);
    // ...
    })
    .catch((error) => {
        console.log(error)
        res.send("Hey Buddy, You are not an admin. Don't Break your limit then I break your bones");
    });
    
    
})
router.get('/notificationAllData', (req, res)=>{
    // res.setHeader('Content-Type','text/html');
    const jsonData = {a:5,b:10};
    res.json(jsonData)
})


module.exports = router;