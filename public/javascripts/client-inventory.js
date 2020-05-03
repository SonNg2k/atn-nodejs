$(document).ready(() => {
    $("#thumbnailInp").change(function () {
        var thumbnail = $(this).prop('files')[0]
        $("#imgPreview").attr("src", URL.createObjectURL(thumbnail))
        $("#imgPreview").on("load", function() {
            URL.revokeObjectURL($(this).attr("src"));
        })
        $("#thumbnailLabel").text(thumbnail.name);
    })

    // Detect change on price input and format the value
    $("#priceInp").on("input", function () {
        var formattedPrice = parseFloat($(this).val().replace(/,/g, '')).toLocaleString('en');
        if (formattedPrice === "NaN") $(this).val(0)
        else $(this).val(formattedPrice)
    })
})
