
let tasks=JSON.parse(localStorage.getItem("tasks"))||[]
const donut = document.getElementById('donut')

function getNumberOfTasksByCategory(tasks){
    const result = {
        work: 0,
        study: 0,
        own: 0,
        health: 0,
        other: 0
    }

    tasks.forEach(task => {
        if (result.hasOwnProperty(task.category)) {
            result[task.category]++
        }
    })

    return Object.values(result)
}


const data = {
    labels: ['Work', 'Study','Own','Health','Other'],
    datasets: [{
        data: getNumberOfTasksByCategory(tasks),
        backgroundColor: ['blue', 'orange']
    }]
}

new Chart(donut, {
    type: 'doughnut',
    data: data,
})


const line = document.getElementById('line')

function getCurrentWeekDates(){
    const today = new Date()

    const day = today.getDay() === 0 ? 7 : today.getDay() // делаем воскресенье = 7
    const startOfWeek = new Date(today)
    startOfWeek.setDate(today.getDate() - (day - 1)) // понедельник

    const result = []

    for (let d = new Date(startOfWeek); d <= today; d.setDate(d.getDate() + 1)) {
        const dayNum = d.getDate()
        const month = d.toLocaleString('en-US', { month: 'short' })

        result.push(`${dayNum} ${month}`)
    }

    return result
}


function getDoneTasksNumberForWeek(tasks){
    const today = new Date()
    const day = today.getDay() === 0 ? 7 : today.getDay()

    const startOfWeek = new Date(today)
    startOfWeek.setDate(today.getDate() - (day - 1))

    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(startOfWeek.getDate() + 6)

    let dates = getCurrentWeekDates().map(item => item.split(' ')[0])

    let result = Object.fromEntries(
        dates.map(d => [d, 0])
    )

    tasks.forEach(task => {
        let [taskYear, taskMonth, taskDay] = task.date.split('.').map(Number)

        const taskDate = new Date(taskYear, taskMonth - 1, taskDay)

        if (taskDate >= startOfWeek && taskDate <= endOfWeek && task.done) {
            const dayStr = String(taskDay)

            if (result.hasOwnProperty(dayStr)) {
                result[dayStr]++
            }
        }
    })

    return Object.values(result)
}


const dataline={
    labels:getCurrentWeekDates(),
    datasets:[{
        data: getDoneTasksNumberForWeek(tasks),
    }]
}
new Chart (line,{
    type:'line',
    data: dataline,
})