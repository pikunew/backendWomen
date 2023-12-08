const IssueType = require('../models/issueTypeModel');
const ErrorResponse = require('../utils/errorResponse');

//create issue type category
exports.createIssueType = async (req, res, next) => {
    try {
        const issueT = await IssueType.create({
            issueTypeName: req.body.issueTypeName,
            user: req.user.id
        });
        res.status(201).json({
            success: true,
            issueT
        })
    } catch (error) {
        next(error);
    }
}


//all issues category
exports.allIssuesType = async (req, res, next) => {
    try {
        const issueT = await IssueType.find();
        res.status(200).json({
            success: true,
            issueT
        })
    } catch (error) {
        next(error);
    }
}

//update issue type
exports.updateIssueType = async (req, res, next) => {
    try {
        const issueT = await IssueType.findByIdAndUpdate(req.params.type_id, req.body, { new: true });
        res.status(200).json({
            success: true,
            issueT
        })
    } catch (error) {
        next(error);
    }
}


//delete issue type
exports.deleteIssueType = async (req, res, next) => {
    try {
        const issueT = await IssueType.findByIdAndRemove(req.params.type_id);
        res.status(200).json({
            success: true,
            message: "Issue type deleted"
        })
    } catch (error) {
        next(new ErrorResponse("server error", 500));
    }
}












