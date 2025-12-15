using Microsoft.Data.SqlClient;
using backend.Data;
using backend.Models.Entities;
using backend.Interfaces.Repositories;

namespace backend.Repository
{
    public class DepartmentRepository : IDepartmentRepository
    {
        private readonly AppDbContext _context;
        public DepartmentRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Department>> GetAllAsync()
        {
            var departments = new List<Department>();

            using var connection = _context.CreateConnection();
            using var command = new SqlCommand(
                "SELECT DepartmentId, DepartmentCode, DepartmentName FROM Departments",
                connection
            );

            await connection.OpenAsync();

            using var reader = await command.ExecuteReaderAsync();
            while (await reader.ReadAsync())
            {
                departments.Add(new Department
                {
                    DepartmentId = reader.GetInt32(0),
                    DepartmentCode = reader.GetString(1),
                    DepartmentName = reader.GetString(2)
                });
            }

            return departments;
        }

        public async Task<Department?> GetByIdAsync(int departmentId)
        {
            using var connection = _context.CreateConnection();
            using var command = new SqlCommand(
                @"SELECT DepartmentId, DepartmentCode, DepartmentName 
                  FROM Departments 
                  WHERE DepartmentId = @DepartmentId",
                connection
            );

            command.Parameters.AddWithValue("@DepartmentId", departmentId);

            await connection.OpenAsync();

            using var reader = await command.ExecuteReaderAsync();
            if (await reader.ReadAsync())
            {
                return new Department
                {
                    DepartmentId = reader.GetInt32(0),
                    DepartmentCode = reader.GetString(1),
                    DepartmentName = reader.GetString(2)
                };
            }

            return null;
        }

        public async Task<Department?> GetByCodeAsync(string departmentCode)
        {
            using var connection = _context.CreateConnection();
            using var command = new SqlCommand(
                @"SELECT DepartmentId, DepartmentCode, DepartmentName 
                  FROM Departments 
                  WHERE DepartmentCode = @DepartmentCode",
                connection
            );

            command.Parameters.AddWithValue("@DepartmentCode", departmentCode);

            await connection.OpenAsync();

            using var reader = await command.ExecuteReaderAsync();
            if (await reader.ReadAsync())
            {
                return new Department
                {
                    DepartmentId = reader.GetInt32(0),
                    DepartmentCode = reader.GetString(1),
                    DepartmentName = reader.GetString(2)
                };
            }

            return null;
        }

        public async Task<int> CreateAsync(Department department)
        {
            using var connection = _context.CreateConnection();
            using var command = new SqlCommand(
                @"INSERT INTO Departments (DepartmentCode, DepartmentName)
                  OUTPUT INSERTED.DepartmentId
                  VALUES (@DepartmentCode, @DepartmentName)",
                connection
            );

            command.Parameters.AddWithValue("@DepartmentCode", department.DepartmentCode);
            command.Parameters.AddWithValue("@DepartmentName", department.DepartmentName);

            await connection.OpenAsync();

            return (int)await command.ExecuteScalarAsync();
        }

        public async Task<bool> UpdateAsync(Department department)
        {
            using var connection = _context.CreateConnection();
            using var command = new SqlCommand(
                @"UPDATE Departments
                  SET DepartmentCode = @DepartmentCode,
                      DepartmentName = @DepartmentName
                  WHERE DepartmentId = @DepartmentId",
                connection
            );

            command.Parameters.AddWithValue("@DepartmentId", department.DepartmentId);
            command.Parameters.AddWithValue("@DepartmentCode", department.DepartmentCode);
            command.Parameters.AddWithValue("@DepartmentName", department.DepartmentName);

            await connection.OpenAsync();

            return await command.ExecuteNonQueryAsync() > 0;
        }

        public async Task<bool> DeleteAsync(int departmentId)
        {
            using var connection = _context.CreateConnection();
            using var command = new SqlCommand(
                "DELETE FROM Departments WHERE DepartmentId = @DepartmentId",
                connection
            );

            command.Parameters.AddWithValue("@DepartmentId", departmentId);

            await connection.OpenAsync();

            return await command.ExecuteNonQueryAsync() > 0;
        }
    }
}
