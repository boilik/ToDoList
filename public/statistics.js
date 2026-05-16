
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