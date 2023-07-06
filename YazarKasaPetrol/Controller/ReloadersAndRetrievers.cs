using YazarKasaPetrol.Models;
using YazarKasaPetrol.Models.Interfaces;

namespace YazarKasaPetrol.Controller
{
    public class Reloader
    {

    }

    public class Retriever 
    {
        public static IContent? RetrieveTables(string path, string contentTypeName = "CASH")
        {
            if (contentTypeName == "INVOICE")
            {
                return (InvoiceContent)FileAction.Create(path, "INVOICE");
            }
            else
            {
                return (CashContent)FileAction.Create(path);

            }
        }

        public static List<GasPricesSystem> RetrieveGasPrices()
        {
            return ((GasPriceContent)UtilityFileAction.Create(Utilities.PATH4, "GAS_PRICES")).DataContent;
        }

        public static List<InvoiceEkuSystem> RetrieveEkuList()
        {
            return ((EkuContent)UtilityFileAction.Create(Utilities.PATH5, "EKU_REPORTS")).DataContent;
        }

        public static List<InvoiceZReportSystem> RetrieveZReports()
        {
            return ((ZReportContent)UtilityFileAction.Create(Utilities.PATH3)).DataContent;
        }
    }
}
