using gerdisc.Infrastructure.Repositories;
using gerdisc.Models.DTOs;
using gerdisc.Services.Dissertation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace gerdisc.Controllers
{
    [ApiController]
    [Route("dissertations")]
    public class DissertationController : ControllerBase
    {
        private readonly IDissertationService _dissertationService;

        public DissertationController(IDissertationService dissertationService)
        {
            _dissertationService = dissertationService;
        }

        /// <summary>
        /// Creates a new dissertation.
        /// </summary>
        /// <param name="dissertationDto">The dissertation data.</param>
        /// <returns>The created dissertation.</returns>
        [HttpPost]
        [Authorize(Roles = "Administrator, ProjectManager")]
        public async Task<ActionResult<DissertationDto>> CreateDissertation(DissertationDto dissertationDto)
        {
            try
            {
                var dissertation = await _dissertationService.CreateDissertationAsync(dissertationDto);
                return CreatedAtAction(nameof(GetDissertation), new { id = dissertation.Id }, dissertation);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Gets a dissertation by its ID.
        /// </summary>
        /// <param name="id">The dissertation ID.</param>
        /// <returns>The dissertation.</returns>
        [HttpGet("{id}")]
        [Authorize(Roles = "Administrator, ProjectManager, Developer")]
        public async Task<ActionResult<DissertationDto>> GetDissertation(int id)
        {
            try
            {
                var dissertation = await _dissertationService.GetDissertationAsync(id);
                return Ok(dissertation);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Updates a dissertation by its ID.
        /// </summary>
        /// <param name="id">The dissertation ID.</param>
        /// <param name="dissertationDto">The dissertation data.</param>
        /// <returns>The updated dissertation.</returns>
        [HttpPut("{id}")]
        [Authorize(Roles = "Administrator, ProjectManager")]
        public async Task<ActionResult<DissertationDto>> UpdateDissertation(int id, DissertationDto dissertationDto)
        {
            try
            {
                var dissertation = await _dissertationService.UpdateDissertationAsync(id, dissertationDto);
                return Ok(dissertation);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Deletes a dissertation by its ID.
        /// </summary>
        /// <param name="id">The dissertation ID.</param>
        /// <returns>No content.</returns>
        [HttpDelete("{id}")]
        [Authorize(Roles = "Administrator, ProjectManager")]
        public async Task<IActionResult> DeleteDissertation(int id)
        {
            try
            {
                await _dissertationService.DeleteDissertationAsync(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
