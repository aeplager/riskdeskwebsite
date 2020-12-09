function CustomerFillDropdowns() {
    try {
        //CustomerDropDownFill();        
        CustomerStateDropDownFill();
        CustomerCityDropDownFill();
        CustomerLineOfBusinessDropDownFill();
    } catch (e) {
        HeaderDataErrorReport(e);
    }
}
function CustomerDropDownFill(selName) {
    try {

        var urlMain = '/Services/Customers.svc/CustomersGetInfo'
        var ResultData = ReturnDataFromService(urlMain);
        for (var iRows in ResultData) {
            AddItemsToSelector(selName, ResultData[iRows].CustomerName, ResultData[iRows].CustomerID);
        }

    } catch (e) {
        HeaderDataErrorReport(e);
    }
}
function FixPhoneNumber() {
    try {
        var PhoneNumber = $('#PhoneNumber').val();
        PhoneNumber = PhoneNumber.replaceAll('-', '');
        PhoneNumber = PhoneNumber.replaceAll(')', '');
        PhoneNumber = PhoneNumber.replaceAll('(', '');
        PhoneNumber = PhoneNumber.replaceAll(' ', '');        
        var firstletter = PhoneNumber.substring(0, 1);
        if (firstletter == '1') {            
            var ln = PhoneNumber.length;
            PhoneNumber = PhoneNumber.substring(1, ln + 1);
        }                
        if ((PhoneNumber.length == 10) && (isNumeric(PhoneNumber) == true)) {            
            var res = PhoneNumber.substring(0, 3);
            res = res + '-' + PhoneNumber.substring(3, 6);
            res = res + '-' + PhoneNumber.substring(6, 10);
            PhoneNumber = res;
            $('#PhoneNumber').val(PhoneNumber);
        } else {
            alertify.error("Phone Number is not in the correct format");
        }
    } catch (e) {
        HeaderDataErrorReport(e);
    }
}
function CustomerCityDropDownFill() {
    try {        
        $('#SelCity').empty();
        AddItemsToSelector("SelCity", "--City--", 0);
        var urlMain = '/Services/SharedInfo.svc/CityGetInfo/?CityID=0';
        var ResultData = ReturnDataFromService(urlMain);
        for (var iRows in ResultData) {
            AddItemsToSelector("SelCity", ResultData[iRows].CityName, ResultData[iRows].CityID);
        }

    } catch (e) {
        HeaderDataErrorReport(e);
    }
}
function CustomerLineOfBusinessDropDownFill() {
    try {
        $('#SelLineOfBusiness').empty();
        AddItemsToSelector("SelLineOfBusiness", "--Line of Business--", 0);
        var urlMain = '/Services/SharedInfo.svc/LineOfBusinessGetInfo/?LineOfBusinessID=0';
        var ResultData = ReturnDataFromService(urlMain);
        for (var iRows in ResultData) {
            AddItemsToSelector("SelLineOfBusiness", ResultData[iRows].SelectorText, ResultData[iRows].SelectorID);
        }
    } catch (e) {
        HeaderDataErrorReport(e);
    }
}
function CustomerStateDropDownFill() {
    try {
        $('#SelState').empty();
        AddItemsToSelector("SelCity", "--State--", 0);
        var urlMain = '/Services/SharedInfo.svc/StatesGetInfo';
        var ResultData = ReturnDataFromService(urlMain);                
        for (var iRows in ResultData) {
            AddItemsToSelector("SelState", ResultData[iRows].SelectorText, ResultData[iRows].SelectorID);
        }
        $('#SelState').val('TX');

    } catch (e) {
        HeaderDataErrorReport(e);
    }
}
function ClearAllExceptCustomerName() {
    try {
        var BlankValue = "";
        var StartValue = 0;
        $('#BillingAdd1').val(BlankValue);
        $('#BillingAdd2').val(BlankValue);
        $('#BillingAdd3').val(BlankValue);

        $('#SelState').val(BlankValue);
        $('#SelCity').val(StartValue);
        $('#ZipCode').val(BlankValue);

        $('#PhoneNumber').val(BlankValue);
        $('#SelLineOfBusiness').val(StartValue);
        $('#DUNSNumber').val(BlankValue);
        $('#CreditScore').val(BlankValue);
        
    } catch (e) {
        HeaderDataErrorReport(e);
    }
}


