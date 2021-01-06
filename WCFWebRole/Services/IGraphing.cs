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
        [WebGet(UriTemplate = "/MonthlyEnergyUsageGetInfo",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        GraphMonthly MonthlyEnergyUsageGetInfo();
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
