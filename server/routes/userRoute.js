import express from "express";

import {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from "../controller/userController.js";

const router = express.Router();


router.post("/create", createEmployee);
router.get("/getall", getAllEmployees);
router.get("/getone/:id", getEmployeeById);
router.put("/update/:id", updateEmployee);
router.delete("/delete/:id", deleteEmployee);

export default router;
