function printInvoice(taxNumber, i, j)
{
    var txt1 = $("#inv_1_" + i + "_" + j).text();
    var txt2 = $("#inv_2_" + i + "_" + j).text();
    var txt3 = $("#inv_3_" + i + "_" + j).text();
    var txt4 = $("#inv_4_" + i + "_" + j).text();
    var txt5 = $("#inv_5_" + i + "_" + j).text();
    var txt6 = $("#inv_6_" + i + "_" + j).text();
    var txt7 = $("#inv_7_" + i + "_" + j).text();
    var txt8 = $("#inv_8_" + i + "_" + j).text();
    var txt9 = $("#inv_9_" + i + "_" + j).text();
    var txt10 = $("#inv_10_" + i + "_" + j).text();
    
    var vatPrice = parseFloat(txt10) / 100 * 18;
    vatPrice = Math.round((vatPrice + Number.EPSILON) * 100) / 100;

    $("#InvoicePlateSection").text(txt1);
    $("#InvoiceTaxNumberSection").text(txt2);
    $("#InvoiceDateSection").text(txt3);
    $("#InvoiceNoSection").text("FİŞ NO : " + txt5);
    $("#InvoiceHourSection").text(txt4);
    $("#InvoiceLitreSection").text(txt9);
    $("#InvoicePriceSection").text(txt8);
    $("#InvoiceVatPriceSection").text("*" + vatPrice);
    $(".InvoiceTotalPriceSection").text("*" + txt10);
    $("#InvoiceEkuSection").text("EKU NO : " + txt7);
    $("#InvoiceZReportSection").text("Z NO : " + txt6);

    var qr = new QRious({
        value: taxNumber,
        size: 200
    });

    document.getElementById("InvoiceQRCodeSection").src = qr.toDataURL();
    document.getElementById("InvoiceQRCodeSection").style.width = "100%";
    document.getElementById("InvoiceQRCodeSection").style.height = "100%";
}