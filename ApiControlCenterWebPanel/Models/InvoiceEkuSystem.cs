using ApiControlCenterWebPanel.Models.Interfaces;
using System.Text.Json.Serialization;

namespace ApiControlCenterWebPanel.Models
{
    [Serializable]
    public class InvoiceEkuSystem
    {
        [JsonPropertyName("TaxId")]
        public string? TaxId { get; set; }

        [JsonPropertyName("EkuList")]
        public List<UserEku>? EkuList { get; set; }
    }

    [Serializable]
    public class UserEku : ISystemMaker
    {
        [JsonPropertyName("Index")]
        public int Index { get; set; }

        [JsonPropertyName("DateOfTheIndex")]
        public DateTime DateOfTheIndex { get; set; }
    }
}
