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
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "Deals" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select Deals.svc or Deals.svc.cs at the Solution Explorer and start debugging.
    public class Deals : IDeals
    {
       
        public int DealValidationUpsert(String FileName, String ContainerName)
        {

            int SelectionItemsinfo = new int();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[DealFileUpsert]";
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = SqlCommandText;
                    cmd.Parameters.AddWithValue("@FileName", FileName);
                    cmd.Parameters.AddWithValue("@ContainerName", ContainerName);                    
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
                            SelectionItemsinfo = Convert.ToInt32(dr["ReturnValue"]);
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }
        public List<WholesaleDealTermsInfo> WholeSaleDealGetInfo(Int64 WholeSaleDealID)
        {
            List<WholesaleDealTermsInfo> SelectionItemsinfo = new List<WholesaleDealTermsInfo>();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[WholesaleDealGetInfo]";
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@WholeSaleDealID", WholeSaleDealID);
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
                            SelectionItemsinfo.Add(new WholesaleDealTermsInfo
                            {
                                WholesaleDealID = Convert.ToInt32(dr["WholeSaleDealID"].ToString()),
                                WholesaleDealName = dr["WholeSaleDealName"].ToString(),
                                ISOID = Convert.ToInt64(dr["ISOID"].ToString()),
                                ISO = dr["ISOShortName"].ToString(),
                                CounterPartyID = Convert.ToInt64(dr["CounterPartyID"].ToString()),
                                CounterParty = dr["CounterParty"].ToString(),
                                SecondCounterPartyID = Convert.ToInt64(dr["SecondCounterPartyID"].ToString()),
                                SecondCounterParty = dr["SecondCounterParty"].ToString(),
                                SettlementPointID= Convert.ToInt64(dr["SettlementPointID"].ToString()),
                                SettlementPoint = dr["SettlementPointName"].ToString(),
                                SettlementLocationID = Convert.ToInt64(dr["SetLocationID"].ToString()),
                                SettlementLocation = dr["SettlementLocationName"].ToString(),
                                WholesaleBlockID = Convert.ToInt64(dr["WholeSaleBlockID"].ToString()),
                                WholesaleBlock = dr["WholeSaleBlocks"].ToString(),
                                StartDate = Convert.ToDateTime(dr["StartDate"].ToString()),
                                EndDate = Convert.ToDateTime(dr["EndDate"].ToString()),                                
                                VolumeMW = Convert.ToDouble(dr["VolumeMW"]),
                                Price = Convert.ToDouble(dr["Price"]),
                                Fee = Convert.ToDouble(dr["Fee"]),
                                BuySell = dr["BuySell"].ToString(),
                                Active = Convert.ToBoolean(dr["Active"].ToString()),
                            });
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }
        public UpsertType WholeSaleDealUpsert(Int64 WholeSaleDealID, String WholesaleDealName, Int64 CounterPartyID, Int64 SecondCounterPartyID, Int64 SettlementPointID, Int64 SetLocationID, Int64 WholeSaleBlockID, DateTime StartDate, DateTime EndDate, Double VolumeMW, Double Price, Int32 Active, Double Fee, String BuySell)
        {
            UpsertType SelectionItemsinfo = new UpsertType(); 
            SelectionItemsinfo.Status = "ERROR";
            SelectionItemsinfo.Identifier = WholeSaleDealID.ToString();
            SelectionItemsinfo.Notes = "N/A";
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[WholesaleDealUpsert]";
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = SqlCommandText;
                    cmd.Parameters.AddWithValue("@WholeSaleDealID", WholeSaleDealID);
                    cmd.Parameters.AddWithValue("@WholesaleDealName", WholesaleDealName);                    
                    cmd.Parameters.AddWithValue("@CounterPartyID", CounterPartyID);
                    cmd.Parameters.AddWithValue("@SecondCounterPartyID", SecondCounterPartyID);
                    cmd.Parameters.AddWithValue("@SettlementPointID", SettlementPointID);
                    cmd.Parameters.AddWithValue("@SetLocationID", SetLocationID);
                    cmd.Parameters.AddWithValue("@WholeSaleBlockID", WholeSaleBlockID);                    
                    cmd.Parameters.AddWithValue("@StartDate", StartDate);
                    cmd.Parameters.AddWithValue("@EndDate", EndDate);
                    cmd.Parameters.AddWithValue("@VolumeMW", VolumeMW);
                    cmd.Parameters.AddWithValue("@Price", Price);
                    cmd.Parameters.AddWithValue("@Active", Active);
                    cmd.Parameters.AddWithValue("@Fee", Fee);
                    cmd.Parameters.AddWithValue("@BuySell", BuySell);
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
                            SelectionItemsinfo.Status = dr["Status"].ToString();
                            SelectionItemsinfo.Identifier = dr["IdentifierID"].ToString();
                        }
                    }
                }
            }
        return SelectionItemsinfo;        
    }

        public List<DealInfo> DealsValidateGetInfo()
        {

            List<DealInfo> SelectionItemsinfo = new List<DealInfo>();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[DealValidationGetInfo]";
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
                            SelectionItemsinfo.Add(new DealInfo
                                {
                                    CustomerID = Convert.ToInt32(dr["customerid"].ToString()),
                                    CustomerName = dr["customername"].ToString(),
                                    DealID = Convert.ToInt32(dr["dealid"].ToString()),
                                    DealNumber = dr["dealnumber"].ToString(),
                                    DealName = dr["dealnumber"].ToString(),
                                    StartDate = String.Format("{0:MM/dd/yyyy}", Convert.ToDateTime(dr["startdate"].ToString())),
                                    EndDate = String.Format("{0:MM/dd/yyyy}", Convert.ToDateTime(dr["enddate"].ToString())),
                                    Margin = Convert.ToDouble(dr["Margin"]),
                                    BrokerMargin = Convert.ToDouble(dr["BrokerMargin"]),
                                    DealActive = Convert.ToBoolean(dr["Active"].ToString()),
                                    FileName = dr["FileName"].ToString(),
                                    InsertDate = Convert.ToDateTime(dr["InsertDate"].ToString()),
                                    NewDeal = dr["NewDeal"].ToString(),                                   
                                    
                            });                            
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }
        public int DealsValidatedFileUpsert()
        {

            int SelectionItemsinfo = new int();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[DealValidatedFileUpsert]";
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
                            SelectionItemsinfo = Convert.ToInt32(dr["ReturnValue"]);
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }
        public List<DealInfo> SpecificCustomerDealsGetInfo(int CustomerID)
        {

            List<DealInfo> SelectionItemsinfo = new List<DealInfo>();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[CustomerDealsAllGetInfo]";
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = SqlCommandText;
                    cmd.Parameters.AddWithValue("@CustomerID", CustomerID);
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
                            SelectionItemsinfo.Add(new DealInfo
                            {
                                CustomerID = Convert.ToInt32(dr["customerid"].ToString()),
                                CustomerName = dr["customername"].ToString(),
                                CustActive = Convert.ToBoolean(dr["CustActive"].ToString()),
                                DealID = Convert.ToInt32(dr["dealid"].ToString()),
                                DealNumber = dr["dealnumber"].ToString(),
                                DealName = dr["dealname"].ToString(),
                                StartDate = dr["startdate"].ToString(),
                                EndDate = dr["enddate"].ToString(),
                                Margin = Convert.ToDouble(dr["Margin"].ToString()),
                                BrokerMargin = Convert.ToDouble(dr["BrokerMargin"].ToString()),
                                DealActive = Convert.ToBoolean(dr["DealActive"].ToString()),
                            });
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }
        public List<DealInfo> DealsAllGetInfo()
        {

            List<DealInfo> SelectionItemsinfo = new List<DealInfo>();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[DealsAllGetInfo]";
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
                            SelectionItemsinfo.Add(new DealInfo
                            {
                                CustomerID = Convert.ToInt32(dr["customerid"].ToString()),
                                CustomerName = dr["customername"].ToString(),
                                CustActive = Convert.ToBoolean(dr["CustActive"].ToString()),
                                DealID = Convert.ToInt32(dr["dealid"].ToString()),
                                DealNumber = dr["dealnumber"].ToString(),
                                DealName = dr["dealname"].ToString(),
                                StartDate = dr["startdate"].ToString(),
                                EndDate = dr["enddate"].ToString(),
                                Margin = Convert.ToDouble(dr["Margin"].ToString()),
                                BrokerMargin = Convert.ToDouble(dr["BrokerMargin"].ToString()),
                                DealActive = Convert.ToBoolean(dr["DealActive"].ToString()),
                            });
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }
        public List<DealInfo> DealsGenericAllGetInfo()
        {

            List<DealInfo> SelectionItemsinfo = new List<DealInfo>();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[DealsGenericAllGetInfo]";
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
                            SelectionItemsinfo.Add(new DealInfo
                            {
                                DealID = Convert.ToInt32(dr["dealid"].ToString()),
                                DealNumber = dr["dealnumber"].ToString(),
                                DealName = dr["dealname"].ToString(),
                                StartDate = dr["startdate"].ToString(),
                                EndDate = dr["enddate"].ToString(),
                                Margin = Convert.ToDouble(dr["Margin"].ToString()),
                                BrokerMargin = Convert.ToDouble(dr["BrokerMargin"].ToString()),
                                WeightProvided = Convert.ToDouble(dr["WeightProvided"].ToString()),
                                DealActive = Convert.ToBoolean(dr["DealActive"].ToString()),
                                TDUID = Convert.ToInt32(dr["TDUID"].ToString()),
                                TDUName = dr["TDUName"].ToString(),
                                CongestionZoneID = Convert.ToInt32(dr["CZID"].ToString()),
                                CongestionZoneName = dr["CZName"].ToString(),
                                LossCodeID = dr["LossCodeID"].ToString(),
                                LossCodeName = dr["LossCodeName"].ToString(),
                                LoadProfileID= Convert.ToInt32(dr["LProfileID"].ToString()),
                                LoadProfileName = dr["LProfileName"].ToString(),
                            });
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }

        public List<DealInfo> DealGenericAllGetInfo(int DealID)
        {

            List<DealInfo> SelectionItemsinfo = new List<DealInfo>();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[DealGenericAllGetInfo]";
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = SqlCommandText;
                    cmd.Parameters.AddWithValue("@DealID", DealID);
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
                            SelectionItemsinfo.Add(new DealInfo
                            {
                                DealID = Convert.ToInt32(dr["dealid"].ToString()),
                                DealNumber = dr["dealnumber"].ToString(),
                                DealName = dr["dealname"].ToString(),
                                StartDate = dr["startdate"].ToString(),
                                EndDate = dr["enddate"].ToString(),
                                Margin = Convert.ToDouble(dr["Margin"].ToString()),
                                BrokerMargin = Convert.ToDouble(dr["BrokerMargin"].ToString()),
                                WeightProvided = Convert.ToDouble(dr["WeightProvided"].ToString()),
                                DealActive = Convert.ToBoolean(dr["DealActive"].ToString()),
                                TDUID = Convert.ToInt32(dr["TDUID"].ToString()),
                                TDUName = dr["TDUName"].ToString(),
                                CongestionZoneID = Convert.ToInt32(dr["CZID"].ToString()),
                                CongestionZoneName = dr["CZName"].ToString(),
                                LossCodeID = dr["LossCodeID"].ToString(),
                                LossCodeName = dr["LossCodeName"].ToString(),
                                LoadProfileID = Convert.ToInt32(dr["LProfileID"].ToString()),
                                LoadProfileName = dr["LProfileName"].ToString(),
                            });
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }
        public int RetailDealUpsert(Int64 RetailDealId, String RetailDealName, Double CustomerID, Int64 Active)
        {

            int SelectionItemsinfo = new int();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            if (Active != 1)
            {
                if (Active != 0)
                {
                    Active = 1;
                }
            }
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[RetailDealUpsert]";
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = SqlCommandText;                    
                    cmd.Parameters.AddWithValue("@RetailDealId", RetailDealId);
                    cmd.Parameters.AddWithValue("@RetailDealName", RetailDealName);
                    cmd.Parameters.AddWithValue("@CustomerID", CustomerID);
                    cmd.Parameters.AddWithValue("@Active", Active);
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
                            SelectionItemsinfo = Convert.ToInt32(dr["ReturnValue"]);
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }


        public List<RetailDealInfo> RetailDealGetInfo(Int64 CustomerID, Int64 RetailDealID)
        {
            // Delete this
            List<RetailDealInfo> SelectionItemsinfo = new List<RetailDealInfo>();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();            
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[RetailDealsGetInfo]";
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = SqlCommandText;                    
                    cmd.Parameters.AddWithValue("@RetailDealID", RetailDealID);
                    cmd.Parameters.AddWithValue("@CustomerID", CustomerID);
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
                            SelectionItemsinfo.Add(new RetailDealInfo
                            {
                                CustomerID = Convert.ToInt64(dr["CustomerID"].ToString()),
                                CustomerName = dr["CustomerName"].ToString(),
                                RetailDealID = Convert.ToInt64(dr["RetailDealId"].ToString()),
                                RetailDealName = dr["RetailDealName"].ToString(),
                                Active = Convert.ToBoolean(dr["Active"]),
                            });
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }

        public List<RetailDealTermInfo> RetailDealTermGetInfo(Int64 RetailDealID, Int64 CurrentActive)
        {
            List<RetailDealTermInfo> SelectionItemsinfo = new List<RetailDealTermInfo>();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[RetailDealTermsGetInfo]";
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = SqlCommandText;
                    cmd.Parameters.AddWithValue("@RetailDealID", RetailDealID);
                    cmd.Parameters.AddWithValue("@CurrentActive", CurrentActive);
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
                            SelectionItemsinfo.Add(new RetailDealTermInfo
                            {
                                RetailDealTermsID = Convert.ToInt64(dr["RetailDealTermsID"].ToString()),
                                RetailDealID = Convert.ToInt64(dr["RetailDealId"].ToString()),
                                RetailDealName = dr["RetailDealName"].ToString(),
                                TermDate = Convert.ToDateTime(dr["TermDate"].ToString()),                                
                                Term = Convert.ToInt64(dr["Term"].ToString()),
                                BrokerFee = Convert.ToDouble(dr["BrokerFee"].ToString()),
                                DealMargin = Convert.ToDouble(dr["DealMargin"].ToString()),
                                RiskPremium = Convert.ToDouble(dr["RiskPremium"].ToString()),                                
                            });
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }

        public String RetailDealTermsDelete(Int64 RetailDealTermsID)
        {
            String SelectionItemsinfo;
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            //int NoBookOfBusinessInt;
            //NoBookOfBusinessInt = 1;
            SelectionItemsinfo = "SUCCESS";
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[RetailDealTermsDelete]";
                    //SqlCommandText = "[WebSite].[WeatherHourlyFilteredV2GetInfo]";
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = SqlCommandText;
                    cmd.Parameters.AddWithValue("@RetailDealTermsID", RetailDealTermsID);

                    //cmd.Parameters.AddWithValue("@UserName", UserName);
                    cmd.Connection = con;
                    using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                    {
                        da.Fill(ds, "SelectionItems");
                    }
                }
            }
            return SelectionItemsinfo;
        }
        public String RetailDealTermsUpsert(Int64 RetailDealTermsID, Int64 RetailDealID, Int64 Term, DateTime TermDate, Double BrokerFee, Double DealMargin, Double RiskPremium)
        {
            String SelectionItemsinfo;
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            //int NoBookOfBusinessInt;
            //NoBookOfBusinessInt = 1;
            SelectionItemsinfo = "SUCCESS";
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[RetailDealTermsUpsert]";
                    //SqlCommandText = "[WebSite].[WeatherHourlyFilteredV2GetInfo]";
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = SqlCommandText;
                    cmd.Parameters.AddWithValue("@RetailDealTermsID", RetailDealTermsID);
                    cmd.Parameters.AddWithValue("@RetailDealID", RetailDealID);
                    cmd.Parameters.AddWithValue("@Term", Term);
                    cmd.Parameters.AddWithValue("@TermDate", TermDate);
                    cmd.Parameters.AddWithValue("@BrokerFee", BrokerFee);
                    cmd.Parameters.AddWithValue("@DealMargin", DealMargin);
                    cmd.Parameters.AddWithValue("@RiskPremium", RiskPremium);
                    //cmd.Parameters.AddWithValue("@UserName", UserName);
                    cmd.Connection = con;
                    using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                    {
                        da.Fill(ds, "SelectionItems");
                    }
                }
            }
            return SelectionItemsinfo;
        }


        public int DealGenericUpsert(int DealID, String DealNumber, String DealName, DateTime StartDate, DateTime EndDate, Double Margin, Double BrokerMargin, int Active, Double WeightProvided,int CongestionZoneID, String LoadProfileName, int TDUID, String LossCode)
        {

            int SelectionItemsinfo = new int();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            if (Active != 1)
            {
                if (Active != 0)
                {
                    Active = 1;
                }
            }
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[DealGenericUpsert]";
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = SqlCommandText;                    
                    cmd.Parameters.AddWithValue("@DealID", DealID);
                    cmd.Parameters.AddWithValue("@DealNumber", DealNumber);
                    cmd.Parameters.AddWithValue("@DealName", DealName);
                    cmd.Parameters.AddWithValue("@StartDate", StartDate);
                    cmd.Parameters.AddWithValue("@EndDate", EndDate);
                    cmd.Parameters.AddWithValue("@Margin", Margin);
                    cmd.Parameters.AddWithValue("@BrokerMargin", BrokerMargin);
                    cmd.Parameters.AddWithValue("@Active", Active);
                    cmd.Parameters.AddWithValue("@WeightProvided", WeightProvided);
                    cmd.Parameters.AddWithValue("@CongestionZoneID", CongestionZoneID);
                    cmd.Parameters.AddWithValue("@LoadProfileName", LoadProfileName);
                    cmd.Parameters.AddWithValue("@TDUID", TDUID);
                    cmd.Parameters.AddWithValue("@LossCode", LossCode);
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
                            SelectionItemsinfo = Convert.ToInt32(dr["ReturnValue"]);
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
