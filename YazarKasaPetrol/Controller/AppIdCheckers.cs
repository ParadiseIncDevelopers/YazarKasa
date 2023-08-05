using Microsoft.AspNetCore.DataProtection.KeyManagement;
using System.Security.Cryptography;
using System.Text;

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
            string? retrievedValue = Environment.GetEnvironmentVariable("YAZAR_KASA", EnvironmentVariableTarget.User);
            return retrievedValue != ComputeSha256Hash(AppId);
        }

        private static string ComputeSha256Hash(string rawData)
        {
            using (SHA256 sha256Hash = SHA256.Create())
            {
                byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(rawData));

                StringBuilder builder = new();
                for (int i = 0; i < bytes.Length; i++)
                {
                    builder.Append(bytes[i].ToString("x2"));
                }
                return builder.ToString();
            }
        }
    }
}
