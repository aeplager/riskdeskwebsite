function WDE_setTwoNumberDecimal(el) {
    try {
        var NewValue = el.value;        
        //NewValue = formatNumber(el.value);
        //NewValue = NewValue.fixed(3).toString();
        //el.value = NewValue.addCommas(NewValue);  //.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        el.value = addCommas(NewValue);
    } catch (e) {
        alertify.error(e);
    }
};
function WDE_setNumberDecimal(el) {
    try {
        var NewValue = el.value;
        el.value = addCommas(NewValue);
    } catch (e) {
        alertify.error(e);
    }
}
function WDE_setWholeNumber(el) {
    try {
        var NewValue = el.value;
        //NewValue = formatNumber(el.value);
        //NewValue = NewValue.fixed(0).toString();
        el.value = addCommas(NewValue);//.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    } catch (e) {
        alertify.error(e);
    }
};
function addCommas(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}
function WDE_Commit() {
    alertify.success("Commit is coming");
}
function WDE_Save() {
    alertify.success("Save is coming");
}
function WDE_New() {
    alertify.success("New is coming");
}
function WDE_Calculate() {
    alertify.success("Calculate is coming");
}
function SetUpWholesaleDealEntryScreen() {
    try {
        var intSuccess = 0;
        var urlMain = '/Services/WCFWebService.svc/AllWholeSaleDealsGetInfo';
        var ControlToSet = "selWDE_Deal";
        var InitialWord = "Deal"

        intSuccess = WDE_FillSelectWholeSaleDeal(ControlToSet, urlMain, InitialWord);


        urlMain = '/Services/WCFWebService.svc/AllISOGetInfo';
        ControlToSet = "selWDE_ISO";
        InitialWord = "ISO"
        intSuccess = WDE_FillSelectGeneral(ControlToSet, urlMain, InitialWord);
        urlMain = '/Services/WCFWebService.svc/AllCounterPartiesGetInfo';
        ControlToSet = "selWDE_CounterpartyMain";
        InitialWord = "Counterparty"
        intSuccess = WDE_FillSelectGeneral(ControlToSet, urlMain, InitialWord);
        urlMain = '/Services/WCFWebService.svc/AllCounterPartiesGetInfo';
        ControlToSet = "selWDE_SecondCounterParty";
        InitialWord = "Second Counterparty"
        intSuccess = WDE_FillSelectGeneral(ControlToSet, urlMain, InitialWord);
                       
        urlMain = '/Services/WCFWebService.svc/AllSetPointGetInfo';
        ControlToSet = "selWDE_SettlementPoint";
        InitialWord = "Settlement Point"
        intSuccess = WDE_FillSelectGeneral(ControlToSet, urlMain, InitialWord);

        urlMain = '/Services/WCFWebService.svc/AllCongestionZonesGetInfo';
        ControlToSet = "selWDE_SetLocation";
        InitialWord = "Set Location"
        intSuccess = WDE_FillSelectGeneral(ControlToSet, urlMain, InitialWord);


        urlMain = '/Services/WCFWebService.svc/AllWholeSaleBlocksGetInfo';
        ControlToSet = "selWDE_WholesaleBlock_Main";
        InitialWord = "Wholesale Block"
        intSuccess = WDE_FillSelectGeneral(ControlToSet, urlMain, InitialWord);

        //AllWholeSaleBlocksGetInfo

    } catch (e) {
        alertify.error(e);
    }
}
function WDE_FillSelectWholeSaleDeal(ControlToSet, urlMain, InitialWord) {
    try {
        var ResultData = ReturnDataFromService(urlMain);
        $('#' + ControlToSet).find('option').remove().end();
        var $dropdown = $("#" + ControlToSet);
        InitialWord = " - " + InitialWord + " - ";
        $dropdown.append($("<option />").val("-1").text(InitialWord));
        $.each(ResultData, function () {
            $dropdown.append($("<option />").val(this.WholeSaleDealID).text(this.WholeSaleDealName));
        });
        // Volume MWh
        
     
        alertify.success("Selection Complete");
    } catch (e) {
        alertify.error(e);
    }
}
function WDE_FillSelectGeneral(ControlToSet, urlMain, InitialWord) {
    try {
        var ResultData = ReturnDataFromService(urlMain);
        $('#' + ControlToSet).find('option').remove().end();
        var $dropdown = $("#" + ControlToSet);
        InitialWord = " - " + InitialWord + " - ";
        $dropdown.append($("<option />").val("-1").text(InitialWord));
        $.each(ResultData, function () {
            $dropdown.append($("<option />").val(this.SelectorID).text(this.SelectorText));
        });
        return 1;
    } catch (e) {
        alertify.error(e);
        return 0;
    }
}

