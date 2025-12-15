import { useEffect, useState } from "react";
import {
  createDepartment,
  updateDepartment,
  getDepartmentById,
} from "../../api/departmentApi";

const DepartmentForm = ({ departmentId, onSuccess, onCancel }) => {
  const [departmentCode, setDepartmentCode] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState("");

  useEffect(() => {
    if (departmentId) {
      loadDepartment();
    }
  }, [departmentId]);

  const loadDepartment = async () => {
    try {
      const res = await getDepartmentById(departmentId);
      setDepartmentCode(res.data.departmentCode);
      setDepartmentName(res.data.departmentName);
    } catch {
      setError("Failed to load department");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      const payload = { departmentCode, departmentName };

      if (departmentId) {
        await updateDepartment(departmentId, {
          departmentId,
          ...payload,
        });
      } else {
        await createDepartment(payload);
      }

      onSuccess();
    } catch (err) {
      setError("Save failed");
    } finally {
      setLoading(false);
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!departmentCode.trim())
      newErrors.departmentCode = "Department code is required";
    else if (departmentCode.length < 2)
      newErrors.departmentCode = "Minimum 2 characters";

    if (!departmentName.trim())
      newErrors.departmentName = "Department name is required";
    else if (departmentName.length < 3)
      newErrors.departmentName = "Minimum 3 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="card mb-4">
      <div className="card-header">
        {departmentId ? "Edit Department" : "Add Department"}
      </div>
      <div className="card-body">
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Department Code</label>
            <input
              type="text"
              className={`form-control ${
                errors.departmentCode ? "is-invalid" : ""
              }`}
              value={departmentCode}
              onChange={(e) => setDepartmentCode(e.target.value)}
              required
            />
            <div className="invalid-feedback">{errors.departmentCode}</div>
          </div>

          <div className="mb-3">
            <label className="form-label">Department Name</label>
            <input
              type="text"
              className={`form-control ${
                errors.departmentName ? "is-invalid" : ""
              }`}
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
              required
            />
            <div className="invalid-feedback">{errors.departmentName}</div>
          </div>

          <button
            type="submit"
            className="btn btn-primary me-2"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default DepartmentForm;
