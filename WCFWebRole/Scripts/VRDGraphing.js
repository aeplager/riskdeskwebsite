function vrd_graphing_dropdowns_hide_all() {
    try {
        // Hide All Selectors
        $('#div_months').hide();
        $('#div_congestion_zone').hide();
        $('#div_Facilities').hide();
        $('#div_Customers').hide();
        $('#div_congestion_zone').hide();
        $('#div_weather_scenario').hide();
        $('#div_Category').hide();
        $('#div_SubCategory').hide();
        $('#div_Term').hide();
        $('#div_Deal').hide();

        $('#graphs_two_top_and_bottom_div_top').hide();        
        $('#graphs_two_top_and_bottom_div_bottom').hide();

        $('graphs_two_left_one_right_div_left_top').hide();
        $('graphs_two_left_one_right_div_left_bottom').hide();
        $('graphs_two_left_one_right_div_right').hide();        
        
        
    } catch (e) {
        HeaderDataErrorReport(e);
    }
    
}

function vrd_graphing_tab_select(PageType) {
    try {
        // Selecting the Graph Type and Setting Up Which Selectors Are Shown
        var base_file_name = 'VRDGraphs.html';
        var file_name = GeneralgetCurentFileName();
        if (file_name != base_file_name) {
            $(location).attr("href", base_file_name);
        } 
        vrd_graphing_dropdowns_hide_all();        
        switch (PageType) {
            case "MonthlyPricing":
                $('#graphs_two_top_and_bottom_div_top').show();
                $('graphs_two_top_and_bottom_div_bottom').show();
                $('#div_congestion_zone').show();
                $('#div_Facilities').show();
                $('#div_Customers').show();
                $('#TypeOfGraph').text('Monthly Pricing');
                vrd_graphing_drawChart_monthlyprices();
                break;
            case "HourlyShapes":
                $('#graphs_two_top_and_bottom_div_top').show();
                $('graphs_two_top_and_bottom_div_bottom').show();
                $('#div_months').show();
                $('#div_congestion_zone').show();
                $('#div_Facilities').show();
                $('#div_Customers').show();
                $('#TypeOfGraph').text('Hourly Shapes');
                vrd_graphing_drawChart_hourlyshapes();
                break;
            case "RetailRisk":
                $('#graphs_two_top_and_bottom_div_top').show();
                $('graphs_two_top_and_bottom_div_bottom').show();
                $('#div_congestion_zone').show();
                $('#div_Customers').show();
                $('#TypeOfGraph').text('Retail Risk');
                vrd_graphing_drawChart_RetailRisk();
                break;
            case "PeakModel":
                $('#graphs_two_top_and_bottom_div_top').show();
                $('graphs_two_top_and_bottom_div_bottom').show();
                $('#div_Facilities').show();
                $('#div_Customers').show();
                $('#div_months').show();
                $('#div_weather_scenario').show();
                $('#TypeOfGraph').text('Peak Model');
                vrd_graphing_drawChart_PeakModel();
                break;
            case "PricingSummary":
                $('#TypeOfGraph').text('Pricing Summary');
                $('#div_Customers').show();
                $('#div_Category').show();
                $('#div_SubCategory').show();                
                $('graphs_two_left_one_right_div_left_top').show();
                $('graphs_two_left_one_right_div_left_bottom').show();
                $('graphs_two_left_one_right_div_right').show();
                vrd_graphing_drawChart_PricingSummary();
                day = "Thursday";
                break;
            case "MonthlyPrices":
                day = "Friday";
                break;
            case "PriceComparison":
                day = "Saturday";
                break;
        }

        file_name = file_name + ' at ' + PageType;
        alertify.success(file_name);
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
function SelectAll(selector_name) {
    try {        
        var i_limit = $("#" + selector_name + " ul li").length;
        var ul = document.getElementById(selector_name + "_ul");
        var items = ul.getElementsByTagName("li");
        var all = ul.getElementsByTagName("input");
        chk_vl = all[0].checked;
        for (var i = 1; i < all.length; i++) {
            all[i].checked = chk_vl;
        }
    }
    catch (e) {
        HeaderDataErrorReport(e);
    }
}
function review_all(selector_name) {
    try {
        var i_limit = $("#" + selector_name + " ul li").length;
        var ul = document.getElementById(selector_name + "_ul");
        var items = ul.getElementsByTagName("li");
        var all = ul.getElementsByTagName("input");
        chk_vl = all[0].checked;
        for (var i = 1; i < all.length; i++) {            
            all[i].checked = chk_vl;
        }
    }
    catch (e) {
        HeaderDataErrorReport(e);
    }
}
function vrd_graphing_dropdown_fill_records(selector_name, urlMain) {
    try {        
        // Fix to read the docker container
        var ResultData = ReturnDataFromService(urlMain)
        vrd_graphing_dropdown_remove_all(selector_name);
        ResultData.forEach(function (row) {
            vrd_graphing_dropdown_add_record(selector_name, row.SelectorID, row.SelectorText);
        });
    }
    catch (e) {
        HeaderDataErrorReport(e);
    }
}
function vrd_graphing_dropdown_initialize(selector_name) {
    try {
    var checkList = document.getElementById(selector_name);
    checkList.getElementsByClassName('anchor')[0].onclick = function (evt) {
        if (checkList.classList.contains('visible'))
            checkList.classList.remove('visible');
        else
            checkList.classList.add('visible');
    }
    }
    catch (e) {
        HeaderDataErrorReport(e);
    }
}
function vrd_graphing_dropdown_add_record(selector_name, checkbox_id, checkbox_text) {
    try {
        //var selector_name = "selMonths";
        var ln = $("#" + selector_name + " ul li").length;
        $("#" + selector_name + " ul li:last").append('<li><a href="#"><input type="checkbox" id="' + selector_name + '_' + checkbox_id + '"/>  ' + checkbox_text + '</a ></a></li>');
    }
    catch (e) {
        HeaderDataErrorReport(e);
    }
}
function vrd_graphing_dropdown_remove_all(selector_name) {
    try {
        var i_limit = $("#" + selector_name + " ul li").length;
        if (i_limit > 1) {
            for (i_row = 2; i_row <= i_limit; i_row++) {
                $("#" + selector_name + " ul li:last").remove();
            }
        }
    } catch (e) {
        HeaderDataErrorReport(e);
    }
}

function RemoveRecord() {
    try {
        var selector_name = "selMonths";
        var ln = $("#" + selector_name + " ul li").length;
        if (ln > 1) {
            $("#" + selector_name + " ul li:last").remove();
        }       
    } catch (e) {
        HeaderDataErrorReport(e);
    }
}
function vrd_graphing_selector(selector) {
    try {
        var id_selector = selector.id;
        var selector_name = "SelMonths";
        var i_count = $("#" + selector_name + " ul li").length;
        alertify.success(i_count);
        var text = $("#" + selector_name + " li:first").text();        
        $("#" + selector_name + " li:last").remove();
        $("#" + selector_name + " li:last").remove();
        $("#" + selector_name + " li:last").append('<li><a href="#"><input type="checkbox" />  Test 1</a ></a></li>');
        $("#" + selector_name + " li:last").append('<li><a href="#"><input type="checkbox" />  Test 2</a ></a></li>');
        $("#" + selector_name + " li:last").append('<li><a href="#"><input type="checkbox" />  Test 3</a ></a></li>');        
        document.getElementById("SelMonths").classList.toggle("show");
        alertify.success(id_selector);
    } 
    catch (e) {
        HeaderDataErrorReport(e);
    }
}
function vrd_graphing_produce_selector_return_xml(selector_name, tp){
    try {
        var i_limit = $("#" + selector_name + " ul li").length;
        var ul = document.getElementById(selector_name + "_ul");
        var items = ul.getElementsByTagName("li");
        var all = ul.getElementsByTagName("input");
        //chk_vl = all[0].checked;
        var xml_dom = '';
        for (var i = 1; i < all.length; i++) {
            if (all[i].checked == true) {
                var chk_box_id = all[i].id.substr(selector_name.length+1, all[i].id.length);
                xml_dom = xml_dom + '<Row><TP>' + tp + '</TP><VL>' + chk_box_id  + '</VL></Row>';
            }            
        }
        return xml_dom;
    }
    catch (e) {
        HeaderDataErrorReport(e);
        var xml_dom = 'ERROR';
        return xml_dom;
    }
}
// Graphs
function vrd_graphing_refresh() {
    try {
        var graph_type = $('#TypeOfGraph').text();
        if (graph_type == 'Monthly Pricing') {
            vrd_graphing_drawChart_monthlyprices();
        } else if (graph_type == 'Hourly Shapes') {
            vrd_graphing_drawChart_hourlyshapes();
        } else if (graph_type == "Retail Risk") {
            vrd_graphing_drawChart_RetailRisk();
        } else if (graph_type == "Peak Model") {
            vrd_graphing_drawChart_PeakModel();
        } else if (graph_type == "Pricing Summary") {
            vrd_graphing_drawChart_PricingSummary();
        }

    }
    catch (e) {
        HeaderDataErrorReport(e);
    }
}
function showthing() {
    $('graphs_two_left_one_right_div_left_top').show();
    $('graphs_two_left_one_right_div_left_bottom').show();
    $('graphs_two_left_one_right_div_right').show();        
}
function hidething() {
    $('graphs_two_left_one_right_div_left_top').hide();
    $('graphs_two_left_one_right_div_left_bottom').hide();
    $('graphs_two_left_one_right_div_right').hide();        
}
function vrd_graphing_drawChart() {
    try {
        vrd_graphing_drawChart_monthlyprices();
    }
    catch (e) {
        HeaderDataErrorReport(e);
    }
}

function vrd_graphing_drawChart_PeakModel() {
    try {
        var xml_mn = vrd_graphing_produce_selector_return_xml('selMonths', 'MN');
        var xml_ws = vrd_graphing_produce_selector_return_xml('selWeatherScenario', 'WS');
        var xml_fc = vrd_graphing_produce_selector_return_xml('selFacilities', 'FC');
        var xml_cu = vrd_graphing_produce_selector_return_xml('selCustomers', 'CU');
        var xml_complete = xml_mn + xml_ws + xml_fc + xml_cu;
        var DataMain = '';
        if (xml_complete != '') {
            DataMain = '?FieldString=' + xml_complete;
        }
        var urlMain = '/Services/Graphing.svc/GraphPeakModel';
        urlMain = urlMain + DataMain;
        
        var ResultData = ReturnDataFromService(urlMain);        
        var Title = "Coincident Peak and None Coincident Peak by Month";        

        var number_formatter = new google.visualization.NumberFormat({ pattern: '#,###.##' });
        // Colors:
        ColumnName = ResultData.ColumnName;
        var Colors = [];
        ColumnName.forEach(function (row) {
            Colors.push(row.Color);
        });        
        var options = {
            //width: 800,
            height: 400,
            legend: 'top',
            bar: { groupWidth: '75%' },
            colors: Colors,
            title: Title,
            allowHtml: true,
            titleTextStyle: {
                color: 'Black',
                fontName: 'Arial',
                fontSize: 20,

            },
            vAxis: {  title: "Coincident Peak and Non Coincident Peak" },
            isStacked: false,
        };
        vrd_graphing_drawChart_ColumnChartTable(ResultData, options, number_formatter, false);
    }
    catch (e) {
        HeaderDataErrorReport(e);
    }

}

function vrd_graphing_drawChart_RetailRisk() {
    try {
        var xml_mn = vrd_graphing_produce_selector_return_xml('selMonths', 'MN');
        var xml_cz = vrd_graphing_produce_selector_return_xml('selCongestionZones', 'CZ');
        var xml_fc = vrd_graphing_produce_selector_return_xml('selFacilities', 'FC');
        var xml_cu = vrd_graphing_produce_selector_return_xml('selCustomers', 'CU');
        var xml_complete = xml_mn + xml_cz + xml_fc + xml_cu;
        var DataMain = '';
        if (xml_complete != '') {
            DataMain = '?FieldString=' + xml_complete;
        }
        var urlMain = '/Services/Graphing.svc/GraphRetailRisk';
        urlMain = urlMain + DataMain;
        
        var ResultData = ReturnDataFromService(urlMain);
        var StackedTrueFalse = false;
        var Title = "Testing New Graph";
        var Totals = false;

        var number_formatter = new google.visualization.NumberFormat({ pattern: '#,###.##%' });
        // Colors:
        ColumnName = ResultData.ColumnName;
        var Colors = [];        
        ColumnName.forEach(function (row) {
            Colors.push(row.Color);            
        });     
        Title = "Components of Retail Adder";
        var options = {
            //width: 600,
            height: 400,
            legend: 'top',
            bar: { groupWidth: '75%' },
            colors: Colors,
            title: Title,
            allowHtml: true,
            titleTextStyle: {
                color: 'Black',
                fontName: 'Arial',
                fontSize: 20,

            },
            vAxis: { format: "percent", title: "Average of Shaping Premium and Average of Vol. Risk Premium" },
            isStacked: false,
        };        
        vrd_graphing_drawChart_ColumnChartTable(ResultData, options, number_formatter, false);
    }
    catch (e) {
        HeaderDataErrorReport(e);
    }

}

function vrd_graphing_drawChart_PricingSummary() {
    try {
        // Pricing Summary Graph
        var xml_ca = vrd_graphing_produce_selector_return_xml('selCategory', 'CA');
        var xml_sc = vrd_graphing_produce_selector_return_xml('selSubCategory', 'SCA');
        var xml_cu = vrd_graphing_produce_selector_return_xml('selCustomers', 'CU');
        var xml_complete = xml_ca + xml_sc + xml_cu;
        var DataMain = '';
        var urlMain = '/Services/Graphing.svc/PricingSummaryGetInfo';
        if (xml_complete != '') {
            DataMain = '?FieldString=' + xml_complete;
        }
        var urlMain = '/Services/Graphing.svc/PricingSummaryGetInfo';
        urlMain = urlMain + DataMain;
        var ResultData = ReturnDataFromService(urlMain);
        var Categories = ResultData.Categories;
        var Customers = ResultData.Customers;
        var GraphOne = ResultData.GraphOne;
        var GraphTwo = ResultData.GraphTwo;
        var GraphThree = ResultData.GraphThree;
        var SubCategories = ResultData.SubCategories;

       
        // Establish Colors:        
        var Colors = [];
        Categories.forEach(function (row) {
            Colors.push(row.Color);
        });        

        var options = {
            height: 500,
            title: 'Components of Cost'
        };
        // Pie Chart on Bottom Right
        // Establish Graphing Tables        
        // Establish Pie Chart
        var dataTable_PieChart = new google.visualization.DataTable();
        // Filling In Data For Table
        dataTable_PieChart.addColumn('string', 'Component');
        dataTable_PieChart.addColumn('number', 'Price');
        blFirstRecord = 0;        
        Categories.forEach(function (rowMain) {            
            Total = 0;
            arrAppend = [];
            arrAppend.push(rowMain.SelectorText);
            GraphTwo.forEach(function (row) {
                if (rowMain.SelectorID == row.ColumnID) {
                    arrAppend.push(row.GraphValue);
                }
            });            
            dataTable_PieChart.addRow(arrAppend)
        });

        var options = {
            title: 'Compenents of Cost',
              colors: Colors

        };
        var number_formatter = new google.visualization.NumberFormat({ pattern: '#,###.##%' });
        var i_col_number = dataTable_PieChart.getNumberOfColumns();
        for (i_col = 0; i_col < i_col_number; i_col++) {
            number_formatter.format(dataTable_PieChart, i_col);
        }
        var pie_chart = new google.visualization.PieChart(document.getElementById('graphs_two_left_one_right_div_left_bottom'));
        pie_chart.draw(dataTable_PieChart , options);
        // Treating First Row as Data
        var dataTable_WaterFall = new google.visualization.DataTable();

        dataTable_WaterFall.addColumn('string', 'ColumnName');
        dataTable_WaterFall.addColumn('number', 'FirstCol');
        dataTable_WaterFall.addColumn('number', 'SecondCol');
        dataTable_WaterFall.addColumn('number', 'ThirdCol');
        dataTable_WaterFall.addColumn('number', 'FourthCol');
        // A column for custom tooltip content
        dataTable_WaterFall.addColumn({ type: 'string', role: 'tooltip' });

        GraphOne.forEach(function (row) {            
            arrAppend = [];
            arrAppend.push(row.ColumnName);
            arrAppend.push(row.MinValue);
            arrAppend.push(row.MinValue);
            arrAppend.push(row.MaxValue);
            arrAppend.push(row.MaxValue);
            var msg = row.ColumnName + ' at $' + row.GraphValue.toFixed(2).toString();
            arrAppend.push(msg);                
            dataTable_WaterFall.addRow(arrAppend)
        });
                    
        var options = {
            hAxis: { title: "Sub Category" },//, slantedText: true, slantedTextAngle: 90 },
            vAxis: { title: "Price", format: 'currency'},
            legend: 'none',
            height: 600,
            title: 'Per Unit Pricing Components',            
            bar: { groupWidth: '100%' }, // Remove space between bars.
            candlestick: {
                fallingColor: { strokeWidth: 0, fill: '#a52714' }, // red
                risingColor: { strokeWidth: 0, fill: '#0f9d58' }   // green
            }
        };
        var number_formatter_currency = new google.visualization.NumberFormat({ pattern: '$#,###.##' });
        var i_col_number = dataTable_PieChart.getNumberOfColumns();
        for (i_col = 1; i_col < i_col_number; i_col++) {
            number_formatter_currency.format(dataTable_WaterFall, i_col);
        }

        var chart = new google.visualization.CandlestickChart(document.getElementById('graphs_two_left_one_right_div_right'));
        chart.draw(dataTable_WaterFall, options);

        // Table at Top Left of Screen
        var dataTable_Table = new google.visualization.DataTable();

        dataTable_Table.addColumn('string', 'Category');

        Customers.forEach(function (row) {
            dataTable_Table.addColumn('number', row.SelectorText);
        });        
        Categories.forEach(function (rowMain) {
            Total = 0;
            arrAppend = [];                
            arrAppend.push(rowMain.SelectorText);
            GraphThree.forEach(function (row) {
                if (rowMain.SelectorID == row.ColumnTwoID) {
                    Total = Total + row.GraphValue;
                    arrAppend.push(row.GraphValue);
                }
            });            
            dataTable_Table.addRow(arrAppend)
        });
        // Enter Totals
        arrAppend = [];
        blFirstRecord = 0;
        arrAppend.push('Total');        
        Customers.forEach(function (rowMain) {
            Total = 0;            
            //arrAppend.push(rowMain.SelectorText);
            GraphThree.forEach(function (row) {
                if (rowMain.SelectorID == row.ColumnOneID) {
                    Total = Total + row.GraphValue;                    
                }
            });
            arrAppend.push(Total);            
        });
        dataTable_Table.addRow(arrAppend)
        var table = new google.visualization.Table(document.getElementById('graphs_two_left_one_right_div_left_top'));
        var i_col_number = dataTable_Table.getNumberOfColumns();
        for (i_col = 0; i_col < i_col_number; i_col++) {
            number_formatter_currency.format(dataTable_Table, i_col);
        }
        var i_rows_number = dataTable_Table.getNumberOfRows()-1;
        dataTable_Table.setRowProperties(i_rows_number, { 'className': 'bold-font' });        
        table.draw(dataTable_Table, { showRowNumber: true, width: '100%', height: '100%' });        
    } catch (e) {
        HeaderDataErrorReport(e);
    }


}

function vrd_graphing_drawChart_hourlyshapes() {
    try {
        var xml_mn = vrd_graphing_produce_selector_return_xml('selMonths', 'MN');
        var xml_cz = vrd_graphing_produce_selector_return_xml('selCongestionZones', 'CZ');
        var xml_fc = vrd_graphing_produce_selector_return_xml('selFacilities', 'FC');
        var xml_cu = vrd_graphing_produce_selector_return_xml('selCustomers', 'CU');
        var xml_complete = xml_mn + xml_cz + xml_fc + xml_cu;
        var DataMain = '';
        if (xml_complete != '') {
            DataMain = '?FieldString=' + xml_complete;
        }
        var urlMain = '/Services/Graphing.svc/HourlyShapesGetInfo';
        urlMain = urlMain + DataMain;
        // Fix to read the docker container
        var ResultData = ReturnDataFromService(urlMain)

        if (ResultData.GraphHourlyShapesData.length == 0) {
            alertify.error("No data was received");
            $('#graphs_two_top_and_bottom_div_top').hide();
            $('#graphs_two_top_and_bottom_div_bottom').hide();        
            return;
        }
        $('#graphs_two_top_and_bottom_div_top').show();
        $('#graphs_two_top_and_bottom_div_bottom').show();
        // Establish Tables of Data
        var Hours = ResultData.Hours;
        var WholeSaleBlocks = ResultData.WholeSaleBlocks;
        var GraphData = ResultData.GraphHourlyShapesData;



        // Establish Graphing Tables
        var dataTable_table = new google.visualization.DataTable();
        var dataTable_chart = new google.visualization.DataTable();
        // Filling In Data For Table
        dataTable_table.addColumn('string', 'WholeSaleBlock');
        Hours.forEach(function (row) {
            dataTable_table.addColumn('number', row.SelectorID);
        });
        blFirstRecord = 0;
        dataTable_table.addColumn('number', "Total");
        var Total = 0;
        WholeSaleBlocks.forEach(function (rowMain) {
            arrAppend = [];
            Total = 0;
            arrAppend.push(rowMain.SelectorText);
            GraphData.forEach(function (row) {
                if (rowMain.SelectorText == row.WholesaleBlock) {
                    arrAppend.push(row.LoadMWh);                                        
                    Total = Total + parseFloat(row.LoadMWh);                    
                }
            });
            arrAppend.push(Total);
            dataTable_table.addRow(arrAppend);
        });
        // Add SubTotal at Bottom
        arrAppend = [];
        arrAppend.push('Total');
        var SubTotal = 0;
        var TotalColsTable = 0;
        Hours.forEach(function (rowMain) {
            Total = 0;
            GraphData.forEach(function (row) {
                if (rowMain.HE == row.SelectorID) {
                    Total = Total + row.LoadMWh;
                }
            });
            SubTotal = SubTotal + Total;
            TotalColsTable = TotalColsTable + 1;
            arrAppend.push(Total);
        });
        arrAppend.push(SubTotal);
        dataTable_table.addRow(arrAppend);
        // Establish Data for Chart
        dataTable_chart.addColumn('string', 'Hours');
        WholeSaleBlocks.forEach(function (row) {
            dataTable_chart.addColumn('number', row.SelectorText);
        });

        Hours.forEach(function (rowMain) {
            arrAppend = [];
            Total = 0;
            arrAppend.push(rowMain.MonthShortName);
            GraphData.forEach(function (row) {
                if (rowMain.SelectorID == row.HE) {
                    arrAppend.push(row.LoadMWh);

                }
            });
            dataTable_chart.addRow(arrAppend);
        });


        var view = new google.visualization.DataView(dataTable_table);
        view.setColumns([0, 1,
            {
                calc: "stringify",
                sourceColumn: 1,
                type: "string",
                role: "annotation"
            },
            2, 3]);
        // Colors:
        var Colors = [];
        var TotalRowsTable = 0;
        WholeSaleBlocks.forEach(function (row) {
            Colors.push(row.Color);
            TotalRowsTable = TotalRowsTable + 1;
        });
        var Title = 'Hourly Load (KW)';
        var options = {
            //width: 600,
            height: 400,
            legend: { position: 'top', maxLines: 3 },
            bar: { groupWidth: '75%' },
            colors: Colors,
            title: Title,
            allowHtml: true,
            titleTextStyle: {
                color: 'Black',
                fontName: 'Arial',
                fontSize: 20,

            },
            isStacked: false,
        };
        var number_formatter = new google.visualization.NumberFormat({ pattern: '#,###.##' });

        var chart = new google.visualization.ColumnChart(document.getElementById("graphs_two_top_and_bottom_div_top"));
        chart.draw(dataTable_chart, options);


        var table = new google.visualization.Table(document.getElementById('graphs_two_top_and_bottom_div_bottom'));
        var i_col_number = dataTable_table.getNumberOfColumns();
        for (i_col = 0; i_col < i_col_number; i_col++) {
            number_formatter.format(dataTable_table, i_col);
        }
        
        dataTable_table.setRowProperties(TotalRowsTable, { 'className': 'bold-font' });
        dataTable_table.setColumnProperties(TotalColsTable + 1, { 'className': 'bold-font' });
        table.draw(dataTable_table, { showRowNumber: true, width: '100%', height: '100%' });

    } catch (e) {
        HeaderDataErrorReport(e);
    }
}

function vrd_graphing_drawChart_monthlyprices() {
    try {
        // Obtain Data   
        var xml_cz = vrd_graphing_produce_selector_return_xml('selCongestionZones', 'CZ');
        var xml_fc = vrd_graphing_produce_selector_return_xml('selFacilities', 'FC');
        var xml_cu = vrd_graphing_produce_selector_return_xml('selCustomers', 'CU');
        var xml_complete = xml_cz + xml_fc + xml_cu;
        var DataMain = '';
        if (xml_complete != '') {
            DataMain = '?FieldString=' + xml_complete;
        }        
        var urlMain = '/Services/Graphing.svc/MonthlyEnergyUsageGetInfo';
        urlMain = urlMain + DataMain;
        // Fix to read the docker container
        var ResultData = ReturnDataFromService(urlMain)
        
        if (ResultData.GraphMonthlyData.length == 0) {
            alertify.error("No data was received");
            if (ResultData.GraphIntTime.length == 0) {
                alertify.error("No data was received");
                $('#graphs_two_top_and_bottom_div_top').hide();
                $('#graphs_two_top_and_bottom_div_bottom').hide();
                return;
            }
        }
        $('#graphs_two_top_and_bottom_div_top').show();
        $('#graphs_two_top_and_bottom_div_bottom').show();
        // Establish Tables of Data
        var MonthDef = ResultData.MonthDef;
        var WholeSaleBlocks = ResultData.WholeSaleBlocks;
        var GraphMonthlyData = ResultData.GraphMonthlyData;        

        

        // Establish Graphing Tables
        var dataTable_table = new google.visualization.DataTable();
        var dataTable_chart = new google.visualization.DataTable();
        // Filling In Data For Table
        dataTable_table.addColumn('string', 'WholeSaleBlock');
        MonthDef.forEach(function (row) {
            dataTable_table.addColumn('number', row.MonthShortName);
        });
        blFirstRecord = 0;
        dataTable_table.addColumn('number', "Total");
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
            dataTable_table.addRow(arrAppend);
        });        
        // Add SubTotal at Bottom
        arrAppend = [];
        arrAppend.push('Total');
        var SubTotal = 0;
        var TotalColsTable = 0;
        MonthDef.forEach(function (rowMain) {            
            Total = 0;            
            GraphMonthlyData.forEach(function (row) {
                if (rowMain.MonthShortName == row.Month) {
                    Total = Total + row.MonthlyUsageMWH;
                }
            });
            SubTotal = SubTotal + Total;
            TotalColsTable = TotalColsTable + 1;
            arrAppend.push(Total);
        });
        arrAppend.push(SubTotal);
        dataTable_table.addRow(arrAppend);
        // Establish Data for Chart
        dataTable_chart.addColumn('string', 'Months');
        WholeSaleBlocks.forEach(function (row) {
            dataTable_chart.addColumn('number', row.SelectorText);
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
            dataTable_chart.addRow(arrAppend);
        });

        
        var view = new google.visualization.DataView(dataTable_table);
        view.setColumns([0, 1,
            {
                calc: "stringify",
                sourceColumn: 1,
                type: "string",
                role: "annotation"
            },
            2, 3]);
        // Colors:
        var Colors = [];
        var TotalRowsTable = 0;
        WholeSaleBlocks.forEach(function (row) {
            Colors.push(row.Color);
            TotalRowsTable = TotalRowsTable+1;
        });        
        var Title = 'Weather Normal Monthly Energy Use (MWH)';
        var options = {
            //width: 600,
            height: 400,
            legend: { position: 'top', maxLines: 3 },
            bar: { groupWidth: '75%' },
            colors: Colors,
            title: Title,             
            allowHtml: true,            
            titleTextStyle: {
                color: 'Black',
                fontName: 'Arial',
                fontSize: 20,                
                
            },
            isStacked: true,
        };
        var number_formatter = new google.visualization.NumberFormat({ pattern: '#,###.##'});

        var chart = new google.visualization.ColumnChart(document.getElementById("graphs_two_top_and_bottom_div_top"));
        chart.draw(dataTable_chart, options);
        

        var table = new google.visualization.Table(document.getElementById('graphs_two_top_and_bottom_div_bottom'));
        var i_col_number = dataTable_table.getNumberOfColumns();
        for (i_col = 0; i_col < i_col_number; i_col++) {
            number_formatter.format(dataTable_table, i_col);
        }        
        
        dataTable_table.setRowProperties(TotalRowsTable, { 'className': 'bold-font' });
        dataTable_table.setColumnProperties(TotalColsTable+1, { 'className': 'bold-font' });
        table.draw(dataTable_table, { showRowNumber: true, width: '100%', height: '100%' });
    }
    catch (e) {
        HeaderDataErrorReport(e);
    }
}

