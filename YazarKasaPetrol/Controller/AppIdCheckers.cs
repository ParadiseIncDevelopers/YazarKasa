using Microsoft.AspNetCore.DataProtection.KeyManagement;

namespace YazarKasaPetrol.Controller
{
    public class AppIdCheckers
    {
        public AppIdCheckers(string? appId) 
        {
            AppId = appId; 
        }

        public string? AppId { get; private set; }

        public bool AppIdIsNullOrEmpty() 
        {
            return string.IsNullOrEmpty(AppId);
        }

        public bool AppIdEnvironmentKeyIsNotCheck() 
        {
            string? retrievedValue = "7210849484";
            return retrievedValue != AppId;
        }
    }
}
