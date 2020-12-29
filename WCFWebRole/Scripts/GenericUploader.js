function generic_uploader_show_tab(tab_id) {
    try {
        var hdr = "generic_uploader_tab_header_" + tab_id.toString();
        $("#" + hdr).show();

    } catch (e) {
        HeaderDataErrorReport(e);
    }
}
function UpdateImportStatus(Msg) {
    $("#DataFactoryProcessing").text("Beginning processing...")
    return "SUCCESS"
}

function ReturnStringForFieldsCombo(InformationType) {
    try {    
        var InnerHTMLCBO = "";
        var urlMain = '/Services/WCFWebService.svc/GenericValidationFieldsGetInfo?';
        var DataMain = 'InformationType=' + InformationType
        var urlMain = urlMain + DataMain;
        var ResultData = ReturnDataFromService(urlMain);
        var j = 0;
        for (var i in ResultData) {
            j = j + 1;
        }        
        for (var iRow in ResultData) {
            InnerHTMLCBO = InnerHTMLCBO + "<option>" + ResultData[iRow].InformationFields + "</option>";         
        }
        return InnerHTMLCBO;
    }
    catch (e) {
        HeaderDataErrorReport(e);
        return "ERROR";
    }
}
function generic_uploader_FileInitialDropDowns(tab_id) {
    GeneralSelFill('sel_generic_uploader_file_type_' + tab_id, '- File Type -', '/Services/CurveUploader.svc/InformationTypeGetInfo');
    GeneralSelFill('sel_LineLength_' + tab_id, '- Line Length -', '/Services/CurveUploader.svc/LineStartGetInfo');
}

function generic_uploader_create_base_table(tab_id) {
    try {

        var FileName = 'N/A';
        var FileTypeName = 'ACCOUNT';
        var ContainerName = 'riskaccounts';
        urlMain = '/Services/WCFWebService.svc/GenericFileGetInfo?';
        var DataMain = 'FileName=' + FileName + '&FileTypeName=' + FileTypeName + '&ContainerName=' + ContainerName + '&RowNumber=0';
        var urlMain = urlMain + DataMain;
        // Fix to read the docker container
        var ResultData = ReturnDataFromService(urlMain);
        urlMain = 'http://' + ReturnDataFromService("/Services/WCFWebService.svc/ReturnDockerURL") + '/api/basedata';
        var ResultData = ReturnDataFromService(urlMain)

        var j = 0;
        for (var i in ResultData) {
            j = j + 1;
        }

        //var eighth = '</br><div id="tableContainer_' + tab_id + '" class="tableContainer datablock"><table id="data-table_' + tab_id + '"></table>';
        $('#data-table_' + tab_id).remove();
        $("#tableContainer_" + tab_id).remove('#data-table_' + tab_id);

        //$('#data-tableUpload').remove();
        //$("#tableContainerUpload").remove("#data-table");
        var innerOptionHTML = ReturnStringForFieldsCombo('N/A');
        var totalHTML;
        var mytable = $('<table></table>').attr({ id: "data-table_" + tab_id, width: "100%", overflow: "scroll", class: "scrollTable table-hover" });
        var rows = 5;
        if (j <= rows) { rows = j - 1; }
        if (rows <= 1) { rows = 1; }
        var cols = 2;
        var tr = [];
        var tHead = $('<thead></thead>').attr({}).appendTo(mytable);
        var row = $('<tr></tr>').appendTo(tHead);                
        $('<th class="generic_uploader_table_width"></th>').html("<select id=\"generic_uploader_" + tab_id + "cbo_field_1\"" + ">" + innerOptionHTML + "</select>").appendTo(row);
        $('<th class="generic_uploader_table_width"></th>').html("<select id=\"generic_uploader_" + tab_id + "cbo_field_2\"" + ">" + innerOptionHTML + "</select>").appendTo(row);
        $('<th class="generic_uploader_table_width"></th>').html("<select id=\"generic_uploader_" + tab_id + "cbo_field_3\"" + ">" + innerOptionHTML + "</select>").appendTo(row);
        $('<th class="generic_uploader_table_width"></th>').html("<select id=\"generic_uploader_" + tab_id + "cbo_field_4\"" + ">" + innerOptionHTML + "</select>").appendTo(row);
        $('<th class="generic_uploader_table_width"></th>').html("<select id=\"generic_uploader_" + tab_id + "cbo_field_5\"" + ">" + innerOptionHTML + "</select>").appendTo(row);
        $('<th class="generic_uploader_table_width"></th>').html("<select id=\"generic_uploader_" + tab_id + "cbo_field_6\"" + ">" + innerOptionHTML + "</select>").appendTo(row);
        $('<th class="generic_uploader_table_width"></th>').html("<select id=\"generic_uploader_" + tab_id + "cbo_field_7\"" + ">" + innerOptionHTML + "</select>").appendTo(row);
        $('<th class="generic_uploader_table_width"></th>').html("<select id=\"generic_uploader_" + tab_id + "cbo_field_8\"" + ">" + innerOptionHTML + "</select>").appendTo(row);
        $('<th class="generic_uploader_table_width"></th>').html("<select id=\"generic_uploader_" + tab_id + "cbo_field_9\"" + ">" + innerOptionHTML + "</select>").appendTo(row);
        $('<th class="generic_uploader_table_width"></th>').html("<select id=\"generic_uploader_" + tab_id + "cbo_field_10\"" + ">" + innerOptionHTML + "</select>").appendTo(row);
        $('<th class="generic_uploader_table_width"></th>').html("<select id=\"generic_uploader_" + tab_id + "cbo_field_11\"" + ">" + innerOptionHTML + "</select>").appendTo(row);
        $('<th class="generic_uploader_table_width"></th>').html("<select id=\"generic_uploader_" + tab_id + "cbo_field_12\"" + ">" + innerOptionHTML + "</select>").appendTo(row);
        var tBody = $('<tbody></tbody>').appendTo(mytable);
        var lnRows = ResultData.length;
        var iCounter = 0;
        for (iRows = 0; iRows < lnRows; iRows = iRows + 1) {
            var row = $('<tr></tr>').attr({ id: "gen_" + ResultData[iRows].ValidateID, class: "gradeA success" }).appendTo(tBody);
            $('<td></td>').text(ResultData[iRows].Field1).appendTo(row);
            $('<td></td>').text(ResultData[iRows].Field2).appendTo(row);
            $('<td></td>').text(ResultData[iRows].Field3).appendTo(row);
            $('<td></td>').text(ResultData[iRows].Field4).appendTo(row);
            $('<td></td>').text(ResultData[iRows].Field5).appendTo(row);
            $('<td></td>').text(ResultData[iRows].Field6).appendTo(row);
            $('<td></td>').text(ResultData[iRows].Field7).appendTo(row);
            $('<td></td>').text(ResultData[iRows].Field8).appendTo(row);
            $('<td></td>').text(ResultData[iRows].Field9).appendTo(row);
            $('<td></td>').text(ResultData[iRows].Field10).appendTo(row);
            $('<td></td>').text(ResultData[iRows].Field11).appendTo(row);
            $('<td></td>').text(ResultData[iRows].Field12).appendTo(row);
        }
        mytable.appendTo("#tableContainer_" + tab_id);
        oTable[tab_id] = $('#data-table_' + tab_id).DataTable(
            {
                "columnDefs": [{
                    "searchable": false,
                    "orderable": false,
                    "targets": 0
                }],
                "sPaginationType": "full_numbers",
                "ordering": false,
                "sScrollX": "100%",
                "bSort": false,
            });
        generic_uploader_add_row(tab_id);
        generic_uploader_delete_row(tab_id);
    }
    catch (e) {
        HeaderDataErrorReport(e);
    }
}


