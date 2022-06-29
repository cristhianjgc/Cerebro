using Cerebro.Models;
using Newtonsoft.Json;

namespace Cerebro.Helpers
{
    public static class UserHelpers
    {
        public static User GetUser(string userId, string connection)
        {
            User user = null;
            var request = JsonConvert.SerializeObject(new
            {
                UserId = userId
            });

            var result = SqlHelpers.ExecuteStoredProcedure(StoredProcedures.GetUser, request, connection);
            if (!string.IsNullOrEmpty(result) && result != StoredProcedures.EmptyObject)
            {
                user = JsonConvert.DeserializeObject<User>(result);
            }

            return user!;
        }

        public static User CreateUser(User? user, string connection)
        {
            var request = user == null ? string.Empty : JsonConvert.SerializeObject(user);
            var userId = SqlHelpers.ExecuteStoredProcedure(StoredProcedures.CreateUser, request, connection);
            return GetUser(userId, connection);
        }

        public static User UpdateUser(User user, string connection)
        {
            var request = JsonConvert.SerializeObject(user);
            var userId = SqlHelpers.ExecuteStoredProcedure(StoredProcedures.UpdateUser, request, connection);
            return GetUser(userId, connection);
        }
    }
}
