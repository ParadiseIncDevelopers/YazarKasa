using YazarKasaPetrol.Controller;
using YazarKasaPetrol.Controller.Exceptions;
using YazarKasaPetrol.Models.Interfaces;
using YazarKasaPetrol.Pages;

namespace YazarKasaPetrol.Models
{
    public class AuthType
    {
        public bool IsAdmin { get; set; }
        public bool IsSuperAdmin { get; set; }
        public bool IsUser { get; set; }
        public IModelElement? UserCredentialsForInvoice { get; set; }

        public static AuthType? TheCurrentAuth { get; set; }

        public void CreateAuth()
        {
            TheCurrentAuth = this;
            LoginModel.WriteLoginContent();
        }

        public static bool IsNewOpen
        {
            get 
            {
                return Utilities.JsonData == null && Utilities.CashData == null &&
                Utilities.ChosenTaxNumber == null && Utilities.ZerosData == null && Utilities.EkuData == null;
            }
        }
    }
}
