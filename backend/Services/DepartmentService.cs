using backend.Models.Entities;
using backend.Interfaces.Services;
using backend.Interfaces.Repositories;

namespace backend.Services
{
    public class DepartmentService : IDepartmentService
    {
        private readonly IDepartmentRepository _departmentRepository;

        public DepartmentService(IDepartmentRepository departmentRepository)
        {
            _departmentRepository = departmentRepository;
        }

        public async Task<IEnumerable<Department>> GetAllAsync()
        {
            return await _departmentRepository.GetAllAsync();
        }

        public async Task<Department?> GetByIdAsync(int id)
        {
            return await _departmentRepository.GetByIdAsync(id);
        }

        public async Task<int> CreateAsync(Department department)
        {
            var existing = await _departmentRepository.GetByCodeAsync(department.DepartmentCode);
            if (existing != null)
                throw new Exception("Department code already exists.");

            return await _departmentRepository.CreateAsync(department);
        }

        public async Task<bool> UpdateAsync(Department department)
        {
            return await _departmentRepository.UpdateAsync(department);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            return await _departmentRepository.DeleteAsync(id);
        }
    }
}
