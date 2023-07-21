/**
 * 
 * @param {string} CashTypeName
 * @param {string} taxNumber
 * @param {string} date
 * @param {string} time
 * @param {string} gasType
 * @param {string} litre
 * @param {string} invoiceId
 * @param {string} element
 */
function createQRCode(CashTypeName, taxNumber, date, time, gasType, litre, invoiceId, element)
{
    if (CashTypeName == "Beko")
    {
        qrCodeString = taxNumber + "@" + date + "@" + invoiceId + "@" + gasType;
        document.getElementById(element).innerHTML = "";
        QrCreator.render({
            text: qrCodeString,
            radius: 0.0,
            ecLevel: 'H',
            fill: '#000000',
            background: null,
            size: 150
        }, document.querySelector("#" + element));
        $("#" + element).css({ "max-width": "100%", "max-height": "100%" });
    }
    else if (CashTypeName == "Profilo")
    {
        qrCodeString = taxNumber + "@" + date + "@" + invoiceId + "@" + gasType;
        document.getElementById(element).innerHTML = "";
        QrCreator.render({
            text: qrCodeString,
            radius: 0.5,
            ecLevel: 'H',
            fill: '#000000',
            background: null,
            size: 150
        }, document.querySelector("#" + element));
        $("#" + element).css({ "max-width": "100%", "max-height": "100%" });
    }
    else if (CashTypeName == "Turpak")
    {
        qrCodeString = "VN:" + taxNumber + "@" + date + "@" + time + "@" + gasType + "@" + litre;
        document.getElementById(element).innerHTML = "";
        QrCreator.render({
            text: qrCodeString,
            radius: 0.0,
            ecLevel: 'H',
            fill: '#000000',
            background: null,
            size: 150
        }, document.querySelector("#" + element));
        $("#" + element).css({ "max-width": "100%", "max-height": "100%" });
    }
    else
    {
        qrCodeString = taxNumber + "@" + date + "@" + invoiceId + "@" + gasType;
        document.getElementById(element).innerHTML = "";
        QrCreator.render({
            text: qrCodeString,
            radius: 0.0,
            ecLevel: 'H',
            fill: '#000000',
            background: null,
            size: 150
        }, document.querySelector("#" + element));
        $("#" + element).css({ "max-width": "100%", "max-height": "100%" });
    }

    alert(qrCodeString);
}