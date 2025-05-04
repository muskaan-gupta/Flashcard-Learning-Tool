import { ApiError } from "../utils/Apierror.js";
import { asynchandler } from "../utils/asynchandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const verifiedJWT = asynchandler(async (req, _, next) => {
  try {
   

    const aToken =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    console.log("The token is:", aToken);

    if (!aToken) throw new ApiError(401, "Unauthorized Access: Token not provided");

    const decodedToken = jwt.verify(aToken, process.env.ACCESS_TOKEN_SECRET);
    console.log("Decoded Token:", decodedToken);

    const currentUser = await User.findById(decodedToken._id).select("-password");
    

    if (!currentUser) throw new ApiError(401, "Invalid Access Token");

    req.user = currentUser;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new ApiError(401, "Access token has expired");
    }
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});

export { verifiedJWT };