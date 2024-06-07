import {
    getProjectTableFromStorage,
} from "../backend/ProjectTable.js"
import {
    getNoteTableFromStorage,
} from "../backend/NoteTable.js"

document.addEventListener("DOMContentLoaded", () => {
    //const createTaskBtn = document.getElementById("create-task-btn");
    const taskModal = document.getElementById("task-modal");
    const closeBtn = document.getElementsByClassName("close")[0];
    const taskForm = document.getElementById("task-form");
    const calendarDays = document.getElementById("calendar-days");
    const monthSelect = document.getElementById("month-select");
    const yearInput = document.getElementById("year-input");
    const prevMonthBtn = document.getElementById("prev-month");
    const nextMonthBtn = document.getElementById("next-month");

    const months = [
        "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"
    ];

    months.forEach((month, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = month;
        monthSelect.appendChild(option);
    });

    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();

    monthSelect.value = currentMonth;
    yearInput.value = currentYear;


    //createTaskBtn.addEventListener("click", () => {
    //    taskModal.style.display = "block";
    //});

    closeBtn.addEventListener("click", () => {
        taskModal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === taskModal) {
            taskModal.style.display = "none";
        }
    });

    taskForm.addEventListener("submit", (event) => {
        event.preventDefault();
        addTask();
    });

    monthSelect.addEventListener("change", () => {
        currentMonth = parseInt(monthSelect.value);
        generateCalendar(currentMonth, currentYear);
        addNotesAndProjectsToCalendar();
    });

    yearInput.addEventListener("change", () => {
        currentYear = parseInt(yearInput.value);
        generateCalendar(currentMonth, currentYear);
        addNotesAndProjectsToCalendar();
    });

    prevMonthBtn.addEventListener("click", () => {
        if (currentMonth === 0) {
            currentMonth = 11;
            currentYear--;
        } else {
            currentMonth--;
        }
        updateControls();
        generateCalendar(currentMonth, currentYear);
        addNotesAndProjectsToCalendar();
    });

    nextMonthBtn.addEventListener("click", () => {
        if (currentMonth === 11) {
            currentMonth = 0;
            currentYear++;
        } else {
            currentMonth++;
        }
        updateControls();
        generateCalendar(currentMonth, currentYear);
        addNotesAndProjectsToCalendar();
    });

    function updateControls() {
        monthSelect.value = currentMonth;
        yearInput.value = currentYear;
    }

    // function addTask() {
    //     const taskDate = document.getElementById("task-date").value;
    //     const taskTitle = document.getElementById("task-title").value;
    //     const taskDescription = document.getElementById("task-description").value;

    //     if (!taskDate || !taskTitle || !taskDescription) {
    //         alert("All fields are required!");
    //         return;
    //     }

    //     const dayElement = document.querySelector(`[data-date='${taskDate}']`);
    //     if (dayElement) {
    //         const taskElement = document.createElement("div");
    //         taskElement.className = "task";
    //         taskElement.innerHTML = `<strong>${taskTitle}</strong><p>${taskDescription}</p>`;
    //         dayElement.querySelector(".tasks").appendChild(taskElement);
    //     }

    //     taskForm.reset();
    //     taskModal.style.display = "none";
    // }

    function generateCalendar(month, year) {
        calendarDays.innerHTML = '';
        const firstDay = new Date(year, month, 1).getDay();
        const lastDay = new Date(year, month + 1, 0).getDate();

        for (let i = 0; i < firstDay; i++) {
            const emptyCell = document.createElement("div");
            emptyCell.className = "calendar-day empty";
            calendarDays.appendChild(emptyCell);
        }

        for (let day = 1; day <= lastDay; day++) {
            const date = new Date(year, month, day);
            const dayElement = document.createElement("div");
            dayElement.className = "calendar-day";
            dayElement.setAttribute("data-date", date.toISOString().split("T")[0]);
            dayElement.innerHTML = `<span>${day}</span><div class="tasks"></div>`;
            // Check if the date is equal to today's date
            if (isToday(date)) {
                dayElement.classList.add("current-day");
            }
            calendarDays.appendChild(dayElement);
        }
    }

    // Find current date
    function isToday(date) {
        const today = new Date();
        return date.getDate() === today.getDate() 
            && date.getMonth() === today.getMonth() 
            && date.getFullYear() === today.getFullYear();
    }

    function addTask() {
        const taskDate = document.getElementById("task-date").value;
        const taskTitle = document.getElementById("task-title").value;
        const taskDescription = document.getElementById("task-description").value;

        if (!taskDate || !taskTitle || !taskDescription) {
            alert("All fields are required!");
            return;
        }

        const dayElement = document.querySelector(`[data-date='${taskDate}']`);
        if (dayElement) {
            const taskElement = document.createElement("div");
            taskElement.className = "task";

            const icon = document.createElement("div");
            icon.className = "task-icon";
            icon.style.backgroundColor = getRandomColor();
            

            const title = document.createElement("div");
            title.className = "task-title";
            title.textContent = taskTitle;

            taskElement.appendChild(icon);
            taskElement.appendChild(title);
            dayElement.querySelector(".tasks").appendChild(taskElement);
        }

        taskForm.reset();
        taskModal.style.display = "none";
    }
    
    generateCalendar(currentMonth, currentYear);
    addNotesAndProjectsToCalendar();
});

