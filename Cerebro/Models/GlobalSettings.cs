namespace Cerebro.Models
{
    public class GlobalSettings
    {
        public AppConfiguration AppConfiguration { get; set; }
        public ConnectionStrings ConnectionStrings { get; set; }
    }

    public class AppConfiguration
    {
        
    }

    public class ConnectionStrings
    {
        public string DefaultConnection { get; set; }
    }
}
