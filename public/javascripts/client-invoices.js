$(document).ready(() => {
    // Tooltips are opt-in for performance reasons, so you must initialize them yourself.
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
        // Tooltips must be hidden before their corresponding elements have been removed from the DOM.
    })

    // For #versatileModal
    $("#itemSelect").change(function () {
        /*  clicking an option doesn't change the value of the dropdown--
         it just adds the :selected property to the selected option which is a child of the dropdown */
        var selectedItem = $(this).find(":selected")

        if (!selectedItem.val()) { // When the default option whose value is empty "" is selected...
            $("#qtyInp").val(0)
            $("#totalInp").val(0)
        } else {
            $("#qtyInp").val(1)
            var total = selectedItem.attr("data-item-price")
            $("#totalInp").val(formatNumber(total))
        }
    })
})


