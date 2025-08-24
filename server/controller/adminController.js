
import { login as authServiceLogin } from "../service/login.js";

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const token = await authServiceLogin(email, password);
    res.json({ token });
  } catch (error) {
    res.status(401).json({ message: error.message || "Invalid credentials" });
  }
}
