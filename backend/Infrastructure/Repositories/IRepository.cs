using gerdisc.Infrastructure.Repositories.Course;
using gerdisc.Infrastructure.Repositories.Dissertation;
using gerdisc.Infrastructure.Repositories.Extension;
using gerdisc.Infrastructure.Repositories.ExternalResearcher;
using gerdisc.Infrastructure.Repositories.Professor;
using gerdisc.Infrastructure.Repositories.Project;
using gerdisc.Infrastructure.Repositories.Student;
using gerdisc.Infrastructure.Repositories.User;

namespace gerdisc.Infrastructure.Repositories
{
    public interface IRepository
    {
        public IUserRepository User{ get; }
        public IStudentRepository Student{ get; }
        public IProfessorRepository Professor{ get; }
        public IProjectRepository Project{ get; }
        public IDissertationRepository Dissertation{ get; }
        public IExtensionRepository Extension{ get; }
        public IExternalResearcherRepository ExternalResearcher{ get; }
        public ICourseRepository Course{ get; }
        Task<int> CommitAsync();
    }
}