const express = require('express');
const router = express.Router();

const questionsApi = require('../../controllers/api/questions-api');

router.get('/' , questionsApi.viewAllQuestions )

router.post('/create', questionsApi.createQuestion);
router.post('/:id/options/create', questionsApi.createOption);
router.delete('/:id/delete', questionsApi.deleteQuestion);
router.get('/:id', questionsApi.viewQuestion);


module.exports = router;