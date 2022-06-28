using Cerebro.Models;
using System.Numerics;

namespace Cerebro.Helpers
{
    public static class FibonacciHelpers
    {
        public static BigInteger Fibonacci(ulong n)
        {
            BigInteger current = 1;
            BigInteger previous = 0;

            for (ulong i = 0; i < n; i++)
            {
                var next = previous + current;
                previous = current;
                current = next;
            }

            return previous;
        }

        public static BigInteger GetPosition(ulong n, GlobalSettings settings)
        {
            return n < 2 ? n : Fibonacci(n);
        }
    }
}
