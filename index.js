let task = document.getElementById("taskInput")
let taskbtn = document.getElementById("addTaskBtn")
let time = document.getElementById("timeInput")
let timebtn = document.getElementById("addInputBtn")
let addbtn = document.getElementById("addbtn")


//class of tasks to create tasks as objects 
class tasks {
    constructor(task, time) {
        this.task = task; 
        this.time = time;
        this.done=false;
    }    
}

// on page load show all the data
function showAllData() {
    let allist=document.getElementsByClassName("todo-input")
    for(let i=1;i<allist.length;i++){
        allist[i].remove();
    }

    let storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    
    let container = document.getElementById("container");
    storedTasks.forEach((task, index) => {
        let div = document.createElement("div");
        div.className = "todo-input";
        div.dataset.index = index; // Store index in data attribute
        div.innerHTML = ` 
            <div class="task-no"><b>Task:</b>${index + 1}</div>
            <div class="task">${task.task}</div>
            <div class="time">${task.time}</div>
            <div class="delete">
                <button class="delbtn">Delete</button>
                <button class="Done">Done</button>
            </div>`;

        container.appendChild(div);
        // Background green check
        
        if(task.done){
            let DoneBtn = div.querySelector(".Done");
             DoneBtn.parentElement.parentElement.style.backgroundColor="rgb(126, 230, 126)"
             //Disappear Done Button as already Completed
             DoneBtn.style.display = "none";
        }

        //Delete Feature
        let deleteBtn = div.querySelector(".delbtn");
        deleteBtn.addEventListener("click", function () {
            let storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

            let taskIndex = parseInt(div.dataset.index); // Get index from dataset
            storedTasks.splice(taskIndex, 1); // Remove task from array
            localStorage.setItem("tasks", JSON.stringify(storedTasks)); 
            div.remove();
            window.location.reload();
        });


        //Make the done value from false to true one btn click
        let DoneBtn = div.querySelector(".Done");
        DoneBtn.addEventListener("click", function () {
            //Getting all objects
            let storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

            // Get index from datase
            let taskIndex = parseInt(div.dataset.index); 
            storedTasks[taskIndex].done=true;

            //updating local storage
            localStorage.setItem("tasks", JSON.stringify(storedTasks)); 
            window.location.reload();
        });
    });

}

//Calling showdata on function call
showAllData()

//adding new data to local storage when button clicked
addbtn.addEventListener("click", () => {
    let taskvalue = task.value.trim(); 
    let timevlaue = time.value.trim();
    if (taskvalue === "" || timevlaue === "") {
        alert("Please enter both Task and Time before adding.");
        return;
    }
    let t = new tasks(taskvalue, timevlaue);
    let arr = JSON.parse(localStorage.getItem("tasks")) || [];
    arr.push(t);
    localStorage.setItem("tasks", JSON.stringify(arr));
    task.value=""
    time.value=""
    showAllData()
});


// Deleting the data in local storage
let DeleteBtn=document.getElementById("delete-btn")
DeleteBtn.addEventListener("click", () => {
    let storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    // console.log("All Tasks in Local Storage:");
    // console.table(storedTasks);
    localStorage.clear();
    showAllData()
});




