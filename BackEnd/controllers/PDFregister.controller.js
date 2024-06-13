const fs = require("fs");
const path = require("path");
const {
  insufficientParameters,
  successResponse,
  failureResponse,
  forbiddenError,
} = require("../constants/common-response-service");
const PDFRegister = require("../models/PDFRegister");
const { fileSizeFormatter } = require("../helpers/FileSizeFormatter.helper");
const { encryptFile, decryptFile } = require("../helpers/Encrypt.helper");

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
    const encryptedPath = `${req.file.path}.enc`;

    await encryptFile(req.file.path, encryptedPath);

    let file = new PDFRegister({
      OwnerEmail: user.Email,
      FileName: req.file.originalname,
      FilePath: encryptedPath,
      FileSize: fileSizeFormatter(req.file.size, 2),
    });

    await file.save();

    // Remove the original unencrypted file
    fs.unlinkSync(req.file.path);

    return successResponse("File uploaded and encrypted successfully", "", res);
  } catch (error) {
    console.log(error);
    return failureResponse("Something went wrong", res);
  }
};


const getFile = async (req, res) => {
  try {
    const fileId = req.params.id;
    const fileRecord = await PDFRegister.findById(fileId);

    if (!fileRecord) {
      return res.status(404).send("File not found");
    }

    const decryptedPath = path.join(
      __dirname,
      "..",
      "uploads",
      `decrypted-${fileRecord.FileName}`
    );
    await decryptFile(fileRecord.FilePath, decryptedPath);

    res.download(decryptedPath, fileRecord.FileName, (err) => {
      if (err) {
        console.error("Error downloading the file:", err);
      }

      // Clean up the decrypted file after download
      fs.unlinkSync(decryptedPath);
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

const getAllFilesByEmail = async (req, res) => {
  try {
    const user = req.user;
    const Files = await PDFRegister.find({ OwnerEmail: user.Email });

    return successResponse("All the Files", Files, res);
  } catch (error) {
    console.log(error);
    return failureResponse("Something went wrong", error);
  }
};

const getAllFiles = async (req, res) => {
  const userType = req.userType;
  if (!(userType == "Admin")) {
    return forbiddenError(res, "Not Authorized");
  }
  try {
    const Files = await PDFRegister.find();
    return successResponse("All the Files", Files, res);
  } catch (error) {
    console.log(error);
    return failureResponse("Something went wrong", error);
  }
};

module.exports = {
  singleFileUpload,
  getFile,
  getAllFilesByEmail,
  getAllFiles,
};
