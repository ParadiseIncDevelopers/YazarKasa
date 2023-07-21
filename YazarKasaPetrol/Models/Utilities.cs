using System.Runtime.CompilerServices;

namespace YazarKasaPetrol.Models
{
    public class Utilities
    {
        private static readonly string PRINTING_PATH = "C:\\YazarKasa\\";
        public static readonly string PATH = PRINTING_PATH + "superAdmin.json";
        public static readonly string PATH1 = PRINTING_PATH + "adminUsers.json";
        public static readonly string PATH2 = PRINTING_PATH + "invoiceDb.json";
        public static readonly string PATH3 = PRINTING_PATH + "zReportSystem.json";
        public static readonly string PATH4 = PRINTING_PATH + "gasPricesSystem.json";
        public static readonly string PATH5 = PRINTING_PATH + "ekuList.json";
        public static readonly string LOGIN_PATH = PRINTING_PATH + "loginLogs.json";

        public static string? JsonData { get; set; }
        public static string? CashData { get; set; }
        public static string? ChosenTaxNumber { get; set; }
        public static string? ZerosData { get; set; }
        public static string? EkuData { get; set; }
    }
}
