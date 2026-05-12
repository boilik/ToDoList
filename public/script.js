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
        priority:false,
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
    if (event.target.classList.contains("star")) {
        togglePriority(taskId)
        render()
        return
    }
    toggleTask(taskId)
    render()

    li.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", li.dataset.id)
    })
  })
  
list.addEventListener("dragover", (e) => {
    e.preventDefault()  
})

list.addEventListener("drop", (e) => {
    e.preventDefault() 
    const id = e.dataTransfer.getData("text/plain")
    const draggedTaskIndex = tasks.findIndex(t => t.id == id)
    if (draggedTaskIndex == -1) return
    const draggedTask = tasks[draggedTaskIndex]
    tasks.splice(draggedTaskIndex,1,draggedTask)
    saveTasks()
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





function togglePriority(id) {
    const task = tasks.find(t => t.id == id)
    if (!task) return
    task.priority = !task.priority
    saveTasks()
}

function render() {
    const list = document.getElementById("list");
    list.innerHTML = "";

    const score=document.getElementById("score")

    const filtered = getFilteredTasks(currentFilter)

    filtered.forEach((task) => {
        const li = document.createElement("li");
        li.dataset.id = task.id

        const btn = document.createElement("button")
        btn.textContent = "Delete";
        btn.classList.add("delete-btn")

        const star= document.createElement("span")
        star.textContent = task.priority ? "★" : "☆"
        star.classList.add("star")
        

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

        li.draggable = true

        li.appendChild(btn)
        li.appendChild(star)
        list.appendChild(li)
    });
    let done = 0
    tasks.forEach(t => { if (t.done) done++ })

    let total =tasks.length
    let todo=tasks.length-done
    score.textContent = `Total: ${total}, Done: ${done}, Todo: ${todo}`

    const dateToday=document.getElementById("date")
    dateToday.textContent=getDate()

    updateInformationBlock(total,done,todo)
}
function updateInformationBlock(total,done,todo){
    const allTasks=document.getElementById("numberAllTasks")
    allTasks.textContent=total
    const finishedTasks=document.getElementById("numberfinishedTasks")
    finishedTasks.textContent=done
    const processTasks=document.getElementById("numberProcessTasks")
    processTasks.textContent=todo
}

function getDate(){
    const date = new Date();

    const result = date.toLocaleDateString("en-EN", {
        day: "numeric",
        month: "long",
        weekday: "long"
    });
    return result

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


function updateActiveFilterButton() {
    allBtn.classList.remove('active');
    doneBtn.classList.remove('active');
    todoBtn.classList.remove('active');
    
    switch(currentFilter) {
        case "all":
            allBtn.classList.add('active');
            break;
        case "done":
            doneBtn.classList.add('active');
            break;
        case "todo":
            todoBtn.classList.add('active');
            break;
    }
} 


const allBtn=document.getElementById('allBtn')
allBtn.addEventListener('click',()=>{
    currentFilter="all"
    updateActiveFilterButton()
    render();
})
const doneBtn=document.getElementById('doneBtn')
doneBtn.addEventListener('click',()=>{
    currentFilter="done"
    updateActiveFilterButton()
    render();

})
const todoBtn=document.getElementById('todoBtn')
todoBtn.addEventListener('click',()=>{
    currentFilter="todo"
    updateActiveFilterButton()
    render();

})

function saveTasks(){
    localStorage.setItem("tasks",JSON.stringify(tasks))
}

