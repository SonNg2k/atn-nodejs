$(() => {
    $("#thumbnailInp").change(function () {
        var thumbnail = $(this).prop('files')[0]
        $("#imgPreview").attr("src", URL.createObjectURL(thumbnail))
        $("#imgPreview").on("load", function () {
            URL.revokeObjectURL($(this).attr("src"));
        })
        $("#thumbnailLabel").text(thumbnail.name);
    })

    // Detect change on price input and format the value
    $("#priceInp").on("input", formatInpNumber)

    $("tbody").on("click", ".edit-btn", function () {
        var rowPieces = $(this).parent().siblings();

        var thumbnail = $(rowPieces[1]).find("img"),
            name = $(rowPieces[2]).attr('data-name'),
            price = $(rowPieces[3]).attr('data-price'),
            category = $(rowPieces[4]).attr('data-category'),
            description = $(rowPieces[5]).html()

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

function getFullFormData(formData) {
    formData.append("toy[description]", tinyMCE.activeEditor.getContent())
    formData.append("thumbnail", $("#thumbnailInp").prop('files')[0])

    return formData
}

function editRow(toy) {
    var rowToEdit = $("#editSubmit").data("rowToEdit"),
        rowPieces = rowToEdit.children()
    rowToEdit.addClass("edited-background")
    rowPieces.eq(0).text("Edited")

    rowPieces.eq(1).children().attr("src", toy.thumbnail)

    rowPieces.eq(2).attr("data-name", toy.name)
    rowPieces.eq(2).text(shortenName(toy.name))

    rowPieces.eq(3).attr("data-price", toy.price)
    rowPieces.eq(3).text(friendlyPrice(toy.price))

    rowPieces.eq(4).attr("data-category", toy.category)
    rowPieces.eq(4).text(friendlyCategory(toy.category))

    rowPieces.eq(6).html(toy.description)
}

function addRow(toy) {
    var row = `
        <tr style="background-color: #FFEFD5;">
            <th scope="row" data-id="${toy._id}">New</th>
            <td><img src="${toy.thumbnail}" alt="" width="50" height="50"></td>
            <td data-name="${toy.name}"> ${shortenName(toy.name)}</td>
            <td data-price="${toy.price}">${friendlyNumber(toy.price)}</td>
            <td data-category="${toy.category}">${friendlyCategory(toy.category)}</td>
            <td>
                <button type="button" class="edit-btn btn btn-success mb-1" data-toggle="modal"
                    data-target="#versatileModal">Edit <i class="fas fa-plus"></i></button>
                <button type="button" class="delete-btn btn btn-danger" data-toggle="modal"
                    data-target="#deleteConfirmModal">Delete <i class="fas fa-trash"></i></button>
            </td>
            <td class="d-none">${toy.description}</td>
        </tr>
    `
    $("tbody").prepend(row)
}

function friendlyCategory(category) {
    var lookup = {
        action_figures: "Action figures",
        animals: "Animals",
        construction_creative: "Construction and Creative toys",
        dolls: "Dolls",
        educational: "Educational toys",
        electronic: "Electronic toys",
        model_building: "Model building",
        spinning: "Spinning toys"
    }
    return lookup[category]
}

function shortenName(name) {
    return name.length > 54 ? name.slice(0, 53) + " ..." : name
}
