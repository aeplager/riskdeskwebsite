using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;
using System.IO;
namespace WCFWebRole
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "IWCFWebService" in both code and config file together.
    [ServiceContract]
    public interface IWCFWebService
    {
        [WebGet(UriTemplate = "/ReturnDockerURL",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        String ReturnDockerURL();

        [WebGet(UriTemplate = "/WebSiteDropDownSelectorGetInfo/?StoredProc={StoredProc}",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        List<SelectorType> WebSiteDropDownSelectorGetInfo(String StoredProc);

        [WebGet(UriTemplate = "/CoincidencePeakGraphsGetInfo/?WeatherScenarioString={WeatherScenarioString}&UtilityAccountString={UtilityAccountString}&MonthsString={MonthsString}&CustomersString={CustomersString}",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        List<CoincidencePeakGraphView> CoincidencePeakGraphsGetInfo(String WeatherScenarioString, String UtilityAccountString, String MonthsString, String CustomersString);

        [WebGet(UriTemplate = "/CoincidencePeakTableGetInfo/?WeatherScenarioString={WeatherScenarioString}&UtilityAccountString={UtilityAccountString}&MonthsString={MonthsString}",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        List<CoincidencePeakTableView> CoincidencePeakTableGetInfo(String WeatherScenarioString, String UtilityAccountString, String MonthsString);


        [WebGet(UriTemplate = "/PricingSummaryPricingComponentsFilteredGetInfo/?CustomersString={CustomersString}&DealsString={DealsString}&StartDatesString={StartDatesString}&TermsString={TermsString}&CategoryString={CategoryString}&SubCategoryString={SubCategoryString}&ValueType={ValueType}",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        List<PricingSummaryPricingComponentsView> PricingSummaryPricingComponentsFilteredGetInfo(String CustomersString, String DealsString, String StartDatesString, String TermsString, String CategoryString, String SubCategoryString, Int32 ValueType);

        [WebGet(UriTemplate = "/PricingMonthlyPricesFilteredGetInfo/?CustomersString={CustomersString}&DealsString={DealsString}&StartDatesString={StartDatesString}&TermsString={TermsString}&CategoryString={CategoryString}&SubCategoryString={SubCategoryString}&ValueType={ValueType}",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        List<PricingMonthlyPricesView> PricingMonthlyPricesFilteredGetInfo(String CustomersString, String DealsString, String StartDatesString, String TermsString, String CategoryString, String SubCategoryString, Int32 ValueType);

        [WebGet(UriTemplate = "/LoadResearchBackCastGraphsGetInfo/?UtilityAccountNumberString={UtilityAccountNumberString}&WholeSaleBlockString={WholeSaleBlockString}&HoursString={HoursString}&LineOfBusinessString={LineOfBusinessString}&CustomersString={CustomersString}&MonthsString={MonthsString}",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        List<LoadResearchBackCastView> LoadResearchBackCastGraphsGetInfo(String UtilityAccountNumberString, String WholeSaleBlockString, String HoursString, String LineOfBusinessString, String CustomersString, String MonthsString);


        [WebGet(UriTemplate = "/ErcotAnimationGraphsGetInfo/?WholeBlockString={WholeBlockString}&CongestionZoneString={CongestionZoneString}&UtilityAccountString={UtilityAccountString}&MonthsString={MonthsString}&HoursString={HoursString}",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        List<ErcotAnimationGraphView> ErcotAnimationGraphsGetInfo(String WholeBlockString, String CongestionZoneString, String UtilityAccountString, String MonthsString, String HoursString);

        [WebGet(UriTemplate = "/ScatterPlotGraphsGetInfo/?WholeBlockString={WholeBlockString}&CongestionZoneString={CongestionZoneString}&UtilityAccountString={UtilityAccountString}&MonthsString={MonthsString}&HoursString={HoursString}",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        List<ScatterPlotGraphView> ScatterPlotGraphsGetInfo(String WholeBlockString, String CongestionZoneString, String UtilityAccountString, String MonthsString, String HoursString);


        [WebGet(UriTemplate = "/WeatherScenarioGraphsGetInfo/?WholeBlockString={WholeBlockString}&WeatherScenario={WeatherScenario}&MonthsString={MonthsString}&UtilityAccountString={UtilityAccountString}&StartDate={StartDate}&EndDate={EndDate}&CustomersString={CustomersString}",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        List<WeatherScenarioGraphView> WeatherScenarioGraphsGetInfo(String WholeBlockString, String WeatherSCenario, String MonthsString, String UtilityAccountString, DateTime StartDate, DateTime EndDate, String CustomersString);


        [WebGet(UriTemplate = "/RiskMonthlyDetailsGraphsGetInfo/?BookOfBusinessString={BookOfBusinessString}&LineOfBusinessString={LineOfBusinessString}&CongestionZoneString={CongestionZoneString}&StartDate={StartDate}&EndDate={EndDate}&NoBookOfBusinessInt={NoBookOfBusinessInt}",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        List<RiskMonthlyDetailsGraphView> RiskMonthlyDetailsGraphsGetInfo(String BookOfBusinessString, String LineOfBusinessString, String CongestionZoneString, DateTime StartDate, DateTime EndDate, int NoBookOfBusinessInt);


        [WebGet(UriTemplate = "/RetailDealUpsert/?RetailDealID={RetailDealID}&RetailDealName={RetailDealName}&CustomerID={CustomerID}&BrokerID={BrokerID}&StartDate={StartDate}&DealDate={DealDate}&DealCommitted={DealCommitted}&DealCommittmentDate={DealCommittmentDate}&Notes={Notes}&TermRecords={TermRecords}&StatusOfRecordID={StatusOfRecordID}",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        Int64 RetailDealUpsert(Int64 RetailDealID, String RetailDealName, Int64 CustomerID, Int64 BrokerID, String StartDate, String DealDate, String DealCommitted, String DealCommittmentDate, String Notes, String TermRecords, Int64 StatusOfRecordID);


        [WebGet(UriTemplate = "/RetailDealTermsGetInfo/?sDealID={sDealID}",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        List<RetailDealTermsInfo> RetailDealTermsGetInfo(String sDealID);

        [WebGet(UriTemplate = "/AllWholeSaleDealsGetInfo/?DealIDString={DealIDString}",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        List<WholeSaleDeal> AllWholeSaleDealsGetInfo(String DealIDString);

        [WebGet(UriTemplate = "/AllWholeSaleDealUpsert/?WholeSaleDealID={WholeSaleDealID}&WholeSaleDealName={WholeSaleDealName}&ISOID={ISOID}&CounterPartyID={CounterPartyID}&SecondCounterPartyID={SecondCounterPartyID}&SettlementPointID={SettlementPointID}&SetLocationID={SetLocationID}&WholeSaleBlockID={WholeSaleBlockID}&StartDate={StartDate}&DealDate={DealDate}&EndDate={EndDate}&VolumeMW={VolumeMW}&VolumeMWh={VolumeMWh}&Price={Price}&Fee={Fee}&Cost={Cost}&MTM={MTM}&Committed={Committed}",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        WholeSaleDeal AllWholeSaleDealUpsert(Int64 WholeSaleDealID, String WholeSaleDealName, Int64 ISOID, Int64 CounterPartyID, Int64 SecondCounterPartyID, Int64 SettlementPointID, Int64 SetLocationID, Int64 WholeSaleBlockID, DateTime StartDate, DateTime DealDate, DateTime EndDate, Double VolumeMW, Double VolumeMWh, Double Price, Double Fee, Double Cost, Double MTM, Int64 Committed);
        

        [WebGet(UriTemplate = "/RiskMonthlyPositionGraphsGetInfo/?BookOfBusinessString={BookOfBusinessString}&LineOfBusinessString={LineOfBusinessString}&CongestionZoneString={CongestionZoneString}&StartDate={StartDate}&EndDate={EndDate}&NoBookOfBusinessInt={NoBookOfBusinessInt}",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        List<RiskMonthlyPositionGraphView> RiskMonthlyPositionGraphsGetInfo(String BookOfBusinessString, String LineOfBusinessString, String CongestionZoneString, DateTime StartDate, DateTime EndDate, int NoBookOfBusinessInt);

        [WebGet(UriTemplate = "/RiskHourlyPositionGraphsGetInfo/?BookOfBusinessString={BookOfBusinessString}&LineOfBusinessString={LineOfBusinessString}&CongestionZoneString={CongestionZoneString}&WholeBlockString={WholeBlockString}&MonthsString={MonthsString}",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        List<RiskHourlyPositionGraphView> RiskHourlyPositionGraphsGetInfo(String BookOfBusinessString, String LineOfBusinessString, String CongestionZoneString, String WholeBlockString, String MonthsString);

        [WebGet(UriTemplate = "/RiskWholeSaleTradeSettlementPositionGraphsGetInfo/?CounterPartyString={CounterPartyString}&MonthsString={MonthsString}&ApplyTotalsString={ApplyTotalsString}",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        List<RiskWholeSaleTradeSettlementView> RiskWholeSaleTradeSettlementPositionGraphsGetInfo(String CounterPartyString, String MonthsString, String ApplyTotalsString);


        //List<RiskWholeSaleTradeSettlementView> RiskWholeSaleTradeSettlementPositionGraphsGetInfo(String CounterPartyString, String MonthsString)

        //public List<WeatherScenarioGraphView> WeatherScenarioGraphsGetInfo(String WholeBlockString, String WeatherSCenario, String MonthsString, String UtilityAccountString, DateTime StartDate, DateTime EndDate)
        // Graphing Routines
        [WebGet(UriTemplate = "/HourlyScalarGetInfo/?WholeBlockString={WholeBlockString}&CongestionZoneString={CongestionZoneString}&MonthsString={MonthsString}&UtilityAccountString={UtilityAccountString}&CustomersString={CustomersString}",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        List<HourlyScalerGraphView> HourlyScalarGetInfo(String WholeBlockString, String CongestionZoneString, String MonthsString, String UtilityAccountString, String CustomersString);


        [WebGet(UriTemplate = "/MonthlyGraphsGetInfo/?WholeBlockString={WholeBlockString}&CongestionZoneString={CongestionZoneString}&MonthsString={MonthsString}&UtilityAccountString={UtilityAccountString}&CustomersString={CustomersString}",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        List<MonthlyGraphView> MonthlyGraphsGetInfo(String WholeBlockString, String CongestionZoneString, String MonthsString, String UtilityAccountString, String CustomersString);
               
        [WebGet(UriTemplate = "/MonthlyTableGraphsGetInfo/?WholeBlockString={WholeBlockString}&CongestionZoneString={CongestionZoneString}&MonthsString={MonthsString}&UtilityAccountString={UtilityAccountString}",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        List<MonthlyTableGraphView> MonthlyTableGraphsGetInfo(String WholeBlockString, String CongestionZoneString, String MonthsString, String UtilityAccountString);

        [WebGet(UriTemplate = "/VolumetricRiskTableGraphsGetInfo/?WholeBlockString={WholeBlockString}&CongestionZoneString={CongestionZoneString}&MonthsString={MonthsString}&UtilityAccountString={UtilityAccountString}",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        List<VolumetricRiskTableGraphView> VolumetricRiskTableGraphsGetInfo(String WholeBlockString, String CongestionZoneString, String MonthsString, String UtilityAccountString);

        [WebGet(UriTemplate = "/RiskWholeSaleTradesGraphsAndTablesGetInfo/",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        RiskWholeSaleTradesGraphAndTableView RiskWholeSaleTradesGraphsAndTablesGetInfo();

        //RiskWholeSaleTradesGraphAndTableView RiskWholeSaleTradesGraphsAndTablesGetInfo()

        [WebGet(UriTemplate = "/HourlyScalarTableGraphsGetInfo/?WholeBlockString={WholeBlockString}&CongestionZoneString={CongestionZoneString}&MonthsString={MonthsString}&UtilityAccountString={UtilityAccountString}",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        List<HourlyScalarTableGraphView> HourlyScalarTableGraphsGetInfo(String WholeBlockString, String CongestionZoneString, String MonthsString, String UtilityAccountString);

        [WebGet(UriTemplate = "/VolumetricRiskGetInfo/?WholeBlockString={WholeBlockString}&CongestionZoneString={CongestionZoneString}&MonthsString={MonthsString}&UtilityAccountString={UtilityAccountString}&CustomersString={CustomersString}",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        List<VolumetricRiskGraphView> VolumetricRiskGetInfo(String WholeBlockString, String CongestionZoneString, String MonthsString, String UtilityAccountString, String CustomersString);             
        
        [WebGet(UriTemplate = "/AllMonthsGetInfo",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        List<SelectorType> AllMonthsGetInfo();


        [WebGet(UriTemplate = "/AllBrokersGetInfo",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        List<SelectorType> AllBrokersGetInfo();

        

        [WebGet(UriTemplate = "/DealGetInfo/?CustomerID={CustomerID}",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        List<SelectorType> DealGetInfo(String CustomerID);

        [WebGet(UriTemplate = "/DealAllInfoGetInfo/?CustomerID={CustomerID}",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        List<DealInfoID> DealAllInfoGetInfo(String CustomerID);

        [WebGet(UriTemplate = "/AllCounterPartiesGetInfo",
            RequestFormat = WebMessageFormat.Json,
            ResponseFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.Bare)]
        List<SelectorType> AllCounterPartiesGetInfo();

        [WebGet(UriTemplate = "/AllSetPointGetInfo",
            RequestFormat = WebMessageFormat.Json,
            ResponseFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.Bare)]
        List<SelectorType> AllSetPointGetInfo();


        

        [WebGet(UriTemplate = "/AllISOGetInfo",
            RequestFormat = WebMessageFormat.Json,
            ResponseFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.Bare)]
        List<SelectorType> AllISOGetInfo();


        [WebGet(UriTemplate = "/PricingTermsGetInfo/?TypeID={TypeID}",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        List<SelectorType> PricingTermsGetInfo(String TypeID);

        //PricingTermsGetInfo
        //List<SelectorType> DealAllGetInfo(String CustomerID)
        [WebGet(UriTemplate = "/AllCounterPartyGetInfo",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        List<SelectorType> AllCounterPartyGetInfo();

        //List<SelectorType> DealAllGetInfo(String CustomerID)
        [WebGet(UriTemplate = "/PricingDealStartDates",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        List<SelectorType> PricingDealStartDates();


        [WebGet(UriTemplate = "/PricingCategoryGetInfo",
                RequestFormat = WebMessageFormat.Json,
                ResponseFormat = WebMessageFormat.Json,
                BodyStyle = WebMessageBodyStyle.Bare)]
        List<SelectorType> PricingCategoryGetInfo();

        [WebGet(UriTemplate = "/SubPricingCategoryGetInfo",
                RequestFormat = WebMessageFormat.Json,
                ResponseFormat = WebMessageFormat.Json,
                BodyStyle = WebMessageBodyStyle.Bare)]
        List<SelectorType> SubPricingCategoryGetInfo();


        [WebGet(UriTemplate = "/RiskWholeSaleTradeSettlementPositionAllMonthsGetInfo",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        List<SelectorType> RiskWholeSaleTradeSettlementPositionAllMonthsGetInfo();

        [WebGet(UriTemplate = "/RiskHourlyPositionAllMonthsGetInfo",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        List<SelectorType> RiskHourlyPositionAllMonthsGetInfo(); 

        [WebGet(UriTemplate = "/AllLineOfBusinessGetInfo",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        List<SelectorType> AllLineOfBusinessGetInfo();

        [WebGet(UriTemplate = "/AllBookOfBusinessGetInfo",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        List<SelectorType> AllBookOfBusinessGetInfo();
                       

        [WebGet(UriTemplate = "/AllWeatherScenariosGetInfo",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        List<SelectorType> AllWeatherScenariosGetInfo();


        [WebGet(UriTemplate = "/AllWholeSaleBlocksGetInfo",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        List<SelectorType> AllWholeSaleBlocksGetInfo();

        [WebGet(UriTemplate = "/AllCongestionZonesGetInfo",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        List<SelectorType> AllCongestionZonesGetInfo();

        [WebGet(UriTemplate = "/AllAccountsGetInfo",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        List<SelectorType> AllAccountsGetInfo();

        [WebGet(UriTemplate = "/MonthlyDataGetInfo",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        List<MonthlyGraph> MonthlyDataGetInfo();

        
        [WebGet(UriTemplate = "/CustomersAllSelectorGetInfo",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        List<SelectorType> CustomersAllSelectorGetInfo();

        [WebGet(UriTemplate = "/HoursGetInfo",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        List<SelectorType> HoursGetInfo();

        //MonthlyDataGetInfo
        //General Routines
        #region
        [WebGet(UriTemplate = "/CitiesForStateGetInfo/?StateAbb={StateAbb}",
         RequestFormat = WebMessageFormat.Json,
         ResponseFormat = WebMessageFormat.Json,
         BodyStyle = WebMessageBodyStyle.Bare)]
        List<CityInfo> CitiesForStateGetInfo(String StateAbb);

        [WebGet(UriTemplate = "/StatesGetInfo",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        List<StateInfo> StatesGetInfo();

        [WebGet(UriTemplate = "/TransactionsGetInfo",
            RequestFormat = WebMessageFormat.Json,
            ResponseFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.Bare)]
        TransactionInfo TransactionsGetInfo();
        
        

        [WebGet(UriTemplate = "/TDUAllGetInfo",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        List<TDUInfo> TDUAllGetInfo();

        [WebGet(UriTemplate = "/CongestionZoneAllGetInfo",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        List<CongestionZoneInfo> CongestionZoneAllGetInfo();


        [WebGet(UriTemplate = "/GenericValidationReturnBadRowsGetInfo/?FileName={FileName}&InformationType={InformationType}&Field1={Field1}&Field2={Field2}&Field3={Field3}&Field4={Field4}&Field5={Field5}&Field6={Field6}&Field7={Field7}&Field8={Field8}&Field9={Field9}&Field10={Field10}",
            RequestFormat = WebMessageFormat.Json,
            ResponseFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.Bare)]
        List<GenericInfo> GenericValidationReturnBadRowsGetInfo(String FileName, String InformationType, String Field1, String Field2, String Field3, String Field4, String Field5, String Field6, String Field7, String Field8, String Field9, String Field10);

        [WebGet(UriTemplate = "/GenericTableUpsert/?FileName={FileName}&InformationType={InformationType}&Field1={Field1}&Field2={Field2}&Field3={Field3}&Field4={Field4}&Field5={Field5}&Field6={Field6}&Field7={Field7}&Field8={Field8}&Field9={Field9}&Field10={Field10}&FirstLineOfDate={FirstLineOfDate}",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        String GenericTableUpsert(String FileName, String InformationType, String Field1, String Field2, String Field3, String Field4, String Field5, String Field6, String Field7, String Field8, String Field9, String Field10, Int32 FirstLineOfDate);

        [WebGet(UriTemplate = "/WholeSaleBlockVolumeMWhCalc/?WholeSaleBlockID={WholeSaleBlockID}&StartDate={StartDate}&EndDate={EndDate}&MW={MW}",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        Double WholeSaleBlockVolumeMWhCalc(Int64 WholeSaleBlockID, DateTime StartDate, DateTime EndDate, String MW);

        //WholeSaleBlockVolumeMWhCalc(Int64 WholeSaleBlockID, DateTime StartDate, DateTime EndDate, String Multiplier)

        #endregion
        // Customer Routines
        #region
        [WebGet(UriTemplate = "/CustomersAllGetInfo",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        List<CustomerInfo> CustomersAllGetInfo();

        [WebGet(UriTemplate = "/CustomersGetInfo?CustomerID={CustomerID}",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        List<CustomerInfo> CustomersGetInfo(int CustomerID);

        [WebGet(UriTemplate = "/CustomerUpsert?CustomerID={CustomerID}&CustomerName={CustomerName}&BillingAdd1={BillingAdd1}&BillingAdd2={BillingAdd2}&CityName={CityName}&StateAbb={StateAbb}&Zip={Zip}&Active={Active}",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        int CustomerUpsert(int CustomerID, String CustomerName, String BillingAdd1, String BillingAdd2, String CityName, String StateAbb, String Zip, int Active);

        [WebGet(UriTemplate = "/CustomerValidationUpsert?FileName={FileName}&ContainerName={ContainerName}",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        int CustomerValidationUpsert(String FileName, String ContainerName);
            
        [WebGet(UriTemplate = "/CustomersValidateGetInfo",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        List<CustomerInfo> CustomersValidateGetInfo();

        [WebGet(UriTemplate = "/CustomerValidatedFileUpsert",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        int CustomerValidatedFileUpsert();

        #endregion
        #region
        [WebGet(UriTemplate = "/GenericFileUpsert?FileName={FileName}&FileTypeName={FileTypeName}&ContainerName={ContainerName}&RandomNumber={RandomNumber}",
            RequestFormat = WebMessageFormat.Json,
            ResponseFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.Bare)]
        int GenericFileUpsert(String FileName, String FileTypeName, String ContainerName, String RandomNumber);

        [WebGet(UriTemplate = "/GenericFileGetInfo?FileName={FileName}&FileTypeName={FileTypeName}&ContainerName={ContainerName}&RowNumber={RowNumber}",
            RequestFormat = WebMessageFormat.Json,
            ResponseFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.Bare)]
        List<GenericInfo> GenericFileGetInfo(String FileName, String FileTypeName, String ContainerName, int RowNumber);

        [WebGet(UriTemplate = "/GenericValidationByRowsGetInfo?FileName={FileName}&FileTypeName={FileTypeName}&ContainerName={ContainerName}&iStartRow={iStartRow}&iEndRow={iEndRow}",
            RequestFormat = WebMessageFormat.Json,
            ResponseFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.Bare)]
        List<GenericInfo> GenericValidationByRowsGetInfo(String FileName, String FileTypeName, String ContainerName, int iStartRow, int iEndRow);

        [WebGet(UriTemplate = "/GenericValidationByRowsUpsert?FileName={FileName}&FileTypeName={FileTypeName}&ContainerName={ContainerName}&ValidationID={ValidationID}&Field1={Field1}&Field2={Field2}&Field3={Field3}&Field4={Field4}&Field5={Field5}&Field6={Field6}&Field7={Field7}&Field8={Field8}&Field9={Field9}&Field10={Field10}&Field11={Field11}&Field12={Field12}",
            RequestFormat = WebMessageFormat.Json,
            ResponseFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.Bare)]
        int GenericValidationByRowsUpsert(String FileName, String FileTypeName, String ContainerName, int ValidationID, String Field1, String Field2, String Field3, String Field4, String Field5, String Field6, String Field7, String Field8, String Field9, String Field10, String Field11, String Field12);

        [WebGet(UriTemplate = "/GenericValidatedDataUpsert?FileName={FileName}&InformationType={InformationType}&FirstRowOfData={FirstRowOfData}&Field1={Field1}&Field2={Field2}&Field3={Field3}&Field4={Field4}&Field5={Field5}&Field6={Field6}&Field7={Field7}&Field8={Field8}&Field9={Field9}&Field10={Field10}&Field11={Field11}&Field12={Field12}",
            RequestFormat = WebMessageFormat.Json,
            ResponseFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.Bare)]
        String GenericValidatedDataUpsert(String FileName, String InformationType, Int32 FirstRowOfData, String Field1, String Field2, String Field3, String Field4, String Field5, String Field6, String Field7, String Field8, String Field9, String Field10, String Field11, String Field12);

        [WebGet(UriTemplate = "/GenericValidationFieldsGetInfo?InformationType={InformationType}",
            RequestFormat = WebMessageFormat.Json,
            ResponseFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.Bare)]
        List<InformationTypeInfo> GenericValidationFieldsGetInfo(String InformationType);

        
        #endregion
        // Facility
        #region
        [WebGet(UriTemplate = "/FacilityAllGetInfo",
            RequestFormat = WebMessageFormat.Json,
            ResponseFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.Bare)]
        List<FacilityInfo> FacilityAllGetInfo();

        [WebGet(UriTemplate = "/SpecificCustomerFacilitiesGetInfo?CustomerID={CustomerID}",
            RequestFormat = WebMessageFormat.Json,
            ResponseFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.Bare)]
        List<FacilityInfo> SpecificCustomerFacilitiesGetInfo(int CustomerID);

        [WebGet(UriTemplate = "/SpecificFacilityGetInfo?CustomerID={CustomerID}&FacilityID={FacilityID}",
            RequestFormat = WebMessageFormat.Json,
            ResponseFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.Bare)]
        List<FacilityInfo> SpecificFacilityGetInfo(int CustomerID, String FacilityID);

        [WebGet(UriTemplate = "/FacilityValidationUpsert?FileName={FileName}&ContainerName={ContainerName}",
                    RequestFormat = WebMessageFormat.Json,
                    ResponseFormat = WebMessageFormat.Json,
                    BodyStyle = WebMessageBodyStyle.Bare)]
        int FacilityValidationUpsert(String FileName, String ContainerName);

        [WebGet(UriTemplate = "/FacilityValidateGetInfo",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        List<FacilityInfo> FacilityValidateGetInfo();

        [WebGet(UriTemplate = "/FacilityValidatedFileUpsert",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        int FacilityValidatedFileUpsert();

        [WebGet(UriTemplate = "/TDULossCodeAllGetInfo?TDUID={TDUID}",
            RequestFormat = WebMessageFormat.Json,
            ResponseFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.Bare)]
        List<LossCodeInfo> TDULossCodeAllGetInfo(int TDUID);

        [WebGet(UriTemplate = "/LoadProfileAllGetInfo",
            RequestFormat = WebMessageFormat.Json,
            ResponseFormat = WebMessageFormat.Json,BodyStyle = WebMessageBodyStyle.Bare)]
        List<LoadProfileInfo> LoadProfileAllGetInfo();

        [WebGet(UriTemplate = "/ObtainDateSuffix?FileName={FileName}",
            RequestFormat = WebMessageFormat.Json,
            ResponseFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.Bare)]
        String ObtainDateSuffix(String FileName);

        [WebGet(UriTemplate = "/ObtainAzureParameters?FileType={FileType}",
            RequestFormat = WebMessageFormat.Json,
            ResponseFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.Bare)]
        AzureParameters ObtainAzureParameters(string FileType);


        [WebGet(UriTemplate = "/FacilityUpsert?CustomerID={CustomerID}&FacilityID={FacilityID}&LoadProfile={LoadProfile}&CongestionZoneID={CongestionZoneID}&TDUIID={TDUID}&BillingCycle={BillingCycle}&LossCode={LossCode}&Active={Active}",
            RequestFormat = WebMessageFormat.Json,
            ResponseFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.Bare)]
        int FacilityUpsert(int CustomerID, String FacilityID, String LoadProfile, int CongestionZoneID, int TDUID, Double BillingCycle, String LossCode, int Active);

        [WebGet(UriTemplate = "/FileUpsert?FileID={FileID}&FileName={FileName}&FileStatus={FileStatus}&FileType={FileType}&UserName={UserName}",                                                          
            RequestFormat = WebMessageFormat.Json,
            ResponseFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.Bare)]
        int FileUpsert(int FileID, String FileName, String FileStatus, String FileType, String UserName);

        [WebGet(UriTemplate = "/AccountValidationGetInfo",
            RequestFormat = WebMessageFormat.Json,
            ResponseFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.Bare)]
        List<AccountInfo> AccountValidationGetInfo();






        #endregion

        //// Uploading of Files
        //[OperationContract]
        //[WebGet(UriTemplate = "File/{fileNa;me}/{fileExtension}")]
        //Stream DownloadFile(string fileName, string fileExtension);

        //[OperationContract]
        //[WebInvoke(UriTemplate = "UploadFile?Path={path}")]
        //void UploadFile(string path, Stream stream);


        // NOT PART OF PROGRAM
        #region 
        [WebGet(UriTemplate = "/GetPlayersXml",
            RequestFormat = WebMessageFormat.Xml,
            ResponseFormat = WebMessageFormat.Xml,
            BodyStyle = WebMessageBodyStyle.Bare)]
        List<Players> GetPlayersXml();

        [WebGet(UriTemplate = "/GetPlayersJson",
            RequestFormat = WebMessageFormat.Json,
            ResponseFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.Bare)]
        List<Players> GetPlayersJson();
        // NOT PART OF PROGRAM        
        #endregion
        // TODO: Add your service operations here
    }

    #region 
    [DataContract]
    public class SelectorType
    {
        [DataMember]
        public String SelectorID { get; set; }
        [DataMember]
        public String SelectorText { get; set; }
        [DataMember]
        public String Color { get; set; }
    }

    [DataContract]
    public class UpsertType
    {
        [DataMember]
        public String Status { get; set; }
        [DataMember]
        public String Identifier { get; set; }
        [DataMember]
        public String Notes { get; set; }
    }

    [DataContract]
    public class MonthlyGraph
    {
        [DataMember]        
        public String Month { get; set; }
        [DataMember]
        public Double First { get; set; }
        [DataMember]
        public Double Second { get; set; }
        [DataMember]
        public Double Third { get; set; }

    }


    [DataContract]
    public class AzureParameters
    {
        [DataMember]
        public String AzureStorageName { get; set; }
        [DataMember]
        public String SASKey { get; set; }
        [DataMember]
        public String blobUri { get; set; }
        [DataMember]
        public String AzureContainer { get; set; }
    }

    [DataContract]
    public class CongestionZoneInfo
    {
        [DataMember]
        public int CongestionZoneID { get; set; }
        [DataMember]
        public String CongestionZoneName { get; set; }
    }

    [DataContract]
    public class LoadProfileInfo
    {
        [DataMember]
        public int LoadProfileID { get; set; }
        [DataMember]
        public String LoadProfileName { get; set; }
    }
    //[DataContract]
    //public class LossCodeInfo
    //{
    //    [DataMember]
    //    public int TDUID { get; set; }
    //    [DataMember]
    //    public String LossCodeID { get; set; }
    //    [DataMember]
    //    public string LossCodeName { get; set; }
    //    [DataMember]
    //    public string LossCode { get; set; }
    //}

    [DataContract]
    public class TDUInfo
    {
        [DataMember]
        public int TDUID { get; set; }
        [DataMember]
        public string TDUName { get; set; }
        [DataMember]
        public string DunsNumber { get; set; }
    }

    
 

    [DataContract]
    public class FacilityInfo
    {
        [DataMember]
        public int CustomerID { get; set; }
        [DataMember]
        public String CustomerName { get; set; }
        [DataMember]
        public String FacilityID { get; set; }
        [DataMember]
        public String CongestionZoneName { get; set; }
        [DataMember]
        public int CongestionZoneID { get; set; }
        [DataMember]
        public int TDUID { get; set; }
        [DataMember]
        public String TDUName { get; set; }
        [DataMember]
        public String DunsNumber { get; set; }
        [DataMember]
        public String LoadProfileName { get; set; }
        [DataMember]
        public int LoadProfileID { get; set; }
        [DataMember]
        public String LossCodeName { get; set; }
        [DataMember]
        public String LossCodeID { get; set; }
        [DataMember]
        public bool FacilityActive { get; set; }
        [DataMember]
        public Double BillingCycle { get; set; }
        [DataMember]
        public String FileName { get; set; }
        [DataMember]
        public String NewFacility { get; set; }
        [DataMember]
        public String InsertDate { get; set; }

    }
    [DataContract]
    public class TransactionInfo
    {
        [DataMember]
        public int CustomerCount { get; set; }
        [DataMember]
        public int FacilityCount { get; set; }
        [DataMember]
        public int DealCount { get; set; }
        [DataMember]
        public int FileCount { get; set; }
    }
    [DataContract]
    public class FileInformation
    {
        [DataMember]
        public Int64 FileID { get; set; }
        [DataMember]
        public String FileName { get; set; }
        [DataMember]
        public String FileType { get; set; }
        [DataMember]
        public String FileStatus { get; set; }
        [DataMember]
        public bool NewFile { get; set; }
        [DataMember]
        public String CurveName { get; set; }

        [DataMember]
        public DateTime CurveDate { get; set; }
        [DataMember]
        public DateTime MinForwardDate { get; set; }
        [DataMember]
        public DateTime MaxForwardDate { get; set; }
        [DataMember]
        public String CurveDateString { get; set; }
        [DataMember]
        public String MinForwardDateString { get; set; }
        [DataMember]
        public String MaxForwardDateString { get; set; }
        [DataMember]
        public Int64 PercentDone { get; set; }

    }
    // NOT PART OF PROGRAM   

    [DataContract]
    public class Players
    {
        [DataMember]
        public string Name { get; set; }
        [DataMember]
        public string Sports { get; set; }
        [DataMember]
        public string Country { get; set; }
        [DataMember]
        public string ImageUrl { get; set; }
    }
    [DataContract]
    public class CurveDates
    {
        [DataMember]
        public String CurveShortName { get; set; }
        [DataMember]
        public String CurveLongName { get; set; }

        [DataMember]
        public DateTime CurveDate { get; set; }
        [DataMember]
        public DateTime ForwardDate { get; set; }
        [DataMember]
        public Double SettlePrice { get; set; }
        [DataMember]
        public Double SettleChange { get; set; }
        [DataMember]
        public Double TotalVolume { get; set; }
        [DataMember]
        public Double OI { get; set; }
        [DataMember]
        public Double OIChange { get; set; }
        [DataMember]
        public Double EFP { get; set; }
        [DataMember]
        public Double EFS { get; set; }
        [DataMember]
        public Double BlockVolume { get; set; }
        [DataMember]
        public Double SpreadVolume { get; set; }
    }

    [DataContract]
    public class AccountInfo
    {
        [DataMember]
        public Int32 RowNum { get; set; }

        [DataMember]
        public String ESIID { get; set; }
        [DataMember]
        public String CustomerName { get; set; }
        [DataMember]
        public String ServiceAddress1 { get; set; }
        [DataMember]
        public String ServiceAddress2 { get; set; }
        [DataMember]
        public String ServiceAddress3 { get; set; }
        [DataMember]
        public String ZipCode { get; set; }
        [DataMember]
        public String LoadProfile { get; set; }
        [DataMember]
        public String CongestionZone { get; set; }
        [DataMember]
        public String TDU { get; set; }
        [DataMember]
        public String FileName { get; set; }
    }
    // SHT
    [DataContract]
    public class InformationTypeInfo
    {
        [DataMember]
        public String InformationType { get; set; }
        [DataMember]
        public String InformationFields { get; set; }
        [DataMember]
        public Int64 InformationFieldsID { get; set; }
        [DataMember]
        public Int64 InformationTypeID { get; set; }

    }
    [DataContract]
    public class GenericInfo
    {
        [DataMember]
        public Int32 ValidateID { get; set; }
        [DataMember]
        public Int32 FileID { get; set; }
        [DataMember]
        public String FileName { get; set; }
        [DataMember]
        public String Field1 { get; set; }
        [DataMember]
        public String Field2 { get; set; }
        [DataMember]
        public String Field3 { get; set; }
        [DataMember]
        public String Field4 { get; set; }
        [DataMember]
        public String Field5 { get; set; }
        [DataMember]
        public String Field6 { get; set; }
        [DataMember]
        public String Field7 { get; set; }
        [DataMember]
        public String Field8 { get; set; }
        [DataMember]
        public String Field9 { get; set; }
        [DataMember]
        public String Field10 { get; set; }
        [DataMember]
        public String Field11 { get; set; }
        [DataMember]
        public String Field12 { get; set; }
        [DataMember]
        public String Field13 { get; set; }
        [DataMember]
        public String Field14 { get; set; }
        [DataMember]
        public String Field15 { get; set; }
        [DataMember]
        public String Field16 { get; set; }
        [DataMember]
        public String Field17 { get; set; }
        [DataMember]
        public String Field18 { get; set; }
        [DataMember]
        public String Field19 { get; set; }
        [DataMember]
        public String Field20 { get; set; }
        [DataMember]
        public String Field21 { get; set; }
        [DataMember]
        public String Field22 { get; set; }
        [DataMember]
        public String Field23 { get; set; }
        [DataMember]
        public String Field24 { get; set; }
        [DataMember]
        public String Field25 { get; set; }
        [DataMember]
        public String Field26 { get; set; }
        [DataMember]
        public String Field27 { get; set; }
        [DataMember]
        public String Field28 { get; set; }
        [DataMember]
        public String Field29 { get; set; }
        [DataMember]
        public String Field30 { get; set; }
    }
    [DataContract]
    public class HourlyScalarTableGraphView
    {
        [DataMember]
        public String WholeSaleBlocks { get; set; }

        [DataMember]
        public Double H_1 { get; set; }
        [DataMember]
        public Double H_2 { get; set; }
        [DataMember]
        public Double H_3 { get; set; }
        [DataMember]
        public Double H_4 { get; set; }
        [DataMember]
        public Double H_5 { get; set; }
        [DataMember]
        public Double H_6 { get; set; }
        [DataMember]
        public Double H_7 { get; set; }
        [DataMember]
        public Double H_8 { get; set; }
        [DataMember]
        public Double H_9 { get; set; }
        [DataMember]
        public Double H_10 { get; set; }
        [DataMember]
        public Double H_11 { get; set; }
        [DataMember]
        public Double H_12 { get; set; }
        [DataMember]
        public Double H_13 { get; set; }
        [DataMember]
        public Double H_14 { get; set; }
        [DataMember]
        public Double H_15 { get; set; }
        [DataMember]
        public Double H_16 { get; set; }
        [DataMember]
        public Double H_17 { get; set; }
        [DataMember]
        public Double H_18 { get; set; }
        [DataMember]
        public Double H_19 { get; set; }
        [DataMember]
        public Double H_20 { get; set; }
        [DataMember]
        public Double H_21 { get; set; }
        [DataMember]
        public Double H_22 { get; set; }
        [DataMember]
        public Double H_23 { get; set; }
        [DataMember]
        public Double H_24 { get; set; }        
    }
    [DataContract]
    public class MonthlyTableGraphView
    {
        [DataMember]
        public String WholeSaleBlocks { get; set; }
        [DataMember]
        public Double Jan { get; set; }
        [DataMember]
        public Double Feb { get; set; }
        [DataMember]
        public Double Mar { get; set; }
        [DataMember]
        public Double Apr { get; set; }
        [DataMember]
        public Double May { get; set; }
        [DataMember]
        public Double Jun { get; set; }
        [DataMember]
        public Double Jul { get; set; }
        [DataMember]
        public Double Aug { get; set; }
        [DataMember]
        public Double Sep { get; set; }
        [DataMember]
        public Double Oct { get; set; }
        [DataMember]
        public Double Nov { get; set; }
        [DataMember]
        public Double Dec { get; set; }
    }
    [DataContract]
    public class ScatterPlotGraphView
    {
        [DataMember]
        public int WholeSaleBlocksID { get; set; }
        [DataMember]
        public String WholeSaleBlocks { get; set; }
        [DataMember]
        public Double TempF { get; set; }
        [DataMember]
        public Double RealTimePrice { get; set; }
        [DataMember]
        public Double ErcotLoad { get; set; }

        [DataMember]
        public Double LoadKW { get; set; }

    }
    [DataContract]
    public class MonthlyGraphView
    {
        [DataMember]
        public int WholeSaleBlocksID { get; set; }
        [DataMember]
        public String WholeSaleBlocks { get; set; }
        [DataMember]
        public int MonthsNamesID { get; set; }
        [DataMember]
        public String MonthsShortName { get; set; }
        [DataMember]
        public String MonthsLongName { get; set; }
        [DataMember]
        public Double ubarmwh { get; set; }
        [DataMember]
        public Double ubarMW { get; set; }
        [DataMember]
        public Double Pbar { get; set; }
        [DataMember]
        public Double pshaped { get; set; }
        [DataMember]
        public Double pvolrisk { get; set; }
        [DataMember]
        public Double RetailRiskAdder { get; set; }
        [DataMember]
        public Double RevatRiskMult { get; set; }

    }

    [DataContract]
    public class WeatherScenarioGraphView
    {
        [DataMember]
        public Int64 MonthsNamesID { get; set; }
        [DataMember]
        public String MonthsShortName { get; set; }
        [DataMember]
        public String MonthsLongName { get; set; }
        [DataMember]
        public int WeatherScenarioID { get; set; }
        [DataMember]
        public String WeatherScenario { get; set; }

        [DataMember]
        public String xDate { get; set; }
        [DataMember]
        public Double TotalLoad { get; set; }
    }


    [DataContract]
    public class HourlyScalerGraphView
    {
        [DataMember]
        public Int64 WholeSaleBlocksID  { get; set; }
        [DataMember]
        public String WholeSaleBlocks { get; set; }
        [DataMember]
        public Double HE { get; set; }
        [DataMember]
        public Double pbar { get; set; }
        [DataMember]
        public Double ubar { get; set; }
        [DataMember]
        public Double sigmau { get; set; }
        [DataMember]
        public Double tbar { get; set; }
        [DataMember]
        public Double AT { get; set; }
    }


    [DataContract]
    public class ErcotAnimationGraphView
    {
        [DataMember]
        public Int64 WholeSaleBlocksID { get; set; }
        [DataMember]
        public String WholeSaleBlocks { get; set; }
        [DataMember]
        public String UtilityAccountNumber { get; set; }
        [DataMember]
        public int XMonth { get; set; }
        [DataMember]
        public int HE { get; set; }
        [DataMember]
        public Double TempF { get; set; }
        [DataMember]
        public Double RealTimePrice { get; set; }
        [DataMember]
        public Double ErcotLoad { get; set; }
        [DataMember]
        public Double LoadKW { get; set; }
    }


    [DataContract]
    public class CoincidencePeakGraphView
    {
        [DataMember]
        public Int64 MonthID { get; set; }
        [DataMember]
        public String MonthsLongName { get; set; }
        [DataMember]
        public String MonthsShortName { get; set; }

        [DataMember]
        public Double Maxsysmax { get; set; }
        [DataMember]
        public Double AvgCP { get; set; }
        [DataMember]
        public Double AvgNCP { get; set; }
        [DataMember]
        public Double AvgCoincidenceFactor { get; set; }
    }
    [DataContract]
    public class CoincidencePeakTableView
    {
        [DataMember]
        public String WeatherScenario { get; set; }
        [DataMember]
        public String Jan { get; set; }
        [DataMember]
        public String Feb { get; set; }
        [DataMember]
        public String Mar { get; set; }
        [DataMember]
        public String Apr { get; set; }
        [DataMember]
        public String May { get; set; }
        [DataMember]
        public String Jun { get; set; }
        [DataMember]
        public String July { get; set; }
        [DataMember]
        public String Aug { get; set; }
        [DataMember]
        public String Sept { get; set; }
        [DataMember]
        public String Oct { get; set; }
        [DataMember]
        public String Nov { get; set; }
        [DataMember]
        public String Dec { get; set; }
    }

    [DataContract]
    public class CoincidencePeak
    {
        [DataMember]
        public List<CoincidencePeakGraphView> CPGraph { get; set; }

        [DataMember]
        public List<CoincidencePeakTableView> CPTable { get; set; }

     }
    [DataContract]
    public class VolumetricRiskGraphView
    {
        [DataMember]
        public Int64 MonthID { get; set; }
        [DataMember]
        public String MonthsLongName { get; set; }
        [DataMember]
        public String MonthsShortName { get; set; }

        [DataMember]
        public Double VolRiskAdder { get; set; }
        [DataMember]
        public Double VolRiskStdDev { get; set; }

    }
    [DataContract]
    public class VolumetricRiskTableGraphView
    {
        [DataMember]
        public String CostType { get; set; }
        [DataMember]
        public Double Jan { get; set; }
        [DataMember]
        public Double Feb { get; set; }
        [DataMember]
        public Double Mar { get; set; }
        [DataMember]
        public Double Apr { get; set; }
        [DataMember]
        public Double May { get; set; }
        [DataMember]
        public Double Jun { get; set; }
        [DataMember]
        public Double Jul { get; set; }
        [DataMember]
        public Double Aug { get; set; }
        [DataMember]
        public Double Sep { get; set; }
        [DataMember]
        public Double Oct { get; set; }
        [DataMember]
        public Double Nov { get; set; }
        [DataMember]
        public Double Dec { get; set; }
    }
    [DataContract]
    public class RiskHourlyPositionGraphView
    {
        [DataMember]
        public String BookOfBusiness { get; set; }
        [DataMember]
        public int HE { get; set; }
        [DataMember]
        public Double GrossUsageMWH { get; set; }
        [DataMember]
        public Double GrossUsageMW { get; set; }
    }

    [DataContract]
    public class RiskWholeSaleTradeSettlementView
    {
        [DataMember]
        public String CounterParty { get; set; }
        [DataMember]
        public String DealID { get; set; }
        [DataMember]
        public Double Volume { get; set; }
        [DataMember]
        public Double Cost { get; set; }
        [DataMember]
        public Int32 TypeOfRecord { get; set; }

    }
    [DataContract]
    public class RiskWholeSaleTradesGraphAndTableView
    {
        [DataMember]
        public List<RiskWholeSaleTradesGraphView> RiskWholeSaleTradesGraph { get; set; }
        [DataMember]
        public List<RiskWholeSaleTradesTableView> RiskWholeSaleTradesTable { get; set; }
    }

    [DataContract]
    public class RiskWholeSaleTradesGraphView
    {
        [DataMember]
        public String CounterParty { get; set; }
        [DataMember]
        public Double VolumeMW { get; set; }
        [DataMember]
        public Double Price { get; set; }
        [DataMember]
        public Double Fee { get; set; }
        [DataMember]
        public Double VolumeMWH { get; set; }
        [DataMember]
        public Double Cost { get; set; }
        [DataMember]
        public Double MTM { get; set; }
        [DataMember]
        public Double GrossMargin { get; set; }

    }


    [DataContract]
    public class RiskWholeSaleTradesTableView
    {
        [DataMember]
        public String DealID { get; set; }
        [DataMember]
        public String DealDate { get; set; }
        [DataMember]
        public String CounterParty { get; set; }
        [DataMember]
        public String OtherCP { get; set; }
        [DataMember]
        public String StartDate { get; set; }
        [DataMember]
        public String EndDate { get; set; }
        [DataMember]
        public String SetPoint { get; set; }
        [DataMember]
        public String SetLocation { get; set; }
        [DataMember]
        public String Shape { get; set; }
        [DataMember]
        public Double VolumeMW { get; set; }
        [DataMember]
        public Double Price { get; set; }
        [DataMember]
        public Double Fee { get; set; }
        [DataMember]
        public Double VolumeMWH { get; set; }
        [DataMember]
        public Double Cost { get; set; }
        [DataMember]
        public Double MTM { get; set; }
        [DataMember]
        public Double GrossMargin { get; set; }
    }
   
        [DataContract]
        public class RiskMonthlyPositionGraphView
        {
            [DataMember]
            public String BookOfBusiness { get; set; }
            [DataMember]
            public DateTime DeliveryDate { get; set; }
            [DataMember]
            public String DeliveryDateString { get; set; }
            [DataMember]
            public Double GrossUsageMWH { get; set; }
            [DataMember]
            public Double GrossUsageDollars { get; set; }
            [DataMember]
            public Double GrossUsageMW { get; set; }
        }

    [DataContract]
    public class PricingMonthlyPricesView
    {
        [DataMember]
        public String DeliveryDate { get; set; }
        [DataMember]
        public Double NetUsage { get; set; }
        [DataMember]
        public Double Margin { get; set; }
        [DataMember]
        public Double EnergyPrice { get; set; }
        [DataMember]
        public Double AncServPrice { get; set; }
        [DataMember]
        public Double MiscAdminPrice { get; set; }
        [DataMember]
        public Double LossesPrice { get; set; }
        [DataMember]
        public Double BasisPrice { get; set; }
        [DataMember]
        public Double VolRiskPrice { get; set; }
        [DataMember]
        public Double BrokerFee { get; set; }
       
        [DataMember]
        public Double TotalCost { get; set; }
        [DataMember]
        public Double Price { get; set; }
        [DataMember]
        public Double GrossMargin { get; set; }
        [DataMember]
        public Double CRR_Price { get; set; }

        [DataMember]
        public Double GrossUsage { get; set; }
        [DataMember]
        public Double Losses { get; set; }
        [DataMember]
        public Double NonSpin { get; set; }
        [DataMember]
        public Double RegDown { get; set; }
        [DataMember]
        public Double ReplacementReserve { get; set; }
        [DataMember]
        public Double RegUp { get; set; }
        [DataMember]
        public Double RPS { get; set; }
    }
    [DataContract]
    public class LoadResearchBackCastView
    {
        [DataMember]
        public Double tdb { get; set; }
        [DataMember]
        public Double SumUsage { get; set; }
        [DataMember]
        public Double SumBackCast { get; set; }

    }

    [DataContract]
    public class PricingSummaryPricingComponentsView
    {
        [DataMember]
        public String PricingCategory { get; set; }
        [DataMember]
        public String PricingSubCategory { get; set; }
        [DataMember]
        public Double SumPrice { get; set; }
        [DataMember]
        public Double AvgPrice { get; set; }
        [DataMember]
        public Int32 MajorOrderID { get; set; }
        [DataMember]
        public Int32 MinorOrderID { get; set; }

    }

    [DataContract]
    public class RiskMonthlyDetailsGraphView
    {
        [DataMember]
        public String BookOfBusiness { get; set; }
        [DataMember]
        public String DeliveryDate { get; set; }
        [DataMember]
        public String DeliveryDateString { get; set; }
        [DataMember]
        public Double NetUsage { get; set; }
        [DataMember]
        public Double GrossUsage { get; set; }
        [DataMember]
        public Double CostTotal { get; set; }
        [DataMember]
        public Double C_Energy { get; set; }
        [DataMember]
        public Double C_Losses { get; set; }
        [DataMember]
        public Double C_Basis { get; set; }
        [DataMember]
        public Double C_VolRisk { get; set; }
        [DataMember]
        public Double C_ANC { get; set; }
        [DataMember]
        public Double C_ADMIN_MISC { get; set; }
        [DataMember]
        public Double C_CRR { get; set; }
        [DataMember]
        public Double Revenue { get; set; }
        [DataMember]
        public Double NetRevenue { get; set; }
    }    



    [DataContract]
    public class WholeSaleDeal
    {
        [DataMember]
        public Int64 WholeSaleDealID { get; set; }

        [DataMember]
        public String WholeSaleDealName { get; set; }
        [DataMember]
        public Int64 ISOID { get; set; }
        [DataMember]
        public Int64 CounterPartyID { get; set; }
        [DataMember]
        public Int64 SecondCounterPartyID { get; set; }
        [DataMember]
        public Int64 SettlementPointID { get; set; }
        [DataMember]
        public Int64 SetLocationID { get; set; }
        [DataMember]
        public Int64 WholeSaleBlockID { get; set; }
        [DataMember]
        public String DealDate { get; set; }
        [DataMember]
        public String StartDate { get; set; }
        [DataMember]
        public String EndDate { get; set; }
        [DataMember]
        public Double VolumeMW { get; set; }
        [DataMember]
        public Double VolumeMWh { get; set; }
        [DataMember]
        public Double Price { get; set; }
        [DataMember]
        public Double Fee { get; set; }
        [DataMember]
        public Double Cost { get; set; }
        [DataMember]
        public Double MTM { get; set; }
        [DataMember]
        public Int64 DealCommitted { get; set; }
        [DataMember]
        public String DealCommittmentDate { get; set; }

    }
    [DataContract]
    public class DealInfoID
    {
        [DataMember]
        public Int64 CustomerID { get; set; }
        [DataMember]
        public String CustomerName { get; set; }
        [DataMember]
        public Boolean Active { get; set; }
        [DataMember]
        public Int64 DealID { get; set; }
        [DataMember]
        public String DealNumber { get; set; }
        [DataMember]
        public String DealName { get; set; }
        [DataMember]
        public DateTime StartDate { get; set; }
        [DataMember]
        public DateTime EndDate { get; set; }
        [DataMember]
        public Double Margin { get; set; }
        [DataMember]
        public Double BrokerMargin { get; set; }
        [DataMember]
        public Boolean DealActive { get; set; }
    }

    
    // End of Graphing
    // NOT PART OF PROGRAM   
    // Use a data contract as illustrated in the sample below to add composite types to service operations.


    [DataContract]
    public class CompositeType
    {
        bool boolValue = true;
        string stringValue = "Hello ";

        [DataMember]
        public bool BoolValue
        {
            get { return boolValue; }
            set { boolValue = value; }
        }

        [DataMember]
        public string StringValue
        {
            get { return stringValue; }
            set { stringValue = value; }
        }

    }
    [DataContract]
    public class CityInfo
    {
        [DataMember]
        public int CityID { get; set; }
        [DataMember]
        public string CityName { get; set; }
        [DataMember]
        public string StateAbb { get; set; }
    }

    [DataContract]
    public class StateInfo
    {
        [DataMember]
        public string StateAbb { get; set; }
        [DataMember]
        public string StateName { get; set; }
    }
    #endregion
    // Data Classes

}
