//import { result } from "underscore";
function DealGenericAllInfoList_Initialize() {
    try {
        // Select the customer and display the deals in the deals combo box
        //ReturnDataFromService
        //SpecificCustomerDealsGetInfo?CustomerID=  
        $('#DealInfoList_Deal').empty();
        $('#Name_Deal').val('-Deal Name-');
        $('#Number_Deal').val('-Deal Number-');
        $('#Margin_Deal').val(0.00);
        $('#BrokerMargin_Deal').val(0.00);
        $('#DealStartDateMonth').val(1);
        SetDays('DealStartDateMonth', 'DealStartDateDay');
        $('#DealStartDateDay').val(1);
        $('#DealStartDateYear').val(0);
        $('#DealEndDateMonth').val(1);
        SetDays('DealEndDateMonth', 'DealEndDateDay')
        $('#DealEndDateDay').val(1);
        $('#DealEndDateYear').val(0);
        $('#DealInfoList_Deal').append('<option value="' + 0 + '">' + '-Deal-' + '</option>')
        var urlMain = '/Services/Deals.svc/DealsGenericAllGetInfo';
        //var CustomerID = $('#CustomerInfoList_Deal').val();
        //var DataUrl = '?CustomerID=' + CustomerID;
        //urlMain = urlMain + DataUrl;
        var ResultData = ReturnDataFromService(urlMain);
        var j = 0;
        for (var i in ResultData) {
            var DealName;
            var DealID;
            DealName = ResultData[i].DealName;
            DealID = ResultData[i].DealID
            $('#DealInfoList_Deal').append('<option value="' + DealID + '">' + DealName + '</option>')
        }
    }
    catch (e) {
        HeaderDataErrorReport(e);
    }
}
//function FillDropDown(selControl, StoredProc, FirstRec) {
//    try {
//        var urlMain = '/Services/WCFWebService.svc/WebSiteDropDownSelectorGetInfo';
//        var DataUrl = '?StoredProc=' + StoredProc;
//        // Clear the Drop Down
//        urlMain = urlMain + DataUrl;
//        $('#' + selControl).empty();
//        var SelectorID = 0 ;
//        var SelectorText = FirstRec;
//        var ResultData = ReturnDataFromService(urlMain);            
//        $('#' + selControl).append('<option value="' + SelectorID + '"> - ' + SelectorText + ' - </option>')
//        for (var i in ResultData) {
//            SelectorID = ResultData[i].SelectorID;
//            SelectorText = ResultData[i].SelectorText
//            $('#' + selControl).append('<option value="' + SelectorID + '">' + SelectorText + '</option>')
//        }
//    } catch (e) {
//        HeaderDataErrorReport(e);
//    }    
//}
function WholesaleDealUpsert(NewOld) {
    try {
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
                WholesaleDealDataUpsert(NewOld);
            } else {
                alertify.error("Nothing completed");
            }
        });
    } catch (e) {
        HeaderDataErrorReport(e);
    } 
}
function WholesaleDealDataUpsert(NewOld) {
    try {
        // Select the customer and display the deals in the deals combo box
        //ReturnDataFromService
        //SpecificCustomerDealsGetInfo?CustomerID=
        var WholeSaleDealId = $('#selWholeSaleDeal').val();
        if (NewOld == 'New') {
            WholeSaleDealId = 0;
        }
        // Start Date
        var TempMonth = $('#DealStartDateMonth').val()
        var TempDay = $('#DealStartDateDay option:selected').text()
        var TempYear = $('#DealStartDateYear option:selected').text()
        var StartDate = TempMonth.toString() + '/' + TempDay.toString() + '/' + TempYear.toString();
        // End Date
        var TempMonth = $('#DealEndDateMonth').val()
        var TempDay = $('#DealEndDateDay option:selected').text()
        var TempYear = $('#DealEndDateYear option:selected').text()
        var EndDate = TempMonth.toString() + '/' + TempDay.toString() + '/' + TempYear.toString();

        var WholeSaleDealName = $('#WholeSaleDealName').val()
        var WholeSaleCounterPartyID = $('#selWholeSaleCounterParty').val();
        var WholeSaleSecondCounterPartyID = $('#selWholeSaleSecondCounterParty').val();
        var SettlementPointID = $('#selSettlementPoint').val();
        var SettlementLocationID = $('#selSettlementLocation').val();
        var WholesaleBlockID = $('#selWholesaleBlock').val();
        var VolumeMW = $('#WholeSaleDealVolume').val();
        var Price = $('#WholeSaleDealPrice').val();        
        var CurrentDealActive = 1;
        if ($('#Active_Deal').is(':checked') != true) { CurrentDealActive = 0; }         
        var urlMain = '/Services/Deals.svc/WholeSaleDealUpsert';        
        var DataUrl = '?WholeSaleDealID=' + WholeSaleDealId + '&WholesaleDealName=' + WholeSaleDealName        
        DataUrl = DataUrl + '&CounterPartyID=' + WholeSaleCounterPartyID + '&SecondCounterPartyID=' + WholeSaleSecondCounterPartyID + '&SettlementPointID=' + SettlementPointID + '&SetLocationID=' + SettlementLocationID + '&WholeSaleBlockID=' + WholesaleBlockID + '&StartDate=' + StartDate + '&EndDate=' + EndDate + '&VolumeMW=' + VolumeMW + '&Price=' + Price + '&Active=' + CurrentDealActive 
        urlMain = urlMain + DataUrl;
        var ResultData = ReturnDataFromService(urlMain);
        if (ResultData.Status == "SUCCESS") {
            FillDropDown('selWholeSaleDeal', 'WholesaleDealBasicGetInfo', 'WholeSale Deal');
            $('#selWholeSaleDeal').val(ResultData.Identifier);                
            WholeSaleDealCustomerListChange();
            alertify.success("Successfully Updated");
        } else {
            FillDropDown('selWholeSaleDeal', 'WholesaleDealBasicGetInfo', 'WholeSale Deal');
            $('#selWholeSaleDeal').val(0);
            WholeSaleDealCustomerListChange();
            alertify.error("Update Failed");
        }

    }
    catch (e) {
        HeaderDataErrorReport(e);
    }
}
function WholeSaleDealCustomerListChange() {
    try {
        var WholeSaleDealId = $('#selWholeSaleDeal').val();
        $('#DealStartDateMonth').val(0);
        $('#WholeSaleDealName').val('');        
        $('#DealStartDateDay').val(0);
        $('#DealStartDateYear').val(0);
        $('#DealEndDateMonth').val(0);
        $('#DealEndDateDay').val(0);
        $('#DealEndDateYear').val(0);
        $('#WholeSaleDealName').val('');
        $('#selWholeSaleCounterParty').val(0);
        $('#selWholeSaleSecondCounterParty').val(0);
        $('#selSettlementPoint').val(0);
        $('#selSettlementLocation').val(0);
        $('#selWholesaleBlock').val(0);
        $('#WholeSaleDealVolume').val(0);
        $('#WholeSaleDealPrice').val(0);   
        if (WholeSaleDealId != 0) {
            var urlMain = '/Services/Deals.svc/WholeSaleDealGetInfo';
            var DataUrl = '?WholeSaleDealID=' + WholeSaleDealId
            urlMain = urlMain + DataUrl;
            var ResultData = ReturnDataFromService(urlMain);
            for (var i in ResultData) {
                var StartDate = new Date(parseInt(ResultData[i].StartDate.substr(6)))
                var EndDate = new Date(parseInt(ResultData[i].EndDate.substr(6)))                
                $('#DealStartDateMonth').val(StartDate.getMonth() + 1);
                SetDays('DealStartDateMonth', 'DealStartDateDay');
                $('#DealStartDateDay').val(StartDate.getDate());
                $('#DealStartDateYear').val(StartDate.getFullYear());
                $('#DealEndDateMonth').val(EndDate.getMonth() + 1);
                SetDays('DealEndDateMonth', 'DealEndDateDay');
                $('#DealEndDateDay').val(EndDate.getDate());
                $('#DealEndDateYear').val(EndDate.getFullYear());                
                $('#WholeSaleDealName').val(ResultData[i].WholesaleDealName);
                $('#selWholeSaleCounterParty').val(ResultData[i].CounterPartyID);
                $('#selWholeSaleSecondCounterParty').val(ResultData[i].SecondCounterPartyID);
                $('#selSettlementPoint').val(ResultData[i].SettlementPointID);
                $('#selSettlementLocation').val(ResultData[i].SettlementLocationID);
                $('#selWholesaleBlock').val(ResultData[i].WholesaleBlockID);
                $('#WholeSaleDealVolume').val(ResultData[i].VolumeMW);
                $('#WholeSaleDealPrice').val(ResultData[i].Price);
            }
        }

    }
    catch (e) {
        HeaderDataErrorReport(e);
    }
}
function RetailDealCustomerListChange() {
    try {
    // Select the customer and display the deals in the deals combo box
    RetailDealTermGetInfoRemoveAllRows();
    $('#selRetailDeal').empty();
    $('#Name_Deal').val('-Deal Name-');
    $('#Number_Deal').val('-Deal Number-');
    //$('#Margin_Deal').val(0.00);
    //$('#BrokerMargin_Deal').val(0.00);
    //$('#DealStartDateMonth').val(1);
    //SetDays('DealStartDateMonth', 'DealStartDateDay');
    //$('#DealStartDateDay').val(1);
    //$('#DealStartDateYear').val(0);
    //$('#DealEndDateMonth').val(1);
    //SetDays('DealEndDateMonth', 'DealEndDateDay')
    //$('#DealEndDateDay').val(1);
    //$('#DealEndDateYear').val(0);    
    $('#selRetailDeal').append('<option value="' + 0 + '">' + '-Deal-' + '</option>')
    var urlMain = '/Services/Deals.svc/RetailDealGetInfo';
    var CustomerID = $('#SelCustomer').val();        
    var DataUrl = '?CustomerID=' + CustomerID + '&RetailDealID=0';
    urlMain = urlMain + DataUrl;
    var ResultData = ReturnDataFromService(urlMain);    
    var j = 0;   
    for (var i in ResultData) {
        var DealName;
        var DealID;
        DealName = ResultData[i].RetailDealName;
        DealID = ResultData[i].RetailDealID
        $('#selRetailDeal').append('<option value="' + DealID + '">' + DealName + '</option>')
    }
    }
    catch (e) {
        HeaderDataErrorReport(e);
    }    
}



