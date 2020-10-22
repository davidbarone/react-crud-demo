using System;

public class TaskInfo
{
    public int TaskId { get; set; }
    public string TaskDescription { get; set; }
    public int TaskPriority { get; set; }
    public DateTime TaskDue { get; set; }
    public Boolean TaskComplete { get; set; }
}