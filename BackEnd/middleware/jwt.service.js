const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const generateAccessToken = (Email, usertype) => {
  // token will be expired within 2 hours
  const token = jwt.sign(
    {
      Email: Email,
      usertype: usertype
    },
    process.env.TOKEN_SECRET,
    { expiresIn: 2 * 60 * 60 } // 2 hours in seconds
  );
  return token;
};

const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    // Handle the case where the Authorization header is missing
    if (token == null) {
      return res.status(401).json({ message: 'Unauthorized: Token is Missing, Please Login Again' });
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) {
        console.log(err);
        return res.status(403).json({ message: 'Forbidden: Invalid Token' });
      }

      const userType = user.usertype;
      // Check the user type here
      if (userType !== 'admin' && userType !== 'user') {
        return res.status(401).json({ message: 'Unauthorized: UserType Mismatch' });
      }

      req.user = user;
      req.userType = userType;

      next();
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { generateAccessToken, authenticateToken };
