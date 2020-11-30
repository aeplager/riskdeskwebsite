
function FacilityFillDropdowns() {
    try {
        //Fill All Dropdowns
        CustomerDropDownFill();        
        CustomerStateDropDownFill();
        CustomerCityDropDownFill();
        FacilityLoadProfiles();    
        FillDropDown('selFacilityPricingGroup', 'FacilityPricingGroupGetInfo', 'Pricing Group');
        var urlMain;
        var SelectorName;
        var SelectorFirstName;        
        // Load Profile
        urlMain = '/Services/Facility.svc/TDUGetInfo';
        SelectorName = 'SelTDU';
        SelectorFirstName = 'TDU';
        FacilityFillGenericSelectorDropDown(urlMain, SelectorName, SelectorFirstName);
        urlMain = '/Services/Facility.svc/CongestionZonesGetInfo';
        SelectorName = 'SelCongestionZones';
        SelectorFirstName = 'Congestion Zone';
        FacilityFillGenericSelectorDropDown(urlMain, SelectorName, SelectorFirstName);
        urlMain = '/Services/Facility.svc/WeatherStationGetInfo';
        SelectorName = 'SelWeatherStation';
        SelectorFirstName = 'Weather Station';
        FacilityFillGenericSelectorDropDown(urlMain, SelectorName, SelectorFirstName);
        $('#' + SelectorName).val(1);
        FacilityUtilityAccountSetUp(0);
        
    } catch (e) {
        HeaderDataErrorReport(e);
    }
}
function SelCustomer_onchange() {
    try {
        var CustomerID = $('#SelCustomer').val();
        if (CustomerID == null) { id = 0; }
        Facilities2 = [];
        FacilityNames2 = []
        // Obtain the 
        var urlMain = '/Services/Facility.svc/FacilityGetInfo';
        var DataMain = '?CustomerID=' + CustomerID;
        urlMain = urlMain + DataMain;
        var ResultData = ReturnDataFromService(urlMain);
        ControlToSet = "FacilityAutoCompleteList_Facility";
        for (var i in ResultData) {
            Facilities2.push(ResultData[i].UtilityAccountNumber);
            FacilityNames2.push(ResultData[i].FacilityName);
        }
        Facilities = Facilities2;
        FacilitiesNames = FacilityNames2;
        FacilityUtilityAccountSetUp(CustomerID);
        facility_clear_all()
        //$("#FacilityAutoCompleteList_Facility").autocomplete({
        //    source: Facilities
        //});
    } catch (e) {
        HeaderDataErrorReport(e);
    }
}
function UpdateOldTables() {
    try {
        var CustomerID = $('#SelCustomer').val();            
        var UtilityAccountNumber = $('#FacilityAutoCompleteList_Facility').val();
        CustomerID = CustomerID.trim();
        if ((CustomerID == "") || (CustomerID == null)) {
            CustomerID = 0;
        }
        UtilityAccountNumber = UtilityAccountNumber.trim()
        if ((UtilityAccountNumber == "") || (UtilityAccountNumber == null)) {
            UtilityAccountNumber = "N/A";
        }
        if ((CustomerID == 0) && (UtilityAccountNumber == "N/A")) {
            alertify.error("Please select at least a customer or a utility account number")
        } else {
            urlMain = '/Services/Facility.svc/PushDataToOldTables';
            DataMain = '?CustomerID=' + CustomerID;
            DataMain = DataMain + '&UtilityAccountNumber=' + UtilityAccountNumber;
            urlMain = urlMain + DataMain;
            var ResultData = ReturnDataFromService(urlMain);
            alertify.success(ResultData);
        }
    } catch (e) {
        HeaderDataErrorReport(e);
    }
}


