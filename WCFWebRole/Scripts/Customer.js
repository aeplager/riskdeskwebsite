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
        var CustomerName;
        var BillingAdd1;
        var BillingAdd2;
        var CityID;
        var StateAbb;
        var ZipCode;
        var LineOfBusinessID;
        for (var iRows in ResultData) {
            CustomerName = ResultData[iRows].CustomerName;
            BillingAdd1 = ResultData[iRows].BillingAdd1;
            BillingAdd2 = ResultData[iRows].BillingAdd2;
            CityID = ResultData[iRows].CityID;
            StateAbb = ResultData[iRows].StateAbb;
            ZipCode = ResultData[iRows].ZipCode ;
            LineOfBusinessID = ResultData[iRows].LineOfBusinessID;
        }
        if ((CityID == "") || (CityID == null)) { CityID = 0;}
        $('#txtCustomerName').val(CustomerName);
        $('#BillingAdd1').val(BillingAdd1);
        $('#BillingAdd2').val(BillingAdd2);
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
        var ZipCode = $('#ZipCode').val();
        var StateAbb = $('#SelState').val();
        var CityID = $('#SelCity').val();
        var LineOfBusinessID = $('#SelLineOfBusiness').val();
        var urlMain = '/Services/Customers.svc/CustomerUpsert?';
        var DataMain = 'CustomerID=' + $('#SelCustomer').val();
        if (CustomerName.trim() == "") { CustomerName = "N/A"; }
        if (BillingAddrOne.trim() == "") { BillingAddrOne = "N/A"; }
        if (BillingAddrTwo.trim() == "") { BillingAddrTwo = "N/A"; }
        if (ZipCode.trim() == "") { ZipCode = "N/A"; }
        if (CityID.trim() == "") { CityID = "0"; }
        if (LineOfBusinessID.trim() == "") { LineOfBusinessID = "0"; }
        DataMain = DataMain + "&CustomerName=" + CustomerName;
        DataMain = DataMain + "&BillingAddrOne=" + BillingAddrOne;
        DataMain = DataMain + "&BillingAddrTwo=" + BillingAddrTwo;
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