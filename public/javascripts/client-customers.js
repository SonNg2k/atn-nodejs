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

function addRow(client) {
    var row = `
    <tr style="background-color: #FFEFD5;">
        <th scope="row" data-id="${client._id}">New</th>
        <td data-name="${client.name}">${client.name}</td>
        <td data-dob="${HTMLinputDate(client.dob)}">${friendlyDate(client.dob)}</td>
        <td data-gender="${client.gender}">${client.gender}</td>
        <td data-address="${client.address}">${client.address}</td>
        <td data-phone-numb="${client.phoneNumb}">${client.phoneNumb}</td>
        <td data-invoice="">None</td>
        <td>
            <button type="button" class="edit-btn btn btn-success" data-toggle="modal"
                data-target="#versatileModal">Edit <i class="fas fa-edit"></i></button>
            <button type="button" class="delete-btn btn btn-danger" data-toggle="modal"
                data-target="#deleteConfirmModal">Delete <i class="fas fa-trash"></i></button>
        </td>
    </tr>
    `
    $("tbody").prepend(row)
}

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

function HTMLinputDate(ISO_date) {
    return ISO_date.slice(0, 10)
}
