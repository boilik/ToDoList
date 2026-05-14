let tasks=JSON.parse(localStorage.getItem("tasks"))||[]

function addTask(text,description,category,priority){
    let task=createTask(text,description,category,priority)
    tasks.push(task)
    saveTasks()  
}

function createTask(text,description,category,priority){
    let task={
        id:Date.now(),
        text,
        description,
        category,
        done:false,
        priority,
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

function editTask(taskId){
    addTaskPanel.classList.toggle("active")
    const taskIndex=tasks.findIndex(item=>item.id==taskId)
    if (taskIndex==-1) return;
    tasks[taskIndex].text=newTextValue
    saveTasks()   
    
}

const list = document.getElementById("list");

а

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

        const radio=document.createElement("input")
        radio.type="radio"
        

        if (task.done) {
            radio.checked="true"
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
        li.appendChild(radio)
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

const categoryButtonsDiv=document.getElementById('category')
categoryButtonsDiv.addEventListener('click',(event)=>{
    const categoryButtonSelected=event.target.closest('button')
    const allCategoryButtons=categoryButtonsDiv.querySelectorAll('button')
    allCategoryButtons.forEach(button=>{
        button.classList.remove('active')
    })
    categoryButtonSelected.classList.add('active')
})




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

const input = document.getElementById('inputName');
const but = document.getElementById('addBtn');
const inputDescription=document.getElementById('inputDescription')

but.addEventListener("click", handleAddTask);

input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        handleAddTask()
    }       
})

const priority =document.querySelector('.priority')
priority.addEventListener('click',(event)=>{
    const prioritySelected=event.target.closest('input')
    const priorityButtons=priority.querySelectorAll('input')
    priorityButtons.forEach(button=>{
        button.checked=false
    })
    prioritySelected.checked=true
})





function handleAddTask(){
    let inputText = input.value;
    let descriptionText=inputDescription.value
    let selectedCategory=categoryButtonsDiv.querySelector('.active')
    let selectedCategoryName=selectedCategory.id

    let prioritySelected =priority.querySelector('input:checked')
    let priorityValue= prioritySelected.id=='high'?true:false

    if (!inputText) return;

    addTask(inputText,descriptionText,selectedCategoryName,priorityValue);
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

const newTaskBtn=document.getElementById("newTask")


const addTaskPanel=document.getElementById("addTaskPanel")
newTaskBtn.addEventListener('click',()=>{
    addTaskPanel.classList.toggle("active")
    const main=document.getElementById("main")
    main.classList.toggle("shift")
})
