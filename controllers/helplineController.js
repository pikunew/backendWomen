const Helpline = require('../models/helplineModel');
const IssueType = require('../models/issueTypeModel');
const ErrorResponse = require('../utils/errorResponse');

//create helpline
exports.createHelpline = async (req, res, next) => {
    try {
        const helpline = await Helpline.create({
           
            user: req.user.id,
            stt: req.body.stt,
            issue: req.body.issue,
            agen: req.body.agen,
            uid: req.body.uid,
            map: req.body.map,
            num: req.body.num,
            sup: req.body.sup,
            des: req.body.des,
            lan: req.body.lan,
        });
        res.status(201).json({
            success: true,
            helpline
        })
    } catch (error) {
        next(error);
    }
}


//single helpline
exports.singleHelpline = async (req, res, next) => {
    try {
        const helpline = await Helpline.findById(req.params.id);
        res.status(200).json({
            success: true,
            helpline
        })
    } catch (error) {
        next(error);
    }
}


//update helpline by id.

exports.updateHelpline = async (req, res, next) => {
    try {
        const helpline = await Helpline.findByIdAndUpdate(req.params.helpline_id, req.body, { new: true }).populate('issueType', 'issueTypeName').populate('user', 'firstName lastName');
        res.status(200).json({
            success: true,
            helpline
        })
    } catch (error) {
        next(error);
    }
}



exports.showHelplines = async (req, res, next) => {
    try {
      // Filter parameters
      const keyword = req.query.keyword;
      const cat = req.query.cat;
      const location = req.query.location;
      const uid = req.query.uid;
  
      

      // modification done from here  till line number 148
      // Replace spaces with a regex that matches spaces or other common separators
      const sanitizedKeyword = keyword ? keyword.replace(/[\s,]+/g, "|") : '';

      // Build filter conditions based on query parameters
      const filter = {};

      if (sanitizedKeyword) {
          filter.issue = {
              $regex: sanitizedKeyword,
              $options: 'i',
          };
      }
  
      if (cat) {
        filter.issueType = cat;
      }
  
      if (location) {
        filter.map = location;
      }

      if (uid) {
        filter.uid = {
            $regex: uid,
            $options: 'i',
        };
    }
  // Modification ends



      // Pagination
      const pageSize = 9;
      const page = Number(req.query.pageNumber) || 1;
  
      const count = await Helpline.countDocuments(filter);
      const helplines = await Helpline.find(filter)
        .skip(pageSize * (page - 1))
        .limit(pageSize);
  
      // Get unique locations
      const uniqueLocations = await Helpline.distinct('map');
  
      res.status(200).json({
        success: true,
        helplines,
        page,
        pages: Math.ceil(count / pageSize),
        count,
        setUniqueLocation: uniqueLocations,
      });
    } catch (error) {
      next(error);
    }
  };
  

  // Delete helpline by ID
  exports.deleteHelpline = async (req, res, next) => {
    try {
      const helpline = await Helpline.findByIdAndRemove(req.params.id);
  
      if (!helpline) {
        return next(new ErrorResponse('Helpline not found', 404));
      }
  
      res.status(200).json({
        success: true,
        message: 'Helpline deleted successfully',
      });
      next();
    } catch (error) {
      return next(error);
  }
  };

  








