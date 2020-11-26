function TurnOnCorrectHeader(ControlToSet) {
    try {
        //TurnOnCorrectHeader('DynamicRow_LoadResearch');
        //TurnOnCorrectHeader('DynamicRow_Risk');
        // Hide All
        $('#DynamicRow_LoadResearch').hide();
        $('#DynamicRow_Risk').hide();
        $('#DynamicRow_Pricing').hide();
        // Show What's Needed All
        $('#' + ControlToSet).show();
        //$('#DynamicRow_Pricing').hide();        
        //if (document.getElementById("barDataEntry").className == 'active' { $("#barDataEntry").removeClass("active");}
        //if (document.getElementById("barDashboard").className == 'active' { $("#barDashboard").removeClass("active") }
        //if (document.getElementById("barPricing").className == 'active' { $("#barPricing").removeClass("active") }
        //if (document.getElementById("barLoadResearch").className == 'active' { $("#barLoadResearch").removeClass("active") }
        //if (document.getElementById("barRisk").className == 'active' { $("#barRisk").removeClass("active") }
        
        //document.getElementById("barDashboard").className = '';
        //document.getElementById("barPricing").className = '';
        //document.getElementById("barLoadResearch").className = '';
        //document.getElementById("barRisk").className = '';
        if (ControlToSet == "DynamicRow_LoadResearch") {
            document.getElementById("barLoadResearch").className = 'active';
            document.getElementById("barRisk").className = '';
            document.getElementById("barPricing").className = '';
            document.getElementById("barDataEntry").className = '';
        } else if (ControlToSet == "DynamicRow_Risk") {
            document.getElementById("barLoadResearch").className = '';
            document.getElementById("barRisk").className = 'active';
            document.getElementById("barPricing").className = '';
            document.getElementById("barDataEntry").className = '';
        } else if (ControlToSet == "DynamicRow_Pricing") {
            document.getElementById("barLoadResearch").className = '';
            document.getElementById("barRisk").className = '';
            document.getElementById("barPricing").className = 'active';
            document.getElementById("barDataEntry").className = '';
        } else if (ControlToSet == "DealEntry") {
            document.getElementById("barLoadResearch").className = '';
            document.getElementById("barRisk").className = '';
            document.getElementById("barPricing").className = '';
            document.getElementById("barDataEntry").className = 'active';
        }

    } catch (e) {
        alertify.error(e);
    }
}

