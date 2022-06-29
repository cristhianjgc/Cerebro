using Cerebro.Models;
using Cerebro.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Cerebro.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly string _connection;

        public UserController(IOptions<GlobalSettings> settings)
        {
            _connection = settings.Value.ConnectionStrings.DefaultConnection;
        }

        [HttpGet("Get")]
        public IActionResult Get([FromQuery] string userId)
        {
            UserResponse response;

            try
            {
                response = new UserResponse
                {
                    Status = CerebroConstants.Ok,
                    Message = CerebroConstants.Success,
                    User = UserHelpers.GetUser(userId, _connection)
                };

                return StatusCode(response.Status, response);
            }
            catch (Exception e)
            {
                response = new UserResponse
                {
                    Message = e.Message,
                    Status = CerebroConstants.Error
                };

                return StatusCode(response.Status, response);
            }
        }

        [HttpPost("Create")]
        public IActionResult Create([FromBody] User? request)
        {
            UserResponse response;

            try
            {
                response = new UserResponse
                {
                    Status = CerebroConstants.Ok,
                    Message = CerebroConstants.Success,
                    User = UserHelpers.CreateUser(request, _connection)
                };

                return StatusCode(response.Status, response);
            }
            catch (Exception e)
            {
                response = new UserResponse
                {
                    Message = e.Message,
                    Status = CerebroConstants.Error
                };

                return StatusCode(response.Status, response);
            }
        }

        [HttpPost("Update")]
        public IActionResult Update([FromBody] User request)
        {
            UserResponse response;

            try
            {
                response = new UserResponse
                {
                    Status = CerebroConstants.Ok,
                    Message = CerebroConstants.Success,
                    User = UserHelpers.UpdateUser(request, _connection)
                };

                return StatusCode(response.Status, response);
            }
            catch (Exception e)
            {
                response = new UserResponse
                {
                    Message = e.Message,
                    Status = CerebroConstants.Error
                };

                return StatusCode(response.Status, response);
            }
        }
    }
}