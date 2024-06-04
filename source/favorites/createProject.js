import {
    getProjectTableFromStorage, getProjectFromTable,
  
  }from "../backend/ProjectTable.js"

  import{
    getTaskTableFromStorage, getTaskFromTable,
  }from "../backend/TaskTable.js"
  
  window.addEventListener("DOMContentLoaded", createProjectTable);
  
  //Create Project Container to hold three projects
  const projectContainer = document.createElement("div");
  const projects = document.getElementById("project-section");
  projects.appendChild(projectContainer);
  projectContainer.className = "project-container";
  
  
  
  
  const calender = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M19 4H18V2H16V4H8V2H6V4H5C3.89 4 3.01 4.9 3.01 6L3 20C3 21.1 3.89 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM19 20H5V10H19V20ZM19 8H5V6H19V8ZM9 14H7V12H9V14ZM13 14H11V12H13V14ZM17 14H15V12H17V14ZM9 18H7V16H9V18ZM13 18H11V16H13V18ZM17 18H15V16H17V18Z" fill="black"/>
  </svg>`;
  
  //Function to create the elements of the three projects displayed. 
  function createProjectTable(){  
    const projectTable = getProjectTableFromStorage();

    // Counter to make sure only three projects
    let counter = 0;
    
    // Case of no projects
    if (!projectTable || Object.keys(projectTable).length === 0) {
        console.log("No projects found");
        const noProjectsCase = document.createElement("p");
        noProjectsCase.textContent = "Projects will be displayed here";
        // Append the created element to the DOM
        projectContainer.appendChild(noProjectsCase);
    }

  //only three projects in module.
  for(const [key, value] of Object.entries(projectTable)){
      if(counter>2){
        break;
      }
  
      //Wrapper for each of the three projects
      const newProject = document.createElement("div");
      newProject.className = "project-wrapper";
  
      //circle
      const priority = document.createElement("span");
      priority.className = "circle";
      newProject.appendChild(priority);
  
      if (value.priority === "Priority1") {
        priority.style.backgroundColor = '#FF000F';
      } else if (value.priority === "Priority2") {
        priority.style.backgroundColor = '#FFD600';
      } else if (value.priority === "Priority3") {
        priority.style.backgroundColor = '#0AB73B';
      }
  
      //project title
      const title = document.createElement("p");
      title.textContent = value.title;
      title.className = "project-title";
      newProject.appendChild(title);
  
      
      let percentofTasksComplete = 0;
      let count = 0;

      for(const task of value.taskList){
          const taskFromTable = getTaskFromTable(task);
          if(taskFromTable.completed == true){
            count++;
          }
      }

   
  
      percentofTasksComplete = Math.floor((count/value.taskList.length)*100);
  
      //Create Progress Bar container and Progress Bar
      const progressContainer = document.createElement("div");
      progressContainer.classList.add("progress-container");
      const progressBar = document.createElement("div");
      progressBar.classList.add("progress-bar");
      progressBar.style.width = percentofTasksComplete + "%";
      progressBar.style.backgroundColor = "#0AB73B"
      progressContainer.appendChild(progressBar);
  
      //Create PercentageText
      const percentageContainer = document.createElement("span");
      percentageContainer.className = "percentage-container";
      const percentageComplete = document.createElement("p");
      percentageComplete.textContent = percentofTasksComplete+"%";
      percentageComplete.className = "percent";
      percentageContainer.appendChild(percentageComplete);
  
      // %of Task Complete Text
      const percentageRemainer = document.createElement("p");
      percentageRemainer.innerText = "of task completed";
      percentageRemainer.className = "task-completed-text";
  
  
      //Create Vertical Lines
      const verticalLineProject = document.createElement('div');
      verticalLineProject.className = 'vertical-line-project';
  
  
      //Calender Image;
      const calenderImage = document.createElement("div");
      calenderImage.innerHTML = calender;
      calenderImage.className = "calenderImage";
  
  
      //Time till deadline Text
      const timeTilleDeadLine = document.createElement("p");
      timeTilleDeadLine.textContent = countTimeTillDeadline(value.deadline);
  
  
      //Add all the items to newProject and then ProjectContainer
      newProject.appendChild(progressContainer);
      newProject.appendChild(percentageContainer);
      newProject.appendChild(percentageRemainer);
      newProject.appendChild(verticalLineProject);
      newProject.appendChild(calenderImage);
      newProject.appendChild(timeTilleDeadLine);
      projectContainer.appendChild(newProject);
      counter++;
  }
  
  }
  
  function countTimeTillDeadline(deadline) {
    // Convert deadline string to Date object
    const deadlineDate = new Date(deadline);
  
    // Get current date
    const currentDate = new Date();
  
    // Calculate the difference in milliseconds
    const differenceMs = deadlineDate - currentDate;
  
    // Check if the deadline has passed
    if (differenceMs < 0) {
        return "Deadline has already passed";
    }
  
    // Convert milliseconds to weeks, days, and hours
    const weeks = Math.floor(differenceMs / (1000 * 60 * 60 * 24 * 7));
    const days = Math.floor((differenceMs % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((differenceMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
    // Construct the result string
    let result = "";
    if (weeks > 0) {
        result += weeks + " weeks, ";
    }
    if (days > 0) {
        result += days + " days, ";
    }
    if (hours > 0) {
        result += hours + " hours";
    }
  
    return result + " until deadline";
  }