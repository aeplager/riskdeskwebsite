﻿using System;
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
    public interface ICustomers
    {
        [WebGet(UriTemplate = "/CustomersGetInfo?CustomerID={CustomerID}&CustomerName={CustomerName}",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        List<CustomerInfo> CustomersGetInfo(Int64 CustomerID, String CustomerName);

        [WebGet(UriTemplate = "/CustomerUpsert?CustomerID={CustomerID}&CustomerName={CustomerName}&BillingAddrOne={BillingAddrOne}&BillingAddrTwo={BillingAddrTwo}&BillingAddrThree={BillingAddrThree}&DUNSNumber={DUNSNumber}&CreditScore={CreditScore}&PhoneNumber={PhoneNumber}&CityID={CityID}&ZipCode={ZipCode}&LineOfBusinessID={LineOfBusinessID}&StateAbb={StateAbb}",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        String CustomerUpsert(Int64 CustomerID, String CustomerName, String BillingAddrOne, String BillingAddrTwo, String BillingAddrThree, String DUNSNumber, String CreditScore, String PhoneNumber, Int64 CityID, String ZipCode, Int64 LineOfBusinessID, String StateAbb);


        [WebGet(UriTemplate = "/CustomerNameUpsert?CustomerOldName={CustomerOldName}&CustomerNewName={CustomerNewName}",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        String CustomerNameUpsert(String CustomerOldName, String CustomerNewName);
    }


    

    [DataContract]
    public class CustomerInformation
    {
        [DataMember]
        public int CustomerID { get; set; }
        [DataMember]
        public string WayPointName { get; set; }
    }
    public class CustomerInfo
    {
        [DataMember]
        public Int64 CustomerID { get; set; }
        [DataMember]
        public String CustomerName { get; set; }
        [DataMember]
        public String BillingAdd1 { get; set; }
        [DataMember]
        public String BillingAdd2 { get; set; }
        [DataMember]
        public String BillingAdd3 { get; set; }
        [DataMember]
        public String DUNSNumber { get; set; }
        [DataMember]
        public Int64 CreditScore { get; set; }
        [DataMember]
        public String CreditScoreText { get; set; }
        [DataMember]
        public String PhoneNumber { get; set; }
        [DataMember]
        public Int64 CityID { get; set; }
        [DataMember]
        public String CityName { get; set; }
        [DataMember]
        public String ZipCode { get; set; }
        [DataMember]
        public String StateAbb { get; set; }
        [DataMember]
        public String StateName { get; set; }

        [DataMember]
        public Int64 LineOfBusinessID { get; set; }
        [DataMember]
        public String LineOfBusiness { get; set; }
        [DataMember]
        public bool Active { get; set; }
        [DataMember]
        public Int64 FileID { get; set; }
        [DataMember]
        public String FileName { get; set; }

        [DataMember]
        public DateTime InsertDate { get; set; }
        [DataMember]
        public DateTime ModifiedDate { get; set; }
    }
}
