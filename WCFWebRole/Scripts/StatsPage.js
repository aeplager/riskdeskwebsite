// All of the functions to generate the charts
function redrawChartHourlyScalar() {
    try {
    // ***************************************************
    // Function to Obtain the Hourly Scalar Chart
    // ***************************************************
    // Establish the XML Inputs

    // ***************************************************
    // Function to Obtain the Monthly Chart
    // ***************************************************
    // Establish the XML Inputs
    var xmlMonths = ReturnSelectionXML('selFirst', 'MN');
    var xmlCongestionZone = ReturnSelectionXML('selSecond', 'CZ');
    //xmlWeatherScenario 
    var resultWH = ReturnSelectionXML('selThird', 'WH');
    var xmlAccounts = ReturnSelectionXML('selFrth', 'UA');
    var xmlCustomers = ReturnSelectionXML('selSixth', 'CS');
    // Determine How Many Whole Sale Blocks Used
    var CountOfWH = 0;
    // Establish the XML Inputs
    //$('#' + Selector + ' > :selected').each(function () {
    //    CountOfWH = CountOfWH + 1;
    //});
    var mergedData;
    var dataGraphTest;
    var iArrayRows = 1;
    var iRecords = [2, 3];
    var xmlInput = '';
    var WHValue = '0';
    var WHText = 'N/A';
    //var listItems = $("#" + ControlToSet + " li");
    var SelIndex = 0;
    var SelText = '';
    // Loop through each of the notes
    var ControlToSet = 'selThird';
    var CheckboxToSet = ControlToSet;
    
    $("#" + ControlToSet + " li").each(function (index) {
        //alertify.error(index + ": " + $(this).text() + ' - ' + $(this).val());
        CheckboxToSet = ControlToSet + '_CHK_' + $(this).val();
        // Place Text and Identifier into the mix
        SelIndex = $(this).val();
        SelText = $(this).text();
        if ((($('#' + CheckboxToSet).is(':checked')) == true) || (resultWH == '')) {
            WHText = SelText;
            xmlInput = '<Row><WH>' + SelIndex + '</WH></Row>'
            dataGraphTest = ObtainHourlyScalarGraphData(xmlMonths, xmlCongestionZone, xmlAccounts, xmlInput, xmlCustomers, WHText);
            if (dataGraphTest.getNumberOfRows() > 0) {
                if (iArrayRows == 1) {
                    mergedData = dataGraphTest;
                } else if (iArrayRows == 2) {
                    iRecords = [2];
                    mergedData = google.visualization.data.join(mergedData, dataGraphTest, 'full', [[1, 1]], iRecords, [2]);
                } else if (iArrayRows == 3) {
                    iRecords = [1, 2];
                    mergedData = mergedData = google.visualization.data.join(mergedData, dataGraphTest, 'full', [[0, 1]], iRecords, [2]);
                    iRecords = [2, 3];
                } else {
                    iRecords.push(iArrayRow);
                    mergedData = google.visualization.data.join(mergedData, dataGraphTest, 'full', [[1, 1]], iRecords, [2]);
                }
                if (mergedData === undefined) {
                    $("#columnchart_stacked").hide();
                    $("#table_div").hide();
                    alertify.error("No values present in results");
                    return;
                }
                iArrayRows = iArrayRows + 1;
            }
        }
    });
    if (mergedData === undefined) {
        $("#columnchart_stacked").hide();
        $("#table_div").hide();
        alertify.error("No values present in results");
        return;
    } else {
        $("#columnchart_stacked").show();
        $("#table_div").show();
        alertify.success('Finished Processing');
    }
    $("#table_div").hide();
    var FirstColumnName = mergedData.getColumnLabel(0);
    if (FirstColumnName != "HE") {
        mergedData.removeColumn(0);
    };

    var iCounterOfRows = mergedData.getNumberOfRows();
    iCountOfColumns = mergedData.getNumberOfColumns();
    var urlMain = '/Services/WCFWebService.svc/AllWholeSaleBlocksGetInfo';
    var ColorsM = GraphingReturnColors(urlMain, mergedData, 1);
    mergedData.sort({ column: 0, desc: false });
    //mergedData.removeColumn(0);
    var options = {
        width: '100%',
        height: 400,
        legend: { position: 'top', maxLines: 3 },
        bar: { groupWidth: '75%' },
        isStacked: false,
        title: 'Hourly Load by Wholesale Block (KW)',
        hAxis: {
            title: 'Hour'
        },
        vAxis: {
            title: 'KW'
        },
        colors: ColorsM,
        chartArea: {
            width: "85%"
        },
    };
    chart = new google.visualization.ColumnChart(document.getElementById('columnchart_stacked'));

    google.visualization.events.addListener(chart, 'select', function () {
        highlightBar(chart, options);
    });
    chart.draw(mergedData, options);
    // Build the tables       
    var DataInput = '';
    var xmlinputWholesaleBlock = ReturnSelectionXML('selThird', 'WH');
    if (xmlinputWholesaleBlock != '') {
        DataInput = "WholeBlockString=" + xmlinputWholesaleBlock;
    }
    if (xmlCongestionZone != '') {
        if (DataInput == '') {
            DataInput = "CongestionZoneString=" + xmlCongestionZone;
        } else {
            DataInput = DataInput + "&CongestionZoneString=" + xmlCongestionZone;
        }
    }
    if (xmlMonths != '') {
        if (DataInput == '') {
            DataInput = "MonthsString=" + xmlMonths;
        }
        else {
            DataInput = DataInput + "&MonthsString=" + xmlMonths;
        }
    }
    if (xmlAccounts != '') {
        if (DataInput == '') {
            DataInput = "UtilityAccountString=" + xmlAccounts;
        }
        else {
            DataInput = DataInput + "&UtilityAccountString=" + xmlAccounts;
        }
        }
        if (xmlCustomers != '') {            
            if (DataInput == '') {
                DataInput = "CustomersString=" + xmlCustomers;
            }
            else {
                DataInput = DataInput + "&CustomersString=" + xmlCustomers;
            }            
        }
    if (DataInput == '') {
        urlMain = '/Services/WCFWebService.svc/HourlyScalarTableGraphsGetInfo'
    } else {
        urlMain = '/Services/WCFWebService.svc/HourlyScalarTableGraphsGetInfo/?' + DataInput;
    }
    var ResultDataGraphs = ReturnDataFromService(urlMain);
    var dataView = new google.visualization.DataTable();

    dataView.addColumn('string', 'WholeSaleBlocks');
    dataView.addColumn('number', 'H_1');
    dataView.addColumn('number', 'H_2');
    dataView.addColumn('number', 'H_3');
    dataView.addColumn('number', 'H_4');
    dataView.addColumn('number', 'H_5');
    dataView.addColumn('number', 'H_6');
    dataView.addColumn('number', 'H_7');
    dataView.addColumn('number', 'H_8');
    dataView.addColumn('number', 'H_9');
    dataView.addColumn('number', 'H_10');
    dataView.addColumn('number', 'H_11');
    dataView.addColumn('number', 'H_12');
    dataView.addColumn('number', 'H_13');
    dataView.addColumn('number', 'H_14');
    dataView.addColumn('number', 'H_15');
    dataView.addColumn('number', 'H_16');
    dataView.addColumn('number', 'H_17');
    dataView.addColumn('number', 'H_18');
    dataView.addColumn('number', 'H_19');
    dataView.addColumn('number', 'H_20');
    dataView.addColumn('number', 'H_21');
    dataView.addColumn('number', 'H_22');
    dataView.addColumn('number', 'H_23');
    dataView.addColumn('number', 'H_24');

    ResultDataGraphs.forEach(function (row) {
        dataView.addRow([
            row.WholeSaleBlocks,
            row.H_1,
            row.H_2,
            row.H_3,
            row.H_4,
            row.H_5,
            row.H_6,
            row.H_7,
            row.H_8,
            row.H_9,
            row.H_10,
            row.H_11,
            row.H_12,
            row.H_13,
            row.H_14,
            row.H_15,
            row.H_16,
            row.H_17,
            row.H_18,
            row.H_19,
            row.H_20,
            row.H_21,
            row.H_22,
            row.H_23,
            row.H_24,
        ]);
    });
        for (i = 1; i <= 24; i++) {
            var NewLabel = i;
            dataView.setColumnLabel(i, NewLabel);
        }
    
    var table = new google.visualization.Table(document.getElementById('table_div'));
    table.draw(dataView, { showRowNumber: false, width: '100%', height: '90%' });
    $("#table_div").show();
    }
    catch (e) {
        alertify.error(e);
    }
}

function redrawChartWeatherHourly() {
    try {
        // ***************************************************
        // Function to Obtain the Weather Hourly
        // ***************************************************
        // Establish the XML Inputs
        var xmlMonths = ReturnSelectionXML('selFirst', 'MN');
        var xmlWeatherScenario = ReturnSelectionXML('selSecond', 'WS');        
        var xmlinputWholesaleBlock = ReturnSelectionXML('selThird', 'WH');
        var xmlAccounts = ReturnSelectionXML('selFrth', 'UA');
        var xmlCustomers = ReturnSelectionXML('selSixth', 'CS');
        // Start And End Dates
        var StartDate = ReturnDateFromDateInput('dtStartDate');
        var EndDate = ReturnDateFromDateInput('dtEndDate');
        // Determine How Many Whole Sale Blocks Used        
        var mergedData;
        var dataGraphTest;
        var iArrayRows = 1;
        var iRecords = [2, 3];
        //var xmlInput = '';
        //var WHValue = '0';        
        //var listItems = $("#" + ControlToSet + " li");
        var SelIndex = 0;
        var SelText = '';
        // Loop through each of the notes
        var ControlToSet = 'selSecond';
        var CheckboxToSet = ControlToSet;
        var resultWH = xmlWeatherScenario;
        $("#" + ControlToSet + " li").each(function (index) {
            //alertify.error(index + ": " + $(this).text() + ' - ' + $(this).val());
            CheckboxToSet = ControlToSet + '_CHK_' + $(this).val();
            // Place Text and Identifier into the mix
            SelIndex = $(this).val();
            SelText = $(this).text();
            if ((($('#' + CheckboxToSet).is(':checked')) == true) || (resultWH == '')) {
                var WHText = SelText.trim();                
                xmlInput = '<Row><WS>' + SelIndex + '</WS></Row>'
                dataGraphTest = ObtainWeatherHourlyGraphData(xmlMonths, xmlInput, xmlAccounts, xmlinputWholesaleBlock, StartDate, EndDate, xmlCustomers);
                // Remove Extraneous Columns
                dataGraphTest.removeColumn(0);
                dataGraphTest.removeColumn(0);
                dataGraphTest.removeColumn(0);
                dataGraphTest.removeColumn(0);
                dataGraphTest.removeColumn(0);                
                dataGraphTest.setColumnLabel(1, WHText)
                if (dataGraphTest.getNumberOfRows() > 0) {
                    if (iArrayRows == 1) {
                        mergedData = dataGraphTest;
                    } else if (iArrayRows == 2) {
                        iRecords = [1];           
                        mergedData = google.visualization.data.join(mergedData, dataGraphTest, 'full', [[0, 0]], iRecords, [1]);
                    } else if (iArrayRows == 3) {
                        iRecords = [1,2];                        
                        mergedData = mergedData = google.visualization.data.join(mergedData, dataGraphTest, 'full', [[0, 0]], iRecords, [1]);                        
                    } else {
                        iRecords.push(iArrayRows);
                        mergedData = google.visualization.data.join(mergedData, dataGraphTest, 'full', [[0, 0]], iRecords, [1]);
                    }
                    if (mergedData === undefined) {
                        $("#columnchart_stacked").hide();
                        $("#table_div").hide();
                        alertify.error("No values present in results");
                        return;
                    }
                    iArrayRows = iArrayRows + 1;
                }
            }
        });
        
        if (mergedData === undefined) {
            $("#columnchart_stacked").hide();
            $("#table_div").hide();
            alertify.error("No values present in results");
            return;
        } else {
            $("#columnchart_stacked").show();
            $("#table_div").hide();
            alertify.success('Finished Processing');
        }
        // Ensure that it is sorted by month id
        mergedData.sort({ column: 0, desc: false });       
        var i = 0;
        var monthYearFormatter = new google.visualization.DateFormat({
            pattern: "MM/dd/yyyy hh:mm"
        });
        monthYearFormatter.format(mergedData, 0);

        var options = {
            width: '100%',
            height: 400,
            legend: { position: 'top', maxLines: 3 },
            bar: { groupWidth: '75%' },
            isStacked: true,            
            vAxis: {
                title: 'Load (KW)',
            },
            hAxis: {
                format: 'MMM dd, yyyy',
                gridlines: { count: 5 },
                title:  'Date Range',
                chartArea: {
                    width: "85%"
                }
            }
        };
        chart = new google.visualization.LineChart(document.getElementById('columnchart_stacked'));                
        google.visualization.events.addListener(chart, 'select', function () {
            highlightBar(chart, options);
        });
        chart.draw(mergedData, options);        
        $("#table_div").hide();
    }
    catch (e) {
        alertify.error(e);
    }
}

