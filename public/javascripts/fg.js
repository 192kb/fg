function resolveUrl(url) {
    if (!url) {
        throw new Error("url is undefined or empty");
    }
    var reParent = /[\-\w]+\/\.\.\//,
        reDoubleSlash = /([^:])\/\//g;
    url = url.replace(reDoubleSlash, "$1/");
    var base = (document.getElementsByTagName('BASE')[0] && document.getElementsByTagName('BASE')[0].href) || "";
    if (!url.match(/^(http||https):\/\//)) {
        var path = (url.substring(0, 1) === "/")
            ? base
            : location.pathname;
        if (path.substring(path.length - 1) !== "/") {
            path = path.substring(0, path.lastIndexOf("/") + 1);
        }
        if (!url.match(/^(http||https):\/\//)) {
            url = location.protocol + "//" + location.host + path + url;
        }
    }
    while (reParent.test(url)) {
        url = url.replace(reParent, "");
    }
    return url;
}
function select_all(el) {
    if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
        var range = document.createRange();
        range.selectNodeContents(el);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (typeof document.selection != "undefined" && typeof document.body.createTextRange != "undefined") {
        var textRange = document
            .body
            .createTextRange();
        textRange.moveToElementText(el);
        textRange.select();
    }
}
Dropzone.autoDiscover = false;
var hmtl = $('#h_code');
var links = $('#l_code');
$(document).ready(function () {
    var fg = new Dropzone(".dropzone");
    Dropzone.options = {
        uploadMultiple: false
    }
    fg.on('success', function (file, response) {
        var link = resolveUrl('https://192kb.ru/' + response.link);
        switch (response.type) {
            case 'image/jpg':
            case 'image/gif':
            case 'image/jpeg':
            case 'image/pjpeg':
            case 'image/png':
            case 'image/bmp':
            case 'image/svg+xml':
            case 'image/tiff':
            case 'image/vnd.djvu':
                var html_tag = '<img src="' + link + '"/>\n';
                break;
            case 'application/zip':
            case 'application/pdf':
            case 'application/vnd.ms-excel':
            case 'application/x-iwork-keynote-sffkey':
            case 'application/x-iwork-pages-sffpages':
            case 'application/x-iwork-numbers-sffnumbers':
            case 'application/vnd.apple.pages,':
            case 'application/vnd.apple.numbers,':
            case 'application/vnd.apple.keynote,':
            case 'application/vnd.ms-powerpoint':
            case 'application/vnd.ms-xpsdocument':
            case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
            case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            case 'application/vnd.oasis.opendocument.graphics':
            case 'application/vnd.oasis.opendocument.presentation':
            case 'application/vnd.oasis.opendocument.spreadsheet':
            case 'application/vnd.oasis.opendocument.text':
            case 'application/x-7z-compressed':
            case 'application/x-rar-compressed':
            case 'application/avi':
            case 'application/mp4':
            case 'application/basic':
            case 'application/ogg':
            case 'application/flac':
            case 'application/opus':
            case 'application/vorbis':
            case 'application/webm':
            case 'application/vnd.wave':
                var html_tag = '<a href="' + link + '">' + link
                    .split(/[\\\/]/)
                    .pop() + '</a>\n';
        }

        hmtl.append(document.createTextNode(html_tag));
        links.append(document.createTextNode(link + '\n'));
    });
});