//Contains and defines the address line input creator index.
var theUpdateIndex = -1;

//The current tax number.
var taxNumber = "";

//The password regex for login.
var passwordRegex = /^(\d){6}$/;

//Input 1 regex
var beginDateInstance = /^((([0-2][0-9])|(30)|(31))\/((0[0-9])|(11)|(12))\/(20\d{2}))$/;

//Input container index for cash system.
var inputContainerIndex = 1;

/**
 * Input 2 regex
 * @param {string} kno kimlik no
 * */
var vergikimlik = (kno) => {
    if (kno.length === 10) {
        let v = [];
        let lastDigit = Number(kno.charAt(9));
        for (let i = 0; i < 9; i++) {
            let tmp = (Number(kno.charAt(i)) + (9 - i)) % 10;
            v[i] = (tmp * 2 ** (9 - i)) % 9;
            if (tmp !== 0 && v[i] === 0) v[i] = 9;
        }

        let sum = v.reduce((a, b) => a + b, 0) % 10;
        return (10 - (sum % 10)) % 10 === lastDigit;
    }
    return false;
};

//Input 3 regex

/**
 * Returns a boolean if one of the elements is in the list.
 * @param {string[]} array The array os strings.
 * @param {string} text The text.
 */
var listElementsRegex = (array, text) => {
    var elements = array;

    for (var i = 0; i < elements.length; i++) {
        if (text == elements[i]) {
            return true;
        }
    }

    return false;
};

//Input 4 regex
var gasStationNameRegex = /^(.){10,}$/;

//Input 5 regex
var gasTypeRegex = /^(.){5,}$/;

//Input 6 regex
var cashLettersRegex = /^([A-Z]){1,3}$/;

//Input 7 regex
var cashIdRegex = /^(\d){10}$/;

//Input 8, 9, 10 regex
var zerosRegex = /^(\d){1}$/;

//Input 11 regex
var zReportIndexRegex = /^(\d){1,5}$/;

//Input 12, 13, 14 regex
var miscIndexRegex = /^(\d){1}$/;

//Mass payment input 1 regex
var plateRegex = /^([A-Z0-9\s]){5,12}$/;