function run_data_factory_pull_excel(tab_id) {
    try {
        var sheet_name = $('#selSheets option:selected').text()
        if (sheet_name == '- Select Sheet -') {
            alertify.error("Please select a sheet");
        } else {
            $("#myModal").modal('hide');
            alertify.success("Sending the file for processing...Please wait.")
            run_data_factory_pull(FileNameForImport, sheet_name, tab_id);
        }


    } catch (e) {
        HeaderDataErrorReport(e)

    }
}
function run_data_factory_pull(FileName, sheet_name, tab_id) {
    try {
        // Submit the file for processing via Data Factory        
        var urlMain = 'http://' + ReturnDataFromService("/Services/WCFWebService.svc/ReturnDockerURL") + '/api/datafactor_data/';
        var DataMain = FileName + '/' + sheet_name + '/100';
        urlMain = urlMain + DataMain;
        var ResultData = ReturnDataFromService(urlMain);
        var run_checker_id = "FAILURE";
        if (ResultData.length > 0) {
            run_checker_id = ResultData[0].run_id;
        }
        var iLimit = oTable[tab_id].fnGetData().length;
        for (i = 1; i <= iLimit; i++) {
            oTable[tab_id].fnDeleteRow(0);
        }
        if (ResultData.length > 0) {            
        
            for (var iRows in ResultData) {
                oTable[tab_id].fnAddData([                 
                    ResultData[iRows].Field1,
                    ResultData[iRows].Field2,
                    ResultData[iRows].Field3,
                    ResultData[iRows].Field4,
                    ResultData[iRows].Field5,
                    ResultData[iRows].Field6,
                    ResultData[iRows].Field7,
                    ResultData[iRows].Field8,
                    ResultData[iRows].Field9,
                    ResultData[iRows].Field10,
                    ResultData[iRows].Field11,
                    ResultData[iRows].Field12,
                ]);
            }
        }
        var table = document.getElementById("data-table_" + tab_id);
        var r = 0;
        while (row = table.rows[r++]) {
            var c = 0;
            while (cell = row.cells[c++]) {
                if (c > 2) {
                    var celltxt = cell.innerHTML;
                    cell.outerHTML = '<td class="pt-3-half" contenteditable="true">' + celltxt + '</td>';
                }
            }
        }
        msg = "Filled the table";
        alertify.success(msg);
        return run_checker_id;
    } catch (e) {
        return "FAILURE";
        HeaderDataErrorReport(e);
    }
}

