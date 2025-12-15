using backend.Models.Entities;

namespace backend.Interfaces.Repositories
{
    public interface IEmployeeRepository
    {
        Task<IEnumerable<Employee>> GetAllAsync();
        Task<Employee?> GetByIdAsync(int employeeId);
        Task<IEnumerable<Employee>> GetByDepartmentAsync(int departmentId);
        Task<int> CreateAsync(Employee employee);
        Task<bool> UpdateAsync(Employee employee);
        Task<bool> DeleteAsync(int employeeId);
    }
}
