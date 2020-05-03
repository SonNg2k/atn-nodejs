$(document).ready(() => {
    // Detect change on price input and format the value
    $("#priceInp").on("input", function () {
        var formattedPrice = parseFloat($(this).val().replace(/,/g, '')).toLocaleString('en');
        if (formattedPrice === "NaN") $(this).val(0)
        else $(this).val(formattedPrice)
    })
})
