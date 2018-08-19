using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;
using System.Text;

namespace WCFWebRole
{
    [ServiceContract(Namespace = "")]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
    public class WCFAjax
    {
        // To use HTTP GET, add [WebGet] attribute. (Default ResponseFormat is WebMessageFormat.Json)
        // To create an operation that returns XML,
        //     add [WebGet(ResponseFormat=WebMessageFormat.Xml)],
        //     and include the following line in the operation body:
        //         WebOperationContext.Current.OutgoingResponse.ContentType = "text/xml";
        [OperationContract]
        public void DoWork()
        {
            // Add your operation implementation here
            return;
        }
        [OperationContract]
        public string ReturnTEST()
        {
            return "TEST";
        }
        [OperationContract]
        public List<Players> GetPlayersXml()
        {
            return GetPlayers();
        }

        [OperationContract]
        [System.ServiceModel.Web.WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json)]
        public List<Players> GetPlayersJson()
        {
            return GetPlayers();

        }


        public List<Players> GetPlayers()
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

        // Add more operations here and mark them with [OperationContract]
    }
}