function generic_uploader_run_data_factory_selected_sheets() {
    try {
        //$('#modalSpinner').modal('show');
        var multiSelect = document.getElementById("selSheets");
        var iLimiter = 4;
        if (multiSelect.selectedOptions.length <= iLimiter) {
            iLimiter = multiSelect.selectedOptions.length;
        }
        $("#myModal").modal('hide');
        // Setting up the processing
        for (var i = 1; i <= iLimiter; i++) {
            $("#DataFactoryProcessing_" + i).text("Starting to background processing");
            $("#DataProcessingGIF_" + i).show();
        }
        // Setting up the runs 
        var run_id_arr = [];
        var tab_id_arr = [];
        for (var i = 0; i < iLimiter; i++) {
            var msg = "Running " + multiSelect.selectedOptions[i].text;
            var sheet_name = multiSelect.selectedOptions[i].text;
            alertify.success(msg);
            var tab_id = i + 1;
            var run_id = '';
            if (tab_id > 1) {
                generic_uploader_show_tab(tab_id);
                run_id = run_data_factory_pull(FileNameForImport, sheet_name, tab_id);
                tab_id_arr.push(tab_id);
                run_id_arr.push(run_id);
                $('#tab_header_' + tab_id.toString()).text(sheet_name);
            } else {
                run_id = run_data_factory_pull(FileNameForImport, sheet_name, tab_id);
                tab_id_arr.push(tab_id);
                run_id_arr.push(run_id);
                $('#tab_header_' + tab_id.toString()).text(sheet_name);
            }
        }        
        // Sending everything to check for runs
        set_run_checkerV2(run_id_arr, tab_id_arr, iLimiter);
        //$('#modalSpinner').modal('hide');
    } catch (e) {
        $('#modalSpinner').modal('hide');
        HeaderDataErrorReport(e);        
    }
}

function generic_uploader_upload_files() {
    try {
        document.getElementById("files").click();
    } catch (e) {
        HeaderDataErrorReport(e);
    }
}

async function set_run_checkerV2(run_id, tab_id, num_runs) {
    try {
        if (num_runs == 1) {
            tab_id = 1;
        }
        var run_status = [];
        for (var i_run = 0; i_run < num_runs; i_run++) {
            run_status.push('N/A');
        }        
        for (var i_run = 1; i_run <= num_runs; i_run++) {
            $("#DataProcessingGIF_" + i_run).show();
        }
        var refreshId = setInterval(function () {
            var x = 1;
            var limiter = 3000
            var colorfnt = 'black';            
            var status = [num_runs];
            for (i_run = 0; i_run < num_runs; i_run++) {            
                if (x <= limiter) {
                    //alert(run_id);
                    //$("#DataFactoryProcessing").text('Checking...');
                    //var urlMain = 'http://vrddatafactory.southcentralus.azurecontainer.io:5000/api/runid_status/'
                    var urlMain = 'http://' + ReturnDataFromService("/Services/WCFWebService.svc/ReturnDockerURL") + '/api/runid_status/';
                    var DataMain = run_id[i_run];
                    urlMain = urlMain + DataMain;
                    var ResultData = ReturnDataFromService(urlMain);
                    x = x + 1;
                    if (ResultData.run_status == "Succeeded") {
                        x = limiter;
                        //clearInterval(refreshId);
                        if (run_status[i_run] != "SUCCESS") {
                            run_status[i_run] = "SUCCESS";
                            $("#DataFactoryProcessing_" + tab_id[i_run]).text(ResultData.run_status);
                            $("#DataProcessingGIF_" + i_run+1).hide()
                        }
                    } else if (ResultData.run_status == "InProgress") {                                                
                        $("#DataFactoryProcessing_" + i_run + 1).text("Processing....");
                        run_status[i_run] = "PROCESS";                        
                    } else if (ResultData.run_status == "Cancelled") {
                        $("#DataFactoryProcessing_" + i_run + 1).text(ResultData.run_status);
                        $("#DataProcessingGIF_" + tab_id[i_run]).hide();
                        run_status[i_run] = "FAILURE";
                    }
                    else if (ResultData.run_status == "Failed") {                        
                        $("#DataFactoryProcessing_" + i_run + 1).text(ResultData.run_status);
                        $("#DataProcessingGIF_" + i_run + 1).hide();
                        run_status[i_run] = "FAILURE";
                    }
                    else {
                        $("#DataFactoryProcessing_" + i_run + 1).text(ResultData.run_status);
                        $("#DataProcessingGIF_" + i_run + 1).hide();
                        run_status[i_run] = "FAILURE";
                    }   
                    var blProcessing = true;
                    for (var i_test = 0; i_test < num_runs; i_test++) {
                        if (run_status[i_test] == "PROCESS") {
                            blProcessing = false;                            
                        }
                    }
                    if (blProcessing == true) {                        
                        for (i_test = 1; i_test < num_runs + 1; i_test++) {
                            $("#DataFactoryProcessing_" + i_test).text("Finished...");
                            $("#DataProcessingGIF_" + i_test).hide()
                        }                        
                        clearInterval(refreshId);
                    }
                    // Run Through If All Processed and Clear
                    //$("#DataProcessingGIF_" + tab_id[i_run]).hide();
                }
            }
        }, 15000);
        

    } catch (e) {
        HeaderDataErrorReport(e);
    }
}
async function set_run_checker(run_id, tab_id) {
    try {
        var x = 1;
        if (tab_id == null) {
            tab_id = 1;
        }
        $("#DataProcessingGIF_" + tab_id).show();
        var refreshId = setInterval(function () {
            var x = 1;
            var limiter = 3000
            var colorfnt = 'black';
            if (x <= limiter) {
                //alert(run_id);
                //$("#DataFactoryProcessing").text('Checking...');
                //var urlMain = 'http://vrddatafactory.southcentralus.azurecontainer.io:5000/api/runid_status/'
                var urlMain = 'http://' + ReturnDataFromService("/Services/WCFWebService.svc/ReturnDockerURL") + '/api/runid_status/';
                var DataMain = run_id
                urlMain = urlMain + DataMain;
                var ResultData = ReturnDataFromService(urlMain);
                x = x + 1;
                if (ResultData.run_status == "Succeeded") {
                    x = limiter;
                    clearInterval(refreshId);
                    $("#DataFactoryProcessing").text(ResultData.run_status)
                    $("#DataProcessingGIF_" + tab_id).hide();
                } else if (ResultData.run_status == "InProgress") {
                    $("#DataFactoryProcessing").text("Processing....")
                } else if (ResultData.run_status == "Cancelled") {
                    $("#DataFactoryProcessing").text("Cancelled")
                    $("#DataProcessingGIF_" + tab_id).hide();
                }
                else if (ResultData.run_status == "Failed") {
                    $("#DataFactoryProcessing").text("Failed")
                    $("#DataProcessingGIF_" + tab_id).hide();
                }
                else {
                    $("#DataFactoryProcessing_" + tab_id).text(ResultData.run_status)
                }
            }
        }, 15000);

    } catch (e) {
        HeaderDataErrorReport(e);
    }
}

