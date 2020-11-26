using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;
using System.Data;//
using System.Configuration;
using System.Data.SqlClient;
using System.IO;
using System.Web.Hosting;
//Blob Storage 
using Microsoft.Azure;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using System.Globalization;


namespace WCFWebRole
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "Facility" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select Facility.svc or Facility.svc.cs at the Solution Explorer and start debugging.
    public class Facility : IFacility
    {
        public List<FacilityInformation> FacilityGetInfo(String CustomerID, String UtilityAccountNumber)
        {

            List<FacilityInformation> SelectionItemsinfo = new List<FacilityInformation>();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[FacilityGetInfo]";
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = SqlCommandText;                                        
                    if ((CustomerID != null) && (CustomerID.Trim() != "")) {
                        Int64 CustomerIDNumber = Convert.ToInt64(CustomerID);
                        cmd.Parameters.AddWithValue("@CustomerID", CustomerIDNumber);
                    }
                    if ((UtilityAccountNumber != null) && (UtilityAccountNumber.Trim() != "")) { cmd.Parameters.AddWithValue("@UtilityAccountNumber", UtilityAccountNumber); }
                    cmd.Connection = con;
                    using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                    {
                        da.Fill(ds, "SelectionItems");
                    }
                }
            }
            int i_row = 0;
            if (ds != null)
            {
                if (ds.Tables.Count > 0)
                {
                    if (ds.Tables["SelectionItems"].Rows.Count > 0)
                    {
                        foreach (DataRow dr in ds.Tables["SelectionItems"].Rows)
                        {
                            i_row++;
                            SelectionItemsinfo.Add(new FacilityInformation
                            {       
                                //Active = Convert.ToBoolean(dr["Active"].ToString()),
                                BillingCyle = Convert.ToInt64(dr["BillingCycle"].ToString()),
                                CityID = Convert.ToInt64(dr["CityID"].ToString()),
                                CityName = dr["CityName"].ToString(),
                                CongestionZones = dr["CongestionZones"].ToString(),
                                CongestionZonesID = Convert.ToInt64(dr["CongestionZonesID"].ToString()),
                                CustomerID = Convert.ToInt64(dr["CustomerID"].ToString()),
                                CustomerName = dr["CustomerName"].ToString(),
                                //FileID = Convert.ToInt64(dr["FileID"].ToString()),
                                //FileName = dr["FileName"].ToString(),
                                LoadProfile = dr["LoadProfile"].ToString(),
                                LoadProfileID = Convert.ToInt64(dr["LoadProfileID"].ToString()),
                                LossCodeID = Convert.ToInt64(dr["LossCodeID"].ToString()),
                                LossCodeName = dr["LossCodeName"].ToString(),
                                ServiceAddressOne = dr["ServiceAddress1"].ToString(),
                                //ServiceAddressThree = dr["ServiceAddress3"].ToString(),
                                //ServiceAddressTwo = dr["ServiceAddress2"].ToString(),
                                StateAbb = dr["StateAbb"].ToString(),
                                StateName = dr["StateName"].ToString(),
                                TDUID = Convert.ToInt64(dr["TDUID"].ToString()),
                                TDULongName = dr["TDULongName"].ToString(),
                                TDUShortName = dr["TDUShortName"].ToString(),
                                TDUTariffID = Convert.ToInt64(dr["TDUTariffID"].ToString()),
                                TDUTariffName = dr["TDUTariffName"].ToString(),
                                UtilityAccountNumber = dr["UtilityAccountNumber"].ToString(),
                                UtilityAccountNumberID = Convert.ToInt64(dr["UtilityAccountNumberID"].ToString()),
                                WeatherStation = dr["WeatherStation"].ToString(),
                                WeatherStationID = Convert.ToInt64(dr["WeatherStationID"].ToString()),
                                ZipCode = dr["ZipCode"].ToString(),
                            });
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }
        public String PushDataToOldTables(Int64 CustomerID, String UtilityAccountNumber)
        {
            String SelectionItemsinfo = "ERROR";
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[Calcs].[OldTablesUpsert]";
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = SqlCommandText;
                    if (UtilityAccountNumber == "") { UtilityAccountNumber = "N/A";}
                    cmd.Parameters.AddWithValue("@CustomerID", CustomerID);
                    cmd.Parameters.AddWithValue("@UtilityAccountNumberID", 0);
                    cmd.Parameters.AddWithValue("@UtilityAccountNumber", UtilityAccountNumber);
                    cmd.Connection = con;
                    using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                    {
                        da.Fill(ds, "SelectionItems");
                    }
                }
            }
            if (ds != null)
            {
                if (ds.Tables.Count > 0)
                {
                    if (ds.Tables["SelectionItems"].Rows.Count > 0)
                    {
                        foreach (DataRow dr in ds.Tables["SelectionItems"].Rows)
                        {
                            SelectionItemsinfo = dr["Result"].ToString();
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }

        public String FacilityUpsert(String UtilityAccountNew, String UtilityAccountNumber, String CustomerID, String ServiceAddressOne, String ServiceAddressTwo, String StateAbb, String CityID, String ZipCode, String TDUID, String LoadProfile, String CongestionZoneID, String WeatherStationID, String BillCycle, String LossCodeID, String TDUTariffID)
        {
            String SelectionItemsinfo = "ERROR";
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[FacilityUpsert]";
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = SqlCommandText;

                    cmd.Parameters.AddWithValue("@UtilityAccountNew", UtilityAccountNew);
                    cmd.Parameters.AddWithValue("@UtilityAccountNumber", UtilityAccountNumber);
                    cmd.Parameters.AddWithValue("@CustomerID", CustomerID);
                    if (ServiceAddressOne != null) { cmd.Parameters.AddWithValue("@ServiceAddress1", ServiceAddressOne); }
                    if (ServiceAddressTwo != null) { cmd.Parameters.AddWithValue("@ServiceAddress2", ServiceAddressTwo); }

                    if (StateAbb != null) { cmd.Parameters.AddWithValue("@StateAbb", StateAbb); }
                    if (CityID != null) { cmd.Parameters.AddWithValue("@CityID", CityID); }
                    if (ZipCode != null) { cmd.Parameters.AddWithValue("@ZipCode", ZipCode); }
                    if (TDUID != null) { cmd.Parameters.AddWithValue("@TDUID", TDUID); }
                    if (LoadProfile != null) { cmd.Parameters.AddWithValue("@LoadProfile", LoadProfile); }
                    if (CongestionZoneID != null) { cmd.Parameters.AddWithValue("@CongestionZoneID", CongestionZoneID); }
                    if (WeatherStationID != null) { cmd.Parameters.AddWithValue("@WeatherStationID", WeatherStationID); }
                    if (BillCycle != null) { cmd.Parameters.AddWithValue("@BillCycle", BillCycle); }
                    if (LossCodeID != null) { cmd.Parameters.AddWithValue("@LossCodeID", LossCodeID); }
                    if (TDUTariffID != null) { cmd.Parameters.AddWithValue("@TDUTariffID", TDUTariffID); }
                    cmd.Connection = con;
                    using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                    {
                        da.Fill(ds, "SelectionItems");
                    }
                }
            }
            if (ds != null)
            {
                if (ds.Tables.Count > 0)
                {
                    if (ds.Tables["SelectionItems"].Rows.Count > 0)
                    {
                        foreach (DataRow dr in ds.Tables["SelectionItems"].Rows)
                        {
                            SelectionItemsinfo = dr["Result"].ToString();
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }

        //******************************************************************
        // New ONES
        //******************************************************************
        public List<SelectorType> TDUGetInfo()
        {
            // Move to Facility
            List<SelectorType> SelectionItemsinfo = new List<SelectorType>();
            SelectionItemsinfo = GenericGetInfo("[WebSite].[TDUGetInfo]", "TDUID", "TDULongName");
            return SelectionItemsinfo;
        }
        public List<SelectorType> CongestionZonesGetInfo()
        {
            // Move to Facility
            List<SelectorType> SelectionItemsinfo = new List<SelectorType>();
            SelectionItemsinfo = GenericGetInfo("[WebSite].[CongestionZonesGetInfo]", "CongestionZonesID", "CongestionZones");
            return SelectionItemsinfo;
        }



        public List<TDUTariffInfo> TDUTariffGetInfo(String TDUID, String TDUTariffID)
        {
            // Move to Facility
            List<TDUTariffInfo> SelectionItemsinfo = new List<TDUTariffInfo>();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[TDUTariffGetInfo]";
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = SqlCommandText;
                    if (TDUID != null) { cmd.Parameters.AddWithValue("@TDUID", TDUID); }
                    if (TDUTariffID != null) { cmd.Parameters.AddWithValue("@TDUTariffID", TDUTariffID); }
                    cmd.Connection = con;
                    using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                    {
                        da.Fill(ds, "SelectionItems");
                    }
                }
            }
            if (ds != null)
            {
                if (ds.Tables.Count > 0)
                {
                    if (ds.Tables["SelectionItems"].Rows.Count > 0)
                    {
                        foreach (DataRow dr in ds.Tables["SelectionItems"].Rows)
                        {
                            SelectionItemsinfo.Add(new TDUTariffInfo
                            {

                                TDUID = Convert.ToInt64(dr["TDUID"].ToString()),
                                TDUTariffID = Convert.ToInt64(dr["TDUTariffID"].ToString()),
                                TDUTariffName = dr["TDUTariffName"].ToString(),
                                MonthlyFee = Convert.ToDouble(dr["MonthlyFee"].ToString()),
                                VolumetricFee = Convert.ToDouble(dr["VolumetricFee"].ToString()),
                                EffectiveDate = Convert.ToDateTime(dr["EffectiveDate"].ToString()),
                            });
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }
        public List<SelectorType> LoadProfileGetInfo()
        {
            // Move to Facility
            List<SelectorType> SelectionItemsinfo = new List<SelectorType>();
            SelectionItemsinfo = GenericGetInfo("[WebSite].[LoadProfileGetInfo]", "LoadProfileID", "LoadProfile");
            return SelectionItemsinfo;
        }
        public List<SelectorType> WeatherStationGetInfo()
        {
            // Move to Facility
            List<SelectorType> SelectionItemsinfo = new List<SelectorType>();
            SelectionItemsinfo = GenericGetInfo("[WebSite].[WeatherStationGetInfo]", "WeatherStationID", "WeatherStation");
            return SelectionItemsinfo;
        }

        public List<LossCodeInfo> LossCodeGetInfo(String TDUID)
        {
            // Move to Facility
            List<LossCodeInfo> SelectionItemsinfo = new List<LossCodeInfo>();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[LossCodeGetInfo]";
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = SqlCommandText;
                    if (TDUID != null) { cmd.Parameters.AddWithValue("@TDUID", TDUID); }
                    cmd.Connection = con;
                    using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                    {
                        da.Fill(ds, "SelectionItems");
                    }
                }
            }
            if (ds != null)
            {
                if (ds.Tables.Count > 0)
                {
                    if (ds.Tables["SelectionItems"].Rows.Count > 0)
                    {
                        foreach (DataRow dr in ds.Tables["SelectionItems"].Rows)
                        {
                            SelectionItemsinfo.Add(new LossCodeInfo
                            {

                                TDUID = Convert.ToInt64(dr["TDUID"].ToString()),
                                LossCodeID = Convert.ToInt64(dr["LossCodeID"].ToString()),
                                LossCodeName = dr["LossCodeName"].ToString(),
                                LossCode = dr["LossCode"].ToString(),                                
                            });
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }



        //******************************************************************
        // New ONES
        //******************************************************************
        private List<SelectorType> GenericGetInfo(String StoredProcedure, String FieldID, String FieldText)
        {

            List<SelectorType> SelectionItemsinfo = new List<SelectorType>();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = StoredProcedure;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = SqlCommandText;
                    cmd.Connection = con;
                    using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                    {
                        da.Fill(ds, "SelectionItems");
                    }
                }
            }
            if (ds != null)
            {
                if (ds.Tables.Count > 0)
                {
                    if (ds.Tables["SelectionItems"].Rows.Count > 0)
                    {
                        foreach (DataRow dr in ds.Tables["SelectionItems"].Rows)
                        {
                            SelectionItemsinfo.Add(new SelectorType
                            {
                                SelectorID = dr[FieldID].ToString(),
                                SelectorText = dr[FieldText].ToString(),
                            });
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }
        private String ReturnConnectionString()
        {
            try
            {
                string Environment = ConfigurationManager.AppSettings["Environment"];
                string RetrievalVariable = "ConnectionString" + Environment;
                string ConnectionString = ConfigurationManager.AppSettings[RetrievalVariable];
                return ConnectionString;
            }
            catch (Exception ex)
            {
                string Error = ex.ToString();
                return @"Data Source=MACBOOKPRO-PC\SQLSVR2012;Trusted_Connection=True;DataBase=NOV2";
            }
        }
    }
}
