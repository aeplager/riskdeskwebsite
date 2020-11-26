function SetUpRetailDealEntryScreen() {
    try {
        var intSuccess = 0;
        // Setting up Customer Drop Down
        var urlMain = '/Services/WCFWebService.svc/CustomersAllSelectorGetInfo';
        var ControlToSet = "selRDE_Customer";
        var InitialWord = "Customer"
        intSuccess = WDE_FillSelectGeneral(ControlToSet, urlMain, InitialWord);
        // Setting up Broker Drop Down
        var urlMain = '/Services/WCFWebService.svc/AllBrokersGetInfo';
        var ControlToSet = "selRDE_BrokerName";
        var InitialWord = "Broker"
        intSuccess = WDE_FillSelectGeneral(ControlToSet, urlMain, InitialWord);
        var urlMain = '/Services/WCFWebService.svc/RetailDealGetInfo';
        var ControlToSet = "selRDE_Deal";
        var InitialWord = "Deal"
        intSuccess = RDE_DealFillSelectGeneral(ControlToSet, urlMain, InitialWord);
        var rowCount = $('#RDE_DealPartsTable tr').length;
        //alertify.success(rowCount);       
        for (iRow = 1; iRow < rowCount; iRow++) {
            $('#RDE_DealPartsTable tbody tr:last-child').remove();
        }   
        var d = new Date();
        var TermDate = FormatDateForInput(d);
        RDE_AddDealTermsRow(rowCount, TermDate, 0, 0, 0, 0);
    } catch (e) {
        alertify.error(e);
    }
}
function RDE_DealFillSelectGeneral(ControlToSet, urlMain, InitialWord) {
    try {
        var ResultData = ReturnDataFromService(urlMain);
        $('#' + ControlToSet).find('option').remove().end();
        var $dropdown = $("#" + ControlToSet);
        InitialWord = " - " + InitialWord + " - ";
        $dropdown.append($("<option />").val("-1").text(InitialWord));
        $.each(ResultData, function () {
            $dropdown.append($("<option />").val(this.RetailDealID).text(this.RetailDealName));
        });
        return 1;
    } catch (e) {
        alertify.error(e);
        return 0;
    }
}
function RDE_DealSelect() {
    try {
        var ControlToSet = "selRDE_Deal";
        var DealID = $('#' + ControlToSet).val();
        RetailDealSelect(DealID);        
    }
    catch (e) {
        alertify.error(e);
    }
}
function RetailDealNew() {
    try {
        var RetailDealID = -1;
        var ControlToSet = "selRDE_Deal";
        $('#' + ControlToSet).val(RetailDealID);
        RetailDealSelect(RetailDealID);
    } catch (e) {
        alertify.error(e);
    }
}
function RetailDealSelect(DealID) {
    try {
        if (DealID > 0) {
            var ControlToSet = "selRDE_Deal";
            //var DealID = $('#' + ControlToSet).val();
            var urlMain = '/Services/WCFWebService.svc/RetailDealGetInfo/?';
            var DataInput = 'sDealID=' + DealID;
            urlMain = urlMain + DataInput;
            var ResultData = ReturnDataFromService(urlMain);
            var DealName
            var BrokerID = 0;
            var CustomerID = 0;
            var StartDate = new Date();
            var DealDate = new Date();
            var CommittmentDate = new Date();
            var Committment = 0;
            ResultData.forEach(function (row) {
                $('#RDE_DealName').val(row.RetailDealName);
                if (row.CustomerID > 0) { $('#selRDE_Customer').val(row.CustomerID); }
                    else { $('#selRDE_Customer').val(-1); }
                if (row.BrokerID > 0 ) { $('#selRDE_BrokerName').val(row.BrokerID); } 
                    else { $('#selRDE_BrokerName').val(-1); }

                var StartDateText = row.StartDate.replace(" 12:00:00 AM", "");
                document.getElementById("RDE_StartDate").value = FormatDateForInput(row.StartDateString);
                document.getElementById("RDE_DealDate").value = FormatDateForInput(row.DealDateString);
                //alertify.success("Deal Committed:  " + row.DealCommitted);
                if (row.DealCommitted == "0") { $('#RDE_Committed').val("No"); }
                else { $('#RDE_Committed').val("Committed on:  " + row.DealCommittmentDateString); }
                RDE_RefreshDealTerms(row.RetailDealID);
            });
        } else {
            $('#RDE_DealName').val("");
            $('#selRDE_Customer').val(-1);
            $('#selRDE_BrokerName').val(-1);
            var CurrentDate = new Date();
            var CurrentDateString = formatDate(CurrentDate);
            document.getElementById("RDE_StartDate").value = FormatDateForInput(CurrentDateString);
            document.getElementById("RDE_DealDate").value = FormatDateForInput(CurrentDateString);
            $('#RDE_Committed').val("No");
            // Remove all records
            RDE_RefreshDealTerms(0);
            // Add 1 Records
            RDE_Btn_AddDealTermsRow();
        }

    } catch (e) {
        alertify.error(e);
    }
}
function RDE_NewDeal() {
    try {

    } catch (e) {
        alertify.error(e);
    }
}
function RDE_RefreshDealTerms(DealID) {
    try {
        // Clear the Table
        var rowCount = $('#RDE_DealPartsTable tr').length;
        //alertify.success(rowCount);
        for (iRow = 1; iRow <= rowCount; iRow++) {
            $('#RDE_DealPartsTable tbody tr:last-child').remove();
        }   
        // Obtain the Results
        var ControlToSet = 'selRDE_Deal';
        var DealID = $('#' + ControlToSet).val();
        var urlMain = '/Services/WCFWebService.svc/RetailDealTermsGetInfo/?';
        var DataInput = 'sDealID=' + DealID;
        urlMain = urlMain + DataInput;
        var ResultData = ReturnDataFromService(urlMain);
        // Add Rows
        var iRow = 1;
        ResultData.forEach(function (row) {
            var TermDate = new Date(row.TermDateString);
            var TermDateString = FormatDateForInput(TermDate);
            
            RDE_AddDealTermsRow(iRow, TermDateString, row.Term, row.BrokerFee, row.DealMargin, row.RiskPremium);
            iRow++;
        }); 

    } catch (e) {
        alertify.error(e);
    }
}
function RDE_AddDealTermsRow(iRow, TermDate, Term, BrokerFee, DealMargin, RiskPremium) {
    try {        
        var DoubleQuotes = String.fromCharCode(34);
        var RDE_TermDate = '<input type=' + DoubleQuotes + 'date' + DoubleQuotes + ' id="RDE_TermDate_' + iRow + DoubleQuotes + ' class=' + DoubleQuotes + 'WDE_DateField' + DoubleQuotes + ' value=' + DoubleQuotes + TermDate + DoubleQuotes + ' />'
        var RDE_Term = '<input type=' + DoubleQuotes + 'text' + DoubleQuotes + ' class=' + DoubleQuotes + 'form-control RDE_TableTextBox' + DoubleQuotes + ' id=' + DoubleQuotes + 'RDE_Term_' + iRow + DoubleQuotes + ' value=' + DoubleQuotes + Term + DoubleQuotes + ' />'
        var RDE_BrokerFee = '<input type=' + DoubleQuotes + 'text' + DoubleQuotes + ' class=' + DoubleQuotes + 'form-control RDE_TableTextBox' + DoubleQuotes + ' id=' + DoubleQuotes + 'RDE_BrokerFee_' + iRow + DoubleQuotes + ' value=' + DoubleQuotes + BrokerFee + DoubleQuotes + ' />';
        var RDE_DealMargin = '<input type=' + DoubleQuotes + 'text' + DoubleQuotes + ' class=' + DoubleQuotes + 'form-control RDE_TableTextBox' + DoubleQuotes + ' id=' + DoubleQuotes + 'RDE_DealMargin_' + iRow + DoubleQuotes + ' value=' + DoubleQuotes + DealMargin + DoubleQuotes + ' />';
        var RDE_RiskPremium = '<input type=' + DoubleQuotes + 'text' + DoubleQuotes + ' class=' + DoubleQuotes + 'form-control RDE_TableTextBox' + DoubleQuotes + ' id=' + DoubleQuotes + 'RDE_RiskPremium_' + iRow + DoubleQuotes + ' value=' + DoubleQuotes + RiskPremium + DoubleQuotes + ' />';
        var RDE_Select = '<input type=' + DoubleQuotes + 'checkbox' + DoubleQuotes + ' class=' + DoubleQuotes + 'checkbox RDE_CheckBox' + DoubleQuotes + ' id=' + DoubleQuotes + 'RDE_CheckBox_' + iRow + DoubleQuotes + ' />';
        var td1 = '<td>' + RDE_TermDate + '</td>';
        var td2 = '<td>' + RDE_Term + '</td>';
        var td3 = '<td>' + RDE_BrokerFee + '</td>';
        var td4 = '<td>' + RDE_DealMargin + '</td>';
        var td5 = '<td>' + RDE_RiskPremium + '</td>';
        var tdSelect = '<td>' + RDE_Select + '</td>';   
        var tdEnd = '<td hidden>' + iRow + '</td>';   
        var tr = '<tr>' + td1 + td2 + td3 + td4 + td5 + tdSelect + tdEnd + '</tr>';
        $('#RDE_DealPartsTable').append(tr);         
    } catch (e) {
        alertify.error(e);
    }
}
function RDE_Btn_AddDealTermsRow() {
    try {
        var rowCount = $('#RDE_DealPartsTable tr').length;
        if (rowCount == null) {
            rowCount = 1;
        } else {
            rowCount + 1;
        }
        var d = new Date();
        var TermDate = FormatDateForInput(d);
        RDE_AddDealTermsRow(rowCount, TermDate, 0, 0, 0, 0);
    } catch (e) {
        alertify.error(e);
    }
}
function RDE_Bth_DeleteRows() {
    try {
        var rowCount = $('#RDE_DealPartsTable tr').length;
        var iRow = 1;
        var ControlToSet = "";
        var iRowCount=1;
        for (iRow = 1; iRow <= rowCount; iRow++) {
            if ($('#RDE_CheckBox_' + iRow).prop('checked') == true) {
                $('#RDE_DealPartsTable').find('tr:eq(' + iRowCount + ')').remove();//removing Row3
                iRowCount = iRowCount - 1;
            }            
            iRowCount++;
        }
        
    } catch (e) {
        alertify.error(e);
    }
}

