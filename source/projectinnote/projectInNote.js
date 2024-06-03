import { 
    getProjectTableFromStorage
} from "../backend/ProjectTable.js"; 
import {
    appendProjectToNoteProjectList,
    getNoteTableFromStorage
} from "../backend/NoteTable.js";

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
            let note = getNoteTableFromStorage(Note_ID);
            if (note.projectList !== undefined) {
                this.populateProject(note.projectList[0]);
            }    
        }
        
    }    

    populateProject(projectID) {
        console.log("populateProject");
        projectContainer.classList.toggle("open");
        linkedProject.classList.toggle("open");
        let project = getProjectFromTable(projectID);
        let projectTitle = document.getElementById('projectTitle');
        let projectDue = document.querySelector('.projectDue p');
        let projectDesc = document.querySelector('.projectDetails p');
        let projectProgress = document.querySelector('progress');
        projectTitle.textContent = project.title;
        projectDue.textContent = project.dueDate;
        projectDesc.textContent = project.description;
        projectProgress.value = project.progress;
    }
    render() {
        // Styling 
        const styles = document.createElement('style');
        styles.innerHTML = `
        #lButton {
            display: flex;
            width: 158px;
            justify-content: center;
            align-items: center;
            background-color: #F8F8F8;
            box-shadow: 3px 4px 8px rgba(0, 0, 0, 0.08);
            border-radius: 10px;
            padding: 25px 20px; 
            text-decoration: none; 
            color: black; 
            font-size: 16px;
            border-width: 0px;
        }

        #lButton:hover {
            background-color: #e0e0e0; /* Change background color on hover */
        }

        #lButton svg {
            margin-left: 10px; /* Add space between icon and text */
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

        `;

        // Create the main container
        const container = document.createElement('div');
        container.id = 'container';

        // Create a button to link a project
        const lButton = document.createElement('button');
        lButton.id = 'lButton';
        lButton.innerHTML = `Add Project <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z"/></svg>`
        container.appendChild(lButton);
        
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
        const linkedProject = document.createElement('div');
        linkedProject.classList = 'linkedProject';
        container.appendChild(projectContainer);
        linkedProject.innerHTML = `
        <div class="container">
            <div class="projectHeader">
                <span class="priorityDot"></span>
                <h1 id="projectTitle">Project Name</h1>
                <div class="progress">
                    <label for="progressBar">placeholder%</label>
                    <progress id="progressBar" value="33" max="100">200000</progress>
                </div>
            </div>
            <div class="projectDetails">
                <div class="projectDue">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                        <path d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z"/>
                    </svg>
                    <p>placeholder: 1 Week, 2 Days, 3 hours till Deadline</p>
                </div>
                <h3><label for="projectDesc">Description</label></h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus beatae eum perferendis accusantium quasi odio vel voluptatem temporibus nihil sed reprehenderit quo eveniet delectus reiciendis dolor itaque, nemo quas dolore!</p>
                <!-- minimize button -->
                <svg id="descDropdown" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                    <path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"/>
                </svg>
            </div>
        </div>`;
        linkedProject.classList.toggle("close");

        // Get projects from local storage
        const projectTable = getProjectTableFromStorage(); 

        /*
        // If note already has a linked project then add selected
        if(note.projectList.length > 0) {
            note.projectList.classList.add('selected');
        }
        */

        // Create a form element
        const form = document.createElement('form');
        projectContainer.appendChild(form);

        // Load projects under currentProjects;
        for(const[key, value] of Object.entries(projectTable)) {
            // Create currentProjects container
            const currentProjects = document.createElement('div');
            currentProjects.classList = "currentProjects";
            form.appendChild(currentProjects);

            // Add title of the project
            const projectElement = document.createElement('button');
            projectElement.type = 'button';
            projectElement.textContent = value.title;
            projectElement.id = key;
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
            // Add project to projectList for the note
            const selectedProject = form.querySelector('.selected');
            let NOTE_ID = window.location.hash.substring(1);
            appendProjectToNoteProjectList(NOTE_ID, selectedProject.id);
            projectContainer.classList.toggle("open");
            overlay.classList.toggle("open");
            this.populateProject(selectedProject.id);
            
        })

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


        this.appendChild(styles);
        this.appendChild(container);

    }

    removeLButton() {
        const lButton = document.getElementById('lButton');
        lButton.remove();
    }
}

customElements.define('linked-project', linkedProject);