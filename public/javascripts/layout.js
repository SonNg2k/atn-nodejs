$(document).ready(() => {
    $("#createBtn").click(() => {
        $("#addTitle").show();
        $("#editTitle").hide();

        $("#addSubmit").show();
        $("#editSubmit").hide();

        clearInps()
    })

    $("tbody").on("click", ".edit-btn", function () {
        $("#addTitle").hide();
        $("#editTitle").show();

        $("#addSubmit").hide();
        $("#editSubmit").show();

        var rowPieces = $(this).parent().siblings(),
            id = $(rowPieces[0]).attr('data-id')
        $("#editSubmit").attr("data-id", id)
        $("#editSubmit").data("rowToEdit", rowPieces.parent())

    })

    $("tbody").on("click", ".delete-btn", function () {
        var rowPieces = $(this).parent().siblings(),
            id = $(rowPieces[0]).attr('data-id')
        $("#deleteAcceptBtn").attr("data-id", id)
        $("#deleteAcceptBtn").data("rowToDelete", rowPieces.parent())
    })

    $("#addSubmit, #editSubmit").click(function (e) {
        e.preventDefault();
        var isValid1 = $("form")[0].checkValidity(),
            isValid2 = $("form")[0].reportValidity(),
            currentPath = window.location.pathname,
            property = e.currentTarget.id === "editSubmit" ? "/" + $(this).attr("data-id") : ""
        if (isValid1 && isValid2)
            $.ajax({
                url: currentPath + property,
                data: getFullFormData(getFormData()),
                cache: false,
                contentType: false,
                processData: false,
                method: e.currentTarget.id === "addSubmit" ? "POST" : "PUT"
            })
                .done((response) => {
                    successAlert()
                    $("#versatileModal").modal('hide')
                    if (e.currentTarget.id === "addSubmit") addRow(response)
                    else editRow(response)
                })
                .fail(failureAlert)
    })

    $("#deleteAcceptBtn").click(function () {
        var rowToDelete = $(this).data("rowToDelete"),
            id = $(this).attr("data-id"),
            currentPath = window.location.pathname
        $.ajax({
            url: currentPath + `/${id}`,
            method: "DELETE"
        })
            .done(() => {
                successAlert()
                $("#deleteConfirmModal").modal('hide')
                rowToDelete.remove()
            })
            .fail(failureAlert)
    })
})

function getFormData() {
    var textData = $("#versatileModal form").serializeArray(),
        formData = new FormData();
    textData.forEach((ele) => formData.append(ele.name, ele.name === "toy[price]" ? ele.value.replace(/,/g, '') : ele.value))

    return formData;
}

function formatInpNumber() {
    // $(this) refers to the context of the input field whose value contains digits and commas
    var formattedPrice = friendlyNumber($(this).val())
    if (formattedPrice === "NaN") $(this).val(0)
    else $(this).val(formattedPrice)
}

function friendlyNumber(number) {
    if (typeof number === "number") return number.toLocaleString("en")
    if (typeof number === "string") return parseFloat(number.replace(/,/g, '')).toLocaleString('en');
}

function logFormData(formData) {
    for (var pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
    }
}

function successAlert() {
    $("#successAlert").show().delay(4000).fadeOut()
}

function failureAlert() {
    $("#failureAlert").show().delay(4000).fadeOut()
}
