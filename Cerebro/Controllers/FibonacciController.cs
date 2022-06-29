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
        private readonly string _connection;

        public FibonacciController(IOptions<GlobalSettings> settings)
        {
            _connection = settings.Value.ConnectionStrings.DefaultConnection;
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
                    Historical = SqlHelpers.GetAllRequests(_connection)
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

        [HttpPost("GetPosition")]
        public IActionResult GetPosition([FromBody] FibonacciRequest request)
        {
            FibonacciResponse response;

            try
            {
                response = new FibonacciResponse
                {
                    Position = request.Position,
                    Status = CerebroConstants.Ok,
                    Message = CerebroConstants.Success,
                    Result = FibonacciHelpers.GetPosition(request, _connection)
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