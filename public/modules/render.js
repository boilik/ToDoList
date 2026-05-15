import { getTasks } from "./taskService.js"
import { getFilteredTasks } from "./filters.js"
import { editTask } from "./taskService.js"
import {getDate, updateInformationBlock} from './utils.js'

// временно храним UI state тут (потом можно вынести)
export let currentFilter = "all"


export function render() {
    const tasks=getTasks()
    const list = document.getElementById("list");
    const score=document.getElementById("score")
    const filtered = getFilteredTasks(currentFilter, tasks)

    list.innerHTML = "";

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
            radio.checked=true
        }

        li.appendChild(btn)
        li.appendChild(star)
        li.appendChild(radio)
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