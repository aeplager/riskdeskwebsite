
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

function FacilityChangeFillDropdowns() {
    
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
        //alertify.success(CurrentUtilityAccountNumber);

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
        if (ResultData.length > 0) {
            var iRow = 0;
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
function FacilityUpsert() {
    try {
        ///FacilityUpsert?UtilityAccountNew={UtilityAccountNew}&UtilityAccountNumber={UtilityAccountNumber}&CustomerID={CustomerID}&ServiceAddressOne={ServiceAddressOne}&ServiceAddressTwo={ServiceAddressTwo}&StateAbb={StateAbb}&TDUID={TDUID}&LoadProfile={LoadProfile}&CongestionZoneID={CongestionZoneID}&WeatherStationID={WeatherStationID}&BillCycle={BillCycle}&LossCodeID={LossCodeID}&TDUTariffID={TDUTariffID}
        var UtilityAccountNew = '1';
        if ($('#UtilityAccountStatus').html() == "Utility Account Number Exists") {
            UtilityAccountNew = '0';
        }
        var UtilityAccountNumber = $('#FacilityAutoCompleteList_Facility').val();
        var message = "";
        if (UtilityAccountNew == '0') {
            message = "Are you sure you want to update utility account number:  " + UtilityAccountNumber + "?";
        } else {
            message = "Are you sure you want to add utility account number:  " + UtilityAccountNumber + "?";
        }
        alertify.confirm(message, function (e) {
            if (e) {
                var CustomerID = $('#SelCustomer').val();            
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
                if (CustomerID == 0) {
                    alertify.error("Please select a customer.   No action has been taken");
                } else {
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
                }   
            } else {
                alertify.success("No change implemented");
                return;
            }
        } );
    } catch (e) {
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


