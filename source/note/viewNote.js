import { 
  getNoteFromTable,
  deleteNoteFromTable,
  appendTagToNoteTags, 
  removeTagFromNoteTags,
} from '../backend/NoteTable.js';

import {
  getProjectFromTable
} from '../backend/ProjectTable.js';

let NOTE_ID = "";

window.addEventListener("DOMContentLoaded", init);

/**
 * Initialize view note
 */
function init() {
  NOTE_ID = window.location.hash.substring(1);
  makeUneditable();
  
  populateNote();   
  attachEditButtonListener();
  attachCancelButtonListener();
  populateTag();
  populateProjectTag();
}

/**
 * Add event listener to edit button
 */
function attachEditButtonListener() {
  document.querySelector('edit-button button').addEventListener('click', editNote);
}

/**
 * Add event listener to cancel button
 */
function attachCancelButtonListener() {
  document.querySelector('delete-button button').addEventListener('click', deleteNote);
}

/**
 * Change link to include note id
 */
function editNote() {
  window.location.href = './edit-note.html#' + NOTE_ID;
}

/**
 * Make the note description uneditable
 */
function makeUneditable() {
  // Hide toolbar
  const toolbar = document.querySelector('.css-hnubqc');
  toolbar.style.display = 'none';
  // Make textbox uneditable
  const contentBox = document.querySelector('[role="textbox"]');
  contentBox.setAttribute('contenteditable', 'false');
}

/**
 * Populates the note with existing data from the backend.
 * Retrieves the note data using the note ID.
 * Sets the note title, markdown content, and date in the DOM.
 */
function populateNote() {
  const note = getNoteFromTable(NOTE_ID);
  document.querySelector('.noteTitle h1').innerText = note.title;
  document.querySelector('markdown-editor').wysimark.setMarkdown(note.text);
  document.querySelector('.date input').value = note.date;
}

// Adding a tag and populating the project tag
document.addEventListener('DOMContentLoaded', () => {
  const newTagForm = document.getElementById("newTag");
  const newTagInput = document.getElementById("newTagInput");
  
  // Add tag if enter is clicked
  newTagForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const tag = newTagInput.value.trim();
    if (tag) {
        appendTagToNoteTags(NOTE_ID, tag);
        newTagInput.value = '';
        const tagsContainer = document.querySelector('.tagContainer');
        tagsContainer.innerHTML = '';
        populateTag();
    } 
  });

  // Add Tag if click outside of form
  document.addEventListener('click', (event) => {
    const isClickInside = newTagForm.contains(event.target);

    if(!isClickInside) {
      const tag = newTagInput.value.trim();
      if (tag) {
        appendTagToNoteTags(NOTE_ID, tag);
        newTagInput.value = '';
        const tagsContainer = document.querySelector('.tagContainer');
        tagsContainer.innerHTML = '';
        populateTag();
      } 
    } 
  });

  document.addEventListener('projectChanged', () => {
    populateProjectTag();
  });
});

/**
 * Populate note tags
 */
function populateTag() {
  const note = getNoteFromTable(NOTE_ID);
  const tags = note.tags;
  const tagsContainer = document.querySelector('.tagContainer');
  tags.forEach(tag => {
    const newTag = document.createElement('li');
    newTag.textContent = tag;
    
    // Deleting tag
    let isClickedOnce = false;
    newTag.addEventListener('click', () => {
      if (!isClickedOnce) {
        newTag.style.backgroundColor = "#FF000F";
        setTimeout(() => {
          newTag.style.backgroundColor = "";
          isClickedOnce = false;
        }, 2000);
        isClickedOnce = true;
      }
      else {
        removeTagFromNoteTags(NOTE_ID, tag);
        newTag.remove();
      }
    });
    tagsContainer.appendChild(newTag);
  });
}

/**
 * Populates the project tag with existing data from the backend
 * Retrieves the note data using the note ID 
 * Retrieves the project data using the project ID from linkedProject
 */
 function populateProjectTag() {
  const linkProjectElement = document.getElementById("linkedProjectTag");
  const projectTagContainer = document.querySelector(".projectTagContainer");
  const note = getNoteFromTable(NOTE_ID);
  if(note.linkedProject === "") {
    projectTagContainer.classList.add("close");
    if(projectTagContainer.classList.contains("open")) {
      projectTagContainer.classList.remove("open");
    }
  } else {
    const project = getProjectFromTable(note.linkedProject);
    linkProjectElement.textContent = project.title;
    linkProjectElement.href = "../project/view-project.html" + "#" + note.linkedProject;
    // get priority
    const priority = document.getElementById("priority");
    if (project.priority === "high") {
      priority.style.backgroundColor = "#FF000F";
    }
    else if (project.priority === "medium") {
      priority.style.backgroundColor = "#FFD600";
    }
    else if (project.priority === "low") {
      priority.style.backgroundColor = "#0AB73B"
    }
    if (projectTagContainer.classList.contains("close")){
      projectTagContainer.classList.remove("close");
    }
    projectTagContainer.classList.add("open");
  }
}