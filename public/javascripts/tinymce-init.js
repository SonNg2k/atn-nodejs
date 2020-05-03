$(document).ready(() => {
    tinymce.init({
        selector: '.WYSIWYG-content',
        menubar: "file edit insert view format table tools help",
        plugins: [
            'advlist autolink lists link image imagetools hr emoticons charmap print preview anchor',
            'searchreplace visualblocks fullscreen autoresize tabfocus',
            'insertdatetime media table wordcount paste'
        ],
        toolbar: `undo redo | insert | styleselect |  bold italic strikethrough blockquote |
            alignleft aligncenter alignright alignjustify hr | bullist numlist outdent indent |
            link image media | fontselect | fontsizeselect | forecolor backcolor emoticons |
            preview searchreplace`,
        paste_as_text: true,
        // add space between image and text
        content_style: "img {padding: 0 10px 0 10px}",

        /* enable title field in the Image dialog*/
        image_title: true,
        image_caption: true,
        image_advtab: true,
        paste_data_images: true,
        /* This is the URL where images are uploaded when editor.uploadImages is invoked */
        images_upload_url: "/upload_img",
        /* images_upload_handler only sets the img'src attribute, it does not send any request to the server */

        /* enable automatic uploads of images represented by blob or data URIs*/
        /* note that this option will do nothing if images_upload_url is not specified */
        automatic_uploads: true,
        relative_urls: false,
        default_link_target: "_blank",
        /* Links are now possible to open directly from the editor */
        link_context_toolbar: true
    })
})
