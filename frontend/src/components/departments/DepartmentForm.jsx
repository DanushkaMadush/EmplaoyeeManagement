import { useEffect, useState } from 'react';
import {
  createDepartment,
  updateDepartment,
  getDepartmentById
} from '../../api/departmentApi';

const DepartmentForm = ({ departmentId, onSuccess, onCancel }) => {
  const [departmentCode, setDepartmentCode] = useState('');
  const [departmentName, setDepartmentName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
      setError('Failed to load department');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const payload = { departmentCode, departmentName };

      if (departmentId) {
        await updateDepartment(departmentId, {
          departmentId,
          ...payload
        });
      } else {
        await createDepartment(payload);
      }

      onSuccess();
    } catch (err) {
      setError('Save failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-header">
        {departmentId ? 'Edit Department' : 'Add Department'}
      </div>
      <div className="card-body">
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Department Code</label>
            <input
              type="text"
              className="form-control"
              value={departmentCode}
              onChange={(e) => setDepartmentCode(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Department Name</label>
            <input
              type="text"
              className="form-control"
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary me-2"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save'}
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
