using System.Text.Json.Serialization;

namespace YazarKasaPetrol.Models
{
    [Serializable]
    public class LoginLog
    {
        [JsonPropertyName("LoginDate")]
        public DateTime? LoginDate { get; set; }

        [JsonPropertyName("IsLoginSuccessful")]
        public bool? IsLoginSuccessful { get; set; }
    }

    [Serializable]
    public class AppLogs 
    {
        [JsonPropertyName("AppIdNumber")]
        public string? AppIdNumber { get; set; }

        [JsonPropertyName("AllLogins")]
        public List<LoginLog>? AllLogins { get; set; }
    }
}
