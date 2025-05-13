using JWUmbracoProject.Models;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Services;
using Microsoft.Extensions.Logging;

namespace JWUmbracoProject.Services
{
    public class RickAndMortyContentService
    {
        private readonly IContentService _contentService;
        private readonly HttpClient _httpClient;
        private readonly ILogger<RickAndMortyContentService> _logger;
        private readonly Guid _charactersPageGuid = Guid.Parse("4759ca40-e9a8-4b4c-9475-e272e7f4f6dd");

        public RickAndMortyContentService(
            IContentService contentService,
            HttpClient httpClient,
            ILogger<RickAndMortyContentService> logger)
        {
            _contentService = contentService;
            _httpClient = httpClient;
            _logger = logger;
        }

        public async Task ImportAllCharactersAsync()
        {
            _logger.LogInformation("ImportAllCharactersAsync method has been called");
            try
            {
                await CreateAndPublishCharacterContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to import Rick and Morty characters.");
                throw;
            }
        }

        public async Task DeleteAllCharactersAsync()
        {
            _logger.LogInformation("DeleteAllCharactersAsync method has been called");
            try
            {
                await DeleteCharacterContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to delete Rick and Morty characters.");
                throw;
            }
        }

        private async Task<List<RickAndMortyCharacter>> GetCharactersFromApi()
        {
            _logger.LogInformation("GetCharactersFromApi method has been called");

            List<RickAndMortyCharacter> charactersList = [];
            string? nextUrl = "https://rickandmortyapi.com/api/character";

            try
            {
                while (!string.IsNullOrEmpty(nextUrl))
                {
                    RickAndMortyApiResponse? response = await _httpClient.GetFromJsonAsync<RickAndMortyApiResponse>(nextUrl);

                    if (response?.Results != null && response.Results.Any())
                    {
                        charactersList.AddRange(response.Results);
                    }

                    nextUrl = response?.Info?.Next;
                }
            }
            catch (HttpRequestException ex)
            {
                _logger.LogError(ex, "Error fetching data from Rick and Morty API.");
                throw;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error while parsing API response.");
                throw;
            }

            _logger.LogInformation($"Retrieved {charactersList.Count} characters from the API");
            return charactersList;
        }

        private async Task CreateAndPublishCharacterContent()
        {
            _logger.LogInformation("CreateAndPublishCharacterContent method has been called");
            List<int> existingCharacterIds = GetIDsOfExistingCharacters();
            List<RickAndMortyCharacter> characters = await GetCharactersFromApi();

            _logger.LogInformation($"There are {existingCharacterIds.Count} existing characters");

            int successfullyImported = 0;
            foreach (RickAndMortyCharacter character in characters)
            {
                try
                {
                    if (existingCharacterIds.Contains(character.Id))
                    {
                        _logger.LogWarning($"Skipping {character.Id} as detected a duplicate");
                        continue;
                    }
                        

                    string contentName = $"{character.Name.ToLower().Replace(" ", "-")}-{character.Id}";

                    IContent? contentObject = _contentService.Create(contentName, _charactersPageGuid, "characterItem");

                    if (contentObject == null)
                    {
                        _logger.LogWarning("Failed to create content object for character: {Name}", character.Name);
                        continue;
                    }

                    contentObject.SetValue("characterName", character.Name);
                    contentObject.SetValue("characterId", character.Id);
                    contentObject.SetValue("characterStatus", character.Status);
                    contentObject.SetValue("characterSpecies", character.Species);
                    contentObject.SetValue("characterType", character.Type);
                    contentObject.SetValue("characterGender", character.Gender);
                    contentObject.SetValue("characterOrigin", character.Origin.Name);
                    contentObject.SetValue("characterLocation", character.Location.Name);
                    contentObject.SetValue("characterImage", character.Image);
                    contentObject.SetValue("characterCreated", character.Created);
                    contentObject.SetValue("characterEpisodeCount", character.Episode.Count);

                    _contentService.Save(contentObject);
                    _contentService.Publish(contentObject, []);
                    successfullyImported++;


                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error processing character: {Id} - {Name}", character.Id, character.Name);
                }
            }

            _logger.LogInformation($"{successfullyImported} characters imported successfully");
        }

        private List<int> GetIDsOfExistingCharacters()
        {
            List<int> dataToReturn;
            _logger.LogInformation("GetIDsOfExistingCharacters method has been called");
            try
            {
                int charactersPageIntId = GetIntIdForCharactersPage();
                dataToReturn = _contentService.GetPagedChildren(
                        charactersPageIntId,
                        pageIndex: 0,
                        pageSize: int.MaxValue,
                        out long _)
                    .Select(x => x.GetValue<int>("characterId"))
                    .ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to fetch existing characters.");
                return [];
            }

            return dataToReturn;
        }

        private int GetIntIdForCharactersPage()
        {
            _logger.LogInformation("GetIntIdForCharactersPage method has been called");
            IContent? content = _contentService.GetById(_charactersPageGuid);
            if (content == null)
                throw new InvalidOperationException($"Character page not found with Guid {_charactersPageGuid}");

            return content.Id;
        }

        private async Task DeleteCharacterContent()
        {
            _logger.LogInformation("DeleteCharacterContent method has been called");
            try
            {
                int charactersPageIntId = GetIntIdForCharactersPage();

                List<IContent> characters = _contentService.GetPagedChildren(
                        charactersPageIntId,
                        pageIndex: 0,
                        pageSize: int.MaxValue,
                        out long _)
                    .ToList();

                foreach (IContent character in characters)
                {
                    _contentService.Delete(character);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to delete character content.");
                throw;
            }
        }
    }
}
