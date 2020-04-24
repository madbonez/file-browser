var editor;
function editJson(path) {
    console.log(path)
    $.get(path).then(function (json) {
        // create the editor
        const container = document.getElementById("jsoneditor")
        const options = {}
        if (!editor) {
            editor = new JSONEditor(container, options)
        }
        editor.set(json)

        document.getElementById('modal-window').style.visibility = 'visible';
        document.getElementById('editor-close').onclick = () => {
            console.log('close');
            document.getElementById('modal-window').style.visibility = 'hidden';
        }
        document.getElementById('editor-save').onclick = () => {
            console.log('save');
            const updatedJson = editor.get()
            console.log(updatedJson);
            fetch(path, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedJson),
                method: 'POST'
            }).then(() => {
                document.getElementById('modal-window').style.visibility = 'hidden';
                console.log('File Saved');
            })
        };

    });
}

(function ($) {
    var currentPath = null;
    var options = {
        "bProcessing": true,
        "bServerSide": false,
        "bPaginate": false,
        "bAutoWidth": false,
        "sScrollY": "250px",
        "fnCreatedRow": function (nRow, aData, iDataIndex) {
            if (!aData.IsDirectory) return;
            var path = aData.Path;
            $(nRow).bind("click", function (e) {
                $.get('/files?path=' + path).then(function (data) {
                    table.fnClearTable();
                    table.fnAddData(data);
                    currentPath = path;
                });
                e.preventDefault();
            });
        },
        "aoColumns": [
            {
                "sTitle": "", "mData": null, "bSortable": false, "sClass": "head0", "sWidth": "55px",
                "render": function (data, type, row, meta) {
                    if (data.IsDirectory) {
                        return "<a href='#' target='_blank'>" +
                            "<i class='fa fa-folder'></i>&nbsp;" +
                            data.Name + "</a>";
                    } else {
                        let rstr = '';
                        if (data.Root) {
                            rstr = 'r=' + data.Root + '&';
                        }

                        if (data.Path && data.Path.indexOf('.json') !== -1) {
                            return `<span style="cursor: pointer" class="json" onclick="editJson('/b?${rstr}f=${data.Path}')">
                                        <i class='fa fa-file-text-o'></i>${data.Name}
                                </span>`;
                        }
                        return '';
                    }
                }
            }
        ]
    };

    var table = $(".linksholder").dataTable(options);

    $.get('/files').then(function (data) {
        table.fnClearTable();
        table.fnAddData(data);
    });

    $(".up").bind("click", function (e) {
        if (!currentPath) return;
        var idx = currentPath.lastIndexOf("/");
        var path = currentPath.substr(0, idx);
        $.get('/files?path=' + path).then(function (data) {
            table.fnClearTable();
            table.fnAddData(data);
            currentPath = path;
        });
    });
})(jQuery);
