using YazarKasaPetrol.Models.Interfaces;
using System.Text.Json.Serialization;

namespace YazarKasaPetrol.Models
{
    [Serializable]
    public class InvoiceZReportSystem
    {
        [JsonPropertyName("TaxId")]
        public string? TaxId { get; set; }

        [JsonPropertyName("InvoiceZReportSystem")]
        public List<UserZReport>? UserZReports { get; set; }
    }

    [Serializable]
    public class UserZReport : ISystemMaker
    {
        [JsonPropertyName("Index")]
        public int Index { get; set; }

        [JsonPropertyName("DateOfTheIndex")]
        public DateTime DateOfTheIndex { get; set; }
    }
}
