using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace DataRetriever.Pages;

public class ResultsModel : PageModel
{
    private readonly ILogger<ResultsModel> _logger;

    public ResultsModel(ILogger<ResultsModel> logger)
    {
        _logger = logger;
    }

    public void OnGet()
    {

    }
}