function WDE_WholeSaleDealSelect(SelectedDealID) {
    try {
        var DealID = 0;
        if (SelectedDealID == -1) { DealID = $('#selWDE_Deal').val(); }
        else { DealID = SelectedDealID;}
        var urlMain = '/Services/WCFWebService.svc/AllWholeSaleDealsGetInfo';
        var DataInput = '/?DealIDString=' + DealID;
        urlMain = urlMain + DataInput;
        var ResultData = ReturnDataFromService(urlMain);
        if ((ResultData != null) && (ResultData != 'undefined')) {
            ResultData.forEach(function (row) {
                // Setting the Values
                $('#WDE_DealName').val(row.WholeSaleDealName);
                $('#WDE_VolumeMWh').val(row.VolumeMWh);
                $('#WDE_VolMW').val(row.VolumeMW);
                $('#WDE_Price').val(row.Price);
                $('#WDE_Fee').val(row.Fee);
                $('#selWDE_ISO').val(row.ISOID);
                $('#selWDE_CounterpartyMain').val(row.CounterPartyID);
                $('#selWDE_SecondCounterParty').val(row.SecondCounterPartyID);
                $('#selWDE_SettlementPoint').val(row.SettlementPointID);
                $('#selWDE_SetLocation').val(row.SetLocationID);
                $('#selWDE_WholesaleBlock_Main').val(row.WholeSaleBlockID);
                
                var StartDateText = row.StartDate.replace(" 12:00:00 AM", "");                
                var EndDateText = row.EndDate.replace(" 12:00:00 AM", "");
                var DealDateText = row.DealDate.replace(" 12:00:00 AM", "");                
                document.getElementById("WDE_DealDate").value = FormatDateForInput(row.DealDate);                            
                document.getElementById("WDE_StartDate").value = FormatDateForInput(row.StartDate);                            
                document.getElementById("WDE_EndDate").value = FormatDateForInput(row.EndDate);                            
                var ControlToSet = "WDE_VolMW";
                var NewValue = document.getElementById(ControlToSet).value;
                document.getElementById(ControlToSet ).value = addCommas(NewValue);

                ControlToSet = "WDE_Price";
                NewValue = document.getElementById(ControlToSet).value;
                document.getElementById(ControlToSet).value = addCommas(NewValue);

                ControlToSet = "WDE_Fee";
                NewValue = document.getElementById(ControlToSet).value;
                document.getElementById(ControlToSet).value = addCommas(NewValue);

                ControlToSet = "WDE_VolumeMWh";
                NewValue = document.getElementById(ControlToSet).value;
                document.getElementById(ControlToSet).value = addCommas(NewValue);

                ControlToSet = "WDE_Cost";
                NewValue = document.getElementById(ControlToSet).value;
                document.getElementById(ControlToSet).value = addCommas(NewValue);
                // Setting Commmitment Date
                if (row.DealCommitted != 0) {
                    var DealCommittmentDate = row.DealCommittmentDate;
                    //var FormattedDate = DealCommittmentDate.toUTCString("en-US");
                    $('#WDE_Committed').val(" Committed on:  " + DealCommittmentDate);
                } else {
                    $('#WDE_Committed').val("Not Committed");
                }

                alertify.success('Selection Complete');
            });     
        }
    } catch (e) {
        alertify.error(e);        
    }
}

