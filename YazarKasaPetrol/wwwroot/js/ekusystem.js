(function ($)
{
    'use strict';
    try
    {
        $('.js-datepicker-eku').daterangepicker({
            "singleDatePicker": true,
            "showDropdowns": true,
            "autoUpdateInput": false,
            locale: {
                format: 'DD/MM/YYYY'
            }
        });

        var myCalendar = $('.js-datepicker-eku');
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

            var strDate = picker.startDate;
            var startDateInString = strDate.format('DD/MM/YYYY');
            var dateValue = strDate;
            var today = new Date();

            if (dateValue < today)
            {
                alert("Geriye dönük tarih belirlenemez. Lütfen tekrar deneyin.");
            }
            else
            {
                if (dateRegex.test(startDateInString)) {
                    $(this).val(startDateInString);
                    inputAreTrue("#ekuAddLabel_1");
                    enableButton("addEkuButton");
                }
            }
        });

        $(myCalendar).on('click', function (e) {
            e.stopPropagation();
            isClick = 1;
        });

        $('.js-datepicker-eku').on('click', function (e) {
            e.stopPropagation();

        });
    }
    catch (er) {
        console.log(er);
    }

    try
    {
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
    catch (err)
    {
        console.log(err);
    }
})(jQuery);


//Tarih
var dateRegex = /^(([0-2][0-9])|(30)|(31))\/((0[0-9])|(11)|(12))\/(20\d{2})$/;

// birim fiyat
var priceRegex = /^(\d)+(\.){1}(\d){2,4}$/;

var updateIndexNumber = -1;

$(document).ready(function ()
{
    addTextDanger("ekuAddLabel", 1);
    disableButton("addEkuButton");

    $("#ekuAddInput_1").keyup(function () {
        var theInput = $(this).val();
        if (dateRegex.test(theInput)) {
            inputAreTrue("#ekuAddLabel_1");
            var inputsAreTrue = allInputsAreTrue("ekuAddLabel", 1);

            if (inputsAreTrue) {
                enableButton("addEkuButton");
            }
        }
        else {
            inputAreFalse("#ekuAddLabel_1");
            disableButton("addEkuButton");
        }
    });
});