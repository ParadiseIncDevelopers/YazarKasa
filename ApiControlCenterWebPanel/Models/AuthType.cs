using ApiControlCenterWebPanel.Models.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ApiControlCenterWebPanel.Models
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
        }
    }
}
