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

tasksByPeriod.addEventListener("click", (event) => {
    const periodBtn = event.target.closest("button");
    if (!periodBtn) return;

    tasksByPeriod.querySelectorAll("button").forEach(btn => {
        btn.classList.remove("selectedPeriod");
    });

    periodBtn.classList.add("selectedPeriod");
    let currentPeriod=periodBtn.id
///    showTasksByPeriod(currentPeriod)

});

// let tasks=JSON.parse(localStorage.getItem("tasks"))||[]

// function dateToday(){
//     const today=new Date()
//     const date=today.getDate()
//     const month=today.getMonth()+1
//     const year=today.getMonth()
//     return date,month,year
// }

// function addTaskByPeriod(date,month,year,currentPeriod){
//     let tasksToShow=[]
//     tasks.forEach(task=>{
//         let [taskYear,taskMonth, taskDay]=task['date'].spit('.')
//         switch (currentPeriod){
//             case "month":
//                 if (taskMonth==month&&taskYear==year) tasksToShow.push(task)
//                 break;
//             case "day":
//                 if (taskDay==date&&taskMonth==month&&taskYear==year) tasksToShow.push(task)
//                 break;
//             case "week":
//                 if ((taskMonth==month||taskMonth==month+1)&&taskYear==year) {
//                 let dayOfWeek=new Date(year,month,day)
//                 if (dayOfWeek!=0){
//                     let daysAfter=7-dayOfWeek
//                     let daysBefore=dayOfWeek-1
//                 }else{
//                     let daysBefore=6     
//                     let daysAfter=0             
//                 }
//                 const daysInMonth = new Date(year, month + 1, 0).getDate()
//                 let {dates,datesNextMonth}=getDatesFromWeekDay(daysBefore,daysAfter,date,daysInMonth)
                
//                 dates.forEach(date=>{
//                     if ()
//                 })
//             }

//         }
//     })

//     return dates,datesNextMonth

// }

// function getDatesFromWeekDay(daysBefore,daysAfter,date,daysInMonth){
//     let dates=[]
//     let datesNextMonth=[]
//     if (date+daysAfter>daysInMonth){
//         let daysInNextMonth=date+daysAfter-daysInMonth
//         if (daysInNextMonth<7){
//             for (let i=7-daysInNextMonth;i==0;i--){
//                 dates.push(date)
//                 date--
//             }
//             for(let i=daysInNextMonth;i==0;i--){
//                 datesNextMonth.push(i)
//             }
//         }
//     }
//     if (daysAfter){
//         for(let i=date-daysBefore; i<=date+daysAfter;i++){
//             dates.push(i)
//         }
//     }else{
//         for(let i=date; i>daysBefore;i--){
//             dates.push(i)
//         }
//     }

//     return dates,datesNextMonth
// }
// function showTasksByPeriod(currentPeriod){
//     let [date,month,year]=dateToday()
//     let {dates,datesNextMonth} = addTaskByPeriod(date,month,year,currentPeriod)

// }