using Microsoft.AspNetCore.Mvc;
using backend.Interfaces.Services;
using backend.Models.Entities;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DepartmentController : ControllerBase
    {
        private readonly IDepartmentService _departmentService;

        public DepartmentController(IDepartmentService departmentService)
        {
            _departmentService = departmentService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var departments = await _departmentService.GetAllAsync();
                return Ok(departments);
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var department = await _departmentService.GetByIdAsync(id);
                if (department == null)
                    return NotFound();

                return Ok(department);
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Department department)
        {
            try
            {
                var id = await _departmentService.CreateAsync(department);
                return CreatedAtAction(nameof(GetById), new { id }, department);
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] Department department)
        {
            try
            {
                if (id != department.DepartmentId)
                    return BadRequest("ID mismatch");

                var updated = await _departmentService.UpdateAsync(department);
                if (!updated)
                    return NotFound();

                return NoContent();
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var deleted = await _departmentService.DeleteAsync(id);
                if (!deleted)
                    return NotFound();

                return NoContent();
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "Internal server error" });
            }
        }
    }
}
