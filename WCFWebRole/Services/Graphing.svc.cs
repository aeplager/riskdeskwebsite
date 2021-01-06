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
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "Contracts" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select Contracts.svc or Contracts.svc.cs at the Solution Explorer and start debugging.
    public class Graphing : IGraphing
    {
        public GraphMonthly MonthlyEnergyUsageGetInfo()            
        {

            List<GraphMonthlyData> GraphingData = new List<GraphMonthlyData>();
            List<SelectorType> SelectorItem = new List<SelectorType>();
            List<MonthDef> MonthlyItem = new List<MonthDef>();

            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[Graphing].[MonthlyEnergyUsageGetInfo]";
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
                    // Graph Monthly
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        foreach (DataRow dr in ds.Tables[0].Rows)
                        {
                            GraphingData.Add(new GraphMonthlyData
                            {

                                WholesaleBlock = dr["WholeSaleBlocks"].ToString(),
                                Month = dr["MonthsShortName"].ToString(),
                                MonthlyUsageMWH = Convert.ToDouble(dr["MonthlyUsageMWH"].ToString()),
                            });
                        }

                    }
                    // Whole Sale Blocks
                    if (ds.Tables[1].Rows.Count > 0)
                    {
                        foreach (DataRow dr in ds.Tables[1].Rows)
                        {
                            SelectorItem.Add(new SelectorType
                            {

                                SelectorID = dr["WholeSaleBlocksID"].ToString(),
                                SelectorText= dr["WholeSaleBlocks"].ToString(),
                                Color= dr["Color"].ToString(),
                            });
                        }

                    }
                    // Months
                    if (ds.Tables[2].Rows.Count > 0)
                    {
                        foreach (DataRow dr in ds.Tables[2].Rows)
                        {
                            MonthlyItem.Add(new MonthDef
                            {

                                MonthID = dr["MonthsID"].ToString(),
                                MonthShortName = dr["MonthsShortName"].ToString(),                                
                            });
                        }

                    }
                }
            }
            GraphMonthly SelectionItemsinfo = new GraphMonthly();
            SelectionItemsinfo.GraphMonthlyData = GraphingData;
            SelectionItemsinfo.MonthDef = MonthlyItem;
            SelectionItemsinfo.WholeSaleBlocks = SelectorItem;

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
