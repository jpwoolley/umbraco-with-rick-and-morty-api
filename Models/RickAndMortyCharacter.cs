// refer to https://rickandmortyapi.com/documentation/#character-schema

using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace JWUmbracoProject.Models
{
    public record RickAndMortyCharacter
    {
        [JsonPropertyName("id")]
        public int Id { get; init; }
        [JsonPropertyName("name")]
        public string Name { get; init; }
        [JsonPropertyName("status")]
        public string Status { get; init; }
        [JsonPropertyName("species")]
        public string Species { get; init; }
        [JsonPropertyName("type")]
        public string? Type { get; init; }
        [JsonPropertyName("gender")]
        public string Gender { get; init; }
        [JsonPropertyName("origin")]
        public RickAndMortyLocation Origin { get; init; }
        [JsonPropertyName("location")]
        public RickAndMortyLocation Location { get; init; }
        [JsonPropertyName("image")]
        public string Image { get; init; }
        [JsonPropertyName("episode")]
        public IReadOnlyList<string> Episode { get; init; }
        [JsonPropertyName("url")]
        public string Url { get; init; }
        [JsonPropertyName("created")]
        public string Created { get; init; }
    }
}
