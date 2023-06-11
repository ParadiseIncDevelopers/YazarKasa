using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using ApiControlCenterWebPanel.Models;
using System.Text.Json;

namespace ApiControlCenterWebPanel.Pages
{
    [BindProperties]
    public class EkuSystemModel : PageModel
    {
        public static string? TaxNumber { get; set; }

        public void OnGet(string taxnumber)
        {
            TaxNumber = taxnumber;
        }

        [BindProperty]
        public string? Date { get; set; }

        [BindProperty]
        public string? Price { get; set; }

        public IActionResult OnPostAddEku() 
        {
            List<string>? dateElements = Date?.Split('/', '-').ToList();
            for (int i = 0; i < dateElements.Count; i++)
            {
                dateElements[i] = dateElements[i].Trim();
            }

            List<InvoiceEkuSystem> allEku = ApiTableModel.RetrieveEkuList();
            InvoiceEkuSystem filteredEku = allEku.Where(x => x.TaxId == TaxNumber).ToList()[0];

            DateTime theDate = new(Convert.ToInt32(dateElements?[2]), Convert.ToInt32(dateElements?[1]), Convert.ToInt32(dateElements?[0]));

            if (filteredEku.EkuList.Any(x => x.DateOfTheIndex != theDate))
            {
                UserEku eku = new() 
                {
                    Index = filteredEku.EkuList.Last().Index + 1,
                    DateOfTheIndex = theDate
                };
                filteredEku.EkuList.Add(eku);
                allEku.Where(x => x.TaxId == TaxNumber).ToList()[0] = filteredEku;
                ApiTableModel.WriteData(allEku);

                return Page();
            }
            else 
            {
                return Page();
            }
        }
    }
}
