using YazarKasaPetrol.Controller;
using YazarKasaPetrol.Models;
using YazarKasaPetrol.Models.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Text.Json;

namespace YazarKasaPetrol.Pages
{
    public class ApiTableModel : PageModel
    {
        public static int? LoadingIndex { get; set; }

        public void OnGet() 
        {
            if (LoadingIndex == null)
            {
                LoadingIndex = 0;
            }
            else if (LoadingIndex == 0) 
            {
                LoadingIndex++;
            }
            else 
            {

            }
        }

        public IActionResult OnGetUpdateGasPrices(string TaxNumber, double Price, string Date)
        {
            //Gets all gas prices
            List<GasPricesSystem> gasPricesGetter = Retriever.RetrieveGasPrices();

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
                Litre = Convert.ToDouble(Litre.Replace(".", ",")),
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
            List<UserInvoiceContainer>? table = (Retriever.RetrieveTables(Utilities.PATH2, "INVOICE") as InvoiceContent).DataContent;
            bool userEmpty = table.Where(x => x.TaxId == TaxNumber).ToList().Count == 0;

            string invWriter;

            string InvoiceWriter() 
            {
                UserInvoiceContainer invoiceContainer;
                try
                {
                    invoiceContainer = new()
                    {
                        Invoices = table.Where(x => x.TaxId == TaxNumber).ToList()[0].Invoices,
                        TaxId = TaxNumber
                    };
                }
                catch 
                {
                    invoiceContainer = new()
                    {
                        Invoices = new List<Invoice>(),
                        TaxId = TaxNumber
                    };
                }
                

                invoiceContainer.Invoices.Add(invoice);
                List<Invoice> orderedInvoices = invoiceContainer.Invoices.OrderBy(x => x.Tarih).ToList();
                invoiceContainer.Invoices = orderedInvoices;
                List<UserInvoiceContainer> returnElement = new();

                if (!table.Any(x => x.TaxId == TaxNumber))
                {
                    table?.Add(invoiceContainer);
                }
                else
                {
                    table.Where(x => x.TaxId == TaxNumber).ToList()[0].Invoices = orderedInvoices;
                }


                FileWriter writer = FileWriter.GetInstance();
                writer.WriteData(table);

                return serialized;
            }

            if (userEmpty)
            {
                invWriter = InvoiceWriter();
                return new JsonResult(invWriter);
            }
            else 
            {
                InvoiceChecker invoiceChecker = new(invoice, Retriever.RetrieveZReports());
                List<Invoice>? container = table.Where(x => x.TaxId == TaxNumber).ToList()[0].Invoices;
                var groupedInvoices = container.GroupBy(x => new DateTime(x.Tarih.Value.Year, x.Tarih.Value.Month, x.Tarih.Value.Day)).ToList();
                var hasDate = groupedInvoices.Any(x => x.Any(y => new DateTime(y.Tarih.Value.Year, y.Tarih.Value.Month, y.Tarih.Value.Day) == new DateTime(invoice.Tarih.Value.Year, invoice.Tarih.Value.Month, invoice.Tarih.Value.Day)));

                void SetZeros() 
                {
                    List<SuperAdmin> ad1 = (Retriever.RetrieveTables(Utilities.PATH) as CashContent).DataContent;
                    List<Admin> ad2 = (Retriever.RetrieveTables(Utilities.PATH1) as CashContent).DataContent_1;

                    bool isSuperAdmin = ad1.Any(x => x.TaxNumber == TaxNumber);

                    if (isSuperAdmin)
                    {
                        invoiceChecker.SetZerosForInvoice(ad1, TaxNumber);
                    }
                    else
                    {
                        invoiceChecker.SetZerosForInvoice(ad2, TaxNumber);
                    }

                    invoice.EkuNo = invoiceChecker.ConvertedEkuNumber;
                    invoice.ZRaporuNo = invoiceChecker.ConvertedZReportNumber;
                    invoice.FisNo = invoiceChecker.ConvertedInvoiceNumber;
                }

                if (!hasDate)
                {
                    SetZeros();
                    invWriter = InvoiceWriter();
                    return new JsonResult(invWriter);
                }
                else 
                {
                    var filteredGrouping = groupedInvoices.Where(x => x.Any(y => new DateTime(y.Tarih.Value.Year, y.Tarih.Value.Month, y.Tarih.Value.Day) == new DateTime(invoice.Tarih.Value.Year, invoice.Tarih.Value.Month, invoice.Tarih.Value.Day))).ToList()[0].OrderBy(z => z.Tarih).ToList();

                    if (filteredGrouping.Any(x => Convert.ToInt32(x.FisNo) == Convert.ToInt32(invoice.FisNo)))
                    {
                        return new JsonResult("Bu fiş no'dan zaten var. Lütfen tekrar deneyin.");
                    }
                    else 
                    {
                        for (int i = 0; i < filteredGrouping.Count; i++)
                        {
                            int index = Convert.ToInt32(filteredGrouping[i].FisNo);
                            int invoiceIndex = Convert.ToInt32(invoice.FisNo);

                            if (index < invoiceIndex && i != filteredGrouping.Count - 1)
                            {
                                continue;
                            }
                            else
                            {
                                if (i == 0)
                                {
                                    if (filteredGrouping[i].Tarih < invoice.Tarih)
                                    {
                                        if (index > invoiceIndex)
                                        {
                                            //false
                                            return new JsonResult("Fiş no saatleri uyuşmuyor. Lütfen Tekrar deneyin.");
                                        }
                                        else //<
                                        {
                                            //true
                                            SetZeros();
                                            invWriter = InvoiceWriter();
                                            return new JsonResult(invWriter);
                                        }
                                    }
                                    else 
                                    {
                                        if (index > invoiceIndex)
                                        {
                                            //true
                                            SetZeros();
                                            invWriter = InvoiceWriter();
                                            return new JsonResult(invWriter);
                                        }
                                        else //<
                                        {
                                            //false
                                            return new JsonResult("Fiş no saatleri uyuşmuyor. Lütfen Tekrar deneyin.");
                                        }
                                    }
                                }
                                else if (i == filteredGrouping.Count - 1)
                                {
                                    if (filteredGrouping[i].Tarih < invoice.Tarih)
                                    {
                                        if (index > invoiceIndex)
                                        {
                                            //false
                                            return new JsonResult("Fiş no saatleri uyuşmuyor. Lütfen Tekrar deneyin.");
                                        }
                                        else //<
                                        {
                                            //true
                                            SetZeros();
                                            invWriter = InvoiceWriter();
                                            return new JsonResult(invWriter);
                                        }
                                    }
                                    else
                                    {
                                        if (index > invoiceIndex)
                                        {
                                            //true
                                            SetZeros();
                                            invWriter = InvoiceWriter();
                                            return new JsonResult(invWriter);
                                        }
                                        else //<
                                        {
                                            //false
                                            return new JsonResult("Fiş no saatleri uyuşmuyor. Lütfen Tekrar deneyin.");
                                        }
                                    }
                                }
                                else 
                                {
                                    if (filteredGrouping[i].Tarih < invoice.Tarih)
                                    {
                                        if (index > invoiceIndex)
                                        {
                                            //false
                                            return new JsonResult("Fiş no saatleri uyuşmuyor. Lütfen Tekrar deneyin.");
                                        }
                                        else //<
                                        {
                                            //true
                                            SetZeros();
                                            invWriter = InvoiceWriter();
                                            return new JsonResult(invWriter);
                                        }
                                    }
                                    else
                                    {
                                        if (index > invoiceIndex)
                                        {
                                            //true
                                            SetZeros();
                                            invWriter = InvoiceWriter();
                                            return new JsonResult(invWriter);
                                        }
                                        else //<
                                        {
                                            //false
                                            return new JsonResult("Fiş no saatleri uyuşmuyor. Lütfen Tekrar deneyin.");
                                        }
                                    }
                                }
                            }
                        }
                    }
                    return new JsonResult("");
                }
            }
        }

