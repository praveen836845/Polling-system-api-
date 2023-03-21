const express = require('express');
const router = express.Router();
console.log('Router_loaded');
router.get('/' , (req,res) => {
    console.log("hello world");
    res.status(200).send("<h1>Getting all question by localhost:8000/api/questions </h1>")
})
router.use('/api', require('./api'));
module.exports = router;
