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

function render(){

    renderCalendar()
}
render()


const tasksByPeriod = document.querySelector(".tasksByPeriod");

tasksByPeriod.addEventListener("click", (event) => {
    const periodBtn = event.target.closest("button");
    if (!periodBtn) return;

    tasksByPeriod.querySelectorAll("button").forEach(btn => {
        btn.classList.remove("selectedPeriod");
    });

    periodBtn.classList.add("selectedPeriod");
});