let tasks=[]
function addTask(text){
    let task=createTask(text)
    tasks.push(task)  
}


function createTask(text){
    let task={
        text,
        done:false,
    }
    return task
}

function deleteTask(index) {
    if (!tasks[index]) return
    tasks.splice(index, 1)
}