async function redrawChartErcotAnimationPlot() {
    try {
    $("#columnchart_stacked").show();
    var options = {
        title: 'Ercot Animation',
        hAxis: { title: 'Temp F' },
        vAxis: { title: 'Load KW' },
        legend: { position: 'top', maxLines: 3 },
        explorer: {
            actions: ['dragToZoom', 'rightClickToReset'],
            axis: 'horizontal',
            keepInBounds: true,
            maxZoomIn: 4.0
        },
        animation: {
            duration: 1000,
            easing: 'out'
        },
        };
    var Mnths = 1;

    var xmlMonths = '<Row><MN>' + Mnths + '</MN></Row>';
    
    var dtArray = [];
    var now = new Date(Date.now());
    dtArray.push(now);
    for (Mnths = 1; Mnths <= 12; Mnths ++) {
        xmlMonths = '<Row><MN>' + Mnths + '</MN></Row>';
        var now = new Date(Date.now());
        var mergedDataBase = redrawChartErcotAnimationPlotDataOnly(xmlMonths);        
        if (mergedDataBase === undefined) {
            alertify.error('Month ' + Mnths + ' does not have any data');
        } else {
            if (mergedDataBase.getNumberOfRows() != 0) {
                mergedDataJan = mergedDataBase;
                chart = new google.visualization.ScatterChart(document.getElementById('columnchart_stacked'));
                chart.draw(mergedDataJan, options);
                result = await resolveAfter2Seconds();
            }
        }
        dtArray.push(now);
    }
    } catch (e) {
        alertify.error(e);
    }
}

function redrawChartErcotAnimationPlotDataOnly(xmlMonths) {
    try {
        // Obtain the data
        var xmlCongestionZone = ReturnSelectionXML('selSecond', 'CZ');
        var xmlinputWholesaleBlock = ReturnSelectionXML('selThird', 'WH');
        var xmlAccounts = ReturnSelectionXML('selFrth', 'UA');
        var xmlHours = ReturnSelectionXML('selFifth', 'HR');
        // Determine How Many Whole Sale Blocks Used        
        var mergedData;
        var dataGraphTest;
        var iArrayRows = 1;
        var iRecords = [2, 3];
        //var xmlInput = '';
        //var WHValue = '0';        
        //var listItems = $("#" + ControlToSet + " li");
        var SelIndex = 0;
        var SelText = '';
        // Loop through each of the notes
        var ControlToSet = 'selThird';
        var CheckboxToSet = ControlToSet;
        var resultWH = xmlinputWholesaleBlock;

        $("#" + ControlToSet + " li").each(function (index) {
            //alertify.error(index + ": " + $(this).text() + ' - ' + $(this).val());
            CheckboxToSet = ControlToSet + '_CHK_' + $(this).val();
            // Place Text and Identifier into the mix
            SelIndex = $(this).val();
            SelText = $(this).text();
            if ((($('#' + CheckboxToSet).is(':checked')) == true) || (resultWH == '')) {
                var WHText = SelText.trim();
                xmlinputWholesaleBlock = '<Row><WH>' + SelIndex + '</WH></Row>'
                dataGraphTest = ObtainErcotAnimationGraphData(xmlMonths, xmlCongestionZone, xmlAccounts, xmlinputWholesaleBlock, xmlMonths, xmlHours)
                // Remove Extraneous Columns
                // Remove WholeSale and Wholesale Block                
                if (dataGraphTest != undefined) {
                    dataGraphTest.removeColumn(0);
                    dataGraphTest.removeColumn(0);
                    dataGraphTest.removeColumn(0);
                    dataGraphTest.removeColumn(0);
                    dataGraphTest.removeColumn(0);
                    //Real Time Price
                    dataGraphTest.removeColumn(1);
                    //Ercot Load
                    dataGraphTest.removeColumn(1);
                    // Change Load KW to the Correct Value
                    dataGraphTest.setColumnLabel(1, WHText)
                    if (dataGraphTest.getNumberOfRows() > 0) {
                        if (iArrayRows == 1) {
                            mergedData = dataGraphTest;
                        } else if (iArrayRows == 2) {
                            iRecords = [1];
                            mergedData = google.visualization.data.join(mergedData, dataGraphTest, 'full', [[0, 0]], iRecords, [1]);
                        } else if (iArrayRows == 3) {
                            iRecords = [1, 2];
                            mergedData = mergedData = google.visualization.data.join(mergedData, dataGraphTest, 'full', [[0, 0]], iRecords, [1]);
                        } else {
                            iRecords.push(iArrayRows - 1);
                            mergedData = google.visualization.data.join(mergedData, dataGraphTest, 'full', [[0, 0]], iRecords, [1]);
                        }
                        if (mergedData === undefined) {
                            $("#columnchart_stacked").hide();
                            $("#table_div").hide();
                            alertify.error("No values present in results");
                            return;
                        }
                        iArrayRows = iArrayRows + 1;
                    }
                }
        
            }
        });
        return mergedData;

    } catch (e) {
        alertify.error(e);
    }
} 

function redrawChartErcotAnimationPlotMain(xmlMonths) {
    try {
        // ***************************************************
        // Function to Obtain the Weather Hourly
        // ***************************************************
        // Establish the XML Inputs        
        
        //var xmlMonths = ReturnSelectionXML('selFirst', 'MN');
        var xmlCongestionZone = ReturnSelectionXML('selSecond', 'CZ');
        var xmlinputWholesaleBlock = ReturnSelectionXML('selThird', 'WH');
        var xmlAccounts = ReturnSelectionXML('selFrth', 'UA');
        var xmlHours = ReturnSelectionXML('selFifth', 'HR');
        // Determine How Many Whole Sale Blocks Used        
        var mergedData;
        var dataGraphTest;
        var iArrayRows = 1;
        var iRecords = [2, 3];
        //var xmlInput = '';
        //var WHValue = '0';        
        //var listItems = $("#" + ControlToSet + " li");
        var SelIndex = 0;
        var SelText = '';
        // Loop through each of the notes
        var ControlToSet = 'selThird';
        var CheckboxToSet = ControlToSet;
        var resultWH = xmlinputWholesaleBlock;
        
        $("#" + ControlToSet + " li").each(function (index) {
            //alertify.error(index + ": " + $(this).text() + ' - ' + $(this).val());
            CheckboxToSet = ControlToSet + '_CHK_' + $(this).val();
            // Place Text and Identifier into the mix
            SelIndex = $(this).val();
            SelText = $(this).text();
            if ((($('#' + CheckboxToSet).is(':checked')) == true) || (resultWH == '')) {
                var WHText = SelText.trim();
                xmlinputWholesaleBlock = '<Row><WH>' + SelIndex + '</WH></Row>'
                dataGraphTest = ObtainErcotAnimationGraphData(xmlMonths, xmlCongestionZone, xmlAccounts, xmlinputWholesaleBlock, xmlMonths, xmlHours)
                // Remove Extraneous Columns
                // Remove WholeSale and Wholesale Block                
                dataGraphTest.removeColumn(0);
                dataGraphTest.removeColumn(0);
                dataGraphTest.removeColumn(0);
                dataGraphTest.removeColumn(0);
                dataGraphTest.removeColumn(0);
                //Real Time Price
                dataGraphTest.removeColumn(1);                
                //Ercot Load
                dataGraphTest.removeColumn(1);
                // Change Load KW to the Correct Value
                dataGraphTest.setColumnLabel(1, WHText)
                if (dataGraphTest.getNumberOfRows() > 0) {
                    if (iArrayRows == 1) {
                        mergedData = dataGraphTest;
                    } else if (iArrayRows == 2) {
                        iRecords = [1];
                        mergedData = google.visualization.data.join(mergedData, dataGraphTest, 'full', [[0, 0]], iRecords, [1]);
                    } else if (iArrayRows == 3) {
                        iRecords = [1, 2];
                        mergedData = mergedData = google.visualization.data.join(mergedData, dataGraphTest, 'full', [[0, 0]], iRecords, [1]);
                    } else {
                        iRecords.push(iArrayRows - 1);
                        mergedData = google.visualization.data.join(mergedData, dataGraphTest, 'full', [[0, 0]], iRecords, [1]);
                    }
                    if (mergedData === undefined) {
                        $("#columnchart_stacked").hide();
                        $("#table_div").hide();
                        alertify.error("No values present in results");
                        return;
                    }
                    iArrayRows = iArrayRows + 1;
                }
            }
        });
        //mergedData = dataGraphTest;
        if (mergedData === undefined) {
            $("#columnchart_stacked").hide();
            $("#table_div").hide();
            alertify.error("No values present in results");
            return;
        } else {
            $("#columnchart_stacked").show();
            $("#table_div").hide();
            alertify.success('Finished Processing');
        }
        var options = {
            title: 'Load/Temperature Scatter Plot',
            hAxis: { title: 'Temp F' },
            vAxis: { title: 'Load KW' },
            legend: { position: 'top', maxLines: 3 },
            explorer: {
                actions: ['dragToZoom', 'rightClickToReset'],
                axis: 'horizontal',
                keepInBounds: true,
                maxZoomIn: 4.0
            },
            animation: {
                duration: 1000,
                easing: 'out',
            },
        };
        chart = new google.visualization.ScatterChart(document.getElementById('columnchart_stacked'));
        chart.draw(mergedData, options);
        $("#table_div").hide();        
    }
    catch (e) {        
        alertify.error(e);
    }
}

function redrawChartCoincidencePeakGraphsGetInfo() {
    try {
        // ***************************************************
        // Function to Obtain the Scatter Plot Hourly
        // ***************************************************
        // Establish the XML Inputs
        var xmlMonths = ReturnSelectionXML('selFirst', 'MN');        
        var xmlWeatherScenario= ReturnSelectionXML('selSecond', 'WS');
        var xmlAccounts = ReturnSelectionXML('selThird', 'UA');
        var xmlCustomers = ReturnSelectionXML('selSixth', 'CS');
        // Determine How Many Whole Sale Blocks Used        
        var mergedData;
        var dataGraphTest;
        var iArrayRows = 1;
        var iRecords = [2, 3];
        //var xmlInput = '';
        //var WHValue = '0';        
        //var listItems = $("#" + ControlToSet + " li");
        var SelIndex = 0;
        var SelText = '';
        // Loop through each of the notes
        var ControlToSet = 'selThird';
        var CheckboxToSet = ControlToSet;
        var resultWH = xmlWeatherScenario;
        // Retrieve Data
        dataGraphTest = ObtainCoincidencePeakGraphData(xmlWeatherScenario, xmlAccounts, xmlMonths, xmlCustomers);
        dataGraphTest.removeColumn(0); // Months ID
        dataGraphTest.removeColumn(1); // Long Months
        dataGraphTest.removeColumn(1); // Max Sys Max
        dataGraphTest.removeColumn(3); // Long Months        
        dataGraphTest.setColumnLabel(1, 'Coincidence Peak');
        dataGraphTest.setColumnLabel(2, 'Non Coincidence Peak');
        mergedData = dataGraphTest;        
        //mergedData = dataGraphTest;
        if (mergedData === undefined) {
            $("#columnchart_stacked").hide();
            $("#table_div").hide();
            alertify.error("No values present in results");
            return;
        } else {
            $("#columnchart_stacked").show();
            $("#table_div").hide();
            alertify.success('Finished Processing');
        }
        var options = {
            title: 'Coincident Peak and Non Coincident Peak by Month',
            hAxis: { title: 'Month' },
            vAxis: { title: 'Coincident Peak and Non Coincident Peak' },
            legend: { position: 'top', maxLines: 3 },
            explorer: {
                actions: ['dragToZoom', 'rightClickToReset'],
                axis: 'horizontal',
                keepInBounds: true,
                maxZoomIn: 4.0
            },
        };
        chart = new google.visualization.ColumnChart(document.getElementById('columnchart_stacked'));        


        google.visualization.events.addListener(chart, 'select', function () {
            highlightBar(chart, options);
        });
        chart.draw(mergedData, options);

        // Start Table Asquisition        
        dataView = ObtainCoincidencePeakTableData(xmlWeatherScenario, xmlAccounts, xmlMonths, xmlCustomers);

        var table = new google.visualization.Table(document.getElementById('table_div'));
        table.draw(dataView, { showRowNumber: false, width: '100%', height: '90%', alternatingRowStyle: true });
        $("#table_div").show();

        
    }
    catch (e) {
        alertify.error(e);
    }
}

