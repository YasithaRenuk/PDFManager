const { insufficientParameters, failureResponse, duplicateDocuments, forbiddenError, successResponse, mongoError, notfoundDocument } = require("../constants/common-response-service");
const { hashPassword, comparePassword } = require("../middleware/encryption.service");
const { generateAccessToken } = require("../middleware/jwt.service");
const User = require("../models/auth/User");

const test = (req, res) => {
  return res.json('auth Route test is working');
}

// Register endpoint
const registerUser = async (req, res) => {
  try {
    const { Name, Email,usertype,Password } = req.body;

    if (!Password || Password.length < 6) {
      return insufficientParameters(res,"Password is required and should be at least 6 characters long");
    }

    const alreadyExist = await User.findOne({ Email });
    if (alreadyExist) {
      return duplicateDocuments(res);
    }

    const hashedPassword = await hashPassword(Password);

    const user = await User.create({
      Name,
      Email,
      usertype,
      Password: hashedPassword
    });

    return successResponse("Registered Admin", user, res);
  } catch (error) {
    console.log(error);
    return failureResponse("Something went wrong", res);
  }
}

// Login endpoint
const loginUser = async (req, res) => {
  try {
    const { Email, Password } = req.body;

    const user = await User.findOne({ Email });
    if (!user) {
      return notfoundDocument(res);
    }

    const match = await comparePassword(Password, user.Password);
    if (match) {
      const generateToken = await generateAccessToken(user.Email,user.usertype);
  
      if (!generateToken) {
        return failureResponse('Something went wrong with token generating', res);
      } else {
        return successResponse('Successfully Login', { token: generateToken, Email: user.Email,usertype:user.usertype }, res);
      }
    } else {
      return forbiddenError(res, "Password Not Match");
    }
  } catch (error) {
    console.log(error);
    return failureResponse("An error occurred", res);
  }
}

module.exports = {
  test,
  registerUser,
  loginUser
}
