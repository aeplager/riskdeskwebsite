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
        //var urlMain = 'http://vrddatafactory.southcentralus.azurecontainer.io:5000/api/datafactor_data/'
        var urlMain = 'http://' + ReturnDataFromService("/Services/WCFWebService.svc/ReturnDockerURL") + '/api/datafactor_data/';
        var DataMain = FileName + '/' + sheet_name + '/100';
        urlMain = urlMain + DataMain;
        var ResultData = ReturnDataFromService(urlMain);
        var iLimit = oTable[tab_id].fnGetData().length;
        for (i = 1; i <= iLimit; i++) {
            oTable[tab_id].fnDeleteRow(0);
        }
        if (ResultData.length > 0) {
            $("#DataFactoryProcessing").text("Starting to background processing");
            set_run_checker(ResultData[0].run_id, tab_id);
            for (var iRows in ResultData) {
                oTable[tab_id].fnAddData([
                    //ResultData[iRows].ValidateID,
                    //ResultData[iRows].FileName,
                    //1,
                    //'N/A',
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
    } catch (e) {
        HeaderDataErrorReport(e);
    }
}
function generic_uploader_run_data_factory_selected_sheets() {
    try {

        var multiSelect = document.getElementById("selSheets");
        var iLimiter = 4;
        if (multiSelect.selectedOptions.length <= iLimiter) {
            iLimiter = multiSelect.selectedOptions.length;
        }
        $("#myModal").modal('hide');
        for (var i = 0; i < iLimiter; i++) {
            var msg = "Running " + multiSelect.selectedOptions[i].text;
            var sheet_name = multiSelect.selectedOptions[i].text;
            alertify.success(msg);
            var tab_id = i + 1;
            if (tab_id > 1) {
                generic_uploader_show_tab(tab_id);
            }
            $('#tab_header_' + tab_id.toString()).text(sheet_name);
            run_data_factory_pull(FileNameForImport, sheet_name, tab_id);
        }

    } catch (e) {
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
function ImportIntoValidationTableNew(tab_id) {
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

        } else {
            var tab_id = 1;
            generic_uploader_hide_all_tabs();
            var sheet_name = 'CSV';            
            $('#tab_header_' + tab_id.toString()).text(sheet_name);
            run_data_factory_pull(FileName, sheet_name, tab_id);
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


                generic_uploader_delete_row(tab_id);

                msg = "Sent for processing";
                alertify.success(msg);
            } else {
                msg = "Please select a file before importing the file";
                alertify.error(msg);
            }
            //await HideModal();
        }

    }
    catch (e) {
        //HeaderDataErrorReport(e);
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
        var third = '<div><label id="DataFactoryProcessing" class="label-bullet">Not Processing</label></br><img id="DataProcessingGIF_' + tab_id + '" src="Gif/gears7.gif" /></div></div>';
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
    } catch (e) {
        HeaderDataErrorReport(e);
    }
}



// *******************************************
// Hide Below - 2020-12-25
// *******************************************



function generic_uploader_delete_all_rows(tab_id) {
    try {        
        var rowcount = $("#data-table_" + tab_id + " tr").length;
        var tbl = $("#data-table_" + tab_id);
        for (iRows = 0; iRows < rowcount + 1; iRows++) {
            oTable[tab_id].fnDeleteRow(0);
        }
        alertify.success("RowCount is " + rowcount);
        
    } catch (e) {
        HeaderDataErrorReport(e);
    }
}

function generic_uploader_FileInitialDropDowns(tab_id) {
    GeneralSelFill('sel_generic_uploader_file_type_' + tab_id, '- File Type -', '/Services/CurveUploader.svc/InformationTypeGetInfo');
    GeneralSelFill('sel_LineLength_' + tab_id, '- Line Length -', '/Services/CurveUploader.svc/LineStartGetInfo');
}
//GeneralSelFill('sel_generic_uploader_file_type_' + nbrLiElem + 1, '- File Type -', '/Services/CurveUploader.svc/FileTypeGetInfo');
//GeneralSelFill('LineLength' + nbrLiElem + 1, '- Line Length -', '/Services/CurveUploader.svc/LineStartGetInfo');





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
        generic_uploader_delete_row(tab_id);    }
    catch (e) {
        HeaderDataErrorReport(e);
    }
}




function deterimine_sheet_name(file_name) {
    try {
        file_name = file_name.toLowerCase();
        var ln = file_name.length;
        var start = ln - 4;
        var end = ln;
        var short_type = file_name.substring(start, ln);
        start = ln - 5;
        var long_type = file_name.substring(start, ln);
        var sheet_name = "SH";
        if (short_type == ".xls" || short_type == ".xlm" || long_type == ".xlsx" || long_type == ".xlsm") {
            var msg = prompt("Please Enter Sheet Name:", "Sheet1");
            if (msg == null || msg == "") {
                msg = "User cancelled the prompt.";
            } else {
                sheet_name = msg;
            }
            file_type = "Excel";
        }
        return sheet_name;
    } catch (e) {
        HeaderDataErrorReport(e);
        return "ERROR";
    }
}



