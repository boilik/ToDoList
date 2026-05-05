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
    const taskIndex=tasks.findIndex(item=>item.id===id)
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

const list = document.getElementById("list");

list.addEventListener("click",(event) =>{
    let li=event.target.closest("li")
    let button = event.target.closest("button")

    if (!li)return
    const taskId=+(li.dataset.id)

    if (button){
        deleteTask(taskId)
        render()
        return
    }
    toggleTask(taskId)
    render()
  })


let editMode = null 

list.addEventListener("dblclick", (event) => {
    const li = event.target.closest("li")
    if (!li) return

    const taskId = Number(li.dataset.id)

    editMode = taskId
    render()
})

function render() {
    const list = document.getElementById("list");
    list.innerHTML = "";

    const filtered = getFilteredTasks(currentFilter)

    filtered.forEach((task) => {
        const li = document.createElement("li");
        li.dataset.id = task.id

        const btn = document.createElement("button")
        btn.textContent = "Delete";

        if (task.done) {
            li.style.textDecoration = "line-through"
        }

        if (task.id === editMode) {
            const input = document.createElement("input")
            input.value = task.text

            input.addEventListener("keydown", (e) => {
                if (e.key === "Enter") {
                    editTask(input.value, task.id)
                    editMode = null
                    render()
                }
            })

            input.addEventListener("blur", () => {
                editMode = null
                render()
            })

            input.addEventListener("click", (e) => {
                e.stopPropagation()
            })

            li.appendChild(input)

            setTimeout(() => input.focus(), 0)

        } else {
            const span = document.createElement("span")
            span.textContent = task.text
            li.appendChild(span)
        }

        li.appendChild(btn)
        list.appendChild(li)
    });
}
const input = document.getElementById('input');
const but = document.getElementById('addBtn');

but.addEventListener("click", handleAddTask);

input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        handleAddTask()
    }       
})

function handleAddTask(){
    let inputText = input.value;

    if (!inputText) return;

    addTask(inputText);
    input.value = "";
    render();    
}


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

