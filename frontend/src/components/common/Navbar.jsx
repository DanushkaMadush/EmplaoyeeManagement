import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <span className="navbar-brand">Employee Management System</span>

        <div>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                to="/departments"
                className="nav-link"
              >
                Departments
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/employees"
                className="nav-link"
              >
                Employees
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
