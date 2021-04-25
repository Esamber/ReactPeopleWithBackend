using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace PeopleTableWithBackend.Data
{
    public class PeopleRepository
    {
        private readonly string _connectionString;

        public PeopleRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<Person> GetPeople()
        {
            using var ctx = new PeopleDbContext(_connectionString);
            return ctx.People.ToList();
        }

        public void Add(Person person)
        {
            using var ctx = new PeopleDbContext(_connectionString);
            ctx.People.Add(person);
            ctx.SaveChanges();
        }

        public void Delete(int id)
        {
            using var ctx = new PeopleDbContext(_connectionString);
            ctx.Database.ExecuteSqlInterpolated($"DELETE FROM People WHERE Id = {id}");
        }

        public Person GetPerson(int id)
        {
            using var ctx = new PeopleDbContext(_connectionString);
            return ctx.People.FirstOrDefault(p => p.Id == id);
        }
    }
}
