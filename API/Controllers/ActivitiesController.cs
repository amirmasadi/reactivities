using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API;

public class ActivitiesController : BaseApiController
{

    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivities()
    {
        return await Context.Activities.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Activity>> GetActivity(Guid id)
    {
        var activity = await Context.Activities.FindAsync(id);
        if (activity == null)
            return NotFound();
        return activity;
    }

    [HttpPost]
    public async Task<ActionResult<Activity>> CreateActivity(Activity activity)
    {
        Context.Activities.Add(activity);
        await Context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetActivity), new { id = activity.Id }, activity);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateActivity(Guid id, Activity requestActivity)
    {
        var activity = await Context.Activities.FindAsync(id);
        if(activity == null)
            return NotFound();
        activity.Category = requestActivity.Category ?? activity.Category;
        activity.Title = requestActivity.Title ?? activity.Title;
        activity.Venue = requestActivity.Venue ?? activity.Venue;
        activity.City = requestActivity.City ?? activity.City;
        activity.Description = requestActivity.Description ?? activity.Description;
        await Context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteActivity(Guid id)
    {
        var activity = await Context.Activities.FindAsync(id);
        if (activity == null)
            return NotFound();
        Context.Remove(activity);
        await Context.SaveChangesAsync();
        return NoContent();
    }
}
