function printInvoice(taxNumber, i) {

    /**
     * 
     * 
     * <td id="inv_1_@(i)">@theCash.GasStationName.Aggregate((item1, item2) => item1 + "\n" + item2)</td>
       <td id="inv_2_@(i)">@dateDisplayer</td>
       <td id="inv_3_@(i)">@hourDisplayer</td>
       <td id="inv_4_@(i)">@filteredInvoices[i].FisNo</td>
       <td id="inv_5_@(i)">@filteredInvoices[i].ZRaporuNo</td>
       <td id="inv_6_@(i)">@filteredInvoices[i].EkuNo</td>
       <td id="inv_7_@(i)">@filteredInvoices[i].BirimFiyat</td>
       <td id="inv_8_@(i)">@filteredInvoices[i].Litre</td>
       <td id="inv_9_@(i)">@filteredInvoices[i].TotalFiyat</td>
       <td id="inv_10_@(i)">@filteredInvoices[i].PlakaNo</td>
     * 
     */

    var addPoint = (numberString) => {
        let [integerPart, decimalPart] = numberString.split(",");
        let formattedIntegerPart = "";

        while (integerPart.length > 3) {
            formattedIntegerPart = "." + integerPart.slice(-3) + formattedIntegerPart;
            integerPart = integerPart.slice(0, -3);
        }

        return integerPart + formattedIntegerPart + "," + decimalPart;
    }

    var txt1 = $("#inv_1_" + i).text();
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
    $("#InvoiceTaxNumberSection").text(txt1);
    $("#InvoiceDateSection").text(txt2);
    $("#InvoiceNoSection").text("FİŞ NO : " + txt4);
    $("#InvoiceHourSection").text(txt3);
    $("#InvoiceLitreSection").text(txt8);
    $("#InvoicePriceSection").text(txt7);
    $("#InvoiceVatPriceSection").text("*" + addPoint(vatPrice.toString().replace(".",",")));
    $(".InvoiceTotalPriceSection").text("*" + addPoint(txt9));
    $("#InvoiceEkuSection").text("EKU NO : " + txt6);
    $("#InvoiceZReportSection").text("Z NO : " + txt5);

    var qr = new QRious({
        value: taxNumber,
        size: 200
    });

    document.getElementById("InvoiceQRCodeSection").src = qr.toDataURL();
    document.getElementById("InvoiceQRCodeSection").style.width = "100%";
    document.getElementById("InvoiceQRCodeSection").style.height = "100%";
}