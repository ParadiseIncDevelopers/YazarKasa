using ApiControlCenterWebPanel.Controller;
using ApiControlCenterWebPanel.Models;
using ApiControlCenterWebPanel.Models.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Text.Json;

namespace ApiControlCenterWebPanel.Pages
{
    public class ApiTableModel : PageModel
    {
        public static IContent? RetrieveTables(string path, string contentTypeName = "CASH")
        {
            if (contentTypeName == "INVOICE")
            {
                return (InvoiceContent) FileAction.Create(path, "INVOICE");
            }
            else
            {
                return (CashContent) FileAction.Create(path);
                
            }
        }

        //Retrieve all z reports in a list
        public static List<InvoiceZReportSystem> RetrieveZReports()
        {
            return ((ZReportContent) UtilityFileAction.Create(Utilities.PATH3)).DataContent;
        }

        public static void WriteData(List<InvoiceZReportSystem> data) 
        {
            FileAction.Write(Utilities.PATH3, data);
        }

        //Writes data
        public static void WriteData(List<Admin> data, int index = 1)
        {
            FileAction.Write(Utilities.PATH1, data);
        }

        //Writes data in superadmin list
        public static void WriteData(List<SuperAdmin> data) 
        {
            FileAction.Write(Utilities.PATH, data);
        }

        //Writes user invoices in a list
        public static void WriteData(List<UserInvoiceContainer> data)
        {
            FileAction.Write(Utilities.PATH2, data);
        }

        public IActionResult OnGetUpdateGasPrices(string TaxNumber, double Price, string Date) 
        {
            //Gets all gas prices
            List<GasPricesSystem> gasPricesGetter = GasPricesModel.RetrieveGasPrices();

            if (gasPricesGetter.Any(x => x.TaxId == TaxNumber))
            {
                GasPrice price = new()
                {
                    Price = Price,
                    Date = InvoiceChecker.DateTimeConverter(Date)
                };

                List<GasPrice> allGasPrices = gasPricesGetter.Where(x => x.TaxId == TaxNumber).ToList()[0].GasPrices;

                DateTime today = new(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day);

                if (price.Date > today)
                {
                    return Page();
                }
                else if (allGasPrices.Any(x => x.Date != today) && price.Date == today.AddDays(1))
                {
                    gasPricesGetter.Where(x => x.TaxId == TaxNumber).ToList()[0].GasPrices.Add(price);

                    JsonSerializerOptions option = new()
                    {
                        WriteIndented = true
                    };

                    string serialize = JsonSerializer.Serialize(gasPricesGetter, option);
                    System.IO.File.WriteAllText(Utilities.PATH4, serialize);
                    return new JsonResult(serialize);
                }
                else 
                {
                    return Page();
                }
            }
            else 
            {
                return Page();
            }
        }