/** select random color */
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

//get icon color based on how far in future deadline is
function getIconColor(deadline, priority) {
    const currentDate = new Date();
    const deadlineDate = new Date(deadline);
    const oneDay = 24 * 60 * 60 * 1000; // milliseconds in one day
    const diffDays = (deadlineDate - currentDate) / oneDay;

    if (diffDays < 0) {
        return '#808080'; // Grey if date has passed
    } else if (priority === "high") {
        return '#FF000F'; // Red for high priority
    } else if (priority === "medium") {
        return '#FFD600'; // Yellow for medium priority
    } else {
        return '#0AB73B'; // Green for low priority
    }
}
/** 
function addNotesAndProjectsToCalendar() {
    const noteTable = getNoteTableFromStorage();
    const projectTable = getProjectTableFromStorage();

    // Date is saved as year-month-day 2024-05-30
    // const dayElement = document.querySelector(`[data-date='${taskDate}']`);

    for (const [key, value] of Object.entries(noteTable)) {
        const dayElement = document.querySelector(`[data-date='${value.date}']`);
        console.log(value.date);
        if (dayElement) {
            const noteElement = document.createElement('div');
            noteElement.className = "task";

            const icon = document.createElement('div');
            icon.className = 'task-icon';
            icon.style.backgroundColor = '#0000FF'; //always blue for notes

            const title = document.createElement('div');
            title.className = 'task-title';
            title.textContent = value.title;

            noteElement.appendChild(icon);
            noteElement.appendChild(title);
            dayElement.querySelector(".tasks").appendChild(noteElement);
        }
    }

    for (const [key, value] of Object.entries(projectTable)) {
        const dayElement = document.querySelector(`[data-date='${value.deadline}']`);
        console.log(value.deadline);
        if (dayElement) {
            const projectElement = document.createElement('div');
            projectElement.className = "task";

            const icon = document.createElement('div');
            icon.className = 'task-icon';
            //get icon color based on date
            icon.style.backgroundColor = getIconColor(value.deadline);

            const title = document.createElement('div');
            title.className = 'task-title';
            title.textContent = value.title;

            projectElement.appendChild(icon);
            projectElement.appendChild(title);
            dayElement.querySelector(".tasks").appendChild(projectElement);
        }
    }
    console.log('test');
}
*/
function addNotesAndProjectsToCalendar() {
    const noteTable = getNoteTableFromStorage();
    const projectTable = getProjectTableFromStorage();

    // Date is saved as year-month-day 2024-05-30
    // const dayElement = document.querySelector(`[data-date='${taskDate}']`);

    for (const [key, value] of Object.entries(noteTable)) {
        const dayElement = document.querySelector(`[data-date='${value.date}']`);
        console.log(value.date);
        if (dayElement) {
            const noteElement = document.createElement('a');
            noteElement.className = "task";
            // REPLACE WITH PROPER LINK
            noteElement.href = `LINKHERE?noteId=${key}`; 


            const icon = document.createElement('div');
            icon.className = 'task-icon';
            icon.style.backgroundColor = '#0000FF'; //always blue for notes

            const title = document.createElement('div');
            title.className = 'task-title';
            title.textContent = value.title;

            noteElement.appendChild(icon);
            noteElement.appendChild(title);
            dayElement.querySelector(".tasks").appendChild(noteElement);
        }
    }

    for (const [key, value] of Object.entries(projectTable)) {
        const deadlineDate = value.deadline.split('T')[0];
        const dayElement = document.querySelector(`[data-date='${deadlineDate}']`);
        console.log(deadlineDate);
        if (dayElement) {
            const projectElement = document.createElement('a');
            projectElement.className = "task";
            //REPLACE WITH PROPER LINK
            projectElement.href = `LINKHERE?projectId=${key}`;

            const icon = document.createElement('div');
            icon.className = 'task-icon';
            //get icon color based on date
            icon.style.backgroundColor = getIconColor(deadlineDate, value.priority);

            const title = document.createElement('div');
            title.className = 'task-title';
            title.textContent = value.title;

            projectElement.appendChild(icon);
            projectElement.appendChild(title);
            dayElement.querySelector(".tasks").appendChild(projectElement);
        }
    }
    console.log('test');
    
}