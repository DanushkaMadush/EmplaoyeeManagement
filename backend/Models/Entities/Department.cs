namespace backend.Models.Entities
{
    public class Department
    {
        public int DepartmentId { get; set; }
        public required string DepartmentCode { get; set; }
        public required string DepartmentName { get; set; }
    }
}
