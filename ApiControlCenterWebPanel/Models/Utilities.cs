using System.Runtime.CompilerServices;

namespace ApiControlCenterWebPanel.Models
{
    public class Utilities
    {
        public static readonly string PATH = @"C:\YazarKasa\superAdmin.json";
        public static readonly string PATH1 = @"C:\YazarKasa\adminUsers.json";
        public static readonly string PATH2 = @"C:\YazarKasa\invoiceDb.json";
        public static readonly string PATH3 = @"C:\YazarKasa\zReportSystem.json";
        public static readonly string PATH4 = @"C:\YazarKasa\gasPricesSystem.json";
        public static readonly string PATH5 = @"C:\YazarKasa\ekuList.json";
        public static readonly string PRINTING_PATH = @"C:\YazarKasa\";

        public static string JsonData 
        { 
            get { return string.Empty; } 
            set { } 
        }
        public static string CashData 
        { 
            get { return string.Empty; } 
            set { } 
        }
        public static string ChosenTaxNumber 
        { 
            get { return string.Empty; } 
            set { } 
        }
        public static string ZerosData
        { 
            get { return string.Empty; }
            set { } 
        }
        public static string EkuData 
        { 
            get { return string.Empty; } 
            set { } 
        }
    }
}
