using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;
using System.IO;

namespace WCFWebRole.Services
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "ICurveUploader" in both code and config file together.
    [ServiceContract]
    public interface ICurveUploader
    {

        [WebGet(UriTemplate = "/GenericValidatedDataUpsert?FileName={FileName}&InformationType={InformationType}&FirstRowOfData={FirstRowOfData}&Field1={FieldString}",
            RequestFormat = WebMessageFormat.Json,
            ResponseFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.Bare)]
        String GenericValidatedDataUpsert(String FileName, String InformationType, Int32 FirstRowOfData, String FieldString);


        [WebGet(UriTemplate = "/StatesGetInfo",
             RequestFormat = WebMessageFormat.Json,
             ResponseFormat = WebMessageFormat.Json,
             BodyStyle = WebMessageBodyStyle.Bare)]
        List<StateInfo> StatesGetInfo();
        // Translate PDF
        [WebGet(UriTemplate = "/TranslatePDFs?FileSuffix={FileSuffix}",
            RequestFormat = WebMessageFormat.Json,
            ResponseFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.Bare)]
        int TranslatePDFs(String FileSuffix);

        [WebGet(UriTemplate = "/TranslateSinglePDF?FileName={FileName}",
            RequestFormat = WebMessageFormat.Json,
            ResponseFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.Bare)]
        int TranslateSinglePDF(String FileName);

        [WebGet(UriTemplate = "/GetFileAllFileInfo",
            RequestFormat = WebMessageFormat.Json,
            ResponseFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.Bare)]
        List<FileInformation> GetFileAllFileInfo();

        [WebGet(UriTemplate = "/GenericFileGetInfo?FileName={FileName}&FileTypeName={FileTypeName}&ContainerName={ContainerName}&RowNumber={RowNumber}",
            RequestFormat = WebMessageFormat.Json,
            ResponseFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.Bare)]
        List<GenericInfo> GenericFileGetInfo(String FileName, String FileTypeName, String ContainerName, int RowNumber);


        [WebGet(UriTemplate = "/GenericFileUpsert?FileName={FileName}&FileTypeName={FileTypeName}&ContainerName={ContainerName}&RandomNumber={RandomNumber}",
            RequestFormat = WebMessageFormat.Json,
            ResponseFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.Bare)]
        String GenericFileUpsert(String FileName, String FileTypeName, String ContainerName, String RandomNumber);
        
        [WebGet(UriTemplate = "/FileStatusGetInfo?FileName={FileName}&FileType={FileType}",
            RequestFormat = WebMessageFormat.Json,
            ResponseFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.Bare)]
        FileInformation FileStatusGetInfo(String FileName, String FileType);

        [WebGet(UriTemplate = "/WaitSystemSeconds?iSeconds={iSeconds}",
            RequestFormat = WebMessageFormat.Json,
            ResponseFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.Bare)]
        String WaitSystemSeconds(int iSeconds);

        [WebGet(UriTemplate = "/CustomerNameGetInfo?CustomerID={CustomerID}",
            RequestFormat = WebMessageFormat.Json,
            ResponseFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.Bare)]
        List<SelectorType> CustomerNameGetInfo(String CustomerID);

    }
}
