using Cerebro.Models;
using Cerebro.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Cerebro.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FibonacciController : ControllerBase
    {
        private readonly GlobalSettings _settings;

        public FibonacciController(IOptions<GlobalSettings> settings)
        {
            _settings = settings.Value;
        }

        [HttpGet("GetHistorical")]
        public IActionResult GetHistorical()
        {
            HistoricalResponse response;

            try
            {
                response = new HistoricalResponse
                {
                    Status = CerebroConstants.Ok,
                    Message = CerebroConstants.Success,
                    Historical = SqlHelpers.GetAllRequests(_settings.ConnectionStrings.DefaultConnection)
                };

                return StatusCode(response.Status, response);
            }
            catch (Exception e)
            {
                response = new HistoricalResponse
                {
                    Message = e.Message,
                    Status = CerebroConstants.Error
                };

                return StatusCode(response.Status, response);
            }
        }

        [HttpGet("GetPosition")]
        public IActionResult GetPosition([FromQuery] ulong n)
        {
            FibonacciResponse response;

            try
            {
                response = new FibonacciResponse
                {
                    Position = n,
                    Status = CerebroConstants.Ok,
                    Message = CerebroConstants.Success,
                    Result = FibonacciHelpers.GetPosition(n, _settings)
                };

                return StatusCode(response.Status, response);
            }
            catch (Exception e)
            {
                response = new FibonacciResponse
                {
                    Message = e.Message,
                    Status = CerebroConstants.Error
                };

                return StatusCode(response.Status, response);
            }
        }
    }
}