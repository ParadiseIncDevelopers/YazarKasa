using YazarKasaPetrol.Controller;
using YazarKasaPetrol.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Text.Json;
using YazarKasaPetrol.Controller.Exceptions;

namespace YazarKasaPetrol.Pages
{
    public class LoginModel : PageModel
    {
        public IActionResult OnGet()
        {
            List<LoginLog> logs = Retriever.RetrieveLogs();
            DateTime? lastLoginDate = logs.Last().LoginDate;
            bool isLoginSuccessful = (bool)logs.Last().IsLoginSuccessful;
            string? AppId = Retriever.RetrieveAppId();
            List<SuperAdmin>? db1 = ((CashContent)Retriever.RetrieveTables(Utilities.PATH)).DataContent;

            if (isLoginSuccessful && lastLoginDate.Value.AddHours(1) > DateTime.Now)
            {
                AuthType auth = new()
                {
                    IsAdmin = false,
                    IsSuperAdmin = true,
                    IsUser = false,
                    UserCredentialsForInvoice = db1.Find(x => x.TaxNumber == AppId)
                };
                auth.CreateAuth();

                return RedirectToPage("Index");
            }
            else 
            {
                return Page();
            }
        }

        public static void WriteLoginContent() 
        {
            string? appId = Retriever.RetrieveAppId();
            AppIdCheckers checkers = new(appId);

            if (checkers.AppIdIsNullOrEmpty())
            {
                ApplicationIdException exception = new("appIdError", 1);
                exception.WriteMessage();
                throw exception;
            }
            else
            {
                
                if (checkers.AppIdEnvironmentKeyIsNotCheck())
                {
                    ApplicationIdException exception = new("appIdError", 2);
                    exception.WriteMessage();
                    throw exception;
                }
                else 
                {
                    //Creates the log
                    LoginLog log = new()
                    {
                        IsLoginSuccessful = true,
                        LoginDate = DateTime.Now
                    };

                    //retrieves all logs
                    List<LoginLog> logs = Retriever.RetrieveLogs();
                    logs.Add(log);

                    //wraps logs into the app logs contents
                    AppLogs app = new()
                    {
                        AllLogins = logs,
                        AppIdNumber = appId
                    };

                    //Writes the new data.
                    FileWriter writer = FileWriter.GetInstance();
                    writer.WriteData(app);
                }
            }
        }

        public IActionResult OnPostAuthenticate(string taxNumber, string password)
        {
            List<SuperAdmin>? db1 = ((CashContent) Retriever.RetrieveTables(Utilities.PATH)).DataContent;

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
                WriteLoginContent();
                return Page();
            }
        }

        public IActionResult OnGetRegister(string TaxNumber, string Password, string cashTypeName, string GasStationName, string GasType, string CashLetters, string CashId, int ZerosInEku, int ZerosInInvoice, int ZerosInZReport)
        {
            SuperAdmin cash = new()
            {
                TaxNumber = TaxNumber,
                Password = Password,
                CashId = CashId,
                GasStationName = GasStationName.Split("-").ToList(),
                GasType = GasType,
                CashLetters = CashLetters,
                CashTypeName = cashTypeName,
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
