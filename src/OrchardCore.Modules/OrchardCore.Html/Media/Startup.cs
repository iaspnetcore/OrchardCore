using Microsoft.Extensions.DependencyInjection;
using OrchardCore.DisplayManagement;
using OrchardCore.Modules;

namespace OrchardCore.Html.Media;

[RequireFeatures("OrchardCore.Media")]
public sealed class Startup : StartupBase
{
    public override void ConfigureServices(IServiceCollection services)
    {
        services.AddShapeTableProvider<MediaShapes>();
    }
}