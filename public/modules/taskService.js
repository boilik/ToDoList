import { saveTasks,loadTasks } from "./storage.js"
import {createTask} from "./taskFactory.js"

let tasks=loadTasks()

export function addTask(text,description,category,priority,date,timeStart,timeEnd){
    let task=createTask(text,description,category,priority,date,timeStart,timeEnd)
    tasks.push(task)
    saveTasks(tasks)  
}

export function getTasks() {
    return tasks
}


export function deleteTask(id) {
    const index = tasks.findIndex(t => t.id === id)
    if (index === -1) return

    tasks.splice(index, 1)
    saveTasks(tasks) 
}


export function toggleTask(id) {
    const task = tasks.find(t => t.id == id)
    if (!task) return

    task.done = !task.done
    saveTasks(tasks) 

export function togglePriority(id) {
    const task = tasks.find(t => t.id == id)
    if (!task) return
    task.priority = !task.priority
    saveTasks()
}

export function loadTaskToTaskPanel(taskId){
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

export function handleAddTask(edit){
    edit||=false
    let inputText = input.value;
    let descriptionText=inputDescription.value
    let selectedCategory=categoryButtonsDiv.querySelector('.active')
    let selectedCategoryName=selectedCategory.id

    let prioritySelected =priority.querySelector('input:checked')
    let priorityValue= prioritySelected.id=='high'?true:false
    let date=inputDate.value
    let timeStart=timeStartInput.value
    let timeEnd =timeEndInput.value

    if (!inputText) return;

    if (editid){
        editTask(editid,inputText,descriptionText,selectedCategoryName,priorityValue,date,timeStart,timeEnd)
        saveTasks()
        render()
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