function ClearAndAddToULWithResultSet(Control, ResultSet){
    try {
        //LIString = '<li value=' + DoubleQuotes + SelectorID + DoubleQuotes + '><a href=' + DoubleQuotes + '#' + DoubleQuotes + '><input type=' + DoubleQuotes + 'checkbox' + DoubleQuotes + ' id=' + DoubleQuotes + ControlToSet + '_CHK_' + SelectorID + DoubleQuotes + ' value=' + DoubleQuotes + SelectorText + DoubleQuotes + '><label id=' + DoubleQuotes + ControlToSet + SelectorID + DoubleQuotes + ' value=' + DoubleQuotes + SelectorText + DoubleQuotes + '>' + SelectorText + '</label ></a ></li > ';
        $('#' + ControlToSet).empty();
        //var ResultData = ReturnDataFromService(urlMain);
        var CHKBox = "<input type=\"checkbox\">";
        $('#' + ControlToSet).find('option').remove().end();
        // Setting Up the Double and Single Quotes for the LI
        var DoubleQuotes = '\"';
        var SingleQuotes = '\'';

        var ControlToSend = ControlToSet + '_LBL_NegativeOne';
        var CheckBoxName = ' id = ' + SingleQuotes + ControlToSend + SingleQuotes + ' ';
        var SelectorText = '<label ' + CheckBoxName + ' >Check All</label>'
        ControlToSend = ControlToSet + '_CHK_NegativeOne';
        var LBLToSend = ControlToSet + '_LBL_NegativeOne';
        CheckBoxName = ' id = ' + SingleQuotes + ControlToSend + SingleQuotes + ' ';
        LBLToSend = ' id = ' + SingleQuotes + ControlToSend + SingleQuotes + ' ';
        //var functionCall = ' onclick = ' + SingleQuotes + 'CheckAllUnCheckAll(' + DoubleQuotes + ControlToSend + DoubleQuotes + '); ' + DoubleQuotes + ' ';
        var functionCall = ' onclick = ' + SingleQuotes + 'GraphingCheckAllUnCheckAll(' + DoubleQuotes + ControlToSet + DoubleQuotes + ')' + SingleQuotes + ' ';
        SelectorText = '<label ' + LBLToSend + functionCall + '>Check All</label > ';
        LIString = '<li value=' + DoubleQuotes + SelectorID + DoubleQuotes + '>';
        LIString = LIString + '<label><input ' + CheckBoxName + functionCall + ' type="checkbox" name="checkbox" value="' + SelectorID + '">' + SelectorText;
        LIString = LIString + '</label></li>';
        $('#' + ControlToSet).append(LIString);

        for (var i in ResultData) {
            var SelectorText;
            var SelectorID;
            SelectorText = ResultData[i].SelectorText;
            //alertify.success(SelectorText);
            SelectorID = ResultData[i].SelectorID;                     
            if (SelectorText != "All") {
                var chkBoxNameAction = 'checkposition(' + SingleQuotes + ControlToSet + '_CHK_' + SelectorID + SingleQuotes + ')';
                //alertify.error(chkBoxNameAction);
                var ControlToSelect = ControlToSet + '_' + i;
                LIString = '<li value=' + DoubleQuotes + SelectorID + DoubleQuotes + ' >';
                //// Setting Up the LI
                LIString = '<a href=' + DoubleQuotes + '#' + DoubleQuotes + '>';
                //// Setting Up the aRef 
                LIString = LIString + '<a href=' + DoubleQuotes + '#' + DoubleQuotes + '>';
                //// Setting Up the Checkbox           
                
                var FctnToInsert = 'reDrawCharts(' + DoubleQuotes + ControlToSet + '_CHK_' + SelectorID + DoubleQuotes + '); '
                LIString = LIString + '<input type = ' + DoubleQuotes + 'checkbox' + DoubleQuotes + ' id = ' + DoubleQuotes + ControlToSet + '_CHK_' + SelectorID + DoubleQuotes + ' value = ' + DoubleQuotes + SelectorText + DoubleQuotes + 'onclick = ' + DoubleQuotes + FctnToInsert  + DoubleQuotes + ' >';
                //// Closing It Off
                LIString = LIString + '</a ></li >'; //alert("Hello! I am an alert box!!");
                LIString = '<li value=' + DoubleQuotes + SelectorID + DoubleQuotes + '><a href=' + DoubleQuotes + '#' + DoubleQuotes + '><input type=' + DoubleQuotes + 'checkbox' + DoubleQuotes + ' id=' + DoubleQuotes + ControlToSet + '_CHK_' + SelectorID + DoubleQuotes + ' value=' + DoubleQuotes + SelectorText + DoubleQuotes + ' onclick=' + DoubleQuotes + 'reDrawCharts();' + DoubleQuotes + '> <label id=' + DoubleQuotes + ControlToSet + SelectorID + DoubleQuotes + ' value=' + DoubleQuotes + SelectorText + DoubleQuotes + '> ' + SelectorText + '</label ></a ></li > ';
                $('#' + ControlToSet).append(LIString);
                //alertify.success(LIString);
            }
        }
    }
    catch (e) {
        alertify.error(e);
    }
}