function RetailDealUpsert(NewOld) {
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
            RetailDealDataUpsert(NewOld);
        } else {                       
            alertify.error("Nothing completed");
        }
    });
}
function RetailDealDataUpsert(NewOld) {
    try {
        // Select the customer and display the deals in the deals combo box
        //ReturnDataFromService
        //SpecificCustomerDealsGetInfo?CustomerID=
        var RetailDealId = $('#DealInfoList_Deal').val();
        if (NewOld == 'New') {
            RetailDealId = 0;
        }

        var CustomerID = $('#SelCustomer').val();
        var DealNumber = $('#Number_Deal').val();
        var CurrentDealActive = 1;
        if ($('#Active_Deal').is(':checked') != true) { CurrentDealActive = 0; }         
        //Default Settings
        var StartDate = '1/1/1900'
        var EndDate = '1/1/1900'
        var RetailDealName = 0;
        var DealMargin = 0;
        var BrokerFee = 0;
        var RiskPremium = 0;  
        var urlMain = '/Services/Deals.svc/RetailDealUpsert';
        var DataUrl = '?RetailDealId=' + RetailDealId + '&RetailDealName=' + RetailDealName + '&CustomerID=' + CustomerID + '&Active=' + CurrentDealActive;
        urlMain = urlMain + DataUrl;
        var ResultData = ReturnDataFromService(urlMain);
        var j = 0;
        // Refill the Customer List
        DealCustomerInfoList_Change();
        // Set the list ID        
        $('#selRetailDeal').val(RetailDealId);
        RetailDealGetInfo();        
    }
    catch (e) {
        HeaderDataErrorReport(e);
    }
}
function RemoveRow() {
    try {
        var oTable = $('#data-table').DataTable();
        var lnRows = oTable.fnSettings().fnRecordsTotal();
        iCurrentRow = 0;
        //alertify.confirm(lnRows.toString());
        for (i = 0; i < lnRows; i++) {
            //alertify.confirm(i.toString());
            var oTable = $('#data-table').dataTable();
            var cn = oTable.fnGetData()[iCurrentRow];
            var chkbox = cn[6]
            var loc = chkbox.search("cb_");
            chkbox = chkbox.substring(loc, loc + 5);
            doublequotes = String.fromCharCode(34);
            chkbox = chkbox.replace(doublequotes, "");
            //alertify.alert(chkbox);
            var vl = $('#' + chkbox).prop('checked');
            //alertify.confirm(vl.toString());
            if (vl == true) {
                oTable.fnDeleteRow(iCurrentRow);
                //alertify.confirm(cn[0].toString());                
                var urlMain = '/Services/Deals.svc/RetailDealTermsDelete';
                var DataUrl = '?RetailDealTermsID=' + cn[0].toString();                
                urlMain = urlMain + DataUrl;
                var ResultData = ReturnDataFromService(urlMain);

            } else {
                iCurrentRow++;
            }
        }
    }
    catch (e) {
        HeaderDataErrorReport(e);
    }
}
function OpenModelScreen() {
    $("#myModal").modal();
}
function CancelModel() {
    $("#myModal").modal("hide");
}
function EditRow() {
    try {
        var oTable = $('#data-table').DataTable();
        var lnRows = oTable.fnSettings().fnRecordsTotal();
        iCurrentRow = 0;
        //alertify.confirm(lnRows.toString());
        for (i = 0; i < lnRows; i++) {
            //alertify.confirm(i.toString());
            var oTable = $('#data-table').dataTable();
            var cn = oTable.fnGetData()[iCurrentRow];
            var chkbox = cn[6]
            var loc = chkbox.search("cb_");
            chkbox = chkbox.substring(loc, loc + 5);
            doublequotes = String.fromCharCode(34);
            chkbox = chkbox.replace(doublequotes, "");
            //alertify.alert(chkbox);
            var vl = $('#' + chkbox).prop('checked');
            //alertify.confirm(vl.toString());
            if (vl == true) {
                //oTable.fnDeleteRow(iCurrentRow);
                //iCurrentRow = iCurrentRow - 1;
                var chkBox = '<input type="checkbox" id="cb_"' + lnRows.toString() + '" name="vehicle1" value="Bike">';
                var RetailDealTermsID = cn[0];
                var Term = cn[1];
                var TermDateString = cn[2];
                var BrokerFee = cn[3];
                var DealMargin = cn[4];
                var RiskPremium = cn[5];
                
                $('#Term_RetailDealID').val(1);        
                $('#Term_Date_Modal').val(TermDateString);
                $('#Term_Modal').val(Term);
                $('#Broker_Fee_Modal').val(BrokerFee);
                $('#Risk_Premium_Modal').val(RiskPremium);
                $('#Deal_Margin_Modal').val(DealMargin);
                $('#RetailDealTermsID_Modal').val(RetailDealTermsID);
                $("#myModal").modal("show");
                break
            }
            iCurrentRow++;
        }
    }
    catch (e) {
        HeaderDataErrorReport(e);
    }
}
function NewRow() {
    try {
        var oTable = $('#data-table').DataTable();
        var lnRows = oTable.fnSettings().fnRecordsTotal();
        var TermDate = new Date()
        var TermDateString = TermDate.toISOString().split("T")[0];
        $('#Term_RetailDealID').val(0);        
        $('#Term_Date_Modal').val(TermDateString);
        $('#Term_Modal').val("12");
        $('#Broker_Fee_Modal').val("0");
        $('#Risk_Premium_Modal').val("0");
        $('#Deal_Margin_Modal').val("0");
        $('#RetailDealTermsID_Modal').val(0);
        $("#myModal").modal("show");
    }
    catch (e) {
        HeaderDataErrorReport(e);
    }
}


