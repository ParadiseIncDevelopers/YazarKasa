using System.Security.Cryptography;
using System.Text.Json.Serialization;
using System.Text;
using ApiControlCenterWebPanel.Models.Interfaces;

namespace ApiControlCenterWebPanel.Models
{
    [Serializable]
    public class SuperAdmin : IModelElement
    {
        [JsonPropertyName("TaxNumber")]
        public string? TaxNumber { get; set; }
        [JsonPropertyName("Password")]
        public string? Password { get; set; }

        [JsonPropertyName("CashTypeName")]
        public string? CashTypeName { get; set; }
        [JsonPropertyName("GasStationName")]
        public List<string>? GasStationName { get; set; }
        [JsonPropertyName("GasType")]
        public string? GasType { get; set; }
        [JsonPropertyName("CashLetters")]
        public string? CashLetters { get; set; }
        [JsonPropertyName("CashNumber")]
        public string? CashId { get; set; }
        [JsonPropertyName("ZerosInInvoices")]
        public int? ZerosInInvoices { get; set; }
        [JsonPropertyName("ZerosInEku")]
        public int? ZerosInEku { get; set; }
        [JsonPropertyName("ZerosInZReports")]
        public int? ZerosInZReports { get; set; }

        public SuperAdmin EncryptAll()
        {
            Aes aes = Aes.Create();

            SuperAdmin register = new()
            {
                TaxNumber = EncryptorClass.ToHex(EncryptorClass.Encrypt(TaxNumber, aes.Key, aes.IV)),
                Password = EncryptorClass.EncryptSHA256(Password),
                CashTypeName = EncryptorClass.ToHex(EncryptorClass.Encrypt(CashTypeName, aes.Key, aes.IV)),
                GasType = EncryptorClass.ToHex(EncryptorClass.Encrypt(GasType, aes.Key, aes.IV)),
                CashLetters = EncryptorClass.ToHex(EncryptorClass.Encrypt(CashLetters, aes.Key, aes.IV)),
                CashId = EncryptorClass.ToHex(EncryptorClass.Encrypt(CashId, aes.Key, aes.IV))
            };

            return register;
        }
    }

    public static class EncryptorClass
    {
        public static byte[] Encrypt(string plainText, byte[] Key, byte[] IV)
        {
            if (plainText != null)
            {
                byte[] encrypted;
                using (Aes aes = Aes.Create())
                {
                    ICryptoTransform encryptor = aes.CreateEncryptor(Key, IV);
                    MemoryStream ms = new();
                    CryptoStream cs = new(ms, encryptor, CryptoStreamMode.Write);
                    using (StreamWriter sw = new(cs))
                    {
                        sw.Write(plainText);
                    }
                    encrypted = ms.ToArray();

                }
                return encrypted;
            }
            else
            {
                throw new NullReferenceException("Your plain text is null. Please try again.");
            }
        }

        public static string Decrypt(string plainText)
        {
            byte[] cipherText = Enumerable.Range(0, plainText.Length).Where(x => x % 2 == 0).Select(x => Convert.ToByte(plainText.Substring(x, 2), 16)).ToArray();

            using (Aes aes = Aes.Create())
            {
                ICryptoTransform decryptor = aes.CreateDecryptor(aes.Key, aes.IV);
                MemoryStream ms = new(cipherText);
                CryptoStream cs = new(ms, decryptor, CryptoStreamMode.Read);
                using StreamReader reader = new(cs);
                plainText = reader.ReadToEnd();
            }
            return plainText;
        }

        public static string ToHex(byte[] bytes) 
        {
            StringBuilder stringBuilder = new StringBuilder();
            foreach (var b in bytes.ToList())
            {
                stringBuilder.Append(string.Format("{0:X2}", b));
            }
            return stringBuilder.ToString();
        }

        public static string EncryptSHA256(string password)
        {
            using (SHA256 sha256Hash = SHA256.Create())
            {
                byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(password));

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
