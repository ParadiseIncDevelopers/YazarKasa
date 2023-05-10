//Litre
var invoiceInput1Reg = /^(\d)+(\.){1}(\d){2,4}$/;
//Birim fiyat
var invoiceInput2Reg = /^(\d)+(\.){1}(\d){2,4}$/;
//Tarih
var instanceOfDate = /^((([0-2][0-9])|(30)|(31))\/((0[0-9])|(11)|(12))\/(20\d{2}))$/;
//Saat
var hourRegex = /^([0-1]?[0-9]|2[0-3]):([0-5]{1}[0-9]{1})$/;
//z raporu
var zReportRegex = /^(\d){1,4}$/;
//eku no
var ekuNoRegex = /^(\d){1,4}$/;
//fis no
var fisRegex = /^(\d){1,4}$/;
//tabanca no
var tabancaRegex = /^(\d){1,4}$/;
//plaka no
var plateRegex = /^([A-Z0-9\s]){5,12}$/;
//pompa no
var pumpRegex = /^(\d){1,4}$/;

//If the main page has input
var hasInput = () => document.getElementById("invoiceModalLabel").innerHTML.includes(" - ");

//If in the main page gas prices management has not "choose".
var hasGasPriceInput = () => $("#gasPriceUsers").text() != "choose";

//Calculates the prices in the invoice.
function CalculateInvoicePrice()
{
    var invoiceLitre = $("#invoiceText_1").val();
    var invoicePrice = $("#invoiceText_2").val();
    var totalPrice, totalVat;

    if (invoiceLitre != "" || invoiceLitre != null)
    {
        if (invoicePrice != "" || invoicePrice != null)
        {
            invoiceLitre = parseFloat(invoiceLitre);
            invoicePrice = parseFloat(invoicePrice);

            totalPrice = invoiceLitre * (invoicePrice + (invoicePrice / 100 * 18));
            totalVat = totalPrice / 100 * 18;
            totalPrice = Math.round((totalPrice + Number.EPSILON) * 100) / 100;
            totalVat = Math.round((totalVat + Number.EPSILON) * 100) / 100;

            $(".InvoiceTotalPriceSection").text("*" + totalPrice.toString().replace(".", ","));
            $("#InvoiceVatPriceSection").text("*" + totalVat.toString().replace(".", ","));
        }
    }
    else if (invoicePrice != "" || invoicePrice != null)
    {
        if (invoiceLitre != "" || invoiceLitre != null)
        {
            invoiceLitre = parseFloat(invoiceLitre);
            invoicePrice = parseFloat(invoicePrice);

            totalPrice = invoiceLitre * (invoicePrice + (invoicePrice / 100 * 18));
            totalVat = totalPrice - (totalPrice / 100 * 18);
            totalPrice = Math.round((totalPrice + Number.EPSILON) * 100) / 100;
            totalVat = Math.round((totalVat + Number.EPSILON) * 100) / 100;

            $(".InvoiceTotalPriceSection").text("*" + totalPrice.toString().replace(".", ","));
            $("#InvoiceVatPriceSection").text("*" + totalVat.toString().replace(".", ","));
        }
    }

    
}

/**
 * Updates the zeros in the string.
 * @param {number} output the output of the string.
 * @param {number} index the output of the string.
 */
function UpdateZeros(output, index)
{
    var theZeros = -1;
    var returnString = "";
    switch (index)
    {
        case 0:
            theZeros = zerosData.ZerosInInvoices;
            break;
        case 1:
            theZeros = zerosData.ZerosInEku;
            break;
        case 2:
            theZeros = zerosData.ZerosInZReports;
            break;
    }

    var powerOf10 = Math.pow(10, theZeros);


    for (var i = output; i < powerOf10;)
    {
        if (output == 0) {
            break;
        }
        else
        {
            returnString = returnString.concat("0");
            i *= 10;
        }
    }
    
    var newOutput = returnString.concat(output.toString()).toString();

    return newOutput;
}

//The json data for gas prices getting

