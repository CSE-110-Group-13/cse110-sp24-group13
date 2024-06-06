import { 
    getProjectTableFromStorage,
    getProjectFromTable,
    appendCompletedTaskToProject,
    removeCompletedTaskFromProject,
    modifyLastWorkedOn
} from "../backend/ProjectTable.js"; 
import {
    modifyLinkedProject,
    getNoteTableFromStorage,
    getNoteFromTable
} from "../backend/NoteTable.js";
import {
    getTaskFromTable,
    modifyTaskCompleted
  } from "../backend/TaskTable.js"

class linkedProject extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
        this.loadProject();

    }

    loadProject() {
        console.log("loadProject")
        let Note_ID = window.location.hash.substring(1);
        if (Note_ID !== "") {
            let table = getNoteTableFromStorage(Note_ID);
            let note = table[Note_ID];
            console.log(note);
            console.log(note["linkedProject"]);
            if (note["linkedProject"] !== "") {
                this.populateProject(note["linkedProject"]);
            }
        }
        
    }    

    createTaskListItem(taskListElement, taskListArray, projectID, progressBar, progressLabel) {
        taskListArray.forEach(taskID => {
          const task = getTaskFromTable(taskID);
          const taskListItem = document.createElement('li');
          taskListElement.appendChild(taskListItem);
      
          const inputCheckbox = document.createElement('input');
          inputCheckbox.setAttribute('type', 'checkbox');
          inputCheckbox.id = taskID;
          
          const label = document.createElement('label');
          label.setAttribute('for', taskID);
          label.textContent = task.name;
      
          if (task.completed === true) {
            inputCheckbox.checked = true;
            label.classList.add('strikethrough');
          }
      
          this.updateTaskCompletionStatusEventListener(inputCheckbox, projectID, progressBar, progressLabel, label);
          taskListItem.appendChild(inputCheckbox);
          taskListItem.appendChild(label);
        });
    }

    updateTaskCompletionStatusEventListener(singleInputCheckbox, projectID, progressBar, progressLabel, label){
        singleInputCheckbox.addEventListener('change', () => {
          const taskID = singleInputCheckbox.id;
          const task = getTaskFromTable(taskID);
          // unchecked to checked
          if (singleInputCheckbox.checked === true && task.completed === false) {
            let newDate = new Date();
            newDate = newDate.toISOString().split('T')[0];
            modifyTaskCompleted(taskID, true);
            appendCompletedTaskToProject(projectID, taskID);
            modifyLastWorkedOn(projectID, newDate);
            progressBar.value = this.calculateTaskCompletion(projectID);
            progressLabel.textContent = `${progressBar.value}% of tasks completed`;
            label.classList.add('strikethrough');

          }
          // checked to unchecked
          if (singleInputCheckbox.checked === false && task.completed === true) {
            let newDate = new Date();
            newDate = newDate.toISOString().split('T')[0];
            modifyTaskCompleted(taskID, false);
            removeCompletedTaskFromProject(projectID, taskID);
            modifyLastWorkedOn(projectID, newDate);
            progressBar.value = this.calculateTaskCompletion(projectID);
            progressLabel.textContent = `${progressBar.value}% of tasks completed`;
            label.classList.remove('strikethrough');
          }
        });
    }

    calculateTaskCompletion(projectID) {
        const selectedProject = getProjectFromTable(projectID);
        const taskList = selectedProject.taskList;
        if (taskList.length !== 0) {
          let numberCompleted = 0;
          let totalTasks = taskList.length;
          taskList.forEach(taskID => {
            const task = getTaskFromTable(taskID);
            if (task.completed === true) {numberCompleted++};
          });
          let percentCompleted = Math.trunc((numberCompleted / totalTasks) * 100);
          return percentCompleted;
        } else {
          return -1;
        }
      }

    dateToString(dateStr) {
        const months = ["January", "February", "March", "April", "May", "June",
                  "July", "August", "September", "October", "November", "December"];
    
        const [year, month, day] = dateStr.split("-");
    
        const monthName = months[parseInt(month, 10) - 1];
    
        const dayInt = parseInt(day, 10);
        const suffix = (dayInt === 1 || dayInt === 21 || dayInt === 31) ? "st" :
                       (dayInt === 2 || dayInt === 22) ? "nd" :
                       (dayInt === 3 || dayInt === 23) ? "rd" : "th";
    
        return `${monthName} ${dayInt}${suffix}`;
    }

    timeTillDeadline(deadline) {
        const currentDate = new Date();
        const deadlineDate = new Date(deadline);
      
        const differenceInTimeMilliseconds = deadlineDate - currentDate;
        if (differenceInTimeMilliseconds <= 0) {
          return "Deadline has already passed.";
        }
      
        const differenceInDays = Math.floor(differenceInTimeMilliseconds/ (1000 * 60 * 60 * 24));
        const weeksLeft = Math.floor(differenceInDays / 7);
        const daysLeft = differenceInDays % 7;
      
        if (weeksLeft > 1 && daysLeft > 1) {
          return `${weeksLeft} Weeks, ${daysLeft} Days till deadline: ${this.dateToString(deadline)}`;
        }
        else if (weeksLeft <= 1 && daysLeft > 1) {
          return `${weeksLeft} Week, ${daysLeft} Days till deadline: ${this.dateToString(deadline)}`;
        }
        else if (weeksLeft > 1 && daysLeft <= 1) {
          return `${weeksLeft} Weeks, ${daysLeft} Day till deadline: ${this.dateToString(deadline)}`;
        }
        else if (weeksLeft <= 1 && daysLeft <= 1) {
          return `${weeksLeft} Week, ${daysLeft} Day till deadline: ${this.dateToString(deadline)}`;
        }
    }

      populateProject(projectID) {
        console.log("populateProject");
    
        const linkedProject = document.querySelector('.linkedProject');
        if(!linkedProject.classList.contains('open')) {
            linkedProject.classList.toggle('open');
        }
        const linkAProject = document.querySelector('.linkAProject');
        if(!linkAProject.classList.contains('close')){
            linkAProject.classList.toggle('close');
        }
        let project = getProjectFromTable(projectID);
        let projectTitle = document.getElementById('projectTitle');
        let projectDue = document.querySelector('.projectDue p');
        let projectDesc = document.getElementById('projectDescContent');
        let projectProgress = document.querySelector('progress');
        
        projectTitle.textContent = project.title;
        projectDue.textContent = this.timeTillDeadline(project.deadline);
        projectDesc.textContent = project.description;

        // Update progress bar
        projectProgress.value = `${this.calculateTaskCompletion(projectID)}`;
        let progressLabel = document.getElementById("progressLabel");
        progressLabel.textContent = `${projectProgress.value}% of tasks completed`;

        //Add tasks to the task container
        let taskList = document.querySelector('.tasks');
        taskList.innerHTML = '';
        this.createTaskListItem(taskList, project.taskList, projectID, projectProgress, progressLabel);
    
        // Add hrefs to projectView 
        let projectViewLink = document.querySelector('.projectHeader a');
        projectViewLink.href = "../project/view-project.html" + "#" + projectID;

        // Add priority
        let priority = document.querySelector('.priorityDot');
        if(project.priority === "high") {
            priority.style.backgroundColor = '#FF000F';
        }
        else if (project.priority === "medium") {
            priority.style.backgroundColor = '#FFD600';
        }
        else if (project.priority === "low") {
            priority.style.backgroundColor = '#0AB73B';
        }
    }

    render() {
        // Styling 
        const styles = document.createElement('style');
        styles.innerHTML = `
        linked-project #container {
            display: flex;
            flex-direction: column;
            width: 85vw;
            
        }

        .linkAProject.open{
            display: flex;
            flex-direction: row;

        }

        .linkAProject.close{
            display: none;
        }

        #lButton {
            display: flex; 
            width: 20%;
            justify-content: center; 
            align-items: center; 
            background-color: #F8F8F8;
            box-shadow: 3px 4px 8px rgba(0, 0, 0, 0.08);
            border-radius: 10px;
            padding: 25px 5px; 
            text-decoration: none; 
            color: black; 
            font-size: min(2.5vw, min(16px, 2.5vw));
            border-width: 0px;
            margin-left: auto;
            margin-right: auto;
        }

        #lButton:hover {
            background-color: #e0e0e0; /* Change background color on hover */
        }

        #lButton svg {
            margin-left: 8px; /* Add space between icon and text */
            width: 25px;
            height: 25px;
        }

        .addProjectContainer.close {
            display: none;
        }

        .addProjectContainer.open {
            display: block;
            position: relative;
            height: 50vh;
            width: 50vw;
            margin: 20vh auto;
            background-color: #FFFFFF;
            padding: 15px;
            border-radius: 10px;
            box-shadow: 3px 4px 8px rgba(0, 0, 0, 0.08);
            overflow: auto;
        }

        #overlay h1 {
            text-align: center;
            margin-bottom: 10px;
            font-weight: 525;
        }

        #overlay hr {
            border: 1px solid #000;
            border-width: 0 0 1.5px 0;
            width: 90%;
        }

        .addProjectContainer #back-button {
            border: none;
            background-color: transparent;
            cursor: pointer;
            outline: none;
            box-shadow: none;
            position: absolute;
            top: 10px;
            left: -25px;
        }

        #instructions {
            text-align: center;
            color: #7C7C7C;
        }

        #overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 999;
            background-color: rgba(0, 0, 0, 0.5);;
            justify-content: center;
            align-items: center;
        }

        #overlay.open {
            display: flex;
        }

        #confirm-button {
            cursor: pointer;
            border: none;
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0em 0em 0.5em rgba(0, 0, 0, 0.2);
            font-size: 15px;
            width: 75px;
            position: relative;
            margin-left: auto;
            margin-right: 10px;
            
        }

        .currentProjects {
            border-radius: 10px;
            align-items: center;
            margin: auto;
            text-align: center;
            font-weight: 525;
            padding: 5px;
            width: 80%;
        } 

        .currentProjects button {
            width: 100%;
            margin: 2px auto;
        }

        .selected {
            background-color: #e0e0e0;
        }

        .linkedProject.close {
            display: none;
        }

        .linkedProject.open {
            display: flex;
            flex-direction: column;
            padding: 10px;
            background-color: #F8F8F8;
            border-radius: 25px; 
            margin-bottom: 20px;
            margin-right: auto;
            margin-left: auto;
            width: 100%;


        }  

        .priorityDot {
            width: 20px; 
            height: 20px; 
            border-radius: 50%; 
            background-color: rgb(208, 225, 208);
            margin-right: 15px;
            margin-left: 0px;
            flex-shrink: 0; /* Prevents shrinking */
          }

        .linkedProject svg {
            width: 25px;
            height: 25px;
        }

        .projectHeader {
            display: flex;
            flex-direction: row;
            align-items: center;
        }

        .projectHeader h1 {
            margin-right: 15px;
            font-size:25px;
        }

        .projectHeader a {
            margin-left: auto;
            margin-right: 10px;
            cursor: pointer;
        }
    
        .projectHeader .progress {
            margin-left: 20px;
            margin-right: auto;
        }
        
        .projectDetails {
            margin-left: 32px;
        }

        .projectDue {
            display: flex;
            flex-direction: row;
            align-items: center; 
            margin-top: -15px;
        }

        .projectDue svg {
            width: 18px;
            height: 18px;
            margin-right: 10px;
        }
        
        .projectTaskList {
            display: flex;
            flex-direction: column; 
        }

        .projectTaskList p {
            color: #7C7C7C;
        }

        .descHeader {
            display: flex;
            flex-direction: row;
            align-items: center;
            
        }

        #descDropdown {
            border: none;
            background-color: transparent;
            outline: none;
            box-shadow: none;
            cursor: pointer;
        }

        #projectDescContent.close {
            display: none;
        }

        .projectFooter {
            display: flex;
            flex-direction: row;
            align-items: center;
        }

        .tasks {
            list-style-type: none;
            margin-right: 8px;
            margin-top: -10px;
            padding: 10px;
        }

        .tasks input {
            margin-right: 8px;
            accent-color: black;
        }

        .strikethrough {
            text-decoration: line-through;
        }

        .projectFooter {
            margin-left: 32px;
        }

        .projectFooter button {
            display: flex;
            justify-content: center; 
            align-items: center; 
            color: #8B0000;
            font-weight: bold;
            font-size: 12px; 
            margin-left: auto;
            margin-right: 10px;
            cursor: pointer;
            outline: none;
            box-shadow: none;
            border: none;
            background-color: transparent;
            width: auto;
            
        }

        .projectFooter svg {
            fill: #8B0000;
            margin-left: 4px; /* Add space between icon and text */
            width: 15px;
            height: 15px;
        }

        .description {
            width: 60vw;
            background-color: #F8F8F8;
            border-radius: 25px; 
            padding: 5px 20px;
            margin-left: auto;
            margin-right: 3vw;
        }
        
        .description p {
            margin-top: -15px;
            margin-left: 20px;
        }
        `;
        // Create the main container
        const container = document.createElement('div');
        container.id = 'container';

        // Create link a project container
        const linkAProject = document.createElement('div');
        linkAProject.classList = "linkAProject";
        linkAProject.classList.toggle("open");

        // Create a container the description of linking a project
        const descriptionContainer = document.createElement('div');
        descriptionContainer.classList = "description";
        const linkProject = document.createElement('h3');
        linkProject.textContent = "Link a Project";
        descriptionContainer.appendChild(linkProject);
        const description = document.createElement('p');
        description.textContent = "This allows you to to update a specific task. Once you select a speific task, you can then check off which subtask you have completed in this specific note";
        descriptionContainer.appendChild(description);
        linkAProject.appendChild(descriptionContainer);

        // Create a button to link a project
        const lButton = document.createElement('button');
        lButton.id = 'lButton';
        lButton.innerHTML = `Link a Project <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z"/></svg>`
        linkAProject.appendChild(lButton);
        
        // Create overlay 
        const overlay = document.createElement('div');
        overlay.id = 'overlay';
        container.appendChild(overlay);

        // Create project container 
        const projectContainer = document.createElement('div');
        projectContainer.classList = 'addProjectContainer';
        projectContainer.classList.toggle("close");
        overlay.appendChild(projectContainer);

        // Create back button
        const backButton = document.createElement('button');
        backButton.id = "back-button";
        backButton.innerHTML = `<svg width="11" height="16" viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.34363 6.98486L6.98426 0.344238C7.44324 -0.114746 8.18543 -0.114746 8.63953 0.344238L9.74304 1.44775C10.202 1.90674 10.202 2.64893 9.74304 3.10303L5.0409 7.81494L9.74793 12.522C10.2069 12.981 10.2069 13.7231 9.74793 14.1772L8.64441 15.2856C8.18543 15.7446 7.44324 15.7446 6.98914 15.2856L0.348513 8.64502C-0.115354 8.18604 -0.115354 7.44385 0.34363 6.98486Z" fill="black"/></svg>`;
        projectContainer.appendChild(backButton);

        // Create title
        const selectProject = document.createElement('h1');
        selectProject.textContent = "Select Project";
        projectContainer.appendChild(selectProject);

        // Create horizontal line
        const line = document.createElement('hr');
        projectContainer.appendChild(line);

        // Create instructions
        const instructions = document.createElement('p');
        instructions.id = 'instructions';
        instructions.textContent = 'Select the project that you worked on in this log';
        projectContainer.appendChild(instructions);

        //creating the linked project container
        const linkedProjectComponent = document.createElement('div');
        linkedProjectComponent.classList = 'linkedProject';  
        linkedProjectComponent.innerHTML = `
            <div class="projectHeader">
                <span class="priorityDot"></span>
                <h1 id="projectTitle">Project Name</h1>
                <div class="progress">
                    <progress id="progressBar" value="33" max="100">2000000</progress>
                    <label for="progressBar" id="progressLabel">placeholder%</label>
                </div>
                <a id=projectView><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z"/></svg></a>
            </div>
            <div class="projectDetails">
                <div class="projectDue">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                        <path d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z"/>
                    </svg>
                    <p>placeholder: 1 Week, 2 Days, 3 hours till Deadline</p>
                </div>
                <div class="descHeader">
                    <h3><label for="projectDesc">Description</label></h3>
                    <!-- minimize button -->
                    <button id="descDropdown">
                        <svg id="descDropdown" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https: fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                            <path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"/>
                        </svg>
                    </button>
                </div>
                <p id="projectDescContent">Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus beatae eum perferendis accusantium quasi odio vel voluptatem temporibus nihil sed reprehenderit quo eveniet delectus reiciendis dolor itaque, nemo quas dolore!</p>
                <div class="projectTaskList">
                    <h3>Tasks</h3>
                    <ul class="tasks"></ul>  
                </div>
            </div>
            <footer class="projectFooter">
                <p><i>This is the project linked to this note, check off tasks that you have completed for this note</i></p>
                <button>Change Project <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z"/></svg></button>
            </footer>
        </div>`;
        container.appendChild(linkedProjectComponent);
        container.appendChild(linkAProject);
        linkedProjectComponent.classList.toggle("close");

        // Get projects from local storage
        const projectTable = getProjectTableFromStorage(); 

        // Create a form element
        const form = document.createElement('form');
        projectContainer.appendChild(form);

        // Load projects under currentProjects;
        for(const[key, value] of Object.entries(projectTable)) {
            // Create currentProjects container
            const currentProjects = document.createElement('div');
            currentProjects.classList = "currentProjects";
            form.appendChild(currentProjects);
            // Get note_id and noe
            let note_id = window.location.hash.substring(1);
            let note = getNoteFromTable(note_id);
            // Add title of the project
            const projectElement = document.createElement('button');
            projectElement.type = 'button';
            projectElement.textContent = value.title;
            projectElement.id = key;
            // Add selected if the project is in the projectList
            if(note.linkedProject === key) {
                projectElement.classList.add('selected');
            }
            
            projectElement.addEventListener('click', () => {
                const selectProject = document.querySelector('.selected');
                if (selectProject) {
                    selectProject.classList.remove('selected');
                } 
                projectElement.classList.add('selected');
            });
            currentProjects.appendChild(projectElement);
        }
    

        // Add confirm button
        const confirmButton = document.createElement('button');
        confirmButton.type = 'submit';
        confirmButton.id = 'confirm-button';
        confirmButton.textContent = 'Confirm';
        projectContainer.appendChild(confirmButton);

        
        // Add event listener for form submission
        confirmButton.addEventListener('click', (event) => {
            event.preventDefault();
            // Add project to linkedProject for the note
            const selectedProject = form.querySelector('.selected');
            let NOTE_ID = window.location.hash.substring(1);
            modifyLinkedProject(NOTE_ID, selectedProject.id);
            projectContainer.classList.toggle("open");
            overlay.classList.toggle("open");
            linkAProject.classList.toggle("close");
            this.populateProject(selectedProject.id);          
        });

        // Add event listener for when add project button is pressed
        lButton.addEventListener('click', () => {
            projectContainer.classList.toggle("open"); 
            overlay.classList.toggle("open");
        });

        // Add event listener for when back button is pressed
        backButton.addEventListener('click', () => {
            projectContainer.classList.toggle("open");
            overlay.classList.toggle("open");
            const selectedProject = form.querySelector('.selected');
            if (selectedProject) {
                selectedProject.classList.remove('selected');
            }
        });
        
        document.addEventListener('DOMContentLoaded', () => {
            const descDropdownButton = document.getElementById('descDropdown');
            const projectDescContent = document.getElementById('projectDescContent');
        
            // Add event listener for when the descDropdown button is clicked
            descDropdownButton.addEventListener('click', () => {
                projectDescContent.classList.toggle('close');

                if(projectDescContent.classList.contains('close')) {
                    descDropdownButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>'
                }
                else {
                    descDropdownButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"/></svg>'
                }
            });

            // Change Project Button
            const changeButton = document.querySelector('.projectFooter button');
            changeButton.addEventListener('click', () => {
                let note_id = window.location.hash.substring(1);
                let note = getNoteFromTable(note_id);
                let selectedProject = form.querySelector(`#${note.linkedProject}`)
                if (!selectedProject.classList.contains('selected')) {
                    selectedProject.classList.add('selected');
                }
                projectContainer.classList.toggle("open");
                overlay.classList.toggle("open");
            });
        });
   
        this.appendChild(styles);
        this.appendChild(container);

    }

    removeLButton() {
        const lButton = document.getElementById('lButton');
        lButton.remove();
    }
}

customElements.define('linked-project', linkedProject);