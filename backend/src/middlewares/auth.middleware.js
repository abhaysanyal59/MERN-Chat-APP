const jwt = require("jsonwebtoken");
const userModel = require("../models/user.models.js");

const protectRoute = async (request, response, next) => {
  try {
    const token = request.cookies.jwt;
    console.log("Request Cookies:",request.cookies);
    if (!token) {
      return response
        .status(401)
        .json({ message: "Unauthorized Access - No Token" });
    }
  
  const decodedToken = await jwt.verify(token,process.env.JWT_SECRET)
if(!decodedToken) {
    return response.status(401).json({message:"Unauthorized Access - Invalid Token"})
}
const user  = await userModel.findById(decodedToken.userId).select("-password")
if(!user) {
    return response.status(404).json({message:"User Not Found"})
}
request.user = user;
next();

}
catch (error) {
    console.log("Error Occured Here",error.message);
  }
}
module.exports = protectRoute;