$(document).ready(function ()
{
    addTextDanger("invoiceLabel", 10);

    disableButton("addInvoice");
    disableButton("gasPriceUpdate");

    $("#invoiceText_1").keyup(function ()
    {
        var theInput = $(this).val();
        if (invoiceInput1Reg.test(theInput))
        {
            inputAreTrue("#invoiceLabel_1");
            var inputsAreTrue = allInputsAreTrue("invoiceLabel", 10) && hasInput();

            $("#InvoiceLitreSection").text(theInput.replace(".", ","));
            CalculateInvoicePrice();

            if (inputsAreTrue) {
                enableButton("addInvoice");
            }
        }
        else {
            inputAreFalse("#invoiceLabel_1");
            disableButton("addInvoice");
        }
    });
    $("#invoiceText_2").keyup(function ()
    {
        var theInput = $(this).val();
        if (invoiceInput2Reg.test(theInput))
        {
            inputAreTrue("#invoiceLabel_2");
            var inputsAreTrue = allInputsAreTrue("invoiceLabel", 10) && hasInput();

            $("#InvoicePriceSection").text(theInput.replace(".", ","));
            CalculateInvoicePrice();

            if (inputsAreTrue) {
                enableButton("addInvoice");
            }
        }
        else {
            inputAreFalse("#invoiceLabel_2");
            disableButton("addInvoice");
        }
    });
    $("#invoiceText_3").keyup(function ()
    {
        var theInput = $(this).val();
        
        if (instanceOfDate.test(theInput))
        {
            inputAreTrue("#invoiceLabel_3");
            var inputsAreTrue = allInputsAreTrue("invoiceLabel", 10) && hasInput();

            $("#InvoiceDateSection").text(theInput.replace("/", "-").replace("/", "-"));

            if (inputsAreTrue) {
                enableButton("addInvoice");
            }
        }
        else {
            inputAreFalse("#invoiceLabel_3");
            disableButton("addInvoice");
        }
    });
    $("#invoiceText_4").keyup(function ()
    {
        var theInput = $(this).val();
        if (hourRegex.test(theInput))
        {
            inputAreTrue("#invoiceLabel_4");
            var inputsAreTrue = allInputsAreTrue("invoiceLabel", 10) && hasInput();

            $("#InvoiceHourSection").text(theInput);

            if (inputsAreTrue) {
                enableButton("addInvoice");
            }
        }
        else {
            inputAreFalse("#invoiceLabel_4");
            disableButton("addInvoice");
        }
    });
    $("#invoiceText_5").keyup(function ()
    {
        var theInput = $(this).val();
        if (zReportRegex.test(theInput))
        {
            inputAreTrue("#invoiceLabel_5");
            var inputsAreTrue = allInputsAreTrue("invoiceLabel", 10) && hasInput();
            var UpdatedInput = UpdateZeros(parseFloat(theInput), 2);
            $("#InvoiceZReportSection").text("Z NO : " + UpdatedInput);

            if (inputsAreTrue) {
                enableButton("addInvoice");
            }
        }
        else {
            inputAreFalse("#invoiceLabel_5");
            disableButton("addInvoice");
        }
    });
    $("#invoiceText_6").keyup(function ()
    {
        var theInput = $(this).val();
        if (ekuNoRegex.test(theInput)) {
            inputAreTrue("#invoiceLabel_6");
            var inputsAreTrue = allInputsAreTrue("invoiceLabel", 10) && hasInput();
            var UpdatedInput = UpdateZeros(parseFloat(theInput), 1);
            $("#InvoiceEkuSection").text("EKU NO : " + UpdatedInput);

            if (inputsAreTrue) {
                enableButton("addInvoice");
            }
        }
        else {
            inputAreFalse("#invoiceLabel_6");
            disableButton("addInvoice");
        }
    });
    $("#invoiceText_7").keyup(function ()
    {
        var theInput = $(this).val();
        if (fisRegex.test(theInput)) {
            inputAreTrue("#invoiceLabel_7");
            var inputsAreTrue = allInputsAreTrue("invoiceLabel", 10) && hasInput();
            var UpdatedInput = UpdateZeros(parseFloat(theInput), 0);
            $("#InvoiceNoSection").text("FIS NO : " + UpdatedInput);

            if (inputsAreTrue) {
                enableButton("addInvoice");
            }
        }
        else {
            inputAreFalse("#invoiceLabel_7");
            disableButton("addInvoice");
        }
    });
    $("#invoiceText_8").keyup(function ()
    {
        var theInput = $(this).val();
        if (tabancaRegex.test(theInput)) {
            inputAreTrue("#invoiceLabel_8");
            var inputsAreTrue = allInputsAreTrue("invoiceLabel", 10) && hasInput();

            //$("#").text();

            if (inputsAreTrue) {
                enableButton("addInvoice");
            }
        }
        else {
            inputAreFalse("#invoiceLabel_8");
            disableButton("addInvoice");
        }
    });

    $("#invoiceText_9").keyup(function ()
    {
        var theInput = $(this).val();
        if (plateRegex.test(theInput)) {
            inputAreTrue("#invoiceLabel_9");
            var inputsAreTrue = allInputsAreTrue("invoiceLabel", 10) && hasInput();

            $("#InvoicePlateSection").text(theInput.toUpperCase().replace(' ','').replace(' ',''));

            if (inputsAreTrue) {
                enableButton("addInvoice");
            }
        }
        else {
            inputAreFalse("#invoiceLabel_9");
            disableButton("addInvoice");
        }
    });

    $("#invoiceText_10").keyup(function ()
    {
        var theInput = $(this).val();
        if (pumpRegex.test(theInput))
        {
            inputAreTrue("#invoiceLabel_10");
            var inputsAreTrue = allInputsAreTrue("invoiceLabel", 10) && hasInput();

            //$("#").text();

            if (inputsAreTrue) {
                enableButton("addInvoice");
            }
        }
        else {
            inputAreFalse("#invoiceLabel_10");
            disableButton("addInvoice");
        }
    });

    $("#searchPlateInput").keyup(function () {
        var theInput = $(this).val();
        if (plateRegex.test(theInput))
        {
            inputAreTrue("#searchPlateLabel");
            enableButton("searchPlateButton");
        }
        else {
            inputAreFalse("#searchPlateLabel");
            disableButton("searchPlateButton");
        }
    });
});