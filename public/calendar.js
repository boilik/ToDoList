let currentDate = new Date()
function renderCalendar() {
    const grid = document.getElementById("calendarGrid")
    const title = document.getElementById("monthYear")

    const today = new Date()

    const month = currentDate.getMonth()
    const year = currentDate.getFullYear()
    const firstDayIndex = new Date(year, month, 1).getDay()   ///день недели
    const daysInMonth = new Date(year, month + 1, 0).getDate()  ///дней всего

    const lastDayIndex=new Date(year,month, daysInMonth).getDay()  ///день недели
    const daysInMonthPrevMonth = new Date(year, month , 0).getDate()///дней всго 

    title.textContent = `${month + 1}.${year}`
    grid.innerHTML = ""

    for (let i = 0; i < firstDayIndex; i++) {             ///перед
        const cell=document.createElement("div")
        let dateForCell=daysInMonthPrevMonth+i-firstDayIndex+1
        cell.textContent = dateForCell
        cell.classList.add("daysprevious")
        grid.appendChild(cell)   ///пустые ячейки дня недели
        
    }

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

    let daysToAdd=6-lastDayIndex
    for (let i=1;i<=daysToAdd;i++){
        const cell=document.createElement('div')
        cell.textContent=i
        cell.classList.add('daysafter')
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

function render(){
    renderCalendar()
}

render()



const tasksByPeriod = document.querySelector(".tasksByPeriod");
let currentPeriod='month'

tasksByPeriod.addEventListener("click", (event) => {
    const periodBtn = event.target.closest("button");
    if (!periodBtn) return;

    tasksByPeriod.querySelectorAll("button").forEach(btn => {
        btn.classList.remove("selectedPeriod");
    });

    periodBtn.classList.add("selectedPeriod");
    currentPeriod=periodBtn.id
    getTasksByPeriod(currentPeriod)

});

let tasks=JSON.parse(localStorage.getItem("tasks"))||[]

function getTasksByPeriod(currentPeriod){
    let [date,month,year]=dateToday()
    let tasksToShow = addTaskByPeriod(date,month,year,currentPeriod)
    showTasksByPeriod(tasksToShow)

}



function dateToday(){
    const today=new Date()
    const date=today.getDate()
    const month=today.getMonth()+1
    const year=today.getFullYear()
    return [date,month,year]
}

function addTaskByPeriod(date,month,year,currentPeriod){
    let tasksToShow=[]
    tasks.forEach(task=>{
        let [taskYear,taskMonth, taskDay]=task.date.split('.').map(Number)

        switch (currentPeriod){
            case "month":
                if (taskMonth==month&&taskYear==year) tasksToShow.push(task)
                break;
            case "day":
                if (taskDay==date&&taskMonth==month&&taskYear==year) tasksToShow.push(task)
                break;
            case "week":
                const current = new Date(year, month - 1, date)
                const day = current.getDay() === 0 ? 7 : current.getDay()

                const startOfWeek = new Date(current)
                startOfWeek.setDate(current.getDate() - (day - 1))

                const endOfWeek = new Date(startOfWeek)
                endOfWeek.setDate(startOfWeek.getDate() + 6)

                const taskDate = new Date(taskYear, taskMonth - 1, taskDay)

                if (taskDate >= startOfWeek && taskDate <= endOfWeek) {
                    tasksToShow.push(task)
                }
                break;
        }
    })
    return tasksToShow
}

