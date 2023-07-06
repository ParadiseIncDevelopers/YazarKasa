using YazarKasaPetrol.Controller;
using YazarKasaPetrol.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Text.Json;

namespace YazarKasaPetrol.Pages
{
    public class LoginModel : PageModel
    {
        public IActionResult OnGet() 
        {
            return Page();
        }

        public IActionResult OnPostAuthenticate(string taxNumber, string password)
        {
            List<SuperAdmin>? db1 = ((CashContent)Retriever.RetrieveTables(Utilities.PATH)).DataContent;

            if (db1.Any(x => x.TaxNumber == taxNumber && x.Password == password))
            {
                AuthType auth = new()
                {
                    IsAdmin = false,
                    IsSuperAdmin = true,
                    IsUser = false,
                    UserCredentialsForInvoice = db1.Find(x => x.TaxNumber == taxNumber)
                };

                auth.CreateAuth();

                return RedirectToPage("Index");
            }
            else
            {
                return Page();
            }
        }

        public IActionResult OnGetRegister(string TaxNumber, string Password, string CashNumber, string GasStationName, string GasType, string CashLetters, string CashId, int ZerosInEku, int ZerosInInvoice, int ZerosInZReport)
        {
            SuperAdmin cash = new()
            {
                TaxNumber = TaxNumber,
                Password = Password,
                CashId = CashId,
                GasStationName = GasStationName.Split("-").ToList(),
                GasType = GasType,
                CashLetters = CashLetters,
                CashTypeName = CashNumber,
                ZerosInEku = ZerosInEku,
                ZerosInInvoices = ZerosInInvoice,
                ZerosInZReports = ZerosInZReport
            };

            JsonSerializerOptions options = new()
            {
                WriteIndented = true
            };
            string serialized = JsonSerializer.Serialize(cash, options);
            List<SuperAdmin> table = (Retriever.RetrieveTables(Utilities.PATH1) as CashContent).DataContent;

            if (!table.Any(x => x.TaxNumber == TaxNumber))
            {
                table.Add(cash);
                FileWriter writer = FileWriter.GetInstance();
                writer.WriteData(table);

                return new JsonResult(serialized);
            }
            else
            {
                return new JsonResult("bu vergi numarasýndan bir kayýt zaten var.");
            }
        }
    }
}
