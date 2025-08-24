import jwt from "jsonwebtoken";
import { secretKey } from "../configuration/jwtConfig.js";

function generateToken(admin) {
  const payload = {
    id: admin._id,
    email: admin.email,
  };

  return jwt.sign(payload, secretKey, { expiresIn: "1h" });
}

export { generateToken };