function CustomerSelectCustomer(CustomerSearchType, CustomerName) {
    try {
        var urlMain = '/Services/Customers.svc/CustomersGetInfo?';
        var DataMain = '';
        if (CustomerSearchType == 'CustomerName') {
            DataMain = 'CustomerName=' + CustomerName;
        } else {
            DataMain = 'CustomerID=0';
        }
        
        urlMain = urlMain + DataMain;
        var ResultData = ReturnDataFromService(urlMain);
        var BlankValue = '';
        var CustomerName = BlankValue;
        var BillingAdd1 = BlankValue;
        var BillingAdd2 = BlankValue ;
        var BillingAdd3 = BlankValue;
        var DUNSNumber = BlankValue;
        var CreditScore = BlankValue;
        var CreditScoreText = BlankValue;
        var PhoneNumber = BlankValue;
        var CityID = 0;
        var StateAbb = BlankValue;
        var ZipCode = BlankValue;
        var LineOfBusinessID = 0;
        // Clear All Values
        ClearAllExceptCustomerName();
      

        for (var iRows in ResultData) {
            CustomerName = ResultData[iRows].CustomerName;
            BillingAdd1 = ResultData[iRows].BillingAdd1;
            BillingAdd2 = ResultData[iRows].BillingAdd2;
            BillingAdd3 = ResultData[iRows].BillingAdd3;
            DUNSNumber = ResultData[iRows].DUNSNumber;
            CreditScore = ResultData[iRows].CreditScore;
            CreditScoreText = ResultData[iRows].CreditScoreText;
            PhoneNumber = ResultData[iRows].PhoneNumber;
            CityID = ResultData[iRows].CityID;
            StateAbb = ResultData[iRows].StateAbb;
            ZipCode = ResultData[iRows].ZipCode ;
            LineOfBusinessID = ResultData[iRows].LineOfBusinessID;
        }
        if ((CityID == "") || (CityID == null)) { CityID = 0; }
        $('#CreditScore').val(CreditScoreText);
        $('#DUNSNumber').val(DUNSNumber);        
        $('#PhoneNumber').val(PhoneNumber);

        //$('#txtCustomerName').val(CustomerName);
        $('#BillingAdd1').val(BillingAdd1);
        $('#BillingAdd2').val(BillingAdd2);
        $('#BillingAdd3').val(BillingAdd3);
        $('#ZipCode').val(ZipCode);
        $('#SelState').val(StateAbb);
        $('#SelCity').val(CityID);
        $('#SelLineOfBusiness').val(LineOfBusinessID);
        alertify.success("Selection Complete");
    } catch (e) {
        HeaderDataErrorReport(e);
    }
}
function CustomerConfirmUpdate() {
    try {
        var CustomerName = $('#customer_name').val();
        var urlMain = '/Services/Customers.svc/CustomersGetInfo?';
        var DataMain = 'CustomerName=' + CustomerName;
        urlMain = urlMain + DataMain;
        var ResultData = ReturnDataFromService(urlMain);
        var CustomerID = 0;
        if (ResultData.length == 0) {
            alertify.confirm('Are you sure you want to add a this ' + CustomerName + ' as a new customer?', function () { CustomerUpdateCustomer(CustomerID); }).set({ title: "Virtual Risk Desk" });
        } else {
            alertify.confirm('Are you sure you want to save ' + CustomerName + '?', function () { CustomerUpdateCustomer(CustomerID); }).set({ title: "Virtual Risk Desk" });
            for (var iRows in ResultData) {
                CustomerID = ResultData[iRows].CustomerID;
            }
        }
    } catch (e) {
        HeaderDataErrorReport(e);
    }
}
function CustomerUpdateCustomer(CustomerID) {
    try {        
        var CustomerName = $('#customer_name').val();
        var BillingAddrOne = $('#BillingAdd1').val();
        var BillingAddrTwo = $('#BillingAdd2').val();
        var BillingAddrThree = $('#BillingAdd3').val();
        var DunsNumber = $('#DUNSNumber').val();        
        var CreditScore = $('#CreditScore').val();
        var PhoneNumber = $('#PhoneNumber').val();
        var ZipCode = $('#ZipCode').val();
        var StateAbb = $('#SelState').val();
        var CityID = $('#SelCity').val();        
        DunsNumber = DunsNumber.trim();
        CreditScore = CreditScore.trim();
        BillingAddrOne = BillingAddrOne.trim();
        BillingAddrTwo = BillingAddrTwo.trim();
        BillingAddrThree = BillingAddrThree.trim();
        PhoneNumber = PhoneNumber.trim();
        ZipCode = ZipCode.trim();
        CustomerName = CustomerName.trim();
        var LineOfBusinessID = $('#SelLineOfBusiness').val();
        var urlMain = '/Services/Customers.svc/CustomerUpsert?';
        var DataMain = 'CustomerID=' + CustomerID;// + $('#SelCustomer').val();
        if (CustomerName.trim() == "") { CustomerName = "N/A"; }
        if (BillingAddrOne.trim() == "") { BillingAddrOne = "N/A"; }
        if (BillingAddrTwo.trim() == "") { BillingAddrTwo = "N/A"; }
        if (BillingAddrThree.trim() == "") { BillingAddrThree = "N/A"; }        
        if (ZipCode.trim() == "") { ZipCode = "N/A"; }
        if (CityID.trim() == "") { CityID = "0"; }
        if (LineOfBusinessID.trim() == "") { LineOfBusinessID = "0"; }
        if (DunsNumber.trim() == "") { DunsNumber = "0"; }
        if (CreditScore.trim() == "") { CreditScore = "0"; }
        DataMain = DataMain + "&CustomerName=" + CustomerName;
        DataMain = DataMain + "&BillingAddrOne=" + BillingAddrOne;
        DataMain = DataMain + "&BillingAddrTwo=" + BillingAddrTwo;
        DataMain = DataMain + "&BillingAddrThree=" + BillingAddrThree;        
        DataMain = DataMain + "&DUNSNumber=" + DunsNumber;
        DataMain = DataMain + "&CreditScore=" + CreditScore;
        DataMain = DataMain + "&PhoneNumber=" + PhoneNumber;
        DataMain = DataMain + "&ZipCode=" + ZipCode;
        DataMain = DataMain + "&CityID=" + CityID;
        DataMain = DataMain + "&LineOfBusinessID=" + LineOfBusinessID;
        DataMain = DataMain + "&StateAbb=" + StateAbb;
        urlMain = urlMain + DataMain; 
        var ResultData = ReturnDataFromService(urlMain);
        if (ResultData == "SUCCESS") {
            alertify.success("Customer Information Saved");
        } else if (ResultData == "DUPLICATE") {
            alertify.error(CustomerName + " already exists.  No duplicate customer names are allowed.   The system has selected " + CustomerName + " for you.  Please make your changes on the selected customer.");
            //var CustomerID = SelectorFindByText("SelCustomer", CustomerName);            
        } else {
            alertify.error("Customer information:  " + ResultData);
        }
        customer_name_load();
        $('#customer_name').val(CustomerName); 
        CustomerSelectCustomer('CustomerName', CustomerName)
        //CustomerDropDownFill();
        //if (CustomerID != 0) {
        //    $("#SelCustomer").val(CustomerID);
        //    CustomerSelectCustomer('CustomerID','');
        //}
        //    else {
        //}
    } catch (e) {
        HeaderDataErrorReport(e);
    }
}
function CustomerNewCustomer() {
    try {
        var CustomerID = 0;        
        $('#customer_name').val("");

        //$("#SelCustomer").val(CustomerID).change();        
        //$('#txtCustomerName').val("");
        
        $('#BillingAdd1').val("");
        $('#BillingAdd2').val("");
        $('#BillingAdd3').val("");
        $('#ZipCode').val("");        
        $('#SelState').val("TX").change();        
        $('#SelCity').val(CustomerID).change();        
        $('#SelLineOfBusiness').val(CustomerID).change();                
        $('#PhoneNumber').val("");
        $('#DUNSNumber').val("");
        $('#CreditScore').val(0);
        $('#customer_name').val("");
    } catch (e) {
        HeaderDataErrorReport(e);
    }
}
function ChangeCustomerName() {
    try {

        
        var customer_name = $('#customer_name').val();
        alertify.prompt('Virtual Risk Desk', 'Are you sure you want to change the customer name to ' + customer_name + '?', customer_name
            , function (evt, value) {
                
                var urlMain = '/Services/Customers.svc/CustomerNameUpsert';
                var DataMain = '?CustomerOldName=' + customer_name + '&' + 'CustomerNewName=' + value;               
                urlMain = urlMain + DataMain;
                var ResultData = ReturnDataFromService(urlMain);
                if (ResultData == "SUCCESS") {
                    alertify.success(customer_name + ' changed to: ' + value)
                    customer_name_load();
                    var CustomerSearchType = 'CustomerName';
                    var CustomerName = value;
                    $('#customer_name').val(CustomerName);
                    CustomerSelectCustomer(CustomerSearchType, CustomerName);
                } else if (ResultData == "DUPLICATE") {
                    alertify.error('The name ' + value + ' already exists, please select a different customer name.   No change was executed');
                    customer_name_load();
                    var CustomerSearchType = 'CustomerName';
                    var CustomerName = value;
                    CustomerSelectCustomer(CustomerSearchType, customer_name);
                } else {
                    alertify.error('You had a system error.   Please contact your system administrator');
                } 
            }
            , function () { alertify.error('No Change Was Executed') }
        ).set({ title: "Virtual Risk Desk" });
    } catch (e) {
        HeaderDataErrorReport(e);
    }
}

