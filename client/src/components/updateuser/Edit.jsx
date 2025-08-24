import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const initialEmployee = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    title: "",
    salary: "",
    dateOfJoining: "",
    isActive: true,
  };

  const [employee, setEmployee] = useState(initialEmployee);

  // input handler
  const inputChangeHandler = (e) => {
    const { name, value, type, checked } = e.target;
    setEmployee({ ...employee, [name]: type === "checkbox" ? checked : value });
  };

  // fetch employee data
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/getone/${id}`)
      .then((response) => setEmployee(response.data))
      .catch((error) => console.log(error));
  }, [id]);

  // update employee
  const submitForm = async (e) => {
    e.preventDefault();
    await axios
      .put(`http://localhost:8000/api/update/${id}`, employee)
      .then((response) => {
        toast.success(response.data.msg, { position: "top-right" });
        navigate("/users");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">Update Employee</h3>
          <Link
            to="/users"
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700 font-medium"
          >
            ⬅ Back
          </Link>
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={submitForm}>
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              name="firstName"
              value={employee.firstName}
              onChange={inputChangeHandler}
              placeholder="First name"
              className="mt-1 block w-full rounded-lg border border-gray-300 p-2 focus:ring focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={employee.lastName}
              onChange={inputChangeHandler}
              placeholder="Last name"
              className="mt-1 block w-full rounded-lg border border-gray-300 p-2 focus:ring focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={employee.email}
              onChange={inputChangeHandler}
              placeholder="Email"
              className="mt-1 block w-full rounded-lg border border-gray-300 p-2 focus:ring focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="text"
              name="phone"
              value={employee.phone}
              onChange={inputChangeHandler}
              placeholder="Phone"
              className="mt-1 block w-full rounded-lg border border-gray-300 p-2 focus:ring focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Department</label>
            <input
              type="text"
              name="department"
              value={employee.department}
              onChange={inputChangeHandler}
              placeholder="Department"
              className="mt-1 block w-full rounded-lg border border-gray-300 p-2 focus:ring focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={employee.title}
              onChange={inputChangeHandler}
              placeholder="Job Title"
              className="mt-1 block w-full rounded-lg border border-gray-300 p-2 focus:ring focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Salary</label>
            <input
              type="number"
              name="salary"
              value={employee.salary}
              onChange={inputChangeHandler}
              placeholder="Salary"
              className="mt-1 block w-full rounded-lg border border-gray-300 p-2 focus:ring focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Joining</label>
            <input
              type="date"
              name="dateOfJoining"
              value={employee.dateOfJoining}
              onChange={inputChangeHandler}
              className="mt-1 block w-full rounded-lg border border-gray-300 p-2 focus:ring focus:ring-blue-400"
            />
          </div>

          <div className="flex items-center space-x-3 col-span-2">
            <input
              type="checkbox"
              name="isActive"
              checked={employee.isActive}
              onChange={inputChangeHandler}
              className="h-5 w-5 text-blue-500"
            />
            <label className="text-gray-700">Active</label>
          </div>

          <div className="col-span-2">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md"
            >
              UPDATE EMPLOYEE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployee;