        public IActionResult OnGetAddInvoice(string TaxNumber, string Litre, string BirimFiyat, string Tarih, string Saat, string ZRaporuNo, string EkuNo, string FisNo, string TabancaNo, string PlakaNo, string PompaNo)
        {
            Invoice invoice = new()
            {
                Litre = Convert.ToDouble(Litre.Replace(".",",")),
                BirimFiyat = Convert.ToDouble(BirimFiyat.Replace(".", ",")),
                Tarih = InvoiceChecker.DateTimeConverter(Tarih, Saat),
                ZRaporuNo = ZRaporuNo,
                EkuNo = EkuNo,
                FisNo = FisNo,
                TabancaNo = TabancaNo,
                PlakaNo = PlakaNo,
                PompaNo = PompaNo
            };
            JsonSerializerOptions options = new()
            {
                WriteIndented = true
            };

            invoice.CalculateTotalPrice();
            invoice.CalculateTotalPriceWithVAT();

            string serialized = JsonSerializer.Serialize(invoice, options);
            List<UserInvoiceContainer>? table = (RetrieveTables(Utilities.PATH2, "INVOICE") as InvoiceContent).DataContent;
            InvoiceChecker invoiceChecker = new(table.Where(x => x.TaxId == TaxNumber).ToList()[0], RetrieveZReports());
            bool checker(UserInvoiceContainer x)
            {
                if (x.Invoices.Any(y => y.FisNo == invoice.FisNo) || x.Invoices.Any(y => y.Tarih == invoice.Tarih))
                {
                    return false;
                }
                else
                {
                    List<Invoice> subInvoiceContainer = new();
                    foreach (Invoice inv in x.Invoices)
                    {
                        if (inv.Tarih < invoice.Tarih)
                        {
                            subInvoiceContainer.Add(inv);
                        }
                        else
                        {
                            subInvoiceContainer.Add(inv);
                            break;
                        }
                    }

                    if (subInvoiceContainer.Count == 1)
                    {
                        return Convert.ToInt32(subInvoiceContainer[0].FisNo) > Convert.ToInt32(invoice.FisNo);
                    }
                    else if (subInvoiceContainer.Count == x.Invoices.Count)
                    {
                        return Convert.ToInt32(invoice.FisNo) > Convert.ToInt32(subInvoiceContainer[^1].FisNo);
                    }
                    else
                    {
                        return Convert.ToInt32(subInvoiceContainer[^2].FisNo) < Convert.ToInt32(invoice.FisNo) && Convert.ToInt32(invoice.FisNo) < Convert.ToInt32(subInvoiceContainer[^1].FisNo);
                    }
                }
            }
            bool invoiceIdCheck = table.All(x => checker(x));
            bool zReportCheck = invoiceChecker.CheckInvoiceZReportId(TaxNumber, invoice);
            invoiceChecker.SetZerosForInvoice((RetrieveTables(Utilities.PATH) as CashContent).DataContent);
            invoice.EkuNo = invoiceChecker.ConvertedEkuNumber;
            invoice.ZRaporuNo = invoiceChecker.ConvertedZReportNumber;
            invoice.FisNo = invoiceChecker.ConvertedInvoiceNumber;
            if (!invoiceIdCheck)
            {
                return new JsonResult("Bu fiş no uyumsuz, Lütfen tekrar deneyiniz.");
            }
            else if (!zReportCheck)
            {
                return new JsonResult("Z raporu no tarihi ile uyumsuz. Lütfen tekrar deneyiniz.");
            }
            else 
            {
                UserInvoiceContainer invoiceContainer = new()
                {
                    Invoices = table.Where(x => x.TaxId == TaxNumber).ToList()[0].Invoices,
                    TaxId = TaxNumber
                };

                invoiceContainer.Invoices.Add(invoice);
                List<Invoice> groupedInvoices = invoiceContainer.Invoices.OrderBy(x => x.Tarih).ToList();
                invoiceContainer.Invoices = groupedInvoices;

                List<UserInvoiceContainer> returnElement = new();
                if (table.Any(x => x.TaxId != TaxNumber))
                {
                    table?.Add(invoiceContainer);
                }
                else 
                {
                    returnElement = table.Where(x => x.TaxId == TaxNumber).ToList();
                    returnElement[0].Invoices = groupedInvoices;

                    table = table.Union(returnElement).ToList();
                }
                
                WriteData(table);

                //buradan devam. printer lib bulunacak.

                return new JsonResult(serialized);
            }
        }

        public IActionResult OnGetAddCash(string StartDate, string taxNumber, string cashNumber, string gasStationName, string gasType, string cashLetters, string cashId, int zerosInInvoice, int zerosInZReport, int zerosInEku, int zReportIndex)
        {
            AdminModel cash = new()
            {
                TaxNumber = taxNumber,
                CashId = cashId,
                GasStationName = gasStationName.Split("-").ToList(),
                GasType = gasType,
                CashLetters = cashLetters,
                CashTypeName = cashNumber,
                ZerosInEku = zerosInEku,
                ZerosInInvoices = zerosInInvoice,
                ZerosInZReports = zerosInZReport
            };

            Admin admin = new()
            {
                AdminTaxNumber = AuthType.TheCurrentAuth.UserCredentialsForInvoice.TaxNumber,
                AdminModel = cash
            };

            JsonSerializerOptions options = new()
            {
                WriteIndented = true
            };

            string[] theDate = StartDate.Split("/");
            int z = zReportIndex;

            DateTime time = new(Convert.ToInt32(theDate[2]), Convert.ToInt32(theDate[1]), Convert.ToInt32(theDate[0]));

            InvoiceZReportSystem system = new()
            {
                TaxId = taxNumber,
                UserZReports = new()
            };

            while (z >= 0) 
            {
                UserZReport report = new()
                {
                    Index = z,
                    DateOfTheIndex = time
                };
                system.UserZReports.Add(report);
                z--;
                time = time.AddDays(-1);
            }

            //Writes the z report numbers in the z report system.
            List<InvoiceZReportSystem> allZreports = RetrieveZReports();
            allZreports.Add(system);
            WriteData(allZreports);

            string serialized = JsonSerializer.Serialize(cash, options);
            List<Admin>? table = (RetrieveTables(Utilities.PATH1) as CashContent)?.DataContent_1;

            if (table == null) 
            {
                table = new()
                {
                    admin
                };
                WriteData(table);
                return new JsonResult(serialized);
            }

            if (!table.Any(x => x.AdminTaxNumber == taxNumber))
            {
                table.Add(admin);
                WriteData(table);
                return new JsonResult(serialized);
            }
            else
            {
                return new JsonResult("bu vergi numarasından bir kayıt zaten var.");
            }
        }

