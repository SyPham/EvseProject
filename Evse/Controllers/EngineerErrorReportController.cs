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
    public class EngineerErrorReportController : ApiControllerBase
    {
        private readonly IEngineerErrorReportService _service;

        public EngineerErrorReportController(IEngineerErrorReportService service)
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
        public async Task<ActionResult> AddAsync([FromBody] EngineerErrorReportDto model)
        {
            return StatusCodeResult(await _service.AddAsync(model));
        }

        [HttpPut]
        public async Task<ActionResult> UpdateAsync([FromBody] EngineerErrorReportDto model)
        {
            return StatusCodeResult(await _service.UpdateAsync(model));
        }

    [HttpPost]
        public async Task<ActionResult> AddFormAsync([FromForm] IFormFile file, [FromForm] string request)

        {
            var model = JsonConvert.DeserializeObject<EngineerErrorReportDto>(request);
            model.File = file;
            return Ok(await _service.AddFormAsync(model));
        }

        [HttpPut]
        public async Task<ActionResult> UpdateFormAsync([FromForm] EngineerErrorReportDto model)
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
        [HttpPost]
                public async Task<ActionResult> Remove([FromForm] string cancelUploading, [FromForm] string uploadFiles, decimal id, string type)
                {
                  return StatusCodeResult(await _service.RemoveFile(id, type));
                }
         [HttpPost]
        public async Task<ActionResult> Save(IFormFile uploadFile, decimal id, string type)
        {
           
                 if(uploadFile ==null)
                uploadFile = Request.Form.Files["UploadFiles"];
                return StatusCodeResult(await _service.SaveFile(uploadFile,id, type));

        }
    }
}
