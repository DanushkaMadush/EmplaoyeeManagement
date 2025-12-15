import { useEffect, useState } from "react";
import { getEmployees, deleteEmployee } from "../../api/employeeApi";
import EmployeeForm from "./EmployeeForm";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const response = await getEmployees();
      setEmployees(response.data);
    } catch {
      setError("Failed to load employees");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?"))
      return;

    try {
      await deleteEmployee(id);
      setEmployees(employees.filter((e) => e.employeeId !== id));
    } catch {
      alert("Delete failed");
    }
  };

  const handleAdd = () => {
    setSelectedEmployeeId(null);
    setShowForm(true);
  };

  const handleEdit = (id) => {
    setSelectedEmployeeId(id);
    setShowForm(true);
  };

  const handleSuccess = () => {
    setShowForm(false);
    loadEmployees();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-4">
      <h3>Employees</h3>

      <button className="btn btn-success mb-3" onClick={handleAdd}>
        Add Employee
      </button>

      {showForm && (
        <EmployeeForm
          employeeId={selectedEmployeeId}
          onSuccess={handleSuccess}
          onCancel={() => setShowForm(false)}
        />
      )}

      <table className="table table-bordered table-striped mt-3">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>DOB</th>
            <th>Age</th>
            <th>Salary</th>
            <th>Department</th>
            <th style={{ width: "150px" }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center">
                No employees found
              </td>
            </tr>
          ) : (
            employees.map((emp) => (
              <tr key={emp.employeeId}>
                <td>{emp.employeeId}</td>
                <td>
                  {emp.firstName} {emp.lastName}
                </td>
                <td>{emp.email}</td>
                <td>{new Date(emp.dateOfBirth).toLocaleDateString()}</td>
                <td>{emp.age}</td>
                <td>{emp.salary}</td>
                <td>{emp.departmentId}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEdit(emp.employeeId)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(emp.employeeId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
