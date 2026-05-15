
export function updateInformationBlock(total,done,todo){
    const allTasks=document.getElementById("numberAllTasks")
    allTasks.textContent=total
    const finishedTasks=document.getElementById("numberfinishedTasks")
    finishedTasks.textContent=done
    const processTasks=document.getElementById("numberProcessTasks")
    processTasks.textContent=todo
}

export function getDate(){
    const date = new Date();

    const result = date.toLocaleDateString("en-EN", {
        day: "numeric",
        month: "long",
        weekday: "long"
    });
    return result

}

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