function vrd_graphing_drawChart_ColumnChartTable(ResultData, options, number_formatter, AddTotal) {
    try {


        if (ResultData.GraphIntTime.length == 0) {
            alertify.error("No data was received");
            $('#graphs_two_top_and_bottom_div_top').hide();
            $('#graphs_two_top_and_bottom_div_bottom').hide();
            return;
        }
        $('#graphs_two_top_and_bottom_div_top').show();
        $('#graphs_two_top_and_bottom_div_bottom').show();
        // Establish Tables of Data
        var TimeName = ResultData.TimeName;
        var ColumnName = ResultData.ColumnName;
        var GraphData = ResultData.GraphIntTime;



    // Establish Graphing Tables
    var dataTable_table = new google.visualization.DataTable();
    var dataTable_chart = new google.visualization.DataTable();
    // Filling In Data For Table
    dataTable_table.addColumn('string', 'SelectorText1');
        TimeName.forEach(function (row) {
            dataTable_table.addColumn('number', row.SelectorText);
    });
    blFirstRecord = 0;
    if (AddTotal == true) {
        dataTable_table.addColumn('number', "Total");
    }    
    var Total = 0;
    ColumnName.forEach(function (rowMain) {
        arrAppend = [];
        Total = 0;
        arrAppend.push(rowMain.SelectorText);
        GraphData.forEach(function (row) {
            if (rowMain.SelectorText == row.ColumnName) {
                arrAppend.push(row.GraphValue);
                Total = Total + row.GraphValue;
            }
        });
        if (AddTotal == true) {
            arrAppend.push(Total);
        }
        dataTable_table.addRow(arrAppend);
    });
    // Add SubTotal at Bottom
        arrAppend = [];
    if (AddTotal == true) {
            arrAppend.push('Total');
    }    
    var SubTotal = 0;
    var TotalColsTable = 0;
    if (AddTotal == true) {
        TimeName.forEach(function (rowMain) {
            Total = 0;
            GraphData.forEach(function (row) {
                if (rowMain.SelectorText == row.TimeName) {
                    Total = Total + row.GraphValue;
                }
            });
            SubTotal = SubTotal + Total;
            TotalColsTable = TotalColsTable + 1;
            arrAppend.push(Total);

        });

        arrAppend.push(SubTotal);
        dataTable_table.addRow(arrAppend);
    }

    // Establish Data for Chart
    dataTable_chart.addColumn('string', 'Months');
    ColumnName.forEach(function (row) {
        dataTable_chart.addColumn('number', row.SelectorText);
    });

    TimeName.forEach(function (rowMain) {
        arrAppend = [];
        Total = 0;
        arrAppend.push(rowMain.SelectorText);
        GraphData.forEach(function (row) {
            if (rowMain.SelectorText == row.TimeName) {
                arrAppend.push(row.GraphValue);

            }
        });
        dataTable_chart.addRow(arrAppend);
    });


    var view = new google.visualization.DataView(dataTable_table);
    view.setColumns([0, 1,
        {
            calc: "stringify",
            sourceColumn: 1,
            type: "string",
            role: "annotation"
        }]);
    // Colors:
    var Colors = [];
    var TotalRowsTable = 0;
    ColumnName.forEach(function (row) {
        Colors.push(row.Color);
        TotalRowsTable = TotalRowsTable + 1;
    });
    var i_col_number = dataTable_table.getNumberOfColumns();
    for (i_col = 0; i_col < i_col_number; i_col++) {
        number_formatter.format(dataTable_table, i_col);
    }
    i_col_number = dataTable_chart.getNumberOfColumns();
    for (i_col = 0; i_col < i_col_number; i_col++) {
        number_formatter.format(dataTable_chart, i_col);
    }

        var chart = new google.visualization.ColumnChart(document.getElementById("graphs_two_top_and_bottom_div_top"));
    chart.draw(dataTable_chart, options);

    var table = new google.visualization.Table(document.getElementById('graphs_two_top_and_bottom_div_bottom'));    
    var i_col_number = dataTable_table.getNumberOfColumns();
    if (AddTotal == true) {
        dataTable_table.setRowProperties(TotalRowsTable, { 'className': 'bold-font' });
        dataTable_table.setColumnProperties(TotalColsTable + 1, { 'className': 'bold-font' });
    }
    table.draw(dataTable_table, { showRowNumber: true, width: '100%', height: '100%' });
}
catch (e) {
    HeaderDataErrorReport(e);
}
}

