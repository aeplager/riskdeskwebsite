function CreateBaseTable() {
    try {
        var FileName = 'N/A';
        var FileTypeName = 'ACCOUNT';
        var ContainerName = 'riskaccounts';
        var urlMain = '/Services/WCFWebService.svc/GenericFileGetInfo?';
        var DataMain = 'FileName=' + FileName + '&FileTypeName=' + FileTypeName + '&ContainerName=' + ContainerName + '&RowNumber=0';
        var urlMain = urlMain + DataMain;
        // Fix to read the docker container
        var urlMain = 'http://vrddatafactory.southcentralus.azurecontainer.io:5000/api/basedata'
        //urlMain = 'http://localhost:32773/api/data/'
        //urlMain = "http://localhost:32779/api/data/"
        //var DataMain = 'BaseRecord.csv/sh'
        //var urlMain = urlMain + DataMain;        
        //var url2 = 'http://vrddatafactory.southcentralus.azurecontainer.io:5000/api/runid_status/ddf01546-1718-11eb-823d-0a580af49a61'
        //var ResultData = ReturnDataFromService(url2);       
        //alertify.success(ResultData);
        //url2 = url2 = 'http://vrddatafactory.southcentralus.azurecontainer.io:5000/api/runid_status/be8ffbe2-191d-11eb-b8de-0242ac110002'
        //ResultData = ReturnDataFromService(url2);
        //alertify.success(ResultData);

        var ResultData = ReturnDataFromService(urlMain);       
        
        var j = 0;
        for (var i in ResultData) {
            j = j + 1;
        }
        $('#data-table').remove();
        $("#tableContainer").remove("#data-table");
        
        //$('#data-tableUpload').remove();
        //$("#tableContainerUpload").remove("#data-table");
        var innerOptionHTML = ReturnStringForFieldsCombo('N/A');
        var totalHTML;
        var mytable = $('<table></table>').attr({ id: "data-table", width: "100%", overflow: "scroll", class: "scrollTable table-hover" });
        var rows = 5;
        if (j <= rows) { rows = j - 1; }
        if (rows <= 1) { rows = 1; }
        var cols = 2;
        var tr = [];        
        for (var i = 0; i <= rows; i++) {
            if (i == 0) {
                var tHead = $('<thead></thead>').attr({}).appendTo(mytable);
                var row = $('<tr></tr>').appendTo(tHead);
                //$('<th></th>').text("FileID").appendTo(row);                
                //$('<th></th>').text("ValidationID").appendTo(row);
                //$('<th></th>').text("FileName").appendTo(row);
                $('<th></th>').html("<select id=\"cboField1\"" + ">" + innerOptionHTML + "</select>").appendTo(row);
                $('<th></th>').html("<select id=\"cboField2\"" + ">" + innerOptionHTML + "</select>").appendTo(row);
                $('<th></th>').html("<select id=\"cboField3\"" + ">" + innerOptionHTML + "</select>").appendTo(row);
                $('<th></th>').html("<select id=\"cboField4\"" + ">" + innerOptionHTML + "</select>").appendTo(row);
                $('<th></th>').html("<select id=\"cboField5\"" + ">" + innerOptionHTML + "</select>").appendTo(row);
                $('<th></th>').html("<select id=\"cboField6\"" + ">" + innerOptionHTML + "</select>").appendTo(row);
                $('<th></th>').html("<select id=\"cboField7\"" + ">" + innerOptionHTML + "</select>").appendTo(row);
                $('<th></th>').html("<select id=\"cboField8\"" + ">" + innerOptionHTML + "</select>").appendTo(row);
                $('<th></th>').html("<select id=\"cboField9\"" + ">" + innerOptionHTML + "</select>").appendTo(row);
                $('<th></th>').html("<select id=\"cboField10\"" + ">" + innerOptionHTML + "</select>").appendTo(row);                

            } else {
                if (i == 1) {                    
                    var tBody = $('<tbody></tbody>').appendTo(mytable);
                }
                for (var iRows in ResultData) {                    
                    var row = $('<tr></tr>').attr({ id: "gen_" + ResultData[iRows].ValidateID, class: "gradeA success" }).appendTo(tBody);                    
                    //$('<td></td>').text(ResultData[iRows].ValidateID).appendTo(row);
                    //$('<td></td>').text(ResultData[iRows].FileName).appendTo(row);
                    $('<td contenteditable="true"></td>').text(ResultData[iRows].Field1).appendTo(row);
                    $('<td contenteditable="true"></td>').text(ResultData[iRows].Field2).appendTo(row);
                    $('<td contenteditable="true"></td>').text(ResultData[iRows].Field3).appendTo(row);
                    $('<td contenteditable="true"></td>').text(ResultData[iRows].Field4).appendTo(row);
                    $('<td contenteditable="true"></td>').text(ResultData[iRows].Field5).appendTo(row);
                    $('<td></td>').text(ResultData[iRows].Field6).appendTo(row);
                    $('<td></td>').text(ResultData[iRows].Field7).appendTo(row);
                    $('<td></td>').text(ResultData[iRows].Field8).appendTo(row);
                    $('<td></td>').text(ResultData[iRows].Field9).appendTo(row);
                    $('<td></td>').text(ResultData[iRows].Field10).appendTo(row);                    
                }
            }
        }        
        mytable.appendTo("#tableContainer");
        oTable = $('#data-table').dataTable(
            {
                "sScrollY": "300px",
                "sScrollX": "100%",
                "sScrollXInner": "150%",
                "paging": true,                
                "ordering": true,
                //"info": false  
                "bScrollCollapse": true,
                "bPaginate": false,
                "bFilter": false
            });
    }
    catch (e) {
        HeaderDataErrorReport(e);
    }
}

