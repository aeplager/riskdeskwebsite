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
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "IContracts" in both code and config file together.
    [ServiceContract]
    public interface IGraphing
    {
        [WebGet(UriTemplate = "/MonthlyEnergyUsageGetInfo?FieldString={FieldString}",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        GraphMonthly MonthlyEnergyUsageGetInfo(String FieldString);
              
        [WebGet(UriTemplate = "/HourlyShapesGetInfo?FieldString={FieldString}",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        GraphHourlyShapes HourlyShapesGetInfo(String FieldString);

        [WebGet(UriTemplate = "/GraphRetailRisk?FieldString={FieldString}",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        GraphIntegerTimeData GraphRetailRisk(String FieldString);

        [WebGet(UriTemplate = "/GraphPeakModel?FieldString={FieldString}",
            RequestFormat = WebMessageFormat.Json,
            ResponseFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.Bare)]
        GraphIntegerTimeData GraphPeakModel(String FieldString);

        [WebGet(UriTemplate = "/PricingSummaryGetInfo?FieldString={FieldString}",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        GraphPricingSummary PricingSummaryGetInfo(String FieldString);

        [WebGet(UriTemplate = "/MonthlyPricesGetInfo?FieldString={FieldString}",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        GraphMonthlyPrices MonthlyPricesGetInfo(String FieldString);

        [WebGet(UriTemplate = "/FacilitiesGetInfo",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        List<SelectorType> FacilitiesGetInfo();

        [WebGet(UriTemplate = "/CustomersGetInfo",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        List<SelectorType> CustomersGetInfo();

        [WebGet(UriTemplate = "/AllWeatherScenariosGetInfo",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        List<SelectorType> AllWeatherScenariosGetInfo();


        [WebGet(UriTemplate = "/DealsGetInfo",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        List<SelectorType> DealsGetInfo();

        [WebGet(UriTemplate = "/TermsGetInfo",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        List<SelectorType> TermsGetInfo();

        [WebGet(UriTemplate = "/SubCategoryGetInfo",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        List<SelectorType> SubCategoryGetInfo();

        [WebGet(UriTemplate = "/CategoriesGetInfo",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        List<SelectorType> CategoriesGetInfo();
    }


    [DataContract]
    public class GraphMonthlyData
    {
        [DataMember]
        public String WholesaleBlock { get; set; }
        [DataMember]
        public String Month { get; set; }
        [DataMember]
        public Double MonthlyUsageMWH { get; set; }
    }

    [DataContract]
    public class GraphMonthly
    {
        [DataMember]
        public List<GraphMonthlyData> GraphMonthlyData { get; set; }
        [DataMember]
        public List<SelectorType> WholeSaleBlocks { get; set; }
        [DataMember]
        public List<MonthDef> MonthDef { get; set; }
    }

    [DataContract]
    public class GraphHourlyShapesData
    {
        [DataMember]
        public String WholesaleBlock { get; set; }
        [DataMember]
        public String HE { get; set; }
        [DataMember]
        public Double LoadMWh { get; set; }
    }

    [DataContract]
    public class GraphHourlyShapes
    {
        [DataMember]
        public List<GraphHourlyShapesData> GraphHourlyShapesData { get; set; }
        [DataMember]
        public List<SelectorType> WholeSaleBlocks { get; set; }
        [DataMember]
        public List<SelectorType> Hours { get; set; }
    }

    [DataContract]
    public class GraphIntTime
    {
        [DataMember]
        public String ColumnName { get; set; }
        [DataMember]
        public String TimeName { get; set; }
        [DataMember]
        public Double GraphValue { get; set; }
    }
    [DataContract]
    public class GraphXYGenericTableSingle
    {
        [DataMember]
        public String ColumnID { get; set; }
        [DataMember]
        public String ColumnName { get; set; }
        [DataMember]
        public Double GraphValue { get; set; }
    }
    [DataContract]
    public class GraphXYGenericTableDual
    {
        [DataMember]
        public String ColumnOneID { get; set; }
        [DataMember]
        public String ColumnOneName { get; set; }
        [DataMember]
        public String ColumnTwoID { get; set; }
        [DataMember]
        public String ColumnTwoName { get; set; }
        [DataMember]
        public Double GraphValue { get; set; }
    }

    [DataContract]
    public class GraphIntegerTimeData
    {
        [DataMember]
        public List<GraphIntTime> GraphIntTime { get; set; }
        [DataMember]
        public List<SelectorType> TimeName { get; set; }
        [DataMember]
        public List<SelectorType> ColumnName { get; set; }
    }
    // Pricing Summary Graph Items

    [DataContract]
    public class WaterfallChart
    {
        [DataMember]
        public String ColumnName { get; set; }
        [DataMember]
        public Double GraphValue { get; set; }
        [DataMember]
        public Double MinValue { get; set; }
        [DataMember]
        public Double MaxValue { get; set; }
    }

    [DataContract]
    public class GraphDateStringGraphValue
    {
        [DataMember]
        public Int64 ColumnID { get; set; }

        [DataMember]
        public String ColumnName { get; set; }
        [DataMember]
        public String Color { get; set; }

        [DataMember]
        public String DateValue { get; set; }

        [DataMember]
        public Double GraphValue { get; set; }
    }

    [DataContract]
    public class GraphMonthlyPrices
    {
        [DataMember]
        public List<GraphDateStringGraphValue> GraphOne { get; set; }

        [DataMember]
        public List<SelectorType> GraphOneSelections { get; set; }

        [DataMember]
        public List<String> DeliveryDate { get; set; }

        [DataMember]
        public List<GraphDateStringGraphValue> GraphTwo { get; set; }

        [DataMember]
        public List<SelectorType> GraphTwoSelections { get; set; }

    }
    public class GraphPricingSummary
    {
        [DataMember]
        public List<WaterfallChart> GraphOne { get; set; }
        [DataMember]
        public List<GraphXYGenericTableSingle> GraphTwo { get; set; }

        [DataMember]
        public List<GraphXYGenericTableDual> GraphThree { get; set; }
        [DataMember]
        public List<SelectorType> SubCategories { get; set; }
        [DataMember]
        public List<SelectorType> Categories { get; set; }
        [DataMember]
        public List<SelectorType> Customers { get; set; }

    }
    [DataContract]
    public class GraphPricingSummaryCustomerCat
    {
        [DataMember]
        public String SubCategoryID { get; set; }
        [DataMember]
        public String SubCategory { get; set; }
        [DataMember]
        public String CategoryID { get; set; }
        [DataMember]
        public String Category { get; set; }
        [DataMember]
        public Double GraphValue { get; set; }
    }




    [DataContract]
    public class MonthDef
    {
        [DataMember]
        public String MonthID;
        [DataMember]
        public String MonthShortName;
        [DataMember]
        public String MonthLongName;
    }
}
