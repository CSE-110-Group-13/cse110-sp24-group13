document.addEventListener("DOMContentLoaded", () => {
    const createTaskBtn = document.getElementById("create-task-btn");
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

    createTaskBtn.addEventListener("click", () => {
        taskModal.style.display = "block";
    });

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
    });

    yearInput.addEventListener("change", () => {
        currentYear = parseInt(yearInput.value);
        generateCalendar(currentMonth, currentYear);
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
    });

    function updateControls() {
        monthSelect.value = currentMonth;
        yearInput.value = currentYear;
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
            taskElement.innerHTML = `<strong>${taskTitle}</strong><p>${taskDescription}</p>`;
            dayElement.querySelector(".tasks").appendChild(taskElement);
        }

        taskForm.reset();
        taskModal.style.display = "none";
    }

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

    generateCalendar(currentMonth, currentYear);
});