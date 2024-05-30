import { 
    getNoteFromTable
} from '../backend/NoteTable.js';

let NOTE_ID = "";

window.addEventListener("DOMContentLoaded", init);


function init() {
    NOTE_ID = window.location.hash.substring(1);
    console.log(NOTE_ID);
    populateNote();   
    attachEditButtonListener();
    attachCancelButtonListener();
}

function attachEditButtonListener() {
    document.querySelector('edit-button button').addEventListener('click', editNote);
}

function attachCancelButtonListener() {
    document.querySelector('cancel-button button').addEventListener('click', cancelEdit);
}

function editNote() {
    window.location.href = './edit-note.html#' + NOTE_ID;
}

function cancelEdit() {
    window.location.href = "../homepage/index.html";
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