function redrawChartScatterPlot() {
    try {
        // ***************************************************
        // Function to Obtain the Scatter Plot Hourly
        // ***************************************************
        // Establish the XML Inputs
        var xmlMonths = ReturnSelectionXML('selFirst', 'MN');
        var xmlCongestionZone = ReturnSelectionXML('selSecond', 'CZ');
        var xmlinputWholesaleBlock = ReturnSelectionXML('selThird', 'WH');
        var xmlAccounts = ReturnSelectionXML('selFrth', 'UA');
        var xmlHours = ReturnSelectionXML('selFifth', 'HR');
        // Determine How Many Whole Sale Blocks Used        
        var mergedData;
        var dataGraphTest;
        var iArrayRows = 1;
        var iRecords = [2, 3];
        //var xmlInput = '';
        //var WHValue = '0';        
        //var listItems = $("#" + ControlToSet + " li");
        var SelIndex = 0;
        var SelText = '';
        // Loop through each of the notes
        var ControlToSet = 'selThird';
        var CheckboxToSet = ControlToSet;
        var resultWH = xmlinputWholesaleBlock;
        $("#" + ControlToSet + " li").each(function (index) {
            //alertify.error(index + ": " + $(this).text() + ' - ' + $(this).val());
            CheckboxToSet = ControlToSet + '_CHK_' + $(this).val();
            // Place Text and Identifier into the mix
            SelIndex = $(this).val();
            SelText = $(this).text();
            if ((($('#' + CheckboxToSet).is(':checked')) == true) || (resultWH == '')) {
                var WHText = SelText.trim();
                xmlinputWholesaleBlock = '<Row><WH>' + SelIndex + '</WH></Row>'
                dataGraphTest = ObtainScatterPlotGraphData(xmlMonths, xmlCongestionZone, xmlAccounts, xmlinputWholesaleBlock, xmlMonths, xmlHours) 
                // Remove Extraneous Columns
                // Remove WholeSale and Wholesale Block                
                dataGraphTest.removeColumn(0);
                dataGraphTest.removeColumn(0);
                //Real Time Price
                dataGraphTest.removeColumn(1);
                //Ercot Load
                dataGraphTest.removeColumn(1);
                // Change Load KW to the Correct Value
                dataGraphTest.setColumnLabel(1, WHText)
                if (dataGraphTest.getNumberOfRows() > 0) {
                    if (iArrayRows == 1) {
                        mergedData = dataGraphTest;
                    } else if (iArrayRows == 2) {
                        iRecords = [1];
                        mergedData = google.visualization.data.join(mergedData, dataGraphTest, 'full', [[0, 0]], iRecords, [1]);
                    } else if (iArrayRows == 3) {
                        iRecords = [1, 2];
                        mergedData = mergedData = google.visualization.data.join(mergedData, dataGraphTest, 'full', [[0, 0]], iRecords, [1]);
                    } else {
                        iRecords.push(iArrayRows-1);
                        mergedData = google.visualization.data.join(mergedData, dataGraphTest, 'full', [[0, 0]], iRecords, [1]);
                    }
                    if (mergedData === undefined) {
                        $("#columnchart_stacked").hide();
                        $("#table_div").hide();
                        alertify.error("No values present in results");
                        return;
                    }
                    iArrayRows = iArrayRows + 1;
                }
            }
        });
        //mergedData = dataGraphTest;
        if (mergedData === undefined) {
            $("#columnchart_stacked").hide();
            $("#table_div").hide();
            alertify.error("No values present in results");
            return;
        } else {
            $("#columnchart_stacked").show();
            $("#table_div").hide();
            alertify.success('Finished Processing');
        }
        var iCounterOfRows = mergedData.getNumberOfRows();
        iCountOfColumns = mergedData.getNumberOfColumns();
        var urlMain = '/Services/WCFWebService.svc/AllWholeSaleBlocksGetInfo';
        var ColorsM = GraphingReturnColors(urlMain, mergedData, 1);
        mergedData.sort({ column: 0, desc: false });

        var options = {
            title: 'Load/Temperature Scatter Plot',
            hAxis: { title: 'Temperatiure(F)' },
            vAxis: { title: 'Load KW' },
            colors: ColorsM,
            width: '100%',
            height: '100%',
            legend: { position: 'top', maxLines: 3 },
            explorer: {
                actions: ['dragToZoom', 'rightClickToReset'],
                axis: 'horizontal',
                keepInBounds: true,
                maxZoomIn: 4.0
            },
        };
        
        chart = new google.visualization.ScatterChart(document.getElementById('columnchart_stacked'));


        //google.visualization.events.addListener(chart, 'select', function () {
        //    highlightBar(chart, options);
        //});
        chart.draw(mergedData, options);
        $("#table_div").hide();
    }
    catch (e) {
        alertify.error(e);
    }
}

function redrawChartVolumetricRisk() {
    try {
        // ***************************************************
        // Function to Obtain the Monthly Chart
        // ***************************************************
        // Establish the XML Inputs
        var xmlMonths = ReturnSelectionXML('selFirst', 'MN');
        var xmlCongestionZone = ReturnSelectionXML('selSecond', 'CZ');
        //xmlWeatherScenario 
        var resultWH = ReturnSelectionXML('selThird', 'WH');
        var xmlAccounts = ReturnSelectionXML('selFrth', 'UA');
        var xmlCustomers = ReturnSelectionXML('selSixth', 'CS');
        // Determine How Many Whole Sale Blocks Used
        var CountOfWH = 0;
        // Establish the XML Inputs
        //$('#' + Selector + ' > :selected').each(function () {
        //    CountOfWH = CountOfWH + 1;
        //});
        var mergedData;
        var dataGraphTest;
        var iArrayRows = 1;
        var iRecords = [2, 3];
        var xmlInput = '';
        var WHValue = '0';
        var WHText = 'N/A';
        //var listItems = $("#" + ControlToSet + " li");
        var SelIndex = 0;
        var SelText = '';
        // Loop through each of the notes
        var ControlToSet = 'selThird';
        var CheckboxToSet = ControlToSet;
        dataGraphTest = ObtainVolumetricRiskGraphData(xmlMonths, xmlCongestionZone, xmlAccounts, xmlCustomers, xmlInput);
        mergedData = dataGraphTest;
        if (mergedData === undefined) {
            $("#columnchart_stacked").hide();
            $("#table_div").hide();
            alertify.error("No values present in results");
            return;
        } else {
            $("#columnchart_stacked").show();
            $("#table_div").show();
            alertify.success('Finished Processing');
        }
        // Ensure that it is sorted by month id
        mergedData.sort({ column: 0, desc: false });
        // Remove the Month ID
        mergedData.removeColumn(0);
        // Remove the Long Month Name
        mergedData.removeColumn(0);
        var colName = "Shaping Premium";
        mergedData.setColumnLabel(1, colName)
        colName = "Volumetric Risk Premium";
        mergedData.setColumnLabel(2, colName)
        var numberFormat = new google.visualization.NumberFormat({
            pattern: '#,####.##%'
        });
        ///formatter.format(data, 1); // Apply formatter to second column
        numberFormat.format(mergedData, 1); // Apply formatter to First column.
        numberFormat.format(mergedData, 2); // Apply formatter to Second column.

        var options = {
            width: '100%',
            height: 500,
            legend: { position: 'top', maxLines: 3 },
            bar: { groupWidth: '75%' },
            isStacked: true,            
            chartArea: {
                width: "85%"
            },
            title: 'Components of Retail Risk',
            hAxis: {
                title: 'Month'
            },
            vAxis: {
                title: 'Shaping Premium And Volumetric Risk Premium',
                format: "percent"
            },
        };
        chart = new google.visualization.ColumnChart(document.getElementById('columnchart_stacked'));

        google.visualization.events.addListener(chart, 'select', function () {
            highlightBar(chart, options);
        });
        chart.draw(mergedData, options);
        dataTableTest = ObtainVolumetricRiskGraphData(xmlMonths, xmlCongestionZone, xmlAccounts, xmlCustomers, xmlInput);
        dataTableTest = transposeLoadResearchVolumetricRisk(dataTableTest);
        var numberFormat = new google.visualization.NumberFormat({
            pattern: '#,####.##%'
        });
        for (iCol = 1; iCol < dataTableTest.getNumberOfColumns(); iCol++) {
            numberFormat.format(dataTableTest, iCol);
        }
        var optionsTable = {
            showRowNumber: false,
            width: '100%',
            height: '90%',
            cssClassNames: {
                headerCell: 'customHeader'
            }
        };
        

     
        var table = new google.visualization.Table(document.getElementById('table_div'));
        //table.draw(dataView, { showRowNumber: false, width: '100%', height: '90%' });
        table.draw(dataTableTest, optionsTable);
        $("#table_div").show();
    }
    catch (e) {
        alertify.error(e);
    }
}

