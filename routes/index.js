const express = require("express");
const router = express.Router();
<<<<<<< HEAD
console.log("Router_loaded");
router.get("/", (req, res) => {
  // console.log("hello world");
  res
    .status(200)
    .send("<h1>Getting all question by localhost:8000/api/questions </h1>");
});
router.use("/api", require("./api"));
=======
console.log('Router_loaded');
router.get('/' , (req,res) => {
    console.log("hello world");
    res.status(200).send("<h1>Getting all question by localhost:8000/api/questions </h1>")
})
router.use('/api', require('./api'));
>>>>>>> 9f644c7b73a99f367177776282e8acab70d0af38
module.exports = router;