function FacilityUtilityAccountSetUp(CustomerID) {
    try {        
        // Fills The Utilty Account Numbers
        var Facilities2 = [];
        var FacilitiesNames2 = [];
        var FacilitiesBlank = [];
        autocomplete(document.getElementById("FacilityAutoCompleteList_Facility"), Facilities);
        FacilityNameautocomplete(document.getElementById("facility_name"), FacilitiesBlank);
        //var CustomerID = "0";
        var urlMain = '/Services/Facility.svc/FacilityGetInfo';
        var DataMain = '?CustomerID=' + CustomerID;
        urlMain = urlMain + DataMain;
        var ResultData = ReturnDataFromService(urlMain);
        ControlToSet = "FacilityAutoCompleteList_Facility";
        for (var i in ResultData) {
            Facilities2.push(ResultData[i].UtilityAccountNumber);
            FacilitiesNames2.push(ResultData[i].FacilityName);
        }
        if (CustomerID == 0) {
            Facilities2 = FacilitiesBlank;
            FacilitiesNames2 = FacilitiesBlank;
        }
        UtilityAccountNumberautocomplete(document.getElementById("FacilityAutoCompleteList_Facility"), Facilities2);
        FacilityNameautocomplete(document.getElementById("facility_name"), FacilitiesNames2);        

    } catch (e) {
        HeaderDataErrorReport(e);
    }
}

function FacilityLoadProfiles() {
    try {
        var urlMain = '/Services/Facility.svc/LoadProfileGetInfo';
        var ResultData = ReturnDataFromService(urlMain);
        var LoadProfilesNew = [];
        for (var i in ResultData) {
            LoadProfilesNew.push(ResultData[i].SelectorText);
        }
        autocomplete(document.getElementById("FacilityAutoCompleteList_LoadProfile"), LoadProfilesNew);

        //UtilityAccountNumberautocomplete
    } catch (e) {
        HeaderDataErrorReport(e);
    }
}


function FacilityFillGenericSelectorDropDown (urlMain, SelectorName, SelectorFirstName) {
    try {
        $('#' + SelectorName).empty();
        AddItemsToSelector(SelectorName, "--" + SelectorFirstName + "--", 0);
        var urlMain = urlMain;
        var ResultData = ReturnDataFromService(urlMain);
        for (var iRows in ResultData) {
            AddItemsToSelector(SelectorName, ResultData[iRows].SelectorText, ResultData[iRows].SelectorID);
        }

    } catch (e) {
        HeaderDataErrorReport(e);
    }
}

function FacilityGetInfo(CurrentUtilityAccountNumber, FacilityName) {
    try {        
        //var CustomerID = 0;
        var CustomerID = $('#SelCustomer').val();            
        var urlMain = '/Services/Facility.svc/FacilityGetInfo';
        if (CurrentUtilityAccountNumber != '') {
            var DataMain = '?UtilityAccountNumber=' + CurrentUtilityAccountNumber;
        } else {
            var DataMain = '?CustomerID=' + CustomerID + '&FacilityName=' + FacilityName;
        }            
        urlMain = urlMain + DataMain;
        var ResultData = ReturnDataFromService(urlMain);
        // Reset to Nothing

        $('#ServiceAdd1').val("");
        $('#ServiceAdd2').val("");
        $('#SelState').val("TX");
        $('#SelCity').val(0);
        $('#ZipCode').val("");
        $('#SelTDU').val(0);
        $('#FacilityAutoCompleteList_LoadProfile').val("");
        $('#SelCongestionZones').val(0);
        $('#SelWeatherStation').val(0);        
        $('#SelCustomer').val(0);            
        $('#SelTDUTariff').empty();
        $('#SelLossCode').empty();                
        $('#facility_name').val('');
        $('#FacilityAutoCompleteList_Facility').val('');
        if (ResultData.length > 0) {
            var iRow = 0;
            var UtilityAccountNumber = ResultData[iRow].UtilityAccountNumber
            var FacilityName = ResultData[iRow].FacilityName
            $('#facility_name').val(FacilityName);
            $('#FacilityAutoCompleteList_Facility').val(UtilityAccountNumber);
            $('#ServiceAdd1').val(ResultData[iRow].ServiceAddressOne);
            $('#ServiceAdd2').val(ResultData[iRow].ServiceAddressTwo);
            $('#SelCity').val(ResultData[iRow].CityID);
            $('#FacilityAutoCompleteList_LoadProfile').val(ResultData[iRow].LoadProfile);
            $('#SelCongestionZones').val(ResultData[iRow].CongestionZonesID);
            $('#ZipCode').val(ResultData[iRow].ZipCode);
            $('#SelTDU').val(ResultData[iRow].TDUID);
            FacilityTDUSettings();
            $('#SelTDUTariff').val(ResultData[iRow].TDUTariffID);
            $('#SelLossCode').val(ResultData[iRow].LossCodeID);
            $('#BillingCycle').val(ResultData[iRow].LossCodeID);
            $('#SelWeatherStation').val(ResultData[iRow].BillingCyle);
            $('#SelCustomer').val(ResultData[iRow].CustomerID);            
        } 
        
    } catch (e) {
        HeaderDataErrorReport(e);
    }
}


