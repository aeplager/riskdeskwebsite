function CreateFacilityTable() {
    try {
        var urlMain = '/WCFWebService.svc/FacilityAllGetInfo';
        var ResultData = ReturnDataFromService(urlMain);
        var j = 0;
        for (var i in ResultData) {
            j = j + 1;
        }
        $('#data-table').remove();
        $("#tableContainer").remove("#data-table");
        var mytable = $('<table></table>').attr({ id: "data-table", width: "100%", overflow: "scroll", class: "scrollTable table-hover" });
        var rows = j-2;
        var cols = 2;
        var tr = [];
        for (var i = 0; i <= rows; i++) {
            if (i == 0) {
                var tHead = $('<thead></thead>').attr({}).appendTo(mytable);
                var row = $('<tr></tr>').appendTo(tHead);
                $('<th></th>').text("Facility ID").appendTo(row);
                $('<th></th>').text("DUNS Number").appendTo(row);
                $('<th></th>').text("Customer Name").appendTo(row);
                $('<th></th>').text("Congestion Zone").appendTo(row);
                $('<th></th>').text("TDU").appendTo(row);
                $('<th></th>').text("Load Profile").appendTo(row);
                $('<th></th>').text("Loss Code").appendTo(row);
                //$('<th></th>').text("Broker Margin").appendTo(row);
            } else {
                if (i == 1) {
                    var tBody = $('<tbody></tbody>').appendTo(mytable);
                }
                for (var i in ResultData) {
                    var row = $('<tr></tr>').attr({ id: "fac_" + ResultData[i].FacilityID, class: "gradeA success" }).appendTo(tBody);
                    $('<td></td>').text(ResultData[i].FacilityID).appendTo(row);
                    $('<td></td>').text(ResultData[i].DunsNumber).appendTo(row);
                    $('<td></td>').text(ResultData[i].CustomerName).appendTo(row);
                    $('<td></td>').text(ResultData[i].CongestionZoneName).appendTo(row);
                    $('<td></td>').text(ResultData[i].TDUName).appendTo(row);
                    $('<td></td>').text(ResultData[i].LoadProfileName).appendTo(row);
                    $('<td></td>').text(ResultData[i].LossCodeName ).appendTo(row);
                    //$('<td></td>').text(ResultData[i].BrokerMargin).appendTo(row);
                }
            }
        }
        mytable.appendTo("#tableContainer");
        var oTable = $('#data-table').dataTable(
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
function FacilityCustomerInfoList_Change() {
    try {
        // Change the Facilities in the list based on the Customer ID        
        var Test = [];
        Facilities = [];
        var CustomerID = $('#CustomerInfoList_Facility').val();
        $('#FacilityAutoCompleteList_Facility').text('');
        $('#FacilityAutoCompleteList_Facility').val('');
        var urlMain = '/WCFWebService.svc/SpecificCustomerFacilitiesGetInfo';
        var DataUrl = '?CustomerID=' + CustomerID;
        urlMain = urlMain + DataUrl;
        var ResultData = ReturnDataFromService(urlMain);
        var j = 0;
        var iRow = -1;
        var SelectedItem = 'N/A';
        for (var i in ResultData) {
            var LoadProfileName;
            var FacilityID;
            //LoadProfileName = ResultData[i].LoadProfileName;
            FacilityID= ResultData[i].FacilityID;
            Facilities.push(FacilityID);
        }
        autocomplete(document.getElementById('FacilityAutoCompleteList_Facility'), Facilities);
        var input = document.getElementById("FacilityAutoCompleteList_Facility");
        input.addEventListener("keyup", function (event) {
            event.preventDefault();
            if ((event.keyCode === 13) || (event.keyCode === 9)) {
                Facility_Specific_Change();
            }
        });
        $("#FacilityAutoCompleteList_Facility").blur(function () {
            Facility_Specific_Change();
        });
        $("#FacilityAutoCompleteList_Facility").click(function () {
            Facility_Specific_Change();
        });
        //$("#FacilityAutoCompleteList_Facility").autocomplete({ source: Facilities })
        //$('#FacilityAutoCompleteList_Facility').autocomplete({
        //    source: Facilities
        //    //    focus: showLabel,
        //    //    select: showLabel,
        //    //    change: showLabel
        //})
    }
    catch (e) {
        HeaderDataErrorReport(e);
    }
}

function Facility_Specific_Change() {
    try {
        var ControlToSet = 'CustomerInfoList_Facility'
        var CustomerID = $('#' + ControlToSet).val();
        ControlToSet = 'FacilityAutoCompleteList_Facility'
        var FacilityID = $('#FacilityAutoCompleteList_Facility').val();        
        var urlMain = '/WCFWebService.svc/SpecificFacilityGetInfo';
        var dataurl = '?CustomerID=' + CustomerID + '&FacilityID=' + FacilityID;
        urlMain = urlMain + dataurl;
        var resultdata = ReturnDataFromService(urlMain);
        var j = 0;
        //$('#' + controltoset).empty();
        for (var i in resultdata) {
            var TDUID = resultdata[i].TDUID;
            var LoadProfile = resultdata[i].LoadProfileName;
            var LossCodeID = resultdata[i].LossCodeID;
            var BillingCycle = resultdata[i].BillingCycle;
            var CurrActive = resultdata[i].FacilityActive;
            var CongestionZoneID = resultdata[i].CongestionZoneID
            $('#TDUInfoList_Facility').val(TDUID);            
            TDUInfoList_Facility_Change();
            $('#LossCodeInfoList_Facility').val(LossCodeID);            
            $('#LoadProfileAutoCompleteList_Facility').val(LoadProfile);            
            $('#BillingCycle_Facility').val(BillingCycle);
            $("#Active_Facility").prop("checked", CurrActive)            
            $('#CongestionZoneInfoList_Facility').val(CongestionZoneID);
            //var CurrentDealActive = 1;
            //if ($('#Active_Deal').is(':checked') != true) { CurrentDealActive = 0; } 
        }
    }
    catch (e) {
        HeaderDataErrorReport(e);
    }
}
function TDUInfoList_Facility_Change() {
    try {
        var ControlToSet = 'TDUInfoList_Facility'
        TDUID = $('#' + ControlToSet).val();
        ControlToSet = 'LossCodeInfoList_Facility'
        $('#' + ControlToSet).empty();
        var urlMain = '/WCFWebService.svc/TDULossCodeAllGetInfo';
        var DataUrl = '?TDUID=' + TDUID;
        urlMain = urlMain + DataUrl;
        var ResultData = ReturnDataFromService(urlMain);
        var j = 0;
        $('#' + ControlToSet).empty();
        for (var i in ResultData) {
            var TDUID = ResultData[i].TDUID;
            var LossCodeID = ResultData[i].LossCodeID
            var LossCodeName = ResultData[i].LossCodeName
            var LossCode = ResultData[i].LossCode
            var CodeValue = LossCodeID;
            $('#' + ControlToSet).append('<option value="' + CodeValue + '">' + LossCodeName  + '</option>')
        }
    }
    catch (e) {
        HeaderDataErrorReport(e);
    }
}
function FacilityLoadProfileAuto_Reset(ControlToSet) {
    // Retrieves the list of cities and places them into the proper place
    try {
        // Empty the list box        
        //$('#' + ControlToSet).empty();
        // Set up the list call
        var Test = [];
        LoadProfiles = [];
        var urlMain = '/WCFWebService.svc/LoadProfileAllGetInfo';
        var ResultData = ReturnDataFromService(urlMain);
        var j = 0;
        var iRow = -1;
        var SelectedItem = 'N/A';
        for (var i in ResultData) {
            var LoadProfileName;
            var LoadProfileID;
            LoadProfileName = ResultData[i].LoadProfileName;
            LoadProfileID = ResultData[i].LoadProfileID;         
            LoadProfiles.push(LoadProfileName);
        }
        autocomplete(document.getElementById(ControlToSet), LoadProfiles);
    }
    catch (e) {
        HeaderDataErrorReport(e);
    }
}
function FacilityAuto_Reset(ControlToSet) {
    // Retrieves the list of cities and places them into the proper place
    try {
        // Empty the list box        
        //$('#' + ControlToSet).empty();
        // Set up the list call
        var Test = [];
        Facilities = [];
        var urlMain = '/WCFWebService.svc/LoadProfileAllGetInfo';
        var ResultData = ReturnDataFromService(urlMain);
        var j = 0;
        var iRow = -1;
        var SelectedItem = 'N/A';
        for (var i in ResultData) {
            var LoadProfileName;
            var LoadProfileID;
            LoadProfileName = ResultData[i].LoadProfileName;
            LoadProfileID = ResultData[i].LoadProfileID;
            LoadProfiles.push(LoadProfileName);
        }
        autocomplete(document.getElementById(ControlToSet), LoadProfiles);
    }
    catch (e) {
        HeaderDataErrorReport(e);
    }
}

function FacilityUpsert(NewOld) {
    var msg = "Please confirm that you want to save this record";
    if (NewOld == 'New') {
        msg = "Please confirm that you want to add a new record";
    }
    alertify.confirm(msg, function (e) {
        if (e) {
            if (NewOld == 'New') {
                msg = 'You have added a new record';
            } else {
                msg = 'You have saved this record';
            }
            alertify.success(msg);
            FacilityDataUpsert(NewOld);
        } else {
            alertify.error("Nothing completed");
        }
    });
}
function FacilityDataUpsert(NewOld) {
    try {
        // Select the customer and display the deals in the deals combo box
        //ReturnDataFromService
        //SpecificCustomerDealsGetInfo?CustomerID=
        var DealID = $('#DealInfoList_Deal').val();
        if (NewOld == 'New') {
            DealID = 0;
        }
        var CustomerID = $('#CustomerInfoList_Facility').val();
        var FacilityID = $('#FacilityAutoCompleteList_Facility').val();
        var TDUID = $('#TDUInfoList_Facility').val();
        var LossCodeID = $('#LossCodeInfoList_Facility').val();
        var LoadProfile = $('#LoadProfileAutoCompleteList_Facility').val();
        var BillingCycle = $('#BillingCycle_Facility').val();
        var CongestionZoneID = $('#CongestionZoneInfoList_Facility').val();

        var CurrentFacilityActive = 1;
        if ($('#Active_Facility').is(':checked') != true) { CurrentFacilityActive = 0; }
        var urlMain = '/WCFWebService.svc/FacilityUpsert';
        var DataUrl = '?CustomerID=' + CustomerID + '&FacilityID=' + FacilityID + '&LoadProfile=' + LoadProfile + '&CongestionZoneID=' + CongestionZoneID + '&TDUIID=' + TDUID + '&BillingCycle=' + BillingCycle + '&LossCode=' + LossCodeID + '&Active=' + CurrentFacilityActive;
        urlMain = urlMain + DataUrl;
        var ResultData = ReturnDataFromService(urlMain);
        var j = 0;
    }
    catch (e) {
        HeaderDataErrorReport(e);
    }
}
function DiplayFacilityValidation(FileName, ContainerName) {
    try {
        // Push File to Validation
        var urlMain = '/WCFWebService.svc/FacilityValidationUpsert';
        var DataUrl = '?FileName=' + FileName + '&ContainerName=' + ContainerName; 
        FileNameUpload = FileName; 
        urlMain = urlMain + DataUrl;
        var ResultInt = ReturnDataFromService(urlMain);
        // Display Validation
        var urlMain = '/WCFWebService.svc/FacilityValidateGetInfo';
        var ResultData = ReturnDataFromService(urlMain);
        var j = 0;
        for (var i in ResultData) {
            j = j + 1;
        }
        $('#data-tableUpload').remove();
        $("#tableContainerUpload").remove("#data-tableUpload");
        var mytable = $('<table></table>').attr({ id: "data-table", width: "100%", overflow: "scroll", class: "scrollTable table-hover" });
        var rows = 5;
        if (j < rows) { rows = j - 2; }
        if (rows <= 0) { rows = 1; }
        var cols = 2;
        var tr = [];
        for (var i = 0; i <= rows; i++) {
            if (i == 0) {
                var tHead = $('<thead></thead>').attr({}).appendTo(mytable);
                var row = $('<tr></tr>').appendTo(tHead);
                $('<th></th>').text("Customer Name").appendTo(row);
                $('<th></th>').attr({ class: "hidden-phone" }).text("FacilityID").appendTo(row);
                $('<th></th>').text("Congestion Zone Name").appendTo(row);
                $('<th></th>').text("TDU Name").appendTo(row);
                $('<th></th>').text("Load Profile Name ").appendTo(row);
                $('<th></th>').text("Loss Code Name ").appendTo(row);
                $('<th></th>').text("Billing Cycle").appendTo(row);
                //$('<th></th>').text("Facility Active").appendTo(row);
                $('<th></th>').text("New Facility").appendTo(row);

            } else {
                if (i == 1) {
                    var tBody = $('<tbody></tbody>').appendTo(mytable);
                }
                for (var i in ResultData) {
                    var row = $('<tr></tr>').attr({ id: "facl_" + ResultData[i].CustomerID + '_' +  ResultData[i].FacilityID, class: "gradeA success" }).appendTo(tBody);
                    $('<td></td>').text(ResultData[i].CustomerName).appendTo(row);
                    $('<td></td>').text(ResultData[i].FacilityID).appendTo(row);
                    $('<td></td>').text(ResultData[i].CongestionZoneName).appendTo(row);
                    $('<td></td>').text(ResultData[i].TDUName).appendTo(row);
                    $('<td></td>').text(ResultData[i].LoadProfileName).appendTo(row);
                    $('<td></td>').text(ResultData[i].LossCodeName).appendTo(row);
                    $('<td></td>').text(ResultData[i].BillingCycle).appendTo(row);
                    $('<td></td>').text(ResultData[i].NewFacility).appendTo(row);
                    //$('<td></td>').text(ResultData[i].FileName).appendTo(row);
                }
            }
        }
        mytable.appendTo("#tableContainerUpload");
        var oTable = $('#data-tableUpload').dataTable(
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
