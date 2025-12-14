namespace backend.Models.Entities
{
    public class Employee
    {
        public int EmployeeId { get; set; }
        public required string FirstName { get; set; }
        public string? LastName { get; set; } = null;
        public required string Email { get; set; }
        public DateTime DateOfBirth { get; set; }
        public decimal Salary { get; set; }
        public int DepartmentId { get; set; }

        //calculate age from date of birth
        public int Age
        {
            get
            {
                var today = DateTime.Today;
                var age = today.Year - DateOfBirth.Year;
                if (DateOfBirth.Date > today.AddYears(-age)) age--;
                return age;
            }
        }
    }
}
