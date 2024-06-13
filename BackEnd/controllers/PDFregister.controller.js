const {
  insufficientParameters,
  successResponse,
  failureResponse,
  forbiddenError
} = require("../constants/common-response-service");
const PDFRegister = require("../models/PDFRegister");
const { fileSizeFormatter } = require("../helpers/FileSizeFormatter.helper");

const singleFileUpload = async (req, res) => {
  try {
    if (!req.file) {
      return insufficientParameters(res, "No file uploaded File Not Found");
    }

    // Check if the file is not a PDF
    if (req.file.mimetype !== "application/pdf") {
      return insufficientParameters(res, "Only PDF files are allowed");
    }
    const user = req.user;

    let file = new PDFRegister({
      OwnerEmail: user.Email,
      FileName: req.file.originalname,
      FilePath: req.file.path,
      FileSize: fileSizeFormatter(req.file.size, 2),
    });

    await file.save();
    return successResponse("File uploaded successfully", "", res);
  } catch (error) {
    console.log(error);
    return failureResponse("Something went wrong", res);
  }
};

const getAllFilesByEmail = async(req,res)=>{
    try {

        const user = req.user;
        
        const Files = await PDFRegister.find({OwnerEmail:user.Email});
    
        return successResponse("All the Files",Files,res);
    
      }catch (error) {
        console.log(error);
        return failureResponse("Something went wrong", error);
      }
}

const getAllFiles = async(req,res)=>{
    
    const userType =  req.userType
    if(!(userType == "Admin")){
        return forbiddenError(res,"Not Authorized")
    }
    try {

        const Files = await PDFRegister.find();
    
        return successResponse("All the Files",Files,res);
    
      }catch (error) {
        console.log(error);
        return failureResponse("Something went wrong", error);
      }

}

module.exports = {
  singleFileUpload,
  getAllFilesByEmail,
  getAllFiles
};
