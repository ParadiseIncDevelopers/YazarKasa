using System;
using System.Security.Cryptography;
using System.Text;
using System.Threading;

namespace EnvironmentKey 
{
    class Program
    {
        private static void Main(string[] args)
        {
            string? theVar = null;
            
            while (string.IsNullOrEmpty(theVar)) 
            {
                Console.Write("Create the key : ");
                string? plainData = Console.ReadLine();
                if (!string.IsNullOrEmpty(plainData))
                {
                    Console.WriteLine("Raw data: {0}", plainData);
                    string hashedData = ComputeSha256Hash(plainData);
                    Console.WriteLine("Hash: {0}", hashedData);

                    theVar = Environment.GetEnvironmentVariable("YAZAR_KASA", EnvironmentVariableTarget.User);

                    if (string.IsNullOrEmpty(theVar) || theVar != hashedData)
                    {
                        Environment.SetEnvironmentVariable("YAZAR_KASA", hashedData, EnvironmentVariableTarget.User);
                        Console.WriteLine("Variable created.");
                        break;
                    }
                    else
                    {
                        Console.WriteLine("Error : variable already created. Please try again.");
                        theVar = null;
                        continue;
                    }
                }
                else 
                {
                    Console.WriteLine("Error : Please write someting.");
                    theVar = null;
                    continue;
                }
            }
        }

        static string ComputeSha256Hash(string rawData)
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