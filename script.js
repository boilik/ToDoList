let tasks=JSON.parse(localStorage.getItem("tasks"))||[]

function addTask(text){
    let task=createTask(text)
    tasks.push(task)
    saveTasks()  
}

function createTask(text){
    let task={
        id:Date.now(),
        text,
        done:false,
    }
    return task
}

function deleteTask(id) {
    const taskIndex=tasks.findIndex(item=>item.id==id)
    if (taskIndex==-1) return;
    tasks.splice(taskIndex, 1)
    saveTasks()
}

function toggleTask(id) {
    const taskIndex=tasks.findIndex(item=>item.id==id)
    if (taskIndex==-1) return;
    tasks[taskIndex].done=!tasks[taskIndex].done
    saveTasks()

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

function editTask(newTextValue,taskId){
    const taskIndex=tasks.findIndex(item=>item.id==taskId)
    if (taskIndex==-1) return;
    tasks[taskIndex].text=newTextValue
    saveTasks()   
    
}

function render() {
  const list = document.getElementById("list");
  list.innerHTML = "";
  const filtered = getFilteredTasks(currentFilter)

  filtered.forEach((task) => {
    const taskId=task.id

    const li = document.createElement("li");
    li.textContent = task.text;

    li.addEventListener("click", () => {
    toggleTask(taskId);
    render();
    });

    li.addEventListener("dblclick",()=>{
        const inputField=document.createElement("input")
        inputField.value=task.text
        
        li.textContent = ""
        li.appendChild(inputField)
        inputField.focus()
        

        inputField.addEventListener("keydown",(event)=>{
            if (event.key=='Enter'){ 
                editTask(inputField.value,taskId) 
                render()}
        })

        inputField.addEventListener("blur", () => {
            editTask(inputField.value, taskId)
            render()
        })

        inputField.addEventListener("click", (e) => {
            e.stopPropagation()
})
    }
    )

    const btn = document.createElement("button")
    btn.textContent = "Delete";
    
    btn.addEventListener("click", (e) => {
    e.stopPropagation()
    deleteTask(taskId);
    render();
    });

    if (task.done){
        li.style.textDecoration="line-through"
    }

    li.appendChild(btn);
    list.appendChild(li);
  });
}

const input = document.getElementById('input');
const but = document.getElementById('addBtn');

but.addEventListener("click", () => {
    let inputText = input.value;

    if (!inputText) return;

    addTask(inputText);
    input.value = "";
    render();
});

input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        let inputText = input.value;
        if (!inputText) return;

        addTask(inputText);
        input.value = "";
        render();
    }       
})


let currentFilter="all"
render();

const allBtn=document.getElementById('allBtn')
allBtn.addEventListener('click',()=>{
    currentFilter="all"
    render();
})
const doneBtn=document.getElementById('doneBtn')
doneBtn.addEventListener('click',()=>{
    currentFilter="done"
    render();

})
const todoBtn=document.getElementById('todoBtn')
todoBtn.addEventListener('click',()=>{
    currentFilter="todo"
    render();

})

function saveTasks(){
    localStorage.setItem("tasks",JSON.stringify(tasks))
}

