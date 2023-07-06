using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace YazarKasaPetrol.Pages
{
    public class GasStationInvoicesModel : PageModel
    {
        public static string? TaxNumber { get; set; }

        public void OnGet(string taxnumber)
        {
            TaxNumber = taxnumber;
        }
    }
}
