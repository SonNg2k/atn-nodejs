$("tbody").on("click", ".edit-btn", function() {
    var rowPieces = $(this).parent().siblings();

    var name = $(rowPieces[1]).attr("data-name"),
        age = $(rowPieces[2]).attr("data-age"),
        gender = $(rowPieces[3]).attr("data-gender"),
        address = $(rowPieces[4]).attr("data-address"),
        phoneNumb = $(rowPieces[5]).attr("data-phone-numb")

    $("#nameInp").val(name)
    $("#ageInp").val(age)
    $(`input[name='customer[gender]'][value=${gender}]`).prop('checked', true);
    $("#addressInp").val(address)
    $("#phoneNumbInp").val(phoneNumb)
})

function getFullFormData(formData) {
    return formData
}
