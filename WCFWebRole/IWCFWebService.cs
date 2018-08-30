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
        #endregion 
        #region
        // Deal Information Routines
        [WebGet(UriTemplate = "/SpecificCustomerDealsGetInfo?CustomerID={CustomerID}",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        List<DealInfo> SpecificCustomerDealsGetInfo(int CustomerID);

        [WebGet(UriTemplate = "/DealUpsert?CustomerID={CustomerID}&DealID={DealID}&DealNumber={DealNumber}&DealName={DealName}&StartDate={StartDate}&EndDate={EndDate}&Margin={Margin}&BrokerMargin={BrokerMargin}&Active={Active}",
            RequestFormat = WebMessageFormat.Json,
            ResponseFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.Bare)]
        int DealUpsert(int CustomerID, int DealID, String DealNumber, String DealName, DateTime StartDate, DateTime EndDate, Double Margin, Double BrokerMargin, int Active);

        [WebGet(UriTemplate = "/DealsAllGetInfo",
            RequestFormat = WebMessageFormat.Json,
            ResponseFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.Bare)]
        List<DealInfo> DealsAllGetInfo();

        [WebGet(UriTemplate = "/SpecificDealsGetInfo?DealID={DealID}",
            RequestFormat = WebMessageFormat.Json,
            ResponseFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.Bare)]
        List<DealInfo> SpecificDealsGetInfo(int DealID);

        
        //DealUpsert(int CustomerID, int DealID, String DealNumber, String DealName, DateTime StartDate, DateTime EndDate, Double Margin, Double BrokerMargin, int Active)
        #endregion
        //// Uploading of Files
        //[OperationContract]
        //[WebGet(UriTemplate = "File/{fileName}/{fileExtension}")]
        //Stream DownloadFile(string fileName, string fileExtension);

        //[OperationContract]
        //[WebInvoke(UriTemplate = "UploadFile?Path={path}")]
        //void UploadFile(string path, Stream stream);


        // NOT PART OF PROGRAM
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

        // TODO: Add your service operations here
    }
    [DataContract]
    public class StateInfo
    {
        [DataMember]
        public string StateAbb { get; set; }
        [DataMember]
        public string StateName { get; set; }
    }
    public class CityInfo
    {
        [DataMember]
        public int CityID { get; set; }
        [DataMember]
        public string CityName { get; set; }
        [DataMember]
        public string StateAbb { get; set; }
    }
    public class CustomerInfo
    {
        [DataMember]
        public int CustomerID { get; set; }
        [DataMember]
        public string CustomerName { get; set; }
        [DataMember]
        public string billingadd1{ get; set; }
        [DataMember]
        public string billingadd2 { get; set; }
        [DataMember]
        public int cityid { get; set; }
        [DataMember]
        public String CityName { get; set; }
        [DataMember]
        public string zip { get; set; }
        [DataMember]
        public string stateabb { get; set; }
        [DataMember]
        public DateTime StartDate { get; set; }
        [DataMember]
        public DateTime EndDate { get; set; }
        [DataMember]
        public bool Active { get; set; }

    }
    [DataContract]
    public class DealInfo
    {
        [DataMember]
        public int CustomerID { get; set; }
        [DataMember]
        public String CustomerName { get; set; }
        [DataMember]
        public bool CustActive { get; set; }
        [DataMember]
        public int DealID { get; set; }
        [DataMember]
        public String DealNumber { get; set; }
        [DataMember]
        public String DealName { get; set; }
        [DataMember]
        public bool DealActive { get; set; }
        [DataMember]
        public String StartDate { get; set; }
        [DataMember]
        public String EndDate { get; set; }
        [DataMember]
        public Double Margin { get; set; }
        [DataMember]
        public Double BrokerMargin { get; set; }

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
    // Data Classes
    [DataContract]
    public class CustomerInformation
    {
        [DataMember]
        public int CustomerID { get; set; }
        [DataMember]
        public string WayPointName { get; set; }        
    }
    }