function SaveDealToTable() {
    try {
        var TermDate = new Date()
        var TermDateString = TermDate.toISOString().split("T")[0];
        var RetailDealID = $('#selRetailDeal').val();        
        var TermDate = $('#Term_Date_Modal').val();
        var Term = $('#Term_Modal').val();
        var BrokerFee = $('#Broker_Fee_Modal').val();
        var RiskPremium = $('#Risk_Premium_Modal').val();
        var DealMargin = $('#Deal_Margin_Modal').val();
        var RetailDealTermsID = $('#RetailDealTermsID_Modal').val();
        var urlMain = '/Services/Deals.svc/RetailDealTermsUpsert';        
        var DataUrl = '?RetailDealTermsID=' + RetailDealTermsID
        DataUrl = DataUrl + '&RetailDealID=' + RetailDealID;
        DataUrl = DataUrl + '&Term=' + Term;
        DataUrl = DataUrl + '&TermDate=' + TermDate;
        DataUrl = DataUrl + '&BrokerFee=' + BrokerFee;
        DataUrl = DataUrl + '&DealMargin=' + DealMargin;
        DataUrl = DataUrl + '&RiskPremium=' + RiskPremium;        
        urlMain = urlMain + DataUrl;
        var ResultData = ReturnDataFromService(urlMain);    
        RetailDealGetInfo();
        $("#myModal").modal("hide");


    }
    catch (e) {
        HeaderDataErrorReport(e);
    }
}
function RetailDealTermInitializeTable() {
    try {
        $('#data-table').remove();
        $("#tableContainer").remove("#data-table");
        var mytable = $('<table id="TestTBl" ></table>').attr({ id: "data-table", width: "100%", overflow: "scroll", class: "scrollTable table-hover" });
        var tHead = $('<thead></thead>').attr({}).appendTo(mytable);
        var row = $('<tr></tr>').appendTo(tHead);
        //$('<th></th>').text("Retail Deal Name").appendTo(row);
        $('<th></th>').text("ID").appendTo(row);
        $('<th></th>').attr({ class: "hidden-phone" }).text("Term").appendTo(row);
        $('<th></th>').text("Term Date").appendTo(row);
        $('<th></th>').text("Broker Fee").appendTo(row);
        $('<th></th>').text("Deal Margin").appendTo(row);
        $('<th></th>').text("Risk Premium").appendTo(row);
        $('<th></th>').text("Selected").appendTo(row);
        
        var tBody = $('<tbody id="DealBody"></tbody>').appendTo(mytable);
        var row = $('<tr></tr>').attr({ id: "cust_" + 0, class: "gradeA success" }).appendTo(tBody);
        //$('<td></td>').text(ResultData[i].RetailDealName).appendTo(row);
        
        var TermDate = new Date()
        var TermDateString = TermDate.toISOString().split("T")[0];
        $('<td></td>').text(0).appendTo(row); // Retail Term ID
        $('<td></td>').text(0).appendTo(row); // Term
        $('<td></td>').text(TermDateString).appendTo(row); // Term Date
        $('<td></td>').text(0).appendTo(row); // Broker Fee
        $('<td></td>').text(0).appendTo(row); // Deal Margin
        //$('<td></td>').text(0).appendTo(row);
        $('<td></td>').text(0).appendTo(row);  // Risk Premium
        var chkBoxID = 'cb' + 0        
        var chkBox = '<input type="checkbox" id="' + chkBoxID + '" name="' + chkBoxID + '" value="0">';
        //$('<input />', { type: 'checkbox', id: 'cb' + 0, value: name }).appendTo(row); 
        $('<td></td>').html(chkBox).appendTo(row);
        
        mytable.appendTo("#tableContainer");
        oTable = $('#data-table').dataTable(
            {
                "sScrollY": "300px",
                "sScrollX": "100%",
                "sScrollXInner": "50%",
                "bScrollCollapse": true,
                "bPaginate": false,                  
                "bFilter": false                
            });
    } catch (e) {
        HeaderDataErrorReport(e);
    }
}