function GraphingCheckAllUnCheckAll(ControlToSet) {
    try {    
        var Msg = 'Unchecked';
        //var LBLToChange = ControlToSend.replace("_CHK_", "_LBL_");
        var ControlToSend = ControlToSet + '_CHK_NegativeOne';

        if ($('#' + ControlToSend).is(":checked")) {
            Msg = 'Unchecked';
            $('#' + ControlToSend).prop('checked', false);            
           // Check All Points
            $("#" + ControlToSet + " li").each(function (index) {
                //alertify.error(index + ": " + $(this).text() + ' - ' + $(this).val());
                CheckboxToSet = ControlToSet + '_CHK_' + $(this).val();
                SelIndex = $(this).val();
                SelText = $(this).text();
                if (SelIndex != '-1') {
                    $('#' + CheckboxToSet).prop('checked', false);            
                }
            });
        } else {
            Msg = 'Checked';
            $('#' + ControlToSend).prop('checked', true);
            $("#" + ControlToSet + " li").each(function (index) {
                //alertify.error(index + ": " + $(this).text() + ' - ' + $(this).val());
                CheckboxToSet = ControlToSet + '_CHK_' + $(this).val();
                SelIndex = $(this).val();
                SelText = $(this).text();
                if (SelIndex != '-1') {
                    $('#' + CheckboxToSet).prop('checked', true);
                }
            });            
        }
        reDrawCharts();
    }
    catch (e) {
        alertify.error(e);
    }
}

