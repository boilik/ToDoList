
export function getFilteredTasks(type,tasks) {
    switch (type) {
        case "all":
            return tasks
        case "done":
            return tasks.filter(task=>task.done==true)
        case "todo":
            return tasks.filter(task=>task.done==false)
    }
}

// export function updateActiveFilterButton() {
//     allBtn.classList.remove('active');
//     doneBtn.classList.remove('active');
//     todoBtn.classList.remove('active');
    
//     switch(currentFilter) {
//         case "all":
//             allBtn.classList.add('active');
//             break;
//         case "done":
//             doneBtn.classList.add('active');
//             break;
//         case "todo":
//             todoBtn.classList.add('active');
//             break;
//     }
// } 