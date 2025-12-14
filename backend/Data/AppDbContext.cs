using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace backend.Data
{
    public class AppDbContext
    {
        private readonly IConfiguration _configuration;

        public AppDbContext(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public SqlConnection CreateConnection()
        {
            return new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
        }
    }
}
