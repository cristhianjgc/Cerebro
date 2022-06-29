namespace Cerebro.Helpers
{
    public class CerebroConstants
    {
        public const int Ok = 200;
        public const int Error = 500;
        public const int BadRequest = 400;
        public const string Success = "Success";
        public const string RequestError = "There was an error processing the request";
    }

    public class StoredProcedures
    {
        public const string EmptyObject = "{}";
        public const string GetUser = "P_GET_User";
        public const string CreateUser = "P_INS_User";
        public const string UpdateUser = "P_UPD_User";
        public const string GetRequest = "P_GET_RequestLog";
        public const string InsertRequest = "P_INS_RequestLog";
        public const string GetAllRequests = "P_GET_AllRequestLogs";
    }
}
