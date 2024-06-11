const { Response } = require('express');
const { RESPONSE_STATUS_CODES } = require('./common-status-codes');

function successResponse(message, DATA, res) {
  res.status(RESPONSE_STATUS_CODES.SUCCESS).json({
    STATUS: 'SUCCESS',
    MESSAGE: message,
    SUCCESS: true,
    DATA: DATA,
  });
}

function failureResponse(message, res) {
  res.status(RESPONSE_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
    STATUS: 'FAILURE',
    MESSAGE: message,
  });
}

function insufficientParameters(res,parameter) {
  res.status(RESPONSE_STATUS_CODES.BAD_REQUEST).json({
    STATUS: 'FAILURE',
    MESSAGE: 'Insufficient parameters',
    PARAMETER: parameter,
    DATA: {},
  });
}

function duplicateDocuments(res) {
  res.status(RESPONSE_STATUS_CODES.DUPLICATE).json({
    STATUS: 'FAILURE',
    MESSAGE: 'Duplicate Documents',
    SUCCESS: false,
    DATA: {},
  });
}

function mongoError(err, res) {
  res.status(RESPONSE_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
    STATUS: 'FAILURE',
    MESSAGE: 'MongoDB error',
    DATA: err,
  });
}

function notfoundDocument(res) {
  res.status(RESPONSE_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
    STATUS: 'FAILURE',
    MESSAGE: 'Not Data Found',
    SUCCESS: false,
  });
}

function forbiddenError(res, message) {
  res.status(RESPONSE_STATUS_CODES.FORBIDDEN).json({
    STATUS: 'FORBIDDEN',
    MESSAGE: message,
    SUCCESS: false,
  });
}

module.exports = { 
  successResponse, 
  failureResponse, 
  insufficientParameters, 
  duplicateDocuments, 
  mongoError, 
  notfoundDocument, 
  forbiddenError 
};
