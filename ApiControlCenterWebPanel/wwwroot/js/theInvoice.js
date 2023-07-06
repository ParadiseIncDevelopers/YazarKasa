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
//total fiyat
var totalPriceRegex = /^(\d)+(\.){1}(\d){2,4}$/;

//If the main page has input
var hasInput = () => document.getElementById("invoiceModalLabel").innerHTML.includes(" - ");

//If in the main page gas prices management has not "choose".
var hasGasPriceInput = () => $("#gasPriceUsers").text() != "choose";

/**
 * 
 * @param {string} element
 */
function CalculateIf(element)
{
    var addPoint = (numberString) => {

        if (!numberString.includes(","))
        {
            return numberString + "," + "00";
        }
        else
        {
            let [integerPart, decimalPart] = numberString.split(",");
            let formattedIntegerPart = "";

            while (integerPart.length > 3) {
                formattedIntegerPart = "." + integerPart.slice(-3) + formattedIntegerPart;
                integerPart = integerPart.slice(0, -3);
            }

            return integerPart + formattedIntegerPart + "," + decimalPart;
        }
    }

    var invoicePrice = $("#invoiceText_2").val();
    var calculate = 0;

    if (invoicePrice != "")
    {
        if (element.includes("_11"))
        {
            var invoiceTotalPrice = $(element).val();
            calculate = parseFloat(invoiceTotalPrice) / parseFloat(invoicePrice);
            calculate = Math.round((calculate + Number.EPSILON) * 100) / 100;
            var totalVat = parseFloat(invoiceTotalPrice) / 100 * 18;

            calculate = calculate.toFixed(2);
            totalVat = totalVat.toFixed(2);

            $("#invoiceText_1").val(calculate.toString());
            $("#InvoiceLitreSection").text(addPoint($("#invoiceText_1").val().toString().replace(".", ",")).concat("\xa0"));
            $("#InvoicePriceSection").text("\xa0".concat(addPoint(invoicePrice.toString().replace(".", ","))));
            $(".InvoiceTotalPriceSection").text("*" + addPoint($("#invoiceText_11").val().toString().replace(".",",")));
            $("#InvoiceVatPriceSection").text("*" + addPoint(totalVat.toString().replace(".", ",")));
            inputAreTrue("#invoiceLabel_1");
        }
        else if (element.includes("_1"))
        {
            var invoiceLitre = $(element).val();
            calculate = parseFloat(invoiceLitre) * parseFloat(invoicePrice);
            calculate = Math.round((calculate + Number.EPSILON) * 100) / 100;
            var totalVat = (calculate / 100 * 18);

            calculate = calculate.toFixed(2);
            totalVat = totalVat.toFixed(2);

            $("#invoiceText_11").val(calculate.toString());
            $("#InvoiceLitreSection").text(addPoint($("#invoiceText_1").val().toString().replace(".", ",")));
            $("#InvoicePriceSection").text(addPoint(invoicePrice.toString().replace(".", ",")));
            $(".InvoiceTotalPriceSection").text("*" + addPoint($("#invoiceText_11").val().toString().replace(".", ",")));
            $("#InvoiceVatPriceSection").text("*" + addPoint(totalVat.toString().replace(".", ",")));
            inputAreTrue("#invoiceLabel_11");
        }
    }
}

/**
 * Updates the zeros in the string.
 * @param {number} output the output of the string.
 * @param {number} index the index of the zeroAdder.
 */
function UpdateZeros(output, index)
{
    var theZeros = -1;
    switch (index)
    {
        case 0:
            theZeros = cashData.ZerosInInvoices;
            break;
        case 1:
            theZeros = cashData.ZerosInEku;
            break;
        case 2:
            theZeros = cashData.ZerosInZReports;
            break;
    }

    return output.toString().padStart(theZeros, '0');
}

//The json data for gas prices getting

$(document).ready(function ()
{
    addTextDanger("invoiceLabel", 11);

    disableButton("addInvoice");
    disableButton("gasPriceUpdate");
    disableButton("searchPlateButton");

    $("#invoiceText_1").keyup(function ()
    {
        var theInput = $(this).val();
        if (invoiceInput1Reg.test(theInput))
        {
            inputAreTrue("#invoiceLabel_1");
            var inputsAreTrue = allInputsAreTrue("invoiceLabel", 11) && hasInput();

            $("#InvoiceLitreSection").text(theInput.replace(".", ","));
            CalculateIf("#invoiceText_1");

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
            var inputsAreTrue = allInputsAreTrue("invoiceLabel", 11) && hasInput();

            $("#InvoicePriceSection").text("*" + theInput.replace(".", ","));

            if (inputsAreTrue) {
                enableButton("addInvoice");
            }
        }
        else {
            inputAreFalse("#invoiceLabel_2");
            disableButton("addInvoice");
        }
    });

    $("#invoiceText_11").keyup(function ()
    {
        var theInput = $(this).val();
        if (totalPriceRegex.test(theInput))
        {
            inputAreTrue("#invoiceLabel_11");
            var inputsAreTrue = allInputsAreTrue("invoiceLabel", 11) && hasInput();

            CalculateIf("#invoiceText_11");

            if (inputsAreTrue) {
                enableButton("addInvoice");
            }
        }
        else {
            inputAreFalse("#invoiceLabel_11");
            disableButton("addInvoice");
        }
    });

    $("#invoiceText_3").keyup(function ()
    {
        var theInput = $(this).val();
        
        if (instanceOfDate.test(theInput))
        {
            inputAreTrue("#invoiceLabel_3");
            var inputsAreTrue = allInputsAreTrue("invoiceLabel", 11) && hasInput();

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
            var inputsAreTrue = allInputsAreTrue("invoiceLabel", 11) && hasInput();

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
            var inputsAreTrue = allInputsAreTrue("invoiceLabel", 11) && hasInput();
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
            var inputsAreTrue = allInputsAreTrue("invoiceLabel", 11) && hasInput();
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
            var inputsAreTrue = allInputsAreTrue("invoiceLabel", 11) && hasInput();
            var UpdatedInput = UpdateZeros(parseFloat(theInput), 0);
            $("#InvoiceNoSection").text("FİŞ NO : " + UpdatedInput);

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
            var inputsAreTrue = allInputsAreTrue("invoiceLabel", 11) && hasInput();

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
            var inputsAreTrue = allInputsAreTrue("invoiceLabel", 11) && hasInput();

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
            var inputsAreTrue = allInputsAreTrue("invoiceLabel", 11) && hasInput();

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