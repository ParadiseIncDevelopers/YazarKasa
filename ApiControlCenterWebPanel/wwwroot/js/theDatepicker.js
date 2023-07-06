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
            if (jsonData != null)
            {
                theJsonData = [JSON.parse(jsonData)];
                if (theElement.attr("id") == "invoiceText_3")
                {
                    var getTaxNumber = chosenTaxNumber;

                    if (getTaxNumber == "" || getTaxNumber == null)
                    {
                        alert("Please choose a Gas Station.");
                    }
                    else
                    {
                        var datePriceContent = theJsonData[0][0].GasPrices.filter(r => r.Date.includes(str2))[0];

                        if (datePriceContent == null)
                        {
                            alert("Bu tarihte bir fiyat yok. Lütfen bu tarihe fiyat yazınız.");
                            return;
                        }
                        else
                        {
                            var price = datePriceContent.Price;
                            var taxNumberFunc = (x) => x.TaxId == getTaxNumber;
                            var zerosIndexGetter = zerosData.filter(x => taxNumberFunc(x))[0].InvoiceZReportSystem.filter(y =>
                            {
                                var q = y.DateOfTheIndex.toString().split("T")[0];
                                var r = str2.toString();
                                return q == r;
                            });

                            var ekuIndex = ekuData.filter(x => taxNumberFunc(x))[0].EkuList;

                            var filteredEkuIndex = ekuIndex.filter(y =>
                            {
                                var q = y.DateOfTheIndex.toString().split("T")[0];
                                var year = parseInt(q.substring(0, 4));
                                var month = parseInt(q.substring(5, 7)) - 1;
                                var day = parseInt(q.substring(8, 10));
                                var qDate = new Date(year, month, day);
                                var rDate = new Date(str2);
                                return qDate >= rDate;
                            });

                            var ekuIndexGetter;

                            if (filteredEkuIndex.length == 0)
                            {
                                ekuIndexGetter = ekuIndex[ekuIndex.length - 1].Index + 1;
                            }
                            else
                            {
                                ekuIndexGetter = filteredEkuIndex[0].Index + 1;
                            }

                            if (zerosIndexGetter.length == 0)
                            {
                                alert("Lütfen Z raporu sayılıarını işlemlerden yeniletiniz.");
                                return;
                            }
                            else
                            {
                                var weaponIndex = cashData.WeaponNumber;
                                var pumpIndex = cashData.PumpNumber;
                                var zero1 = cashData.ZerosInEku;
                                var zero2 = cashData.ZerosInZReports;
                                var zIndexNumber = zerosIndexGetter[0].Index;

                                $("#invoiceText_1").prop("disabled", false);
                                $("#invoiceText_4").prop("disabled", false);
                                $("#invoiceText_9").prop("disabled", false);
                                $("#invoiceText_7").prop("disabled", false);
                                $("#invoiceText_11").prop("disabled", false);

                                $("#invoiceText_2").val(price);
                                $("#invoiceText_2").prop("disabled", true);
                                $("#invoiceText_5").val(zIndexNumber);
                                $("#invoiceText_6").val(ekuIndexGetter);
                                $("#invoiceText_10").val(weaponIndex);
                                $("#invoiceText_8").val(pumpIndex);

                                $("#InvoiceZReportSection").text("Z NO : " + zIndexNumber.toString().padStart(zero2, '0'));
                                $("#InvoiceEkuSection").text("EKU NO : " + ekuIndexGetter.toString().padStart(zero1, '0'));
                                $("#InvoiceDateSection").text(str.replace('/', '-').replace('/', '-'));
                                $("#InvoicePriceSection").text(price);

                                inputAreTrue("#invoiceLabel_5");
                                inputAreTrue("#invoiceLabel_6");
                                inputAreTrue("#invoiceLabel_3");
                                inputAreTrue("#invoiceLabel_2");
                                inputAreTrue("#invoiceLabel_10");
                                inputAreTrue("#invoiceLabel_8");
                            }
                        }
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


    }
    catch (er)
    {
        console.log(er);
    }

    try
    {
        var selectSimple = $('.js-select-simple');

        selectSimple.each(function ()
        {
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