function ClearAndAddToUL(ControlToSet, urlMain) {
    try {
        //LIString = '<li value=' + DoubleQuotes + SelectorID + DoubleQuotes + '><a href=' + DoubleQuotes + '#' + DoubleQuotes + '><input type=' + DoubleQuotes + 'checkbox' + DoubleQuotes + ' id=' + DoubleQuotes + ControlToSet + '_CHK_' + SelectorID + DoubleQuotes + ' value=' + DoubleQuotes + SelectorText + DoubleQuotes + '><label id=' + DoubleQuotes + ControlToSet + SelectorID + DoubleQuotes + ' value=' + DoubleQuotes + SelectorText + DoubleQuotes + '>' + SelectorText + '</label ></a ></li > ';
        $('#' + ControlToSet).show();
        $('#' + ControlToSet).empty();
        var ResultData = ReturnDataFromService(urlMain);
        var CHKBox = "<input type=\"checkbox\">";
        $('#' + ControlToSet).find('option').remove().end();
        // Setting Up the Double and Single Quotes for the LI
        var DoubleQuotes = '\"';
        var SingleQuotes = '\'';
        // Add Check All
        var LIString;
        var SelectorID = '-1';        
        var ControlToSend = ControlToSet + '_LBL_NegativeOne';
        var CheckBoxName = ' id = ' + SingleQuotes + ControlToSend + SingleQuotes + ' ';
        var SelectorText = '<label ' + CheckBoxName + ' >Check All</label>'        
        ControlToSend = ControlToSet + '_CHK_NegativeOne';
        var LBLToSend = ControlToSet + '_LBL_NegativeOne';
        CheckBoxName = ' id = ' + SingleQuotes + ControlToSend + SingleQuotes + ' ';
        LBLToSend = ' id = ' + SingleQuotes + ControlToSend + SingleQuotes + ' ';
        //var functionCall = ' onclick = ' + SingleQuotes + 'CheckAllUnCheckAll(' + DoubleQuotes + ControlToSend + DoubleQuotes + '); ' + DoubleQuotes + ' ';
        var functionCall = ' onclick = ' + SingleQuotes + 'GraphingCheckAllUnCheckAll(' + DoubleQuotes + ControlToSet + DoubleQuotes + ')' + SingleQuotes + ' ';
        SelectorText = '<label ' + LBLToSend + functionCall + '>Check All</label > ';
        LIString = '<li value=' + DoubleQuotes + SelectorID + DoubleQuotes + '>';
        LIString = LIString + '<label><input ' + CheckBoxName + functionCall + ' type="checkbox" name="checkbox" value="' + SelectorID + '">' + SelectorText;
        LIString = LIString + '</label></li>';
        $('#' + ControlToSet).append(LIString);

        for (var i in ResultData) {
            var SelectorText;
            var SelectorID;
            SelectorText = ResultData[i].SelectorText;
            //alertify.success(SelectorText);
            SelectorID = ResultData[i].SelectorID;
            functionChangeChkBox = ' onclick=alert(' + DoubleQuotes + 'Alert Mama' + DoubleQuotes + ')';   
            if (SelectorText != "All") {
                var chkBoxNameAction = 'checkposition(' + SingleQuotes + ControlToSet + '_CHK_' + SelectorID + SingleQuotes + ')';
                //alertify.error(chkBoxNameAction);
                var ControlToSelect = ControlToSet + '_' + i;
                LIString = '<li value=' + DoubleQuotes + SelectorID + DoubleQuotes + ' class=' + DoubleQuotes + 'chkLIClassLI' + DoubleQuotes + ' > ';
                //// Setting Up the LI
                LIString = '<a href=' + DoubleQuotes + '#' + DoubleQuotes + '>';
                //// Setting Up the aRef 
                LIString = LIString + '<a href=' + DoubleQuotes + '#' + DoubleQuotes + '>';
                //// Setting Up the Checkbox                 
                LIString = LIString + '<input type = ' + DoubleQuotes + 'checkbox' + DoubleQuotes + ' id = ' + DoubleQuotes + ControlToSet + '_CHK_' + SelectorID + DoubleQuotes + ' class = ' + DoubleQuotes + 'chkBoxClassLI' + DoubleQuotes +  ' value = ' + DoubleQuotes + SelectorText + DoubleQuotes + 'onclick = ' + DoubleQuotes + 'reDrawCharts(); ' + DoubleQuotes + '> ';
                //// Closing It Off
                LIString = LIString + '</a ></li >';
                LIString = '<li value=' + DoubleQuotes + SelectorID + DoubleQuotes + '><a href=' + DoubleQuotes + '#' + DoubleQuotes + '><input type=' + DoubleQuotes + 'checkbox' + DoubleQuotes + ' id=' + DoubleQuotes + ControlToSet + '_CHK_' + SelectorID + DoubleQuotes + ' value=' + DoubleQuotes + SelectorText + DoubleQuotes + ' onclick=' + DoubleQuotes + 'reDrawCharts();' + DoubleQuotes + '> <label id=' + DoubleQuotes + ControlToSet + SelectorID + DoubleQuotes + ' value=' + DoubleQuotes + SelectorText + DoubleQuotes + '> ' + SelectorText + '</label ></a ></li > ';
                // Retry
                var CheckBoxName = 'id = ' + DoubleQuotes + ControlToSet + '_CHK_' + SelectorID + DoubleQuotes + ' '; 
                var FctnToInsert = 'reDrawCharts(' + SingleQuotes + ControlToSet + '_CHK_' + SelectorID + SingleQuotes + '); '
                var functionCall = ' onclick = ' + DoubleQuotes + FctnToInsert  + DoubleQuotes + ' '; 
                
                LIString = LIString + '<input type = ' + DoubleQuotes + 'checkbox' + DoubleQuotes + ' id = ' + DoubleQuotes + ControlToSet + '_CHK_' + SelectorID + DoubleQuotes + ' value = ' + DoubleQuotes + SelectorText + DoubleQuotes + 'onclick = ' + DoubleQuotes + FctnToInsert + DoubleQuotes + ' >';

                LIString = '<li value=' + DoubleQuotes + SelectorID + DoubleQuotes + '>';
                LIString = LIString + '<label><input ' + CheckBoxName + functionCall + ' type="checkbox" name="checkbox" value="' + SelectorID + '">' + SelectorText  + '</label>';
                LIString = LIString + '</li>';
                //LIString = '<li value=' + DoubleQuotes + SelectorID + DoubleQuotes + '>';
                //LIString = LIString + '<input type=' + DoubleQuotes + ' checkbox' + DoubleQuotes + ' id = ' + DoubleQuotes + ControlToSet + '_CHK_' + SelectorID + DoubleQuotes + ' value = ' + DoubleQuotes + SelectorText + DoubleQuotes + ' onclick = ' + DoubleQuotes + 'reDrawCharts(); ' + DoubleQuotes + ' > ';
                //LIString = LIString + SelectorText '</'
                $('#' + ControlToSet).append(LIString);
                //alertify.success(LIString);
            }
        }
    }
    catch (e) {
        alertify.error(e);
    }
}

