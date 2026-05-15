export function createTask(text,description,category,priority,date,timeStart,timeEnd){
    let task={
        id:Date.now(),
        text,
        description,
        category,
        done:false,
        priority,
        date,
        timeStart,
        timeEnd,
    }
    return task
}