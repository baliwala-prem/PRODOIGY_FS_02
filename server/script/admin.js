import Admin from "../model/adminModel.js";
import bcrypt from "bcrypt";

async function createAdminAccount() {
  try {
    const existingAdmin = await Admin.findOne({ email: "admin@gmail.com" });

    if (!existingAdmin) {
      const newAdmin = new Admin({
        email: "admin@gmail.com",
        password: await bcrypt.hash("admin", 10)
        
      });

      await newAdmin.save();
      console.log("✅ Admin account created successfully");
    } else {
      console.log("ℹ️ Admin already exists");
    }
  } catch (error) {
    console.error("❌ Error creating admin:", error.message);
  }
}

export default createAdminAccount;
