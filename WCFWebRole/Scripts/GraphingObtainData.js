function ObtainVolumetricRiskGraphData(xmlMonths, xmlCongestionZone, xmlAccounts, xmlCustomers, xmlinputWholesaleBlock) {
    try {
        //var inputWholesaleBlock = '<Row><WH>1</WH></Row>'
        var DataInput = '';

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
        var urlMain = '/Services/WCFWebService.svc/VolumetricRiskGetInfo'; ///?' + DataInput;// '&CongestionZoneString=NA&MonthsString=NA';
        if (DataInput != '') {
            urlMain = urlMain + '?' + DataInput;
        }
        var ResultDataGraphs = ReturnDataFromService(urlMain);
        var dataGraphMain = new google.visualization.DataTable();
        dataGraphMain.addColumn('number', 'MonthID');
        dataGraphMain.addColumn('string', 'LongMonths');
        dataGraphMain.addColumn('string', 'ShortMonths');
        dataGraphMain.addColumn('number', 'VolRiskAdder');
        dataGraphMain.addColumn('number', 'VolRiskStDev');
        ResultDataGraphs.forEach(function (row) {
            dataGraphMain.addRow([
                row.MonthID,
                row.MonthsLongName,  //0
                row.MonthsShortName,
                row.VolRiskAdder,  //1
                row.VolRiskStdDev,
            ]);
        });
        return dataGraphMain;
    }
    catch (e) {
        alertify.error(e);
    }
}

