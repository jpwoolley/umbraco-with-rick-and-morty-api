using System.Collections.Generic;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace JWUmbracoProject.Models
{
    public class RickAndMortyLocation
    {
        [JsonPropertyName("name")]
        public string Name { get; init; }
        [JsonPropertyName("url")]
        public string Url { get; init; }
    }

    //   In future, I could use the type definition below to hold additional data about locations.
    //   This could be used as the data for Location content pages
    //
    //public class RickAndMortyLocation
    //{
    //    [JsonPropertyName("id")]
    //    public int Id { get; set; }
    //    [JsonPropertyName("name")]
    //    public string Name { get; init; }
    //    [JsonPropertyName("type")]
    //    public string? Type { get; init; }
    //    [JsonPropertyName("dimension")]
    //    public string Dimension { get; init; }
    //    public IReadOnlyList<string> Residents { get; init; }
    //    [JsonPropertyName("url")]
    //    public string Url { get; init; }
    //    [JsonPropertyName("created")]
    //    public string Created { get; init; }
    //}
}