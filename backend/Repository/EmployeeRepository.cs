using Microsoft.Data.SqlClient;
using backend.Data;
using backend.Models.Entities;
using backend.Interfaces.Repositories;

namespace backend.Repository
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly AppDbContext _context;

        public EmployeeRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Employee>> GetAllAsync()
        {
            var employees = new List<Employee>();

            using var connection = _context.CreateConnection();
            using var command = new SqlCommand(
                @"SELECT EmployeeId, FirstName, LastName, Email, DateOfBirth, Salary, DepartmentId FROM Employees", connection
            );

            await connection.OpenAsync();

            using var reader = await command.ExecuteReaderAsync();
            while (await reader.ReadAsync())
            {
                employees.Add(MapEmployee(reader));
            }

            return employees;
        }

        public async Task<Employee?> GetByIdAsync(int employeeId)
        {
            using var connection = _context.CreateConnection();
            using var command = new SqlCommand(
                @"SELECT EmployeeId, FirstName, LastName, Email,
                         DateOfBirth, Salary, DepartmentId
                  FROM Employees
                  WHERE EmployeeId = @EmployeeId",
                connection
            );

            command.Parameters.AddWithValue("@EmployeeId", employeeId);

            await connection.OpenAsync();

            using var reader = await command.ExecuteReaderAsync();
            if (await reader.ReadAsync())
            {
                return MapEmployee(reader);
            }

            return null;
        }

        public async Task<IEnumerable<Employee>> GetByDepartmentAsync(int departmentId)
        {
            var employees = new List<Employee>();

            using var connection = _context.CreateConnection();
            using var command = new SqlCommand(
                @"SELECT EmployeeId, FirstName, LastName, Email,
                         DateOfBirth, Salary, DepartmentId
                  FROM Employees
                  WHERE DepartmentId = @DepartmentId",
                connection
            );

            command.Parameters.AddWithValue("@DepartmentId", departmentId);

            await connection.OpenAsync();

            using var reader = await command.ExecuteReaderAsync();
            while (await reader.ReadAsync())
            {
                employees.Add(MapEmployee(reader));
            }

            return employees;
        }

        public async Task<int> CreateAsync(Employee employee)
        {
            using var connection = _context.CreateConnection();
            using var command = new SqlCommand(
                @"INSERT INTO Employees
                    (FirstName, LastName, Email, DateOfBirth, Salary, DepartmentId)
                  OUTPUT INSERTED.EmployeeId
                  VALUES
                    (@FirstName, @LastName, @Email, @DateOfBirth, @Salary, @DepartmentId)",
                connection
            );

            command.Parameters.AddWithValue("@FirstName", employee.FirstName);
            command.Parameters.AddWithValue("@LastName", employee.LastName);
            command.Parameters.AddWithValue("@Email", employee.Email);
            command.Parameters.AddWithValue("@DateOfBirth", employee.DateOfBirth);
            command.Parameters.AddWithValue("@Salary", employee.Salary);
            command.Parameters.AddWithValue("@DepartmentId", employee.DepartmentId);

            await connection.OpenAsync();

            return (int)await command.ExecuteScalarAsync();
        }

        public async Task<bool> UpdateAsync(Employee employee)
        {
            using var connection = _context.CreateConnection();
            using var command = new SqlCommand(
                @"UPDATE Employees
                  SET FirstName = @FirstName,
                      LastName = @LastName,
                      Email = @Email,
                      DateOfBirth = @DateOfBirth,
                      Salary = @Salary,
                      DepartmentId = @DepartmentId
                  WHERE EmployeeId = @EmployeeId",
                connection
            );

            command.Parameters.AddWithValue("@EmployeeId", employee.EmployeeId);
            command.Parameters.AddWithValue("@FirstName", employee.FirstName);
            command.Parameters.AddWithValue("@LastName", employee.LastName);
            command.Parameters.AddWithValue("@Email", employee.Email);
            command.Parameters.AddWithValue("@DateOfBirth", employee.DateOfBirth);
            command.Parameters.AddWithValue("@Salary", employee.Salary);
            command.Parameters.AddWithValue("@DepartmentId", employee.DepartmentId);

            await connection.OpenAsync();

            return await command.ExecuteNonQueryAsync() > 0;
        }

        public async Task<bool> DeleteAsync(int employeeId)
        {
            using var connection = _context.CreateConnection();
            using var command = new SqlCommand(
                "DELETE FROM Employees WHERE EmployeeId = @EmployeeId",
                connection
            );

            command.Parameters.AddWithValue("@EmployeeId", employeeId);

            await connection.OpenAsync();

            return await command.ExecuteNonQueryAsync() > 0;
        }

        // 🔁 Centralized mapping method
        private static Employee MapEmployee(SqlDataReader reader)
        {
            return new Employee
            {
                EmployeeId = reader.GetInt32(0),
                FirstName = reader.GetString(1),
                LastName = reader.GetString(2),
                Email = reader.GetString(3),
                DateOfBirth = reader.GetDateTime(4),
                Salary = reader.GetDecimal(5),
                DepartmentId = reader.GetInt32(6)
            };
        }
    }
}