function generic_uploader_hide_all_tabs() {
    try {
        // Hide All But First Tab
        for (var i = 2; i < 11; i++) {
            var hdr = "generic_uploader_tab_header_" + i.toString();
            $("#" + hdr).hide();
            //id = "generic_uploader_tab_header_2"
        }
    } catch (e) {
        HeaderDataErrorReport(e);
    }
}
function generic_uploader_import_table() {
    try {
        var FileName = FileNameForImport;
        var sheet_name = "Sheet1";
        sts = UpdateImportStatus("Beginning processing...")
        var file_name = FileName;
        file_name = file_name.toLowerCase();
        var ln = file_name.length;
        var start = ln - 4;
        var end = ln;
        var short_type = file_name.substring(start, ln);
        start = ln - 5;
        var long_type = file_name.substring(start, ln);
        var sheet_name = "SH";
        // Hide All But One 
        generic_uploader_hide_all_tabs();
        if (short_type == ".xls" || short_type == ".xlm" || long_type == ".xlsx" || long_type == ".xlsm") {
            // Obtain sheet names
            file_name = file_name.toLowerCase();
            var urlMain = 'http://' + ReturnDataFromService("/Services/WCFWebService.svc/ReturnDockerURL") + '/api/obtain_sheets_excel/';
            var DataMain = FileName;
            urlMain = urlMain + DataMain;
            var ResultData = ReturnDataFromService(urlMain);
            // Clear the selector
            var selName = "selSheets";
            $('#' + selName).empty();
            AddItemsToSelector(selName, '- Select Sheet -', 0);
            for (var iRows in ResultData) {
                AddItemsToSelector(selName, ResultData[iRows].SheetName, iRows);
            }
            $("#myModal").modal('show');
            alertify.success(ResultData);
            // Set Here
        } else {
            var tab_id = 1;
            generic_uploader_hide_all_tabs();
            var sheet_name = 'CSV';            
            $('#tab_header_' + tab_id.toString()).text(sheet_name);            
            run_id = run_data_factory_pull(FileName, sheet_name, tab_id);
            var tab_id_arr = []
            var run_id_arr = [];
            run_id_arr.push(run_id);
            tab_id_arr.push(1);
            var iLimiter = 1;
            set_run_checkerV2(run_id_arr, tab_id_arr, iLimiter);
            // Set Here
        }
    } catch (e) {
        $("#DataFactoryProcessing").text("Error in processing...")
        HeaderDataErrorReport(e)

    }
}
function generic_uploader_Upload_files(FileType) {
    try {
        //alertify.success("Ok Great");
        var files = document.getElementById('files').files;
        $('.progress-bar').css('width', '0%').attr('aria-valuenow', 0);
        fileslength = files.length;
        if (fileslength > 0) {
            //var FileName = ObtainDateSuffix() + files[0].name;
            var FileName = files[0].name;
            FileNameForImport = ObtainDateSuffix(FileName);
            files[0].name = FileNameForImport;
            var dt = new Date();
            AzureParms = ObtainAzureParams(FileType);
            var UserName = ReturnUserName();
            var AzureStorageName = AzureParms.AzureStorageName;
            var sas = AzureParms.SASKey;
            var blobUri = AzureParms.blobUri;
            container = AzureParms.AzureContainer;
            FileType = FileType.toUpperCase();
            FileType = FileType.trim();
            if (FileType == 'ICECURVE') {
                FileName = files[0].name;
                // Update DB for File Status
                iFileCount = files.length;
                for (iFile = 0; iFile < iFileCount; iFile++) {
                    FileName = files[iFile].name;
                    var FileID = LogFileUploadStatus(0, FileNameForImport, 'UPLD', FileType, UserName);
                    // Change the files
                    uploadBlobByStream(false, files[iFile], FileNameForImport, AzureParms);
                }
                msg = "Uploading proceeding";
                alertify.success(msg);
                FileNameUpload = FileNameForImport;
            } else {
                FileType = FileType.toUpperCase();
                FileType = FileType.trim();
                // Update DB for File Status
                //var FileID = LogFileUploadStatus(0, FileName, 'UPLD', FileType, UserName);
                uploadBlobByStream(false, files, FileName, AzureParms);
                msg = "Uploading proceeding";
                alertify.success(msg);
                FileNameUpload = FileNameForImport;
            }
        } else {
            alertify.error("Please select a file before pressing upload");
        }

    }
    catch (e) {
        HeaderDataErrorReport(e);
    }
}
function generic_uploader_show_file(input) {
    try {
        let file = input.files[0];
        generic_uploader_Upload_files('ICECURVE');

    } catch (e) {
        HeaderDataErrorReport(e);
    }
}

