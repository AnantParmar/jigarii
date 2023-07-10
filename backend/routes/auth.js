const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {signInWithEmailAndPassword,createUserWithEmailAndPassword,updateProfile,sendEmailVerification} = require('firebase/auth')
const {setDoc,collection,doc,add} = require('firebase/firestore');
const { ref, getDownloadURL, uploadBytesResumable } = require('firebase/storage');
const {auth,storage,db} = require('../config.js')
const bodyParser = require('body-parser');

// storage engine 

// const mulStorage = multer.diskStorage({
//     destination: './upload/img',
//     filename: (req, file, cb) => {
//         return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
//     }
// })

const upload = multer({
    storage: multer.memoryStorage()
})

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
// router.use(bodyParser.);

router.post('/uploadPic',upload.single("profile"), async (req,res)=>{

    try {
        const dateTime = giveCurrentDateTime();
        const storageRef = ref(storage, `file/${req.file.originalname+" "+dateTime}`);
        
        const metadata = {
            contentType : req.file.mimetype,
        }

        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
        const downloadURL  = await getDownloadURL(snapshot.ref); 
        console.log('File successfully uploaded.');
        
        updateProfile(auth.currentUser, {
            photoURL: downloadURL
        })
        await setDoc(doc(db, "users", auth.currentUser.uid), {
            photoURL: downloadURL
        }, { merge: true });
        return res.send({
            message : 'file uploaded to firebase storage',
            name: req.file.originalname,
            type: req.file.mimetype,
            downloadURL: downloadURL
        })
    }
    catch (error){
        return res.status(400).send(error.message)
    }
    
})

const giveCurrentDateTime = () => {
    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDay();
    const time = today.getHours()+':'+today.getMinutes()+':'+today.getSeconds();
    const dateTime = date+ " " + time;
    return dateTime;
}
router.post('/signup', async (req,res)=>{
    // console.log(req.body)

    await createUserWithEmailAndPassword(auth,req.body.email,req.body.password)
    .then(async (response) => {
        // console.log(response)
        // console.log(resJson.uid)
        const user = response.user;

        updateProfile(user, {
            displayName: req.body.name,
        })
        
        sendEmailVerification(auth.currentUser)
        .then(() => {
            console.log("verfication email sent")
        })
        .catch((error)=> {
            console.log(error.message);
        })
        await setDoc(doc(db, "users", user.uid), {
            name: req.body.name,
            email: req.body.email
        });
                        
        res.send(user)
    })
    .catch((error)=>{
        res.send(error)
    })
})
                
router.post('/login', async (req, res)=>{
    // console.log(req.body);
    const email = req.body.username;
    const password = req.body.password;
    
    signInWithEmailAndPassword(auth, email, password)
    .then(async (response) => {
        
        if(!response.user.emailVerified) {
            return res.send({result :false ,msg:"The email is not verified yet."})
        }
        else {
            return res.send({result:true,data:response});
        }
    })
    .catch((error) => {
        console.log(error)
        return res.send({result :false ,msg: error.code});
    });
    
})

router.post('/getUser', async (req,res)=>{
    res.send(auth.currentUser)
})
module.exports = router;