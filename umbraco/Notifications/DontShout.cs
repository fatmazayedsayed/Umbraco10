using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Notifications;

namespace UmbracoProject1.umbraco.Notifications
{
    public class DontShout : INotificationHandler<ContentPublishingNotification>
    {
        public void Handle(ContentPublishingNotification notification)
        {
            foreach (var node in notification.PublishedEntities)
            {
                if (node.ContentType.Alias.Equals("contactPage"))
                {
                    var newsArticleTitle = node.GetValue<string>("contact_message");
                    if (newsArticleTitle.Equals(newsArticleTitle.ToUpper()))
                    {
                        notification.CancelOperation(new EventMessage("Corporate style guideline infringement",
                            "Don't put the announcement title in upper case, no need to shout!",
                            EventMessageType.Error));
                    }
                }
            }
        }
    }
}