function redrawChartMonthly() {
    try {
        // ***************************************************
        // Function to Obtain the Monthly Chart
        // ***************************************************
        // Establish the XML Inputs
        var xmlMonths = ReturnSelectionXML('selFirst', 'MN');
        var xmlCongestionZone = ReturnSelectionXML('selSecond', 'CZ');
        //xmlWeatherScenario 
        var resultWH = ReturnSelectionXML('selThird', 'WH');
        var xmlAccounts = ReturnSelectionXML('selFrth', 'UA');
        var xmlCustomers = ReturnSelectionXML('selSixth', 'CS');
        // Determine How Many Whole Sale Blocks Used
        var CountOfWH = 0;        
        // Establish the XML Inputs
        //$('#' + Selector + ' > :selected').each(function () {
        //    CountOfWH = CountOfWH + 1;
        //});
        var mergedData;
        var dataGraphTest;
        var iArrayRows = 1;
        var iRecords = [2, 3];
        var xmlInput = '';
        var WHValue = '0';
        var WHText = 'N/A';        
        //var listItems = $("#" + ControlToSet + " li");
        var SelIndex = 0;
        var SelText = '';
        // Loop through each of the notes
        var ControlToSet = 'selThird';
        var CheckboxToSet = ControlToSet;
        var formatter = new google.visualization.NumberFormat({ pattern: '#,###' });
        $("#" + ControlToSet + " li").each(function (index) {
            //alertify.error(index + ": " + $(this).text() + ' - ' + $(this).val());
            CheckboxToSet = ControlToSet + '_CHK_' + $(this).val();
            // Place Text and Identifier into the mix
            SelIndex = $(this).val();
            SelText = $(this).text();
            if ((($('#' + CheckboxToSet).is(':checked')) == true) || (resultWH == '')) {
                WHText = SelText;
                xmlInput = '<Row><WH>' + SelIndex + '</WH></Row>'
                dataGraphTest = ObtainMonthlyGraphData(xmlMonths, xmlCongestionZone, xmlAccounts, xmlInput, xmlCustomers, WHText);                
                formatter.format(dataGraphTest, 3);
                if (dataGraphTest.getNumberOfRows() > 0) {
                    if (iArrayRows == 1) {
                        mergedData = dataGraphTest;
                    } else if (iArrayRows == 2) {
                        mergedData = google.visualization.data.join(mergedData, dataGraphTest, 'full', [[1, 1]], iRecords, [3]);
                    } else if (iArrayRows == 3) {
                        iRecords = [1, 2, 3];
                        var TestVal = [1, 2, 3];
                        mergedData = mergedData = google.visualization.data.join(mergedData, dataGraphTest, 'full', [[0, 1]], iRecords, [3]);
                        //iRecords = [0, 1, 2, 3];
                    } else {
                        iRecords.push(iArrayRows);
                        mergedData = google.visualization.data.join(mergedData, dataGraphTest, 'full', [[0, 1]], iRecords, [3]);
                    }
                    if (mergedData === undefined) {
                        $("#columnchart_stacked").hide();
                        $("#table_div").hide();
                        alertify.error("No values present in results");
                        return;
                    }
                    iArrayRows = iArrayRows + 1;
                }                
            }
        });
        if (mergedData === undefined) {
            $("#columnchart_stacked").hide();
            $("#table_div").hide();
            alertify.error("No values present in results");
            return;
        } else {
            $("#columnchart_stacked").show();
            $("#table_div").show();
            alertify.success('Finished Processing');
        }
        var iCounterOfRows = mergedData.getNumberOfRows();
        var iCountOfColumns = mergedData.getNumberOfColumns();
        var FirstColumnName = mergedData.getColumnLabel(0);
        if (FirstColumnName != "MonthsNamesID") {
            mergedData.removeColumn(0);
        };
        // Pull in Whole Sale Block
        iCountOfColumns = mergedData.getNumberOfColumns();
        var urlMain = '/Services/WCFWebService.svc/AllWholeSaleBlocksGetInfo';
        var ColorsM = GraphingReturnColors(urlMain, mergedData, 2);
        mergedData.sort({ column: 0, desc: false });
        mergedData.removeColumn(0);
        var options = {
            title: 'Weather Normal Monthly Energy Use by Wholesale Block (MWH)',
            legend: { position: 'top' },
            bar: { groupWidth: '75%' },
            width: '100%',
            isStacked: true,
            colors: ColorsM,
            hAxis: {
                title: 'Month'                
            },
            vAxis: {
                title: 'MWh'
            }
            
        };
        chart = new google.visualization.ColumnChart(document.getElementById('columnchart_stacked'));
        google.visualization.events.addListener(chart, 'select', function () {
            highlightBar(chart, options, view);
        });
        chart.draw(mergedData, options);
        // Build the tables
        var xmlMonths = ReturnSelectionXML('selFirst', 'MN');
        var xmlCongestionZone = ReturnSelectionXML('selSecond', 'CZ');

        var xmlinputWholesaleBlock = ReturnSelectionXML('selThird', 'WH');
        var xmlAccounts = ReturnSelectionXML('selFrth', 'UA');

        var DataInput = '';
        var urlMain;
        //&CongestionZoneString={CongestionZoneString}&MonthsString={MonthsString}&UtilityAccountString
        if (xmlinputWholesaleBlock != '') {
            DataInput = "WholeBlockString=" + xmlinputWholesaleBlock;
        }
        if (xmlCongestionZone != '') {
            if (DataInput != '') {
                DataInput = "CongestionZoneString=" + xmlCongestionZone;
            } else {
                DataInput = DataInput + "&CongestionZoneString=" + xmlCongestionZone;
            }
        }
        if (xmlMonths != '') {
            if (DataInput == '') {
                DataInput = "MonthsString=" + xmlMonths;
            }
            else {
                DataInput = DataInput + "&MonthsString=" + xmlMonths;
            }
        }
        if (xmlAccounts != '') {
            if (DataInput == '') {
                DataInput = "UtilityAccountString=" + xmlAccounts;
            }
            else {
                DataInput = DataInput + "&UtilityAccountString=" + xmlAccounts;
            }
        }
        urlMain = '/Services/WCFWebService.svc/MonthlyGraphsGetInfo/?WholeBlockString=' + xmlinputWholesaleBlock + DataInput;// '&CongestionZoneString=NA&MonthsString=NA';
        urlMain = '/Services/WCFWebService.svc/MonthlyGraphsGetInfo/?' + DataInput;// '&CongestionZoneString=NA&MonthsString=NA';
        if (DataInput == '') {
            urlMain = '/Services/WCFWebService.svc/MonthlyTableGraphsGetInfo'
        } else {
            urlMain = '/Services/WCFWebService.svc/MonthlyTableGraphsGetInfo/?' + DataInput;
        }
        var blJan = false;
        var blFeb = false;
        var blMar = false;
        var blApr = false;
        var blMay = false;
        var blJun = false;
        var blJul = false;
        var blAug = false;
        var blSep = false;
        var blOct = false;
        var blNov = false;
        var blDec = false;
        var blAllCheck = false;
        var MnthID = 0;
        Selector = "selFirst";
        $('#' + Selector + ' > :selected').each(function () {
            MnthID = $(this).val();
            if (MnthID == 1) {
                blJan = true;
                blAllCheck = true;
            } else if (MnthID == 2) {
                blFeb = true;
                blAllCheck = true;
            } else if (MnthID == 3) {
                blMar = true;
                blAllCheck = true;
            } else if (MnthID == 4) {
                blApr = true;
                blAllCheck = true;
            } else if (MnthID == 5) {
                blMay = true;
                blAllCheck = true;
            } else if (MnthID == 6) {
                blJun = true;
                blAllCheck = true;
            } else if (MnthID == 7) {
                blJul = true;
                blAllCheck = true;
            } else if (MnthID == 8) {
                blAug = true;
                blAllCheck = true;
            } else if (MnthID == 9) {
                blSep = true;
                blAllCheck = true;
            } else if (MnthID == 10) {
                blOct = true;
                blAllCheck = true;
            } else if (MnthID == 11) {
                blNov = true;
                blAllCheck = true;
            } else if (MnthID == 12) {
                blDec = true;
                blAllCheck = true;
            }
        });
        // Set All
        if (blAllCheck == false) {
            blJan = true;
            blFeb = true;
            blMar = true;
            blApr = true;
            blMay = true;
            blJun = true;
            blJul = true;
            blAug = true;
            blSep = true;
            blOct = true;
            blNov = true;
            blDec = true;
        }
        var ResultData = ReturnDataFromService(urlMain);
        var dataView = new google.visualization.DataTable();
        dataView.addColumn('string', 'Wholesale Block');
        dataView.addColumn('number', 'Jan');
        dataView.addColumn('number', 'Feb');
        dataView.addColumn('number', 'Mar');
        dataView.addColumn('number', 'Apr');
        dataView.addColumn('number', 'May');
        dataView.addColumn('number', 'Jun');
        dataView.addColumn('number', 'Jul');
        dataView.addColumn('number', 'Aug');
        dataView.addColumn('number', 'Sep');
        dataView.addColumn('number', 'Oct');
        dataView.addColumn('number', 'Nov');
        dataView.addColumn('number', 'Dec');

        ResultData.forEach(function (row) {
            dataView.addRow([
                row.WholeSaleBlocks,
                row.Jan,
                row.Feb,
                row.Mar,
                row.Apr,
                row.May,
                row.Jun,
                row.Jul,
                row.Aug,
                row.Sep,
                row.Oct,
                row.Nov,
                row.Dec,
            ]);
        });
        var iColM = 1;
        for (iColM = 1; iColM <= 12; iColM++) {
            formatter.format(dataView, iColM);
        }
        
        var iDeleteCounter = 1;
        if (blJan == false) {
            dataView.removeColumn(1);
            iDeleteCounter = iDeleteCounter + 1;
        }
        if (blFeb == false) {
            dataView.removeColumn(3 - iDeleteCounter);
            iDeleteCounter = iDeleteCounter + 1;
        }
        if (blMar == false) {
            dataView.removeColumn(4 - iDeleteCounter);
            iDeleteCounter = iDeleteCounter + 1;
        }
        if (blApr == false) {
            dataView.removeColumn(5 - iDeleteCounter);
            iDeleteCounter = iDeleteCounter + 1;
        }
        if (blMay == false) {
            dataView.removeColumn(6 - iDeleteCounter);
            iDeleteCounter = iDeleteCounter + 1;
        }
        if (blJun == false) {
            dataView.removeColumn(7 - iDeleteCounter);
            iDeleteCounter = iDeleteCounter + 1;
        }
        if (blJul == false) {
            dataView.removeColumn(8 - iDeleteCounter);
            iDeleteCounter = iDeleteCounter + 1;
        }
        if (blAug == false) {
            dataView.removeColumn(9 - iDeleteCounter);
            iDeleteCounter = iDeleteCounter + 1;
        }
        if (blSep == false) {
            dataView.removeColumn(10 - iDeleteCounter);
            iDeleteCounter = iDeleteCounter + 1;
        }
        if (blOct == false) {
            dataView.removeColumn(11 - iDeleteCounter);
            iDeleteCounter = iDeleteCounter + 1;
        }
        if (blNov == false) {
            dataView.removeColumn(12 - iDeleteCounter);
            iDeleteCounter = iDeleteCounter + 1;
        }
        if (blDec == false) {
            dataView.removeColumn(13 - iDeleteCounter);
            iDeleteCounter = iDeleteCounter + 1;
        }
        iColM = 0;
        dataView.addColumn('number', 'Total');
        var iCounterOfRows = dataView.getNumberOfRows();
        var iCountOfColumns = dataView.getNumberOfColumns();
        var iRow = 0;
        var iCol = 0;
        var Total = 0;
        for (iRow = 0; iRow < iCounterOfRows; iRow++) {
            Total = 0;
            for (iCol = 1; iCol < iCountOfColumns; iCol++) {
                formatter.format(dataView, iCol);
                if (iCol == (iCountOfColumns - 1)) {
                    dataView.setValue(iRow, iCol, Total);                    
                } else {
                    Total = Total + dataView.getValue(iRow, iCol);
                }
            }
        }
        formatter.format(dataView, iCountOfColumns - 1);

        var optionsTable = {
            showRowNumber: false,
            width: '100%',
            height: '90%',
            cssClassNames: {
                headerCell: 'customHeader'
            },
        }
        var table = new google.visualization.Table(document.getElementById('table_div'));
        table.draw(dataView, optionsTable );
        

    }
    catch (e) {
        $("#columnchart_stacked").hide();
        $("#table_div").hide();
        alertify.error(e);
    }
}

function redrawChartRiskMonthlyDetail() {
    try {
        // ***************************************************
        // Function to Obtain the Monthly Chart
        // ***************************************************
        // Establish the XML Inputs
        var xmlBookOfBusineess = ReturnSelectionXML('selFirst', 'BOB');
        var xmlLineOfBusiness = ReturnSelectionXML('selSecond', 'LOB');
        var xmlCongestionZone = ReturnSelectionXML('selThird', 'CZ');        
        var StartDate = ReturnDateFromDateInput('dtStartDate');
        var EndDate = ReturnDateFromDateInput('dtEndDate');

        
        // Determine How Many Whole Sale Blocks Used
        var CountOfWH = 0;
        // Establish the XML Inputs
        //$('#' + Selector + ' > :selected').each(function () {
        //    CountOfWH = CountOfWH + 1;
        //});
        var mergedData;
        var dataGraphTest;
        var iArrayRows = 1;
        var iRecords = [2, 3];
        var xmlInput = '';
        var WHValue = '0';
        var WHText = 'N/A';
        //var listItems = $("#" + ControlToSet + " li");
        var SelIndex = 0;
        var SelText = '';
        // Loop through each of the notes
        var ControlToSet = 'selFirst';
        var CheckboxToSet = ControlToSet;
        var resultBOB = xmlBookOfBusineess;
        $("#" + ControlToSet + " li").each(function (index) {
            //alertify.error(index + ": " + $(this).text() + ' - ' + $(this).val());
            CheckboxToSet = ControlToSet + '_CHK_' + $(this).val();
            // Place Text and Identifier into the mix
            SelIndex = $(this).val();
            SelText = $(this).text();
            SelText = SelText.trimLeft();
            SelText = SelText.trimRight();
            if ((($('#' + CheckboxToSet).is(':checked')) == true) || (resultBOB == '')) {
                WHText = SelText.trim();
                xmlInput = '<Row><BOB>' + SelIndex + '</BOB></Row>'
                dataGraphTest = ObtainRiskMonthlyDetailGraphData(xmlInput , xmlLineOfBusiness, xmlCongestionZone, StartDate, EndDate, 1)
                // Remove the necessary rows
                // Remove Book of Business
                dataGraphTest.removeColumn(0);
                // Remove the Date String
                dataGraphTest.removeColumn(1);
                // Remove the non Net Revenue Columns
                dataGraphTest.removeColumn(1);
                dataGraphTest.removeColumn(1);
                dataGraphTest.removeColumn(1);
                dataGraphTest.removeColumn(1);
                dataGraphTest.removeColumn(1);
                dataGraphTest.removeColumn(1);
                dataGraphTest.removeColumn(1);
                dataGraphTest.removeColumn(1);
                dataGraphTest.removeColumn(1);
                dataGraphTest.removeColumn(1);
                dataGraphTest.removeColumn(1);
                dataGraphTest.setColumnLabel(1, SelText);
                if (dataGraphTest.getNumberOfRows() > 0) {
                    if (iArrayRows == 1) {
                        mergedData = dataGraphTest;
                    } else if (iArrayRows == 2) {
                        iRecords = [1];
                        mergedData = google.visualization.data.join(mergedData, dataGraphTest, 'full', [[0, 0]], iRecords, [1]);
                    } else if (iArrayRows == 3) {
                        iRecords = [1, 2];                        
                        mergedData = mergedData = google.visualization.data.join(mergedData, dataGraphTest, 'full', [[0, 0]], iRecords, [1]);                        
                    } else {
                        iRecords.push(iArrayRows-1);
                        mergedData = google.visualization.data.join(mergedData, dataGraphTest, 'full', [[0, 0]], iRecords, [3]);
                    }
                    if (mergedData === undefined) {
                        $("#columnchart_stacked").hide();
                        $("#table_div").hide();
                        alertify.error("No values present in results");
                        return;
                    }
                    iArrayRows = iArrayRows + 1;
                }
            }
        });
        if (mergedData === undefined) {
            $("#columnchart_stacked").hide();
            $("#table_div").hide();
            alertify.error("No values present in results");
            return;
        } else {
            $("#columnchart_stacked").show();
            $("#table_div").show();
            alertify.success('Finished Processing');
        }
        var iCounterOfRows = mergedData.getNumberOfRows();
        var iCountOfColumns = mergedData.getNumberOfColumns();
        var FirstColumnName = mergedData.getColumnLabel(0);
        //if (FirstColumnName != "MonthsNamesID") {
        //    mergedData.removeColumn(0);
        //};
        //mergedData.setColumnProperties(0, 'pattern', 'MM-dd-yyyy');
        var newDataTable = new google.visualization.DataTable();
        var iRows = mergedData.getNumberOfRows();
        var iCols = mergedData.getNumberOfColumns();


        newDataTable.addColumn('date', 'Delivery Date');
        newDataTable.addRows(iRows + 1);
        // Need to do this for all variables
        for (i = 0; i < iRows; i++) {            
            var d = new Date(mergedData.getValue(i, 0));
            newDataTable.setCell(i, 0, d);
        }


        //var formatter_short = new google.visualization.DateFormat({ pattern: 'MMM-yyyy' });
        //formatter_short.format(mergedData, 0);
        var urlMain = '/Services/WCFWebService.svc/AllBookOfBusinessGetInfo';
        var ColorsM = GraphingReturnColors(urlMain, mergedData, 1);        
        var options = {
            width: '100%',//1500,
            height: 400,
            legend: { position: 'top' },
            bar: { groupWidth: '75%' },
            isStacked: false,
            colors: ColorsM,
            hAxis: { ticks: mergedData.getDistinctValues(0), format: "MMM-yyyy", minTextSpacing: 2, showTextEvery: 1, textPosition: 'out', titleTextStyle: { italic: false, color: 'Black' }, title: "Months", gridlines: { count: -1 } },
            chartArea: {
                width: "100%"
            },
        };
        chart = new google.visualization.ColumnChart(document.getElementById('columnchart_stacked'));
        google.visualization.events.addListener(chart, 'select', function () {
            highlightBar(chart, options, view);
        });
        chart.draw(mergedData, options);        
        dataGraphTest = ObtainRiskMonthlyDetailGraphData(xmlBookOfBusineess, xmlLineOfBusiness, xmlCongestionZone, StartDate, EndDate, 2);
        dataGraphTest.removeColumn(0);
        dataGraphTest.removeColumn(0);
        SelText = 'Delivery Date';
        dataGraphTest.setColumnLabel(0, SelText);
        dataGraphTest.setColumnProperties(0, 'type', 'date');
        dataGraphTest.sort({ column: 0, desc: false });        
        var formatter_short = new google.visualization.DateFormat({ formatType: 'medium' });
        formatter_short.format(dataGraphTest, 0);
        
        dataGraphTest=transposeDateDataTableRiskMonthlyDetail(dataGraphTest);
        var table = new google.visualization.Table(document.getElementById('table_div'));
        var optionsTable = {
            showRowNumber: false,
            width: '100%',
            height: '90%',
            cssClassNames: {
                headerCell: 'customHeader'
            }
        };
        table.draw(dataGraphTest, optionsTable);
    }
    catch (e) {
        $("#columnchart_stacked").hide();
        $("#table_div").hide();
        alertify.error(e);
    }
}

