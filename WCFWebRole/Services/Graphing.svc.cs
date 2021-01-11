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



        public GraphIntegerTimeData GraphRetailRisk(String FieldString)
        {
            GraphIntegerTimeData ReturnValue = new GraphIntegerTimeData();
            ReturnValue = GraphIntTimeFctn("[Graphing].[RetailRiskGetInfo]", FieldString);
            return ReturnValue;
        }
        public GraphIntegerTimeData GraphPeakModel(String FieldString)
        {
            GraphIntegerTimeData ReturnValue = new GraphIntegerTimeData();
            ReturnValue = GraphIntTimeFctn("[Graphing].[PeakModelGetInfo]", FieldString);
            return ReturnValue;
        }
        private GraphIntegerTimeData GraphIntTimeFctn(String StoredProcedure, String FieldString)
        {
                     
            List<GraphIntTime> GraphIntTimeRet = new List<GraphIntTime>();
            List<SelectorType> ColumnNameRet = new List<SelectorType>();
            List<SelectorType> TimeNameRet = new List<SelectorType>();

            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = StoredProcedure;
                    cmd.Parameters.AddWithValue("@FieldString", FieldString);
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
                    // Graph Values
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        foreach (DataRow dr in ds.Tables[0].Rows)
                        {
                            GraphIntTimeRet.Add(new GraphIntTime
                            {

                                ColumnName = dr["ColumnName"].ToString(),
                                TimeName = dr["TimeName"].ToString(),
                                GraphValue = Convert.ToDouble(dr["GraphValue"].ToString()),
                            });
                        }

                    }
                    // Column Names
                    if (ds.Tables[1].Rows.Count > 0)
                    {
                        foreach (DataRow dr in ds.Tables[1].Rows)
                        {
                            ColumnNameRet.Add(new SelectorType
                            {

                                SelectorID = dr["ColumnID"].ToString(),
                                SelectorText = dr["ColumnName"].ToString(),
                                Color = dr["Color"].ToString(),
                            });
                        }

                    }
                    // Time Name
                    if (ds.Tables[2].Rows.Count > 0)
                    {
                        foreach (DataRow dr in ds.Tables[2].Rows)
                        {
                            TimeNameRet.Add(new SelectorType
                            {

                                SelectorID = dr["TimeID"].ToString(),
                                SelectorText = dr["TimeName"].ToString(),
                            });
                        }

                    }
                }
            }
            GraphIntegerTimeData SelectionItemsinfo = new GraphIntegerTimeData();
            SelectionItemsinfo.GraphIntTime = GraphIntTimeRet;
            SelectionItemsinfo.TimeName = TimeNameRet;
            SelectionItemsinfo.ColumnName = ColumnNameRet;

            return SelectionItemsinfo;
        }

        public GraphPricingSummary PricingSummaryGetInfo(String FieldString)
        {

            GraphPricingSummary SelectionItemsinfo = new GraphPricingSummary();
            List<WaterfallChart> GraphOne = new List<WaterfallChart>();
            List<GraphXYGenericTableSingle> GraphTwo = new List<GraphXYGenericTableSingle>();
            List<GraphXYGenericTableDual> GraphThree = new List<GraphXYGenericTableDual>();
            
            List<SelectorType> SubCategories = new List<SelectorType>();            
            List<SelectorType> Categories = new List<SelectorType>();            
            List<SelectorType> Customers = new List<SelectorType>();


            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[Graphing].[PriceSummaryGetInfo]";
                    cmd.Parameters.AddWithValue("@FieldString", FieldString);
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
                    // Graph Values
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        foreach (DataRow dr in ds.Tables[0].Rows)
                        {
                            GraphOne.Add(new WaterfallChart
                            {

                                ColumnName = dr["SubCategory"].ToString(),
                                GraphValue = Convert.ToDouble(dr["GraphValue"].ToString()),
                                MinValue = Convert.ToDouble(dr["MinValue"].ToString()),
                                MaxValue = Convert.ToDouble(dr["MaxValue"].ToString()),
                            });
                        }

                    }
                    // Graph Values
                    if (ds.Tables[1].Rows.Count > 0)
                    {
                        foreach (DataRow dr in ds.Tables[1].Rows)
                        {
                            GraphTwo.Add(new GraphXYGenericTableSingle
                            {

                                ColumnID = dr["ColumnID"].ToString(),
                                ColumnName = dr["ColumnName"].ToString(),
                                GraphValue = Convert.ToDouble(dr["GraphValue"].ToString()),
                            });
                        }

                    }
                    // Column Names
                    if (ds.Tables[2].Rows.Count > 0)
                    {
                        foreach (DataRow dr in ds.Tables[2].Rows)
                        {
                            GraphThree.Add(new GraphXYGenericTableDual
                            {
                                ColumnOneID = dr["ColumnOneID"].ToString(),
                                ColumnOneName = dr["ColumnOneName"].ToString(),
                                ColumnTwoID = dr["ColumnTwoID"].ToString(),
                                ColumnTwoName = dr["ColumnTwoName"].ToString(),

                                GraphValue = Convert.ToDouble(dr["GraphValue"].ToString()),

                            });
                        }

                    }
                    // Time Name
                    if (ds.Tables[3].Rows.Count > 0)
                    {
                        foreach (DataRow dr in ds.Tables[3].Rows)
                        {
                            SubCategories.Add(new SelectorType
                            {

                                SelectorID = dr["SelectorID"].ToString(),
                                SelectorText = dr["SelectorText"].ToString(),
                                Color = dr["Color"].ToString(),
                            });
                        }

                    }
                    // Time Name
                    if (ds.Tables[4].Rows.Count > 0)
                    {
                        foreach (DataRow dr in ds.Tables[4].Rows)
                        {
                            Categories.Add(new SelectorType
                            {

                                SelectorID = dr["SelectorID"].ToString(),
                                SelectorText = dr["SelectorText"].ToString(),
                                Color = dr["Color"].ToString(),
                            });
                        }

                    }
                    // Time Name
                    if (ds.Tables[5].Rows.Count > 0)
                    {
                        foreach (DataRow dr in ds.Tables[5].Rows)
                        {
                            Customers.Add(new SelectorType
                            {

                                SelectorID = dr["SelectorID"].ToString(),
                                SelectorText = dr["SelectorText"].ToString(),
                                Color = dr["Color"].ToString(),
                            });
                        }

                    }
                }
            }
            SelectionItemsinfo.GraphOne = GraphOne;
            SelectionItemsinfo.GraphTwo = GraphTwo;
            SelectionItemsinfo.GraphThree = GraphThree;
            SelectionItemsinfo.Customers = Customers;
            SelectionItemsinfo.Categories = Categories;
            SelectionItemsinfo.SubCategories = SubCategories;
            return SelectionItemsinfo;
        }



        public GraphMonthly MonthlyEnergyUsageGetInfo(String FieldString)            

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
                    cmd.Parameters.AddWithValue("@FieldString", FieldString);
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


        public GraphHourlyShapes HourlyShapesGetInfo(String FieldString)
        {

            List<GraphHourlyShapesData> GraphingData = new List<GraphHourlyShapesData>();
            List<SelectorType> WholeSaleBlocks = new List<SelectorType>();
            List<SelectorType> Hours = new List<SelectorType>();
            

            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[Graphing].[HourlyShapesGetInfo]";
                    cmd.Parameters.AddWithValue("@FieldString", FieldString);
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
                            GraphingData.Add(new GraphHourlyShapesData
                            {

                                WholesaleBlock = dr["WholeSaleBlocks"].ToString(),
                                HE = dr["HE"].ToString(),
                                LoadMWh = Convert.ToDouble(dr["HourlyLoadKW"].ToString()),
                            });
                        }

                    }
                    // Whole Sale Blocks
                    if (ds.Tables[1].Rows.Count > 0)
                    {
                        foreach (DataRow dr in ds.Tables[1].Rows)
                        {
                            WholeSaleBlocks.Add(new SelectorType
                            {

                                SelectorID = dr["WholeSaleBlocksID"].ToString(),
                                SelectorText = dr["WholeSaleBlocks"].ToString(),
                                Color = dr["Color"].ToString(),
                            });
                        }

                    }
                    // Hours
                    if (ds.Tables[2].Rows.Count > 0)
                    {
                        foreach (DataRow dr in ds.Tables[2].Rows)
                        {
                            Hours.Add(new SelectorType
                            {

                                SelectorID = dr["HE"].ToString(),
                                SelectorText = dr["HE"].ToString(),
                            });
                        }

                    }
                }
            }                 

            
            GraphHourlyShapes SelectionItemsinfo = new GraphHourlyShapes();
            SelectionItemsinfo.GraphHourlyShapesData = GraphingData;
            SelectionItemsinfo.WholeSaleBlocks = WholeSaleBlocks;
            SelectionItemsinfo.Hours = Hours;

            return SelectionItemsinfo;
        }


        public List<SelectorType> DealsGetInfo()
        {
            String SqlCommandText = "[WebSite].[GraphingDealsGetInfo]";
            List<SelectorType> SelectionItemsinfo = new List<SelectorType>();
            String SelectorIDField = "SelectorID";
            String SelectorTextField = "SelectorText";
            SelectionItemsinfo = GenericSelectorReturn(SqlCommandText, SelectorIDField, SelectorTextField);
            return SelectionItemsinfo;
        }


        public List<SelectorType> TermsGetInfo()
        {
            String SqlCommandText = "[WebSite].[GraphingTermsGetInfo]";
            List<SelectorType> SelectionItemsinfo = new List<SelectorType>();
            String SelectorIDField = "SelectorID";
            String SelectorTextField = "SelectorText";
            SelectionItemsinfo = GenericSelectorReturn(SqlCommandText, SelectorIDField, SelectorTextField);
            return SelectionItemsinfo;
        }

        public List<SelectorType> SubCategoryGetInfo()
        {
            String SqlCommandText = "[WebSite].[GraphingSubCategoryGetInfo]";
            List<SelectorType> SelectionItemsinfo = new List<SelectorType>();
            String SelectorIDField = "SubCategoryID";
            String SelectorTextField = "SubCategory";
            SelectionItemsinfo = GenericSelectorReturn(SqlCommandText, SelectorIDField, SelectorTextField);
            return SelectionItemsinfo;
        }

        public List<SelectorType> CategoriesGetInfo()
        {
            String SqlCommandText = "[WebSite].[GraphingCategoryGetInfo]";
            List<SelectorType> SelectionItemsinfo = new List<SelectorType>();
            String SelectorIDField = "CategoryID";
            String SelectorTextField = "Category";
            SelectionItemsinfo = GenericSelectorReturn(SqlCommandText, SelectorIDField, SelectorTextField);
            return SelectionItemsinfo;
        }



        public List<SelectorType> FacilitiesGetInfo()
        {

            String SqlCommandText = "[WebSite].[GraphingFacilityGetInfo]";
            List<SelectorType> SelectionItemsinfo = new List<SelectorType>();
            String SelectorIDField = "SelectorID";
            String SelectorTextField = "SelectorText";
            SelectionItemsinfo = GenericSelectorReturn(SqlCommandText, SelectorIDField, SelectorTextField);
            return SelectionItemsinfo;

        }
        public List<SelectorType> CustomersGetInfo()
        {
            String SqlCommandText = "[WebSite].[GraphingCustomerGetInfo]";
            List<SelectorType> SelectionItemsinfo = new List<SelectorType>();
            String SelectorIDField = "SelectorID";
            String SelectorTextField = "SelectorText";
            SelectionItemsinfo = GenericSelectorReturn(SqlCommandText, SelectorIDField, SelectorTextField);
            return SelectionItemsinfo;
        }
        
        public List<SelectorType> AllWeatherScenariosGetInfo()
        {

            String SqlCommandText = "[WebSite].[WeatherScenarioAllGetInfo]";
            List<SelectorType> SelectionItemsinfo = new List<SelectorType>();
            String SelectorIDField = "SelectorID";
            String SelectorTextField = "SelectorText";
            SelectionItemsinfo = GenericSelectorReturn(SqlCommandText, SelectorIDField, SelectorTextField);
            return SelectionItemsinfo;
        }

        // Private Functions
        private List<SelectorType> GenericSelectorReturn(String StoredProcedure, String SelectorIDField, String SelectorTextField)
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
                                SelectorID = dr[SelectorIDField].ToString(),
                                SelectorText = dr[SelectorTextField].ToString(),
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
