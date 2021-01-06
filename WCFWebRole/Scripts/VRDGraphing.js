function VRDGraphing(PageType) {
    try {
        // Setting Up the Initial Graph
        var base_file_name = 'VRDGraphs.html';
        var file_name = GeneralgetCurentFileName();
        if (file_name != base_file_name) {
            $(location).attr("href", base_file_name);
        } else {
            // 
        }

        alert(file_name);
    } catch (e) {
        HeaderDataErrorReport(e);
    }
}
function VRDSelectorsSetup() {
    try {




        //Months
        //Congestion Zone
        //Facility
        //Customer
        //Weather Scenario
        //Catagory
        //Sub Catagory
        //Deal
        //Term
    }
    catch (e) {
        HeaderDataErrorReport(e);
    }
}
function vrd_graphing_selector(selector) {
    try {
        var id_selector = selector.id;
        alert(id_selector);
    } 
    catch (e) {
        HeaderDataErrorReport(e);
    }
}
// Graph 
function drawChart() {
    try {

    
        // Create the data table.
        //var data = google.visualization.arrayToDataTable([
        //    ['Genre', 'Fantasy & Sci Fi', 'Romance', 'Mystery/Crime', 'General',
        //        'Western', 'Literature', { role: 'annotation' }],
        //    ['2010', 10, 24, 20, 32, 18, 5, ''],
        //    ['2020', 16, 22, 23, 30, 16, 9, ''],
        //    ['2030', 28, 19, 29, 30, 12, 13, '']
        //]);

        var dataTable = new google.visualization.DataTable();
        dataTable.addColumn('string', 'Month');
        dataTable.addColumn('string', 'WholesaleBlock');
        dataTable.addColumn('number', 'MonthlyUsageMWH');

        var DataMain = '';
        var urlMain = urlMain + DataMain;
        urlMain = '/Services/Graphing.svc/MonthlyEnergyUsageGetInfo';
        // Fix to read the docker container
        var ResultData = ReturnDataFromService(urlMain)
        // Establish Tables of Data
        var MonthDef = ResultData.MonthDef;
        var WholeSaleBlocks = ResultData.WholeSaleBlocks;
        var GraphMonthlyData = ResultData.GraphMonthlyData;        
        // Esatablish Graphing Tables
        var dataTableWH_Month = new google.visualization.DataTable();
        var dataTableMonth_WH = new google.visualization.DataTable();

        dataTableWH_Month.addColumn('string', 'WholeSaleBlock');
        MonthDef.forEach(function (row) {
            dataTableWH_Month.addColumn('number', row.MonthShortName);
        });
        blFirstRecord = 0;
        dataTableWH_Month.addColumn('number', "Total");
        var Total = 0;
        WholeSaleBlocks.forEach(function (rowMain) {
            arrAppend = [];
            Total = 0;
            arrAppend.push(rowMain.SelectorText);
            GraphMonthlyData.forEach(function (row) {
                if (rowMain.SelectorText == row.WholesaleBlock) {
                    arrAppend.push(row.MonthlyUsageMWH);
                    Total = Total + row.MonthlyUsageMWH;
                }
            });
            arrAppend.push(Total);
            dataTableWH_Month.addRow(arrAppend);
        });
        
        dataTableMonth_WH.addColumn('string', 'Months');
        WholeSaleBlocks.forEach(function (row) {
            dataTableMonth_WH.addColumn('number', row.WholeSaleBlock);
        });

        MonthDef.forEach(function (rowMain) {
            arrAppend = [];
            Total = 0;
            arrAppend.push(rowMain.MonthShortName);
            GraphMonthlyData.forEach(function (row) {
                if (rowMain.MonthShortName== row.Month) {
                    arrAppend.push(row.MonthlyUsageMWH);
                    
                }
            });            
            dataTableMonth_WH.addRow(arrAppend);
        });

        
        var view = new google.visualization.DataView(dataTableWH_Month);
        view.setColumns([0, 1,
            {
                calc: "stringify",
                sourceColumn: 1,
                type: "string",
                role: "annotation"
            },
            2, 3]);

        var options = {
            //width: 600,
            height: 400,
            legend: { position: 'top', maxLines: 3 },
            bar: { groupWidth: '75%' },
            isStacked: true,
        };

        var chart = new google.visualization.ColumnChart(document.getElementById("chart_div"));
        chart.draw(dataTableMonth_WH, options);

        var table = new google.visualization.Table(document.getElementById('table_div'));

        table.draw(dataTableWH_Month, { showRowNumber: true, width: '100%', height: '100%' });
    }
    catch (e) {
        HeaderDataErrorReport(e);
    }
}
