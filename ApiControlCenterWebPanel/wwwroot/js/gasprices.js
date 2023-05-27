(function ($) {
    'use strict';

    try
    {
        $('.js-datepicker-update-gasprice').daterangepicker({
            "singleDatePicker": true,
            "showDropdowns": true,
            "autoUpdateInput": false,
            locale: {
                format: 'DD/MM/YYYY'
            }
        });

        var myCalendar = $('.js-datepicker-update-gasprice');
        var isClick = 0;

        $(window).on('click', function () {
            isClick = 0;
        });

        $('.js-btn-calendar').on('click', function (e) {
            e.stopPropagation();

            if (isClick === 1) isClick = 0;
            else if (isClick === 0) isClick = 1;

            if (isClick === 1) {
                myCalendar.focus();
            }
        });

        $(myCalendar).on('apply.daterangepicker', function (ev, picker) {
            isClick = 0;
            var str = picker.startDate.format('DD/MM/YYYY');
            $(this).val(str);
            inputAreTrue("#updatePricesLabel_1");
        });

        $(myCalendar).on('click', function (e) {
            e.stopPropagation();
            isClick = 1;
        });

        $('.js-datepicker-update-gasprice').on('click', function (e) {
            e.stopPropagation();

        });


    }
    catch (er)
    {
        console.log(er);
    }

    try {
        $('.js-datepicker-gasprice').daterangepicker({
            opens: "left",
            locale: {
                format: 'DD/MM/YYYY'
            }
        }, function (start, end, label)
        {
            isClick = 0;

            var theElement = $(this);
            var theStart = start.format('DD/MM/YYYY').toString();
            var theEnd = end.format("DD/MM/YYYY").toString();
            theElement.val(theStart + " - " + theEnd);
        });

        var mainInput = $('.js-datepicker-gasprice');
        var isClick = 0;

        $(window).on('click', function () {
            isClick = 0;
        });

        $('.js-btn-calendar').on('click', function (e) {
            e.stopPropagation();

            if (isClick === 1) isClick = 0;
            else if (isClick === 0) isClick = 1;

            if (isClick === 1) {
                myCalendar.focus();
            }
        });

        $(mainInput).on('click', function (e) {
            e.stopPropagation();
            isClick = 1;
        });

        $('.js-datepicker-gasprice').on('click', function (e) {
            e.stopPropagation();
        });


    }
    catch (er) {
        console.log(er);
    }

    try {
        var selectSimple = $('.js-select-simple');

        selectSimple.each(function () {
            var that = $(this);
            var selectBox = that.find('select');
            var selectDropdown = that.find('.select-dropdown');
            selectBox.select2({
                dropdownParent: selectDropdown
            });
        });

    }
    catch (err) {
        console.log(err);
    }


})(jQuery);


//Tarih
var dateRegex = /^(([0-2][0-9])|(30)|(31))\/((0[0-9])|(11)|(12))\/(20\d{2})$/;

//Tarih araligi
var dateRangeRegex = /^((([0-2][0-9])|(30)|(31))\/((0[0-9])|(11)|(12))\/(20\d{2}))\s-\s((([0-2][0-9])|(30)|(31))\/((0[0-9])|(11)|(12))\/(20\d{2}))$/;

// birim fiyat
var priceRegex = /^(\d)+(\.){1}(\d){2,4}$/;

var updateIndexNumber = -1;

$(document).ready(function ()
{
    addTextDanger("gasPriceLabel", 2);
    disableButton("addGasPrices");

    $("#gasPriceInput_1").keyup(function () {
        var theInput = $(this).val();
        if (dateRangeRegex.test(theInput))
        {
            inputAreTrue("#gasPriceLabel_1");
            var inputsAreTrue = allInputsAreTrue("gasPriceLabel", 2);

            if (inputsAreTrue) {
                enableButton("addGasPrices");
            }
        }
        else {
            inputAreFalse("#gasPriceLabel_1");
            disableButton("addGasPrices");
        }
    });

    $("#gasPriceInput_2").keyup(function () {
        var theInput = $(this).val();
        if (priceRegex.test(theInput)) {
            inputAreTrue("#gasPriceLabel_2");
            var inputsAreTrue = allInputsAreTrue("gasPriceLabel", 2);

            if (inputsAreTrue) {
                enableButton("addGasPrices");
            }
        }
        else {
            inputAreFalse("#gasPriceLabel_2");
            disableButton("addGasPrices");
        }
    });

    $("#updatePricesInput_1").keyup(function () {
        var theInput = $(this).val();
        if (dateRegex.test(theInput)) {
            inputAreTrue("#updatePricesLabel_1");
            var inputsAreTrue = allInputsAreTrue("updatePricesLabel", 2);

            if (inputsAreTrue) {
                enableButton("updateGasPrices");
            }
        }
        else {
            inputAreFalse("#updatePricesLabel_1");
            disableButton("updateGasPrices");
        }
    });

    $("#updatePricesInput_2").keyup(function () {
        var theInput = $(this).val();
        if (priceRegex.test(theInput)) {
            inputAreTrue("#updatePricesLabel_2");
            var inputsAreTrue = allInputsAreTrue("updatePricesLabel", 2);

            if (inputsAreTrue) {
                enableButton("updateGasPrices");
            }
        }
        else {
            inputAreFalse("#updatePricesLabel_2");
            disableButton("updateGasPrices");
        }
    });
});


function pricesUpdater(index)
{
    var theDate = $("#date_" + index).text();
    var thePrice = $("#price_" + index).text().replace(",", ".");

    $("#updatePricesInput_1").val(theDate);
    $("#updatePricesInput_2").val(thePrice);

    for (var i = 1; i <= 2; i++) {
        inputAreTrue("#updatePricesLabel_" + i);
    }

    updateIndexNumber = index;
}

/**
 * Updates prices.
 * @param {string} link Link.
 */
function updatePrices(link)
{
    var date = $("#updatePricesInput_1").val();
    var price = $("#updatePricesInput_2").val();

    $.ajax({
        type: 'GET',
        url: link,
        data: {
            Date: date,
            Price: price
        },
        success: function (theData) {
            location.reload();
        }
    });
}