function redrawChartRiskMonthlyPosition() {
    try {
        // ***************************************************
        // Function to Obtain the Monthly Chart
        // ***************************************************
        // Establish the XML Inputs
        var xmlBookOfBusineess = ReturnSelectionXML('selFirst', 'BOB');
        var xmlLineOfBusiness = ReturnSelectionXML('selSecond', 'LOB');
        var xmlCongestionZone = ReturnSelectionXML('selThird', 'CZ');
        var StartDate = ReturnDateFromDateInput('dtStartDate');
        var EndDate = ReturnDateFromDateInput('dtEndDate');


        // Determine How Many Whole Sale Blocks Used
        var CountOfWH = 0;
        // Establish the XML Inputs
        //$('#' + Selector + ' > :selected').each(function () {
        //    CountOfWH = CountOfWH + 1;
        //});
        var mergedData;
        var dataGraphTest;
        var iArrayRows = 1;
        var iRecords = [2, 3];
        var xmlInput = '';
        var WHValue = '0';
        var WHText = 'N/A';
        //var listItems = $("#" + ControlToSet + " li");
        var SelIndex = 0;
        var SelText = '';
        // Loop through each of the notes
        var ControlToSet = 'selFirst';
        var CheckboxToSet = ControlToSet;
        var resultBOB = xmlBookOfBusineess;
        var ArrayOfColors = []; 
        $("#" + ControlToSet + " li").each(function (index) {
            //alertify.error(index + ": " + $(this).text() + ' - ' + $(this).val());
            CheckboxToSet = ControlToSet + '_CHK_' + $(this).val();
            // Place Text and Identifier into the mix
            SelIndex = $(this).val();
            SelText = $(this).text();
            SelText = SelText.trimLeft();
            SelText = SelText.trimRight();
            if (SelText == 'Load') {
                ArrayOfColors.push('#E66C37');
            } else if (SelText == 'NOP') {
                ArrayOfColors.push('#118DFF');
            } else if (SelText == 'Supply') {
                ArrayOfColors.push('#12239E');
            }                
            if ((($('#' + CheckboxToSet).is(':checked')) == true) || (resultBOB == '')) {
                WHText = SelText.trim();
                xmlInput = '<Row><BOB>' + SelIndex + '</BOB></Row>'

                dataGraphTest = ObtainRiskMonthlyPositionGraphData(xmlInput, xmlLineOfBusiness, xmlCongestionZone, StartDate, EndDate, 1)
                
                if (dataGraphTest != undefined) {
                    // Remove the necessary rows
                    // Remove Book of Business
                    dataGraphTest.removeColumn(0);
                    dataGraphTest.removeColumn(1);
                    // Remove the non Net Revenue Columns
                    dataGraphTest.removeColumn(1);
                    dataGraphTest.removeColumn(1);
                    dataGraphTest.setColumnLabel(1, SelText);
                    if (dataGraphTest.getNumberOfRows() > 0) {
                        if (iArrayRows == 1) {
                            mergedData = dataGraphTest;
                        } else if (iArrayRows == 2) {
                            iRecords = [1];
                            mergedData = google.visualization.data.join(mergedData, dataGraphTest, 'full', [[0, 0]], iRecords, [1]);
                        } else if (iArrayRows == 3) {
                            iRecords = [1, 2];
                            mergedData = mergedData = google.visualization.data.join(mergedData, dataGraphTest, 'full', [[0, 0]], iRecords, [1]);
                        } else {
                            iRecords.push(iArrayRows - 1);
                            mergedData = google.visualization.data.join(mergedData, dataGraphTest, 'full', [[0, 0]], iRecords, [3]);
                        }
                        if (mergedData === undefined) {
                            $("#columnchart_stacked").hide();
                            $("#table_div").hide();
                            alertify.error("No values present in results");
                            return;
                        }
                        iArrayRows = iArrayRows + 1;
                    }
                }
            }
        });
        if (mergedData === undefined) {
            $("#columnchart_stacked").hide();
            $("#table_div").hide();
            alertify.error("No values present in results");
            return;
        } else {
            $("#columnchart_stacked").show();
            $("#table_div").show();
            alertify.success('Finished Processing');
        }
        var iCounterOfRows = mergedData.getNumberOfRows();
        var iCountOfColumns = mergedData.getNumberOfColumns();
        var FirstColumnName = mergedData.getColumnLabel(0);

        mergedData.sort({ column: 0, desc: false });
        var urlMain = '/Services/WCFWebService.svc/AllBookOfBusinessGetInfo';
        var ColorsM = GraphingReturnColors(urlMain, mergedData, 1);        

        var options = {
            width: '100%',//1500,
            height: 400,
            legend: { position: 'top', maxLines: 3 },
            bar: { groupWidth: '75%' },
            isStacked: false,
            hAxis: { ticks: mergedData.getDistinctValues(0), format: "MMM-yyyy", minTextSpacing: 2, showTextEvery: 1, textPosition: 'out', titleTextStyle: { italic: false, color: 'Black' }, title: "Months", gridlines: { count: -1 } },
            vAxis: {title: "Gross Usage MW"},
            chartArea: {
                width: "90%"
            },
            colors: ColorsM,
        };
        chart = new google.visualization.AreaChart(document.getElementById('columnchart_stacked'));
        google.visualization.events.addListener(chart, 'select', function () {
            highlightBar(chart, options, view);
        });
        chart.draw(mergedData, options);
        //dataGraphTest = ObtainRiskMonthlyPositionGraphData(xmlBookOfBusineess, xmlLineOfBusiness, xmlCongestionZone, StartDate, EndDate, 1);
        //dataGraphTest.removeColumn(0);
        //dataGraphTest.removeColumn(0);
        SelText = 'Delivery Date';
        dataGraphTest.setColumnLabel(0, SelText);
        dataGraphTest = transposeDateDataTableRiskMonthlyDetail(mergedData);
        var optionsTable = {
            showRowNumber: false,
            width: '100%',
            height: '90%',
            
            cssClassNames: {
                headerCell: 'customHeader'
            }
        };
        var table = new google.visualization.Table(document.getElementById('table_div'));
        table.draw(dataGraphTest, optionsTable );
    }
    catch (e) {
        $("#columnchart_stacked").hide();
        $("#table_div").hide();
        alertify.error(e);
    }
}

function redrawChartRiskHourlyPosition() {
    try {
        // ***************************************************
        // Function to Obtain the Monthly Chart
        // ***************************************************
        // Establish the XML Inputs
        var xmlBookOfBusineess = ReturnSelectionXML('selFirst', 'BOB');
        var xmlLineOfBusiness = ReturnSelectionXML('selSecond', 'LOB');
        var xmlCongestionZone = ReturnSelectionXML('selThird', 'CZ');
        var xmlWholeSaleBlock = ReturnSelectionXML('selFrth', 'WH');
        var xmlMonthsString = ReturnSelectionXML('selFifth', 'MN');


        // Determine How Many Whole Sale Blocks Used
        var CountOfWH = 0;
        // Establish the XML Inputs
        //$('#' + Selector + ' > :selected').each(function () {
        //    CountOfWH = CountOfWH + 1;
        //});
        var mergedData;
        var dataGraphTest;
        var iArrayRows = 1;
        var iRecords = [2, 3];
        var xmlInput = '';
        var WHValue = '0';
        var WHText = 'N/A';
        //var listItems = $("#" + ControlToSet + " li");
        var SelIndex = 0;
        var SelText = '';
        // Loop through each of the notes
        var ControlToSet = 'selFirst';
        var CheckboxToSet = ControlToSet;
        var resultBOB = xmlBookOfBusineess;
        var ArrayOfColors = [];
        $("#" + ControlToSet + " li").each(function (index) {
            //alertify.error(index + ": " + $(this).text() + ' - ' + $(this).val());
            CheckboxToSet = ControlToSet + '_CHK_' + $(this).val();
            // Place Text and Identifier into the mix
            SelIndex = $(this).val();
            SelText = $(this).text();
            SelText = SelText.trimLeft();
            SelText = SelText.trimRight();
            if (SelText == 'Load') {
                ArrayOfColors.push('#E66C37');
            } else if (SelText == 'NOP') {
                ArrayOfColors.push('#118DFF');
            } else if (SelText == 'Supply') {
                ArrayOfColors.push('#12239E');
            }
            if ((($('#' + CheckboxToSet).is(':checked')) == true) || (resultBOB == '')) {
                WHText = SelText.trim();
                xmlInput = '<Row><BOB>' + SelIndex + '</BOB></Row>'

                dataGraphTest = ObtainRiskHourlyPositionGraphData(xmlInput, xmlLineOfBusiness, xmlCongestionZone, xmlWholeSaleBlock, xmlMonthsString);

                if (dataGraphTest != undefined) {
                    // Remove the necessary rows
                    // Remove Book of Business
                    dataGraphTest.removeColumn(0);
                    // Remove the non Net Revenue Columns
                    dataGraphTest.removeColumn(1);
                    dataGraphTest.setColumnLabel(1, SelText);
                    if (dataGraphTest.getNumberOfRows() > 0) {
                        if (iArrayRows == 1) {
                            mergedData = dataGraphTest;
                        } else if (iArrayRows == 2) {
                            iRecords = [1];
                            mergedData = google.visualization.data.join(mergedData, dataGraphTest, 'full', [[0, 0]], iRecords, [1]);
                        } else if (iArrayRows == 3) {
                            iRecords = [1, 2];
                            mergedData = mergedData = google.visualization.data.join(mergedData, dataGraphTest, 'full', [[0, 0]], iRecords, [1]);
                        } else {
                            iRecords.push(iArrayRows - 1);
                            mergedData = google.visualization.data.join(mergedData, dataGraphTest, 'full', [[0, 0]], iRecords, [3]);
                        }
                        if (mergedData === undefined) {
                            $("#columnchart_stacked").hide();
                            $("#table_div").hide();
                            alertify.error("No values present in results");
                            return;
                        }
                        iArrayRows = iArrayRows + 1;
                    }
                }
            }
        });
        if (mergedData === undefined) {
            $("#columnchart_stacked").hide();
            $("#table_div").hide();
            alertify.error("No values present in results");
            return;
        } else {
            $("#columnchart_stacked").show();
            $("#table_div").show();
            alertify.success('Finished Processing');
        }
        var iCounterOfRows = mergedData.getNumberOfRows();
        var iCountOfColumns = mergedData.getNumberOfColumns();
        var FirstColumnName = mergedData.getColumnLabel(0);
        var urlMain = '/Services/WCFWebService.svc/AllBookOfBusinessGetInfo';
        var ColorsM = GraphingReturnColors(urlMain, mergedData, 1);        

        mergedData.sort({ column: 0, desc: false });
        var options = {
            width: '100%',//1500,
            height: 400,
            legend: { position: 'top', maxLines: 3 },
            bar: { groupWidth: '75%' },
            isStacked: false,
            title: 'Gross Usage MW by Hour and Type',
            hAxis: { title: 'Hours' },
            vAxis: { title: 'Gross Usage (MW)' },
            chartArea: {
                width: "90%"
            },
            colors: ColorsM,
        };
        chart = new google.visualization.ColumnChart(document.getElementById('columnchart_stacked'));
        google.visualization.events.addListener(chart, 'select', function () {
            highlightBar(chart, options, view);
        });
        chart.draw(mergedData, options);
    }
    catch (e) {
        $("#columnchart_stacked").hide();
        $("#table_div").hide();
        alertify.error(e);
    }
}

