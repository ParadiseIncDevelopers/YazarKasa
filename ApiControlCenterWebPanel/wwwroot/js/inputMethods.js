var danger = "text-danger";
var success = "text-success";
var dis = "disabled";

/** 
 * Adds text danger
 * @param index {number}
 * @param labels {string}
 * */
function addTextDanger(labels, index)
{
    for (var i = 1; i <= index; i++)
    {
        $("#" + labels + "_" + i).addClass(danger);
    }
}

/**
 * If input is false
 * @param s {string}
 * */
var inputAreFalse = (s) => {
    $(s).addClass(danger);
    $(s).removeClass(success);
};

/**
 * If input is true
 * @param s {string}
 * */
var inputAreTrue = (s) => {
    $(s).removeClass(danger);
    $(s).addClass(success);
};

function enableButton(buttonId)
{
    $("#" + buttonId).prop(dis, false);
}

function disableButton(buttonId) {
    $("#" + buttonId).prop(dis, true);
}

/**
 * If all inputs are true, then it will return true, otherwise false.
 * 
 * @param labelId {String} Label id.
 * @param count {Number} size.
 * */
function allInputsAreTrue(labelId, count)
{
    var elements = [];
    var inputsTrue = true;

    for (var i = 1; i <= count; i++)
    {
        elements.push($("#" + labelId + "_" + i).attr("class").split(/\s+/)[1] == success);
    }

    for (var i = 0; i < elements.length; i++)
    {
        inputsTrue = inputsTrue && elements[i];
    }

    return inputsTrue;
}

$(document).ready(function () {
    $('.table-sort').tablesort();
});