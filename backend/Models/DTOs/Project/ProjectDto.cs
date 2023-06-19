using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace gerdisc.Models.DTOs
{
    public class ProjectDto
    {
        public Guid? Id { get; set; }
        public string? Name { get; set; }
        public string? Status { get; set; }
        [BindNever]
        public List<UserDto> Professors { get; set; }
        [BindNever]
        public List<UserDto> Students { get; set; }
        public List<DissertationDto> Dissertations { get; set; }

        public ProjectDto()
        {
            Professors = new List<UserDto>();
            Students = new List<UserDto>();
            Dissertations = new List<DissertationDto>();
        }
    }
}
