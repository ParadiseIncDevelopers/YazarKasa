﻿function printInvoice(gasType, cashTypeName, cashLetters, cashNumbers, taxNumber, i, j)
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
    $("#InvoiceLitreSection").text(txt9 + "\xa0");
    $("#InvoicePriceSection").text("\xa0".concat(txt8));
    $("#InvoiceVatPriceSection").text("*" + vatPrice);
    $(".InvoiceTotalPriceSection").text("*" + txt10);
    $("#InvoiceEkuSection").text("EKU NO : " + txt7);
    $("#InvoiceZReportSection").text("Z NO : " + txt6);

    $("#InvoiceCashLettersAndNumbersSection").html("");

    /**
     * 
     * @param {string} letters
     */
    var cashLettersMaker = (letters) => {
        if (letters.includes("MF")) {
            letters = letters.substring(2);

            var imageElement = document.createElement("img");
            imageElement.src = "../images/MF_logo.svg";
            imageElement.style.width = "16px";
            document.getElementById("InvoiceCashLettersAndNumbersSection").appendChild(imageElement);
            document.getElementById("InvoiceCashLettersAndNumbersSection").append(letters);

        }
        else {
            document.getElementById("InvoiceCashLettersAndNumbersSection").append(letters);
        }
    };

    cashLettersMaker(cashLetters);
    $("#InvoiceCashLettersAndNumbersSection").append(" " + cashNumbers);

    createQRCode(cashTypeName, taxNumber, txt3, txt4, gasType, txt9, txt5, "InvoiceQRCodeSection");
}

$(document).ready(function () {
    $("#printInvoiceFromPlate").click(function () {
        $("#page").printThis();
    })
});