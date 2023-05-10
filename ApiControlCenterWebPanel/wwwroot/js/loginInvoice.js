$(document).ready(function () {
    $("#login").prop("disabled", true);
    $("#loginLabel_1").addClass("text-danger");
    $("#loginLabel_2").addClass("text-danger");

    //Input 1 Regex check
    $("#loginInput_1").keyup(function () {
        var inp = $(this).val();
        if (vergikimlik(inp)) {
            inputAreTrue("#loginLabel_1");
            var inputsAreTrue =
                $("#loginLabel_1").attr("class").split(/\s+/)[1] == "text-success" &&
                $("#loginLabel_2").attr("class").split(/\s+/)[1] == "text-success";
            if (inputsAreTrue) {
                $("#login").prop("disabled", false);
            }
        }
        else {
            inputAreFalse("#loginLabel_1");
            $("#login").prop("disabled", true);
        }
    });

    //Input 2 Regex check
    $("#loginInput_2").keyup(function () {
        var inp = $(this).val();
        if (passwordRegex.test(inp)) {
            inputAreTrue("#loginLabel_2");

            var inputsAreTrue =
                $("#loginLabel_1").attr("class").split(/\s+/)[1] == "text-success" &&
                $("#loginLabel_2").attr("class").split(/\s+/)[1] == "text-success";
            if (inputsAreTrue) {
                $("#login").prop("disabled", false);
            }
        }
        else {
            inputAreFalse("#label_2");
            $("#login").prop("disabled", true);
        }
    });
});