function GenericValidationByRowsUpsert() {
    try {
        //var files = document.getElementById('files').files;
        var FileName = FileNameForImport;// files[0].name;
        var FileTypeName = 'ACCOUNT';
        var ContainerName = 'riskaccounts';
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

        var table = document.getElementById("data-table");
        ///GenericValidationByRowsUpsert?FileName={FileName}&FileTypeName={FileTypeName}&ContainerName={ContainerName}&ValidationID={ValidationID}&Field1={Field1}&Field2={Field2}&Field3={Field3}&Field4={Field4}&Field5={Field5}&Field6={Field6}&Field7={Field7}&Field8={Field8}&Field9={Field9}&Field10={Field10}&Field11={Field11}&Field12={Field12}",
        for (var i = 0, row; row = table.rows[i]; i++) {
            //iterate through rows
            //rows would be accessed using the "row" variable assigned in the for loop
            if (row.cells[0].innerHTML != "") {
                var urlMain = '/Services/WCFWebService.svc/GenericValidationByRowsUpsert?';
                var DataMain = 'FileName=' + FileName + '&FileTypeName=' + FileTypeName + '&ContainerName=' + ContainerName + '&ValidationID=' + row.cells[0].innerHTML;
                DataMain = DataMain + "&Field1=" + row.cells[2].innerHTML;
                DataMain = DataMain + "&Field2=" + row.cells[3].innerHTML;
                DataMain = DataMain + "&Field3=" + row.cells[4].innerHTML;
                DataMain = DataMain + "&Field4=" + row.cells[5].innerHTML;
                DataMain = DataMain + "&Field5=" + row.cells[6].innerHTML;
                DataMain = DataMain + "&Field6=" + row.cells[7].innerHTML;
                DataMain = DataMain + "&Field7=" + row.cells[8].innerHTML;
                DataMain = DataMain + "&Field8=" + row.cells[9].innerHTML;
                DataMain = DataMain + "&Field9=" + row.cells[10].innerHTML;
                DataMain = DataMain + "&Field10=" + row.cells[11].innerHTML;
                DataMain = DataMain + "&Field11=" + row.cells[12].innerHTML;
                DataMain = DataMain + "&Field12=" + row.cells[13].innerHTML
                msg = DataMain;
                var urlMain = urlMain + DataMain;
                var ResultData = ReturnDataFromService(urlMain);
            }
        }
        var msg = 'Validation was sent for processing....'
        alertify.success(msg);
    }
    catch (e) {
        HeaderDataErrorReport(e);
    }
}



function UpdateImportStatus(Msg) {
    $("#DataFactoryProcessing").text("Beginning processing...")
    return "SUCCESS"
}


function getSelectValues(select) {
    var result = [];
    var options = select && select.options;
    var opt;

    for (var i = 0, iLen = options.length; i < iLen; i++) {
        opt = options[i];

        if (opt.selected) {
            result.push(opt.value || opt.text);
        }
    }
    return result;
}
function generic_uploader_show_all_tabs() {
    try {
        // Hide All But First Tab
        for (var i = 1; i < 11; i++) {
            var hdr = "generic_uploader_tab_header_" + i.toString();
            $("#" + hdr).show();
            //id = "generic_uploader_tab_header_2"
        }
    } catch (e) {
        HeaderDataErrorReport(e);
    }
}
function generic_uploader_show_tab(tab_id) {
    try {
        var hdr = "generic_uploader_tab_header_" + tab_id.toString();
        $("#" + hdr).show();

    } catch (e) {
        HeaderDataErrorReport(e);
    }
}



// *************************************************************************************************************
// Delete Below
// *************************************************************************************************************
async function ImportGenericDataMain() {
    //ShowModal();
    //await DisplayModal();
    ImportGenericData();
    //await HideModal();    
}

function ImportGenericData() {
    try {
        // Check to see if a file has been uploaded        
        //$('.progress-bar').css('width', '0%').attr('aria-valuenow', 0);        
        process = "0";
        document.getElementById("progress").style.width = process + '%';
        document.getElementById("progress").innerHTML = process + '%';
        //setTimeout(ShowModal(), 3000);
        //setTimeout(function () { $("#myModal").modal('show'); }, 3000);
        //var process = speedSummary.getCompletePercent();
        if (FileNameForImport != "N/A") {
            // Reset the process uploader                
            //var msg = "Processing";
            //alertify.success(msg);
            GenericClearValidation();
            //$('.progress-bar').css('width', '30%').attr('aria-valuenow', 0);            
            msg = "Processing";
            //alertify.success(msg);
            AddGenericData();
            process = "100";
            document.getElementById("progress").style.width = process + '%';
            document.getElementById("progress").innerHTML = process + '%';            
            msg = "Finished Processing";
            alertify.success(msg);
        } else {
            
            msg = "Please select a file before importing the file";
            alertify.error(msg);
        }
    }
    catch (e) {
        setTimeout(function () { $("#myModal").modal('hide'); }, 3000);
        HeaderDataErrorReport(e);
    }
}

function GenericClearValidation() {
    try {
        var msg = "Processing";
        alertify.success(msg);
        var iLimit = oTable.fnGetData().length;
        for (i = 1; i <= iLimit; i++) {
            oTable.fnDeleteRow(0);
        }
    }
    catch (e) {
        HeaderDataErrorReport(e);
    }
}



