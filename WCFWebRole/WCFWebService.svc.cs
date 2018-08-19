using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;

namespace WCFWebRole
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "WCFWebService" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select WCFWebService.svc or WCFWebService.svc.cs at the Solution Explorer and start debugging.
    public class WCFWebService : IWCFWebService
    {
        
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