function redrawChartRiskWholeSaleTradeSettlementPositionPosition() {
    try {
        // ***************************************************
        // Function to Obtain the Monthly Chart
        // ***************************************************
        // Establish the XML Inputs
        var xmlCounterParty = ReturnSelectionXML('selFirst', 'CT');
        var xmlMonthsString = ReturnSelectionXML('selSecond', 'MN');
        // Determine How Many Whole Sale Blocks Used
        var ApplyTotals = 1;
        dataGraphTest = ObtainRiskWholeSaleTradeSettlementPositionGraphData(xmlCounterParty, xmlMonthsString, ApplyTotals);
        // Remove Data Unneeded Data        
        PieView = new google.visualization.DataView(dataGraphTest);
        PieView.setRows(dataGraphTest.getFilteredRows([{ column: 4, value: 2 }]));
        PieView.hideColumns([1,2,4]);

        TableView = new google.visualization.DataView(dataGraphTest);
        TableView.setRows(dataGraphTest.getFilteredRows([{ column: 4, value: 1 }]));
        TableView.hideColumns([4]);

        DT = new google.visualization.DataTable();
        PV = new google.visualization.DataTable();

        DT.addColumn('string', 'CounterParty');
        DT.addColumn('string', 'DealID');
        DT.addColumn('number', 'Volume');
        DT.addColumn('number', 'Cost');
        DT.addColumn('number', 'TypeOfRecord');

        PV.addColumn('string', 'CounterParty');
        PV.addColumn('number', 'Cost');

        var iRows;
        var iRowsLimit = TableView.getNumberOfRows();
        var iCols;
        var iColsLimit = TableView.getNumberOfColumns();
        DT.addRows(TableView.getNumberOfRows());
        for (iRows = 0; iRows < iRowsLimit; iRows++) {
            for (iCols = 0; iCols < iColsLimit; iCols++) {
                DT.setValue(iRows, iCols, TableView.getValue(iRows, iCols));
            }
        }
        DT.removeColumn(4);

        var iRowsLimit = PieView.getNumberOfRows();        
        var iColsLimit = 1;
        PV.addRows(PieView.getNumberOfRows());
        for (iRows = 0; iRows < iRowsLimit; iRows++) {
            for (iCols = 0; iCols < iColsLimit; iCols++) {                
                PV.setValue(iRows, iCols, PieView.getValue(iRows, iCols));                
            }
        }        


        iRowsLimit = DT.getNumberOfRows();
        iRowsBase = 600;

        var numberFormatDollars = new google.visualization.NumberFormat({
            pattern: 'currency'
        });
        numberFormatDollars.format(DT, 3);
        numberFormatDollars.format(PV, 1);

        if (PieView === undefined) {
            $("#columnchart_stacked").hide();
            $("#table_div").hide();
            alertify.error("No values present in results");
            return;
        } else {
            $("#columnchart_stacked").show();
            $("#table_div").show();
            alertify.success('Finished Processing');
        }
        var options = {
            width: '100%',//1500,
            height: '600',
            title: 'Cost By Counterparty',
            legend: { position: 'top', maxLines: 3 },                        
            chartArea: {
                width: "100%"
            },            
            pieSliceText: 'value-and-percentage',
        };
        chart = new google.visualization.PieChart(document.getElementById('columnchart_CT'));
        google.visualization.events.addListener(chart, 'select', function () {
            highlightBar(chart, options, view);
        });
        chart.draw(PieView, options);


        var numberFormat = new google.visualization.NumberFormat({
            pattern: '#,####'
        });
        //numberFormat.format(DT, 2);
        var optionsTable = {
            showRowNumber: false,
            width: '100%',
            height: '90%',
            cssClassNames: {
                headerCell: 'customHeader'
            }
        }

        var table = new google.visualization.Table(document.getElementById('table_divCT'));
        table.draw(DT, optionsTable);
    }
    catch (e) {
        $("#columnchart_stacked").hide();
        $("#table_div").hide();
        alertify.error(e);
    }
}

function redrawChartRiskWholeSaleTradesPosition() {
    try {
        // ***************************************************
        // Function to Obtain the Monthly Chart
        // ***************************************************
        // Establish the XML Inputs
        // Determine How Many Whole Sale Blocks Used
        var ApplyTotals = 1;
        var urlMain = '/Services/WCFWebService.svc/RiskWholeSaleTradesGraphsAndTablesGetInfo'; ///?' + DataInput;// '&CongestionZoneString=NA&MonthsString=NA';
        var ResultDataGraphsTables = ReturnDataFromService(urlMain);
        var ResultDataGraphsGrossMargin = ResultDataGraphsTables.RiskWholeSaleTradesGraph;
        var ResultDataGraphsVolumeMWH = ResultDataGraphsTables.RiskWholeSaleTradesGraph;
        var ResultDataGraphsTable = ResultDataGraphsTables.RiskWholeSaleTradesTable;
                
        var dataGraphMainGrossMargin = new google.visualization.DataTable();
        var dataGraphMainVolumeMWH = new google.visualization.DataTable();        
        var dataGraphMainTable = new google.visualization.DataTable();        


        // First Graph
        dataGraphMainGrossMargin.addColumn('string', 'CounterParty');        
        dataGraphMainGrossMargin.addColumn('number', 'VolumeMW');
        dataGraphMainGrossMargin.addColumn('number', 'Price');
        dataGraphMainGrossMargin.addColumn('number', 'Fee')
        dataGraphMainGrossMargin.addColumn('number', 'VolumeMWH')
        dataGraphMainGrossMargin.addColumn('number', 'Cost')
        dataGraphMainGrossMargin.addColumn('number', 'MTM')
        dataGraphMainGrossMargin.addColumn('number', 'GrossMargin')     

        // Second Graph
        dataGraphMainVolumeMWH.addColumn('string', 'CounterParty');
        dataGraphMainVolumeMWH.addColumn('number', 'VolumeMW');
        dataGraphMainVolumeMWH.addColumn('number', 'Price');
        dataGraphMainVolumeMWH.addColumn('number', 'Fee')
        dataGraphMainVolumeMWH.addColumn('number', 'VolumeMWH')
        dataGraphMainVolumeMWH.addColumn('number', 'Cost')
        dataGraphMainVolumeMWH.addColumn('number', 'MTM')
        dataGraphMainVolumeMWH.addColumn('number', 'GrossMargin')     

        //Table
        dataGraphMainTable.addColumn('string', 'DealID');
        dataGraphMainTable.addColumn('string', 'DealDate');
        dataGraphMainTable.addColumn('string', 'CounterParty');
        dataGraphMainTable.addColumn('string', 'OtherCP');
        dataGraphMainTable.addColumn('string', 'StartDate');
        dataGraphMainTable.addColumn('string', 'EndDate');
        dataGraphMainTable.addColumn('string', 'SetPoint');
        dataGraphMainTable.addColumn('string', 'SetLocation');
        dataGraphMainTable.addColumn('string', 'Shape');
        dataGraphMainTable.addColumn('number', 'VolumeMW');
        dataGraphMainTable.addColumn('number', 'Price');
        dataGraphMainTable.addColumn('number', 'Fee')
        dataGraphMainTable.addColumn('number', 'VolumeMWH')
        dataGraphMainTable.addColumn('number', 'Cost')
        dataGraphMainTable.addColumn('number', 'MTM')
        dataGraphMainTable.addColumn('number', 'GrossMargin')     
        // Fill the Graphing Data Tables
        ResultDataGraphsGrossMargin.forEach(function (row) {
            dataGraphMainGrossMargin.addRow([
                row.CounterParty,
                row.VolumeMW,
                row.Price,
                row.Fee,
                row.VolumeMWH,
                row.Cost,
                row.MTM,
                row.GrossMargin,
            ]);
        });

        ResultDataGraphsVolumeMWH.forEach(function (row) {
            dataGraphMainVolumeMWH.addRow([
                row.CounterParty,
                row.VolumeMW,
                row.Price,
                row.Fee,
                row.VolumeMWH,
                row.Cost,
                row.MTM,
                row.GrossMargin,
            ]);
        });

        ResultDataGraphsTable.forEach(function (row) {
            dataGraphMainTable.addRow([
                row.DealID,
                row.DealDate,
                row.CounterParty,
                row.OtherCP,
                row.StartDate,
                row.EndDate,
                row.SetPoint,
                row.SetLocation,
                row.Shape,
                row.VolumeMW,
                row.Price,
                row.Fee,
                row.VolumeMWH,
                row.Cost,
                row.MTM,
                row.GrossMargin,
            ]);
        });
        // Remove the unwanted fields
        dataGraphMainGrossMargin.removeColumn(1);
        dataGraphMainGrossMargin.removeColumn(1);
        dataGraphMainGrossMargin.removeColumn(1);
        dataGraphMainGrossMargin.removeColumn(2);
        dataGraphMainGrossMargin.removeColumn(2);
        dataGraphMainGrossMargin.removeColumn(1);

        dataGraphMainVolumeMWH.removeColumn(1);
        dataGraphMainVolumeMWH.removeColumn(1);
        dataGraphMainVolumeMWH.removeColumn(1);
        dataGraphMainVolumeMWH.removeColumn(2);
        dataGraphMainVolumeMWH.removeColumn(2);
        dataGraphMainVolumeMWH.removeColumn(2);              
        // If the first field is not undefined go forward 
        if (dataGraphMainVolumeMWH != undefined) {
            $("#columnchart1_CT").show();
            $("#columnchart2_CT").show();

            var options = {
                width: 400,
                height: 300,
                title: 'Gross Margin by Counterparty',
                legend: { position: 'top', maxLines: 3 },
                //chartArea: {
                //    width: "100%"
                //},
                hAxis: {
                    title: 'Gross Margin', 
                    format: 'short',
                },
                vAxis: {
                    title: 'CounterParty'
                },
            };
            var options2 = {
                width: 400,
                height: 400,
                legend: { position: 'top' },

                //chartArea: {
                //    width: "100%"
                //},
                pieSliceText: 'value-and-percentage',
            };
            var numberFormat = new google.visualization.NumberFormat({
                pattern: '$#,####.##'
            });
            numberFormat.format(dataGraphMainGrossMargin, 1); // Apply formatter to First column.
            numberFormat.format(dataGraphMainVolumeMWH, 1);
            var piechart_options = {
                title: 'Volume MWH by Counterparty',
                width: 750,
                height: 250,
            };
            var barchart_options = {
                title: 'Gross Margin By Counterparty',
                width: 750,
                height: 250,
                legend: 'none',
                hAxis: {
                    title: 'Gross Margin',
                    format: 'short',
                },

            };

            chart = new google.visualization.BarChart(document.getElementById('columnchart1_CT'));
            google.visualization.events.addListener(chart, 'select', function () {
                highlightBar(chart, options, view);
            });
            chart.draw(dataGraphMainGrossMargin, barchart_options);
          
            

            chart2 = new google.visualization.PieChart(document.getElementById('columnchart2_CT'));
            google.visualization.events.addListener(chart2, 'select', function () {
                highlightBar(chart, options2, view);});
            chart2.draw(dataGraphMainVolumeMWH, piechart_options);   
            
            var table = new google.visualization.Table(document.getElementById('table_div'));
            numberFormat.format(dataGraphMainTable, 10);
            numberFormat.format(dataGraphMainTable, 11);
            numberFormat.format(dataGraphMainTable, 13);
            numberFormat.format(dataGraphMainTable, 14);
            numberFormat.format(dataGraphMainTable, 15);
            table.draw(dataGraphMainTable, { showRowNumber: false, width: '100%', height: '50%', pageSize: 10, pagingButtons: 'both' });        
            //alertify.error("Finished Processing");
        } else {
            $("#columnchart1_CT").hide();
            $("#columnchart2_CT").hide();
            alertify.error("No values for Wholesale Trades");
        }
        alertify.success('Processing Complete');     
    }
    catch (e) {
        $("#columnchart_stacked").hide();
        $("#table_div").hide();
        alertify.error(e);
    }
}

