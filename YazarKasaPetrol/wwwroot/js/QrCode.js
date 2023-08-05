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
            background: "#FFFFFF",
            size: 75
        }, document.querySelector("#" + element));

        $("#" + element).css({ "max-width": "50%", "max-height": "50%", "position": "relative", "left": "25%" });

        var canvasElement = document.getElementsByTagName("canvas")[0];
        var MIME_TYPE = "image/png";
        var imgURL = canvasElement.toDataURL(MIME_TYPE);
        var dlLink = document.createElement('img');
        dlLink.src = imgURL;

        document.querySelector("#" + element).appendChild(dlLink);
        document.querySelector("#" + element).removeChild(canvasElement);
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
            background: "#FFFFFF",
            size: 75
        }, document.querySelector("#" + element));

        $("#" + element).css({ "max-width": "50%", "max-height": "50%", "position": "relative", "left": "25%" });

        var canvasElement = document.getElementsByTagName("canvas")[0];
        var MIME_TYPE = "image/png";
        var imgURL = canvasElement.toDataURL(MIME_TYPE);
        var dlLink = document.createElement('img');
        dlLink.src = imgURL;

        document.querySelector("#" + element).appendChild(dlLink);
        document.querySelector("#" + element).removeChild(canvasElement);
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
            background: "#FFFFFF",
            size: 75
        }, document.querySelector("#" + element));

        $("#" + element).css({ "max-width": "50%", "max-height": "50%", "position": "relative", "left": "25%" });

        var canvasElement = document.getElementsByTagName("canvas")[0];
        var MIME_TYPE = "image/png";
        var imgURL = canvasElement.toDataURL(MIME_TYPE);
        var dlLink = document.createElement('img');
        dlLink.src = imgURL;

        document.querySelector("#" + element).appendChild(dlLink);
        document.querySelector("#" + element).removeChild(canvasElement);
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
            background: "#FFFFFF",
            size: 75
        }, document.querySelector("#" + element));

        $("#" + element).css({ "max-width": "50%", "max-height": "50%", "position": "relative", "left": "25%" });

        var canvasElement = document.getElementsByTagName("canvas")[0];
        var MIME_TYPE = "image/png";
        var imgURL = canvasElement.toDataURL(MIME_TYPE);
        var dlLink = document.createElement('img');
        dlLink.src = imgURL;

        document.querySelector("#" + element).appendChild(dlLink);
        document.querySelector("#" + element).removeChild(canvasElement);
    }
}