function ChangePrevGenericTable() {
    try {
        // Reset the process uploader        
        GenericClearValidation();
        var msg = 'Processing....'
        alertify.success(msg);
        if (iStartRow > 50) {
            iStartRow = iStartRow - 50;
            if (iStartRow <= 0) { iStartRow = 1; }
            iEndRow = iEndRow - 50;
            if (iEndRow <= 50) { iEndRow = 50; }
        }
        msg = 'Starting at row ' + iStartRow + ' to row ' + iEndRow;
        //alertify.success(msg);
        //var files = document.getElementById('files').files;
        var FileName = FileNameForImport;//files[0].name;
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
        RandomNumber = "GenDate_" + year + '-' + month + '-' + day + '-' + hr + '-' + mn + '-' + sec;
        //var urlMain = '/Services/WCFWebService.svc/GenericValidationByRowsGetInfo?';
        //var DataMain = 'FileName=' + FileName + '&FileTypeName=' + FileTypeName + '&ContainerName=' + ContainerName + '&iStartRow=' + iStartRow + '&iEndRow=' + iEndRow;
        //var urlMain = urlMain + DataMain;
        // Display Loading Screen        
        //var ResultData = ReturnDataFromServiceAsync(urlMain);
        //var ResultData = ReturnDataFromService(urlMain);
        //var msg = 'Validation was sent for processing....'
        //if (ResultData = 4) {
        msg = 'Success';
        //alertify.success(msg);
        msg = 'Returning Data...';
        ///alertify.success(msg);
        // Adding the data to the validation screen
        var urlMain = '/Services/WCFWebService.svc/GenericValidationByRowsGetInfo?';
        var DataMain = 'FileName=' + FileName + '&FileTypeName=' + FileTypeName + '&ContainerName=' + ContainerName + '&iStartRow=' + iStartRow + '&iEndRow=' + iEndRow;
        urlMain = urlMain + DataMain;
        // Display Loading Screen                    
        var urlMain = 'http://vrddatafactory.southcentralus.azurecontainer.io:5000/api/data/'
        //urlMain = 'http://localhost:32773/api/data/'
        var DataMain = 'vwFacilityUpdateAddingNew3_2020_5_31_21_40.csv/sh'
        var urlMain = urlMain + DataMain;
        //let ResultData = await ReturnDataFromServicePOST(urlMain);
        var ResultData = ReturnDataFromServicePOST(urlMain);

        //var ResultData = ReturnDataFromService(urlMain);
        //msg = ResultData[1].Field1;
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
        //table.column(2)
        //    .data()
        //    .sort();
        msg = 'Successfully Updated';
        alertify.success(msg);
        //}
    }
    catch (e) {
        HeaderDataErrorReport(e);
    }
}
function ChangeNextGenericTable() {
    try {
        // Reset the process uploader        
        GenericClearValidation();
        var msg = 'Processing....'
        //alertify.success(msg);
        iStartRow = iStartRow + 50;
        iEndRow = iEndRow + 50;
        msg = 'Starting at row ' + iStartRow + ' to row ' + iEndRow;
        //alertify.success(msg);
        //var files = document.getElementById('files').files;
        var FileName = FileNameForImport;//files[0].name;
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
        RandomNumber = "GenDate_" + year + '-' + month + '-' + day + '-' + hr + '-' + mn + '-' + sec;
        //var urlMain = '/Services/WCFWebService.svc/GenericValidationByRowsGetInfo?';
        //var DataMain = 'FileName=' + FileName + '&FileTypeName=' + FileTypeName + '&ContainerName=' + ContainerName + '&iStartRow=' + iStartRow + '&iEndRow=' + iEndRow;
        //var urlMain = urlMain + DataMain;
        //// Display Loading Screen        
        ////var ResultData = ReturnDataFromServiceAsync(urlMain);
        //var ResultData = ReturnDataFromService(urlMain);
        //var msg = 'Validation was sent for processing....'
        //if (ResultData = 4) {
        msg = 'Success';
        //alertify.success(msg);
        msg = 'Returning Data...';
        //alertify.success(msg);
        // Adding the data to the validation screen
        var urlMain = '/Services/WCFWebService.svc/GenericValidationByRowsGetInfo?';
        var DataMain = 'FileName=' + FileName + '&FileTypeName=' + FileTypeName + '&ContainerName=' + ContainerName + '&iStartRow=' + iStartRow + '&iEndRow=' + iEndRow;
        urlMain = urlMain + DataMain;
        // Display Loading Screen                    
        //var ResultData = ReturnDataFromService(urlMain);

        var urlMain = 'http://vrddatafactory.southcentralus.azurecontainer.io:5000/api/data/'
        //urlMain = 'http://localhost:32773/api/data/'
        var DataMain = 'vwFacilityUpdateAddingNew3_2020_5_31_21_40.csv/sh'
        var urlMain = urlMain + DataMain;
        //let ResultData = await ReturnDataFromServicePOST(urlMain);
        var ResultData = ReturnDataFromServicePOST(urlMain);

        //msg = ResultData[1].Field1;
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
        msg = 'Successfully Updated';
        alertify.success(msg);
        //}
    }
    catch (e) {
        HeaderDataErrorReport(e);
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
                DataMain = DataMain + "&Field11=" + "N/A";
                DataMain = DataMain + "&Field12=" + "N/A";
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

function ResetComboBoxesToRightText() {
    try {
        var cboInfoSel = document.getElementById('FileTypeSel');
        var InformationType = 'N/A';
        if (cboInfoSel.options[cboInfoSel.selectedIndex].value != "0") { InformationType = cboInfoSel.options[cboInfoSel.selectedIndex].text; }
        var urlMain = '/Services/WCFWebService.svc/GenericValidationFieldsGetInfo?';
        var DataMain = 'InformationType=' + InformationType
        var urlMain = urlMain + DataMain;
        var ResultData = ReturnDataFromService(urlMain);
        $('#cboField1').empty();
        $('#cboField2').empty();
        $('#cboField3').empty();
        $('#cboField4').empty();
        $('#cboField5').empty();
        $('#cboField6').empty();
        $('#cboField7').empty();
        $('#cboField8').empty();
        $('#cboField9').empty();
        $('#cboField10').empty();
        var j = 0;
        for (var i in ResultData) {
            j = j + 1;
        }
        //var x = document.getElementById(SelectID);
        for (var iRow in ResultData) {
            $('#cboField1').append(new Option(ResultData[iRow].InformationFields, ResultData[iRow].InformationFieldsID));
            $('#cboField2').append(new Option(ResultData[iRow].InformationFields, ResultData[iRow].InformationFieldsID));
            $('#cboField3').append(new Option(ResultData[iRow].InformationFields, ResultData[iRow].InformationFieldsID));
            $('#cboField4').append(new Option(ResultData[iRow].InformationFields, ResultData[iRow].InformationFieldsID));
            $('#cboField5').append(new Option(ResultData[iRow].InformationFields, ResultData[iRow].InformationFieldsID));
            $('#cboField6').append(new Option(ResultData[iRow].InformationFields, ResultData[iRow].InformationFieldsID));
            $('#cboField7').append(new Option(ResultData[iRow].InformationFields, ResultData[iRow].InformationFieldsID));
            $('#cboField8').append(new Option(ResultData[iRow].InformationFields, ResultData[iRow].InformationFieldsID));
            $('#cboField9').append(new Option(ResultData[iRow].InformationFields, ResultData[iRow].InformationFieldsID));
            $('#cboField10').append(new Option(ResultData[iRow].InformationFields, ResultData[iRow].InformationFieldsID));
        }
        var theText = "";
        var iField = "";
        $('#CustomerSelectorDiv').hide();
        if (InformationType == "Monthly Usage") {
            theText = "Utility Account Number";
            iField = 1
            $("#cboField" + iField).find("option:contains(" + theText + ")").attr('selected', 'selected');
            theText = "Start Date";
            iField = 2
            $("#cboField" + iField).find("option:contains(" + theText + ")").attr('selected', 'selected');
            theText = "End Date";
            iField = 3
            $("#cboField" + iField).find("option:contains(" + theText + ")").attr('selected', 'selected');
            theText = "UsageData";
            iField = 4
            $("#cboField" + iField).find("option:contains(" + theText + ")").attr('selected', 'selected');
        } else if (InformationType == "Interval Data with Date And Hour") {
            theText = "Utility Account Number";
            iField = 1
            $("#cboField" + iField).find("option:contains(" + theText + ")").attr('selected', 'selected');
            theText = "Date of Usage";
            iField = 2
            $("#cboField" + iField).find("option:contains(" + theText + ")").attr('selected', 'selected');
            theText = "Hour Of Usage";
            iField = 3
            $("#cboField" + iField).find("option:contains(" + theText + ")").attr('selected', 'selected');
            theText = "UsageData";
            iField = 4
            $("#cboField" + iField).find("option:contains(" + theText + ")").attr('selected', 'selected');
        } else if (InformationType == "Interval Data with DateTime") {
            theText = "Utility Account Number";
            iField = 1
            $("#cboField" + iField).find("option:contains(" + theText + ")").attr('selected', 'selected');
            theText = "Date and Time of Usage";
            iField = 2
            $("#cboField" + iField).find("option:contains(" + theText + ")").attr('selected', 'selected');
            theText = "UsageData";
            iField = 3
            $("#cboField" + iField).find("option:contains(" + theText + ")").attr('selected', 'selected');
        } else if (InformationType == "Facility") {
            FillCustomerName();
            theText = "Utility Account Number";
            iField = 1
            $("#cboField" + iField).find("option:contains(" + theText + ")").attr('selected', 'selected');
            theText = "Service Address 1";
            iField = 2
            $("#cboField" + iField).find("option:contains(" + theText + ")").attr('selected', 'selected');
            theText = "Load Profile";
            iField = 3
            $("#cboField" + iField).find("option:contains(" + theText + ")").attr('selected', 'selected');
            theText = "CongestionZone";
            iField = 4
            $("#cboField" + iField).find("option:contains(" + theText + ")").attr('selected', 'selected');
            theText = "TDU";
            iField = 5
            $("#cboField" + iField).val(42).change();
            theText = "Bill Cycle";
            iField = 6
            $("#cboField" + iField).find("option:contains(" + theText + ")").attr('selected', 'selected');
            theText = "Loss Code Name";
            iField = 7
            $("#cboField" + iField).find("option:contains(" + theText + ")").attr('selected', 'selected');
            theText = "Weather Station";
            iField = 8
            $("#cboField" + iField).find("option:contains(" + theText + ")").attr('selected', 'selected');
            theText = "TDU Tariff ID";
            iField = 9
            $("#cboField" + iField).find("option:contains(" + theText + ")").attr('selected', 'selected');
            theText = "CustomerName";
            iField = 10
            $("#cboField" + iField).find("option:contains(" + theText + ")").attr('selected', 'selected');
        }
        return 1;

    }
    catch (e) {
        HeaderDataErrorReport(e);
        return "ERROR";
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
async function set_run_checker(run_id) {
    try {
        var x = 1;
        $("#DataFactoryProcessing").text("Starting to check");
        var refreshId = setInterval(function () {
            var x = 1;
            var limiter = 3000
            var colorfnt = 'black';
            if (x <= limiter ) {
                //alert(run_id);
                $("#DataFactoryProcessing").text('Checking...');
                var urlMain = 'http://vrddatafactory.southcentralus.azurecontainer.io:5000/api/runid_status/'
                var DataMain = run_id
                urlMain = urlMain + DataMain;
                var ResultData = ReturnDataFromService(urlMain);                                 
                $("#DataFactoryProcessing").text(ResultData.run_status)
                $("#DataFactoryProcessing").css("color", colorfnt);
                if (colorfnt == 'red') {
                    colorfnt = 'black';
                } else {
                    colorfnt = 'black';
                }
                x = x + 1;
                if (ResultData.run_status == "Succeeded") {
                    x = limiter;
                    clearInterval(refreshId);
                }                
            }
        }, 15000);
    } catch (e) {
        HeaderDataErrorReport(e);
    }
}
function UpdateImportStatus(Msg) {
    $("#DataFactoryProcessing").text("Beginning processing...")
    return "SUCCESS"
}
function ImportIntoValidationTableNew() {
    try {
        var FileName = FileNameForImport;
        var sheet_name = "Sheet1";
        sts = UpdateImportStatus("Beginning processing...")
        sheet_name = deterimine_sheet_name(FileName);
        var urlMain = 'http://vrddatafactory.southcentralus.azurecontainer.io:5000/api/datafactor_data/'
        var DataMain = FileName + '/' + sheet_name + '/100';
        urlMain = urlMain + DataMain;
        var ResultData = ReturnDataFromService(urlMain);
        var iLimit = oTable.fnGetData().length;
        for (i = 1; i <= iLimit; i++) {
            oTable.fnDeleteRow(0);
        }
        if (ResultData.length > 0) {            
            set_run_checker(ResultData[0].run_id);
            for (var iRows in ResultData) {
                oTable.fnAddData([
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
                ]);
            }
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

    } catch (e) {
        $("#DataFactoryProcessing").text("Error in processing...")
        HeaderDataErrorReport(e)

    }
}
async function GenericValidatedDataUpsert() {
    try {
        displayProcess(0);
        await DisplayModal();
        if (FileNameForImport != "N/A") {
            var FileNameTXT = FileNameForImport;
            var FileName = FileNameForImport;// files[0].name;
            var FileTypeName = 'ACCOUNT';
            var ContainerName = 'riskaccounts';
            var InformationType = $("#FileTypeSel :selected").val();
            var FirstRowOfData = $("#LineLength :selected").val();
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
            var FirstLineOfDate = LineLength.options[LineLength.selectedIndex].value;
            var msg = 'Failure in processing....'
            //GenericValidatedDataUpsert?FileName={FileName}&InformationType={InformationType}&FirstRowOfData={FirstRowOfData}&Field1={Field1}&Field2={Field2}&Field3={Field3}&Field4={Field4}&Field5={Field5}&Field6={Field6}&Field7={Field7}&Field8={Field8}&Field9={Field9}&Field10={Field10}&Field11={Field11}&Field12={Field12}",
            var xmlInput = '';
            var urlMain = '/Services/CurveUploader.svc/GenericValidatedDataUpsert?';
            var DataMain = '';
            for (var iRow = 1; iRow <= 10; iRow++) {
                if (xmlInput == '') {
                    xmlInput = '<Row><ID>' + iRow + '</ID><NM>' + $("#cboField" + iRow).find('option:selected').text() + '</NM></Row>';
                } else {
                    xmlInput = xmlInput + '<Row><ID>' + iRow + '</ID><NM>' + $("#cboField" + iRow).find('option:selected').text() + '</NM></Row>';
                }
            }
            // Add Customer ID If Sending Facility Information
            if (InformationType == 2) {
                xmlInput = xmlInput + '<Row><CustomerID>' + $("#cboCustomerSelector").find('option:selected').val() + '</CustomerID><CustomerName>' + $("#cboCustomerSelector").find('option:selected').text() + '</CustomerName></Row>';
            }
            DataMain = "FileName=" + FileName + "&InformationType=" + InformationType + "&Field1=" + xmlInput
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

            var iLimit = oTable.fnGetData().length;
            for (i = 1; i <= iLimit; i++) {
                oTable.fnDeleteRow(0);
            }

            msg = "Sent for processing";
            alertify.success(msg);
        } else {
            msg = "Please select a file before importing the file";
            alertify.error(msg);
        }
        await HideModal();

    }
    catch (e) {
        //HeaderDataErrorReport(e);
        var msg = 'Failure in processing....'
        alertify.error(msg);

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
    var urlMain = 'http://vrddatafactory.southcentralus.azurecontainer.io:5000/api/data/'
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
            var urlMain = 'http://vrddatafactory.southcentralus.azurecontainer.io:5000/api/datafactor_data/'
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
        oTableMatch = $('#data-tableMatch').dataTable(
            {
                "sScrollY": "300px",
                "sScrollX": "100%",
                "sScrollXInner": "150%",
                "bScrollCollapse": true,
                "bPaginate": false,
                "bFilter": false
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

function FillCustomerName() {
    try {        
        $('#CustomerSelectorDiv').show();
        var urlMain = '/Services/CurveUploader.svc/CustomerNameGetInfo';                
        var ResultData = ReturnDataFromService(urlMain);
        var cboCustomerSelector = "#cboCustomerSelector";
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
                var cboInfoSel = document.getElementById('cboField1');
                var Field1 = cboInfoSel.options[cboInfoSel.selectedIndex].text;

                cboInfoSel = document.getElementById('cboField2');
                var Field2 = cboInfoSel.options[cboInfoSel.selectedIndex].text;

                cboInfoSel = document.getElementById('cboField3');
                var Field3 = cboInfoSel.options[cboInfoSel.selectedIndex].text;

                cboInfoSel = document.getElementById('cboField4');
                var Field4 = cboInfoSel.options[cboInfoSel.selectedIndex].text;

                cboInfoSel = document.getElementById('cboField5');
                var Field5 = cboInfoSel.options[cboInfoSel.selectedIndex].text;

                cboInfoSel = document.getElementById('cboField6');
                var Field6 = cboInfoSel.options[cboInfoSel.selectedIndex].text;

                cboInfoSel = document.getElementById('cboField7');
                var Field7 = cboInfoSel.options[cboInfoSel.selectedIndex].text;

                cboInfoSel = document.getElementById('cboField8');
                var Field8 = cboInfoSel.options[cboInfoSel.selectedIndex].text;

                cboInfoSel = document.getElementById('cboField9');
                var Field9 = cboInfoSel.options[cboInfoSel.selectedIndex].text;

                cboInfoSel = document.getElementById('cboField10');
                var Field10 = cboInfoSel.options[cboInfoSel.selectedIndex].text;

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
            
            var cboInfoSel = document.getElementById('cboField1');
            var Field1 = cboInfoSel.options[cboInfoSel.selectedIndex].text;

            cboInfoSel = document.getElementById('cboField2');
            var Field2 = cboInfoSel.options[cboInfoSel.selectedIndex].text;

            cboInfoSel = document.getElementById('cboField3');
            var Field3 = cboInfoSel.options[cboInfoSel.selectedIndex].text;

            cboInfoSel = document.getElementById('cboField4');
            var Field4 = cboInfoSel.options[cboInfoSel.selectedIndex].text;

            cboInfoSel = document.getElementById('cboField5');
            var Field5 = cboInfoSel.options[cboInfoSel.selectedIndex].text;

            cboInfoSel = document.getElementById('cboField6');
            var Field6 = cboInfoSel.options[cboInfoSel.selectedIndex].text;

            cboInfoSel = document.getElementById('cboField7');
            var Field7 = cboInfoSel.options[cboInfoSel.selectedIndex].text;

            cboInfoSel = document.getElementById('cboField8');
            var Field8 = cboInfoSel.options[cboInfoSel.selectedIndex].text;

            cboInfoSel = document.getElementById('cboField9');
            var Field9 = cboInfoSel.options[cboInfoSel.selectedIndex].text;

            cboInfoSel = document.getElementById('cboField10');
            var Field10 = cboInfoSel.options[cboInfoSel.selectedIndex].text;

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

function resolveAfter20Seconds() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('resolved');
        }, 2000);
    } ) ;
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

            var urlMain = 'http://vrddatafactory.southcentralus.azurecontainer.io:5000/api/data/'

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
            resolve('SHIT');
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
function BtnUploadFile() {
    try {
        document.getElementById("files").click();
    } catch (e) {
        HeaderDataErrorReport(e);
    }
}