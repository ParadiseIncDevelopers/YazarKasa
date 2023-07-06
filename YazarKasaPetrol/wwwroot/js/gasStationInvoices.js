/**
 * 
 * @param {string} taxNumber
 * @param {int} i
 * @param {string} entrepriseName
 * @param {string} gasTypeName
 */
function printInvoice(taxNumber, i, entrepriseName, gasTypeName) {

    var theEntrepriseName = entrepriseName.split("µ").join("\n");

    var addPoint = (numberString) => {

        if (!numberString.includes(",")) {
            return numberString + "," + "00";
        }
        else {
            let [integerPart, decimalPart] = numberString.split(",");
            let formattedIntegerPart = "";

            while (integerPart.length > 3) {
                formattedIntegerPart = "." + integerPart.slice(-3) + formattedIntegerPart;
                integerPart = integerPart.slice(0, -3);
            }

            return integerPart + formattedIntegerPart + "," + decimalPart;
        }
    }

    //var txt1 = $("#inv_1_" + i).text();
    var txt2 = $("#inv_2_" + i).text();
    var txt3 = $("#inv_3_" + i).text();
    var txt4 = $("#inv_4_" + i).text();
    var txt5 = $("#inv_5_" + i).text();
    var txt6 = $("#inv_6_" + i).text();
    var txt7 = $("#inv_7_" + i).text();
    var txt8 = $("#inv_8_" + i).text();
    var txt9 = $("#inv_9_" + i).text();
    var txt10 = $("#inv_10_" + i).text();

    var vatPrice = parseFloat(txt9) / 100 * 18;

    $("#InvoicePlateSection").text(txt10);
    $("#InvoiceTaxNumberSection").text(theEntrepriseName);
    $("#InvoiceDateSection").text(txt2);
    $("#InvoiceNoSection").text("FİŞ NO : " + txt4);
    $("#InvoiceHourSection").text(txt3);
    $("#InvoiceLitreSection").text(addPoint(txt8) + "\xa0");
    $("#InvoicePriceSection").text("\xa0" + addPoint(txt7.replace(".", ",")));
    $("#InvoiceVatPriceSection").text("*" + addPoint(vatPrice.toFixed(2).replace(".", ",")));
    $(".InvoiceTotalPriceSection").text("*" + addPoint(txt9.replace(".", ",")));
    $("#InvoiceEkuSection").text("EKU NO : " + txt6);
    $("#InvoiceZReportSection").text("Z NO : " + txt5);
    $("#InvoiceGasTypeSection").text(gasTypeName);

    var qr = new QRious({
        value: taxNumber,
        size: 200
    });

    document.getElementById("InvoiceQRCodeSection").src = qr.toDataURL();
    document.getElementById("InvoiceQRCodeSection").style.width = "100%";
    document.getElementById("InvoiceQRCodeSection").style.height = "100%";
}