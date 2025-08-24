// services/login.js
import bcrypt from "bcrypt";
import User from "../model/adminModel.js";
import { generateToken } from "../utils/jwtUtils.js";

export async function login(email, password) {
  const existingAdmin = await User.findOne({ email });
  if (!existingAdmin) throw new Error("User not found");

  const isPasswordValid = await bcrypt.compare(password, existingAdmin.password);
  if (!isPasswordValid) throw new Error("Incorrect password");

  return generateToken(existingAdmin);
}
