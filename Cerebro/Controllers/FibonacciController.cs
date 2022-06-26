using Cerebro.Models;
using Cerebro.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace Cerebro.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FibonacciController : ControllerBase
    {
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
                    Result = FibonacciHelpers.GetPosition(n)
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