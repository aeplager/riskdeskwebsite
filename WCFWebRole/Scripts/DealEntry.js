function DealCustomerInfoList_Change() {
    try {
    // Select the customer and display the deals in the deals combo box
    //ReturnDataFromService
    //SpecificCustomerDealsGetInfo?CustomerID=
    $('#DealInfoList_Deal').empty();
    $('#DealInfoList_Deal').append('<option value="' + 0 + '">' + '-Deal-' + '</option>')
    var urlMain = '/WCFWebService.svc/SpecificCustomerDealsGetInfo';
    var CustomerID = $('#CustomerInfoList_Deal').val();        
    var DataUrl = '?CustomerID=' + CustomerID;
    urlMain = urlMain + DataUrl;
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