function generic_uploader_delete_row_all(tab_id) {
    try {
        var counter = $("#data-table_" + tab_id + " tr").length;
        for (i = 0; i < 2100; i++) {
            oTable[tab_id].fnDeleteRow(0);
        }
    } catch (e) {
        HeaderDataErrorReport(e);
    }
}
function generic_uploader_delete_row(tab_id) {
    try {
        var counter = $("#data-table_" + tab_id + " tr").length;
        if (counter > 2) {
            counter = counter - 2
        } else {
            counter = 0;
        }
        //var tbl = $("#data-table_" + tab_id);
        oTable[tab_id].fnDeleteRow(counter);
    } catch (e) {
        HeaderDataErrorReport(e);
    }
}
function generic_uploader_add_row(tab_id) {
    try {
        var counter = 0;
        var counter = $("#data-table_" + tab_id + " tr").length;
        //var oTable = $("#data-table_" + tab_id);
        oTable[tab_id].DataTable().fnAddData([
            counter + '.1',
            counter + '.2',
            counter + '.3',
            counter + '.4',
            counter + '.5',
            counter + '.6',
            counter + '.7',
            counter + '.8',
            counter + '.9',
            counter + '.10',
            counter + '.11',
            counter + '.12'
        ]);
    }
    catch (e) {
        HeaderDataErrorReport(e);
    }

}

