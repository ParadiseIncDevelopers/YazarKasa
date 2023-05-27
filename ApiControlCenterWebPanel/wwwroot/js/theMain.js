//Contains and defines the address line input creator index.
var theUpdateIndex = -1;
//Contains and defines the gas prices adder and remover index.
var q = 1;
//The current tax number.
var taxNumber = "";

//The password regex for login.
var passwordRegex = /^(\d){6}$/;

//Input 1 regex
var beginDateInstance = /^((([0-2][0-9])|(30)|(31))\/((0[0-9])|(11)|(12))\/(20\d{2}))$/;

/**
 * Input 2 regex
 * @param kno {string}
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
var cashIdRegex = /^(\d){3}$/;

//Hides inputs in the adding gas station list.
function hideOtherInputs() {
    //Hides input container while adding gas station entreprise
    for (var i = 2; i <= 10; i++) {
        $("#input_container_" + i).css("display", "none");
    }

    //Hides input container for gas stations pricings
    for (var i = 1; i <= 10; i++) {
        $("#datePriceContainer_" + i).css("display", "none");
    }
}

//Input 8, 9, 10 regex
var zerosRegex = /^(\d){1}$/;

//Input 11 regex
var zReportIndex = /^(\d){1,5}$/;

$(document).ready(function () {

    hideOtherInputs();

    $("#addTitles").click(function () {
        if (q != 10) {
            q++;
            $("#input_container_" + q).css({ "display": "block" });
            $("#input_3" + q).val('');
        }
    });

    $("#removeTitles").click(function () {
        if (q != 1) {
            $("#input_container_" + q).css({ "display": "none" });
            $("#input_3" + q).val('');
            q--;
        }
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
    })

    $("#addCash").prop("disabled", true);
    addTextDanger("label", 11);

    for (var i = 1; i <= 6; i++) {
        inputAreTrue("#updateLabel_" + i);
    }
    addTextDanger("gasDateLabel", 11);
    addTextDanger("gasPriceLabel", 11);
    $("#InvoiceCreatorContainer input").prop("disabled", true);

    //Input 1 Regex check
    $("#input_1").keyup(function () {
        var inp = $(this).val();
        if (beginDateInstance.test(inp)) {
            inputAreTrue("#label_1");
            var inputsAreTrue = allInputsAreTrue("label", 11);
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
        var inp = $(this).val();
        if (vergikimlik(inp)) {
            inputAreTrue("#label_2");

            var inputsAreTrue = allInputsAreTrue("label", 11);
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

        if (listElementsRegex(["Beko", "Mepsan", "Arçelik"], $("#cashNumber").text())) {
            inputAreTrue("#label_3");
            var inputsAreTrue = allInputsAreTrue("label", 11);
            if (inputsAreTrue) {
                $("#addCash").prop("disabled", false);
            }
        }
    });

    //Input 4 Regex check
    $("#input_31, #input_32, #input_33, #input_34, #input_35, #input_36, #input_37, #input_38, #input_39, #input_310").keyup(function () {
        var inp = $(this).val();
        if (gasStationNameRegex.test(inp)) {
            inputAreTrue("#label_4");

            var inputsAreTrue = allInputsAreTrue("label", 11);
            if (inputsAreTrue) {
                $("#addCash").prop("disabled", false);
            }
        }
        else {
            inputAreFalse("#label_4");
            $("#addCash").prop("disabled", true);
        }
    });

    //Input 5 Regex check
    $("#input_3").keyup(function () {
        var inp = $(this).val();
        if (gasTypeRegex.test(inp)) {
            inputAreTrue("#label_5");

            var inputsAreTrue = allInputsAreTrue("label", 11);
            if (inputsAreTrue) {
                $("#addCash").prop("disabled", false);
            }
        }
        else {
            inputAreFalse("#label_5");
            $("#addCash").prop("disabled", true);
        }
    });

    //Input 6 Regex check
    $("#input_4").keyup(function () {
        var inp = $(this).val();
        if (cashLettersRegex.test(inp)) {
            inputAreTrue("#label_6");

            var inputsAreTrue = allInputsAreTrue("label", 11);
            if (inputsAreTrue) {
                $("#addCash").prop("disabled", false);
            }
        }
        else {
            inputAreFalse("#label_6");
            $("#addCash").prop("disabled", true);
        }
    });

    //Input 7 Regex check
    $("#input_5").keyup(function () {
        var inp = $(this).val();
        if (cashIdRegex.test(inp)) {
            inputAreTrue("#label_7");

            var inputsAreTrue = allInputsAreTrue("label", 11);
            if (inputsAreTrue) {
                $("#addCash").prop("disabled", false);
            }
        }
        else {
            inputAreFalse("#label_7");
            $("#addCash").prop("disabled", true);
        }
    });

    $("#input_6").keyup(function () {
        var inp = $(this).val();
        if (zerosRegex.test(inp)) {
            inputAreTrue("#label_8");

            var inputsAreTrue = allInputsAreTrue("label", 11);
            if (inputsAreTrue) {
                $("#addCash").prop("disabled", false);
            }
        }
        else {
            inputAreFalse("#label_8");
            $("#addCash").prop("disabled", true);
        }
    });

    $("#input_7").keyup(function () {
        var inp = $(this).val();
        if (zerosRegex.test(inp)) {
            inputAreTrue("#label_9");

            var inputsAreTrue = allInputsAreTrue("label", 11);
            if (inputsAreTrue) {
                $("#addCash").prop("disabled", false);
            }
        }
        else {
            inputAreFalse("#label_9");
            $("#addCash").prop("disabled", true);
        }
    });

    $("#input_8").keyup(function () {
        var inp = $(this).val();
        if (zerosRegex.test(inp)) {
            inputAreTrue("#label_10");

            var inputsAreTrue = allInputsAreTrue("label", 11);
            if (inputsAreTrue) {
                $("#addCash").prop("disabled", false);
            }
        }
        else {
            inputAreFalse("#label_10");
            $("#addCash").prop("disabled", true);
        }
    });

    $("#input_9").keyup(function () {
        var inp = $(this).val();
        if (zReportIndex.test(inp)) {
            inputAreTrue("#label_11");

            var inputsAreTrue = allInputsAreTrue("label", 11);
            if (inputsAreTrue) {
                $("#addCash").prop("disabled", false);
            }
        }
        else {
            inputAreFalse("#label_11");
            $("#addCash").prop("disabled", true);
        }
    });

    $("#updateInput_1").keyup(function () {
        var inp = $(this).val();
        if (gasStationNameRegex.test(inp)) {
            inputAreTrue("#updateLabel_1");

            var inputsAreTrue = allInputsAreTrue("updateLabel", 6);
            if (inputsAreTrue) {
                $("#updateCash").prop("disabled", false);
            }
        }
        else {
            inputAreFalse("#updateLabel_1");
            $("#updateCash").prop("disabled", true);
        }
    });

    $("#updateInput_2").keyup(function () {
        var inp = $(this).val();
        if (passwordRegex.test(inp)) {
            inputAreTrue("#updateLabel_2");

            var inputsAreTrue = allInputsAreTrue("updateLabel", 6);
            if (inputsAreTrue) {
                $("#updateCash").prop("disabled", false);
            }
        }
        else {
            inputAreFalse("#updateLabel_2");
            $("#updateCash").prop("disabled", true);
        }
    });

    $("#updateCashNumberMenu li a").click(function () {
        var item = $(this).attr("id");
        var itemText = $("#" + item).text();
        $("#updateCashNumber").text(itemText);

        if (listElementsRegex(["Beko", "Mepsan", "Arçelik"], $("#updateCashNumber").text())) {
            inputAreTrue("#updateLabel_3");
            var inputsAreTrue = allInputsAreTrue("updateLabel", 6);
            if (inputsAreTrue) {
                $("#updateCash").prop("disabled", false);
            }
        }
    });

    $("#updateInput_4").keyup(function () {
        var inp = $(this).val();
        if (zerosRegex.test(inp)) {
            inputAreTrue("#updateLabel_4");

            var inputsAreTrue = allInputsAreTrue("updateLabel", 6);
            if (inputsAreTrue) {
                $("#updateCash").prop("disabled", false);
            }
        }
        else {
            inputAreFalse("#updateLabel_4");
            $("#updateCash").prop("disabled", true);
        }
    });

    $("#updateInput_5").keyup(function () {
        var inp = $(this).val();
        if (zerosRegex.test(inp)) {
            inputAreTrue("#updateLabel_5");

            var inputsAreTrue = allInputsAreTrue("updateLabel", 6);
            if (inputsAreTrue) {
                $("#updateCash").prop("disabled", false);
            }
        }
        else {
            inputAreFalse("#updateLabel_5");
            $("#updateCash").prop("disabled", true);
        }
    });

    $("#updateInput_6").keyup(function () {
        var inp = $(this).val();
        if (zerosRegex.test(inp)) {
            inputAreTrue("#updateLabel_6");

            var inputsAreTrue = allInputsAreTrue("updateLabel", 6);
            if (inputsAreTrue) {
                $("#updateCash").prop("disabled", false);
            }
        }
        else {
            inputAreFalse("#updateLabel_6");
            $("#updateCash").prop("disabled", true);
        }
    });

    $("#updateInput2_1").keyup(function () {
        var inp = $(this).val();
        if (gasStationNameRegex.test(inp)) {
            inputAreTrue("#updateLabel2_1");

            var inputsAreTrue = allInputsAreTrue("updateLabel2", 6);
            if (inputsAreTrue) {
                $("#updateCash2").prop("disabled", false);
            }
        }
        else {
            inputAreFalse("#updateLabel2_1");
            $("#updateCash2").prop("disabled", true);
        }
    });

    $("#updateInput2_2").keyup(function () {
        var inp = $(this).val();
        if (passwordRegex.test(inp)) {
            inputAreTrue("#updateLabel_2");

            var inputsAreTrue = allInputsAreTrue("updateLabel2", 6);
            if (inputsAreTrue) {
                $("#updateCash2").prop("disabled", false);
            }
        }
        else {
            inputAreFalse("#updateLabel2_2");
            $("#updateCash2").prop("disabled", true);
        }
    });

    $("#updateCashNumberMenu2 li a").click(function () {
        var item = $(this).attr("id");
        var itemText = $("#" + item).text();
        $("#updateCashNumber2").text(itemText);

        if (listElementsRegex(["Beko", "Mepsan", "Arçelik"], $("#updateCashNumber2").text())) {
            inputAreTrue("#updateLabel2_3");
            var inputsAreTrue = allInputsAreTrue("updateLabel2", 6);
            if (inputsAreTrue) {
                $("#updateCash2").prop("disabled", false);
            }
        }
    });

    $("#updateInput2_4").keyup(function () {
        var inp = $(this).val();
        if (zerosRegex.test(inp)) {
            inputAreTrue("#updateLabel2_4");

            var inputsAreTrue = allInputsAreTrue("updateLabel2", 6);
            if (inputsAreTrue) {
                $("#updateCash2").prop("disabled", false);
            }
        }
        else {
            inputAreFalse("#updateLabel2_4");
            $("#updateCash2").prop("disabled", true);
        }
    });

    $("#updateInput2_5").keyup(function () {
        var inp = $(this).val();
        if (zerosRegex.test(inp)) {
            inputAreTrue("#updateLabel2_5");

            var inputsAreTrue = allInputsAreTrue("updateLabel2", 6);
            if (inputsAreTrue) {
                $("#updateCash2").prop("disabled", false);
            }
        }
        else {
            inputAreFalse("#updateLabel2_5");
            $("#updateCash2").prop("disabled", true);
        }
    });

    $("#updateInput2_6").keyup(function () {
        var inp = $(this).val();
        if (zerosRegex.test(inp)) {
            inputAreTrue("#updateLabel2_6");

            var inputsAreTrue = allInputsAreTrue("updateLabel2", 6);
            if (inputsAreTrue) {
                $("#updateCash2").prop("disabled", false);
            }
        }
        else {
            inputAreFalse("#updateLabel2_6");
            $("#updateCash2").prop("disabled", true);
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

    var elements = '<tr id="adminPanelContent_' + index + '"><td><a class="mb-0 taxNumberLink text-dark" id="taxNumber_' + index + '" onclick="getTheTaxNumber(' + theCashZeros + ', ' + taxNumberInvoiceMaker + ', ' + obj[index].TaxNumber + ', ' + index + ')"> ' + obj[index].GasStationName[0] + '</a></td><td><ul class="list-inline mb-0"><li class="list-inline-item"><a href="javascript: void (0); " id="deleteApiKey" onclick="deleteApiKey(' + index + ' + 1)" title="Delete" class="px-2 text-danger"><i class="bx bx-trash-alt font-size-18"></i></a></li><li class="list-inline-item"><a href="javascript: void (0); " data-bs-toggle="modal" data-bs-placement="top" data-bs-target="#exampleModal2" id="updateApiKey" onclick="updateApiKey(' + index + ' + 1) " title="Update" class="px-2 text-info"><i class="bx bxs-comment-edit font-size-18"></i></a></li><li class="list-inline-item"><a href="javascript: void (0); " data-bs-toggle="modal" data-bs-placement="top" data-bs-target="#exampleModal2" id="updateApiKey" onclick="" title="Update" class="px-2 text-success"><i class="bx bx-search font-size-18"></i></a></li></ul></td></tr>';
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
        success: function (theData) {
            $("#InvoiceCreatorContainer input").prop("disabled", false);

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
            $("#InvoiceTaxNumberSection").text(zerosData.GasStationName.join("\n"));
            var size = 200;
            var qrCodeData = generateQRCode(theTaxNumber, size);

            document.getElementById("InvoiceQRCodeSection").src = qrCodeData;
            document.getElementById("InvoiceQRCodeSection").style.width = "100%";
            document.getElementById("InvoiceQRCodeSection").style.height = "100%";
        }
    });

    $.ajax({
        type: 'GET',
        url: zerosUrl,
        data: {
            TaxNumber: taxNumber
        },
        success: function (theData) {
            zerosData = JSON.parse(JSON.stringify(theData));
            $("#InvoiceGasTypeSection").text(zerosData.GasType);
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
        success: function (theData) {
            zerosData = JSON.parse(JSON.stringify(theData));

            var obj = [zerosData].filter(x => x.TaxNumber == taxNumber)[0];

            $("#updateInput_1").val(obj.GasType);
            $("#updateInput_2").val(obj.Password);
            $("#updateInput_4").val(obj.ZerosInEku);
            $("#updateInput_5").val(obj.ZerosInInvoices);
            $("#updateInput_6").val(obj.ZerosInZReports);
            $("#updateCashNumber").text(obj.CashTypeName);
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
        success: function (theData) {
            zerosData = JSON.parse(JSON.stringify(theData));

            var obj = [zerosData].filter(x => x.TaxNumber == taxNumber)[0];

            $("#updateInput2_1").val(obj.GasType);
            $("#updateInput2_4").val(obj.ZerosInEku);
            $("#updateInput2_5").val(obj.ZerosInInvoices);
            $("#updateInput2_6").val(obj.ZerosInZReports);
            $("#updateCashNumber2").text(obj.CashTypeName);
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
    <a class="btn btn-link text-muted py-1 font-size-16 shadow-none dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="bx bx-dots-horizontal-rounded"></i></a>
    <ul class="dropdown-menu dropdown-menu-end">
        <li><a class="dropdown-item" href="#">Action</a></li>
        <li><a class="dropdown-item" href="#">Another action</a></li>
        <li><a class="dropdown-item" href="#">Something else here</a></li>
    </ul>
</div> */