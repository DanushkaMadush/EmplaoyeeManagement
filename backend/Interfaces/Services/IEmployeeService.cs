using backend.Models.Entities;

namespace backend.Interfaces.Services
{
    public interface IEmployeeService
    {
        Task<IEnumerable<Employee>> GetAllAsync();
        Task<Employee?> GetByIdAsync(int id);
        Task<IEnumerable<Employee>> GetByDepartmentAsync(int departmentId);
        Task<int> CreateAsync(Employee employee);
        Task<bool> UpdateAsync(Employee employee);
        Task<bool> DeleteAsync(int id);
    }
}
