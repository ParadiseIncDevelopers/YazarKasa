using YazarKasaPetrol.Controller;
using YazarKasaPetrol.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Text.Json;

namespace YazarKasaPetrol.Pages
{
    [BindProperties]
    public class GasPricesModel : PageModel
    {
        public static string? TaxNumber 
        {
            get; set;
        }

        [BindProperty]
        public string? Date { get; set; }

        [BindProperty]
        public string? Price { get; set; }

        public IActionResult OnPostAddPriceGas()
        {
            FileWriter writer = FileWriter.GetInstance();
            List<string>? priceElements = Date?.Split('/', '-').ToList();
            for (int i = 0; i < priceElements.Count; i++)
            {
                priceElements[i] = priceElements[i].Trim();
            }

            DateTime firstDate = new(Convert.ToInt32(priceElements?[2]), Convert.ToInt32(priceElements?[1]), Convert.ToInt32(priceElements?[0]));
            DateTime secondDate = new(Convert.ToInt32(priceElements?[5]), Convert.ToInt32(priceElements?[4]), Convert.ToInt32(priceElements?[3]));
            double convertedPrice = Math.Round(Convert.ToDouble(Price.Replace('.',',')), 2);

            if(firstDate <= secondDate) 
            {
                List<GasPricesSystem> gasPricesGetter = Retriever.RetrieveGasPrices();
                DateTime initDate = firstDate;
                List<GasPricesSystem> system = gasPricesGetter.Where(x => x.TaxId == TaxNumber).ToList();

                Dictionary<DateTime?, double?> gasPricesDict;

                if (system.Count != 0)
                {
                    gasPricesDict = system[0].GasPrices.ToDictionary(x => x.Date, y => y.Price);
                }
                else 
                {
                    gasPricesDict = new();
                }

                while (initDate <= secondDate)
                {
                    GasPrice priceContent = new()
                    {
                        Date = initDate,
                        Price = convertedPrice
                    };

                    if (gasPricesDict.ContainsKey(priceContent.Date))
                    {
                        gasPricesDict[priceContent.Date] = priceContent.Price;
                    }
                    else
                    {
                        gasPricesDict.Add(priceContent.Date, priceContent.Price);
                    }
                    initDate = initDate.AddDays(1);
                }

                List<GasPrice> allPrices = new();

                for (int i = 0; i < gasPricesDict.Count; i++)
                {
                    GasPrice price = new()
                    {
                        Date = gasPricesDict.Keys.ToList()[i],
                        Price = gasPricesDict.Values.ToList()[i]
                    };

                    allPrices.Add(price);
                }

                if (system.Count != 0)
                {
                    system[0].GasPrices = allPrices;
                    system[0].GasPrices = system[0].GasPrices.OrderBy(x => x.Date).ToList();
                    gasPricesGetter.Where(x => x.TaxId == TaxNumber).ToList()[0] = system[0];
                    string serializedGasPrices = JsonSerializer.Serialize(gasPricesGetter);
                    writer.WriteData(gasPricesGetter);
                }
                else
                {
                    allPrices = allPrices.OrderBy(x => x.Date).ToList();

                    GasPricesSystem theSystem = new()
                    {
                        TaxId = TaxNumber,
                        GasPrices = allPrices
                    };

                    gasPricesGetter.Add(theSystem);
                    string serializedGasPrices = JsonSerializer.Serialize(gasPricesGetter);
                    writer.WriteData(gasPricesGetter);
                }

                

                return Page();
            }
            else
            {
                return new JsonResult("Error in prices.");
            }
        }

        //
        public void OnGetUpdatePriceGas(string Date, string Price) 
        {
            FileWriter writer = FileWriter.GetInstance();
            List<GasPricesSystem> allPrices = Retriever.RetrieveGasPrices().Where(x => x.TaxId == TaxNumber).ToList();
            string[] splitDate = Date.Split('/');
            double price = Convert.ToDouble(Price.Replace(".", ","));
            DateTime theDate = new(Convert.ToInt32(splitDate[2]), Convert.ToInt32(splitDate[1]), Convert.ToInt32(splitDate[0]));

            allPrices[0].GasPrices.Where(x => x.Date == theDate).ToList()[0].Price = price;
            writer.WriteData(allPrices);
            Page();
        }

        public void OnGet(string taxnumber)
        {
            TaxNumber = taxnumber;
        }
    }
}
