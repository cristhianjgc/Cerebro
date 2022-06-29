using System.Data;
using Cerebro.Models;
using Newtonsoft.Json;
using Microsoft.Data.SqlClient;

namespace Cerebro.Helpers
{
    public static class SqlHelpers
    {
        public static FibonacciRequest GetRequest(string n, string connection)
        {
            FibonacciRequest fibonacciRequest = null;
            var request = JsonConvert.SerializeObject(new
            {
                Position = n
            });

            var result = ExecuteStoredProcedure(StoredProcedures.GetRequest, request, connection);
            if (!string.IsNullOrEmpty(result) && result != StoredProcedures.EmptyObject)
            {
                fibonacciRequest = JsonConvert.DeserializeObject<FibonacciRequest>(result);
            }

            return fibonacciRequest!;
        }

        public static List<FibonacciRequest> GetAllRequests(string connection)
        {
            var request = string.Empty;
            var fibonacciRequest = new List<FibonacciRequest>();
            var result = ExecuteStoredProcedure(StoredProcedures.GetAllRequests, request, connection);
            if (!string.IsNullOrEmpty(result) && result != StoredProcedures.EmptyObject)
            {
                fibonacciRequest = JsonConvert.DeserializeObject<List<FibonacciRequest>>(result);
            }

            return fibonacciRequest;
        }

        public static bool InsertRequest(string connection, FibonacciRequest data)
        {
            var request = JsonConvert.SerializeObject(new
            {
                data.UserId,
                data.Result,
                data.Position
            });

            var response = ExecuteStoredProcedure(StoredProcedures.InsertRequest, request, connection);
            int.TryParse(response, out var nRows);
            return nRows > 0;
        }

        public static string ExecuteStoredProcedure(string spName, string request, string connection)
        {
            using (var client = new SqlConnection(connection))
            {
                client.Open();
                var cmd = new SqlCommand(spName, client)
                {
                    CommandType = CommandType.StoredProcedure
                };

                cmd.Parameters.Add(new SqlParameter("@Request", request));
                cmd.Parameters.Add("@Response", SqlDbType.NVarChar, -1).Direction = ParameterDirection.Output;

                cmd.ExecuteNonQuery();

                var response = cmd.Parameters["@Response"].Value.ToString();
                cmd.Dispose();

                return response;
            }
        }
    }
}
