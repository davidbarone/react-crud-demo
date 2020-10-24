function GetAllTasks() {
    var url = `${process.env.REACT_APP_API_BASE}/tasks`;
    return fetch(url, {
        mode: "cors",
        headers: {
            'Content-Type':'application/json'
          }        
    })
        .then(response => response.json())
        .then(data => data)
}

function GetSingleTask(id) {
    var url = `${process.env.REACT_APP_API_BASE}/tasks/${id}`;
    return fetch(url, {
        mode: "cors",
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => data);
}

function SaveTask(task) {
    var method = task.taskId ? "PUT" : "POST"
    var url = `${process.env.REACT_APP_API_BASE}/tasks`;
    
    if (method === "PUT") {
        url = `${url}/${task.taskId}`;
    }

    return fetch(
        url,
        {
            method: method,
            headers: { "content-type": "application/json" },
            body: JSON.stringify(task)
        })
        .then(response => { if (method === "POST") { response.json() } })
        .then(data => data);
}

function DeleteTask(id) {
    var url = `${process.env.REACT_APP_API_BASE}/Tasks/${id}`;
    return fetch(
        url,
        {
            method: "DELETE"
        })
        .then()
}

export {
    GetAllTasks,
    GetSingleTask,
    SaveTask,
    DeleteTask
}