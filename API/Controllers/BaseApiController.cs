using Microsoft.AspNetCore.Mvc;
using Persistence;

namespace API;

[ApiController]
[Route("api/[controller]")]
public class BaseApiController : ControllerBase
{
    private DataContext _context;

    protected DataContext Context
    {
        get
        {
            return _context ??= HttpContext.RequestServices.GetService<DataContext>();
        }
    }
}
