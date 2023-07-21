using YazarKasaPetrol.Controller.Exceptions;
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

        public static List<LoginLog> RetrieveLogs() 
        {
            try 
            {
                AppLogs contents = UtilityFileAction.ReadFile(Utilities.LOGIN_PATH).DataContent;
                if (contents.AllLogins?.Count == 0 || contents.AllLogins == null)
                {
                    throw new ApplicationIdException("appIdError", 4);
                }
                else 
                {
                    return contents.AllLogins;
                }
            }
            catch (Exception)
            {
                return new List<LoginLog>();
            }
        }

        public static string? RetrieveAppId() 
        {
            try
            {
                LogContent theLogContainer = UtilityFileAction.ReadFile(Utilities.LOGIN_PATH);
                string? appId = theLogContainer.DataContent.AppIdNumber;
                if (appId == null)
                {
                    throw new ApplicationIdException("appIdError", 4);
                }
                else
                {
                    return appId;
                }
            }
            catch (Exception)
            {
                return null;
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
