(function ($) {
    'use strict';
    try {
        $('.js-datepicker').daterangepicker({
            "singleDatePicker": true,
            "showDropdowns": true,
            "autoUpdateInput": false,
            locale: {
                format: 'DD/MM/YYYY'
            }
        });

        var myCalendar = $('.js-datepicker');
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

            var theElement = $(this);
            var str = picker.startDate.format('DD/MM/YYYY');
            var str2 = picker.startDate.format("YYYY-MM-DD");
            var theJsonData;
            if (jsonData != null) {
                theJsonData = [JSON.parse(jsonData)];
                if (theElement.attr("id") == "invoiceText_3") {
                    var getTaxNumber = chosenTaxNumber;

                    if (getTaxNumber == "" || getTaxNumber == null) {
                        alert("Please choose a Gas Station.");
                    }
                    else {
                        var price = theJsonData[0][0].GasPrices.filter(r => r.Date.includes(str2))[0].Price;
                        $("#invoiceText_2").val(price);
                        $("#InvoiceDateSection").text(str.replace('/', '-').replace('/', '-'));
                        $("#InvoicePriceSection").text(price);
                        
                        inputAreTrue("#invoiceLabel_3");
                        inputAreTrue("#invoiceLabel_2");
                    }
                }
            }
            else
            {
                inputAreTrue("#label_1");
            }
            $(this).val(str);
        });

        $(myCalendar).on('click', function (e) {
            e.stopPropagation();
            isClick = 1;
        });

        $('.daterangepicker').on('click', function (e) {
            e.stopPropagation();
            
        });


    } catch (er) { console.log(er); }

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

    } catch (err) {
        console.log(err);
    }


})(jQuery);