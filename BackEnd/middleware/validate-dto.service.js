const { RESPONSE_STATUS_CODES } = require('../constants/common-status-codes');

function validateDto(ajvValidate) {
    return (req, res, next) => {
      const valid = ajvValidate(req.body);
      if (!valid) {
        const error = ajvValidate.errors;
        return res.status(RESPONSE_STATUS_CODES.BAD_REQUEST).json(error);
      }
      next();
    }
  }
  
  module.exports = validateDto;
  