using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;

namespace WCFWebRole
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "IWCFWebService" in both code and config file together.
    [ServiceContract]
    public interface IWCFWebService
    {

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
                

        // TODO: Add your service operations here
    }
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
}
