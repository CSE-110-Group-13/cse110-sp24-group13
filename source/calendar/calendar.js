import {
    getProjectTableFromStorage,
} from "../backend/ProjectTable.js"
import {
    getNoteTableFromStorage,
} from "../backend/NoteTable.js"


/**
 * Loads and populates calendar grid and notes/projects
 */
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

    closeBtn.addEventListener("click", () => {
        taskModal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === taskModal) {
            taskModal.style.display = "none";
        }
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

    /**
     * Button makes calendar go back one Month
     */
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

    /**
     * Button makes calendar go forward one Month
     */
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

    /**
     * Populates calendar for the set month/year so dates and rows line up
     * with proper days of the week and weeks
     * @param {number} month - month calendar is set to
     * @param {number} year - year calendar is set to
     */
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

    /**
     * Check if the parameter date is equal to today's date
     * @param {Date} date - date to compare with "today"
     * @returns boolean true if date is same as current date
     */
    function isToday(date) {
        const today = new Date();
        return date.getDate() === today.getDate() 
            && date.getMonth() === today.getMonth() 
            && date.getFullYear() === today.getFullYear();
    }
    
    generateCalendar(currentMonth, currentYear);
    addNotesAndProjectsToCalendar();
});

/**
 * Gives icon color based on if the deadline has passed
 * if deadline has not passed then gives color based on priority
 * @param {Date} deadline - date of project deadline
 * @param {string} priority - priority of project
 * @returns string hex color
 */
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
 * Populates Calendar with notes and projects. 
 * formats them as "tasks"
 */
function addNotesAndProjectsToCalendar() {
    const noteTable = getNoteTableFromStorage();
    const projectTable = getProjectTableFromStorage();

    // Date is saved as year-month-day 2024-05-30
    // const dayElement = document.querySelector(`[data-date='${taskDate}']`);

    /**
     * iterate through notetable and add notes to the calendar
     * icon color for notes is set to blue
     */
    for (const [key, value] of Object.entries(noteTable)) {
        const dayElement = document.querySelector(`[data-date='${value.date}']`);
        console.log(dayElement);
        if (dayElement) {
            const noteElement = document.createElement('a');
            noteElement.className = "task";
            noteElement.href = "../note/view-note.html" + "#" + value.noteID; 


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

    /**
     * iterate through projectTable and add projects to the calendar
     * icon color for projects is set based on priority
     */
    for (const [key, value] of Object.entries(projectTable)) {
        const deadlineDate = value.deadline.split('T')[0];
        const dayElement = document.querySelector(`[data-date='${deadlineDate}']`);
        if (dayElement) {
            const projectElement = document.createElement('a');
            projectElement.className = "task";
            projectElement.href = "../project/view-project.html" + "#" + value.projectID;

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
    
}