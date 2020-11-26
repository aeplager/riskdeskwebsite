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
// PDF Translation
using System.Threading.Tasks;
using org.apache.pdfbox.pdmodel;
using org.apache.pdfbox.util;
using org.apache.pdfbox.cos;
using org.apache.pdfbox.pdfparser;
using org.apache.pdfbox.io;
using org.apache.pdfbox.pdfviewer;
using org.apache.pdfbox.pdfwriter;
using System.Text.RegularExpressions;

namespace WCFWebRole.Services
{
	// NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "CurveUploader" in code, svc and config file together.
	// NOTE: In order to launch WCF Test Client for testing this service, please select CurveUploader.svc or CurveUploader.svc.cs at the Solution Explorer and start debugging.
	public class SharedInfo : ISharedInfo
    {



        public List<SelectorType> StatesGetInfo()
        {

            List<SelectorType> SelectionItemsinfo = new List<SelectorType>();
            SelectionItemsinfo = GenericGetInfo("[WebSite].[StateGetInfo]", "stateabb", "Statename");
            return SelectionItemsinfo;
        }

        public List<SelectorType> LineOfBusinessGetInfo(String LineOfBusinessID)
        {
            // Move to Facility
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
                    if (LineOfBusinessID == null) { cmd.Parameters.AddWithValue("@LineOfBusinessID", LineOfBusinessID); }
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
      

        public List<CityInfo> CityGetInfo(String CityID, String StateAbb)
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
                    if ((StateAbb != null)) { cmd.Parameters.AddWithValue("@StateAbb", StateAbb);}
                    long number1 = 0;
                    bool canConvert = long.TryParse(CityID, out number1);
                    if ((CityID != null) && (canConvert == true)) { cmd.Parameters.AddWithValue("@CityID", CityID);}                    
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

                                CityID = Convert.ToInt64(dr["Cityid"].ToString()),
                                CityName = dr["CityName"].ToString(),
                                StateAbb = dr["StateAbb"].ToString(),
                                StateName = dr["StateName"].ToString(),
                            });
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }

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
        private String ReturnForwardDate(String InputDate)
        {
            try
            {
                String ReturnValue = "FAIL";
                InputDate = InputDate.Trim();
                if (InputDate.Length == 5)
                {
                    String Mn = InputDate.Substring(0, 3);
                    String Yr = InputDate.Replace(Mn, "");
                    int YearInteger = Convert.ToInt32(Yr) + 2000;
                    ReturnValue = InputDate.Substring(0, 3) + "/01/" + YearInteger.ToString();
                }
                return ReturnValue;
            }
            catch (Exception ex)
            {
                return "FAIL";
            }
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

        private static string parseUsingPDFBox(string input)
        {
            PDDocument doc = null;

            try
            {
                doc = PDDocument.load(input);
                PDFTextStripper stripper = new PDFTextStripper();
                return stripper.getText(doc);
            }
            finally
            {
                if (doc != null)
                {
                    doc.close();
                }
            }
        }
    }
}
