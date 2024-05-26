import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

const requireAuth = (req, res, next) => {
  // const token = createToken(user._id);
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  // console.log("Authorization", authorization);

  const bearerToken = authorization.split(" ");
  if (bearerToken.length !== 2) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  // console.log("Token", bearerToken[1]);
  jwt.verify(bearerToken[1], JWT_SECRET, (err, decodedToken) => {
    if (err) {
      console.log(err);
    } else {
      console.log(decodedToken);
      next();
    }
  });
};

export default requireAuth;
