using Umbraco.Cms.Core.Notifications;

namespace UmbracoProject1.umbraco.Notifications
{
    public static class UmbracoBuilderNotificationExtensions
    {
        public static IUmbracoBuilder AddDontShoutNotifications(this IUmbracoBuilder builder)
        {
            builder
                .AddNotificationHandler<ContentPublishingNotification, DontShout>()
                //.AddNotificationHandler<TemplateSavingNotification, DontShout>()
                //.AddNotificationHandler<MediaSavingNotification, DontShout>()
                ;

            return builder;
        }
    }
}