        public void OnGetDeleteAdmin(int index)
        {
            List<SuperAdmin> table = (RetrieveTables(Utilities.PATH) as CashContent).DataContent;
            table.RemoveAt(index - 1);
            WriteData(table);
        }

        public IActionResult OnGetUpdateIndex(int index)
        {
            SuperAdmin table = (RetrieveTables(Utilities.PATH) as CashContent).DataContent[index - 1];
            JsonSerializerOptions options = new()
            {
                WriteIndented = true
            };
            string serialized = JsonSerializer.Serialize(table, options);
            return new JsonResult(serialized);
        }

        public IActionResult OnGetUpdateSuperAdmin(string GasType, string Password, string CashType, string ZerosInEku, string ZerosInInvoices,  string ZerosInZReports, string TaxNumber)
        {
            List<SuperAdmin> table = (RetrieveTables(Utilities.PATH) as CashContent).DataContent;
            SuperAdmin theCash = table.Where(x => x.TaxNumber == TaxNumber).ToList()[0];

            theCash.GasType = GasType;
            theCash.Password = Password;
            theCash.CashTypeName = CashType;
            theCash.ZerosInEku = Convert.ToInt32(ZerosInEku);
            theCash.ZerosInInvoices = Convert.ToInt32(ZerosInInvoices);
            theCash.ZerosInZReports = Convert.ToInt32(ZerosInZReports);

            table.Where(x => x.TaxNumber == TaxNumber).ToList()[0] = theCash;
            WriteData(table);

            return new JsonResult(JsonSerializer.Serialize(table));
        }

        public IActionResult OnGetUpdateAdmin(string GasType, string CashType, string ZerosInEku, string ZerosInInvoices, string ZerosInZReports, string TaxNumber)
        {
            List<Admin> table = (RetrieveTables(Utilities.PATH1) as CashContent).DataContent_1;
            Admin theCash = table.Where(x => x.AdminTaxNumber == TaxNumber).ToList()[0];

            theCash.AdminModel.GasType = GasType;
            theCash.AdminModel.CashTypeName = CashType;
            theCash.AdminModel.ZerosInEku = Convert.ToInt32(ZerosInEku);
            theCash.AdminModel.ZerosInInvoices = Convert.ToInt32(ZerosInInvoices);
            theCash.AdminModel.ZerosInZReports = Convert.ToInt32(ZerosInZReports);

            table.Where(x => x.AdminModel.TaxNumber == TaxNumber).ToList()[0] = theCash;
            WriteData(table);

            return new JsonResult(JsonSerializer.Serialize(table));
        }

        public IActionResult OnGetTaxNumberInvoiceMaker(string taxNumber) 
        {
            ViewData["TaxNumberGetter"] = taxNumber;

            ViewData["GasPricesList"] = GasPricesModel.RetrieveGasPrices().Where(x => x.TaxId == taxNumber).ToList();

            return new JsonResult(JsonSerializer.Serialize(ViewData["GasPricesList"]));
        }

        public IActionResult OnGetCashZerosForInvoice(string taxNumber) 
        {
            var theCashZeros = (RetrieveTables(Utilities.PATH) as CashContent).DataContent.Where(x => x.TaxNumber == taxNumber).ToList()[0];
            string theCashInJson = JsonSerializer.Serialize(theCashZeros);
            return new JsonResult(theCashZeros);
        }

        public IActionResult OnPostSearchPlate() 
        {
            SearchPlateModel.PlateNumber = Request.Form["plateNumber"].ToString().Trim();
            return RedirectToPage("/SearchPlate");
        }
    }
}