function SetCheckBox(chkBoxName) {
    try {
        //$("#" + chkBoxName).prop("checked", true);
        alert(chkBoxName);

    } catch (e) {
        alertify.error(e);
    }
}

function ReplaceSelToLbl(ControlToSet, Msg) {
    try {
        var Controller = 3;
        $("#" + ControlToSet).show();
        ControlToSet = 'lbl' + ControlToSet.substr(Controller, ControlToSet.length - Controller);
        ControlToSet = 'sel' + ControlToSet.substr(Controller, ControlToSet.length - Controller) + 'Btn';
        document.getElementById(ControlToSet).innerHTML = Msg;
    } catch (e) {
        alertify.error(e);
        return "Error";
    }
}

function GraphingSetDealIDs(ControlToSet) {
    try {
        //DealGetInfo/?CustomerID={CustomerID}",
        var urlMain = '/Services/WCFWebService.svc/DealGetInfo';
        ClearAndAddToUL(ControlToSet, urlMain);
        var Msg = 'Select Deals';
        ReplaceSelToLbl(ControlToSet, Msg);
    }
    catch (e) {
        alertify.error(e);
    }
}

function GraphingSetMonths(ControlToSet) {
    try {
        var urlMain = '/Services/WCFWebService.svc/AllMonthsGetInfo';
        ClearAndAddToUL(ControlToSet, urlMain);
        var Msg = 'Select Months';
        ReplaceSelToLbl(ControlToSet, Msg);
    }
    catch (e) {
        alertify.error(e);
    }
}

function GraphingSetBookOfBusiness(ControlToSet) {
    try {
        var urlMain = '/Services/WCFWebService.svc/AllBookOfBusinessGetInfo';
        ClearAndAddToUL(ControlToSet, urlMain);
        var Msg = 'Select Book';
        ReplaceSelToLbl(ControlToSet, Msg);
    }
    catch (e) {
        alertify.error(e);
    }
}

function GraphingSetLineOfBusiness(ControlToSet) {
    try {
        var urlMain = '/Services/WCFWebService.svc/AllLineOfBusinessGetInfo';
        ClearAndAddToUL(ControlToSet, urlMain);
        var Msg = 'Select Line of Business';
        ReplaceSelToLbl(ControlToSet, Msg);
    }
    catch (e) {
        alertify.error(e);
    }
}

function GraphingSetCongestionZones(ControlToSet) {
    try {
        var urlMain = '/Services/WCFWebService.svc/AllCongestionZonesGetInfo';
        ClearAndAddToUL(ControlToSet, urlMain);
        var Msg = 'Select Congestion Zones';
        ReplaceSelToLbl(ControlToSet, Msg);

    }
    catch (e) {
        alertify.error(e);
    }
}

function GraphingSetRiskHourlyPositionAllMonthsGetInfo(ControlToSet) {
    try {
        var urlMain = '/Services/WCFWebService.svc/RiskHourlyPositionAllMonthsGetInfo';
        ClearAndAddToUL(ControlToSet, urlMain);
        var Msg = 'Select Months';
        ReplaceSelToLbl(ControlToSet, Msg);
    }
    catch (e) {
        alertify.error(e);
    }    
}

