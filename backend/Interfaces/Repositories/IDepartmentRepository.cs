using backend.Models.Entities;

namespace backend.Interfaces.Repositories
{
    public interface IDepartmentRepository
    {
        Task<IEnumerable<Department>> GetAllAsync();
        Task<Department?> GetByIdAsync(int departmentId);
        Task<Department?> GetByCodeAsync(string departmentCode);
        Task<int> CreateAsync(Department department);
        Task<bool> UpdateAsync(Department department);
        Task<bool> DeleteAsync(int departmentId);
    }
}