$(document).ready(function () {

    addTextDanger("label", 14);
    addTextDanger("MassPaymentLabel", 1);
    addTextDanger("updateLabel", 14);

    DisableElement("#addCash");
    DisableElement("#massPaymentButton");
    DisableElement("#InvoiceCreatorContainer input");
    HideInputsForCashSystem("#input_container_", 10);
    HideInputsForCashSystem("#update_input_container_", 10);
    HideInputsForCashSystem("#update_other_input_container_", 10);
    HideInputsForCashSystem("#datePriceContainer_", 10);
    addTextDanger("gasDateLabel", 14);
    addTextDanger("gasPriceLabel", 14);

    $("#massPayment").click(function ()
    {
        $("#MassPaymentInput_1").val('');
        addTextDanger("MassPaymentLabel", 1);
    })

    $(".closeAddCash").click(function ()
    {
        inputContainerIndex = 1;
        RemoveInputs("#input_3", 10);
        addTextDanger("label", 14);
    });

    $(".closeUpdateCash").click(function ()
    {
        inputContainerIndex = 1;
        RemoveInputs("#updateInput_11", 10);
        addTextDanger("updateLabel", 11);
    })

    $(".closeUpdateOtherCash").click(function () {
        inputContainerIndex = 1;
        RemoveInputs("#uOtherInput_11", 10);
        addTextDanger("updateLabel", 11);
    })

    $("#addTitles").click(function () {
        var ind = DisplayInput("#input_3", "#input_container_", inputContainerIndex);
        inputContainerIndex = ind;
    });

    $("#removeTitles").click(function () {
        var ind = HideInput("#input_3", "#input_container_", inputContainerIndex);
        inputContainerIndex = ind;
    });

    $(".MainUpdate #addUpdateTitles").click(function () {
        var ind = DisplayInput("#updateInput_11", "#update_input_container_", inputContainerIndex);
        inputContainerIndex = ind;
    });

    $(".MainUpdate #removeUpdateTitles").click(function () {
        var ind = HideInput("#updateInput_11", "#update_input_container_", inputContainerIndex);
        inputContainerIndex = ind;
    });

    $(".OtherUpdate #addUpdateTitles").click(function () {
        var ind = DisplayInput("#uOtherInput_11", "#update_other_input_container_", inputContainerIndex);
        console.log(ind);
        inputContainerIndex = ind;
    });

    $(".OtherUpdate #removeUpdateTitles").click(function () {
        var ind = HideInput("#uOtherInput_11", "#update_other_input_container_", inputContainerIndex);
        console.log(ind);
        inputContainerIndex = ind;
    });

    $("#contact_user_check").click(function () {
        var checked = $("#contact_user_check").prop("checked");
        var allTableElements = document.getElementById("tableElements").children.length;
        if (checked) {
            for (var i = 0; i < allTableElements; i++) {
                $("#contact_user_check_" + i).prop("checked", true);
            }
        }
        else {
            for (var i = 0; i < allTableElements; i++) {
                $("#contact_user_check_" + i).prop("checked", false);
            }
        }
    });

    //Input 1 Regex check
    $("#input_1").keyup(function () {
        var inp = $(this).val();
        if (beginDateInstance.test(inp)) {
            inputAreTrue("#label_1");
            var inputsAreTrue = allInputsAreTrue("label", 14);
            if (inputsAreTrue) {
                $("#addCash").prop("disabled", false);
                $("#login").prop("disabled", false);
            }
        }
        else {
            inputAreFalse("#label_1");
            $("#addCash").prop("disabled", true);
        }
    });

    //Input 2 Regex check
    $("#input_2").keyup(function () {
        var input = $(this).val();
        if (vergikimlik(input)) {
            inputAreTrue("#label_2");

            var inputsAreTrue = allInputsAreTrue("label", 14);
            if (inputsAreTrue) {
                $("#addCash").prop("disabled", false);
            }
        }
        else {
            inputAreFalse("#label_2");
            $("#addCash").prop("disabled", true);
        }
    });

    //Input 3 Regex check
    $("#cashNumberMenu li a").click(function () {
        var item = $(this).attr("id");
        var itemText = $("#" + item).text();
        $("#cashNumber").text(itemText);

        if (listElementsRegex(["Beko", "Mepsan", "Arçelik", "Profilo", "Turpak"], $("#cashNumber").text())) {
            inputAreTrue("#label_3");
            var inputsAreTrue = allInputsAreTrue("label", 14);
            if (inputsAreTrue) {
                $("#addCash").prop("disabled", false);
            }
        }
    });

    //Input 4 Regex check
    $("#input_31, #input_32, #input_33, #input_34, #input_35, #input_36, #input_37, #input_38, #input_39, #input_310")
        .keyup(function ()
        {
            var input = $(this).val();
            ReadInput(input, gasStationNameRegex, "label", "#label_4", 14, "#addCash");
        });

    //Input 5 Regex check
    $("#input_3").keyup(function () {
        var input = $(this).val();
        ReadInput(input, gasTypeRegex, "label", "#label_5", 14, "#addCash");
    });

    //Input 6 Regex check
    $("#input_4").keyup(function () {
        var input = $(this).val();
        ReadInput(input, cashLettersRegex, "label", "#label_6", 14, "#addCash");
    });

    //Input 7 Regex check
    $("#input_5").keyup(function () {
        var input = $(this).val();
        ReadInput(input, cashIdRegex, "label", "#label_7", 14, "#addCash");
    });

    //Input 8 Regex check
    $("#input_6").keyup(function () {
        var input = $(this).val();
        ReadInput(input, zerosRegex, "label", "#label_8", 14, "#addCash");
    });

    //Input 9 Regex check
    $("#input_7").keyup(function () {
        var input = $(this).val();
        ReadInput(input, zerosRegex, "label", "#label_9", 14, "#addCash");
    });

    //Input 10 Regex check
    $("#input_8").keyup(function () {
        var input = $(this).val();
        ReadInput(input, zerosRegex, "label", "#label_10", 14, "#addCash");
    });

    //Input 11 Regex check
    $("#input_9").keyup(function () {
        var input = $(this).val();
        ReadInput(input, zReportIndexRegex, "label", "#label_11", 14, "#addCash");
    });

    //Input 12 Regex check
    $("#input_10").keyup(function () {
        var input = $(this).val();
        ReadInput(input, miscIndexRegex, "label", "#label_12", 14, "#addCash");
    });

    //Input 13 Regex check
    $("#input_11").keyup(function () {
        var input = $(this).val();
        ReadInput(input, miscIndexRegex, "label", "#label_13", 14, "#addCash");
    });

    //Input 14 Regex check
    $("#input_12").keyup(function () {
        var input = $(this).val();
        ReadInput(input, miscIndexRegex, "label", "#label_14", 14, "#addCash");
    });


    //Update input 1 Regex check
    $("#updateInput_1").keyup(function () {
        var input = $(this).val();
        if (vergikimlik(input)) {
            inputAreTrue("#updateLabel_1");

            var inputsAreTrue = allInputsAreTrue("label", 14);
            if (inputsAreTrue) {
                $("#updateCash").prop("disabled", false);
            }
        }
        else {
            inputAreFalse("#updateLabel_1");
            $("#updateCash").prop("disabled", true);
        }
    });

    //Update input 2 Regex check
    $("#updateCashNumberMenu li a").click(function () {
        var item = $(this).attr("id");
        var itemText = $("#" + item).text();
        $("#updateCashNumber").text(itemText);

        if (listElementsRegex(["Beko", "Mepsan", "Arçelik", "Profilo", "Turpak"], $("#updateCashNumber").text())) {
            inputAreTrue("#updateLabel_2");
            var inputsAreTrue = allInputsAreTrue("updateLabel", 11);
            if (inputsAreTrue) {
                $("#updateCash").prop("disabled", false);
            }
        }
    });

    //Update input 3 Regex check
    $("#updateInput_3").keyup(function () {
        var input = $(this).val();
        ReadInput(input, cashLettersRegex, "updateLabel", "#updateLabel_3", 11, "#updateCash");
    });

    //Update input 4 Regex check
    $("#updateInput_4").keyup(function () {
        var input = $(this).val();
        ReadInput(input, cashIdRegex, "updateLabel", "#updateLabel_4", 11, "#updateCash");
    });

    //Update input 5 Regex check
    $("#updateInput_5").keyup(function () {
        var input = $(this).val();
        ReadInput(input, zerosRegex, "updateLabel", "#updateLabel_5", 11, "#updateCash");
    });

    //Update input 6 Regex check
    $("#updateInput_6").keyup(function () {
        var input = $(this).val();
        ReadInput(input, zerosRegex, "updateLabel", "#updateLabel_6", 11, "#updateCash");
    });

    //Update input 7 Regex check
    $("#updateInput_7").keyup(function () {
        var input = $(this).val();
        ReadInput(input, zerosRegex, "updateLabel", "#updateLabel_7", 11, "#updateCash");
    });

    //Update input 8 Regex check
    $("#updateInput_8").keyup(function () {
        var input = $(this).val();
        ReadInput(input, gasTypeRegex, "updateLabel", "#updateLabel_8", 11, "#updateCash");
    });

    //Update input 9 Regex check
    $("#updateInput_9").keyup(function () {
        var input = $(this).val();
        ReadInput(input, miscIndexRegex, "updateLabel", "#updateLabel_9", 11, "#updateCash");
    });

    //Update input 10 Regex check
    $("#updateInput_10").keyup(function () {
        var input = $(this).val();
        ReadInput(input, miscIndexRegex, "updateLabel", "#updateLabel_10", 11, "#updateCash");
    });

    //Update input 11 Regex check
    $("#updateInput_111, #updateInput_112, #updateInput_113, #updateInput_114, #updateInput_115, #updateInput_116, #updateInput_117, #updateInput_118, #updateInput_119, #updateInput_1110")
        .keyup(function ()
        {
            var input = $(this).val();
            ReadInput(input, gasStationNameRegex, "updateLabel", "#updateLabel_11", 11, "#updateCash");
        });

    //Mass Payment input 10 Regex check
    $("#MassPaymentInput_1").keyup(function () {
        var inputsAreFalse = () => {
            const checkedCount = $('.massPaymentChecks:checked').length;
            return checkedCount == 0;
        }

        var checkedAreZero = inputsAreFalse();

        var input = $(this).val();

        if (plateRegex.test(input)) {
            inputAreTrue("#MassPaymentLabel_1");
            if (!checkedAreZero) {
                $("#massPaymentButton").prop("disabled", false);
            }
        }
        else {
            inputAreFalse("#MassPaymentLabel_1");
            $("#massPaymentButton").prop("disabled", true);
        }
    });

    $('.massPaymentChecks').change(function ()
    {
        var inputsAreFalse = () => {
            const checkedCount = $('.massPaymentChecks:checked').length;
            return checkedCount == 0;
        }

        var checkedAreZero = inputsAreFalse();

        var input = $("#MassPaymentInput_1").val();

        if (plateRegex.test(input)) {
            inputAreTrue("#MassPaymentLabel_1");
            console.log(!checkedAreZero)
            if (!checkedAreZero) {
                $("#massPaymentButton").prop("disabled", false);
            }
            else
            {
                $("#massPaymentButton").prop("disabled", true);
            }
        }
        else {
            inputAreFalse("#MassPaymentLabel_1");
            $("#massPaymentButton").prop("disabled", true);
        }
    });
});

