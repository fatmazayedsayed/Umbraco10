using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.Notifications;
using UmbracoProject1.umbraco.Notifications;

namespace UmbracoProject1.umbraco.Composers
{
    public class DontShoutComposer : IComposer
    {
        public void Compose(IUmbracoBuilder builder)
        {
            builder.AddNotificationHandler<ContentPublishingNotification, DontShout>();
        }
    }
}