// Autocomplete For Customers
function customer_name_autocomplete(inp, arr) {
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
                        CustomerSelectCustomer('CustomerName', inp.value);
                        //FacilityGetInfo('', inp.value);
                        $('#customer_name').html("Customer Name");
                    } else {                        
                        //CustomerSelectCustomer('', inp.value);
                        CustomerSelectCustomer('CustomerName', inp.value);
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
        else if (e.keyCode == 9) {
            // Tab Key Code
            var CustomerName = $('#customer_name').val();
            CustomerSelectCustomer('CustomerName', CustomerName);
        }
    });
    //inp.addEventListener("keyup", function (e) {
    //    alertify.success('keyup')
    //});

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

function customer_name_load() {
    try {
        // *********************************************
        // Fills The Customer name field
        // *********************************************
        var customers_2 = [];
        var customers_blank = [];

        autocomplete(document.getElementById("customer_name"), customers_blank);
        //var CustomerID = "0";
        var urlMain = '/Services/Customers.svc/CustomersGetInfo';
        var DataMain = '?CustomerID=0';
        urlMain = urlMain + DataMain;
        var ResultData = ReturnDataFromService(urlMain);
        ControlToSet = "customer_name";
        for (var i in ResultData) {
            customers_2.push(ResultData[i].CustomerName);            
        }                
        customer_name_autocomplete(document.getElementById("customer_name"), customers_2);

    } catch (e) {
        HeaderDataErrorReport(e);
    }
}