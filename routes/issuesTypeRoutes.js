const express = require('express');
const router = express.Router();
// const { createJobType, allJobsType, updateJobType, deleteJobType } = require('../controllers/jobsTypeController');
const { createIssueType,allIssuesType,updateIssueType,deleteIssueType } = require('../controllers/issueTypeController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');



//Issue type routes

// /api/type/create
router.post('/type/create', isAuthenticated, isAdmin, createIssueType)
// /api/type/issues
router.get('/type/issues', allIssuesType)
// /api/type/update/type_id
router.put('/type/update/:type_id', isAuthenticated, isAdmin, updateIssueType)
// /api/type/delete/type_id
router.delete('/type/delete/:type_id', isAuthenticated, isAdmin, deleteIssueType  )








module.exports = router;