function GraphingPricingStartDates(ControlToSet) {
    try {
        var urlMain = '/Services/WCFWebService.svc/PricingDealStartDates';
        ClearAndAddToUL(ControlToSet, urlMain);    
        var Msg = 'Select Start Dates';
        ReplaceSelToLbl(ControlToSet, Msg);
    }
    catch (e) {
        alertify.error(e);
    }   
}

function GraphingRiskWholeSaleTradeSettlementPositionAllMonthsGetInfoGetInfo(ControlToSet) {
    try {
        var urlMain = '/Services/WCFWebService.svc/RiskWholeSaleTradeSettlementPositionAllMonthsGetInfo';
        ClearAndAddToUL(ControlToSet, urlMain);
        var Msg = 'Select Months';
        ReplaceSelToLbl(ControlToSet, Msg);
    }
    catch (e) {
        alertify.error(e);
    }
}

function GraphingPricingTermsGetInfoGetInfo(ControlToSet, TypeID) {
    try {
        var urlMain = '/Services/WCFWebService.svc/PricingTermsGetInfo/?TypeID=' + TypeID;
        ClearAndAddToUL(ControlToSet, urlMain);
        var Msg = 'Select Term';
        ReplaceSelToLbl(ControlToSet, Msg);
    }
    catch (e) {
        alertify.error(e);
    }
}

function GraphingSetPricingCatagory(ControlToSet) {
    try {
        var urlMain = '/Services/WCFWebService.svc/PricingCategoryGetInfo';
        ClearAndAddToUL(ControlToSet, urlMain);
        var Msg = 'Select Category';
        ReplaceSelToLbl(ControlToSet, Msg);
    }
    catch (e) {
        alertify.error(e);
    }
}

function GraphingSetSubPricingCatagory(ControlToSet) {
    try {
        var urlMain = '/Services/WCFWebService.svc/SubPricingCategoryGetInfo';
        ClearAndAddToUL(ControlToSet, urlMain);
        var Msg = 'Select Uplift';
        ReplaceSelToLbl(ControlToSet, Msg);

    }
    catch (e) {
        alertify.error(e);
    }
}

function GraphingSetWholeSaleBlocks(ControlToSet) {
    try {
        var urlMain = '/Services/WCFWebService.svc/AllWholeSaleBlocksGetInfo';
        ClearAndAddToUL(ControlToSet, urlMain);
        var Msg = 'Select Wholesale Block';
        ReplaceSelToLbl(ControlToSet, Msg);

    }
    catch (e) {
        alertify.error(e);
    }
}

function GraphingSetAccounts(ControlToSet) {
    try {
        var urlMain = '/Services/WCFWebService.svc/AllAccountsGetInfo';
        ClearAndAddToUL(ControlToSet, urlMain);
        var Msg = 'Select Accounts';
        ReplaceSelToLbl(ControlToSet, Msg);

    }
    catch (e) {
        alertify.error(e);
    }
}

function GraphingSetCounterParties(ControlToSet) {
    try {
        var urlMain = '/Services/WCFWebService.svc/AllCounterPartyGetInfo';
        ClearAndAddToUL(ControlToSet, urlMain);
        var Msg = 'Select Counterparty';
        ReplaceSelToLbl(ControlToSet, Msg);

    }
    catch (e) {
        alertify.error(e);
    }
}

function GraphingSetHours(ControlToSet) {
    try {
        var urlMain = '/Services/WCFWebService.svc/HoursGetInfo';
        ClearAndAddToUL(ControlToSet, urlMain);
        var Msg = 'Select Hours';
        ReplaceSelToLbl(ControlToSet, Msg);
    }
    catch (e) {
        alertify.error(e);
    }
}

function GraphingSetWeatherScenario(ControlToSet) {
    try {
        var urlMain = '/Services/WCFWebService.svc/AllWeatherScenariosGetInfo';
        ClearAndAddToUL(ControlToSet, urlMain);
        var Msg = 'Select Weather Scenario';
        ReplaceSelToLbl(ControlToSet, Msg);

    }
    catch (e) {
        alertify.error(e);
    }
}

