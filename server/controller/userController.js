import Employee from "../model/userModel.js";

export const createEmployee = async (req, res) => {
  try {
    const employeeData = new Employee(req.body);

    if (!employeeData) {
      return res.status(400).json({ msg: "Invalid employee data" });
    }

    await employeeData.save();
    res.status(201).json({ msg: "Employee created successfully", data: employeeData });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();

    if (!employees || employees.length === 0) {
      return res.status(404).json({ msg: "No employees found" });
    }

    res.status(200).json(employees);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getEmployeeById = async (req, res) => {
  try {
    const id = req.params.id;
    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({ msg: "Employee not found" });
    }

    res.status(200).json(employee);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const updateEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({ msg: "Employee not found" });
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ msg: "Employee updated successfully", data: updatedEmployee });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const deleteEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({ msg: "Employee not found" });
    }

    await Employee.findByIdAndDelete(id);
    res.status(200).json({ msg: "Employee deleted successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
