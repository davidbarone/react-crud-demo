using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Dapper;
using System.Data.SqlClient;

namespace react_crud_demo_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TaskController : ControllerBase
    {
        private string ConnectionString { get; set; }

        public TaskController(IOptions<ConnectionStringConfig> connectionStrings)
        {
            this.ConnectionString = connectionStrings.Value.Task;
        }

        [HttpGet("/Tasks")]
        public ActionResult<IEnumerable<TaskInfo>> GetAll()
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var tasks = db.Query<TaskInfo>("SELECT * FROM TASK WHERE TASKCOMPLETE = 0");
                return Ok(tasks);
            }
        }

        [HttpGet("/Tasks/{id}")]
        public ActionResult<TaskInfo> GetOne(int id)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var task = db.Query<TaskInfo>(
                    "SELECT * FROM TASK WHERE TaskId = @TaskId",
                    new
                    {
                        TaskId = id
                    }).FirstOrDefault();

                if (task == null)
                {
                    throw new Exception("Task not found.");
                }

                return Ok(task);
            }
        }

        [HttpPost("/Tasks")]
        public ActionResult<TaskInfo> Create(TaskInfo task)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var newTask = db.Query<TaskInfo>(@"
INSERT INTO Task (
    TaskDescription, TaskPriority, TaskDue, TaskComplete)
SELECT
    @TaskDescription, @TaskPriority, @TaskDue, @TaskComplete;

SELECT * FROM Task WHERE TaskId = SCOPE_IDENTITY();", new
                {
                    TaskDescription = task.TaskDescription,
                    TaskPriority = task.TaskPriority,
                    TaskDue = task.TaskDue,
                    TaskComplete = task.TaskComplete
                });
                return Ok(newTask);
            }
        }

        [HttpPut("/Tasks/{id}")]
        public ActionResult Update(int id, [FromBody] TaskInfo task)
        {
            if (id != task.TaskId)
            {
                throw new Exception("Invalid task id");
            }

            using (var db = new SqlConnection(ConnectionString))
            {
                var newTask = db.Query<TaskInfo>(@"
UPDATE
    Task
SET
    TaskDescription = @TaskDescription,
    TaskPriority = @TaskPriority,
    TaskDue = @TaskDue,
    TaskComplete = @TaskComplete
WHERE
    TaskId = @TaskId;", new
                {
                    TaskId = task.TaskId,
                    TaskDescription = task.TaskDescription,
                    TaskPriority = task.TaskPriority,
                    TaskDue = task.TaskDue,
                    TaskComplete = task.TaskComplete
                });
                return NoContent();
            }
        }

        [HttpDelete("/Tasks/{id}")]
        public ActionResult Delete(int id)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var newTask = db.Query<TaskInfo>(@"
DELETE FROM
    Task
WHERE
    TaskId = @TaskId;", new
                {
                    TaskId = id
                });
                return Ok();
            }
        }

        [HttpPut("/Tasks/Complete/{id}")]
        public ActionResult Complete(int id)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var newTask = db.Query<TaskInfo>(@"
UPDATE
    Task
SET
    TaskComplete = 1
WHERE
    TaskId = @TaskId;", new
                {
                    TaskId = id
                });
                return NoContent();
            }
        }

    }
}
