using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;
using System.IO;

namespace WCFWebRole.Services
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "ICurveUploader" in both code and config file together.
    [ServiceContract]
    public interface ISharedInfo
    { 

        [WebGet(UriTemplate = "/StatesGetInfo",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        List<SelectorType> StatesGetInfo();

        [WebGet(UriTemplate = "/CityGetInfo/?CityID={CityID}&StateAbb={StateAbb}",
            RequestFormat = WebMessageFormat.Json,
            ResponseFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.Bare)]
        List<CityInfo> CityGetInfo(String CityID, String StateAbb);

        [WebGet(UriTemplate = "/LineOfBusinessGetInfo/?LineOfBusinessID={LineOfBusinessID}",
            RequestFormat = WebMessageFormat.Json,
            ResponseFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.Bare)]
        List<SelectorType> LineOfBusinessGetInfo(String LineOfBusinessID);

        //[WebGet(UriTemplate = "/LoadProfileGetInfo",
        //    RequestFormat = WebMessageFormat.Json,
        //    ResponseFormat = WebMessageFormat.Json,
        //    BodyStyle = WebMessageBodyStyle.Bare)]
        //List<SelectorType> LoadProfileGetInfo();

    }
    [DataContract]
    public class StateInfo
    {
        [DataMember]
        public string StateAbb { get; set; }
        [DataMember]
        public string StateName { get; set; }

    }



    [DataContract]
    public class CityInfo
    {
        [DataMember]
        public Int64  CityID { get; set; }
        [DataMember]
        public string CityName { get; set; }
        [DataMember]
        public string StateAbb { get; set; }
        [DataMember]
        public string StateName { get; set; }

    }
}
