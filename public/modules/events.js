import { getTasks,toggleTask,togglePriority,loadTaskToTaskPanel,
    handleAddTask
} from "./taskService.js"
import { saveTasks } from "./storage.js"
import { render } from "./render.js";
import {updateActiveFilterButton} from "./filters.js"
import {renderCalendar} from "./utils.js"
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
})
  

const categoryButtonsDiv=document.getElementById('category')
categoryButtonsDiv.addEventListener('click',(event)=>{
    const categoryButtonSelected=event.target.closest('button')
    const allCategoryButtons=categoryButtonsDiv.querySelectorAll('button')
    allCategoryButtons.forEach(button=>{
        button.classList.remove('active')
    })
    categoryButtonSelected.classList.add('active')
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

const input = document.getElementById('inputName');
const inputDescription=document.getElementById('inputDescription')
const but = document.getElementById('addBtn');

but.addEventListener("click", handleAddTask);

input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        handleAddTask()
    }       
})

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


const calendar=document.getElementById("calendarButt")

calendar.addEventListener('click',()=>{
    renderCalendar()
})

document.getElementById("prevMonth").addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1)
    renderCalendar(currentDate.getMonth(), currentDate.getFullYear())
})

document.getElementById("nextMonth").addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1)
    renderCalendar(currentDate.getMonth(), currentDate.getFullYear())
})


const newTaskBtn=document.getElementById("newTask")
const addTaskPanel=document.getElementById("addTaskPanel")
newTaskBtn.addEventListener('click',()=>{
    addTaskPanel.classList.toggle("active")
    const main=document.getElementById("main")
    main.classList.toggle("shift")
})

