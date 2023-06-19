using gerdisc.Infrastructure.Extensions;
using gerdisc.Infrastructure.Repositories;
using gerdisc.Models.DTOs;
using gerdisc.Models.Mapper;
using gerdisc.Services.Interfaces;

namespace gerdisc.Services
{
    public class ProjectService : IProjectService
    {
        private readonly IRepository _repository;
        private readonly ILogger<ProjectService> _logger;
        private readonly IUserContext _userContext;

        public ProjectService(
            IRepository repository,
            ILogger<ProjectService> logger,
            IUserContext userContext
        )
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _userContext = userContext ?? throw new ArgumentNullException(nameof(userContext));
        }

        public async Task<ProjectDto> CreateProjectAsync(CreateProjectDto projectDto)
        {
            try
            {
                var project = projectDto.ToEntity();

                var professorIds = projectDto.ProfessorIds.Select(x => Guid.Parse(x));

                project = await _repository.Project.AddAsync(project);
                await _repository.ProfessorProject.HandlesByProject(projectDto.ProfessorIds.Select(Guid.Parse), project);

                _logger.LogInformation($"Project {project.Name} created successfully.");
                return project.ToDto();
            }
            catch (Exception ex)
            {
                _logger.LogInformation($"Project {projectDto.Name} as {ex}");
                return projectDto.ToEntity().ToDto();
            };
        }

        public async Task<ProjectDto> GetProjectAsync(Guid id)
        {
            var projectEntity = await _repository
                .Project
                .GetByIdAsync(id);
            if (projectEntity == null)
            {
                throw new ArgumentException("Project not found.");
            }

            return projectEntity.ToDto();
        }

        public async Task<IEnumerable<ProjectDto>> GetAllProjectsAsync()
        {
            var projects = await _repository
                .Project
                .GetAllAsync();
            var projectDtos = new List<ProjectDto>();
            foreach (var project in projects)
            {
                projectDtos.Add(project.ToDto());
            }

            return projectDtos;
        }

        public async Task<ProjectDto> UpdateProjectAsync(Guid id, CreateProjectDto projectDto)
        {
            var existingProject = await _repository.Project.GetByIdAsync(id);
            if (existingProject == null)
            {
                throw new ArgumentException($"Project with id {id} does not exist.");
            }

            existingProject = projectDto.ToEntity(existingProject);
            await _repository.Project.UpdateAsync(existingProject);
            await _repository.ProfessorProject.HandlesByProject(projectDto.ProfessorIds.Select(Guid.Parse), existingProject);

            return existingProject.ToDto();
        }

        public async Task DeleteProjectAsync(Guid id)
        {
            var existingProject = await _repository.Project.GetByIdAsync(id);
            if (existingProject == null)
            {
                throw new ArgumentException($"Project with id {id} does not exist.");
            }

            await _repository.Project.DeactiveAsync(existingProject);
        }
    }
}