function generic_uploader_reset_table_comboboxes(tab_id) {
    try {
        var cboInfoSel = document.getElementById('sel_generic_uploader_file_type_' + tab_id);
        var InformationType = 'N/A';
        if (cboInfoSel.options[cboInfoSel.selectedIndex].value != "0") { InformationType = cboInfoSel.options[cboInfoSel.selectedIndex].text; }
        var urlMain = '/Services/WCFWebService.svc/GenericValidationFieldsGetInfo?';
        var DataMain = 'InformationType=' + InformationType
        var urlMain = urlMain + DataMain;
        var ResultData = ReturnDataFromService(urlMain);

        $('#generic_uploader_' + tab_id + 'cbo_field_1').empty();
        $('#generic_uploader_' + tab_id + 'cbo_field_2').empty();
        $('#generic_uploader_' + tab_id + 'cbo_field_3').empty();
        $('#generic_uploader_' + tab_id + 'cbo_field_4').empty();
        $('#generic_uploader_' + tab_id + 'cbo_field_5').empty();
        $('#generic_uploader_' + tab_id + 'cbo_field_6').empty();
        $('#generic_uploader_' + tab_id + 'cbo_field_7').empty();
        $('#generic_uploader_' + tab_id + 'cbo_field_8').empty();
        $('#generic_uploader_' + tab_id + 'cbo_field_9').empty();
        $('#generic_uploader_' + tab_id + 'cbo_field_10').empty();
        $('#generic_uploader_' + tab_id + 'cbo_field_11').empty();
        $('#generic_uploader_' + tab_id + 'cbo_field_12').empty();
        var j = 0;
        for (var i in ResultData) {
            j = j + 1;
        }
        //var x = document.getElementById(SelectID);
        for (var iRow in ResultData) {
            $('#generic_uploader_' + tab_id + 'cbo_field_1').append(new Option(ResultData[iRow].InformationFields, ResultData[iRow].InformationFieldsID));
            $('#generic_uploader_' + tab_id + 'cbo_field_2').append(new Option(ResultData[iRow].InformationFields, ResultData[iRow].InformationFieldsID));
            $('#generic_uploader_' + tab_id + 'cbo_field_3').append(new Option(ResultData[iRow].InformationFields, ResultData[iRow].InformationFieldsID));
            $('#generic_uploader_' + tab_id + 'cbo_field_4').append(new Option(ResultData[iRow].InformationFields, ResultData[iRow].InformationFieldsID));
            $('#generic_uploader_' + tab_id + 'cbo_field_5').append(new Option(ResultData[iRow].InformationFields, ResultData[iRow].InformationFieldsID));
            $('#generic_uploader_' + tab_id + 'cbo_field_6').append(new Option(ResultData[iRow].InformationFields, ResultData[iRow].InformationFieldsID));
            $('#generic_uploader_' + tab_id + 'cbo_field_7').append(new Option(ResultData[iRow].InformationFields, ResultData[iRow].InformationFieldsID));
            $('#generic_uploader_' + tab_id + 'cbo_field_8').append(new Option(ResultData[iRow].InformationFields, ResultData[iRow].InformationFieldsID));
            $('#generic_uploader_' + tab_id + 'cbo_field_9').append(new Option(ResultData[iRow].InformationFields, ResultData[iRow].InformationFieldsID));
            $('#generic_uploader_' + tab_id + 'cbo_field_10').append(new Option(ResultData[iRow].InformationFields, ResultData[iRow].InformationFieldsID));
            $('#generic_uploader_' + tab_id + 'cbo_field_11').append(new Option(ResultData[iRow].InformationFields, ResultData[iRow].InformationFieldsID));
            $('#generic_uploader_' + tab_id + 'cbo_field_12').append(new Option(ResultData[iRow].InformationFields, ResultData[iRow].InformationFieldsID));
        }
        var theText = "";
        var iField = "";
        $('#CustomerSelectorDiv').hide();
        if (InformationType == "Monthly Usage") {
            theText = "Utility Account Number";
            iField = 1
            $("#generic_uploader_" + tab_id + "cbo_field_" + iField).find("option:contains(" + theText + ")").attr('selected', 'selected');
            theText = "Start Date";
            iField = 2
            $("#generic_uploader_" + tab_id + "cbo_field_" + iField).find("option:contains(" + theText + ")").attr('selected', 'selected');
            theText = "End Date";
            iField = 3
            $("#generic_uploader_" + tab_id + "cbo_field_" + iField).find("option:contains(" + theText + ")").attr('selected', 'selected');
            theText = "UsageData";
            iField = 4
            $("#generic_uploader_" + tab_id + "cbo_field_" + iField).find("option:contains(" + theText + ")").attr('selected', 'selected');
        } else if (InformationType == "Interval Data with Date And Hour") {
            theText = "Utility Account Number";
            iField = 1
            $("#generic_uploader_" + tab_id + "cbo_field_" + iField).find("option:contains(" + theText + ")").attr('selected', 'selected');
            theText = "Date of Usage";
            iField = 2
            $("#generic_uploader_" + tab_id + "cbo_field_" + iField).find("option:contains(" + theText + ")").attr('selected', 'selected');
            theText = "Hour Of Usage";
            iField = 3
            $("#generic_uploader_" + tab_id + "cbo_field_" + iField).find("option:contains(" + theText + ")").attr('selected', 'selected');
            theText = "UsageData";
            iField = 4
            $("#generic_uploader_" + tab_id + "cbo_field_" + iField).find("option:contains(" + theText + ")").attr('selected', 'selected');
        } else if (InformationType == "Interval Data with DateTime") {
            theText = "Utility Account Number";
            iField = 1
            $("#generic_uploader_" + tab_id + "cbo_field_" + iField).find("option:contains(" + theText + ")").attr('selected', 'selected');
            theText = "Date and Time of Usage";
            iField = 2
            $("#generic_uploader_" + tab_id + "cbo_field_" + iField).find("option:contains(" + theText + ")").attr('selected', 'selected');
            theText = "UsageData";
            iField = 3
            $("#generic_uploader_" + tab_id + "cbo_field_" + iField).find("option:contains(" + theText + ")").attr('selected', 'selected');
        } else if (InformationType == "Facility") {
            FillCustomerName(tab_id);
            theText = "Utility Account Number";
            iField = 1
            $("#generic_uploader_" + tab_id + "cbo_field_" + iField).find("option:contains(" + theText + ")").attr('selected', 'selected');
            theText = "Service Address 1";
            iField = 2
            $("#generic_uploader_" + tab_id + "cbo_field_" + iField).find("option:contains(" + theText + ")").attr('selected', 'selected');
            theText = "Load Profile";
            iField = 3
            $("#generic_uploader_" + tab_id + "cbo_field_" + iField).find("option:contains(" + theText + ")").attr('selected', 'selected');
            theText = "CongestionZone";
            iField = 4
            $("#generic_uploader_" + tab_id + "cbo_field_" + iField).find("option:contains(" + theText + ")").attr('selected', 'selected');
            theText = "TDU";
            iField = 5
            $("#generic_uploader_" + tab_id + "cbo_field_" + iField).val(42).change();
            theText = "Bill Cycle";
            iField = 6
            $("#generic_uploader_" + tab_id + "cbo_field_" + iField).find("option:contains(" + theText + ")").attr('selected', 'selected');
            theText = "Loss Code Name";
            iField = 7
            $("#generic_uploader_" + tab_id + "cbo_field_" + iField).find("option:contains(" + theText + ")").attr('selected', 'selected');
            theText = "Weather Station";
            iField = 8
            $("#generic_uploader_" + tab_id + "cbo_field_" + iField).find("option:contains(" + theText + ")").attr('selected', 'selected');
            theText = "TDU Tariff ID";
            iField = 9
            $("#generic_uploader_" + tab_id + "cbo_field_" + iField).find("option:contains(" + theText + ")").attr('selected', 'selected');
            theText = "CustomerName";
            iField = 10
            $("#generic_uploader_" + tab_id + "cbo_field_" + iField).find("option:contains(" + theText + ")").attr('selected', 'selected');
        }
        // Ensure that the table has the right linkage
        generic_uploader_add_row(tab_id);
        generic_uploader_delete_row(tab_id);
        return 1;

    }
    catch (e) {
        HeaderDataErrorReport(e);
        return "ERROR";
    }
}

