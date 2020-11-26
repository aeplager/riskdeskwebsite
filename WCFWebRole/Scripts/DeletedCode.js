//function ChangeSelectors(GraphType2) {
//    try {
//        if (GraphType2 = "Monthly") {
//            alert("Monthly");
//        }
//        else {
//            alert("Non Monthly");
//        }

//    } catch (e) {
//        alertify.error(e);
//    }
//}

//function AlertConnected() {
//    try {
//        ControlToSet = 'selFrth'
//        var ControlToSelect;
//        var iRow = 1;
//        var msg;
//        var SelIndex;
//        var SelText;

//        var OpenOpenSign = '\x3C';
//        var OpenClosedSign = '\x3C' + '/';
//        var CloseSign = '\x3E'; 

//        var xmlInput = '';
//        var xmlSeparator = 'MN';
//        var Row1 = "<Row><";
//        var Row2 = "></Row>";
//        //alertify.success(Row1 + Row2);
//        var listItems = $("#" + ControlToSet + " li");
//        msg = 'The number of Items is:  ' + listItems.length;//+ $('ul#' + ControlToSet + ' li').length;       
//        listItems.find("input:checkbox:checked").each(function () {
//            SelIndex = $(this).val();
//            SelText = $(this).text();
//            if (xmlInput == '') {
//                // Start Row               
//                xmlInput = OpenOpenSign + "Row" + CloseSign;
//            } else {
//                // Start Row               
//                xmlInput = xmlInput + OpenOpenSign + "Row" + CloseSign;
//            }
//            // Separator
//            xmlInput = xmlInput + OpenOpenSign + xmlSeparator + CloseSign;
//            // Value
//            xmlInput = xmlInput + SelIndex;
//            //Close Separator
//            xmlInput = xmlInput + OpenClosedSign + xmlSeparator + CloseSign;
//            //Close Row
//            xmlInput = xmlInput + OpenClosedSign + "Row" + CloseSign;                            
//        });
//        redrawChartMonthly();
//    }
//    catch (e) {
//        alertify.error(e);
//    }
//}

//function TestStuff() {
//    try {
//        var ControlToSet = 'selThird';
//        var CheckboxToSet = ControlToSet;
//        $("#" + ControlToSet + " li").each(function (index) {
//            //alertify.error(index + ": " + $(this).text() + ' - ' + $(this).val());
//            CheckboxToSet = ControlToSet + '_CHK_' + $(this).val();
//            if (($('#' + CheckboxToSet).is(':checked')) == true) {
//                alertify.error($(this).text() + ' - ' + $(this).val() + ' is checked');
//            } else {
//                alertify.success($(this).text() + ' - ' + $(this).val() + ' is not checked');
//            }
//        });
//    }
//    catch (e) {
//        alertify.error(e);
//    }
//}
// Sample Chart from Google
//function drawMultSeries() {
//    var data = new google.visualization.DataTable();
//    data.addColumn('timeofday', 'Time of Day');
//    data.addColumn('number', 'Motivation Level');
//    data.addColumn('number', 'Energy Level');

//    data.addRows([
//        [{ v: [8, 0, 0], f: '8 am' }, 1, .25],
//        [{ v: [9, 0, 0], f: '9 am' }, 2, .5],
//        [{ v: [10, 0, 0], f: '10 am' }, 3, 1],
//        [{ v: [11, 0, 0], f: '11 am' }, 4, 2.25],
//        [{ v: [12, 0, 0], f: '12 pm' }, 5, 2.25],
//        [{ v: [13, 0, 0], f: '1 pm' }, 6, 3],
//        [{ v: [14, 0, 0], f: '2 pm' }, 7, 4],
//        [{ v: [15, 0, 0], f: '3 pm' }, 8, 5.25],
//        [{ v: [16, 0, 0], f: '4 pm' }, 9, 7.5],
//        [{ v: [17, 0, 0], f: '5 pm' }, 10, 10],
//    ]);

//    var options = {
//        title: 'Motivation and Energy Level Throughout the Day',
//        hAxis: {
//            title: 'Time of Day',
//            format: 'h:mm a',
//            viewWindow: {
//                min: [7, 30, 0],
//                max: [17, 30, 0]
//            }
//        },
//        vAxis: {
//            title: 'Rating (scale of 1-10)'
//        }
//    };

//    var chart = new google.visualization.ColumnChart(
//        document.getElementById('chart_div'));

//    chart.draw(data, options);
//}
//function drawChart() {
//    try {
//        redrawChartMonthly('Monthly');
//    }
//    catch (e) {
//        alertify.error(e);
//    }
//}
//function explode() {
//    alertify.success('test');
//}