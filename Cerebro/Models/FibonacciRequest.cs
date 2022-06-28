using System.Numerics;

namespace Cerebro.Models
{
    public class FibonacciRequest
    {
        // User
        public string Email { get; set; }
        public string UserId { get; set; }
        public string Username { get; set; }

        // Request
        public ulong Position { get; set; }
        public string RequestId { get; set; }
        public BigInteger Result { get; set; }
        public DateTime RequestDate { get; set; }
    }
}
