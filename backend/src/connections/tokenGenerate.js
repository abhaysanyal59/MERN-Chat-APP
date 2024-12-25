const jwt = require("jsonwebtoken");

const generateToken = (userId,response) => {
    const token = jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"7d"}) // jwt.sign creates a token
response.cookie("jwt",token,
    {
        maxAge: 7*24*60*60*1000, // 7 days in milliseconds
        httpOnly:true , // only acccessible to the browser
        sameSite:"strict",
        secure:process.env.NODE_ENV !== "development"
    }
)
return token;
}

module.exports = generateToken;
