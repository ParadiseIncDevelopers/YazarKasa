using ApiControlCenterWebPanel.Models;
using System.Text;

namespace ApiControlCenterWebPanel.Controller
{
    public class InvoiceChecker
    {
        public UserInvoiceContainer? Invoices { get; set; }
        public List<InvoiceZReportSystem>? ZReports { get; set; }
        public string? TaxNumber { get; set; }
        public string? ConvertedZReportNumber { get; set; }
        public string? ConvertedEkuNumber { get; set; }
        public string? ConvertedInvoiceNumber { get; set; }

        public InvoiceChecker()
        {

        }

        public InvoiceChecker(UserInvoiceContainer invoices, List<InvoiceZReportSystem> zReports)
        {
            Invoices = invoices;
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

        public bool CheckInvoiceZReportId(string taxNumber, Invoice invoice)
        {
            int zReportId = Convert.ToInt32(invoice.ZRaporuNo);
            TaxNumber = taxNumber;

            if (Invoices != null)
            {
                if (Invoices.Invoices.Count == 0)
                {
                    return true;
                }

                if (Convert.ToInt32(Invoices.Invoices.Last().ZRaporuNo) >= zReportId)
                {
                    DateTime correspondentDate = ZReports.Where(x => x.TaxId == taxNumber).ToList()[0].UserZReports[zReportId - 1].DateOfTheIndex;
                    DateTime invoiceDate = new(invoice.Tarih.Value.Year, invoice.Tarih.Value.Month, invoice.Tarih.Value.Day);

                    return correspondentDate == invoiceDate;
                }
                else
                {
                    return false;
                }
            }
            else
            {
                return false;
            }
        }

        public void SetZerosForInvoice(List<SuperAdmin> cashList)
        {
            SuperAdmin theFilteredCash = cashList.Where(x => x.TaxNumber == TaxNumber).First();
            int? invoice = theFilteredCash.ZerosInInvoices;
            int? zreport = theFilteredCash.ZerosInZReports;
            int? eku = theFilteredCash.ZerosInEku;

            Invoice theInvoice = Invoices.Invoices.First();
            ConvertedZReportNumber = ZeroSetter(Convert.ToInt32(theInvoice.ZRaporuNo), zreport);
            ConvertedInvoiceNumber = ZeroSetter(Convert.ToInt32(theInvoice.FisNo), invoice);
            ConvertedEkuNumber = ZeroSetter(Convert.ToInt32(theInvoice.EkuNo), eku);
        }

        private static string ZeroSetter(int? theValue, int? zerosInTheCash)
        {
            StringBuilder theReturnString = new("");

            for (int i = 1; i <= zerosInTheCash;)
            {
                if (theValue < Math.Pow(10, 2))
                {
                    i++;
                    theReturnString.Append('0');
                }
                else 
                {
                    theReturnString.Append(theValue);
                }
            }

            return theReturnString.ToString();
        }
    }
}
