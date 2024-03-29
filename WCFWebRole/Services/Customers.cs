﻿using System;
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
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "Contracts" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select Contracts.svc or Contracts.svc.cs at the Solution Explorer and start debugging.
    public class Customers : ICustomers
    {
        public List<CustomerInfo> CustomersGetInfo(Int64 CustomerID, String CustomerName)
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
                    cmd.Parameters.AddWithValue("@CustomerName", CustomerName); 
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
                                BillingAdd3 = dr["BillingAdd3"].ToString(),
                                DUNSNumber = dr["DUNSNumber"].ToString(),                                
                                CreditScore = Convert.ToInt64(dr["CreditScore"].ToString()),
                                CreditScoreText = dr["CreditScoreText"].ToString(),
                                PhoneNumber = dr["PhoneNumber"].ToString(),
                                CityID = Convert.ToInt64(dr["CityID"].ToString()),
                                CityName = dr["CityName"].ToString(),
                                StateAbb = dr["StateAbb"].ToString(),
                                StateName = dr["StateName"].ToString(),
                                ZipCode = dr["ZipCode"].ToString(),
                                LineOfBusinessID = Convert.ToInt64(dr["LineOfBusinessID"].ToString()),
                                LineOfBusiness = dr["LineOfBusiness"].ToString(),
                                Active = Convert.ToBoolean(dr["Active"].ToString()),
                                FileID = Convert.ToInt64(dr["FileID"].ToString()),
                                FileName = dr["FileName"].ToString(),
                                ModifiedDate = Convert.ToDateTime(dr["ModifiedDate"].ToString()),
                                InsertDate = Convert.ToDateTime(dr["InsertDate"].ToString()),                      
                            });
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }

        public String CustomerNameUpsert(String CustomerOldName, String CustomerNewName)
        {
            String SelectionItemsinfo = "ERROR";

            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[CustomerNameUpsert]";
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = SqlCommandText;
                    cmd.Parameters.AddWithValue("@CustomerOldName", CustomerOldName);
                    cmd.Parameters.AddWithValue("@CustomerNewName", CustomerNewName);                  
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
                            SelectionItemsinfo = dr["ResultStatus"].ToString();
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }
        public String CustomerUpsert(Int64 CustomerID, String CustomerName, String BillingAddrOne, String BillingAddrTwo, String BillingAddrThree, String DUNSNumber, String CreditScore, String PhoneNumber, Int64 CityID, String ZipCode, Int64 LineOfBusinessID, String StateAbb)
        {
            String SelectionItemsinfo = "ERROR";
            
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[CustomerUpsert]";
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = SqlCommandText;
                    cmd.Parameters.AddWithValue("@CustomerID", CustomerID);
                    cmd.Parameters.AddWithValue("@CustomerName", CustomerName);
                    cmd.Parameters.AddWithValue("@BillingAddr1", BillingAddrOne);
                    cmd.Parameters.AddWithValue("@BillingAddr2", BillingAddrTwo);
                    cmd.Parameters.AddWithValue("@BillingAddr3", BillingAddrThree);
                    cmd.Parameters.AddWithValue("@DunsNumber", DUNSNumber);
                    cmd.Parameters.AddWithValue("@CreditScore", CreditScore);
                    cmd.Parameters.AddWithValue("@PhoneNumber", PhoneNumber);    
                    cmd.Parameters.AddWithValue("@CityID", CityID);
                    cmd.Parameters.AddWithValue("@ZipCode", ZipCode);
                    cmd.Parameters.AddWithValue("@LineOfBusinessID", LineOfBusinessID);
                    cmd.Parameters.AddWithValue("@StateAbb", @StateAbb);
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