function resolveAfter20Seconds() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('resolved');
        }, 2000);
    });
}

async function generic_uploader_validated_data_upsert(tab_id) {
    try {
        if ($('#DataProcessingGIF_' + tab_id).is(":hidden") == false) {
            msg = "Please wait for the background processing to finish";
            alertify.success(msg);
        } else {
            displayProcess(0);
            //await DisplayModal();
            $("#DataFactoryProcessing_" + tab_id).text("Importing into final table");
            $("#DataProcessingGIF_" + tab_id).show();
            
            if (FileNameForImport != "N/A") {
                var FileNameTXT = FileNameForImport;
                var FileName = FileNameForImport;// files[0].name;
                var FileTypeName = 'ACCOUNT';
                var ContainerName = 'riskaccounts';
                var selector = $("#sel_generic_uploader_file_type_" + tab_id);
                var InformationType = $("#sel_generic_uploader_file_type_" + tab_id).val();
                var FirstRowOfData = $("#LineLength_" + tab_id).val();
                var currentTime = new Date()
                // returns the month (from 0 to 11)
                var month = currentTime.getMonth() + 1;
                // returns the day of the month (from 1 to 31)
                var day = currentTime.getDate();
                // returns the year (four digits)
                var year = currentTime.getFullYear();
                var hr = currentTime.getHours();
                var mn = currentTime.getMinutes();
                var sec = currentTime.getSeconds();
                var table = document.getElementById("data-table_" + tab_id);
                var sheet_name = $('#tab_header_' + tab_id.toString()).text();
                //if ((sheet_name == '') || (sheet_name == null) { sheet_name = 'CSV';}
                //var FirstLineOfDate = LineLength.options[LineLength.selectedIndex].value;
                var msg = 'Failure in processing....'
                var sheet_name = $('#tab_header_' + tab_id.toString()).text();
                //GenericValidatedDataUpsert?FileName={FileName}&InformationType={InformationType}&FirstRowOfData={FirstRowOfData}&Field1={Field1}&Field2={Field2}&Field3={Field3}&Field4={Field4}&Field5={Field5}&Field6={Field6}&Field7={Field7}&Field8={Field8}&Field9={Field9}&Field10={Field10}&Field11={Field11}&Field12={Field12}",
                var xmlInput = '';
                var urlMain = '/Services/CurveUploader.svc/GenericValidatedDataUpsert?';
                var DataMain = '';
                for (var iRow = 1; iRow <= 12; iRow++) {
                    if (xmlInput == '') {
                        xmlInput = '<Row><ID>' + iRow + '</ID><NM>' + $("#" + "generic_uploader_" + tab_id + "cbo_field_" + iRow).find('option:selected').text() + '</NM></Row>';
                    } else {
                        xmlInput = xmlInput + '<Row><ID>' + iRow + '</ID><NM>' + $("#" + "generic_uploader_" + tab_id + "cbo_field_" + iRow).find('option:selected').text() + '</NM></Row>';
                    }
                }
                // Add Customer ID If Sending Facility Information
                if (InformationType == 2) {
                    xmlInput = xmlInput + '<Row><CustomerID>' + $("#cboCustomerSelector_" + tab_id).find('option:selected').val() + '</CustomerID><CustomerName>' + $("#cboCustomerSelector_" + tab_id).find('option:selected').text() + '</CustomerName></Row>';
                }
                DataMain = "FileName=" + FileName + "&InformationType=" + InformationType + "&SheetName=" + sheet_name + "&Field1=" + xmlInput;
                var urlMain = urlMain + DataMain;
                if ((InformationType == 4) || (InformationType == 5)) {
                    var ResultData = ReturnDataFromServiceAsync(urlMain);
                    // Run
                    var FileStatus = "Processing";
                    var PercentDone = 0;
                    iWaits = 0;
                    for (var i = 0; i <= 50; i++) {
                        const result = await resolveAfter20Seconds();
                        urlMain = '/Services/CurveUploader.svc/FileStatusGetInfo?';
                        DataMain = 'FileName=' + FileName + '&FileType=' + FileTypeName + '&SheetName=' + sheet_name;
                        urlMain = urlMain + DataMain;
                        urlMain = '/Services/CurveUploader.svc/FileStatusGetInfo?';
                        DataMain = 'FileName=' + FileName + '&FileType=' + FileTypeName + '&SheetName=' + sheet_name;
                        urlMain = urlMain + DataMain;
                        ResultData = ReturnDataFromService(urlMain);
                        PercentDone = ResultData.PercentDone;
                        FileStatus = ResultData.FileStatus;
                        if (i >= 5) {
                            if (FileStatus == 'FAIL') {
                                break;
                            }
                            if ((FileStatus == 'SUCC') && (PercentDone == 100)) {
                                if (iWaits >= 3) {
                                    break;
                                }
                                iWaits++;
                            }
                            msg = "Percent complete " + PercentDone + "%";
                            $('#ProgressLabel').text(msg);
                        }
                    }
                    const result1 = await resolveAfter20Seconds();
                    const result2 = await resolveAfter20Seconds();
                    msg = "Interval data has been sent for processing, please pay attention to the progress bar";
                    alertify.success(msg);
                    //RunModal();
                } else if (InformationType == 2) {
                    ReturnDataFromServiceAsync(urlMain);
                    const result1 = await resolveAfter20Seconds();
                    const result2 = await resolveAfter20Seconds();
                    msg = "Interval data has been sent for processing, please pay attention to the progress bar";
                    alertify.success(msg);
                    //RunModal();
                } else {
                    ReturnDataFromServiceAsync(urlMain);
                    const result1 = await resolveAfter20Seconds();
                    const result2 = await resolveAfter20Seconds();
                    msg = "Interval data has been sent for processing, please pay attention to the progress bar";
                    alertify.success(msg);
                }                
                generic_uploader_delete_row_all(tab_id);
                msg = "Sent for processing";
                alertify.success(msg);
            } else {
                msg = "Please select a file before importing the file";
                alertify.error(msg);
            }
            //await HideModal();
        }
        $("#modalSpinner").modal('hide');
        $("#DataFactoryProcessing_" + tab_id).text("Finished importing into final table");
        $("#DataProcessingGIF_" + tab_id).hide();

    }
    catch (e) {
        //HeaderDataErrorReport(e);
        $("#modalSpinner").modal('hide');
        $("#DataFactoryProcessing_" + tab_id).text("Error in processing import into final table");
        $("#DataProcessingGIF_" + tab_id).hide();
        var msg = 'Failure in processing....'
        alertify.error(msg);

    }
}
function generic_uploader_add_tab(tab_id, div_id) {
    try {
        // Add Tab With All Underlying Objects
        //var my_name = 'John';
        var first = `hello ${tab_id}, how are you doing`;
        
        var first = '<div class="row"><div class="col-lg-12 col-md-12"><div class="widget"><div class="widget-header"><div class="title">Files Imported<a id="dynamic-tables"></a></div></div>';
        var second = '<div id="dtExampleWidget" class="widget-body"><div id="dt_example" class="example_alt_pagination"><div class="form-group"><div>Background Processing<font id="read"> </font> </div>';
        var third = '<div><label id="DataFactoryProcessing_' + tab_id + '" class="label-bullet">Not Processing</label></br><img id="DataProcessingGIF_' + tab_id + '" src="Gif/gears7.gif" /></div></div>';
        //var third_2 = '<div><label id="StoredProcedureProcessing_' + tab_id + '" class="label-bullet">Not Processing Import to Table</label></br><img id="StoredProcedureProcessingGIF_' + tab_id + '" src="Gif/gears7.gif" /></div></div>';
        var fourth = '<div class="col-lg-12"><div class="col-md-2 col-sm-2 col-xs-2"><label class="label-bullet-blue">Select File Type</label>';
        var fifth = '<select id="sel_generic_uploader_file_type_' + tab_id + '" onchange="generic_uploader_reset_table_comboboxes(' + tab_id + ')" class="form-control"></select></div><div id="CustomerSelectorDiv" class="col-md-4 col-sm-4 col-xs-4" hidden="true">';
        var sixth = '<label class="label-bullet-blue">Customer</label><select id="cboCustomerSelector_' + tab_id + '" class="form-control"><option value="0">- Customer -</option></select></div>';
        var seventh = '<div class="col-md-2 col-sm-2 col-xs-2"><label class="label-bullet-blue">Start Line of Data</label><select id="sel_LineLength_' + tab_id + '" class="form-control"></select></div></div>';
        var eighth = '</br><div id="tableContainer_' + tab_id + '" class="tableContainer datablock"><table id="data-table_' + tab_id + '"></table>';
        var ninth = '</div><div class="clearfix"></div></div></div><div class="widget"><input type="button" id="validate-button_' + tab_id + '" class="btn btn-primary btn-lg" value="Import Into Table" onclick="generic_uploader_validated_data_upsert(' + tab_id + ')" /></div></div></div></div>';
        var final = first + second + third + fourth + fifth + sixth + seventh + eighth + ninth;
        $('#' + div_id).append(final);
        generic_uploader_create_base_table(tab_id);
        generic_uploader_FileInitialDropDowns(tab_id);
        //$("#sel_generic_uploader_file_type_" + tab_id).prop("selectedIndex", 0);
        //generic_uploader_reset_table_comboboxes(tab_id)
        $("#DataProcessingGIF_" + tab_id).hide();
        //$("#StoredProcedureProcessingGIF_" + tab_id).hide();
    } catch (e) {
        HeaderDataErrorReport(e);
    }
}