using OrchardCore.Email.Workflows.Activities;
using OrchardCore.Email.Workflows.ViewModels;
using OrchardCore.Workflows.Display;
using OrchardCore.Workflows.Models;

namespace OrchardCore.Email.Workflows.Drivers
{
    public class EmailTaskDisplayDriver : ActivityDisplayDriver<EmailTask, EmailTaskViewModel>
    {
        protected override void EditActivity(EmailTask activity, EmailTaskViewModel model)
        {
            model.SenderExpression = activity.Sender.Expression;
            model.AuthorExpression = activity.Author.Expression;
            model.RecipientsExpression = activity.Recipients.Expression;
            model.ReplyToExpression = activity.ReplyTo.Expression;
            model.SubjectExpression = activity.Subject.Expression;
            model.Body = activity.Body.Expression;
            model.BodyText = activity.BodyText.Expression;
            model.IsBodyHtml = activity.IsBodyHtml;
            model.IsBodyText = activity.IsBodyText;
            model.BccExpression = activity.Bcc.Expression;
            model.CcExpression = activity.Cc.Expression;
        }

        protected override void UpdateActivity(EmailTaskViewModel model, EmailTask activity)
        {
            activity.Sender = new WorkflowExpression<string>(model.SenderExpression);
            activity.Author = new WorkflowExpression<string>(model.AuthorExpression);
            activity.Recipients = new WorkflowExpression<string>(model.RecipientsExpression);
            activity.ReplyTo = new WorkflowExpression<string>(model.ReplyToExpression);
            activity.Subject = new WorkflowExpression<string>(model.SubjectExpression);
            activity.Body = new WorkflowExpression<string>(model.Body);
            activity.IsBodyHtml = model.IsBodyHtml;
            activity.BodyText = new WorkflowExpression<string>(model.BodyText);
            activity.IsBodyText = model.IsBodyText;
            activity.Bcc = new WorkflowExpression<string>(model.BccExpression);
            activity.Cc = new WorkflowExpression<string>(model.CcExpression);
        }
    }
}
