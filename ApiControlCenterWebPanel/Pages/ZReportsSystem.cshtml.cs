using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace ApiControlCenterWebPanel.Pages
{
    public class ZReportsSystemModel : PageModel
    {
        public static string? TaxNumber { get; set; }

        public void OnGet(string taxnumber)
        {
            TaxNumber = taxnumber;
        }
    }
}
