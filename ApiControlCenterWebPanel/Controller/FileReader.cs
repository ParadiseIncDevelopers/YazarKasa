﻿using ApiControlCenterWebPanel.Models;
using ApiControlCenterWebPanel.Models.Interfaces;
using System.Text.Json;
using System.Text.RegularExpressions;

namespace ApiControlCenterWebPanel.Controller
{
    public class CashContent : IContent
    {
        public string? Path
        {
            get; set;
        }

        public List<SuperAdmin>? DataContent
        {
            get; set;
        }

        public List<Admin>? DataContent_1 { get; set; }
    }

    public class InvoiceContent : IContent
    {
        public string? Path
        {
            get; set;
        }
        public List<UserInvoiceContainer>? DataContent
        {
            get; set;
        }
    }

    public sealed class FileAction
    {
        private static readonly JsonSerializerOptions Options = new()
        {
            WriteIndented = true
        };

        private FileAction()
        {

        }

        private static void CashContentGet(CashContent content)
        {
            string lines = File.ReadAllText(content.Path);

            if (lines.Length == 0)
            {
                content.DataContent = new List<SuperAdmin>();
            }
            else
            {
                if (content.Path == Utilities.PATH)
                {
                    content.DataContent = JsonSerializer.Deserialize<List<SuperAdmin>>(lines);
                }
                else
                {
                    content.DataContent_1 = JsonSerializer.Deserialize<List<Admin>>(lines);
                }

            }
        }

        public static IContent Create(string path, string contentTypeName = "CASH")
        {
            if (contentTypeName == "INVOICE")
            {
                InvoiceContent content = new()
                {
                    Path = path
                };

                if (File.Exists(content.Path))
                {
                    InvoiceContentGet(content);
                }
                else
                {
                    Directory.CreateDirectory(@"C:\YazarKasa");
                    File.Create(content.Path).Close();
                    InvoiceContentGet(content);
                }

                return content;
            }
            else
            {
                CashContent content = new()
                {
                    Path = path
                };

                if (File.Exists(content.Path))
                {
                    CashContentGet(content);
                }
                else
                {
                    Directory.CreateDirectory(@"C:\YazarKasa");
                    File.Create(content.Path).Close();
                    CashContentGet(content);
                }

                return content;
            }
        }

        private static void InvoiceContentGet(InvoiceContent content)
        {
            string lines = File.ReadAllText(content.Path);

            if (lines.Length == 0)
            {
                content.DataContent = new List<UserInvoiceContainer>();
            }
            else
            {
                content.DataContent = JsonSerializer.Deserialize<List<UserInvoiceContainer>>(lines);
            }
        }

        public static void Write(string path, List<InvoiceEkuSystem> data)
        {
            string writeLine = Regex.Unescape(JsonSerializer.Serialize(data, Options));

            File.WriteAllText(path, writeLine);
        }

        public static void Write(string path, List<InvoiceZReportSystem> data)
        {
            string writeLine = Regex.Unescape(JsonSerializer.Serialize(data, Options));
            File.WriteAllText(path, writeLine);
        }

        public static void Write(string path, List<GasPricesSystem> data)
        {
            string writeLine = Regex.Unescape(JsonSerializer.Serialize(data, Options));
            File.WriteAllText(path, writeLine);
        }

        public static void Write(string path, List<Admin> data)
        {
            string writeLine = Regex.Unescape(JsonSerializer.Serialize(data, Options));
            File.WriteAllText(path, writeLine);
        }

        public static void Write(string path, List<SuperAdmin> data)
        {
            string writeLine = Regex.Unescape(JsonSerializer.Serialize(data, Options));
            File.WriteAllText(path, writeLine);
        }

        public static void Write(string path, List<UserInvoiceContainer> data)
        {
            string writeLine = Regex.Unescape(JsonSerializer.Serialize(data, Options));

            File.WriteAllText(path, writeLine);
        }
    }

    public sealed class UtilityFileAction
    {
        private UtilityFileAction()
        {

        }

        private static void GasPricesContent(GasPriceContent content)
        {
            string lines = File.ReadAllText(content.Path);

            if (lines.Length == 0)
            {
                content.DataContent = new List<GasPricesSystem>();
            }
            else
            {
                content.DataContent = JsonSerializer.Deserialize<List<GasPricesSystem>>(lines);
            }
        }

        private static void ZReportContent(ZReportContent content)
        {
            string lines = File.ReadAllText(content.Path);

            if (lines.Length == 0)
            {
                content.DataContent = new List<InvoiceZReportSystem>();
            }
            else
            {
                content.DataContent = JsonSerializer.Deserialize<List<InvoiceZReportSystem>>(lines);
            }
        }

        private static void EkuContent(EkuContent content) 
        {
            string lines = File.ReadAllText(content.Path);

            if (lines.Length == 0)
            {
                content.DataContent = new List<InvoiceEkuSystem>();
            }
            else
            {
                content.DataContent = JsonSerializer.Deserialize<List<InvoiceEkuSystem>>(lines);
            }
        }

        public static IUtilityContent Create(string path, string contentTypeName = "Z_REPORT")
        {
            if (contentTypeName == "Z_REPORT")
            {
                ZReportContent content = new()
                {
                    Path = path
                };

                if (File.Exists(content.Path))
                {
                    ZReportContent(content);
                }
                else
                {
                    Directory.CreateDirectory(@"C:\YazarKasa");
                    File.Create(content.Path).Close();
                    ZReportContent(content);
                }

                return content;
            }
            else if (contentTypeName == "GAS_PRICES")
            {
                GasPriceContent content = new()
                {
                    Path = path
                };

                if (File.Exists(content.Path))
                {
                    GasPricesContent(content);
                }
                else
                {
                    Directory.CreateDirectory(@"C:\YazarKasa");
                    File.Create(content.Path).Close();
                    GasPricesContent(content);
                }

                return content;
            }
            else if (contentTypeName == "EKU_REPORTS")
            {
                EkuContent content = new()
                {
                    Path = path
                };

                if (File.Exists(content.Path))
                {
                    EkuContent(content);
                }
                else
                {
                    Directory.CreateDirectory(@"C:\YazarKasa");
                    File.Create(content.Path).Close();
                    EkuContent(content);
                }

                return content;
            }
            else
            {
                return null;
            }
        }
    }

    public class ZReportContent : IUtilityContent
    {
        public string? Path { get; set; }
        public List<InvoiceZReportSystem>? DataContent { get; set; }
    }

    public class GasPriceContent : IUtilityContent
    {
        public string? Path { get; set; }
        public List<GasPricesSystem>? DataContent { get; set; }
    }

    public class EkuContent : IUtilityContent
    {
        public string? Path { get; set; }
        public List<InvoiceEkuSystem>? DataContent { get; set; }

    }
}
