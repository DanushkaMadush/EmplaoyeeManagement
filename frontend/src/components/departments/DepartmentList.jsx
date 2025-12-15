import { useEffect, useState } from "react";
import { getDepartments, deleteDepartment } from "../../api/departmentApi";
import DepartmentForm from "./DepartmentForm";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = async () => {
    try {
      const response = await getDepartments();
      setDepartments(response.data);
    } catch (err) {
      setError("Failed to load departments");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this department?"))
      return;

    try {
      await deleteDepartment(id);
      setDepartments(departments.filter((d) => d.departmentId !== id));
    } catch {
      alert("Delete failed");
    }
  };

  const handleAdd = () => {
    setSelectedDepartmentId(null);
    setShowForm(true);
  };

  const handleEdit = (id) => {
    setSelectedDepartmentId(id);
    setShowForm(true);
  };

  const handleSuccess = () => {
    setShowForm(false);
    loadDepartments();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-4">
      <h3>Departments</h3>

      <button className="btn btn-success mb-3" onClick={handleAdd}>
        Add Department
      </button>

      {showForm && (
        <DepartmentForm
          departmentId={selectedDepartmentId}
          onSuccess={handleSuccess}
          onCancel={() => setShowForm(false)}
        />
      )}

      <table className="table table-bordered table-striped mt-3">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Code</th>
            <th>Name</th>
            <th style={{ width: "150px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">
                No departments found
              </td>
            </tr>
          ) : (
            departments.map((dept) => (
              <tr key={dept.departmentId}>
                <td>{dept.departmentId}</td>
                <td>{dept.departmentCode}</td>
                <td>{dept.departmentName}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEdit(dept.departmentId)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(dept.departmentId)}
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

export default DepartmentList;