function RDE_Btn_UpdateDeal(Committed) {
    try {                
        if ($('#RDE_Committed').val() != "No") {
            alertify.error("This deal is already commited.   No changes are permitted.");
            return;
        }
        var Msg = 'Are you sure you want to save the deal';
        if (Committed == 1) { Msg = 'Are you absolutely sure you want to commit the deal.   Please realize once this deal is committed, updates to the deal will not be allowed.'; }        
        if (Committed == -1) { Msg = 'Are you absolutely sure you want to delete the deal.   For your reference, deals are only deactivated and not deleted.'; }        
        //if (CommitDeal == 1) { Msg = 'Are you sure you want to commit the deal' }
        alertify.confirm(Msg, function () {           
            Msg = 'Deal Updated';
            if (Committed == 1) { Msg = "Deal committed";}
            // Establish all parameters            
            //var RetailDealID = 0;
            //var RetailDealName = 'N/A';  
            //var CustomerID = 0; 
            //var BrokerID = 0;
            var StartDate = '1/1/1900'; 
            //var DealDate = '1/1/1900'; 
            var DealCommitted = 0; 
            var DealCommittmentDate = '1/1/1900'; 
            var Notes = 'N/A';  
            // Establish the XML if exists
            var TermRecords = '';             
            var StatusOfRecordID = 0;
            // Setting the values
            var ControlToSet = "selRDE_Deal";
            var RetailDealID = $('#' + ControlToSet).val();
            if (RetailDealID <= 0) { RetailDealID = 0; }
            var RetailDealIdToSet = RetailDealID;
            ControlToSet = "RDE_DealName";
            var RetailDealName  = $('#' + ControlToSet).val();
            ControlToSet = "RDE_DealDate";
            var DealDate = $('#' + ControlToSet).val();
            ControlToSet = "selRDE_Customer";
            var CustomerID = $('#' + ControlToSet).val();
            ControlToSet = "selRDE_BrokerName";
            var BrokerID = $('#' + ControlToSet).val();
            ControlToSet = "RDE_StartDate";
            StartDate = $('#' + ControlToSet).val();
            var rowCount = $('#RDE_DealPartsTable tr').length;
            var iRow = 1;
            var ControlToSet = "";
            //var iRowCount = 1;         
            for (iRow = 1; iRow < rowCount; iRow++) {
                var TermRecord = '<Row>';
                var table = document.getElementById('RDE_DealPartsTable');
                var RetailDealIDTXT = table.rows[iRow].cells[6].innerHTML;
                //alertify.success("Value = " + RetailDealIDTXT.toString());
                var SelectRow = RetailDealIDTXT;
                ControlToSet = "RDE_TermDate_" + SelectRow;
                var TR = '<TR>' + $('#' + ControlToSet).val() + '</TR>'; // Term in Months
                ControlToSet = "RDE_Term_" + SelectRow ;
                var TD = '<TD>' + $('#' + ControlToSet).val() + '</TD>'; // Term in Months
                ControlToSet = "RDE_BrokerFee_" + SelectRow ;
                var BR = '<BR>' + $('#' + ControlToSet).val() + '</BR>'; // Term in Months
                ControlToSet = "RDE_DealMargin_" + SelectRow ;
                var DM = '<DM>' + $('#' + ControlToSet).val() + '</DM>'; // Term in Months
                ControlToSet = "RDE_RiskPremium_" + SelectRow;
                var RP = '<RP>' + $('#' + ControlToSet).val() + '</RP>'; // Term in Months
                TermRecord = TermRecord + TR; 
                TermRecord = TermRecord + TD; 
                TermRecord = TermRecord + BR; 
                TermRecord = TermRecord + DM; 
                TermRecord = TermRecord + RP;
                TermRecord = TermRecord + '</Row>';
                if (TermRecords == '') { TermRecords = TermRecord; }
                else { TermRecords = TermRecords + TermRecord;}                
            }
            var urlMain = '/Services/WCFWebService.svc/RetailDealUpsert/?';
            var DataInput = 'RetailDealID=' + RetailDealID;
            RetailDealName = RetailDealName.trim();
            if (RetailDealName == '') { RetailDealName = 'N/A'; }
            DataInput = DataInput + '&RetailDealName=' + RetailDealName;
            if (CustomerID > 0) { DataInput = DataInput + '&CustomerID=' + CustomerID; }
            if (BrokerID > 0) { DataInput = DataInput + '&BrokerID=' + BrokerID; }
            if (StartDate != null) { DataInput = DataInput + '&StartDate=' + StartDate;}
            if (DealDate != null) { DataInput = DataInput + '&DealDate=' + DealDate; }
            if (Committed == 1) { DataInput = DataInput + '&DealCommitted=1'; }
            
            if ((TermRecords != '') && (TermRecords != null)) { DataInput = DataInput + '&TermRecords=' + TermRecords; }
            if (Committed == -1) { DataInput = DataInput + '&StatusOfRecordID=0'; }
            else {DataInput = DataInput + '&StatusOfRecordID=1';}
            urlMain = urlMain + DataInput;
            var ResultData = ReturnDataFromService(urlMain);
            RetailDealID = ResultData;
            urlMain = '/Services/WCFWebService.svc/RetailDealGetInfo';
            ControlToSet = "selRDE_Deal";
            var InitialWord = "Deal"
            intSuccess = RDE_DealFillSelectGeneral(ControlToSet, urlMain, InitialWord);            
            if (Committed == -1) {
                $('#' + ControlToSet).val(-1).change();
                RetailDealSelect(-1);
            } else {
                $('#' + ControlToSet).val(RetailDealIdToSet).change();
                RetailDealSelect(RetailDealIdToSet);
            }            
            
            alertify.success(Msg);
        });
    } catch (e) {
        alertify.error(e);
    }
}
