let tasks=JSON.parse(localStorage.getItem("tasks"))||[]

function addTask(text,description,category,priority,date,timeStart,timeEnd){
    let task=createTask(text,description,category,priority,date,timeStart,timeEnd)
    tasks.push(task)
    saveTasks()  
}

function createTask(text,description,category,priority,date,timeStart,timeEnd){
    let task={
        id:Date.now(),
        text,
        description,
        category,
        done:false,
        priority,
        date,
        timeStart,
        timeEnd,
        expired: false 
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


const inputDate = document.getElementById("inputDate")
function loadTaskToTaskPanel(taskId){
    addTaskPanel.classList.toggle("active")
    const taskIndex=tasks.findIndex(item=>item.id==taskId)
    if (taskIndex==-1) return;
    let task=tasks[taskIndex]
    let category=task['category']
    editid=task['id']


    let categoryButton = categoryButtonsDiv.querySelector(`#${category}`)   
    categoryButton.classList.add('active')

    input.value=task['text']
    inputDescription.value=task['description']

    let priorityValue=task['priority']?'high':'low'
    let priorityButton=priority.querySelector(`#${priorityValue}`)
    priorityButton.checked=true
    inputDate.value=task['date']
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

    loadTaskToTaskPanel(taskId)



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

        const time= document.createElement("span")
        let timeText = ""
        if (task.timeStart && task.timeEnd) {
            timeText = ` (${task.timeStart} - ${task.timeEnd})`
        }
        time.textContent = timeText


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
        li.appendChild(time)

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


let editid=false

const timeStartInput = document.getElementById('timeStart')
const timeEndInput = document.getElementById('timeEnd')
timeStartInput.pattern = "^([01][0-9]|2[0-3]):[0-5][0-9]$"
timeStartInput.placeholder = "HH:MM"
timeEndInput.pattern = "^([01][0-9]|2[0-3]):[0-5][0-9]$"
timeEndInput.placeholder = "HH:MM"



timeStartInput.addEventListener('input', (e) => {
    let value = e.target.value

    if (value.length >3) {
        value = value.slice(0,2) + ':' + value.slice(2,4)
    }

    e.target.value = value
})

timeEndInput.addEventListener('input', (e) => {
    let value = e.target.value

    if (value.length >3) {
        value = value.slice(0,2) + ':' + value.slice(2,4)
    }

    e.target.value = value
})

function handleAddTask(edit){
    edit||=false
    let inputText = input.value;
    let descriptionText=inputDescription.value
    let selectedCategory=categoryButtonsDiv.querySelector('.active')
    let selectedCategoryName=selectedCategory.id

    let prioritySelected =priority.querySelector('input:checked')
    let priorityValue= prioritySelected.id=='high'?true:false
    let date=inputDate.value
    
    let timeStart = timeStartInput.value
    let timeEnd = timeEndInput.value

    if (!inputText) return;
    if (!selectedCategory) return
    if (!prioritySelected) return;

    if (editid){
        editTask(editid,inputText,descriptionText,selectedCategoryName,priorityValue,date,timeStart,timeEnd)
        saveTasks()
        render()
        editid = false
        return
    }

    addTask(inputText,descriptionText,selectedCategoryName,priorityValue,date,timeStart,timeEnd);
    input.value = "";
    render();    
}


function editTask(id,text,description,category,priority,date,timeStart,timeEnd){
    const taskIndex=tasks.findIndex(item=>item.id===id)
    if (taskIndex==-1) return;
    tasks[taskIndex].text=text
    tasks[taskIndex].description=description
    tasks[taskIndex].category=category
    tasks[taskIndex].priority=priority
    tasks[taskIndex].date=date
    tasks[taskIndex].timeStart=timeStart
    tasks[taskIndex].timeEnd=timeEnd
    saveTasks()  
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

const calendar=document.getElementById("calendarButt")

calendar.addEventListener('click',()=>{
    renderCalendar()
})

let currentDate = new Date()

function renderCalendar(month = currentDate.getMonth(), year = currentDate.getFullYear()) {
    const grid = document.getElementById("calendarGrid")
    const title = document.getElementById("monthYear")

    const today = new Date()

    const firstDayIndex = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    title.textContent = `${month + 1}.${year}`
    grid.innerHTML = ""

    for (let i = 0; i < firstDayIndex; i++) {
        grid.appendChild(document.createElement("div"))
    }

    const inputDate = document.getElementById("inputDate")

    for (let day = 1; day <= daysInMonth; day++) {
        const cell = document.createElement("div")
        cell.textContent = day

        if (
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
        ) {
            cell.classList.add("today")
        }

        cell.addEventListener("click", () => {
            inputDate.value = `${year}.${month + 1}.${day}`
        })

        grid.appendChild(cell)
    }
}

document.getElementById("prevMonth").addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1)
    renderCalendar(currentDate.getMonth(), currentDate.getFullYear())
})

document.getElementById("nextMonth").addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1)
    renderCalendar(currentDate.getMonth(), currentDate.getFullYear())
})