//DealCustomerInfoList_Change
function RetailDealTermGetInfoRemoveAllRows() { 
    try {
        var RetailDealID = $('#selRetailDeal').val();
        if (RetailDealID == null) { RetailDealID = 0; }
        var urlMain = '/Services/Deals.svc/RetailDealTermGetInfo';
        var DataUrl = '?RetailDealID=' + RetailDealID
        urlMain = urlMain + DataUrl;
        var ResultData = ReturnDataFromService(urlMain);
        var oTable = $('#data-table').DataTable();
        var lnRows = oTable.fnSettings().fnRecordsTotal();
        for (i = 0; i < lnRows; i++) {
            var oTable = $('#data-table').dataTable();
            oTable.fnDeleteRow(0);
        }
    
    } catch (e) {
    HeaderDataErrorReport(e);
}
}
function RetailDealTermGetInfoToTable() {
    try {

        var RetailDealID = $('#selRetailDeal').val();
        if (RetailDealID == null) { RetailDealID = 0; }
        var urlMain = '/Services/Deals.svc/RetailDealTermGetInfo';
        var CurrentActiveOnly= 1;
        if ($('#RetailDealsActiveOnly').is(':checked') != true) { CurrentActiveOnly = 0; }         
        var DataUrl = '?RetailDealID=' + RetailDealID + '&CurrentActive=' + CurrentActiveOnly;
        urlMain = urlMain + DataUrl;
        var ResultData = ReturnDataFromService(urlMain);
        var oTable = $('#data-table').DataTable();
        var lnRows = oTable.fnSettings().fnRecordsTotal();
        for (i = 0; i < lnRows; i++) {
            var oTable = $('#data-table').dataTable();
            oTable.fnDeleteRow(0); 
        }
        
        var iRow = 1;
        for (var i in ResultData) {
            chkBoxID = "cb_" + iRow;
            var chkBox = '<input type="checkbox" id="' + chkBoxID + '" name="vehicle1" value="Bike">';
            var arrInput = [];
            arrInput.push(ResultData[i].RetailDealTermsID);
            arrInput.push(ResultData[i].Term);
            var TermDate = new Date(parseInt(ResultData[i].TermDate.substr(6)))
            var TermDateString = TermDate.toISOString().split("T")[0];
            arrInput.push(TermDateString);
            arrInput.push(ResultData[i].BrokerFee);
            arrInput.push(ResultData[i].DealMargin);
            arrInput.push(ResultData[i].RiskPremium);
            arrInput.push(chkBox);
            $('#data-table').dataTable().fnAddData(arrInput);
            iRow = iRow + 1;
        }
        
    } catch (e) {
        HeaderDataErrorReport(e);
    }
}
function RetailDealTermGetInfoToTableOld() {
    try {
        var RetailDealID = $('#selRetailDeal').val();        
        if (RetailDealID == null) { RetailDealID = 0; }        
        var urlMain = '/Services/Deals.svc/RetailDealTermGetInfo';        
        var DataUrl = '?RetailDealID=' + RetailDealID
        urlMain = urlMain + DataUrl;
        var ResultData = ReturnDataFromService(urlMain);
        if (ResultData.length != 0) {                        
            $('#data-table').remove();
            $("#tableContainer").remove("#data-table");                 
            var mytable = $('<table id="TestTBl" ></table>').attr({ id: "data-table", width: "100%", overflow: "scroll", class: "scrollTable table-hover" });            
            var tHead = $('<thead></thead>').attr({}).appendTo(mytable);
            var row = $('<tr></tr>').appendTo(tHead);            
            //$('<th></th>').text("Retail Deal Name").appendTo(row);
            $('<th></th>').attr({ class: "hidden-phone" }).text("Term").appendTo(row);
            $('<th></th>').text("Term Date").appendTo(row);
            $('<th></th>').text("Broker Fee").appendTo(row);
            $('<th></th>').text("Deal Margin").appendTo(row);
            $('<th></th>').text("Risk Premium").appendTo(row);
            $('<th></th>').text("Selected").appendTo(row);
            var tBody = $('<tbody id="DealBody"></tbody>').appendTo(mytable);
            for (var i in ResultData) {
                var row = $('<tr></tr>').attr({ id: "cust_" + ResultData[i].RetailDealID, class: "gradeA success" }).appendTo(tBody);                                
                //$('<td></td>').text(ResultData[i].RetailDealName).appendTo(row);
                $('<td></td>').text(ResultData[i].Term).appendTo(row);
                var TermDate = new Date(parseInt(ResultData[i].TermDate.substr(6)))
                var TermDateString = TermDate .toISOString().split("T")[0];
                $('<td></td>').text(TermDateString).appendTo(row);
                $('<td></td>').text(ResultData[i].BrokerFee).appendTo(row);
                $('<td></td>').text(ResultData[i].DealMargin).appendTo(row);                
                $('<td></td>').text(ResultData[i].RiskPremium).appendTo(row);                
                $('<td></td>').text(ResultData[i].RiskPremium).appendTo(row);      
                $('<input />', { type: 'checkbox', id: 'cb' + ResultData[i].RetailDealID, value: name }).appendTo(row);
            }
            mytable.appendTo("#tableContainer");
            oTable = $('#data-table').dataTable(
                {
                    "sScrollY": "300px",
                    "sScrollX": "100%",
                    "sScrollXInner": "50%",
                    "bScrollCollapse": true,
                    "bPaginate": false,
                    "bFilter": false
                });
        } 
    }
    catch (e) {
        HeaderDataErrorReport(e);
    }
}
function RetailDealTermUpsert(TypeOfUpdate) {
    try {
        if (TypeOfUpdate == "New") {
            alertify.alert("New")
        } else if (TypeOfUpdate == "Edit") {
            alertify.alert("Edit")
        } else if (TypeOfUpdate == "Delete") {
            alertify.alert("Delete")
        }

        
    }
    catch (e) {
        HeaderDataErrorReport(e);
    }
}