function redrawChartPricingSummaryPricingComponents() {
    try {
        // ***************************************************
        // Function to Obtain the Monthly Chart
        // ***************************************************
        // Establish the XML Inputs
        // Determine How Many Whole Sale Blocks Used
        var ApplyTotals = 1;
        var urlMain = '/Services/WCFWebService.svc/PricingSummaryPricingComponentsFilteredGetInfo'; 
        // Obtain XML
        var xmlCustomersString = ReturnSelectionXML('selFirst', 'CS');
        var xmlDealsString = ReturnSelectionXML('selSecond', 'DL');
        var xmlStartDatesString = ReturnSelectionXML('selThird', 'SD');
        var xmlTermsString = ReturnSelectionXML('selFrth', 'TM');
        var xmCategoryString = ReturnSelectionXML('selTbl_First', 'CT');
        var xmlSubCategoryString = ReturnSelectionXML('selTbl_Second', 'ST');
        var xmlValueType = "1";        
        // Obtain the Pie Graph        
        var dataGraphMainPieGraph = ObtainPricingSummaryPricingComponentsGraphData(xmlCustomersString, xmlDealsString, xmlStartDatesString, xmlTermsString, xmCategoryString, xmlSubCategoryString, xmlValueType);        
        var dataGraphMainBarChartGraph = ObtainPricingSummaryPricingComponentsGraphData(xmlCustomersString, xmlDealsString, xmlStartDatesString, xmlTermsString, xmCategoryString, xmlSubCategoryString, xmlValueType);        

        var iRowsLimit = dataGraphMainPieGraph.getNumberOfRows();
        var iRows = 0;
        for (iRows = 0; iRows < iRowsLimit; iRows++) {
            if (dataGraphMainPieGraph.getValue(iRows, 3) < 0) {
                dataGraphMainPieGraph.setCell(iRows, 3, 0);
            }
            if (dataGraphMainPieGraph.getValue(iRows, 0) == "Energy") {
                dataGraphMainPieGraph.removeRow(iRows);
                iRowsLimit = iRowsLimit - 1;
            }
        }   
        // Remove Major Order ID and Minor Order ID
        dataGraphMainPieGraph.removeColumn(4);
        dataGraphMainPieGraph.removeColumn(4);
        dataGraphMainPieGraph.removeColumn(0);
        dataGraphMainPieGraph.removeColumn(1);
        dataGraphMainPieGraph.setColumnLabel(0, "Sub Category")
        dataGraphMainPieGraph.setColumnLabel(1, "Cost")        
        // Display Bar Chart
        var piechart_options = {
            title: 'Pass Through Components Of Cost',
            width: 500,
            height: 500,
        };
        chart2 = new google.visualization.PieChart(document.getElementById('column3Chart2_CT'));
        google.visualization.events.addListener(chart2, 'select', function () {
            highlightBar(chart, piechart_options, view);
        });
        chart2.draw(dataGraphMainPieGraph, piechart_options);   
        // Bar Chart

        iRowsLimit = dataGraphMainBarChartGraph.getNumberOfRows();
        iRows = 0;
        for (iRows = 0; iRows < iRowsLimit; iRows++) {
            if (dataGraphMainBarChartGraph.getValue(iRows, 0) != "Uplift") {
                dataGraphMainBarChartGraph.removeRow(iRows);
                iRowsLimit = iRowsLimit - 1;
            }
        }
        dataGraphMainBarChartGraph.removeColumn(4);
        dataGraphMainBarChartGraph.removeColumn(4);
        dataGraphMainBarChartGraph.removeColumn(0);
        dataGraphMainBarChartGraph.removeColumn(1);
        dataGraphMainBarChartGraph.setColumnLabel(0, "Sub Category")
        dataGraphMainBarChartGraph.setColumnLabel(1, "Cost")        
        dataGraphMainBarChartGraph.sort({ column: 1, desc: true });  
        dataGraphMainBarChartGraph.addColumn('number', "Col1");
        dataGraphMainBarChartGraph.addColumn('number', "Col2");
        dataGraphMainBarChartGraph.addColumn('number', "Col3");
        dataGraphMainBarChartGraph.addColumn('number', "Col4");
        dataGraphMainBarChartGraph.addColumn({ type: 'string', role: 'tooltip' });
        //dataGraphMainBarChartGraph.addColumn({ type: 'string', role: 'style' });
        //ddColumn({ type: 'string', role: 'tooltip' });
        // Add Columns for the values
        iRowsLimit = dataGraphMainBarChartGraph.getNumberOfRows();
        iRows = 0;
        // Add the columns
        var iMaxCol = 0;
        iMaxCol = dataGraphMainBarChartGraph.getNumberOfColumns();
        iCols = 0;
        iCurrentValue = 0;
        iMinValue = 0;
        iMaxValue = 0;
        sCurrentValueString = "";
        var sStyle = "#b87333"
        for (iRows = 0; iRows < iRowsLimit; iRows++) {
            if (iRows == 0) {
                iCurrentValue = dataGraphMainBarChartGraph.getValue(iRows, 1);
                iMinValue = 0;
                iMaxValue = iCurrentValue;
            } else {
                iMinValue = iCurrentValue;
                iCurrentValue = iCurrentValue + dataGraphMainBarChartGraph.getValue(iRows, 1);
                iMaxValue = iCurrentValue;
            }
            dataGraphMainBarChartGraph.setValue(iRows, 2, iMinValue);
            dataGraphMainBarChartGraph.setValue(iRows, 3, iMinValue);
            dataGraphMainBarChartGraph.setValue(iRows, 4, iMaxValue);
            dataGraphMainBarChartGraph.setValue(iRows, 5, iMaxValue);
            sCurrentValueString = dataGraphMainBarChartGraph.getValue(iRows, 1).toFixed(2);
            sCurrentValueString = "$" + sCurrentValueString;            
            dataGraphMainBarChartGraph.setValue(iRows, 6, sCurrentValueString);            
        }           
        dataGraphMainBarChartGraph.removeColumn(1);
        sCurrentValueString = "$" + iMaxValue.toFixed(2);
        dataGraphMainBarChartGraph.addRow(['Total', 0, 0, iMaxValue, iMaxValue, sCurrentValueString ])
        //dataGraphMainBarChartGraph.removeColumn(6);

        // Display Bar Chart
        var barchart_options = {
            title: 'Pass Through Components Of Cost',
            width: 1000,
            height: 500,
            legend: { position: 'none' },
        };

        var barchart_options = {
            legend: 'none',
            title: 'Pass Through Components Of Cost',
            width: 1000,
            height: 500,
            bar: { groupWidth: '100%' }, // Remove space between bars.            
            candlestick: {
                fallingColor: { strokeWidth: 0, fill: '#a52714' }, // red
                risingColor: { strokeWidth: 0, fill: '#0f9d58' }   // green
            }
        };
       
        chart3 = new google.visualization.CandlestickChart(document.getElementById('column3Chart3_CT'));
        google.visualization.events.addListener(chart3, 'select', function () {
            highlightBar(chart, piechart_options, view);
        });
        chart3.draw(dataGraphMainBarChartGraph, barchart_options);   
        // Return Data Table    
        xmlValueType = "0";
        xmCategoryStringUpliftOnly = '<'
        var dataGraphMainTable = ObtainPricingSummaryPricingComponentsGraphData(xmlCustomersString, xmlDealsString, xmlStartDatesString, xmlTermsString, xmCategoryString, xmlSubCategoryString, xmlValueType);
        //******************************************************************************************************************************************************
        // Obtain All of the Values For the Table
        //******************************************************************************************************************************************************
        var SelIndex = 0;
        var SelText = '';
        // Loop through each of the notes
        // Pull In the Terms
        var ControlToSet = 'selFrth';
        var CheckboxToSet = ControlToSet;
        var resultWH = xmlTermsString;
        var dataGraphTest;
        var mergedData;
        var iArrayRows=1;
        $("#" + ControlToSet + " li").each(function (index) {
            //alertify.error(index + ": " + $(this).text() + ' - ' + $(this).val());
            CheckboxToSet = ControlToSet + '_CHK_' + $(this).val();
            // Place Text and Identifier into the mix
            SelIndex = $(this).val();
            SelText = $(this).text();
            if (((($('#' + CheckboxToSet).is(':checked')) == true) || (resultWH == '')) && (SelIndex != "-1")) {
                var WHText = SelText.trim();
                xmlTermsSelected = '<Row><TM>' + SelIndex + '</TM></Row>'
                dataGraphTest = ObtainPricingSummaryPricingComponentsGraphData(xmlCustomersString, xmlDealsString, xmlStartDatesString, xmlTermsSelected, xmCategoryString, xmlSubCategoryString, xmlValueType);
                // Remove Extraneous Columns
                // Remove WholeSale and Wholesale Block                
                // Remove Sum Cost
                dataGraphTest.removeColumn(2);
                // Change Load KW to the Correct Value
                dataGraphTest.setColumnLabel(2, WHText)
                if (dataGraphTest.getNumberOfRows() > 0) {
                    if (iArrayRows == 1) {
                        mergedData = dataGraphTest;
                    } else if (iArrayRows == 2) {
                        iRecords = [2, 3, 4];
                        mergedData = google.visualization.data.join(mergedData, dataGraphTest, 'full', [[0, 0], [1, 1]], iRecords, [2]);
                    } else if (iArrayRows == 3) {
                        iRecords = [2, 3, 4, 5];
                        mergedData = google.visualization.data.join(mergedData, dataGraphTest, 'full', [[0, 0], [1, 1]], iRecords, [2]);
                        iArrayRows = 5;
                    } else {
                        //iArrayRows = iArrayRows + 1;
                        iRecords.push(iArrayRows);
                        mergedData = google.visualization.data.join(mergedData, dataGraphTest, 'full', [[0, 0], [1, 1]], iRecords, [2]);
                    }
                    if (mergedData === undefined) {
                        $("#columnchart_stacked").hide();
                        $("#table_div").hide();
                        alertify.error("No values present in results");
                        return;
                    }
                    iArrayRows = iArrayRows + 1;
                }
            }
        });
        //******************************************************************************************************************************************************
        // Obtain All of the Values For the Table
        //******************************************************************************************************************************************************
        // Formatting and setting tables
        iRowsLimit = mergedData.getNumberOfRows();
        iRows = 0;
        //mergedData.sort([{ column: 1 }, { column: 3 }, { column: 4 }, { column: 2 }]);
        mergedData.sort([3, 0, 4]);
        mergedData.removeColumn(3);
        mergedData.removeColumn(3);        
        iMaxCol = mergedData.getNumberOfColumns();
        iCols = 0;
        for (iRows = 0; iRows < iRowsLimit; iRows++) {
            if (mergedData.getValue(iRows, 1) == "SubTotal") {
                mergedData.setCell(iRows, 1, dataGraphMainTable.getValue(iRows, 0));
                for (iCols = 0; iCols < iMaxCol; iCols++) {
                    mergedData.setProperties(iRows, iCols, { style: 'font-weight:bold; font-size:12px; width: 100%;' })
                }
            } else {
                mergedData.setProperties(iRows, 1, { style: 'text-align: right; width: 100%;' })                
            }
        }           
        // Resize the column
        mergedData.removeColumn(0);

        var iLimiter = 0;
        //var iCurrentRow = 0;
        for (iRows = 0; iRows < mergedData.getNumberOfRows(); iRows++) {
            if (iLimiter < mergedData.getValue(iRows, 0).length) {
                iLimiter = mergedData.getValue(iRows, 0).length;
            }
        }
        iLimiter = iLimiter + 15;
        var HeaderLabel = "-";
        var HeaderAdder = "-";
        for (iCol = 1; iCol <= iLimiter; iCol++) {
            HeaderLabel = HeaderLabel + HeaderAdder;
        }
        mergedData.setColumnLabel(0, HeaderLabel);



       // mergedData.setColumnLabel(0, "Category")     

        var table_options = {
            showRowNumber: false, width: '400', allowHtml: true, height: '90%',
            cssClassNames: {
                tableRow: 'table_AutoLayoutC',
                tableCell: 'table_AutoLayoutC',
                headerRow: 'table_AutoLayoutC'
            },
        };


        

        var table = new google.visualization.Table(document.getElementById('column3Chart1_CT')); 
        table.draw(mergedData, table_options);        


   }    catch (e) {
            $("#columnchart_stacked").hide();
            $("#table_div").hide();
        alertify.error(e);
    }
}

function redrawChartMonthlyPricesComponents() {
    try {
        // ***************************************************
        // Function to Obtain the Monthly Chart
        // ***************************************************
        // Establish the XML Inputs
        // Determine How Many Whole Sale Blocks Used
        var ApplyTotals = 1;
        var urlMain = '/Services/WCFWebService.svc/PricingSummaryPricingComponentsFilteredGetInfo';
        // Obtain XML
        var xmlCustomersString = ReturnSelectionXML('selFirst', 'CS');
        var xmlDealsString = ReturnSelectionXML('selSecond', 'DL');
        var xmlStartDatesString = ReturnSelectionXML('selThird', 'SD');
        var xmlTermsString = ReturnSelectionXML('selFrth', 'TM');
        var xmCategoryString = "";//ReturnSelectionXML('selTbl_First', 'CT');
        var xmlSubCategoryString = ""; //ReturnSelectionXML('selTbl_Second', 'ST');
        var xmlValueType = "1";
        // Obtain the Pie Graph        
        var mergedData = ObtainPricingMonthlyPricesGraphData(xmlCustomersString, xmlDealsString, xmlStartDatesString, xmlTermsString, xmCategoryString, xmlSubCategoryString, xmlValueType);
        // Set Margin
        var iCols = 1;
        mergedData.setColumnLabel(0, "Delivery Date")
        // Remove Volume Fields
        for (iCol = 14; iCol <= 20; iCol++) {
            mergedData.removeColumn(14);
        }
        mergedData = transposePricingMonthlyPrices(mergedData);
        var formatter = new google.visualization.NumberFormat({
            prefix: '$'
        });
        iCols = 1;
        for (iCols = 1; iCols < mergedData.getNumberOfColumns(); iCols++) {
            formatter.format(mergedData, iCols);        
        }
        for (iCols = 1; iCols < mergedData.getNumberOfColumns(); iCols++) {
            label = mergedData.getColumnLabel(iCols);
            var dtLabel = new Date(label);            
            label = dateMMMyyyy(dtLabel);
            mergedData.setColumnLabel(iCols, label);
        }
        // Format Table Names
        
        var table = new google.visualization.Table(document.getElementById('ChartBottom_TableTableChartRight2'));
        var TableOptions = {
            cssClassNames: {
                tableRow: 'table_AutoLayoutC',
                tableCell: 'table_AutoLayoutC',
                headerRow: 'table_AutoLayoutC'
            },//'normal-whitespace'   //, tableCell:  'table_AutoLayoutC' },
            showRowNumber: false,
            frozenColumns: 1,
            width: '1500',
            allowHtml: true,
            height: '90%',
            title: 'Per Unit Monthly Cash Flow'
        };
        
        var iLimiter = 0;
        //var iCurrentRow = 0;
        for (iRows = 0; iRows < mergedData.getNumberOfRows(); iRows++) {
            if (iLimiter < mergedData.getValue(iRows, 0).length) {
                iLimiter = mergedData.getValue(iRows, 0).length;
            }  
        }
        iLimiter = iLimiter + 15;
        var HeaderLabel = "-";
        var HeaderAdder = "-";
        for (iCol = 1; iCol <= iLimiter; iCol++) {
            HeaderLabel = HeaderLabel + HeaderAdder;
        }        
        mergedData.setColumnLabel(0, HeaderLabel );
        table.draw(mergedData, TableOptions );
        // Bottom Graph
        var GraphDataMain = ObtainPricingMonthlyPricesGraphData(xmlCustomersString, xmlDealsString, xmlStartDatesString, xmlTermsString, xmCategoryString, xmlSubCategoryString, xmlValueType);
        var iCol;
        // Remove Volume Fields
        for (iCol = 14; iCol <= 20; iCol++) {
            GraphDataMain.removeColumn(14);
        }
        for (iCol = 1; iCol < 11; iCol++) {
            GraphDataMain.removeColumn(2);
        }
        var tickshAxis = [];
        var iCounter = 5;
        var iSplit = iCounter;
        
        for (var i = 0; i < GraphDataMain.getNumberOfRows(); i++) {
            if (i == iCounter) {
                tickshAxis.push(GraphDataMain.getValue(i, 0));
                iCounter = iCounter + iSplit;
            }
        }
        //GraphDataMain.setColumnLabel(0, "                          ");
        GraphDataMain.removeColumn(3);
        GraphDataMain.setColumnLabel(1, "Net Usage")
        GraphDataMain.setColumnLabel(2, "Gross Margin")
        GraphDataMain.setProperty(0, 0, 'style', 'width:400px');
        var ComboChartOptions = {
            title: 'Monthly Gross Margin and Net Usage (MWH)',
            legend: { position: 'top', alignment: 'start' },
            //vAxis: {
            //    0: { title: 'Gross Margin' }
            //    1: { 'Net Usage'}},
            hAxis: { format: 'MMM yyyy', title: 'Delivery Date', ticks: tickshAxis },
            seriesType: 'bars',
            height: 300,
            vAxes: {
                0: { logScale: false, title: "Gross Margin"},
                1: { logScale: false, title: "Net Usage"}
            },
            allowHtml: true,
            cssClassNames: { tableRow: 'table_AutoLayoutC' },//'normal-whitespace'   //, tableCell:  'table_AutoLayoutC' },
            series: {
                0: { type: 'line', targetAxisIndex: 1, color: '#573B92', Title:  'Gross Margin'},
                1: { type: 'bars', targetAxisIndex: 0, color:  '#E1C233', Title:  'Net Usage'}
            }

            
        };

        chart2 = new google.visualization.ComboChart(document.getElementById('ChartBottom_TableTableChartRight3'));
        google.visualization.events.addListener(chart2, 'select', function () {
            highlightBar(chart2, ComboChartOptions, view);
        });
        chart2.draw(GraphDataMain, ComboChartOptions);   


    } catch (e) {
        $("#columnchart_stacked").hide();
        $("#table_div").hide();
        alertify.error(e);
    }
}

