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
	public class CurveUploader : ICurveUploader
	{


        public String GenericValidatedDataUpsert(String FileName, String InformationType, Int32 FirstRowOfData, String FieldString)
        {
            String SelectionItemsinfo;
            SelectionItemsinfo = "FAILURE";
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            Int64 InformationTypeID = Convert.ToInt64(InformationType);
            Int64 FirstRowOfDataID = Convert.ToInt64(FirstRowOfData);
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[GenericValidatedDataUpsert]";
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = SqlCommandText;
                    cmd.CommandTimeout = 120;
                    cmd.Parameters.AddWithValue("@FileName", FileName); 
                    cmd.Parameters.AddWithValue("@InformationTypeID", InformationTypeID); 
                    cmd.Parameters.AddWithValue("@FirstRowOfData", FirstRowOfDataID);
                    cmd.Parameters.AddWithValue("@FieldString", FieldString);
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

        public List<SelectorType> FileTypeGetInfo(String FileTypeID)
        {
            List<SelectorType> SelectionItemsinfo = new List<SelectorType>();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[FileTypeGetInfo]";
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = SqlCommandText;
                    cmd.Connection = con;
                    if (FileTypeID != null)
                    {
                        Int64 iFileTypeID = Convert.ToInt64(FileTypeID);
                        cmd.Parameters.AddWithValue("@FileTypeID", iFileTypeID);
                    }
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

                                SelectorID = dr["FileTypeID"].ToString(),
                                SelectorText = dr["FileType"].ToString(),
                            });
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }

        public List<SelectorType> LineStartGetInfo(String LineStartID)
        {
            List<SelectorType> SelectionItemsinfo = new List<SelectorType>();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[LineStartGetInfo]";
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = SqlCommandText;
                    cmd.Connection = con;
                    if (LineStartID != null)
                    {
                        Int64 iLineStartID = Convert.ToInt64(LineStartID);
                        cmd.Parameters.AddWithValue("@LineStartID", iLineStartID);
                    }
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

                                SelectorID = dr["LineStartID"].ToString(),
                                SelectorText = dr["LineStart"].ToString(),
                            });
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }

        public List<SelectorType> CustomerNameGetInfo(String CustomerID)
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
                    cmd.CommandText = SqlCommandText;
                    cmd.Connection = con;
                    if (CustomerID != null)
                    {
                        Int64 iCustomerID = Convert.ToInt64(CustomerID);
                        cmd.Parameters.AddWithValue("@CustomerID", iCustomerID);
                    }
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
                                SelectorText = dr["CustomerName"].ToString(),
                            });
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }
        //SelectorType
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
                    cmd.CommandTimeout = 60;
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
        public String GenericFileUpsert(String FileName, String FileTypeName, String ContainerName, String RandomNumber)
        {

            String SelectionItemsinfo = "FAILURE";
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.CommandTimeout = 60;
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
            if (ds != null)
            {
                if (ds.Tables.Count > 0)
                {
                    if (ds.Tables["SelectionItems"].Rows.Count > 0)
                    {
                        foreach (DataRow dr in ds.Tables["SelectionItems"].Rows)
                        {
                            SelectionItemsinfo = dr["RunStatus"].ToString();
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
        public int TranslateSinglePDF(String FileName)
        {
            try
            {
                string _storageConnection = "DefaultEndpointsProtocol=https;AccountName=riskdeskstorage;AccountKey=BfW33L2PRjw/E8bm5EDEOmqcXbZJ6/fQL21uWfQKmidt7vKw+A0JlYVZzPYfk8UPbtKwBLxqrHh/5CoOGDR4tA==;EndpointSuffix=core.windows.net";
                CloudStorageAccount cloudStorageAccount = CloudStorageAccount.Parse(_storageConnection);
                CloudBlobClient _blobClient = cloudStorageAccount.CreateCloudBlobClient();
                // Name the container
                String _containerName = "icecurves";
                CloudBlobContainer _cloudBlobContainer = _blobClient.GetContainerReference(_containerName);
                // Pull in blob                          
                if (FileName.Length >= ( 4))
                {   
                    if (FileName.Substring(FileName.Length - 4).ToLower() == ".pdf")
                    {
                        // Obtain Cloud Blob
                        CloudBlockBlob _blockBlob = _cloudBlobContainer.GetBlockBlobReference(FileName);
                        MemoryStream memStream = new MemoryStream();
                        // Convert Blob to Memory Stream
                        _blockBlob.DownloadToStream(memStream);
                        byte[] bytes = memStream.ToArray();
                        Console.WriteLine(bytes.Length);
                        if (bytes.Length > 25)
                        {
                            // Convert to Java Input Stream
                            java.io.InputStream JavaInputStream = new java.io.ByteArrayInputStream(bytes);
                            PDDocument PDFdocument = null;
                            // Push Java Input Stream Into PDDOcument from PDFBox
                            PDFdocument = PDDocument.load(JavaInputStream);
                            PDFTextStripper pdfStripper = new PDFTextStripper();
                            string theText = pdfStripper.getText(PDFdocument);

                            // Put into an array of values
                            String[] Lines = theText.Split(new[] { Environment.NewLine }, StringSplitOptions.None);
                            if (SeparateLinesIntoDBUpload(FileName, Lines) == true) { Console.WriteLine("Finished Uploading Files"); }
                            //Console.WriteLine(Lines[1].ToString());
                            //Console.WriteLine(Lines.Length.ToString());
                            pdfStripper = null;
                            PDFdocument.close();
                        }
                    }
                }                   
                return 1;
            }
            catch (Exception ex)
            {
                string Error = ex.ToString();
                return -1;
            }
        }
        public int TranslatePDFs(String FileSuffix)
        {
            try
            {
                string _storageConnection = "DefaultEndpointsProtocol=https;AccountName=riskdeskstorage;AccountKey=BfW33L2PRjw/E8bm5EDEOmqcXbZJ6/fQL21uWfQKmidt7vKw+A0JlYVZzPYfk8UPbtKwBLxqrHh/5CoOGDR4tA==;EndpointSuffix=core.windows.net";
                CloudStorageAccount cloudStorageAccount = CloudStorageAccount.Parse(_storageConnection);
                CloudBlobClient _blobClient = cloudStorageAccount.CreateCloudBlobClient();
                // Name the container
                String _containerName = "icecurves";
                CloudBlobContainer _cloudBlobContainer = _blobClient.GetContainerReference(_containerName);
                // Pull in blob  
                List<String> ListOfFiles = new List<String>();
                foreach (IListBlobItem blobItem in _cloudBlobContainer.ListBlobs())
                {
                    if (blobItem is CloudBlob)
                    {
                        String FileName = blobItem.Uri.ToString();
                        int FileLoc = FileName.IndexOf(_containerName) + _containerName.Length + 1;
                        if (FileName.Length >= (FileLoc + 4))
                        {
                            FileName = FileName.Substring(FileLoc, FileName.Length - FileLoc);
                            if ((FileName.Substring(FileName.Length - 4).ToLower() == ".pdf") && (FileName.Contains(FileSuffix)==true))
                            {
                                ListOfFiles.Add(FileName);
                                Console.WriteLine(FileName);
                                // Obtain Cloud Blob
                                CloudBlockBlob _blockBlob = _cloudBlobContainer.GetBlockBlobReference(FileName);
                                MemoryStream memStream = new MemoryStream();
                                // Convert Blob to Memory Stream
                                _blockBlob.DownloadToStream(memStream);
                                byte[] bytes = memStream.ToArray();
                                Console.WriteLine(bytes.Length);
                                if (bytes.Length > 25)
                                {
                                    // Convert to Java Input Stream
                                    java.io.InputStream JavaInputStream = new java.io.ByteArrayInputStream(bytes);
                                    PDDocument PDFdocument = null;
                                    // Push Java Input Stream Into PDDOcument from PDFBox
                                    PDFdocument = PDDocument.load(JavaInputStream);
                                    PDFTextStripper pdfStripper = new PDFTextStripper();
                                    string theText = pdfStripper.getText(PDFdocument);

                                    // Put into an array of values
                                    String[] Lines = theText.Split(new[] { Environment.NewLine }, StringSplitOptions.None);
                                    if (SeparateLinesIntoDBUpload(FileName, Lines) == true) { Console.WriteLine("Finished Uploading Files"); }
                                    //Console.WriteLine(Lines[1].ToString());
                                    //Console.WriteLine(Lines.Length.ToString());
                                    PDFdocument.close();
                                }
                            }
                        }
                    }
                }
                //Console.WriteLine("Success");
                //Console.ReadLine();

                return 1;                   
            }
            catch (Exception ex)
            {
                string Error = ex.ToString();
                return -1;
            }
        }
        private bool SeparateLinesIntoDBUpload(String FileName, String[] Lines)
        {
            try
            {
                // Uploading the data into the db
                int iLimit = Lines.Length;
                DateTime CurveDate = new DateTime();
                String CurveName = "";
                String CurveDateString = Lines[1].ToString();
                CurveDate = Convert.ToDateTime(CurveDateString);
                CurveName = Lines[15].ToString();
                CurveName = CurveName.Trim();
                String CurveAbb = CurveName.Substring(0, 3);
                String CurrentCurveAbb = "";
                string[] values;
                List<CurveDates> CurveDateList = new List<CurveDates>();
                for (int iRow = 16; iRow < iLimit; iRow++)
                {
                    String CurrentLine = Lines[iRow].ToString();
                    CurrentLine = CurrentLine.TrimEnd();
                    CurrentLine = CurrentLine.TrimStart();
                    if (CurrentLine.Length >= 3)
                    {
                        CurrentCurveAbb = CurrentLine.Substring(0, 3);
                        if (CurrentCurveAbb == CurveAbb)
                        {
                            values = CurrentLine.Split(' ');
                            String ForwardDateString = ReturnForwardDate(values[1].ToString());
                            if (ForwardDateString != "FAIL")
                            {
                                // If the date is a date then, move to the rest of the values
                                DateTime ForwardDate = Convert.ToDateTime(ForwardDateString);
                                CurveDates CD = new CurveDates();
                                CD.CurveLongName = CurveName;
                                CD.CurveShortName = CurveAbb;
                                CD.CurveDate = CurveDate;
                                CD.ForwardDate = ForwardDate;
                                CD.SettlePrice = Convert.ToDouble(values[2].ToString());
                                CD.SettleChange = Convert.ToDouble(values[3].ToString());
                                CD.TotalVolume = Convert.ToDouble(values[4].ToString());
                                CD.OI = Convert.ToDouble(values[5].ToString());
                                CD.OIChange = Convert.ToDouble(values[6].ToString());
                                CD.EFP = Convert.ToDouble(values[7].ToString());
                                CD.EFS = Convert.ToDouble(values[8].ToString());
                                CD.BlockVolume = Convert.ToDouble(values[9].ToString());
                                CD.SpreadVolume = Convert.ToDouble(values[10].ToString());
                                CurveDateList.Add(CD);
                                Console.WriteLine(ForwardDateString.ToString());
                            }
                        }
                    }
                    //Console.WriteLine(CurrentLine);
                }
                // Upload File
                FileInformation FLInfo = FileGetInfo(FileName, "ICECURVE", "FAIL");
                // Upload Curve                
                for (int iRow = 0; iRow < CurveDateList.Count; iRow++)
                {
                    // Update DB
                    if (UploadCurveToDB(FLInfo.FileID,CurveDateList[iRow]) == false)
                    {                        
                        Console.WriteLine("Failure");
                    }
                }
                FLInfo = FileGetInfo(FileName, "ICECURVE", "SUCC");
                return true;
            }
            catch (Exception ex)
            {
                string Error = ex.ToString();
                return false;
            }

        }

        public String WaitSystemSeconds(int iSeconds)
        {
            System.Threading.Thread.Sleep(iSeconds * 1000);
            return "Success";
        }

        public FileInformation FileStatusGetInfo(String FileName, String FileType)
        {
            FileInformation SelectionItemsinfo = new FileInformation();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[FileStatusGetInfo]";
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = SqlCommandText;
                    cmd.Parameters.AddWithValue("@FileName", FileName);
                    cmd.Parameters.AddWithValue("@FileType", FileType);                    
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
                            SelectionItemsinfo.FileID = Convert.ToInt64(dr["FileID"]);
                            SelectionItemsinfo.FileName = dr["FileName"].ToString();
                            SelectionItemsinfo.FileStatus = dr["FileStatus"].ToString();
                            SelectionItemsinfo.PercentDone = System.Convert.ToInt64(dr["PercentDone"].ToString());
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }


        private FileInformation FileGetInfo(String FileName, String FileType, String FileStatus)
        {
            FileInformation SelectionItemsinfo = new FileInformation();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[FileGetInfo]";
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = SqlCommandText;
                    cmd.Parameters.AddWithValue("@FileName", FileName);
                    cmd.Parameters.AddWithValue("@FileType", FileType);
                    cmd.Parameters.AddWithValue("@FileStatus", FileStatus);
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
                            SelectionItemsinfo.FileID = Convert.ToInt32(dr["FileID"]);
                            SelectionItemsinfo.FileName = dr["FileName"].ToString();
                            SelectionItemsinfo.FileStatus = dr["FileStatus"].ToString();
                            SelectionItemsinfo.FileType = dr["FileType"].ToString();
                            SelectionItemsinfo.NewFile = Convert.ToBoolean(dr["NewFile"].ToString());
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }
        private bool UploadCurveToDB(Int64 FileID,CurveDates CD)
        {
            try
            {
                
                DataSet ds = new DataSet();
                string ConnectionString = ReturnConnectionString();
                using (SqlConnection con = new SqlConnection(ConnectionString))
                {
                    using (SqlCommand cmd = new SqlCommand())
                    {
                        string SqlCommandText = "[CurveData].[ICECurvesUpsert]";
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.CommandText = SqlCommandText;
                        cmd.Parameters.AddWithValue("@CurveShortName", CD.CurveShortName);
                        cmd.Parameters.AddWithValue("@CurveLongName", CD.CurveLongName);
                        cmd.Parameters.AddWithValue("@CurveDate", CD.CurveDate);
                        cmd.Parameters.AddWithValue("@ForwardDate", CD.ForwardDate);
                        cmd.Parameters.AddWithValue("@SettlePrice", CD.SettlePrice);
                        cmd.Parameters.AddWithValue("@SettleChange", CD.SettleChange);
                        cmd.Parameters.AddWithValue("@TotalVolume", CD.TotalVolume);
                        cmd.Parameters.AddWithValue("@OI", CD.OI);
                        cmd.Parameters.AddWithValue("@OIChange", CD.OIChange);
                        cmd.Parameters.AddWithValue("@EFP", CD.EFP);
                        cmd.Parameters.AddWithValue("@EFS", CD.EFS);
                        cmd.Parameters.AddWithValue("@BlockVolume", CD.BlockVolume);
                        cmd.Parameters.AddWithValue("@SpreadVolume", CD.SpreadVolume);
                        cmd.Parameters.AddWithValue("@FileID", FileID);
                        cmd.Connection = con;
                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            da.Fill(ds, "SelectionItems");
                        }
                    }
                }
                return true;
            } catch(Exception ex)
            {
                return false;
            }            
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
        public List<FileInformation> GetFileAllFileInfo()
        {
            List<FileInformation> SelectionItemsinfo = new List<FileInformation>();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[CurveData].[ICECurveFileGetInfo]";
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
                            SelectionItemsinfo.Add(new FileInformation
                            {
                                FileID = Convert.ToInt32(dr["FileID"]),
                                FileName = dr["FileName"].ToString(),
                                FileStatus = dr["FileStatus"].ToString(),
                                FileType = dr["FileType"].ToString(),
                                CurveName = dr["CurveShortName"].ToString(),
                                CurveDateString = Convert.ToDateTime(dr["CurveDate"].ToString()).ToString("MM/dd/yyyy"),
                                MinForwardDateString = Convert.ToDateTime(dr["MinForwardDate"].ToString()).ToString("MM/dd/yyyy"),
                                MaxForwardDateString = Convert.ToDateTime(dr["MaxForwardDate"].ToString()).ToString("MM/dd/yyyy"),
                            });
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }
    }
}