async function GenericUpsert() {
    urlMain = await ReturnGenericDataURL();
    await DisplayModal();
    const result = await resolveAfter20Seconds();    
    //var ResultData = ReturnDataFromServiceAsync(urlMain);
    await ReturnDataFromServiceAsync2(urlMain);
    await PullGenericDataBack();
    await HideModal();
}
async function PullGenericDataBack() {
    try {
    msg = 'Success';
    alertify.success(msg);
    msg = 'Returning Data...';
    alertify.success(msg);
    // Adding the data to the validation screen
    urlMain = '/Services/CurveUploader.svc/GenericFileGetInfo?';

    DataMain = 'FileName=' + FileName + '&FileTypeName=' + FileTypeName + '&ContainerName=' + ContainerName + '&RandomNumber=' + RandomNumber + '&RowNumber=50';
    urlMain = urlMain + DataMain;    
    // Display Loading Screen                    
    //var urlMain = 'http://vrddatafactory.southcentralus.azurecontainer.io:5000/api/data/'
    var urlMain = 'http://' + ReturnDataFromService("/Services/WCFWebService.svc/ReturnDockerURL") + '/api/data/';
    //urlMain = 'http://localhost:32773/api/data/'
    var DataMain = 'vwFacilityUpdateAddingNew3_2020_5_31_21_40.csv/sh'
    var urlMain = urlMain + DataMain;
    //let ResultData = await ReturnDataFromServicePOST(urlMain);
    var ResultData = ReturnDataFromServicePOST(urlMain);
    msg = ResultData[1].Field1;
    for (var iRows in ResultData) {
        oTable.fnAddData([
            ResultData[iRows].ValidateID,
            ResultData[iRows].FileName,
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

    var table = document.getElementById("data-table");
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
    msg = 'Successful Pull Back';
        alertify.success(msg);
    } catch (e) {
        HeaderDataErrorReport(e);
    }
}
async function AddGenericData() {
    try {                
        //iStartRow = 1;
        //iEndRow = 50;               
        //alertify.success("Processing");
        ////var files = document.getElementById('files').files;        
        //var FileName = FileNameForImport;//files[0].name;  // Change here so that the file is imported correctly with new data
        //var FileTypeName = 'ACCOUNT';
        //var ContainerName = 'vrd';
        //var currentTime = new Date()
        //// returns the month (from 0 to 11)
        //var month = currentTime.getMonth() + 1;
        //// returns the day of the month (from 1 to 31)
        //var day = currentTime.getDate();
        //// returns the year (four digits)
        //var year = currentTime.getFullYear();
        //var hr = currentTime.getHours();
        //var mn = currentTime.getMinutes();
        //var sec = currentTime.getSeconds();
        //RandomNumber = "GenDate_" + year + '-' + month + '-' + day + '-' + hr + '-' + mn + '-' + sec;
        //var urlMain = '/Services/CurveUploader.svc/GenericFileUpsert?';        
        //var DataMain = 'FileName=' + FileName + '&FileTypeName=' + FileTypeName + '&ContainerName=' + ContainerName + '&RandomNumber=' + RandomNumber;
        //var urlMain = urlMain + DataMain;
        // Display Loading Screen        
        urlMain = await ReturnGenericDataURL();
        await DisplayModal();
        //var ResultData = ReturnDataFromServiceAsync(urlMain);
        await ReturnDataFromServiceAsync2(urlMain);
        await HideModal();
        return;
        //var ResultData = ReturnDataFromService(urlMain);
        var msg = 'Validation was sent for processing....'
        // Maybe send it async
        
        ReturnDataFromService()
        for (var i = 0; i <= 20; i++) {
            const result = await resolveAfter20Seconds();
            urlMain = '/Services/CurveUploader.svc/FileStatusGetInfo?';
            DataMain = 'FileName=' + FileName + '&FileType=' + FileTypeName 
            urlMain = urlMain + DataMain;
            var RS = ReturnDataFromService(urlMain);

        }
        

        if (ResultData == 4) {
            msg = 'Success';
            alertify.success(msg);
            msg = 'Returning Data...';
            alertify.success(msg);
            // Adding the data to the validation screen
            urlMain = '/Services/CurveUploader.svc/GenericFileGetInfo?';
            DataMain = 'FileName=' + FileName + '&FileTypeName=' + FileTypeName + '&ContainerName=' + ContainerName + '&RandomNumber=' + RandomNumber + '&RowNumber=50';
            urlMain = urlMain + DataMain;
            // Display Loading Screen                    
            //var ResultData = ReturnDataFromService(urlMain);
            //var urlMain = 'http://vrddatafactory.southcentralus.azurecontainer.io:5000/api/datafactor_data/'
            var urlMain = 'http://' + ReturnDataFromService("/Services/WCFWebService.svc/ReturnDockerURL") + '/api/datafactor_data/';
            //urlMain = 'http://localhost:32773/api/data/'
            var DataMain = 'vwFacilityUpdateAddingNew3_2020_5_31_21_40.csv/sh'
            var urlMain = urlMain + DataMain;
            //let ResultData = await ReturnDataFromServicePOST(urlMain);
            var ResultData = await ReturnDataFromServicePOST(urlMain);

            msg = ResultData[1].Field1;
            for (var iRows in ResultData) {
                oTable.fnAddData([
                    ResultData[iRows].ValidateID,
                    ResultData[iRows].FileName,
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
            
            var table = document.getElementById("data-table");
            var r = 0;
            while (row = table.rows[r++]) {
                var c = 0;
                while (cell = row.cells[c++]) {
                    if (c >  2) {
                    var celltxt = cell.innerHTML;                    
                        cell.outerHTML = '<td class="pt-3-half" contenteditable="true">' + celltxt + '</td>';
                    }
                }
            }
            msg = 'Successful Pull Back';
            alertify.success(msg);
        }
        else {
            msg = 'Failure';
            alertify.success(msg);
        }           
    }
    catch (e) {
        $('.modal').modal('hide');
        HeaderDataErrorReport(e);
    }
}
function refreshData(perc) {
    x = 7;  // 5 Seconds    
    //SetSpinnerAmount(perc);
    wait(2000);
    alert('Test');
    
}

function wait(ms) {
    var start = Date.now(),
        now = start;
    while (now - start < ms) {
        now = Date.now();
    }
}
function CreateBaseFieldsTable() {
    try {
        var FileName = 'N/A';
        var FileTypeName = 'ACCOUNT';
        var ContainerName = 'riskaccounts';
        var urlMain = '/Services/WCFWebService.svc/GenericValidationFieldsGetInfo?InformationType=N/A';
        //var DataMain = 'FileName=' + FileName + '&FileTypeName=' + FileTypeName + '&ContainerName=' + ContainerName;
        //var urlMain = urlMain + DataMain;
        var ResultData = ReturnDataFromService(urlMain);
        var j = 0;
        for (var i in ResultData) {
            j = j + 1;
        }
        $('#data-tableMatch').remove();
        $("#tableContainerMatch").remove("#data-tableMatch");

        var myTable = $('<table></table>').attr({ id: "data-table", width: "100%", overflow: "scroll", class: "scrollTable table-hover" });
        var rows = 5;
        if (j <= rows) { rows = j - 1; }
        if (rows <= 1) { rows = 1; }
        var cols = 2;
        var tr = [];
        var iCounter = 1;
        for (var i = 0; i <= rows; i++) {
            if (i == 0) {
                var tHead = $('<thead></thead>').attr({}).appendTo(myTable);
                var row = $('<tr></tr>').appendTo(tHead);
                $('<th></th>').text("InformationType").appendTo(row);
                $('<th></th>').text("InformationFields").appendTo(row);

            } else {
                if (i == 1) {
                    var tBody = $('<tbody></tbody>').appendTo(myTable);
                }
                for (var iRows in ResultData) {
                    if (iCounter > j) break;
                    var row = $('<tr></tr>').attr({ id: "gen_" + iCounter, class: "gradeA success" }).appendTo(tBody);
                    $('<td></td>').text(ResultData[iRows].InformationType).appendTo(row);
                    $('<td></td>').text(ResultData[iRows].InformationFields).appendTo(row);
                    
                    iCounter = iCounter + 1;
                    
                }
            }
        }
        myTable.appendTo("#tableContainerMatch");
        oTableMatch = $('#data-tableMatch').DataTable(
            {
                "columnDefs": [{
                    "searchable": false,
                    "orderable": false,
                    "targets": 0
                }],
                "order": [[1, 'asc']],
                "sScrollX": "100%",
                //"sScrollY": "300px",
                
                //"sScrollXInner": "150%",
                //"bScrollCollapse": true,                
                //"bPaginate": false,
                //"bFilter": false
                //"sScrollY": "300px",
                //"sScrollX": "100%",
                //"sScrollXInner": "150%",
                ////"paging": true,                
                ////"ordering": false,
                ////"info": false  
                //"order": [[3, "desc"]],
                //"bScrollCollapse": true,
                //"bPaginate": false,
                ////"aaSorting": [],
                //"bFilter": false

            });
    }
    catch (e) {
        HeaderDataErrorReport(e);
    }
}
function AddTypeSelection() {
    try {
        var urlMain = '/Services/WCFWebService.svc/GenericValidationFieldsGetInfo?InformationType=Account';
        var ResultData = ReturnDataFromService(urlMain);
        var j = 0;
        for (var i in ResultData) {
            j = j + 1;
        }
        // Obtain oTable
        //var t = $('#data-tableUpload').DataTable();

        //var iLimit = oTableMatch.fnGetData().length;
        var iLimit = 29;
        for (i = 1; i <= iLimit; i++) {
            oTableMatch.fnDeleteRow(0);
        }
        for (var iRows in ResultData) {
            oTableMatch.fnAddData([
                ResultData[iRows].InformationType,
                ResultData[iRows].InformationFields,
            ]);
        }

    }
    catch (e) {
        HeaderDataErrorReport(e);
    }
}
function deleteRow(row) {
    try{
        var i = row.parentNode.parentNode.rowIndex;
        document.getElementById('data-tableFieldLink').deleteRow(i);
    }
    catch (e) {
        HeaderDataErrorReport(e);
    }
}


function insRow() {
    try{
        var x = document.getElementById('data-tableFieldLink');
        var new_row = x.rows[1].cloneNode(true);
        var len = x.rows.length;
        new_row.cells[0].innerHTML = len;

        var inp1 = new_row.cells[1].getElementsByTagName('select')[0];
        inp1.id += len;
        inp1.value = '';
        var inp2 = new_row.cells[2].getElementsByTagName('select')[0];
        inp2.id += len;
        inp2.value = '';
        x.appendChild(new_row);
    }
    catch (e) {
        HeaderDataErrorReport(e);
    }
}
function DisplayRowNumbers() {
    try {
        //var currentrowcount = document.getElementById(tableId).getElementsByTagName("tr").length;
        $("#data-tableFieldLink-tbody tr").remove();
        var cboInfoSel = document.getElementById('FileTypeSel');
        var InfoSel = 'N/A';
        if (cboInfoSel.options[cboInfoSel.selectedIndex].value != "0") { InfoSel = cboInfoSel.options[cboInfoSel.selectedIndex].text; }
        var iFieldCounter = 1 ;
        for (iFieldCounter = 1; iFieldCounter <= 10; iFieldCounter++) {
            var tbl = document.getElementById('data-tableFieldLink');
            var nRow = tbl.rows.length+1;
            var specific_tbody = document.getElementById('data-tableFieldLink-tbody');
            // Column 1
            var newRow = specific_tbody.insertRow(-1);
            var newCell = newRow.insertCell(0);
            var newText = document.createTextNode('Cell 0 on row ' + nRow);
            //newCell.appendChild(newText);        
            //newCell = newRow.insertCell(1);
            // Column 2
            // Adding the from field
            var NewSelect = document.createElement("Select");
            var SelectID = "fromField" + nRow
            NewSelect.id = SelectID;
            // Adding options to selector
            var x = document.getElementById(SelectID);
            NewSelect = document.createElement("Select");
            var SelectID = "fromField" + nRow
            NewSelect.id = SelectID;
            NewSelect.className = "form-control";
            newCell.appendChild(NewSelect);
            InformationFieldsFillCombo(SelectID, 'N/A')
            newCell = newRow.insertCell(1);
            // Column 3
            NewSelect = document.createElement("Select");
            SelectID = "toField" + nRow
            NewSelect.id = SelectID;
            NewSelect.className = "form-control";
            newCell.appendChild(NewSelect);
            InformationFieldsFillCombo(SelectID, InfoSel)
            // Adding To Field
            newCell = newRow.insertCell(2);
            NewSelect = document.createElement("input");
            NewSelect.type = "checkbox"
            NewSelect.id = "checkbox_" + nRow;
            NewSelect.valye = 1
            newCell.appendChild(NewSelect);
            newCell = newRow.insertCell(3);                  
        }        
        msg = "Success";
        alertify.success(msg);
    }
    catch (e) {
        HeaderDataErrorReport(e);
    }
}
function InformationFieldsFillCombo(SelectID, InformationType) {
    try {
        var urlMain = '/Services/WCFWebService.svc/GenericValidationFieldsGetInfo?';
        var DataMain = 'InformationType=' + InformationType
        var urlMain = urlMain + DataMain;
        var ResultData = ReturnDataFromService(urlMain);
        var j = 0;
        for (var i in ResultData) {
            j = j + 1;
        }
        var x = document.getElementById(SelectID);
        for (var iRow in ResultData) {            
            var option = document.createElement("option");
            option.text = ResultData[iRow].InformationFields;
            option.value = iRow;
            x.add(option);
        }
        return 1;
    }
    catch (e) {        
        HeaderDataErrorReport(e);
        return 0;
    }
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

function FillCustomerName(tab_id) {
    try {        
        $('#CustomerSelectorDiv').show();
        var urlMain = '/Services/CurveUploader.svc/CustomerNameGetInfo';                
        var ResultData = ReturnDataFromService(urlMain);
        var cboCustomerSelector = "#cboCustomerSelector_" + tab_id;
        $(cboCustomerSelector).empty();        
        $(cboCustomerSelector).append($('<option>', { text: "-- Customer --", value: "0"}));
        for (var iRow in ResultData) {
            $(cboCustomerSelector).append($('<option>', { text: ResultData[iRow].SelectorText, value: ResultData[iRow].SelectorID }));
        }
    } catch (e) {
        HeaderDataErrorReport(e);
    }
}
function ReturnInValidFields() {
    try {        
        
        if (FileNameForImport != "N/A") {
            var FileNameTXT = files[0].name;
            var files = document.getElementById('files').files;
            var FileName = FileNameForImport;
            var cboInfoSel = document.getElementById('FileTypeSel');
            var InformationType = 'N/A';
            if (cboInfoSel.options[cboInfoSel.selectedIndex].value != "0") { InformationType = cboInfoSel.options[cboInfoSel.selectedIndex].text; }
            if (InformationType == "N/A") {
                msg = "Please select an information type";
                alertify.success(msg);
            }
            else {
                GenericClearValidation();
                var cboInfoSel = document.getElementById('generic_uploader_' + tab_id + 'cbo_field_1');
                var Field1 = cboInfoSel.options[cboInfoSel.selectedIndex].text;

                cboInfoSel = document.getElementById('generic_uploader_' + tab_id + '_' + 'cbo_field_2');
                var Field2 = cboInfoSel.options[cboInfoSel.selectedIndex].text;

                cboInfoSel = document.getElementById('generic_uploader_' + tab_id + '_' + 'cbo_field_3');
                var Field3 = cboInfoSel.options[cboInfoSel.selectedIndex].text;

                cboInfoSel = document.getElementById('generic_uploader_' + tab_id + '_' + 'cbo_field_4');
                var Field4 = cboInfoSel.options[cboInfoSel.selectedIndex].text;

                cboInfoSel = document.getElementById('generic_uploader_' + tab_id + '_' + 'cbo_field_5');
                var Field5 = cboInfoSel.options[cboInfoSel.selectedIndex].text;

                cboInfoSel = document.getElementById('generic_uploader_' + tab_id + '_' + 'cbo_field_6');
                var Field6 = cboInfoSel.options[cboInfoSel.selectedIndex].text;

                cboInfoSel = document.getElementById('generic_uploader_' + tab_id + '_' + 'cbo_field_7');
                var Field7 = cboInfoSel.options[cboInfoSel.selectedIndex].text;

                cboInfoSel = document.getElementById('generic_uploader_' + tab_id + '_' + 'cbo_field_8');
                var Field8 = cboInfoSel.options[cboInfoSel.selectedIndex].text;

                cboInfoSel = document.getElementById('generic_uploader_' + tab_id + '_' + 'cbo_field_9');
                var Field9 = cboInfoSel.options[cboInfoSel.selectedIndex].text;

                cboInfoSel = document.getElementById('generic_uploader_' + tab_id + '_' + 'cbo_field_10');
                var Field10 = cboInfoSel.options[cboInfoSel.selectedIndex].text;

                cboInfoSel = document.getElementById('generic_uploader_' + tab_id + '_' + 'cbo_field_11');
                var Field11 = cboInfoSel.options[cboInfoSel.selectedIndex].text;

                cboInfoSel = document.getElementById('generic_uploader_' + tab_id + '_' + 'cbo_field_12');
                var Field12 = cboInfoSel.options[cboInfoSel.selectedIndex].text;

                var FirstLineOfDate = LineLength.options[LineLength.selectedIndex].value;
                msg = "Updating table....";
                alertify.success(msg);
                progressmovebar();
                var urlMain = '/Services/WCFWebService.svc/GenericValidationReturnBadRowsGetInfo/?';
                var DataMain = 'FileName=' + FileName + '&InformationType=' + InformationType + '&Field1=' + Field1 + '&Field2=' + Field2 + '&Field3=' + Field3 + '&Field4=' + Field4 + '&Field5=' + Field5 + '&Field6=' + Field6 + '&Field7=' + Field7 + '&Field8=' + Field8 + '&Field9=' + Field9 + '&Field10=' + Field10;
                var urlMain = urlMain + DataMain;
                var ResultData = ReturnDataFromService(urlMain);
                for (var iRows in ResultData) {
                    oTable.fnAddData([
                        ResultData[iRows].ValidateID,
                        ResultData[iRows].FileName,
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
                var table = document.getElementById("data-table");
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

                msg = "Returned Bad Rows";
                alertify.success(msg);
            }
        } else {
            msg = "Please select a file before identify bad records";
            alertify.error(msg);
        }
    }
    catch (e) {
        HeaderDataErrorReport(e);        
    }
}
function GenericTableUpload() {
    try {
        msg = "Starting update to table....";
        alertify.success(msg);  
        var files = document.getElementById('files').files;
        var FileName = files[0].name;
        FileName = FileNameForImport;
        var cboInfoSel = document.getElementById('FileTypeSel');
        var InformationType = 'N/A';
        if (cboInfoSel.options[cboInfoSel.selectedIndex].value != "0") { InformationType = cboInfoSel.options[cboInfoSel.selectedIndex].text; }
        if (InformationType == "N/A")
        {
            msg = "Please select an information type";
            alertify.success(msg);
        }
        else {
            
            var cboInfoSel = document.getElementById('generic_uploader_' + tab_id + 'cbo_field_' + '1');
            var Field1 = cboInfoSel.options[cboInfoSel.selectedIndex].text;

            cboInfoSel = document.getElementById('generic_uploader_' + tab_id + 'cbo_field_' + '2');
            var Field2 = cboInfoSel.options[cboInfoSel.selectedIndex].text;

            cboInfoSel = document.getElementById('generic_uploader_' + tab_id + 'cbo_field_' + '3');
            var Field3 = cboInfoSel.options[cboInfoSel.selectedIndex].text;

            cboInfoSel = document.getElementById('generic_uploader_' + tab_id + 'cbo_field_' + '4');
            var Field4 = cboInfoSel.options[cboInfoSel.selectedIndex].text;

            cboInfoSel = document.getElementById('generic_uploader_' + tab_id + 'cbo_field_' + '5');
            var Field5 = cboInfoSel.options[cboInfoSel.selectedIndex].text;

            cboInfoSel = document.getElementById('generic_uploader_' + tab_id + 'cbo_field_' + '6');
            var Field6 = cboInfoSel.options[cboInfoSel.selectedIndex].text;

            cboInfoSel = document.getElementById('generic_uploader_' + tab_id + 'cbo_field_' + '7');
            var Field7 = cboInfoSel.options[cboInfoSel.selectedIndex].text;

            cboInfoSel = document.getElementById('generic_uploader_' + tab_id + 'cbo_field_' + '8');
            var Field8 = cboInfoSel.options[cboInfoSel.selectedIndex].text;

            cboInfoSel = document.getElementById('generic_uploader_' + tab_id + 'cbo_field_' + '9');
            var Field9 = cboInfoSel.options[cboInfoSel.selectedIndex].text;

            cboInfoSel = document.getElementById('generic_uploader_' + tab_id + 'cbo_field_' + '10');
            var Field10 = cboInfoSel.options[cboInfoSel.selectedIndex].text;

            cboInfoSel = document.getElementById('generic_uploader_' + tab_id + 'cbo_field_' + '11');
            var Field11 = cboInfoSel.options[cboInfoSel.selectedIndex].text;

            cboInfoSel = document.getElementById('generic_uploader_' + tab_id + 'cbo_field_' + '12');
            var Field12 = cboInfoSel.options[cboInfoSel.selectedIndex].text;

            var FirstLineOfDate = LineLength.options[LineLength.selectedIndex].value;
            msg = "Updating table....";
            alertify.success(msg);    
            progressmovebar();
            var urlMain = '/Services/WCFWebService.svc/GenericTableUpsert/?';
            var DataMain = 'FileName=' + FileName + '&InformationType=' + InformationType + '&Field1=' + Field1 + '&Field2=' + Field2 + '&Field3=' + Field3 + '&Field4=' + Field4 + '&Field5=' + Field5 + '&Field6=' + Field6 + '&Field7=' + Field7 + '&Field8=' + Field8 + '&Field9=' + Field9 + '&Field10=' + Field10 + '&FirstLineOfDate=' + FirstLineOfDate;
            var urlMain = urlMain + DataMain;
            var ResultData = ReturnDataFromService(urlMain);
            msg = "Table Updated";
            alertify.success(msg);            

        }

        //alert(field1);

    }
    catch (e) {
        HeaderDataErrorReport(e);        
    }
}
function TimerFctn(ms) {
    try{
        var start = new Date().getTime();
        var end = start;
        while (end < start + ms) {
            end = new Date().getTime();
        }
    }
    catch (e) {
        HeaderDataErrorReport(e);        
    }
}
function SetSpinnerAmount(process) {
    try {        
        displayProcess(process);
        msg = "Successfully updated spinner";
        alertify.success(msg);
    }
    catch (e) {
        HeaderDataErrorReport(e);
    }
}



function modal() {
    try{
    $('.modal').modal('show');
    
    TimerFctn(5000);
    $('.modal').modal('hide');
    //setTimeout(function () {
    //    //console.log('hejsan');
    //    $('.modal').modal('hide');
        //}, 5000);
    }
    catch (e) {
        HeaderDataErrorReport(e);
    }
}
function UpdateValidationData() {
    try {
        UploadFiles('ICECURVE');
        ImportGenericData();
        msg = "Successfully updated table";
        alertify.success(msg);
        progressmovebar();
    }
    catch (e) {
        HeaderDataErrorReport(e);
    }

}
function progressmovebar() {
    var elem = document.getElementById("progress");
    var width = 1;
    var id = setInterval(frame, 25);
    function frame() {
        if (width >= 100) {
            clearInterval(id);
        } else {
            width++;
            elem.style.width = width + '%';
        }
    }
}



function ShowModal() {
    try {
        $("#myModal").modal('show');                

    } catch (e) {        
        var msg = 'Failure in processing....'        
        alertify.error(msg);        

    }
}
function HideModal() {
    try {
        $("#myModal").modal('hide');
        return 1;
    } catch (e) {
        //HeaderDataErrorReport(e);
        var msg = 'Failure in processing....'
        alertify.error(msg);
        return 0;
    }
}
function ProcessIntervalData() {
    var i = 0    
    iPercent = 0;
    i = i + 10;
    
    //setTimeout(myFunction(i), 3000);
    //i = i + 10;
    //setTimeout(myFunction(i), 3000);
    //i = i + 10;
    //setTimeout(myFunction(i), 3000);
    //i = i + 10;
    //setTimeout(myFunction(i), 3000);
    //i = i + 10;
    //setTimeout(myFunction(i), 3000);
    //i = i + 10;
    //setTimeout(myFunction(i), 3000);
    //for (var i = 1; i <= 10; i++) {
        
    //    (function (i) {

    //        setTimeout(function () { myFunction(i)}, 1000);

    //    })(i);

    //}
   // alertify.prompt("Finalized");
    //var i = 0;
    //for (i = 0; i <= 100; i = i + 10) {        
    //    setTimeout(alertify.success(msg), 10000);        
    //}
}
async function DisplayModal() {
    //$('#ProgressLabel').InnerHTML('Progress at %");
    $('#myModal').modal('show');
}
async function HideModal() {
    $('#myModal').modal('hide');
}


async function delayedGreeting() {
    console.log("Hello");
    await sleep(2000);
    console.log("World!");
    await sleep(2000);
    console.log("Goodbye!");
}

function setDelay(i) {
    setTimeout(function () {
        displayProcess(i);
    }, 2000);
}


//var isMomHappy = true;

// Promise
function timeoutPromise(interval) {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            resolve("done");
        }, interval);
    }
    );
};

async function asyncCall() {
    $("#myModal").modal('show');
    const result = await resolveAfter20Seconds();
   // $("#myModal").modal('hide');
}
async function asyncCallHide() {
    $("#myModal").modal('hide');
    const result = await resolveAfter20Seconds();
    // $("#myModal").modal('hide');
}
async function ReturnGenericDataURL() {
    try {
        iStartRow = 1;
        iEndRow = 50;
        alertify.success("Processing");
        //var files = document.getElementById('files').files;        
        var FileName = FileNameUpload;//files[0].name;  // Change here so that the file is imported correctly with new data
        var FileTypeName = 'ACCOUNT';
        var ContainerName = 'vrd';
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
        RandomNumber = "GenDate_" + year + '-' + month + '-' + day + '-' + hr + '-' + mn + '-' + sec;
        var urlMain = '/Services/CurveUploader.svc/GenericFileUpsert?';
        var DataMain = 'FileName=' + FileName + '&FileTypeName=' + FileTypeName + '&ContainerName=' + ContainerName + '&RandomNumber=' + RandomNumber;
        var urlMain = urlMain + DataMain;
        

    } catch (e) {
        HeaderDataErrorReport(e);
        return "FAILURE";
    }
}

async function foo(urlMain) {
    try {
        var ResultData = ReturnDataFromService(urlMain); 
        return ResultData;
    }
    catch (e) {
        return 'Failure';
    }
}


async function ImportIntoValidationTable() {
    try {
        //var files = document.getElementById('files').files;        
        var FileName = FileNameForImport;//files[0].name;  // Change here so that the file is imported correctly with new data        
        //FileName = "IntervalDateTimeOnly_2020_5_25_15_31.csv";
        //displayProcess(0);
        if (FileName != 'N/A') {
            await DisplayModal();
            //await ReturnGenericDataURL;
            iStartRow = 1;
            iEndRow = 50;
            alertify.success("Processing");
            var FileTypeName = 'ACCOUNT';
            var ContainerName = 'vrd';
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
            RandomNumber = "GenDate_" + year + '-' + month + '-' + day + '-' + hr + '-' + mn + '-' + sec;
            var urlMain = '/Services/CurveUploader.svc/GenericFileUpsert?';
            var DataMain = 'FileName=' + FileName + '&FileTypeName=' + FileTypeName + '&ContainerName=' + ContainerName + '&RandomNumber=' + RandomNumber;
            urlMain = urlMain + DataMain;     
            //var ResultData = ReturnDataFromService(urlMain);       
            var msg = "Starting the import process";
            urlMain = '/Services/CurveUploader.svc/FileStatusGetInfo?';
            DataMain = 'FileName='+ FileName + '&FileType=' + FileTypeName;
            urlMain = urlMain + DataMain;     

            //var urlMain = 'http://vrddatafactory.southcentralus.azurecontainer.io:5000/api/data/'
            var urlMain = 'http://' + ReturnDataFromService("/Services/WCFWebService.svc/ReturnDockerURL") + '/api/data/';
            var DataMain = FileName + '/sh';
            var urlMain = urlMain + DataMain;
            var ResultData = ReturnDataFromService(urlMain);       

            //$('#ProgressLabel').text(msg);
            var FileStatus = "Processing";
            var PercentDone = 0;
            iWaits = 0;
            for (var i = 0; i <= 50; i++) {
                //const result = await resolveAfter20Seconds();
                urlMain = '/Services/CurveUploader.svc/FileStatusGetInfo?';
                DataMain = 'FileName=' + FileName + '&FileType=' + FileTypeName;
                urlMain = urlMain + DataMain;                     
                urlMain = '/Services/CurveUploader.svc/FileStatusGetInfo?';
                DataMain = 'FileName=' + FileName + '&FileType=' + FileTypeName;
                urlMain = urlMain + DataMain;
                ResultData = ReturnDataFromService(urlMain);
                PercentDone = ResultData.PercentDone;
                FileStatus = ResultData.FileStatus;
                if (i >= 5) {
                    if (FileStatus == 'FAIL') {
                        break;
                    }
                    if ((FileStatus = 'IMPG') && (PercentDone = 100)) {
                        if (iWaits >= 3) {
                            break;
                        }
                        iWaits++;
                    }
                    msg = "Percent complete " + PercentDone + "%";
                    $('#ProgressLabel').text(msg);
                }
            }            
            msg = "Successfully imported the file";
            if (FileStatus == 'FAIL') {
                msg = "The importing process failed.   Please review your file and try again";                
                alertify.error(msg);
            } else if ((FileStatus = 'IMPG') && (PercentDone = 100)) {                
                //const result1 = await resolveAfter20Seconds();
                //const result2 = await resolveAfter20Seconds();
                msg = "The process is " + PercentDone + "% complete";
                alertify.success(msg);
                // Proceed with refilling the table
                //await PullGenericDataBack();
                var iLimit = oTable.fnGetData().length;
                for (i = 1; i <= iLimit; i++) {
                    oTable.fnDeleteRow(0);
                }
                msg = 'Success';
                alertify.success(msg);
                msg = 'Returning Data...';
                alertify.success(msg);
                // Adding the data to the validation screen
                urlMain = '/Services/CurveUploader.svc/GenericFileGetInfo?';
                DataMain = 'FileName=' + FileName + '&FileTypeName=' + FileTypeName + '&ContainerName=' + ContainerName + '&RandomNumber=' + RandomNumber + '&RowNumber=50';
                urlMain = urlMain + DataMain;
                // Display Loading Screen                    
                var ResultData = ReturnDataFromService(urlMain);
                msg = ResultData[1].Field1;
                for (var iRows in ResultData) {
                    oTable.fnAddData([
                        ResultData[iRows].ValidateID,
                        ResultData[iRows].FileName,
                        ResultData[iRows].Field1.trim(),
                        ResultData[iRows].Field2.trim(),
                        ResultData[iRows].Field3.trim(),
                        ResultData[iRows].Field4.trim(),
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
                var table = document.getElementById("data-table");
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

            }
            await HideModal();
            
        } else {
            alertify.error("Please select a file");
        }
        msg = "Finalized";
        alertify.success(msg);
    } catch (e) {
        HeaderDataErrorReport(e);
    }

}

const promiseToDoSomething = () => {
    return new Promise(resolve => {
        setTimeout(() => resolve(ReturnStatus()), 500)
    })
}
function ReturnStatus() {
    urlMain = '/Services/CurveUploader.svc/FileStatusGetInfo?';
    DataMain = 'FileName=' + FileName + '&FileType=' + FileTypeName;
    urlMain = urlMain + DataMain;
    var ResultData = ReturnDataFromService(urlMain); 
}


function scaryClown() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('TEST');
        }, 2000);
    });
}

function retPromise() {
    return new Promise((resolve, reject) => resolve(ReturnDataFromServicePostStatus()));
}

async function putText() {
    let result = await retPromise();
    return result;
}


function ReturnDataFromServicePostStatus() {    
        var FileName = "IntervalDateTimeOnly_2020_5_25_15_31.csv";
        var FileTypeName = "ACCOUNT";
        var urlMain = '/Services/CurveUploader.svc/FileStatusGetInfo?';
        var DataMain = 'FileName=' + FileName + '&FileType=' + FileTypeName;
        urlMain = urlMain + DataMain;                     
        var ResultData = ReturnDataFromService(urlMain);
        return ReturnData;    
}
