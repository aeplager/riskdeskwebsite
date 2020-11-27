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
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "IFacility" in both code and config file together.
    [ServiceContract]
    public interface IFacility
    {
        //[WebGet(UriTemplate = "/StatesGetInfo",
        //     RequestFormat = WebMessageFormat.Json,
        //     ResponseFormat = WebMessageFormat.Json,
        //     BodyStyle = WebMessageBodyStyle.Bare)]
        //List<StateInfo> StatesGetInfo();
        [WebGet(UriTemplate = "/PushDataToOldTables?CustomerID={CustomerID}&UtilityAccountNumber={UtilityAccountNumber}",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        String PushDataToOldTables(Int64 CustomerID, String UtilityAccountNumber);

        

        [WebGet(UriTemplate = "/FacilityGetInfo?CustomerID={CustomerID}&UtilityAccountNumber={UtilityAccountNumber}&FacilityName={FacilityName}",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]        
        List<FacilityInformation> FacilityGetInfo(String CustomerID, String UtilityAccountNumber, String FacilityName);

        [WebGet(UriTemplate = "/TDUGetInfo",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        List<SelectorType> TDUGetInfo();

        [WebGet(UriTemplate = "/CongestionZonesGetInfo",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        List<SelectorType> CongestionZonesGetInfo();

        [WebGet(UriTemplate = "/TDUTariffGetInfo?TDUID={TDUID}&TDUTariffID={TDUTariffID}",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        List<TDUTariffInfo> TDUTariffGetInfo(String TDUID, String TDUTariffID);

        [WebGet(UriTemplate = "/LoadProfileGetInfo",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        List<SelectorType> LoadProfileGetInfo();

        [WebGet(UriTemplate = "/WeatherStationGetInfo",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        List<SelectorType> WeatherStationGetInfo();


        [WebGet(UriTemplate = "/LossCodeGetInfo?TDUID={TDUID}",
          RequestFormat = WebMessageFormat.Json,
          ResponseFormat = WebMessageFormat.Json,
          BodyStyle = WebMessageBodyStyle.Bare)]
        List<LossCodeInfo> LossCodeGetInfo(String TDUID);

        [WebGet(UriTemplate = "/FacilityUpsert?UtilityAccountNew={UtilityAccountNew}&UtilityAccountNumber={UtilityAccountNumber}&CustomerID={CustomerID}&ServiceAddressOne={ServiceAddressOne}&ServiceAddressTwo={ServiceAddressTwo}&StateAbb={StateAbb}&CityID={CityID}&ZipCode={ZipCode}&TDUID={TDUID}&LoadProfile={LoadProfile}&CongestionZoneID={CongestionZoneID}&WeatherStationID={WeatherStationID}&BillCycle={BillCycle}&LossCodeID={LossCodeID}&TDUTariffID={TDUTariffID}",
          RequestFormat = WebMessageFormat.Json,
          ResponseFormat = WebMessageFormat.Json,
          BodyStyle = WebMessageBodyStyle.Bare)]
        String FacilityUpsert(String UtilityAccountNew, String UtilityAccountNumber, String CustomerID, String ServiceAddressOne, String ServiceAddressTwo, String StateAbb, String CityID, String ZipCode, String TDUID, String LoadProfile, String CongestionZoneID, String WeatherStationID, String BillCycle, String LossCodeID, String TDUTariffID);

    }

    [DataContract]
    public class FacilityInformation
    {
        [DataMember]
        public Int64 UtilityAccountNumberID { get; set; }

        [DataMember]
        public String UtilityAccountNumber { get; set; }

        [DataMember]
        public String FacilityName { get; set; }

        [DataMember]
        public Int64 FacilityPricingGroupID { get; set; }

        [DataMember]
        public String FacilityPricingGroup { get; set; }


        [DataMember]
        public String ServiceAddressOne { get; set; }
        [DataMember]
        public String ServiceAddressTwo { get; set; }
        [DataMember]
        public String ServiceAddressThree { get; set; }

        [DataMember]
        public Int64 CityID { get; set; }
        [DataMember]
        public String CityName { get; set; }
        [DataMember]
        public String StateAbb { get; set; }
        [DataMember]
        public String StateName { get; set; }

        [DataMember]
        public String ZipCode { get; set; }

        [DataMember]
        public Int64 LoadProfileID { get; set; }
        [DataMember]
        public String LoadProfile { get; set; }

        [DataMember]
        public Int64 CongestionZonesID { get; set; }
        [DataMember]
        public String CongestionZones { get; set; }

        [DataMember]
        public Int64 TDUID { get; set; }
        [DataMember]
        public String TDUShortName { get; set; }
        [DataMember]
        public String TDULongName { get; set; }

        [DataMember]
        public Int64 TDUTariffID { get; set; }
        [DataMember]
        public String TDUTariffName { get; set; }

        [DataMember]
        public Int64 BillingCyle { get; set; }
        [DataMember]
        public Int64 LossCodeID { get; set; }
        [DataMember]
        public String LossCodeName { get; set; }
        [DataMember]
        public Int64 WeatherStationID { get; set; }
        [DataMember]
        public String WeatherStation { get; set; }
        [DataMember]
        public bool Active { get; set; }
        [DataMember]
        public Int64 FileID { get; set; }
        [DataMember]
        public String FileName { get; set; }

        [DataMember]
        public Int64 CustomerID { get; set; }
        [DataMember]
        public String CustomerName { get; set; }   

    }
    [DataContract]
    public class TDUTariffInfo
    {
        [DataMember]
        public Int64 TDUID { get; set; }
        [DataMember]
        public Int64 TDUTariffID { get; set; }
        [DataMember]
        public String TDUTariffName { get; set; }

        [DataMember]
        public Double MonthlyFee { get; set; }
        [DataMember]
        public Double VolumetricFee { get; set; }
        [DataMember]
        public DateTime EffectiveDate { get; set; }
    }
    [DataContract]
    public class LossCodeInfo
    {
        [DataMember]
        public Int64 TDUID { get; set; }
        [DataMember]
        public Int64 LossCodeID { get; set; }
        [DataMember]
        public String LossCodeName { get; set; }

        [DataMember]
        public String LossCode { get; set; }
    }
}
