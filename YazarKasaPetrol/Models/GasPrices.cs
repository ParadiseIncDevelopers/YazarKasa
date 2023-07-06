using System.Text.Json.Serialization;

namespace YazarKasaPetrol.Models
{
    [Serializable]
    public class GasPricesSystem
    {
        [JsonPropertyName("TaxId")]
        public string? TaxId { get; set; }

        [JsonPropertyName("GasPrices")]
        public List<GasPrice>? GasPrices { get; set; }
    }

    [Serializable]
    public class GasPrice
    {
        [JsonPropertyName("Date")]
        public DateTime? Date { get; set; }

        [JsonPropertyName("Price")]
        public double? Price { get; set; }
    }
}