        public IActionResult OnGetAddCash(string StartDate, string taxNumber, string cashTypeName, string gasStationName, string gasType, string cashLetters, string cashId, int zerosInInvoice, int zerosInZReport, int zerosInEku, int zReportIndex, int lastEkuNumber, int weaponNumber, int pumpNumber)
        {
            AdminModel cash = new()
            {
                TaxNumber = taxNumber,
                CashId = cashId,
                GasStationName = gasStationName.Split("µ").ToList(),
                GasType = gasType,
                CashLetters = cashLetters,
                CashTypeName = cashTypeName,
                ZerosInEku = zerosInEku,
                ZerosInInvoices = zerosInInvoice,
                ZerosInZReports = zerosInZReport,
                PumpNumber = pumpNumber.ToString(),
                WeaponNumber = weaponNumber.ToString()
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

            system.UserZReports.Reverse();

            InvoiceEkuSystem ekuSystem = new()
            {
                TaxId = taxNumber,
                EkuList = new()
            };
            UserEku eku = new()
            {
                Index = lastEkuNumber,
                DateOfTheIndex = DateTime.Now
            };
            ekuSystem.EkuList.Add(eku);

            //Writes the z report numbers in the z report system.
            List<InvoiceZReportSystem> allZreports = Retriever.RetrieveZReports();
            allZreports.Add(system);

            //Writes eku Number
            List<InvoiceEkuSystem> allEkuNumbers = Retriever.RetrieveEkuList();
            allEkuNumbers.Add(ekuSystem);

            string serialized = JsonSerializer.Serialize(cash, options);
            List<Admin>? table = (Retriever.RetrieveTables(Utilities.PATH1) as CashContent)?.DataContent_1;

            FileWriter writer = FileWriter.GetInstance();

            if (table == null)
            {
                table = new()
                {
                    admin
                };
                writer.WriteData(table);
                return new JsonResult(serialized);
            }

            if (!table.Any(x => x.AdminTaxNumber == taxNumber))
            {
                table.Add(admin);
                writer.WriteData(table);
                writer.WriteData(allZreports);
                writer.WriteData(allEkuNumbers);
                return new JsonResult(serialized);
            }
            else
            {
                return new JsonResult("bu vergi numarasından bir kayıt zaten var.");
            }
        }

        public IActionResult OnGetUpdateIndex(int index)
        {
            SuperAdmin table = (Retriever.RetrieveTables(Utilities.PATH) as CashContent).DataContent[index - 1];
            JsonSerializerOptions options = new()
            {
                WriteIndented = true
            };
            string serialized = JsonSerializer.Serialize(table, options);
            return new JsonResult(serialized);
        }

        public IActionResult OnGetUpdateSuperAdmin(string TaxNumber, string GasType, string CashTypeName, string UpdateCashStationName, string CashLetters, string CashId,  string ZerosInEku, string ZerosInZReports, string ZerosInInvoices, string WeaponNumber, string PumpNumber)
        {
            List<SuperAdmin> table = (Retriever.RetrieveTables(Utilities.PATH) as CashContent).DataContent;
            SuperAdmin theCash = table.Where(x => x.TaxNumber == TaxNumber).ToList()[0];

            theCash.GasType = GasType;
            theCash.Password = theCash.Password;
            theCash.CashTypeName = CashTypeName;
            theCash.GasStationName = UpdateCashStationName.Split("µ").ToList();
            theCash.CashLetters = CashLetters;
            theCash.CashId = CashId;
            theCash.ZerosInEku = Convert.ToInt32(ZerosInEku);
            theCash.ZerosInInvoices = Convert.ToInt32(ZerosInInvoices);
            theCash.ZerosInZReports = Convert.ToInt32(ZerosInZReports);
            theCash.WeaponNumber = WeaponNumber;
            theCash.PumpNumber = PumpNumber;
            table.Where(x => x.TaxNumber == TaxNumber).ToList()[0] = theCash;
            FileWriter writer = FileWriter.GetInstance();

            writer.WriteData(table);

            return new JsonResult(JsonSerializer.Serialize(table));
        }

        public IActionResult OnGetUpdateAdmin(string TaxNumber, string GasType, string CashTypeName, string UpdateCashStationName, string CashLetters, string CashId, string ZerosInEku, string ZerosInZReports, string ZerosInInvoices, string WeaponNumber, string PumpNumber)
        {
            List<Admin> table = (Retriever.RetrieveTables(Utilities.PATH1) as CashContent).DataContent_1;
            Admin theCash = table.Where(x => x.AdminModel.TaxNumber == TaxNumber).ToList()[0];

            AdminModel mod = theCash.AdminModel;

            mod.GasType = GasType;
            mod.CashTypeName = CashTypeName;
            mod.GasStationName = UpdateCashStationName.Split("µ").ToList();
            mod.CashLetters = CashLetters;
            mod.CashId = CashId;
            mod.ZerosInEku = Convert.ToInt32(ZerosInEku);
            mod.ZerosInInvoices = Convert.ToInt32(ZerosInInvoices);
            mod.ZerosInZReports = Convert.ToInt32(ZerosInZReports);
            mod.WeaponNumber = WeaponNumber;
            mod.PumpNumber = PumpNumber;
            table.Where(x => x.AdminModel.TaxNumber == TaxNumber).ToList()[0] = theCash;
            FileWriter writer = FileWriter.GetInstance();
            writer.WriteData(table);

            return new JsonResult(JsonSerializer.Serialize(table));
        }

        public IActionResult OnGetTaxNumberInvoiceMaker(string taxNumber)
        {
            ViewData["TaxNumberGetter"] = taxNumber;

            List<GasPricesSystem> allPrices = Retriever.RetrieveGasPrices().Where(x => x.TaxId == taxNumber).ToList();

            if (allPrices.Count == 0)
            {
                return new JsonResult("Benzin istasyonu için fiyatlar bulunamadı. Lütfen fiyatları güncelleyiniz.");
            }
            else
            {
                Utilities.ChosenTaxNumber = taxNumber;
                string jsonData = JsonSerializer.Serialize(allPrices);
                Utilities.JsonData = jsonData;

                return new JsonResult(jsonData);
            }
        }

        public IActionResult OnGetCashZerosForInvoice(string taxNumber)
        {
            var theCashZeros = (Retriever.RetrieveTables(Utilities.PATH) as CashContent).DataContent;
            var theOtherZeros = (Retriever.RetrieveTables(Utilities.PATH1) as CashContent).DataContent_1.Select(x => x.AdminModel).ToList();

            List<IModelElement> elements = new();
            elements.AddRange(theCashZeros);
            elements.AddRange(theOtherZeros);

            IModelElement theElement = elements.Where(x => x.TaxNumber == taxNumber).ToList()[0];

            string theCashInJson = JsonSerializer.Serialize(theElement);

            Utilities.CashData = theCashInJson;

            return new JsonResult(theCashInJson);
        }

        public IActionResult OnGetZReportsGetContent()
        {
            List<InvoiceZReportSystem>? reports = Retriever.RetrieveZReports();
            string reportsConverted = JsonSerializer.Serialize(reports);
            Utilities.ZerosData = reportsConverted;

            return new JsonResult(reportsConverted);
        }

        public IActionResult OnGetEkuGetContent()
        {
            var reports = Retriever.RetrieveEkuList();
            string reportsConverted = JsonSerializer.Serialize(reports);
            Utilities.EkuData = reportsConverted;

            return new JsonResult(reportsConverted);
        }

        public IActionResult OnPostSearchPlate()
        {
            SearchPlateModel.PlateNumber = Request.Form["plateNumber"].ToString().Trim();
            return RedirectToPage("/SearchPlate");
        }

        public IActionResult OnGetZReportsLoader(int v) 
        {
            List<InvoiceZReportSystem> systemContent = Retriever.RetrieveZReports();

            foreach (InvoiceZReportSystem x in systemContent)
            {
                UserZReport lastReport = x.UserZReports.Last();
                if (lastReport.DateOfTheIndex < DateTime.Now)
                {
                    UserZReport? reportElements = lastReport;
                    DateTime lastDate = reportElements.DateOfTheIndex;
                    DateTime lastDateFormatted = new(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day);
                    int lastIndex = reportElements.Index;

                    while (lastDate < lastDateFormatted)
                    {
                        lastDate = lastDate.AddDays(1);
                        lastIndex++;
                        UserZReport theReport = new()
                        {
                            Index = lastIndex,
                            DateOfTheIndex = lastDate
                        };
                        x.UserZReports.Add(theReport);
                    }
                }
                else 
                {
                    continue;
                }
            }

            if (LoadingIndex == 0) 
            {
                FileWriter writer = FileWriter.GetInstance();
                writer.WriteData(systemContent);

                return new JsonResult("Sistem hazır.");
            }
            else 
            {
                return new JsonResult("Sistem zaten hazır.");
            }
            
        }

        public IActionResult OnGetEkuAddOnePlus(string TaxNumber)
        {
            var reports = Retriever.RetrieveEkuList();
            InvoiceEkuSystem ekus = reports.Where(x => x.TaxId == TaxNumber).ToList()[0];

            DateTime today = new(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day);

            UserEku newEku = new()
            {
                DateOfTheIndex = today,
                Index = ekus.EkuList.Last().Index + 1
            };

            ekus.EkuList.Add(newEku);
            reports.Where(x => x.TaxId == TaxNumber).ToList()[0] = ekus;
            string reportsConverted = JsonSerializer.Serialize(reports);
            Utilities.EkuData = reportsConverted;
            Utilities.ChosenTaxNumber = TaxNumber;
            return new JsonResult(reportsConverted);
        }

        public IActionResult OnGetEkuAddConfirm() 
        {
            FileWriter writer = FileWriter.GetInstance();
            List<InvoiceEkuSystem> ekuSystem = JsonSerializer.Deserialize<List<InvoiceEkuSystem>>(Utilities.EkuData);

            string taxNumber = Utilities.ChosenTaxNumber;
            DateTime today = new(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day);

            if (ekuSystem.Any(x => x.TaxId == taxNumber && x.EkuList[^2].DateOfTheIndex == today))
            {
                return new JsonResult("Bugün ekü yenilendi. Lütfen yarın veya başka bir gün deneyiniz.");
            }
            else
            {
                writer.WriteData(ekuSystem);
                return new JsonResult(ekuSystem);
            }
        }

        public void OnPostMassPayment() 
        {
            Response.Redirect("/MassInvoice");
        }
    }
}