/**
 * 
 * @param {string} theCashZeros
 * @param {string} taxNumberInvoiceMaker
 * @param {string} theData
 */
function createRow(theCashZeros, taxNumberInvoiceMaker, theData) {
    var index = document.getElementById("tableElements").children.length;
    var obj = JSON.parse(theData);

    var elements = '<tr id="adminPanelContent_' + index + '"><td><a class="mb-0 taxNumberLink text-dark" id="taxNumber_' + index + '" onclick="getTheTaxNumber(' + theCashZeros + ', ' + taxNumberInvoiceMaker + ', ' + obj[index].TaxNumber + ', ' + index + ')"> ' + obj[index].GasStationName[0] + '</a></td><td><ul class="list-inline mb-0"><li class="list-inline-item"><a href="javascript: void (0); " id="deleteApiKey" onclick="deleteApiKey(' + index + ' + 1)" title="Delete" class="px-2 text-danger"><i class="bx bx-trash-alt font-size-05"></i></a></li><li class="list-inline-item"><a href="javascript: void (0); " data-bs-toggle="modal" data-bs-placement="top" data-bs-target="#exampleModal2" id="updateApiKey" onclick="updateApiKey(' + index + ' + 1) " title="Update" class="px-2 text-info"><i class="bx bxs-comment-edit font-size-05"></i></a></li><li class="list-inline-item"><a href="javascript: void (0); " data-bs-toggle="modal" data-bs-placement="top" data-bs-target="#exampleModal2" id="updateApiKey" onclick="" title="Update" class="px-2 text-success"><i class="bx bx-search font-size-05"></i></a></li></ul></td></tr>';
    $("#tableElements").append(elements);
}

