import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

const AddEmployee = () => {
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    title: "",
    salary: "",
    dateOfJoining: "",
    isActive: true,
  });

  const inputHandler = (e) => {
    const { name, value, type, checked } = e.target;
    setEmployee({ ...employee, [name]: type === "checkbox" ? checked : value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/create", employee);
      toast.success(response.data.msg || "Employee added successfully!", {
        position: "top-right",
      });
      navigate("/users");
    } catch (error) {
      toast.error("Failed to add employee");
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-100 via-blue-100 to-indigo-100">
      <form
        className="bg-white p-8 rounded-3xl shadow-2xl w-96 border border-gray-200 transform transition duration-500 hover:scale-[1.02]"
        onSubmit={submitForm}
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
          Add New Employee 👨‍💼
        </h2>

        {/* First Name */}
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={employee.firstName}
          onChange={inputHandler}
          className="w-full mb-4 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400"
          required
        />

        {/* Last Name */}
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={employee.lastName}
          onChange={inputHandler}
          className="w-full mb-4 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400"
          required
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={employee.email}
          onChange={inputHandler}
          className="w-full mb-4 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400"
          required
        />

        {/* Phone */}
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={employee.phone}
          onChange={inputHandler}
          className="w-full mb-4 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400"
          required
        />

        {/* Department */}
        <input
          type="text"
          name="department"
          placeholder="Department (e.g. IT, HR, Sales)"
          value={employee.department}
          onChange={inputHandler}
          className="w-full mb-4 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400"
          required
        />

        {/* Title */}
        <input
          type="text"
          name="title"
          placeholder="Job Title (e.g. Software Engineer)"
          value={employee.title}
          onChange={inputHandler}
          className="w-full mb-4 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400"
          required
        />

        {/* Salary */}
        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={employee.salary}
          onChange={inputHandler}
          className="w-full mb-4 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400"
        />

        {/* Date of Joining */}
        <input
          type="date"
          name="dateOfJoining"
          value={employee.dateOfJoining}
          onChange={inputHandler}
          className="w-full mb-4 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400"
          required
        />

        {/* Active Checkbox */}
        <label className="flex items-center mb-4 text-gray-700">
          <input
            type="checkbox"
            name="isActive"
            checked={employee.isActive}
            onChange={inputHandler}
            className="mr-2"
          />
          Active Employee
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:opacity-90 hover:shadow-xl transition duration-300"
        >
          ➕ Add Employee
        </button>

        {/* Back Link */}
        <p className="mt-4 text-center text-sm text-gray-500">
          <Link to="/users" className="text-indigo-600 hover:underline">
            ⬅ Back to Dashboard
          </Link>
        </p>
      </form>
    </div>
  );
};

export default AddEmployee;
