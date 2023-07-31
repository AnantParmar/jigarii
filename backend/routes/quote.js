const express = require('express');
const router = express.Router();
const { doc,addDoc,collection, query, getDocs, getDoc, setDoc, where, deleteDoc } = require('firebase/firestore');
// const {getUser} = require()
const {db} = require('../config.js')
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/addQuote', async (req,res) => {
    // console.log(req.body)
    const docId  = await addDoc(collection(db, "quotes"), {
        tag: req.body.quoteTag,
        quote: req.body.quote,
        uid: req.body.uid,
        like: 0
    });
    res.send({result: "Success", docId: docId})
})
const getQuote = async (docId)=>{
    const docRef = doc(db, "quotes", docId);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
}
router.put('/updateLikeCount', async (req,res) => {
    console.log(req.body)
    const data = await getQuote(req.body.docId);
    console.log(data)
    if(req.body.val>0) {
        const docId  = await addDoc(collection(db, "likedByUser"), {
            quote: req.body.docId,
            user: req.body.uid
        });
    } else {
        const q1 = query(collection(db, "likedByUser"), where("quote", "==", req.body.docId), where("user", "==", req.body.uid));
        console.log(q1);
        const quote = await getDocs(q1);
        for (let index = 0; index < quote.docs.length; index++) {
            const docd = quote.docs[index];
            const docData = docd.data()
            // console.log(doc)
            // console.log(docData)
            const docu = doc(db, "likedByUser", docd.id);
            await deleteDoc(docu);
        }// await deleteDoc(q1);

    }
    const updateValue = data.like + req.body.val;
    const docRef = doc(db, "quotes", req.body.docId);
    setDoc(docRef, {like: updateValue}, {merge: true})
    .then(()=>{
        res.send({result: "Success"})
    })
    .catch((error)=>{
        res.send({error: error})
    })
})
const getUserProfile = async (uid)=> {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
}
const getQuotes = async (querySnapshot)=>{
    const responseArr = []
    // console.log(" khfkjdfb")
    for (let index = 0; index < querySnapshot.docs.length; index++) {
        const doc = querySnapshot.docs[index];
        const docData = doc.data()
        // console.log(await getUserProfile(docData.uid))
        const res = await getUserProfile(docData.uid)
        // console.log(res)
        // console.log("kh bmfbhd")

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
    // console.log()
    getQuotes(querySnapshot)
    .then((responseArr)=>{
        res.json(responseArr)
    })

})

module.exports = router;