function WDE_CalculateFctn() {
    try {
        var DataInput;
        var StartDate;
        var EndDate;
        var MW = 1;
        var WholeSaleBlockID = 1;
        var CurrentValue = 0;
        WholeSaleBlockID = $("#selWDE_WholesaleBlock_Main").val();
        StartDate = new Date($("#WDE_StartDate").val());
        EndDate = new Date($("#WDE_EndDate").val());
        MW = $('#WDE_VolMW').val();
        if (MW == null) { MW = 0;}        
        var StartDateText = $("#WDE_StartDate").val();
        var EndDateText = $("#WDE_EndDate").val();
        var blStartDate = false;
        var blEndDate = false;
        var dblPrice = 0;
        dblPrice = $("#WDE_Price").val();
        dblPrice = dblPrice.replace(/,/g, "");
        if (StartDate != "") { blStartDate = true;}
        if (EndDate != "") { blEndDate = true; }
        
        if (StartDate.getFullYear() > 2300) { blStartDate = false;}
        if (EndDate.getFullYear() > 2300) { blEndDate = false; }

        if ((WholeSaleBlockID >= 1) && (blStartDate == true) && (blEndDate == true)) {
            var DataInput = "WholeSaleBlockID=" + WholeSaleBlockID;
            DataInput = DataInput + "&StartDate=" + StartDateText ;
            DataInput = DataInput + "&EndDate=" + EndDateText;
            DataInput = DataInput + "&MW=" + MW;
            var urlMain = '/Services/WCFWebService.svc/WholeSaleBlockVolumeMWhCalc/?' + DataInput;
            var ResultData = ReturnDataFromService(urlMain);
            if (ResultData === 'undefined') { CurrentValue = null; }
            else { CurrentValue = ResultData; }
        }
        $("#WDE_VolumeMWh").val(CurrentValue);
        CurrentValue = dblPrice * CurrentValue;
        $("#WDE_Cost").val(CurrentValue);
        
    } catch (e) {
        alertify.error(e);
        return 0;
    }
}
function WDE_SaveDeal(CommitDeal) {
    try {
        var Msg = 'Are you sure you want to save the deal';
        if (CommitDeal == 1) { Msg = 'Are you sure you want to commit the deal'}
        alertify.confirm(Msg , function () {
            var WholeSaleDealID = $("#selWDE_Deal").val();
            var WholeSaleDealName = $("#WDE_DealName").val();
            var ISOID = $("#selWDE_ISO").val();
            var CounterPartyID = $("#selWDE_CounterpartyMain").val();
            var SecondCounterPartyID = $("#selWDE_SecondCounterParty").val();
            var SettlementPointID = $("#selWDE_SettlementPoint").val();
            var SetLocationID = $("#selWDE_SetLocation").val();
            var WholeSaleBlockID = $("#selWDE_WholesaleBlock_Main").val();
            var StartDate = $("#WDE_StartDate").val();
            var DealDate = $("#WDE_DealDate").val();
            var EndDate = $("#WDE_EndDate").val();
            var VolumeMW = $("#WDE_VolMW").val();
            var VolumeMWh = $("#WDE_VolumeMWh").val();
            var Price = $("#WDE_Price").val();
            var Fee = $("#WDE_Fee").val();
            var Cost = $("#WDE_Cost").val();
            var MTM = "0";
            VolumeMW = VolumeMW.replace(/,/g, "");
            VolumeMWh = VolumeMWh.replace(/,/g, "");
            Price = Price.replace(/,/g, "");
            Fee = Fee.replace(/,/g, "");
            Cost = Cost.replace(/,/g, "");
            MTM = MTM.replace(/,/g, "");

            var DataInput = "WholeSaleDealID=" + WholeSaleDealID + "&WholeSaleDealName=" + WholeSaleDealName + "&ISOID=" + ISOID + "&CounterPartyID=" + CounterPartyID; 
            DataInput = DataInput + "&SecondCounterPartyID=" + SecondCounterPartyID + "&SettlementPointID=" + SettlementPointID + "&SetLocationID=" + SetLocationID;
            DataInput = DataInput + "&WholeSaleBlockID=" + WholeSaleBlockID + "&StartDate=" + StartDate + "&DealDate=" + DealDate + "&EndDate=" + EndDate + "&VolumeMW=" + VolumeMW;
            DataInput = DataInput + "&VolumeMWh=" + VolumeMWh + "&Price=" + Price + "&Fee=" + Fee + "&Cost=" + Cost + "&MTM=" + MTM + '&Committed=' + CommitDeal;            
            var urlMain = '/Services/WCFWebService.svc/AllWholeSaleDealUpsert/?' + DataInput;
            var ResultData = ReturnDataFromService(urlMain);
            var iDealID = ResultData.WholeSaleDealID;
            // Reset the Whole Sale Deal Drop Down
            var urlMain = '/Services/WCFWebService.svc/AllWholeSaleDealsGetInfo';
            var ControlToSet = "selWDE_Deal";
            var InitialWord = "Deal"

            var intSuccess = WDE_FillSelectWholeSaleDeal(ControlToSet, urlMain, InitialWord);

            if (iDealID >= 0) {
                $('#selWDE_Deal').val(iDealID);
                WDE_WholeSaleDealSelect(iDealID);                
            }
            alertify.success("Update Success");
        });
    } catch (e) {
        alertify.error(e);
        return 0;
    }
}
function WDE_NewDeal() {
    try {
        $("#selWDE_Deal").val(-1);
        $("#WDE_DealName").val('N/A');
        $("#selWDE_ISO").val(-1);
        $("#selWDE_CounterpartyMain").val(-1);
        $("#selWDE_SecondCounterParty").val(-1);
        $("#selWDE_SettlementPoint").val(-1);
        $("#selWDE_SetLocation").val(-1);
        $("#selWDE_WholesaleBlock_Main").val(-1);
        $("#WDE_StartDate").val(-1);
        $("#WDE_DealDate").val(-1);
        $("#WDE_EndDate").val(-1);
        $("#WDE_VolMW").val(0);
        $("#WDE_VolumeMWh").val(0);
        $("#WDE_Price").val(0);
        $("#WDE_Fee").val(0);
        $("#WDE_Cost").val(0);

        var today = new Date();
        var Posteddate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var Mnth = 0;
        if (today.getMonth() <= 9) { Mnth = "0" + (today.getMonth()+1) } else { Mnth = today.getMonth()+1; }
        var Dy = 0;
        if (today.getDate() <= 9) { Dy = "0" + (today.getDate() + 1) } else { Dy = today.getDate() + 1; }
        Posteddate = Mnth + '/' + today.getDate() + '/' + today.getFullYear();
        //Posteddate = Mnth + '/' + today.getDate() + '/' + today.getFullYear() + "-" + Mnth + "-" + Dy;
        document.getElementById("WDE_DealDate").value = FormatDateForInput(Posteddate);                            
        document.getElementById("WDE_StartDate").value = FormatDateForInput(Posteddate);                            
        document.getElementById("WDE_EndDate").value = FormatDateForInput(Posteddate);                            
        //$("#WDE_StartDate").val(Posteddate);
        $("#WDE_Committed").val("Not Committed");
    } catch (e) {
        alertify.error(e);        
    }
}
//function WDE_CommitDeal() {
//    try {
//        WDE_SaveDeal(1);
//    } catch (e) {
//        alertify.error(e);     
//    }
//}