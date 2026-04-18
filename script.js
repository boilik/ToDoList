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

function toggleTask(index) {
    if (!tasks[index]) return;
    tasks[index].done=!tasks[index].done

}

function getFilteredTasks(type) {
    switch (type) {
        case "all":
            return tasks
        case "done":
            return tasks.filter(task=>task.done==true)
        case "todo":
            return tasks.filter(task=>task.done==false)
    }
}

function render() {
  const list = document.getElementById("list");
  list.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.textContent = task.text;
    list.appendChild(li);
  });
}


render();