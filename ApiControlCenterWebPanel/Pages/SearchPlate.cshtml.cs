using Microsoft.AspNetCore.Mvc.RazorPages;
using ApiControlCenterWebPanel.Models;
using System.Text;
using Microsoft.AspNetCore.Mvc;

namespace ApiControlCenterWebPanel.Pages
{
    public class SearchPlateModel : PageModel
    {
        public static string? PlateNumber { get; set; }

        public void OnGet()
        {

        }

        public IActionResult OnGetPrintDocument(string theHtmlDocument) 
        {
            string allhtml = @"
                <!DOCTYPE html>
                <html lang=""en"">
                    <head>
                        <meta charset=""utf-8"" />
                        <meta name=""viewport"" content=""width=device-width, initial-scale=1.0"" />
                        <link rel=""stylesheet"" href=""~/css/template.css"" />
                </head>
                <body>
                    " + theHtmlDocument + @"
                </body>
                </html>";

            return new JsonResult(allhtml);
        }
    }
}
