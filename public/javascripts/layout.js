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
})
