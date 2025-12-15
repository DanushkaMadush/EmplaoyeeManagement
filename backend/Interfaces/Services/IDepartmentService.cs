using backend.Models.Entities;

namespace backend.Interfaces.Services
{
    public interface IDepartmentService
    {
        Task<IEnumerable<Department>> GetAllAsync();
        Task<Department?> GetByIdAsync(int id);
        Task<int> CreateAsync(Department department);
        Task<bool> UpdateAsync(Department department);
        Task<bool> DeleteAsync(int id);
    }
}
