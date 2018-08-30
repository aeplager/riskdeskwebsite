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
        public int CustomerUpsert(int CustomerID, String CustomerName, String BillingAdd1, String BillingAdd2, String CityName, String StateAbb, String Zip, int Active)
        {

            int SelectionItemsinfo = new int();
            DataSet ds = new DataSet();
            string ConnectionString = ReturnConnectionString();
            if (Active !=1) {
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
        // Generic and Private Functions 
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
        // NOT PART OF PROGRAM
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
