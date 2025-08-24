import express from "express";
import cors from "cors";
import { login } from "../controller/adminController.js";

const router = express.Router();

router.use(cors());

router.post("/login", login);

export default router;
