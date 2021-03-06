using System.Collections.Generic;
using OrchardCore.Features.Models;

namespace OrchardCore.Features.ViewModels
{
    public class FeaturesViewModel
    {
        public IEnumerable<ModuleFeature> Features { get; set; }
    }

    public class BulkActionViewModel
    {
        public FeaturesBulkAction BulkAction { get; set; }
        public string[] FeatureIds { get; set; }
    }

    public enum FeaturesBulkAction
    {
        None,
        Enable,
        Disable,
        Toggle
    }
}
