using YazarKasaPetrol.Models.Interfaces;
using System.Text.Json.Serialization;

namespace YazarKasaPetrol.Models
{
    [Serializable]
    public class Invoice 
    {
        [JsonPropertyName("Litre")]
        public double Litre { get; set; }
        [JsonPropertyName("BirimFiyat")]
        public double BirimFiyat { get; set; }
        [JsonPropertyName("TotalFiyat")]
        public double TotalFiyat { get; set; }
        [JsonPropertyName("KdvTotalFiyat")]
        public double KdvTotalFiyat { get; set; }
        [JsonPropertyName("Tarih")]
        public DateTime? Tarih { get; set; }
        [JsonPropertyName("ZRaporuNo")]
        public string? ZRaporuNo { get; set; }
        [JsonPropertyName("EkuNo")]
        public string? EkuNo { get; set; }
        [JsonPropertyName("FisNo")]
        public string? FisNo { get; set; }
        [JsonPropertyName("TabancaNo")]
        public string? TabancaNo { get; set; }
        [JsonPropertyName("PlakaNo")]
        public string? PlakaNo { get; set; }
        [JsonPropertyName("PompaNo")]
        public string? PompaNo { get; set; }

        public void CalculateTotalPrice()
        {
            TotalFiyat = Math.Round(Litre * BirimFiyat, 2);
        }

        public void CalculateTotalPriceWithVAT()
        {
            KdvTotalFiyat = Math.Round(TotalFiyat + (TotalFiyat / 100 * 18), 2);
        }
    }

    [Serializable]
    public class UserInvoiceContainer 
    {
        [JsonPropertyName("TaxId")]
        public string? TaxId { get; set; }

        [JsonPropertyName("Invoices")]
        public List<Invoice>? Invoices { get; set; }
    }
}