/**
 * Gets the tax number when chosen.
 * @param {string} zerosUrl The Url where the cash data contains.
 * @param {string} url The Url.
 * @param {number} index The Index.
 * @param {string} taxNumber Gas station name.
 */
function getTheTaxNumber(zerosUrl, url, taxNumber, index) {
    var theTaxNumber = taxNumber;
    chosenTaxNumber = taxNumber;

    $.ajax({
        type: 'GET',
        url: url,
        data: {
            TaxNumber: taxNumber
        },
        success: function (theData)
        {
            if (theData.includes("Benzin istasyonu"))
            {
                alert(theData);
            }
            else
            {
                $("#invoiceText_1").prop("disabled", false);
                $("#invoiceText_2").prop("disabled", false);
                $("#invoiceText_3").prop("disabled", false);
                $("#invoiceText_4").prop("disabled", false);
                $("#invoiceText_9").prop("disabled", false);
                $("#invoiceText_7").prop("disabled", false);
                $("#invoiceText_11").prop("disabled", false);

                if (document.getElementById("DraftInvoiceSection").children.length == 0) {
                    $("#DraftInvoiceSection").append('<div id="page"><div class="row-texts"><div class="row-text" id="InvoiceTaxNumberSection">Firma ismi</div></div><div class="col-texts"><div class="row-texts"><div class="row-text text-left" id="InvoiceDateSection">00-00-0000</div><div class="row-text text-left" id="InvoiceNoSection">FİŞ NO: 0000</div></div><div class="row-texts row-texts2"><div class="row-text text-right" id="InvoiceHourSection">00:00</div></div></div><div class="row-texts"><div class="row-text row-texts-big" id="InvoicePlateSection">10AAA123</div></div><div class="col-texts"><div class="row-texts"><div class="row-text text-left"><div id="InvoiceLitreSection">1,00 LT</div> X <div id="InvoicePriceSection">1,00</div></div><div class="row-text text-left" id="InvoiceGasTypeSection">MOT.VPRO</div></div><div class="row-texts row-texts2"><div class="row-text text-right">%18</div></div><div class="row-texts row-texts2"><div class="row-text text-right InvoiceTotalPriceSection">*200</div></div></div><hr id="line"><div class="col-texts"><div class="row-texts"><div class="row-text text-left row-texts-big">TOPKDV</div><div class="row-text text-left row-texts-big">TOPLAM</div></div><div class="row-texts row-texts-right"><div class="row-text text-right row-texts-big" id="InvoiceVatPriceSection">*10,00</div><div class="row-text text-right row-texts-big InvoiceTotalPriceSection">*200,00</div></div></div><div class="col-texts"><div class="row-texts"><div class="row-text text-left">NAKİT</div></div><div class="row-texts row-texts-right"><div class="row-text text-right InvoiceTotalPriceSection">*200,00</div></div></div><div><img id="InvoiceQRCodeSection" src=""></div><div class="row-texts"><div class="row-text">İYİ YOLCULUKLAR DİLERİZ</div></div><div class="col-texts col-texts-spaced"><div class="row-texts"><div class="row-text text-left" id="InvoiceEkuSection">EKU NO: 0001</div></div><div class="row-texts row-texts-right"><div class="row-text text-right" id="InvoiceZReportSection">Z NO: 0001</div></div></div><div class="row-texts"><div class="row-text">MFAU 000000000000</div></div></div>');
                }

                var allElements = document.getElementById("tableElements").children.length;
                $("#adminPanelContent_" + index).css({ "background-color": "#39991C" });
                $("#taxNumber_" + index).removeClass("text-dark");
                $("#taxNumber_" + index).addClass("text-white");

                for (var i = 0; i < allElements; i++) {
                    if (i != index) {
                        $("#adminPanelContent_" + i).css({ "background-color": "#FFFFFF" });
                        $("#taxNumber_" + index).removeClass("text-white");
                        $("#taxNumber_" + index).addClass("text-dark");
                    }
                }

                taxNumber = $("#taxNumber_" + index).text();
                $("#invoiceModalLabel").text("Yeni Fatura - " + taxNumber);
                jsonData = JSON.parse(JSON.stringify(theData));

                $("#InvoiceTaxNumberSection").text(cashData.GasStationName.join("\n"));


                var size = 200;
                var qrCodeData = generateQRCode(theTaxNumber, size);

                document.getElementById("InvoiceQRCodeSection").src = qrCodeData;
                document.getElementById("InvoiceQRCodeSection").style.width = "100%";
                document.getElementById("InvoiceQRCodeSection").style.height = "100%";
            }
        }
    });

    $.ajax({
        type: 'GET',
        url: zerosUrl,
        data: {
            TaxNumber: taxNumber
        },
        success: function (theData) {
            cashData = JSON.parse(JSON.parse(JSON.stringify(theData)));
            $("#InvoiceGasTypeSection").text(cashData.GasType);
        }
    });
}