function CreateDealTable() {
    try {
        var urlMain = '/Services/Deals.svc/DealsAllGetInfo';
        var ResultData = ReturnDataFromService(urlMain);
        var j = 0;
        for (var i in ResultData) {
            j = j + 1;
        }
        $('#data-table').remove();
        $("#tableContainer").remove("#data-table");
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
                $('<th></th>').text("Deal Id").appendTo(row);
                $('<th></th>').text("Customer Name").appendTo(row);
                $('<th></th>').text("Deal Name").appendTo(row);
                $('<th></th>').attr({ class: "hidden-phone" }).text("Deal Number").appendTo(row);
                $('<th></th>').text("Start Date").appendTo(row);
                $('<th></th>').text("End Date").appendTo(row);
                $('<th></th>').text("Margin").appendTo(row);
                $('<th></th>').text("Broker Margin").appendTo(row);

            } else {
                if (i == 1) {
                    var tBody = $('<tbody id="DealBody"></tbody>').appendTo(mytable);
                }
                for (var i in ResultData) {
                    var row = $('<tr></tr>').attr({ id: "cust_" + ResultData[i].DealID, class: "gradeA success" }).appendTo(tBody);
                    $('<td></td>').text(ResultData[i].DealID).appendTo(row);
                    $('<td></td>').text(ResultData[i].CustomerName).appendTo(row);
                    $('<td></td>').text(ResultData[i].DealName).appendTo(row);
                    $('<td></td>').text(ResultData[i].DealNumber).appendTo(row);
                    $('<td></td>').text(ResultData[i].StartDate).appendTo(row);
                    $('<td></td>').text(ResultData[i].EndDate).appendTo(row);
                    $('<td></td>').text(ResultData[i].Margin).appendTo(row);
                    $('<td></td>').text(ResultData[i].BrokerMargin).appendTo(row);
                }
            }
        }
        mytable.appendTo("#tableContainer");
        oTable = $('#data-table').dataTable(
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
function RetailDealSelect() {
    try {
        $("#RetailDealsActiveOnly").prop("checked", true);
        RetailDealTermGetInfoToTable();
    }
    catch (e) {
        HeaderDataErrorReport(e);
    }
}
function RetailDealGetInfo() {
    try {
        // Select the customer and display the deals in the deals combo box
        //ReturnDataFromService
        //SpecificCustomerDealsGetInfo?CustomerID=        
        var RetailDealID = $('#selRetailDeal').val();        
        // Start Date
        var urlMain = '/Services/Deals.svc/RetailDealGetInfo';
        //var DataUrl = '?CustomerID=' + CustomerID;
        CustomerID = 0;
        var DataUrl = '?CustomerID=' + CustomerID + '&RetailDealID=' + RetailDealID
        urlMain = urlMain + DataUrl;
        var ResultData = ReturnDataFromService(urlMain);
        var j = 0;
        if (ResultData.length == 1) {
            for (var i in ResultData) {
                var RetailDealName = ResultData[i].RetailDealName;
                var RetailDealID = ResultData[i].RetailDealID;
                var CustomerID = ResultData[i].CustomerID;
                var CustomerName = ResultData[i].CustomerName;
                var DealNumber = ResultData[i].DealNumber;
                $('#Name_Deal').val(RetailDealName);
                $('#Number_Deal').val(RetailDealID);
                $("#Active_Deal").prop("checked", true);
                if (ResultData[i].Active != true) {
                    $("#Active_Deal").prop("checked", false);
                }


            }        
            RetailDealTermGetInfoToTable();
        }
        else {
            $('#Name_Deal').val('-Deal Name-');
            $('#Number_Deal').val('-Deal Number-');
            $('#Margin_Deal').val(0.00);
            $('#BrokerMargin_Deal').val(0.00);
            $('#DealStartDateMonth').val(1);
            SetDays('DealStartDateMonth', 'DealStartDateDay');
            $('#DealStartDateDay').val(1);
            $('#DealStartDateYear').val(1);
            $('#DealEndDateMonth').val(1);
            SetDays('DealEndDateMonth', 'DealEndDateDay')
            $('#DealEndDateDay').val(1);
            $('#DealEndDateYear').val(1);
        }
    }
    catch (e) {
        HeaderDataErrorReport(e);
    }
}

function CreateGenericDealTable() {
    try {
        var urlMain = '/Services/Deals.svc/DealsGenericAllGetInfo';
        var ResultData = ReturnDataFromService(urlMain);
        var j = 0;
        for (var i in ResultData) {
            j = j + 1;
        }
        $('#data-table').remove();
        $("#tableContainer").remove("#data-table");
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
                $('<th></th>').text("Deal Id").appendTo(row);                
                $('<th></th>').text("Deal Name").appendTo(row);
                $('<th></th>').attr({ class: "hidden-phone" }).text("Deal Number").appendTo(row);
                $('<th></th>').text("Start Date").appendTo(row);
                $('<th></th>').text("End Date").appendTo(row);                
                $('<th></th>').text("Margin").appendTo(row);
                $('<th></th>').text("Broker Margin").appendTo(row); 
                $('<th></th>').text("Weight Provided").appendTo(row);
                $('<th></th>').text("TDU Name").appendTo(row); 
                $('<th></th>').text("Load Profile").appendTo(row);
                $('<th></th>').text("CongestionZone").appendTo(row);
                $('<th></th>').text("Loss Code").appendTo(row);                

            } else {
                if (i == 1) {
                    var tBody = $('<tbody></tbody>').appendTo(mytable);
                }
                for (var i in ResultData) {
                    var row = $('<tr></tr>').attr({ id: "cust_" + ResultData[i].DealID, class: "gradeA success" }).appendTo(tBody);
                    $('<td></td>').text(ResultData[i].DealID).appendTo(row);                    
                    $('<td></td>').text(ResultData[i].DealName).appendTo(row);
                    $('<td></td>').text(ResultData[i].DealNumber).appendTo(row);
                    $('<td></td>').text(ResultData[i].StartDate).appendTo(row);
                    $('<td></td>').text(ResultData[i].EndDate).appendTo(row);
                    $('<td></td>').text(ResultData[i].Margin).appendTo(row);
                    $('<td></td>').text(ResultData[i].BrokerMargin).appendTo(row);
                    $('<td></td>').text(ResultData[i].WeightProvided).appendTo(row);
                    $('<td></td>').text(ResultData[i].TDUName).appendTo(row);
                    $('<td></td>').text(ResultData[i].LoadProfileName).appendTo(row);
                    $('<td></td>').text(ResultData[i].CongestionZoneName).appendTo(row);
                    $('<td></td>').text(ResultData[i].LossCodeName).appendTo(row);                    
                }
            }
        }
        mytable.appendTo("#tableContainer");
        oTable = $('#data-table').dataTable(
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
function InitializeDealValidation() {
    try {
        var FileName = "2018_9_6_2_59_ExcelDealTabDelimineted.txt";        
        AzureParms = ObtainAzureParams("DEALINDIV");
        var ContainerName = AzureParms.AzureContainer;
        //alert(ContainerName);
        //var urlMain = '/Services/Deals.svc/DealsValidationUpsert';
        //var DataUrl = '?FileName=' + FileName + '&ContainerName=' + ContainerName;
        //urlMain = urlMain + DataUrl;
        //var ResultInt = ReturnDataFromService(urlMain);
        // Display Validation
        urlMain = '/Services/Deals.svc/DealsValidateGetInfo';

        var ResultData = ReturnDataFromService(urlMain);
        var j = 0;
        for (var i in ResultData) {
            j = j + 1;
        }
        $('#data-tableUpload').remove();
        $("#tableContainerUpload").remove("#data-tableUpload");
        var mytable = $('<table></table>').attr({ id: "data-tableUpload", width: "100%", overflow: "scroll", class: "scrollTable table-hover" });
        var rows = 5;
        if (j < rows) { rows = j - 2; }
        if (rows <= 0) { rows = 1; }
        var cols = 2;
        var tr = [];
        for (var i = 0; i <= rows; i++) {
            if (i == 0) {
                var tHead = $('<thead></thead>').attr({}).appendTo(mytable);
                var row = $('<tr></tr>').appendTo(tHead);
                $('<th></th>').text("Deal ID").appendTo(row);
                $('<th></th>').text("Customer Name").appendTo(row);
                $('<th></th>').attr({ class: "hidden-phone" }).text("Deal Number").appendTo(row);
                $('<th></th>').text("Deal Name").appendTo(row);
                $('<th></th>').text("Start Date").appendTo(row);
                $('<th></th>').text("End Date").appendTo(row);
                $('<th></th>').text("Margin").appendTo(row);
                $('<th></th>').text("Broker Margin").appendTo(row);
                $('<th></th>').text("Deal Active").appendTo(row);
                $('<th></th>').text("New Deal").appendTo(row);

            } else {
                if (i == 1) {
                    var tBody = $('<tbody></tbody>').appendTo(mytable);
                }
                for (var i in ResultData) {                    
                    var row = $('<tr></tr>').attr({ id: "Deal_" + ResultData[i].DealID, class: "gradeA success" }).appendTo(tBody);
                    $('<td></td>').text(ResultData[i].DealID).appendTo(row);
                    $('<td></td>').text(ResultData[i].CustomerName).appendTo(row);
                    $('<td></td>').text(ResultData[i].DealName).appendTo(row);
                    $('<td></td>').text(ResultData[i].DealNumber).appendTo(row);
                    $('<td></td>').text(ResultData[i].StartDate).appendTo(row);
                    $('<td></td>').text(ResultData[i].EndDate).appendTo(row);
                    $('<td></td>').text(ResultData[i].Margin).appendTo(row);
                    $('<td></td>').text(ResultData[i].BrokerMargin).appendTo(row);
                    $('<td></td>').text(ResultData[i].NewDeal).appendTo(row);
                    $('<td></td>').text(ResultData[i].FileName).appendTo(row);
                }
            }
        }
        mytable.appendTo("#tableContainerUpload");
        myValidation = $('#data-tableUpload').DataTable(
            {
                "sScrollY": "300px",
                "sScrollX": "100%",
                "sScrollXInner": "150%",
                "bScrollCollapse": true,
                "bPaginate": false,
                "bFilter": false
            });
        DealIndividualClearValidation();
    }
    catch (e) {
        HeaderDataErrorReport(e);
    }
}
function DealIndividualClearValidation() {
    try {
    var iLimit = myValidation.fnGetData().length;
    for (i = 1; i <= iLimit; i++) {
        myValidation.fnDeleteRow(0);
        }
    }
    catch (e) {
        HeaderDataErrorReport(e);
    }
}
function DiplayDealValidation(FileName, ContainerName) {
    try {
        // Push File to Validation
        var urlMain = '/Services/Deals.svc/DealsValidationUpsert';
        var DataUrl = '?FileName=' + FileName + '&ContainerName=' + ContainerName;
        urlMain = urlMain + DataUrl;
        var ResultData = ReturnDataFromService(urlMain);
        // Display Validation
        urlMain = '/Services/Deals.svc/DealsValidateGetInfo';        
        ResultData = ReturnDataFromService(urlMain);
        var iLimit = oTable.fnGetData().length;
        for (i = 1; i <= iLimit; i++) {
            myValidation.fnDeleteRow(0);
        }
        for (var i in ResultData) {
            myValidation.fnAddData([
            ResultData[i].DealID,
            ResultData[i].CustomerName,
            ResultData[i].DealName,
            ResultData[i].DealNumber,
            ResultData[i].StartDate,
            ResultData[i].EndDate,
            ResultData[i].Margin,
            ResultData[i].BrokerMargin,
            ResultData[i].NewDeal,
            ResultData[i].FileName
            ]);
        }           
    }
    catch (e) {
        HeaderDataErrorReport(e);
    }
}
function TDUInfoList_Deals_Change(ControlToSet, ControlToControl) {
    try {
        //var ControlToSet = 'TDUInfoList_Facility'
        TDUID = $('#' + ControlToSet).val();
        //ControlToSet = 'LossCodeInfoList_Facility'
        $('#' + ControlToControl).empty();
        var urlMain = '/Services/WCFWebService.svc/TDULossCodeAllGetInfo';
        var DataUrl = '?TDUID=' + TDUID;
        urlMain = urlMain + DataUrl;
        var ResultData = ReturnDataFromService(urlMain);
        var j = 0;
        //$('#' + ControlToSet).empty();
        for (var i in ResultData) {
            var TDUID = ResultData[i].TDUID;
            var LossCodeID = ResultData[i].LossCodeID
            var LossCodeName = ResultData[i].LossCodeName
            var LossCode = ResultData[i].LossCode
            var CodeValue = LossCodeID;
            $('#' + ControlToControl).append('<option value="' + CodeValue + '">' + LossCodeName + '</option>')
        }
    }
    catch (e) {
        HeaderDataErrorReport(e);
    }
}
function DealGenericSelect_Deal() {
    try {
        var DealID = $('#DealInfoList_Deal').val();
        var urlMain = '/Services/Deals.svc/DealGenericAllGetInfo';
        var DataUrl = '?DealID=' + DealID;
        urlMain = urlMain + DataUrl;
        var ResultData = ReturnDataFromService(urlMain);
        var j = 0;
        //$('#' + ControlToSet).empty();
        for (var i in ResultData) {
            var DealName = ResultData[i].DealName;
            var DealNumber = ResultData[i].DealNumber;
            var CongestionZoneID = ResultData[i].CongestionZoneID;
            var LoadProfileID = ResultData[i].LoadProfileID;
            var LoadProfileName = ResultData[i].LoadProfileName;
            var TDUID = ResultData[i].TDUID;            
            var LossCodeID = ResultData[i].LossCodeID
            var LossCodeName = ResultData[i].LossCodeName;
            var StartDate = new Date(ResultData[i].StartDate);
            var EndDate = new Date(ResultData[i].EndDate);
            var Margin = ResultData[i].Margin;
            var BrokerMargin = ResultData[i].BrokerMargin;
            var WeightProvided = ResultData[i].WeightProvided;
            $('#TDU_Deal').val(TDUID);
            TDUInfoList_Deals_Change('TDU_Deal', 'LossCode_Deal');
            $('#Name_Deal').val(DealName);
            $('#Number_Deal').val(DealNumber);
            $('#Margin_Deal').val(Margin);
            $('#BrokerMargin_Deal').val(BrokerMargin);
            $('#DealStartDateMonth').val(StartDate.getMonth() + 1);
            SetDays('DealStartDateMonth', 'DealStartDateDay');
            $('#DealStartDateDay option:selected').text(StartDate.getDate());
            $('#DealStartDateYear').val(StartDate.getFullYear());
            $('#DealEndDateMonth').val(EndDate.getMonth() + 1);
            SetDays('DealEndDateMonth', 'DealEndDateDay')
            $('#DealEndDateDay option:selected').text(EndDate.getDate());
            $('#DealEndDateYear').val(EndDate.getFullYear());
            $('#WeightProvided_Deal').val(WeightProvided);
            $('#LoadProfileAutoCompleteList_Facility').val(LoadProfileName );
            $('#CongestionZoneList_Deal').val(CongestionZoneID);                
            $('#LossCode_Deal').val(LossCodeID);                                    
        }
    }
    catch (e) {
        HeaderDataErrorReport(e);
    }
}
function DealGenericUpsert(NewOld) {
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
            DealGenericUpsert_Deal(NewOld);
            // Reset the Generic Data Table
            DealGenericClearAndRefillTable();
        } else {
            alertify.error("Nothing completed");
        }
    });
}
function DealGenericUpsert_Deal(NewOld) {
    try {
        var DealID = $('#DealInfoList_Deal').val();        
        if (NewOld == 'New') { DealID = 0; }  
        var DealName = $('#Name_Deal').val();
        
        var DealNumber = $('#Number_Deal').val();
        var CongestionZoneID = $('#CongestionZoneList_Deal').val();      
        //alert(CongestionZoneID);
        var LoadProfileName = $('#LoadProfileAutoCompleteList_Facility').val();
        var TDUID = $('#TDU_Deal').val();
        var LossCode = $('#LossCode_Deal').val()
        var Margin = $('#Margin_Deal').val();
        var BrokerMargin = $('#BrokerMargin_Deal').val();
        var WeightProvided = $('#WeightProvided_Deal').val()
        var CurrentDealActive = 1;
        if ($('#Active_Deal').is(':checked') != true) { CurrentDealActive = 0; }         
        // Start Date
        var TempMonth = $('#DealStartDateMonth').val()
        var TempDay = $('#DealStartDateDay option:selected').text()
        var TempYear = $('#DealStartDateYear option:selected').text()
        var StartDate = TempMonth.toString() + '/' + TempDay.toString() + '/' + TempYear.toString();
        // End Date
        var TempMonth = $('#DealEndDateMonth').val()
        var TempDay = $('#DealEndDateDay option:selected').text()
        var TempYear = $('#DealEndDateYear option:selected').text()
        var EndDate = TempMonth.toString() + '/' + TempDay.toString() + '/' + TempYear.toString();
        // Send the Data
        var urlMain = '/Services/Deals.svc/DealGenericUpsert';        
        var DataUrl = '?DealID=' + DealID + '&DealNumber=' + DealNumber + '&DealName=' + DealName + '&StartDate=' + StartDate + '&EndDate=' + EndDate + '&Margin=' + Margin + '&BrokerMargin=' + BrokerMargin + '&Active=' + CurrentDealActive + '&WeightProvided=' + WeightProvided + '&CongestionZoneID=' + CongestionZoneID + '&LoadProfileName=' + LoadProfileName + '&TDUID=' + TDUID + '&LossCode=' + LossCode;
        //alert(DataUrl);
        //?DealID={DealID}&DealNumber={DealNumber}&DealName={DealName}&StartDate={StartDate}&EndDate={EndDate}&Margin={Margin}&BrokerMargin={BrokerMargin}&Active={Active}&WeightProvided={WeightProvided}&CongestionZoneID={CongestionZoneID}&LoadProfileName={LoadProfileName}&TDUID={TDUID}&LossCode={LossCode}
        urlMain = urlMain + DataUrl;
        //alert(DataUrl);
        //alert(urlMain);
        var ResultData = ReturnDataFromService(urlMain);
        DealGenericAllInfoList_Initialize();

    }
    catch (e) {
        HeaderDataErrorReport(e);
    } 
}
function DealIndividualClearAndRefillTable() {
    try {
        var urlMain = '/Services/Deals.svc/DealsAllGetInfo';
        var ResultData = ReturnDataFromService(urlMain);
        var j = 0;
        for (var i in ResultData) {
            j = j + 1;
        }
        var iLimit = oTable.fnGetData().length;
        for (i = 1; i <= iLimit; i++) {
            oTable.fnDeleteRow(0);
        }
        for (var i in ResultData) {
            oTable.fnAddData([
                ResultData[i].DealID,
                ResultData[i].CustomerName,
                ResultData[i].DealName,
                ResultData[i].DealNumber,
                ResultData[i].StartDate,
                ResultData[i].EndDate,
                ResultData[i].Margin,
                ResultData[i].BrokerMargin
            ]);
        }        
    }
    catch (e) {
        HeaderDataErrorReport(e);
    } 
}
function DealGenericClearAndRefillTable() {
    try {
        var urlMain = '/Services/Deals.svc/DealsGenericAllGetInfo';
        var ResultData = ReturnDataFromService(urlMain);
        var j = 0;
        for (var i in ResultData) {
            j = j + 1;
        }
        var iLimit = oTable.fnGetData().length;
        for (i = 1; i <= iLimit; i++) {
            oTable.fnDeleteRow(0);
        }
        for (var i in ResultData) {
            oTable.fnAddData([
            ResultData[i].DealID,
            ResultData[i].DealName,
            ResultData[i].DealNumber,
            ResultData[i].StartDate,
            ResultData[i].EndDate,
            ResultData[i].Margin,
            ResultData[i].BrokerMargin,
            ResultData[i].WeightProvided,
            ResultData[i].TDUName,
            ResultData[i].LoadProfileName,
            ResultData[i].CongestionZoneName,
            ResultData[i].LossCodeName
            ]);
        }
    }
    catch (e) {
        HeaderDataErrorReport(e);
    }
}