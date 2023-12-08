const express = require('express');
const router = express.Router();
// const { createJob, singleJob, updateJob, showJobs } = require('../controllers/jobsController');
const { isAuthenticated } = require('../middleware/auth');
const { createHelpline, singleHelpline, updateHelpline, showHelplines,deleteHelpline } = require('../controllers/helplineController');



//helplines routes

// /api/helpline/create
router.post('/helpline/create', isAuthenticated,  createHelpline);
// /api/helpline/id
router.get('/helpline/:id', singleHelpline);
// /api/helpline/update/helpline_id
router.put('/helpline/update/:helpline_id', isAuthenticated, updateHelpline);
// // /api/helplines/show
router.get('/helplines/show', showHelplines);
// DELETE /api/helplines/:id
router.delete('/admin/helpline/delete/:id', deleteHelpline);


module.exports = router;