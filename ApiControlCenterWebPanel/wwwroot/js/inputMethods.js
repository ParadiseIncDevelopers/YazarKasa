let danger = "text-danger";
let success = "text-success";
let dis = "disabled";
let display = "display";
let none = "none";
let block = "block";

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
 * Adds text danger
 * @param labels {string}
 * */
function addTextDanger_0(labels)
{
    $("#" + labels).addClass(danger);
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

/**
 * 
 * Disbalers
 * 
 */

/**
 * Enable something.
 * @param {string} containerId
 */
function EnableElement(containerId)
{
    $(containerId).prop("disable", false);
}

/**
 * Disable something.
 * @param {string} containerId
 */
function DisableElement(containerId)
{
    $(containerId).prop("disable", true);
}

/**
 * 
 * Input Hide display system
 * 
 */

//Contains and defines the gas prices adder and remover index.
var hideAndDisplayIndex = 1;

/**
 * Hides inputs in the adding gas station list.
 * @param {string} containerId The name of the container.
 * @param {number} size The index.
 */
function HideInputsForCashSystem(containerId, size)
{
    var i;

    if (containerId == "#input_container_")
    {
        //Hides input container while adding gas station entreprise
        for (i = 2; i <= size; i++)
        {
            $(containerId + i).css(display, none);
        }
    }
    else
    {
        //Hides other inputs
        for (i = 1; i <= size; i++) {
            $(containerId + i).css(display, none);
        }
    }
}

/**
 * Hides the input.
 * @param {string} inputId Input to remove.
 * @param {string} containerId The container.
 * @param {number} index The index.
 */
var HideInput = (inputId, containerId, index) =>
{
    if (index != 1) {
        $(containerId + index).css({ display: none });
        $(inputId + index).val('');
        index--;
    }
};

/**
 * Displays input.
 * @param {string} inputId Input to remove.
 * @param {string} containerId The container.
 * @param {number} index The index.
 */
var DisplayInput = (inputId, containerId, index) => {
    if (index != 10) {
        index++;
        $(containerId + index).css({ display: block });
        $(inputId + index).val('');
    }
};

/**
* 
* Input readers
* 
*/

/**
 * Reads and checks input.
 * @param {string} input
 * @param {RegExp} regexCheck
 * @param {string} wrapperLabel
 * @param {string} labelId
 * @param {number} formSize
 */
function ReadInput(input, regexCheck, wrapperLabel, labelId, formSize, buttonId) {
    if (regexCheck.test(input)) {
        inputAreTrue(labelId);

        var inputsAreTrue = allInputsAreTrue(wrapperLabel, formSize);
        if (inputsAreTrue) {
            EnableElement(buttonId);
        }
    }
    else {
        inputAreFalse("#label_5");
        DisableElement(buttonId);
    }
}