function ObtainErcotAnimationGraphData(xmlMonths, xmlCongestionZone, xmlAccounts, xmlinputWholesaleBlock, xmlMonths, xmlHours) {
    try {
        //var inputWholesaleBlock = '<Row><WH>1</WH></Row>'
        var DataInput = '';

        if (xmlinputWholesaleBlock != '') {
            DataInput = "WholeBlockString=" + xmlinputWholesaleBlock;
        }

        if (xmlCongestionZone != '') {
            if (DataInput == '') {
                DataInput = "CongestionZone=" + xmlCongestionZone;
            } else {
                DataInput = DataInput + "&CongestionZone=" + xmlCongestionZone;
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

        if (xmlMonths != '') {
            if (DataInput == '') {
                DataInput = "MonthsString=" + xmlMonths;
            }
            else {
                DataInput = DataInput + "&MonthsString=" + xmlMonths;
            }
        }

        if (xmlHours != '') {
            if (DataInput == '') {
                DataInput = "HoursString=" + xmlHours;
            }
            else {
                DataInput = DataInput + "&HoursString=" + xmlHours;
            }
        }

        var urlMain = '/Services/WCFWebService.svc/ErcotAnimationGraphsGetInfo';
        if (DataInput != '') {
            urlMain = urlMain + '?' + DataInput;
        }
        var ResultDataGraphs = ReturnDataFromService(urlMain);
        var dataGraphMain = new google.visualization.DataTable();

        if (ResultDataGraphs != undefined) {
            dataGraphMain.addColumn('number', 'WholeSaleBlocksID');
            dataGraphMain.addColumn('string', 'WholeSaleBlocks');
            dataGraphMain.addColumn('string', 'UtilityAccountNumber');
            dataGraphMain.addColumn('number', 'XMONTH');
            dataGraphMain.addColumn('number', 'HE');
            dataGraphMain.addColumn('number', 'TempF');
            dataGraphMain.addColumn('number', 'RealTimePrice');
            dataGraphMain.addColumn('number', 'ErcotLoad');
            dataGraphMain.addColumn('number', 'LoadKW');
            ResultDataGraphs.forEach(function (row) {
                dataGraphMain.addRow([
                    row.WholeSaleBlocksID,
                    row.WholeSaleBlocks,
                    row.UtilityAccountNumber,
                    row.XMONTH,
                    row.HE,
                    row.TempF,  //0
                    row.RealTimePrice,  //1
                    row.ErcotLoad,
                    row.LoadKW,
                ]);
            });
        }
        return dataGraphMain;
    }
    catch (e) {
        alertify.error(e);
    }
}

function ObtainCoincidencePeakGraphData(xmlWeatherScenario, xmlUtilityAccountNumber, xmlMonthsString, xmlCustomers ) {
    try {
        //var inputWholesaleBlock = '<Row><WH>1</WH></Row>'
        var DataInput = '';

        if (xmlWeatherScenario != '') {
            DataInput = "WeatherScenarioString=" + xmlWeatherScenario;
        }
        if (xmlUtilityAccountNumber != '') {
            if (DataInput == '') {
                DataInput = "UtilityAccountString=" + xmlUtilityAccountNumber;
            }
            else {
                DataInput = DataInput + "&UtilityAccountString=" + xmlUtilityAccountNumber;
            }
        }
        if (xmlMonthsString != '') {
            if (DataInput == '') {
                DataInput = "MonthsString=" + xmlMonthsString;
            }
            else {
                DataInput = DataInput + "&MonthsString=" + xmlMonthsString;
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
        var urlMain = '/Services/WCFWebService.svc/CoincidencePeakGraphsGetInfo';
        if (DataInput != '') {
            urlMain = urlMain + '?' + DataInput;
        }
        var ResultDataGraphs = ReturnDataFromService(urlMain);
        var dataGraphMain = new google.visualization.DataTable();
        dataGraphMain.addColumn('number', 'MonthID');
        dataGraphMain.addColumn('string', 'MonthsLongName');
        dataGraphMain.addColumn('string', 'MonthsShortName');
        dataGraphMain.addColumn('number', 'Maxsysmax');
        dataGraphMain.addColumn('number', 'AvgCP');
        dataGraphMain.addColumn('number', 'AvgNCP');
        dataGraphMain.addColumn('number', 'AvgCoincidenceFactor');
        ResultDataGraphs.forEach(function (row) {
            dataGraphMain.addRow([
                row.MonthID,
                row.MonthsLongName,
                row.MonthsShortName,  //0
                row.Maxsysmax,  //1
                row.AvgCP,
                row.AvgNCP,
                row.AvgCoincidenceFactor,
            ]);
        });
        return dataGraphMain;
    }
    catch (e) {
        alertify.error(e);
    }
}

function ObtainCoincidencePeakTableData(xmlWeatherScenario, xmlUtilityAccountNumber, xmlMonthsString) {
    try {
        //var inputWholesaleBlock = '<Row><WH>1</WH></Row>'
        var DataInput = '';

        if (xmlWeatherScenario != '') {
            DataInput = "WeatherScenarioString=" + xmlWeatherScenario;
        }
        if (xmlUtilityAccountNumber != '') {
            if (DataInput == '') {
                DataInput = "UtilityAccountString=" + xmlUtilityAccountNumber;
            }
            else {
                DataInput = DataInput + "&UtilityAccountString=" + xmlUtilityAccountNumber;
            }
        }
        if (xmlMonthsString != '') {
            if (DataInput == '') {
                DataInput = "MonthsString=" + xmlMonthsString;
            }
            else {
                DataInput = DataInput + "&MonthsString=" + xmlMonthsString;
            }
        }

        var urlMain = '/Services/WCFWebService.svc/CoincidencePeakTableGetInfo';
        if (DataInput != '') {
            urlMain = urlMain + '?' + DataInput;
        }
        var ResultDataGraphs = ReturnDataFromService(urlMain);
        var dataGraphMain = new google.visualization.DataTable();
        dataGraphMain.addColumn('string', 'WeatherScenario');
        dataGraphMain.addColumn('string', 'Jan');
        dataGraphMain.addColumn('string', 'Feb');
        dataGraphMain.addColumn('string', 'Mar');
        dataGraphMain.addColumn('string', 'Apr');
        dataGraphMain.addColumn('string', 'May');
        dataGraphMain.addColumn('string', 'Jun');
        dataGraphMain.addColumn('string', 'July');
        dataGraphMain.addColumn('string', 'Aug');
        dataGraphMain.addColumn('string', 'Sept');
        dataGraphMain.addColumn('string', 'Oct');
        dataGraphMain.addColumn('string', 'Nov');
        dataGraphMain.addColumn('string', 'Dec');
        ResultDataGraphs.forEach(function (row) {
            dataGraphMain.addRow([
                row.WeatherScenario,
                row.Jan,
                row.Feb,  //0
                row.Mar,  //1
                row.Apr,
                row.May,
                row.Jun,
                row.July,
                row.Aug,
                row.Sept,
                row.Oct,
                row.Nov,
                row.Dec,
            ]);
        });
        return dataGraphMain;
    }
    catch (e) {
        alertify.error(e);
    }
}

function ObtainScatterPlotGraphData(xmlMonths, xmlCongestionZone, xmlAccounts, xmlinputWholesaleBlock, xmlMonths, xmlHours) {
    try {
        //var inputWholesaleBlock = '<Row><WH>1</WH></Row>'
        var DataInput = '';

        if (xmlinputWholesaleBlock != '') {
            DataInput = "WholeBlockString=" + xmlinputWholesaleBlock;
        }

        if (xmlCongestionZone != '') {
            if (DataInput == '') {
                DataInput = "CongestionZone=" + xmlCongestionZone;
            } else {
                DataInput = DataInput + "&CongestionZone=" + xmlCongestionZone;
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
        if (xmlMonths != '') {
            if (DataInput == '') {
                DataInput = "MonthsString=" + xmlMonths;
            }
            else {
                DataInput = DataInput + "&MonthsString=" + xmlMonths;
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

        if (xmlHours != '') {
            if (DataInput == '') {
                DataInput = "HoursString=" + xmlHours;
            }
            else {
                DataInput = DataInput + "&HoursString=" + xmlHours;
            }
        }

        var urlMain = '/Services/WCFWebService.svc/ScatterPlotGraphsGetInfo';
        if (DataInput != '') {
            urlMain = urlMain + '?' + DataInput;
        }
        var ResultDataGraphs = ReturnDataFromService(urlMain);
        var dataGraphMain = new google.visualization.DataTable();
        dataGraphMain.addColumn('number', 'WholeSaleBlocksID');
        dataGraphMain.addColumn('string', 'WholeSaleBlocks');
        dataGraphMain.addColumn('number', 'TempF');
        dataGraphMain.addColumn('number', 'RealTimePrice');
        dataGraphMain.addColumn('number', 'ErcotLoad');
        dataGraphMain.addColumn('number', 'LoadKW');
        ResultDataGraphs.forEach(function (row) {
            dataGraphMain.addRow([
                row.WholeSaleBlocksID,
                row.WholeSaleBlocks,
                row.TempF,  //0
                row.RealTimePrice,  //1
                row.ErcotLoad,
                row.LoadKW,
            ]);
        });
        return dataGraphMain;
    }
    catch (e) {
        alertify.error(e);
    }
}

function ObtainWeatherHourlyGraphData(xmlMonths, xmlWeatherScenario, xmlAccounts, xmlinputWholesaleBlock, StartDate, EndDate, xmlCustomers) {
    try {
        //var inputWholesaleBlock = '<Row><WH>1</WH></Row>'
        var DataInput = '';

        if (xmlinputWholesaleBlock != '') {
            DataInput = "WholeBlockString=" + xmlinputWholesaleBlock;
        }
        if (xmlWeatherScenario != '') {
            if (DataInput == '') {
                DataInput = "WeatherScenario=" + xmlWeatherScenario;
            } else {
                DataInput = DataInput + "&WeatherScenario=" + xmlWeatherScenario;
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
        if (StartDate != '') {
            if (DataInput == '') {
                DataInput = "StartDate=" + StartDate;
            }
            else {
                DataInput = DataInput + "&StartDate=" + StartDate;
            }
        }
        if (EndDate != '') {
            if (DataInput == '') {
                DataInput = "EndDate=" + EndDate;
            }
            else {
                DataInput = DataInput + "&EndDate=" + EndDate;
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
        //WeatherScenarioGraphsGetInfo/?WholeBlockString={WholeBlockString}&WeatherSCenario={WeatherSCenario}&MonthsString={MonthsString}&UtilityAccountString={UtilityAccountString}&StartDate={StartDate}&EndDate={EndDate}",
        var urlMain = '/Services/WCFWebService.svc/WeatherScenarioGraphsGetInfo'; ///?' + DataInput;// '&CongestionZoneString=NA&MonthsString=NA';
        if (DataInput != '') {
            urlMain = urlMain + '?' + DataInput;
        }
        var ResultDataGraphs = ReturnDataFromService(urlMain);
        var dataGraphMain = new google.visualization.DataTable();
        dataGraphMain.addColumn('number', 'MonthID');
        dataGraphMain.addColumn('string', 'ShortMonths');
        dataGraphMain.addColumn('string', 'LongMonths');
        dataGraphMain.addColumn('number', 'WeatherScenarioID');
        dataGraphMain.addColumn('string', 'WeatherScenario');
        dataGraphMain.addColumn('string', 'xdate');
        dataGraphMain.addColumn('number', 'TotalLoad');
        ResultDataGraphs.forEach(function (row) {
            dataGraphMain.addRow([
                row.MonthID,
                row.MonthsShortName,
                row.MonthsLongName,  //0
                row.WeatherScenarioID,  //1
                row.WeatherScenario,
                row.xDate,
                row.TotalLoad,
            ]);
        });

        //dataGraphMain.setColumnProperty(5, 'type', 'date')
        dataGraphMain.addColumn('date', 'xdateNew');
        dataGraphMain.addColumn('number', 'TotalLoadNew');
        for (var iRow = 0; iRow < dataGraphMain.getNumberOfRows(); iRow++) {
            dataGraphMain.setValue(iRow, 7, new Date(dataGraphMain.getValue(iRow, 5)));
            dataGraphMain.setValue(iRow, 8, dataGraphMain.getValue(iRow, 6));
        }
        dataGraphMain.removeColumn(5);
        dataGraphMain.removeColumn(5);
        dataGraphMain.setColumnLabel(5, 'xdate');
        dataGraphMain.setColumnLabel(6, 'TotalLoad');

        return dataGraphMain;
    }
    catch (e) {
        alertify.error(e);
    }
}

function ObtainMonthlyGraphData(xmlMonths, xmlCongestionZone, xmlAccounts, xmlinputWholesaleBlock, xmlCustomers,colName) {
    try {
        //var inputWholesaleBlock = '<Row><WH>1</WH></Row>'
        var DataInput = '';

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
        if (xmlCustomers!= '') {
            if (DataInput == '') {
                DataInput = "CustomersString=" + xmlCustomers;
            }
            else {
                DataInput = DataInput + "&CustomersString=" + xmlCustomers;
            }
        }
        
        var urlMain = '/Services/WCFWebService.svc/MonthlyGraphsGetInfo'; ///?' + DataInput;// '&CongestionZoneString=NA&MonthsString=NA';
        if (DataInput != '') {
            urlMain = urlMain + '?' + DataInput;
        }
        var ResultDataGraphs = ReturnDataFromService(urlMain);
        var dataGraphMain = new google.visualization.DataTable();
        dataGraphMain.addColumn('number', 'WholeSaleBlocksID');
        dataGraphMain.addColumn('string', 'WholeSaleBlocks');
        dataGraphMain.addColumn('number', 'MonthsNamesID');
        dataGraphMain.addColumn('string', 'MonthsShortName');
        dataGraphMain.addColumn('string', 'MonthsLongName');
        dataGraphMain.addColumn('number', 'ubarmwh');
        dataGraphMain.addColumn('number', 'ubarMW');
        dataGraphMain.addColumn('number', 'Pbar');
        dataGraphMain.addColumn('number', 'pshaped');
        dataGraphMain.addColumn('number', 'pvolrisk');
        dataGraphMain.addColumn('number', 'RetailRiskAdder');
        dataGraphMain.addColumn('number', 'RevatRiskMult');
        ResultDataGraphs.forEach(function (row) {
            dataGraphMain.addRow([
                row.WholeSaleBlocksID,
                row.WholeSaleBlocks,  //0
                row.MonthsNamesID,
                row.MonthsShortName,  //1
                row.MonthsLongName,
                row.ubarmwh,
                row.ubarMW,
                row.Pbar,
                row.pshaped,
                row.pvolrisk,
                row.RetailRiskAdder,
                row.RevatRiskMult,
            ]);
        });

      

        dataGraphMain.removeColumn(0);
        dataGraphMain.removeColumn(2);
        dataGraphMain.removeColumn(4);
        dataGraphMain.removeColumn(4);
        dataGraphMain.removeColumn(4);
        dataGraphMain.removeColumn(4);
        dataGraphMain.removeColumn(4);
        dataGraphMain.removeColumn(4);
        //dataGraphMain.removeColumn(4);
        dataGraphMain.setColumnLabel(3, colName)
        return dataGraphMain;
    }
    catch (e) {
        alertify.error(e);
    }
}

function ObtainHourlyScalarGraphData(xmlMonths, xmlCongestionZone, xmlAccounts, xmlinputWholesaleBlock, xmlCustomers, colName) {
    try {
        //var inputWholesaleBlock = '<Row><WH>1</WH></Row>'
        var DataInput = '';

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
        var urlMain = '/Services/WCFWebService.svc/HourlyScalarGetInfo'; ///?' + DataInput;// '&CongestionZoneString=NA&MonthsString=NA';
        if (DataInput != '') {
            urlMain = urlMain + '?' + DataInput;
        }
        var ResultDataGraphs = ReturnDataFromService(urlMain);
        var dataGraphMain = new google.visualization.DataTable();
        dataGraphMain.addColumn('number', 'WholeSaleBlocksID');
        dataGraphMain.addColumn('string', 'WholeSaleBlocks');
        dataGraphMain.addColumn('number', 'HE');
        dataGraphMain.addColumn('number', 'pbar');
        dataGraphMain.addColumn('number', 'ubar');
        dataGraphMain.addColumn('number', 'sigmau');
        dataGraphMain.addColumn('number', 'tbar');
        dataGraphMain.addColumn('number', 'AT');
        ResultDataGraphs.forEach(function (row) {
            dataGraphMain.addRow([
                row.WholeSaleBlocksID,
                row.WholeSaleBlocks,  //0
                row.HE,
                row.pbar,  //1
                row.ubar,
                row.sigmaau,
                row.tbar,
                row.AT,
            ]);
        });
        dataGraphMain.removeColumn(0);
        dataGraphMain.removeColumn(2);
        dataGraphMain.removeColumn(4);
        dataGraphMain.removeColumn(4);
        dataGraphMain.removeColumn(3);
        dataGraphMain.setColumnLabel(2, colName)
        return dataGraphMain;
    }
    catch (e) {
        alertify.error(e);
    }
}

function ObtainRiskMonthlyDetailGraphData(xmlBookOfBusineess, xmlLineOfBusiness, xmlCongestionZone, StartDate, EndDate, NoBookOfBusiness) {
    try {

        ///?BookOfBusinessString={BookOfBusinessString}&LineOfBusinessString={LineOfBusinessString}&CongestionZoneString={CongestionZoneString}&StartDate={StartDate}&EndDate={EndDate}",
        //var inputWholesaleBlock = '<Row><WH>1</WH></Row>'
        var DataInput = '';

        if (xmlBookOfBusineess != '') {
            DataInput = "BookOfBusinessString=" + xmlBookOfBusineess;
        }
        if (xmlLineOfBusiness != '') {
            if (DataInput == '') {
                DataInput = "LineOfBusinessString=" + xmlLineOfBusiness;
            } else {
                DataInput = DataInput + "&LineOfBusinessString=" + xmlLineOfBusiness;
            }
        }
        if (xmlCongestionZone != '') {
            if (DataInput == '') {
                DataInput = "CongestionZoneString=" + xmlCongestionZone;
            }
            else {
                DataInput = DataInput + "&CongestionZoneString=" + xmlCongestionZone;
            }
        }        
        if (StartDate != '') {
            if (DataInput == '') {
                DataInput = "StartDate=" + StartDate;
            }
            else {
                DataInput = DataInput + "&StartDate=" + StartDate;
            }
        }
        if (EndDate != '') {
            if (DataInput == '') {
                DataInput = "EndDate=" + EndDate;
            }
            else {
                DataInput = DataInput + "&EndDate=" + EndDate;
            }
        }        
        DataInput = DataInput + "&NoBookOfBusinessInt=" + NoBookOfBusiness;
        
        //WeatherScenarioGraphsGetInfo/?WholeBlockString={WholeBlockString}&WeatherSCenario={WeatherSCenario}&MonthsString={MonthsString}&UtilityAccountString={UtilityAccountString}&StartDate={StartDate}&EndDate={EndDate}",
        var urlMain = '/Services/WCFWebService.svc/RiskMonthlyDetailsGraphsGetInfo'; ///?' + DataInput;// '&CongestionZoneString=NA&MonthsString=NA';
        if (DataInput != '') {
            urlMain = urlMain + '?' + DataInput;
        }
      
        var ResultDataGraphs = ReturnDataFromService(urlMain);
        var dataGraphMain = new google.visualization.DataTable();

        dataGraphMain.addColumn('string', 'BookOfBusiness');
        dataGraphMain.addColumn('date', 'deliverydate');
        dataGraphMain.addColumn('string', 'deliverydatestring');
        dataGraphMain.addColumn('number', 'NetUsage');
        dataGraphMain.addColumn('number', 'GrossUsage');
        dataGraphMain.addColumn('number', 'CostTotal');
        dataGraphMain.addColumn('number', 'C_Energy');
        dataGraphMain.addColumn('number', 'C_Losses');
        dataGraphMain.addColumn('number', 'C_Basis');
        dataGraphMain.addColumn('number', 'C_VolRisk');
        dataGraphMain.addColumn('number', 'C_ANC');
        dataGraphMain.addColumn('number', 'C_ADMIN_MISC');
        dataGraphMain.addColumn('number', 'C_CRR');
        dataGraphMain.addColumn('number', 'Revenue');
        dataGraphMain.addColumn('number', 'NetRevenue');
        ResultDataGraphs.forEach(function (row) {
            dataGraphMain.addRow([
                row.BookOfBusiness,
                row.deliverydate,
                row.DeliveryDateString,
                row.NetUsage,
                row.GrossUsage,
                row.CostTotal,
                row.C_Energy,
                row.C_Losses,
                row.C_Basis,
                row.C_VolRisk,
                row.C_ANC,
                row.C_ADMIN_MISC,
                row.C_CRR,
                row.Revenue,
                row.NetRevenue,
            ]);
        });
        //dataGraphMain.addColumn('date', 'DeliveryDate_Date');        

        //var iRowsLimit = dataGraphMain.getNumberOfRows();
        //var iRows = 0;
        //for (iRows = 0; iRows < iRowsLimit; iRows++) {
        //    dataGraphMain.setValue(iRows, 15, new Date(dataGraphMain.getValue(iRows, 2)));     
        //}     
        //for (iRows = 0; iRows < iRowsLimit; iRows++) {
        //    dataGraphMain.setValue(iRows, 1, new Date(dataGraphMain.getValue(iRows, 15)));
        //}
        //dataGraphMain.removeColumn(15);
        //dataGraphMain.setColumnProperty(2, 'type', 'date');
        dataGraphMain = ChangeDateField(dataGraphMain, 2, 1);
        //var formatter_short = new google.visualization.DateFormat({ pattern: 'MMM-yyyy' });
        //formatter_short.format(dataGraphMain, 0);

        return dataGraphMain;
    }
    catch (e) {
        alertify.error(e);
    }
}

function ObtainRiskMonthlyPositionGraphData(xmlBookOfBusineess, xmlLineOfBusiness, xmlCongestionZone, StartDate, EndDate, NoBookOfBusiness) {
    try {

        ///?BookOfBusinessString={BookOfBusinessString}&LineOfBusinessString={LineOfBusinessString}&CongestionZoneString={CongestionZoneString}&StartDate={StartDate}&EndDate={EndDate}",
        //var inputWholesaleBlock = '<Row><WH>1</WH></Row>'
        var DataInput = '';

        if (xmlBookOfBusineess != '') {
            DataInput = "BookOfBusinessString=" + xmlBookOfBusineess;
        }
        if (xmlLineOfBusiness != '') {
            if (DataInput == '') {
                DataInput = "LineOfBusinessString=" + xmlLineOfBusiness;
            } else {
                DataInput = DataInput + "&LineOfBusinessString=" + xmlLineOfBusiness;
            }
        }
        if (xmlCongestionZone != '') {
            if (DataInput == '') {
                DataInput = "CongestionZoneString=" + xmlCongestionZone;
            }
            else {
                DataInput = DataInput + "&CongestionZoneString=" + xmlCongestionZone;
            }
        }
        if (StartDate != '') {
            if (DataInput == '') {
                DataInput = "StartDate=" + StartDate;
            }
            else {
                DataInput = DataInput + "&StartDate=" + StartDate;
            }
        }
        if (EndDate != '') {
            if (DataInput == '') {
                DataInput = "EndDate=" + EndDate;
            }
            else {
                DataInput = DataInput + "&EndDate=" + EndDate;
            }
        }
        DataInput = DataInput + "&NoBookOfBusinessInt=" + NoBookOfBusiness;

        //WeatherScenarioGraphsGetInfo/?WholeBlockString={WholeBlockString}&WeatherSCenario={WeatherSCenario}&MonthsString={MonthsString}&UtilityAccountString={UtilityAccountString}&StartDate={StartDate}&EndDate={EndDate}",
        var urlMain = '/Services/WCFWebService.svc/RiskMonthlyPositionGraphsGetInfo'; ///?' + DataInput;// '&CongestionZoneString=NA&MonthsString=NA';
        if (DataInput != '') {
            urlMain = urlMain + '?' + DataInput;
        }

        var ResultDataGraphs = ReturnDataFromService(urlMain);
        var dataGraphMain = new google.visualization.DataTable();

        dataGraphMain.addColumn('string', 'BookOfBusiness');
        dataGraphMain.addColumn('date', 'deliverydate');
        dataGraphMain.addColumn('string', 'deliverydatestring');
        dataGraphMain.addColumn('number', 'GrossUsageMWH');
        dataGraphMain.addColumn('number', 'GrossUsageDollars');
        dataGraphMain.addColumn('number', 'GrossUsageMW');
        ResultDataGraphs.forEach(function (row) {
            dataGraphMain.addRow([
                row.BookOfBusiness,
                row.deliverydate,
                row.DeliveryDateString,                
                row.GrossUsageMWH,
                row.GrossUsageDollars,
                row.GrossUsageMW,             
            ]);
        });
        
        
        dataGraphMain = ChangeDateField(dataGraphMain, 2, 1);

        //dataGraphMain.addColumn('date', 'DeliveryDate_Date');

        //var iRowsLimit = dataGraphMain.getNumberOfRows();
        //var iRows = 0;
        //var iNewColumn = 6
        //for (iRows = 0; iRows < iRowsLimit; iRows++) {
        //    dataGraphMain.setValue(iRows, iNewColumn , new Date(dataGraphMain.getValue(iRows, 2)));
        //}
        //for (iRows = 0; iRows < iRowsLimit; iRows++) {
        //    dataGraphMain.setValue(iRows, 1, new Date(dataGraphMain.getValue(iRows, iNewColumn )));
        //}
        //dataGraphMain.removeColumn(iNewColumn);
        //dataGraphMain.setColumnProperty(2, 'type', 'date');

        return dataGraphMain;
    }
    catch (e) {
        alertify.error(e);
    }
}

function ObtainRiskHourlyPositionGraphData(xmlBookOfBusineess, xmlLineOfBusiness, xmlCongestionZone, xmlWholeSaleBlock, xmlMonthsString) {
    try {

        ///?BookOfBusinessString={BookOfBusinessString}&LineOfBusinessString={LineOfBusinessString}&CongestionZoneString={CongestionZoneString}&StartDate={StartDate}&EndDate={EndDate}",
        //var inputWholesaleBlock = '<Row><WH>1</WH></Row>'
        var DataInput = '';

        if (xmlBookOfBusineess != '') {
            DataInput = "BookOfBusinessString=" + xmlBookOfBusineess;
        }
        if (xmlLineOfBusiness != '') {
            if (DataInput == '') {
                DataInput = "LineOfBusinessString=" + xmlLineOfBusiness;
            } else {
                DataInput = DataInput + "&LineOfBusinessString=" + xmlLineOfBusiness;
            }
        }
        if (xmlCongestionZone != '') {
            if (DataInput == '') {
                DataInput = "CongestionZoneString=" + xmlCongestionZone;
            }
            else {
                DataInput = DataInput + "&CongestionZoneString=" + xmlCongestionZone;
            }
        }
        if (xmlWholeSaleBlock != '') {
            if (DataInput == '') {
                DataInput = "WholeBlockString=" + xmlWholeSaleBlock;
            }
            else {
                DataInput = DataInput + "&WholeBlockString=" + xmlWholeSaleBlock;
            }
        }
        if (xmlMonthsString != '') {
            if (DataInput == '') {
                DataInput = "MonthsString=" + xmlMonthsString;
            }
            else {
                DataInput = DataInput + "&MonthsString=" + xmlMonthsString;
            }
        }
        var urlMain = '/Services/WCFWebService.svc/RiskHourlyPositionGraphsGetInfo'; ///?' + DataInput;// '&CongestionZoneString=NA&MonthsString=NA';
        if (DataInput != '') {
            urlMain = urlMain + '?' + DataInput;
        }

        var ResultDataGraphs = ReturnDataFromService(urlMain);
        var dataGraphMain = new google.visualization.DataTable();

        dataGraphMain.addColumn('string', 'BookOfBusiness');
        dataGraphMain.addColumn('number', 'HE');
        dataGraphMain.addColumn('number', 'GrossUsageMWH');
        dataGraphMain.addColumn('number', 'GrossUsageMW');
        ResultDataGraphs.forEach(function (row) {
            dataGraphMain.addRow([
                row.BookOfBusiness,
                row.HE,                
                row.GrossUsageMWH,                
                row.GrossUsageMW,
            ]);
        });
        return dataGraphMain;
    }
    catch (e) {
        alertify.error(e);
    }
}

function ObtainRiskWholeSaleTradeSettlementPositionGraphData(xmlCounterParty, xmlMonthsString, ApplyTotals) {
    try {

        ///?BookOfBusinessString={BookOfBusinessString}&LineOfBusinessString={LineOfBusinessString}&CongestionZoneString={CongestionZoneString}&StartDate={StartDate}&EndDate={EndDate}",
        //var inputWholesaleBlock = '<Row><WH>1</WH></Row>'
        var DataInput = '';

        if (xmlCounterParty != '') {
            DataInput = "CounterPartyString=" + xmlCounterParty;
        }        
        if (xmlMonthsString != '') {
            if (DataInput == '') {
                DataInput = "MonthsString=" + xmlMonthsString;
            }
            else {
                DataInput = DataInput + "&MonthsString=" + xmlMonthsString;
            }
        }
        if (ApplyTotals != '') {
            if (DataInput == '') {
                DataInput = "ApplyTotals=" + ApplyTotals;
            }
            else {
                DataInput = DataInput + "&ApplyTotals=" + ApplyTotals;
            }
        }
        var urlMain = '/Services/WCFWebService.svc/RiskWholeSaleTradeSettlementPositionGraphsGetInfo'; ///?' + DataInput;// '&CongestionZoneString=NA&MonthsString=NA';
        if (DataInput != '') {
            urlMain = urlMain + '?' + DataInput;
        }

        var ResultDataGraphs = ReturnDataFromService(urlMain);
        var dataGraphMain = new google.visualization.DataTable();

        dataGraphMain.addColumn('string', 'CounterParty');
        dataGraphMain.addColumn('string', 'DealID');
        dataGraphMain.addColumn('number', 'Volume');
        dataGraphMain.addColumn('number', 'Cost');
        dataGraphMain.addColumn('number', 'TypeOfRecord')
        ResultDataGraphs.forEach(function (row) {            
            dataGraphMain.addRow([
                row.CounterParty,
                row.DealID,
                row.Volume,
                row.Cost,
                row.TypeOfRecord,
            ]);
        });
        return dataGraphMain;
    }
    catch (e) {
        alertify.error(e);
    }
}

function ObtainPricingSummaryPricingComponentsGraphData(xmlCustomersString, xmlDealsString, xmlStartDatesString, xmlTermsString, xmCategoryString, xmlSubCategoryString, xmlValueType) {
    try {
        ///?BookOfBusinessString={BookOfBusinessString}&LineOfBusinessString={LineOfBusinessString}&CongestionZoneString={CongestionZoneString}&StartDate={StartDate}&EndDate={EndDate}",
        //var inputWholesaleBlock = '<Row><WH>1</WH></Row>'
        var DataInput = '';


        //CategoryString{ CategoryString }& SubCategoryString{ SubCategoryString }& ValueType={ ValueType } ",
        if (xmlCustomersString != '') {
            DataInput = "CustomersString=" + xmlCustomersString;
        }
        if (xmlDealsString != '') {
            if (DataInput == '') {
                DataInput = "DealsString=" + xmlDealsString;
            } else {
                DataInput = DataInput + "&DealsString=" + xmlDealsString;
            }
        }
        if (xmlStartDatesString != '') {
            if (DataInput == '') {
                DataInput = "StartDatesString=" + xmlStartDatesString;
            }
            else {
                DataInput = DataInput + "&StartDatesString=" + xmlStartDatesString;
            }
        }
        if (xmlTermsString != '') {
            if (DataInput == '') {
                DataInput = "TermsString=" + xmlTermsString;
            }
            else {
                DataInput = DataInput + "&TermsString=" + xmlTermsString;
            }
        }
        if (xmCategoryString != '') {
            if (DataInput == '') {
                DataInput = "CategoryString=" + xmCategoryString;
            }
            else {
                DataInput = DataInput + "&CategoryString=" + xmCategoryString;
            }
        }
        if (xmlSubCategoryString != '') {
            if (DataInput == '') {
                DataInput = "SubCategoryString=" + xmlSubCategoryString;
            }
            else {
                DataInput = DataInput + "&SubCategoryString=" + xmlSubCategoryString;
            }
        }
        if (xmlValueType != '') {
            if (DataInput == '') {
                DataInput = "ValueType=" + xmlValueType;
            }
            else {
                DataInput = DataInput + "&ValueType=" + xmlValueType;
            }
        }
        var urlMain = '/Services/WCFWebService.svc/PricingSummaryPricingComponentsFilteredGetInfo'; ///?' + DataInput;// '&CongestionZoneString=NA&MonthsString=NA';
        if (DataInput != '') {
            urlMain = urlMain + '?' + DataInput;
        }

        var ResultDataGraphs = ReturnDataFromService(urlMain);
        var dataGraphMain = new google.visualization.DataTable();

        dataGraphMain.addColumn('string', 'PricingCategory');
        dataGraphMain.addColumn('string', 'PricingSubCategory');
        dataGraphMain.addColumn('number', 'SumPrice');
        dataGraphMain.addColumn('number', 'AvgPrice');
        dataGraphMain.addColumn('number', 'MajorOrderID');
        dataGraphMain.addColumn('number', 'MinorOrderID');
        ResultDataGraphs.forEach(function (row) {
            dataGraphMain.addRow([
                row.PricingCategory,
                row.PricingSubCategory,
                row.SumPrice,
                row.AvgPrice,
                row.MajorOrderID,
                row.MinorOrderID,
            ]);
        });
        return dataGraphMain;

    }
    catch (e) {
        alertify.error(e);
    }
}

function ObtainPricingMonthlyPricesGraphData(xmlCustomersString, xmlDealsString, xmlStartDatesString, xmlTermsString, xmCategoryString, xmlSubCategoryString, xmlValueType) {
    try {
        var DataInput = '';

        //CategoryString{ CategoryString }& SubCategoryString{ SubCategoryString }& ValueType={ ValueType } ",
        if (xmlCustomersString != '') {
            DataInput = "CustomersString=" + xmlCustomersString;
        }
        if (xmlDealsString != '') {
            if (DataInput == '') {
                DataInput = "DealsString=" + xmlDealsString;
            } else {
                DataInput = DataInput + "&DealsString=" + xmlDealsString;
            }
        }
        if (xmlStartDatesString != '') {
            if (DataInput == '') {
                DataInput = "StartDatesString=" + xmlStartDatesString;
            }
            else {
                DataInput = DataInput + "&StartDatesString=" + xmlStartDatesString;
            }
        }
        if (xmlTermsString != '') {
            if (DataInput == '') {
                DataInput = "TermsString=" + xmlTermsString;
            }
            else {
                DataInput = DataInput + "&TermsString=" + xmlTermsString;
            }
        }
        if (xmCategoryString != '') {
            if (DataInput == '') {
                DataInput = "CategoryString=" + xmCategoryString;
            }
            else {
                DataInput = DataInput + "&CategoryString=" + xmCategoryString;
            }
        }
        if (xmlSubCategoryString != '') {
            if (DataInput == '') {
                DataInput = "SubCategoryString=" + xmlSubCategoryString;
            }
            else {
                DataInput = DataInput + "&SubCategoryString=" + xmlSubCategoryString;
            }
        }
        if (xmlValueType != '') {
            if (DataInput == '') {
                DataInput = "ValueType=" + xmlValueType;
            }
            else {
                DataInput = DataInput + "&ValueType=" + xmlValueType;
            }
        }
        var urlMain = '/Services/WCFWebService.svc/PricingMonthlyPricesFilteredGetInfo'; ///?' + DataInput;// '&CongestionZoneString=NA&MonthsString=NA';
        if (DataInput != '') {
            urlMain = urlMain + '?' + DataInput;
        }

        var ResultDataGraphs = ReturnDataFromService(urlMain);
        var dataGraphMain = new google.visualization.DataTable();

        dataGraphMain.addColumn('string', 'DeliveryDate');
        dataGraphMain.addColumn('number', 'NetUsage');
        dataGraphMain.addColumn('number', 'Margin');
        dataGraphMain.addColumn('number', 'EnergyPrice');
        dataGraphMain.addColumn('number', 'AncServPrice');
        dataGraphMain.addColumn('number', 'MiscAdminPrice');
        dataGraphMain.addColumn('number', 'LossesPrice');
        dataGraphMain.addColumn('number', 'BasisPrice');
        dataGraphMain.addColumn('number', 'VolRiskPrice');
        dataGraphMain.addColumn('number', 'BrokerFee');
        //dataGraphMain.addColumn('number', 'CongestionRevRights');
        dataGraphMain.addColumn('number', 'TotalCost');
        dataGraphMain.addColumn('number', 'Price');
        dataGraphMain.addColumn('number', 'GrossMargin');
        dataGraphMain.addColumn('number', 'CRR_Price');
        // Volumes
        dataGraphMain.addColumn('number', 'GrossUsage');
        dataGraphMain.addColumn('number', 'Losses');
        dataGraphMain.addColumn('number', 'NonSpin');
        dataGraphMain.addColumn('number', 'RegDown');
        dataGraphMain.addColumn('number', 'ReplacementReserve');
        dataGraphMain.addColumn('number', 'RegUp');
        dataGraphMain.addColumn('number', 'RPS');        
        ResultDataGraphs.forEach(function (row) {
            dataGraphMain.addRow([
                row.DeliveryDate,
                row.NetUsage,
                row.Margin,
                row.EnergyPrice,
                row.AncServPrice,
                row.MiscAdminPrice,
                row.LossesPrice,
                row.BasisPrice,
                row.VolRiskPrice,
                row.BrokerFee,                
                row.TotalCost,
                row.Price,
                row.GrossMargin,
                row.CRR_Price,
                // Volumes
                row.GrossUsage,
                row.Losses,
                row.NoSpin,
                row.RegDown,
                row.ReplacementReserve,
                row.RegUp,
                row.RPS,
            ]);
        });
        //DeliveryDate
        dataGraphMain = ChangeDateField(dataGraphMain, 0, 0);
        //dataGraphMain.setColumnProperty(0, 'type', 'date')
        // Format the Date correctly
        var formatter_long = new google.visualization.DateFormat({ formatType: 'long' });
        var formatter_medium = new google.visualization.DateFormat({ formatType: 'medium' });
        var formatter_short = new google.visualization.DateFormat({ formatType: 'short' });
        formatter_short.format(dataGraphMain, 0);

        return dataGraphMain;

    }
    catch (e) {
        alertify.error(e);
    }
}

function ObtainLoadResearchBackCastGraphData(xmlUtilityAccountNumberString, xmlWholeBlockString, xmlHoursString, xmlLineOfBusinessString, xmlCustomersString, xmlMonthsString) {
    try {
        var DataInput = '';

        //CategoryString{ CategoryString }& SubCategoryString{ SubCategoryString }& ValueType={ ValueType } ",
        if (xmlUtilityAccountNumberString != '') {
            DataInput = "UtilityAccountNumberString=" + xmlUtilityAccountNumberString;
        }
        if (xmlWholeBlockString != '') {
            if (DataInput == '') {
                DataInput = "WholeSaleBlockString=" + xmlWholeBlockString;
            } else {
                DataInput = DataInput + "&WholeSaleBlockString=" + xmlWholeBlockString;
            }
        }
        if (xmlHoursString != '') {
            if (DataInput == '') {
                DataInput = "HoursString=" + xmlHoursString;
            }
            else {
                DataInput = DataInput + "&HoursString=" + xmlHoursString;
            }
        }
        if (xmlLineOfBusinessString != '') {
            if (DataInput == '') {
                DataInput = "LineOfBusinessString=" + xmlLineOfBusinessString;
            }
            else {
                DataInput = DataInput + "&LineOfBusinessString=" + xmlLineOfBusinessString;
            }
        }
        if (xmlCustomersString != '') {
            if (DataInput == '') {
                DataInput = "CustomersString=" + xmlCustomersString;
            }
            else {
                DataInput = DataInput + "&CustomersString=" + xmlCustomersString;
            }
        }
        if (xmlMonthsString != '') {
            if (DataInput == '') {
                DataInput = "MonthsString=" + xmlMonthsString;
            }
            else {
                DataInput = DataInput + "&MonthsString=" + xmlMonthsString;
            }
        }        
        var urlMain = '/Services/WCFWebService.svc/LoadResearchBackCastGraphsGetInfo'; ///?' + DataInput;// '&CongestionZoneString=NA&MonthsString=NA';
        if (DataInput != '') {
            urlMain = urlMain + '?' + DataInput;
        }

        var ResultDataGraphs = ReturnDataFromService(urlMain);
        var dataGraphMain = new google.visualization.DataTable();

        
        dataGraphMain.addColumn('number', 'tdb');
        dataGraphMain.addColumn('number', 'SumUsage');
        dataGraphMain.addColumn('number', 'SumBackCast');

        ResultDataGraphs.forEach(function (row) {
            dataGraphMain.addRow([
                row.tdb,
                row.SumUsage,
                row.SumBackCast,
            ]);
        });
        // Format the Date correctly
        //var formatter_long = new google.visualization.DateFormat({ formatType: 'long' });
        //var formatter_medium = new google.visualization.DateFormat({ formatType: 'medium' });
        //var formatter_short = new google.visualization.DateFormat({ formatType: 'short' });
        //formatter_short.format(dataGraphMain, 0);

        return dataGraphMain;

    }
    catch (e) {
        alertify.error(e);
    }
}


