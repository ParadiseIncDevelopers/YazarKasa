using YazarKasaPetrol.Models;
using System.Globalization;
using System.Text;

namespace YazarKasaPetrol.Controller
{
    public class InvoiceChecker
    {
        public Invoice? Invoice { get; set; }
        public List<InvoiceZReportSystem>? ZReports { get; set; }
        public string? TaxNumber { get; set; }
        public string? ConvertedZReportNumber { get; set; }
        public string? ConvertedEkuNumber { get; set; }
        public string? ConvertedInvoiceNumber { get; set; }

        public InvoiceChecker()
        {

        }

        public InvoiceChecker(Invoice invoice, List<InvoiceZReportSystem> zReports)
        {
            Invoice = invoice;
            ZReports = zReports;
        }

        public static DateTime DateTimeConverter(string date, string hour)
        {
            string[] theDate = date.Split("/");
            string[] theHour = hour.Split(":");
            
            return new DateTime(Convert.ToInt32(theDate[2]), Convert.ToInt32(theDate[1]), Convert.ToInt32(theDate[0]), Convert.ToInt32(theHour[0]), Convert.ToInt32(theHour[1]), 0);
        }

        public static DateTime DateTimeConverter(string date) 
        {
            string[] theDate = date.Split("/");
            return new DateTime(Convert.ToInt32(theDate[2]), Convert.ToInt32(theDate[1]), Convert.ToInt32(theDate[0]));
        }

        public void SetZerosForInvoice(List<SuperAdmin> cashList, string taxNumber)
        {
            SuperAdmin theFilteredCash = cashList.Where(x => x.TaxNumber == taxNumber).First();
            int invoice = Convert.ToInt32(theFilteredCash.ZerosInInvoices.ToString());
            int zreport = Convert.ToInt32(theFilteredCash.ZerosInZReports.ToString());
            int eku = Convert.ToInt32(theFilteredCash.ZerosInEku.ToString());

            Invoice theInvoice = Invoice;
            ConvertedZReportNumber = ZeroSetter(Convert.ToInt32(theInvoice.ZRaporuNo), zreport);
            ConvertedInvoiceNumber = ZeroSetter(Convert.ToInt32(theInvoice.FisNo), invoice);
            ConvertedEkuNumber = ZeroSetter(Convert.ToInt32(theInvoice.EkuNo), eku);
        }

        public void SetZerosForInvoice(List<Admin> cashList, string taxNumber)
        {
            Admin theFilteredCash = cashList.Where(x => x.AdminModel.TaxNumber == taxNumber && x.AdminTaxNumber == AuthType.TheCurrentAuth.UserCredentialsForInvoice.TaxNumber).First();
            int invoice = Convert.ToInt32(theFilteredCash.AdminModel.ZerosInInvoices.ToString());
            int zreport = Convert.ToInt32(theFilteredCash.AdminModel.ZerosInZReports.ToString());
            int eku = Convert.ToInt32(theFilteredCash.AdminModel.ZerosInEku.ToString());

            Invoice theInvoice = Invoice;
            ConvertedZReportNumber = ZeroSetter(Convert.ToInt32(theInvoice.ZRaporuNo), zreport);
            ConvertedInvoiceNumber = ZeroSetter(Convert.ToInt32(theInvoice.FisNo), invoice);
            ConvertedEkuNumber = ZeroSetter(Convert.ToInt32(theInvoice.EkuNo), eku);
        }

        private static string ZeroSetter(int theValue, int zerosInTheCash)
        {
            return theValue.ToString().PadLeft(zerosInTheCash + 1, '0');
        }
    }
}
