const express = require('express');
const router = express.Router();
const { doc,addDoc,collection, query, getDocs, getDoc } = require('firebase/firestore');
// const {getUser} = require()
const {db} = require('../config.js')
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/addQuote', async (req,res) => {
    console.log(req.body)
    const docId  = await addDoc(collection(db, "quotes"), {
        tag: req.body.quoteTag,
        quote: req.body.quote,
        uid: req.body.uid

    });
    res.send({result: "Success", docId: docId})
})
const getUserProfile = async (uid)=> {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
}
const getQuotes = async (querySnapshot)=>{
    const responseArr = []
    console.log(" khfkjdfb")
    for (let index = 0; index < querySnapshot.docs.length; index++) {
        const doc = querySnapshot.docs[index];
        const docData = doc.data()
        // console.log(await getUserProfile(docData.uid))
        const res = await getUserProfile(docData.uid)
        console.log(res)
        console.log("kh bmfbhd")

        var obj = {docId: doc.id, docData: doc.data(), user: res}
        responseArr.push(obj)
            // console.log(doc.id, " => ", doc.data());
        
    }
    // querySnapshot.forEach( async (doc) => {
    //     // doc.data() is never undefined for query doc snapshots
    //     const docData = doc.data()
    //     // console.log(await getUserProfile(docData.uid))
    //     const res = await getUserProfile(docData.uid)
    //     var obj = {docId: doc.id, docData: doc.data()}
    //         responseArr.push(obj)
    //         // console.log(doc.id, " => ", doc.data());
    //     })
        
        return responseArr;
}
router.get('/getQuotes', async (req,res) => {
    // console.log(req.body)
    const q = query(collection(db, "quotes"));
    
    
    const querySnapshot = await getDocs(collection(db, "quotes"));
    console.log()
    getQuotes(querySnapshot)
    .then((responseArr)=>{
        res.json(responseArr)
    })

})

module.exports = router;