function GraphingSetCustomer(ControlToSet) {
    try {

        var urlMain = '/Services/WCFWebService.svc/CustomersAllSelectorGetInfo';
        ClearAndAddToUL(ControlToSet, urlMain);
        var Msg = 'Select Customer';
        ReplaceSelToLbl(ControlToSet, Msg);

    }
    catch (e) {
        alertify.error(e);
    }
}

function ReturnSelectionXML(ControlToSet, XMLField) {
    try {
        var SelIndex;
        var SelText;
        // Separators
        var RetunValue = '';
        var OpenOpenSign = '\x3C';
        var OpenClosedSign = '\x3C' + '/';
        var CloseSign = '\x3E';
        var xmlInput = '';
        var xmlSeparator = XMLField;
        var Row1 = "<Row><";
        var Row2 = "></Row>";
        //alertify.success(Row1 + Row2);
        var listItems = $("#" + ControlToSet + " li");

        $("#" + ControlToSet + " li").each(function (index) {
            //alertify.error(index + ": " + $(this).text() + ' - ' + $(this).val());
            CheckboxToSet = ControlToSet + '_CHK_' + $(this).val();
            SelIndex = $(this).val();
            SelText = $(this).text();

            if ((($('#' + CheckboxToSet).is(':checked')) == true) && (SelIndex != '-1'))  {
                if (xmlInput == '') {
                    // Start Row               
                    xmlInput = OpenOpenSign + "Row" + CloseSign;
                } else {
                    // Start Row               
                    xmlInput = xmlInput + OpenOpenSign + "Row" + CloseSign;
                }
                // Separator
                xmlInput = xmlInput + OpenOpenSign + xmlSeparator + CloseSign;
                // Value
                xmlInput = xmlInput + SelIndex;
                //Close Separator
                xmlInput = xmlInput + OpenClosedSign + xmlSeparator + CloseSign;
                //Close Row
                xmlInput = xmlInput + OpenClosedSign + "Row" + CloseSign;
            }

        });
        RetunValue = xmlInput;
        return RetunValue;
    }
    catch (e) {
        alertify.error(e);
    }
}

function ReturnDateFromDateInput(DateSelector) {
    try {
        date = new Date($('#' + DateSelector).val());
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        var RealDate = month + '/' + day + '/' + year;
        //var RealDate = date.getDate();
        return RealDate
    }
    catch (e) {
        alertify.error(e);
        return -1;
    }
}

function SetFirstCheckBox(ControlToSet) {
    try {
        // Given a unordered list, check the first checkbox
        var ul = document.getElementById(ControlToSet);
        var items = ul.getElementsByTagName("li");
        //alertify.success(items.length);
        var chkBox = ControlToSet + '_CHK_' + items[0].value;
        var chkBoxObj = document.getElementById(chkBox);
        $("#" + chkBox).prop("checked", true);
    } catch (e) {
        alertify.error(e);
    }
}

function SetSingleSelect(ControlToSet, SelIndex) {
    try {
        var ul = document.getElementById(ControlToSet);
        var items = ul.getElementsByTagName("li");
        var iCountOfItems = items.length;
        //alertify.success(iCountOfItems);
        var BaseChkBox = ControlToSet + '_CHK_' + SelIndex;
        var chkBox;
        var iRows;
        for (iRows = 0; iRows < iCountOfItems; iRows++) {
            SelIndex = items[iRows].value;
            chkBox = ControlToSet + '_CHK_' + SelIndex;
            if (chkBox != BaseChkBox) {
                $("#" + chkBox).prop("checked", false);
            }            
        }

        //var chkBoxObj = document.getElementById(chkBox);
        //$("#" + chkBox).prop("checked", true);


    } catch (e) {
        alertify.error(e);
    }
}