// JavaScript source code
function HeaderDataErrorReport(e) {
    // Used to display save message
    alert(e);
}
function FunctionFailed(msg) {
    // Used for none specific error messages to be shown
    alert(msg);
}
function UploadFile() {
    // grab your file object from a file input
    try {
    fileData = document.getElementById("fileUpload").files[0];
    var data = new FormData($("#fileinfo"));    
    //var data = new FormData();    
    $.ajax({
        url: '/WCFWebService.svc/UploadFile?fileName=' + fileData.name,
        type: 'POST',
        data: fileData,
        cache: false,
        dataType: 'json',
        //async: false,
        processData: false, // Don't process the files
        contentType: "application/octet-stream", // Set content type to false as jQuery 
        // will tell the server its a query string request
        success: function (data) {
            alert('successful..');
        },
        error: function (data) {
            alert('Some error Occurred!');
        }
        });
        alert("complete");
    }
    catch (e) {
        HeaderDataErrorReport(e);
    }

}

function DownloadFile() {

    window.location("http://localhost:15849/FileUploadServ.svc/File/Custom/xls");
}
// DELETE
function PostFileToService() {
    var fd = new FormData($("#fileinfo"));
    //fd.append("CustomField", "This is some extra data");
    $.ajax({
        url: 'upload.php',
        type: 'POST',
        data: fd,
        success: function (data) {
            $('#output').html(data);
        },
        cache: false,
        contentType: false,
        processData: false
    });
}
// DELETE
function CityList_Reset(ControlToSet) {
    // Retrieves the list of cities and places them into the proper place
    try {
        // Empty the list box        
        $('#' + ControlToSet).empty();
        // Set up the list call
        var urlMain = '/WCFWebService.svc/CitiesForStateGetInfo';
        var DataUrl = '?StateAbb=' + '"' + "TX" + '"';
        urlMain = urlMain + DataUrl;
        $.ajax({
            type: "GET",
            contentType: "application/json; charset=utf-8",
            // Change Here To Change The Web Service Needed
            //url: "/AzureHooknLineAjax.svc/HelloWorld",
            url: urlMain,
            // Change Here To Change The Parameters Needed
            // data: "{}",
            dataType: "json",
            async: false,
            success: function (Result) {
                var iRow = -1;
                var SelectedItem = 'N/A';
                for (var i in Result) {
                    var CityName;
                    var CityID;
                    CityName = Result[i].CityName;
                    CityID = Result[i].CityID
                    $('#' + ControlToSet).append('<option value="' + CityID + '">' + CityName + '</option>')
                }
            },
            error: function (Result) {
                alert("Error");
            }
        });
    }
    catch (e) {
        HeaderDataErrorReport(e);
    }
}
function StateList_Reset(ControlToSet) {
    // Retrieves the list of cities and places them into the proper place
    try {
        // Empty the list box        
        $('#' + ControlToSet).empty();
        // Set up the list call
        var urlMain = '/WCFWebService.svc/StatesGetInfo';                
        $.ajax({
            type: "GET",
            contentType: "application/json; charset=utf-8",
            // Change Here To Change The Web Service Needed
            //url: "/AzureHooknLineAjax.svc/HelloWorld",
            url: urlMain,
            // Change Here To Change The Parameters Needed
            // data: "{}",
            dataType: "json",
            async: false,
            success: function (Result) {                
                var iRow = -1;
                var SelectedItem = 'N/A';
                for (var i in Result) {
                    var StateName;
                    var StateAbb;
                    StateName = Result[i].StateName;
                    StateAbb = Result[i].StateAbb
                    
                    $('#' + ControlToSet).append('<option value="' + StateAbb + '">' + StateName + '</option>')
                }
            },
            error: function (Result) {
                alert("Error");
            }
        });
    }
    catch (e) {
        HeaderDataErrorReport(e);
    }
}
function CustomerList_Reset(ControlToSet) {
    // Retrieves the list of cities and places them into the proper place
    try {
        // Empty the list box        
        $('#' + ControlToSet).empty();
        $('#' + ControlToSet).append('<option value="' + 0 + '">' + '-Customer-' + '</option>')
        // Set up the list call
        var urlMain = '/WCFWebService.svc/CustomersAllGetInfo';
        $.ajax({
            type: "GET",
            contentType: "application/json; charset=utf-8",
            // Change Here To Change The Web Service Needed
            //url: "/AzureHooknLineAjax.svc/HelloWorld",
            url: urlMain,
            // Change Here To Change The Parameters Needed
            // data: "{}",
            dataType: "json",
            async: false,
            success: function (Result) {
                var iRow = -1;
                var SelectedItem = 'N/A';
                for (var i in Result) {
                    var CustomerName;
                    var CustomerID;
                    CustomerName = Result[i].CustomerName;
                    CustomerID = Result[i].CustomerID
                    $('#' + ControlToSet).append('<option value="' + CustomerID + '">' + CustomerName + '</option>')
                }
            },
            error: function (Result) {
                alert("Error");
            }
        });
    }
    catch (e) {
        HeaderDataErrorReport(e);
    }
}
function CityAuto_Reset(ControlToSet) {
    // Retrieves the list of cities and places them into the proper place
    try {
        // Empty the list box        
        //$('#' + ControlToSet).empty();
        // Set up the list call
        var Test = [];
        Cities = [];
        var urlMain = '/WCFWebService.svc/CitiesForStateGetInfo';
        var DataUrl = '?StateAbb=' + '"' + "TX" + '"';
        urlMain = urlMain + DataUrl;
        $.ajax({
            type: "GET",
            contentType: "application/json; charset=utf-8",
            // Change Here To Change The Web Service Needed
            //url: "/AzureHooknLineAjax.svc/HelloWorld",
            url: urlMain,
            // Change Here To Change The Parameters Needed
            // data: "{}",
            dataType: "json",
            async: false,
            success: function (Result) {
                var iRow = -1;
                var SelectedItem = 'N/A';
                for (var i in Result) {
                    var CityName;
                    var CityID;
                    CityName = Result[i].CityName;
                    CityID = Result[i].CityID
                    //$('#' + ControlToSet).append('<option value="' + CityID + '">' + CityName + '</option>')
                    Cities.push(CityName);
                }
            },
            error: function (Result) {
                alert("Error");
            }
        });
        autocomplete(document.getElementById(ControlToSet), Cities);
    }
    catch (e) {
        HeaderDataErrorReport(e);
    }
}
function TDUInfoListReset(ControlToSet) {
    try {
        var urlMain = '/WCFWebService.svc/TDUAllGetInfo';        
        var ResultData = ReturnDataFromService(urlMain);
        var j = 0;
        $('#' + ControlToSet).empty();
        for (var i in ResultData) {
            var TDUID = ResultData[i].TDUID;
            var TDUName = ResultData[i].TDUName            
            $('#' + ControlToSet).append('<option value="' + TDUID + '">' + TDUName  + '</option>')
        }
    }
    catch (e) {
        HeaderDataErrorReport(e);
    }
}
function CongestionZoneInfoListReset(ControlToSet) {
    try {
        var urlMain = '/WCFWebService.svc/CongestionZoneAllGetInfo';
        var ResultData = ReturnDataFromService(urlMain);
        var j = 0;
        $('#' + ControlToSet).empty();
        for (var i in ResultData) {
            var CongestionZoneID = ResultData[i].CongestionZoneID;
            var CongestionZoneName = ResultData[i].CongestionZoneName
            $('#' + ControlToSet).append('<option value="' + CongestionZoneID + '">' + CongestionZoneName + '</option>')
        }
    }
    catch (e) {
        HeaderDataErrorReport(e);
    }
}
function ReturnDataFromService(urlMain) {
    try {       
        var ReturnData;
        $.ajax({
            type: "GET",
            contentType: "application/json; charset=utf-8",
            // Change Here To Change The Web Service Needed
            //url: "/AzureHooknLineAjax.svc/HelloWorld",
            url: urlMain,
            // Change Here To Change The Parameters Needed
            // data: "{}",
            dataType: "json",
            async: false,
            success: function (Result) {
                ReturnData = Result;
            },
            error: function (Result) {
                alert("Error");
            }
        });
        return ReturnData;
    }
    catch (e) {
        HeaderDataErrorReport(e);
    }
}
function SetMonths(ControlToSet) {
    //DealDateOfBirthMonth
    try {
        $('#' + ControlToSet).empty();
        $('#' + ControlToSet).append('<option value="' + 0 + '">' + '-Month-' + '</option > ')
        $('#' + ControlToSet).append('<option value="' + 1 + '">' + 'January' + '</option>')
        $('#' + ControlToSet).append('<option value="' + 2 + '">' + 'February' + '</option>')
        $('#' + ControlToSet).append('<option value="' + 3 + '">' + 'March' + '</option>')
        $('#' + ControlToSet).append('<option value="' + 4 + '">' + 'April' + '</option>')
        $('#' + ControlToSet).append('<option value="' + 5 + '">' + 'May' + '</option>')
        $('#' + ControlToSet).append('<option value="' + 6 + '">' + 'June' + '</option>')
        $('#' + ControlToSet).append('<option value="' + 7 + '">' + 'July' + '</option>')
        $('#' + ControlToSet).append('<option value="' + 8 + '">' + 'August' + '</option>')
        $('#' + ControlToSet).append('<option value="' + 9 + '">' + 'September' + '</option>')
        $('#' + ControlToSet).append('<option value="' + 10 + '">' + 'October' + '</option>')
        $('#' + ControlToSet).append('<option value="' + 11 + '">' + 'November' + '</option>')
        $('#' + ControlToSet).append('<option value="' + 12 + '">' + 'December' + '</option>')

    }
    catch (e) {
        HeaderDataErrorReport(e);
    }
}
function SetDays(ControlFrom, ControlToSet) {
    try {
        var MonthNumber = $('#' + ControlFrom).val();
        var daysInMonth = 31;
        if (MonthNumber == 4 || MonthNumber == 6 || MonthNumber == 9 || MonthNumber == 11) { daysInMonth = 30; }
        else if (MonthNumber == 2) { daysInMonth = 29; }
        $('#' + ControlToSet).empty();
        $('#' + ControlToSet).append('<option value="' + 0 + '">' + '-Day-' + '</option>')
        for (i = 1; i <= daysInMonth; i++) {
            
            $('#' + ControlToSet).append('<option value="' + i + '">' + i + '</option>')
        }
    }
    catch (e) {
        HeaderDataErrorReport(e);
    }
}
function SetYearsAvailable(ControlToSet) {
    try {
        $('#' + ControlToSet).empty();
        $('#' + ControlToSet).append('<option value="' + 0 + '">' + '- Year -' + '</option>')                
        for (i = 2010; i <= 2050; i++) {
            $('#' + ControlToSet).append('<option value="' + i + '">' + i + '</option>')            
        }

    }
    catch (e) {
        HeaderDataErrorReport(e);
    }
}
function SetYear(ControlToSet, Yr) {
    try {
        var NewYr = Yr - 2010 + 1;
        $('#' + ControlToSet).val(NewYr);
    }
    catch (e) {
        HeaderDataErrorReport(e);
    }
}