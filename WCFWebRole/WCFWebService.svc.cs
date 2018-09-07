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
            AzureParms.SASKey = "?sv=2017-11-09&ss=b&srt=sco&sp=rwdlac&se=2018-09-08T03:48:38Z&st=2018-09-05T19:48:38Z&spr=https,http&sig=b2cbJHx51ell2qHK3qCV1Uoni7AKQtZOzlmSiOJ%2B00s%3D";
            AzureParms.blobUri = "https://riskdeskstorage.blob.core.windows.net";

            return AzureParms;
        }
        public String ObtainDateSuffix()
        {
            DateTime CD = System.DateTime.UtcNow;
            String ReturnString = CD.Year.ToString() + "_" + CD.Month.ToString() + "_" + CD.Day.ToString() + "_" + CD.Hour.ToString() + "_" + CD.Second.ToString() + "_";
            return ReturnString;
        }
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
                    cmd.Parameters.AddWithValue("@FileID", FileID);
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
        public List<CustomerInfo> CustomersAllGetInfo()
        {

            List<CustomerInfo> SelectionItemsinfo = new List<CustomerInfo>();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[CustomerAllGetInfo]";
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
                                billingadd1 = dr["billingadd1"].ToString(),
                                billingadd2 = dr["billingadd2"].ToString(),
                                cityid = Convert.ToInt32(dr["cityid"].ToString()),
                                CityName = dr["CityName"].ToString(),
                                zip = dr["zip"].ToString(),
                                stateabb = dr["stateabb"].ToString(),
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
                                CustomerID = Convert.ToInt32(dr["customerid"].ToString()),
                                CustomerName = dr["customername"].ToString(),
                                billingadd1 = dr["billingadd1"].ToString(),
                                billingadd2 = dr["billingadd2"].ToString(),
                                cityid = Convert.ToInt32(dr["cityid"].ToString()),
                                CityName = dr["CityName"].ToString(),
                                zip = dr["zip"].ToString(),
                                stateabb = dr["stateabb"].ToString(),
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
                                billingadd1 = dr["billingadd1"].ToString(),
                                billingadd2 = dr["billingadd2"].ToString(),
                                //cityid = Convert.ToInt32(dr["cityid"].ToString()),
                                CityName = dr["City"].ToString(),
                                zip = dr["zip"].ToString(),
                                stateabb = dr["stateabb"].ToString(),
                                StartDate = Convert.ToDateTime(dr["startdate"].ToString()),
                                EndDate = Convert.ToDateTime(dr["enddate"].ToString()),                                
                                StartDateString = String.Format("{0:MM/dd/yyyy}", Convert.ToDateTime(dr["startdate"].ToString())),
                                EndDateString = String.Format("{0:MM/dd/yyyy}", Convert.ToDateTime(dr["enddate"].ToString())),
                                Active = Convert.ToBoolean(dr["Active"].ToString()),
                                FileName = dr["FileName"].ToString(),
                                NewCityID = Convert.ToInt32(dr["NewCityID"].ToString()),
                                InsertDate = Convert.ToDateTime(dr["InsertDate"].ToString()),
                                NewCustomer = dr["NewCustomer"].ToString(),
                            });
                        }
                    }
                }
            }
            return SelectionItemsinfo;
        }


        #endregion
        // Deal Calls
        #region      
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
                                StartDate  = String.Format("{0:MM/dd/yyyy}", Convert.ToDateTime(dr["startdate"].ToString())),
                                EndDate= String.Format("{0:MM/dd/yyyy}", Convert.ToDateTime(dr["enddate"].ToString())),
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


    
        public int DealUpsert(int CustomerID, int DealID, String DealNumber, String DealName, DateTime StartDate, DateTime EndDate, Double Margin, Double BrokerMargin, int Active)
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
                    string SqlCommandText = "[WebSite].[DealUpsert]";
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = SqlCommandText;
                    cmd.Parameters.AddWithValue("@CustomerID", CustomerID);
                    cmd.Parameters.AddWithValue("@DealID", DealID);
                    cmd.Parameters.AddWithValue("@DealNumber", DealNumber);
                    cmd.Parameters.AddWithValue("@DealName", DealName);
                    cmd.Parameters.AddWithValue("@StartDate", StartDate);
                    cmd.Parameters.AddWithValue("@EndDate", EndDate);
                    cmd.Parameters.AddWithValue("@Margin", Margin);
                    cmd.Parameters.AddWithValue("@BrokerMargin", BrokerMargin);
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
        public List<DealInfo> SpecificDealsGetInfo(int DealID)
        {

            List<DealInfo> SelectionItemsinfo = new List<DealInfo>();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    string SqlCommandText = "[WebSite].[SpecificDealsGetInfo]";
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
                                CustomerID = Convert.ToInt32(dr["customerid"].ToString()),
                                CustomerName = dr["customername"].ToString(),
                                DealID = Convert.ToInt32(dr["dealid"].ToString()),
                                DealName = dr["dealname"].ToString(),
                                DealNumber = dr["dealnumber"].ToString(),
                                StartDate = dr["StartDate"].ToString(),
                                EndDate = dr["EndDate"].ToString(),
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
        #endregion
        // Facility Calls
        #region
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
                                LossCodeID = dr["TDUID"].ToString() + '-' + dr["lossCode"].ToString(),
                                LossCodeName = dr["LossCodeName"].ToString(),
                                LossCode = dr["lossCode"].ToString(),
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
