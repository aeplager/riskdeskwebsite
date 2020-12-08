function CustomerFillDropdowns() {
    try {
        CustomerDropDownFill();        
        CustomerStateDropDownFill();
        CustomerCityDropDownFill();
        CustomerLineOfBusinessDropDownFill();
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
function CustomerDropDownFill() {
    try {
        $('#SelCustomer').empty();
        AddItemsToSelector("SelCustomer", "--Customer--", 0);            
        var urlMain = '/Services/Customers.svc/CustomersGetInfo';
        var ResultData = ReturnDataFromService(urlMain);
        for (var iRows in ResultData) {
            AddItemsToSelector("SelCustomer", ResultData[iRows].CustomerName, ResultData[iRows].CustomerID);            
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
function CustomerSelectCustomer() {
    try {
        var urlMain = '/Services/Customers.svc/CustomersGetInfo?';
        var DataMain = 'CustomerID=' + $('#SelCustomer').val();
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
        
        $('#CreditScore').val(BlankValue);
        $('#DUNSNumber').val(BlankValue);
        $('#PhoneNumber').val(BlankValue);
        $('#txtCustomerName').val(BlankValue );
        $('#BillingAdd1').val(BlankValue);
        $('#BillingAdd2').val(BlankValue);
        $('#BillingAdd3').val(BlankValue);
        $('#ZipCode').val(ZipCode);
        $('#SelState').val('');
        $('#SelCity').val(CityID);
        $('#SelLineOfBusiness').val(LineOfBusinessID);

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

        $('#txtCustomerName').val(CustomerName);
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
function CustomerUpdateCustomer() {
    try {
        var CustomerID = $('#SelCustomer').val();
        var CustomerName = $('#txtCustomerName').val();
        var BillingAddrOne = $('#BillingAdd1').val();
        var BillingAddrTwo = $('#BillingAdd2').val();
        var BillingAddrThree = $('#BillingAdd3').val();
        var DunsNumber = $('#DUNSNumber').val();        
        var CreditScore = $('#CreditScore').val();
        var PhoneNumber = $('#PhoneNumber').val();
        var ZipCode = $('#ZipCode').val();
        var StateAbb = $('#SelState').val();
        var CityID = $('#SelCity').val();
        //  Trim 
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
        var DataMain = 'CustomerID=' + $('#SelCustomer').val();
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
            var CustomerID = SelectorFindByText("SelCustomer", CustomerName);            
        } else {
            alertify.error("Customer information:  " + ResultData);
        }
        CustomerDropDownFill();
        if (CustomerID != 0) {
            $("#SelCustomer").val(CustomerID);
            CustomerSelectCustomer();
        } else {
        }
    } catch (e) {
        HeaderDataErrorReport(e);
    }
}
function CustomerNewCustomer() {
    try {
        var CustomerID = 0;        
        $("#SelCustomer").val(CustomerID).change();        
        $('#txtCustomerName').val("");
        $('#BillingAdd1').val("");
        $('#BillingAdd2').val("");
        $('#ZipCode').val("");        
        $('#SelState').val("TX").change();        
        $('#SelCity').val(CustomerID).change();        
        $('#SelLineOfBusiness').val(CustomerID).change();                
    } catch (e) {
        HeaderDataErrorReport(e);
    }
}