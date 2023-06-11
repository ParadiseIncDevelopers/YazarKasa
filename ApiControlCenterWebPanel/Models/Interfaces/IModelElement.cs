using System.Text.Json.Serialization;

namespace ApiControlCenterWebPanel.Models.Interfaces
{
    public interface IModelElement
    {
        public string? TaxNumber { get; set; }
        public string? CashTypeName { get; set; }
        public List<string>? GasStationName { get; set; }
        public string? GasType { get; set; }
        public string? CashLetters { get; set; }
        public string? CashId { get; set; }
        public int? ZerosInInvoices { get; set; }
        public int? ZerosInEku { get; set; }
        public int? ZerosInZReports { get; set; }
        public string? WeaponNumber { get; set; }
        public string? PumpNumber { get; set; }
    }
}
