using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PeopleTableWithBackend.Data;
using Microsoft.Extensions.Configuration;
using System.Threading;

namespace PeopleTableWithBackend.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private readonly string _connectionString;

        public PeopleController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }
        
        [HttpGet]
        [Route("GetPeople")]
        public List<Person> GetPeople()
        {
            var repo = new PeopleRepository(_connectionString);
            return repo.GetPeople();
        }
            
        [HttpPost]
        [Route("Add")]
        public void Add(Person person)
        {
            var repo = new PeopleRepository(_connectionString);
            repo.Add(person);
        }

        [HttpPost]
        [Route("delete")]
        public void Delete(Person p)
        {
            var repo = new PeopleRepository(_connectionString);
            repo.Delete(p.Id);
        }
    }
}
