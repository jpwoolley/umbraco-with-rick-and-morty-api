// refer to https://rickandmortyapi.com/documentation/#info-and-pagination

using System.Text.Json.Serialization;

namespace JWUmbracoProject.Models
{
    public record RickAndMortyApiResponse
    {
        [JsonPropertyName("info")]
        public RickAndMortyInfo Info { get; init; }
        [JsonPropertyName("results")]
        public IReadOnlyList<RickAndMortyCharacter>? Results { get; init; }
    }
}
