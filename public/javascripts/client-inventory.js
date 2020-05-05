$(document).ready(() => {
    $("#thumbnailInp").change(function () {
        var thumbnail = $(this).prop('files')[0]
        $("#imgPreview").attr("src", URL.createObjectURL(thumbnail))
        $("#imgPreview").on("load", function () {
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

    $("tbody").on("click", ".edit-btn", function () {
        var rowPieces = $(this).parent().siblings();

        var itemID = $(rowPieces[0]).attr('data-id'),
            thumbnail = $(rowPieces[1]).find("img"),
            name = $(rowPieces[2]).attr('data-name'),
            price = $(rowPieces[3]).attr('data-price'),
            category = $(rowPieces[4]).attr('data-category'),
            description = $(rowPieces[5]).html()

        $("#editSubmit").attr("data-item-id", itemID)
        $("#imgPreview").attr("src", thumbnail.attr("src"))
        $("#nameInp").val(name)
        $("#priceInp").val(parseFloat(price).toLocaleString('en'))
        $("#categorySelect").val(category)
        tinyMCE.activeEditor.setContent(description)
    })
})

function clearInps() {
    $("#imgPreview").attr("src", "/images/200x200.png");
    $("#thumbnailInp").val("")
    $("#thumbnailLabel").text("Click here to select image...");
    $("#nameInp").val("")
    $("#priceInp").val(0)
    $('#categorySelect option:eq(0)').prop('selected', true)
    tinyMCE.activeEditor.setContent("");
}

function getFormData() {

}
