using JWUmbracoProject.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace JWUmbracoProject.Controllers
{
    [ApiController]
    [Route("/umbraco/api/rickandmortycharacters")]
    public class RickAndMortyController : Controller
    {
        private readonly RickAndMortyContentService _contentService;
        private readonly ILogger<RickAndMortyController> _logger;

        public RickAndMortyController(
            RickAndMortyContentService contentService,
            ILogger<RickAndMortyController> logger)
        {
            _contentService = contentService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> ImportCharacters()
        {
            _logger.LogInformation("HttpGet ImportCharacters method has been called");
            try
            {
                await _contentService.ImportAllCharactersAsync();
                _logger.LogInformation("HttpGet ImportCharacters method returning");
                return Ok("Characters imported successfully.");
            }
            catch (HttpRequestException ex)
            {
                _logger.LogError(ex, "API call to Rick and Morty failed.");
                return StatusCode(502, "Failed to fetch data from Rick and Morty API.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "HttpGet ImportCharacters method encountered an unexpected error");
                return StatusCode(500, "An unexpected error occurred.");
            }
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteCharacters()
        {
            _logger.LogInformation("HttpDelete DeleteCharacters method has been called");
            try
            {
                await _contentService.DeleteAllCharactersAsync();
                _logger.LogInformation("HttpDelete DeleteCharacters method returning");
                return Ok("Characters deleted successfully.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "HttpDelete DeleteCharacters method encountered an unexpected error");
                return StatusCode(500, "An unexpected error occurred.");
            }
        }
    }
}
