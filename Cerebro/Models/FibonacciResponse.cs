using System.Numerics;

namespace Cerebro.Models
{
    public class FibonacciResponse : BasicResponse
    {
        public ulong Position { get; set; }
        public BigInteger Result { get; set; }
    }
}
