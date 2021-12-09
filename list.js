"use strict";
// querySelector 1️⃣
const container = document.querySelector(".container")
const maintask = document.querySelector(".maintask")
const inputText = document.querySelector(".inputText")
const inputDate = document.querySelector(".inputDate")
const inputTime = document.querySelector(".inputTime")
const checkbox = document.querySelector(".checkbox")
const btnClear = document.querySelector(".btnClear")
const btnAdd = document.querySelector(".btnAdd")
document.querySelector(".inputDate").valueAsDate = new Date();
// array
let list = []
// NumberOfList --------------------------------------- >>
const numoflist = document.querySelector(".numoflist")
const clearAllTask = document.querySelector(".clearAllTask")
const num = document.createElement("p")
maintask.appendChild(numoflist)
numoflist.appendChild(num)
//
function numberOfTask() {
    num.textContent = "/ " + list.length;
}
clearAllTask.addEventListener("click",function(){
    for (let i = 0; i < list.length; i++) {
        const taskDiv = document.querySelector(".taskDiv")
        taskDiv.remove()
    }
    list = []
    localStorage.removeItem("list")
    numberOfTask()
})
numberOfTask()//
// CreateDiv ------------------------------------------ >>
// AddTaskWithJason
if (localStorage.getItem("list")) {
    list = JSON.parse(localStorage.getItem("list"))
    for (let i = 0; i < list.length; i++) {
        if (list[i].checkbox == "yes") {
            // CreateTaskDiv --------------------------------------------- >>
            createDivMain(list[i].date, list[i].text, list[i].time, list[i].checkbox == "yes")
        } else {
            // CreateTaskDiv --------------------------------------------- >>
            createDivMain(list[i].date, list[i].text, list[i].time)
            console.log("no")
        }
    }
}//
// AddTask
btnAdd.addEventListener("click", function () {
    for (let i = 0; i < list.length; i++) {
        if (inputText.value == list[i].text) {
            return alert("The task is already list, Pleas make another one :-)")
        }
    }
    if (inputText.value && inputDate.value && inputTime.value) {
        // pushArray ------------------------------------------>>
        if (checkbox.checked == true) {
            list.push({ text: inputText.value, date: inputDate.value, time: inputTime.value, checkbox: "yes" })
        } else {
            list.push({ text: inputText.value, date: inputDate.value, time: inputTime.value, checkbox: "no" })
        }
        // CreateTaskDiv ------------------------------------- >>
        createDivMain(inputDate.value, inputText.value, inputTime.value)
        //clear ----------------------------------------------->>
        clear()
        // JSON ----------------------------------------------->>
        localStorage.setItem("list", JSON.stringify(list))
        document.querySelector(".inputDate").valueAsDate = new Date();
        inputText.style.border = "";
        inputDate.style.border = "";
        inputTime.style.border = "";
    } else {
        required()
    }
})
function required() {
    if (inputText.value == "" && inputTime.value == "") {
        inputText.style.border = "1px solid #ff7171";
        inputTime.style.border = "1px solid #ff7171";
    } else if (inputText.value == "") {
        inputText.style.border = "1px solid #ff7171";
        inputTime.style.border = "";
    } else if (inputDate.value == "") {
        inputDate.style.border = "1px solid #ff7171";
        inputText.style.border = "";
        inputText.style.border = "";
    } else if (inputTime.value == "") {
        inputTime.style.border = "1px solid #ff7171";
        inputText.style.border = "";
        inputDate.style.border = "";
    }
}//
function getFullName(item) {
    return [item.firstname, item.lastname].join(" ");
}
// ClearButton ---------------------------------------- >>
btnClear.addEventListener("click", function () {
    clear()
})
//ClearAllTasks ()=>
function clear() {
    inputText.value = ""
    inputDate.value = ""
    inputTime.value = ""
    checkbox.checked = ""
}
//TextClearOnly
const clearText = document.querySelector(".cleartext")
clearText.addEventListener("click", function () {
    inputText.value = ""
})//
// CreateTaskDiv ()=> --------------------------------- >>
function createDivMain(reverseDateP, textContentP, timeContentP, checkbBoxP) {
    // appendChild ----------------------------------------->>
    const taskDiv = document.createElement("div")
    const taskDivExit = document.createElement("div")
    const taskExit = document.createElement("icon")
    const taskMark = document.createElement("img")
    const taskText = document.createElement("p")
    const taskDivTime = document.createElement("div")
    const taskDate = document.createElement("h1")
    const taskTime = document.createElement("h1")
    const taskEdit = document.createElement("img")
    // appendChild ------------------------------------------>>
    document.body.appendChild(container)
    container.appendChild(maintask)
    maintask.appendChild(taskDiv)
    taskDiv.appendChild(taskDivExit)
    taskDivExit.appendChild(taskExit)
    taskDivExit.appendChild(taskMark)
    taskDiv.appendChild(taskText)
    taskDiv.appendChild(taskDivTime)
    taskDivTime.appendChild(taskDate)
    taskDivTime.appendChild(taskTime)
    taskDivTime.appendChild(taskEdit)
    //className --------------------------------------------->>
    taskDiv.className = "taskDiv"
    taskDivExit.className = "taskDivExit"
    taskExit.className = "fas fa-times"
    taskMark.className = "taskMark"
    taskText.className = "taskText"
    taskEdit.className = "taskEdit"
    taskDivTime.className = "taskDivTime"
    taskDate.className = "taskDate"
    taskTime.className = "taskTime"
    //classSrc --------------------------------------------->>
    taskMark.src = "bookmark(1).png"
    taskEdit.src = "pencil.png"

    // reverseDate ------------------------------------------>>
    var date = reverseDateP;
    date = date.split("-").reverse().join("-");
    // textContent ------------------------------------------>>
    taskText.textContent = textContentP
    taskDate.innerHTML = "Date </br>" + date
    taskTime.innerHTML = "Time </br>" + timeContentP
    // removeFromArray -------------------------------------->>
    taskExit.addEventListener("click", function (e) {
        taskExit.textContent = taskText.textContent
        taskDiv.remove()
        list = list.filter(function (n) {
            return n.text != e.target.textContent
        })
        localStorage.setItem("list", JSON.stringify(list))
        numberOfTask()
        console.log(list)
    })
    // editTask --------------------------------------------->>
    taskEdit.addEventListener("click", function () {
        //createElement
        const taskEditTask = document.createElement("textarea")
        const taskEditTaskSave = document.createElement("div")
        const save = document.createElement("img")
        const cancel = document.createElement("img")
        //appendChild
        taskDivExit.appendChild(taskEditTask)
        taskDivTime.appendChild(taskEditTaskSave)
        taskEditTaskSave.appendChild(cancel)
        taskEditTaskSave.appendChild(save)
        // style
        taskText.style.display = "none"
        taskEdit.style.display = "none"
        // className
        taskEditTask.className = "taskEditTask"
        taskEditTaskSave.className = "taskEditTaskSave"
        save.className = "save"
        cancel.className = "cancel"
        // src
        save.src = "checklist.png"
        cancel.src = "cancel.png"
        // textContent
        taskEditTask.value = taskText.textContent
        // addEventListener
        cancel.addEventListener("click", function () {
            taskEditTask.remove()
            taskEditTaskSave.remove()
            taskText.style.display = "block"
            taskEdit.style.display = "block"
        })
        save.addEventListener("click", function () {
            taskEditTask.remove()
            taskEditTaskSave.remove()
            taskText.style.display = "block"
            taskEdit.style.display = "block"
            let t = list.find(function (n) {
                return n.text == taskText.textContent
            })
            taskText.textContent = taskEditTask.value
            t.text = taskEditTask.value
            localStorage.setItem("list", JSON.stringify(list))
        })
    })
    // numberOfTask ----------------------------------------->>
    numberOfTask()
    // checkBox --------------------------------------------->>
    function mark() {
        if (checkbox.checked == true || checkbBoxP) {
            const taskImg = document.createElement("img")
            taskImg.className = "taskImg"
            taskImg.src = "bookmark.png"
            taskDivExit.appendChild(taskImg)
            taskImg.addEventListener("click", function () {
                taskImg.style.display = "none"
                let t = list.find(function (n) {
                    return n.text == taskText.textContent
                })
                t.checkbox = "no"
                localStorage.setItem("list", JSON.stringify(list))
            })
        }
    }
    mark()
    taskMark.addEventListener("click", function () {
        mark()
        let t = list.find(function (n) {
            return n.text == taskText.textContent
        })
        t.checkbox = "yes"
        localStorage.setItem("list", JSON.stringify(list))
    })
}//
