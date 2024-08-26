// Nathaniel Low P2323428 DIT/FT/1B/05

//////////////////////////////////////////////////////
// REQUIRE DOTENV MODULE
//////////////////////////////////////////////////////
require("dotenv").config();

//////////////////////////////////////////////////////
// REQUIRE JWT MODULE
//////////////////////////////////////////////////////
const jwt = require("jsonwebtoken");

//////////////////////////////////////////////////////
// SET JWT CONFIGURATION
//////////////////////////////////////////////////////
const secretKey = process.env.JWT_SECRET_KEY;
const tokenDuration = process.env.JWT_EXPIRES_IN;
const tokenAlgorithm = process.env.JWT_ALGORITHM;

//////////////////////////////////////////////////////
// MIDDLEWARE FUNCTION FOR GENERATING JWT TOKEN
//////////////////////////////////////////////////////
module.exports.generateToken = (req, res, next) => 
{
    const payload = {
        userId: res.locals.userId,
        timestamp: new Date()
    };
  
    const options = {
        algorithm: tokenAlgorithm,
        expiresIn: tokenDuration,
    };
      
    const callback = (err, token) => {
        if (err) {
            console.error("Error jwt:", err);
            res.status(500).json(err);
        } else {
            res.locals.token = token;
            next();
        }
    };

    const token = jwt.sign(payload, secretKey, options, callback);
};

//////////////////////////////////////////////////////
// MIDDLEWARE FUNCTION FOR SENDING JWT TOKEN
//////////////////////////////////////////////////////
module.exports.sendToken = (req, res, next) => 
{
    res.status(200).json({
        message: res.locals.message,
        token: res.locals.token,
        user_id: res.locals.user_id
    });
};

//////////////////////////////////////////////////////
// MIDDLEWARE FUNCTION FOR VERIFYING JWT TOKEN
//////////////////////////////////////////////////////

// This function verifies the JWT token sent in the request headers.
module.exports.verifyToken = (req, res, next) => 
{
    const authHeader = req.headers.authorization;

    // Check if the token exists, and if not, return a 401 error response.
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No token provided' });
    }
    // Get the token from the Authorization header and remove the "Bearer " prefix.
    const token = authHeader.replace('Bearer ', '');
    // const token = authHeader.split(" ")[1];
    // const token = authHeader.substring(7);
  
    if (!token) {
        return res.status(401).json({ error: "No token provided" });
    }
  
    // decoded basically acts as results
    const callback = (err, decoded) => {
        if (err) {
            // If there is an error, handle it by returning a 401 error response.
            return res.status(401).json({ error: "Invalid token" });
        }
        // If there are no errors, store the decoded userId and timestamp in 
        // res.locals and move to the next middleware or route handler.

        res.locals.userId = decoded.userId;
        res.locals.tokenTimestamp = decoded.timestamp;
    
        next();
    };
    // Use the jwt.verify() method to verify the token with the secret key and handle the callback.
    jwt.verify(token, secretKey, callback);
};
