function GraphingReturnColors(urlMain, mergedData, startCol) {
    try {        
        var ResultData = ReturnDataFromService(urlMain);
        var iCols = 2;
        var CurrentColumn;
        var iCountOfColumns = mergedData.getNumberOfColumns(); 
        var ColorsM = [];
        for (iCols = startCol; iCols < iCountOfColumns; iCols++) {
            CurrentColumn = mergedData.getColumnLabel(iCols);
            for (var i in ResultData) {
                var SelectorText;
                var SelectorColor;
                SelectorText = ResultData[i].SelectorText;
                SelectorColor = ResultData[i].Color;
                SelectorText = SelectorText.trim();
                CurrentColumn = CurrentColumn.trim();
                if (SelectorText == CurrentColumn) {
                    ColorsM.push(SelectorColor);
                    break;
                }
            }
        }
        return ColorsM;
    } catch (e) {
        alertify.error(e);
    }
}

function dateMMMyyyy(d){
    try {        
        var month_names = ["Jan", "Feb", "Mar",
            "Apr", "May", "Jun",
            "Jul", "Aug", "Sep",
            "Oct", "Nov", "Dec"];
        var day = d.getDate();
        var month_index = d.getMonth();
        var year = d.getFullYear();
        var label = month_names[month_index] + "-" + year;
        return label;

    } catch (e) {
        alertify.error(e);
    }
}

function formatDateTime(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear() + " " + strTime;
}

function formatDate(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();// + " " + strTime;
}

function ChangeDateField(dataGraphMain, iStringDateField, iDateField) {
    try {
        // Provides the conversion for dates
        // Add New Date Field

        dataGraphMain.insertColumn(iDateField, 'date', 'DeliveryDate_Date')
        var iRowsLimit = dataGraphMain.getNumberOfRows();
        for (iRows = 0; iRows < iRowsLimit; iRows++) {
            var dt = new Date(dataGraphMain.getValue(iRows, iStringDateField + 1));
            //dt = dt + (1);
            dt.setHours(24 - dt.getHours());


            //var d = new Date();
            var Hrs = 24 - dt.getHours();
            var Mints = 0; //60 - dt.getMinutes()-1;
            var Sec = 0; //60 - dt.getSeconds();
            //var Millisc = 1000-d.setMilliseconds();
            //Hrs = 24-Hrs;

            //var today = new Date();
            dt.setHours(dt.getHours() + Hrs, Mints, Sec);
            //dt.setHours(-dt.getHours());
            dataGraphMain.setValue(iRows, iDateField, dt);
        }
        dataGraphMain.removeColumn(iDateField + 1);
        // Return the data table correctly
        return dataGraphMain;
    } catch (e) {
        alertify.error(e);
    }
}

function isDate(myDate) {
    return myDate.constructor.toString().indexOf("Date") > -1;
} 
function FormatDateForInput(InputDate) {
    var NewDate = new Date(InputDate);
    var Mnth = NewDate.getMonth()+1;
    var Dy = NewDate.getDate();
    if (Mnth < 10) { Mnth = '0' + Mnth.toString() } else { Mnth = Mnth.toString(); }
    if (Dy < 10) { Dy = '0' + Dy.toString() } else { Dy = Dy.toString(); }
    var ReturnDate = NewDate.getFullYear() + "-" + Mnth + "-" + Dy;
    return ReturnDate;

}
