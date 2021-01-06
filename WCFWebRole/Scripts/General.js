function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
function isDate(yr, mnth, day) {
    try {
        var d = new Date(yr, mnth, day);
        return true;
    } catch(e) {
        return false
    }
}
function AddItemsToSelector(NameOfSelector, SelectorText, SelectorID) {
    try {
        $("#" + NameOfSelector).append(new Option(SelectorText, SelectorID));
    } catch (e) {
        HeaderDataErrorReport(e);
    }
}
function GeneralSelFill(selName, selInitialValue, urlMain) {
    try {
        $('#' + selName).empty();
        AddItemsToSelector(selName, selInitialValue, 0);        
        var ResultData = ReturnDataFromService(urlMain);
        for (var iRows in ResultData) {
            AddItemsToSelector(selName, ResultData[iRows].SelectorText, ResultData[iRows].SelectorID);
        }        

    } catch (e) {
        HeaderDataErrorReport(e);
    }
}

// JavaScript source code
function HeaderDataErrorReport(e) {
    // Used to display save message
    alertify.error(e);
    //alert(e);
}
function FunctionFailed(msg) {
    // Used for none specific error messages to be shown
    alert(msg);
}
function ReturnUserName() {
    // Once Security Is Added This Will Change
    return 'N/A';
}
function UploadFile() {
    // grab your file object from a file input
    try {
    fileData = document.getElementById("fileUpload").files[0];
    var data = new FormData($("#fileinfo"));    
    //var data = new FormData();    
    $.ajax({
        url: '/Services/WCFWebService.svc/UploadFile?fileName=' + fileData.name,
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
function FillDropDown(selControl, StoredProc, FirstRec) {
    try {
        var urlMain = '/Services/WCFWebService.svc/WebSiteDropDownSelectorGetInfo';
        var DataUrl = '?StoredProc=' + StoredProc;
        // Clear the Drop Down
        urlMain = urlMain + DataUrl;
        $('#' + selControl).empty();
        var SelectorID = 0;
        var SelectorText = FirstRec;
        var ResultData = ReturnDataFromService(urlMain);
        $('#' + selControl).append('<option value="' + SelectorID + '"> - ' + SelectorText + ' - </option>')
        for (var i in ResultData) {
            SelectorID = ResultData[i].SelectorID;
            SelectorText = ResultData[i].SelectorText
            $('#' + selControl).append('<option value="' + SelectorID + '">' + SelectorText + '</option>')
        }
    } catch (e) {
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
        var urlMain = '/Services/WCFWebService.svc/CitiesForStateGetInfo';
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
        var urlMain = '/Services/WCFWebService.svc/StatesGetInfo';                
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
        var urlMain = '/Services/WCFWebService.svc/CustomersGetInfo?CustomerID=0';
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
        var urlMain = '/Services/WCFWebService.svc/CitiesForStateGetInfo';
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
        var urlMain = '/Services/WCFWebService.svc/TDUAllGetInfo';        
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
        var urlMain = '/Services/WCFWebService.svc/CongestionZoneAllGetInfo';
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
                alertify.error(Result.statusText);
            }
        });
        return ReturnData;
    }
    catch (e) {
        HeaderDataErrorReport(e);
    }
}
function ReturnDataFromServicePOST(urlMain) {
    try {      
            $.ajax({
                type: "GET",
                contentType: "application/json; charset=utf-8",
                // Change Here To Change The Web Service Needed
                //url: "/AzureHooknLineAjax.svc/HelloWorld",
                url: urlMain,
                // Change Here To Change The Parameters Needed
                // data: "{}",
                dataType: "jsonp",                
                crossDomain: true,
                async: false,
                success: function (Result) {
                    ReturnData = Result;
                },
                error: function (Result) {
                    if (Result.statusText != 'success') {
                        alertify.error(Result.statusText);
                    }
                    ResultData = Result;
                }
            }); 
        return ReturnData; 
    }
    catch (e) {
        HeaderDataErrorReport(e);
    }
}

async function fetch_my_data(_url, _dat) {

    async function promised_fetch(_url, _dat) {

        return new Promise((resolve, reject) => {
            $.ajax({
                url: _url,
                data: _dat,
                type: 'POST',
                success: (response) => {
                    resolve(JSON.parse(response));
                },
                error: (response) => {
                    reject(response);
                }
            });
        });
    }

    var _data = await promised_fetch(_url, _dat);

    return _data;
}
async function ReturnDataFromServiceAsync2(urlMain){
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
            async: true,
            success: function (Result) {
                ReturnData = Result;
            },
            error: function (Result) {
                alertify.error(Result.statusText);
            }
        });
        return ReturnData;
    }
    catch (e) {
        HeaderDataErrorReport(e);
    }
}
function ReturnDataFromServiceAsync(urlMain) {
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
            async: true,
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
//function ReturnDataFromServicePost(urlMain) {
//    try {
//        var ReturnData;
//        $.ajax({
//            type: "POST",
//            contentType: "application/json; charset=utf-8",
//            // Change Here To Change The Web Service Needed
//            //url: "/AzureHooknLineAjax.svc/HelloWorld",
//            url: urlMain,
//            // Change Here To Change The Parameters Needed
//            // data: "{}",
//            dataType: "json",
//            async: false,
//            success: function (Result) {
//                ReturnData = Result;
//            },
//            error: function (Result) {
//                alert("Error");
//            }
//        });
//        return ReturnData;
//    }
//    catch (e) {
//        HeaderDataErrorReport(e);
//    }
//}



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
        for (i = 2019; i <= 2050; i++) {
            $('#' + ControlToSet).append('<option value="' + i + '">' + i + '</option>')            
        }

    }
    catch (e) {
        HeaderDataErrorReport(e);
    }
}
function SetYear(ControlToSet, Yr) {
    try {
        var NewYr = Yr - 2019 + 1;
        $('#' + ControlToSet).val(NewYr);
    }
    catch (e) {
        HeaderDataErrorReport(e);
    }
}
function ObtainDateSuffix(FileName) {
    try {
        var urlMain = "/Services/WCFWebService.svc/ObtainDateSuffix?";
        var DataMain = "FileName=" + FileName;
        //var urlMain = '/Services/WCFWebService.svc/GenericFileUpsert?';
        //var DataMain = 'FileName=' + FileName + '&FileTypeName=' + FileTypeName + '&ContainerName=' + ContainerName + '&RandomNumber=' + RandomNumber;
        var urlMain = urlMain + DataMain;        
        var ResultData = ReturnDataFromService(urlMain);
        var j = 0;        
        return ResultData;
    }
    catch (e) {
        HeaderDataErrorReport(e);
    }
}
function ImportFile(FileType) {
    try {
        var msg = "Please confirm that you save all of these ";
        if (FileType == "CUST") {
            msg = msg + "customers";
        } else if (FileType == "DEAL") {
            msg = msg + "deals";
        } else if (FileType == "ICECURVE") {
            msg = msg + "files";
        }

        alertify.confirm(msg, function (e) {
            if (e) {
                if (FileType == "CUST") {
                    // Update the customers
                    var UserName = ReturnUserName();
                    msg = "All customers updated!!!"
                    var urlMain = "/Services/WCFWebService.svc/CustomerValidatedFileUpsert";
                    var ResultData = ReturnDataFromService(urlMain);
                    var j = 0;
                    var FileID = LogFileUploadStatus(0, FileNameUpload, 'IMTBL', FileType, UserName);
                    var iLimit = myValidation.fnGetData().length;
                    for (i = 1; i <= iLimit; i++) {
                        myValidation.fnDeleteRow(0);
                    }
                } else if (FileType == "DEALINDIV") {
                    var UserName = ReturnUserName();
                    msg = "All deals updated!!!"                    
                    var urlMain = "/Services/Deals.svc/DealsValidatedFileUpsert";
                    var ResultData = ReturnDataFromService(urlMain);
                    var j = 0;
                    var FileID = LogFileUploadStatus(0, FileNameUpload, 'IMTBL', FileType, UserName);
                    // Update the Deal Table 
                    DealIndividualClearAndRefillTable();
                    DealIndividualClearValidation();
                    CustomerList_Reset('CustomerInfoList_Deal');
                } else if (FileType == "FACL") {
                    var UserName = ReturnUserName();
                    msg = "All facilities updated!!!"
                    var urlMain = "/Services/WCFWebService.svc/FacilityValidatedFileUpsert";
                    var ResultData = ReturnDataFromService(urlMain);
                    var j = 0;
                    var FileID = LogFileUploadStatus(0, FileNameUpload, 'IMTBL', FileType, UserName);
                }   
                else if (FileType == "ICECURVE") {
                    var UserName = ReturnUserName();
                    var files = document.getElementById('files').files;
                    var FileName = files[0].name;
                    msg = "File Uploaded!!!"
                    iFileCount = files.length;
                    for (iFile = 0; iFile < iFileCount; iFile++) {                        
                        var files = document.getElementById('files').files;
                        FileName = files[iFile].name;
                        //alert(FileName);
                        var urlMain = "/Services/CurveUploader.svc/TranslateSinglePDF?FileName=" + FileName;
                        var ResultData = ReturnDataFromService(urlMain);
                    }
                    var j = 0;
                    ReloadICECurves();
                    //var FileID = LogFileUploadStatus(0, FileNameUpload, 'IMTBL', FileType, UserName);
                }  
                alertify.success(msg);                           

            } else {
                alertify.error("Nothing completed");
            }
        }); 
    }
    catch (e) {
        HeaderDataErrorReport(e);
    }
}
function AddHeader() {
    try {
        // Setting Up First Column Header
        var RowString = "<li id = 'FirstColumn' class='active'><a href=\"Index.html\"><i class=\"fa fa-dashboard\"></i>Dashboard</a></li>";
        $('#MainUL').append(RowString);
        // Setting Up Second Column
        RowString = "<li id='SecondColumn'><a href='#'><i class=\"fa fa-align-justify\"></i>Data Entry</a></li>";
        $('#MainUL').append(RowString);
        // Setting Up Second Column Within Second Column/Data Entry
        RowString = "<ul id='SecondColumnFirstUL'></ul>";
        $('#SecondColumn').append(RowString);
        RowString = "<li><a href='GenericUploader.html'>Generic Uploader</a></li>";
        $('#SecondColumnFirstUL').append(RowString);
        RowString = "<li><a href='Customer.html'>Customer</a></li>";        
        $('#SecondColumnFirstUL').append(RowString);

        //RowString = "<li><a href='DealEntryGeneric.html'>Generic Deal Entry</a></li>";
        //$('#SecondColumnFirstUL').append(RowString);        
        RowString = "<li><a href='Facilities.html'>Facility</a></li>";
        $('#SecondColumnFirstUL').append(RowString);
        RowString = "<li><a href='RetailDeals.html'>Retail Deal Entry</a></li>";
        $('#SecondColumnFirstUL').append(RowString);
        RowString = "<li><a href='\WholesaleDeals.html'>Wholesale Deal Entry</a></li>";
        $('#SecondColumnFirstUL').append(RowString);

        //RowString = "<li><a href='DealEntryIndividual.html'>Grouping</a></li>";
        //$('#SecondColumnFirstUL').append(RowString);
        //RowString = "<li><a href='\DealEntryIndividual.html'>Broker</a></li>";
        //$('#SecondColumnFirstUL').append(RowString);
        //RowString = "<li><a href='\ICECurveUploader.html'>ICE Curve Upload</a></li>";
        //$('#SecondColumnFirstUL').append(RowString);
        //RowString = "<li><a href='\NewUploader.html'>ICE Curve Upload Mama</a></li>";
        ////RowString = "<li><a href='\NewUploader.html'>Large Uploader</a></li>";
        //$('#SecondColumnFirstUL').append(RowString);

        // Setting Up Third Column - Data Analytics
        RowString = "<li id='ThirdColumn'><a href='#'><i class=\"fa fa-bar-chart-o\"></i>Graphs</a></li>";
        RowString = "<li id='ThirdColumn'><a href='#'><i class=\"fa fa-bar-chart-o\"></i>Graphs</a></li>";
        $('#MainUL').append(RowString);
        RowString = "<ul id='ThirdColumnFirstUL'></ul>";
        $('#ThirdColumn').append(RowString);
        RowString = "<li><a href='StatsPage.html'>New Graph Page</a></li>";
        $('#ThirdColumnFirstUL').append(RowString);
        RowString = "<li><a href='GrossMarginPowerBI.html'>Origination</a></li>";
        $('#ThirdColumnFirstUL').append(RowString);
        RowString = "<li><a href='GrossMarginPowerBI.html'>Gross Margin - Power BI</a></li>";
        $('#ThirdColumnFirstUL').append(RowString);
        RowString = "<li><a href='PricingPowerBI.html'>Pricing - Power BI</a></li>";
        $('#ThirdColumnFirstUL').append(RowString);
        RowString = "<li><a href='GrossMarginPowerBI.html'>Batch Level Pricing</a></li>";
        $('#ThirdColumnFirstUL').append(RowString);
        RowString = "<li><a href='GrossMarginPowerBI.html'>Retail Pricing</a></li>";
        $('#ThirdColumnFirstUL').append(RowString);
        //RowString = "<li><a href='GrossMarginPowerBI.html'>Test Case Power BI</a></li>"
        //$('#ThirdColumnFirstUL').append(RowString);
    }
    catch (e) {
        HeaderDataErrorReport(e);
    }
}
function MainPageTransactionsGetInfo() {
    try {
        var UserName = ReturnUserName();
        msg = "All customers updated!!!"
        var urlMain = "/Services/WCFWebService.svc/TransactionsGetInfo";
        var ResultData = ReturnDataFromService(urlMain);
        var j = 0;
        var CustomerCount = ResultData.CustomerCount;
        var DealCount = ResultData.DealCount;
        var FacilityCount = ResultData.FacilityCount;
        var FileCount = ResultData.FileCount;
        $('#CustomersDivLabel').text(CustomerCount);
        $('#FacilityDivLabel').text(FacilityCount);
        $('#DealsDivLabel').text(DealCount);
        $('#FilesDivLabel').text(FileCount);
    } catch (e) {
        HeaderDataErrorReport(e);
    }
}
function CalcImportDate() {
    try {
        var msgAction = "import date";
        var msg = "Please confirm that you want to " + msgAction + ".";      
        alertify.confirm(msg, function (e) {
            if (e) {
                var msg = "The " + msgAction + " confirmed";
                alertify.success(msg);
            } else {
                alertify.error("Nothing completed");
            }
        }); 

    } catch (e) {
        HeaderDataErrorReport(e);
    }
}
function CalcUnitPrice() {
    try {
        var msgAction = "calculate unit price";
        var msg = "Please confirm that you want to " + msgAction + ".";
        alertify.confirm(msg, function (e) {
            if (e) {
                var msg = "The " + msgAction + " confirmed";
                alertify.success(msg);
            } else {
                alertify.error("Nothing completed");
            }
        }); 
    } catch (e) {
        HeaderDataErrorReport(e);
    }
}
function CalcProspectLoad() {
    try {
        var msgAction = "calculate prospect load";
        var msg = "Please confirm that you want to " + msgAction + ".";
        alertify.confirm(msg, function (e) {
            if (e) {
                var msg = "The " + msgAction + " confirmed";
                alertify.success(msg);
            } else {
                alertify.error("Nothing completed");
            }
        }); 
    } catch (e) {
        HeaderDataErrorReport(e);
    }
}
function CalcPricing() {
    try {
        var msgAction = "calculate pricing";
        var msg = "Please confirm that you want to " + msgAction + ".";
        alertify.confirm(msg, function (e) {
            if (e) {
                var msg = "The " + msgAction + " confirmed";
                alertify.success(msg);
            } else {
                alertify.error("Nothing completed");
            }
        }); 
    } catch (e) {
        HeaderDataErrorReport(e);
    }
}
function getCurentFileName() {
    var pagePathName = window.location.pathname;
    return pagePathName.substring(pagePathName.lastIndexOf("/") + 1);
}
function StatsPageDirection(GraphTypeMain) {
    try {        
        var pageURL = $(location).attr("href");
        var n = pageURL.lastIndexOf("/") + 1;
        pageURL = pageURL.substr(n, pageURL.length - n);
        var pageURL = pageURL.replace("#", "");        
        if (pageURL != "StatsPage.html") {
            alertify.message('Redirected to the monthly page');
            window.location.href = 'StatsPage.html';            
        } else {
            ChangeSelectorsMemGraph(GraphTypeMain);
        }
    } catch (e) {
        HeaderDataErrorReport(e);
    }
}

function resolveAfter2Seconds() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('resolved');
        }, 500);
    });
}
function SelectorFindByText(SelectorName, SelectorText) {
    try {
        // Return the value of a drop down by text
        var Selector = document.getElementById(SelectorName);
        var ReturnValue = 0;
        for (i = 0; i < Selector.options.length; i++) {
            if (Selector.options[i].text == SelectorText) {
                ReturnValue = Selector.options[i].value;
                break;
            }                
        }
        return ReturnValue;
    } catch (e) {
        return -1;
        HeaderDataErrorReport(e);
    }
}
function GeneralgetCurentFileName() {
    var pagePathName = window.location.pathname;
    return pagePathName.substring(pagePathName.lastIndexOf("/") + 1);
}