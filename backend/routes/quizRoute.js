const express = require('express');
const router = express.Router();
const quizController = require('../contollers/quizController');

router.get("/quizzes",  quizController.getAllRecords);
router.get("/quizzes/add",  quizController.addForm);
router.post("/quizzes/create",  quizController.createRecord);
router.get("/quizzes/edit/:id",  quizController.editForm);
router.post("/quizzes/update/:id",  quizController.updateRecord);
router.get("/quizzes/delete/:id",  quizController.deleteRecord);
router.get("/quizzes/view/:id", quizController.showDetails); // or whatever path you're using

router.get('/course/:slug', quizController.getQuizzesByCourseSlug);
module.exports = router;
