const express = require('express');
const router = express.Router();

const optionsApi = require('../../controllers/api/options-api');

router.post('/:id/addVote', optionsApi.addVote);
router.delete('/:id/delete', optionsApi.deleteOption);

module.exports = router;