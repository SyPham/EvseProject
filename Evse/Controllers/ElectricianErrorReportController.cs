using Microsoft.AspNetCore.Mvc;
using Evse.DTO;
using Evse.Helpers;
using Evse.Services;
using Syncfusion.JavaScript;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace Evse.Controllers
{
    public class ElectricianErrorReportController : ApiControllerBase
    {
        private readonly IElectricianErrorReportService _service;

        public ElectricianErrorReportController(IElectricianErrorReportService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult> GetAllAsync()
        {
            return Ok(await _service.GetAllAsync());
        }
        [HttpPost]
        public async Task<ActionResult> DeleteUploadFile([FromForm] decimal key)
        {
            return Ok(await _service.DeleteUploadFile(key));
        }
        [HttpPost]
        public async Task<ActionResult> AddAsync([FromBody] ElectricianErrorReportDto model)
        {
            return StatusCodeResult(await _service.AddAsync(model));
        }

        [HttpPut]
        public async Task<ActionResult> UpdateAsync([FromBody] ElectricianErrorReportDto model)
        {
            return StatusCodeResult(await _service.UpdateAsync(model));
        }

    [HttpPost]
        public async Task<ActionResult> AddFormAsync([FromForm] IFormFile file, [FromForm] string request)

        {
            var model = JsonConvert.DeserializeObject<ElectricianErrorReportDto>(request);
            model.File = file;
            return Ok(await _service.AddFormAsync(model));
        }

        [HttpPut]
        public async Task<ActionResult> UpdateFormAsync([FromForm] ElectricianErrorReportDto model)
        {
            return Ok(await _service.UpdateFormAsync(model));
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteAsync(decimal id)
        {
            return StatusCodeResult(await _service.DeleteAsync(id));
        }

        [HttpGet]
        public async Task<ActionResult> GetByIDAsync(decimal id)
        {
            return Ok(await _service.GetByIDAsync(id));
        }

        [HttpGet]
        public async Task<ActionResult> GetWithPaginationsAsync(PaginationParams paramater)
        {
            return Ok(await _service.GetWithPaginationsAsync(paramater));
        }
        
         [HttpPost]
        public async Task<ActionResult> GetDataDropdownlist([FromBody] DataManager request)
        {

            var data = await _service.GetDataDropdownlist(request);
            return Ok(data);
        }
        [HttpPost]
        public async Task<ActionResult> LoadData([FromBody] DataManager request, string lang)
        {

            var data = await _service.LoadData(request, lang);
            return Ok(data);
        }
        [HttpPost]
        public async Task<ActionResult> LoadDataForMobile([FromBody] DataManager request, string lang)
        {

            var data = await _service.LoadDataForMobile(request, lang);
            return Ok(data);
        }
        [HttpGet]
        public async Task<ActionResult> GetByGuid(string guid)
        {
            return Ok(await _service.GetByGuid(guid));
        }
        [HttpGet]
        public async Task<ActionResult> GetAudit(decimal id)
        {
            return Ok(await _service.GetAudit(id));
        }
    }
}
