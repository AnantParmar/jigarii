const express = require('express');
const router = express.Router();

router.get('/notification', (req,res)=>{
    obj = {
        a: "thhios",
        number: 38
    }
    res.json(obj);
})

module.exports = router;