function generateQRCode(content, size) {
    var qr = new QRious({
        value: content,
        size: size
    });
    return qr.toDataURL();
}

function deleteRow(index) {
    document.getElementById("tableElements").children.item(index - 1).remove();
}

/**
 * 
 * @param {string} taxNumber
 * @param {string} link
 * */
function updateApiKey(taxNumber, link)
{
    $.ajax({
        type: 'GET',
        url: link,
        data: {
            TaxNumber: taxNumber
        },
        success: function (theData)
        {
            cashData = JSON.parse(JSON.parse(JSON.stringify(theData)));

            var obj = [cashData].filter(x => x.TaxNumber == taxNumber)[0];

            var gasStationNameInputs = obj.GasStationName;

            $("#updateInput_1").val(obj.TaxNumber);
            $("#updateInput_3").val(obj.CashLetters);
            $("#updateInput_4").val(obj.CashId);
            $("#updateInput_5").val(obj.ZerosInEku);
            $("#updateInput_6").val(obj.ZerosInZReports);
            $("#updateCashNumber").text(obj.CashTypeName);
            $("#updateInput_7").val(obj.ZerosInInvoices);
            $("#updateInput_8").val(obj.GasType);
            $("#updateInput_9").val(obj.WeaponNumber);
            $("#updateInput_10").val(obj.PumpNumber);
            for (var i = 1; i <= 10; i++) {
                $("#updateInput_11" + i).val(gasStationNameInputs[i - 1]);
            }

            for (var i = 1; i <= 14; i++) {
                inputAreTrue("#updateLabel_" + i);
            }
        }
    });   
}