function FacilityUtilityAccountNumberStatusSetUp() {
    try {
        $('#UtilityAccountStatus').html("Utility Account Number New");
    } catch (e) {
        HeaderDataErrorReport(e);
    }
}
function FacilityTDUSettings() {
    try {
        FacilityTDUTariffGetInfo();
        FacilityLossCodeGetInfo();
    } catch (e) {
        HeaderDataErrorReport(e);
    }
}
function FacilityTDUTariffGetInfo() {
    try {
        var TDUID = 0;
        var SelectorName = 'SelTDUTariff';
        TDUID = $('#SelTDU').val();
        $('#' + SelectorName).empty();
        var urlMain = '/Services/Facility.svc/TDUTariffGetInfo';
        var DataMain = '?TDUID=' + TDUID;
        urlMain = urlMain + DataMain;
        var ResultData = ReturnDataFromService(urlMain);
        AddItemsToSelector(SelectorName, "--TDU Tariff--", 0);
        for (var iRows in ResultData) {
            AddItemsToSelector(SelectorName, ResultData[iRows].TDUTariffName, ResultData[iRows].TDUTariffID);
        }
    } catch (e) {
        HeaderDataErrorReport(e);
    }
}

function FacilityLossCodeGetInfo() {
    try {
        var TDUID = 0;
        var SelectorName = 'SelLossCode';
        TDUID = $('#SelTDU').val();
        $('#' + SelectorName).empty();
        var urlMain = '/Services/Facility.svc/LossCodeGetInfo';
        var DataMain = '?TDUID=' + TDUID;
        urlMain = urlMain + DataMain;
        var ResultData = ReturnDataFromService(urlMain);
        AddItemsToSelector(SelectorName, "--Loss Code--", 0);
        for (var iRows in ResultData) {
            AddItemsToSelector(SelectorName, ResultData[iRows].LossCodeName, ResultData[iRows].LossCodeID);
        }

    } catch (e) {
        HeaderDataErrorReport(e);
    }
}
//function SendStatus(sts) {
//    modal_msg = sts;
//    $("#myModal").modal('hide');
//}
function FacilityUpsert(Status) {
    try {
    // Update the database
        var CustomerID = $('#SelCustomer').val();
        if (Status == 'New') {
            UtilityAccountNew = 1;
        } else {
            UtilityAccountNew = 0;
        }
        var UtilityAccountNumber = $('#FacilityAutoCompleteList_Facility').val();
        UtilityAccountNumber = UtilityAccountNumber.trim();
        var FacilityName = $('#facility_name').val();
        FacilityName = FacilityName.trim();
        var ServiceAddressOne = $('#ServiceAdd1').val();
        var ServiceAddressTwo = $('#ServiceAdd2').val();

        var StateAbb = 'TX';
        var CityID = $('#SelCity').val()
        var TDUID = $('#SelTDU').val();
        var LoadProfile = $('#FacilityAutoCompleteList_LoadProfile').val();
        var CongestionZoneID = $('#SelCongestionZones').val();
        var WeatherStationID = $('#SelWeatherStation').val();
        var BillCycle = $('#BillingCycle').val();
        var LossCodeID = $('#SelLossCode').val();
        var TDUTariffID = $('#SelTDUTariff').val();
        var ZipCode = $('#ZipCode').val();     
        var urlMain = '/Services/Facility.svc/FacilityUpsert';
        var DataMain = '?UtilityAccountNew=' + UtilityAccountNew;
        DataMain = DataMain + '&UtilityAccountNumber=' + UtilityAccountNumber;
        DataMain = DataMain + '&CustomerID=' + CustomerID;
        DataMain = DataMain + '&ServiceAddressOne=' + ServiceAddressOne;
        DataMain = DataMain + '&ServiceAddressTwo=' + ServiceAddressTwo;
        DataMain = DataMain + '&StateAbb=' + StateAbb;
        DataMain = DataMain + '&CityID=' + CityID;
        DataMain = DataMain + '&ZipCode=' + ZipCode;
        DataMain = DataMain + '&TDUID=' + TDUID;
        DataMain = DataMain + '&LoadProfile=' + LoadProfile;
        DataMain = DataMain + '&CongestionZoneID=' + CongestionZoneID;
        WeatherStationID = "1";
        DataMain = DataMain + '&WeatherStationID=' + WeatherStationID;
        DataMain = DataMain + '&BillCycle=' + BillCycle;
        DataMain = DataMain + '&LossCodeID=' + LossCodeID;
        DataMain = DataMain + '&TDUTariffID=' + TDUTariffID;
        DataMain = DataMain + '&FacilityName=' + FacilityName
        urlMain = urlMain + DataMain;
        var ResultData = ReturnDataFromService(urlMain);
        if (ResultData == "SUCCESS") {
            alertify.success(UtilityAccountNumber + ' successfully updated');
        } else {
            if (ResultData == "DUPLICATE") {
                alertify.error(UtilityAccountNumber + ' already exists.   You cannot duplicate a utility account number');
            } else if (ResultData == "DNE") {
                alertify.error(UtilityAccountNumber + ' does not exist.   Please either add it or use a different utility account number');
            }
        }
        FacilityUtilityAccountSetUp(CustomerID);
    } catch (e) {
        HeaderDataErrorReport(e);
    }
}
function CheckFacilityUpsert(Status) {
    try {
        // Ensure Customer Is Selected
        var CustomerID = $('#SelCustomer').val();            
        // Check if Utility Account Number exists
        var UtilityAccountNumber = $('#FacilityAutoCompleteList_Facility').val();
        UtilityAccountNumber = UtilityAccountNumber.trim();
        var FacilityName = $('#facility_name').val();                
        FacilityName = FacilityName.trim();
        if ((CustomerID == 0) || (CustomerID == null)) {
            msg = "Please select a customer";
            alertify.alert(msg);
            return;
        } 
        if ((UtilityAccountNumber == null) || (UtilityAccountNumber == '')) {
            msg = 'Please fill out the utility account number.   Please note nothing is saved';
            alertify.error(msg); 
            return;
        } else if ((FacilityName == null) || (FacilityName == '')) { 
            msg = 'Please fill out the facility name.   Please note nothing is saved';
            alertify.error(msg);
            return;
        }
        var urlMain = '/Services/Facility.svc/FacilityGetInfo';
        var DataMain = '?UtilityAccountNumber=' + UtilityAccountNumber;        
        urlMain = urlMain + DataMain;
        var ResultData = ReturnDataFromService(urlMain);
        var lnResultData = ResultData.length;
        var FacilityName = $('#facility_name').val();                
        // Create message and send it
        if ((lnResultData != null) && (lnResultData != 0) && (Status == 'New')) {
            // Facility already exists for new facility
            var CustomerNameOld = ResultData[0].CustomerName;
            var FacilityNameOld = ResultData[0].FacilityName;
            if (FacilityNameOld == FacilityName) {
                msg = 'Facility Name ' + FacilityName + ' already exists or press save.   Please choose a different facility name.  No records were saved';
                alertify.error(msg);
                return;
            } else {
                msg = 'This Utility Account Number is already tied to ' + FacilityNameOld + ' under ' + CustomerNameOld;
                msg = msg + '.  Are you sure you want to add this facility?';
                msg = msg + '.  Please note that this action will remove the utility account number from ' + FacilityNameOld + '?';
                alertify.confirm(msg, function () { FacilityUpsert(Status);});
                
            }
        } else if (((lnResultData == null) || (lnResultData == 0)) && (Status == 'New')) {
            // Facility already does not exists for new facility            
            msg = 'Are you sure you want to add ' + FacilityName + '?';
            alertify.confirm(msg, function () { FacilityUpsert(Status); });
        } else if (((lnResultData == null) || (lnResultData == 0)) && (Status == 'New')) {
            // Facility does not currently exist for a save             
            msg = 'Are you sure you want to add ' + FacilityName + '?';
            alertify.confirm(msg, function () { FacilityUpsert(Status); });
        } else if (((lnResultData != null) && (lnResultData != 0)) && (Status == 'Save')) {
            // Facility already exists for currently exist for a save 
            UtilityAccountNumberOld = ResultData[0].UtilityAccountNumber;            
            UtilityAccountNumberOld = UtilityAccountNumberOld.trim();            
            if (UtilityAccountNumber != UtilityAccountNumberOld) {
                msg = 'Are you sure you want to change the utility account number for ' + FacilityName + '?';
            } else {
                msg = 'Are you sure you want to save the changes to ' + FacilityName + '?';
            }            
            alertify.confirm(msg, function () { FacilityUpsert(Status); });
        } else if (((lnResultData == null) || (lnResultData == 0)) && (Status == 'Save')) {
            msg = 'Are you sure you want to change the utility account number for ' + FacilityName + '?';
            alertify.confirm(msg, function () { FacilityUpsert(Status); });
        }       
        
    } catch (e) {
        HeaderDataErrorReport(e);
    }   

}
function facility_clear_all() {
    try {
        // Clear Everything On The Screen
        var blank_text = ''
        var blank_selection = 0
        $('#FacilityAutoCompleteList_Facility').val(blank_text);        
        $('#facility_name').val(blank_text);        
        $('#ServiceAdd1').val(blank_text);
        $('#ServiceAdd2').val(blank_text);        
        $('#SelCity').val(blank_selection)
        $('#SelTDU').val(blank_selection);
        $('#FacilityAutoCompleteList_LoadProfile').val(blank_selection );
        $('#SelCongestionZones').val(blank_selection );
        $('#SelWeatherStation').val(blank_selection );
        $('#BillingCycle').val(blank_selection);
        $('#SelLossCode').val(blank_selection);
        $('#SelTDUTariff').val(blank_selection);
        $('#ZipCode').val(blank_text);     
    }
    catch (e) {
        HeaderDataErrorReport(e);
    }   
}
//*******************************************************************
//Start AutoComplete
//*******************************************************************
function UtilityAccountNumberautocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function (e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/                    
                    if (inp.value != undefined) {
                        alertify.success("Selected Value is " + inp.value);
                        FacilityGetInfo(inp.value,'');
                        $('#UtilityAccountStatus').html("Utility Account Number Exists");
                    } else {
                        FacilityGetInfo('N/A','');                        
                    }
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}



function FacilityNameautocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function (e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    if (inp.value != undefined) {
                        alertify.success("Selected Value is " + inp.value);
                        //FacilityGetInfo(inp.value);
                        FacilityGetInfo('',inp.value);
                        $('#facility_name').html("Facility Name");
                    } else {                        
                        FacilityGetInfo('', inp.value);
                    }
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}
// End AutoComplete


