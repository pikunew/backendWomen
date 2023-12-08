
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;


const issueTypeSchema = new mongoose.Schema({

    issueTypeName: {
        type: String,
        trim: true,
        required: [true, 'Issue category is required'],
        
    },

    user: {
        type: ObjectId,
        ref: "User",
        required: true
    },



}, { timestamps: true })

module.exports = mongoose.model("IssueType", issueTypeSchema);