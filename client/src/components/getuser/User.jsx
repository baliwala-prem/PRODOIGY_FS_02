import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Employee = () => {
  const [employees, setEmployees] = useState([]);

  // Fetch all employees
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/getall");
        setEmployees(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // Delete employee
  const deleteEmployee = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/delete/${id}`
      );
      setEmployees((prev) => prev.filter((emp) => emp._id !== id));
      toast.success(response.data.msg, { position: "top-right" });
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete employee");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Employee List</h2>
        <Link
          to="/add"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          ➕ Add Employee
        </Link>
      </div>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {[
                "S.No.",
                "Full Name",
                "Email",
                "Phone",
                "Department",
                "Title",
                "Salary",
                "Date of Joining",
                "Status",
                "Actions",
              ].map((heading, idx) => (
                <th
                  key={idx}
                  className="text-left text-sm font-semibold text-gray-600 px-4 py-3 border-b"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {employees.length > 0 ? (
              employees.map((emp, index) => (
                <tr
                  key={emp._id}
                  className="hover:bg-gray-50 transition border-b"
                >
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">
                    {emp.firstName} {emp.lastName}
                  </td>
                  <td className="px-4 py-3">{emp.email}</td>
                  <td className="px-4 py-3">{emp.phone}</td>
                  <td className="px-4 py-3">{emp.department}</td>
                  <td className="px-4 py-3">{emp.title}</td>
                  <td className="px-4 py-3">₹{emp.salary}</td>
                  <td className="px-4 py-3">
                    {new Date(emp.dateOfJoining).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    {emp.isActive ? (
                      <span className="text-green-600 font-medium">✅ Active</span>
                    ) : (
                      <span className="text-red-600 font-medium">❌ Inactive</span>
                    )}
                  </td>
                  <td className="px-4 py-3 flex gap-3">
                    <button
                      onClick={() => deleteEmployee(emp._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                    <Link
                      to={`/edit/${emp._id}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={10}
                  className="text-center text-gray-500 py-6 text-sm"
                >
                  No employees found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employee;
