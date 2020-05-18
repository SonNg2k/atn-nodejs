$(() => {
    // Tooltips are opt-in for performance reasons, so you must initialize them yourself.
    $('[data-toggle="tooltip"]').tooltip()
    // Tooltips must be hidden before their corresponding elements have been removed from the DOM.

    // For #versatileModal
    $("#itemSelect").change(itemSelected)

    $("#qtyInp").on("input", function () {
        var selectedItem = $("#itemSelect").find(":selected")
        if (!selectedItem.val()) {
            resetTo0()
            return // <-- terminate here
        }
        // If an item is selected, proceed the following...
        var qty = parseInt($(this).val())  // Cast string to integer

        if (qty < 1 || qty > 10) setTotalOneItem()
        else {
            $(this).val(qty) // Do this to remove the digit '0' at the beginning
            setFriendlyTotal(getItemPrice() * qty)
        }
    })
})

function addRow(invoice) {
    var client = invoice.customer,
        lineItem = invoice.invoiceLine
    var row = `
    <tr style="background-color: #FFEFD5;">
        <th scope="row" data-id="${invoice._id}">New</th>
        <td data-date="${HTMLinputDate(invoice.date)}">${friendlyDate(invoice.date)}</td>
        <td data-client-id="${client._id}">${client.name}</td>
        <td data-total="${invoice.total}">${friendlyNumber(invoice.total)}</td>
        <td data-purchased-toy="${lineItem.toy}">
            <a href="#" data-toggle="tooltip" data-html="true" data-placement="right" title="
            <strong>Item: </strong> ${lineItem.name} <br>
            <strong>Price each:</strong> ${friendlyNumber(parseInt(lineItem.subtotal/lineItem.qty))}<br>
            <strong>Qty:</strong> ${lineItem.qty} <br>
            <strong>Subtotal:</strong> ${friendlyNumber(lineItem.subtotal)}">Hover me</a>
        </td>
        <td>
            <button type="button" class="edit-btn btn btn-success" data-toggle="modal"
                data-target="#versatileModal">Edit <i class="fas fa-edit"></i></button>
            <button type="button" class="delete-btn btn btn-danger" data-toggle="modal"
                data-target="#deleteConfirmModal">Delete <i class="fas fa-trash"></i></button>
        </td>
    </tr>
    `
    $("tbody").prepend(row)
    $('[data-toggle="tooltip"]').tooltip()
}

function getFullFormData(formData) {
    return formData
}

function clearInps() {
    $("form").find("input, select").val("");
    $("#qtyInp").val(0)
    $("#totalInp").val(0)
}

function resetTo0() {
    $("#qtyInp").val(0)
    $("#totalInp").val(0)
}

function getItemPrice() {
    return parseInt($("#itemSelect").find(":selected").attr("data-item-price"))
}

function setFriendlyTotal(rawTotal) {
    $("#totalInp").val(friendlyNumber(rawTotal))
}

function setTotalOneItem() {
    $("#qtyInp").val(1)
    setFriendlyTotal(getItemPrice())
}

function itemSelected() {
    /*  clicking an option doesn't change the value of the dropdown--
         it just adds the :selected property to the selected option which is a child of the dropdown */
    var selectedItem = $(this).find(":selected")

    // When the default option whose value is empty "" is selected...
    if (!selectedItem.val()) resetTo0()
    else setTotalOneItem()
}
