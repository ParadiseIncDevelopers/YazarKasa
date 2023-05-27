using ApiControlCenterWebPanel.Controller;
using ApiControlCenterWebPanel.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Text.Json;

namespace ApiControlCenterWebPanel.Pages
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

        //Retrieves all gas prices in a list
        public static List<GasPricesSystem> RetrieveGasPrices()
        {
            return ((GasPriceContent)UtilityFileAction.Create(Utilities.PATH4, "GAS_PRICES")).DataContent;
        }

        //
        public IActionResult OnPostAddPriceGas()
        {
            //^(([0-3][0-9])\/([0-1][0-9])\/(20\d{2})\s\-\s([0-3][0-9])\/([0-1][0-9])\/(20\d{2}))$

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
                List<GasPricesSystem> gasPricesGetter = RetrieveGasPrices();
                DateTime initDate = firstDate;
                GasPricesSystem system = gasPricesGetter.Where(x => x.TaxId == TaxNumber).ToList()[0];
                var gasPricesDict = system.GasPrices.ToDictionary(x => x.Date, y => y.Price);

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

                system.GasPrices = allPrices;
                system.GasPrices = system.GasPrices.OrderBy(x => x.Date).ToList();
                gasPricesGetter.Where(x => x.TaxId == TaxNumber).ToList()[0] = system;
                string serializedGasPrices = JsonSerializer.Serialize(gasPricesGetter);
                WriteData(gasPricesGetter);

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
            List<GasPricesSystem> allPrices = RetrieveGasPrices().Where(x => x.TaxId == TaxNumber).ToList();
            string[] splitDate = Date.Split('/');
            double price = Convert.ToDouble(Price.Replace(".", ","));
            DateTime theDate = new(Convert.ToInt32(splitDate[2]), Convert.ToInt32(splitDate[1]), Convert.ToInt32(splitDate[0]));

            allPrices[0].GasPrices.Where(x => x.Date == theDate).ToList()[0].Price = price;
            WriteData(allPrices);
            Page();
        }

        //Writes gas prices data 
        public static void WriteData(List<GasPricesSystem> data)
        {
            FileAction.Write(Utilities.PATH4, data);
        }

        public void OnGet(string taxnumber)
        {
            TaxNumber = taxnumber;
        }
    }
}
