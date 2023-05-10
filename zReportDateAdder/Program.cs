using System.Data;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace zReportDateAdder
{
    public class Program
    {
        private static readonly JsonSerializerOptions options = new()
        {
            WriteIndented = true
        };

        private static void Main(string[] args) 
        {
            UpdateZReportSystem("7210849484");
        }

        public static void CreateGasPricesSystem(string taxId) 
        {
            GasPrice pricesInit = new()
            {
                Date = new DateTime(2023, 3, 19),
                Price = 25.15
            };

            GasPricesSystem gasPricesSystem = new()
            {
                TaxId = taxId,
                GasPrices = new List<GasPrice>() { pricesInit }
            };

            string serialize = JsonSerializer.Serialize(new List<GasPricesSystem>() { gasPricesSystem }, options);
            Console.WriteLine(serialize);
            File.WriteAllText(@"C:\YazarKasa\gasPricesSystem.json", serialize);
        }

        public static void UpdateGasPricesSystem(string taxId)
        {
            string theFileContent = File.ReadAllText(@"C:\YazarKasa\gasPricesSystem.json");
            List<GasPricesSystem>? list = JsonSerializer.Deserialize<List<GasPricesSystem>>(theFileContent);
            GasPricesSystem filteredList = list.Where(x => x.TaxId == taxId).First();
            DateTime? date = filteredList.GasPrices.Last().Date;
            double? price = filteredList.GasPrices.Last().Price;
            Random random = new();

            while (date < DateTime.Now)
            {
                date = date.Value.AddDays(1);
                double newPrice = random.Next(20, 30) + random.NextDouble();
                GasPrice? gasPrice = new()
                {
                    Date = date,
                    Price = Convert.ToDouble(newPrice.ToString("#.##")),
                };
                filteredList.GasPrices.Add(gasPrice);
            }

            list.Where(x => x.TaxId == taxId).ToList()[0] = filteredList;
            string serializedContent = JsonSerializer.Serialize(list, options);
            File.WriteAllText(@"C:\YazarKasa\gasPricesSystem.json", serializedContent);
        }

        public static void UpdateZReportSystem(string taxId) 
        {
            string theFileContent = File.ReadAllText(@"C:\YazarKasa\zReportSystem.json");
            List<InvoiceZReportSystem>? list = JsonSerializer.Deserialize<List<InvoiceZReportSystem>>(theFileContent);
            InvoiceZReportSystem filteredList = list.Where(x => x.TaxId == taxId).First();
            DateTime date = filteredList.UserZReports.Last().DateOfTheIndex;
            int index = filteredList.UserZReports.Last().Index;

            while (date < DateTime.Now) 
            {
                index++;
                date = date.AddDays(1);
                UserZReport user = new()
                {
                    Index = index,
                    DateOfTheIndex = date
                };
                filteredList.UserZReports.Add(user);
            }

            list.Where(x => x.TaxId == taxId).ToList()[0] = filteredList;
            string serializedContent = JsonSerializer.Serialize(list, options);
            File.WriteAllText(@"C:\YazarKasa\zReportSystem.json", serializedContent);
        }

        public static void CreateNewZReportSystem(string taxId) 
        {
            UserZReport user = new()
            {
                Index = 1,
                DateOfTheIndex = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day)
            };

            InvoiceZReportSystem zReportSystem = new()
            {
                TaxId = taxId,
                UserZReports = new List<UserZReport>() { user }
            };

            string serialize = JsonSerializer.Serialize(new List<InvoiceZReportSystem>() { zReportSystem }, options);
            Console.WriteLine(serialize);
            File.WriteAllText(@"C:\YazarKasa\zReportSystem.json", serialize);
        }
    }

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

    [Serializable]
    public class InvoiceZReportSystem
    {
        [JsonPropertyName("TaxId")]
        public string? TaxId { get; set; }

        [JsonPropertyName("InvoiceZReportSystem")]
        public List<UserZReport>? UserZReports { get; set; }
    }

    [Serializable]
    public class UserZReport
    {
        [JsonPropertyName("Index")]
        public int Index { get; set; }

        [JsonPropertyName("DateOfTheIndex")]
        public DateTime DateOfTheIndex { get; set; }
    }
}
