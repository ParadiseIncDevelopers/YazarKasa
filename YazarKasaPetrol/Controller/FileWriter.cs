using YazarKasaPetrol.Models;

namespace YazarKasaPetrol.Controller
{
    public class FileWriter
    {
        private FileWriter() 
        {

        }

        public static FileWriter GetInstance()
        {
            return new FileWriter();
        }

        public void WriteData(AppLogs data) 
        {
            FileAction.Write(Utilities.LOGIN_PATH, data);
        }

        public void WriteData(List<InvoiceEkuSystem> data)
        {
            FileAction.Write(Utilities.PATH5, data);
        }

        public void WriteData(List<InvoiceZReportSystem> data)
        {
            FileAction.Write(Utilities.PATH3, data);
        }

        //Writes data in the sub admin section.
        public void WriteData(List<Admin> data)
        {
            FileAction.Write(Utilities.PATH1, data);
        }

        //Writes data in superadmin list
        public void WriteData(List<SuperAdmin> data)
        {
            FileAction.Write(Utilities.PATH, data);
        }

        //Writes user invoices in a list
        public void WriteData(List<UserInvoiceContainer> data)
        {
            FileAction.Write(Utilities.PATH2, data);
        }

        //Writes gas prices data 
        public void WriteData(List<GasPricesSystem> data)
        {
            FileAction.Write(Utilities.PATH4, data);
        }
    }
}
