function ChangeSelectorsMemGraph(GraphTypeMain) {
    try {
        $('#DynamicRow_Cust').show();
        DrawGraphType = GraphTypeMain;
        var ControlToSet = "selFirst";
        $('#' + ControlToSet).show();
        ControlToSet = "Second";
        $('#div' + ControlToSet).show();
        $('#sel' + ControlToSet).show();
        ControlToSet = "Third";
        $('#div' + ControlToSet).show();
        $('#sel' + ControlToSet).show();
        ControlToSet = "Frth";
        $('#div' + ControlToSet).hide();
        $('#sel' + ControlToSet).hide();
        ControlToSet = "Fifth";
        $('#div' + ControlToSet).hide();
        $('#sel' + ControlToSet).hide();
        ControlToSet = "Sixth";
        $('#div' + ControlToSet).hide();
        $('#sel' + ControlToSet).hide();
        ControlToSet = "Seventh";
        $('#div' + ControlToSet).hide();
        $('#sel' + ControlToSet).hide();
        $('#DateRangeSelector').hide();
        $('#divRefreshButton').hide();
        $('#DynamicRow_SingleChart').show();
        $('#DynamicRow_SingleTable').show();
        $('#DynamicRow_ChartTable').hide();
        $('#DynamicRow_Risk').hide();
        $('#DynamicRow_LoadResearch').hide();
        $('#DynamicRow_Pricing').hide();
        $('#DynamicRow_ChartChart').hide()
        $('#DynamicRow_ChartTableLeftChartRight').hide();
        $('#DynamicRow_3Charts').hide();
        $('#DynamicRow_ChartTableLeftChartRight').hide();
        $('#DynamicRow_TableTableChartRight').hide();
        $('#DynamicRow_WholesaleDealEntryHeader').hide();
        $('#DynamicRow_WholesaleDataEntryForm').hide();
        $('#row_TBL').hide();
        $('#DynamicRow_RetailDataEntryForm').hide();
        if (DrawGraphType == "Monthly") {
            $('#DynamicRow_LoadResearch').show();
            TurnOnCorrectHeader('DynamicRow_LoadResearch');
            $("#StatsPageHeaderLabel").text("Monthly");
            $("#lblFirst").text("Select Month");
            $("#lblSecond").text("Select Congestion Zone");
            $("#lblThird").text("Select WholeSale Block");
            $("#lblFrth").text("Select Account");
            ControlToSet = "selFirst";
            GraphingSetMonths(ControlToSet);
            $("#lblFirst").text("Select Month");
            ControlToSet = "selSecond";
            GraphingSetCongestionZones(ControlToSet);
            $("#lblSecond").text("Select Congestion Zone");
            ControlToSet = "selThird";
            GraphingSetWholeSaleBlocks(ControlToSet);
            $("#lblThird").text("Select WholeSale Block");
            ControlToSet = "selFrth";
            GraphingSetAccounts(ControlToSet);
            $("#lblFrth").text("Select Account");
            ControlToSet = "divSixth";
            $('#' + ControlToSet).show();
            ControlToSet = "selSixth";
            GraphingSetCustomer(ControlToSet);
            redrawChartMonthly();
        } else if (DrawGraphType == "HourlyShapes") {
            $('#DynamicRow_LoadResearch').show();
            $("#StatsPageHeaderLabel").text("Hourly Shapes");
            TurnOnCorrectHeader('DynamicRow_LoadResearch');
            $("#StatsPageHeaderLabel").text("Hourly Shapes");
            $("#lblFirst").text("Select Month");
            $("#lblSecond").text("Select Congestion Zone");
            $("#lblThird").text("Select WholeSale Block");
            $("#lblFrth").text("Select Account");
            ControlToSet = "selFirst";
            GraphingSetMonths(ControlToSet);
            $('#First').text("Select Monthly");
            ControlToSet = "selSecond";
            GraphingSetCongestionZones(ControlToSet);
            $('#First').text("Select Congestion Zone");
            ControlToSet = "selThird";
            GraphingSetWholeSaleBlocks(ControlToSet);
            $('#First').text("Select WholeSaleBlock");
            ControlToSet = "selFrth";
            GraphingSetAccounts(ControlToSet);
            $('#First').text("Select Account");
            ControlToSet = "divSixth";
            $('#' + ControlToSet).show();
            ControlToSet = "selSixth";
            GraphingSetCustomer(ControlToSet);
            redrawChartHourlyScalar();
        } else if (DrawGraphType == "WholeSaleDealEntry") {
            $('#DynamicRow_SingleChart').hide();
            $('#DynamicRow_SingleTable').hide();
            $('#DynamicRow_Cust').hide();                
            $('#DynamicRow_WholeSaleDealEntryHeader').show();
            $('#DynamicRow_WholesaleDataEntryForm').show();
            TurnOnCorrectHeader('DealEntry');
            SetUpWholesaleDealEntryScreen();
            // Filling in Dropdowns            
            alertify.success("Wholesale Deal Entry");
        } else if (DrawGraphType == "RetailDealEntry") {
            $('#DynamicRow_SingleChart').hide();
            $('#DynamicRow_SingleTable').hide();
            $('#DynamicRow_Cust').hide();
            $('#DynamicRow_RetailDataEntryForm').show();            
            TurnOnCorrectHeader('DealEntry');
            SetUpRetailDealEntryScreen();
            // Filling in Dropdowns            
            alertify.success("Wholesale Deal Entry");
            // Retail Deal Entry
        } else if (DrawGraphType == "VolumetricRisk") {
            $("#StatsPageHeaderLabel").text("Retail Risk");
            $('#DynamicRow_LoadResearch').show();
            TurnOnCorrectHeader('DynamicRow_LoadResearch');
            $("#StatsPageHeaderLabel").text("Retail Risk");
            $("#lblFirst").text("Select Month");
            $("#lblSecond").text("Select Congestion Zone");
            $("#lblThird").text("Select WholeSale Block");
            $("#lblFrth").text("Select Account");
            ControlToSet = "selFirst";
            GraphingSetMonths(ControlToSet);
            $('#First').text("Select Monthly");
            ControlToSet = "selSecond";
            GraphingSetCongestionZones(ControlToSet);
            $('#First').text("Select Congestion Zone");
            ControlToSet = "selThird";
            //GraphingSetWholeSaleBlocks(ControlToSet);
            ControlToSet = "Third";
            $('#div' + ControlToSet).hide();
            $('#sel' + ControlToSet).hide();
            $('#First').text("Select WholeSaleBlock");
            ControlToSet = "selFrth";
            GraphingSetAccounts(ControlToSet);
            $('#First').text("Select Account");
            ControlToSet = "divSixth";
            $('#' + ControlToSet).show();
            ControlToSet = "selSixth";
            GraphingSetCustomer(ControlToSet);
            redrawChartVolumetricRisk();
        } else if (DrawGraphType == "WeatherScenario") {
            $("#StatsPageHeaderLabel").text("Weather Scenario");
            $('#DynamicRow_LoadResearch').show();
            TurnOnCorrectHeader('DynamicRow_LoadResearch');
            $("#lblFirst").text("Select Month");
            $("#lblSecond").text("Select Weather Scenario");
            $("#lblThird").text("Select WholeSale Block");
            $("#lblFrth").text("Select Account");
            $('#DateRangeSelector').show();
            ControlToSet = "selFirst";
            GraphingSetMonths(ControlToSet);
            $('#First').text("Select Monthly");
            ControlToSet = "selSecond";
            GraphingSetWeatherScenario(ControlToSet);
            $('#First').text("Select Congestion Zone");
            ControlToSet = "selThird";
            GraphingSetWholeSaleBlocks(ControlToSet);
            $('#First').text("Select WholeSaleBlock");
            ControlToSet = "selFrth";
            GraphingSetAccounts(ControlToSet);
            $('#First').text("Select Account");
            ControlToSet = "divSixth";
            $('#' + ControlToSet).show();
            ControlToSet = "selSixth";
            GraphingSetCustomer(ControlToSet);
            //alertify.error(DrawGraphType + "is Coming");
            $("#columnchart_stacked").show();
            $("#table_div").hide();
            redrawChartWeatherHourly();
        } else if (DrawGraphType == "ScatterPlot") {
            $('#DynamicRow_LoadResearch').show();
            TurnOnCorrectHeader('DynamicRow_LoadResearch');
            $("#StatsPageHeaderLabel").text("Scatter Plot");
            $('#divFifth').show();
            ControlToSet = "selFirst";
            GraphingSetMonths(ControlToSet);
            ControlToSet = "selSecond";
            GraphingSetCongestionZones(ControlToSet);
            ControlToSet = "selThird";
            GraphingSetWholeSaleBlocks(ControlToSet);
            ControlToSet = "selFrth";
            GraphingSetAccounts(ControlToSet);
            ControlToSet = "selFifth";
            GraphingSetHours(ControlToSet);
            redrawChartScatterPlot();
            $("#columnchart_stacked").show();
            $("#table_div").hide();
            //alertify.error(DrawGraphType + "is In Process");
        } else if (DrawGraphType == "ErcotLoadAnimate") {
            $('#DynamicRow_LoadResearch').show();
            $("#StatsPageHeaderLabel").text("Ercot Animation");
            TurnOnCorrectHeader('DynamicRow_LoadResearch');
            $("#StatsPageHeaderLabel").text("Ercot Animation");
            $('#divRefreshButton').show();
            ControlToSet = "selFirst";
            GraphingSetMonths(ControlToSet);
            ControlToSet = "selSecond";
            GraphingSetCongestionZones(ControlToSet);
            ControlToSet = "selThird";
            GraphingSetWholeSaleBlocks(ControlToSet);
            ControlToSet = "selFrth";
            GraphingSetAccounts(ControlToSet);
            ControlToSet = "selFifth";
            GraphingSetHours(ControlToSet);
            $("#columnchart_stacked").hide();
            $("#table_div").hide();
            //redrawChartErcotAnimationPlot();
        } else if (DrawGraphType == "PeakModel") {
            $('#DynamicRow_LoadResearch').show();
            $("#StatsPageHeaderLabel").text("Peak Model");
            TurnOnCorrectHeader('DynamicRow_LoadResearch');
            ControlToSet = "Fourth";
            $('#div' + ControlToSet).hide();
            $('#sel' + ControlToSet).hide();
            ControlToSet = "selFirst";
            GraphingSetMonths(ControlToSet);
            ControlToSet = "selSecond";
            GraphingSetWeatherScenario(ControlToSet);
            ControlToSet = "selThird";
            GraphingSetAccounts(ControlToSet);
            ControlToSet = "selFourth";
            $("#" + ControlToSet).hide();
            $("#StatsPageHeaderLabel").text("Peak Model");
            redrawChartCoincidencePeakGraphsGetInfo();
            //$("#columnchart_stacked").hide();
            //$("#table_div").hide();
            //alertify.error(DrawGraphType + "is Coming");
        } else if (DrawGraphType == 'LoadResearchBackCast') {
            $('#DynamicRow_LoadResearch').show();
            // Show Fifth and Sixth
            ControlToSet = "Third";
            $('#div' + ControlToSet).show();
            $('#sel' + ControlToSet).show();
            ControlToSet = "Frth";
            $('#div' + ControlToSet).show();
            $('#sel' + ControlToSet).show();
            $('#divFourth').show();
            ControlToSet = "Fifth";
            $('#div' + ControlToSet).show();
            $('#sel' + ControlToSet).show();
            ControlToSet = "Seventh";
            $('#div' + ControlToSet).show();
            $('#sel' + ControlToSet).show();
            // Customer Name
            ControlToSet = "selFirst";
            GraphingSetCustomer(ControlToSet);
            // Utility Account Number
            ControlToSet = "selSecond";
            GraphingSetAccounts(ControlToSet);
            // Hours
            ControlToSet = "selThird";
            GraphingSetHours(ControlToSet);
            // Line of Business
            ControlToSet = "selFrth";
            GraphingSetLineOfBusiness(ControlToSet);
            // WholeSale Block
            ControlToSet = "selFifth";
            GraphingSetWholeSaleBlocks(ControlToSet);
            // Months
            ControlToSet = "selSeventh";
            GraphingSetMonths(ControlToSet);
            // Remove the Check All
            ControlToSet = "selFirst";
            $('#' + ControlToSet + ' li:first-child').remove();
            ControlToSet = "selSecond";
            $('#' + ControlToSet + ' li:first-child').remove();
            ControlToSet = "selThird";
            $('#' + ControlToSet + ' li:first-child').remove();
            ControlToSet = "selFrth";
            $('#' + ControlToSet + ' li:first-child').remove();
            ControlToSet = "selFifth";
            $('#' + ControlToSet + ' li:first-child').remove();
            ControlToSet = "selSeventh";
            $('#' + ControlToSet + ' li:first-child').remove();
            // Select single account and single hour?
            ControlToSet = 'selSecond';
            SetFirstCheckBox(ControlToSet);
            ControlToSet = 'selThird';
            SetFirstCheckBox(ControlToSet);
            ControlToSet = 'selSeventh';
            SetFirstCheckBox(ControlToSet);
            redrawChartLoadResearchBackCast();
        } else if (DrawGraphType == "RiskMonthlyDetail") {
            $('#DynamicRow_Risk').show();
            $("#StatsPageHeaderLabel").text("Monthly Detail");
            TurnOnCorrectHeader('DynamicRow_Risk');
            ControlToSet = "selFirst";
            GraphingSetBookOfBusiness(ControlToSet);
            ControlToSet = "selSecond";
            GraphingSetLineOfBusiness(ControlToSet);
            ControlToSet = "selThird";
            GraphingSetCongestionZones(ControlToSet);
            ControlToSet = "DateRangeSelector";
            $("#" + ControlToSet).show();
            ControlToSet = "divFourth";
            $("#" + ControlToSet).hide();
            ControlToSet = "divFifth";
            $("#" + ControlToSet).hide();
            var dtStartDate = new Date();
            dtStartDate = new Date(2020, 1, 1);
            document.getElementById('dtEndDate').valueAsDate = dtStartDate;
            dtStartDate = new Date(dtStartDate.getFullYear() - 1, dtStartDate.getMonth(), dtStartDate.getDate());
            document.getElementById('dtStartDate').valueAsDate = dtStartDate;
            $("#columnchart_stacked").show();
            $("#table_div").show();
            redrawChartRiskMonthlyDetail();
        } else if (DrawGraphType == "RiskMonthlyPosition") {
            $('#DynamicRow_Risk').show();
            TurnOnCorrectHeader('DynamicRow_Risk');
            ControlToSet = "selFirst";
            GraphingSetBookOfBusiness(ControlToSet);
            ControlToSet = "selSecond";
            GraphingSetLineOfBusiness(ControlToSet);
            ControlToSet = "selThird";
            GraphingSetCongestionZones(ControlToSet);
            ControlToSet = "DateRangeSelector";
            $("#" + ControlToSet).show();
            ControlToSet = "divFourth";
            $("#" + ControlToSet).hide();
            ControlToSet = "divFifth";
            $("#" + ControlToSet).hide();
            var dtStartDate = new Date();
            dtStartDate = new Date(2020, 1, 1);
            // Remove the first line
            document.getElementById('dtEndDate').valueAsDate = dtStartDate;
            dtStartDate = new Date(dtStartDate.getFullYear() - 1, dtStartDate.getMonth(), dtStartDate.getDate());
            document.getElementById('dtStartDate').valueAsDate = dtStartDate;
            $("#columnchart_stacked").show();
            $("#table_div").show();
            redrawChartRiskMonthlyPosition();
        } else if (DrawGraphType == "RiskHourlyPosition") {
            $('#DynamicRow_Risk').show();
            //TurnOnCorrectHeader('DynamicRow_Risk');
            ControlToSet = "selFirst";
            GraphingSetBookOfBusiness(ControlToSet);
            ControlToSet = "selSecond";
            GraphingSetLineOfBusiness(ControlToSet);
            ControlToSet = "selThird";
            GraphingSetCongestionZones(ControlToSet);
            ControlToSet = "selFrth";
            GraphingSetWholeSaleBlocks(ControlToSet);
            ControlToSet = "divFifth";
            $("#" + ControlToSet).show();
            ControlToSet = "selFifth";
            GraphingSetRiskHourlyPositionAllMonthsGetInfo(ControlToSet);
            ControlToSet = "DateRangeSelector";
            $("#" + ControlToSet).hide();
            redrawChartRiskHourlyPosition();
        } else if (DrawGraphType == "RiskWholesaleSettlmentReport") {
            $('#DynamicRow_Risk').show();
            $("#StatsPageHeaderLabel").text("Monthly Position");
            $('#DynamicRow_SingleChart').hide();
            $('#DynamicRow_SingleTable').hide();
            $('#DynamicRow_ChartTable').show();
            TurnOnCorrectHeader('DynamicRow_Risk');
            ControlToSet = "selFirst";
            GraphingSetCounterParties(ControlToSet);
            ControlToSet = "selSecond";
            GraphingRiskWholeSaleTradeSettlementPositionAllMonthsGetInfoGetInfo(ControlToSet);
            ControlToSet = "Third";
            $('#div' + ControlToSet).hide();
            ControlToSet = "Fourth";
            $('#div' + ControlToSet).hide();
            ControlToSet = "Fifth";
            $('#div' + ControlToSet).hide();
            ControlToSet = "divRefreshButton";
            $('#DateRangeSelector').hide();
            $('#divRefreshButton').hide();
            redrawChartRiskWholeSaleTradeSettlementPositionPosition();
        } else if (DrawGraphType == 'RiskWholesaleTrades') {
            $("#StatsPageHeaderLabel").text("Wholesale Trades");
            TurnOnCorrectHeader('DynamicRow_Risk');
            $('#DynamicRow_Cust').show();
            $('#DynamicRow_SingleChart').hide();
            $('#DynamicRow_ChartTable').hide();
            $('#DynamicRow_ChartChart').show()
            $('#DynamicRow_SingleTable').show();
            redrawChartRiskWholeSaleTradesPosition();
        } else if ((DrawGraphType == 'PricingSummary') || (DrawGraphType == 'PricingMonthlyPrices') || (DrawGraphType == 'PricingMonthlyVolumes')) {
            TurnOnCorrectHeader('DynamicRow_Pricing');
            ControlToSet = "Frth";
            $('#div' + ControlToSet).show();
            $('#sel' + ControlToSet).show();
            ControlToSet = "selFirst";
            GraphingSetCustomer(ControlToSet);
            ControlToSet = "selSecond";
            GraphingSetDealIDs(ControlToSet);
            ControlToSet = "selThird";
            GraphingPricingStartDates(ControlToSet);
            $('#DynamicRow_LoadResearch').hide();
            $('#DynamicRow_SingleChart').hide();
            $('#DynamicRow_ChartTable').hide();
            $('#DynamicRow_ChartChart').hide()
            $('#DynamicRow_SingleTable').hide();
            // Break Between Differing Reports
            if (DrawGraphType == 'PricingSummary') {
                $("#StatsPageHeaderLabel").text("Pricing Summary");
                var TypeID = 0;
                ControlToSet = "selFrth";
                GraphingPricingTermsGetInfoGetInfo(ControlToSet, TypeID)
                $('#row_TBL').show();
                ControlToSet = "selTbl_First";
                GraphingSetPricingCatagory(ControlToSet);
                ControlToSet = "selTbl_Second";
                GraphingSetSubPricingCatagory(ControlToSet);
                $('#DynamicRow_3Charts').show();
                redrawChartPricingSummaryPricingComponents();
            } else if (DrawGraphType == 'PricingMonthlyPrices') {
                $('#DynamicRow_TableTableChartRight').show();
                $("#StatsPageHeaderLabel").text("Monthly Prices");
                TypeID = 1;
                ControlToSet = "selFrth";
                GraphingPricingTermsGetInfoGetInfo(ControlToSet, TypeID)
                redrawChartMonthlyPricesComponents();
            } else if (DrawGraphType == 'PricingMonthlyVolumes') {
                $("#StatsPageHeaderLabel").text("Monthly Volumes");
                $('#DynamicRow_TableTableChartRight').show();
                TypeID = 1;
                ControlToSet = "selFrth";
                GraphingPricingTermsGetInfoGetInfo(ControlToSet, TypeID)
                redrawChartMonthlyVolumesComponents();
            } else {
                var TypeID = 1;
                ControlToSet = "selFrth";
                GraphingPricingTermsGetInfoGetInfo(ControlToSet, TypeID)
            }
        }
        else {
            alertify.error(DrawGraphType + " is Coming");
        }

    } catch (e) {
        alertify.error(e);
    }
}