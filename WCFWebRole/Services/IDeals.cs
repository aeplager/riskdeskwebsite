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
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "IDeals" in both code and config file together.
    [ServiceContract]
    public interface IDeals
    {
        //[WebGet(UriTemplate = "/ObtainAzureParameters?FileType={FileType}",
        //    RequestFormat = WebMessageFormat.Json,
        //    ResponseFormat = WebMessageFormat.Json,
        //    BodyStyle = WebMessageBodyStyle.Bare)]
        //AzureParameters ObtainAzureParameters(string FileType);
        [WebGet(UriTemplate = "/DealsValidationUpsert?FileName={FileName}&ContainerName={ContainerName}",
                    RequestFormat = WebMessageFormat.Json,
                    ResponseFormat = WebMessageFormat.Json,
                    BodyStyle = WebMessageBodyStyle.Bare)]
        int DealValidationUpsert(String FileName, String ContainerName);
        [WebGet(UriTemplate = "/DealsValidateGetInfo",
            RequestFormat = WebMessageFormat.Json,
            ResponseFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.Bare)]
        List<DealInfo> DealsValidateGetInfo();

        [WebGet(UriTemplate = "/DealsValidatedFileUpsert",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        int DealsValidatedFileUpsert();

        [WebGet(UriTemplate = "/SpecificCustomerDealsGetInfo?CustomerID={CustomerID}",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        List<DealInfo> SpecificCustomerDealsGetInfo(int CustomerID);

        [WebGet(UriTemplate = "/RetailDealUpsert?RetailDealId={RetailDealId}&RetailDealName={RetailDealName}&CustomerID={CustomerID}&Active={Active}",
            RequestFormat = WebMessageFormat.Json,
            ResponseFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.Bare)]
        int RetailDealUpsert(Int64 RetailDealId, String RetailDealName, Double CustomerID, Int64 Active);


        [WebGet(UriTemplate = "/WholeSaleDealUpsert?WholeSaleDealID={WholeSaleDealID}&WholesaleDealName={WholesaleDealName}&CounterPartyID={CounterPartyID}&SecondCounterPartyID={SecondCounterPartyID}&SettlementPointID={SettlementPointID}&SetLocationID={SetLocationID}&WholeSaleBlockID={WholeSaleBlockID}&StartDate={StartDate}&EndDate={EndDate}&VolumeMW={VolumeMW}&Price={Price}&Active={Active}",
            RequestFormat = WebMessageFormat.Json,
            ResponseFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.Bare)]
        UpsertType WholeSaleDealUpsert(Int64 WholeSaleDealID, String WholesaleDealName, Int64 CounterPartyID, Int64 SecondCounterPartyID, Int64 SettlementPointID, Int64 SetLocationID, Int64 WholeSaleBlockID, DateTime StartDate, DateTime EndDate, Double VolumeMW, Double Price, Int32 Active);

        [WebGet(UriTemplate = "/WholeSaleDealGetInfo?WholeSaleDealID={WholeSaleDealID}",
            RequestFormat = WebMessageFormat.Json,
            ResponseFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.Bare)]
        List<WholesaleDealTermsInfo> WholeSaleDealGetInfo(Int64 WholeSaleDealID);


        [WebGet(UriTemplate = "/DealGenericUpsert?DealID={DealID}&DealNumber={DealNumber}&DealName={DealName}&StartDate={StartDate}&EndDate={EndDate}&Margin={Margin}&BrokerMargin={BrokerMargin}&Active={Active}&WeightProvided={WeightProvided}&CongestionZoneID={CongestionZoneID}&LoadProfileName={LoadProfileName}&TDUID={TDUID}&LossCode={LossCode}",
            RequestFormat = WebMessageFormat.Json,
            ResponseFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.Bare)]
        int DealGenericUpsert(int DealID, String DealNumber, String DealName, DateTime StartDate, DateTime EndDate, Double Margin, Double BrokerMargin, int Active, Double WeightProvided, int CongestionZoneID, String LoadProfileName, int TDUID, String LossCode);



        [WebGet(UriTemplate = "/DealsAllGetInfo",
            RequestFormat = WebMessageFormat.Json,
            ResponseFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.Bare)]
        List<DealInfo> DealsAllGetInfo();

        [WebGet(UriTemplate = "/DealGenericAllGetInfo?DealID={DealID}",
            RequestFormat = WebMessageFormat.Json,
            ResponseFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.Bare)]
        List<DealInfo> DealGenericAllGetInfo(int DealID);

        [WebGet(UriTemplate = "/DealsGenericAllGetInfo",
            RequestFormat = WebMessageFormat.Json,
            ResponseFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.Bare)]
        List<DealInfo> DealsGenericAllGetInfo();
        
        [WebGet(UriTemplate = "/RetailDealGetInfo?CustomerID={CustomerID}&RetailDealID={RetailDealID}",
            RequestFormat = WebMessageFormat.Json,
            ResponseFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.Bare)]
        List<RetailDealInfo> RetailDealGetInfo(Int64 CustomerID, Int64 RetailDealID);

        [WebGet(UriTemplate = "/RetailDealTermGetInfo?RetailDealID={RetailDealID}&CurrentActive={CurrentActive}",
            RequestFormat = WebMessageFormat.Json,
            ResponseFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.Bare)]
        List<RetailDealTermInfo> RetailDealTermGetInfo(Int64 RetailDealID, Int64 CurrentActive);

        [WebGet(UriTemplate = "/RetailDealTermsDelete?RetailDealTermsID={RetailDealTermsID}",
            RequestFormat = WebMessageFormat.Json,
            ResponseFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.Bare)]
        String RetailDealTermsDelete(Int64 RetailDealTermsID);

        [WebGet(UriTemplate = "/RetailDealTermsUpsert?RetailDealTermsID={RetailDealTermsID}&RetailDealID={RetailDealID}&Term={Term}&TermDate={TermDate}&BrokerFee={BrokerFee}&DealMargin={DealMargin}&RiskPremium={RiskPremium}",
            RequestFormat = WebMessageFormat.Json,
            ResponseFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.Bare)]
        String RetailDealTermsUpsert(Int64 RetailDealTermsID, Int64 RetailDealID, Int64 Term, DateTime TermDate, Double BrokerFee, Double DealMargin, Double RiskPremium);

    }

    [DataContract]
    public class WholesaleDealTermsInfo
    {
        [DataMember]
        public Int64 WholesaleDealID { get; set; }

        [DataMember]
        public String WholesaleDealName { get; set; }
        [DataMember]
        public Int64 ISOID { get; set; }
        [DataMember]
        public String ISO { get; set; }

        [DataMember]
        public Int64 CounterPartyID { get; set; }
        [DataMember]
        public String CounterParty { get; set; }

        [DataMember]
        public Int64 SecondCounterPartyID { get; set; }
        [DataMember]
        public String SecondCounterParty { get; set; }

        [DataMember]
        public Int64 SettlementPointID { get; set; }
        [DataMember]
        public String SettlementPoint { get; set; }

        [DataMember]
        public Int64 SettlementLocationID { get; set; }

        [DataMember]
        public String SettlementLocation { get; set; }
        
        [DataMember]
        public Int64 WholesaleBlockID { get; set; }

        [DataMember]
        public String WholesaleBlock { get; set; }

        [DataMember]
        public DateTime StartDate { get; set; }
                
        [DataMember]
        public DateTime EndDate { get; set; }
                
        [DataMember]
        public Double VolumeMW { get; set; }

        [DataMember]
        public Double Price { get; set; }
        [DataMember]
        public Double Fee { get; set; }

        [DataMember]
        public Double MTM { get; set; }

        [DataMember]
        public Boolean Active { get; set; }
    }


    [DataContract]
    public class RetailDealTermsInfo
    {
        [DataMember]
        public Int64 RetailDealID { get; set; }
        [DataMember]
        public Int64 Term { get; set; }
        [DataMember]
        public DateTime TermDate { get; set; }
        [DataMember]
        public String TermDateString { get; set; }
        [DataMember]
        public Double BrokerFee { get; set; }
        
        [DataMember]
        public Double DealMargin { get; set; }
        [DataMember]
        public Double RiskPremium { get; set; }
        
        [DataMember]
        public Boolean Active { get; set; }
    }

    [DataContract]
    public class RetailDealTermInfo
    {
        [DataMember]
        public Int64 RetailDealTermsID { get; set; }

        [DataMember]
        public String RetailDealName { get; set; }

        [DataMember]
        public Int64 RetailDealID { get; set; }
        [DataMember]
        public Int64 Term { get; set; }
        [DataMember]
        public DateTime TermDate { get; set; }

        [DataMember]
        public Double BrokerFee { get; set; }

        [DataMember]
        public Double DealMargin { get; set; }
        [DataMember]
        public Double RiskPremium { get; set; }

    }


    [DataContract]
    public class RetailDealInfo
    {
        [DataMember]
        public Int64 CustomerID { get; set; }
        [DataMember]
        public String CustomerName { get; set; }

        [DataMember]
        public Int64 RetailDealID { get; set; }

        [DataMember]
        public String RetailDealName { get; set; }

        [DataMember]
        public Boolean Active { get; set; }
    }

    
    [DataContract]
    public class DealInfo
    {
        // Delete This
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
        [DataMember]
        public Double WeightProvided { get; set; }
        [DataMember]
        public int TDUID { get; set; }
        [DataMember]
        public String TDUName { get; set; }

        [DataMember]
        public int CongestionZoneID { get; set; }
        [DataMember]
        public String CongestionZoneName { get; set; }
        [DataMember]
        public String LossCodeID { get; set; }
        [DataMember]
        public String LossCodeName { get; set; }
        [DataMember]
        public String LoadProfileName { get; set; }
        [DataMember]
        public int LoadProfileID { get; set; }
        [DataMember]
        public DateTime ExpirationDate { get; set; }

        [DataMember]
        public String FileName { get; set; }
        [DataMember]
        public DateTime InsertDate { get; set; }
        [DataMember]
        public String NewDeal { get; set; }

    }
}
