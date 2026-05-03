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

  tasks.forEach((task,index) => {
    const li = document.createElement("li");
    li.textContent = task.text;
    list.appendChild(li);

    li.addEventListener("click", () => {
    toggleTask(index);
    render();
    });

    const btn = document.createElement("button")
    btn.textContent = "Delete";
    li.appendChild(btn);
    
    btn.addEventListener("click", (e) => {
    e.stopPropagation()
    deleteTask(index);
    render();
    });

    if (task.done){
        li.style.textDecoration="line-through"
    }
  });
}


render();

const but=document.getElementById('addBtn')
but.addEventListener("click",() => {
    const input=document.getElementById('input')
    let inputText=input.value
    if (!inputText) return 
    addTask(inputText)
    render()
})


