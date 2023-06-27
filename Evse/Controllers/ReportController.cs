using Aspose.Cells;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using OfficeOpenXml;
using Evse.DTO;
using Evse.Services;
using System;
using System.IO;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Evse.Controllers
{
    public class ReportController : ApiControllerBase
    {
        private readonly IReportService _service;

        private readonly IMapper _mapper;
        public ReportController(IReportService service, IMapper mapper)
        {
            _service = service;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<ActionResult> RPT_Show_Header(string farmGuid, string makerOrderGuid, string reportName, string roomGuid1, string roomGuid2, string makeOrderGuid1, string makeOrderGuid2, string d1, string d2, string keyWord, string sort, string sort2, string printBy)
        {
            return Ok(await _service.RPT_Show_Header(farmGuid, makerOrderGuid, reportName, roomGuid1, roomGuid2, makeOrderGuid1, makeOrderGuid2, d1, d2, keyWord, sort, sort2, printBy));
        }
        [HttpGet]
        public async Task<ActionResult> GetReportType(string menuLink)
        {
            return Ok(await _service.GetReportType(menuLink));
        }

        [HttpGet]
        public async Task<ActionResult> GetReports([FromQuery] ReportParams reportParams)
        {
            return Ok(await _service.GetReport(reportParams));
        }
        [HttpGet]
        public async Task<ActionResult> getReportsHtml([FromQuery] ReportParams reportParams)
        {
            return Ok(await _service.getReportsHtml(reportParams));
        }
        [HttpGet]
        public async Task<ActionResult> GetReportChart(DateTime d1, DateTime d2, string menuLink, string lang)
        {
            return Ok(await _service.GetReportChart(d1, d2, menuLink, lang));
        }
        [HttpGet]
        public async Task<ActionResult> GetReportChartSetting(string menuLink, string lang)
        {
            return Ok(await _service.GetReportChartSetting(menuLink, lang));
        }

        [HttpPost]
        public IActionResult ExcelExport(ExcelExportChartDto model)
        {
            var bin = _service.ExcelExport(model);
            return File(bin, "application/octet-stream", $"{model.FunctionName}_{DateTime.Now.ToString("yyyyMMdd_HHmmss")}.xlsx");
        }
        [HttpPost]
        public IActionResult ExcelExportPieChart(ExcelExportPieChartDto model)
        {
            var bin = _service.ExcelExportPieChart(model);
            return File(bin, "application/octet-stream", $"{model.FunctionName}_{DateTime.Now.ToString("yyyyMMdd_HHmmss")}.xlsx");
        }

        [HttpPost]
        public async Task<ActionResult> JsonExport(ReportParams reportParams)
        {
            var lists = await _service.GetReport(reportParams);
            string jsonProductList = JsonConvert.SerializeObject(lists);
            byte[] byteArray = System.Text.Encoding.UTF8.GetBytes(jsonProductList);

            // Response.Headers.Clear();  
            // Response.ContentType = "application/json";  
            // Response.Headers.Add("Content-Length", jsonProductList.Length.ToString());  
            // Response.Headers.Add("Content-Disposition", $"attachment; filename=report_{DateTime.Now.ToString("yyyyMMdd_HHmmss")}.json;");  
            // await Response.Body.WriteAsync(byteArray);  
            // await Response.Body.FlushAsync();  
            return File(byteArray, "application/json; charset=utf-8", $"report_{DateTime.Now.ToString("yyyyMMdd_HHmmss")}.json");

        }

        private async Task<Byte[]> ConvertToExcel(ReportParams reportParams)
        {
            var data = await _service.getReportsHtml(reportParams);
            var htmlString = ((dynamic)data).htmlString;
            
        //       ExcelPackage.LicenseContext = LicenseContext.Commercial;
        //         ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
        //   using   var excelPackage = new ExcelPackage();
        //     var worksheet = excelPackage.Workbook.Worksheets.Add("Sheet1");

        //             // fontsize mặc định cho cả sheet
        //             worksheet.Cells.Style.Font.Size = 11;
        //             // font family mặc định cho cả sheet
        //             worksheet.Cells.Style.Font.Name = "Times New Roman";
        //     var htmlDocument = new HtmlDocument();
        //     htmlDocument.LoadHtml(htmlString);

        //     // Lặp qua tất cả các phần tử trên trang HTML
        //     int row = 1;
        //     foreach (var htmlRow in htmlDocument.DocumentNode.Descendants("tr"))
        //     {
        //         int column = 1;
        //         foreach (var htmlCell in htmlRow.Descendants("td"))
        //         {
        //             // Lấy giá trị của ô
        //             var cellValue = htmlCell.InnerHtml;

        //             // Ghi giá trị vào cell tương ứng trên file Excel
        //             worksheet.Cells[row, column].Value = cellValue;
        //             worksheet.Cells[row, column].AutoFilter = true;
        //             // Tăng chỉ số cột
        //             column++;
        //         }

        //         // Tăng chỉ số dòng
        //         row++;
        //     }

        //     // Lưu file
        //     Byte[] bin = excelPackage.GetAsByteArray();

          // Specify HTML load options, support div tag layouts
    Aspose.Cells.HtmlLoadOptions loadOptions = new HtmlLoadOptions(LoadFormat.Html);
    loadOptions.SupportDivTag = true;
loadOptions.AutoFitColsAndRows = true;
    // Create workbook object from the html using load options
    using MemoryStream ms = new MemoryStream(System.Text.Encoding.UTF8.GetBytes(htmlString));
    Workbook wb = new Workbook(ms, loadOptions);

    // Auto fit rows and columns of first worksheet
    Worksheet ws = wb.Worksheets[0];
    ws.AutoFitRows();
    ws.AutoFitColumns();
            return wb.SaveToStream().ToArray();
        }
        [HttpPost]
        public async Task<ActionResult> ExportHtmlToExcel(ReportExportParams reportParams)
        {
            var p = _mapper.Map<ReportParams>(reportParams);
            var excelBytes = await ConvertToExcel(p);
           // Tạo một workbook từ mảng byte của tệp Excel
            Workbook workbook = new Workbook(new MemoryStream(excelBytes));

            // Chuyển đổi workbook sang PDF và lưu vào một mảng byte
            using MemoryStream pdfStream = new MemoryStream();
                PdfSaveOptions options = new PdfSaveOptions();
                workbook.Save(pdfStream, SaveFormat.Xlsx);
            return File(pdfStream.ToArray(), "application/octet-stream", $"{reportParams.FunctionName}_{DateTime.Now.ToString("yyyyMMdd_HHmmss")}.xlsx");
        }

       [HttpPost]
        public async Task<IActionResult> ExcelExportToPdf(ReportExportParams reportParams)
        {
            using var ms = new MemoryStream();

                       var p = _mapper.Map<ReportParams>(reportParams);
            var excelBytes = await ConvertToExcel(p);
           // Tạo một workbook từ mảng byte của tệp Excel
            Workbook workbook = new Workbook(new MemoryStream(excelBytes));

            // Chuyển đổi workbook sang PDF và lưu vào một mảng byte
            using MemoryStream pdfStream = new MemoryStream();
                PdfSaveOptions options = new PdfSaveOptions();
                workbook.Save(pdfStream, options);
            return File(pdfStream.ToArray(), "application/octet-stream", $"Reporthtml_{DateTime.Now.ToString("yyyyMMdd_HHmmss")}.pdf");
        }
        [HttpPost]
        public async Task<IActionResult> ExcelExportToOds(ReportExportParams reportParams)
        {
            using var ms = new MemoryStream();

                       var p = _mapper.Map<ReportParams>(reportParams);
            var excelBytes = await ConvertToExcel(p);
            Workbook workbook = new Workbook(new MemoryStream(excelBytes));

            using MemoryStream pdfStream = new MemoryStream();
                workbook.Save(pdfStream, SaveFormat.ODS);
            return File(pdfStream.ToArray(), "application/octet-stream", $"Reporthtml_{DateTime.Now.ToString("yyyyMMdd_HHmmss")}.pdf");
        }
    }
}
