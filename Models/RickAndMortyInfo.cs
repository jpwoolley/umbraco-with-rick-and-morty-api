// refer to https://rickandmortyapi.com/documentation/#info-and-pagination

using System.Text.Json.Serialization;

namespace JWUmbracoProject.Models
{
    public record RickAndMortyInfo
    {
        [JsonPropertyName("count")]
        public int Count { get; init; }
        [JsonPropertyName("pages")]
        public int Pages { get; init; }
        [JsonPropertyName("next")]
        public string? Next { get; init; }
        [JsonPropertyName("prev")]
        public string? Prev { get; init; }
    }
}
