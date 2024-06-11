const {insufficientParameters,failureResponse,duplicateDocuments,forbiddenError,successResponse,mongoError,notfoundDocument} = require("../constants/common-response-service");
const {hashPassword,comparePassword} = require("../middleware/encryption.service")
const {generateAccessToken,jwtcheker} = require("../middleware/jwt.service")
const User = require("../models/auth/User")

const test = (req,res)=>{
    return res.json('auth Route test is working')
}

// reg endpoint
const registerUser = async(req,res)=>{
    try{
        const {Name,Email,Password} = req.body;
        
        //check if name was enterd
        if(!Name){
            return insufficientParameters(res,"Name")
        }

        //check if usertype was enterd
        if(!Email){
            return insufficientParameters(res,"Email")
        }

        //check if Password is good
        if(!Password|| Password.length < 6){
            return failureResponse("Password is required and shoud be at least 6 characters loang",res)
        }

        //check the ID
        const alreadyExist = await User.findOne({ Email });
        if (alreadyExist) {
            return duplicateDocuments(res);
        } 
        const hashedPassword = await hashPassword(Password);

        //create user
        const user = await User.create({
            Name,
            Email,
            Password: hashedPassword
        })
        return successResponse("Registered Admin", user, res);
        

    }catch(error){
        console.log(error)
        return failureResponse("somthin went wrong",error)
    }
}

//login endpoint
const loginUser = async(req,res)=>{
    try{
        const {Email,Password} = req.body;

        //check if user exit
        const user = await User.findOne({Email});
        if(!user){
            return notfoundDocument(res) 
        }

        //check if Password match
        const match = await comparePassword(Password,user.Password)
        if(match){
            const generateToken = await generateAccessToken(
                user.Email
              );
    
              if (!generateToken) {
                return failureResponse(
                  'Something went wrong with token generating',
                  res
                );
              } else {
                successResponse(
                  'Successfully Login',
                  { token: generateToken,
                    Email:user.Email},
                  res
                );
              }
        }
        if(!match){
            return forbiddenError(res,"Password Not Match")
        }
    }catch(error){
        console.log(error)
    }
}


module.exports={
    test,
    registerUser,
    loginUser
}