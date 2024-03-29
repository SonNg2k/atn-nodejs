$(() => {
    // Tooltips are opt-in for performance reasons, so you must initialize them yourself.
    $('[data-toggle="tooltip"]').tooltip()
    // Tooltips must be hidden before their corresponding elements have been removed from the DOM.

    // For #versatileModal
    $("#itemSelect").change(itemSelected)

    $("#qtyInp").on("input", qtyChanged)

    $("#createBtn").click(() => {
        $("label[for=clientSelect]").show()
        $("#clientSelect").show();
        $('#clientSelect').prop('disabled', false);

        $("label[for=clientNameField]").hide()
        $("#clientNameField").hide();
    })

    $("tbody").on("click", ".edit-btn", function () {
        $("label[for=clientSelect]").hide()
        $("#clientSelect").hide();
        $('#clientSelect').prop('disabled', true);

        $("label[for=clientNameField]").show()
        $("#clientNameField").show();

        var rowPieces = $(this).parent().siblings();

        var date = $(rowPieces[1]).attr("data-date"),
            clientName = $(rowPieces[2]).text()
            lineItemID = $(rowPieces[4]).attr("data-billed-toy"),
            lineItemQty = $(rowPieces[5]).attr("data-line-item-qty")

        $("#dateInp").val(date)
        $("#clientNameField").val(clientName)
        $("#itemSelect").val(lineItemID)
        $("#qtyInp").val(lineItemQty)
        qtyChanged()
    })
})

function editRow(invoice) {
    var lineItem = invoice.invoiceLine,
        rowToEdit = $("#editSubmit").data("rowToEdit"),
        rowPieces = rowToEdit.children()
    rowToEdit.addClass("edited-background")
    rowPieces.eq(0).text("Edited")

    rowPieces.eq(1).attr("data-date", HTMLinputDate(invoice.date))
    rowPieces.eq(1).text(friendlyDate(invoice.date))

    rowPieces.eq(3).attr("data-total", invoice.total)
    rowPieces.eq(3).text(friendlyNumber(invoice.total))

    rowPieces.eq(4).attr("data-billed-toy", lineItem.toy._id)
    var tooltipText = `
        <strong>Item: </strong> ${lineItem.toy.name} <br>
        <strong>Price each:</strong> ${friendlyNumber(lineItem.toy.price)}<br>
        <strong>Qty:</strong> ${lineItem.qty} <br>
        <strong>Subtotal:</strong> ${friendlyNumber(lineItem.subtotal)}
    `
    rowPieces.eq(4).find("a").attr("data-original-title", tooltipText)
    rowPieces.eq(5).attr("data-line-item-qty", lineItem.qty)
}

function addRow(invoice) {
    var client = invoice.customer,
        lineItem = invoice.invoiceLine
    var row = `
    <tr style="background-color: #FFEFD5;">
        <th scope="row" data-id="${invoice._id}">New</th>
        <td data-date="${HTMLinputDate(invoice.date)}">${friendlyDate(invoice.date)}</td>
        <td data-client-id="${client._id}">${client.name}</td>
        <td data-total="${invoice.total}">${friendlyNumber(invoice.total)}</td>
        <td data-billed-toy="${lineItem.toy}">
            <a href="#" data-toggle="tooltip" data-html="true" data-placement="right" title="
            <strong>Item: </strong> ${lineItem.name} <br>
            <strong>Price each:</strong> ${friendlyNumber(parseInt(lineItem.subtotal / lineItem.qty))}<br>
            <strong>Qty:</strong> ${lineItem.qty} <br>
            <strong>Subtotal:</strong> ${friendlyNumber(lineItem.subtotal)}">Hover me for more details ←</a>
        </td>
        <td class="d-none" data-line-item-qty="${lineItem.qty}"></td>
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

function qtyChanged() {
    var selectedItem = $("#itemSelect").find(":selected")
    if (!selectedItem.val()) {
        resetTo0()
        return // <-- terminate here
    }
    // If an item is selected, proceed the following...
    var qty = parseInt($("#qtyInp").val())  // Cast string to integer

    if (qty < 1 || qty > 10) setTotalOneItem()
    else {
        $("#qtyInp").val(qty) // Do this to remove the digit '0' at the beginning
        setFriendlyTotal(getItemPrice() * qty)
    }
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
