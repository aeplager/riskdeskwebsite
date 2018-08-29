function FunctionComplete(msg) {
    alert(msg);
}
function RemoveCustRow(idrow) {
    try {
        $('#cust_8').remove();        
    }
    catch (e) {
        HeaderDataErrorReport(e);
    }
}
function CreateCustomerTable() {
    try {
        var urlMain = '/WCFWebService.svc/CustomersAllGetInfo';                
        var ResultData = ReturnDataFromService(urlMain);
        var j = 0;
        for (var i in ResultData) {
            j = j + 1;
        }
        $('#data-table').remove();
        $("#tableContainer").remove("#data-table");
        var mytable = $('<table></table>').attr({ id: "data-table", width: "100%", overflow: "scroll", class: "scrollTable table-hover" });
        var rows = 21;
        var cols = 2;
        var tr = [];
        for (var i = 0; i <= rows; i++) {
            if (i == 0) {
                var tHead = $('<thead></thead>').attr({}).appendTo(mytable);
                var row = $('<tr></tr>').appendTo(tHead);
                $('<th></th>').text("Customer Id").appendTo(row);
                $('<th></th>').text("Customer Name").appendTo(row);
                $('<th></th>').text("Billing Address").appendTo(row);
                $('<th></th>').attr({class:  "hidden-phone"}).text("City Name").appendTo(row);
                $('<th></th>').text("State").appendTo(row);                
                $('<th></th>').text("Zip").appendTo(row);                
                
            } else {
                if (i == 1) {
                    var tBody = $('<tbody></tbody>').appendTo(mytable);
                }                
                for (var i in ResultData) {                    
                    var row = $('<tr></tr>').attr({ id: "cust_" + ResultData[i].CustomerID, class: "gradeA success" }).appendTo(tBody);                    
                    $('<td></td>').text(ResultData[i].CustomerID).appendTo(row);
                    $('<td></td>').text(ResultData[i].CustomerName).appendTo(row);
                    $('<td></td>').text(ResultData[i].billingadd1).appendTo(row);
                    $('<td></td>').text(ResultData[i].CityName).appendTo(row);
                    $('<td></td>').text(ResultData[i].StateAbb).appendTo(row);
                    $('<td></td>').text(ResultData[i].Zip).appendTo(row);                    
                }
            }
        }
        mytable.appendTo("#tableContainer");
        var oTable = $('#data-table').dataTable(
            {
                "sScrollY": "300px",
                "sScrollX": "100%",
                "sScrollXInner": "150%",
                "bScrollCollapse": true,
                "bPaginate": false,
                "bFilter": false
            });        
    }
    catch (e) {
        HeaderDataErrorReport(e);
    }
}
function Customer_AddRows() {
    var rowCount = $('#data-table tr').length;
    for (var i = 0; i <= rowCount -1; i++) { 
        $('#data-table tr:last').remove();
    }        
    for (var i = 0; i <= rowCount + 75; i++) {
        if (i <= 10) {
            $('#data-table > tbody').after('<tr><td>my data</td><td>more data</td></tr>');
        }
        else {
            $('#data-table > tbody').after('<tr><td>my data</td><td>112313213more dafdafadfafafafafafata</td></tr>');
        }
    }        
}


function CustomerInfoList_Change() {
    // Retrieves the list of cities and places them into the proper place
    try {
        // Empty the list box                
        // Set up the list call  
        var CustomerID = $('#CustomerInfoList_Customer').val();        
        var urlMain = '/WCFWebService.svc/CustomersGetInfo';
        var DataUrl = '?CustomerID=' + CustomerID;
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
                    $('#CustomerName_Customer').val(Result[i].CustomerName)
                    $('#Address1_Customer').val(Result[i].billingadd1)
                    $('#Address2_Customer').val(Result[i].billingadd2)
                    $('#ZipCode_Customer').val(Result[i].zip)                                        
                    $('#CityInfoAutoCompleteList_Customer').val(Result[i].CityName)
                    $("#StateInfoList_Customer").val(Result[i].stateabb);
                    if (Result[i].Active == true) {
                        $('#Active_Customer').prop('checked', true);
                        //$('#Active_Customer').is(':checked') = true;
                    } else {
                        $('#Active_Customer').prop('checked', false);
                        //$('#Active_Customer').is(':checked') = false;
                    }

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
function CustomerUpsert(NewOld) {
    var msg = "Please confirm that you want to save this record";
    if (NewOld == 'New') {
        msg = "Please confirm that you want to add a new record";
    }
    alertify.confirm(msg, function (e) {
        if (e) {
            if (NewOld == 'New') {
                msg = 'You have added a new record';
            } else {
                msg = 'You have saved this record';
            }
            alertify.success(msg );
            CustomerDataUpsert(NewOld);            
        } else {
            alertify.error("Nothing completed");            
        }
    });    
}
function CustomerDataUpsert(NewOld) {
    try { 
        // Empty the list box                
        // Set up the list call              
        var urlMain = '/WCFWebService.svc/CustomerUpsert';
        var CustomerID = $('#CustomerInfoList_Customer').val();         
        if (NewOld == 'New') {
            CustomerID = 0;
        }
        var CustomerName = $('#CustomerName_Customer').val();
        var BillingAdd1 = $('#Address1_Customer').val();
        var BillingAdd2 = $('#Address2_Customer').val();
        var CityName = $('#CityInfoAutoCompleteList_Customer').val();
        var StateAbb = $('#StateInfoList_Customer').val();
        var Zip = $('#ZipCode_Customer').val();
        var CurrentCustActive = 1;
        if ($('#Active_Customer').is(':checked') != true) { CurrentCustActive= 0;} 
        var DataUrl = '?CustomerID=' + CustomerID + '&CustomerName=' + CustomerName + '&BillingAdd1=' + BillingAdd1 + '&BillingAdd2=' + BillingAdd2 + '&CityName=' + CityName + '&StateAbb=' + StateAbb + '&Zip=' + Zip + '&Active=' + CurrentCustActive;
        //var DataUrl = '?CustomerID=' + CustomerID;
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
                var j = 0;
                for (var i in Result) {
                    j = j + 1;
                }
            },
            error: function (Result) {
                alert("Error");
            }
        });
        if (NewOld == 'New') {
            CustomerList_Reset('CustomerInfoList_Customer');
        }
        //$("success").onclick = function () {
        //    reset();
        //    alertify.success("Success log message");
        //    return false;
        //};        
        // Add Code to Remove and Add the Current Record
        // If the customer id = 0, then add the record only        
    }
    catch (e) {
        HeaderDataErrorReport(e);
    }    
}
function testStuff() {
    try{
        $("#autocomplete").autocomplete({
            source: ["c++", "java", "php", "coldfusion", "javascript", "asp", "ruby"]
        });
    }
    catch (e) {
        HeaderDataErrorReport(e);
    }
}