function GetAllTasks() {
    var url = `${process.env.REACT_APP_API_BASE}/Tasks`;
    return fetch(url, {
        mode: "cors",
        headers: {
            'Content-Type':'application/json'
          }        
    })
        .then(response => response.json())
        .then(data => data)
}

function DeleteTask(id) {
    var url = `${process.env.BASE_URL}/Tasks/${id}`;
    return fetch(
        url,
        {
            method: "DELETE"
        })
        .then()
}

export {
    GetAllTasks,
    DeleteTask
}