function redrawChartMonthlyVolumesComponents() {
    try {
        // ***************************************************
        // Function to Obtain the Monthly Chart
        // ***************************************************
        // Establish the XML Inputs
        // Determine How Many Whole Sale Blocks Used
        var ApplyTotals = 1;
        var urlMain = '/Services/WCFWebService.svc/PricingSummaryPricingComponentsFilteredGetInfo';
        // Obtain XML
        var xmlCustomersString = ReturnSelectionXML('selFirst', 'CS');
        var xmlDealsString = ReturnSelectionXML('selSecond', 'DL');
        var xmlStartDatesString = ReturnSelectionXML('selThird', 'SD');
        var xmlTermsString = ReturnSelectionXML('selFrth', 'TM');
        var xmCategoryString = "";//ReturnSelectionXML('selTbl_First', 'CT');
        var xmlSubCategoryString = ""; //ReturnSelectionXML('selTbl_Second', 'ST');
        var xmlValueType = "1";
        // Obtaining the Table Data     
        var mergedData = ObtainPricingMonthlyPricesGraphData(xmlCustomersString, xmlDealsString, xmlStartDatesString, xmlTermsString, xmCategoryString, xmlSubCategoryString, xmlValueType);
        // Set Margin
        var iCols = 1;
        mergedData.setColumnLabel(0, "Delivery Date")
        // Remove Extraneous Fields
        for (iCol = 2; iCol <= 13; iCol++) {
            mergedData.removeColumn(2);
        }

        mergedData = transposePricingMonthlyPrices(mergedData);
        var formatter = new google.visualization.NumberFormat({ fractionDigits: 2 });
        iCols = 1;
        for (iCols = 1; iCols < mergedData.getNumberOfColumns(); iCols++) {
            formatter.format(mergedData, iCols);
        }
        for (iCols = 1; iCols < mergedData.getNumberOfColumns(); iCols++) {
            label = mergedData.getColumnLabel(iCols);
            var dtLabel = new Date(label);
            label = dateMMMyyyy(dtLabel);
            mergedData.setColumnLabel(iCols, label);
        }
        mergedData.setColumnLabel(0, " ");
        var table = new google.visualization.Table(document.getElementById('ChartBottom_TableTableChartRight2'));
        table.draw(mergedData, { showRowNumber: false, frozenColumns: 1, width: '1500', allowHtml: true, height: '90%', title: 'Per Unit Monthly Cash Flow' });
        // Bottom Graph
        var GraphDataMain = ObtainPricingMonthlyPricesGraphData(xmlCustomersString, xmlDealsString, xmlStartDatesString, xmlTermsString, xmCategoryString, xmlSubCategoryString, xmlValueType);
        var iCol;
        // Remove Volume Fields
        for (iCol = 2; iCol <= 14; iCol++) {
            GraphDataMain.removeColumn(2);
        }
        for (iCol = 3; iCol <= 7; iCol++) {
            GraphDataMain.removeColumn(3);
        }
        GraphDataMain.setColumnLabel(1, "Net Usage");
        GraphDataMain.setColumnLabel(2, "Losses");

        var tickshAxis = [];
        var iCounter = 5;
        var iSplit = iCounter;
        var monthYearFormatter = new google.visualization.DateFormat({
            pattern: "MMM-yyyy"
        });
        monthYearFormatter.format(GraphDataMain, 0);

        for (var i = 0; i < GraphDataMain.getNumberOfRows(); i++) {
            if (i == iCounter) {
                tickshAxis.push(GraphDataMain.getValue(i, 0));
                iCounter = iCounter + iSplit;
            }
        }
        //, ticks: tickshAxis
        var ComboChartOptions = {
            title: 'Positions MWH',
            legend: { position: 'top', alignment: 'start' },
            vAxis: { title: 'Net Usage and Losses' },
            hAxis: { title: 'Delivery Date', format: 'MMM-yyyy', ticks: tickshAxis},
            seriesType: 'bars',
            chartArea: {
                width: "85%"
            },
            height: 400,
            allowHtml: true,
            isStacked: true,
        };        

        chart2 = new google.visualization.ColumnChart(document.getElementById('ChartBottom_TableTableChartRight3'));
        google.visualization.events.addListener(chart2, 'select', function () {
            highlightBar(chart2, ComboChartOptions, view);
        });
        chart2.draw(GraphDataMain, ComboChartOptions);


    } catch (e) {
        $("#columnchart_stacked").hide();
        $("#table_div").hide();
        alertify.error(e);
    }
}

function redrawChartLoadResearchBackCast() {
    try {
        // ***************************************************
        // Function to Obtain the Monthly Chart
        // ***************************************************
        // Establish the XML Inputs
        // Determine How Many Whole Sale Blocks Used
        var ApplyTotals = 1;
        var urlMain = '/Services/WCFWebService.svc/LoadResearchBackCastGraphsGetInfo';
        // Obtain XML
        var xmlCustomersString = ReturnSelectionXML('selFirst', 'CS');
        var xmlUtilityAccountsString = ReturnSelectionXML('selSecond', 'UA');
        var xmlHoursString = ReturnSelectionXML('selThird', 'HR');
        var xmlLineOfBusinesssString = ReturnSelectionXML('selFrth', 'LOB');
        var xmlWholeSaleBlocksString = ReturnSelectionXML('selFifth', 'WH');
        var xmlMonthsString = ReturnSelectionXML('selSeventh', 'MN');


        // Obtaining the Table Data     
        var mergedData = ObtainLoadResearchBackCastGraphData(xmlUtilityAccountsString, xmlWholeSaleBlocksString, xmlHoursString, xmlLineOfBusinesssString, xmlCustomersString, xmlMonthsString);

        if (mergedData === undefined) {
            $("#columnchart_stacked").hide();
            $("#table_div").hide();
            alertify.error("No values present in results");
            return;
        } else {
            $("#columnchart_stacked").show();
            $("#table_div").hide();
            alertify.success('Finished Processing');
        }
        mergedData.setColumnLabel(1, 'Usage');
        mergedData.setColumnLabel(2, 'Backcast');
        var ComboChartOptions = {
            title: 'Usage and Backcast Scatter Plot',
            legend: { position: 'top', alignment: 'start' },
            //vAxis: {
            //    0: { title: 'Gross Margin' }
            //    1: { 'Net Usage'}},
            hAxis: { title: 'Temperature' },
            vAxis: { title:  'Usage'},
            seriesType: 'bars',
            height: 500,
            //vAxes: {
            //    0: { logScale: false, title: "Usage" },
            //    1: { logScale: false, title: "BackCast" }
            //},
            allowHtml: true,
            //cssClassNames: { tableRow: 'table_AutoLayoutC' },//'normal-whitespace'   //, tableCell:  'table_AutoLayoutC' },
            series: {
                0: { type: 'scatter', targetAxisIndex: 0, color: '#573B92'},
                1: { type: 'line', targetAxisIndex: 0, color: '#E1C233'}
            }

        };
        chart2 = new google.visualization.ComboChart(document.getElementById('columnchart_stacked'));
        google.visualization.events.addListener(chart2, 'select', function () {
            highlightBar(chart2, ComboChartOptions, view);
        });
        chart2.draw(mergedData, ComboChartOptions);


    } catch (e) {
        $("#columnchart_stacked").hide();
        $("#table_div").hide();
        alertify.error(e);
    }
}

function reDrawCharts(CheckBoxUsed) {
    try {
        //var sel = $(this).val();
        
        if (DrawGraphType == "Monthly") {
            redrawChartMonthly();
        } else if (DrawGraphType == "HourlyShapes") {
            redrawChartHourlyScalar();
        } else if (DrawGraphType == "VolumetricRisk") {
            redrawChartVolumetricRisk();
        } else if (DrawGraphType == "WeatherScenario") {
            redrawChartWeatherHourly();
        } else if (DrawGraphType == "ScatterPlot") {
            redrawChartScatterPlot();
        } else if (DrawGraphType == "ErcotLoadAnimate") {
            //redrawChartErcotAnimationPlot();
        } else if (DrawGraphType == "PeakModel") {
            redrawChartCoincidencePeakGraphsGetInfo();
        } else if (DrawGraphType == "LoadResearchBackCast") {
            var SelIndex;
            var ControlToSet;
            var iFind = CheckBoxUsed.indexOf("_CHK_");
            ControlToSet = CheckBoxUsed.substring(0, iFind);
            selIndex = CheckBoxUsed.substring(iFind+5);
            SetSingleSelect(ControlToSet, selIndex);
            redrawChartLoadResearchBackCast();        }   
        else if (DrawGraphType == "RiskMonthlyDetail") {
            redrawChartRiskMonthlyDetail();        }
        else if (DrawGraphType == "RiskMonthlyPosition") {
            redrawChartRiskMonthlyPosition();        }
        else if (DrawGraphType == "RiskHourlyPosition") {
            redrawChartRiskHourlyPosition();        }
        else if (DrawGraphType == "RiskWholesaleSettlmentReport") {
            redrawChartRiskWholeSaleTradeSettlementPositionPosition();
        } else if (DrawGraphType == "PricingSummary") {
            redrawChartPricingSummaryPricingComponents();
        } else if (DrawGraphType == 'PricingMonthlyPrices') {
            redrawChartMonthlyPricesComponents();
        } else if (DrawGraphType == 'PricingMonthlyVolumes') {
            redrawChartMonthlyVolumesComponents();
        }        
    } catch (e) {
        alertify.error(e);
    }
}
//redrawChartLoadResearchBackCast
function drawChart() {
    try {
        redrawChartMonthly('Monthly');
    }
    catch (e) {
        alertify.error(e);
    }
}
// Generic Charting Functions
function highlightBar(chart, options, view) {
    var selection = chart.getSelection();
    if (selection.length) {
        var row = selection[0].row;
        var column = selection[0].column;


        //1.insert style role column to highlight selected column 
        var styleRole = {
            type: 'string',
            role: 'style',
            calc: function (dt, i) {
                return (i == row) ? 'stroke-color: #000000; stroke-width: 2' : null;
            }
        };
        var indexes = [0, 1, 2, 3, 4, 5, 6];
        var styleColumn = findStyleRoleColumn(view)
        if (styleColumn != -1 && column > styleColumn)
            indexes.splice(column, 0, styleRole);
        else
            indexes.splice(column + 1, 0, styleRole);
        view.setColumns(indexes);
        //2.redraw the chart
        chart.draw(view, options);
    }
}

function findStyleRoleColumn(view) {
    for (var i = 0; i < view.getNumberOfColumns(); i++) {
        if (view.getColumnRole(i) == "style") {
            return i;
        }
    }
    return -1;
}
$(window).resize(function () {
    this.reDrawCharts();
});
