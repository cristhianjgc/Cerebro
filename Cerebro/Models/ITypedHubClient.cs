namespace Cerebro.Models
{
    public interface ITypedHubClient
    {
        Task BroadcastMessage(NotificationModel notification);
    }
}
