$("tbody").on("click", ".edit-btn", function() {
    var rowPieces = $(this).parent().siblings();

    var name = $(rowPieces[1]).attr("data-name"),
        dob = $(rowPieces[2]).attr("data-dob"),
        gender = $(rowPieces[3]).attr("data-gender"),
        address = $(rowPieces[4]).attr("data-address"),
        phoneNumb = $(rowPieces[5]).attr("data-phone-numb")

    $("#nameInp").val(name)
    $("#dobInp").val(dob)
    $(`input[name='customer[gender]'][value=${gender}]`).prop('checked', true);
    $("#addressInp").val(address)
    $("#phoneNumbInp").val(phoneNumb)
})

function clearInps() {
    $("#nameInp").val("")
    $("#dobInp").val("")
    $("input[type=radio]").prop('checked', false);
    $("#addressInp").val("")
    $("#phoneNumbInp").val("")
}

function getFullFormData(formData) {
    return formData
}

function friendlyDate (ISO_date) {
    return new Date(ISO_date).toDateString().slice(4)
}
