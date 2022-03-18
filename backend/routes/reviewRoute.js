const express = require('express');
const router = express.Router();
const multer = require('multer')
const protectedRoute = require('../middleware/protectedRoute')

const reviewController = require('../controllers/reviewController')

const storage = multer.memoryStorage({destination: (req,file,callback) => {callback(null,"")}})
const upload = multer({storage}).single('image')

router.get('/all', reviewController.getAllReviews)

router.get('/:id', reviewController.getReview)

router.get('/', reviewController.searchReview)

router.get('/filter/note', reviewController.filterReviewsByNote)

router.post('/', protectedRoute, reviewController.postReview)

router.put('/:id',protectedRoute, reviewController.putReview)

router.post('/cover', upload, reviewController.uploadBookCover)

router.post('/like/:id', protectedRoute, reviewController.likeReview)



module.exports = router