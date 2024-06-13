const { Response } = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const generateAccessToken = (userID,usertype) => {
  // token will be expired within 2hrs
  const token = jwt.sign(
    {
      id: userID,
      usertype : usertype
    },
    process.env.TOKEN_SECRET,
    { expiresIn: 60 * 60 }
  );
  return token;
};

const authenticateToken = (req, res, next) => {
  try{
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    // Handle the case where the Authorization header is missing
    if (token == null) return  res.status(401).json({ message: 'Unauthorized: Token is Missing, Please Login Again' });

    jwt.verify(
      token,
      process.env.TOKEN_SECRET,
      (err, user) => {
        console.log(err);
        
        if (err) return res.sendStatus(403);

        const userType = user.usertype;
        
        //Check the user type here
        if (userType == 'admin' || userType == 'faculty' || userType == 'student') {
          return res.sendStatus(403);
        }

        req.user = user;
        req.userType = userType

        next();
      }
    );
    
  }catch(error){
    console.log(error)
  }
};

module.exports = { generateAccessToken, authenticateToken };
