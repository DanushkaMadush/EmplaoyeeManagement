import { useEffect, useState } from 'react';
import {
  createEmployee,
  updateEmployee,
  getEmployeeById
} from '../../api/employeeApi';
import { getDepartments } from '../../api/departmentApi';

const EmployeeForm = ({ employeeId, onSuccess, onCancel }) => {
  const [employee, setEmployee] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    salary: '',
    departmentId: ''
  });

  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadDepartments();
    if (employeeId) {
      loadEmployee();
    }
  }, [employeeId]);

  const loadDepartments = async () => {
    const res = await getDepartments();
    setDepartments(res.data);
  };

  const loadEmployee = async () => {
    try {
      const res = await getEmployeeById(employeeId);
      const data = res.data;

      setEmployee({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        dateOfBirth: data.dateOfBirth.split('T')[0],
        salary: data.salary,
        departmentId: data.departmentId
      });
    } catch {
      setError('Failed to load employee');
    }
  };

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (employeeId) {
        await updateEmployee(employeeId, {
          employeeId,
          ...employee
        });
      } else {
        await createEmployee(employee);
      }

      onSuccess();
    } catch {
      setError('Save failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-header">
        {employeeId ? 'Edit Employee' : 'Add Employee'}
      </div>

      <div className="card-body">
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">First Name</label>
              <input
                type="text"
                name="firstName"
                className="form-control"
                value={employee.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                name="lastName"
                className="form-control"
                value={employee.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={employee.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                className="form-control"
                value={employee.dateOfBirth}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Salary</label>
              <input
                type="number"
                name="salary"
                className="form-control"
                value={employee.salary}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Department</label>
            <select
              name="departmentId"
              className="form-select"
              value={employee.departmentId}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Department --</option>
              {departments.map(d => (
                <option key={d.departmentId} value={d.departmentId}>
                  {d.departmentName}
                </option>
              ))}
            </select>
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

export default EmployeeForm;
