using ApiControlCenterWebPanel.Models.Interfaces;
using System.Text.Json.Serialization;

namespace ApiControlCenterWebPanel.Models
{
    [Serializable]
    public class Admin 
    {
        [JsonPropertyName("AdminTaxNumber")]
        public string AdminTaxNumber { get; set; }
        [JsonPropertyName("AdminModel")]
        public AdminModel AdminModel { get; set; }
    }

    [Serializable]
    public class AdminModel : IModelElement
    {
        [JsonPropertyName("TaxNumber")]
        public string? TaxNumber { get; set; }

        [JsonPropertyName("CashTypeName")]
        public string? CashTypeName { get; set; }
        [JsonPropertyName("GasStationName")]
        public List<string>? GasStationName { get; set; }
        [JsonPropertyName("GasType")]
        public string? GasType { get; set; }
        [JsonPropertyName("CashLetters")]
        public string? CashLetters { get; set; }
        [JsonPropertyName("CashNumber")]
        public string? CashId { get; set; }
        [JsonPropertyName("ZerosInInvoices")]
        public int? ZerosInInvoices { get; set; }
        [JsonPropertyName("ZerosInEku")]
        public int? ZerosInEku { get; set; }
        [JsonPropertyName("ZerosInZReports")]
        public int? ZerosInZReports { get; set; }
    }
}
