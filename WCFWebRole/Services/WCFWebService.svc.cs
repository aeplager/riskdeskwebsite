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
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "WCFWebService" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select WCFWebService.svc or WCFWebService.svc.cs at the Solution Explorer and start debugging.
    public class WCFWebService : IWCFWebService
    {

        #region
        // Graphing Stored Procedures
        public List<SelectorType> AllMonthsGetInfo()
        {

            List<SelectorType> SelectionItemsinfo = new List<SelectorType>();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[MonthsGetInfo]";
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
                                SelectorID = dr["MonthsNamesID"].ToString(),
                                SelectorText= dr["MonthsLongName"].ToString(),                                
                            });
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }

        public List<SelectorType> AllBookOfBusinessGetInfo()
        {

            List<SelectorType> SelectionItemsinfo = new List<SelectorType>();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[BookOfBusinessGetInfo]";
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
                                SelectorID = dr["BookOfBusinessID"].ToString(),
                                SelectorText = dr["BookOfBusiness"].ToString(),
                                Color = dr["Color"].ToString(),
                            });
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }


        //public List<RetailDealInfo> RetailDealGetInfo(String sDealID)
        //{
        //    List<RetailDealInfo> SelectionItemsinfo = new List<RetailDealInfo>();
        //    DataSet ds = new DataSet();
        //    string ConnectionString = ReturnConnectionString();
        //    using (SqlConnection con = new SqlConnection(ConnectionString))
        //    {
        //        using (SqlCommand cmd = new SqlCommand())
        //        {
        //            string SqlCommandText = "[WebSite].[RetailDealGetInfo]";
        //            cmd.CommandType = CommandType.StoredProcedure;
        //            cmd.CommandText = SqlCommandText;
        //            if ((sDealID != null)  && (sDealID.ToLower() != "null"))
        //            {
        //                Int64 iDeal = Convert.ToInt64(sDealID);
        //                cmd.Parameters.AddWithValue("@RetailDealID", iDeal);
        //            }

        //            cmd.Connection = con;
        //            using (SqlDataAdapter da = new SqlDataAdapter(cmd))
        //            {
        //                da.Fill(ds, "SelectionItems");
        //            }
        //        }
        //    }
        //    if (ds != null)
        //    {
        //        if (ds.Tables.Count > 0)
        //        {
        //            if (ds.Tables["SelectionItems"].Rows.Count > 0)
        //            {
        //                foreach (DataRow dr in ds.Tables["SelectionItems"].Rows)
        //                {
        //                    SelectionItemsinfo.Add(new RetailDealInfo
        //                    {

        //                        RetailDealID = Convert.ToInt64(dr["RetailDealID"].ToString()),
        //                        RetailDealName = dr["RetailDealName"].ToString(),
        //                        CustomerID = Convert.ToInt64(dr["CustomerID"].ToString()),
        //                        BrokerID = Convert.ToInt64(dr["BrokerID"].ToString()),
        //                        StartDate = Convert.ToDateTime(dr["StartDate"].ToString()),
        //                        StartDateString = dr["StartDateString"].ToString(),
        //                        DealDate = Convert.ToDateTime(dr["DealDate"].ToString()),
        //                        DealDateString = dr["DealDateString"].ToString(),
        //                        DealCommittmentDate = Convert.ToDateTime(dr["DealCommittmentDate"].ToString()),
        //                        DealCommittmentDateString = dr["DealCommittmentDateString"].ToString(),
        //                        DealCommitted = Convert.ToInt64(dr["DealCommitted"].ToString()),
        //                        Notes = dr["Notes"].ToString(),
        //                    }) ;
        //                }
        //            }
        //        }
        //    }
        //    return SelectionItemsinfo;
        //}
        public List<RetailDealTermsInfo> RetailDealTermsGetInfo(String sDealID)
        {
            List<RetailDealTermsInfo> SelectionItemsinfo = new List<RetailDealTermsInfo>();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[RetailDealTermsGetInfo]";
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = SqlCommandText;
                    sDealID = sDealID.Replace("\"", "");
                    sDealID = sDealID.Replace("\"", "");
                    sDealID = sDealID.Trim();
                    if ((sDealID != null) && (sDealID.ToLower() != "null"))
                    {
                        Int64 iDeal = Convert.ToInt64(sDealID);
                        cmd.Parameters.AddWithValue("@RetailDealID", iDeal);
                    }

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
                            SelectionItemsinfo.Add(new RetailDealTermsInfo
                            {

                                RetailDealID = Convert.ToInt64(dr["RetailDealID"].ToString()),                                
                                Term = Convert.ToInt64(dr["Term"].ToString()),                                
                                TermDate = Convert.ToDateTime(dr["TermDate"].ToString()),
                                TermDateString = dr["TermDateString"].ToString(),                                                                
                                BrokerFee = Convert.ToDouble(dr["BrokerFee"].ToString()),
                                DealMargin= Convert.ToDouble(dr["DealMargin"].ToString()),
                                RiskPremium = Convert.ToDouble(dr["RiskPremium"].ToString()),                                
                            });
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }        
        public Int64 RetailDealUpsert(Int64 RetailDealID, String RetailDealName, Int64 CustomerID, Int64 BrokerID, String StartDate, String DealDate, String DealCommitted, String DealCommittmentDate, String Notes, String TermRecords, Int64 StatusOfRecordID)
        {
            try
            {                
                DataSet ds = new DataSet();
                string ConnectionString = ReturnConnectionString();
                Int64 CorrectReturn = 1;
                using (SqlConnection con = new SqlConnection(ConnectionString))
                {
                    using (SqlCommand cmd = new SqlCommand())
                    {
                        string SqlCommandText = "[WebSite].[RetailDealUpsert]";
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.CommandText = SqlCommandText;
                        cmd.Parameters.AddWithValue("@RetailDealID", RetailDealID);                        
                        if (RetailDealName !=null) { cmd.Parameters.AddWithValue("@RetailDealName", RetailDealName); }
                        cmd.Parameters.AddWithValue("@CustomerID", CustomerID);
                        cmd.Parameters.AddWithValue("@BrokerID", BrokerID);
                        if (StartDate != null) { cmd.Parameters.AddWithValue("@StartDate", StartDate); }
                        if (DealDate != null) { cmd.Parameters.AddWithValue("@DealDate", DealDate); }
                        if (DealCommitted != null) { cmd.Parameters.AddWithValue("@DealCommitted", Convert.ToInt64(DealCommitted)); }
                        if (DealCommittmentDate != null) { cmd.Parameters.AddWithValue("@DealCommittmentDate", DealCommittmentDate); }
                        if (Notes != null) { cmd.Parameters.AddWithValue("@Notes", Notes); }
                        if (TermRecords != null) { cmd.Parameters.AddWithValue("@TermRecords", TermRecords); }
                        cmd.Parameters.AddWithValue("@StatusOfRecordID", StatusOfRecordID);
                        cmd.Connection = con;
                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            da.Fill(ds, "SelectionItems");
                        }
                    }
                }
                return CorrectReturn;
            }
            catch (Exception ex)
            {
                String Msg = ex.Message.ToString();
                Int64 IncorrectReturn = 0;
                return IncorrectReturn;
            }
        }
        public List<SelectorType> DealGetInfo(String CustomerID)
        {

            List<SelectorType> SelectionItemsinfo = new List<SelectorType>();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[DealAllGetInfo]";
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = SqlCommandText;
                    if (CustomerID != null)
                    {
                        cmd.Parameters.AddWithValue("@CustomerID", CustomerID);
                    }

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
                                SelectorID = dr["dealid"].ToString(),
                                SelectorText = dr["dealnumber"].ToString(),
                            });
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }
        public WholeSaleDeal AllWholeSaleDealUpsert(Int64 WholeSaleDealID, String WholeSaleDealName, Int64 ISOID, Int64 CounterPartyID, Int64 SecondCounterPartyID, Int64 SettlementPointID, Int64 SetLocationID, Int64 WholeSaleBlockID, DateTime StartDate, DateTime DealDate, DateTime EndDate, Double VolumeMW, Double VolumeMWh, Double Price, Double Fee, Double Cost, Double MTM, Int64 Committed)
        {
            WholeSaleDeal SelectionItemsinfo = new WholeSaleDeal();                        
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[WholeSaleDealUpsert]";
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = SqlCommandText;
                    cmd.Parameters.AddWithValue("@WholeSaleDealID", WholeSaleDealID);
                    cmd.Parameters.AddWithValue("@WholeSaleDealName", WholeSaleDealName);
                    cmd.Parameters.AddWithValue("@ISOID", ISOID);
                    cmd.Parameters.AddWithValue("@CounterPartyID", CounterPartyID);
                    cmd.Parameters.AddWithValue("@SecondCounterPartyID", SecondCounterPartyID);
                    cmd.Parameters.AddWithValue("@SettlementPointID", SettlementPointID);
                    cmd.Parameters.AddWithValue("@SetLocationID", SetLocationID);
                    cmd.Parameters.AddWithValue("@WholeSaleBlockID", WholeSaleBlockID);
                    if (CheckDate(StartDate.ToShortDateString())==true) { cmd.Parameters.AddWithValue("@StartDate", StartDate); }
                    if (CheckDate(DealDate.ToShortDateString()) == true) { cmd.Parameters.AddWithValue("@DealDate", DealDate); }
                    if (CheckDate(EndDate.ToShortDateString()) == true) { cmd.Parameters.AddWithValue("@EndDate", EndDate); }                    
                    cmd.Parameters.AddWithValue("@VolumeMW", VolumeMW);
                    cmd.Parameters.AddWithValue("@VolumeMWh", VolumeMWh);
                    cmd.Parameters.AddWithValue("@Price", Price);
                    cmd.Parameters.AddWithValue("@Fee", Fee);
                    cmd.Parameters.AddWithValue("@Cost", Cost);
                    cmd.Parameters.AddWithValue("@MTM", MTM);
                    cmd.Parameters.AddWithValue("@Committed", Committed);
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


                            SelectionItemsinfo.WholeSaleDealID = Convert.ToInt64(dr["WholeSaleDealID"].ToString());
                            SelectionItemsinfo.WholeSaleDealName = dr["WholeSaleDealName"].ToString();
                            SelectionItemsinfo.ISOID = Convert.ToInt64(dr["ISOID"].ToString());
                            SelectionItemsinfo.CounterPartyID = Convert.ToInt64(dr["CounterPartyID"].ToString());
                            SelectionItemsinfo.SecondCounterPartyID = Convert.ToInt64(dr["SecondCounterPartyID"].ToString());
                            SelectionItemsinfo.SettlementPointID = Convert.ToInt64(dr["SettlementPointID"].ToString());
                            SelectionItemsinfo.SetLocationID = Convert.ToInt64(dr["SetLocationID"].ToString());
                            SelectionItemsinfo.WholeSaleBlockID = Convert.ToInt64(dr["WholeSaleBlockID"].ToString());
                            SelectionItemsinfo.DealDate = dr["DealDate"].ToString();
                            SelectionItemsinfo.StartDate = dr["StartDate"].ToString();
                            SelectionItemsinfo.EndDate = dr["EndDate"].ToString();
                            SelectionItemsinfo.VolumeMW = Convert.ToDouble(dr["VolumeMW"].ToString());
                            SelectionItemsinfo.VolumeMWh = Convert.ToDouble(dr["VolumeMWh"].ToString());
                            SelectionItemsinfo.Price = Convert.ToDouble(dr["Price"].ToString());
                            SelectionItemsinfo.Fee = Convert.ToDouble(dr["Fee"].ToString());
                            SelectionItemsinfo.Cost = Convert.ToDouble(dr["Cost"].ToString());
                            SelectionItemsinfo.MTM = Convert.ToDouble(dr["MTM"].ToString());
                            SelectionItemsinfo.DealCommitted = Convert.ToInt64(dr["DealCommitted"].ToString());
                            SelectionItemsinfo.DealCommittmentDate = dr["DealCommittmentDate"].ToString();
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }
        public List<WholeSaleDeal> AllWholeSaleDealsGetInfo(String DealIDString)
        {
            List<WholeSaleDeal> SelectionItemsinfo = new List<WholeSaleDeal>();
            Int64 DealID;
            DealID = 0;
            if (DealIDString != null)
            {
                DealID = Convert.ToInt64(DealIDString);
            }
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[WholeSaleDealGetInfo]";
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = SqlCommandText;                    
                    cmd.Parameters.AddWithValue("@WholeSaleDealID", DealID);
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
                            SelectionItemsinfo.Add(new WholeSaleDeal
                            {
                                WholeSaleDealID = Convert.ToInt64(dr["WholeSaleDealID"].ToString()),
                                WholeSaleDealName = dr["WholeSaleDealName"].ToString(),
                                ISOID = Convert.ToInt64(dr["ISOID"].ToString()),
                                CounterPartyID = Convert.ToInt64(dr["CounterPartyID"].ToString()),
                                SecondCounterPartyID = Convert.ToInt64(dr["SecondCounterPartyID"].ToString()),
                                SettlementPointID = Convert.ToInt64(dr["SettlementPointID"].ToString()),
                                SetLocationID = Convert.ToInt64(dr["SetLocationID"].ToString()),
                                WholeSaleBlockID = Convert.ToInt64(dr["WholeSaleBlockID"].ToString()),
                                DealDate = dr["DealDate"].ToString(),
                                StartDate = dr["StartDate"].ToString(),
                                EndDate = dr["EndDate"].ToString(),
                                VolumeMW = Convert.ToDouble(dr["VolumeMW"].ToString()),
                                VolumeMWh = Convert.ToDouble(dr["VolumeMWh"].ToString()),
                                Price = Convert.ToDouble(dr["Price"].ToString()),
                                Fee = Convert.ToDouble(dr["Fee"].ToString()),
                                Cost = Convert.ToDouble(dr["Cost"].ToString()),
                                MTM = Convert.ToDouble(dr["MTM"].ToString()),
                                DealCommitted = Convert.ToInt64(dr["DealCommitted"].ToString()),
                                DealCommittmentDate = dr["DealCommittmentDate"].ToString(),
                        }); 
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }
        public List<SelectorType> AllCounterPartiesGetInfo()
        {
            List<SelectorType> SelectionItemsinfo = new List<SelectorType>();
            String StoredProcedure = "[WebSite].[CounterPartyGetInfoGetInfo]";
            String IDField = "CounterPartyID";
            String TextField = "CounterParty";
            SelectionItemsinfo = GetSelectTypeList(StoredProcedure, IDField, TextField);
            return SelectionItemsinfo;
        }

        public List<SelectorType> AllISOGetInfo()
        {
            List<SelectorType> SelectionItemsinfo = new List<SelectorType>();
            String StoredProcedure = "[WebSite].[ISOGetInfo]";
            String IDField = "ISOID";
            String TextField = "ISOShortName";
            SelectionItemsinfo = GetSelectTypeList(StoredProcedure, IDField, TextField);
            return SelectionItemsinfo;
        }
        public List<SelectorType> AllSetPointGetInfo()
        {
            List<SelectorType> SelectionItemsinfo = new List<SelectorType>();
            String StoredProcedure = "[WebSite].[SetPointGetInfo]";
            String IDField = "SetPointID";
            String TextField = "SetPoint";
            SelectionItemsinfo = GetSelectTypeList(StoredProcedure, IDField, TextField);
            return SelectionItemsinfo;
        }

        public List<SelectorType> AllBrokersGetInfo()
        {
            List<SelectorType> SelectionItemsinfo = new List<SelectorType>();
            String StoredProcedure = "[WebSite].[BrokerNamesAllGetInfo]";
            String IDField = "BrokerID";
            String TextField = "BrokerName";
            SelectionItemsinfo = GetSelectTypeList(StoredProcedure, IDField, TextField);
            return SelectionItemsinfo;
        }


        private List<SelectorType> GetSelectTypeList(String StoredProcedure, String IDField, String TextField) 
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
                                SelectorID = dr[IDField].ToString(),
                                SelectorText = dr[TextField].ToString(),
                            });
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }
        //



        public List<SelectorType> PricingTermsGetInfo(String TypeID)
        {

            List<SelectorType> SelectionItemsinfo = new List<SelectorType>();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[PricingTermsGetInfo]";
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = SqlCommandText;
                    if (TypeID == null) { TypeID = "0"; }
                    cmd.Parameters.AddWithValue("@TypeID", TypeID);
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
                                SelectorID = dr["Term"].ToString(),
                                SelectorText = dr["Term"].ToString(),
                            });
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }

        
        
        public List<SelectorType> PricingCategoryGetInfo()
        {

            List<SelectorType> SelectionItemsinfo = new List<SelectorType>();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[PricingCategoryGetInfo]";
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
                                SelectorID = dr["PricingCategoryID"].ToString(),
                                SelectorText = dr["PricingCategory"].ToString(),
                            });
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }
        public List<SelectorType> SubPricingCategoryGetInfo()
        {

            List<SelectorType> SelectionItemsinfo = new List<SelectorType>();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[PricingSubCategoryGetInfo]";
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
                                SelectorID = dr["SubPricingCategoryID"].ToString(),
                                SelectorText = dr["SubPricingCategory"].ToString(),
                            });
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }
        public List<SelectorType> PricingDealStartDates()
        {

            List<SelectorType> SelectionItemsinfo = new List<SelectorType>();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[DealStartDatesGetInfo]";
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
                                SelectorID = dr["StartDateID"].ToString(),
                                SelectorText = dr["StartDate"].ToString(),
                            });
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }
        public List<DealInfoID> DealAllInfoGetInfo(String CustomerID)
        {
            List<DealInfoID> SelectionItemsinfo = new List<DealInfoID>();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[DealAllGetInfo]";
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = SqlCommandText;
                    if (CustomerID != null)
                    {
                        cmd.Parameters.AddWithValue("@CustomerID", CustomerID);
                    }

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
                            SelectionItemsinfo.Add(new DealInfoID
                            {

                                CustomerID = Convert.ToInt64(dr["customerid"].ToString()),
                                CustomerName = dr["customername"].ToString(),
                                Active = Convert.ToBoolean(dr["CustActive"].ToString()),
                                DealID = Convert.ToInt64(dr["dealid"].ToString()),
                                DealNumber = dr["dealnumber"].ToString(),
                                DealName = dr["dealname"].ToString(),
                                StartDate = Convert.ToDateTime(dr["startdate"].ToString()),
                                EndDate = Convert.ToDateTime(dr["enddate"].ToString()),
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

        public List<SelectorType> RiskWholeSaleTradeSettlementPositionAllMonthsGetInfo()
        {

            List<SelectorType> SelectionItemsinfo = new List<SelectorType>();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[RiskWholeSaleTradeSettlementPositionAllMonthsGetInfo]";
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
                                SelectorID = dr["MonthlyDatesID"].ToString(),
                                SelectorText = dr["MonthlyDatesFormat"].ToString(),
                            });
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }

        public List<SelectorType> RiskHourlyPositionAllMonthsGetInfo()
        {

            List<SelectorType> SelectionItemsinfo = new List<SelectorType>();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[RiskHourlyPositionAllMonthsGetInfo]";
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
                                SelectorID = dr["MonthlyDatesID"].ToString(),
                                SelectorText = dr["MonthlyDatesFormat"].ToString(),
                            });
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }


        public List<SelectorType> AllLineOfBusinessGetInfo()
        {

            List<SelectorType> SelectionItemsinfo = new List<SelectorType>();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[LineOfBusinessGetInfo]";
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
                                SelectorID = dr["LineOfBusinessID"].ToString(),
                                SelectorText = dr["LineOfBusiness"].ToString(),                                
                            });
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }

        public List<SelectorType> AllWeatherScenariosGetInfo()
        {

            List<SelectorType> SelectionItemsinfo = new List<SelectorType>();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[WeatherScenarioAllGetInfo]";
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
                                SelectorID = dr["WeatherScenarioID"].ToString(),
                                SelectorText = dr["WeatherScenario"].ToString(),
                            });
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }
        public List<SelectorType> AllWholeSaleBlocksGetInfo()
        {

            List<SelectorType> SelectionItemsinfo = new List<SelectorType>();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[WholeSaleBlocksAllGetInfo]";
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
                                SelectorID = dr["WholeSaleBlocksID"].ToString(),
                                SelectorText = dr["WholeSaleBlocks"].ToString(),
                                Color = dr["Color"].ToString(),
                            });
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }

        public List<SelectorType> AllCongestionZonesGetInfo()
        {

            List<SelectorType> SelectionItemsinfo = new List<SelectorType>();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[CongestionZonesAllGetInfo]";
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
                                SelectorID = dr["CongestionZonesID"].ToString(),
                                SelectorText = dr["CongestionZones"].ToString(),
                            });
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }

        public List<SelectorType> AllCounterPartyGetInfo()
        {

            List<SelectorType> SelectionItemsinfo = new List<SelectorType>();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[CounterPartyGetInfoGetInfo]";
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
                                SelectorID = dr["CounterPartyID"].ToString(),
                                SelectorText = dr["CounterParty"].ToString(),
                            });
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }

        public List<SelectorType> AllAccountsGetInfo()
        {

            List<SelectorType> SelectionItemsinfo = new List<SelectorType>();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[UtilityAccountNumbersAllGetInfo]";
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
                                SelectorID = dr["UtilityAccountNumberId"].ToString(),
                                SelectorText = dr["UtilityAccountNumber"].ToString(),
                            });
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }

        public List<SelectorType> HoursGetInfo()
        {

            List<SelectorType> SelectionItemsinfo = new List<SelectorType>();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[HoursGetInfo]";
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
                                SelectorText = dr["HourID"].ToString(),
                                SelectorID = dr["HourID"].ToString(),
                            });
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }
        
        public List<MonthlyGraph> MonthlyDataGetInfo()
        {

            List<MonthlyGraph> SelectionItemsinfo = new List<MonthlyGraph>();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[Dev3].[MonthlyAllGetInfo]";
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
                            SelectionItemsinfo.Add(new MonthlyGraph
                            {
                                Month = dr["XMonth"].ToString(),
                                First = Convert.ToDouble(dr["2X16"].ToString()),
                                Second = Convert.ToDouble(dr["5x16"].ToString()),
                                Third = Convert.ToDouble(dr["7x8"].ToString()),
                            }); ;
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }
        #endregion

        // Azure Upload Calls
        #region
        // Transfering of Files
        //public Stream DownloadFile(string fileName, string fileExtension)
        //{
        //    string downloadFilePath =
        //    Path.Combine(HostingEnvironment.MapPath
        //    ("~/FileServer/Extracts"), fileName + "." + fileExtension);

        //    //Write logic to create the file
        //    File.Create(downloadFilePath);

        //    String headerInfo = "attachment; filename=" + fileName + "." + fileExtension;
        //    WebOperationContext.Current.OutgoingResponse.Headers["Content-Disposition"] = headerInfo;

        //    WebOperationContext.Current.OutgoingResponse.ContentType = "application/octet-stream";

        //    return File.OpenRead(downloadFilePath);
        //}

        //public void UploadFile(string fileName, Stream stream)
        //{
        //    //Parse the connection string and return a reference to the storage account.
        //    CloudStorageAccount storageAccount = CloudStorageAccount.Parse(ReturnSASKey());

        //    //Create the blob client object.
        //    CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();

        //    //Get a reference to a container to use for the sample code, and create it if it does not exist.
        //    CloudBlobContainer container = blobClient.GetContainerReference("clientstorage");
        //    container.CreateIfNotExists();

        //    //string FilePath = Path.Combine(HostingEnvironment.MapPath("~/FileServer/Uploads"), fileName);
        //    //String SASKeyProfessional= ReturnSASKey();
        //    //String tempKey = SASKeyProfessional;
        //    //int length = 0;
        //    //using (FileStream writer = new FileStream(FilePath, FileMode.Create))
        //    //{
        //    //    int readCount;
        //    //    var buffer = new byte[8192];
        //    //    while ((readCount = stream.Read(buffer, 0, buffer.Length)) != 0)
        //    //    {
        //    //        writer.Write(buffer, 0, readCount);
        //    //        length += readCount;
        //    //    }
        //    //}            
        //}
        // Transfering of Files
        #endregion
        // General Calls
        #region 
        public AzureParameters ObtainAzureParameters(string FileType)
        {
            AzureParameters AzureParms = new AzureParameters();
            AzureParms.AzureStorageName = "riskdeskstorage";
            AzureParms.AzureContainer = "currentclient";
            FileType = FileType.ToUpper();
            FileType = FileType.Trim();
            if (FileType == "DEAL")
            {
                AzureParms.AzureContainer = "riskdeal";
            }
            else if (FileType == "CUST")
            {
                AzureParms.AzureContainer = "riskcust";
            }
            else if (FileType == "FACL")
            {
                AzureParms.AzureContainer = "riskfacility";
            }
            else if (FileType == "ACC")
            {
                AzureParms.AzureContainer = "riskaccounts";
            }
            else if (FileType == "ICECURVE")
            {
                AzureParms.AzureContainer = "icecurves";
            }
            AzureParms.AzureContainer = "vrd";
            // Good through the End of The Year
            AzureParms.SASKey = "?sv=2017-11-09&ss=b&srt=sco&sp=rwdlac&se=2018-12-31T06:00:00Z&st=2018-09-11T21:51:59Z&spr=https,http&sig=DAOv%2B4th07M6Te7PSZlebvoz9%2FYuNSCZOPFsOyb%2BqLM%3D";
            AzureParms.SASKey = "?sv=2018-03-28&ss=b&srt=sco&sp=rwdlac&se=2020-01-01T07:50:25Z&st=2019-03-29T22:50:25Z&spr=https&sig=S5WciMmg99VPA42YsszU%2FxiG9GV0x3kZOCdAi0Gi2n0%3D";
            // 2019 to 2020
            AzureParms.SASKey = "?sv=2018-03-28&ss=b&srt=sco&sp=rwdlac&se=2020-04-07T22:55:30Z&st=2019-04-07T14:55:30Z&spr=https&sig=yiMaA2sUwPRFYFnjv8aMuy4p2Qyrd9rvwfrI2rl5iDY%3D";

            AzureParms.SASKey = "?sv=2019-10-10&ss=b&srt=co&sp=rwdlacx&se=2021-05-14T08:56:44Z&st=2020-05-14T00:56:44Z&spr=https&sig=Sx9F6xHiEuiD95ZxTa3wybWo1fPHIPHJ37k%2BHkrn8rA%3D";
            AzureParms.blobUri = "https://riskdeskstorage.blob.core.windows.net";

            return AzureParms;
        }

        public String ObtainDateSuffix(String FileName)
        {
            DateTime CD = System.DateTime.UtcNow;
            String ReturnString = "_" + CD.Year.ToString() + "_" + CD.Month.ToString() + "_" + CD.Day.ToString() + "_" + CD.Hour.ToString() + "_" + CD.Second.ToString();
            Int32 loc = 0;
            loc = FileName.LastIndexOf(".");
            if (loc != -1)
            {
                String Exten = "";
                Exten = FileName.Substring(loc, FileName.Length - loc);
                FileName = FileName.Substring(0, loc);
                ReturnString = FileName + ReturnString + Exten;
            }
            else
            {
                ReturnString = FileName + ReturnString;
            }
            return ReturnString;
        }
        // Starting Graphs
        public List<HourlyScalerGraphView> HourlyScalarGetInfo(String WholeBlockString, String CongestionZoneString, String MonthsString, String UtilityAccountString, String CustomersString)
        {
            List<HourlyScalerGraphView> SelectionItemsinfo = new List<HourlyScalerGraphView>();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con  = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[HourlyScalarFilteredGetInfo]";
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = SqlCommandText;
                    cmd.Parameters.AddWithValue("@WholeBlockString", WholeBlockString);
                    if (CongestionZoneString != null)
                    {
                        cmd.Parameters.AddWithValue("@CongestionZoneString", CongestionZoneString);
                    }
                    if (MonthsString != null)
                    {
                        cmd.Parameters.AddWithValue("@MonthsString", MonthsString);
                    }
                    if (UtilityAccountString != null)
                    {
                        cmd.Parameters.AddWithValue("@UtilityAccountNumberString", UtilityAccountString);
                    }
                    if (CustomersString != null)
                    {
                        cmd.Parameters.AddWithValue("@CustomersString ", CustomersString);
                    }
                    //cmd.Parameters.AddWithValue("@UserName", UserName);
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
                        if (ds != null)
                        {
                            if (ds.Tables.Count > 0)
                            {
                                if (ds.Tables["SelectionItems"].Rows.Count > 0)
                                {
                                    foreach (DataRow dr in ds.Tables["SelectionItems"].Rows)
                                    {
                                        SelectionItemsinfo.Add(new HourlyScalerGraphView
                                        {
                                            WholeSaleBlocksID = Convert.ToInt64(dr["WholeSaleBlocksID"].ToString()),
                                            WholeSaleBlocks = dr["WholeSaleBlocks"].ToString(),
                                            HE = Convert.ToDouble(dr["HE"].ToString()),
                                            pbar = Convert.ToDouble(dr["pbar"].ToString()),
                                            ubar = Convert.ToDouble(dr["ubar"].ToString()),
                                            sigmau = Convert.ToDouble(dr["sigmau"].ToString()),
                                            tbar = Convert.ToDouble(dr["tbar"].ToString()),
                                            AT = Convert.ToDouble(dr["AT"].ToString()),
                                        });
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }

        public List<VolumetricRiskTableGraphView> VolumetricRiskTableGraphsGetInfo(String WholeBlockString, String CongestionZoneString, String MonthsString, String UtilityAccountString)
        {
            List<VolumetricRiskTableGraphView> SelectionItemsinfo = new List<VolumetricRiskTableGraphView>();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[RiskFilteredTableGetInfo]";
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = SqlCommandText;
                    //cmd.Parameters.AddWithValue("@WholeBlockString", WholeBlockString);
                    if (CongestionZoneString != null)
                    {
                        cmd.Parameters.AddWithValue("@CongestionZoneString", CongestionZoneString);
                    }
                    if (UtilityAccountString != null)
                    {
                        cmd.Parameters.AddWithValue("@UtilityAccountNumberString", UtilityAccountString);
                    }
                    if (MonthsString != null)
                    {
                        cmd.Parameters.AddWithValue("@MonthsString", MonthsString);
                    }
                    //cmd.Parameters.AddWithValue("@UserName", UserName);
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
                        if (ds != null)
                        {
                            if (ds.Tables.Count > 0)
                            {
                                if (ds.Tables["SelectionItems"].Rows.Count > 0)
                                {
                                    foreach (DataRow dr in ds.Tables["SelectionItems"].Rows)
                                    {
                                        SelectionItemsinfo.Add(new VolumetricRiskTableGraphView
                                        {

                                            CostType = dr["CostType"].ToString(),
                                            Jan = Convert.ToDouble(dr["1"].ToString()),
                                            Feb = Convert.ToDouble(dr["2"].ToString()),
                                            Mar = Convert.ToDouble(dr["3"].ToString()),
                                            Apr = Convert.ToDouble(dr["4"].ToString()),
                                            May = Convert.ToDouble(dr["5"].ToString()),
                                            Jun = Convert.ToDouble(dr["6"].ToString()),
                                            Jul = Convert.ToDouble(dr["7"].ToString()),
                                            Aug = Convert.ToDouble(dr["8"].ToString()),
                                            Sep = Convert.ToDouble(dr["9"].ToString()),
                                            Oct = Convert.ToDouble(dr["10"].ToString()),
                                            Nov = Convert.ToDouble(dr["11"].ToString()),
                                            Dec = Convert.ToDouble(dr["12"].ToString()),
                                        });
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return SelectionItemsinfo;

        }

        public List<MonthlyTableGraphView> MonthlyTableGraphsGetInfo(String WholeBlockString, String CongestionZoneString, String MonthsString, String UtilityAccountString)
        {
            List<MonthlyTableGraphView> SelectionItemsinfo = new List<MonthlyTableGraphView>();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[MonthlyTableFilteredGetInfo]";
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = SqlCommandText;
                    cmd.Parameters.AddWithValue("@WholeBlockString", WholeBlockString);
                    if (CongestionZoneString != null)
                    {
                        cmd.Parameters.AddWithValue("@CongestionZoneString", CongestionZoneString);
                    }
                    if (MonthsString != null)
                    {
                        cmd.Parameters.AddWithValue("@MonthsString", MonthsString);
                    }
                    if (UtilityAccountString != null)
                    {
                        cmd.Parameters.AddWithValue("@UtilityAccountNumberString", UtilityAccountString);
                    }
                    //cmd.Parameters.AddWithValue("@UserName", UserName);
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
                        if (ds != null)
                        {
                            if (ds.Tables.Count > 0)
                            {
                                if (ds.Tables["SelectionItems"].Rows.Count > 0)
                                {
                                    foreach (DataRow dr in ds.Tables["SelectionItems"].Rows)
                                    {
                                        SelectionItemsinfo.Add(new MonthlyTableGraphView
                                        {

                                            WholeSaleBlocks = dr["WholeSaleBlocks"].ToString(),
                                            Jan = Convert.ToDouble(dr["Jan"].ToString()),
                                            Feb = Convert.ToDouble(dr["Feb"].ToString()),
                                            Mar = Convert.ToDouble(dr["Mar"].ToString()),
                                            Apr = Convert.ToDouble(dr["Apr"].ToString()),
                                            May = Convert.ToDouble(dr["May"].ToString()),
                                            Jun = Convert.ToDouble(dr["Jun"].ToString()),
                                            Jul = Convert.ToDouble(dr["Jul"].ToString()),
                                            Aug = Convert.ToDouble(dr["Aug"].ToString()),
                                            Sep = Convert.ToDouble(dr["Sep"].ToString()),
                                            Oct = Convert.ToDouble(dr["Oct"].ToString()),
                                            Nov = Convert.ToDouble(dr["Nov"].ToString()),
                                            Dec = Convert.ToDouble(dr["Dec"].ToString()),
                                        });
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return SelectionItemsinfo;

        }
        
        public List<HourlyScalarTableGraphView> HourlyScalarTableGraphsGetInfo(String WholeBlockString, String CongestionZoneString, String MonthsString, String UtilityAccountString)
        {
            List<HourlyScalarTableGraphView> SelectionItemsinfo = new List<HourlyScalarTableGraphView>();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[HourlyScalarTableFilteredGetInfo]";
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = SqlCommandText;
                    cmd.Parameters.AddWithValue("@WholeBlockString", WholeBlockString);
                    if (CongestionZoneString != null)
                    {
                        cmd.Parameters.AddWithValue("@CongestionZoneString", CongestionZoneString);
                    }
                    if (MonthsString != null)
                    {
                        cmd.Parameters.AddWithValue("@MonthsString", MonthsString);
                    }
                    if (UtilityAccountString != null)
                    {
                        cmd.Parameters.AddWithValue("@UtilityAccountNumberString", UtilityAccountString);
                    }
                    //cmd.Parameters.AddWithValue("@UserName", UserName);
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
                        if (ds != null)
                        {
                            if (ds.Tables.Count > 0)
                            {
                                if (ds.Tables["SelectionItems"].Rows.Count > 0)
                                {
                                    foreach (DataRow dr in ds.Tables["SelectionItems"].Rows)
                                    {
                                        SelectionItemsinfo.Add(new HourlyScalarTableGraphView
                                        {
                                            WholeSaleBlocks = dr["WholeSaleBlocks"].ToString(),
                                            H_1 = Convert.ToDouble(dr["1"].ToString()),
                                            H_2 = Convert.ToDouble(dr["2"].ToString()),
                                            H_3 = Convert.ToDouble(dr["3"].ToString()),
                                            H_4 = Convert.ToDouble(dr["4"].ToString()),
                                            H_5 = Convert.ToDouble(dr["5"].ToString()),
                                            H_6 = Convert.ToDouble(dr["6"].ToString()),
                                            H_7 = Convert.ToDouble(dr["7"].ToString()),
                                            H_8 = Convert.ToDouble(dr["8"].ToString()),
                                            H_9 = Convert.ToDouble(dr["9"].ToString()),
                                            H_10 = Convert.ToDouble(dr["10"].ToString()),
                                            H_11 = Convert.ToDouble(dr["11"].ToString()),
                                            H_12 = Convert.ToDouble(dr["12"].ToString()),
                                            H_13 = Convert.ToDouble(dr["13"].ToString()),
                                            H_14 = Convert.ToDouble(dr["14"].ToString()),
                                            H_15 = Convert.ToDouble(dr["15"].ToString()),
                                            H_16 = Convert.ToDouble(dr["16"].ToString()),
                                            H_17 = Convert.ToDouble(dr["17"].ToString()),
                                            H_18 = Convert.ToDouble(dr["18"].ToString()),
                                            H_19 = Convert.ToDouble(dr["19"].ToString()),
                                            H_20 = Convert.ToDouble(dr["20"].ToString()),
                                            H_21 = Convert.ToDouble(dr["21"].ToString()),
                                            H_22 = Convert.ToDouble(dr["22"].ToString()),
                                            H_23 = Convert.ToDouble(dr["23"].ToString()),
                                            H_24 = Convert.ToDouble(dr["24"].ToString()),
                                        });
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return SelectionItemsinfo;

        }
                
        public List<VolumetricRiskGraphView> VolumetricRiskGetInfo(String WholeBlockString, String CongestionZoneString, String MonthsString, String UtilityAccountString, String CustomersString)
        {
            //xmlMonths,CongestionZoneString,xmlAccounts
            List<VolumetricRiskGraphView> SelectionItemsinfo = new List<VolumetricRiskGraphView>();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[RiskFilteredGetInfo]";
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = SqlCommandText;
                    //cmd.Parameters.AddWithValue("@WholeBlockString", WholeBlockString);
                    if (CongestionZoneString != null)
                    {
                        cmd.Parameters.AddWithValue("@CongestionZoneString", CongestionZoneString);
                    }
                    if (MonthsString != null)
                    {
                        cmd.Parameters.AddWithValue("@MonthsString", MonthsString);
                    }
                    if (UtilityAccountString != null)
                    {
                        cmd.Parameters.AddWithValue("@UtilityAccountNumberString", UtilityAccountString);
                    }
                    if (CustomersString != null)
                    {
                        cmd.Parameters.AddWithValue("@CustomersString", CustomersString);
                    }
                    //cmd.Parameters.AddWithValue("@UserName", UserName);
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
                        if (ds != null)
                        {
                            if (ds.Tables.Count > 0)
                            {
                                if (ds.Tables["SelectionItems"].Rows.Count > 0)
                                {
                                    foreach (DataRow dr in ds.Tables["SelectionItems"].Rows)
                                    {
                                        SelectionItemsinfo.Add(new VolumetricRiskGraphView
                                        {
                                            MonthID = Convert.ToInt32(dr["xMonth"].ToString()),
                                            MonthsLongName = dr["MonthsLongName"].ToString(),
                                            MonthsShortName = dr["MonthsShortName"].ToString(),
                                            VolRiskAdder = Convert.ToDouble(dr["RetailAdder"].ToString()),
                                            VolRiskStdDev = Convert.ToDouble(dr["volriskstdevNorm"].ToString()),
                                        });
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }
        public List<MonthlyGraphView> MonthlyGraphsGetInfo(String WholeBlockString, String CongestionZoneString, String MonthsString, String UtilityAccountString, String CustomersString)
        {
            //xmlMonths,CongestionZoneString,xmlAccounts
            List<MonthlyGraphView> SelectionItemsinfo = new List<MonthlyGraphView>();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[MonthlyFilteredGetInfo]";
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = SqlCommandText;
                    cmd.Parameters.AddWithValue("@WholeBlockString", WholeBlockString);
                    if (CongestionZoneString != null)
                    {
                        cmd.Parameters.AddWithValue("@CongestionZoneString", CongestionZoneString);
                    }
                    if (MonthsString != null)
                    {
                        cmd.Parameters.AddWithValue("@MonthsString", MonthsString);
                    }
                    if (UtilityAccountString != null)
                    {
                        cmd.Parameters.AddWithValue("@UtilityAccountNumberString", UtilityAccountString);
                    }
                    if (CustomersString != null)
                    {
                        cmd.Parameters.AddWithValue("@CustomersString", CustomersString);
                    }
                    
                    //cmd.Parameters.AddWithValue("@UserName", UserName);
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
                        if (ds != null)
                        {
                            if (ds.Tables.Count > 0)
                            {
                                if (ds.Tables["SelectionItems"].Rows.Count > 0)
                                {
                                    foreach (DataRow dr in ds.Tables["SelectionItems"].Rows)
                                    {
                                        SelectionItemsinfo.Add(new MonthlyGraphView
                                        {

                                            WholeSaleBlocksID = Convert.ToInt32(dr["WholeSaleBlocksID"].ToString()),
                                            WholeSaleBlocks = dr["WholeSaleBlocks"].ToString(),
                                            MonthsNamesID = Convert.ToInt32(dr["MonthsNamesID"].ToString()),
                                            MonthsShortName = dr["MonthsShortName"].ToString(),
                                            MonthsLongName = dr["MonthsLongName"].ToString(),
                                            ubarmwh = Convert.ToDouble(dr["ubarmwh"].ToString()),
                                            ubarMW = Convert.ToDouble(dr["ubarMW"].ToString()),
                                            Pbar = Convert.ToDouble(dr["Pbar"].ToString()),
                                            pshaped = Convert.ToDouble(dr["pshaped"].ToString()),
                                            pvolrisk = Convert.ToDouble(dr["pvolrisk"].ToString()),
                                            RetailRiskAdder = Convert.ToDouble(dr["RetailRiskAdder"].ToString()),
                                            RevatRiskMult = Convert.ToDouble(dr["RevatRiskMult"].ToString()),
                                        });
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }
        //************************************
        // Start Coincicence Peak Graphs
        //************************************
        public List<CoincidencePeakGraphView> CoincidencePeakGraphsGetInfo(String WeatherScenarioString, String UtilityAccountString, String MonthsString, String CustomersString)
        {
            //xmlMonths,CongestionZoneString,xmlAccounts
            List<CoincidencePeakGraphView> SelectionItemsinfo = new List<CoincidencePeakGraphView>();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[CoincidencePeakV2GetInfo]";
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = SqlCommandText;
                    cmd.Parameters.AddWithValue("@WeatherScenarioString", WeatherScenarioString);
                    if (UtilityAccountString != null)
                    {
                        cmd.Parameters.AddWithValue("@UtilityAccountNumberString", UtilityAccountString);
                    }
                    if (MonthsString != null)
                    {
                        cmd.Parameters.AddWithValue("@MonthsString", MonthsString);
                    }
                    if (CustomersString != null)
                    {
                        cmd.Parameters.AddWithValue("@CustomersString ", CustomersString);
                    }
                    cmd.Parameters.AddWithValue("@TblType", 1);
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
                        if (ds != null)
                        {
                            if (ds.Tables.Count > 0)
                            {
                                if (ds.Tables["SelectionItems"].Rows.Count > 0)
                                {
                                    foreach (DataRow dr in ds.Tables["SelectionItems"].Rows)
                                    {
                                        SelectionItemsinfo.Add(new CoincidencePeakGraphView
                                        {
                                            MonthID = Convert.ToInt32(dr["MonthsNamesID"].ToString()),
                                            MonthsShortName = dr["MonthsShortName"].ToString(),
                                            MonthsLongName = dr["MonthsLongName"].ToString(),
                                            Maxsysmax = Convert.ToDouble(dr["Maxsysmax"].ToString()),
                                            AvgCP = Convert.ToDouble(dr["AvgCP"].ToString()),
                                            AvgNCP = Convert.ToDouble(dr["AvgNCP"].ToString()),
                                            AvgCoincidenceFactor = Convert.ToDouble(dr["AvgCoincidenceFactor"].ToString()),
                                        });
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }
        // Table
        public List<CoincidencePeakTableView> CoincidencePeakTableGetInfo(String WeatherScenarioString, String UtilityAccountString, String MonthsString)
        {
            //xmlMonths,CongestionZoneString,xmlAccounts
            List<CoincidencePeakTableView> SelectionItemsinfo = new List<CoincidencePeakTableView>();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[CoincidencePeakV2GetInfo]";
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = SqlCommandText;
                    cmd.Parameters.AddWithValue("@WeatherScenarioString", WeatherScenarioString);
                    if (UtilityAccountString != null)
                    {
                        cmd.Parameters.AddWithValue("@UtilityAccountNumberString", UtilityAccountString);
                    }
                    if (MonthsString != null)
                    {
                        cmd.Parameters.AddWithValue("@MonthsString", MonthsString);
                    }
                    cmd.Parameters.AddWithValue("@TblType", 2);
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
                        if (ds != null)
                        {
                            if (ds.Tables.Count > 0)
                            {
                                if (ds.Tables["SelectionItems"].Rows.Count > 0)
                                {
                                    foreach (DataRow dr in ds.Tables["SelectionItems"].Rows)
                                    {
                                        SelectionItemsinfo.Add(new CoincidencePeakTableView
                                        {
                                            WeatherScenario = dr["WeatherScenario"].ToString(),
                                            Jan = dr["Jan"].ToString(),
                                            Feb = dr["Feb"].ToString(),
                                            Mar = dr["Mar"].ToString(),
                                            Apr = dr["Apr"].ToString(),
                                            May = dr["May"].ToString(),
                                            Jun = dr["Jun"].ToString(),
                                            July = dr["July"].ToString(),
                                            Aug = dr["Aug"].ToString(),
                                            Sept = dr["Sept"].ToString(),
                                            Oct = dr["Oct"].ToString(),
                                            Nov = dr["Nov"].ToString(),
                                            Dec = dr["Dec"].ToString(),
                                        });
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }
        //************************************
        // Start Scatter Plot Graphs
        //************************************

        //************************************
        // Start ErcotAnimation Graphs
        //************************************
        public List<ErcotAnimationGraphView> ErcotAnimationGraphsGetInfo(String WholeBlockString, String CongestionZoneString, String UtilityAccountString, String MonthsString, String HoursString)
        {
            //xmlMonths,CongestionZoneString,xmlAccounts
            List<ErcotAnimationGraphView> SelectionItemsinfo = new List<ErcotAnimationGraphView>();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[ErcotLoadAnimateFilteredGetInfo]";
                    //SqlCommandText = "[WebSite].[WeatherHourlyFilteredV2GetInfo]";
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = SqlCommandText;
                    cmd.Parameters.AddWithValue("@WholeBlockString", WholeBlockString);
                    if (CongestionZoneString != null)
                    {
                        cmd.Parameters.AddWithValue("@CongestionZoneString", CongestionZoneString);
                    }
                    if (UtilityAccountString != null)
                    {
                        cmd.Parameters.AddWithValue("@UtilityAccountNumberString", UtilityAccountString);
                    }
                    if (MonthsString != null)
                    {
                        cmd.Parameters.AddWithValue("@MonthsString", MonthsString);
                    }
                    if (HoursString != null)
                    {
                        cmd.Parameters.AddWithValue("@HoursString", HoursString);
                    }
                    //cmd.Parameters.AddWithValue("@UserName", UserName);
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
                        if (ds != null)
                        {
                            if (ds.Tables.Count > 0)
                            {
                                if (ds.Tables["SelectionItems"].Rows.Count > 0)
                                {
                                    foreach (DataRow dr in ds.Tables["SelectionItems"].Rows)
                                    {
                                        SelectionItemsinfo.Add(new ErcotAnimationGraphView
                                        {
                                            WholeSaleBlocksID = Convert.ToInt32(dr["WholeSaleBlocksID"].ToString()),
                                            WholeSaleBlocks = dr["WholeSaleBlocks"].ToString(),
                                            UtilityAccountNumber = dr["UtilityAccountNumber"].ToString(),
                                            XMonth = Convert.ToInt32(dr["XMONTH"].ToString()),
                                            HE = Convert.ToInt32(dr["HE"].ToString()),
                                            TempF = Convert.ToDouble(dr["TempF"].ToString()),
                                            RealTimePrice = Convert.ToDouble(dr["RealTimePrice"].ToString()),
                                            ErcotLoad = Convert.ToDouble(dr["ErcotLoad"].ToString()),
                                            LoadKW = Convert.ToDouble(dr["LoadKW"].ToString()),
                                        });
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }

        //************************************
        // Start Scatter Plot Graphs
        //************************************
        public List<ScatterPlotGraphView> ScatterPlotGraphsGetInfo(String WholeBlockString, String CongestionZoneString, String UtilityAccountString, String MonthsString, String HoursString)
        {
            //xmlMonths,CongestionZoneString,xmlAccounts
            List<ScatterPlotGraphView> SelectionItemsinfo = new List<ScatterPlotGraphView>();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[ScatterPlotFilteredGetInfo]";
                    //SqlCommandText = "[WebSite].[WeatherHourlyFilteredV2GetInfo]";
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = SqlCommandText;
                    cmd.Parameters.AddWithValue("@WholeBlockString", WholeBlockString);
                    if (CongestionZoneString != null)
                    {
                        cmd.Parameters.AddWithValue("@CongestionZoneString", CongestionZoneString);
                    }
                    if (UtilityAccountString != null)
                    {
                        cmd.Parameters.AddWithValue("@UtilityAccountNumberString", UtilityAccountString);
                    }
                    if (MonthsString != null)
                    {
                        cmd.Parameters.AddWithValue("@MonthsString", MonthsString);
                    }                    
                    if (HoursString != null)
                    {
                        cmd.Parameters.AddWithValue("@HoursString", HoursString);
                    }                   
                    //cmd.Parameters.AddWithValue("@UserName", UserName);
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
                        if (ds != null)
                        {
                            if (ds.Tables.Count > 0)
                            {
                                if (ds.Tables["SelectionItems"].Rows.Count > 0)
                                {
                                    foreach (DataRow dr in ds.Tables["SelectionItems"].Rows)
                                    {
                                        SelectionItemsinfo.Add(new ScatterPlotGraphView
                                        {
                                            WholeSaleBlocksID = Convert.ToInt32(dr["WholeSaleBlocksID"].ToString()),
                                            WholeSaleBlocks = dr["WholeSaleBlocks"].ToString(),
                                            TempF = Convert.ToDouble(dr["TempF"].ToString()),
                                            RealTimePrice = Convert.ToDouble(dr["RealTimePrice"].ToString()),
                                            ErcotLoad = Convert.ToDouble(dr["ErcotLoad"].ToString()),
                                            LoadKW = Convert.ToDouble(dr["LoadKW"].ToString()),
                                        });
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }
        //************************************
        // Ending Scatter Plot Graphs
        //************************************
        public List<WeatherScenarioGraphView> WeatherScenarioGraphsGetInfo(String WholeBlockString, String WeatherSCenario, String MonthsString, String UtilityAccountString, DateTime StartDate, DateTime EndDate, String CustomersString)
        {
            //xmlMonths,CongestionZoneString,xmlAccounts
            List<WeatherScenarioGraphView> SelectionItemsinfo = new List<WeatherScenarioGraphView>();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[WeatherHourlyFilteredGetInfo]";
                    //SqlCommandText = "[WebSite].[WeatherHourlyFilteredV2GetInfo]";
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = SqlCommandText;
                    cmd.Parameters.AddWithValue("@WholeBlockString", WholeBlockString);
                    if (WeatherSCenario != null)
                    {
                        cmd.Parameters.AddWithValue("@WeatherScenarioString", WeatherSCenario);
                    }
                    if (MonthsString != null)
                    {
                        cmd.Parameters.AddWithValue("@MonthsString", MonthsString);
                    }
                    if (UtilityAccountString != null)
                    {
                        cmd.Parameters.AddWithValue("@UtilityAccountNumberString", UtilityAccountString);
                    }
                    if (StartDate!= null)
                    {
                        cmd.Parameters.AddWithValue("@StartDate", StartDate);
                    }
                    if (EndDate!= null)
                    {
                        cmd.Parameters.AddWithValue("@EndDate", EndDate);
                    }                        
                    if (CustomersString != null)
                    {
                        cmd.Parameters.AddWithValue("@CustomersString ", CustomersString);
                    }


                    //cmd.Parameters.AddWithValue("@UserName", UserName);
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
                        if (ds != null)
                        {
                            if (ds.Tables.Count > 0)
                            {
                                if (ds.Tables["SelectionItems"].Rows.Count > 0)
                                {
                                    foreach (DataRow dr in ds.Tables["SelectionItems"].Rows)
                                    {
                                        SelectionItemsinfo.Add(new WeatherScenarioGraphView
                                        {

                                            MonthsNamesID = Convert.ToInt32(dr["MonthsNamesID"].ToString()),
                                            MonthsShortName = dr["MonthsShortName"].ToString(),
                                            MonthsLongName = dr["MonthsLongName"].ToString(),
                                            WeatherScenarioID = Convert.ToInt32(dr["WeatherScenarioID"].ToString()),
                                            WeatherScenario = dr["WeatherScenario"].ToString(),
                                            xDate = dr["xdate"].ToString(),
                                            TotalLoad = Convert.ToDouble(dr["TotalLoad"].ToString()),
                                        });
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }

        public Double WholeSaleBlockVolumeMWhCalc(Int64 WholeSaleBlockID, DateTime StartDate, DateTime EndDate, String MW)
        {
            try
            {
                Double SelectionItemsinfo = new Double();
                DataSet ds = new DataSet();
                string ConnectionString = ReturnConnectionString();
                //int NoBookOfBusinessInt;
                //NoBookOfBusinessInt = 1;
                using (SqlConnection con = new SqlConnection(ConnectionString))
                {
                    using (SqlCommand cmd = new SqlCommand())
                    {
                        string SqlCommandText = "[WebSite].[WholeSaleBlocksVolumeMWh]";
                        //SqlCommandText = "[WebSite].[WeatherHourlyFilteredV2GetInfo]";
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.CommandText = SqlCommandText;                        
                        cmd.Parameters.AddWithValue("@WholeSaleBlockID", WholeSaleBlockID);
                        cmd.Parameters.AddWithValue("@StartDate", StartDate);
                        cmd.Parameters.AddWithValue("@EndDate", EndDate);

                        if (MW != null)
                        {
                            Double dblMultiplier = System.Convert.ToDouble(MW);
                            cmd.Parameters.AddWithValue("@MW", dblMultiplier);
                        }
                        //cmd.Parameters.AddWithValue("@UserName", UserName);
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
                            if (ds != null)
                            {
                                if (ds.Tables.Count > 0)
                                {
                                    if (ds.Tables["SelectionItems"].Rows.Count > 0)
                                    {
                                        foreach (DataRow dr in ds.Tables["SelectionItems"].Rows)
                                        {
                                            
                                            SelectionItemsinfo = Convert.ToDouble(dr["SumHoursOfUse"].ToString());
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                return SelectionItemsinfo;
            } catch(Exception ex)
            {
                String EXMsg = ex.Message.ToString();
                return -1;
            }

        }


        public List<RiskMonthlyDetailsGraphView> RiskMonthlyDetailsGraphsGetInfo(String BookOfBusinessString, String LineOfBusinessString, String CongestionZoneString, DateTime StartDate, DateTime EndDate, int NoBookOfBusinessInt)
        {
            //xmlMonths,CongestionZoneString,xmlAccounts
            List<RiskMonthlyDetailsGraphView> SelectionItemsinfo = new List<RiskMonthlyDetailsGraphView>();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            //int NoBookOfBusinessInt;
            //NoBookOfBusinessInt = 1;
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[RiskMonthlyDetailsFilteredGetInfo]";
                    //SqlCommandText = "[WebSite].[WeatherHourlyFilteredV2GetInfo]";
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = SqlCommandText;

                    if ((StartDate != null) && (StartDate.Year>=1800) && (StartDate.Year <= 2200))
                    {
                        cmd.Parameters.AddWithValue("@StartDate", StartDate);
                    }
                    if ((EndDate != null) && (EndDate.Year >= 1800) && (EndDate.Year <= 2200))
                    {
                        cmd.Parameters.AddWithValue("@EndDate", EndDate);
                    }
                    if (BookOfBusinessString !=null)
                    {
                        cmd.Parameters.AddWithValue("@BookOfBusinessString", BookOfBusinessString);
                    }
                    if (LineOfBusinessString != null)
                    {
                        cmd.Parameters.AddWithValue("@LineOfBusinessString", LineOfBusinessString);
                    }
                    if (CongestionZoneString != null)
                    {
                        cmd.Parameters.AddWithValue("@CongestionZoneString", CongestionZoneString);
                    }
                    cmd.Parameters.AddWithValue("@NoBookOfBusiness", NoBookOfBusinessInt);
                    
                    //cmd.Parameters.AddWithValue("@UserName", UserName);
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
                        if (ds != null)
                        {
                            if (ds.Tables.Count > 0)
                            {
                                if (ds.Tables["SelectionItems"].Rows.Count > 0)
                                {
                                    foreach (DataRow dr in ds.Tables["SelectionItems"].Rows)
                                    {
                                        SelectionItemsinfo.Add(new RiskMonthlyDetailsGraphView
                                        {

                                            BookOfBusiness = dr["BookOfBusiness"].ToString(),
                                            DeliveryDate= (dr["deliverydate"].ToString()),
                                            DeliveryDateString = dr["DeliveryDateString"].ToString(),
                                            NetUsage = Convert.ToDouble(dr["NetUsage"].ToString()),
                                            GrossUsage = Convert.ToDouble(dr["GrossUsage"].ToString()),
                                            CostTotal = Convert.ToDouble(dr["CostTotal"].ToString()),
                                            C_Energy = Convert.ToDouble(dr["C_Energy"].ToString()),
                                            C_Losses = Convert.ToDouble(dr["C_Losses"].ToString()),
                                            C_Basis = Convert.ToDouble(dr["C_Basis"].ToString()),
                                            C_VolRisk = Convert.ToDouble(dr["C_VolRisk"].ToString()),
                                            C_ANC = Convert.ToDouble(dr["C_ANC"].ToString()),
                                            C_ADMIN_MISC = Convert.ToDouble(dr["C_ADMIN_MISC"].ToString()),
                                            C_CRR = Convert.ToDouble(dr["C_CRR"].ToString()),
                                            Revenue = Convert.ToDouble(dr["Revenue"].ToString()),
                                            NetRevenue = Convert.ToDouble(dr["NetRevenue"].ToString()),
                                        });
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }


        public List<LoadResearchBackCastView> LoadResearchBackCastGraphsGetInfo(String UtilityAccountNumberString, String WholeSaleBlockString, String HoursString, String LineOfBusinessString, String CustomersString, String MonthsString)
        {
            //xmlMonths,CongestionZoneString,xmlAccounts
            List<LoadResearchBackCastView> SelectionItemsinfo = new List<LoadResearchBackCastView>();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            //int NoBookOfBusinessInt;
            //NoBookOfBusinessInt = 1;
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[LoadResearchBackCastFilteredGetInfo]";
                    //SqlCommandText = "[WebSite].[WeatherHourlyFilteredV2GetInfo]";
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = SqlCommandText;
                    if (UtilityAccountNumberString != null)
                    {
                        cmd.Parameters.AddWithValue("@UtilityAccountNumberString", UtilityAccountNumberString);
                    }
                    if (WholeSaleBlockString != null)
                    {
                        cmd.Parameters.AddWithValue("@WholeBlockString", WholeSaleBlockString);
                    }
                    if (HoursString!= null)
                    {
                        cmd.Parameters.AddWithValue("@HoursString", HoursString);
                    }
                    if (LineOfBusinessString != null)
                    {
                        cmd.Parameters.AddWithValue("@LineOfBusinessString", LineOfBusinessString);
                    }                    
                    if (CustomersString != null)
                    {
                        cmd.Parameters.AddWithValue("@CustomersString", CustomersString);
                    }
                    if (MonthsString != null)
                    {
                        cmd.Parameters.AddWithValue("@MonthsString", MonthsString);
                    }                                        

                    //cmd.Parameters.AddWithValue("@UserName", UserName);
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
                        if (ds != null)
                        {
                            if (ds.Tables.Count > 0)
                            {
                                if (ds.Tables["SelectionItems"].Rows.Count > 0)
                                {
                                    foreach (DataRow dr in ds.Tables["SelectionItems"].Rows)
                                    {
                                        SelectionItemsinfo.Add(new LoadResearchBackCastView
                                        {

                                            tdb = Convert.ToDouble(dr["tdb"].ToString()),
                                            SumUsage = Convert.ToDouble(dr["SumUsage"].ToString()),
                                            SumBackCast = Convert.ToDouble(dr["SumBackCast"].ToString()),
                                        });
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }

        public RiskWholeSaleTradesGraphAndTableView RiskWholeSaleTradesGraphsAndTablesGetInfo()
        {
            //xmlMonths,CongestionZoneString,xmlAccounts
            RiskWholeSaleTradesGraphAndTableView SelectionItemsinfo = new RiskWholeSaleTradesGraphAndTableView();
            List<RiskWholeSaleTradesGraphView> RiskWholeSaleTradesGraph = new List<RiskWholeSaleTradesGraphView>();
            List<RiskWholeSaleTradesTableView> RiskWholeSaleTradesTable = new List<RiskWholeSaleTradesTableView>();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            //int NoBookOfBusinessInt;
            //NoBookOfBusinessInt = 1;
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[RiskWholeSaleTradesPositionGetInfo]";                    
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = SqlCommandText;
                    //if (StartDate != null)
                    //{
                    //    cmd.Parameters.AddWithValue("@StartDate", StartDate);
                    //}                    
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
                        if (ds != null)
                        {
                            if (ds.Tables.Count > 0)
                            {
                                if (ds.Tables[0].Rows.Count > 0)
                                {
                                    foreach (DataRow dr in ds.Tables[0].Rows)
                                    {
                                        RiskWholeSaleTradesTable.Add(new RiskWholeSaleTradesTableView
                                        {
                                            DealID = dr["dealid"].ToString(),
                                            DealDate = dr["dealdate"].ToString(),
                                            OtherCP = dr["counterparty"].ToString(),
                                            CounterParty = dr["othercp"].ToString(),
                                            StartDate = dr["startdate"].ToString(),
                                            EndDate = dr["enddate"].ToString(),
                                            SetPoint = dr["setpoint"].ToString(),
                                            SetLocation = dr["setlocation"].ToString(),
                                            Shape = dr["shape"].ToString(),
                                            VolumeMW = Convert.ToDouble(dr["VolumeMW_Calc"].ToString()),
                                            Price = Convert.ToDouble(dr["Price_Calc"].ToString()),
                                            Fee = Convert.ToDouble(dr["Fee_Calc"].ToString()),
                                            VolumeMWH = Convert.ToDouble(dr["VolumeMWH_Calc"].ToString()),
                                            Cost = Convert.ToDouble(dr["Cost_Calc"].ToString()),
                                            MTM = Convert.ToDouble(dr["MTM_Calc"].ToString()),
                                            GrossMargin = Convert.ToDouble(dr["GrossMargin_Calc"].ToString()),
                                        });
                                    }
                                }
                                if (ds.Tables[1].Rows.Count > 0)
                                {
                                    foreach (DataRow dr in ds.Tables[1].Rows)
                                    {
                                        RiskWholeSaleTradesGraph.Add(new RiskWholeSaleTradesGraphView
                                        {
                                            CounterParty = dr["counterparty"].ToString(),
                                            VolumeMW = Convert.ToDouble(dr["VolumeMW_Calc"].ToString()),
                                            Price = Convert.ToDouble(dr["Price_Calc"].ToString()),
                                            Fee = Convert.ToDouble(dr["Fee_Calc"].ToString()),
                                            VolumeMWH = Convert.ToDouble(dr["VolumeMWH_Calc"].ToString()),
                                            Cost = Convert.ToDouble(dr["Cost_Calc"].ToString()),
                                            MTM = Convert.ToDouble(dr["MTM_Calc"].ToString()),
                                            GrossMargin = Convert.ToDouble(dr["GrossMargin_Calc"].ToString()),
                                        });
                                    }
                                }                                                                                                                         }
                        }
                    }
                }                
            }
            SelectionItemsinfo.RiskWholeSaleTradesGraph = RiskWholeSaleTradesGraph;
            SelectionItemsinfo.RiskWholeSaleTradesTable = RiskWholeSaleTradesTable;
            return SelectionItemsinfo;
        }

        public List<RiskMonthlyPositionGraphView> RiskMonthlyPositionGraphsGetInfo(String BookOfBusinessString, String LineOfBusinessString, String CongestionZoneString, DateTime StartDate, DateTime EndDate, int NoBookOfBusinessInt)
        {
            //xmlMonths,CongestionZoneString,xmlAccounts
            List<RiskMonthlyPositionGraphView> SelectionItemsinfo = new List<RiskMonthlyPositionGraphView>();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            //int NoBookOfBusinessInt;
            //NoBookOfBusinessInt = 1;
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[RiskMonthlyPositionFilteredGetInfo]";
                    //SqlCommandText = "[WebSite].[WeatherHourlyFilteredV2GetInfo]";
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = SqlCommandText;
                    if (StartDate != null)
                    {
                        cmd.Parameters.AddWithValue("@StartDate", StartDate);
                    }
                    if (EndDate != null)
                    {
                        cmd.Parameters.AddWithValue("@EndDate", EndDate);
                    }
                    if (BookOfBusinessString != null)
                    {
                        cmd.Parameters.AddWithValue("@BookOfBusinessString", BookOfBusinessString);
                    }
                    if (LineOfBusinessString != null)
                    {
                        cmd.Parameters.AddWithValue("@LineOfBusinessString", LineOfBusinessString);
                    }
                    if (CongestionZoneString != null)
                    {
                        cmd.Parameters.AddWithValue("@CongestionZoneString", CongestionZoneString);
                    }
                    cmd.Parameters.AddWithValue("@NoBookOfBusiness", NoBookOfBusinessInt);

                    //cmd.Parameters.AddWithValue("@UserName", UserName);
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
                        if (ds != null)
                        {
                            if (ds.Tables.Count > 0)
                            {
                                if (ds.Tables["SelectionItems"].Rows.Count > 0)
                                {
                                    foreach (DataRow dr in ds.Tables["SelectionItems"].Rows)
                                    {
                                        SelectionItemsinfo.Add(new RiskMonthlyPositionGraphView
                                        {

                                            BookOfBusiness = dr["BookOfBusiness"].ToString(),
                                            DeliveryDate = Convert.ToDateTime(dr["deliverydate"].ToString()),
                                            DeliveryDateString = dr["DeliveryDateString"].ToString(),
                                            GrossUsageMWH= Convert.ToDouble(dr["GrossUsageMWH"].ToString()),
                                            GrossUsageDollars = Convert.ToDouble(dr["GrossUsageDollars"].ToString()),
                                            GrossUsageMW = Convert.ToDouble(dr["GrossUsageMW"].ToString()),
                                        });
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }

        public List<RiskHourlyPositionGraphView> RiskHourlyPositionGraphsGetInfo(String BookOfBusinessString, String LineOfBusinessString, String CongestionZoneString, String WholeBlockString, String MonthsString)
        {
            //xmlMonths,CongestionZoneString,xmlAccounts
            List<RiskHourlyPositionGraphView> SelectionItemsinfo = new List<RiskHourlyPositionGraphView>();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            //int NoBookOfBusinessInt;
            //NoBookOfBusinessInt = 1;
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[RiskHourlyPositionFilteredGetInfo]";
                    //SqlCommandText = "[WebSite].[WeatherHourlyFilteredV2GetInfo]";
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = SqlCommandText;                    
                    if (BookOfBusinessString != null)
                    {
                        cmd.Parameters.AddWithValue("@BookOfBusinessString", BookOfBusinessString);
                    }
                    if (LineOfBusinessString != null)
                    {
                        cmd.Parameters.AddWithValue("@LineOfBusinessString", LineOfBusinessString);
                    }
                    if (CongestionZoneString != null)
                    {
                        cmd.Parameters.AddWithValue("@CongestionZoneString", CongestionZoneString);
                    }
                    if (WholeBlockString != null)
                    {
                        cmd.Parameters.AddWithValue("@WholeBlockString", WholeBlockString);
                    }
                    if (MonthsString != null)
                    {
                        cmd.Parameters.AddWithValue("@MonthsString", MonthsString);
                    }
                    //cmd.Parameters.AddWithValue("@UserName", UserName);
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
                        if (ds != null)
                        {
                            if (ds.Tables.Count > 0)
                            {
                                if (ds.Tables["SelectionItems"].Rows.Count > 0)
                                {
                                    foreach (DataRow dr in ds.Tables["SelectionItems"].Rows)
                                    {
                                        SelectionItemsinfo.Add(new RiskHourlyPositionGraphView
                                        {
                                            BookOfBusiness = dr["BookOfBusiness"].ToString(),
                                            HE = Convert.ToInt32(dr["HE"].ToString()),                                            
                                            GrossUsageMWH = Convert.ToDouble(dr["GrossUsageMWH"].ToString()),                                            
                                            GrossUsageMW = Convert.ToDouble(dr["GrossUsageMW"].ToString()),
                                        });
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }

        public List<RiskWholeSaleTradeSettlementView> RiskWholeSaleTradeSettlementPositionGraphsGetInfo(String CounterPartyString, String MonthsString, String ApplyTotalsString)
        {
            //xmlMonths,CongestionZoneString,xmlAccounts
            List<RiskWholeSaleTradeSettlementView> SelectionItemsinfo = new List<RiskWholeSaleTradeSettlementView>();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            //int NoBookOfBusinessInt;
            //NoBookOfBusinessInt = 1;
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[RiskWholeSaleTradeSettlementPositionFilteredGetInfo]";
                    //SqlCommandText = "[WebSite].[WeatherHourlyFilteredV2GetInfo]";
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = SqlCommandText;
                    if (CounterPartyString != null)
                    {
                        cmd.Parameters.AddWithValue("@CounterPartyString", CounterPartyString);
                    }
                    if (MonthsString != null)
                    {
                        cmd.Parameters.AddWithValue("@MonthsString", MonthsString);
                    }
                    if (ApplyTotalsString != null) 
                    {
                        cmd.Parameters.AddWithValue("@ApplyTotals", ApplyTotalsString);
                    }

                    //cmd.Parameters.AddWithValue("@UserName", UserName);
                    cmd.Connection = con;
                    using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                    {
                        da.Fill(ds, "SelectionItems");
                    }
                }
            }
            int iCounter = 1;
            if (ds != null)
            {
                if (ds.Tables.Count > 0)
                {
                    if (ds.Tables["SelectionItems"].Rows.Count > 0)
                    {
                        if (ds != null)
                        {
                            if (ds.Tables.Count > 0)
                            {
                                if (ds.Tables["SelectionItems"].Rows.Count > 0)
                                {
                                    foreach (DataRow dr in ds.Tables["SelectionItems"].Rows)
                                    {
                                        SelectionItemsinfo.Add(new RiskWholeSaleTradeSettlementView
                                        {
                                            CounterParty = dr["CounterParty"].ToString(),
                                            DealID = dr["DealID"].ToString(),
                                            Volume = Convert.ToDouble(dr["Volume"].ToString()),
                                            Cost = Convert.ToDouble(dr["Cost"].ToString()),
                                            TypeOfRecord = Convert.ToInt32(dr["RiskWholeSaleTradeSettlementType"].ToString()),
                                        });
                                    }
                                }
                                iCounter++;
                            }
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }



        // Ending Graphs
        public int FileUpsert(int FileID, String FileName, String FileStatus, String FileType, String UserName)
        {

            int SelectionItemsinfo = new int();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString(); 
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[FileUpsert]";
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = SqlCommandText;
                    //cmd.Parameters.AddWithValue("@FileID", FileID);
                    cmd.Parameters.AddWithValue("@FileName", FileName);
                    cmd.Parameters.AddWithValue("@FileStatus", FileStatus);
                    cmd.Parameters.AddWithValue("@FileType", FileType);
                    cmd.Parameters.AddWithValue("@UserName", UserName);
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
        public List<CityInfo> CitiesForStateGetInfo(String StateAbb)
        {

            List<CityInfo> SelectionItemsinfo = new List<CityInfo>();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[CityGetInfo]";
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = SqlCommandText;
                    cmd.Parameters.AddWithValue("@StateAbb", StateAbb);
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
                            SelectionItemsinfo.Add(new CityInfo
                            {

                                CityID = Convert.ToInt32(dr["cityid"].ToString()),
                                CityName = dr["cityname"].ToString(),
                                StateAbb = dr["stateabb"].ToString(),
                            });
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }
        public String GenericValidatedDataUpsert(String FileName, String InformationType, Int32 FirstRowOfData, String Field1, String Field2, String Field3, String Field4, String Field5, String Field6, String Field7, String Field8, String Field9, String Field10, String Field11, String Field12)
        {
            String SelectionItemsinfo;
            SelectionItemsinfo = "FAILURE";
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[GenericValidatedDataUpsert]";
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = SqlCommandText;
                    cmd.Parameters.AddWithValue("@FileName", FileName);
                    cmd.Parameters.AddWithValue("@InformationType", InformationType);
                    cmd.Parameters.AddWithValue("@FirstRowOfData", FirstRowOfData);
                    cmd.Parameters.AddWithValue("@Field1", Field1);
                    cmd.Parameters.AddWithValue("@Field2", Field2);
                    cmd.Parameters.AddWithValue("@Field3", Field3);
                    cmd.Parameters.AddWithValue("@Field4", Field4);
                    cmd.Parameters.AddWithValue("@Field5", Field5);
                    cmd.Parameters.AddWithValue("@Field6", Field6);
                    cmd.Parameters.AddWithValue("@Field7", Field7);
                    cmd.Parameters.AddWithValue("@Field8", Field8);
                    cmd.Parameters.AddWithValue("@Field9", Field9);
                    cmd.Parameters.AddWithValue("@Field10", Field10);
                    cmd.Parameters.AddWithValue("@Field11", Field11);
                    cmd.Parameters.AddWithValue("@Field12", Field12);

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
                            SelectionItemsinfo = dr["ReturnValue"].ToString();
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }

        public List<StateInfo> StatesGetInfo()
        {
            
            List<StateInfo> SelectionItemsinfo = new List<StateInfo>();
            DataSet ds = new DataSet();            
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[StateGetInfo]";
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
                            SelectionItemsinfo.Add(new StateInfo
                            {
                               
                               StateAbb = dr["stateabb"].ToString(),
                               StateName = dr["Statename"].ToString(),
                            });
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }

        public List<CongestionZoneInfo> CongestionZoneAllGetInfo()
        {

            List<CongestionZoneInfo> SelectionItemsinfo = new List<CongestionZoneInfo>();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[CongestionZoneAllGetInfo]";
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
                            SelectionItemsinfo.Add(new CongestionZoneInfo
                            {

                                CongestionZoneID = Convert.ToInt32(dr["CZID"].ToString()),
                                CongestionZoneName = dr["CZName"].ToString(),
                            });
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }

        public List<TDUInfo> TDUAllGetInfo()
        {

            List<TDUInfo> SelectionItemsinfo = new List<TDUInfo>();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[TDUAllGetInfo]";
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
                            SelectionItemsinfo.Add(new TDUInfo
                            {

                                TDUID= Convert.ToInt32(dr["TDUID"].ToString()),
                                TDUName= dr["TDUName"].ToString(),
                                DunsNumber= dr["DUNSNumber"].ToString(),
                            });
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }


        public List<SelectorType> WebSiteDropDownSelectorGetInfo(String StoredProc)
        {

            List<SelectorType> SelectionItemsinfo = new List<SelectorType>();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[" + StoredProc + "]";
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

                                SelectorID = dr["SelectorID"].ToString(),
                                SelectorText = dr["SelectorText"].ToString(),
                                Color = dr["Color"].ToString(),
                            });
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }

        #endregion
        // Customer Calls
        #region
        public int CustomerUpsert(int CustomerID, String CustomerName, String BillingAdd1, String BillingAdd2, String CityName, String StateAbb, String Zip, int Active)
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
                    string SqlCommandText = "[WebSite].[CustomerUpsert]";
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = SqlCommandText;
                    cmd.Parameters.AddWithValue("@CustomerID", CustomerID);
                    cmd.Parameters.AddWithValue("@CustomerName", CustomerName);
                    cmd.Parameters.AddWithValue("@BillingAdd1", BillingAdd1);
                    cmd.Parameters.AddWithValue("@BillingAdd2", BillingAdd2);
                    cmd.Parameters.AddWithValue("@CityName", CityName);
                    cmd.Parameters.AddWithValue("@StateAbb", StateAbb);
                    cmd.Parameters.AddWithValue("@Zip", Zip);
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

        public int CustomerValidatedFileUpsert()
        {

            int SelectionItemsinfo = new int();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[CustomerValidatedFileUpsert]";
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

        public int CustomerValidationUpsert(String FileName, String ContainerName)
        {

            int SelectionItemsinfo = new int();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();          
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[CustomerFileUpsert]";
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
        public List<SelectorType> CustomersAllSelectorGetInfo()
        {

            List<SelectorType> SelectionItemsinfo = new List<SelectorType>();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[CustomerGetInfo]";
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@CustomerID", 0);
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
                                SelectorID = dr["CustomerID"].ToString(),
                                SelectorText= dr["CustomerName"].ToString(),
                            });
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }
        public List<CustomerInfo> CustomersAllGetInfo()
        {

            List<CustomerInfo> SelectionItemsinfo = new List<CustomerInfo>();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    Int32 CustomerID = 0;
                    string SqlCommandText = "[WebSite].[CustomerGetInfo]";
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@CustomerID", CustomerID);
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
                            SelectionItemsinfo.Add(new CustomerInfo
                            {
                                CustomerID = Convert.ToInt32(dr["customerid"].ToString()),
                                CustomerName = dr["customername"].ToString(),
                                BillingAdd1 = dr["BillingAdd1"].ToString(),
                                BillingAdd2 = dr["BillingAdd2"].ToString(),
                                //cityid = Convert.ToInt32(dr["cityid"].ToString()),
                                CityName = dr["CityName"].ToString(),
                                //Zip = dr["Zip"].ToString(),
                                StateAbb = dr["StateAbb"].ToString(),
                                //StartDate = Convert.ToDateTime(dr["startdate"].ToString()),
                                //EndDate = Convert.ToDateTime(dr["enddate"].ToString()),
                                //Active = Convert.ToInt32(dr["Active"].ToString()),                                
                            });
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }

        public List<CustomerInfo> CustomersGetInfo(int CustomerID)
        {

            List<CustomerInfo> SelectionItemsinfo = new List<CustomerInfo>();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[CustomerGetInfo]";
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
                            SelectionItemsinfo.Add(new CustomerInfo
                            {
                                CustomerID = Convert.ToInt32(dr["CustomerID"].ToString()),
                                CustomerName = dr["CustomerName"].ToString(),
                                BillingAdd1 = dr["BillingAdd1"].ToString(),
                                BillingAdd2 = dr["BillingAdd2"].ToString(),
                                CityID = Convert.ToInt32(dr["CityID"].ToString()),
                                CityName = dr["CityName"].ToString(),
                               //Zip = dr["zip"].ToString(),
                                StateAbb = dr["StateAbb"].ToString(),
                                //StartDate = Convert.ToDateTime(dr["startdate"].ToString()),
                                //EndDate = Convert.ToDateTime(dr["enddate"].ToString()),                                
                                Active = Convert.ToBoolean(dr["Active"].ToString()),
                            });
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }
        public List<CustomerInfo> CustomersValidateGetInfo()
        {

            List<CustomerInfo> SelectionItemsinfo = new List<CustomerInfo>();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[CustomerValidationGetInfo]";
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
                            SelectionItemsinfo.Add(new CustomerInfo
                            {
                                CustomerID = Convert.ToInt32(dr["customerid"].ToString()),
                                CustomerName = dr["customername"].ToString(),
                                BillingAdd1 = dr["billingadd1"].ToString(),
                                BillingAdd2 = dr["billingadd2"].ToString(),
                                //cityid = Convert.ToInt32(dr["cityid"].ToString()),
                                CityName = dr["City"].ToString(),
                                //Zip = dr["zip"].ToString(),
                                StateAbb = dr["stateabb"].ToString(),
                                //StartDate = Convert.ToDateTime(dr["startdate"].ToString()),
                                //EndDate = Convert.ToDateTime(dr["enddate"].ToString()),                                
                                //StartDateString = String.Format("{0:MM/dd/yyyy}", Convert.ToDateTime(dr["startdate"].ToString())),
                                //EndDateString = String.Format("{0:MM/dd/yyyy}", Convert.ToDateTime(dr["enddate"].ToString())),
                                Active = Convert.ToBoolean(dr["Active"].ToString()),
                                FileName = dr["FileName"].ToString(),
                                //NewCityID = Convert.ToInt32(dr["NewCityID"].ToString()),
                                InsertDate = Convert.ToDateTime(dr["InsertDate"].ToString()),
                                //NewCustomer = dr["NewCustomer"].ToString(),
                            });
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }


        #endregion 
        // Facility Calls
        #region

        public int FacilityValidationUpsert(String FileName, String ContainerName)
        {

            int SelectionItemsinfo = new int();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[FacilityFileUpsert]";
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

        public TransactionInfo TransactionsGetInfo()
        {

            TransactionInfo SelectionItemsinfo = new TransactionInfo();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[CustDealFacilityCountGetInfo]";
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
                            SelectionItemsinfo.CustomerCount = Convert.ToInt32(dr["CustomerCount"]);
                            SelectionItemsinfo.DealCount = Convert.ToInt32(dr["DealCount"]);
                            SelectionItemsinfo.FacilityCount = Convert.ToInt32(dr["FacilityCount"]);
                            SelectionItemsinfo.FileCount = Convert.ToInt32(dr["FileCount"]);
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }
        public List<FacilityInfo> FacilityValidateGetInfo()
        {

            List<FacilityInfo> SelectionItemsinfo = new List<FacilityInfo>();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[FacilityValidationGetInfo]";
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
                            SelectionItemsinfo.Add(new FacilityInfo
                            {
                                CustomerID = Convert.ToInt32(dr["customerid"].ToString()),
                                CustomerName = dr["customername"].ToString(),
                                FacilityID = dr["FacilityID"].ToString(),
                                CongestionZoneName = dr["CongestionZoneName"].ToString(),
                                TDUName = dr["TDUName"].ToString(),
                                LoadProfileName = dr["LoadProfileName"].ToString(),
                                LossCodeName = dr["LossCodeName"].ToString(),
                                FacilityActive = Convert.ToBoolean(dr["Active"].ToString()),
                                FileName = dr["FileName"].ToString(),
                                InsertDate = String.Format("{0:g}", Convert.ToDateTime(dr["InsertDate"].ToString())),
                                NewFacility = dr["NewFacility"].ToString(),
                                BillingCycle = Convert.ToDouble(dr["BillingCycle"]),
                            });
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }

        public int FacilityValidatedFileUpsert()
        {

            int SelectionItemsinfo = new int();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[FacilityValidatedFileUpsert]";
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


        public List<FacilityInfo> FacilityAllGetInfo()
        {

            List<FacilityInfo> SelectionItemsinfo = new List<FacilityInfo>();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[FacilityAllGetInfo]";
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
                            SelectionItemsinfo.Add(new FacilityInfo
                            {
                                CustomerID = Convert.ToInt32(dr["customerid"].ToString()),
                                CustomerName = dr["customername"].ToString(),
                                FacilityID = dr["FacilityID"].ToString(),
                                CongestionZoneName = dr["CZName"].ToString(),
                                CongestionZoneID = Convert.ToInt32(dr["CZID"].ToString()),
                                TDUName= dr["TDUName"].ToString(),
                                TDUID= Convert.ToInt32(dr["TDUID"].ToString()),
                                LoadProfileName = dr["LProfileName"].ToString(),
                                LoadProfileID = Convert.ToInt32(dr["LProfileID"].ToString()),
                                LossCodeName = dr["LossCodeName"].ToString(),
                                LossCodeID= dr["LossCodeID"].ToString(),
                                DunsNumber= dr["DUNSNumber"].ToString(),
                                FacilityActive = Convert.ToBoolean(dr["FacilityActive"].ToString()),
                                BillingCycle = Convert.ToDouble(dr["BillingCycle"])
                            });
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }
        public List<FacilityInfo> SpecificCustomerFacilitiesGetInfo(int CustomerID)
        {

            List<FacilityInfo> SelectionItemsinfo = new List<FacilityInfo>();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[CustomerFaciliesAllGetInfo]";
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
                            SelectionItemsinfo.Add(new FacilityInfo
                            {
                                CustomerID = Convert.ToInt32(dr["customerid"].ToString()),
                                CustomerName = dr["customername"].ToString(),
                                FacilityID = dr["FacilityID"].ToString(),
                                CongestionZoneName = dr["CZName"].ToString(),
                                CongestionZoneID = Convert.ToInt32(dr["CZID"].ToString()),
                                TDUName = dr["TDUName"].ToString(),
                                TDUID = Convert.ToInt32(dr["TDUID"].ToString()),
                                LoadProfileName = dr["LProfileName"].ToString(),
                                LoadProfileID = Convert.ToInt32(dr["LProfileID"].ToString()),
                                LossCodeName = dr["LossCodeName"].ToString(),
                                LossCodeID = dr["LossCodeID"].ToString(),
                                DunsNumber = dr["DUNSNumber"].ToString(),
                                FacilityActive = Convert.ToBoolean(dr["FacilityActive"].ToString()),
                                BillingCycle = Convert.ToDouble(dr["BillingCycle"]),
                            });
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }

        public List<FacilityInfo> SpecificFacilityGetInfo(int CustomerID, String FacilityID)
        {

            List<FacilityInfo> SelectionItemsinfo = new List<FacilityInfo>();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[SpecificFacilityGetInfo]";
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = SqlCommandText;
                    cmd.Parameters.AddWithValue("@CustomerID", CustomerID);
                    cmd.Parameters.AddWithValue("@FacilityID", FacilityID);
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
                            SelectionItemsinfo.Add(new FacilityInfo
                            {
                                CustomerID = Convert.ToInt32(dr["customerid"].ToString()),
                                CustomerName = dr["customername"].ToString(),
                                FacilityID = dr["FacilityID"].ToString(),
                                CongestionZoneName = dr["CZName"].ToString(),
                                CongestionZoneID = Convert.ToInt32(dr["CZID"].ToString()),
                                TDUName = dr["TDUName"].ToString(),
                                TDUID = Convert.ToInt32(dr["TDUID"].ToString()),
                                LoadProfileName = dr["LProfileName"].ToString(),
                                LoadProfileID = Convert.ToInt32(dr["LProfileID"].ToString()),
                                LossCodeName = dr["LossCodeName"].ToString(),
                                LossCodeID = dr["LossCodeID"].ToString(),
                                DunsNumber = dr["DUNSNumber"].ToString(),
                                FacilityActive = Convert.ToBoolean(dr["FacilityActive"].ToString()),
                                BillingCycle = Convert.ToDouble(dr["BillingCycle"].ToString()),
                            });
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }
        public int FacilityUpsert(int CustomerID, String FacilityID, String LoadProfile, int CongestionZoneID, int TDUID, Double BillingCycle, String LossCode, int Active)
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
                    string SqlCommandText = "[WebSite].[FacilityUpsert]";
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = SqlCommandText;
                    cmd.Parameters.AddWithValue("@CustomerID", CustomerID);
                    cmd.Parameters.AddWithValue("@FacilityID", FacilityID);
                    cmd.Parameters.AddWithValue("@LoadProfile", LoadProfile);
                    cmd.Parameters.AddWithValue("@CongestionZoneID", CongestionZoneID);
                    cmd.Parameters.AddWithValue("@TDUID", TDUID);
                    cmd.Parameters.AddWithValue("@BillingCycle", BillingCycle);
                    cmd.Parameters.AddWithValue("@LossCode", LossCode);
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

        public List<LossCodeInfo> TDULossCodeAllGetInfo(int TDUID)
        {

            List<LossCodeInfo> SelectionItemsinfo = new List<LossCodeInfo>();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[TDULossCodeAllGetInfo]";
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = SqlCommandText;
                    cmd.Parameters.AddWithValue("@TDUID", TDUID);
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
                                TDUID = Convert.ToInt32(dr["TDUID"].ToString()),
                                //LossCodeID = dr["TDUID"].ToString() + '-' + dr["lossCode"].ToString(),
                                LossCodeName = dr["LossCodeName"].ToString(),
                                //LossCode = dr["lossCode"].ToString(),
                            });
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }
        public List<LoadProfileInfo> LoadProfileAllGetInfo()
        {

            List<LoadProfileInfo> SelectionItemsinfo = new List<LoadProfileInfo>();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[LoadProfileAllGetInfo]";
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
                            SelectionItemsinfo.Add(new LoadProfileInfo
                            {                                
                                LoadProfileID = Convert.ToInt32(dr["LoadProfileID"].ToString()),
                                LoadProfileName = dr["LoadProfileName"].ToString(),                                
                            });
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }


        public List<PricingMonthlyPricesView> PricingMonthlyPricesFilteredGetInfo(String CustomersString, String DealsString, String StartDatesString, String TermsString, String CategoryString, String SubCategoryString, Int32 ValueType)
        {
            //xmlMonths,CongestionZoneString,xmlAccounts
            List<PricingMonthlyPricesView> SelectionItemsinfo = new List<PricingMonthlyPricesView>();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            //int NoBookOfBusinessInt;
            //NoBookOfBusinessInt = 1;
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[PricingMonthlyPricesFilteredGetInfo]";
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = SqlCommandText;
                    if (CustomersString != null)
                    {
                        cmd.Parameters.AddWithValue("@CustomersString", CustomersString);
                    }
                    if (DealsString != null)
                    {
                        cmd.Parameters.AddWithValue("@DealsString", DealsString);
                    }
                    if (StartDatesString != null)
                    {
                        cmd.Parameters.AddWithValue("@StartDatesString", StartDatesString);
                    }
                    if (TermsString != null)
                    {
                        cmd.Parameters.AddWithValue("@TermsString", TermsString);
                    }
                    if (CategoryString != null)
                    {
                        cmd.Parameters.AddWithValue("@CategoryString", CategoryString);
                    }
                    if (SubCategoryString != null)
                    {
                        cmd.Parameters.AddWithValue("@SubCategoryString", SubCategoryString);
                    }
                    //cmd.Parameters.AddWithValue("@ValueType", ValueType);
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
                        if (ds != null)
                        {
                            if (ds.Tables.Count > 0)
                            {
                                if (ds.Tables["SelectionItems"].Rows.Count > 0)
                                {
                                    foreach (DataRow dr in ds.Tables["SelectionItems"].Rows)
                                    {
                                        SelectionItemsinfo.Add(new PricingMonthlyPricesView
                                        {                                            
                                            DeliveryDate = dr["DeliveryDate"].ToString(),
                                            NetUsage = Convert.ToDouble(dr["NetUsage"].ToString()),
                                            AncServPrice = Convert.ToDouble(dr["AncServPrice"].ToString()),
                                            BasisPrice = Convert.ToDouble(dr["BasisPrice"].ToString()),
                                            EnergyPrice = Convert.ToDouble(dr["EnergyPrice"].ToString()),
                                            LossesPrice = Convert.ToDouble(dr["LossesPrice"].ToString()),
                                            Margin = Convert.ToDouble(dr["margin"].ToString()),
                                            MiscAdminPrice = Convert.ToDouble(dr["Misc_AdminPrice"].ToString()),
                                            GrossMargin = Convert.ToDouble(dr["MonthlyGrossMargin"].ToString()),                                            
                                            Price = Convert.ToDouble(dr["Price"].ToString()),
                                            TotalCost = Convert.ToDouble(dr["cost_total"].ToString()),
                                            CRR_Price = Convert.ToDouble(dr["p_crr"].ToString()),
                                            VolRiskPrice = Convert.ToDouble(dr["p_volrisk"].ToString()),
                                            BrokerFee = Convert.ToDouble(dr["brokermargin"].ToString()),
                                            // Volumes
                                            GrossUsage = Convert.ToDouble(dr["grossusage"].ToString()),                                            
                                            Losses = Convert.ToDouble(dr["v_losses"].ToString()),
                                            NonSpin = Convert.ToDouble(dr["v_nsrs"].ToString()),
                                            RegDown = Convert.ToDouble(dr["v_rd"].ToString()),
                                            ReplacementReserve = Convert.ToDouble(dr["v_rrs"].ToString()),
                                            RegUp = Convert.ToDouble(dr["v_ru"].ToString()),
                                            RPS = Convert.ToDouble(dr["v_rps"].ToString()),
                                        });
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }


        public List<PricingSummaryPricingComponentsView> PricingSummaryPricingComponentsFilteredGetInfo(String CustomersString, String DealsString, String StartDatesString, String TermsString, String CategoryString, String SubCategoryString, Int32 ValueType)
        {
            //xmlMonths,CongestionZoneString,xmlAccounts
            List<PricingSummaryPricingComponentsView> SelectionItemsinfo = new List<PricingSummaryPricingComponentsView>();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            //int NoBookOfBusinessInt;
            //NoBookOfBusinessInt = 1;
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[PricingSummaryPricingComponentsFilteredGetInfo]";
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = SqlCommandText;
                    if (CustomersString != null)
                    {
                        cmd.Parameters.AddWithValue("@CustomersString", CustomersString);
                    }
                    if (DealsString != null)
                    {
                        cmd.Parameters.AddWithValue("@DealsString", DealsString);
                    }
                    if (StartDatesString != null)
                    {
                        cmd.Parameters.AddWithValue("@StartDatesString", StartDatesString);
                    }
                    if (TermsString != null)
                    {
                        cmd.Parameters.AddWithValue("@TermsString", TermsString);
                    }
                    if (CategoryString != null)
                    {
                        cmd.Parameters.AddWithValue("@CategoryString", CategoryString);
                    }
                    if (SubCategoryString != null)
                    {
                        cmd.Parameters.AddWithValue("@SubCategoryString", SubCategoryString);
                    }
                    cmd.Parameters.AddWithValue("@ValueType", ValueType);
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
                        if (ds != null)
                        {
                            if (ds.Tables.Count > 0)
                            {
                                if (ds.Tables["SelectionItems"].Rows.Count > 0)
                                {
                                    foreach (DataRow dr in ds.Tables["SelectionItems"].Rows)
                                    {
                                        SelectionItemsinfo.Add(new PricingSummaryPricingComponentsView
                                        {
                                            PricingCategory = dr["PriceCategory"].ToString(),
                                            PricingSubCategory = dr["SubPriceCategory"].ToString(),
                                            SumPrice = Convert.ToDouble(dr["SumPrice"].ToString()),
                                            AvgPrice = Convert.ToDouble(dr["AvgPrice"].ToString()),
                                            MajorOrderID = Convert.ToInt32(dr["MajorOrderID"].ToString()),
                                            MinorOrderID  = Convert.ToInt32(dr["MinorOrderID"].ToString()),
                                        });
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }


        #endregion
        // Generic and Private Functions
        #region       

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
        public String ReturnDockerURL()
        {
            try
            {
                string Environment = ConfigurationManager.AppSettings["Environment"];
                string RetrievalVariable = "DockerString" + Environment;
                string ConnectionString = ConfigurationManager.AppSettings[RetrievalVariable];
                return ConnectionString;
            }
            catch (Exception ex)
            {
                String Error = ex.ToString();
                return "http://vrddatafactory.southcentralus.azurecontainer.io:5000/";
            }
        }
        private String ReturnSASKey()
        {
            try
            {
                //CloudConfigurationManager.GetSetting("StorageConnectionString")
                string RetrievalVariable = "StorageConnectionString";
                string ConnectionString = ConfigurationManager.AppSettings[RetrievalVariable];
                return ConnectionString;
            }
            catch (Exception ex)
            {
                String Error = ex.ToString();
                return @"?sv=2017-11-09&ss=b&srt=sco&sp=rwlac&se=2021-08-25T04:00:37Z&st=2018-08-24T20:00:37Z&spr=https&sig=8oLl%2BMjWgoj%2FHgWFfdB8UOaes0K%2FZjmNwEvJd2stxMc%3D";
            }
        }
        #endregion
        // NOT PART OF PROGRAM
        // Account Level Information
        #region
        public List<AccountInfo> AccountValidationGetInfo()
        {
            String FileName = "ValidationAccountData.csv";
            String ContainerName = "riskaccounts";
            List<AccountInfo> SelectionItemsinfo = new List<AccountInfo>();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[AccountFileUpsert]";
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
                            SelectionItemsinfo.Add(new AccountInfo
                            {
                                RowNum = Convert.ToInt32(dr["RowNum"].ToString()),
                                ESIID = dr["ESIID"].ToString(),
                                CustomerName = dr["CustomerName"].ToString(),
                                ServiceAddress1 = dr["ServiceAddress1"].ToString(),
                                ServiceAddress2 = dr["ServiceAddress2"].ToString(),
                                ServiceAddress3 = dr["ServiceAddress3"].ToString(),
                                ZipCode = dr["ZipCode"].ToString(),
                                LoadProfile = dr["LoadProfile"].ToString(),
                                CongestionZone = dr["CongestionZone"].ToString(),
                                TDU = dr["TDU"].ToString(),
                                FileName = dr["FileName"].ToString(),
                            });
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }
        #endregion
        #region


        public int GenericFileUpsert(String FileName, String FileTypeName, String ContainerName, String RandomNumber)
        {

            int SelectionItemsinfo = new int();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.CommandTimeout = 45;
                    string SqlCommandText = "[WebSite].[GenericValidationUpsert]";
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = SqlCommandText;
                    cmd.Parameters.AddWithValue("@FileName", FileName);
                    cmd.Parameters.AddWithValue("@ContainerName", ContainerName);
                    cmd.Parameters.AddWithValue("@FileType", FileTypeName);
                    cmd.Parameters.AddWithValue("@RandomNumber", RandomNumber);                    
                    cmd.Connection = con;
                    using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                    {
                        da.Fill(ds, "SelectionItems");
                    }
                }
            }            
            return SelectionItemsinfo;
        }

        public int GenericFileStartUp(String FileName, String FileTypeName, String ContainerName)
        {

            int SelectionItemsinfo = new int();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[GenericValidationGetInfo]";
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = SqlCommandText;
                    cmd.Parameters.AddWithValue("@FileName", FileName);
                    cmd.Parameters.AddWithValue("@ContainerName", ContainerName);
                    cmd.Parameters.AddWithValue("@FileType", FileTypeName);
                    cmd.Connection = con;
                    using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                    {
                        da.Fill(ds, "SelectionItems");
                    }
                }
            }
            return SelectionItemsinfo;
        }
        public int GenericValidationByRowsUpsert(String FileName, String FileTypeName, String ContainerName, int ValidationID, String Field1, String Field2, String Field3, String Field4, String Field5, String Field6, String Field7, String Field8, String Field9, String Field10, String Field11, String Field12)
        {
            int SelectionItemsinfo = new int();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[GenericValidationByRowsUpsert]";
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = SqlCommandText;
                    cmd.Parameters.AddWithValue("@FileName", FileName);
                    //cmd.Parameters.AddWithValue("@ContainerName", ContainerName);
                    cmd.Parameters.AddWithValue("@FileType", FileTypeName);
                    cmd.Parameters.AddWithValue("@ValidationID", ValidationID);
                    cmd.Parameters.AddWithValue("@Field1", Field1);
                    cmd.Parameters.AddWithValue("@Field2", Field2);
                    cmd.Parameters.AddWithValue("@Field3", Field3);
                    cmd.Parameters.AddWithValue("@Field4", Field4);
                    cmd.Parameters.AddWithValue("@Field5", Field5);
                    cmd.Parameters.AddWithValue("@Field6", Field6);
                    cmd.Parameters.AddWithValue("@Field7", Field7);
                    cmd.Parameters.AddWithValue("@Field8", Field8);
                    cmd.Parameters.AddWithValue("@Field9", Field9);
                    cmd.Parameters.AddWithValue("@Field10", Field10);
                    cmd.Parameters.AddWithValue("@Field11", Field11);
                    cmd.Parameters.AddWithValue("@Field12", Field12);
                    cmd.Connection = con;
                    using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                    {
                        da.Fill(ds, "SelectionItems");
                    }
                }
            }
            return SelectionItemsinfo;
        }

        public List<GenericInfo> GenericValidationByRowsGetInfo (String FileName, String FileTypeName, String ContainerName, int iStartRow, int iEndRow)
        {

            List<GenericInfo> SelectionItemsinfo = new List<GenericInfo>();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[GenericValidationByRowsGetInfo]";
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = SqlCommandText;
                    cmd.Parameters.AddWithValue("@FileName", FileName);
                    cmd.Parameters.AddWithValue("@FileType", FileTypeName);
                    cmd.Parameters.AddWithValue("@StartRow", iStartRow);
                    cmd.Parameters.AddWithValue("@EndRow", iEndRow);
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
                            SelectionItemsinfo.Add(new GenericInfo
                            {
                                ValidateID = Convert.ToInt32(dr["ValidateId"].ToString()),
                                FileID = Convert.ToInt32(dr["FileID"].ToString()),
                                FileName = dr["FileName"].ToString(),
                                Field1 = dr["Field1"].ToString(),
                                Field2 = dr["Field2"].ToString(),
                                Field3 = dr["Field3"].ToString(),
                                Field4 = dr["Field4"].ToString(),
                                Field5 = dr["Field5"].ToString(),
                                Field6 = dr["Field6"].ToString(),
                                Field7 = dr["Field7"].ToString(),
                                Field8 = dr["Field8"].ToString(),
                                Field9 = dr["Field9"].ToString(),
                                Field10 = dr["Field10"].ToString(),
                                Field11 = dr["Field11"].ToString(),
                                Field12 = dr["Field12"].ToString(),
                                Field13 = dr["Field13"].ToString(),
                                Field14 = dr["Field14"].ToString(),
                                Field15 = dr["Field15"].ToString(),
                                Field16 = dr["Field16"].ToString(),
                                Field17 = dr["Field17"].ToString(),
                                Field18 = dr["Field18"].ToString(),
                                Field19 = dr["Field19"].ToString(),
                                Field20 = dr["Field20"].ToString(),
                                Field21 = dr["Field21"].ToString(),
                                Field22 = dr["Field22"].ToString(),
                                Field23 = dr["Field23"].ToString(),
                                Field24 = dr["Field24"].ToString(),
                                Field25 = dr["Field25"].ToString(),
                                Field26 = dr["Field26"].ToString(),
                                Field27 = dr["Field27"].ToString(),
                                Field28 = dr["Field28"].ToString(),
                                Field29 = dr["Field29"].ToString(),
                                Field30 = dr["Field30"].ToString(),
                            });
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }

        public List<GenericInfo> GenericFileGetInfo(String FileName, String FileTypeName, String ContainerName, int RowNumber)
        {

            List<GenericInfo> SelectionItemsinfo = new List<GenericInfo>();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[GenericValidationGetInfo]";
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = SqlCommandText;
                    cmd.Parameters.AddWithValue("@FileName", FileName);
                    cmd.Parameters.AddWithValue("@FileType", FileTypeName);
                    cmd.Parameters.AddWithValue("@RowCount", RowNumber);
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
                            SelectionItemsinfo.Add(new GenericInfo
                            {
                                ValidateID = Convert.ToInt32(dr["ValidateId"].ToString()),
                                FileID = Convert.ToInt32(dr["FileID"].ToString()),
                                FileName = dr["FileName"].ToString(),
                                Field1 = dr["Field1"].ToString(),
                                Field2 = dr["Field2"].ToString(),
                                Field3 = dr["Field3"].ToString(),
                                Field4 = dr["Field4"].ToString(),
                                Field5 = dr["Field5"].ToString(),
                                Field6 = dr["Field6"].ToString(),
                                Field7 = dr["Field7"].ToString(),
                                Field8 = dr["Field8"].ToString(),
                                Field9 = dr["Field9"].ToString(),
                                Field10 = dr["Field10"].ToString(),
                                Field11 = dr["Field11"].ToString(),
                                Field12 = dr["Field12"].ToString(),
                                Field13 = dr["Field13"].ToString(),
                                Field14 = dr["Field14"].ToString(),
                                Field15 = dr["Field15"].ToString(),
                                Field16 = dr["Field16"].ToString(),
                                Field17 = dr["Field17"].ToString(),
                                Field18 = dr["Field18"].ToString(),
                                Field19 = dr["Field19"].ToString(),
                                Field20 = dr["Field20"].ToString(),
                                Field21 = dr["Field21"].ToString(),
                                Field22 = dr["Field22"].ToString(),
                                Field23 = dr["Field23"].ToString(),
                                Field24 = dr["Field24"].ToString(),
                                Field25 = dr["Field25"].ToString(),
                                Field26 = dr["Field26"].ToString(),
                                Field27 = dr["Field27"].ToString(),
                                Field28 = dr["Field28"].ToString(),
                                Field29 = dr["Field29"].ToString(),
                                Field30 = dr["Field30"].ToString(),
                            });
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }
        public List<GenericInfo> GenericValidationReturnBadRowsGetInfo(String FileName, String InformationType, String Field1, String Field2, String Field3, String Field4, String Field5, String Field6, String Field7, String Field8, String Field9, String Field10)
        {

            List<GenericInfo> SelectionItemsinfo = new List<GenericInfo>();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[GenericValidationReturnBadRowsGetInfo]";
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = SqlCommandText;
                    cmd.Parameters.AddWithValue("@FileName", FileName);
                    cmd.Parameters.AddWithValue("@InformationType", InformationType);
                    cmd.Parameters.AddWithValue("@Field1", Field1);
                    cmd.Parameters.AddWithValue("@Field2", Field2);
                    cmd.Parameters.AddWithValue("@Field3", Field3);
                    cmd.Parameters.AddWithValue("@Field4", Field4);
                    cmd.Parameters.AddWithValue("@Field5", Field5);
                    cmd.Parameters.AddWithValue("@Field6", Field6);
                    cmd.Parameters.AddWithValue("@Field7", Field7);
                    cmd.Parameters.AddWithValue("@Field8", Field8);
                    cmd.Parameters.AddWithValue("@Field9", Field9);
                    cmd.Parameters.AddWithValue("@Field10", Field10);
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
                            SelectionItemsinfo.Add(new GenericInfo
                            {
                                ValidateID = Convert.ToInt32(dr["ValidateId"].ToString()),
                                FileID = Convert.ToInt32(dr["FileID"].ToString()),
                                FileName = dr["FileName"].ToString(),
                                Field1 = dr["Field1"].ToString(),
                                Field2 = dr["Field2"].ToString(),
                                Field3 = dr["Field3"].ToString(),
                                Field4 = dr["Field4"].ToString(),
                                Field5 = dr["Field5"].ToString(),
                                Field6 = dr["Field6"].ToString(),
                                Field7 = dr["Field7"].ToString(),
                                Field8 = dr["Field8"].ToString(),
                                Field9 = dr["Field9"].ToString(),
                                Field10 = dr["Field10"].ToString(),
                                Field11 = dr["Field11"].ToString(),
                                Field12 = dr["Field12"].ToString(),
                                Field13 = dr["Field13"].ToString(),
                                Field14 = dr["Field14"].ToString(),
                                Field15 = dr["Field15"].ToString(),
                                Field16 = dr["Field16"].ToString(),
                                Field17 = dr["Field17"].ToString(),
                                Field18 = dr["Field18"].ToString(),
                                Field19 = dr["Field19"].ToString(),
                                Field20 = dr["Field20"].ToString(),
                                Field21 = dr["Field21"].ToString(),
                                Field22 = dr["Field22"].ToString(),
                                Field23 = dr["Field23"].ToString(),
                                Field24 = dr["Field24"].ToString(),
                                Field25 = dr["Field25"].ToString(),
                                Field26 = dr["Field26"].ToString(),
                                Field27 = dr["Field27"].ToString(),
                                Field28 = dr["Field28"].ToString(),
                                Field29 = dr["Field29"].ToString(),
                                Field30 = dr["Field30"].ToString(),
                            });
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }
        public List<InformationTypeInfo> GenericValidationFieldsGetInfo(String InformationType)
        {
            List<InformationTypeInfo> SelectionItemsinfo = new List<InformationTypeInfo>();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[GenericValidationFieldsGetInfo]";
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = SqlCommandText;
                    cmd.Parameters.AddWithValue("@InformationType", InformationType);                    
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
                            SelectionItemsinfo.Add(new InformationTypeInfo
                            {
                                InformationType = dr["InformationType"].ToString(),
                                InformationFields = dr["InformationFields"].ToString(),
                                InformationFieldsID = Convert.ToInt64(dr["InformationFieldsID"].ToString()),
                                InformationTypeID = Convert.ToInt64(dr["InformationTypeID"].ToString()),
                            });
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }
        



        public String GenericTableUpsert(String FileName, String InformationType, String Field1, String Field2, String Field3, String Field4, String Field5, String Field6, String Field7, String Field8, String Field9, String Field10, Int32 FirstLineOfDate)
        {

            //int SelectionItemsinfo = new int();
            String SelectionItemsinfo = "ERROR";
            DataSet ds = new DataSet();
            if (FirstLineOfDate == null) { FirstLineOfDate = 0; }
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    String SqlCommandText = "[WebSite].[GenericInsertOfTableUpsert]";
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = SqlCommandText;
                    cmd.Parameters.AddWithValue("@FileName", FileName);                    
                    cmd.Parameters.AddWithValue("@InformationType", InformationType);
                    cmd.Parameters.AddWithValue("@Field1", Field1);
                    cmd.Parameters.AddWithValue("@Field2", Field2);
                    cmd.Parameters.AddWithValue("@Field3", Field3);
                    cmd.Parameters.AddWithValue("@Field4", Field4);
                    cmd.Parameters.AddWithValue("@Field5", Field5);
                    cmd.Parameters.AddWithValue("@Field6", Field6);
                    cmd.Parameters.AddWithValue("@Field7", Field7);
                    cmd.Parameters.AddWithValue("@Field8", Field8);
                    cmd.Parameters.AddWithValue("@Field9", Field9);
                    cmd.Parameters.AddWithValue("@Field10", Field10);
                    cmd.Parameters.AddWithValue("@FirstLineOfDate", FirstLineOfDate);
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
                            SelectionItemsinfo = dr["ReturnValue"].ToString();
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }
        #endregion 
        #region 
        public List<Players> GetPlayersXml()
        {
            return GetPlayers();
        }

        public List<Players> GetPlayersJson()
        {
            return GetPlayers();

        }

        private List<Players> GetPlayers()
        {
            List<Players> Players = new List<Players>
                {
                new Players
                {
                Country ="India", Name="Sachin Tendulkar",Sports ="Cricket", ImageUrl="sachin.jpg"
                },
                new Players
                {
                Country ="India", Name="MS Dhoni",Sports ="Cricket", ImageUrl="dhoni.jpg"
                },
                new Players
                {
                Country ="Australia", Name="Rickey Ponting",Sports ="Cricket", ImageUrl="rickey.jpg"
                },
                new Players
                {
                Country ="India", Name="Sandeep Singh",Sports ="Hockey", ImageUrl="sandeep.jpg"
                },

                };
            return Players;
        }
        #endregion 
        public string GetData(int value)
        {
            return string.Format("You entered: {0}", value);
        }
        protected bool CheckDate(String date)
        {
            try
            {
                // Valid Format 
                DateTime dt = DateTime.Parse(date);
                // Valid Years
                if ((dt.Year > 1800) && (dt.Year < 2500) && (dt.Month > 0) && (dt.Month <= 12)) { return true; } else { return false; }
                
            }
            catch
            {
                return false;
            }

        }
        // NOT PART OF PROGRAM
        public CompositeType GetDataUsingDataContract(CompositeType composite)
        {
            if (composite == null)
            {
                throw new ArgumentNullException("composite");
            }
            if (composite.BoolValue)
            {
                composite.StringValue += "Suffix";
            }
            return composite;
        }
    }
}



