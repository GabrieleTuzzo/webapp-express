const express = require('express');
const movieController = require('../controllers/movieController');
const router = express.Router();

// CRUD requests
router.get('/', movieController.index);

router.get('/:id', movieController.show);

router.post('/:id/review', movieController.storeReview);

module.exports = router;