/**
 * 
 * @param {string} taxNumber
 * @param {string} link
 * */
function updateApiKey_2(taxNumber, link)
{
    $.ajax({
        type: 'GET',
        url: link,
        data: {
            TaxNumber: taxNumber
        },
        success: function (theData)
        {
            cashData = JSON.parse(JSON.parse(JSON.stringify(theData)));

            var obj = [cashData].filter(x => x.TaxNumber == taxNumber)[0];
            var gasStationNameInputs = obj.GasStationName;

            //$("#updateInput_1").val(obj.GasType);
            $("#updateOtherInput_2").val(obj.TaxNumber);
            $("#updateOtherInput_3").val(obj.GasType);

            for (var i = 1; i <= 10; i++) {
                $("#updateOtherInput_3" + i).val(gasStationNameInputs[i - 1]);
            }

            $("#updateOtherInput_4").val(obj.CashLetters);
            $("#updateOtherInput_5").val(obj.CashId);
            $("#updateOtherInput_6").val(obj.ZerosInEku);
            $("#updateOtherCashNumber").text(obj.CashTypeName);
            $("#updateOtherInput_7").val(obj.ZerosInZReports);
            $("#updateOtherInput_8").val(obj.ZerosInInvoices);
            //$("#updateInput_9").val(obj.Password);
            //$("#updateInput_10").val(obj.Password);
            $("#updateOtherInput_11").val(obj.WeaponNumber);
            $("#updateOtherInput_12").val(obj.PumpNumber);

            for (var i = 1; i <= 14; i++) {
                inputAreTrue("#updateOtherLabel_" + i);
            }
        }
    });
}

/* <div>
    <ul class="nav nav-pills">
        <li class="nav-item">
            <a aria-current="page" class="router-link-active router-link-exact-active nav-link active" title="" data-bs-original-title="List" aria-label="List">
                <i class="bx bx-list-ul"></i>
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link" title="" data-bs-original-title="Grid" aria-label="Grid">
                <i class="bx bx-grid-alt"></i>
            </a>
        </li>
    </ul>
</div> *@

                            @* <div class="dropdown">
    <a class="btn btn-link text-muted py-1 font-size-056 shadow-none dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="bx bx-dots-horizontal-rounded"></i></a>
    <ul class="dropdown-menu dropdown-menu-end">
        <li><a class="dropdown-item" href="#">Action</a></li>
        <li><a class="dropdown-item" href="#">Another action</a></li>
        <li><a class="dropdown-item" href="#">Something else here</a></li>
    </ul>
</div> */