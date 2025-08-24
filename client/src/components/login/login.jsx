import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok && result.token) {
        localStorage.setItem("token", result.token);
        navigate("/users"); // Admin CRUD page
      } else {
        alert(result.message || "Invalid Admin Credentials ❌");
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setFormData({ email: "", password: "" });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
      <form
        className="bg-white p-8 rounded-3xl shadow-2xl w-96 border border-gray-200 transform transition duration-500 hover:scale-[1.02]"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
          Admin Login 🔐
        </h2>

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          className="w-full mb-4 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-200"
          value={formData.email}
          onChange={handleInputChange}
          required
        />

        {/* Password */}
        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-200"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <span
            className="absolute right-4 top-3 cursor-pointer text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:opacity-90 hover:shadow-xl transform hover:-translate-y-0.5 transition duration-300"
        >
          🔑 Login
        </button>
      </form>
    </div>
  );
};

export default Login;
